import { Navigation } from "@/components/Navigation";
import EnergyCourseHero from "@/components/energy-course/EnergyCourseHero";
import EnergyCourseContent from "@/components/energy-course/EnergyCourseContent";
import EnergyCourseProgram from "@/components/energy-course/EnergyCourseProgram";
import EnergyCourseFooter from "@/components/energy-course/EnergyCourseFooter";

export default function EnergyCourse() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <Navigation />
      <EnergyCourseHero />
      <EnergyCourseContent />
      <EnergyCourseProgram />
      <EnergyCourseFooter />
    </div>
  );
}
