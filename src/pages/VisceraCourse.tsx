import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import SchoolsHeader from "@/components/schools/SchoolsHeader";
import SchoolsFooter from "@/components/schools/SchoolsFooter";
import { useNavigate } from "react-router-dom";

export default function VisceraCourse() {
  const navigate = useNavigate();

  const benefits = [
    "Понимание как органы двигаются и должны двигаться",
    "Осознание связи органов, фасций, позвоночника и ВНС",
    "Чёткие алгоритмы диагностики",
    "Безопасные и логичные техники",
    "Уверенность в работе руками"
  ];

  const targetAudience = [
    { icon: "Hand", text: "Массажисты (классика, восстановительный, лимфодренаж)" },
    { icon: "Users", text: "Специалисты по телесной терапии" },
    { icon: "Activity", text: "Остеопатические и мануальные практики" },
    { icon: "TrendingUp", text: "Те, кто хочет работать глубже, но без риска" },
    { icon: "Heart", text: "Специалисты, работающие с животом, осанкой, ВНС" }
  ];

  const modules = [
    {
      number: "01",
      title: "Мануальная терапия внутренних органов",
      description: "Что такое висцеральная терапия и чем она не является. Показания и противопоказания. Ошибки начинающих.",
      result: "Понимание границ и ответственности специалиста"
    },
    {
      number: "02",
      title: "Физиология полости живота и таза",
      description: "Топография органов, связки и фасциальные подвесы, кровоснабжение и иннервация.",
      result: "Вы понимаете, что и почему реагирует под руками"
    },
    {
      number: "03",
      title: "Нарушение висцеральной подвижности",
      description: "Причины ограничений: стресс, операции, воспаления, спайки. Влияние на осанку и боли.",
      result: "Вы видите первопричину, а не симптом"
    },
    {
      number: "04",
      title: "Техника приёмов",
      description: "Положение рук, направление векторов, работа без боли. Как «слушать» ткань.",
      result: "Уверенная и безопасная работа руками"
    },
    {
      number: "05",
      title: "Принципы лечения и диагностики",
      description: "Последовательность работы, клиническое мышление массажиста.",
      result: "Системная работа, а не хаотичные движения"
    },
    {
      number: "06",
      title: "Мануальная терапия желудка",
      description: "Связь с грудным отделом и диафрагмой. Работа при функциональных нарушениях.",
      result: "Практические навыки работы с желудком"
    },
    {
      number: "07",
      title: "Терапия тонкого кишечника",
      description: "Перистальтика, влияние на иммунитет. Работа с напряжением и спазмом.",
      result: "Понимание работы тонкого кишечника"
    },
    {
      number: "08",
      title: "Терапия толстого кишечника",
      description: "Запоры и застойные явления. Связь с поясницей и тазом.",
      result: "Эффективная работа с кишечником"
    },
    {
      number: "09",
      title: "Мануальная терапия печени",
      description: "Печень как центр метаболизма. Связь с правым плечом и шеей.",
      result: "Работа с застойными явлениями печени"
    },
    {
      number: "10",
      title: "Мануальная терапия желчного пузыря",
      description: "Отток желчи, работа с правым подреберьем.",
      result: "Понимание работы желчного пузыря"
    },
    {
      number: "11",
      title: "Мануальная терапия поджелудочной железы",
      description: "Глубокая, осторожная работа. Связь с сахарным обменом и стрессом.",
      result: "Безопасная работа с поджелудочной"
    },
    {
      number: "12",
      title: "Мануальная терапия почек",
      description: "Подвижность почек, связь с поясницей. Работа с утомляемостью и тонусом.",
      result: "Навыки работы с почками"
    },
    {
      number: "13",
      title: "Мануальная терапия мочевого пузыря",
      description: "Положение таза, связь с крестцом. Показания и ограничения.",
      result: "Практика работы с мочевым пузырём"
    },
    {
      number: "14",
      title: "Мануальная терапия женской половой сферы",
      description: "Анатомия и физиология. Работа с напряжением и застоем.",
      result: "Этические и профессиональные границы"
    },
    {
      number: "15",
      title: "Внутривлагалищные гинекологические манипуляции",
      description: "⚠️ Профессиональный блок. Показания, противопоказания, этика и согласие.",
      result: "Высокий уровень ответственности",
      isPro: true
    }
  ];

  const results = [
    { icon: "Brain", text: "Понимаете висцеральную терапию на уровне логики, а не мифов" },
    { icon: "Search", text: "Уверенно диагностируете ограничения" },
    { icon: "Shield", text: "Безопасно работаете с органами" },
    { icon: "TrendingUp", text: "Усиливаете эффект массажа и остеопатии" },
    { icon: "Award", text: "Повышаете ценность своих услуг" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SchoolsHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/[0.03] via-purple-500/[0.03] to-primary/[0.06] pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Icon name="Sparkles" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Онлайн-курс</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
              Висцералка: с нуля
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Мануальная терапия внутренних органов для массажистов и телесных специалистов
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                <Icon name="Play" size={20} className="mr-2" />
                Записаться на курс
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                <Icon name="Info" size={20} className="mr-2" />
                Узнать подробнее
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Icon name="Users" size={16} className="text-primary" />
                <span>15 модулей</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span>40+ часов практики</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Award" size={16} className="text-primary" />
                <span>Сертификат</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">О курсе</h2>
            
            <Card className="p-8 md:p-12 bg-gradient-to-br from-white to-primary/5 border-2 border-primary/10">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                «Висцералка: с нуля» — это базовый, системный и практический курс по мануальной терапии внутренних органов.
              </p>
              
              <div className="bg-white rounded-lg p-6 mb-6 border border-primary/20">
                <p className="font-semibold text-gray-900 mb-3">Курс создан для специалистов, которые:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Хотят безопасно и осознанно работать с животом и органами</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Не понимают, что именно трогать, зачем и как</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Боятся навредить клиенту</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Хотят выйти за рамки поверхностного массажа</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg p-6">
                <p className="text-center font-semibold text-gray-900 mb-3">Это не набор «приёмчиков», а логичная система:</p>
                <div className="flex flex-wrap justify-center gap-2 text-sm font-medium">
                  <span className="px-3 py-1 bg-white rounded-full">Анатомия</span>
                  <Icon name="ArrowRight" size={16} className="text-primary self-center" />
                  <span className="px-3 py-1 bg-white rounded-full">Физиология</span>
                  <Icon name="ArrowRight" size={16} className="text-primary self-center" />
                  <span className="px-3 py-1 bg-white rounded-full">Диагностика</span>
                  <Icon name="ArrowRight" size={16} className="text-primary self-center" />
                  <span className="px-3 py-1 bg-white rounded-full">Техника</span>
                  <Icon name="ArrowRight" size={16} className="text-primary self-center" />
                  <span className="px-3 py-1 bg-white rounded-full">Клиническое мышление</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Images Showcase */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/78f8621d-0ff5-486d-b0e7-679188b17ba2.jpg" 
                alt="Висцеральная терапия" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/ad4157c1-c115-499f-b544-ab00513370f1.jpg" 
                alt="Обучение висцеральной терапии" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/46e0c9cb-0a4b-4469-810d-1c2d917db915.jpg" 
                alt="Практика висцеральной терапии" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Для кого этот курс</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {targetAudience.map((item, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as any} size={24} className="text-primary" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item.text}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-amber-50 border-2 border-amber-200">
              <div className="flex items-start gap-3">
                <Icon name="AlertCircle" size={24} className="text-amber-600 flex-shrink-0" />
                <p className="text-gray-900 font-medium">
                  Курс подходит даже без опыта висцеральной практики
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Ключевая ценность курса</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6 bg-gradient-to-br from-white to-primary/5 border-2 border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{benefit}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Программа курса</h2>
            
            <div className="space-y-4">
              {modules.map((module, index) => (
                <Card key={index} className={`p-6 md:p-8 hover:shadow-lg transition-all border-2 ${
                  module.isPro 
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:border-amber-300' 
                    : 'bg-white border-gray-100 hover:border-primary/30'
                }`}>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-2xl ${
                      module.isPro 
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' 
                        : 'bg-gradient-to-br from-primary to-purple-600 text-white'
                    }`}>
                      {module.number}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                      <p className="text-gray-700 mb-3">{module.description}</p>
                      <div className="flex items-start gap-2 text-sm">
                        <Icon name="Target" size={16} className={`flex-shrink-0 mt-0.5 ${module.isPro ? 'text-amber-600' : 'text-primary'}`} />
                        <span className={module.isPro ? 'text-amber-900 font-medium' : 'text-gray-600'}>
                          <strong>Результат:</strong> {module.result}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Отзывы выпускников</h2>
          <p className="text-center text-gray-600 mb-12">Более 500 специалистов прошли курс</p>

          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide cursor-grab active:cursor-grabbing">
            <div className="flex gap-6 min-w-max">
              <div className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"Курс полностью изменил моё понимание работы с клиентами. Теперь я не просто массажист, а специалист, который понимает глубинные процессы в теле."</p>
                <div>
                  <p className="font-semibold text-gray-900">Елена Петрова</p>
                  <p className="text-sm text-gray-600">Массажист, 8 лет опыта</p>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"Очень системный подход. Анатомия, физиология, практика — всё связано логично. После курса уверенно работаю с органами, клиенты в восторге."</p>
                <div>
                  <p className="font-semibold text-gray-900">Дмитрий Волков</p>
                  <p className="text-sm text-gray-600">Телесный терапевт</p>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"Боялась работать с животом, не понимала что трогать. Курс дал чёткие алгоритмы и уверенность. Теперь висцералка — моя специализация!"</p>
                <div>
                  <p className="font-semibold text-gray-900">Анна Смирнова</p>
                  <p className="text-sm text-gray-600">Массажист, 5 лет опыта</p>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"Преподаватели объясняют сложные вещи простым языком. Практика на реальных клиентах под супервизией — бесценный опыт."</p>
                <div>
                  <p className="font-semibold text-gray-900">Сергей Иванов</p>
                  <p className="text-sm text-gray-600">Остеопат</p>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"Курс стоит каждого вложенного рубля. Мои доходы выросли в 2 раза благодаря новой специализации. Клиенты приходят именно на висцералку."</p>
                <div>
                  <p className="font-semibold text-gray-900">Ольга Новикова</p>
                  <p className="text-sm text-gray-600">Массажист</p>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"Работаю с хроническими болями в пояснице через органы — эффект поразительный. Спасибо за знания!"</p>
                <div>
                  <p className="font-semibold text-gray-900">Максим Лебедев</p>
                  <p className="text-sm text-gray-600">Мануальный терапевт</p>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"До курса делала классический массаж. Теперь работаю комплексно — тело, фасции, органы. Результаты у клиентов намного лучше."</p>
                <div>
                  <p className="font-semibold text-gray-900">Татьяна Кузнецова</p>
                  <p className="text-sm text-gray-600">Массажист, 10 лет опыта</p>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"Курс структурирован идеально. От анатомии до клинического мышления. Каждый модуль — новый уровень понимания."</p>
                <div>
                  <p className="font-semibold text-gray-900">Игорь Соколов</p>
                  <p className="text-sm text-gray-600">Телесный специалист</p>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"Рекомендую всем массажистам, кто хочет расти профессионально. Висцеральная терапия — это следующий уровень!"</p>
                <div>
                  <p className="font-semibold text-gray-900">Мария Попова</p>
                  <p className="text-sm text-gray-600">Массажист</p>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"Боялась навредить клиенту при работе с органами. После курса понимаю все процессы и работаю безопасно и эффективно."</p>
                <div>
                  <p className="font-semibold text-gray-900">Виктория Морозова</p>
                  <p className="text-sm text-gray-600">Массажист, 6 лет опыта</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Итог курса</h2>
            
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 via-purple-500/5 to-primary/10 border-2 border-primary/20">
              <p className="text-xl font-semibold text-center text-gray-900 mb-8">После курса вы:</p>
              
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={result.icon as any} size={24} className="text-primary" />
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed self-center">{result.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Готовы начать обучение?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Присоединяйтесь к курсу и освойте висцеральную терапию на профессиональном уровне
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100">
                <Icon name="Play" size={20} className="mr-2" />
                Записаться на курс
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/10">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Задать вопрос
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SchoolsFooter />
    </div>
  );
}