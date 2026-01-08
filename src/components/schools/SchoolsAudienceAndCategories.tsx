import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function SchoolsAudienceAndCategories() {
  return (
    <>
      {/* Target Audience Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-primary/5 to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Кто приходит к школам через Док диалог
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
            {[
              { icon: "Sparkles", title: "Начинающие массажисты", desc: "Ищут базовое обучение" },
              { icon: "UserCheck", title: "Практикующие специалисты", desc: "Хотят углубить знания" },
              { icon: "Trophy", title: "Мастера, которые растут в доходе", desc: "Развивают экспертность" },
              { icon: "Target", title: "Специалисты, ищущие новые навыки", desc: "Осваивают смежные области" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon name={item.icon} className="text-primary" size={28} />
                  </div>
                  <h3 className="font-bold mb-2 text-base sm:text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="max-w-3xl mx-auto text-center bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-primary/10">
            <p className="text-lg sm:text-xl font-semibold leading-relaxed">
              Это не холодный трафик.<br />
              <span className="text-primary">Это люди, которые уже приняли решение развиваться.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Course Categories Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Не только массаж
            </h2>
            <p className="text-muted-foreground text-lg">Какие курсы можно размещать</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
            {[
              { icon: "Heart", title: "Профессия и телесные практики" },
              { icon: "Briefcase", title: "Бизнес для массажистов" },
              { icon: "TrendingUp", title: "Маркетинг и личный бренд" },
              { icon: "DollarSign", title: "Финансы, мышление, масштабирование" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-secondary/5" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon name={item.icon} className="text-secondary" size={28} />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg leading-relaxed">{item.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Вы становитесь частью образовательного маршрута специалиста.
          </p>
        </div>
      </section>
    </>
  );
}
