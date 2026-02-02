import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function RegressionHypnosisPrograms() {
  return (
    <section id="cta-section" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 xl:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
            Программы обучения
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            Три уровня профессионального мастерства — от базовых навыков до супервизии
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Level 1 - Basic */}
          <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="grid lg:grid-cols-5 gap-0">
              <div className="lg:col-span-2">
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/8c816ef4-e8b0-4c2e-bd02-2297da99fa7b.jpg"
                  alt="Basic level training"
                  className="w-full h-full object-cover min-h-[200px] sm:min-h-[250px]"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-3 p-5 sm:p-6 md:p-8 lg:p-10">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl sm:text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Базовый уровень</h3>
                </div>
                <p className="text-muted-foreground text-base sm:text-lg mb-4 sm:mb-6">
                  Введение в метод, базовая теория, первичные навыки ведения
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    'Теория изменённых состояний сознания',
                    'Индукции, углубления, выходы',
                    'Работа с возрастной регрессией',
                    'Техники безопасности',
                    'Практика под супервизией (триады)'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 sm:gap-3">
                      <Icon name="Check" className="text-primary mt-0.5 sm:mt-1 flex-shrink-0" size={16} />
                      <p className="text-sm sm:text-base">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 items-center pt-3 sm:pt-4 border-t text-muted-foreground">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Icon name="Calendar" size={18} />
                    <span className="font-medium">3 дня очно</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Users" size={18} />
                    <span className="font-medium">до 12 человек</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="MapPin" size={18} />
                    <span className="font-medium">Москва</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Level 2 - Advanced */}
          <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="grid lg:grid-cols-5 gap-0">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/923a88ba-36e1-47a0-9720-17f8a1574b98.jpg"
                  alt="Advanced level training"
                  className="w-full h-full object-cover min-h-[200px] sm:min-h-[250px]"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-3 p-5 sm:p-6 md:p-8 lg:p-10 order-1 lg:order-2">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl sm:text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Продвинутый уровень</h3>
                </div>
                <p className="text-muted-foreground text-base sm:text-lg mb-4 sm:mb-6">
                  Расширение инструментария, сложные случаи, интеграция с другими методами
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    'Работа с травматическими воспоминаниями',
                    'Перспективная регрессия (проектирование будущего)',
                    'Техники самогипноза и якорения',
                    'Работа с метафорами и символическими образами',
                    'Интеграция с коучингом, телесной работой, психотерапией'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <p className="text-base">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                  <p className="text-sm font-medium">
                    ⚠️ Требуется прохождение базового уровня или эквивалентный опыт
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 items-center pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Calendar" size={18} />
                    <span className="font-medium">5 дней очно</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Users" size={18} />
                    <span className="font-medium">до 12 человек</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="MapPin" size={18} />
                    <span className="font-medium">Москва</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Level 3 - Supervision */}
          <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-primary/20">
            <div className="grid lg:grid-cols-5 gap-0">
              <div className="lg:col-span-2">
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/71f3d5f6-2ea6-426b-ba03-2401cbc13c22.jpg"
                  alt="Supervision level training"
                  className="w-full h-full object-cover min-h-[200px] sm:min-h-[250px]"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-3 p-5 sm:p-6 md:p-8 lg:p-10">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl sm:text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Супервизия и мастерство</h3>
                </div>
                <p className="text-muted-foreground text-base sm:text-lg mb-4 sm:mb-6">
                  Разбор реальных кейсов, сложные ситуации, профессиональная поддержка
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    'Разбор записей ваших сеансов',
                    'Работа со "сложными" клиентами',
                    'Тупики, сопротивления, этические дилеммы',
                    'Персональные вопросы и точки роста',
                    'Групповая и индивидуальная супервизия'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <p className="text-base">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-primary/10 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                  <p className="text-sm font-medium">
                    🎯 Только для специалистов с опытом работы в регрессивном гипнозе
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 items-center pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Calendar" size={18} />
                    <span className="font-medium">3 дня очно</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Users" size={18} />
                    <span className="font-medium">до 8 человек</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="MapPin" size={18} />
                    <span className="font-medium">Москва</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}