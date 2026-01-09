import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function SalonsQuality() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-muted/30 to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
            <div className="px-4 sm:px-0">
              <div className="inline-flex items-center gap-2 bg-secondary/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 sm:mb-6 border border-secondary/20">
                <Icon name="Award" className="text-secondary" size={16} />
                <span className="text-sm font-semibold text-secondary">Контроль качества</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Мы гарантируем качество каждого специалиста
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Док диалог — не доска объявлений. Это экосистема, где каждый специалист проходит многоступенчатую проверку перед тем, как попасть в базу.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Вы работаете только с теми, кто подтвердил свою квалификацию документами, отзывами и практикой.
              </p>
            </div>
            <div className="px-4 sm:px-0">
              <img 
                src="https://cdn.poehali.dev/files/woman-getting-back-massage-from-female-masseur (1).jpg"
                alt="Профессиональный массажист за работой в салоне"
                className="rounded-2xl sm:rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: "FileCheck",
                title: "Проверка документов",
                desc: "Дипломы, сертификаты, лицензии — всё проверяется вручную"
              },
              {
                icon: "GraduationCap",
                title: "Обучение в школах",
                desc: "Специалисты учатся у наших партнёров — проверенных школ"
              },
              {
                icon: "MessageSquare",
                title: "История отзывов",
                desc: "Прозрачная репутация с отзывами реальных клиентов"
              },
              {
                icon: "Shield",
                title: "Постоянный мониторинг",
                desc: "Следим за качеством работы и рейтингом каждого"
              },
            ].map((item, index) => (
              <Card 
                key={index} 
                className="animate-scale-in hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <CardContent className="p-5 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm">
                    <Icon name={item.icon} className="text-secondary" size={24} />
                  </div>
                  <h3 className="font-bold mb-2 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}