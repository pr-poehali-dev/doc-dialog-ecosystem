import Icon from "@/components/ui/icon";

const BasicsMassageAbout = () => {
  const features = [
    "анатомию и физиологию",
    "биомеханику и фасциальные связи",
    "нервную систему и психосоматику",
    "клиническое мышление массажиста",
    "большой блок практических видеотехник",
    "этические и правовые основы практики"
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          О курсе
        </h2>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            «Основы массажа: Первые шаги» — это системный онлайн-курс для тех, кто хочет освоить 
            массаж с нуля или выстроить прочный фундамент для дальнейшего профессионального роста.
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-2xl mb-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Курс объединяет:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <Icon name="CheckCircle2" size={20} className="text-blue-600" />
                  </div>
                  <p className="text-lg text-gray-700 pt-1">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            Вы не просто изучаете приёмы — вы учитесь <span className="font-semibold text-blue-600">понимать тело как единую систему</span> и 
            осознанно работать с причинами дисфункций, а не только с симптомами.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BasicsMassageAbout;