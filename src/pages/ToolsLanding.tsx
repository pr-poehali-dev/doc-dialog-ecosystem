import SchoolsFooter from "@/components/schools/SchoolsFooter";
import PlatformHeader from "@/components/platform/PlatformHeader";
import ToolsHero from "@/components/tools/ToolsHero";
import ToolsList from "@/components/tools/ToolsList";
import ToolsDialogs from "@/components/tools/ToolsDialogs";
import ToolsTestimonials from "@/components/tools/ToolsTestimonials";

const ToolsLanding = () => {
  const scrollToTools = () => {
    document.getElementById('tools-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <PlatformHeader />
      <ToolsHero onScrollToTools={scrollToTools} />
      <ToolsList />
      <ToolsDialogs />
      <ToolsTestimonials onScrollToTools={scrollToTools} />
      <SchoolsFooter />
    </div>
  );
};

export default ToolsLanding;
