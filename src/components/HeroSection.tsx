import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

type UserType = 'masseur' | 'school' | 'salon' | null;

interface HeroSectionProps {
  openDialog: (type: UserType) => void;
}

const HeroSection = ({ openDialog }: HeroSectionProps) => {
  return (
    <section className="py-20 md:py-32 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Профессиональная экосистема для массажистов, школ и массажных салонов
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Обучение, инструменты, практика и карьерный рост — в одном пространстве для специалистов массажа
          </p>
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={() => openDialog('masseur')}>
                Я массажист
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => openDialog('school')}>
                Я школа
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => openDialog('salon')}>
                Я салон
              </Button>
            </div>
            
            <Link to="/masseurs">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Icon name="Search" size={20} className="mr-2" />
                Найти массажиста
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;