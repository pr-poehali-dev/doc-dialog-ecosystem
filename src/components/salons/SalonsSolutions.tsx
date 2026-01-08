import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function SalonsSolutions() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-muted/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 px-4">
            <div className="inline-flex items-center gap-2 bg-secondary/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 sm:mb-6 border border-secondary/20">
              <Icon name="Zap" className="text-secondary" size={16} />
              <span className="text-sm font-semibold text-secondary">Решаем ваши боли</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5">
              Закрываем главные проблемы салонов
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Знаем, с чем сталкиваются владельцы салонов каждый день
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                icon: "UserX",
                problem: "Текучка кадров",
                solution: "Наши специалисты ищут стабильную работу и карьерный рост. 85% работают в салоне больше года.",
                gradient: "from-red-500/10 to-rose-500/10",
                iconColor: "text-red-600"
              },
              {
                icon: "Search",
                problem: "Долгий поиск",
                solution: "Первые отклики за 24 часа. Вы выбираете из готовых кандидатов, а не ищете месяцами.",
                gradient: "from-orange-500/10 to-amber-500/10",
                iconColor: "text-orange-600"
              },
              {
                icon: "AlertTriangle",
                problem: "Низкая квалификация",
                solution: "Все специалисты прошли обучение и верификацию. Вы получаете профессионалов, не новичков.",
                gradient: "from-yellow-500/10 to-lime-500/10",
                iconColor: "text-yellow-600"
              },
              {
                icon: "DollarSign",
                problem: "Дорогой подбор",
                solution: "Размещение вакансий бесплатно. Никаких агентских комиссий в 30-50% от зарплаты.",
                gradient: "from-emerald-500/10 to-green-500/10",
                iconColor: "text-emerald-600"
              },
              {
                icon: "ThumbsDown",
                problem: "Плохие отзывы клиентов",
                solution: "Специалисты с высоким рейтингом и проверенной репутацией. Ваши клиенты будут довольны.",
                gradient: "from-blue-500/10 to-cyan-500/10",
                iconColor: "text-blue-600"
              },
              {
                icon: "Clock",
                problem: "Нет замены на время отпусков",
                solution: "База специалистов для подработки и временной занятости. Всегда есть кем заменить.",
                gradient: "from-purple-500/10 to-violet-500/10",
                iconColor: "text-purple-600"
              },
            ].map((item, index) => (
              <Card 
                key={index} 
                className={`animate-scale-in hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${item.gradient} border-secondary/10`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <CardContent className="p-6 sm:p-7">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white shadow-md flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} className={item.iconColor} size={26} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-red-600 mb-1">❌ {item.problem}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">Типичная проблема салонов</p>
                    </div>
                  </div>
                  <div className="pl-0 sm:pl-16">
                    <h4 className="text-base sm:text-lg font-bold text-green-600 mb-2">✅ Наше решение</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 bg-gradient-to-r from-secondary/5 via-secondary/10 to-secondary/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center shadow-lg border border-secondary/20">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
              Сосредоточьтесь на бизнесе, а не на поиске персонала
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Док диалог берёт на себя все сложности подбора. Вы получаете готовых специалистов, которым можно доверять.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
