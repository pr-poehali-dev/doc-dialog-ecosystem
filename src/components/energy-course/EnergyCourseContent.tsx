import Icon from "@/components/ui/icon";

export default function EnergyCourseContent() {
  return (
    <>
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Работайте из наполненного состояния
          </h2>
          
          <p className="text-xl text-center text-gray-700 mb-12">
            Не отдавая свою энергию
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: 'Zap', text: 'Сохранять силу и ясность до конца рабочего дня' },
              { icon: 'RefreshCw', text: 'Быстро восстанавливаться между приёмами' },
              { icon: 'TrendingUp', text: 'Усиливать эффект телесной работы через состояние и поле' },
              { icon: 'Shield', text: 'Работать глубже — без напряжения и истощения' }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-indigo-100">
                <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex-shrink-0">
                  <Icon name={item.icon as any} size={24} className="text-indigo-600" />
                </div>
                <p className="text-gray-700 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Почему этот курс появился
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="w-full h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl border-2 border-indigo-200 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="User" size={64} className="mx-auto mb-2 text-indigo-300" />
                  <p className="text-gray-600">Фото Сергея Водопьянова</p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Сергей Водопьянов</h3>
                <p className="text-lg text-gray-700 mb-4">Практикующий остеопат</p>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Я веду приём <strong>с 12:00 до 22:00</strong>, ежедневно работаю с болью, хроническими состояниями, истощением и стрессом.
              </p>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                <p className="text-lg italic text-gray-800">
                  «Как вы сохраняете энергию до конца дня?»
                </p>
                <p className="text-sm text-gray-600 mt-2">— частый вопрос от клиентов</p>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Ответ прост: я <strong>не трачу энергию — я умею её регулировать</strong>.
              </p>

              <p className="text-gray-700 leading-relaxed">
                За годы практики я выстроил систему работы с телом, вниманием и энергетическим полем, которая позволяет работать глубоко и эффективно, не разрушая себя.
              </p>

              <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white">
                <p className="text-lg font-medium">
                  Этот курс — передача моего реального рабочего состояния и прикладных навыков, которые я использую каждый день.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Icon name="CheckCircle2" size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Для кого этот курс</h3>
              </div>

              <ul className="space-y-4">
                {[
                  'Массажисты, телесные терапевты, остеопаты',
                  'Специалисты, которые устают после работы',
                  'Те, кто хочет работать глубже и эффективнее',
                  'Практики, готовые осваивать тонкие уровни работы',
                  'Те, кто ищет устойчивое состояние в работе'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border-2 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 rounded-xl">
                  <Icon name="XCircle" size={32} className="text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Не подойдёт, если</h3>
              </div>

              <ul className="space-y-4">
                {[
                  'Вы ищете готовые техники без понимания принципов',
                  'Не готовы погружаться в телесную осознанность',
                  'Ожидаете только теорию без практики',
                  'Не верите в энергетическую работу',
                  'Хотите быстрое решение без глубины'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="X" size={20} className="text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
