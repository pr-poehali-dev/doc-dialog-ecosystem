import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Register() {
  const navigate = useNavigate();

  const accountTypes = [
    {
      type: 'masseur',
      title: 'Специалист',
      description: 'Массажист, остеопат, телесный терапевт',
      icon: 'User',
      color: 'from-blue-500 to-blue-600',
      path: '/register/masseur'
    },
    {
      type: 'school',
      title: 'Школа массажа',
      description: 'Учебное заведение, курсы, обучение',
      icon: 'GraduationCap',
      color: 'from-purple-500 to-purple-600',
      path: '/register/school'
    },
    {
      type: 'salon',
      title: 'Массажный салон',
      description: 'Салон, студия массажа',
      icon: 'Building2',
      color: 'from-pink-500 to-pink-600',
      path: '/register/salon'
    },
    {
      type: 'client',
      title: 'Клиент',
      description: 'Поиск специалистов и услуг',
      icon: 'Heart',
      color: 'from-green-500 to-green-600',
      path: '/register/client'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <Link to="/">
            <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-12 mx-auto mb-6" />
          </Link>
          <h1 className="text-4xl font-bold mb-3">Присоединяйтесь к экосистеме</h1>
          <p className="text-gray-600 text-lg">Выберите тип аккаунта для регистрации</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {accountTypes.map((account) => (
            <Card 
              key={account.type}
              className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary group"
              onClick={() => navigate(account.path)}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${account.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon name={account.icon as any} size={32} className="text-white" />
                </div>
                <CardTitle className="text-2xl">{account.title}</CardTitle>
                <CardDescription className="text-base">{account.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  variant="outline"
                >
                  <span>Зарегистрироваться</span>
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center text-sm">
          <span className="text-gray-600">Уже есть аккаунт? </span>
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
