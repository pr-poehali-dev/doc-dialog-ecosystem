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

export default function SchoolsLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-10" />
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate('/')} className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </button>
            <button onClick={() => navigate('/about')} className="text-sm font-medium hover:text-primary transition-colors">
              О нас
            </button>
            <button onClick={() => navigate('/schools')} className="text-sm font-medium hover:text-primary transition-colors">
              Школы
            </button>
            <button onClick={() => navigate('/courses')} className="text-sm font-medium hover:text-primary transition-colors">
              Курсы
            </button>
            <button onClick={() => window.location.href = 'mailto:info@dokdialog.ru'} className="text-sm font-medium hover:text-primary transition-colors">
              Написать нам
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>Войти</Button>
            <Button onClick={() => navigate('/register/school')}>Разместить школу</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 animate-fade-in overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100/30 to-slate-50">
        {/* Network pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/files/17976.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Экосистема, которая приводит школам целевых учеников
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in [animation-delay:100ms]">
              Док диалог — профессиональная среда для массажистов,<br />
              где обучение становится логичным шагом развития, а не импульсной покупкой.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mb-10 text-sm md:text-base animate-fade-in [animation-delay:200ms]">
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span className="font-medium">Без комиссий</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span className="font-medium">Без скидочного демпинга</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span className="font-medium">Без передачи платежей</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 animate-scale-in [animation-delay:300ms]"
              onClick={() => navigate('/register/school')}
            >
              Разместить школу в экосистеме
            </Button>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Почему школам сложно стабильно продавать обучение
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: "TrendingUp", text: "Реклама дорожает, а качество лидов падает" },
              { icon: "UserX", text: "Ученик приходит один раз и не возвращается" },
              { icon: "ShieldAlert", text: "Новым школам сложно вызвать доверие" },
              { icon: "TrendingDown", text: "Скидки обесценивают продукт" },
              { icon: "Users", text: "Нет среды для долгосрочного роста" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="pt-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} className="text-destructive" size={24} />
                  </div>
                  <p className="text-lg">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Мы не продаём курсы. Мы приводим к вам целевых учеников.
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Док диалог — это экосистема, где массажисты учатся, работают и развиваются.<br />
              Курсы здесь — часть профессионального пути, а не разовая покупка.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "Users", text: "Уже заинтересованная аудитория" },
                { icon: "Shield", text: "Высокий уровень доверия" },
                { icon: "Repeat", text: "Долгосрочное взаимодействие" },
              ].map((item, index) => (
                <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon name={item.icon} className="text-primary" size={28} />
                    </div>
                    <p className="text-lg font-medium">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Кто приходит к школам через Док диалог
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {[
              { icon: "Sparkles", title: "Начинающие массажисты", desc: "Ищут базовое обучение" },
              { icon: "UserCheck", title: "Практикующие специалисты", desc: "Хотят углубить знания" },
              { icon: "Trophy", title: "Мастера, которые растут в доходе", desc: "Развивают экспертность" },
              { icon: "Target", title: "Специалисты, ищущие новые навыки", desc: "Осваивают смежные области" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} className="text-primary" size={26} />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-xl font-medium max-w-3xl mx-auto">
            Это не холодный трафик.<br />
            <span className="text-primary">Это люди, которые уже приняли решение развиваться.</span>
          </p>
        </div>
      </section>

      {/* Course Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Не только массаж
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Какие курсы можно размещать</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8">
            {[
              { icon: "Heart", title: "Профессия и телесные практики" },
              { icon: "Briefcase", title: "Бизнес для массажистов" },
              { icon: "TrendingUp", title: "Маркетинг и личный бренд" },
              { icon: "DollarSign", title: "Финансы, мышление, масштабирование" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} className="text-secondary" size={26} />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-lg text-muted-foreground">
            Вы становитесь частью образовательного маршрута специалиста.
          </p>
        </div>
      </section>

      {/* Revenue Model Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Полный контроль продаж остаётся у школы
          </h2>
          <p className="text-center text-xl text-muted-foreground mb-12">Как вы зарабатываете</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {[
              { icon: "CreditCard", text: "Оплата проходит на вашем сайте" },
              { icon: "Handshake", text: "Вы сами работаете с учеником" },
              { icon: "Coins", text: "Без комиссий и посредников" },
              { icon: "ShieldCheck", text: "Без юридических и бухгалтерских рисков" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="pt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} className="text-primary" size={24} />
                  </div>
                  <p className="text-lg font-medium">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center bg-card p-6 rounded-lg max-w-2xl mx-auto">
            <p className="text-xl font-semibold">
              Док диалог — не маркетплейс.<br />
              <span className="text-primary">Это канал доверия.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Инструменты, которые приводят к покупке
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Механики привлечения учеников</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: "Gift", title: "Бесплатные курсы", desc: "Познакомьте с вашим подходом" },
              { icon: "Video", title: "Автовебинары", desc: "Презентуйте программу" },
              { icon: "Tag", title: "Запрос промокода", desc: "Увеличьте конверсию" },
              { icon: "School", title: "Страница школы", desc: "Профиль с курсами и экспертами" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} className="text-primary" size={26} />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Ученик выбирает школу, которой доверяет
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Доверие к школе</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8">
            {[
              { icon: "School", text: "Профиль школы" },
              { icon: "Users", text: "Авторы и эксперты" },
              { icon: "MessageSquare", text: "Отзывы учеников" },
              { icon: "Star", text: "Рейтинг школы" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} className="text-primary" size={26} />
                  </div>
                  <p className="font-semibold">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-lg">
            Даже новая школа выглядит уверенно и профессионально.
          </p>
        </div>
      </section>

      {/* LTV Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Мы увеличиваем LTV ваших учеников
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Массажист остаётся внутри экосистемы:<br />
              он учится, работает, развивается и возвращается за новыми знаниями.
            </p>
            <div className="bg-primary/10 p-8 rounded-lg">
              <p className="text-2xl font-bold text-primary">
                Один ученик — не одна продажа.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Schools Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Док диалог подойдёт, если вы:
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Для кого подходит</p>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              "Развиваете школу или онлайн-проект",
              "Цените качество аудитории",
              "Не хотите демпинга",
              "Думаете в долгую",
            ].map((text, index) => (
              <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="pt-6 flex items-center gap-4">
                  <Icon name="CheckCircle2" className="text-primary flex-shrink-0" size={28} />
                  <p className="text-lg">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Как это работает
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Формат размещения</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { num: "1", icon: "UserPlus", text: "Вы создаёте профиль школы" },
              { num: "2", icon: "Upload", text: "Размещаете курсы и активности" },
              { num: "3", icon: "Users", text: "Получаете заявки и переходы" },
              { num: "4", icon: "Handshake", text: "Работаете с учениками напрямую" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in relative" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {item.num}
                </div>
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} className="text-primary" size={26} />
                  </div>
                  <p className="font-medium">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Станьте частью профессиональной экосистемы
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Док диалог объединяет образование, практику и развитие специалистов.<br />
              Если вы разделяете этот подход — вам с нами.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-10 py-6"
              onClick={() => navigate('/register/school')}
            >
              Разместить школу
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Частые вопросы
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">
                  Берёте ли вы комиссию?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Нет. Все платежи проходят напрямую через вашу систему. Мы не берём комиссию с продаж.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">
                  Можно ли размещать бесплатные курсы?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Да. Бесплатные курсы — отличный способ познакомить аудиторию с вашим подходом и привести к платным программам.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">
                  Обязательна ли партнёрская ссылка?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Нет. Вы можете направлять учеников на любую страницу — ваш сайт, форму заявки, платёжную систему.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold">
                  Кто работает с оплатой?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Школа. Все финансовые взаимодействия происходят напрямую между вами и учениками. Мы не выступаем посредником в платежах.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-8" />
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <span className="cursor-pointer hover:text-foreground" onClick={() => navigate('/about')}>О проекте</span>
              <span className="cursor-pointer hover:text-foreground" onClick={() => navigate('/schools')}>Школы</span>
              <span className="cursor-pointer hover:text-foreground" onClick={() => navigate('/courses')}>Курсы</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}