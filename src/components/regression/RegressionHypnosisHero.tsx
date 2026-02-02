import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface RegressionHypnosisHeroProps {
  onCTAClick: () => void;
}

export default function RegressionHypnosisHero({ onCTAClick }: RegressionHypnosisHeroProps) {
  return (
    <section className="relative overflow-hidden min-h-[500px] sm:min-h-[600px] lg:h-[85vh] flex items-center pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/9660d065-67cd-46af-979d-48206fcf4b83.jpg" 
          alt="Hypnotherapy environment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background/95" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8 text-white py-8 sm:py-12">
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/20">
            Очное обучение в Москве · Группа до 12 человек
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] px-2">
            Регрессивный гипноз
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light px-2">
            как прикладной инструмент психотерапии и коучинга
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4 text-white/90">
            Очное профессиональное обучение работе с регрессивными состояниями памяти, опыта и перспектив развития личности
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm lg:text-base pt-2 sm:pt-4 px-2">
            {[
              'научный и прикладной подход',
              'офлайн-формат в Москве',
              'малая группа до 12 человек',
              'практика под супервизией'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-white/20">
                <Icon name="Check" className="text-white flex-shrink-0" size={16} />
                <span className="whitespace-nowrap">{item}</span>
              </div>
            ))}
          </div>
          <div className="px-4">
            <Button 
              size="lg" 
              className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto mt-4 sm:mt-6 lg:mt-8 w-full sm:w-auto bg-white text-black hover:bg-white/90" 
              onClick={onCTAClick}
            >
              👉 Посмотреть программу
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}