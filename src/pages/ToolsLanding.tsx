import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import SchoolsFooter from "@/components/schools/SchoolsFooter";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/tools/HeroSection";
import WhyNeededSection from "@/components/tools/WhyNeededSection";
import ToolsListSection from "@/components/tools/ToolsListSection";
import TestimonialsSection from "@/components/tools/TestimonialsSection";

const ToolsLanding = () => {
  const navigate = useNavigate();

  const scrollToTools = () => {
    document.getElementById('tools-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <HeroSection 
        onViewTools={scrollToTools}
        onTryFree={() => navigate('/register')}
      />

      <WhyNeededSection />

      <ToolsListSection />

      <TestimonialsSection />

      {/* Free Access Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Попробуйте бесплатно</h2>
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <Icon name="Gift" size={48} className="mx-auto mb-4 sm:mb-6 text-blue-600 sm:w-16 sm:h-16" />
              <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8">
                У всех инструментов Док диалог есть бесплатный доступ.
                <br />
                Вы можете попробовать их в работе и понять, насколько они подходят именно вам.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => navigate('/register')} className="text-lg px-8">
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Попробовать бесплатно
                </Button>
                <Button size="lg" variant="outline" onClick={scrollToTools} className="text-lg px-8">
                  <Icon name="Search" className="mr-2" size={20} />
                  Выбрать инструмент
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SchoolsFooter />
    </div>
  );
};

export default ToolsLanding;
