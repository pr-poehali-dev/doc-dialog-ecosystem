import SalonsHeader from "@/components/salons/SalonsHeader";
import SalonsHero from "@/components/salons/SalonsHero";
import SalonsContent from "@/components/salons/SalonsContent";
import SalonsFooter from "@/components/salons/SalonsFooter";

export default function SalonsLanding() {
  return (
    <div className="min-h-screen bg-background">
      <SalonsHeader />
      <SalonsHero />
      <SalonsContent />
      <SalonsFooter />
    </div>
  );
}
