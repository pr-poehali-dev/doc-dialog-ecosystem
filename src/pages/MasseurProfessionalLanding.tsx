import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Navigation } from '@/components/Navigation';

export default function MasseurProfessionalLanding() {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'Globe',
      title: 'Публичный профиль в каталоге',
      description: 'Будьте видимы тысячам клиентов',
      color: 'from-blue-500/10 to-blue-500/5'
    },
    {
      icon: 'Layout',
      title: 'Личная страница для клиентов',
      description: 'Ваша уникальная история',
      color: 'from-purple-500/10 to-purple-500/5'
    },
    {
      icon: 'Star',
      title: 'Отзывы и рейтинг',
      description: 'Доверие через репутацию',
      color: 'from-yellow-500/10 to-yellow-500/5'
    },
    {
      icon: 'Shield',
      title: 'Знаки верификации',
      description: 'Подтверждение профессионализма',
      color: 'from-green-500/10 to-green-500/5'
    }
  ];

  const aiTools = [
    { icon: 'Users', title: 'Супервизия', description: 'Разбор сложных ситуаций с клиентами' },
    { icon: 'FileText', title: 'Разбор случая', description: 'Глубокий анализ клиентских запросов' },
    { icon: 'Shield', title: 'Границы', description: 'Работа с профессиональными границами' },
    { icon: 'Heart', title: 'Выгорание', description: 'Профилактика эмоционального истощения' },
    { icon: 'TrendingUp', title: 'Развитие', description: 'Стратегия профессионального роста' },
    { icon: 'Stethoscope', title: 'Медицинский анализ', description: 'Расшифровка заключений МРТ, УЗИ' }
  ];

  const benefits = [
    {
      icon: 'MessageSquare',
      title: 'Диалог с собой',
      description: 'Осознание профессиональной идентичности',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      icon: 'Users',
      title: 'Диалог с клиентом',
      description: 'Выстраивание доверительных отношений',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      icon: 'Network',
      title: 'Диалог с сообществом',
      description: 'Обмен опытом и профессиональный рост',
      gradient: 'from-pink-600 to-rose-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/a4c1beda-6770-49ab-b96e-e4558c511b33.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-purple-200 shadow-lg">
              <Icon name="Sparkles" className="text-purple-600" size={18} />
              <span className="text-sm font-semibold text-gray-700">Док диалог для специалистов по телу</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent px-2">
              Настрой диалог с собой
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-10 leading-relaxed px-4 max-w-4xl mx-auto font-medium">
              Экосистема для специалистов по телу, которые хотят расти профессионально, а не просто искать клиентов.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto"
                onClick={() => navigate('/register/masseur')}
              >
                Создать профиль специалиста
                <Icon name="ArrowRight" size={22} className="ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="text-lg px-10 py-7 w-full sm:w-auto border-2 bg-white/50 backdrop-blur-sm"
                onClick={() => navigate('/dashboard/ai-dialogs')}
              >
                Попробовать AI
                <Icon name="Sparkles" size={22} className="ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
              {[
                { number: "24/7", label: "AI Поддержка" },
                { number: "6+", label: "AI Инструментов" },
                { number: "3000+", label: "Специалистов" },
              ].map((stat, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-purple-100">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-gray-900 leading-tight">
                  Специалист по телу часто остаётся один
                </h2>
                <div className="space-y-6 text-lg text-gray-600 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                    <p>Без поддержки коллег и супервизоров</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                    <p>Без обратной связи по сложным случаям</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                    <p>Без пространства для профессионального роста</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
                  <p className="text-lg text-gray-700 font-medium mb-2">Много работы — мало развития.</p>
                  <p className="text-lg text-gray-700 font-medium">Много клиентов — мало осознанности.</p>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/2becd312-6318-4ef1-a55d-b00e64096dfa.jpg"
                  alt="Professional therapist"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Dialogues */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-white via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                Профессия начинается с диалога
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Док диалог создаёт пространство, где этот диалог становится частью профессии
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                      <Icon name={benefit.icon as any} size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Supervision Section - Core Feature */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/55b7c094-4bc1-43ee-823f-185339203d50.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full mb-6 shadow-xl">
                <Icon name="Sparkles" size={20} />
                <span className="font-semibold">Ядро экосистемы</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Профессиональная супервизия 24/7
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                AI Диалоги — это конфиденциальное пространство, где вы можете обсудить рабочие ситуации, профессиональные сомнения и развитие навыков
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {aiTools.map((tool, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                      <Icon name={tool.icon as any} size={24} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">{tool.title}</h3>
                    <p className="text-sm text-gray-300">{tool.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                size="lg"
                className="text-lg px-10 py-7 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/50 transition-all"
                onClick={() => navigate('/dashboard/ai-dialogs')}
              >
                Начать диалог с AI
                <Icon name="MessageSquare" size={22} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Profile Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                Ваш профиль — это не анкета
              </h2>
              <p className="text-2xl text-gray-700 font-medium">
                Это ваша профессиональная позиция
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {features.map((feature, index) => (
                <Card key={index} className={`bg-gradient-to-br ${feature.color} border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                        <Icon name={feature.icon as any} size={28} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 text-center border-2 border-purple-100">
              <p className="text-2xl text-gray-700 italic mb-4">
                Клиенты выбирают не услугу.
              </p>
              <p className="text-3xl font-bold text-gray-900">
                Они выбирают специалиста.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Landing Constructor */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                Расскажите о себе так, как чувствуете
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Создайте собственную страницу для клиентов в удобном конструкторе
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {['ваш подход к работе', 'профессиональный опыт', 'философия практики', 'удобное расположение'].map((item, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-all bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shrink-0">
                        <Icon name="Check" size={18} className="text-white" />
                      </div>
                      <span className="text-lg font-medium text-gray-700">{item}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center bg-white rounded-2xl p-8 shadow-xl border-2">
              <p className="text-gray-600 text-lg mb-2">Без шаблонных формулировок.</p>
              <p className="text-gray-600 text-lg">Без навязчивых продаж.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Tools */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                Автоматизация рутины
              </h2>
              <p className="text-xl text-gray-600">
                Освободите время для того, что действительно важно
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: 'Calendar',
                  title: 'Управление заказами',
                  description: 'Автоматический прием заявок, напоминания, история работы с клиентами',
                  gradient: 'from-blue-600 to-cyan-600'
                },
                {
                  icon: 'MessageCircle',
                  title: 'Чаты с клиентами',
                  description: 'Централизованная коммуникация, быстрые ответы, шаблоны сообщений',
                  gradient: 'from-purple-600 to-pink-600'
                },
                {
                  icon: 'Bell',
                  title: 'Уведомления',
                  description: 'Не пропустите важные события: новые заказы, отзывы, сообщения',
                  gradient: 'from-orange-600 to-red-600'
                },
                {
                  icon: 'BarChart',
                  title: 'Аналитика',
                  description: 'Отслеживайте ключевые метрики: просмотры профиля, конверсию, доход',
                  gradient: 'from-green-600 to-emerald-600'
                }
              ].map((item, index) => (
                <Card key={index} className="border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-gray-50 to-white">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                      <Icon name={item.icon as any} size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Icon name="Users" size={64} className="mx-auto mb-8 text-blue-600" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Сообщество профессионалов
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Док диалог — это не просто платформа.<br />
              Это пространство для тех, кто ценит свою профессию и хочет развиваться.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-100">
              <p className="text-lg text-gray-700 italic">
                «Здесь я нашёл поддержку коллег, обучение у лучших экспертов и возможность расти без выгорания»
              </p>
              <p className="text-gray-500 mt-4 font-medium">— Специалист по телесной терапии</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6">
              Начните профессиональное развитие сегодня
            </h2>
            <p className="text-xl sm:text-2xl mb-10 text-white/90">
              Создайте профиль специалиста и получите доступ ко всем возможностям экосистемы
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="text-lg px-10 py-7 bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-white/50 transition-all"
                onClick={() => navigate('/register/masseur')}
              >
                Создать профиль бесплатно
                <Icon name="Sparkles" size={22} className="ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-10 py-7 border-2 border-white text-white hover:bg-white/10"
                onClick={() => navigate('/courses')}
              >
                Смотреть курсы
                <Icon name="GraduationCap" size={22} className="ml-2" />
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Check" size={20} />
                <span>Бесплатная регистрация</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={20} />
                <span>5 AI-операций в месяц</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={20} />
                <span>Публичный профиль</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">Д</span>
                </div>
                <span className="text-xl font-bold">Док диалог</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Экосистема для профессионального роста специалистов по телу
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Для специалистов</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => navigate("/register/masseur")} className="hover:text-primary transition-colors">
                    Регистрация
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/courses")} className="hover:text-primary transition-colors">
                    Курсы
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/masseurs")} className="hover:text-primary transition-colors">
                    Каталог специалистов
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/dashboard/ai-dialogs")} className="hover:text-primary transition-colors">
                    AI Диалоги
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Для школ</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => navigate("/schools-info")} className="hover:text-primary transition-colors">
                    Для школ
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/register/school")} className="hover:text-primary transition-colors">
                    Разместить школу
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/schools")} className="hover:text-primary transition-colors">
                    Каталог школ
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => navigate("/about")} className="hover:text-primary transition-colors">
                    О платформе
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/privacy")} className="hover:text-primary transition-colors">
                    Политика конфиденциальности
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/terms")} className="hover:text-primary transition-colors">
                    Условия использования
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 Док диалог. Все права защищены.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://t.me/+QgiLIa1gFRY4Y2Iy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Icon name="MessageCircle" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}