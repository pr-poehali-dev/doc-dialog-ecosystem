import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import PromoteMasseurDialog from '@/components/masseur/PromoteMasseurDialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const API_URL = 'https://functions.poehali.dev/8c82911e-481f-4a63-92ff-aae203e992cc';
const MASSEURS_API = 'https://functions.poehali.dev/49394b85-90a2-40ca-a843-19e551c6c436';

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

export default function MasseurBalance() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [promoteDialogOpen, setPromoteDialogOpen] = useState(false);
  const [masseurData, setMasseurData] = useState<any>(null);

  useEffect(() => {
    loadBalance();
    loadMasseurData();
  }, []);

  const loadMasseurData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const user = JSON.parse(atob(token.split('.')[1]));
      const userId = user.user_id;

      const response = await fetch(MASSEURS_API);
      if (response.ok) {
        const data = await response.json();
        const masseurs = data.masseurs || data;
        const found = masseurs.find((m: any) => m.user_id === userId);
        setMasseurData(found);
      }
    } catch (error) {
      console.error('Error loading masseur data:', error);
    }
  };

  const loadBalance = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${API_URL}?action=get`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
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

  const handleAddFunds = () => {
    setIsDialogOpen(false);
    navigate('/dashboard/masseur-balance-topup');
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <Icon name="Loader2" className="animate-spin" size={48} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Баланс</h1>
              <p className="text-gray-600">Управление балансом для продвижения</p>
            </div>
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="Wallet" className="text-primary" size={24} />
                  Текущий баланс
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">
                  {formatMoney(balanceData?.current_balance || 0)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="TrendingUp" className="text-green-600" size={24} />
                  Всего пополнено
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">
                  {formatMoney(balanceData?.total_added || 0)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="TrendingDown" className="text-red-600" size={24} />
                  Всего потрачено
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-600">
                  {formatMoney(balanceData?.total_spent || 0)}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" className="text-amber-600" size={24} />
                  Продвижение профиля
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Поднимите свой профиль в ТОП каталога вашего города и привлекайте больше клиентов
              </p>
              <Button
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                onClick={() => setPromoteDialogOpen(true)}
                disabled={!masseurData}
              >
                <Icon name="Zap" size={18} className="mr-2" />
                Попасть в топ каталога
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Пополнить баланс</CardTitle>
                <Button onClick={handleAddFunds}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Пополнить
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Выберите удобный тариф пополнения с бонусами или укажите свою сумму
              </p>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                onClick={handleAddFunds}
              >
                <Icon name="CreditCard" size={18} className="mr-2" />
                Выбрать тариф и пополнить
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>История операций</CardTitle>
            </CardHeader>
            <CardContent>
              {!balanceData?.transactions || balanceData.transactions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Icon name="Receipt" size={48} className="mx-auto mb-4 opacity-20" />
                  <p>История операций пуста</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {balanceData.transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'deposit' 
                            ? 'bg-green-100' 
                            : 'bg-red-100'
                        }`}>
                          <Icon
                            name={transaction.type === 'deposit' ? 'ArrowDown' : 'ArrowUp'}
                            className={transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}
                            size={20}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{formatDate(transaction.created_at)}</p>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${
                        transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}
                        {formatMoney(Math.abs(transaction.amount))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {masseurData && (
        <PromoteMasseurDialog
          open={promoteDialogOpen}
          onOpenChange={setPromoteDialogOpen}
          masseurId={masseurData.id}
          masseurName={masseurData.full_name || 'Специалист'}
          city={masseurData.city || 'Не указан'}
          onSuccess={() => {
            loadBalance();
            loadMasseurData();
          }}
        />
      )}
    </div>
  );
}