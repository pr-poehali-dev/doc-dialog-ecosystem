import Icon from "@/components/ui/icon";

export default function EnergyCourseProgram() {
  return (
    <>
      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Что вы получите после курса
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Работаете из устойчивого, наполненного состояния',
              'Быстро восстанавливаете энергию (5–10 минут)',
              'Усиливаете чувствительность рук',
              'Перестаёте «отдавать себя» клиентам',
              'Умеете наполнять клиента через поле',
              'Осваиваете работу с энергетическим двойником',
              'Понимаете безопасную дистанционную работу',
              'Выстраиваете экологичные границы с клиентами'
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <Icon name="Star" size={20} className="text-yellow-500 mt-1 flex-shrink-0 fill-yellow-500" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            В чём суть метода
          </h2>

          <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Работа через <strong>энергетический двойник</strong> — это практический навык регуляции состояния и передачи воздействия через поле.
          </p>

          <div className="space-y-6">
            {[
              {
                title: 'Телесная регуляция',
                description: 'Учимся управлять собственным тонусом и состоянием через дыхание, центрирование и осознанность тела.',
                icon: 'Activity'
              },
              {
                title: 'Энергетическое поле',
                description: 'Настраиваем восприятие поля клиента, учимся считывать зоны напряжения и передавать воздействие бесконтактно.',
                icon: 'Radio'
              },
              {
                title: 'Энергетический двойник',
                description: 'Осваиваем работу через «энергетическое тело» — способ взаимодействия с клиентом без физического контакта и истощения.',
                icon: 'Users'
              },
              {
                title: 'Безопасность',
                description: 'Выстраиваем границы, учимся «не забирать» состояние клиента и защищать своё поле.',
                icon: 'Shield'
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                <div className="p-3 bg-white rounded-xl flex-shrink-0 shadow-sm">
                  <Icon name={item.icon as any} size={28} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="program" className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Программа курса
          </h2>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-indigo-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900">День 1: Телесная регуляция и поле</h3>
              </div>

              <ul className="space-y-4 ml-15">
                {[
                  'Диагностика текущего состояния: как вы работаете сейчас',
                  'Телесное центрирование и управление тонусом',
                  'Восстановление энергии за 5–10 минут',
                  'Настройка чувствительности рук',
                  'Восприятие энергетического поля клиента',
                  'Работа с границами: не «забирать» состояние',
                  'Практика: передача воздействия через поле'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="CircleDot" size={20} className="text-indigo-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900">День 2: Энергетический двойник</h3>
              </div>

              <ul className="space-y-4 ml-15">
                {[
                  'Что такое энергетический двойник — теория и практика',
                  'Как работать через двойника бесконтактно',
                  'Наполнение клиента через поле',
                  'Работа с хроникой и глубокими блоками',
                  'Дистанционная работа — принципы безопасности',
                  'Интеграция навыка в телесную практику',
                  'Индивидуальная супервизия: разбор вашей работы'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="CircleDot" size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Форматы участия
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-indigo-300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-indigo-900">Базовый</h3>
                <p className="text-3xl font-bold text-indigo-600 mb-4">35 000 ₽</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  '2 дня офлайн-практики',
                  'Все материалы курса',
                  'Работа в парах и группе',
                  'Чат поддержки 30 дней'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-2xl shadow-2xl border-2 border-indigo-400 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-yellow-400 text-indigo-900 px-3 py-1 rounded-full text-sm font-bold">
                Рекомендуем
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-white">С супервизией</h3>
                <p className="text-3xl font-bold text-white mb-4">50 000 ₽</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Всё из базового',
                  'Индивидуальная супервизия (2 часа)',
                  'Разбор вашей практики',
                  'Персональные рекомендации',
                  'Чат поддержки 90 дней'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-yellow-300 mt-1 flex-shrink-0" />
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Количество мест ограничено — до 12 человек</p>
          </div>
        </div>
      </section>
    </>
  );
}
