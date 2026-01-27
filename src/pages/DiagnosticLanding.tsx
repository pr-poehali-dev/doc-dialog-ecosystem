import { Navigation } from "@/components/Navigation";
import SchoolsFooter from "@/components/schools/SchoolsFooter";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";

const DiagnosticLanding = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/20">
      <Navigation scrollToSection={scrollToSection} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary font-semibold">Бесплатная диагностика</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Оцени свою практику как специалист — честно и по делу
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                Ты умеешь работать руками. Но понимаешь ли ты <strong className="text-foreground">почему поток клиентов нестабилен</strong>?
              </p>

              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 mb-8 shadow-lg">
                <p className="text-lg mb-4 text-muted-foreground">
                  Диагностический диалог для массажистов и телесных специалистов:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Check" className="text-primary" size={16} />
                    </div>
                    <span className="text-foreground">Реальный уровень профессионализма</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Check" className="text-primary" size={16} />
                    </div>
                    <span className="text-foreground">Где теряешь клиентов</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Check" className="text-primary" size={16} />
                    </div>
                    <span className="text-foreground">Конкурентность методик</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Check" className="text-primary" size={16} />
                    </div>
                    <span className="text-foreground">Готовность к частной практике</span>
                  </li>
                </ul>
              </div>

              <Button size="lg" className="text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all duration-300 group" asChild>
                <a href="https://docdialog.su/register" target="_blank" rel="noopener noreferrer">
                  Узнать бесплатно
                  <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </a>
              </Button>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
                <img 
                  src="https://cdn.poehali.dev/files/2a67e1f5-96a0-40c7-ab90-52614d54d625.jpg" 
                  alt="Профессиональная диагностика"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Evaluate */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Что именно ты сможешь оценить
            </h2>
            <p className="text-xl text-muted-foreground">
              Комплексный анализ твоей практики
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="group p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon name="Briefcase" className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold">Профессия</h3>
              </div>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Icon name="Circle" className="text-primary/50 mt-1 shrink-0" size={8} />
                  <span>Уровень знаний и практических навыков</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" className="text-primary/50 mt-1 shrink-0" size={8} />
                  <span>Решение реальных запросов клиентов</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" className="text-primary/50 mt-1 shrink-0" size={8} />
                  <span>Соответствие методик рынку</span>
                </li>
              </ul>
            </Card>

            <Card className="group p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon name="Users" className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold">Клиенты и поток</h3>
              </div>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Icon name="Circle" className="text-primary/50 mt-1 shrink-0" size={8} />
                  <span>Почему клиентов мало или они не возвращаются</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" className="text-primary/50 mt-1 shrink-0" size={8} />
                  <span>Как объясняешь ценность работы</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" className="text-primary/50 mt-1 shrink-0" size={8} />
                  <span>Где теряется доверие на первом контакте</span>
                </li>
              </ul>
            </Card>

            <Card className="group p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon name="MapPin" className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold">Регион и формат</h3>
              </div>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Icon name="Circle" className="text-primary/50 mt-1 shrink-0" size={8} />
                  <span>Адекватность цен рынку</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" className="text-primary/50 mt-1 shrink-0" size={8} />
                  <span>Спрос на твои услуги в городе</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" className="text-primary/50 mt-1 shrink-0" size={8} />
                  <span>Что мешает масштабироваться</span>
                </li>
              </ul>
            </Card>

            <Card className="group p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon name="TrendingUp" className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold">Развитие</h3>
              </div>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Icon name="Circle" className="text-primary/50 mt-1 shrink-0" size={8} />
                  <span>Направления и методики для изучения</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" className="text-primary/50 mt-1 shrink-0" size={8} />
                  <span>Уровень: новичок или практик без системы</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" className="text-primary/50 mt-1 shrink-0" size={8} />
                  <span>Что даст рост дохода</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Format Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-accent/10 to-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Формат — живой диалог
            </h2>
            <p className="text-xl text-muted-foreground">
              Не сухая анкета, а интеллектуальная беседа
            </p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm border-2 border-border rounded-3xl p-10 shadow-2xl">
            <p className="text-xl mb-8 text-center">
              Ты заходишь в <strong className="text-primary">чат-бот Док диалог</strong>, который:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-accent/20">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon name="MessageSquare" className="text-primary shrink-0" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Точные вопросы</h4>
                  <p className="text-sm text-muted-foreground">Адаптируется под твои ответы</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-accent/20">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon name="Settings" className="text-primary shrink-0" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Настройка логики</h4>
                  <p className="text-sm text-muted-foreground">Уточняет детали по ходу</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-accent/20">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon name="Brain" className="text-primary shrink-0" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Анализ без оценок</h4>
                  <p className="text-sm text-muted-foreground">Только честный разбор</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-accent/20">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon name="Target" className="text-primary shrink-0" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Конкретика</h4>
                  <p className="text-sm text-muted-foreground">Практичные рекомендации</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/20">
              <p className="text-center text-lg">
                <Icon name="Clock" className="inline mr-2" size={20} />
                <strong>10-15 минут</strong> — и ты получишь честный разбор своей текущей точки
              </p>
            </div>

            {/* Screenshot */}
            <div className="mt-10">
              <img 
                src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/bucket/95ce260d-c78a-4dea-8211-07b19f56d654.jpg" 
                alt="Интерфейс выбора AI инструментов" 
                className="w-full rounded-2xl shadow-2xl border border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Результат по итогу
            </h2>
            <p className="text-xl text-muted-foreground">
              Конкретный план действий для роста
            </p>
          </div>

          <Card className="p-10 border-2 bg-gradient-to-br from-card via-card to-primary/5">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                  <Icon name="FileText" className="text-primary" size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Персональный отчёт</h4>
                  <p className="text-muted-foreground">с конкретными выводами: что работает, что нет, куда двигаться</p>
                </div>
              </div>

              <div className="border-l-4 border-primary/30 pl-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="Compass" className="text-primary mt-1 shrink-0" size={24} />
                  <span className="text-lg">понять свои сильные и слабые стороны</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="BookOpen" className="text-primary mt-1 shrink-0" size={24} />
                  <span className="text-lg">закрыть профессиональные пробелы</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="LineChart" className="text-primary mt-1 shrink-0" size={24} />
                  <span className="text-lg">выстроить устойчивую частную практику</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Shield" className="text-primary mt-1 shrink-0" size={24} />
                  <span className="text-lg">усилить доверие клиентов и ценность работы</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-accent/10 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 blur-3xl" />
            <div className="relative bg-card/80 backdrop-blur-sm border-2 border-border rounded-3xl p-12 shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Готов увидеть свою практику объективно?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Пройди диагностику бесплатно — узнай, <strong className="text-foreground">что реально мешает тебе расти</strong>
              </p>
              <Button size="lg" className="text-xl px-12 py-8 shadow-xl hover:shadow-2xl transition-all duration-300 group" asChild>
                <a href="https://docdialog.su/register" target="_blank" rel="noopener noreferrer">
                  Начать диагностику
                  <Icon name="ArrowRight" className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SchoolsFooter />
    </div>
  );
};

export default DiagnosticLanding;