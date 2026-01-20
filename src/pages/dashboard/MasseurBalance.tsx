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

const USER_BALANCE_URL = 'https://functions.poehali.dev/619d5197-066f-4380-8bef-994c71c76fa0';
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

  const getUserRole = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.role;
    }
    return null;
  };

  const loadMasseurData = async () => {
    try {
      const role = getUserRole();
      if (role !== 'masseur') return; // Только массажистам нужны данные профиля

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

  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id || payload.userId || payload.sub;
    } catch {
      return null;
    }
  };

  const loadBalance = async () => {
    const userId = getUserId();
    
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(USER_BALANCE_URL, {
        method: 'GET',
        headers: {
          'X-User-Id': String(userId)
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Адаптируем формат под старую структуру
        setBalanceData({
          current_balance: data.balance || 0,
          total_added: 0, // Эти данные больше не актуальны
          total_spent: 0,
          transactions: []
        });
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
    const role = getUserRole();
    
    if (role === 'school' || role === 'salon') {
      navigate('/dashboard/school-balance-topup');
    } else {
      navigate('/dashboard/masseur-balance-topup');
    }
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
              <p className="text-gray-600">
                {getUserRole() === 'masseur' ? 'Управление балансом для продвижения' : 'Пополнение для AI-инструментов (15₽ за анализ)'}
              </p>
            </div>
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
          </div>

          <div className="grid md:grid-cols-1 gap-6 mb-8">
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


          </div>

          {getUserRole() === 'masseur' && (
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
          )}

          {getUserRole() !== 'masseur' && (
            <Card className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Sparkles" className="text-blue-600" size={24} />
                  AI-инструменты для вашей работы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <Icon name="FileSearch" className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Расшифровка медицинских заключений</p>
                      <p className="text-sm text-gray-600">МРТ, рентген, УЗИ простым языком</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="ClipboardList" className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Сбор анамнеза клиента</p>
                      <p className="text-sm text-gray-600">Структурированная форма с AI-анализом</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Activity" className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Анализ боли</p>
                      <p className="text-sm text-gray-600">Причины боли и рекомендации</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded-lg border border-blue-300">
                    <p className="text-sm font-semibold text-blue-900">15₽ за каждый анализ</p>
                    <p className="text-xs text-gray-600 mt-1">Средства списываются автоматически с вашего баланса</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

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
                {getUserRole() === 'masseur' 
                  ? 'Выберите удобный тариф пополнения с бонусами или укажите свою сумму'
                  : 'Пополните баланс для использования AI-инструментов. Удобные тарифы с бонусами'}
              </p>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                onClick={handleAddFunds}
              >
                <Icon name="CreditCard" size={18} className="mr-2" />
                {getUserRole() === 'masseur' ? 'Выбрать тариф и пополнить' : 'Пополнить баланс'}
              </Button>
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