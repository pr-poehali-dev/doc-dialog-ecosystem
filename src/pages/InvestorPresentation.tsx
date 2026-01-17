import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ProfessionalFooter from '@/components/professional/ProfessionalFooter';

export default function InvestorPresentation() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { id: 'cover', title: '🚀 Питч-дек', icon: 'Rocket' },
    { id: 'problem', title: '❌ Проблема', icon: 'AlertCircle' },
    { id: 'solution', title: '✅ Решение', icon: 'Lightbulb' },
    { id: 'market', title: '📊 Рынок', icon: 'TrendingUp' },
    { id: 'product', title: '🎯 Продукт', icon: 'Package' },
    { id: 'economics', title: '💰 Экономика', icon: 'DollarSign' },
    { id: 'competition', title: '⚔️ Конкуренты', icon: 'Target' },
    { id: 'traction', title: '📈 Метрики', icon: 'BarChart3' },
    { id: 'team', title: '👥 Команда', icon: 'Users' },
    { id: 'ask', title: '🎯 Инвестиции', icon: 'Coins' },
  ];

  const metrics = [
    { label: 'Массажистов', value: '1000+', color: 'from-blue-600 to-cyan-600' },
    { label: 'Школ', value: '50+', color: 'from-purple-600 to-pink-600' },
    { label: 'Салонов', value: '200+', color: 'from-orange-600 to-red-600' },
    { label: 'MRR', value: '₽350K', color: 'from-green-600 to-emerald-600' },
  ];

  const competitors = [
    {
      name: 'Profi.ru / Яндекс.Услуги',
      model: 'Комиссия 20-30%',
      pros: 'Большая база клиентов',
      cons: 'Высокие комиссии, демпинг, нет обучения',
      threat: 'Средняя'
    },
    {
      name: 'hh.ru / Авито',
      model: 'Объявления',
      pros: 'Известность',
      cons: 'Не нишевые, нет экосистемы',
      threat: 'Низкая'
    },
    {
      name: 'GetCourse / Stepik',
      model: 'Платформа курсов',
      pros: 'Инфраструктура обучения',
      cons: 'Нет профсообщества, нет клиентов',
      threat: 'Низкая'
    },
    {
      name: 'Telegram-каналы школ',
      model: 'Сообщества',
      pros: 'Близость к аудитории',
      cons: 'Нет инструментов монетизации',
      threat: 'Низкая'
    },
  ];

  const unitEconomics = {
    masseur: {
      arpu: 1990,
      cac: 500,
      ltv: 23880,
      payback: 0.25,
      margin: 75
    },
    school: {
      arpu: 5000,
      cac: 2000,
      ltv: 60000,
      payback: 0.4,
      margin: 80
    },
    salon: {
      arpu: 3000,
      cac: 1500,
      ltv: 36000,
      payback: 0.5,
      margin: 70
    }
  };

  const roadmap = [
    {
      quarter: 'Q1 2026',
      goals: ['AI-анамнез v2.0', 'Мобильное приложение', '2000 массажистов'],
      status: 'in-progress'
    },
    {
      quarter: 'Q2 2026',
      goals: ['Видеокурсы на платформе', 'Интеграция платежей', '100 школ'],
      status: 'planned'
    },
    {
      quarter: 'Q3 2026',
      goals: ['Маркетплейс оборудования', 'API для салонов', '500 салонов'],
      status: 'planned'
    },
    {
      quarter: 'Q4 2026',
      goals: ['Выход в СНГ', 'B2B корпоративные программы', 'Break-even'],
      status: 'planned'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navigation />

      {/* Slide Navigation */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {slides.map((slide, index) => (
              <Button
                key={slide.id}
                variant={activeSlide === index ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveSlide(index)}
                className={`whitespace-nowrap ${
                  activeSlide === index 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {slide.title}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Slide 0: Cover */}
          {activeSlide === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <div className="mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                  <Icon name="Heart" size={64} className="text-white" />
                </div>
              </div>
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                DocDialog
              </h1>
              <p className="text-3xl text-slate-300 mb-8">
                Профессиональная экосистема для массажистов
              </p>
              <div className="flex gap-4 justify-center text-lg text-slate-400">
                <span>🇷🇺 Россия</span>
                <span>•</span>
                <span>📅 Январь 2026</span>
                <span>•</span>
                <span>💼 Pre-seed</span>
              </div>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {metrics.map((metric, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                    <div className={`text-4xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-2`}>
                      {metric.value}
                    </div>
                    <div className="text-slate-400 text-sm">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Slide 1: Problem */}
          {activeSlide === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-12 text-center">Болевые точки рынка</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-slate-800 border-red-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl text-white">
                      <Icon name="User" size={32} className="text-red-400" />
                      Для массажистов
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-slate-300">
                    <div className="flex items-start gap-3">
                      <Icon name="X" className="text-red-400 mt-1 shrink-0" />
                      <p><strong>Комиссии 20-30%</strong> на агрегаторах (Profi.ru, Яндекс.Услуги)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="X" className="text-red-400 mt-1 shrink-0" />
                      <p><strong>Нет профессионального роста</strong> — только базовые курсы</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="X" className="text-red-400 mt-1 shrink-0" />
                      <p><strong>Изоляция</strong> — нет сообщества и поддержки</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="X" className="text-red-400 mt-1 shrink-0" />
                      <p><strong>Сложно работать с анамнезом</strong> — МРТ, УЗИ непонятны</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl text-white">
                      <Icon name="GraduationCap" size={32} className="text-orange-400" />
                      Для школ
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-slate-300">
                    <div className="flex items-start gap-3">
                      <Icon name="X" className="text-orange-400 mt-1 shrink-0" />
                      <p><strong>Высокие комиссии</strong> на маркетплейсах (до 30%)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="X" className="text-orange-400 mt-1 shrink-0" />
                      <p><strong>Сложно найти учеников</strong> — холодный трафик дорогой</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="X" className="text-orange-400 mt-1 shrink-0" />
                      <p><strong>Нет инструментов продвижения</strong> — только контекст/таргет</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl text-white">
                      <Icon name="Building" size={32} className="text-purple-400" />
                      Для салонов
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-slate-300">
                    <div className="flex items-start gap-3">
                      <Icon name="X" className="text-purple-400 mt-1 shrink-0" />
                      <p><strong>Текучка кадров</strong> — постоянный поиск массажистов</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="X" className="text-purple-400 mt-1 shrink-0" />
                      <p><strong>Дорогой HR</strong> — hh.ru без гарантий качества</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="X" className="text-purple-400 mt-1 shrink-0" />
                      <p><strong>Нет проверенной базы</strong> специалистов</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl text-white">
                      <Icon name="Heart" size={32} className="text-green-400" />
                      Для клиентов
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-slate-300">
                    <div className="flex items-start gap-3">
                      <Icon name="X" className="text-green-400 mt-1 shrink-0" />
                      <p><strong>Непонятно кому доверить тело</strong> — нет прозрачности</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="X" className="text-green-400 mt-1 shrink-0" />
                      <p><strong>Демпинг на агрегаторах</strong> — качество непредсказуемо</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="X" className="text-green-400 mt-1 shrink-0" />
                      <p><strong>Медзаключения непонятны</strong> — МРТ как иероглифы</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Slide 2: Solution */}
          {activeSlide === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-12 text-center">Наше решение</h2>
              <div className="text-center mb-12">
                <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 mb-8">
                  <p className="text-3xl font-bold">Не маркетплейс. Не агрегатор.</p>
                  <p className="text-5xl font-bold mt-2">Экосистема роста</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-500/30">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <Icon name="Users" size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Для массажистов</h3>
                    <ul className="text-left space-y-2 text-blue-100">
                      <li>✅ Прямой доступ к клиентам (0% комиссия)</li>
                      <li>✅ AI-помощник по анамнезу</li>
                      <li>✅ Каталог курсов (9+ программ)</li>
                      <li>✅ Профессиональное портфолио</li>
                      <li>✅ CRM + база знаний</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-500/30">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <Icon name="GraduationCap" size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Для школ</h3>
                    <ul className="text-left space-y-2 text-purple-100">
                      <li>✅ Доступ к 1000+ массажистов</li>
                      <li>✅ Конструктор лендингов</li>
                      <li>✅ Продвижение в каталоге</li>
                      <li>✅ Аналитика продаж</li>
                      <li>✅ Комиссия только за результат</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-900 to-orange-800 border-orange-500/30">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-orange-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <Icon name="Building" size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Для салонов</h3>
                    <ul className="text-left space-y-2 text-orange-100">
                      <li>✅ База проверенных массажистов</li>
                      <li>✅ Размещение вакансий (500₽/слот)</li>
                      <li>✅ Прямой контакт без посредников</li>
                      <li>✅ Рейтинг работодателей</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-green-900 to-emerald-900 border-green-500/30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                    <Icon name="Sparkles" size={32} />
                    Уникальность: AI + Сообщество
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 text-green-100">
                    <div>
                      <h4 className="font-bold text-lg mb-2">🤖 AI-инструменты:</h4>
                      <ul className="space-y-1">
                        <li>• Расшифровка МРТ/УЗИ простым языком</li>
                        <li>• Консультации по противопоказаниям</li>
                        <li>• Подбор протоколов работы</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">👥 Профсообщество:</h4>
                      <ul className="space-y-1">
                        <li>• Мастермайнды (15,600₽/интенсив)</li>
                        <li>• Закрытые чаты по направлениям</li>
                        <li>• Кейсы и разборы от экспертов</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Slide 3: Market */}
          {activeSlide === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-12 text-center">Объём рынка</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-slate-800 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">🇷🇺 Россия (TAM)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300 space-y-4">
                    <div>
                      <div className="text-4xl font-bold text-blue-400 mb-2">$2.1B</div>
                      <p className="text-sm">Рынок массажных услуг (2025)</p>
                    </div>
                    <div className="border-t border-slate-700 pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Массажистов</span>
                        <strong className="text-white">~80,000</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Школ массажа</span>
                        <strong className="text-white">~2,000</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>SPA-салонов</span>
                        <strong className="text-white">~15,000</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Рост рынка</span>
                        <strong className="text-green-400">+12% год к году</strong>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">🎯 Наша доля (SAM)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300 space-y-4">
                    <div>
                      <div className="text-4xl font-bold text-purple-400 mb-2">$420M</div>
                      <p className="text-sm">Целевой сегмент (20% рынка)</p>
                    </div>
                    <div className="border-t border-slate-700 pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Активных массажистов</span>
                        <strong className="text-white">16,000</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Школ с онлайн</span>
                        <strong className="text-white">400</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Салонов (Москва/СПб)</span>
                        <strong className="text-white">3,000</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>План захвата за 3 года</span>
                        <strong className="text-yellow-400">5% SAM</strong>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">💡 Почему рынок растёт?</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Icon name="TrendingUp" className="text-green-400" />
                        Wellness-тренд
                      </h4>
                      <p className="text-sm text-slate-300">
                        Спрос на превентивное здоровье растёт — массаж из роскоши становится регулярной практикой
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Icon name="Laptop" className="text-blue-400" />
                        Удалённая работа
                      </h4>
                      <p className="text-sm text-slate-300">
                        Офисные работники страдают от сидячего образа — массаж как профилактика болей
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Icon name="Users" className="text-purple-400" />
                        Профессионализация
                      </h4>
                      <p className="text-sm text-slate-300">
                        Клиенты выбирают сертифицированных специалистов, а не "мастеров на дому"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Slide 4: Product */}
          {activeSlide === 4 && (
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-12 text-center">Продуктовая линейка</h2>
              
              <div className="space-y-6">
                <Card className="bg-slate-800 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center gap-3">
                      <Icon name="UserCircle" size={32} className="text-blue-400" />
                      Профиль массажиста (B2C)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-bold text-white mb-2">Бесплатно:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Базовый профиль в каталоге</li>
                          <li>• До 3 фото</li>
                          <li>• Отзывы клиентов</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Pro (1,990₽/мес):</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Топ в каталоге</li>
                          <li>• AI-анамнез (расшифровка МРТ)</li>
                          <li>• CRM-система</li>
                          <li>• База знаний</li>
                          <li>• Промокоды</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Premium (4,990₽/мес):</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Всё из Pro</li>
                          <li>• Конструктор лендинга</li>
                          <li>• Доступ к мастермайндам</li>
                          <li>• Приоритетная поддержка</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center gap-3">
                      <Icon name="GraduationCap" size={32} className="text-purple-400" />
                      Школа массажа (B2B)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-bold text-white mb-2">Старт (5,000₽/мес):</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Профиль в каталоге школ</li>
                          <li>• До 5 курсов</li>
                          <li>• Базовая аналитика</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Рост (15,000₽/мес):</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Неограниченное кол-во курсов</li>
                          <li>• Конструктор лендингов</li>
                          <li>• Топ в каталоге</li>
                          <li>• Email-рассылки</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Про (от 30,000₽/мес):</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Всё из Рост</li>
                          <li>• Платформа видеокурсов</li>
                          <li>• AI-маркетинг</li>
                          <li>• Персональный менеджер</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center gap-3">
                      <Icon name="Building" size={32} className="text-orange-400" />
                      Салон / SPA (B2B)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-white mb-2">Базовый (3,000₽/мес):</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Профиль в каталоге салонов</li>
                          <li>• 1 вакансия бесплатно</li>
                          <li>• Доступ к базе массажистов</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Расширенный (8,000₽/мес):</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• До 5 вакансий</li>
                          <li>• Приоритет в выдаче</li>
                          <li>• Рейтинг работодателя</li>
                          <li>• Аналитика откликов</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-900 to-emerald-900 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center gap-3">
                      <Icon name="Sparkles" size={32} />
                      Допродажи
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 text-white">
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-bold mb-1">Мастермайнды</h4>
                        <p className="text-2xl font-bold text-green-400">15,600₽</p>
                        <p className="text-sm text-slate-300">Интенсив 2 дня</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-bold mb-1">Курсы (комиссия)</h4>
                        <p className="text-2xl font-bold text-green-400">15%</p>
                        <p className="text-sm text-slate-300">От продаж школ</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-bold mb-1">Доп. вакансии</h4>
                        <p className="text-2xl font-bold text-green-400">500₽</p>
                        <p className="text-sm text-slate-300">За слот/месяц</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Slide 5: Economics */}
          {activeSlide === 5 && (
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-12 text-center">Unit-экономика</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center gap-2">
                      <Icon name="User" className="text-blue-400" />
                      Массажист
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-white space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">ARPU (мес)</span>
                      <strong className="text-2xl">{unitEconomics.masseur.arpu}₽</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">CAC</span>
                      <strong className="text-2xl">{unitEconomics.masseur.cac}₽</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">LTV (12 мес)</span>
                      <strong className="text-2xl text-green-400">{unitEconomics.masseur.ltv}₽</strong>
                    </div>
                    <div className="border-t border-blue-700 pt-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Payback</span>
                        <strong className="text-yellow-400">{unitEconomics.masseur.payback} мес</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">LTV/CAC</span>
                        <strong className="text-green-400">{(unitEconomics.masseur.ltv / unitEconomics.masseur.cac).toFixed(1)}x</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Margin</span>
                        <strong className="text-green-400">{unitEconomics.masseur.margin}%</strong>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center gap-2">
                      <Icon name="GraduationCap" className="text-purple-400" />
                      Школа
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-white space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">ARPU (мес)</span>
                      <strong className="text-2xl">{unitEconomics.school.arpu}₽</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">CAC</span>
                      <strong className="text-2xl">{unitEconomics.school.cac}₽</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">LTV (12 мес)</span>
                      <strong className="text-2xl text-green-400">{unitEconomics.school.ltv}₽</strong>
                    </div>
                    <div className="border-t border-purple-700 pt-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Payback</span>
                        <strong className="text-yellow-400">{unitEconomics.school.payback} мес</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">LTV/CAC</span>
                        <strong className="text-green-400">{(unitEconomics.school.ltv / unitEconomics.school.cac).toFixed(1)}x</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Margin</span>
                        <strong className="text-green-400">{unitEconomics.school.margin}%</strong>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-900 to-orange-800 border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center gap-2">
                      <Icon name="Building" className="text-orange-400" />
                      Салон
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-white space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">ARPU (мес)</span>
                      <strong className="text-2xl">{unitEconomics.salon.arpu}₽</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">CAC</span>
                      <strong className="text-2xl">{unitEconomics.salon.cac}₽</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">LTV (12 мес)</span>
                      <strong className="text-2xl text-green-400">{unitEconomics.salon.ltv}₽</strong>
                    </div>
                    <div className="border-t border-orange-700 pt-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Payback</span>
                        <strong className="text-yellow-400">{unitEconomics.salon.payback} мес</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">LTV/CAC</span>
                        <strong className="text-green-400">{(unitEconomics.salon.ltv / unitEconomics.salon.cac).toFixed(1)}x</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Margin</span>
                        <strong className="text-green-400">{unitEconomics.salon.margin}%</strong>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">💰 Прогноз выручки (3 года)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-white">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 px-4">Период</th>
                          <th className="text-right py-3 px-4">Массажисты</th>
                          <th className="text-right py-3 px-4">Школы</th>
                          <th className="text-right py-3 px-4">Салоны</th>
                          <th className="text-right py-3 px-4 text-green-400">MRR</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-300">
                        <tr className="border-b border-slate-700">
                          <td className="py-3 px-4">2026 Q1</td>
                          <td className="text-right">150 × 1,990₽</td>
                          <td className="text-right">20 × 5,000₽</td>
                          <td className="text-right">30 × 3,000₽</td>
                          <td className="text-right font-bold text-white">488K ₽</td>
                        </tr>
                        <tr className="border-b border-slate-700">
                          <td className="py-3 px-4">2026 Q4</td>
                          <td className="text-right">600 × 1,990₽</td>
                          <td className="text-right">50 × 5,000₽</td>
                          <td className="text-right">100 × 3,000₽</td>
                          <td className="text-right font-bold text-white">1.74M ₽</td>
                        </tr>
                        <tr className="border-b border-slate-700">
                          <td className="py-3 px-4">2027 Q4</td>
                          <td className="text-right">2,000 × 1,990₽</td>
                          <td className="text-right">100 × 10,000₽</td>
                          <td className="text-right">300 × 3,000₽</td>
                          <td className="text-right font-bold text-green-400">5.88M ₽</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-bold">2028 Q4</td>
                          <td className="text-right">5,000 × 1,990₽</td>
                          <td className="text-right">200 × 15,000₽</td>
                          <td className="text-right">800 × 3,000₽</td>
                          <td className="text-right font-bold text-green-400 text-xl">15.35M ₽</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Slide 6: Competition */}
          {activeSlide === 6 && (
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-12 text-center">Конкурентный анализ</h2>
              
              <div className="space-y-4 mb-8">
                {competitors.map((comp, index) => (
                  <Card key={index} className="bg-slate-800 border-slate-700">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-5 gap-4 items-center">
                        <div>
                          <h3 className="font-bold text-white text-lg">{comp.name}</h3>
                          <p className="text-sm text-slate-400">{comp.model}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Сильные стороны</p>
                          <p className="text-sm text-green-400">{comp.pros}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-xs text-slate-500 mb-1">Слабые стороны</p>
                          <p className="text-sm text-red-400">{comp.cons}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            comp.threat === 'Высокая' 
                              ? 'bg-red-900 text-red-300' 
                              : comp.threat === 'Средняя'
                              ? 'bg-yellow-900 text-yellow-300'
                              : 'bg-green-900 text-green-300'
                          }`}>
                            {comp.threat} угроза
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">🎯 Наши конкурентные преимущества</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 text-white">
                    <div>
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Icon name="Shield" className="text-blue-400" />
                        Защищённая ниша
                      </h4>
                      <ul className="space-y-2 text-slate-300">
                        <li>✅ Фокус на массажистах (не "все услуги")</li>
                        <li>✅ Экосистема, а не агрегатор</li>
                        <li>✅ AI-инструменты для профессионалов</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Icon name="Zap" className="text-yellow-400" />
                        Сетевой эффект
                      </h4>
                      <ul className="space-y-2 text-slate-300">
                        <li>✅ Больше массажистов → больше школ</li>
                        <li>✅ Больше школ → больше массажистов</li>
                        <li>✅ Сообщество удерживает участников</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Icon name="DollarSign" className="text-green-400" />
                        Честная модель
                      </h4>
                      <ul className="space-y-2 text-slate-300">
                        <li>✅ 0% комиссия за услуги (подписка)</li>
                        <li>✅ Прозрачные тарифы</li>
                        <li>✅ Выгодно всем сторонам</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Icon name="Sparkles" className="text-purple-400" />
                        Технологии
                      </h4>
                      <ul className="space-y-2 text-slate-300">
                        <li>✅ AI-расшифровка МРТ/УЗИ</li>
                        <li>✅ Автоматизация маркетинга</li>
                        <li>✅ Персонализация рекомендаций</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Slide 7: Traction */}
          {activeSlide === 7 && (
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-12 text-center">Текущие метрики</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-slate-800 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">📊 Пользователи</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Всего массажистов</span>
                      <span className="text-3xl font-bold text-blue-400">1,000+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Платных подписок</span>
                      <span className="text-3xl font-bold text-green-400">176</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Школ</span>
                      <span className="text-3xl font-bold text-purple-400">50+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Салонов</span>
                      <span className="text-3xl font-bold text-orange-400">200+</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">💰 Финансы</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">MRR (текущий)</span>
                      <span className="text-3xl font-bold text-green-400">₽350K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Рост MoM</span>
                      <span className="text-3xl font-bold text-yellow-400">+18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Churn Rate</span>
                      <span className="text-3xl font-bold text-blue-400">4.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Runway</span>
                      <span className="text-3xl font-bold text-white">12 мес</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800 border-purple-500/30 mb-8">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">🚀 Roadmap (2026)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {roadmap.map((quarter, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="shrink-0">
                          <div className={`w-3 h-3 rounded-full mt-1 ${
                            quarter.status === 'in-progress' 
                              ? 'bg-yellow-400 animate-pulse' 
                              : 'bg-slate-600'
                          }`}></div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white mb-2">{quarter.quarter}</h4>
                          <ul className="space-y-1 text-slate-300">
                            {quarter.goals.map((goal, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                                {goal}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">🎯 Ключевые достижения</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 text-white">
                    <div className="text-center">
                      <Icon name="Award" size={48} className="text-yellow-400 mx-auto mb-3" />
                      <h4 className="font-bold mb-2">Лидеры ниши</h4>
                      <p className="text-sm text-slate-300">
                        #1 профплатформа для массажистов в РФ
                      </p>
                    </div>
                    <div className="text-center">
                      <Icon name="Rocket" size={48} className="text-blue-400 mx-auto mb-3" />
                      <h4 className="font-bold mb-2">AI-инновации</h4>
                      <p className="text-sm text-slate-300">
                        Первые, кто внедрил расшифровку МРТ для массажистов
                      </p>
                    </div>
                    <div className="text-center">
                      <Icon name="Users" size={48} className="text-green-400 mx-auto mb-3" />
                      <h4 className="font-bold mb-2">Сообщество</h4>
                      <p className="text-sm text-slate-300">
                        Самое активное комьюнити массажистов (DAU 15%)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Slide 8: Team */}
          {activeSlide === 8 && (
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-12 text-center">Команда</h2>
              
              <Card className="bg-slate-800 border-blue-500/30 mb-8">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <Icon name="Users" size={64} className="text-blue-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Команда основателей</h3>
                    <p className="text-slate-300">
                      5 человек с опытом в healthtech, edtech и телесных практиках
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-slate-700/50 rounded-lg p-6 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mx-auto mb-4"></div>
                      <h4 className="font-bold text-white mb-1">CEO / Product</h4>
                      <p className="text-sm text-slate-400 mb-3">10 лет в digital</p>
                      <p className="text-xs text-slate-300">
                        Ex-Яндекс, запустил 2 B2C проекта (exit)
                      </p>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-6 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mx-auto mb-4"></div>
                      <h4 className="font-bold text-white mb-1">CTO / AI</h4>
                      <p className="text-sm text-slate-400 mb-3">8 лет в ML/AI</p>
                      <p className="text-xs text-slate-300">
                        Ex-VK, разработчик AI-моделей для медтеха
                      </p>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-6 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-full mx-auto mb-4"></div>
                      <h4 className="font-bold text-white mb-1">CMO / Growth</h4>
                      <p className="text-sm text-slate-400 mb-3">7 лет в wellness</p>
                      <p className="text-xs text-slate-300">
                        Основатель школы массажа (500+ выпускников)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-900 to-emerald-900 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">🧑‍💼 Советники и менторы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 text-white">
                    <div>
                      <h4 className="font-bold mb-2">Медицинский советник</h4>
                      <p className="text-sm text-slate-300">
                        Врач-реабилитолог, 15+ лет практики, автор 3 методик массажа
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Бизнес-ментор</h4>
                      <p className="text-sm text-slate-300">
                        Ex-партнёр ФРИИ, 5 успешных exits в B2B SaaS
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Tech-ментор</h4>
                      <p className="text-sm text-slate-300">
                        Head of Engineering в крупном edtech (MAU 2M+)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Marketing-советник</h4>
                      <p className="text-sm text-slate-300">
                        CMO wellness-стартапа ($5M ARR за 2 года)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Slide 9: Ask */}
          {activeSlide === 9 && (
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-12 text-center">Инвестиционный запрос</h2>
              
              <Card className="bg-gradient-to-br from-blue-900 to-purple-900 border-blue-500/30 mb-8">
                <CardContent className="p-12 text-center">
                  <Icon name="Coins" size={80} className="text-yellow-400 mx-auto mb-6" />
                  <div className="text-6xl font-bold text-white mb-4">₽30M</div>
                  <p className="text-2xl text-slate-300 mb-8">Pre-seed раунд</p>
                  
                  <div className="grid md:grid-cols-3 gap-6 text-left">
                    <div className="bg-white/10 rounded-lg p-6">
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <Icon name="Share2" className="text-yellow-400" />
                        Доля
                      </h4>
                      <p className="text-3xl font-bold text-yellow-400">15%</p>
                      <p className="text-sm text-slate-300 mt-2">Post-money: ₽200M</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-6">
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <Icon name="Calendar" className="text-green-400" />
                        Runway
                      </h4>
                      <p className="text-3xl font-bold text-green-400">18 мес</p>
                      <p className="text-sm text-slate-300 mt-2">До Series A</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-6">
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <Icon name="TrendingUp" className="text-blue-400" />
                        Цель
                      </h4>
                      <p className="text-3xl font-bold text-blue-400">₽5M MRR</p>
                      <p className="text-sm text-slate-300 mt-2">К концу 2027</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-green-500/30 mb-8">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">💸 Использование средств</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-full bg-slate-700 rounded-full h-8">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-8 rounded-full flex items-center px-4" style={{width: '40%'}}>
                          <span className="text-white font-bold text-sm">Продукт и AI (40%)</span>
                        </div>
                      </div>
                      <span className="text-white font-bold whitespace-nowrap">₽12M</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-full bg-slate-700 rounded-full h-8">
                        <div className="bg-gradient-to-r from-purple-600 to-purple-500 h-8 rounded-full flex items-center px-4" style={{width: '35%'}}>
                          <span className="text-white font-bold text-sm">Маркетинг (35%)</span>
                        </div>
                      </div>
                      <span className="text-white font-bold whitespace-nowrap">₽10.5M</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-full bg-slate-700 rounded-full h-8">
                        <div className="bg-gradient-to-r from-green-600 to-green-500 h-8 rounded-full flex items-center px-4" style={{width: '15%'}}>
                          <span className="text-white font-bold text-sm">Команда (15%)</span>
                        </div>
                      </div>
                      <span className="text-white font-bold whitespace-nowrap">₽4.5M</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-full bg-slate-700 rounded-full h-8">
                        <div className="bg-gradient-to-r from-orange-600 to-orange-500 h-8 rounded-full flex items-center px-4" style={{width: '10%'}}>
                          <span className="text-white font-bold text-sm">Резерв (10%)</span>
                        </div>
                      </div>
                      <span className="text-white font-bold whitespace-nowrap">₽3M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-900 to-emerald-900 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">📈 Прогноз выхода (Exit)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8 text-white">
                    <div>
                      <h4 className="text-lg font-bold mb-4">Сценарий 1: Стратегический Exit</h4>
                      <ul className="space-y-2 text-slate-300">
                        <li>📅 <strong>Когда:</strong> 2028-2029 (3-4 года)</li>
                        <li>💰 <strong>Оценка:</strong> ₽800M - ₽1.2B</li>
                        <li>🏢 <strong>Покупатель:</strong> Яндекс, Сбер, VK</li>
                        <li>📊 <strong>Множитель:</strong> 4x-6x для инвесторов</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-4">Сценарий 2: IPO / Series B+</h4>
                      <ul className="space-y-2 text-slate-300">
                        <li>📅 <strong>Когда:</strong> 2030+ (5+ лет)</li>
                        <li>💰 <strong>Оценка:</strong> ₽2B+</li>
                        <li>🌍 <strong>Экспансия:</strong> СНГ + Европа</li>
                        <li>📊 <strong>Множитель:</strong> 10x+ для инвесторов</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center mt-12">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 inline-block">
                  <h3 className="text-3xl font-bold text-white mb-4">Готовы к диалогу? 🚀</h3>
                  <p className="text-xl text-white/90 mb-6">
                    Свяжитесь с нами для детального обсуждения
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                      <Icon name="Mail" className="mr-2" />
                      invest@dokdialog.ru
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <Icon name="Calendar" className="mr-2" />
                      Запланировать встречу
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-700 shadow-2xl">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
            disabled={activeSlide === 0}
            className="text-white"
          >
            <Icon name="ChevronLeft" />
          </Button>
          <span className="text-white font-medium whitespace-nowrap">
            {activeSlide + 1} / {slides.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1))}
            disabled={activeSlide === slides.length - 1}
            className="text-white"
          >
            <Icon name="ChevronRight" />
          </Button>
        </div>
      </div>

      <ProfessionalFooter />
    </div>
  );
}
