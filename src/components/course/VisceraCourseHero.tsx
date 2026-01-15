import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function VisceraCourseHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/[0.03] via-purple-500/[0.03] to-primary/[0.06] pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Icon name="Sparkles" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Онлайн-курс</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
            Висцералка: с нуля
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Мануальная терапия внутренних органов для массажистов и телесных специалистов
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
              <Icon name="Play" size={20} className="mr-2" />
              Записаться на курс
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
              <Icon name="Info" size={20} className="mr-2" />
              Узнать подробнее
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span>15 модулей</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span>40+ часов практики</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Award" size={16} className="text-primary" />
              <span>Сертификат</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
