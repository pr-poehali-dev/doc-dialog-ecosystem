import SchoolsHeader from "@/components/schools/SchoolsHeader";
import SchoolsFooter from "@/components/schools/SchoolsFooter";
import CorrectionHero from "@/components/correction/CorrectionHero";
import CorrectionAbout from "@/components/correction/CorrectionAbout";
import CorrectionAudience from "@/components/correction/CorrectionAudience";
import CorrectionSkills from "@/components/correction/CorrectionSkills";
import CorrectionProgram from "@/components/correction/CorrectionProgram";
import CorrectionResults from "@/components/correction/CorrectionResults";
import CorrectionCTA from "@/components/correction/CorrectionCTA";

const CorrectionCourse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SchoolsHeader />
      <CorrectionHero />
      <CorrectionAbout />
      <CorrectionAudience />
      <CorrectionSkills />
      <CorrectionProgram />
      <CorrectionResults />
      <CorrectionCTA />
      <SchoolsFooter />
    </div>
  );
};

export default CorrectionCourse;
