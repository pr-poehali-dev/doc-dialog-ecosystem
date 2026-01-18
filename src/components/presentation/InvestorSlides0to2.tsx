import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface InvestorSlides0to2Props {
  activeSlide: number;
  metrics: Array<{ label: string; value: string; color: string }>;
}

export default function InvestorSlides0to2({
  activeSlide,
  metrics,
}: InvestorSlides0to2Props) {
  return (
    <>
      {/* Slide 0: Cover */}
      {activeSlide === 0 && (
        <div className="text-center py-20 animate-fade-in">
          <div className="mb-8">
            <img 
              src="https://cdn.poehali.dev/files/Group 7 (7).png" 
              alt="Док диалог" 
              className="h-20 sm:h-32 w-auto mx-auto"
            />
          </div>
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
              <div key={index} className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700">
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
            <Card className="bg-slate-900/90 border-red-500/30">
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

            <Card className="bg-slate-900/90 border-orange-500/30">
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

          <Card className="bg-slate-900/90 border-purple-500/30 mt-8">
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
            <Card className="bg-gradient-to-br from-blue-600/50 to-cyan-600/50 border-blue-500/50 backdrop-blur">
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

            <Card className="bg-gradient-to-br from-purple-600/50 to-pink-600/50 border-purple-500/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Icon name="GraduationCap" size={28} className="text-purple-400" />
                  Образование
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <p className="mb-4">Платформа для профессионального роста</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Курсы и вебинары</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Прямая связь со школами</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Цифровые сертификаты</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600/50 to-emerald-600/50 border-green-500/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Icon name="Users" size={28} className="text-green-400" />
                  Сообщество
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <p className="mb-4">Профессиональная экосистема</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Форум и обмен опытом</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>AI-ассистент для анамнеза</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Менторство и нетворкинг</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-blue-600/50 via-purple-600/50 to-pink-600/50 border-blue-500/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-semibold text-white mb-4">
                  Единая экосистема для всего рынка массажных услуг
                </p>
                <p className="text-slate-300">
                  Мы объединяем массажистов, школы и салоны в одной профессиональной платформе,
                  снижая издержки и повышая качество услуг
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}