import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";

export default function EnergyCourse() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <Navigation />
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.poehali.dev/files/c4a567cf-dd31-4be5-b8bd-ae29a34a75f3.jpg')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/70 to-slate-900/80"></div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
                <Icon name="Sparkles" size={20} className="text-yellow-300" />
                <span className="text-sm font-medium">Практический офлайн-курс</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Энергия практикующего
              </h1>
              
              <p className="text-xl md:text-2xl mb-4 text-purple-200">
                Телесно-энергетическая регуляция и работа с энергетическим двойником
              </p>
              
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Для массажистов, телесных терапевтов, остеопатов и целителей, которые хотят работать глубже, дольше и стабильнее — без выгорания и потери энергии
              </p>

              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={20} className="text-purple-300" />
                  <span>2 дня</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={20} className="text-purple-300" />
                  <span>Офлайн</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Target" size={20} className="text-purple-300" />
                  <span>70% практика</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={20} className="text-purple-300" />
                  <span>Ограниченная группа</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
                <Button 
                  size="lg"
                  className="text-lg px-8 py-6 bg-white text-indigo-900 hover:bg-gray-100 shadow-2xl hover:shadow-white/50 transition-all"
                  onClick={() => window.open('https://t.me/docdialog', '_blank')}
                >
                  <Icon name="Rocket" size={22} className="mr-2" />
                  Записаться на курс
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 border-white bg-white/10 backdrop-blur-md text-white hover:bg-white/20 shadow-lg"
                  onClick={() => document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Icon name="BookOpen" size={22} className="mr-2" />
                  Узнать программу
                </Button>
              </div>

              {/* Image placeholder */}
              <div className="w-full max-w-3xl mx-auto h-64 md:h-96 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <Icon name="Image" size={48} className="mx-auto mb-2 text-white/50" />
                  <p className="text-white/70 text-sm">Место под фото курса</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Promise */}
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

      {/* Author Story */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Почему этот курс появился
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Author photo placeholder */}
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

      {/* Target Audience */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* For whom */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="CheckCircle" size={32} className="text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900">Для кого этот курс</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Массажист или телесный терапевт',
                  'Остеопат или мануальный специалист',
                  'Целитель или практик, работающий с людьми',
                  'Чувствуете усталость после клиентов',
                  'Хотите усилить эффект своей работы'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not for whom */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border-2 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="XCircle" size={32} className="text-red-600" />
                <h3 className="text-2xl font-bold text-gray-900">Кому не подойдёт</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Ищете «волшебные ритуалы»',
                  'Не готовы работать с телом',
                  'Ждёте результата без практики'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="X" size={20} className="text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="text-gray-900 font-semibold">Это прикладной курс, а не теория</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
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

      {/* Method */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            В чём суть метода
          </h2>
          
          <p className="text-2xl text-center font-bold text-gray-900 mb-12">
            Это не эзотерика и не вера
          </p>

          <div className="space-y-4">
            {[
              'Тело как аккумулятор жизненной энергии',
              'Внимание как инструмент регуляции',
              'Личный энергетический контур как защита от выгорания',
              'Энергетический двойник как способ углубления работы',
              'Использование внешнего источника энергии для безопасности'
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                  {index + 1}
                </div>
                <span className="text-gray-700 text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="py-12 md:py-20 px-4 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Программа курса
          </h2>

          <div className="space-y-8">
            {/* Day 1 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-indigo-200">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">День 1</h3>
                <p className="text-xl text-purple-100">Энергия и тело практикующего</p>
              </div>
              
              <div className="p-6 md:p-8">
                <ul className="space-y-3">
                  {[
                    'Что такое энергия в прикладном смысле',
                    'Почему специалисты выгорают',
                    'Диагностика собственного состояния',
                    'Тело как источник и накопитель энергии',
                    'Телесные практики наполнения',
                    'Заземление и устойчивость',
                    'Активация рук как проводников',
                    'Личный энергетический контур',
                    'Восстановление после клиентов'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icon name="Circle" size={8} className="text-indigo-600 mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <p className="text-gray-900 font-semibold">
                    Результат дня: устойчивое состояние, наполненное тело, живые руки
                  </p>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-purple-200">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">День 2</h3>
                <p className="text-xl text-purple-100">Энергетический двойник и углубление работы</p>
              </div>
              
              <div className="p-6 md:p-8">
                <ul className="space-y-3">
                  {[
                    'Энергетический двойник: принципы и практика',
                    'Взаимодействие с двойником клиента',
                    'Наполнение без физического контакта',
                    'Работа с истощёнными состояниями',
                    'Основы дистанционной подпитки',
                    'Подключение к внешнему источнику энергии',
                    'Экологичное завершение контакта',
                    'Интеграция в массаж и телесную терапию'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icon name="Circle" size={8} className="text-purple-600 mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <p className="text-gray-900 font-semibold">
                    Результат дня: умение работать глубже, дольше и безопасно
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Format */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Формат обучения
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'MapPin', text: 'Офлайн-тренинг' },
              { icon: 'Calendar', text: '2 полных дня' },
              { icon: 'Target', text: '70% — практика' },
              { icon: 'Users2', text: 'Работа в парах' },
              { icon: 'MessageCircle', text: 'Обратная связь от тренера' },
              { icon: 'Shield', text: 'Малая группа' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center gap-4 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 hover:shadow-lg transition-shadow">
                <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full">
                  <Icon name={item.icon as any} size={32} className="text-indigo-600" />
                </div>
                <p className="text-gray-700 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            Форматы участия и стоимость
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Standard */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 hover:border-white/40 transition-all">
              <h3 className="text-2xl font-bold mb-4">Стандарт</h3>
              <div className="text-4xl font-bold mb-6">35 000 ₽</div>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Участие в 2-дневном курсе',
                  'Все практики и методики',
                  'Работа в группе',
                  'Раздаточные материалы',
                  'Сертификат участника'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-green-400 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full py-6 text-lg bg-white text-indigo-900 hover:bg-gray-100"
                onClick={() => window.open('https://t.me/docdialog', '_blank')}
              >
                Записаться
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>

            {/* VIP */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-8 border-2 border-yellow-400/50 hover:border-yellow-400 transition-all relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
                  VIP
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Глубокое погружение</h3>
              <div className="text-4xl font-bold mb-6">70 000 ₽</div>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Всё из формата «Стандарт»',
                  'Индивидуальная сессия с Сергеем (30–60 мин)',
                  'Разбор личного запроса',
                  'Углублённая настройка состояния',
                  'Приоритетная обратная связь'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="Star" size={20} className="text-yellow-400 mt-1 flex-shrink-0 fill-yellow-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full py-6 text-lg bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 hover:from-yellow-500 hover:to-orange-500 font-bold"
                onClick={() => window.open('https://t.me/docdialog', '_blank')}
              >
                Забронировать VIP
                <Icon name="Crown" size={20} className="ml-2" />
              </Button>

              <p className="text-center text-sm text-yellow-200 mt-4">
                Количество мест ограничено
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Часто задаваемые вопросы
          </h2>

          <div className="space-y-4">
            {[
              { q: 'Это эзотерика?', a: 'Нет. Это прикладная работа с телом, вниманием и состоянием.' },
              { q: 'Нужны ли особые способности?', a: 'Нет. Навыки развиваются через практику.' },
              { q: 'Подойдёт ли курс массажисту?', a: 'Да. Курс адаптирован под массаж и телесную терапию.' },
              { q: 'Можно ли использовать сразу в работе?', a: 'Да. Все практики прикладные.' },
              { q: 'Будет ли сертификат?', a: 'Да, сертификат участника курса.' }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Этот курс — не про «отдавать энергию»
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 text-purple-200">
            Он про то, чтобы:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: 'Shield', text: 'Сохранять себя' },
              { icon: 'Zap', text: 'Работать из состояния силы' },
              { icon: 'Heart', text: 'Быть источником, а не расходником' }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <Icon name={item.icon as any} size={32} className="mx-auto mb-3 text-purple-300" />
                <p className="text-lg font-medium">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="text-2xl font-bold mb-8">
            Если вы хотите работать глубже, спокойнее и без выгорания — приходите на курс
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="text-lg px-10 py-7 bg-white text-indigo-900 hover:bg-gray-100 shadow-2xl"
              onClick={() => window.open('https://t.me/docdialog', '_blank')}
            >
              <Icon name="Rocket" size={22} className="mr-2" />
              Записаться на курс
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-10 py-7 border-2 border-white bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
              onClick={() => window.open('https://t.me/docdialog_bot', '_blank')}
            >
              <Icon name="MessageCircle" size={22} className="mr-2" />
              Задать вопрос
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/Group 7 (7).png" 
                  alt="Док диалог" 
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Экосистема для профессионального роста специалистов по телу
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Для специалистов</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => navigate("/register")} className="hover:text-primary transition-colors">
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

          <div className="border-t border-gray-700 pt-8">
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-400 max-w-4xl mx-auto">
                Док диалог не оказывает медицинских услуг, не ставит диагнозы и не назначает лечение. Вся информация носит ознакомительный характер.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-400 text-center sm:text-left">
                <p>© 2025 Док диалог. Все права защищены.</p>
                <p className="mt-1">ИП Водопьянов С.Г. ИНН 165045847936</p>
                <p>ОГРНИП 321508100047334</p>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href="https://t.me/docdialog" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                >
                  <Icon name="Send" size={20} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Telegram</span>
                </a>
                <a 
                  href="https://t.me/docdialog_bot" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                >
                  <Icon name="Bot" size={20} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Тех поддержка</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}