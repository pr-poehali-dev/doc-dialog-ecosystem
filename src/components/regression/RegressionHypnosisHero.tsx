import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface RegressionHypnosisHeroProps {
  onCTAClick: () => void;
}

export default function RegressionHypnosisHero({ onCTAClick }: RegressionHypnosisHeroProps) {
  return (
    <section className="relative overflow-hidden h-[85vh] min-h-[600px] flex items-center">
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
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 text-white">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
            Очное обучение в Москве · Группа до 12 человек
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            Регрессивный гипноз
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light">
            как прикладной инструмент психотерапии и коучинга
          </p>
          <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4 text-white/90">
            Очное профессиональное обучение работе с регрессивными состояниями памяти, опыта и перспектив развития личности
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 text-sm lg:text-base pt-4">
            {[
              'научный и прикладной подход',
              'офлайн-формат в Москве',
              'малая группа до 12 человек',
              'практика под супервизией'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <Icon name="Check" className="text-white flex-shrink-0" size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 h-auto mt-8 w-full sm:w-auto bg-white text-black hover:bg-white/90" 
            onClick={onCTAClick}
          >
            👉 Посмотреть программу и форматы участия
          </Button>
        </div>
      </div>
    </section>
  );
}
