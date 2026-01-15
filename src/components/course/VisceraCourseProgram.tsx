import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

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

const testimonials = [
  {
    text: "Курс полностью изменил моё понимание работы с клиентами. Теперь я не просто массажист, а специалист, который понимает глубинные процессы в теле.",
    author: "Елена Петрова",
    role: "Массажист, 8 лет опыта"
  },
  {
    text: "Очень системный подход. Анатомия, физиология, практика — всё связано логично. После курса уверенно работаю с органами, клиенты в восторге.",
    author: "Дмитрий Волков",
    role: "Телесный терапевт"
  },
  {
    text: "Боялась работать с животом, не понимала что трогать. Курс дал чёткие алгоритмы и уверенность. Теперь висцералка — моя специализация!",
    author: "Анна Смирнова",
    role: "Массажист, 5 лет опыта"
  },
  {
    text: "Преподаватели объясняют сложные вещи простым языком. Практика на реальных клиентах под супервизией — бесценный опыт.",
    author: "Сергей Иванов",
    role: "Остеопат"
  },
  {
    text: "Курс стоит каждого вложенного рубля. Мои доходы выросли в 2 раза благодаря новой специализации. Клиенты приходят именно на висцералку.",
    author: "Ольга Новикова",
    role: "Массажист"
  },
  {
    text: "Работаю с хроническими болями в пояснице через органы — эффект поразительный. Спасибо за знания!",
    author: "Максим Лебедев",
    role: "Мануальный терапевт"
  },
  {
    text: "До курса делала классический массаж. Теперь работаю комплексно — тело, фасции, органы. Результаты у клиентов намного лучше.",
    author: "Татьяна Кузнецова",
    role: "Массажист, 10 лет опыта"
  },
  {
    text: "Курс структурирован идеально. От анатомии до клинического мышления. Каждый модуль — новый уровень понимания.",
    author: "Игорь Соколов",
    role: "Телесный специалист"
  },
  {
    text: "Рекомендую всем массажистам, кто хочет расти профессионально. Висцеральная терапия — это следующий уровень!",
    author: "Мария Попова",
    role: "Массажист"
  },
  {
    text: "Боялась навредить клиенту при работе с органами. После курса понимаю все процессы и работаю безопасно и эффективно.",
    author: "Виктория Морозова",
    role: "Массажист, 6 лет опыта"
  }
];

export default function VisceraCourseProgram() {
  return (
    <>
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
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
