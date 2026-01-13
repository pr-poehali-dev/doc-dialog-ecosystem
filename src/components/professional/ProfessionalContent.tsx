import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ProfessionalContent() {
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
    <>
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
                  src="https://cdn.poehali.dev/files/female-patient-undergoing-therapy-with-physiotherapist.jpg"
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
    </>
  );
}