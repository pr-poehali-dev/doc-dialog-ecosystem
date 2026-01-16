import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const results = [
  { icon: "Brain", text: "Понимаете висцеральную терапию на уровне логики, а не мифов" },
  { icon: "Search", text: "Уверенно диагностируете ограничения" },
  { icon: "Shield", text: "Безопасно работаете с органами" },
  { icon: "TrendingUp", text: "Усиливаете эффект массажа и остеопатии" },
  { icon: "Award", text: "Повышаете ценность своих услуг" }
];

export default function VisceraCourseResults() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://school.brossok.ru/load/forms/form8.js';
    script.async = true;
    
    const formWrapper = document.getElementById('formwrapper8');
    if (formWrapper) {
      formWrapper.appendChild(script);
    }
    
    return () => {
      if (formWrapper && script.parentNode) {
        formWrapper.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      {/* Results */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Итог курса</h2>
            
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 via-purple-500/5 to-primary/10 border-2 border-primary/20">
              <p className="text-xl font-semibold text-center text-gray-900 mb-8">После курса вы:</p>
              
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={result.icon as any} size={24} className="text-primary" />
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed self-center">{result.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Записаться на курс</h2>
            <div id="formwrapper8" style={{ width: '100%' }}></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Готовы начать обучение?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Присоединяйтесь к курсу и освойте висцеральную терапию на профессиональном уровне
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100"
                asChild
              >
                <a href="https://school.brossok.ru/buy/55" target="_blank" rel="noopener noreferrer">
                  <Icon name="Play" size={20} className="mr-2" />
                  Записаться на курс
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-primary transition-colors"
                asChild
              >
                <a href="https://t.me/docdialog_bot" target="_blank" rel="noopener noreferrer">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Задать вопрос
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}