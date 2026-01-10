import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const EcosystemSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Что входит в экосистему Док диалог
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <Card id="education" className="hover:shadow-lg transition-all hover:scale-105">
            <CardContent className="pt-6">
              <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="BookOpen" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Образование и курсы</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Онлайн-курсы для новичков и практиков</li>
                <li>Авторские программы партнёров</li>
                <li>Повышение квалификации</li>
                <li>Практико-ориентированное обучение</li>
              </ul>
            </CardContent>
          </Card>

          <Card id="tools" className="hover:shadow-lg transition-all hover:scale-105">
            <CardContent className="pt-6">
              <div className="mb-4 w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Icon name="Wrench" className="text-secondary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Инструменты специалиста</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Чат-боты для расшифровки диагнозов</li>
                <li>Работа с МРТ и заключениями</li>
                <li>Подсказки по тактике работы с телом</li>
                <li>Поддержка в реальной практике</li>
              </ul>
            </CardContent>
          </Card>

          <Card id="community" className="hover:shadow-lg transition-all hover:scale-105">
            <CardContent className="pt-6">
              <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Users2" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Профессиональный рост</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Офлайн мастермайнды в Москве</li>
                <li>Разборы кейсов и ситуаций</li>
                <li>Живое общение с коллегами</li>
                <li>Поддержка и обмен опытом</li>
              </ul>
            </CardContent>
          </Card>

          <Card id="jobs" className="hover:shadow-lg transition-all hover:scale-105">
            <CardContent className="pt-6">
              <div className="mb-4 w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Icon name="Briefcase" className="text-secondary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Работа и карьера</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Вакансии от проверенных салонов</li>
                <li>Подбор специалистов</li>
                <li>Дообучение под стандарты</li>
                <li>Партнёрство со школами</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
