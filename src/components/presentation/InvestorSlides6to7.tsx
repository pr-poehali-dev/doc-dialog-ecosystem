import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface InvestorSlides6to7Props {
  activeSlide: number;
  competitors: Array<{
    name: string;
    model: string;
    pros: string;
    cons: string;
    threat: string;
  }>;
  roadmap: Array<{
    quarter: string;
    goals: string[];
    status: string;
  }>;
}

export default function InvestorSlides6to7({
  activeSlide,
  competitors,
  roadmap,
}: InvestorSlides6to7Props) {
  return (
    <>
      {/* Slide 6: Competition */}
      {activeSlide === 6 && (
        <div className="animate-fade-in">
          <h2 className="text-5xl font-bold mb-12 text-center">Конкурентный анализ</h2>
          <div className="space-y-4 mb-8">
            {competitors.map((competitor, index) => (
              <Card key={index} className="bg-slate-900/90 border-slate-700">
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
            <Card className="bg-slate-900/90 border-purple-500/30">
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

            <Card className="bg-slate-900/90 border-orange-500/30">
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

            <Card className="bg-slate-900/90 border-blue-500/30">
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

          <Card className="bg-slate-900/90 border-slate-700">
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
    </>
  );
}