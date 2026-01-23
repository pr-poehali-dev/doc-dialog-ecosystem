import Icon from "@/components/ui/icon";

const BrandCourseAudience = () => {
  const audience = [
    "массажистам частной практики",
    "специалистам, которые хотят больше клиентов и выше чек",
    "тем, кто устал от нестабильного дохода",
    "владельцам кабинетов и небольших студий",
    "экспертам, развивающим личный бренд",
    "тем, кто хочет системный подход к маркетингу"
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Кому подойдёт курс
        </h2>
        
        <div className="bg-gradient-to-br from-white to-indigo-50 p-4 md:p-8 lg:p-12 rounded-2xl shadow-xl border border-indigo-200">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {audience.map((item, index) => (
              <div key={index} className="flex items-start gap-3 md:gap-4">
                <div className="p-1.5 md:p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex-shrink-0 shadow-md">
                  <Icon name="CheckCircle2" size={20} className="text-primary md:scale-110" />
                </div>
                <p className="text-sm md:text-base lg:text-lg text-gray-700 pt-0.5 md:pt-1">{item}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-primary/20 shadow-lg">
            <p className="text-center text-base md:text-lg font-medium text-gray-800">
              Подходит без маркетингового опыта
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCourseAudience;