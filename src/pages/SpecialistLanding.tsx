import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/Navigation';
import SchoolsFooter from '@/components/schools/SchoolsFooter';
import { Link } from 'react-router-dom';

export default function SpecialistLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);



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
      <Helmet>
        <title>Для массажистов и специалистов по телу - Док Диалог | Клиенты ждут вас</title>
        <meta 
          name="description" 
          content="Платформа для массажистов и телесных специалистов. Более 1000 клиентов ищут профессионала. Без комиссий, без медлицензии, с помощью в упаковке услуг." 
        />
        <meta 
          name="keywords" 
          content="работа массажистом, найти клиентов массажисту, платформа для массажистов, телесные практики работа, оздоровительный массаж, специалист по телу" 
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://docdialog.su/specialist" />
        <meta property="og:title" content="Для массажистов и специалистов по телу - Док Диалог" />
        <meta 
          property="og:description" 
          content="Платформа для массажистов и телесных специалистов. Более 1000 клиентов ищут профессионала. Без комиссий, без медлицензии." 
        />
        <meta 
          property="og:image" 
          content="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/d6d5415b-8489-4a90-8a46-2c2e14c98c06.jpg" 
        />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://docdialog.su/specialist" />
        <meta property="twitter:title" content="Для массажистов и специалистов по телу - Док Диалог" />
        <meta 
          property="twitter:description" 
          content="Платформа для массажистов и телесных специалистов. Более 1000 клиентов ищут профессионала. Без комиссий, без медлицензии." 
        />
        <meta 
          property="twitter:image" 
          content="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/d6d5415b-8489-4a90-8a46-2c2e14c98c06.jpg" 
        />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Док Диалог" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://docdialog.su/specialist" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Для массажистов и специалистов по телу",
            "description": "Платформа для массажистов и телесных специалистов. Более 1000 клиентов ищут профессионала.",
            "url": "https://docdialog.su/specialist",
            "publisher": {
              "@type": "Organization",
              "name": "Док Диалог",
              "url": "https://docdialog.su"
            },
            "offers": {
              "@type": "Offer",
              "description": "Регистрация для специалистов без комиссий",
              "price": "0",
              "priceCurrency": "RUB"
            }
          })}
        </script>
      </Helmet>
      <Navigation />
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/d6d5415b-8489-4a90-8a46-2c2e14c98c06.jpg" 
            alt="Professional massage consultation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background/95" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8 text-white">
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/20">
              Платформа для специалистов по телу
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] px-2">
              Клиенты ждут массажистов
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light max-w-3xl mx-auto px-4 text-white/90">
              Более 1000 человек ищут массажиста, которому можно доверить своё тело
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm lg:text-base justify-center items-center max-w-3xl mx-auto pt-2 sm:pt-4 px-2">
              {[
                'Без комиссии с ваших услуг',
                'Без медицинской лицензии',
                'С возможностью продвигать себя везде'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-white/20">
                  <Icon name="Check" className="text-white flex-shrink-0" size={16} />
                  <span className="whitespace-nowrap">{item}</span>
                </div>
              ))}
            </div>
            <div className="px-4">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto mt-4 sm:mt-6 lg:mt-8 w-full sm:w-auto bg-white text-black hover:bg-white/90" 
                >
                  👉 Заявить о себе как специалист
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Not Just Another Catalog with Image */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 xl:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="order-2 lg:order-1">
              <Card className="p-5 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-muted/30 to-muted/10 border-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                  Это не ещё один каталог специалистов
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  В Док диалог клиенты приходят не «посмотреть объявления». Они приходят{' '}
                  <strong className="text-foreground">выбрать специалиста осознанно</strong> — по подходу, опыту и ощущению доверия.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
                  Именно поэтому здесь ценятся:
                </p>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    'честные формулировки',
                    'ясная позиция специалиста',
                    'понимание своей аудитории'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-primary/10 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                        <Icon name="Check" className="text-primary" size={18} />
                      </div>
                      <span className="text-base sm:text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/5be3e217-87a1-4b12-9dc2-5e7f1dad49dd.jpg"
                alt="Professional massage therapy session"
                className="rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Client Types */}
      <section className="bg-muted/20 py-12 sm:py-16 lg:py-24 xl:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 lg:mb-12 text-center px-2">
              Какие клиенты уже есть в Док диалог
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: 'Sparkles', text: 'понимают ценность качественной работы' },
                { icon: 'Target', text: 'ищут не «дешево», а подходящего специалиста' },
                { icon: 'BookOpen', text: 'готовы читать профиль и вникать' },
                { icon: 'Users', text: 'хотят долгосрочного контакта, а не разового сеанса' },
                { icon: 'Shield', text: 'ценят безопасность и этику' },
                { icon: 'Heart', text: 'готовы инвестировать в своё здоровье' }
              ].map((item, index) => (
                <Card key={index} className="p-5 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-primary/10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                      <Icon name={item.icon as any} className="text-primary" size={20} />
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed pt-1">{item.text}</p>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
              <Card className="inline-block p-4 sm:p-6 bg-primary/5 border-primary/20">
                <p className="text-base sm:text-lg md:text-xl font-semibold text-primary">
                  📌 Это клиенты, с которыми хочется работать
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits with Image */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 xl:py-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 lg:mb-12 text-center px-2">
            Что вы получаете, регистрируясь сейчас
          </h2>
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            <div className="order-2 lg:order-1">
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
            {[
              {
                emoji: '🔍',
                icon: 'Search',
                title: 'Доступ к потоку целевых клиентов',
                description: 'Люди, которые активно ищут специалиста прямо сейчас'
              },
              {
                emoji: '🧠',
                icon: 'Package',
                title: 'Помощь в упаковке услуг',
                description: 'Без медицинских рисков и с правильным позиционированием'
              },
              {
                emoji: '📈',
                icon: 'TrendingUp',
                title: 'Рост эффективности профиля',
                description: 'Увеличение отклика на ваши услуги и предложения'
              },
              {
                emoji: '💻',
                icon: 'Globe',
                title: 'Личная страница',
                description: 'Которую можно продвигать через соцсети, рекламу, визитки'
              }
            ].map((benefit, index) => (
              <Card key={index} className="p-5 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={benefit.icon} className="text-primary" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">{benefit.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/d29bd863-ca69-478c-a3c8-e107a09bb6fb.jpg"
                alt="Professional wellness specialists training"
                className="rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl w-full h-auto object-cover sticky top-24"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* No Commission with Photo */}
      <section className="bg-muted/20 py-12 sm:py-16 lg:py-24 xl:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/fa79f5c4-01e4-48e8-b436-06fbb44bd69f.jpg"
                  alt="Professional massage specialist"
                  className="rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  Без комиссии
                </h2>
                <Card className="p-5 sm:p-6 md:p-8 lg:p-10 bg-background hover:shadow-xl transition-shadow">
                  <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 leading-relaxed">
                    Док диалог <strong>не берет процент</strong> с ваших услуг. Вы напрямую работаете с клиентами и сами управляете доходом.
                  </p>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Если у вас нет лендинга — мы создадим страницу под ваши услуги, которую вы сможете продвигать <strong>где угодно</strong>.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 xl:py-32">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 lg:mb-12 text-center px-2">
            Частые вопросы
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4 sm:p-5 md:p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors gap-3 sm:gap-4"
                >
                  <span className="text-base sm:text-lg font-semibold pr-2">{faq.question}</span>
                  <Icon
                    name="ChevronDown"
                    className={`flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    size={20}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/20 py-12 sm:py-16 lg:py-24 xl:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 lg:mb-12 text-center px-2">
              Как это работает
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
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
                  <div className="relative mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">{step.number}</span>
                    </div>
                    {index < 2 && (
                      <div className="hidden sm:block absolute top-1/2 left-[60%] w-[80%] h-0.5 bg-primary/20" />
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="register-form" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 xl:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-2 leading-tight">
            Начните привлекать клиентов уже сегодня
          </h2>
          <Card className="p-5 sm:p-6 md:p-10 lg:p-12 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-2">
              Присоединяйтесь к экосистеме профессионалов, которые уже работают с осознанными клиентами
            </p>
            <div className="space-y-4 px-2">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 md:px-12 py-4 sm:py-6 h-auto"
                >
                  🚀 Создать профиль специалиста
                </Button>
              </Link>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Это займет не более 2-х минут
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-muted/30 py-12 sm:py-16 border-t">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
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