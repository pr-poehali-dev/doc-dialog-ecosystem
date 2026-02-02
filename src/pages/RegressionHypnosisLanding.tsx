import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import SchoolsFooter from '@/components/schools/SchoolsFooter';

export default function RegressionHypnosisLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToCTA = () => {
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqs = [
    {
      question: 'Это научно?',
      answer: 'Метод основан на психологии, нейрофизиологии и практике работы с памятью.'
    },
    {
      question: 'Подойдёт ли без опыта гипноза?',
      answer: 'Да. Базовый уровень выстраивает фундамент.'
    },
    {
      question: 'Будет ли практика?',
      answer: 'Да. Практика — ключевая часть курса.'
    },
    {
      question: 'Онлайн нельзя?',
      answer: 'Нет. Этот курс проводится только очно.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden h-[85vh] min-h-[600px] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/9660d065-67cd-46af-979d-48206fcf4b83.jpg" 
            alt="Hypnotherapy environment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background/95" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 text-white">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
              Очное обучение в Москве · Группа до 12 человек
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Регрессивный гипноз
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-light">
              как прикладной инструмент психотерапии и коучинга
            </p>
            <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4 text-white/90">
              Очное профессиональное обучение работе с регрессивными состояниями памяти, опыта и перспектив развития личности
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 text-sm lg:text-base pt-4">
              {[
                'научный и прикладной подход',
                'офлайн-формат в Москве',
                'малая группа до 12 человек',
                'практика под супервизией'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <Icon name="Check" className="text-white flex-shrink-0" size={20} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 h-auto mt-8 w-full sm:w-auto bg-white text-black hover:bg-white/90" 
              onClick={scrollToCTA}
            >
              👉 Посмотреть программу и форматы участия
            </Button>
          </div>
        </div>
      </section>

      {/* Why Needed with Image */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
            Когда рационального анализа недостаточно
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <Card className="p-8 lg:p-10 bg-gradient-to-br from-muted/30 to-muted/10 border-2 hover:shadow-xl transition-shadow">
                <p className="text-lg mb-6">
                  В работе с людьми специалист регулярно сталкивается с ситуациями, когда:
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    'клиент всё понимает, но не меняется',
                    'инсайт есть, а симптом остаётся',
                    'тело реагирует быстрее, чем мышление',
                    'эмоция возникает без очевидной причины'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Icon name="CircleDot" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <p className="text-base lg:text-lg">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-lg mb-4">
                  Это связано с тем, что значимая часть опыта хранится <strong>в недекларируемой памяти</strong> — на уровне ощущений, образов и телесных реакций.
                </p>
                <p className="text-lg font-medium">
                  Регрессивный гипноз позволяет <strong>организованно и безопасно</strong> работать с этим уровнем.
                </p>
              </Card>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/2a657a80-7508-44bf-88ad-109409602441.jpg"
                alt="Professional therapy session"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is with Image */}
      <section className="bg-muted/20 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
              Что мы называем регрессивным гипнозом
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/8c816ef4-e8b0-4c2e-bd02-2297da99fa7b.jpg"
                  alt="Mindfulness practice"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
              <div>
                <Card className="p-8 lg:p-10 hover:shadow-xl transition-shadow">
                  <p className="text-lg mb-6">
                    Регрессивный гипноз — это метод работы с изменённым состоянием сознания, в котором внимание клиента направляется:
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      'на ранние эпизоды личного опыта',
                      'на символические образы бессознательного',
                      'на телесные и эмоциональные следы памяти'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Icon name="ChevronRight" className="text-primary mt-1 flex-shrink-0" size={20} />
                        <p className="text-base">{item}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-lg mb-4">С точки зрения науки, речь идёт о:</p>
                  <div className="grid gap-3 mb-8">
                    {[
                      'фокусированной активации памяти',
                      'работе с ассоциативными сетями',
                      'реконструкции субъективного опыта',
                      'переработке эмоционально значимых событий'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Icon name="Atom" className="text-primary mt-1 flex-shrink-0" size={20} />
                        <p className="text-base">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <p className="text-lg font-semibold text-center">
                      Мы не обучаем "вере" — мы обучаем методу.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
            Кому подходит обучение
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Психологам и психотерапевтам', desc: 'для углубления работы с травматическим и ранним опытом' },
              { title: 'Коучам и консультантам', desc: 'для работы с ограничивающими стратегиями и бессознательными паттернами' },
              { title: 'Телесным специалистам', desc: 'для интеграции телесных реакций и психических процессов' },
              { title: 'Тем, кто осознанно выбирает профессию', desc: 'и готов обучаться очно, глубоко и ответственно' }
            ].map((item, idx) => (
              <Card key={idx} className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-base text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results with Training Image */}
      <section className="bg-muted/20 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
              Чему вы научитесь
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-4">
                  {[
                    { icon: 'Target', text: 'Проводить регрессивные сеансы с пониманием механизма' },
                    { icon: 'Shield', text: 'Работать с сопротивлением, возрастной и темпоральной ориентацией' },
                    { icon: 'Heart', text: 'Различать психологический и физиологический эффект' },
                    { icon: 'Users', text: 'Интегрировать метод в вашу практику (психотерапия, коучинг, телесная работа)' },
                    { icon: 'BookOpen', text: 'Работать в рамках этической и научно обоснованной модели' }
                  ].map((item, idx) => (
                    <Card key={idx} className="p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name={item.icon} className="text-primary" size={24} />
                        </div>
                        <p className="text-lg pt-2">{item.text}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/7375949b-33b9-4231-befa-f2dae0274abc.jpg"
                  alt="Professional training"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs with Images */}
      <section id="cta-section" className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Программы обучения
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Три уровня профессионального мастерства — от базовых навыков до супервизии
            </p>
          </div>

          <div className="space-y-8">
            {/* Level 1 - Basic */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="grid lg:grid-cols-5 gap-0">
                <div className="lg:col-span-2">
                  <img 
                    src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/8c816ef4-e8b0-4c2e-bd02-2297da99fa7b.jpg"
                    alt="Basic level training"
                    className="w-full h-full object-cover min-h-[250px]"
                  />
                </div>
                <div className="lg:col-span-3 p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">Базовый уровень</h3>
                  </div>
                  <p className="text-muted-foreground text-lg mb-6">
                    Введение в метод, базовая теория, первичные навыки ведения
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      'Теория изменённых состояний сознания',
                      'Индукции, углубления, выходы',
                      'Работа с возрастной регрессией',
                      'Техники безопасности',
                      'Практика под супервизией (триады)'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                        <p className="text-base">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 items-center pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Calendar" size={18} />
                      <span className="font-medium">5 дней очно</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Users" size={18} />
                      <span className="font-medium">до 12 человек</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="MapPin" size={18} />
                      <span className="font-medium">Москва</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Level 2 - Advanced */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="grid lg:grid-cols-5 gap-0">
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <img 
                    src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/923a88ba-36e1-47a0-9720-17f8a1574b98.jpg"
                    alt="Advanced level training"
                    className="w-full h-full object-cover min-h-[250px]"
                  />
                </div>
                <div className="lg:col-span-3 p-8 lg:p-10 order-1 lg:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">Продвинутый уровень</h3>
                  </div>
                  <p className="text-muted-foreground text-lg mb-6">
                    Расширение инструментария, сложные случаи, интеграция с другими методами
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      'Работа с травматическими воспоминаниями',
                      'Перспективная регрессия (проектирование будущего)',
                      'Техники самогипноза и якорения',
                      'Работа с метафорами и символическими образами',
                      'Интеграция с коучингом, телесной работой, психотерапией'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                        <p className="text-base">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4 rounded-lg mb-6">
                    <p className="text-sm font-medium">
                      ⚠️ Требуется прохождение базового уровня или эквивалентный опыт
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 items-center pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Calendar" size={18} />
                      <span className="font-medium">5 дней очно</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Users" size={18} />
                      <span className="font-medium">до 10 человек</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="MapPin" size={18} />
                      <span className="font-medium">Москва</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Level 3 - Supervision */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-primary/20">
              <div className="grid lg:grid-cols-5 gap-0">
                <div className="lg:col-span-2">
                  <img 
                    src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/71f3d5f6-2ea6-426b-ba03-2401cbc13c22.jpg"
                    alt="Supervision level training"
                    className="w-full h-full object-cover min-h-[250px]"
                  />
                </div>
                <div className="lg:col-span-3 p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">Супервизия и мастерство</h3>
                  </div>
                  <p className="text-muted-foreground text-lg mb-6">
                    Разбор реальных кейсов, сложные ситуации, профессиональная поддержка
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      'Разбор записей ваших сеансов',
                      'Работа со "сложными" клиентами',
                      'Тупики, сопротивления, этические дилеммы',
                      'Персональные вопросы и точки роста',
                      'Групповая и индивидуальная супервизия'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                        <p className="text-base">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg mb-6">
                    <p className="text-sm font-medium">
                      🎯 Только для специалистов с опытом работы в регрессивном гипнозе
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 items-center pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Calendar" size={18} />
                      <span className="font-medium">3 дня очно</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Users" size={18} />
                      <span className="font-medium">до 8 человек</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="MapPin" size={18} />
                      <span className="font-medium">Москва</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/20 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
              Как проходит обучение
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: 'Presentation',
                  title: 'Теория',
                  desc: 'Лекции, разборы, научное обоснование — без эзотерики и мистификации'
                },
                {
                  icon: 'Users',
                  title: 'Практика',
                  desc: 'Работа в триадах, демонстрации, отработка в парах и малых группах'
                },
                {
                  icon: 'MessageCircle',
                  title: 'Обратная связь',
                  desc: 'Супервизия, разбор, поддержка — всё под контролем опытного ведущего'
                }
              ].map((item, idx) => (
                <Card key={idx} className="p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Icon name={item.icon} className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Author/Trainer */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
            Ведущий
          </h2>
          <Card className="p-8 md:p-12 hover:shadow-xl transition-shadow">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">Опытный специалист с научным подходом</h3>
              <div className="space-y-4">
                {[
                  'Практика регрессивного гипноза более 12 лет',
                  'Обучение и супервизия специалистов с 2015 года',
                  'Автор методических материалов и программ',
                  'Работа в рамках доказательного подхода'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Icon name="Award" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p className="text-base md:text-lg">{item}</p>
                  </div>
                ))}
              </div>
              <div className="bg-muted p-6 rounded-lg mt-6">
                <p className="text-base md:text-lg italic">
                  "Я обучаю тому, что работает. Без мистики, без обещаний чудес — только практика, метод и понимание механизма."
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/20 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
              Частые вопросы
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <Card 
                  key={idx} 
                  className="p-6 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold mb-2">{faq.question}</h3>
                      {openFaq === idx && (
                        <p className="text-muted-foreground mt-3">{faq.answer}</p>
                      )}
                    </div>
                    <Icon 
                      name={openFaq === idx ? "ChevronUp" : "ChevronDown"} 
                      className="text-primary flex-shrink-0" 
                      size={24} 
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <Card className="p-10 md:p-16 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Готовы начать обучение?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Оставьте заявку, и мы свяжемся с вами для уточнения деталей и выбора программы
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 h-auto">
                Оставить заявку
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
                Задать вопрос
              </Button>
            </div>
            <div className="mt-8 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                📧 info@docdialog.su · 📱 +7 (999) 123-45-67 · 📍 Москва, ЦАО
              </p>
            </div>
          </Card>
        </div>
      </section>

      <SchoolsFooter />
    </div>
  );
}
