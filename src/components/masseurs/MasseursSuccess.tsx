import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function MasseursSuccess() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-primary/5 to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
              Истории тех, кто уже растёт с нами
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Реальные результаты специалистов, которые выбрали развитие
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Анна Кузнецова",
                role: "Массажист-реабилитолог",
                experience: "3 года в профессии",
                icon: "TrendingUp",
                gradient: "from-blue-500/10 to-indigo-500/10",
                quote: "За полгода на платформе мой доход вырос на 180%. Прошла 4 курса, повысила квалификацию — и теперь работаю с премиальными клиентами.",
                results: [
                  "Средний чек вырос с 3 000₽ до 8 500₽",
                  "База постоянных клиентов — 45 человек",
                  "Получила статус эксперта"
                ]
              },
              {
                name: "Дмитрий Волков",
                role: "Специалист по висцеральному массажу",
                experience: "1 год на платформе",
                icon: "Award",
                gradient: "from-emerald-500/10 to-teal-500/10",
                quote: "Док диалог дал мне то, чего не было раньше — репутацию. Теперь клиенты находят меня сами, доверяют с первой встречи.",
                results: [
                  "120+ положительных отзывов",
                  "Рейтинг 4.9 из 5",
                  "Запись расписана на 3 недели вперёд"
                ]
              },
              {
                name: "Мария Петрова",
                role: "Массажист-косметолог",
                experience: "Начинающий специалист",
                icon: "Rocket",
                gradient: "from-purple-500/10 to-pink-500/10",
                quote: "Я только начинала карьеру и боялась, что никто не придёт. Но платформа помогла найти первых клиентов и вырасти как специалист.",
                results: [
                  "Первые клиенты через 2 недели",
                  "Прошла 3 курса по повышению квалификации",
                  "Собрала 30+ отзывов за 4 месяца"
                ]
              },
            ].map((story, index) => (
              <Card 
                key={index} 
                className={`animate-scale-in hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${story.gradient} border-primary/10`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-7">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center flex-shrink-0">
                      <Icon name={story.icon} className="text-primary" size={26} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{story.name}</h3>
                      <p className="text-sm text-muted-foreground">{story.role}</p>
                      <p className="text-xs text-muted-foreground mt-1">{story.experience}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground italic mb-5 leading-relaxed">
                    "{story.quote}"
                  </p>

                  <div className="border-t pt-4 space-y-2">
                    <p className="text-sm font-semibold mb-2">Результаты:</p>
                    {story.results.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Icon name="Check" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-sm text-muted-foreground">{result}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-primary/20">
            <Icon name="TrendingUp" className="text-primary mx-auto mb-5" size={48} />
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ваша история успеха начинается сегодня
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Присоединяйтесь к тысячам специалистов, которые выбрали профессиональный рост и стабильный доход
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
