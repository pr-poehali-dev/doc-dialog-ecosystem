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
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-muted/20 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 rounded-full text-xs md:text-sm font-medium">
              Очное обучение в Москве · Группа до 12 человек
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
              Регрессивный гипноз
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light">
              как прикладной инструмент психотерапии и коучинга
            </p>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Очное профессиональное обучение работе с регрессивными состояниями памяти, опыта и перспектив развития личности
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 text-xs md:text-sm lg:text-base text-muted-foreground pt-4">
              {[
                'научный и прикладной подход',
                'офлайн-формат в Москве',
                'малая группа до 12 человек',
                'практика под супервизией'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary flex-shrink-0" size={20} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Button 
              size="lg" 
              className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 h-auto mt-6 md:mt-8 w-full sm:w-auto" 
              onClick={scrollToCTA}
            >
              👉 Посмотреть программу и форматы участия
            </Button>
          </div>
        </div>
      </section>

      {/* Why Needed */}
      <section className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 md:mb-12 text-center px-4">
            Когда рационального анализа недостаточно
          </h2>
          <Card className="p-6 md:p-10 lg:p-12 bg-gradient-to-br from-muted/30 to-muted/10 border-2 hover:shadow-xl transition-shadow">
            <p className="text-base md:text-lg mb-4 md:mb-6">
              В работе с людьми специалист регулярно сталкивается с ситуациями, когда:
            </p>
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              {[
                'клиент всё понимает, но не меняется',
                'инсайт есть, а симптом остаётся',
                'тело реагирует быстрее, чем мышление',
                'эмоция возникает без очевидной причины'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Icon name="CircleDot" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <p className="text-sm md:text-base lg:text-lg">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-base md:text-lg mb-3 md:mb-4">
              Это связано с тем, что значимая часть опыта хранится <strong>в недекларируемой памяти</strong> — на уровне ощущений, образов и телесных реакций.
            </p>
            <p className="text-base md:text-lg font-medium">
              Регрессивный гипноз позволяет <strong>организованно и безопасно</strong> работать с этим уровнем.
            </p>
          </Card>
        </div>
      </section>

      {/* What is */}
      <section className="bg-muted/20 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 md:mb-12 text-center px-4">
              Что мы называем регрессивным гипнозом
            </h2>
            <Card className="p-6 md:p-10 lg:p-12 hover:shadow-xl transition-shadow">
              <p className="text-base md:text-lg mb-4 md:mb-6">
                Регрессивный гипноз — это метод работы с изменённым состоянием сознания, в котором внимание клиента направляется:
              </p>
              <div className="space-y-3 mb-6 md:mb-8">
                {[
                  'на ранние эпизоды личного опыта',
                  'на символические образы бессознательного',
                  'на телесные и эмоциональные следы памяти'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Icon name="ChevronRight" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p className="text-sm md:text-base">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-base md:text-lg mb-3 md:mb-4">С точки зрения науки, речь идёт о:</p>
              <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                {[
                  'фокусированной активации памяти',
                  'работе с ассоциативными сетями',
                  'реконструкции субъективного опыта',
                  'переработке эмоционально значимых событий'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Icon name="Atom" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p className="text-sm md:text-base">{item}</p>
                  </div>
                ))}
              </div>
              <div className="bg-primary/10 p-4 md:p-6 rounded-lg">
                <p className="text-base md:text-lg font-semibold text-center">
                  Мы не обучаем "вере" — мы обучаем методу.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 md:mb-12 text-center px-4">
            Кому подходит обучение
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {[
              { title: 'Психологам и психотерапевтам', desc: 'для углубления работы с травматическим и ранним опытом' },
              { title: 'Коучам и консультантам', desc: 'для работы с ограничивающими стратегиями и бессознательными паттернами' },
              { title: 'Телесным специалистам', desc: 'для интеграции телесных реакций и психических процессов' },
              { title: 'Тем, кто осознанно выбирает профессию', desc: 'и готов обучаться очно, глубоко и ответственно' }
            ].map((item, idx) => (
              <Card key={idx} className="p-5 md:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">{item.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-muted/20 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 md:mb-12 text-center px-4">
              Практические результаты обучения
            </h2>
            <Card className="p-6 md:p-10 lg:p-12 hover:shadow-xl transition-shadow">
              <div className="space-y-3 md:space-y-4">
                {[
                  'Понимать нейрофизиологию и психологию гипнотических состояний',
                  'Проводить регрессивные сессии по чёткой структуре',
                  'Отличать воображение от терапевтически значимого материала',
                  'Сопровождать клиента без навязывания интерпретаций',
                  'Работать с сильными эмоциональными реакциями',
                  'Экологично завершать и интегрировать опыт'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 md:gap-4">
                    <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={24} />
                    <p className="text-sm md:text-base lg:text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Format */}
      <section className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 md:mb-12 text-center px-4">
            Почему офлайн и малая группа
          </h2>
          <Card className="p-6 md:p-10 lg:p-12 bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-xl transition-shadow">
            <p className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-center">
              Регрессивный гипноз невозможно освоить по записям.
            </p>
            <p className="text-base md:text-lg mb-4 md:mb-6">Поэтому обучение проходит:</p>
            <div className="space-y-3 md:space-y-4">
              {[
                { icon: 'MapPin', text: 'очно в Москве' },
                { icon: 'Users', text: 'в группе не более 12 человек' },
                { icon: 'Handshake', text: 'с живой практикой' },
                { icon: 'FileText', text: 'с разбором реальных случаев' },
                { icon: 'MessageCircle', text: 'с личной обратной связью от преподавателя' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 md:gap-4">
                  <div className="bg-primary/20 p-2 rounded-lg flex-shrink-0">
                    <Icon name={item.icon as any} className="text-primary" size={24} />
                  </div>
                  <p className="text-sm md:text-base lg:text-lg font-medium">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="text-base md:text-lg font-medium mt-6 md:mt-8 text-center">
              Это формат, близкий к клиническому обучению, а не к инфобизнесу.
            </p>
          </Card>
        </div>
      </section>

      {/* Program - 3 Levels */}
      <section className="bg-muted/20 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-12 md:mb-16 text-center px-4">
              Программа курса
            </h2>
            
            <div className="space-y-6 md:space-y-8">
              {/* Level 1 */}
              <Card className="p-6 md:p-8 lg:p-10 border-2 border-primary/20 hover:shadow-xl transition-shadow">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 md:mb-6">
                  <div className="bg-primary text-primary-foreground px-3 md:px-4 py-1.5 md:py-2 rounded-full font-bold text-sm md:text-base">
                    УРОВЕНЬ 1
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">БАЗОВЫЙ</h3>
                </div>
                <p className="text-base md:text-lg mb-4 md:mb-6 text-primary font-medium">Фокус: основы метода и безопасность</p>
                <div className="grid sm:grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
                  {[
                    'Изменённые состояния сознания: нейрофизиология',
                    'Гипноз и внимание',
                    'Типы регрессивных процессов',
                    'Структура сессии',
                    'Контракт и запрос',
                    'Этика и границы работы',
                    'Противопоказания',
                    'Практика в парах'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Icon name="Dot" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <p className="text-sm md:text-base">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-primary/10 p-3 md:p-4 rounded-lg">
                  <p className="text-sm md:text-base font-semibold">Результат: Вы уверенно владеете базовым протоколом регрессивной работы.</p>
                </div>
              </Card>

              {/* Level 2 */}
              <Card className="p-6 md:p-8 lg:p-10 border-2 border-primary/20 hover:shadow-xl transition-shadow">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 md:mb-6">
                  <div className="bg-primary text-primary-foreground px-3 md:px-4 py-1.5 md:py-2 rounded-full font-bold text-sm md:text-base">
                    УРОВЕНЬ 2
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">РАБОТА С ГЛУБИННЫМ ОПЫТОМ</h3>
                </div>
                <p className="text-base md:text-lg mb-3 md:mb-4 text-primary font-medium">Фокус: символическая и метафорическая память</p>
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3 md:p-4 rounded-lg mb-4 md:mb-6">
                  <p className="text-sm md:text-base font-medium">Важно: Прошлые воплощения рассматриваются <strong>как форма работы с бессознательным</strong>, а не как догматическая концепция.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
                  {[
                    'Архетипические образы и символы',
                    'Сценарные структуры психики',
                    'Повторяющиеся паттерны поведения',
                    'Травматический и незавершённый опыт',
                    'Перепроживание и интеграция',
                    'Практика сопровождения'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Icon name="Dot" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <p className="text-sm md:text-base">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-primary/10 p-3 md:p-4 rounded-lg">
                  <p className="text-sm md:text-base font-semibold">Результат: Вы умеете работать с глубинными сценариями личности.</p>
                </div>
              </Card>

              {/* Level 3 */}
              <Card className="p-6 md:p-8 lg:p-10 border-2 border-primary/20 hover:shadow-xl transition-shadow">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 md:mb-6">
                  <div className="bg-primary text-primary-foreground px-3 md:px-4 py-1.5 md:py-2 rounded-full font-bold text-sm md:text-base">
                    УРОВЕНЬ 3
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">ПРОГРЕССИЯ</h3>
                </div>
                <p className="text-base md:text-lg mb-4 md:mb-6 text-primary font-medium">Фокус: работа с перспективами и выбором</p>
                <div className="grid sm:grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
                  {[
                    'Прогрессия как метод работы с мотивацией',
                    'Вероятностные модели будущего',
                    'Работа с целями и ценностями',
                    'Отличие прогрессии от фантазирования',
                    'Этика и ограничения метода',
                    'Практика'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Icon name="Dot" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <p className="text-sm md:text-base">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-primary/10 p-3 md:p-4 rounded-lg">
                  <p className="text-sm md:text-base font-semibold">Результат: Вы используете прогрессию как инструмент осознанного выбора и изменений.</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher */}
      <section className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 md:mb-12 text-center px-4">
            Кто ведёт обучение
          </h2>
          <Card className="p-6 md:p-10 lg:p-12 hover:shadow-xl transition-shadow">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Сергей Водопьянов</h3>
            <div className="space-y-2 mb-4 md:mb-6">
              {[
                'остеопат',
                'регрессолог',
                'бизнес-коуч',
                'автор экосистемы «Док Диалог»'
              ].map((item, idx) => (
                <p key={idx} className="text-base md:text-lg flex items-center gap-2">
                  <Icon name="Check" className="text-primary flex-shrink-0" size={20} />
                  {item}
                </p>
              ))}
            </div>
            <p className="text-base md:text-lg text-muted-foreground">
              Практик с междисциплинарным подходом: тело — психика — мышление — опыт.
            </p>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/20 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 md:mb-12 text-center px-4">
              Частые вопросы
            </h2>
            <div className="space-y-3 md:space-y-4">
              {faqs.map((faq, idx) => (
                <Card key={idx} className="overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-5 md:p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors gap-4"
                  >
                    <span className="text-base md:text-lg font-semibold pr-2">{faq.question}</span>
                    <Icon
                      name="ChevronDown"
                      className={`flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                      size={24}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      <p className="text-sm md:text-base text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta-section" className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold px-4">
            Если вы ищете метод, а не иллюзию
          </h2>
          <Card className="p-6 md:p-10 lg:p-12 bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-xl transition-shadow">
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8">
              Регрессивный гипноз — это инструмент работы с человеческим опытом, а не набор обещаний.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
              Если вам близок профессиональный, ответственный и практический подход — этот курс для вас.
            </p>
            <Button size="lg" className="text-base md:text-xl px-8 md:px-12 py-6 md:py-8 h-auto w-full sm:w-auto">
              👉 Посмотреть даты и выбрать формат участия
            </Button>
          </Card>
        </div>
      </section>

      <SchoolsFooter />
    </div>
  );
}
