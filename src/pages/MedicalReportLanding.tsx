import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import SchoolsFooter from "@/components/schools/SchoolsFooter";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const testimonials = [
  {
    name: "Анна Петрова",
    age: 34,
    text: "Получила результаты МРТ с кучей непонятных терминов. ИИ объяснил всё так, что я пришла к врачу уже подготовленной и задала правильные вопросы.",
    rating: 5
  },
  {
    name: "Дмитрий Соколов",
    age: 42,
    text: "Наконец-то понял, что написано в моём анализе крови! Раньше просто пугался непонятных слов, теперь спокойно обсудил всё с терапевтом.",
    rating: 5
  },
  {
    name: "Елена Михайлова",
    age: 28,
    text: "Очень помогло перед визитом к неврологу. Расшифровка заключения дала мне уверенность и снизила тревожность.",
    rating: 5
  },
  {
    name: "Сергей Волков",
    age: 55,
    text: "Устал гуглить медицинские термины и читать форумы. Здесь получил понятное объяснение за минуту. Рекомендую!",
    rating: 5
  },
  {
    name: "Мария Краснова",
    age: 31,
    text: "После УЗИ была в панике из-за непонятных формулировок. ИИ спокойно всё объяснил, подсказал к какому врачу идти дальше.",
    rating: 5
  },
  {
    name: "Игорь Лебедев",
    age: 47,
    text: "Отличный инструмент! Помог разобраться с заключением кардиолога. Теперь понимаю, на что обращать внимание.",
    rating: 5
  },
  {
    name: "Ольга Смирнова",
    age: 39,
    text: "Пробный период бесплатный — попробовала без риска. Теперь использую постоянно перед визитами к врачам.",
    rating: 5
  },
  {
    name: "Алексей Морозов",
    age: 50,
    text: "Латинские термины всегда пугали. Сервис объяснил простым языком, что к чему. Очень доволен!",
    rating: 5
  },
  {
    name: "Татьяна Белова",
    age: 36,
    text: "Помогло подготовиться к повторному приёму. Врач даже похвалил, что я хорошо ориентируюсь в своём диагнозе.",
    rating: 4
  },
  {
    name: "Владимир Козлов",
    age: 44,
    text: "Удобно, быстро, понятно. Снимает стресс перед походом к врачу. Всем рекомендую попробовать.",
    rating: 5
  }
];

