import SchoolsHeader from "@/components/schools/SchoolsHeader";
import SchoolsHero from "@/components/schools/SchoolsHero";
import SchoolsContent from "@/components/schools/SchoolsContent";
import SchoolsFooter from "@/components/schools/SchoolsFooter";

export default function SchoolsLanding() {
  return (
    <div className="min-h-screen bg-background">
      <SchoolsHeader />
      <SchoolsHero />
      <SchoolsContent />
      <SchoolsFooter />
    </div>
  );
}
