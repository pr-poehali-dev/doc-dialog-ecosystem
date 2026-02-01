import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import SchoolsFooter from '@/components/schools/SchoolsFooter';

export default function SpecialistLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToCTA = () => {
    document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqs = [
    {
      question: 'Нужна ли мне медицинская лицензия?',
      answer: 'Нет. Док диалог создан для специалистов, работающих в формате оздоровительных услуг. Мы помогаем правильно сформулировать предложение без медицинских рисков.'
    },
    {
      question: 'Берёте ли вы комиссию?',
      answer: 'Нет, мы не берём процент с ваших услуг. Вы работаете с клиентами напрямую.'
    },
    {
      question: 'Могу ли я продвигать свою страницу отдельно?',
      answer: 'Да. Ваша страница — это независимый инструмент, который вы можете использовать где угодно: в соцсетях, рекламе, визитках.'
    },
    {
      question: 'Сколько времени займёт создание профиля?',
      answer: 'Базовый профиль можно создать за 15-20 минут. Полноценная проработка с описанием услуг и подходов — около часа.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-xs md:text-sm font-medium mb-2 md:mb-4">
              Платформа для профессионалов в сфере здоровья и тела
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]">
              В Док диалог вас уже ждут клиенты
            </h1>
            <p className="text-lg md:text-2xl lg:text-3xl text-muted-foreground font-light max-w-3xl mx-auto px-4">
              Более 1000 человек ищут массажиста, которому можно доверить своё тело
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 text-sm md:text-base text-muted-foreground justify-center items-center max-w-2xl mx-auto pt-2 md:pt-4 px-4">
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary flex-shrink-0" size={20} />
                <span>Без комиссии с ваших услуг</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary flex-shrink-0" size={20} />
                <span>Без медицинской лицензии</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary flex-shrink-0" size={20} />
                <span>С возможностью продвигать себя везде</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="text-base md:text-lg px-6 md:px-10 py-5 md:py-7 h-auto mt-4 md:mt-8 w-full sm:w-auto" 
              onClick={scrollToCTA}
            >
              👉 Заявить о себе как специалист
            </Button>
          </div>
        </div>
      </section>

      {/* Not Just Another Catalog */}
      <section className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 md:p-10 lg:p-12 bg-gradient-to-br from-muted/30 to-muted/10 border-2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              Это не ещё один каталог специалистов
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              В Док диалог клиенты приходят не «посмотреть объявления». Они приходят{' '}
              <strong className="text-foreground">выбрать специалиста осознанно</strong> — по подходу, опыту и ощущению доверия.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
              Именно поэтому здесь ценятся:
            </p>
            <div className="space-y-3 md:space-y-4">
              {[
                'честные формулировки',
                'ясная позиция специалиста',
                'понимание своей аудитории'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                    <Icon name="Check" className="text-primary" size={18} />
                  </div>
                  <span className="text-base md:text-lg">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Client Types */}
      <section className="bg-muted/20 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 md:mb-12 text-center px-4">
              Какие клиенты уже есть в Док диалог
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: 'Sparkles', text: 'понимают ценность качественной работы' },
                { icon: 'Target', text: 'ищут не «дешево», а подходящего специалиста' },
                { icon: 'BookOpen', text: 'готовы читать профиль и вникать' },
                { icon: 'Users', text: 'хотят долгосрочного контакта, а не разового сеанса' },
                { icon: 'Shield', text: 'ценят безопасность и этику' },
                { icon: 'Heart', text: 'готовы инвестировать в своё здоровье' }
              ].map((item, index) => (
                <Card key={index} className="p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-primary/10 p-2 md:p-2.5 rounded-lg flex-shrink-0">
                      <Icon name={item.icon as any} className="text-primary" size={20} />
                    </div>
                    <p className="text-sm md:text-base leading-relaxed pt-1">{item.text}</p>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-8 md:mt-12 text-center">
              <Card className="inline-block p-4 md:p-6 bg-primary/5 border-primary/20">
                <p className="text-lg md:text-xl font-semibold text-primary">
                  📌 Это клиенты, с которыми хочется работать
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 md:mb-12 lg:mb-16 text-center px-4">
            Что вы получаете, регистрируясь сейчас
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {[
              {
                emoji: '🔍',
                title: 'Доступ к потоку целевых клиентов',
                description: 'Люди, которые активно ищут специалиста прямо сейчас'
              },
              {
                emoji: '🧠',
                title: 'Помощь в упаковке услуг',
                description: 'Без медицинских рисков и с правильным позиционированием'
              },
              {
                emoji: '📈',
                title: 'Рост эффективности профиля',
                description: 'Увеличение отклика на ваши услуги и предложения'
              },
              {
                emoji: '🌐',
                title: 'Собственная страница',
                description: 'Профессиональная презентация ваших услуг'
              },
              {
                emoji: '🚀',
                title: 'Возможность продвижения',
                description: 'Внутри экосистемы и за её пределами — вы управляете своим брендом',
                fullWidth: true
              }
            ].map((benefit, index) => (
              <Card 
                key={index} 
                className={`p-5 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${benefit.fullWidth ? 'sm:col-span-2' : ''}`}
              >
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="text-3xl md:text-4xl flex-shrink-0">{benefit.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base md:text-lg lg:text-xl mb-2">{benefit.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* No Commission */}
      <section className="bg-gradient-to-b from-primary/5 to-primary/10 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8">
              Без комиссии
            </h2>
            <Card className="p-6 md:p-10 lg:p-12 bg-background/80 backdrop-blur">
              <p className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 leading-relaxed">
                Док диалог <strong>не берет процент</strong> с ваших услуг. Вы напрямую работаете с клиентами и сами управляете доходом.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Если у вас нет лендинга — мы создадим страницу под ваши услуги, которую вы сможете продвигать <strong>где угодно</strong>.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 md:mb-12 text-center px-4">
            Частые вопросы
          </h2>
          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 md:p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors gap-4"
                >
                  <span className="text-base md:text-lg font-semibold pr-2">{faq.question}</span>
                  <Icon
                    name="ChevronDown"
                    className={`flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/20 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 md:mb-12 lg:mb-16 text-center px-4">
              Как это работает
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  number: '1',
                  title: 'Регистрация',
                  description: 'Заполните базовую информацию о себе и своих услугах'
                },
                {
                  number: '2',
                  title: 'Создание профиля',
                  description: 'Опишите свой подход, методы работы и целевую аудиторию'
                },
                {
                  number: '3',
                  title: 'Получение клиентов',
                  description: 'Клиенты находят вас через поиск и начинают обращаться'
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-4 md:mb-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl md:text-3xl font-bold text-primary">{step.number}</span>
                    </div>
                    {index < 2 && (
                      <div className="hidden sm:block absolute top-1/2 left-[60%] w-[80%] h-0.5 bg-primary/20" />
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{step.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="register-form" className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold px-4 leading-tight">
            Начните привлекать клиентов уже сегодня
          </h2>
          <Card className="p-6 md:p-10 lg:p-12 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              Присоединяйтесь к экосистеме профессионалов, которые уже работают с осознанными клиентами
            </p>
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-base md:text-lg px-8 md:px-12 py-5 md:py-7 h-auto text-primary-foreground"
              >
                🚀 Создать профиль специалиста
              </Button>
              <p className="text-xs md:text-sm text-muted-foreground">
                Это займёт всего 15-20 минут
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-muted/30 py-12 md:py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6 md:gap-8 text-center">
              {[
                { number: '1000+', label: 'активных клиентов' },
                { number: '150+', label: 'профессионалов' },
                { number: '0%', label: 'комиссия' }
              ].map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SchoolsFooter />
    </div>
  );
}