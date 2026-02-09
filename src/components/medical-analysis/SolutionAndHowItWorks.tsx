import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const SolutionAndHowItWorks = () => {
  return (
    <>
      {/* Solution Section */}
      <section id="solution" className="py-16 md:py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 md:p-12 lg:p-16 bg-white border-2 border-green-200 shadow-2xl rounded-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-slate-900">
                    Решение — инструмент «Расшифровка заключения»
                  </h2>
                  <p className="text-lg md:text-xl mb-6 text-slate-700 leading-relaxed">
                    Мы создали инструмент, который помогает массажисту <strong>спокойно разобраться в тексте заключения</strong>, не нарушая границ профессии.
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200 mb-6 shadow-md">
                    <p className="text-lg mb-4 font-semibold text-slate-800">
                      Это <strong className="text-blue-600">не медицинская консультация</strong><br />
                      и <strong className="text-purple-600">не постановка диагнозов</strong>.
                    </p>
                    <p className="text-lg text-slate-700">
                      Это — перевод сложного текста<br />
                      на <strong>понятный, нейтральный и практичный язык</strong>.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/50428aab-3296-4aca-9cbb-e5d0ae1b6af2.jpg" 
                    alt="Доктор анализирует медицинское заключение" 
                    className="w-full h-auto rounded-xl shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl font-bold hidden md:block">
                    ✓ Профессионально
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-slate-900">
              Как работает инструмент
            </h2>
            <p className="text-xl text-center text-slate-600 mb-16 max-w-3xl mx-auto">
              Три простых шага до полной ясности
            </p>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-200 rounded-2xl relative overflow-hidden">
                <div className="absolute top-4 right-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="flex items-center justify-center w-20 h-20 bg-blue-200 rounded-full mb-6 mx-auto">
                  <Icon name="Upload" size={40} className="text-blue-700" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-slate-900">Загружаете заключение</h3>
                <p className="text-center text-slate-700 text-lg leading-relaxed">
                  Фото или файл — в любом формате. Система распознаёт текст автоматически.
                </p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-200 rounded-2xl relative overflow-hidden">
                <div className="absolute top-4 right-4 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div className="flex items-center justify-center w-20 h-20 bg-green-200 rounded-full mb-6 mx-auto">
                  <Icon name="MessageSquare" size={40} className="text-green-700" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-slate-900">Указываете запрос</h3>
                <p className="text-center text-slate-700 text-lg leading-relaxed">
                  Например: «Что значит "дорсопатия"?» или «Какие есть ограничения для массажа?»
                </p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-purple-200 rounded-2xl relative overflow-hidden">
                <div className="absolute top-4 right-4 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div className="flex items-center justify-center w-20 h-20 bg-purple-200 rounded-full mb-6 mx-auto">
                  <Icon name="Sparkles" size={40} className="text-purple-700" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-slate-900">Получаете ответ</h3>
                <p className="text-center text-slate-700 text-lg leading-relaxed">
                  Простое объяснение на вашем языке — с учётом границ профессии массажиста.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 md:p-12 lg:p-16 bg-white border-2 border-slate-200 shadow-2xl rounded-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center text-slate-900">
                Что входит в расшифровку
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4 p-6 bg-green-50 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
                  <Icon name="CheckCircle2" size={32} className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xl font-bold mb-2 text-slate-900">Расшифровка терминов</p>
                    <p className="text-slate-600 text-lg">Понятное объяснение слов из заключения — без медицинского сленга</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
                  <Icon name="CheckCircle2" size={32} className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xl font-bold mb-2 text-slate-900">Практический смысл</p>
                    <p className="text-slate-600 text-lg">Что это значит для работы массажиста — с учётом профессиональных границ</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-purple-50 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow">
                  <Icon name="CheckCircle2" size={32} className="text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xl font-bold mb-2 text-slate-900">Рекомендации для разговора</p>
                    <p className="text-slate-600 text-lg">Как обсудить запрос спокойно и корректно с клиентом</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-orange-50 rounded-xl border border-orange-200 hover:shadow-lg transition-shadow">
                  <Icon name="CheckCircle2" size={32} className="text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xl font-bold mb-2 text-slate-900">Указания на ограничения</p>
                    <p className="text-slate-600 text-lg">Когда стоит направить клиента к врачу или действовать с особой осторожностью</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default SolutionAndHowItWorks;