import { useState } from 'react';
import { slides } from '@/data/premium-presentation-data';
import PremiumSlideIndicators from '@/components/presentation/PremiumSlideIndicators';
import PremiumSlideContent from '@/components/presentation/PremiumSlideContent';
import PremiumNavigationControls from '@/components/presentation/PremiumNavigationControls';

export default function PremiumPresentation() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    }
  };

  const prevSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 relative overflow-hidden">
      <div className="fixed inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <PremiumSlideIndicators 
        slides={slides}
        activeSlide={activeSlide}
        onSlideChange={setActiveSlide}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-12">
        <div className="max-w-5xl w-full">
          <PremiumSlideContent activeSlide={activeSlide} />
        </div>
      </div>

      <PremiumNavigationControls
        activeSlide={activeSlide}
        totalSlides={slides.length}
        onNext={nextSlide}
        onPrev={prevSlide}
      />
    </div>
  );
}
