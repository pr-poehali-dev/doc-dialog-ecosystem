import { useState, useEffect, useRef } from 'react';

const API_URL = 'https://functions.poehali.dev/04d0b538-1cf5-4941-9c06-8d1bef5854ec';

export function useNewOrders() {
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchNewOrders = async () => {
      if (document.hidden) return;
      
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`${API_URL}?action=get-masseur-orders`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const pendingOrders = data.orders?.filter((order: any) => order.status === 'pending') || [];
          setNewOrdersCount(pendingOrders.length);
        }
      } catch (error) {
        console.error('Error fetching new orders:', error);
      }
    };

    const startPolling = () => {
      if (intervalRef.current) return;
      fetchNewOrders();
      intervalRef.current = setInterval(fetchNewOrders, 120000);
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

  return { newOrdersCount };
}