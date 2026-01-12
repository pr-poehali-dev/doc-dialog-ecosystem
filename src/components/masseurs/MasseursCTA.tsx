import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

export default function MasseursCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6TTEyIDM2YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-6 sm:mb-8 shadow-lg border border-primary/20">
            <Icon name="Sparkles" className="text-primary" size={16} />
            <span className="text-xs sm:text-sm font-bold text-primary">100% бесплатная регистрация</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 sm:mb-7 leading-tight">
            Готовы начать профессиональный рост?
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto">
            Зарегистрируйтесь бесплатно и получите доступ к обучению, клиентам и инструментам для развития вашей практики
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12">
            <Button 
              size="lg" 
              className="text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 w-full sm:w-auto"
              onClick={() => navigate('/register/masseur')}
            >
              Начать бесплатно
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              className="text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 border-2 bg-white/80 backdrop-blur-sm w-full sm:w-auto"
              onClick={() => navigate('/courses')}
            >
              Посмотреть курсы
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-muted-foreground">
            {[
              { icon: "Check", text: "Без комиссий" },
              { icon: "Check", text: "Бесплатные инструменты" },
              { icon: "Check", text: "Поддержка 24/7" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                <Icon name={item.icon} className="text-green-600" size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}