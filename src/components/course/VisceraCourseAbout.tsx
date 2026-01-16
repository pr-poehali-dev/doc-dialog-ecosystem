import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const benefits = [
  "Понимание как органы двигаются и должны двигаться",
  "Осознание связи органов, фасций, позвоночника и ВНС",
  "Чёткие алгоритмы диагностики",
  "Безопасные и логичные техники",
  "Уверенность в работе руками",
  "Протоколы работы с конкретными запросами клиентов"
];

const targetAudience = [
  { icon: "Hand", text: "Массажисты (классика, восстановительный, лимфодренаж)" },
  { icon: "Users", text: "Специалисты по телесной терапии" },
  { icon: "Activity", text: "Остеопатические и мануальные практики" },
  { icon: "TrendingUp", text: "Те, кто хочет работать глубже, но без риска" },
  { icon: "Heart", text: "Специалисты, работающие с животом, осанкой, ВНС" },
  { icon: "Target", text: "Новички без опыта работы с внутренними органами" }
];

export default function VisceraCourseAbout() {
  return (
    <>
      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">О курсе</h2>
            
            <Card className="p-8 md:p-12 bg-gradient-to-br from-white to-primary/5 border-2 border-primary/10">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                «Висцералка: с нуля» — это базовый, системный и практический курс по мануальной терапии внутренних органов.
              </p>
              
              <div className="bg-white rounded-lg p-6 mb-6 border border-primary/20">
                <p className="font-semibold text-gray-900 mb-3">Курс создан для специалистов, которые:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Хотят безопасно и осознанно работать с животом и органами</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Не понимают, что именно трогать, зачем и как</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Боятся навредить клиенту</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Хотят выйти за рамки поверхностного массажа</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg p-6">
                <p className="text-center font-semibold text-gray-900 mb-3">Это не набор «приёмчиков», а логичная система:</p>
                <div className="flex flex-wrap justify-center gap-2 text-sm font-medium">
                  <span className="px-3 py-1 bg-white rounded-full">Анатомия</span>
                  <Icon name="ArrowRight" size={16} className="text-primary self-center" />
                  <span className="px-3 py-1 bg-white rounded-full">Физиология</span>
                  <Icon name="ArrowRight" size={16} className="text-primary self-center" />
                  <span className="px-3 py-1 bg-white rounded-full">Диагностика</span>
                  <Icon name="ArrowRight" size={16} className="text-primary self-center" />
                  <span className="px-3 py-1 bg-white rounded-full">Техника</span>
                  <Icon name="ArrowRight" size={16} className="text-primary self-center" />
                  <span className="px-3 py-1 bg-white rounded-full">Клиническое мышление</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Images Showcase */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://cdn.poehali.dev/files/close-up-abdomen-massage-concept.jpg" 
                alt="Висцеральная терапия живота" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://cdn.poehali.dev/files/hands-massaging-female-abdomen-therapist-applying-pressure-belly (2).jpg" 
                alt="Массаж внутренних органов" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://cdn.poehali.dev/files/pretty-young-brunette-getting-lymphatic-massage-her-belly-healthy-beauty-spa-clinic.jpg" 
                alt="Лимфодренажный массаж живота" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Для кого этот курс</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {targetAudience.map((item, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as any} size={24} className="text-primary" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item.text}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-amber-50 border-2 border-amber-200">
              <div className="flex items-start gap-3">
                <Icon name="AlertCircle" size={24} className="text-amber-600 flex-shrink-0" />
                <p className="text-gray-900 font-medium">
                  Курс подходит даже без опыта висцеральной практики
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Ключевая ценность курса</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6 bg-gradient-to-br from-white to-primary/5 border-2 border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{benefit}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}