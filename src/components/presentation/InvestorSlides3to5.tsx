import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface InvestorSlides3to5Props {
  activeSlide: number;
  unitEconomics: {
    masseur: { arpu: number; cac: number; ltv: number; payback: number; margin: number };
    school: { arpu: number; cac: number; ltv: number; payback: number; margin: number };
    salon: { arpu: number; cac: number; ltv: number; payback: number; margin: number };
  };
}

export default function InvestorSlides3to5({
  activeSlide,
  unitEconomics,
}: InvestorSlides3to5Props) {
  return (
    <>
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
                      <li>✓ Аналитика продаж и маркетинга</li>
                      <li>✓ Белый лейбл для школ</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-3">Монетизация:</h3>
                    <ul className="space-y-2">
                      <li><strong className="text-purple-400">₽4,990/мес</strong> — базовая подписка</li>
                      <li><strong className="text-purple-400">10%</strong> комиссия с продаж курсов через платформу</li>
                      <li><strong className="text-purple-400">₽15,000</strong> за белый лейбл</li>
                    </ul>
                    <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                      <div className="text-sm text-purple-300 mb-1">ARPU</div>
                      <div className="text-3xl font-bold text-purple-400">₽4,990/мес</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-white">
                  <Icon name="Building2" size={32} className="text-green-400" />
                  DocDialog Biz (B2B) — Для салонов
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
              <CardTitle className="text-2xl text-white">Сводные показатели</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-sm text-slate-400 mb-2">Средний LTV/CAC</div>
                  <div className="text-4xl font-bold text-green-400">6.5x</div>
                  <p className="text-xs text-slate-500 mt-1">Здоровая экономика ({">"} 3x)</p>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-2">Средний Payback</div>
                  <div className="text-4xl font-bold text-blue-400">3 мес</div>
                  <p className="text-xs text-slate-500 mt-1">Быстрая окупаемость ({"<"} 6 мес)</p>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-2">Средний Margin</div>
                  <div className="text-4xl font-bold text-purple-400">75%</div>
                  <p className="text-xs text-slate-500 mt-1">Высокая маржинальность</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
