import SchoolsHeader from "@/components/schools/SchoolsHeader";
import SchoolsFooter from "@/components/schools/SchoolsFooter";
import PregnancyHero from "@/components/pregnancy/PregnancyHero";
import PregnancyAudience from "@/components/pregnancy/PregnancyAudience";
import PregnancyWhy from "@/components/pregnancy/PregnancyWhy";
import PregnancyPhilosophy from "@/components/pregnancy/PregnancyPhilosophy";
import PregnancyPrograms from "@/components/pregnancy/PregnancyPrograms";
import PregnancyBonuses from "@/components/pregnancy/PregnancyBonuses";
import PregnancyResults from "@/components/pregnancy/PregnancyResults";
import PregnancyReviews from "@/components/pregnancy/PregnancyReviews";
import PregnancyCTA from "@/components/pregnancy/PregnancyCTA";

const PregnancyFitness = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SchoolsHeader />
      <PregnancyHero />
      <PregnancyAudience />
      <PregnancyWhy />
      <PregnancyPhilosophy />
      <PregnancyPrograms />
      <PregnancyBonuses />
      <PregnancyResults />
      <PregnancyReviews />
      <PregnancyCTA />
      <SchoolsFooter />
    </div>
  );
};

export default PregnancyFitness;