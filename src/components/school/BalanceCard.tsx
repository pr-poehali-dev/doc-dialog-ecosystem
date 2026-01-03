import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { getUserId } from '@/utils/auth';

const BALANCE_API_URL = 'https://functions.poehali.dev/8c82911e-481f-4a63-92ff-aae203e992cc';

interface Transaction {
  id: number;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'refund';
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
  }, []);

  const loadBalance = async () => {
    try {
      const userId = getUserId();
      const response = await fetch(`${BALANCE_API_URL}?action=balance`, {
        headers: { 'X-User-Id': userId }
      });

      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
      }
    } catch (error) {
      console.error('Load balance error:', error);
    }
  };

  const loadTransactions = async () => {
    try {
      const userId = getUserId();
      const response = await fetch(`${BALANCE_API_URL}?action=transactions&limit=20`, {
        headers: { 'X-User-Id': userId }
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.error('Load transactions error:', error);
    }
  };

  const handleTopUp = async () => {
    const amount = parseFloat(topUpAmount);
    
    if (!amount || amount <= 0) {
      toast({ title: 'Ошибка', description: 'Введите корректную сумму', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const userId = getUserId();
      const response = await fetch(BALANCE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          amount,
          description: 'Пополнение баланса (тестовое)'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setBalance(data.new_balance);
        setTopUpAmount('');
        setShowTopUp(false);
        toast({ title: 'Успешно', description: `Баланс пополнен на ${amount} ₽` });
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось пополнить баланс', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Ошибка при пополнении баланса', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return 'ArrowDownToLine';
      case 'withdrawal': return 'ArrowUpFromLine';
      case 'refund': return 'RotateCcw';
      default: return 'Circle';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit': return 'text-green-600';
      case 'withdrawal': return 'text-red-600';
      case 'refund': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Icon name="Wallet" size={24} />
          Баланс школы
        </CardTitle>
        <div className="flex gap-2">
          <Dialog open={showHistory} onOpenChange={setShowHistory}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => loadTransactions()}>
                <Icon name="History" size={16} className="mr-2" />
                История
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
                          <Icon name={getTransactionIcon(t.type)} className={getTransactionColor(t.type)} size={20} />
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
                        <span className={`font-bold ${getTransactionColor(t.type)}`}>
                          {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showTopUp} onOpenChange={setShowTopUp}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Пополнить
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Пополнить баланс</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount">Сумма пополнения</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Введите сумму"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Минимальная сумма: 100 ₽
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[1000, 5000, 10000].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setTopUpAmount(amount.toString())}
                    >
                      {amount.toLocaleString('ru-RU')} ₽
                    </Button>
                  ))}
                </div>

                <Button
                  className="w-full"
                  onClick={handleTopUp}
                  disabled={loading}
                >
                  {loading ? 'Обработка...' : 'Пополнить баланс'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Сейчас работает тестовый режим. В продакшене здесь будет интеграция с платежной системой.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">
            {balance.toLocaleString('ru-RU')} ₽
          </div>
          <p className="text-sm text-gray-500">
            Используйте баланс для подъёма курсов в топ
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
