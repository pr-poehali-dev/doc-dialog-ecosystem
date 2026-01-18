import InvestorSlides0to2 from './InvestorSlides0to2';
import InvestorSlides3to5 from './InvestorSlides3to5';
import InvestorSlides6to7 from './InvestorSlides6to7';
import InvestorSlides8to9 from './InvestorSlides8to9';

interface InvestorSlideContentProps {
  activeSlide: number;
  metrics: Array<{ label: string; value: string; color: string }>;
  competitors: Array<{
    name: string;
    model: string;
    pros: string;
    cons: string;
    threat: string;
  }>;
  unitEconomics: {
    masseur: { arpu: number; cac: number; ltv: number; payback: number; margin: number };
    school: { arpu: number; cac: number; ltv: number; payback: number; margin: number };
    salon: { arpu: number; cac: number; ltv: number; payback: number; margin: number };
  };
  roadmap: Array<{
    quarter: string;
    goals: string[];
    status: string;
  }>;
}

export default function InvestorSlideContent({
  activeSlide,
  metrics,
  competitors,
  unitEconomics,
  roadmap,
}: InvestorSlideContentProps) {
  return (
    <>
      {/* Slides 0-2: Cover, Problem, Solution */}
      {activeSlide >= 0 && activeSlide <= 2 && (
        <InvestorSlides0to2 activeSlide={activeSlide} metrics={metrics} />
      )}

      {/* Slides 3-5: Market, Product, Economics */}
      {activeSlide >= 3 && activeSlide <= 5 && (
        <InvestorSlides3to5 activeSlide={activeSlide} unitEconomics={unitEconomics} />
      )}

      {/* Slides 6-7: Competition, Traction */}
      {activeSlide >= 6 && activeSlide <= 7 && (
        <InvestorSlides6to7 activeSlide={activeSlide} competitors={competitors} roadmap={roadmap} />
      )}

      {/* Slides 8-9: Team, Investment Ask */}
      {activeSlide >= 8 && activeSlide <= 9 && (
        <InvestorSlides8to9 activeSlide={activeSlide} roadmap={roadmap} />
      )}
    </>
  );
}
