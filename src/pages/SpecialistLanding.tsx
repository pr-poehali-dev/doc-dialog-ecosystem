import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function SpecialistLanding() {
  const scrollToCTA = () => {
    document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            В Док диалог вас уже ждут клиенты
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light">
            Более 1000 человек ищут массажиста, которому можно доверить своё тело
          </p>
          <div className="text-sm text-muted-foreground space-y-1 max-w-2xl mx-auto">
            <p>✓ Без комиссии с ваших услуг</p>
            <p>✓ Без медицинской лицензии</p>
            <p>✓ С возможностью продвигать себя везде</p>
          </div>
          <Button size="lg" className="text-lg px-8 py-6 h-auto" onClick={scrollToCTA}>
            👉 Заявить о себе как специалист
          </Button>
        </div>
      </section>

      {/* Shift Focus Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 md:p-12 bg-card/50 backdrop-blur">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Это не ещё один каталог специалистов
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              В Док диалог клиенты приходят не «посмотреть объявления». Они приходят{' '}
              <strong className="text-foreground">выбрать специалиста осознанно</strong> — по подходу, опыту и ощущению доверия.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Именно поэтому здесь ценятся:
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                <span>честные формулировки</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                <span>ясная позиция специалиста</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                <span>понимание своей аудитории</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Client Types Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Какие клиенты уже есть в Док диалог
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Icon name="Sparkles" className="text-primary flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-lg">понимают ценность качественной работы</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Icon name="Target" className="text-primary flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-lg">ищут не «дешево», а <strong>подходящего</strong> специалиста</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Icon name="BookOpen" className="text-primary flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-lg">готовы читать профиль и вникать</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Icon name="Users" className="text-primary flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-lg">хотят долгосрочного контакта, а не разового сеанса</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 md:col-span-2">
              <div className="flex items-start gap-4">
                <Icon name="Shield" className="text-primary flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-lg">ценят безопасность и этику</p>
                </div>
              </div>
            </Card>
          </div>
          <p className="text-xl text-primary font-medium mt-8">
            📌 Это клиенты, с которыми хочется работать.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Что вы получаете, регистрируясь сейчас
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🔍</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Доступ к потоку целевых клиентов</h3>
                  <p className="text-muted-foreground">Люди, которые активно ищут специалиста прямо сейчас</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🧠</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Помощь в упаковке услуг</h3>
                  <p className="text-muted-foreground">Без медицинских рисков и с правильным позиционированием</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📈</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Рост эффективности профиля</h3>
                  <p className="text-muted-foreground">Увеличение отклика на ваши услуги и предложения</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🌐</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Собственная страница</h3>
                  <p className="text-muted-foreground">Профессиональная презентация ваших услуг</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow md:col-span-2">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🚀</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Возможность продвижения</h3>
                  <p className="text-muted-foreground">Внутри экосистемы и за её пределами — вы управляете своим брендом</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* No Commission Section */}
      <section className="container mx-auto px-4 py-20 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Без комиссии
          </h2>
          <Card className="p-8 md:p-12">
            <p className="text-xl md:text-2xl mb-6">
              Док диалог <strong>не берет процент</strong> с ваших услуг. Вы напрямую работаете с клиентами и сами управляете доходом.
            </p>
            <p className="text-lg text-muted-foreground">
              Если у вас нет лендинга — мы создадим страницу под ваши услуги, которую вы сможете продвигать <strong>где угодно</strong>.
            </p>
          </Card>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Что нужно сделать сейчас
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl">👉</div>
                <p className="text-xl">Зарегистрироваться как специалист</p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl">👉</div>
                <p className="text-xl">Создать профиль (5–10 минут)</p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl">👉</div>
                <p className="text-xl">Заявить о себе клиентам, которые уже в системе</p>
              </div>
            </Card>
          </div>
          <p className="text-center text-lg text-primary font-medium mt-8">
            📌 Никаких обязательств. Только возможность занять своё место.
          </p>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Почему важно сделать это сейчас
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Icon name="Clock" className="text-primary flex-shrink-0 mt-1" size={24} />
                <p className="text-lg">клиенты уже выбирают специалистов</p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Icon name="TrendingUp" className="text-primary flex-shrink-0 mt-1" size={24} />
                <p className="text-lg">формируется первая волна доверия</p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Icon name="Eye" className="text-primary flex-shrink-0 mt-1" size={24} />
                <p className="text-lg">ранние профили получают больше внимания</p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Icon name="Star" className="text-primary flex-shrink-0 mt-1" size={24} />
                <p className="text-lg">именно сейчас проще выделиться и занять нишу</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="register-form" className="container mx-auto px-4 py-32 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Клиенты уже ищут. Дайте им возможность найти вас
          </h2>
          <Button size="lg" className="text-xl px-12 py-8 h-auto" onClick={() => window.location.href = '/register'}>
            👉 Заявить о себе в Док диалог
          </Button>
        </div>
      </section>
    </div>
  );
}
