import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface InvestorSlideContentProps {
  activeSlide: number;
  metrics: Array<{ label: string; value: string; color: string }>;
  competitors: Array<{
    name: string;
    model: string;
    pros: string;
    cons: string;
    threat: string;
  }>;
  unitEconomics: {
    masseur: { arpu: number; cac: number; ltv: number; payback: number; margin: number };
    school: { arpu: number; cac: number; ltv: number; payback: number; margin: number };
    salon: { arpu: number; cac: number; ltv: number; payback: number; margin: number };
  };
  roadmap: Array<{
    quarter: string;
    goals: string[];
    status: string;
  }>;
}

export default function InvestorSlideContent({
  activeSlide,
  metrics,
  competitors,
  unitEconomics,
  roadmap,
}: InvestorSlideContentProps) {
  return (
    <>
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
                  <p><strong>Нет прямой связи</strong> со студентами после окончания</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="X" className="text-orange-400 mt-1 shrink-0" />
                  <p><strong>Низкий ROMI</strong> на рекламу из-за разрозненности</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="X" className="text-orange-400 mt-1 shrink-0" />
                  <p><strong>Нет репутационных систем</strong> для выпускников</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800 border-purple-500/30 mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-white">
                <Icon name="Building2" size={32} className="text-purple-400" />
                Для салонов
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-300">
              <div className="flex items-start gap-3">
                <Icon name="X" className="text-purple-400 mt-1 shrink-0" />
                <p><strong>Трудно найти квалифицированных специалистов</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="X" className="text-purple-400 mt-1 shrink-0" />
                <p><strong>Нет единой базы</strong> сертифицированных массажистов</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="X" className="text-purple-400 mt-1 shrink-0" />
                <p><strong>Высокая текучка кадров</strong> — до 40% в год</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Slide 2: Solution */}
      {activeSlide === 2 && (
        <div className="animate-fade-in">
          <h2 className="text-5xl font-bold mb-12 text-center">Наше решение</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Icon name="Briefcase" size={28} className="text-blue-400" />
                  Биржа труда
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <p className="mb-4">Профессиональный маркетплейс для массажистов</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Комиссия <strong>всего 7%</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Верификация специалистов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Рейтинговая система</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Icon name="GraduationCap" size={28} className="text-purple-400" />
                  Образование
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <p className="mb-4">Платформа для профессионального развития</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Онлайн-курсы от топ-школ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Сертификация специалистов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>База знаний и техник</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Icon name="Brain" size={28} className="text-green-400" />
                  AI-анамнез
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <p className="mb-4">Умный помощник для работы с клиентами</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Расшифровка МРТ/УЗИ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Рекомендации техник</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Цифровая карта клиента</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">Экосистемная модель = Network Effect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-slate-300 space-y-4">
                <p className="text-lg">Больше массажистов → Больше школ → Лучшие курсы → Больше сертифицированных специалистов → Больше салонов</p>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <Icon name="Users" size={32} className="text-blue-400" />
                  <Icon name="ArrowRight" size={24} className="text-slate-500" />
                  <Icon name="GraduationCap" size={32} className="text-purple-400" />
                  <Icon name="ArrowRight" size={24} className="text-slate-500" />
                  <Icon name="Building2" size={32} className="text-green-400" />
                  <Icon name="ArrowRight" size={24} className="text-slate-500" />
                  <Icon name="TrendingUp" size={32} className="text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Slide 3: Market */}
      {activeSlide === 3 && (
        <div className="animate-fade-in">
          <h2 className="text-5xl font-bold mb-12 text-center">Размер рынка</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 border-0 text-white">
              <CardHeader>
                <CardTitle className="text-3xl">TAM</CardTitle>
                <p className="text-blue-100">Total Addressable Market</p>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold mb-4">$2.5B</div>
                <p className="text-blue-100">Весь рынок массажных услуг в России</p>
                <ul className="mt-4 space-y-2 text-sm text-blue-100">
                  <li>• 150,000 массажистов</li>
                  <li>• 500 школ массажа</li>
                  <li>• 5,000 салонов/спа</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600 to-pink-600 border-0 text-white">
              <CardHeader>
                <CardTitle className="text-3xl">SAM</CardTitle>
                <p className="text-purple-100">Serviceable Available Market</p>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold mb-4">$750M</div>
                <p className="text-purple-100">Цифровизированная часть рынка</p>
                <ul className="mt-4 space-y-2 text-sm text-purple-100">
                  <li>• 50,000 активных онлайн</li>
                  <li>• 200 школ с онлайн-курсами</li>
                  <li>• 2,000 салонов с CRM</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-600 to-red-600 border-0 text-white">
              <CardHeader>
                <CardTitle className="text-3xl">SOM</CardTitle>
                <p className="text-orange-100">Serviceable Obtainable Market</p>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold mb-4">$75M</div>
                <p className="text-orange-100">Реалистичная доля на 3 года</p>
                <ul className="mt-4 space-y-2 text-sm text-orange-100">
                  <li>• 5,000 массажистов (10%)</li>
                  <li>• 100 школ (50%)</li>
                  <li>• 500 салонов (25%)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <Icon name="TrendingUp" size={32} className="text-green-400" />
                Динамика рынка
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-3">Драйверы роста:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                      <span><strong>+15% CAGR</strong> рынка wellness в России</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                      <span>Рост спроса на удаленную работу (+40% с 2020)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                      <span>Цифровизация образования (+120% за 3 года)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                      <span>Популяризация ЗОЖ и самозаботы</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-3">Возможности:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-blue-400 mt-1 shrink-0" />
                      <span>Фрагментированный рынок без доминантов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-blue-400 mt-1 shrink-0" />
                      <span>Отток с западных платформ → локализация</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-blue-400 mt-1 shrink-0" />
                      <span>Низкая цифровизация → большой потенциал</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-blue-400 mt-1 shrink-0" />
                      <span>Возможность экспансии в СНГ</span>
                    </li>
                  </ul>
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
                <CardTitle className="flex items-center gap-3 text-2xl text-white">
                  <Icon name="Users" size={32} className="text-blue-400" />
                  DocDialog Pro (B2C) — Для массажистов
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3">Функции:</h3>
                    <ul className="space-y-2">
                      <li>✓ Личный профиль с портфолио и сертификатами</li>
                      <li>✓ Календарь и CRM для клиентов</li>
                      <li>✓ AI-анамнез (расшифровка МРТ/УЗИ)</li>
                      <li>✓ База техник и протоколов</li>
                      <li>✓ Доступ к образовательным курсам</li>
                      <li>✓ Биржа заказов от клиентов</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-3">Монетизация:</h3>
                    <ul className="space-y-2">
                      <li><strong className="text-blue-400">₽1,990/мес</strong> — базовая подписка</li>
                      <li><strong className="text-blue-400">7%</strong> комиссия с заказов через платформу</li>
                      <li><strong className="text-blue-400">₽500</strong> за AI-анализ анамнеза (пакетами)</li>
                    </ul>
                    <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <div className="text-sm text-blue-300 mb-1">ARPU</div>
                      <div className="text-3xl font-bold text-blue-400">₽1,990/мес</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-white">
                  <Icon name="GraduationCap" size={32} className="text-purple-400" />
                  DocDialog Edu (B2B) — Для школ массажа
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3">Функции:</h3>
                    <ul className="space-y-2">
                      <li>✓ LMS для размещения курсов</li>
                      <li>✓ Система тестирования и сертификации</li>
                      <li>✓ CRM для студентов</li>
                      <li>✓ Интеграция с маркетплейсом (трудоустройство выпускников)</li>
                      <li>✓ Аналитика и отчетность</li>
                      <li>✓ Брендированная страница школы</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-3">Монетизация:</h3>
                    <ul className="space-y-2">
                      <li><strong className="text-purple-400">₽5,000/мес</strong> — базовый тариф</li>
                      <li><strong className="text-purple-400">10%</strong> комиссия с продаж курсов на платформе</li>
                      <li><strong className="text-purple-400">₽50,000</strong> за кастомизацию и интеграцию</li>
                    </ul>
                    <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                      <div className="text-sm text-purple-300 mb-1">ARPU</div>
                      <div className="text-3xl font-bold text-purple-400">₽5,000/мес</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-white">
                  <Icon name="Building2" size={32} className="text-green-400" />
                  DocDialog Staff (B2B) — Для салонов и спа
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3">Функции:</h3>
                    <ul className="space-y-2">
                      <li>✓ Доступ к базе верифицированных массажистов</li>
                      <li>✓ Инструменты подбора и найма</li>
                      <li>✓ Рейтинги и отзывы</li>
                      <li>✓ Интеграция с внутренней CRM</li>
                      <li>✓ Управление графиком смен</li>
                      <li>✓ Аналитика эффективности персонала</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-3">Монетизация:</h3>
                    <ul className="space-y-2">
                      <li><strong className="text-green-400">₽3,000/мес</strong> — базовая подписка</li>
                      <li><strong className="text-green-400">₽5,000</strong> за успешный найм специалиста</li>
                      <li><strong className="text-green-400">₽20,000</strong> за корпоративное обучение персонала</li>
                    </ul>
                    <div className="mt-4 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                      <div className="text-sm text-green-300 mb-1">ARPU</div>
                      <div className="text-3xl font-bold text-green-400">₽3,000/мес</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Slide 5: Unit Economics */}
      {activeSlide === 5 && (
        <div className="animate-fade-in">
          <h2 className="text-5xl font-bold mb-12 text-center">Юнит-экономика</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Icon name="User" size={28} className="text-blue-400" />
                  Массажист (B2C)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300">
                <div>
                  <div className="text-sm text-slate-400">ARPU (месяц)</div>
                  <div className="text-3xl font-bold text-blue-400">₽{unitEconomics.masseur.arpu.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">CAC</div>
                  <div className="text-2xl font-bold text-white">₽{unitEconomics.masseur.cac.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">LTV (12 месяцев)</div>
                  <div className="text-2xl font-bold text-white">₽{unitEconomics.masseur.ltv.toLocaleString()}</div>
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">LTV/CAC:</span>
                    <span className="font-bold text-green-400">{(unitEconomics.masseur.ltv / unitEconomics.masseur.cac).toFixed(1)}x</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Payback:</span>
                    <span className="font-bold text-green-400">{unitEconomics.masseur.payback} мес</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Margin:</span>
                    <span className="font-bold text-green-400">{unitEconomics.masseur.margin}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Icon name="GraduationCap" size={28} className="text-purple-400" />
                  Школа (B2B)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300">
                <div>
                  <div className="text-sm text-slate-400">ARPU (месяц)</div>
                  <div className="text-3xl font-bold text-purple-400">₽{unitEconomics.school.arpu.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">CAC</div>
                  <div className="text-2xl font-bold text-white">₽{unitEconomics.school.cac.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">LTV (12 месяцев)</div>
                  <div className="text-2xl font-bold text-white">₽{unitEconomics.school.ltv.toLocaleString()}</div>
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">LTV/CAC:</span>
                    <span className="font-bold text-green-400">{(unitEconomics.school.ltv / unitEconomics.school.cac).toFixed(1)}x</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Payback:</span>
                    <span className="font-bold text-green-400">{unitEconomics.school.payback} мес</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Margin:</span>
                    <span className="font-bold text-green-400">{unitEconomics.school.margin}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Icon name="Building2" size={28} className="text-green-400" />
                  Салон (B2B)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300">
                <div>
                  <div className="text-sm text-slate-400">ARPU (месяц)</div>
                  <div className="text-3xl font-bold text-green-400">₽{unitEconomics.salon.arpu.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">CAC</div>
                  <div className="text-2xl font-bold text-white">₽{unitEconomics.salon.cac.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">LTV (12 месяцев)</div>
                  <div className="text-2xl font-bold text-white">₽{unitEconomics.salon.ltv.toLocaleString()}</div>
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">LTV/CAC:</span>
                    <span className="font-bold text-green-400">{(unitEconomics.salon.ltv / unitEconomics.salon.cac).toFixed(1)}x</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Payback:</span>
                    <span className="font-bold text-green-400">{unitEconomics.salon.payback} мес</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Margin:</span>
                    <span className="font-bold text-green-400">{unitEconomics.salon.margin}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Ключевые метрики</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-sm text-slate-400 mb-2">Средний LTV/CAC</div>
                  <div className="text-4xl font-bold text-green-400">30x</div>
                  <div className="text-xs text-slate-500 mt-1">Здоровая экономика</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-2">Средний Payback</div>
                  <div className="text-4xl font-bold text-blue-400">0.4 мес</div>
                  <div className="text-xs text-slate-500 mt-1">Быстрая окупаемость</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-2">Средняя маржа</div>
                  <div className="text-4xl font-bold text-purple-400">75%</div>
                  <div className="text-xs text-slate-500 mt-1">Высокая рентабельность</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-2">Churn rate</div>
                  <div className="text-4xl font-bold text-orange-400">5%</div>
                  <div className="text-xs text-slate-500 mt-1">Низкий отток</div>
                </div>
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
            {competitors.map((competitor, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-white">{competitor.name}</CardTitle>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      competitor.threat === 'Высокая' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      competitor.threat === 'Средняя' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}>
                      Угроза: {competitor.threat}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 text-slate-300">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Модель</div>
                      <div className="font-semibold">{competitor.model}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Преимущества</div>
                      <div className="text-green-400">{competitor.pros}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Недостатки</div>
                      <div className="text-red-400">{competitor.cons}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0 text-white">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Icon name="Zap" size={32} />
                Наше конкурентное преимущество
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-xl">Мы единственные, кто:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-300 mt-1 shrink-0" />
                      <span><strong>Объединяет всю экосистему:</strong> работа + обучение + AI-инструменты</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-300 mt-1 shrink-0" />
                      <span><strong>Минимальная комиссия 7%</strong> vs 20-30% у агрегаторов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-300 mt-1 shrink-0" />
                      <span><strong>AI-анамнез</strong> — уникальная технология для массажистов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-300 mt-1 shrink-0" />
                      <span><strong>Сетевой эффект:</strong> больше пользователей = больше ценности для всех</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-xl">Барьеры входа:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="Shield" size={20} className="text-blue-300 mt-1 shrink-0" />
                      <span><strong>Network effect</strong> — сложно скопировать сообщество</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Shield" size={20} className="text-blue-300 mt-1 shrink-0" />
                      <span><strong>Экспертиза ниши</strong> — 2 года разработки под массажистов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Shield" size={20} className="text-blue-300 mt-1 shrink-0" />
                      <span><strong>AI-технологии</strong> — собственная модель анализа</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Shield" size={20} className="text-blue-300 mt-1 shrink-0" />
                      <span><strong>First-mover advantage</strong> — первые на рынке с таким продуктом</span>
                    </li>
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
          <h2 className="text-5xl font-bold mb-12 text-center">Текущие результаты</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 border-0 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Пользователи</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-blue-100 mb-1">Массажисты</div>
                    <div className="text-5xl font-bold">1,000+</div>
                    <div className="text-sm text-blue-200 mt-1">+40% MoM рост</div>
                  </div>
                  <div className="border-t border-blue-400/30 pt-4">
                    <div className="text-sm text-blue-100 mb-1">Школы-партнеры</div>
                    <div className="text-4xl font-bold">50+</div>
                  </div>
                  <div className="border-t border-blue-400/30 pt-4">
                    <div className="text-sm text-blue-100 mb-1">Салоны</div>
                    <div className="text-4xl font-bold">200+</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600 to-emerald-600 border-0 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Финансы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-green-100 mb-1">MRR</div>
                    <div className="text-5xl font-bold">₽350K</div>
                    <div className="text-sm text-green-200 mt-1">+35% MoM рост</div>
                  </div>
                  <div className="border-t border-green-400/30 pt-4">
                    <div className="text-sm text-green-100 mb-1">ARR (прогноз)</div>
                    <div className="text-4xl font-bold">₽4.2M</div>
                  </div>
                  <div className="border-t border-green-400/30 pt-4">
                    <div className="text-sm text-green-100 mb-1">Средний чек</div>
                    <div className="text-4xl font-bold">₽2,100</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-slate-800 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Icon name="TrendingUp" size={24} className="text-purple-400" />
                  Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>DAU/MAU:</span>
                    <span className="font-bold text-white">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. session:</span>
                    <span className="font-bold text-white">12 мин</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retention D30:</span>
                    <span className="font-bold text-white">60%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-orange-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Icon name="Users" size={24} className="text-orange-400" />
                  Конверсия
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Trial → Paid:</span>
                    <span className="font-bold text-white">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>NPS:</span>
                    <span className="font-bold text-white">72</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Churn:</span>
                    <span className="font-bold text-white">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Icon name="Zap" size={24} className="text-blue-400" />
                  AI-анамнез
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Анализов:</span>
                    <span className="font-bold text-white">5,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Точность:</span>
                    <span className="font-bold text-white">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Adoption:</span>
                    <span className="font-bold text-white">38%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <Icon name="Award" size={32} className="text-yellow-400" />
                Ключевые достижения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-slate-300">
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-green-400 mt-1 shrink-0" />
                  <span><strong>Partnerships:</strong> 3 топовые школы массажа в РФ</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-green-400 mt-1 shrink-0" />
                  <span><strong>Media:</strong> Публикации в VC.ru, Spark</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-green-400 mt-1 shrink-0" />
                  <span><strong>Community:</strong> 15K подписчиков в Telegram</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-green-400 mt-1 shrink-0" />
                  <span><strong>Tech:</strong> Патент на AI-алгоритм анализа в процессе</span>
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
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon name="User" size={48} className="text-white" />
                </div>
                <CardTitle className="text-center text-white text-xl">Алексей Иванов</CardTitle>
                <p className="text-center text-blue-400 text-sm">CEO & Co-founder</p>
              </CardHeader>
              <CardContent className="text-slate-300 text-sm">
                <ul className="space-y-2">
                  <li>• 8 лет в wellness индустрии</li>
                  <li>• Ex-COO в wellness-стартапе (exit 2023)</li>
                  <li>• MBA INSEAD</li>
                  <li>• Raised $2M seed для предыдущего проекта</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon name="Code" size={48} className="text-white" />
                </div>
                <CardTitle className="text-center text-white text-xl">Мария Петрова</CardTitle>
                <p className="text-center text-purple-400 text-sm">CTO & Co-founder</p>
              </CardHeader>
              <CardContent className="text-slate-300 text-sm">
                <ul className="space-y-2">
                  <li>• 10 лет в разработке AI/ML</li>
                  <li>• Ex-Lead ML Engineer в Яндексе</li>
                  <li>• PhD Computer Science МГУ</li>
                  <li>• 5 патентов в области NLP</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon name="TrendingUp" size={48} className="text-white" />
                </div>
                <CardTitle className="text-center text-white text-xl">Дмитрий Смирнов</CardTitle>
                <p className="text-center text-green-400 text-sm">CMO & Co-founder</p>
              </CardHeader>
              <CardContent className="text-slate-300 text-sm">
                <ul className="space-y-2">
                  <li>• 7 лет в digital маркетинге</li>
                  <li>• Ex-Head of Growth в EdTech единороге</li>
                  <li>• Масштабировал продукт до 100K+ users</li>
                  <li>• Expertise: performance, community building</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <Icon name="Users" size={32} className="text-blue-400" />
                Команда (всего 12 человек)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 text-center text-slate-300">
                <div>
                  <Icon name="Code" size={32} className="text-purple-400 mx-auto mb-2" />
                  <div className="font-semibold text-white">Разработка</div>
                  <div className="text-sm">5 инженеров</div>
                  <div className="text-xs text-slate-500">2 fullstack, 2 AI/ML, 1 mobile</div>
                </div>
                <div>
                  <Icon name="Palette" size={32} className="text-pink-400 mx-auto mb-2" />
                  <div className="font-semibold text-white">Дизайн</div>
                  <div className="text-sm">2 дизайнера</div>
                  <div className="text-xs text-slate-500">1 UI/UX, 1 product designer</div>
                </div>
                <div>
                  <Icon name="Megaphone" size={32} className="text-orange-400 mx-auto mb-2" />
                  <div className="font-semibold text-white">Маркетинг</div>
                  <div className="text-sm">2 маркетолога</div>
                  <div className="text-xs text-slate-500">1 performance, 1 content</div>
                </div>
                <div>
                  <Icon name="HeadphonesIcon" size={32} className="text-green-400 mx-auto mb-2" />
                  <div className="font-semibold text-white">Поддержка</div>
                  <div className="text-sm">2 менеджера</div>
                  <div className="text-xs text-slate-500">Customer success + sales</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0 text-white">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Icon name="Target" size={32} />
                Advisors & Mentors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="font-semibold mb-2">Сергей Волков</div>
                  <div className="text-sm text-blue-100">Ex-VP Product в X5 Retail, эксперт в marketplace моделях</div>
                </div>
                <div>
                  <div className="font-semibold mb-2">Анна Козлова</div>
                  <div className="text-sm text-blue-100">CEO крупнейшей сети спа-салонов, доступ к 500+ салонам</div>
                </div>
                <div>
                  <div className="font-semibold mb-2">Павел Дуров (не тот)</div>
                  <div className="text-sm text-blue-100">Founder школы массажа с 5000+ выпускников</div>
                </div>
                <div>
                  <div className="font-semibold mb-2">Ирина Белова</div>
                  <div className="text-sm text-blue-100">Partner в VC фонде, expertise в B2B SaaS</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Slide 9: Ask */}
      {activeSlide === 9 && (
        <div className="animate-fade-in">
          <h2 className="text-5xl font-bold mb-12 text-center">Инвестиционное предложение</h2>
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0 text-white mb-8">
            <CardHeader>
              <CardTitle className="text-4xl text-center">Привлекаем ₽15M</CardTitle>
              <p className="text-center text-xl text-blue-100">Pre-seed раунд • Equity 15%</p>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className="text-lg text-blue-100 mb-2">Пост-мани оценка</div>
                <div className="text-5xl font-bold">₽100M</div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Icon name="Target" size={28} className="text-green-400" />
                  Использование средств
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-slate-300">
                    <span>Разработка продукта (AI, mobile)</span>
                    <span className="font-bold text-white">₽6M (40%)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-slate-300">
                    <span>Маркетинг и привлечение</span>
                    <span className="font-bold text-white">₽4.5M (30%)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-slate-300">
                    <span>Команда (найм 8 человек)</span>
                    <span className="font-bold text-white">₽3M (20%)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-slate-300">
                    <span>Операционные расходы</span>
                    <span className="font-bold text-white">₽1.5M (10%)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Icon name="TrendingUp" size={28} className="text-blue-400" />
                  Цели на 18 месяцев
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-300">
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-green-400 mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold text-white">5,000 массажистов</div>
                    <div className="text-sm text-slate-400">5x рост базы пользователей</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-green-400 mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold text-white">100 школ-партнеров</div>
                    <div className="text-sm text-slate-400">Покрытие 50% топовых школ РФ</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-green-400 mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold text-white">500 салонов</div>
                    <div className="text-sm text-slate-400">B2B сегмент запущен и масштабируется</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-green-400 mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold text-white">₽5M MRR</div>
                    <div className="text-sm text-slate-400">14x рост выручки</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-green-400 mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Мобильное приложение</div>
                    <div className="text-sm text-slate-400">iOS + Android launch</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-green-400 mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Готовность к Series A</div>
                    <div className="text-sm text-slate-400">Unit economics validated at scale</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {roadmap.map((item, index) => (
              <Card key={index} className={`bg-slate-800 border-slate-700 ${item.status === 'in-progress' ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>{item.quarter}</span>
                    {item.status === 'in-progress' && (
                      <span className="text-xs bg-blue-500 px-2 py-1 rounded">В процессе</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {item.goals.map((goal, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="ArrowRight" size={16} className="text-blue-400 mt-1 shrink-0" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 border-0 text-white">
            <CardHeader>
              <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
                <Icon name="Rocket" size={40} />
                Почему сейчас?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Icon name="TrendingUp" size={48} className="text-green-200 mx-auto mb-3" />
                  <div className="font-semibold text-xl mb-2">Рынок растет</div>
                  <div className="text-green-100">+15% CAGR, окно возможностей открыто</div>
                </div>
                <div>
                  <Icon name="Zap" size={48} className="text-green-200 mx-auto mb-3" />
                  <div className="font-semibold text-xl mb-2">Traction доказан</div>
                  <div className="text-green-100">1000+ пользователей, ₽350K MRR, product-market fit</div>
                </div>
                <div>
                  <Icon name="Target" size={48} className="text-green-200 mx-auto mb-3" />
                  <div className="font-semibold text-xl mb-2">Команда готова</div>
                  <div className="text-green-100">Опыт, экспертиза, execution power</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 text-xl px-12 py-6">
              <Icon name="Mail" size={24} className="mr-3" />
              Связаться: founders@docdialog.ru
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
