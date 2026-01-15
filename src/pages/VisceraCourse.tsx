import SchoolsHeader from "@/components/schools/SchoolsHeader";
import SchoolsFooter from "@/components/schools/SchoolsFooter";
import VisceraCourseHero from "@/components/course/VisceraCourseHero";
import VisceraCourseAbout from "@/components/course/VisceraCourseAbout";
import VisceraCourseProgram from "@/components/course/VisceraCourseProgram";
import VisceraCourseResults from "@/components/course/VisceraCourseResults";

export default function VisceraCourse() {
  return (
    <div className="min-h-screen bg-background">
      <SchoolsHeader />
      <VisceraCourseHero />
      <VisceraCourseAbout />
      <VisceraCourseProgram />
      <VisceraCourseResults />
      <SchoolsFooter />
    </div>
  );
}
