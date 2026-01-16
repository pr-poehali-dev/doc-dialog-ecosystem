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
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Кто ведёт мастермайнд
        </h2>
        
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border-2 border-emerald-100">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://cdn.poehali.dev/files/ИнфоХит.jpg" 
                  alt="Водопьянов Сергей Геннадьевич" 
                  className="w-full h-full object-cover object-top"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Водопьянов Сергей Геннадьевич
              </h3>
              <p className="text-lg text-emerald-600 font-semibold mb-6">
                Основатель проекта Док Диалог
              </p>
              
              <div className="mb-6">
                <div className="grid md:grid-cols-2 gap-3">
                  {credentials.map((credential, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Icon name="Award" size={18} className="text-emerald-600 mt-1 flex-shrink-0" />
                      {credential.link ? (
                        <span className="text-gray-700">
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
                        <span className="text-gray-700">{credential.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-3">За годы практики накоплен уникальный опыт:</h4>
                <ul className="space-y-2">
                  {expertise.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Icon name="Star" size={18} className="text-emerald-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <p className="mt-6 text-lg font-medium text-gray-800">
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