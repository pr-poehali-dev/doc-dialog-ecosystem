import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function MasseursClients() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-primary/5 to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
              Клиенты, которые ценят ваш профессионализм
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Док диалог — это не биржа услуг. Это сообщество людей, которые осознанно заботятся о своём теле и здоровье.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: "Target",
                title: "Целевая аудитория",
                description: "Люди приходят не за дешёвой услугой, а за решением проблемы. Они готовы инвестировать в своё здоровье.",
                color: "from-blue-500/10 to-indigo-500/10",
                iconColor: "text-blue-600"
              },
              {
                icon: "Repeat",
                title: "Долгосрочные отношения",
                description: "Клиенты возвращаются, рекомендуют вас друзьям. Вы строите стабильную практику, а не ловите разовые заказы.",
                color: "from-emerald-500/10 to-teal-500/10",
                iconColor: "text-emerald-600"
              },
              {
                icon: "TrendingUp",
                title: "Высокий средний чек",
                description: "Работайте с премиальным сегментом. Ваши знания и репутация позволяют повышать цены.",
                color: "from-purple-500/10 to-pink-500/10",
                iconColor: "text-purple-600"
              },
            ].map((benefit, index) => (
              <Card 
                key={index} 
                className={`animate-scale-in hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${benefit.color} border-primary/10`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mx-auto mb-5">
                    <Icon name={benefit.icon} className={benefit.iconColor} size={30} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 sm:p-12 shadow-xl border border-primary/20">
            <div className="text-center max-w-3xl mx-auto">
              <Icon name="Shield" className="text-primary mx-auto mb-5" size={48} />
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Ваша репутация работает на вас
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Каждый отзыв, каждая успешная работа повышают ваш рейтинг. Новые клиенты выбирают специалистов с высокой репутацией — и готовы платить больше за гарантию качества.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
