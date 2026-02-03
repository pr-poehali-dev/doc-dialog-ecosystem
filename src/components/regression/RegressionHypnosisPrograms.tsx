import { useState } from 'react';
import confetti from 'canvas-confetti';
import ProgramLevelCard from './ProgramLevelCard';
import SupervisionCard from './SupervisionCard';
import ProgramModal from './ProgramModal';

export default function RegressionHypnosisPrograms() {
  const [showProgram, setShowProgram] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);
  
  const openProgram = (level: 1 | 2 | 3) => {
    setSelectedLevel(level);
    setShowProgram(true);
  };
  
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
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Level 1 - Basic */}
          <ProgramLevelCard
            level={1}
            title="Уровень 1: Базовый"
            focus="Фокус: основы метода и безопасность"
            imageUrl="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/8c816ef4-e8b0-4c2e-bd02-2297da99fa7b.jpg"
            imageAlt="Basic level training"
            items={[
              'Изменённые состояния сознания: нейрофизиология',
              'Гипноз и внимание',
              'Типы регрессивных процессов',
              'Структура сессии',
              'Контракт и запрос',
              'Этика и границы работы',
              'Противопоказания',
              'Практика в парах'
            ]}
            result="Результат: Вы уверенно владеете базовым протоколом регрессивной работы"
            price="Стоимость 25 000 ₽"
            onOpenProgram={openProgram}
            onBooking={handleBooking}
          />

          {/* Level 2 - Advanced */}
          <ProgramLevelCard
            level={2}
            title="Уровень 2: Работа с глубинным опытом"
            focus="Фокус: символическая и метафорическая память"
            imageUrl="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/923a88ba-36e1-47a0-9720-17f8a1574b98.jpg"
            imageAlt="Advanced level training"
            items={[
              'Архетипические образы и символы',
              'Сценарные структуры психики',
              'Повторяющиеся паттерны поведения',
              'Травматический и незавершённый опыт',
              'Перепроживание и интеграция',
              'Практика сопровождения'
            ]}
            result="Результат: Вы умеете работать с глубинными сценариями личности"
            price="Стоимость 49 900 ₽"
            infoMessage="ℹ️ Прошлые воплощения рассматриваются как форма работы с бессознательным, а не как догматическая концепция"
            reverseLayout={true}
            onOpenProgram={openProgram}
            onBooking={handleBooking}
          />

          {/* Level 3 - Progression */}
          <ProgramLevelCard
            level={3}
            title="Уровень 3: Прогрессия"
            focus="Фокус: работа с будущим и выбором"
            imageUrl="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/71f3d5f6-2ea6-426b-ba03-2401cbc13c22.jpg"
            imageAlt="Supervision level training"
            items={[
              'Что такое прогрессия и чем она отличается от регрессии',
              'Варианты будущего: как работает выбор',
              'Исследование последствий решений',
              'Коррекция стратегий и паттернов',
              'Работа с целями и намерениями',
              'Практика прогрессивного сопровождения'
            ]}
            result="Результат: Вы используете прогрессию как инструмент осознанного выбора и изменений"
            price="Стоимость 55 000 ₽"
            onOpenProgram={openProgram}
            onBooking={handleBooking}
          />

          {/* Supervision */}
          <SupervisionCard onBooking={handleBooking} />
        </div>
      </div>

      {/* Program Modal */}
      {showProgram && (
        <ProgramModal
          selectedLevel={selectedLevel}
          onClose={() => setShowProgram(false)}
          onBooking={handleBooking}
        />
      )}
    </section>
  );
}
