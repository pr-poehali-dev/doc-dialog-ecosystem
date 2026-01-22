import PartnerHero from "@/components/partner/PartnerHero";
import PartnerBenefits from "@/components/partner/PartnerBenefits";
import PartnerDetails from "@/components/partner/PartnerDetails";
import PartnerCTA from "@/components/partner/PartnerCTA";
import SchoolsFooter from "@/components/schools/SchoolsFooter";
import PlatformHeader from "@/components/platform/PlatformHeader";

export default function PartnerProgram() {
  return (
    <div className="min-h-screen bg-background">
      <PlatformHeader />
      <PartnerHero />
      <PartnerBenefits />
      <PartnerDetails />
      <PartnerCTA />
      <SchoolsFooter />
    </div>
  );
}