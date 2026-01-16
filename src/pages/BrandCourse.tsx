import SchoolsHeader from "@/components/schools/SchoolsHeader";
import SchoolsFooter from "@/components/schools/SchoolsFooter";
import BrandCourseHero from "@/components/course/BrandCourseHero";
import BrandCourseAbout from "@/components/course/BrandCourseAbout";
import BrandCourseAudience from "@/components/course/BrandCourseAudience";
import BrandCourseSkills from "@/components/course/BrandCourseSkills";
import BrandCourseBenefits from "@/components/course/BrandCourseBenefits";
import BrandCourseProgram from "@/components/course/BrandCourseProgram";
import BrandCourseFormat from "@/components/course/BrandCourseFormat";
import BrandCourseAdvantages from "@/components/course/BrandCourseAdvantages";
import BrandCourseResults from "@/components/course/BrandCourseResults";

const BrandCourse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SchoolsHeader />
      <BrandCourseHero />
      <BrandCourseAbout />
      <BrandCourseAudience />
      <BrandCourseSkills />
      <BrandCourseBenefits />
      <BrandCourseProgram />
      <BrandCourseFormat />
      <BrandCourseAdvantages />
      <BrandCourseResults />
      <SchoolsFooter />
    </div>
  );
};

export default BrandCourse;
