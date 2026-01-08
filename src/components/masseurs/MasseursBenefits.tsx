import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function MasseursBenefits() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            Что даёт Док диалог специалисту
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Всё для профессионального роста и увеличения дохода в одном месте
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[
            {
              icon: "GraduationCap",
              title: "Обучение у лучших школ",
              description: "Доступ к курсам от проверенных школ-партнёров. От базовых техник до продвинутых методик и бизнес-навыков.",
              gradient: "from-blue-500/10 to-indigo-500/10",
              iconColor: "text-blue-600"
            },
            {
              icon: "Users",
              title: "Поток целевых клиентов",
              description: "Люди, которые ценят профессионализм и готовы платить за качественную работу. Без холодного поиска.",
              gradient: "from-emerald-500/10 to-teal-500/10",
              iconColor: "text-emerald-600"
            },
            {
              icon: "Award",
              title: "Профессиональная репутация",
              description: "Портфолио с отзывами, рейтинг, бейджи достижений. Новые клиенты выбирают вас по репутации.",
              gradient: "from-amber-500/10 to-orange-500/10",
              iconColor: "text-amber-600"
            },
            {
              icon: "Briefcase",
              title: "Инструменты для бизнеса",
              description: "Личная страница, запись клиентов, CRM, аналитика. Управляйте практикой профессионально.",
              gradient: "from-purple-500/10 to-pink-500/10",
              iconColor: "text-purple-600"
            },
            {
              icon: "MessageSquare",
              title: "Прямая связь с клиентами",
              description: "Встроенные чаты, уведомления, напоминания. Клиенты возвращаются, потому что вы на связи.",
              gradient: "from-cyan-500/10 to-sky-500/10",
              iconColor: "text-cyan-600"
            },
            {
              icon: "TrendingUp",
              title: "Рост дохода",
              description: "Увеличивайте средний чек, работайте с премиальными клиентами, развивайте личный бренд.",
              gradient: "from-rose-500/10 to-red-500/10",
              iconColor: "text-rose-600"
            },
          ].map((benefit, index) => (
            <Card 
              key={index} 
              className={`animate-scale-in hover:shadow-xl transition-all duration-300 border-primary/10 bg-gradient-to-br ${benefit.gradient}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CardContent className="p-7">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mx-auto mb-5">
                  <Icon name={benefit.icon} className={benefit.iconColor} size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-center">
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
