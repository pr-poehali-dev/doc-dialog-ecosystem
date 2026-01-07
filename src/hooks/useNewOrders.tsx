import { useState, useEffect } from 'react';

const API_URL = 'https://functions.poehali.dev/04d0b538-1cf5-4941-9c06-8d1bef5854ec';

export function useNewOrders() {
  const [newOrdersCount, setNewOrdersCount] = useState(0);

  useEffect(() => {
    const fetchNewOrders = async () => {
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

    fetchNewOrders();
    const interval = setInterval(fetchNewOrders, 30000);

    return () => clearInterval(interval);
  }, []);

  return { newOrdersCount };
}
