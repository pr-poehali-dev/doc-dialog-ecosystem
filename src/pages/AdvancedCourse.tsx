import SchoolsHeader from "@/components/schools/SchoolsHeader";
import SchoolsFooter from "@/components/schools/SchoolsFooter";
import AdvancedMassageHero from "@/components/advanced/AdvancedMassageHero";
import AdvancedMassageAbout from "@/components/advanced/AdvancedMassageAbout";
import AdvancedMassageAudience from "@/components/advanced/AdvancedMassageAudience";
import AdvancedMassageSkills from "@/components/advanced/AdvancedMassageSkills";
import AdvancedMassageResults from "@/components/advanced/AdvancedMassageResults";
import AdvancedMassageProgram from "@/components/advanced/AdvancedMassageProgram";
import AdvancedMassageFormat from "@/components/advanced/AdvancedMassageFormat";
import AdvancedMassageAdvantages from "@/components/advanced/AdvancedMassageAdvantages";
import AdvancedMassageCTA from "@/components/advanced/AdvancedMassageCTA";

const AdvancedCourse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SchoolsHeader />
      <AdvancedMassageHero />
      <AdvancedMassageAbout />
      <AdvancedMassageAudience />
      <AdvancedMassageSkills />
      <AdvancedMassageResults />
      <AdvancedMassageProgram />
      <AdvancedMassageFormat />
      <AdvancedMassageAdvantages />
      <AdvancedMassageCTA />
      <SchoolsFooter />
    </div>
  );
};

export default AdvancedCourse;
