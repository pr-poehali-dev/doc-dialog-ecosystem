import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ProgramModalProps {
  selectedLevel: 1 | 2 | 3;
  onClose: () => void;
  onBooking: () => void;
}

export default function ProgramModal({ selectedLevel, onClose, onBooking }: ProgramModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-background rounded-lg shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-2xl sm:text-3xl font-bold">
            Программа курса — Уровень {selectedLevel}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {selectedLevel === 1 && (
            <>
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
            </>
          )}

          {selectedLevel === 2 && (
            <>
              <div className="text-center pb-6 border-b">
                <h2 className="text-3xl font-bold mb-2">УРОВЕНЬ 2</h2>
                <p className="text-xl text-muted-foreground">«Регрессия прошлых воплощений. Просмотр и терапия»</p>
              </div>

              {/* Module 1 */}
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">МОДУЛЬ 1. ПОДГОТОВКА К РАБОТЕ С ПРОШЛЫМИ ВОПЛОЩЕНИЯМИ</h3>
                  <p className="text-muted-foreground"><strong>Цель:</strong> Сформировать правильное отношение к трансперсональной регрессии.</p>
                </div>
                
                <div className="space-y-3 pl-4">
                  <div>
                    <h4 className="font-semibold mb-1">Урок 1. Когда можно идти в прошлые воплощения</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Критерии готовности клиента</li>
                      <li>• Противопоказания</li>
                      <li>• Ошибки преждевременного входа</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 2. Позиция специалиста</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Отсутствие веры и неверия</li>
                      <li>• Нейтральность</li>
                      <li>• Экологичность формулировок</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 3. Запросы для работы</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Какие запросы подходят</li>
                      <li>• Какие — нет</li>
                      <li>• Формирование терапевтической цели</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Module 2 */}
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">МОДУЛЬ 2. ВХОД В ПРОШЛОЕ ВОПЛОЩЕНИЕ</h3>
                  <p className="text-muted-foreground"><strong>Цель:</strong> Освоить безопасный и корректный вход.</p>
                </div>
                
                <div className="space-y-3 pl-4">
                  <div>
                    <h4 className="font-semibold mb-1">Урок 4. Точки входа</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Через тело</li>
                      <li>• Через эмоцию</li>
                      <li>• Через символ</li>
                      <li>• Через пространство</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 5. Отличие фантазии от регрессивного опыта</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Телесные маркеры</li>
                      <li>• Эмоциональная глубина</li>
                      <li>• Устойчивость образа</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 6. Ошибки при входе</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Навязывание эпох</li>
                      <li>• Вопросы «в лоб»</li>
                      <li>• Уход в сюжет вместо терапии</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Module 3 */}
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">МОДУЛЬ 3. НАВИГАЦИЯ И ПРОСМОТР</h3>
                  <p className="text-muted-foreground"><strong>Цель:</strong> Научиться вести клиента внутри опыта.</p>
                </div>
                
                <div className="space-y-3 pl-4">
                  <div>
                    <h4 className="font-semibold mb-1">Урок 7. Ориентация в воплощении</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Кто я?</li>
                      <li>• Где я?</li>
                      <li>• Какова моя роль?</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 8. Ключевые события</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Травматические эпизоды</li>
                      <li>• Моменты силы</li>
                      <li>• Смерть и завершение жизни</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 9. Работа со смертью в прошлых воплощениях</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Безопасность</li>
                      <li>• Завершение</li>
                      <li>• Переход</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Module 4 */}
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">МОДУЛЬ 4. ТЕРАПИЯ ПРОШЛЫХ ВОПЛОЩЕНИЙ</h3>
                  <p className="text-muted-foreground"><strong>Цель:</strong> Перевести просмотр в терапевтический результат.</p>
                </div>
                
                <div className="space-y-3 pl-4">
                  <div>
                    <h4 className="font-semibold mb-1">Урок 10. Незавершённые процессы</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Клятвы</li>
                      <li>• Обеты</li>
                      <li>• Контракты</li>
                      <li>• Зароки</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 11. Освобождение от влияния</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Возврат ресурсов</li>
                      <li>• Разрыв деструктивных связей</li>
                      <li>• Изменение реакции в настоящем</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 12. Интеграция опыта</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Связь прошлого и настоящего</li>
                      <li>• Осознание без мистификации</li>
                      <li>• Закрепление результата</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Module 5 */}
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">МОДУЛЬ 5. ОШИБКИ И СЛОЖНЫЕ СЛУЧАИ</h3>
                  <p className="text-muted-foreground"><strong>Цель:</strong> Подготовить специалиста к реальной практике.</p>
                </div>
                
                <div className="space-y-3 pl-4">
                  <div>
                    <h4 className="font-semibold mb-1">Урок 13. Типичные ошибки</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Усиление кармической вины</li>
                      <li>• Перегруз эмоциями</li>
                      <li>• Отсутствие завершения</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 14. Сложные клиенты</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Сильная идентификация</li>
                      <li>• Уход в духовное превосходство</li>
                      <li>• Страх возвращения</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Урок 15. Когда останавливать работу</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                      <li>• Красные флаги</li>
                      <li>• Перенаправление</li>
                      <li>• Этические решения</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Module 6 */}
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">МОДУЛЬ 6. ПРАКТИКА И СУПЕРВИЗИЯ</h3>
                  <p className="text-muted-foreground"><strong>Цель:</strong> Закрепить навык через опыт.</p>
                </div>
                
                <div className="space-y-3 pl-4">
                  <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                    <li>• Практика в парах / тройках</li>
                    <li>• Работа с реальными запросами</li>
                    <li>• Разборы и супервизия</li>
                    <li>• Коррекция ошибок</li>
                  </ul>
                </div>
              </div>

              {/* Final */}
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-2">ФИНАЛ</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Практический кейс</li>
                  <li>• Разбор терапевтической логики</li>
                  <li>• Готовность к самостоятельной работе</li>
                </ul>
              </div>
            </>
          )}

          {selectedLevel === 3 && (
            <div className="text-center py-12">
              <Icon name="BookOpen" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-bold mb-2">Программа 3-го уровня</h3>
              <p className="text-muted-foreground">Детальная программа в разработке</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t px-6 py-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Закрыть
          </Button>
          <Button onClick={() => { onClose(); onBooking(); }}>
            Записаться на консультацию
          </Button>
        </div>
      </div>
    </div>
  );
}