import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const API_URL = 'https://functions.poehali.dev/c8ab0021-49df-43b3-a8eb-44a777edfd13';

interface Product {
  id: number;
  type: 'course' | 'mastermind' | 'offline';
  name: string;
  views_count: number;
}

interface ProductStats {
  product_id: number;
  product_name: string;
  product_type: string;
  views_day: number;
  views_month: number;
  views_year: number;
  views_total: number;
  cost_per_view?: number;
}

interface BalanceStats {
  total_added: number;
  total_spent: number;
  current_balance: number;
}

export default function SchoolAnalytics() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'day' | 'month' | 'year'>('month');
  const [products, setProducts] = useState<ProductStats[]>([]);
  const [balance, setBalance] = useState<BalanceStats | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${API_URL}?token=${encodeURIComponent(token)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
        setBalance(data.balance || null);
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast({
          title: 'Сессия истекла',
          description: 'Пожалуйста, войдите заново',
          variant: 'destructive'
        });
        navigate('/login');
      } else {
        throw new Error('Failed to load analytics');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить аналитику',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const getViewsByPeriod = (item: ProductStats) => {
    switch (period) {
      case 'day': return item.views_day;
      case 'month': return item.views_month;
      case 'year': return item.views_year;
      default: return item.views_total;
    }
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  const getProductTypeLabel = (type: string) => {
    switch (type) {
      case 'course': return 'Курс';
      case 'mastermind': return 'Мастермайнд';
      case 'offline': return 'Очное обучение';
      default: return type;
    }
  };

  const topProducts = [...products].sort((a, b) => b.views_total - a.views_total).slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Загрузка аналитики...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Аналитика школы</h1>
            <p className="text-gray-600">Статистика по продуктам, просмотрам и балансу</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Назад
          </Button>
        </div>

        {balance && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Текущий баланс</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Icon name="Wallet" className="text-primary mr-3" size={32} />
                  <div className="text-3xl font-bold">{formatMoney(balance.current_balance)}</div>
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
                  <div className="text-3xl font-bold text-green-600">{formatMoney(balance.total_added)}</div>
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
                  <div className="text-3xl font-bold text-red-600">{formatMoney(balance.total_spent)}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>ТОП-5 продуктов по платежам</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {topProducts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Нет данных по платежам</p>
            ) : (
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.product_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{product.product_name}</div>
                        <div className="text-sm text-gray-600">{getProductTypeLabel(product.product_type)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">{formatMoney(product.payments_total)}</div>
                      <div className="text-sm text-gray-600">{product.views_total} просмотров</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Статистика по продуктам</CardTitle>
              <Select value={period} onValueChange={(v) => setPeriod(v as 'day' | 'month' | 'year')}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">За день</SelectItem>
                  <SelectItem value="month">За месяц</SelectItem>
                  <SelectItem value="year">За год</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Нет продуктов для анализа</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Продукт</th>
                      <th className="text-left py-3 px-4">Тип</th>
                      <th className="text-right py-3 px-4">Просмотры</th>
                      <th className="text-right py-3 px-4">Всего просмотров</th>
                      <th className="text-right py-3 px-4">Цена за просмотр</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.product_id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{product.product_name}</td>
                        <td className="py-3 px-4 text-gray-600">{getProductTypeLabel(product.product_type)}</td>
                        <td className="py-3 px-4 text-right">{getViewsByPeriod(product)}</td>
                        <td className="py-3 px-4 text-right text-gray-600">{product.views_total}</td>
                        <td className="py-3 px-4 text-right">
                          {product.cost_per_view !== undefined && product.cost_per_view > 0 ? (
                            <span className={`px-2 py-1 rounded text-sm font-medium ${
                              product.cost_per_view <= 10 ? 'bg-green-100 text-green-700' :
                              product.cost_per_view <= 30 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {formatMoney(product.cost_per_view)}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}