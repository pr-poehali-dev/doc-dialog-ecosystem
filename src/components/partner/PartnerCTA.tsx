import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function PartnerCTA() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Готовы начать зарабатывать с «Док Диалог»?
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
          Присоединяйтесь к сообществу успешных партнеров сегодня. Регистрация займет менее 1 минуты.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
            <a href="https://school.brossok.ru/aff/reg" target="_blank" rel="noopener noreferrer">
              <Icon name="Handshake" className="mr-2" size={20} />
              Стать партнером
            </a>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-primary" asChild>
            <a href="https://school.brossok.ru/aff" target="_blank" rel="noopener noreferrer">
              <Icon name="LogIn" className="mr-2" size={20} />
              Войти в личный кабинет
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
