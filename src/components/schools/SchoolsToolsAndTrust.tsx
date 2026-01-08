import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function SchoolsToolsAndTrust() {
  return (
    <>
      {/* Revenue Model Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Полный контроль продаж остаётся у школы
            </h2>
            <p className="text-xl text-muted-foreground">Как вы зарабатываете</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
            {[
              { icon: "CreditCard", text: "Оплата проходит на вашем сайте" },
              { icon: "Handshake", text: "Вы сами работаете с учеником" },
              { icon: "Coins", text: "Без комиссий и посредников" },
              { icon: "ShieldCheck", text: "Без юридических и бухгалтерских рисков" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon name={item.icon} className="text-primary" size={26} />
                  </div>
                  <p className="text-base sm:text-lg font-medium leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-white to-primary/5 p-8 rounded-2xl shadow-xl border border-primary/20">
            <p className="text-xl sm:text-2xl font-bold leading-relaxed">
              Док диалог — не маркетплейс.<br />
              <span className="text-primary">Это канал доверия.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-primary/5 to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                  Инструменты, которые приводят к покупке
                </h2>
                <p className="text-lg text-muted-foreground mb-6">Механики привлечения учеников</p>
              </div>
              <div>
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/de47048b-c766-442e-bda1-6ecdbc711d61.jpg"
                  alt="Инструменты платформы"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { icon: "Gift", title: "Бесплатные курсы", desc: "Познакомьте с вашим подходом" },
              { icon: "Video", title: "Автовебинары", desc: "Презентуйте программу" },
              { icon: "Tag", title: "Запрос промокода", desc: "Увеличьте конверсию" },
              { icon: "School", title: "Страница школы", desc: "Профиль с курсами и экспертами" },
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
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Ученик выбирает школу, которой доверяет
            </h2>
            <p className="text-muted-foreground text-lg">Доверие к школе</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-10">
            {[
              { icon: "School", text: "Профиль школы" },
              { icon: "Users", text: "Авторы и эксперты" },
              { icon: "MessageSquare", text: "Отзывы учеников" },
              { icon: "Star", text: "Рейтинг школы" },
            ].map((item, index) => (
              <Card key={index} className="animate-scale-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon name={item.icon} className="text-primary" size={28} />
                  </div>
                  <p className="font-semibold text-base sm:text-lg">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Даже новая школа выглядит уверенно и профессионально.
          </p>
        </div>
      </section>
    </>
  );
}
