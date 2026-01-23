import Icon from "@/components/ui/icon";

export default function EnergyCourseContent() {
  return (
    <>
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Работайте из наполненного состояния
          </h2>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-center text-gray-600 mb-12 sm:mb-16 md:mb-20 font-light">
            Не отдавая свою энергию
          </p>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {[
              { icon: 'Zap', text: 'Сохранять силу и ясность до конца рабочего дня' },
              { icon: 'RefreshCw', text: 'Быстро восстанавливаться между приёмами' },
              { icon: 'TrendingUp', text: 'Усиливать эффект телесной работы через состояние и поле' },
              { icon: 'Shield', text: 'Работать глубже — без напряжения и истощения' }
            ].map((item, index) => (
              <div key={index} className="group flex items-start gap-4 sm:gap-5 p-5 sm:p-6 md:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-indigo-100 hover:border-indigo-300 hover:-translate-y-1">
                <div className="p-3 sm:p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl sm:rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={item.icon as any} size={24} className="text-indigo-600 sm:w-7 sm:h-7" />
                </div>
                <p className="text-gray-700 font-medium text-base sm:text-lg md:text-xl leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-purple-50/30 to-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-12 sm:mb-16 md:mb-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Почему этот курс появился
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-full aspect-[3/4] rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-indigo-200 overflow-hidden shadow-2xl">
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/bucket/c7cae210-3f9f-415d-915e-2e190e35bf81.png"
                  alt="Сергей Водопьянов"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-5 sm:space-y-6 md:space-y-8">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">Сергей Водопьянов</h3>
                <p className="text-lg sm:text-xl md:text-2xl text-indigo-600 font-medium">Практикующий остеопат</p>
              </div>

              <p className="text-gray-700 leading-relaxed text-base sm:text-lg md:text-xl">
                Я веду приём <strong className="text-indigo-600">с 12:00 до 22:00</strong>, ежедневно работаю с болью, хроническими состояниями, истощением и стрессом.
              </p>

              <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 rounded-2xl sm:rounded-3xl border-2 border-purple-200 shadow-lg">
                <p className="text-lg sm:text-xl md:text-2xl italic text-gray-800 font-medium">
                  «Как вы сохраняете энергию до конца дня?»
                </p>
                <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-3">— частый вопрос от клиентов</p>
              </div>

              <p className="text-gray-700 leading-relaxed text-base sm:text-lg md:text-xl">
                Ответ прост: я <strong className="text-indigo-600">не трачу энергию — я умею её регулировать</strong>.
              </p>

              <p className="text-gray-700 leading-relaxed text-base sm:text-lg md:text-xl">
                За годы практики я выстроил систему работы с телом, вниманием и энергетическим полем, которая позволяет работать глубоко и эффективно, не разрушая себя.
              </p>

              <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-2xl sm:rounded-3xl text-white shadow-2xl">
                <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
                  Этот курс — передача моего реального рабочего состояния и прикладных навыков, которые я использую каждый день.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="p-3 sm:p-4 bg-green-100 rounded-xl sm:rounded-2xl shadow-md">
                  <Icon name="CheckCircle2" size={32} className="text-green-600 sm:w-10 sm:h-10" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Для кого этот курс</h3>
              </div>

              <ul className="space-y-3 sm:space-y-4 md:space-y-5">
                {[
                  'Массажисты, телесные терапевты, остеопаты',
                  'Специалисты, которые устают после работы',
                  'Те, кто хочет работать глубже и эффективнее',
                  'Практики, готовые осваивать тонкие уровни работы',
                  'Те, кто ищет устойчивое состояние в работе'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 sm:gap-4">
                    <Icon name="Check" size={20} className="text-green-600 mt-1 flex-shrink-0 sm:w-6 sm:h-6" />
                    <span className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 via-orange-50 to-red-50 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-red-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="p-3 sm:p-4 bg-red-100 rounded-xl sm:rounded-2xl shadow-md">
                  <Icon name="XCircle" size={32} className="text-red-600 sm:w-10 sm:h-10" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Не подойдёт, если</h3>
              </div>

              <ul className="space-y-3 sm:space-y-4 md:space-y-5">
                {[
                  'Вы ищете готовые техники без понимания принципов',
                  'Не готовы погружаться в телесную осознанность',
                  'Ожидаете только теорию без практики',
                  'Не верите в энергетическую работу',
                  'Хотите быстрое решение без глубины'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 sm:gap-4">
                    <Icon name="X" size={20} className="text-red-600 mt-1 flex-shrink-0 sm:w-6 sm:h-6" />
                    <span className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">{item}</span>
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