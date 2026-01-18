import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface PremiumNavigationControlsProps {
  activeSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function PremiumNavigationControls({ 
  activeSlide, 
  totalSlides, 
  onNext, 
  onPrev 
}: PremiumNavigationControlsProps) {
  return (
    <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50 flex gap-2 md:gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={onPrev}
        disabled={activeSlide === 0}
        className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white disabled:opacity-30"
      >
        <Icon name="ChevronLeft" size={18} className="text-slate-900 md:w-5 md:h-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={activeSlide === totalSlides - 1}
        className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white disabled:opacity-30"
      >
        <Icon name="ChevronRight" size={18} className="text-slate-900 md:w-5 md:h-5" />
      </Button>
    </div>
  );
}