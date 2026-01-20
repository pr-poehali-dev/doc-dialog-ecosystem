import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const SALON_API = 'https://functions.poehali.dev/01aa5a2f-6476-4fbc-ba10-6808960c8a21';
const USER_BALANCE_URL = 'https://functions.poehali.dev/619d5197-066f-4380-8bef-994c71c76fa0';

interface VacancyInfoCardProps {
  onAddVacancy: () => void;
}

export default function VacancyInfoCard({ onAddVacancy }: VacancyInfoCardProps) {
  const [vacancyCount, setVacancyCount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const getUserRole = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.role;
    }
    return null;
  };

  useEffect(() => {
    if (getUserRole() === 'salon') {
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

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

  const loadData = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = getUserId();
      if (!token || !userId) return;

      const [salonRes, balanceRes] = await Promise.all([
        fetch(`${SALON_API}?action=salon_profile`, {
          headers: { 'X-Authorization': `Bearer ${token}` }
        }),
        fetch(USER_BALANCE_URL, {
          headers: { 'X-User-Id': userId }
        })
      ]);

      if (salonRes.ok) {
        const salonData = await salonRes.json();
        setVacancyCount(salonData.vacancies?.length || 0);
      }

      if (balanceRes.ok) {
        const balanceData = await balanceRes.json();
        setBalance(balanceData.balance || 0);
      }
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || getUserRole() !== 'salon') return null;

  const isFirstVacancyFree = vacancyCount === 0;
  const canAffordNextVacancy = balance >= 100 || isFirstVacancyFree;

  return (
    <Card className="mb-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon name="Briefcase" className="text-blue-600" size={24} />
          Вакансии массажистов
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="FileText" size={16} className="text-blue-600" />
              <span className="text-sm text-gray-600">Активных вакансий</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{vacancyCount}</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Wallet" size={16} className="text-green-600" />
              <span className="text-sm text-gray-600">Баланс</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{balance.toFixed(0)} ₽</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Tag" size={16} className="text-orange-600" />
              <span className="text-sm text-gray-600">Стоимость публикации</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">
              {isFirstVacancyFree ? (
                <span className="text-green-600">Бесплатно</span>
              ) : (
                '100 ₽'
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onAddVacancy}
            className="flex-1"
            disabled={!canAffordNextVacancy}
          >
            <Icon name="Plus" size={18} className="mr-2" />
            {isFirstVacancyFree ? 'Добавить первую вакансию (бесплатно)' : 'Добавить вакансию (100₽)'}
          </Button>

          {!isFirstVacancyFree && !canAffordNextVacancy && (
            <Link to="/dashboard/balance" className="flex-1">
              <Button variant="outline" className="w-full">
                <Icon name="Wallet" size={18} className="mr-2" />
                Пополнить баланс
              </Button>
            </Link>
          )}
        </div>

        {!canAffordNextVacancy && (
          <p className="text-sm text-red-600 mt-3 flex items-center gap-2">
            <Icon name="AlertCircle" size={16} />
            Недостаточно средств. Пополните баланс для добавления вакансии.
          </p>
        )}

        {isFirstVacancyFree && (
          <p className="text-sm text-green-600 mt-3 flex items-center gap-2">
            <Icon name="Gift" size={16} />
            Первая вакансия публикуется бесплатно. Последующие — 100₽ за каждую.
          </p>
        )}
      </CardContent>
    </Card>
  );
}