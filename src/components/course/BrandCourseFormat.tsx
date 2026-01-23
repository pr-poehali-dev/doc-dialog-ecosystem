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
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Формат обучения
        </h2>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-indigo-50 p-4 md:p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-indigo-100"
            >
              <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full shadow-md">
                  <Icon name={feature.icon as any} size={28} className="text-primary md:scale-110" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 md:mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 md:p-6 lg:p-8 rounded-2xl shadow-xl text-white sm:col-span-2 lg:col-span-3 border border-indigo-400">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center md:text-left">
              <div className="p-3 md:p-4 bg-white/20 backdrop-blur-sm rounded-full shadow-lg">
                <Icon name="Star" size={32} className="md:scale-110" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 drop-shadow-md">Доступ к обучению сразу после оплаты</h3>
                <p className="text-sm md:text-base lg:text-lg text-white/95 drop-shadow">Начните развивать свой бренд уже сегодня</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCourseFormat;