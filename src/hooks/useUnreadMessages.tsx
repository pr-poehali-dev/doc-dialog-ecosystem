import { useState, useEffect, useRef } from 'react';

const API_URL = 'https://functions.poehali.dev/04d0b538-1cf5-4941-9c06-8d1bef5854ec';

export function useUnreadMessages() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (document.hidden) return;
      
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}?action=get-chats`, {
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const total = data.chats?.reduce((sum: number, chat: any) => sum + (chat.unread_count || 0), 0) || 0;
          setUnreadCount(total);
        } else {
          console.warn(`Failed to fetch unread messages: ${response.status}`);
          setUnreadCount(0);
        }
      } catch (error) {
        console.error('Error fetching unread messages:', error);
        setUnreadCount(0);
      } finally {
        setLoading(false);
      }
    };

    const startPolling = () => {
      if (intervalRef.current) return;
      fetchUnreadCount();
      intervalRef.current = setInterval(fetchUnreadCount, 120000);
    };

    const stopPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        startPolling();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    startPolling();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopPolling();
    };
  }, []);

  return { unreadCount, loading };
}