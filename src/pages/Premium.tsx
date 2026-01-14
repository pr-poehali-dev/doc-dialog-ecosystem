import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: "Бесплатный",
    price: "0 ₽",
    period: "навсегда",
    description: "Для знакомства с платформой",
    features: [
      { text: "10 запросов к AI в месяц", included: true },
      { text: "Базовые инструменты", included: true },
      { text: "Публичный профиль", included: true },
      { text: "Просмотр салонов и школ", included: true },
      { text: "Приоритетная поддержка", included: false },
      { text: "Безлимитные AI запросы", included: false },
      { text: "Расширенная аналитика", included: false },
    ],
    current: true,
    buttonText: "Текущий тариф",
    buttonVariant: "outline" as const
  },
  {
    name: "Premium",
    price: "990 ₽",
    period: "в месяц",
    description: "Для профессионалов",
    popular: true,
    features: [
      { text: "Безлимитные AI запросы", included: true },
      { text: "Все инструменты платформы", included: true },
      { text: "Приоритетная поддержка", included: true },
      { text: "Расширенная аналитика", included: true },
      { text: "Продвижение профиля", included: true },
      { text: "Ранний доступ к новым функциям", included: true },
      { text: "Персональный менеджер", included: true },
    ],
    buttonText: "Оформить Premium",
    buttonVariant: "default" as const
  },
  {
    name: "Годовой Premium",
    price: "9 900 ₽",
    period: "в год",
    description: "Экономия 2 месяцев",
    discount: "Выгода 1 980 ₽",
    features: [
      { text: "Все возможности Premium", included: true },
      { text: "Экономия 17%", included: true },
      { text: "Приоритетная поддержка", included: true },
      { text: "Расширенная аналитика", included: true },
      { text: "Продвижение профиля", included: true },
      { text: "Ранний доступ к новым функциям", included: true },
      { text: "Персональный менеджер", included: true },
    ],
    buttonText: "Оформить на год",
    buttonVariant: "default" as const
  }
];

export default function Premium() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Icon name="Crown" size={28} className="text-primary" />
              <span className="text-xl font-bold">Premium подписка</span>
            </Link>
            <Link to="/">
              <Button variant="outline">
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Назад
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Icon name="Zap" size={14} className="mr-1" />
              Специальное предложение
            </Badge>
            <h1 className="text-5xl font-bold mb-4">
              Выберите свой тариф
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Получите доступ ко всем возможностям платформы для роста вашего бизнеса
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      <Icon name="Star" size={14} className="mr-1" />
                      Популярный
                    </Badge>
                  </div>
                )}
                {plan.discount && (
                  <div className="absolute -top-4 right-4">
                    <Badge variant="secondary" className="bg-green-600 text-white">
                      {plan.discount}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/ {plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        {feature.included ? (
                          <Icon name="CheckCircle2" size={20} className="text-green-600 mt-0.5 shrink-0" />
                        ) : (
                          <Icon name="XCircle" size={20} className="text-muted-foreground mt-0.5 shrink-0" />
                        )}
                        <span className={feature.included ? '' : 'text-muted-foreground'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full" 
                    variant={plan.buttonVariant}
                    disabled={plan.current}
                    size="lg"
                  >
                    {plan.current && <Icon name="Check" size={18} className="mr-2" />}
                    {!plan.current && <Icon name="Crown" size={18} className="mr-2" />}
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted/50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Почему выбирают Premium?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Безлимитный AI</h3>
                <p className="text-sm text-muted-foreground">
                  Неограниченное использование всех AI-инструментов без лимитов
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="HeartHandshake" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Приоритетная поддержка</h3>
                <p className="text-sm text-muted-foreground">
                  Быстрые ответы на ваши вопросы от команды поддержки
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="TrendingUp" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Рост бизнеса</h3>
                <p className="text-sm text-muted-foreground">
                  Продвижение профиля и доступ к расширенной аналитике
                </p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="HelpCircle" size={24} />
                Часто задаваемые вопросы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Как отменить подписку?</h4>
                <p className="text-muted-foreground">
                  Вы можете отменить подписку в любой момент в настройках аккаунта. 
                  Доступ к Premium сохранится до конца оплаченного периода.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Можно ли перейти с месячной на годовую?</h4>
                <p className="text-muted-foreground">
                  Да, вы можете в любой момент перейти на годовую подписку. 
                  Мы пересчитаем стоимость с учетом уже оплаченного периода.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Есть ли возврат средств?</h4>
                <p className="text-muted-foreground">
                  Мы предоставляем возврат средств в течение 14 дней с момента оплаты, 
                  если вы не использовали Premium возможности.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t mt-16 py-8 bg-background/80">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Безопасная оплата. Техподдержка 24/7</p>
        </div>
      </footer>
    </div>
  );
}
