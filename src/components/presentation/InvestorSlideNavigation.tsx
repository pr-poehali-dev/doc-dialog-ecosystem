import { Button } from '@/components/ui/button';

interface Slide {
  id: string;
  title: string;
  icon: string;
}

interface InvestorSlideNavigationProps {
  slides: Slide[];
  activeSlide: number;
  onSlideChange: (index: number) => void;
}

export default function InvestorSlideNavigation({ 
  slides, 
  activeSlide, 
  onSlideChange 
}: InvestorSlideNavigationProps) {
  return (
    <div className="fixed top-20 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
          {slides.map((slide, index) => (
            <Button
              key={slide.id}
              variant={activeSlide === index ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onSlideChange(index)}
              className={`whitespace-nowrap ${
                activeSlide === index 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {slide.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
