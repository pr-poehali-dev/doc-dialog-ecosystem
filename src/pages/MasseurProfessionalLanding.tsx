import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function MasseurProfessionalLanding() {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'Globe',
      title: 'Публичный профиль в каталоге',
      color: 'from-blue-500/10 to-blue-500/5'
    },
    {
      icon: 'Layout',
      title: 'Личная страница для клиентов',
      color: 'from-purple-500/10 to-purple-500/5'
    },
    {
      icon: 'Star',
      title: 'Отзывы и рейтинг',
      color: 'from-yellow-500/10 to-yellow-500/5'
    },
    {
      icon: 'Shield',
      title: 'Отличительные знаки верификации',
      color: 'from-green-500/10 to-green-500/5'
    }
  ];

  const aiFeatures = [
    'рабочие ситуации',
    'профессиональные сомнения',
    'развитие навыков',
    'коммуникацию с клиентами'
  ];

  const tools = [
    'автоматизация работы',
    'управление запросами клиентов',
    'чаты и коммуникация',
    'заказы услуг'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 inline-block px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
              Док диалог для специалистов по телу
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Настрой диалог с собой.<br />
              С профессией.<br />
              С клиентами.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Док диалог — экосистема для специалистов по телу,
              которые хотят расти профессионально,
              а не просто искать клиентов.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/register/masseur')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Создать профиль специалиста
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900">
              Специалист по телу<br />часто остаётся один
            </h2>
            <div className="space-y-4 text-xl text-gray-600 mb-12">
              <p>Без поддержки.</p>
              <p>Без обратной связи.</p>
              <p>Без пространства для роста.</p>
            </div>
            <div className="space-y-4 text-lg text-gray-700 border-l-4 border-blue-500 pl-6">
              <p>Много работы — мало развития.</p>
              <p>Много клиентов — мало осознанности.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Idea Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900">
              Профессия начинается<br />с диалога
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                <strong className="text-blue-600">Диалог с собой</strong> — о том, кто ты как специалист.
              </p>
              <p>
                <strong className="text-purple-600">Диалог с клиентом</strong> — о доверии.
              </p>
              <p>
                <strong className="text-pink-600">Диалог с сообществом</strong> — о росте.
              </p>
              <p className="text-xl font-semibold text-gray-900 mt-8 pt-8 border-t-2 border-gray-200">
                Док диалог создаёт пространство,<br />
                где этот диалог становится частью профессии.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Public Profile Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                Ваш профиль — это не анкета
              </h2>
              <p className="text-2xl text-gray-700 font-medium">
                Это ваша профессиональная позиция.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {features.map((feature, index) => (
                <Card key={index} className={`bg-gradient-to-br ${feature.color} border-2 hover:shadow-xl transition-all`}>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
                      <Icon name={feature.icon as any} size={24} className="text-blue-600" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{feature.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-lg text-gray-700 italic">
              Клиенты выбирают не услугу.<br />
              <strong className="text-gray-900">Они выбирают специалиста.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Personal Landing Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                Расскажите о себе<br />так, как чувствуете
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Создайте собственную страницу для клиентов<br />
                в удобном конструкторе.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {['подход', 'опыт', 'философия', 'удобное расположение'].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Icon name="Check" size={24} className="text-green-600" />
                  <span className="text-lg text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="text-center text-gray-600 space-y-2">
              <p>Без шаблонных формулировок.</p>
              <p>Без навязчивых продаж.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Dialogs Section - Core Feature */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full mb-6">
                <Icon name="Sparkles" size={20} />
                <span className="font-semibold">Ядро экосистемы</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                Профессиональная супервизия 24/7
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                AI Диалоги — это пространство,<br />
                где вы можете обсудить:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {aiFeatures.map((feature, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-2 hover:shadow-xl transition-all">
                  <CardContent className="p-6 flex items-center gap-3">
                    <Icon name="MessageSquare" size={20} className="text-purple-600" />
                    <span className="text-lg text-gray-900">{feature}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center space-y-3 mb-8">
              <p className="text-lg text-gray-600">Без осуждения.</p>
              <p className="text-lg text-gray-600">Без спешки.</p>
              <p className="text-lg text-gray-600">В своём ритме.</p>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/register/masseur')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg shadow-xl"
              >
                <Icon name="Sparkles" size={20} className="mr-2" />
                Начать диалог
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gray-900">
              Инструменты,<br />которые работают на вас
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {tools.map((tool, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Icon name="Wrench" size={20} className="text-blue-600 mt-1" />
                  <span className="text-lg text-gray-900">{tool}</span>
                </div>
              ))}
            </div>

            <div className="text-center text-xl text-gray-700 space-y-2">
              <p>Меньше хаоса.</p>
              <p className="font-semibold text-gray-900">Больше фокуса.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gray-900">
              Клиенты и работа —<br />без посредников
            </h2>

            <div className="space-y-6 mb-12">
              <Card className="bg-white border-2">
                <CardContent className="p-6 flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-blue-600 mt-1" />
                  <div>
                    <p className="text-lg font-semibold text-gray-900 mb-1">Клиенты находят вас по геолокации</p>
                    <p className="text-gray-600">Пишут напрямую</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-2">
                <CardContent className="p-6 flex items-start gap-4">
                  <Icon name="MessageCircle" size={24} className="text-purple-600 mt-1" />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Вы договариваетесь без комиссий</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Вы также можете:</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Briefcase" size={20} className="text-blue-600" />
                  <span className="text-lg text-gray-900">находить работу в салонах</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="CheckCircle" size={20} className="text-blue-600" />
                  <span className="text-lg text-gray-900">откликаться на проверенные вакансии</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900">
              Вы не одни в профессии
            </h2>
            <p className="text-2xl text-gray-700 mb-12 font-medium">
              Каталог специалистов — это не конкуренты.<br />
              <span className="text-blue-600">Это профессиональное сообщество.</span>
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: 'Users', text: 'видеть коллег' },
                { icon: 'TrendingUp', text: 'развиваться' },
                { icon: 'MessageSquare', text: 'обмениваться опытом' }
              ].map((item, index) => (
                <Card key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 border-2">
                  <CardContent className="p-6 text-center">
                    <Icon name={item.icon as any} size={32} className="text-blue-600 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-900">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gray-900">
              Расти осознанно
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: 'Tag', text: 'специальные предложения от школ' },
                { icon: 'Percent', text: 'запросы на скидки' },
                { icon: 'Award', text: 'отличительные знаки обучения' }
              ].map((item, index) => (
                <Card key={index} className="bg-white border-2 hover:shadow-xl transition-all">
                  <CardContent className="p-6 text-center">
                    <Icon name={item.icon as any} size={28} className="text-orange-600 mx-auto mb-3" />
                    <p className="text-base text-gray-900">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-xl text-gray-700 font-medium">
              Ваш рост виден клиентам.
            </p>
          </div>
        </div>
      </section>

      {/* Promotion Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900">
              Когда вы готовы<br />быть заметнее
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Продвижение профиля — это не реклама.<br />
              Это возможность быть выше в каталоге,<br />
              когда вы чувствуете, что готовы к росту.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900">
              Начните бесплатно.<br />
              Развивайтесь в своём темпе.
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white border-2 border-green-500">
                <CardContent className="p-8">
                  <Icon name="Check" size={32} className="text-green-600 mx-auto mb-4" />
                  <p className="text-xl font-bold text-gray-900 mb-2">Базовые функции</p>
                  <p className="text-gray-600">бесплатно</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-blue-500">
                <CardContent className="p-8">
                  <Icon name="Zap" size={32} className="text-blue-600 mx-auto mb-4" />
                  <p className="text-xl font-bold text-gray-900 mb-2">Расширенные возможности</p>
                  <p className="text-gray-600">по желанию</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2 text-gray-600">
              <p>Без обязательств.</p>
              <p>Без скрытых условий.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Профессия — это диалог
            </h2>
            <p className="text-xl md:text-2xl mb-12 leading-relaxed opacity-95">
              Если вы чувствуете, что готовы к росту,<br />
              Док диалог станет вашим пространством развития.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/register/masseur')}
              className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-8 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all"
            >
              Создать профиль специалиста
              <Icon name="ArrowRight" size={24} className="ml-3" />
            </Button>

            <p className="mt-12 text-lg opacity-80">
              Не просто профиль. Не просто клиенты.<br />
              <strong className="text-xl">А диалог — с собой, с профессией и с сообществом.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm">
            © 2026 Док диалог. Пространство профессионального диалога и роста.
          </p>
        </div>
      </footer>
    </div>
  );
}
