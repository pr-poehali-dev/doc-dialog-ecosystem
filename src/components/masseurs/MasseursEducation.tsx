import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function MasseursEducation() {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center mb-8 md:mb-12">
            <div className="px-4 sm:px-0">
              <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 sm:mb-6 border border-primary/20">
                <Icon name="Sparkles" className="text-primary" size={16} />
                <span className="text-sm font-semibold text-primary">Непрерывное обучение</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Учитесь у лучших школ индустрии
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Док диалог объединяет топовые школы массажа и телесных практик. Выбирайте курсы по вашим целям — от базовых техник до экспертных специализаций.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Каждая школа проходит отбор. Вы учитесь только у профессионалов с репутацией.
              </p>
            </div>
            <div className="px-4 sm:px-0">
              <img 
                src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/f0120964-b695-4872-88fd-9023380a2ac1.jpg"
                alt="Профессиональное обучение"
                className="rounded-2xl sm:rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                icon: "Heart",
                title: "Массажные техники",
                desc: "Классический, висцеральный, лимфодренаж, и другие виды массажа"
              },
              {
                icon: "Briefcase",
                title: "Бизнес-навыки",
                desc: "Позиционирование, ценообразование, продажи, управление практикой"
              },
              {
                icon: "TrendingUp",
                title: "Личный бренд",
                desc: "Маркетинг, соцсети, контент, привлечение премиальных клиентов"
              },
              {
                icon: "Users",
                title: "Работа с клиентами",
                desc: "Психология общения, диагностика, составление программ"
              },
            ].map((category, index) => (
              <Card 
                key={index} 
                className="animate-scale-in hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon name={category.icon} className="text-primary" size={26} />
                  </div>
                  <h3 className="font-bold mb-2 text-base">{category.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{category.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Button 
              size="lg"
              onClick={() => navigate("/courses")}
              className="bg-gradient-to-r from-primary to-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-base"
            >
              Смотреть все курсы
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}