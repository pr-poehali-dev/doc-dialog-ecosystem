import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function PartnerHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/5 overflow-hidden pt-[100px]">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center pb-16 sm:pb-24">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Партнерская программа
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-6">
              Превратите вашу аудиторию и профессиональное влияние в стабильный доход
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">
              Присоединяйтесь к партнерской программе школы <span className="font-semibold text-primary">«Док Диалог»</span> и получайте высокое вознаграждение, рекомендуя лучшие образовательные продукты для массажистов и специалистов по здоровью. Мы ценим наших партнеров и создали максимально прозрачную и выгодную систему сотрудничества.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <a href="https://school.brossok.ru/aff/reg" target="_blank" rel="noopener noreferrer">
                  <Icon name="Handshake" className="mr-2" size={20} />
                  Стать партнером
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <a href="https://school.brossok.ru/login" target="_blank" rel="noopener noreferrer">
                  <Icon name="LogIn" className="mr-2" size={20} />
                  Войти в личный кабинет
                </a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-2xl" />
            <img 
              src="https://cdn.poehali.dev/files/f22d16f2-3ade-422b-ab72-960f10198776.jpg" 
              alt="Партнерство" 
              className="relative rounded-2xl shadow-2xl w-full h-[400px] sm:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
