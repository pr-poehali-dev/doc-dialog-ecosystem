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
    <div className="min-h-screen bg-background">
      <Navigation scrollToSection={scrollToSection} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Оцени свою практику как специалист — честно и по делу
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Ты умеешь работать руками.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Но понимаешь ли ты <strong>почему поток клиентов нестабилен</strong>,
            {" "}<strong>достаточно ли ты зарабатываешь в своем регионе</strong>,
            и <strong>что именно тормозит рост твоей частной практики</strong>?
          </p>
          
          <div className="bg-accent/50 rounded-lg p-8 mb-8">
            <p className="text-lg mb-6">
              Мы создали диагностический диалог для массажистов и телесных специалистов, который помогает:
            </p>
            <ul className="text-left max-w-2xl mx-auto space-y-3">
              <li className="flex items-start gap-3">
                <Icon name="Check" className="text-primary mt-1 shrink-0" size={20} />
                <span>понять <strong>реальный уровень твоего профессионализма</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Check" className="text-primary mt-1 shrink-0" size={20} />
                <span>увидеть, <strong>где ты теряешь клиентов</strong>: в навыках, позиционировании или коммуникации</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Check" className="text-primary mt-1 shrink-0" size={20} />
                <span>разобраться, <strong>какие методики ты используешь и насколько они конкурентны</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Check" className="text-primary mt-1 shrink-0" size={20} />
                <span>оценить, <strong>готов ли ты к частной практике именно в своем регионе</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Check" className="text-primary mt-1 shrink-0" size={20} />
                <span>понять, <strong>что усиливать: технику, подход к людям или стратегию продвижения</strong></span>
              </li>
            </ul>
          </div>

          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <a href="https://docdialog.su/register" target="_blank" rel="noopener noreferrer">
              Узнать бесплатно
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </a>
          </Button>
        </div>
      </section>

      {/* What You Can Evaluate */}
      <section className="py-20 px-4 bg-accent/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Что именно ты сможешь оценить
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Briefcase" className="text-primary" size={32} />
                <h3 className="text-2xl font-bold">Профессия</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>уровень твоих знаний и практических навыков</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>насколько твоя работа решает реальные запросы клиентов</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>соответствие твоих методик современному рынку</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Users" className="text-primary" size={32} />
                <h3 className="text-2xl font-bold">Клиенты и поток</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>почему клиентов мало или они не возвращаются</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>как ты объясняешь ценность своей работы</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>где теряется доверие на первом контакте</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="MapPin" className="text-primary" size={32} />
                <h3 className="text-2xl font-bold">Регион и формат практики</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>насколько твои цены адекватны рынку</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>есть ли спрос именно на твои услуги в твоем городе</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>что мешает выйти в частную практику или масштабироваться</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="TrendingUp" className="text-primary" size={32} />
                <h3 className="text-2xl font-bold">Развитие</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>какие направления и методики стоит изучить дальше</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>где ты застрял: новичок, ремесленник или практик без системы</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>что реально даст рост дохода, а что — пустая трата времени</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Format Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Формат — живой диалог, а не тест «для галочки»
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Ты не проходишь сухую анкету.
          </p>
          
          <div className="bg-accent/50 rounded-lg p-8 mb-8">
            <p className="text-lg mb-6">
              Ты заходишь в <strong>чат-бот Док диалог</strong>, который:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Icon name="MessageSquare" className="text-primary mt-1 shrink-0" size={24} />
                <span>задает точные вопросы</span>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Settings" className="text-primary mt-1 shrink-0" size={24} />
                <span>подстраивается под твой опыт и цели</span>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Eye" className="text-primary mt-1 shrink-0" size={24} />
                <span>помогает увидеть слепые зоны</span>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="FileText" className="text-primary mt-1 shrink-0" size={24} />
                <span>формирует персональную картину твоей практики</span>
              </div>
            </div>
          </div>

          <p className="text-center text-lg text-muted-foreground">
            Без оценок «хорошо / плохо».<br />
            Только честный разбор твоей текущей точки.
          </p>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-4 bg-accent/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Результат по итогу
          </h2>
          
          <Card className="p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6">Ты понимаешь:</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Icon name="Check" className="text-primary mt-1 shrink-0" size={24} />
                <span className="text-lg">где ты сейчас как специалист</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Check" className="text-primary mt-1 shrink-0" size={24} />
                <span className="text-lg">почему доход и поток клиентов именно такие</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Check" className="text-primary mt-1 shrink-0" size={24} />
                <span className="text-lg">какие шаги дадут рост именно в твоей ситуации</span>
              </li>
            </ul>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6">И получаешь <strong>инструменты Док диалог</strong>, чтобы:</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Icon name="Wrench" className="text-primary mt-1 shrink-0" size={24} />
                <span className="text-lg">закрыть профессиональные пробелы</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="LineChart" className="text-primary mt-1 shrink-0" size={24} />
                <span className="text-lg">выстроить устойчивую частную практику</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Shield" className="text-primary mt-1 shrink-0" size={24} />
                <span className="text-lg">усилить доверие клиентов и ценность своей работы</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Начни с диагностики своей практики
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Перейди в чат-бот и узнай, <strong>что реально мешает тебе расти — и как это исправить</strong>
          </p>
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <a href="https://docdialog.su/register" target="_blank" rel="noopener noreferrer">
              Узнать бесплатно
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </a>
          </Button>
        </div>
      </section>

      <SchoolsFooter />
    </div>
  );
};

export default DiagnosticLanding;