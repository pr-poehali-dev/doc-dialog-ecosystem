import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function WhyNeededSection() {
  const whyNeeded = [
    'Подходят ли этому человеку мои техники?',
    'Не наврежу ли я, продолжая работу?',
    'Нужно ли направить клиента к врачу и к какому?',
    'Достаточно ли информации, чтобы принимать решение?'
  ];

  const benefits = [
    'снизить риск ошибок',
    'защитить клиента',
    'защитить специалиста',
    'помочь принимать спокойные и обоснованные решения'
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Зачем это нужно в реальной практике
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-12">
          Каждый специалист сталкивается с ситуациями, когда важно остановиться и задать себе вопрос:
        </p>
        
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {whyNeeded.map((question, index) => (
            <Card key={index} className="border-2 border-blue-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Icon name="HelpCircle" size={20} className="text-blue-600" />
                </div>
                <p className="text-base sm:text-lg font-medium leading-relaxed">{question}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50/80 to-blue-50/80 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Инструменты Док диалог созданы, чтобы:</h3>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={16} className="text-purple-700" />
                  </div>
                  <span className="text-base sm:text-lg font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
