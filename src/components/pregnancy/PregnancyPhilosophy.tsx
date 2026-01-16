import Icon from "@/components/ui/icon";

const PregnancyPhilosophy = () => {
  const principles = [
    { icon: "Bone", text: "забота о позвоночнике" },
    { icon: "Circle", text: "поддержка таза и ягодиц" },
    { icon: "ShieldCheck", text: "профилактика болей в спине" },
    { icon: "Heart", text: "улучшение кровообращения" },
    { icon: "Wind", text: "работа с дыханием и нервной системой" }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
          Ключевая философия тренинга
        </h2>

        <p className="text-2xl text-gray-700 text-center mb-12 font-medium">
          Это не «фитнес ради формы», а:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          {principles.map((principle, index) => (
            <div key={index} className="flex items-center gap-4 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl">
              <div className="p-3 bg-emerald-100 rounded-full flex-shrink-0">
                <Icon name={principle.icon as any} size={24} className="text-emerald-600" />
              </div>
              <span className="text-lg text-gray-800 font-medium">{principle.text}</span>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-teal-600 to-cyan-600 p-8 rounded-2xl text-white text-center">
          <p className="text-xl mb-4 font-medium">
            Здесь нет гонки, нет «через боль», нет перегруза.
          </p>
          <p className="text-2xl font-bold">
            Только осознанное, безопасное и поддерживающее движение.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PregnancyPhilosophy;
