import Icon from "@/components/ui/icon";

const AdvancedMassageAudience = () => {
  const audiences = [
    { text: "массажисты с опытом", icon: "Award" },
    { text: "специалисты после курса «Основы массажа»", icon: "GraduationCap" },
    { text: "практики, работающие с болью и ограничением движения", icon: "HeartPulse" },
    { text: "телесные терапевты, желающие освоить мануальные и висцеральные подходы", icon: "Stethoscope" },
    { text: "специалисты, выгорающие от «силового» массажа", icon: "RefreshCw" }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 text-gray-900">
          Для кого этот курс
        </h2>
        
        <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
          {audiences.map((audience, index) => (
            <div key={index} className="flex items-start gap-3 md:gap-4 bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="p-2 md:p-3 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-full flex-shrink-0">
                <Icon name={audience.icon as any} size={20} className="text-purple-600" />
              </div>
              <p className="text-sm md:text-base lg:text-lg text-gray-800 pt-1 md:pt-2">{audience.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-4 md:p-6 rounded-lg">
          <div className="flex items-start gap-2 md:gap-3">
            <Icon name="AlertCircle" size={20} className="text-red-600 flex-shrink-0" />
            <p className="text-sm md:text-base lg:text-lg text-gray-800">
              <strong>Важно:</strong> Курс не для новичков и требует понимания анатомии.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedMassageAudience;