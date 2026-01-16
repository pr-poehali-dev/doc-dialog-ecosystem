import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function MasseursTools() {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12 px-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 sm:mb-6 border border-primary/20">
              <Icon name="Zap" className="text-primary" size={16} />
              <span className="text-sm font-semibold text-primary">Эксклюзивные инструменты</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5">
              Инструменты, которых нет у других
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Док диалог даёт вам конкурентное преимущество
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            {[
              {
                icon: "User",
                title: "Профессиональная страница",
                features: [
                  "Портфолио с фото и видео работ",
                  "Отзывы и рейтинг от реальных клиентов",
                  "Сертификаты и достижения",
                  "Описание методик и специализаций"
                ]
              },
              {
                icon: "Calendar",
                title: "Система записи",
                features: [
                  "Онлайн-календарь и управление расписанием",
                  "Автоматические напоминания клиентам",
                  "Гибкие настройки услуг и цен",
                  "Интеграция с вашим графиком"
                ]
              },
              {
                icon: "BarChart3",
                title: "Аналитика и CRM",
                features: [
                  "Статистика продаж и клиентской базы",
                  "История взаимодействий с клиентами",
                  "Финансовые отчёты",
                  "Понимание, что работает лучше всего"
                ]
              },
              {
                icon: "Award",
                title: "Система репутации",
                features: [
                  "Бейджи за достижения и обучение",
                  "Рост в рейтинге специалистов",
                  "Верификация и статус эксперта",
                  "Доверие клиентов с первого взгляда"
                ]
              },
            ].map((tool, index) => (
              <Card 
                key={index} 
                className="animate-scale-in hover:shadow-xl transition-all duration-300 border-primary/10"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <CardContent className="p-7">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-sm">
                      <Icon name={tool.icon} className="text-primary" size={28} />
                    </div>
                    <h3 className="text-xl font-bold">{tool.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Icon name="Check" className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center shadow-lg border border-primary/20">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
              Всё для профессиональной работы в одном месте
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Не нужно покупать десяток сервисов. Док диалог — это полная инфраструктура для развития вашей практики.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}