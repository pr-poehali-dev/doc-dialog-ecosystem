import { useState, useEffect, useRef, useCallback } from 'react';

const API_URL = 'https://functions.poehali.dev/04d0b538-1cf5-4941-9c06-8d1bef5854ec';
const LAST_SEEN_REVIEWS_KEY = 'lastSeenReviewsCount';

interface DashboardCounts {
  unreadCount: number;
  newOrdersCount: number;
  newReviewsCount: number;
}

let sharedState: DashboardCounts = {
  unreadCount: 0,
  newOrdersCount: 0,
  newReviewsCount: 0,
};
const listeners: Set<() => void> = new Set();
let pollingActive = false;
let intervalId: NodeJS.Timeout | null = null;

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

async function fetchCounts() {
  if (document.hidden) return;

  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    const response = await fetch(`${API_URL}?action=get-dashboard-counts`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      const totalReviews = data.total_approved_reviews || 0;
      const lastSeen = parseInt(localStorage.getItem(LAST_SEEN_REVIEWS_KEY) || '0', 10);
      const newReviews = Math.max(0, totalReviews - lastSeen);

      sharedState = {
        unreadCount: data.unread_messages || 0,
        newOrdersCount: data.pending_orders || 0,
        newReviewsCount: newReviews,
      };
      notifyListeners();
    }
  } catch (error) {
    console.error('Error fetching dashboard counts:', error);
  }
}

function startPolling() {
  if (pollingActive) return;
  pollingActive = true;
  fetchCounts();
  intervalId = setInterval(fetchCounts, 120000);
}

function stopPolling() {
  pollingActive = false;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function handleVisibility() {
  if (document.hidden) {
    stopPolling();
  } else if (listeners.size > 0) {
    startPolling();
  }
}

document.addEventListener('visibilitychange', handleVisibility);

export default function useDashboardPolling() {
  const [, forceUpdate] = useState(0);
  const listenerRef = useRef<() => void>();

  useEffect(() => {
    const listener = () => forceUpdate((n) => n + 1);
    listenerRef.current = listener;
    listeners.add(listener);

    if (listeners.size === 1) {
      startPolling();
    }

    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        stopPolling();
      }
    };
  }, []);

  const markReviewsAsViewed = useCallback(() => {
    const lastSeen = parseInt(localStorage.getItem(LAST_SEEN_REVIEWS_KEY) || '0', 10);
    const current = lastSeen + sharedState.newReviewsCount;
    localStorage.setItem(LAST_SEEN_REVIEWS_KEY, String(current));
    sharedState = { ...sharedState, newReviewsCount: 0 };
    notifyListeners();
  }, []);

  return {
    unreadCount: sharedState.unreadCount,
    newOrdersCount: sharedState.newOrdersCount,
    newReviewsCount: sharedState.newReviewsCount,
    markReviewsAsViewed,
  };
}
