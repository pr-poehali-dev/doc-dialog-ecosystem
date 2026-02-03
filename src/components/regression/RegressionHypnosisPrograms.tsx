import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import confetti from 'canvas-confetti';
import { useState } from 'react';

export default function RegressionHypnosisPrograms() {
  const [showProgram, setShowProgram] = useState(false);
  
  const handleBooking = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.open('https://t.me/SergeuVodopianov', '_blank');
  };
  return (
    <section id="cta-section" className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
            Программы обучения
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            Три уровня профессионального мастерства — от базовых навыков до супервизии
          </p>
          
          {/* Program Button */}
          <div className="mt-6">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setShowProgram(true)}
              className="text-base sm:text-lg px-6 sm:px-8"
            >
              <Icon name="BookOpen" className="mr-2" size={20} />
              Программа курса
            </Button>
          </div>
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
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-3 rounded-lg">
                    <p className="text-sm font-medium text-center">
                      💬 Оплата только после личного общения
                    </p>
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
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-3 rounded-lg">
                    <p className="text-sm font-medium text-center">
                      💬 Оплата только после личного общения
                    </p>
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
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-3 rounded-lg">
                    <p className="text-sm font-medium text-center">
                      💬 Оплата только после личного общения
                    </p>
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
                    от 5 000 ₽
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

      {/* Program Modal */}
      {showProgram && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowProgram(false)}
        >
          <div 
            className="bg-background rounded-lg shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-background border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold">Программа базового курса</h3>
              <button 
                onClick={() => setShowProgram(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-8">
              <div className="text-center pb-6 border-b">
                <h2 className="text-3xl font-bold mb-2">БАЗОВЫЙ КУРС</h2>
                <p className="text-xl text-muted-foreground">«Регрессивный гипноз. Основы и практика»</p>
              </div>

              {/* Module 1 */}
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">МОДУЛЬ 1. ВВЕДЕНИЕ В РЕГРЕССИВНЫЙ ГИПНОЗ</h3>
                  <p className="text-muted-foreground"><strong>Цель модуля:</strong> Сформировать правильное понимание метода и снять страхи, ожидания и иллюзии.</p>
                </div>
                
                <div className="space-y-3 pl-4">
                  <div>
                    <h4 className="font-semibold mb-1">Урок 1. Что такое регрессивный гипноз</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Определение метода</li>
                      <li>• Чем регрессия отличается от медитации, визуализации, классического гипноза</li>
                      <li>• Где заканчивается психология и начинается работа с бессознательным</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 2. Зачем человеку регрессия</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Повторяющиеся сценарии</li>
                      <li>• Необъяснимые страхи и реакции</li>
                      <li>• Телесные симптомы без ясной причины</li>
                      <li>• Почему логика не решает эти задачи</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 3. Мифы и искажения</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• «Это фантазии»</li>
                      <li>• «Мне не покажут»</li>
                      <li>• «Я не поддаюсь гипнозу»</li>
                      <li>• Почему ожидания мешают регрессии</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Module 2 */}
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">МОДУЛЬ 2. СОЗНАНИЕ И БЕССОЗНАТЕЛЬНОЕ</h3>
                  <p className="text-muted-foreground"><strong>Цель:</strong> Понять, с чем реально работает регрессолог.</p>
                </div>
                
                <div className="space-y-3 pl-4">
                  <div>
                    <h4 className="font-semibold mb-1">Урок 4. Как устроено бессознательное</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Образный язык</li>
                      <li>• Отсутствие времени</li>
                      <li>• Запись опыта через эмоцию и тело</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 5. Память тела</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Почему тело «помнит»</li>
                      <li>• Связь симптома и события</li>
                      <li>• Телесные маркеры входа в регрессию</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 6. Почему прошлое влияет на настоящее</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Механизм повторения</li>
                      <li>• Триггеры</li>
                      <li>• Автоматические реакции</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Module 3 */}
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">МОДУЛЬ 3. СОСТОЯНИЕ РЕГРЕССИИ</h3>
                  <p className="text-muted-foreground"><strong>Цель:</strong> Научиться распознавать и удерживать рабочее состояние.</p>
                </div>
                
                <div className="space-y-3 pl-4">
                  <div>
                    <h4 className="font-semibold mb-1">Урок 7. Изменённое состояние сознания</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Что реально происходит с психикой</li>
                      <li>• Глубина регрессии</li>
                      <li>• Почему «глубже» — не всегда лучше</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 8. Признаки входа в регрессию</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Телесные</li>
                      <li>• Эмоциональные</li>
                      <li>• Поведенческие</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 9. Ошибки на входе</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Спешка</li>
                      <li>• Ожидание образов</li>
                      <li>• Давление на клиента</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Module 4 */}
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">МОДУЛЬ 4. РОЛЬ РЕГРЕССОЛОГА</h3>
                  <p className="text-muted-foreground"><strong>Цель:</strong> Сформировать профессиональную позицию специалиста.</p>
                </div>
                
                <div className="space-y-3 pl-4">
                  <div>
                    <h4 className="font-semibold mb-1">Урок 10. Кто такой регрессолог</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Не гипнотизёр</li>
                      <li>• Не психолог в классическом смысле</li>
                      <li>• Не «ведущий по прошлым жизням»</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 11. Ответственность и этика</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Границы работы</li>
                      <li>• Когда нельзя делать регрессию</li>
                      <li>• Работа с уязвимыми состояниями</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 12. Контакт и безопасность</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Удержание поля</li>
                      <li>• Чувствование клиента</li>
                      <li>• Когда и как останавливать процесс</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Module 5 */}
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">МОДУЛЬ 5. ПРОЦЕСС РЕГРЕССИИ</h3>
                  <p className="text-muted-foreground"><strong>Цель:</strong> Понять структуру сеанса от начала до завершения.</p>
                </div>
                
                <div className="space-y-3 pl-4">
                  <div>
                    <h4 className="font-semibold mb-1">Урок 13. Структура регрессивного сеанса</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Подготовка</li>
                      <li>• Вход</li>
                      <li>• Исследование</li>
                      <li>• Завершение</li>
                      <li>• Интеграция</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 14. Навигация внутри опыта</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Как задавать вопросы</li>
                      <li>• Что делать, если клиент «завис»</li>
                      <li>• Как не навязывать интерпретации</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 15. Работа с эмоциями</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Страх</li>
                      <li>• Плач</li>
                      <li>• Злость</li>
                      <li>• Оцепенение</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Module 6 */}
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">МОДУЛЬ 6. ЗАВЕРШЕНИЕ И ИНТЕГРАЦИЯ</h3>
                  <p className="text-muted-foreground"><strong>Цель:</strong> Научиться правильно закрывать процесс.</p>
                </div>
                
                <div className="space-y-3 pl-4">
                  <div>
                    <h4 className="font-semibold mb-1">Урок 16. Почему завершение важнее входа</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Незавершённые процессы</li>
                      <li>• Перенос в повседневную жизнь</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 17. Возврат и стабилизация</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Контакт с телом</li>
                      <li>• Ориентация в «здесь и сейчас»</li>
                      <li>• Проверка состояния клиента</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 18. Интеграция опыта</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Осмысление без анализа</li>
                      <li>• Что делать после сеанса</li>
                      <li>• Поддержка изменений</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Module 7 */}
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">МОДУЛЬ 7. ПРАКТИКА И ОШИБКИ (КЛЮЧЕВОЙ)</h3>
                  <p className="text-muted-foreground"><strong>Цель:</strong> Сделать из ученика практикующего специалиста.</p>
                </div>
                
                <div className="space-y-3 pl-4">
                  <div>
                    <h4 className="font-semibold mb-1">Урок 19. Типичные ошибки новичков</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Страх тишины</li>
                      <li>• Слишком много слов</li>
                      <li>• Потеря контакта</li>
                      <li>• Уход в фантазирование</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 20. Работа над ошибками</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Разбор реальных случаев</li>
                      <li>• Анализ действий регрессолога</li>
                      <li>• Альтернативные решения</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 21. Формирование уверенности</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Когда можно работать с клиентами</li>
                      <li>• Как не бояться «не получится»</li>
                      <li>• Рост через практику</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Final */}
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-2">ФИНАЛ КУРСА</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Практический зачёт</li>
                  <li>• Разбор сеанса</li>
                  <li>• Понимание своей готовности</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-background border-t px-6 py-4 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowProgram(false)}>
                Закрыть
              </Button>
              <Button onClick={() => { setShowProgram(false); handleBooking(); }}>
                Записаться на курс
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}