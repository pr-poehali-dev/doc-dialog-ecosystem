import HeroSection from '@/components/medical-analysis/HeroSection';
import ProblemSections from '@/components/medical-analysis/ProblemSections';
import SolutionAndHowItWorks from '@/components/medical-analysis/SolutionAndHowItWorks';
import BenefitsAndForm from '@/components/medical-analysis/BenefitsAndForm';

const MedicalAnalysisLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <HeroSection />
      <ProblemSections />
      <SolutionAndHowItWorks />
      <BenefitsAndForm />
    </div>
  );
};

export default MedicalAnalysisLanding;
