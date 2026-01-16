import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function SchoolsProblemsAndSolution() {
  return (
    <>
      {/* Problems Section */}
      <section className="py-10 md:py-16 lg:py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Почему школам сложно стабильно продавать обучение
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 max-w-7xl mx-auto">
            {[
              { icon: "TrendingUp", text: "Реклама дорожает, а качество лидов падает", color: "destructive" },
              { icon: "UserX", text: "Ученик приходит один раз и не возвращается", color: "destructive" },
              { icon: "ShieldAlert", text: "Новым школам сложно вызвать доверие", color: "destructive" },
              { icon: "TrendingDown", text: "Скидки обесценивают продукт", color: "destructive" },
              { icon: "Users", text: "Нет среды для долгосрочного роста", color: "destructive" },
              { icon: "Gauge", text: "Конкуренция только по цене, а не по качеству", color: "destructive" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in hover:shadow-lg transition-all duration-300 border-muted" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-destructive/10 to-destructive/5 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon name={item.icon} className="text-destructive" size={24} />
                  </div>
                  <p className="text-base sm:text-lg leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-10 md:py-16 lg:py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center mb-8 md:mb-12">
              <div className="order-2 lg:order-1">
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/7ed1562c-c801-4176-9ecc-e7b12074a8e7.jpg"
                  alt="Целевая аудитория"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                  Мы не продаём курсы.<br className="hidden sm:block" /> Мы приводим к вам целевых учеников.
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Док диалог — это экосистема, где массажисты учатся, работают и развиваются. Курсы здесь — часть профессионального пути, а не разовая покупка.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {[
                { icon: "Users", text: "Уже заинтересованная аудитория" },
                { icon: "Shield", text: "Высокий уровень доверия" },
                { icon: "Repeat", text: "Долгосрочное взаимодействие" },
              ].map((item, index) => (
                <Card key={index} className="animate-scale-in hover:shadow-xl transition-all duration-300 border-primary/20 bg-gradient-to-br from-white to-primary/5" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Icon name={item.icon} className="text-primary" size={32} />
                    </div>
                    <p className="text-lg font-semibold leading-relaxed">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}