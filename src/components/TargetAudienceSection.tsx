import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const TargetAudienceSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Для кого создан Док диалог
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
                    <span>доступ к целевой аудитории специалистов</span>
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

          <Card className="hover:shadow-lg transition-shadow animate-scale-in [animation-delay:200ms]">
            <CardContent className="pt-6">
              <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Building2" className="text-primary" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Для салонов массажа</h3>
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
                    <span>доступ к базе специалистов</span>
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
  );
};

export default TargetAudienceSection;
