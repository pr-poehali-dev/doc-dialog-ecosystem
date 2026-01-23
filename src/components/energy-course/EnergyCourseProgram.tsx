import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

export default function EnergyCourseProgram() {
  return (
    <>
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-12 sm:mb-16 md:mb-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Что вы получите после курса
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
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
              <div key={index} className="group flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Icon name="Star" size={20} className="text-yellow-500 mt-1 flex-shrink-0 fill-yellow-500 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-8 sm:mb-10 md:mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            В чём суть метода
          </h2>

          <p className="text-xl sm:text-2xl md:text-3xl text-center text-gray-700 mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto font-light leading-relaxed">
            Работа через <strong className="text-indigo-600">энергетический двойник</strong> — это практический навык регуляции состояния и передачи воздействия через поле.
          </p>

          <div className="space-y-5 sm:space-y-6 md:space-y-8">
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
              <div key={index} className="group flex items-start gap-4 sm:gap-5 md:gap-6 p-5 sm:p-6 md:p-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 rounded-2xl sm:rounded-3xl border-2 border-indigo-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Icon name={item.icon as any} size={28} className="text-indigo-600 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="program" className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-12 sm:mb-16 md:mb-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Программа курса
          </h2>

          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-indigo-300 hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center text-white font-bold text-2xl sm:text-3xl md:text-4xl shadow-lg">
                  1
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">День 1: Телесная регуляция и поле</h3>
              </div>

              <ul className="space-y-3 sm:space-y-4 md:space-y-5 sm:ml-4 md:ml-6">
                {[
                  'Диагностика текущего состояния: как вы работаете сейчас',
                  'Телесное центрирование и управление тонусом',
                  'Восстановление энергии за 5–10 минут',
                  'Настройка чувствительности рук',
                  'Восприятие энергетического поля клиента',
                  'Работа с границами: не «забирать» состояние',
                  'Практика: передача воздействия через поле'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 sm:gap-4">
                    <Icon name="CircleDot" size={20} className="text-indigo-600 mt-1 flex-shrink-0 sm:w-6 sm:h-6" />
                    <span className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-purple-300 hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl flex items-center justify-center text-white font-bold text-2xl sm:text-3xl md:text-4xl shadow-lg">
                  2
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">День 2: Энергетический двойник</h3>
              </div>

              <ul className="space-y-3 sm:space-y-4 md:space-y-5 sm:ml-4 md:ml-6">
                {[
                  'Что такое энергетический двойник — теория и практика',
                  'Как работать через двойника бесконтактно',
                  'Наполнение клиента через поле',
                  'Работа с хроникой и глубокими блоками',
                  'Дистанционная работа — принципы безопасности',
                  'Интеграция навыка в телесную практику',
                  'Индивидуальная супервизия: разбор вашей работы'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 sm:gap-4">
                    <Icon name="CircleDot" size={20} className="text-purple-600 mt-1 flex-shrink-0 sm:w-6 sm:h-6" />
                    <span className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-12 sm:mb-16 md:mb-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Форматы участия
          </h2>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl border-2 sm:border-4 border-indigo-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-indigo-900">Базовый</h3>
                <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600">35 000 ₽</p>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {[
                  '2 дня офлайн-практики',
                  'Все материалы курса',
                  'Работа в парах и группе',
                  'Чат поддержки 30 дней'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 sm:gap-4">
                    <Icon name="Check" size={20} className="text-green-600 mt-1 flex-shrink-0 sm:w-6 sm:h-6" />
                    <span className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-indigo-400 relative overflow-hidden hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-yellow-400 text-indigo-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-bold shadow-lg">
                Рекомендуем
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">С супервизией</h3>
                <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">50 000 ₽</p>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {[
                  'Всё из базового',
                  'Индивидуальная супервизия (2 часа)',
                  'Разбор вашей практики',
                  'Персональные рекомендации',
                  'Чат поддержки 90 дней'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 sm:gap-4">
                    <Icon name="Check" size={20} className="text-yellow-300 mt-1 flex-shrink-0 sm:w-6 sm:h-6" />
                    <span className="text-white text-base sm:text-lg md:text-xl leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 text-center space-y-5">
            <p className="text-gray-600 text-base sm:text-lg md:text-xl font-medium">Количество мест ограничено — до 12 человек</p>
            <Button 
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all duration-300 hover:scale-105 font-semibold"
              onClick={() => window.open('https://t.me/SergeuVodopianov', '_blank')}
            >
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Узнать какой формат подойдёт вам
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}