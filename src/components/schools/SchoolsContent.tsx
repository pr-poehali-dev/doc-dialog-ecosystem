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

export default function SchoolsContent() {
  const navigate = useNavigate();

  return (
    <>
      {/* Problems Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Почему школам сложно стабильно продавать обучение
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {[
              { icon: "TrendingUp", text: "Реклама дорожает, а качество лидов падает", color: "destructive" },
              { icon: "UserX", text: "Ученик приходит один раз и не возвращается", color: "destructive" },
              { icon: "ShieldAlert", text: "Новым школам сложно вызвать доверие", color: "destructive" },
              { icon: "TrendingDown", text: "Скидки обесценивают продукт", color: "destructive" },
              { icon: "Users", text: "Нет среды для долгосрочного роста", color: "destructive" },
              { icon: "Gauge", text: "Конкуренция только по цене, а не по качеству", color: "destructive" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in hover:shadow-lg transition-all duration-300 border-muted" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-destructive/10 to-destructive/5 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon name={item.icon} className="text-destructive" size={24} />
                  </div>
                  <p className="text-base sm:text-lg leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
              <div className="order-2 lg:order-1">
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/e89e4fdc-bd02-4f2a-90d3-7e48bd2f7778.jpg"
                  alt="Целевая аудитория"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                  Мы не продаём курсы.<br className="hidden sm:block" /> Мы приводим к вам целевых учеников.
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Док диалог — это экосистема, где массажисты учатся, работают и развиваются. Курсы здесь — часть профессионального пути, а не разовая покупка.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
              {[
                { icon: "Users", text: "Уже заинтересованная аудитория" },
                { icon: "Shield", text: "Высокий уровень доверия" },
                { icon: "Repeat", text: "Долгосрочное взаимодействие" },
              ].map((item, index) => (
                <Card key={index} className="animate-scale-in hover:shadow-xl transition-all duration-300 border-primary/20 bg-gradient-to-br from-white to-primary/5" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Icon name={item.icon} className="text-primary" size={32} />
                    </div>
                    <p className="text-lg font-semibold leading-relaxed">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-primary/5 to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Кто приходит к школам через Док диалог
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
            {[
              { icon: "Sparkles", title: "Начинающие массажисты", desc: "Ищут базовое обучение" },
              { icon: "UserCheck", title: "Практикующие специалисты", desc: "Хотят углубить знания" },
              { icon: "Trophy", title: "Мастера, которые растут в доходе", desc: "Развивают экспертность" },
              { icon: "Target", title: "Специалисты, ищущие новые навыки", desc: "Осваивают смежные области" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon name={item.icon} className="text-primary" size={28} />
                  </div>
                  <h3 className="font-bold mb-2 text-base sm:text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="max-w-3xl mx-auto text-center bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-primary/10">
            <p className="text-lg sm:text-xl font-semibold leading-relaxed">
              Это не холодный трафик.<br />
              <span className="text-primary">Это люди, которые уже приняли решение развиваться.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Course Categories Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Не только массаж
            </h2>
            <p className="text-muted-foreground text-lg">Какие курсы можно размещать</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
            {[
              { icon: "Heart", title: "Профессия и телесные практики" },
              { icon: "Briefcase", title: "Бизнес для массажистов" },
              { icon: "TrendingUp", title: "Маркетинг и личный бренд" },
              { icon: "DollarSign", title: "Финансы, мышление, масштабирование" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-secondary/5" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon name={item.icon} className="text-secondary" size={28} />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg leading-relaxed">{item.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Вы становитесь частью образовательного маршрута специалиста.
          </p>
        </div>
      </section>

      {/* Revenue Model Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Полный контроль продаж остаётся у школы
            </h2>
            <p className="text-xl text-muted-foreground">Как вы зарабатываете</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
            {[
              { icon: "CreditCard", text: "Оплата проходит на вашем сайте" },
              { icon: "Handshake", text: "Вы сами работаете с учеником" },
              { icon: "Coins", text: "Без комиссий и посредников" },
              { icon: "ShieldCheck", text: "Без юридических и бухгалтерских рисков" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon name={item.icon} className="text-primary" size={26} />
                  </div>
                  <p className="text-base sm:text-lg font-medium leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-white to-primary/5 p-8 rounded-2xl shadow-xl border border-primary/20">
            <p className="text-xl sm:text-2xl font-bold leading-relaxed">
              Док диалог — не маркетплейс.<br />
              <span className="text-primary">Это канал доверия.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-primary/5 to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                  Инструменты, которые приводят к покупке
                </h2>
                <p className="text-lg text-muted-foreground mb-6">Механики привлечения учеников</p>
              </div>
              <div>
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/de47048b-c766-442e-bda1-6ecdbc711d61.jpg"
                  alt="Инструменты платформы"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { icon: "Gift", title: "Бесплатные курсы", desc: "Познакомьте с вашим подходом" },
              { icon: "Video", title: "Автовебинары", desc: "Презентуйте программу" },
              { icon: "Tag", title: "Запрос промокода", desc: "Увеличьте конверсию" },
              { icon: "School", title: "Страница школы", desc: "Профиль с курсами и экспертами" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon name={item.icon} className="text-primary" size={28} />
                  </div>
                  <h3 className="font-bold mb-2 text-base sm:text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Ученик выбирает школу, которой доверяет
            </h2>
            <p className="text-muted-foreground text-lg">Доверие к школе</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-10">
            {[
              { icon: "School", text: "Профиль школы" },
              { icon: "Users", text: "Авторы и эксперты" },
              { icon: "MessageSquare", text: "Отзывы учеников" },
              { icon: "Star", text: "Рейтинг школы" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon name={item.icon} className="text-primary" size={28} />
                  </div>
                  <p className="font-semibold text-base sm:text-lg">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Даже новая школа выглядит уверенно и профессионально.
          </p>
        </div>
      </section>

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
                // Дублируем для бесшовной прокрутки
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
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckCircle2" className="text-primary" size={24} />
                  </div>
                  <p className="text-base sm:text-lg leading-relaxed">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Как это работает
            </h2>
            <p className="text-muted-foreground text-lg">Формат размещения</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { num: "1", icon: "UserPlus", text: "Вы создаёте профиль школы" },
              { num: "2", icon: "Upload", text: "Размещаете курсы и активности" },
              { num: "3", icon: "Users", text: "Получаете заявки и переходы" },
              { num: "4", icon: "Handshake", text: "Работаете с учениками напрямую" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in relative hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="absolute -top-5 -left-5 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center font-bold text-xl shadow-lg">
                  {item.num}
                </div>
                <CardContent className="p-6 text-center pt-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon name={item.icon} className="text-primary" size={28} />
                  </div>
                  <p className="font-medium text-base leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-primary/10 via-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url('https://cdn.poehali.dev/files/17976.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Станьте частью профессиональной экосистемы
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
              Док диалог объединяет образование, практику и развитие специалистов. Если вы разделяете этот подход — вам с нами.
            </p>
            <Button 
              size="lg" 
              className="text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:scale-105"
              onClick={() => navigate('/register/school')}
            >
              Разместить школу
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Частые вопросы
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card rounded-xl shadow-sm border">
                <AccordionTrigger className="text-base sm:text-lg font-semibold px-6 hover:no-underline">
                  Берёте ли вы комиссию?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground px-6 pb-6 leading-relaxed">
                  Нет. Все платежи проходят напрямую через вашу систему. Мы не берём комиссию с продаж.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card rounded-xl shadow-sm border">
                <AccordionTrigger className="text-base sm:text-lg font-semibold px-6 hover:no-underline">
                  Можно ли размещать бесплатные курсы?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground px-6 pb-6 leading-relaxed">
                  Да. Бесплатные курсы — отличный способ познакомить аудиторию с вашим подходом и привести к платным программам.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card rounded-xl shadow-sm border">
                <AccordionTrigger className="text-base sm:text-lg font-semibold px-6 hover:no-underline">
                  Обязательна ли партнёрская ссылка?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground px-6 pb-6 leading-relaxed">
                  Нет. Вы можете направлять учеников на любую страницу — ваш сайт, форму заявки, платёжную систему.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card rounded-xl shadow-sm border">
                <AccordionTrigger className="text-base sm:text-lg font-semibold px-6 hover:no-underline">
                  Кто работает с оплатой?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground px-6 pb-6 leading-relaxed">
                  Школа. Все финансовые взаимодействия происходят напрямую между вами и учениками. Мы не выступаем посредником в платежах.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}