import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface InvestorSlides8to9Props {
  activeSlide: number;
  roadmap: Array<{
    quarter: string;
    goals: string[];
    status: string;
  }>;
}

export default function InvestorSlides8to9({
  activeSlide,
  roadmap,
}: InvestorSlides8to9Props) {
  return (
    <>
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
