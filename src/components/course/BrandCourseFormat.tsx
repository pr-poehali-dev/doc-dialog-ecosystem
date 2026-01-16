import Icon from "@/components/ui/icon";

const BrandCourseFormat = () => {
  const features = [
    {
      icon: "Globe",
      title: "Онлайн-доступ 24/7",
      description: "Учитесь в удобное время из любой точки мира"
    },
    {
      icon: "Video",
      title: "Пошаговые видеоуроки",
      description: "Структурированный контент с практическими примерами"
    },
    {
      icon: "ClipboardCheck",
      title: "Практические задания",
      description: "Отрабатывайте навыки на реальных кейсах"
    },
    {
      icon: "Briefcase",
      title: "Реальные кейсы из массажного бизнеса",
      description: "Учитесь на примерах успешных специалистов"
    },
    {
      icon: "FileCheck",
      title: "Итоговые работы по тарифам",
      description: "Проверка знаний и закрепление навыков"
    },
    {
      icon: "Headphones",
      title: "Поддержка и обратная связь",
      description: "Помощь кураторов на протяжении всего обучения"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Формат обучения
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full">
                  <Icon name={feature.icon as any} size={32} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-2xl shadow-lg text-white md:col-span-2 lg:col-span-3">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <Icon name="Star" size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Доступ к обучению сразу после оплаты</h3>
                <p className="text-lg text-white/90">Начните развивать свой бренд уже сегодня</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCourseFormat;