import MasseursHeader from "@/components/masseurs/MasseursHeader";
import MasseursHero from "@/components/masseurs/MasseursHero";
import MasseursContent from "@/components/masseurs/MasseursContent";
import MasseursFooter from "@/components/masseurs/MasseursFooter";

export default function MasseursLanding() {
  return (
    <div className="min-h-screen bg-background">
      <MasseursHeader />
      <MasseursHero />
      <MasseursContent />
      <MasseursFooter />
    </div>
  );
}
