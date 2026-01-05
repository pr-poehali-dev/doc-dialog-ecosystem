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
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
            <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-8 sm:h-10" />
          </div>
          <nav className="hidden lg:flex items-center gap-8">
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
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="text-sm">
              Войти
            </Button>
            <Button size="sm" onClick={() => navigate('/register/school')} className="text-sm hidden sm:inline-flex">
              Разместить школу
            </Button>
            <Button size="sm" onClick={() => navigate('/register/school')} className="text-sm sm:hidden">
              Начать
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 animate-fade-in overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/files/17976.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent animate-fade-in">
              Экосистема, которая приводит школам целевых учеников
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed animate-fade-in [animation-delay:100ms] px-4">
              Док диалог — профессиональная среда для массажистов, где обучение становится логичным шагом развития, а не импульсной покупкой.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-10 text-sm sm:text-base animate-fade-in [animation-delay:200ms]">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Check" className="text-primary" size={16} />
                </div>
                <span className="font-medium">Без комиссий</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Check" className="text-primary" size={16} />
                </div>
                <span className="font-medium">Без скидочного демпинга</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Check" className="text-primary" size={16} />
                </div>
                <span className="font-medium">Без передачи платежей</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 animate-scale-in [animation-delay:300ms] shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90"
              onClick={() => navigate('/register/school')}
            >
              Разместить школу в экосистеме
            </Button>
          </div>
        </div>
      </section>

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
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Мы не продаём курсы.<br className="hidden sm:block" /> Мы приводим к вам целевых учеников.
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed">
              Док диалог — это экосистема, где массажисты учатся, работают и развиваются. Курсы здесь — часть профессионального пути, а не разовая покупка.
            </p>
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
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Инструменты, которые приводят к покупке
            </h2>
            <p className="text-muted-foreground text-lg">Механики привлечения учеников</p>
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

      {/* LTV Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background to-primary/5">
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

      {/* Footer */}
      <footer className="py-12 border-t bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="cursor-pointer" onClick={() => navigate('/')}>
              <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-8" />
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/about')}>О проекте</span>
              <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/schools')}>Школы</span>
              <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/courses')}>Курсы</span>
              <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/privacy')}>Политика конфиденциальности</span>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            © 2024 Док диалог. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
