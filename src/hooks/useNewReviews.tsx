import { useState, useEffect } from 'react';

const API_URL = 'https://functions.poehali.dev/04d0b538-1cf5-4941-9c06-8d1bef5854ec';

export function useNewReviews() {
  const [newReviewsCount, setNewReviewsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}?action=get-reviews`, {
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const lastViewedKey = 'lastViewedReviews';
          const lastViewed = localStorage.getItem(lastViewedKey);
          const lastViewedDate = lastViewed ? new Date(lastViewed) : null;
          
          const newReviews = data.reviews?.filter((review: any) => {
            const reviewDate = new Date(review.created_at);
            return review.moderation_status === 'approved' && 
                   (!lastViewedDate || reviewDate > lastViewedDate);
          }) || [];
          
          setNewReviewsCount(newReviews.length);
        } else {
          console.warn(`Failed to fetch reviews: ${response.status}`);
          setNewReviewsCount(0);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setNewReviewsCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchNewReviews();
    const interval = setInterval(fetchNewReviews, 60000);

    return () => clearInterval(interval);
  }, []);

  const markReviewsAsViewed = () => {
    localStorage.setItem('lastViewedReviews', new Date().toISOString());
    setNewReviewsCount(0);
  };

  return { newReviewsCount, loading, markReviewsAsViewed };
}
