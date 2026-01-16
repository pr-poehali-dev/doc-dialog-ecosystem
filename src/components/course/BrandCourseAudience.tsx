import Icon from "@/components/ui/icon";

const BrandCourseAudience = () => {
  const audience = [
    "массажистам частной практики",
    "специалистам, которые хотят больше клиентов и выше чек",
    "тем, кто устал от нестабильного дохода",
    "владельцам кабинетов и небольших студий",
    "экспертам, развивающим личный бренд"
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Кому подойдёт курс
        </h2>
        
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">
            {audience.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex-shrink-0">
                  <Icon name="CheckCircle2" size={24} className="text-primary" />
                </div>
                <p className="text-lg text-gray-700 pt-1">{item}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-primary/20">
            <p className="text-center text-lg font-medium text-gray-800">
              Подходит без маркетингового опыта
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCourseAudience;
