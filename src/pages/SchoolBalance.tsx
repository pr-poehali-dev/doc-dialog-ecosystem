import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const API_URL = 'https://functions.poehali.dev/8c82911e-481f-4a63-92ff-aae203e992cc';

interface Transaction {
  id: number;
  amount: number;
  type: 'deposit' | 'withdrawal';
  description: string;
  created_at: string;
  related_entity_type?: string;
  related_entity_id?: number;
}

interface BalanceData {
  current_balance: number;
  total_added: number;
  total_spent: number;
  transactions: Transaction[];
}

export default function SchoolBalance() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadBalance();
  }, []);

  const loadBalance = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${API_URL}?token=${encodeURIComponent(token)}&action=get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBalanceData(data);
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        throw new Error('Failed to load balance');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить баланс',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddFunds = async () => {
    const amountNum = parseFloat(amount);
    
    if (!amountNum || amountNum <= 0) {
      toast({
        title: 'Ошибка',
        description: 'Введите корректную сумму',
        variant: 'destructive'
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите описание платежа',
        variant: 'destructive'
      });
      return;
    }

    const token = localStorage.getItem('token');
    setProcessing(true);

    try {
      const response = await fetch(`${API_URL}?token=${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'add',
          amount: amountNum,
          description: description.trim()
        })
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: `Баланс пополнен на ${amountNum.toFixed(2)} ₽`
        });
        setAmount('');
        setDescription('');
        setIsDialogOpen(false);
        loadBalance();
      } else {
        throw new Error('Failed to add funds');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось пополнить баланс',
        variant: 'destructive'
      });
    } finally {
      setProcessing(false);
    }
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Загрузка баланса...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Баланс школы</h1>
            <p className="text-gray-600">Управление финансами и история транзакций</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Назад
          </Button>
        </div>

        {balanceData && (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Текущий баланс</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon name="Wallet" className="text-primary mr-3" size={32} />
                      <div className="text-3xl font-bold">{formatMoney(balanceData.current_balance)}</div>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Icon name="Plus" size={16} className="mr-1" />
                          Пополнить
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Пополнение баланса</DialogTitle>
                          <DialogDescription>
                            Введите сумму и описание платежа
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <Label htmlFor="amount">Сумма (₽)</Label>
                            <Input
                              id="amount"
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="1000.00"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="description">Описание</Label>
                            <Input
                              id="description"
                              placeholder="Пополнение баланса"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                          <Button 
                            onClick={handleAddFunds} 
                            disabled={processing}
                            className="w-full"
                          >
                            {processing ? (
                              <>
                                <Icon name="Loader2" className="animate-spin mr-2" size={16} />
                                Обработка...
                              </>
                            ) : (
                              'Пополнить баланс'
                            )}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Всего пополнено</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Icon name="TrendingUp" className="text-green-600 mr-3" size={32} />
                    <div className="text-3xl font-bold text-green-600">{formatMoney(balanceData.total_added)}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Всего израсходовано</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Icon name="TrendingDown" className="text-red-600 mr-3" size={32} />
                    <div className="text-3xl font-bold text-red-600">{formatMoney(balanceData.total_spent)}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>История транзакций</CardTitle>
              </CardHeader>
              <CardContent>
                {balanceData.transactions.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Нет транзакций</p>
                ) : (
                  <div className="space-y-3">
                    {balanceData.transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            <Icon
                              name={transaction.type === 'deposit' ? 'ArrowDownToLine' : 'ArrowUpFromLine'}
                              className={transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}
                              size={20}
                            />
                          </div>
                          <div>
                            <div className="font-semibold">{transaction.description}</div>
                            <div className="text-sm text-gray-600">{formatDate(transaction.created_at)}</div>
                          </div>
                        </div>
                        <div className={`text-xl font-bold ${
                          transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'deposit' ? '+' : '-'}{formatMoney(transaction.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}