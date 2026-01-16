import SchoolsHeader from "@/components/schools/SchoolsHeader";
import SchoolsFooter from "@/components/schools/SchoolsFooter";
import ArsenalCourseHero from "@/components/course/ArsenalCourseHero";
import ArsenalCourseAbout from "@/components/course/ArsenalCourseAbout";
import ArsenalCourseAudience from "@/components/course/ArsenalCourseAudience";
import ArsenalCourseSkills from "@/components/course/ArsenalCourseSkills";
import ArsenalCourseBenefits from "@/components/course/ArsenalCourseBenefits";
import ArsenalCourseProgram from "@/components/course/ArsenalCourseProgram";
import ArsenalCourseFormat from "@/components/course/ArsenalCourseFormat";
import ArsenalCourseAdvantages from "@/components/course/ArsenalCourseAdvantages";
import ArsenalCourseReviews from "@/components/course/ArsenalCourseReviews";
import ArsenalCourseResults from "@/components/course/ArsenalCourseResults";

const ArsenalCourse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SchoolsHeader />
      <ArsenalCourseHero />
      <ArsenalCourseAbout />
      <ArsenalCourseAudience />
      <ArsenalCourseSkills />
      <ArsenalCourseBenefits />
      <ArsenalCourseProgram />
      <ArsenalCourseFormat />
      <ArsenalCourseAdvantages />
      <ArsenalCourseReviews />
      <ArsenalCourseResults />
      <SchoolsFooter />
    </div>
  );
};

export default ArsenalCourse;