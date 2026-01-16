import SchoolsHeader from "@/components/schools/SchoolsHeader";
import SchoolsFooter from "@/components/schools/SchoolsFooter";
import BasicsMassageHero from "@/components/course/BasicsMassageHero";
import BasicsMassageAbout from "@/components/course/BasicsMassageAbout";
import BasicsMassageAudience from "@/components/course/BasicsMassageAudience";
import BasicsMassageSkills from "@/components/course/BasicsMassageSkills";
import BasicsMassageResults from "@/components/course/BasicsMassageResults";
import BasicsMassageProgram from "@/components/course/BasicsMassageProgram";
import BasicsMassageFormat from "@/components/course/BasicsMassageFormat";
import BasicsMassageAdvantages from "@/components/course/BasicsMassageAdvantages";
import BasicsMassageReviews from "@/components/course/BasicsMassageReviews";
import BasicsMassageCTA from "@/components/course/BasicsMassageCTA";

const BasicsCourse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SchoolsHeader />
      <BasicsMassageHero />
      <BasicsMassageAbout />
      <BasicsMassageAudience />
      <BasicsMassageSkills />
      <BasicsMassageResults />
      <BasicsMassageProgram />
      <BasicsMassageFormat />
      <BasicsMassageAdvantages />
      <BasicsMassageReviews />
      <BasicsMassageCTA />
      <SchoolsFooter />
    </div>
  );
};

export default BasicsCourse;