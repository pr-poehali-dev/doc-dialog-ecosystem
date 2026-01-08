import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function SalonsTestimonials() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5">
              Салоны, которые уже с нами
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Реальные отзывы владельцев, которые решили проблему с персоналом
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary/50 via-secondary to-secondary/50 mx-auto rounded-full mt-4 sm:mt-6"></div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                name: "Елена Соколова",
                role: "Владелица салона «Гармония»",
                location: "Москва",
                icon: "Building2",
                gradient: "from-blue-500/10 to-indigo-500/10",
                quote: "Раньше тратили месяцы на поиск массажиста. Через Док диалог нашли специалиста за неделю. Он до сих пор с нами — уже год!",
                results: [
                  "Нашли массажиста за 7 дней",
                  "Специалист работает год",
                  "Клиенты довольны на 100%"
                ]
              },
              {
                name: "Дмитрий Волков",
                role: "Директор сети салонов «BeautyLine»",
                location: "Санкт-Петербург",
                icon: "Building",
                gradient: "from-emerald-500/10 to-teal-500/10",
                quote: "Закрыли 5 вакансий за месяц. Все специалисты — с сертификатами и отзывами. Забыли про текучку кадров.",
                results: [
                  "5 вакансий закрыто за месяц",
                  "Текучка снизилась на 70%",
                  "Экономия 300 000₽ на подборе"
                ]
              },
              {
                name: "Анна Петрова",
                role: "Управляющая салоном «Релакс»",
                location: "Казань",
                icon: "Home",
                gradient: "from-purple-500/10 to-pink-500/10",
                quote: "Искали массажиста с опытом висцерального массажа. Нашли за 3 дня! Сразу видно, что человек — профессионал.",
                results: [
                  "Нашли узкого специалиста за 3 дня",
                  "Средний чек вырос на 40%",
                  "Клиенты записываются на месяц вперёд"
                ]
              },
            ].map((story, index) => (
              <Card 
                key={index} 
                className={`animate-scale-in hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${story.gradient} border-secondary/10`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 sm:p-7">
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white shadow-md flex items-center justify-center flex-shrink-0">
                      <Icon name={story.icon} className="text-secondary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg mb-1">{story.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{story.role}</p>
                      <p className="text-xs text-muted-foreground mt-1">📍 {story.location}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-muted-foreground italic mb-4 sm:mb-5 leading-relaxed">
                    "{story.quote}"
                  </p>

                  <div className="border-t pt-4 space-y-2">
                    <p className="text-xs sm:text-sm font-semibold mb-2">Результаты:</p>
                    {story.results.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Icon name="Check" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-xs sm:text-sm text-muted-foreground">{result}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center shadow-xl border border-secondary/20">
            <Icon name="Users" className="text-secondary mx-auto mb-4 sm:mb-5" size={40} />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
              Присоединяйтесь к 200+ салонам
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Которые нашли своих лучших специалистов через Док диалог и забыли про проблемы с персоналом
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
