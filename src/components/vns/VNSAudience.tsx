import Icon from "@/components/ui/icon";

const VNSAudience = () => {
  const audiences = [
    { text: "массажистам с базовым и средним опытом", icon: "Hand" },
    { text: "остеопатам, мануальным терапевтам", icon: "Activity" },
    { text: "телесным терапевтам, реабилитологам", icon: "Heart" },
    { text: "специалистам, работающим с болью, стрессом, хроническим напряжением", icon: "Brain" }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Кому подойдёт курс
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {audiences.map((audience, index) => (
            <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex-shrink-0">
                <Icon name={audience.icon as any} size={24} className="text-indigo-600" />
              </div>
              <p className="text-lg text-gray-800 pt-2">{audience.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VNSAudience;
