import SchoolsHeader from "@/components/schools/SchoolsHeader";
import SchoolsFooter from "@/components/schools/SchoolsFooter";
import MastermindHero from "@/components/mastermind/MastermindHero";
import MastermindAbout from "@/components/mastermind/MastermindAbout";
import MastermindInstructor from "@/components/mastermind/MastermindInstructor";
import MastermindAudience from "@/components/mastermind/MastermindAudience";
import MastermindBenefits from "@/components/mastermind/MastermindBenefits";
import MastermindProgram from "@/components/mastermind/MastermindProgram";
import MastermindTariffs from "@/components/mastermind/MastermindTariffs";
import MastermindIncludes from "@/components/mastermind/MastermindIncludes";
import MastermindCTA from "@/components/mastermind/MastermindCTA";

const MastermindMoscow = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SchoolsHeader />
      <MastermindHero />
      <MastermindAbout />
      <MastermindInstructor />
      <MastermindAudience />
      <MastermindBenefits />
      <MastermindProgram />
      <MastermindTariffs />
      <MastermindIncludes />
      <MastermindCTA />
      <SchoolsFooter />
    </div>
  );
};

export default MastermindMoscow;
