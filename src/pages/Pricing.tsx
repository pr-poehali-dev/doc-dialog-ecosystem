import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const plans = [
  {
    title: 'Массажист Базовый',
    price: '0 ₽',
    period: 'бесплатно',
    features: [
      'Доступ к базовым курсам',
      'Чат-бот MRTDD (10 запросов/день)',
      'Просмотр вакансий',
      'Участие в форуме'
    ],
    highlighted: false
  },
  {
    title: 'Массажист Профи',
    price: '1 990 ₽',
    period: 'в месяц',
    features: [
      'Все возможности Базового',
      'Безлимитный доступ к ботам',
      'Все курсы платформы',
      'Мастермайнды со скидкой 20%',
      'Приоритетная поддержка',
      'Сертификаты курсов'
    ],
    highlighted: true
  },
  {
    title: 'Школа',
    price: 'от 5 000 ₽',
    period: 'в месяц',
    features: [
      'Размещение курсов на платформе',
      'Личная страница школы',
      'Партнёрские ссылки',
      'Аналитика продаж',
      'Продвижение в ленте',
      'Размещение бесплатных курсов'
    ],
    highlighted: false
  },
  {
    title: 'Салон',
    price: 'от 3 000 ₽',
    period: 'в месяц',
    features: [
      'Размещение вакансий',
      'Доступ к базе специалистов',
      'Личная страница салона',
      'Статистика откликов',
      'Выделение вакансий'
    ],
    highlighted: false
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Тарифы
          </h1>
          <p className="text-xl text-gray-600">
            Выберите подходящий план для вашей деятельности
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg border-2 transition-all hover:shadow-xl ${
                plan.highlighted ? 'border-primary scale-105' : 'border-gray-100'
              }`}
            >
              {plan.highlighted && (
                <div className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  Популярный
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                <span className="text-gray-600 ml-2">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${plan.highlighted ? 'bg-primary hover:bg-primary/90' : ''}`}
                variant={plan.highlighted ? 'default' : 'outline'}
              >
                Выбрать план
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">Нужна консультация? Есть вопросы по тарифам?</p>
          <Button size="lg">
            Связаться с нами
          </Button>
        </div>
      </div>
    </div>
  );
}
