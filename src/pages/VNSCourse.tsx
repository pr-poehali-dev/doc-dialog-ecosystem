import SchoolsHeader from "@/components/schools/SchoolsHeader";
import SchoolsFooter from "@/components/schools/SchoolsFooter";
import VNSHero from "@/components/vns/VNSHero";
import VNSAbout from "@/components/vns/VNSAbout";
import VNSAudience from "@/components/vns/VNSAudience";
import VNSSkills from "@/components/vns/VNSSkills";
import VNSResults from "@/components/vns/VNSResults";
import VNSProgram from "@/components/vns/VNSProgram";
import VNSAdvantages from "@/components/vns/VNSAdvantages";
import VNSCTA from "@/components/vns/VNSCTA";

const VNSCourse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SchoolsHeader />
      <VNSHero />
      <VNSAbout />
      <VNSAudience />
      <VNSSkills />
      <VNSResults />
      <VNSProgram />
      <VNSAdvantages />
      <VNSCTA />
      <SchoolsFooter />
    </div>
  );
};

export default VNSCourse;
