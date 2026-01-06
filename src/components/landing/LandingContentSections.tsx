import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Service {
  name: string;
  duration: string;
  price: string;
  description: string;
}

interface ProcessStep {
  title: string;
  description: string;
  icon: string;
}

interface LandingContentSectionsProps {
  aboutTitle: string;
  aboutText: string;
  services: Service[];
  processTitle: string;
  processSteps: ProcessStep[];
  gallery: string[];
  certificates: string[];
  gradientClass: string;
}

export default function LandingContentSections({
  aboutTitle,
  aboutText,
  services,
  processTitle,
  processSteps,
  gallery,
  certificates,
  gradientClass,
}: LandingContentSectionsProps) {
  return (
    <>
      {/* About Section */}
      {aboutText && (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">{aboutTitle}</h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {aboutText}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {services && services.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Мои услуги</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all bg-white"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold flex-1 text-gray-900">{service.name}</h3>
                    {service.price && (
                      <Badge className={`bg-gradient-to-r ${gradientClass} text-white border-0`}>
                        {service.price} ₽
                      </Badge>
                    )}
                  </div>
                  {service.description && (
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">{service.description}</p>
                  )}
                  {service.duration && (
                    <div className="flex items-center text-gray-500 text-sm">
                      <Icon name="Clock" size={16} className="mr-2" />
                      {service.duration}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {processSteps && processSteps.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">{processTitle}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon name={step.icon as any} size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {gallery && gallery.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Галерея</h2>
            <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {gallery.map((img, index) => (
                <div key={index} className="overflow-hidden rounded-2xl shadow-lg">
                  <img 
                    src={img} 
                    alt={`Фото ${index + 1}`} 
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certificates Section */}
      {certificates && certificates.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Сертификаты и дипломы</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Подтвержденная квалификация и профессиональное образование
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {certificates.map((cert, index) => (
                <div key={index} className="overflow-hidden rounded-2xl shadow-lg border-2 border-amber-100">
                  <img 
                    src={cert} 
                    alt={`Сертификат ${index + 1}`} 
                    className="w-full h-80 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