const MedicalReportLanding = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation scrollToSection={scrollToSection} />
      
      {/* Первый экран с фоном */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/5bc122e9-0c89-4c2c-a7f3-5ee39cf8c1e6.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/85 to-slate-900/90"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <Icon name="Sparkles" size={16} className="text-white" />
              <span className="text-sm font-medium text-white">ИИ-помощник</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Поймите, что написано в медицинском заключении
            </h1>
            
            <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto">
              ИИ помогает перевести сложный медицинский язык
              в понятные объяснения — без диагнозов и назначений.
            </p>

            <p className="text-lg text-white/80 mb-8 font-medium">
              Спокойно. Доступно. Без запугивания.
            </p>

            <Link to="/dashboard/tools">
              <Button size="lg" className="text-lg px-8 bg-white text-primary hover:bg-white/90">
                Попробовать бесплатно
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Проблема пользователя с изображением */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Медицинские заключения часто непонятны
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>Сложные термины.</p>
                  <p>Латинские формулировки.</p>
                  <p>Сокращения без пояснений.</p>
                  <p className="mt-6 font-medium text-foreground">
                    В результате — тревога, догадки и поиск ответов в интернете.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/ac54870e-2a91-4c27-a94e-76ce8c5d05ef.jpg" 
                  alt="Консультация врача"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Решение */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Мы помогаем разобраться, а не лечить
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-center">
              Вы загружаете медицинское заключение,
              а ИИ объясняет:
            </p>
            <div className="grid gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" className="text-primary" size={20} />
                  </div>
                  <p className="text-lg">что там написано простым языком</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageCircle" className="text-primary" size={20} />
                  </div>
                  <p className="text-lg">какие формулировки стоит уточнить у врача</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Eye" className="text-primary" size={20} />
                  </div>
                  <p className="text-lg">на что обратить внимание</p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center space-y-2">
              <p className="text-muted-foreground">Без интерпретации как диагноза.</p>
              <p className="text-muted-foreground">Без рекомендаций по лечению.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Как это работает с изображением */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Просто и безопасно
            </h2>
            
            <div className="mb-12 rounded-2xl overflow-hidden shadow-xl max-w-2xl mx-auto">
              <img 
                src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/d7942ca1-7f8d-4573-a8ec-1be4bf31d64f.jpg" 
                alt="Использование приложения"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Загрузите документ</h3>
                <p className="text-muted-foreground">Текст или фото медицинского заключения</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">ИИ анализирует</h3>
                <p className="text-muted-foreground">Обрабатывает документ за несколько секунд</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Получите объяснение</h3>
                <p className="text-muted-foreground">Понятный текст в личном кабинете</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Отзывы клиентов */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Отзывы наших пользователей
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Более 5000 человек уже используют наш сервис
          </p>
        </div>
        
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`flex gap-6 ${isPaused ? '' : 'animate-scroll'}`}>
            {/* Первая копия отзывов */}
            {testimonials.map((testimonial, index) => (
              <div 
                key={`first-${index}`}
                className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.age} лет</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Вторая копия для бесшовного скролла */}
            {testimonials.map((testimonial, index) => (
              <div 
                key={`second-${index}`}
                className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.age} лет</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Что вы получите */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Понятное объяснение вместо медицинского языка
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 shadow-sm border border-primary/10">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Check" className="text-primary" size={24} />
                  <h3 className="text-lg font-semibold">Расшифровка терминов</h3>
                </div>
                <p className="text-muted-foreground ml-9">Понятные объяснения сложных слов</p>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 shadow-sm border border-primary/10">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Check" className="text-primary" size={24} />
                  <h3 className="text-lg font-semibold">Пояснение формулировок</h3>
                </div>
                <p className="text-muted-foreground ml-9">Что означают записи врачей</p>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 shadow-sm border border-primary/10">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Check" className="text-primary" size={24} />
                  <h3 className="text-lg font-semibold">Ключевые моменты</h3>
                </div>
                <p className="text-muted-foreground ml-9">Выделение важной информации</p>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 shadow-sm border border-primary/10">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Check" className="text-primary" size={24} />
                  <h3 className="text-lg font-semibold">Спокойный тон</h3>
                </div>
                <p className="text-muted-foreground ml-9">Нейтральная подача без запугивания</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* К кому обращаться дальше */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Понимание — первый шаг к правильному выбору
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              ИИ подскажет, к специалисту какого профиля обычно обращаются
              для дальнейшего обсуждения результатов.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-3 text-left">
                <Icon name="AlertCircle" className="text-amber-600 flex-shrink-0 mt-1" size={24} />
                <p className="text-amber-900">
                  Это не рекомендация и не консультация, а ориентир для дальнейших шагов.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Для кого подходит */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Кому будет полезно
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Users" className="text-primary" size={24} />
                </div>
                <p className="text-lg">людям, получившим медицинское заключение</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Stethoscope" className="text-primary" size={24} />
                </div>
                <p className="text-lg">тем, кто хочет подготовиться к визиту к врачу</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Search" className="text-primary" size={24} />
                </div>
                <p className="text-lg">тем, кто устал искать расшифровки в интернете</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Heart" className="text-primary" size={24} />
                </div>
                <p className="text-lg">тем, кто хочет снизить тревожность</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Безопасность */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Важно знать
            </h2>
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
              <div className="space-y-4 text-lg">
                <div className="flex items-start gap-3">
                  <Icon name="ShieldCheck" className="text-primary flex-shrink-0 mt-1" size={24} />
                  <p>ИИ не ставит диагнозы</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="ShieldCheck" className="text-primary flex-shrink-0 mt-1" size={24} />
                  <p>ИИ не назначает лечение</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="ShieldCheck" className="text-primary flex-shrink-0 mt-1" size={24} />
                  <p>Инструмент носит информационный характер</p>
                </div>
              </div>
              <p className="mt-6 text-center font-medium">
                Окончательные решения всегда принимаются совместно с медицинским специалистом.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Пробный период */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Попробуйте бесплатно
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Мы даём бесплатный пробный период, чтобы вы могли оценить пользу инструмента
              и понять, насколько он вам подходит.
            </p>
            <p className="text-lg font-medium text-muted-foreground mb-8">
              Без обязательств.
            </p>
            <Link to="/dashboard/tools">
              <Button size="lg" className="text-lg px-8">
                Начать бесплатный период
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Связь с экосистемой */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Часть экосистемы Док диалог
            </h2>
            <p className="text-lg text-muted-foreground">
              Этот инструмент — часть философии Док диалог: помогать людям лучше понимать своё тело
              и принимать осознанные решения.
            </p>
          </div>
        </div>
      </section>

      {/* Финальный блок */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Понимание снижает тревогу
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Док диалог помогает разобраться, чтобы вы чувствовали уверенность и спокойствие.
            </p>
            <Link to="/dashboard/tools">
              <Button size="lg" className="text-lg px-8">
                Воспользоваться инструментом
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
              Инструмент предназначен для информационных целей и не заменяет консультацию врача.
            </p>
          </div>
        </div>
      </section>

      <SchoolsFooter />

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-80px * 10 - 1.5rem * 10));
          }
        }
        
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MedicalReportLanding;
