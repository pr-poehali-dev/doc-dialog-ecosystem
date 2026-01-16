import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function SalonsProcess() {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-secondary/5 to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5">
              Как найти специалиста за 3 простых шага
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Забудьте о бесконечных собеседованиях. Процесс максимально прост и прозрачен
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary/50 via-secondary to-secondary/50 mx-auto rounded-full mt-4 sm:mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-10">
            {[
              {
                step: "1",
                icon: "FileText",
                title: "Разместите вакансию",
                description: "Заполните простую форму: укажите требования, график, зарплату. Это займёт 5 минут.",
                color: "from-blue-500/10 to-indigo-500/10",
                iconColor: "text-blue-600"
              },
              {
                step: "2",
                icon: "Users",
                title: "Получите отклики",
                description: "Специалисты сами откликнутся на вакансию. Смотрите портфолио, рейтинг, отзывы и выбирайте лучших.",
                color: "from-emerald-500/10 to-teal-500/10",
                iconColor: "text-emerald-600"
              },
              {
                step: "3",
                icon: "Handshake",
                title: "Проведите собеседование",
                description: "Свяжитесь с кандидатами напрямую. Назначьте встречу и примите решение.",
                color: "from-purple-500/10 to-pink-500/10",
                iconColor: "text-purple-600"
              },
            ].map((item, index) => (
              <Card 
                key={index} 
                className={`animate-scale-in hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${item.color} border-secondary/10 relative overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-secondary/5">
                  {item.step}
                </div>
                <CardContent className="p-6 sm:p-8 relative z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4 sm:mb-5">
                    <Icon name={item.icon} className={item.iconColor} size={28} />
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full mb-3 border border-secondary/10">
                    <span className="text-xs font-bold text-secondary">Шаг {item.step}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              onClick={() => navigate("/salon/cabinet")}
              className="bg-gradient-to-r from-secondary to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 px-8 sm:px-10 py-6 text-base sm:text-lg"
            >
              Разместить вакансию сейчас
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <p className="text-xs sm:text-sm text-muted-foreground mt-4">
              Бесплатно, без комиссий, первые отклики в течение суток
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}