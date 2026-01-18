import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import ProfessionalFooter from '@/components/professional/ProfessionalFooter';
import InvestorSlideNavigation from '@/components/presentation/InvestorSlideNavigation';
import InvestorSlideContent from '@/components/presentation/InvestorSlideContent';
import { slides, metrics, competitors, unitEconomics, roadmap } from '@/components/presentation/InvestorPresentationData';

export default function InvestorPresentation() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navigation />

      <InvestorSlideNavigation 
        slides={slides}
        activeSlide={activeSlide}
        onSlideChange={setActiveSlide}
      />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <InvestorSlideContent
            activeSlide={activeSlide}
            metrics={metrics}
            competitors={competitors}
            unitEconomics={unitEconomics}
            roadmap={roadmap}
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-16">
            <button
              onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
              disabled={activeSlide === 0}
              className="px-6 py-3 bg-slate-800 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Назад
            </button>
            <span className="text-slate-400">
              {activeSlide + 1} / {slides.length}
            </span>
            <button
              onClick={() => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1))}
              disabled={activeSlide === slides.length - 1}
              className="px-6 py-3 bg-slate-800 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Далее →
            </button>
          </div>
        </div>
      </div>

      <ProfessionalFooter />
    </div>
  );
}
