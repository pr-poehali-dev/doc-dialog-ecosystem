import Icon from "@/components/ui/icon";

const MastermindInstructor = () => {
  const credentials = [
    { text: "Практикующий остеопат с 17-летним опытом", link: null },
    { text: "10 лет частной практики", link: null },
    { text: "Член ассоциации остеопатов", link: "https://assotsiatsiya-osteopatov.ru/user/svodopianoff/" },
    { text: "Мануальный терапевт", link: null },
    { text: "Психолог, регрессолог", link: null },
    { text: "Специалист по работе с ВНС", link: null }
  ];

  const expertise = [
    "восстановления клиентов с хронической болью",
    "работы с психосоматикой",
    "понимания взаимосвязи тела, нервной системы и эмоций"
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Кто ведёт мастермайнд
        </h2>
        
        <div className="bg-gradient-to-br from-white to-emerald-50 p-4 md:p-8 lg:p-12 rounded-2xl shadow-xl border border-emerald-200">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
            <div className="md:w-1/3">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-emerald-100">
                <img 
                  src="https://cdn.poehali.dev/files/ИнфоХит.jpg" 
                  alt="Водопьянов Сергей Геннадьевич" 
                  className="w-full h-full object-cover object-top"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Водопьянов Сергей Геннадьевич
              </h3>
              <p className="text-base md:text-lg text-emerald-600 font-semibold mb-4 md:mb-6">
                Основатель проекта Док Диалог
              </p>
              
              <div className="mb-4 md:mb-6">
                <div className="grid md:grid-cols-2 gap-2 md:gap-3">
                  {credentials.map((credential, index) => (
                    <div key={index} className="flex items-start gap-1.5 md:gap-2">
                      <Icon name="Award" size={16} className="text-emerald-600 mt-0.5 md:mt-1 flex-shrink-0" />
                      {credential.link ? (
                        <span className="text-sm md:text-base text-gray-700">
                          {credential.text.split('ассоциации')[0]}
                          <a 
                            href={credential.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700 underline font-medium"
                          >
                            ассоциации
                          </a>
                          {credential.text.split('ассоциации')[1]}
                        </span>
                      ) : (
                        <span className="text-sm md:text-base text-gray-700">{credential.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 md:p-6 rounded-xl border border-emerald-100 shadow-sm">
                <h4 className="text-sm md:text-base font-bold text-gray-900 mb-2 md:mb-3">За годы практики накоплен уникальный опыт:</h4>
                <ul className="space-y-1.5 md:space-y-2">
                  {expertise.map((item, index) => (
                    <li key={index} className="flex items-start gap-1.5 md:gap-2">
                      <Icon name="Star" size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <p className="mt-4 md:mt-6 text-base md:text-lg font-medium text-gray-800">
                Настало время передавать этот опыт лично — тем, кто хочет расти профессионально.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MastermindInstructor;