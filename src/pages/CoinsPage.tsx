import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import CoinBalance from '@/components/CoinBalance';

const COINS_API = 'https://functions.poehali.dev/932b9e21-131e-4c52-a414-a77b7dff1951';

interface Transaction {
  id: number;
  amount: number;
  type: 'deposit' | 'withdrawal';
  action: string;
  description: string;
  created_at: string;
}

interface CoinPrices {
  publish_course: number;
  promote_masseur_1day: number;
  promote_masseur_3days: number;
  promote_masseur_7days: number;
  send_message_to_school: number;
  verify_profile: number;
}

export function CoinsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [prices, setPrices] = useState<CoinPrices | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Получаем транзакции
      const txResponse = await fetch(`${COINS_API}?action=transactions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (txResponse.ok) {
        const data = await txResponse.json();
        setTransactions(data.transactions || []);
      }

      // Получаем прайс-лист
      const pricesResponse = await fetch(`${COINS_API}?action=prices`);
      if (pricesResponse.ok) {
        const data = await pricesResponse.json();
        setPrices(data.prices);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const actionNames: Record<string, string> = {
    'publish_course': 'Публикация курса',
    'promote_masseur_1day': 'Продвижение (1 день)',
    'promote_masseur_3days': 'Продвижение (3 дня)',
    'promote_masseur_7days': 'Продвижение (7 дней)',
    'send_message_to_school': 'Сообщение школе',
    'verify_profile': 'Верификация профиля',
    'top_up': 'Пополнение баланса'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h1 className="text-3xl font-bold">Монеты</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <CoinBalance variant="full" />
          </div>

          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Прайс-лист</h3>
              
              {loading ? (
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-40"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {prices && Object.entries(prices).map(([key, value]) => (
                    <div 
                      key={key}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm">{actionNames[key] || key}</span>
                      <span className="font-semibold text-amber-600">{value} 💎</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">Курс обмена</p>
                    <p>100 монет = ₽100</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">История транзакций</h3>

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border rounded animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="History" size={32} className="text-gray-400" />
              </div>
              <p className="text-muted-foreground mb-4">Нет транзакций</p>
              <Button onClick={() => navigate('/coins/top-up')}>
                Пополнить баланс
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div 
                  key={tx.id}
                  className="flex items-center gap-4 p-4 border rounded hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'deposit' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    <Icon 
                      name={tx.type === 'deposit' ? 'ArrowDown' : 'ArrowUp'} 
                      size={20} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {tx.description || actionNames[tx.action] || tx.action}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(tx.created_at).toLocaleString('ru-RU')}
                    </div>
                  </div>
                  
                  <div className={`font-semibold whitespace-nowrap ${
                    tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tx.type === 'deposit' ? '+' : '-'}{tx.amount} 💎
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default CoinsPage;
