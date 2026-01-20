import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import SchoolsFooter from "@/components/schools/SchoolsFooter";

export default function EducationPlatform() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/5 overflow-hidden pt-[100px]">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center pb-16 sm:pb-24">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Обучающая платформа Док диалог
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-6">
                Авторские курсы, вебинары и практические программы для массажистов, остеопатов и специалистов телесных практик
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-8">
                Здесь собраны все образовательные продукты проекта <span className="font-semibold text-primary">Док диалог</span>: 
                от бесплатных вводных курсов до профессиональных авторских программ и вебинаров.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <a href="https://school.brossok.ru/training" target="_blank" rel="noopener noreferrer">
                    <Icon name="BookOpen" className="mr-2" size={20} />
                    Перейти к курсам
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => scrollToSection('free')}>
                  <Icon name="GraduationCap" className="mr-2" size={20} />
                  Бесплатные материалы
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-2xl" />
              <img 
                src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/d369a576-91bc-405e-b489-e78942017b4b.jpg" 
                alt="Обучение специалистов" 
                className="relative rounded-2xl shadow-2xl w-full h-[400px] sm:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is this platform */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div className="order-2 lg:order-1">
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/3b361dc4-65c7-4fed-8bb7-2dd606059444.jpg" 
                  alt="Онлайн обучение" 
                  className="rounded-2xl shadow-xl w-full h-[350px] object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Что это за платформа?
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed mb-6">
                    Данная платформа — это обучающее пространство проекта <span className="font-semibold text-primary">Док диалог</span>, 
                    вынесенное на отдельный домен для удобства обучения, стабильной работы и масштабирования образовательных программ.
                  </p>
              
                  <Card className="p-6 mb-4 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                    <h3 className="text-lg font-bold mb-3 text-foreground">Здесь размещаются:</h3>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle2" className="text-primary mt-1 flex-shrink-0" size={18} />
                        <span>Авторские курсы Док диалог</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle2" className="text-primary mt-1 flex-shrink-0" size={18} />
                        <span>Бесплатные обучающие материалы</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle2" className="text-primary mt-1 flex-shrink-0" size={18} />
                        <span>Вебинары и записи мероприятий</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle2" className="text-primary mt-1 flex-shrink-0" size={18} />
                        <span>Практические программы для специалистов</span>
                      </li>
                    </ul>
                  </Card>

                  <ul className="space-y-2 mb-4 text-sm">
                    <li className="flex items-start gap-2">
                      <Icon name="Sparkles" className="text-primary mt-1 flex-shrink-0" size={18} />
                      <span>Удобный личный кабинет</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Sparkles" className="text-primary mt-1 flex-shrink-0" size={18} />
                      <span>Доступ к материалам 24/7</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Sparkles" className="text-primary mt-1 flex-shrink-0" size={18} />
                      <span>Структурированное обучение</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <Card className="p-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 max-w-4xl mx-auto">
              <p className="text-lg font-medium text-center text-foreground">
                <Icon name="ArrowRight" className="inline mr-2 text-primary" size={20} />
                <span className="font-bold">Док диалог</span> остаётся экосистемой и профессиональным сообществом,
                а <span className="font-bold">эта платформа — его образовательной частью</span>.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* For whom */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Для кого эта платформа
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Users" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Массажисты</h3>
              <p className="text-muted-foreground">
                Практические знания, которые можно применять сразу в работе с клиентами
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Stethoscope" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Остеопаты и мануальные терапевты</h3>
              <p className="text-muted-foreground">
                Системное понимание тела, причинно-следственных связей и подходов к лечению
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="HeartPulse" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Специалисты телесных практик</h3>
              <p className="text-muted-foreground">
                Без «воды» и эзотерики — только рабочие принципы и клиническое мышление
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Sparkles" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Начинающие специалисты</h3>
              <p className="text-muted-foreground">
                Пошаговый вход в профессию и формирование уверенности в работе
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Course formats */}
      <section id="courses" className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Какие форматы обучения доступны
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-primary/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">🎓</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Авторские курсы Док диалог</h3>
                  <p className="text-muted-foreground">
                    Глубокие программы, созданные практикующим врачом и специалистами проекта 
                    (диагностика, работа с телом, мышление специалиста, клинические случаи)
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-primary/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">📺</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Вебинары и интенсивы</h3>
                  <p className="text-muted-foreground">
                    Актуальные темы, разборы кейсов, ответы на вопросы специалистов
                  </p>
                </div>
              </div>
            </Card>

            <Card id="free" className="p-8 hover:shadow-xl transition-all duration-300 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">🆓</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Бесплатные курсы и вводные модули</h3>
                  <p className="text-muted-foreground">
                    Для знакомства с подходом Док диалог и повышения базовой компетенции
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-primary/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">📘</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Практические материалы</h3>
                  <p className="text-muted-foreground">
                    Чек-листы, схемы, алгоритмы, методички
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/34b6ea30-0448-45cc-b86a-484ad6990af5.jpg" 
                  alt="Профессиональная работа" 
                  className="rounded-2xl shadow-xl w-full h-[450px] object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                  Подход к обучению
                </h2>
                <Card className="p-6 border-primary/20">
                  <p className="text-lg font-medium mb-6">
                    Обучение в Док диалог — это не «теория ради теории».
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="font-bold mb-3">Мы делаем акцент на:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Icon name="Target" className="text-primary mt-1 flex-shrink-0" size={18} />
                        <span>Клиническое мышление</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Target" className="text-primary mt-1 flex-shrink-0" size={18} />
                        <span>Понимание причин, а не только симптомов</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Target" className="text-primary mt-1 flex-shrink-0" size={18} />
                        <span>Безопасность работы с телом</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Target" className="text-primary mt-1 flex-shrink-0" size={18} />
                        <span>Реальные случаи из практики</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold mb-3">Все курсы:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle2" className="text-primary mt-1 flex-shrink-0" size={18} />
                        <span>Основаны на практике</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle2" className="text-primary mt-1 flex-shrink-0" size={18} />
                        <span>Структурированы и логичны</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle2" className="text-primary mt-1 flex-shrink-0" size={18} />
                        <span>Подходят для специалистов разного уровня</span>
                      </li>
                    </ul>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who creates */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/d3786e7b-aeec-47cb-b6f0-159779ca4c89.jpg" 
                  alt="Массаж и телесные практики" 
                  className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Кто стоит за обучением
                </h2>
                <Card className="p-6 border-primary/20">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Курсы Док диалог создаются практикующим специалистом, работающими с пациентами и клиентами каждый день.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Проект основан врачом-остеопатом с реальной клинической практикой и подтверждённой репутацией.
                  </p>
                  <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
                    <p className="font-medium">
                      Все материалы проходят отбор по принципу: <span className="font-bold text-primary">«Это действительно работает?»</span>
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to start */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Как начать
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                { num: "1️⃣", text: "Выберите курс или бесплатный материал" },
                { num: "2️⃣", text: "Зарегистрируйтесь на платформе" },
                { num: "3️⃣", text: "Получите доступ к личному кабинету" },
                { num: "4️⃣", text: "Обучайтесь в удобное время" },
                { num: "5️⃣", text: "Применяйте знания в практике" }
              ].map((step, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{step.num}</div>
                    <p className="text-lg font-medium">{step.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Connection with ecosystem */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
              Это больше, чем просто курсы
            </h2>
            <Card className="p-8 lg:p-12 border-primary/20">
              <p className="text-xl text-center mb-8">
                Обучение — часть экосистемы <span className="font-bold text-primary">Док диалог</span>.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                На основном сайте проекта вы также найдете:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Icon name="Users" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Профессиональное сообщество</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Wrench" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Инструменты и чат-боты для специалистов</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="TrendingUp" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Поддержку развития частной практики</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Lightbulb" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Маркетинговые и образовательные решения</span>
                </li>
              </ul>
              <div className="text-center">
                <Button size="lg" variant="outline" onClick={() => window.open('/', '_blank')}>
                  <Icon name="ExternalLink" className="mr-2" size={20} />
                  Перейти на сайт Док диалог
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Начните обучение в Док диалог
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Выберите курс и сделайте следующий шаг в профессиональном развитии
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <a href="https://docdialog.su/courses" target="_blank" rel="noopener noreferrer">
                <Icon name="GraduationCap" className="mr-2" size={20} />
                Смотреть курсы
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-primary" onClick={() => scrollToSection('free')}>
              <Icon name="Gift" className="mr-2" size={20} />
              Бесплатное обучение
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SchoolsFooter />
    </div>
  );
}