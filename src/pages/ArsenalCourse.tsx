import Navigation from "@/components/Navigation";
import ArsenalCourseHero from "@/components/course/ArsenalCourseHero";
import ArsenalCourseAbout from "@/components/course/ArsenalCourseAbout";
import ArsenalCourseAudience from "@/components/course/ArsenalCourseAudience";
import ArsenalCourseSkills from "@/components/course/ArsenalCourseSkills";
import ArsenalCourseBenefits from "@/components/course/ArsenalCourseBenefits";
import ArsenalCourseProgram from "@/components/course/ArsenalCourseProgram";
import ArsenalCourseFormat from "@/components/course/ArsenalCourseFormat";
import ArsenalCourseAdvantages from "@/components/course/ArsenalCourseAdvantages";
import ArsenalCourseResults from "@/components/course/ArsenalCourseResults";
import Footer from "@/components/Footer";

const ArsenalCourse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      <ArsenalCourseHero />
      <ArsenalCourseAbout />
      <ArsenalCourseAudience />
      <ArsenalCourseSkills />
      <ArsenalCourseBenefits />
      <ArsenalCourseProgram />
      <ArsenalCourseFormat />
      <ArsenalCourseAdvantages />
      <ArsenalCourseResults />
      <Footer />
    </div>
  );
};

export default ArsenalCourse;
