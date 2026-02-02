import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import confetti from 'canvas-confetti';

export default function RegressionHypnosisPrograms() {
  const handleBooking = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.open('https://t.me/SergeuVodopianov', '_blank');
  };
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
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Уровень 1: Базовый</h3>
                </div>
                <p className="text-muted-foreground text-base sm:text-lg mb-4 sm:mb-6 font-medium">
                  Фокус: основы метода и безопасность
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    'Изменённые состояния сознания: нейрофизиология',
                    'Гипноз и внимание',
                    'Типы регрессивных процессов',
                    'Структура сессии',
                    'Контракт и запрос',
                    'Этика и границы работы',
                    'Противопоказания',
                    'Практика в парах'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 sm:gap-3">
                      <Icon name="Check" className="text-primary mt-0.5 sm:mt-1 flex-shrink-0" size={16} />
                      <p className="text-sm sm:text-base">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                  <p className="text-sm font-medium">
                    ✅ Результат: Вы уверенно владеете базовым протоколом регрессивной работы
                  </p>
                </div>
                <div className="pt-4 sm:pt-6 border-t space-y-4">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    Стоимость 25 000 ₽
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      size="lg" 
                      className="flex-1"
                      onClick={handleBooking}
                    >
                      Забронировать место 10 000 ₽
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="flex-1"
                      onClick={handleBooking}
                    >
                      Оплатить полностью
                    </Button>
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
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Уровень 2: Работа с глубинным опытом</h3>
                </div>
                <p className="text-muted-foreground text-base sm:text-lg mb-3 sm:mb-4 font-medium">
                  Фокус: символическая и метафорическая память
                </p>
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                  <p className="text-sm font-medium">
                    ℹ️ Прошлые воплощения рассматриваются как форма работы с бессознательным, а не как догматическая концепция
                  </p>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    'Архетипические образы и символы',
                    'Сценарные структуры психики',
                    'Повторяющиеся паттерны поведения',
                    'Травматический и незавершённый опыт',
                    'Перепроживание и интеграция',
                    'Практика сопровождения'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <p className="text-base">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                  <p className="text-sm font-medium">
                    ✅ Результат: Вы умеете работать с глубинными сценариями личности
                  </p>
                </div>
                <div className="pt-4 sm:pt-6 border-t space-y-4">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    Стоимость 49 900 ₽
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      size="lg" 
                      className="flex-1"
                      onClick={handleBooking}
                    >
                      Забронировать место 10 000 ₽
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="flex-1"
                      onClick={handleBooking}
                    >
                      Оплатить полностью
                    </Button>
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
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Уровень 3: Прогрессия</h3>
                </div>
                <p className="text-muted-foreground text-base sm:text-lg mb-4 sm:mb-6 font-medium">
                  Фокус: работа с перспективами и выбором
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    'Прогрессия как метод работы с мотивацией',
                    'Вероятностные модели будущего',
                    'Работа с целями и ценностями',
                    'Отличие прогрессии от фантазирования',
                    'Этика и ограничения метода',
                    'Практика'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <p className="text-base">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                  <p className="text-sm font-medium">
                    ✅ Результат: Вы используете прогрессию как инструмент осознанного выбора и изменений
                  </p>
                </div>
                <div className="pt-4 sm:pt-6 border-t space-y-4">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    Стоимость 55 000 ₽
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      size="lg" 
                      className="flex-1"
                      onClick={handleBooking}
                    >
                      Забронировать место 10 000 ₽
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="flex-1"
                      onClick={handleBooking}
                    >
                      Оплатить полностью
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Supervision - Separate Block */}
          <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-amber-500/30 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
            <div className="p-6 sm:p-8 md:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4">
                  <Icon name="Users" size={32} className="text-amber-600 dark:text-amber-500" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Супервизия</h3>
                <p className="text-muted-foreground text-base sm:text-lg font-medium">
                  Профессиональная поддержка и разбор практики
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Icon name="Target" size={20} className="text-amber-600" />
                    Групповая супервизия
                  </h4>
                  <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                      <span>Разбор реальных кейсов участников</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                      <span>Работа со сложными ситуациями</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                      <span>Обмен опытом в профессиональном сообществе</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Icon name="User" size={20} className="text-amber-600" />
                    Индивидуальная супервизия
                  </h4>
                  <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                      <span>Персональный разбор ваших сеансов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                      <span>Этические дилеммы и границы</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                      <span>Точки профессионального роста</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-100 dark:bg-amber-900/30 p-4 sm:p-5 rounded-lg mb-6">
                <p className="text-sm font-medium text-center">
                  🎯 Для специалистов, практикующих регрессивный гипноз
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-500">
                    от 3 000 ₽
                  </div>
                  <p className="text-sm text-muted-foreground">за сессию</p>
                </div>
                <Button 
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={handleBooking}
                >
                  Записаться на супервизию
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}