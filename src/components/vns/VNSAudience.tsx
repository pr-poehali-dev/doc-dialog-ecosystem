import Icon from "@/components/ui/icon";

const VNSAudience = () => {
  const audiences = [
    { text: "массажистам с базовым и средним опытом", icon: "Hand" },
    { text: "остеопатам, мануальным терапевтам", icon: "Activity" },
    { text: "телесным терапевтам, реабилитологам", icon: "Heart" },
    { text: "специалистам, работающим с болью, стрессом, хроническим напряжением", icon: "Brain" }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-indigo-50/30 via-purple-50/20 to-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          Кому подойдёт курс
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {audiences.map((audience, index) => (
            <div key={index} className="flex items-start gap-3 md:gap-4 bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 border border-indigo-100/50">
              <div className="p-2 md:p-3 bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 rounded-full flex-shrink-0 shadow-md">
                <Icon name={audience.icon as any} size={20} className="text-indigo-600" />
              </div>
              <p className="text-sm md:text-base lg:text-lg text-gray-800 pt-1 md:pt-2 font-medium">{audience.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VNSAudience;