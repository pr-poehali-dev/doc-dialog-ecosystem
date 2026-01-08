import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const COINS_API = 'https://functions.poehali.dev/932b9e21-131e-4c52-a414-a77b7dff1951';

interface CoinBalanceProps {
  variant?: 'compact' | 'full';
}

export function CoinBalance({ variant = 'compact' }: CoinBalanceProps) {
  const [coins, setCoins] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${COINS_API}?action=balance`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCoins(data.coins);
      }
    } catch (error) {
      console.error('Error fetching coin balance:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card 
        className="p-3 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => navigate('/coins')}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
            <Icon name="Coins" size={24} className="text-white" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Баланс</div>
            <div className="text-lg font-bold text-amber-600">
              {coins !== null ? `${coins.toLocaleString()} 💎` : '—'}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Ваш баланс</h3>
          <p className="text-sm text-muted-foreground">
            100 монет = ₽100
          </p>
        </div>
        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
          <Icon name="Coins" size={32} className="text-white" />
        </div>
      </div>

      <div className="text-4xl font-bold text-amber-600 mb-6">
        {coins !== null ? `${coins.toLocaleString()} 💎` : '—'}
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">В рублях</span>
          <span className="font-semibold">
            {coins !== null ? `₽${coins.toLocaleString()}` : '—'}
          </span>
        </div>
      </div>

      <Button 
        className="w-full" 
        size="lg"
        onClick={() => navigate('/coins/top-up')}
      >
        <Icon name="Plus" size={20} className="mr-2" />
        Пополнить баланс
      </Button>
    </Card>
  );
}

export default CoinBalance;
