import TargetAudienceSection from "@/components/TargetAudienceSection";
import AboutSection from "@/components/AboutSection";
import EcosystemSection from "@/components/EcosystemSection";
import FeaturesSection from "@/components/FeaturesSection";

type UserType = 'masseur' | 'school' | 'salon' | null;

interface MainContentProps {
  openDialog: (type: UserType) => void;
  openTestimonials: () => void;
}

const MainContent = ({ openDialog }: MainContentProps) => {
  return (
    <>
      <TargetAudienceSection />
      <AboutSection />
      <EcosystemSection />
      <FeaturesSection openDialog={openDialog} />
    </>
  );
};

export default MainContent;
