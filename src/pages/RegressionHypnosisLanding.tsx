import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-4">
              Очное обучение в Москве · Группа до 12 человек
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Регрессивный гипноз
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              как прикладной инструмент психотерапии и коучинга
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Очное профессиональное обучение работе с регрессивными состояниями памяти, опыта и перспектив развития личности
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>научный и прикладной подход</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>офлайн-формат в Москве</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>малая группа до 12 человек</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>практика под супервизией</span>
              </div>
            </div>
            <Button size="lg" className="text-lg px-8 py-6 h-auto mt-8" onClick={scrollToCTA}>
              👉 Посмотреть программу и форматы участия
            </Button>
          </div>
        </div>
      </section>

      {/* Why Needed Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Когда рационального анализа недостаточно
          </h2>
          <Card className="p-8 md:p-12 bg-muted/30">
            <p className="text-lg mb-6">
              В работе с людьми специалист регулярно сталкивается с ситуациями, когда:
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Icon name="CircleDot" className="text-primary mt-1 flex-shrink-0" size={20} />
                <p className="text-lg">клиент всё понимает, но не меняется</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CircleDot" className="text-primary mt-1 flex-shrink-0" size={20} />
                <p className="text-lg">инсайт есть, а симптом остаётся</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CircleDot" className="text-primary mt-1 flex-shrink-0" size={20} />
                <p className="text-lg">тело реагирует быстрее, чем мышление</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CircleDot" className="text-primary mt-1 flex-shrink-0" size={20} />
                <p className="text-lg">эмоция возникает без очевидной причины</p>
              </div>
            </div>
            <p className="text-lg mb-4">
              Это связано с тем, что значимая часть опыта хранится <strong>в недекларируемой памяти</strong> — на уровне ощущений, образов и телесных реакций.
            </p>
            <p className="text-lg font-medium">
              Регрессивный гипноз позволяет <strong>организованно и безопасно</strong> работать с этим уровнем.
            </p>
          </Card>
        </div>
      </section>

      {/* What is Regression Hypnosis */}
      <section className="bg-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
              Что мы называем регрессивным гипнозом
            </h2>
            <div className="space-y-8">
              <Card className="p-8 md:p-10">
                <p className="text-lg mb-6">
                  Регрессивный гипноз — это метод работы с изменённым состоянием сознания, в котором внимание клиента направляется:
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <Icon name="ChevronRight" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p>на ранние эпизоды личного опыта</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="ChevronRight" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p>на символические образы бессознательного</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="ChevronRight" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p>на телесные и эмоциональные следы памяти</p>
                  </div>
                </div>
                <p className="text-lg mb-4">С точки зрения науки, речь идёт о:</p>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Icon name="Atom" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p>фокусированной активации памяти</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Atom" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p>работе с ассоциативными сетями</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Atom" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p>реконструкции субъективного опыта</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Atom" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p>переработке эмоционально значимых событий</p>
                  </div>
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
      </section>

      {/* Target Audience */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Кому подходит обучение
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-4">Психологам и психотерапевтам</h3>
              <p className="text-muted-foreground">для углубления работы с травматическим и ранним опытом</p>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-4">Коучам и консультантам</h3>
              <p className="text-muted-foreground">для работы с ограничивающими стратегиями и бессознательными паттернами</p>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-4">Телесным специалистам</h3>
              <p className="text-muted-foreground">для интеграции телесных реакций и психических процессов</p>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-4">Тем, кто осознанно выбирает профессию</h3>
              <p className="text-muted-foreground">и готов обучаться очно, глубоко и ответственно</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
              Практические результаты обучения
            </h2>
            <Card className="p-8 md:p-12">
              <div className="space-y-4">
                {[
                  'Понимать нейрофизиологию и психологию гипнотических состояний',
                  'Проводить регрессивные сессии по чёткой структуре',
                  'Отличать воображение от терапевтически значимого материала',
                  'Сопровождать клиента без навязывания интерпретаций',
                  'Работать с сильными эмоциональными реакциями',
                  'Экологично завершать и интегрировать опыт'
                ].map((result, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={24} />
                    <p className="text-lg">{result}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Format */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Почему офлайн и малая группа
          </h2>
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-primary/10">
            <p className="text-2xl font-semibold mb-8 text-center">
              Регрессивный гипноз невозможно освоить по записям.
            </p>
            <p className="text-lg mb-6">Поэтому обучение проходит:</p>
            <div className="space-y-4">
              {[
                { icon: 'MapPin', text: 'очно в Москве' },
                { icon: 'Users', text: 'в группе не более 12 человек' },
                { icon: 'Handshake', text: 'с живой практикой' },
                { icon: 'FileText', text: 'с разбором реальных случаев' },
                { icon: 'MessageCircle', text: 'с личной обратной связью от преподавателя' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Icon name={item.icon as any} className="text-primary" size={24} />
                  </div>
                  <p className="text-lg font-medium">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="text-lg font-medium mt-8 text-center">
              Это формат, близкий к клиническому обучению, а не к инфобизнесу.
            </p>
          </Card>
        </div>
      </section>

      {/* Program */}
      <section className="bg-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
              Программа курса
            </h2>
            
            <div className="space-y-8">
              {/* Level 1 */}
              <Card className="p-8 md:p-10 border-2 border-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold">
                    УРОВЕНЬ 1
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">БАЗОВЫЙ</h3>
                </div>
                <p className="text-lg mb-6 text-primary font-medium">Фокус: основы метода и безопасность</p>
                <div className="space-y-3 mb-6">
                  {[
                    'Изменённые состояния сознания: нейрофизиология',
                    'Гипноз и внимание',
                    'Типы регрессивных процессов',
                    'Структура сессии',
                    'Контракт и запрос',
                    'Этика и границы работы',
                    'Противопоказания',
                    'Практика в парах'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Icon name="Dot" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-semibold">Результат: Вы уверенно владеете базовым протоколом регрессивной работы.</p>
                </div>
              </Card>

              {/* Level 2 */}
              <Card className="p-8 md:p-10 border-2 border-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold">
                    УРОВЕНЬ 2
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">РАБОТА С ГЛУБИННЫМ ОПЫТОМ</h3>
                </div>
                <p className="text-lg mb-4 text-primary font-medium">Фокус: символическая и метафорическая память</p>
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-lg mb-6">
                  <p className="font-medium">Важно: Прошлые воплощения рассматриваются <strong>как форма работы с бессознательным</strong>, а не как догматическая концепция.</p>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    'Архетипические образы и символы',
                    'Сценарные структуры психики',
                    'Повторяющиеся паттерны поведения',
                    'Травматический и незавершённый опыт',
                    'Перепроживание и интеграция',
                    'Практика сопровождения'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Icon name="Dot" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-semibold">Результат: Вы умеете работать с глубинными сценариями личности.</p>
                </div>
              </Card>

              {/* Level 3 */}
              <Card className="p-8 md:p-10 border-2 border-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold">
                    УРОВЕНЬ 3
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">ПРОГРЕССИЯ</h3>
                </div>
                <p className="text-lg mb-6 text-primary font-medium">Фокус: работа с перспективами и выбором</p>
                <div className="space-y-3 mb-6">
                  {[
                    'Прогрессия как метод работы с мотивацией',
                    'Вероятностные модели будущего',
                    'Работа с целями и ценностями',
                    'Отличие прогрессии от фантазирования',
                    'Этика и ограничения метода',
                    'Практика'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Icon name="Dot" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-semibold">Результат: Вы используете прогрессию как инструмент осознанного выбора и изменений.</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            Кто ведёт обучение
          </h2>
          <Card className="p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-4">Сергей Водопьянов</h3>
            <div className="space-y-2 mb-6">
              <p className="text-lg flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                остеопат
              </p>
              <p className="text-lg flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                регрессолог
              </p>
              <p className="text-lg flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                бизнес-коуч
              </p>
              <p className="text-lg flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                автор экосистемы «Док Диалог»
              </p>
            </div>
            <p className="text-lg text-muted-foreground">
              Практик с междисциплинарным подходом: тело — психика — мышление — опыт.
            </p>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
              Частые вопросы
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-lg font-semibold pr-4">{faq.question}</span>
                    <Icon
                      name="ChevronDown"
                      className={`flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                      size={24}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta-section" className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">
            Если вы ищете метод, а не иллюзию
          </h2>
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-primary/10">
            <p className="text-xl md:text-2xl mb-8">
              Регрессивный гипноз — это инструмент работы с человеческим опытом, а не набор обещаний.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Если вам близок профессиональный, ответственный и практический подход — этот курс для вас.
            </p>
            <Button size="lg" className="text-xl px-12 py-8 h-auto">
              👉 Посмотреть даты и выбрать формат участия
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
