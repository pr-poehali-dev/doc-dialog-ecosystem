interface PremiumSlideIndicatorsProps {
  slides: Array<{ id: string; label: string }>;
  activeSlide: number;
  onSlideChange: (index: number) => void;
}

export default function PremiumSlideIndicators({ 
  slides, 
  activeSlide, 
  onSlideChange 
}: PremiumSlideIndicatorsProps) {
  return (
    <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 flex gap-1.5 md:gap-2">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`h-1 transition-all duration-300 ${
            index === activeSlide 
              ? 'w-8 md:w-12 bg-slate-900' 
              : 'w-6 md:w-8 bg-slate-300 hover:bg-slate-400'
          }`}
        />
      ))}
    </div>
  );
}