import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SchoolsCasesAndFAQ() {
  const navigate = useNavigate();

  return (
    <>
      {/* Success Cases Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Школы, которые уже с нами
            </h2>
            <p className="text-lg text-muted-foreground">Реальные результаты наших партнёров</p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="flex gap-6 animate-scroll-infinite will-change-transform hover:animate-none">
              {[
                {
                  school: "Академия массажа «Прикосновение»",
                  result: "За 3 месяца — 127 новых учеников без рекламы",
                  quote: "Раньше тратили 150₽ на лида. Теперь ученики приходят сами — и это горячие заявки от людей, которые уже знают, чего хотят.",
                  author: "Елена Соколова",
                  role: "Основатель школы",
                  icon: "TrendingUp",
                  gradient: "from-emerald-500/10 to-teal-500/10"
                },
                {
                  school: "Школа висцерального массажа",
                  result: "Средний чек вырос с 12 000₽ до 28 000₽",
                  quote: "Ученики стали покупать продвинутые курсы, потому что видят школу как часть своего профессионального развития, а не разовую услугу.",
                  author: "Дмитрий Волков",
                  role: "Методист",
                  icon: "DollarSign",
                  gradient: "from-amber-500/10 to-orange-500/10"
                },
                {
                  school: "Центр обучения «Bodywork Pro»",
                  result: "Запустились с нуля и набрали первый поток за 2 недели",
                  quote: "Мы новая школа, и боялись, что нас никто не заметит. Но через Док диалог к нам пришли 43 человека на первый курс. Аудитория уже тёплая!",
                  author: "Анна Кузнецова",
                  role: "Директор",
                  icon: "Rocket",
                  gradient: "from-blue-500/10 to-indigo-500/10"
                },
                {
                  school: "Школа лимфодренажа «Поток»",
                  result: "60% учеников вернулись на второй курс",
                  quote: "Раньше ученик покупал курс и уходил. Теперь они видят нас в сообществе, доверяют и возвращаются снова. Это совсем другая модель.",
                  author: "Мария Петрова",
                  role: "Владелец школы",
                  icon: "Repeat",
                  gradient: "from-purple-500/10 to-pink-500/10"
                },
                {
                  school: "Институт массажных практик",
                  result: "Продали мастермайнд за 85 000₽ — 12 участников",
                  quote: "Через платформу мы нашли аудиторию для премиального формата. Люди сразу понимают ценность, потому что растут в профессии вместе с нами.",
                  author: "Игорь Смирнов",
                  role: "Бизнес-тренер",
                  icon: "Award",
                  gradient: "from-rose-500/10 to-red-500/10"
                },
                {
                  school: "Школа массажа для беременных",
                  result: "Нишевый курс набрал 38 человек за месяц",
                  quote: "Думали, что узкая тема не зайдёт. Но на платформе уже была целевая аудитория — практикующие массажисты, которые искали специализацию.",
                  author: "Ольга Лебедева",
                  role: "Ведущий преподаватель",
                  icon: "Target",
                  gradient: "from-cyan-500/10 to-sky-500/10"
                },
                {
                  school: "Академия массажа «Прикосновение»",
                  result: "За 3 месяца — 127 новых учеников без рекламы",
                  quote: "Раньше тратили 150₽ на лида. Теперь ученики приходят сами — и это горячие заявки от людей, которые уже знают, чего хотят.",
                  author: "Елена Соколова",
                  role: "Основатель школы",
                  icon: "TrendingUp",
                  gradient: "from-emerald-500/10 to-teal-500/10"
                },
                {
                  school: "Школа висцерального массажа",
                  result: "Средний чек вырос с 12 000₽ до 28 000₽",
                  quote: "Ученики стали покупать продвинутые курсы, потому что видят школу как часть своего профессионального развития, а не разовую услугу.",
                  author: "Дмитрий Волков",
                  role: "Методист",
                  icon: "DollarSign",
                  gradient: "from-amber-500/10 to-orange-500/10"
                },
              ].map((item, index) => (
                <Card 
                  key={index} 
                  className={`flex-shrink-0 w-[380px] sm:w-[420px] hover:shadow-xl transition-all duration-300 border-primary/10 bg-gradient-to-br ${item.gradient}`}
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 shadow-md">
                        <Icon name={item.icon} className="text-primary" size={26} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.school}</h3>
                        <p className="text-sm text-primary font-semibold">{item.result}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic mb-4 leading-relaxed">
                      "{item.quote}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-sm">{item.author}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => navigate("/register/school")}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Присоединиться к школам-партнёрам
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* LTV Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-primary/5 to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
              Мы увеличиваем LTV ваших учеников
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
              Массажист остаётся внутри экосистемы: он учится, работает, развивается и возвращается за новыми знаниями.
            </p>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 sm:p-12 rounded-3xl shadow-xl border border-primary/20">
              <p className="text-2xl sm:text-3xl font-bold text-primary leading-relaxed">
                Один ученик — не одна продажа.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Schools Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-primary/5 to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Док диалог подойдёт, если вы:
            </h2>
            <p className="text-muted-foreground text-lg">Для кого подходит</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "Развиваете школу или онлайн-проект",
              "Цените качество аудитории",
              "Не хотите демпинга",
              "Думаете в долгую",
            ].map((text, index) => (
              <Card key={index} className="animate-scale-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-4 sm:p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon name="Check" className="text-primary" size={20} />
                  </div>
                  <p className="text-base sm:text-lg font-medium leading-relaxed">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Тарифы для школ
            </h2>
            <p className="text-muted-foreground text-lg">Понятные условия размещения</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Базовый",
                price: "Бесплатно",
                features: [
                  { text: "До 3 курсов в месяц", included: true },
                  { text: "Страница школы", included: true },
                  { text: "Базовая аналитика", included: true },
                  { text: "Сообщения", included: false },
                  { text: "Вывод в топ", included: false },
                  { text: "Запросы скидок", included: false },
                ],
                description: "Для старта и тестирования платформы",
                cta: "Начать",
                popular: false,
              },
              {
                name: "Стандарт",
                price: "1 990₽/мес",
                features: [
                  { text: "До 10 курсов в месяц", included: true },
                  { text: "До 50 сообщений в день", included: true },
                  { text: "До 3 выводов в топ (от 100₽)", included: true },
                  { text: "Расширенная аналитика", included: true },
                  { text: "Запросы скидок", included: false },
                ],
                description: "Для активных школ с регулярными запусками",
                cta: "Подключить",
                popular: true,
              },
              {
                name: "Безлимит",
                price: "4 990₽/мес",
                features: [
                  { text: "Безлимит курсов", included: true },
                  { text: "Безлимит сообщений", included: true },
                  { text: "Безлимит выводов в топ (от 100₽)", included: true },
                  { text: "Запросы скидок (увеличивает конверсию на 60%)", included: true },
                  { text: "Приоритетная поддержка", included: true },
                ],
                description: "Для школ, которые растут и масштабируются",
                cta: "Подключить",
                popular: false,
              },
            ].map((plan, index) => (
              <Card 
                key={index} 
                className={`relative animate-scale-in hover:shadow-2xl transition-all duration-300 ${
                  plan.popular ? 'border-primary border-2 shadow-xl' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Популярно
                  </div>
                )}
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">{plan.price}</p>
                  <p className="text-sm text-muted-foreground mb-6 min-h-[40px]">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Icon 
                          name={feature.included ? "Check" : "X"} 
                          className={feature.included ? "text-green-600 flex-shrink-0 mt-1" : "text-gray-400 flex-shrink-0 mt-1"} 
                          size={18} 
                        />
                        <span className={feature.included ? "" : "text-muted-foreground"}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-primary/90' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => navigate("/register/school")}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Частые вопросы
            </h2>
            <p className="text-muted-foreground text-lg">Ответы на популярные вопросы</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: "Как работают деньги? Вы забираете комиссию?",
                  a: "Нет. Ученик оплачивает курс у вас на сайте. Мы не участвуем в денежных потоках, не забираем комиссию и не храним чужие деньги."
                },
                {
                  q: "Как работают тарифы?",
                  a: "Тариф действует 30 дней с момента активации. Лимиты на курсы и выводы в топ обновляются автоматически каждые 30 дней. Лимит на сообщения обновляется ежедневно в 00:00 по МСК. Деньги списываются с баланса сразу при активации."
                },
                {
                  q: "Что такое вывод в топ?",
                  a: "Это продвижение курса в топ каталога. Каждый вывод стоит от 100₽ и оплачивается отдельно. На тарифе Стандарт доступно 3 вывода в месяц, на Безлимите — без ограничений."
                },
                {
                  q: "Что дают запросы скидок?",
                  a: "Это функция доступна только на тарифе Безлимит. Массажисты могут запрашивать индивидуальную скидку на ваши курсы — это увеличивает конверсию на 60%."
                },
                {
                  q: "Нужно ли переносить курс на вашу платформу?",
                  a: "Нет. Курс остаётся у вас. Мы только показываем его описание, цену и ссылку для записи."
                },
                {
                  q: "Что нужно для старта?",
                  a: "Регистрация, заполнение профиля школы, добавление курса. Всё занимает 10-15 минут. Начать можно бесплатно на тарифе Базовый."
                },
                {
                  q: "Можно ли разместить мастермайнд или оффлайн?",
                  a: "Да. Кроме курсов можно размещать мастермайнды и оффлайн-обучения."
                },
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-xl px-6 shadow-sm border">
                  <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:no-underline py-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Готовы приводить целевых учеников?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              Зарегистрируйте школу в экосистеме и начните получать учеников, которые готовы учиться.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate("/register/school")}
              className="text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-7 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Разместить школу
              <Icon name="ArrowRight" size={22} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}