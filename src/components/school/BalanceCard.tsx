import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { getUserId } from '@/utils/auth';

const USER_BALANCE_URL = 'https://functions.poehali.dev/619d5197-066f-4380-8bef-994c71c76fa0';

interface Transaction {
  id: number;
  amount: number;
  type: string;
  description: string;
  created_at: string;
}

export default function BalanceCard() {
  const { toast } = useToast();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [topUpAmount, setTopUpAmount] = useState('');

  useEffect(() => {
    loadBalance();
    
    // Слушаем событие обновления баланса
    const handleBalanceUpdate = () => {
      loadBalance();
    };
    window.addEventListener('balanceUpdated', handleBalanceUpdate);
    
    return () => {
      window.removeEventListener('balanceUpdated', handleBalanceUpdate);
    };
  }, []);

  const loadBalance = async () => {
    try {
      const userId = getUserId();
      if (!userId) return;
      
      const response = await fetch(USER_BALANCE_URL, {
        method: 'GET',
        headers: {
          'X-User-Id': String(userId)
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance || 0);
      }
    } catch (error) {
      console.error('Load balance error:', error);
    }
  };

  const loadTransactions = async () => {
    try {
      const userId = getUserId();
      if (!userId) return;
      
      const response = await fetch(`${USER_BALANCE_URL}?action=transactions`, {
        method: 'GET',
        headers: {
          'X-User-Id': String(userId)
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions || []);
      }
    } catch (error) {
      console.error('Load transactions error:', error);
    }
  };

  const handleTopUp = () => {
    window.location.href = '/dashboard/school-balance-topup';
  };

  const getTransactionIcon = (amount: number) => {
    return amount > 0 ? 'ArrowDownToLine' : 'ArrowUpFromLine';
  };

  const getTransactionColor = (amount: number) => {
    return amount > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle className="flex items-center gap-2">
          <Icon name="Wallet" size={24} />
          Баланс школы
        </CardTitle>
        <div className="flex gap-2 w-full sm:w-auto">
          <Dialog open={showHistory} onOpenChange={setShowHistory}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => loadTransactions()} className="flex-1 sm:flex-none">
                <Icon name="History" size={16} className="sm:mr-2" />
                <span className="hidden sm:inline">История</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>История операций</DialogTitle>
              </DialogHeader>
              <div className="max-h-96 overflow-y-auto">
                {transactions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Операций пока нет</p>
                ) : (
                  <div className="space-y-3">
                    {transactions.map((t) => (
                      <div key={t.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon name={getTransactionIcon(t.amount)} className={getTransactionColor(t.amount)} size={20} />
                          <div>
                            <p className="font-medium">{t.description}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(t.created_at).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                        <span className={`font-bold ${getTransactionColor(t.amount)}`}>
                          {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Button size="sm" onClick={handleTopUp} className="flex-1 sm:flex-none">
            <Icon name="Plus" size={16} className="sm:mr-2" />
            <span className="hidden sm:inline">Пополнить</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
            {balance.toLocaleString('ru-RU')} ₽
          </div>
          <p className="text-xs sm:text-sm text-gray-500">
            Используйте баланс для подъёма курсов в топ и AI-инструментов (15₽ за анализ)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}