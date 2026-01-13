import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ProfessionalFooter from '@/components/professional/ProfessionalFooter';

export default function About() {
  const navigate = useNavigate();

  const participants = [
    {
      icon: 'User',
      title: 'Для специалистов по телу',
      description: 'Пространство профессионального роста, клиентов и поддержки',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      icon: 'GraduationCap',
      title: 'Для школ',
      description: 'Доступ к целевой аудитории без комиссий и демпинга',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      icon: 'Building',
      title: 'Для салонов',
      description: 'Подбор специалистов и привлечение клиентов без посредников',
      gradient: 'from-orange-600 to-red-600'
    },
    {
      icon: 'Heart',
      title: 'Для клиентов',
      description: 'Поиск специалиста и салона через доверие, а не рекламу',
      gradient: 'from-green-600 to-emerald-600'
    }
  ];

  const principles = [
    { icon: 'Award', text: 'Уважение к профессии' },
    { icon: 'Eye', text: 'Прозрачность' },
    { icon: 'Users', text: 'Прямое взаимодействие' },
    { icon: 'TrendingUp', text: 'Осознанное развитие' },
    { icon: 'Coins', text: 'Отсутствие комиссий за услуги' }
  ];

  const dialogTypes = [
    {
      title: 'Диалога с собой',
      description: 'о пути, ценностях и границах',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Диалога с клиентом',
      description: 'о доверии и выборе',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Диалога с сообществом',
      description: 'о росте и развитии',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/72f23caf-f41e-4197-af9a-09093332cf52.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-purple-200 shadow-lg">
              <Icon name="MessageCircle" className="text-purple-600" size={18} />
              <span className="text-sm font-semibold text-gray-700">О проекте Док диалог</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent px-4">
              Пространство профессионального диалога
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-8 leading-relaxed px-4 max-w-4xl mx-auto font-medium">
              Экосистема для специалистов по телу, школ и салонов,<br />
              где развитие начинается с осознанного диалога —<br />
              с собой, с профессией и с сообществом
            </p>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto border-2 border-purple-100 shadow-xl">
              <p className="text-lg sm:text-xl text-gray-700 font-medium leading-relaxed">
                Не маркетплейс.<br />
                Не агрегатор.<br />
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Экосистема роста
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center text-gray-900">
              Почему появился Док диалог
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Рынок телесных практик долго развивался фрагментарно.<br />
                Специалисты оставались один на один с профессией.<br />
                Школы — с поиском учеников.<br />
                Салоны — с подбором кадров и привлечением клиентов.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-l-4 border-blue-600">
                <p className="text-2xl font-bold text-gray-900">
                  Док диалог появился как ответ на эту разрозненность.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dialog Philosophy */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                Диалог — основа профессии
              </h2>
              <p className="text-2xl text-gray-700 font-medium mb-12">
                Любая профессиональная устойчивость начинается с диалога
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {dialogTypes.map((type, index) => (
                <Card key={index} className="border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.gradient} mx-auto mb-6 shadow-lg`}></div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{type.title}</h3>
                    <p className="text-gray-600 text-lg">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 text-center border-2 border-purple-100">
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
                Док диалог создаёт среду,<br />
                в которой этот диалог становится частью профессии.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Dok Dialog Today */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                Экосистема, а не отдельный продукт
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Док диалог объединяет в одном пространстве:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {[
                'специалистов по телу',
                'школы и образовательные проекты',
                'салоны и пространства телесных практик',
                'клиентов, ищущих качество и доверие'
              ].map((item, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0 shadow-lg">
                      <Icon name="Check" size={24} className="text-white" />
                    </div>
                    <p className="text-lg font-medium text-gray-700">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                Каждый участник экосистемы усиливает другого.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Whom */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16 text-center text-gray-900">
              Кому подходит Док диалог
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {participants.map((participant, index) => (
                <Card key={index} className="border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${participant.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                      <Icon name={participant.icon as any} size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{participant.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{participant.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16 text-center text-gray-900">
              На чём мы стоим
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
              {principles.slice(0, 4).map((principle, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-all bg-gradient-to-br from-white to-blue-50">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0 shadow-lg">
                      <Icon name={principle.icon as any} size={24} className="text-white" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{principle.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="max-w-md mx-auto mb-12">
              <Card className="border-2 hover:shadow-lg transition-all bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Icon name={principles[4].icon as any} size={24} className="text-white" />
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{principles[4].text}</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-l-4 border-blue-600">
              <p className="text-xl text-gray-700 leading-relaxed">
                Мы не вмешиваемся в расчёты.<br />
                Мы не навязываем решения.<br />
                <span className="text-2xl font-bold text-gray-900">Мы создаём среду.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Not Medicine */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center text-gray-900">
              Про заботу о теле, а не про лечение
            </h2>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-gray-100">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Док диалог работает в пространстве телесных практик, wellness и развития.<br />
                Мы не занимаемся медицинской диагностикой или лечением.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-blue-600">
                <p className="text-xl font-bold text-gray-900">
                  Это осознанный выбор,<br />
                  который позволяет проекту быть честным, открытым и безопасным.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Ecosystem Grows */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center text-gray-900">
              Рост через ценность
            </h2>
            <div className="mb-8">
              <p className="text-xl text-gray-700 leading-relaxed text-center mb-12">
                Экосистема развивается не за счёт давления,<br />
                а за счёт пользы для каждого участника.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { text: 'специалисты получают поддержку и клиентов', icon: 'Users' },
                { text: 'школы — учеников', icon: 'GraduationCap' },
                { text: 'салоны — специалистов и доверие', icon: 'Building' },
                { text: 'клиенты — осознанный выбор', icon: 'Heart' }
              ].map((item, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-all bg-gradient-to-br from-white to-purple-50">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shrink-0 shadow-lg">
                      <Icon name={item.icon as any} size={24} className="text-white" />
                    </div>
                    <p className="text-lg font-medium text-gray-700">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust and Verification */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center text-gray-900">
              Доверие — основа экосистемы
            </h2>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {[
                { icon: 'FileCheck', text: 'профили проходят модерацию' },
                { icon: 'BadgeCheck', text: 'специалисты и салоны верифицируются' },
                { icon: 'Star', text: 'отзывы формируют репутацию' }
              ].map((item, index) => (
                <Card key={index} className="border-2 hover:shadow-xl transition-all bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Icon name={item.icon as any} size={32} className="text-white" />
                    </div>
                    <p className="text-lg font-medium text-gray-700">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 text-center">
              <p className="text-2xl font-bold text-gray-900">
                Это не формальность.<br />
                Это культура.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center text-gray-900">
              Проект в развитии
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border-2 border-purple-100 shadow-xl">
              <p className="text-xl text-gray-700 leading-relaxed text-center">
                Док диалог — живой проект.<br />
                Он развивается вместе с рынком и людьми внутри него.<br /><br />
                <span className="text-2xl font-bold text-gray-900">
                  Мы внимательно слушаем сообщество<br />
                  и развиваем экосистему осознанно.
                </span>
              </p>
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
              Если вам близок диалог —<br />вам с нами
            </h2>
            <p className="text-xl sm:text-2xl mb-10 text-white/90 leading-relaxed">
              Док диалог — это не про быстрые решения.<br />
              Это про путь, профессию и уважение к телу.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                className="text-lg px-10 py-7 bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-white/50 transition-all"
                onClick={() => navigate('/register')}
              >
                Стать частью экосистемы
                <Icon name="ArrowRight" size={22} className="ml-2" />
              </Button>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
              <p className="text-2xl sm:text-3xl font-bold italic leading-relaxed">
                Док диалог — это пространство,<br />
                где профессия начинается с диалога.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProfessionalFooter />
    </div>
  );
}