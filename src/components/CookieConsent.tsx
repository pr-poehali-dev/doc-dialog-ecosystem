import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-in slide-in-from-bottom-5">
      <Card className="max-w-4xl mx-auto p-4 sm:p-6 shadow-2xl border-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Cookie" size={24} className="text-primary" />
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Мы используем cookie</h3>
            <p className="text-sm text-gray-600">
              Этот сайт использует файлы cookie для улучшения вашего опыта использования. 
              Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
              <a href="/privacy" className="text-primary hover:underline">
                политикой конфиденциальности
              </a>.
            </p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="flex-1 sm:flex-initial"
            >
              Отклонить
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="flex-1 sm:flex-initial"
            >
              Принять
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
