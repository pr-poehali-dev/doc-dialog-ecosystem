import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function SalonsBenefits() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5">
            Почему салоны выбирают Док диалог
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Закрываем все боли HR-отдела и находим специалистов, которые останутся с вами надолго
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary/50 via-secondary to-secondary/50 mx-auto rounded-full mt-4 sm:mt-6"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[
            {
              icon: "ShieldCheck",
              title: "Только проверенные специалисты",
              description: "Каждый массажист прошёл верификацию: проверили документы, образование и отзывы. Мы уверены в их квалификации.",
              gradient: "from-blue-500/10 to-indigo-500/10",
              iconColor: "text-blue-600"
            },
            {
              icon: "GraduationCap",
              title: "Обучены у партнёров",
              description: "Специалисты проходят курсы в лучших школах массажа. Вы получаете профессионалов с актуальными знаниями.",
              gradient: "from-emerald-500/10 to-teal-500/10",
              iconColor: "text-emerald-600"
            },
            {
              icon: "Target",
              title: "Решаем проблему текучести",
              description: "Наши специалисты ищут стабильную работу и развитие. 85% остаются в салоне больше года.",
              gradient: "from-amber-500/10 to-orange-500/10",
              iconColor: "text-amber-600"
            },
            {
              icon: "Clock",
              title: "Быстрый подбор",
              description: "Разместите вакансию за 5 минут. Первые отклики — в течение 24 часов. Забудьте о долгих поисках.",
              gradient: "from-purple-500/10 to-pink-500/10",
              iconColor: "text-purple-600"
            },
            {
              icon: "Star",
              title: "Рейтинг и отзывы",
              description: "У каждого специалиста — прозрачная история работы, отзывы клиентов и рейтинг. Выбирайте осознанно.",
              gradient: "from-cyan-500/10 to-sky-500/10",
              iconColor: "text-cyan-600"
            },
            {
              icon: "Wallet",
              title: "Без комиссий и скрытых платежей",
              description: "Размещение вакансий бесплатно. Никаких подписок и комиссий. Платите только за результат, если решите.",
              gradient: "from-rose-500/10 to-red-500/10",
              iconColor: "text-rose-600"
            },
          ].map((benefit, index) => (
            <Card 
              key={index} 
              className={`animate-scale-in hover:shadow-xl transition-all duration-300 border-secondary/10 bg-gradient-to-br ${benefit.gradient}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CardContent className="p-6 sm:p-7">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mx-auto mb-4 sm:mb-5">
                  <Icon name={benefit.icon} className={benefit.iconColor} size={28} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-center">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
