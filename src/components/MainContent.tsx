import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

type UserType = 'masseur' | 'school' | 'salon' | null;

interface MainContentProps {
  openDialog: (type: UserType) => void;
}

const MainContent = ({ openDialog }: MainContentProps) => {
  return (
    <>
      {/* Target Audience Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Для кого создан Док диалог
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Masseurs Card */}
            <Card className="hover:shadow-lg transition-shadow animate-scale-in">
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Users" className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Для массажистов</h3>
                <div className="space-y-3 mb-6">
                  <p className="text-sm font-medium text-muted-foreground">Если вы:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>только входите в профессию</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>уже практикуете и хотите уверенности</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>работаете с диагнозами и МРТ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>хотите расти в уровне и доходе</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2 pt-4 border-t">
                  <p className="text-sm font-medium">Док диалог поможет вам:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>понимать медицинские заключения</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>уверенно работать с клиентами</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>использовать инструменты для практики</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>обучаться у проверенных экспертов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>находить работу и профессиональное окружение</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Schools Card */}
            <Card className="hover:shadow-lg transition-shadow animate-scale-in [animation-delay:100ms]">
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Icon name="GraduationCap" className="text-secondary" size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Для школ массажа</h3>
                <div className="space-y-3 mb-6">
                  <p className="text-sm font-medium text-muted-foreground">Если вы:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                      <span>обучаете массажу онлайн или офлайн</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                      <span>развиваете собственную методику</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                      <span>ищете учеников и рост</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                      <span>хотите масштабироваться без лишних затрат</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2 pt-4 border-t">
                  <p className="text-sm font-medium">Док диалог даёт:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span>
                      <span>доступ к целевой аудитории массажистов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span>
                      <span>размещение курсов на платформе</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span>
                      <span>инфраструктуру продаж и подписок</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span>
                      <span>статус партнёра экосистемы</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Salons Card */}
            <Card className="hover:shadow-lg transition-shadow animate-scale-in [animation-delay:200ms]">
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Building2" className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Для массажных салонов</h3>
                <div className="space-y-3 mb-6">
                  <p className="text-sm font-medium text-muted-foreground">Если вам важно:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>находить подготовленных специалистов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>снижать текучку кадров</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>дообучать сотрудников под стандарты салона</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>экономить время на найме</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2 pt-4 border-t">
                  <p className="text-sm font-medium">Док диалог — это:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>вакансии от проверенных салонов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>доступ к базе массажистов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>дообучение сотрудников</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>статус надёжного работодателя</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What is Dok Dialog */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Что такое Док диалог
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Док диалог — это не просто курсы и не просто боты.
            </p>
            <p className="text-xl mb-8">
              Это экосистема, которая объединяет обучение, практические инструменты, профессиональное сообщество и рынок работы в сфере массажа.
            </p>
            <p className="text-lg text-muted-foreground">
              Мы создаём среду, где массажист развивается системно — от первых шагов до уверенной практики и карьеры.
            </p>
          </div>
        </div>
      </section>

      {/* Ecosystem Components */}
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
                <h3 className="text-xl font-bold mb-3">Инструменты массажиста</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Чат-боты для расшифровки диагнозов</li>
                  <li>Работа с МРТ и заключениями</li>
                  <li>Подсказки по тактике массажа</li>
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

      {/* Features Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-24">
            {/* Education */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Образование, которое работает в реальной практике
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  В Док диалог обучение — это не заучивание техник.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Icon name="Target" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span>понимать тело и процессы</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="FileText" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span>работать с медицинскими заключениями</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="CheckCircle2" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span>принимать обоснованные решения</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="TrendingUp" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span>чувствовать уверенность в работе с клиентами</span>
                  </li>
                </ul>
                <Button size="lg">Перейти к курсам</Button>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <Icon name="GraduationCap" size={120} className="text-primary/30" />
              </div>
            </div>

            {/* Tools */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-8 aspect-square flex items-center justify-center order-2 md:order-1">
                <Icon name="Bot" size={120} className="text-secondary/30" />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Инструменты для работы массажиста
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Экосистема Док диалог включает практические инструменты, которые помогают работать каждый день.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Icon name="MessageSquare" className="text-secondary mt-1 flex-shrink-0" size={20} />
                    <span>чат-ботов для помощи в практике</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="FileCheck" className="text-secondary mt-1 flex-shrink-0" size={20} />
                    <span>шаблоны и чек-листы</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Database" className="text-secondary mt-1 flex-shrink-0" size={20} />
                    <span>базу знаний и разборы кейсов</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="RefreshCw" className="text-secondary mt-1 flex-shrink-0" size={20} />
                    <span>регулярные обновления</span>
                  </li>
                </ul>
                <Button size="lg" variant="secondary">Попробовать инструменты</Button>
              </div>
            </div>

            {/* Community */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Мастермайнды и профессиональное сообщество
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Рост происходит быстрее в правильном окружении.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Icon name="MapPin" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span>офлайн мастермайнды в Москве</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Lightbulb" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span>разборы сложных случаев</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Users2" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span>живое общение с коллегами</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Heart" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span>профессиональная поддержка</span>
                  </li>
                </ul>
                <Button size="lg">Узнать о мастермайндах</Button>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <Icon name="Users" size={120} className="text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Почему Док диалог
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: "Layers", text: "Экосистема вместо разрозненных курсов" },
              { icon: "Zap", text: "Практика вместо теории ради теории" },
              { icon: "Tool", text: "Инструменты для реальной работы" },
              { icon: "ShieldCheck", text: "Проверенные школы и салоны" },
              { icon: "Users2", text: "Профессиональное сообщество" },
              { icon: "Trophy", text: "Карьерный рост и развитие" }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon name={item.icon} className="text-primary" size={24} />
                  </div>
                  <p className="font-medium">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Начните свой путь в экосистеме Док диалог
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Выберите формат, который подходит именно вам
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="text-lg px-12" onClick={() => openDialog('masseur')}>
                Я массажист
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-12" onClick={() => openDialog('school')}>
                Я школа
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-12" onClick={() => openDialog('salon')}>
                Я салон
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div>
              <div className="mb-4">
                <img src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/495f2ba1-12f0-49bb-ba1d-6fd8cd607af2.jpg" alt="Док диалог" className="h-8" />
              </div>
              <p className="text-sm text-muted-foreground">
                Профессиональная экосистема для массажистов
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Платформа</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#education" className="hover:text-primary transition-colors">Образование</a></li>
                <li><a href="#tools" className="hover:text-primary transition-colors">Инструменты</a></li>
                <li><a href="#community" className="hover:text-primary transition-colors">Сообщество</a></li>
                <li><a href="#jobs" className="hover:text-primary transition-colors">Вакансии</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Для кого</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Массажисты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Школы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Салоны</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Написать нам</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Telegram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">О платформе</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Док диалог. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MainContent;