import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function PagePreview() {
  const pageData = JSON.parse(localStorage.getItem('pageBuilderData') || '{}');
  
  const defaultData = {
    heroTitle: 'Оздоровительный массаж',
    heroSubtitle: 'Профессиональный специалист по телу с опытом 5+ лет',
    aboutTitle: 'Обо мне',
    aboutText: 'Я практикую целостный подход к оздоровлению через массаж. Помогаю людям восстановиться после стресса, снять мышечное напряжение и улучшить общее самочувствие.',
    servicesTitle: 'Услуги массажа',
    services: [
      { name: 'Релаксационный массаж', duration: '60 мин', price: '3000' },
      { name: 'Восстановительный массаж', duration: '90 мин', price: '4500' },
    ],
    processTitle: 'Как проходит сеанс',
    processSteps: [
      'Консультация и обсуждение пожеланий',
      'Подбор техник массажа',
      'Сеанс массажа в комфортной обстановке',
      'Рекомендации после сеанса',
    ],
    contactsTitle: 'Связаться со мной',
    showPhone: true,
    showTelegram: true,
    showWhatsapp: true,
    colorTheme: 'blue',
  };

  const data = { ...defaultData, ...pageData };

  const themeColors = {
    blue: 'from-blue-600 to-blue-800',
    green: 'from-green-600 to-green-800',
    purple: 'from-purple-600 to-purple-800',
    orange: 'from-orange-600 to-orange-800',
  };

  const themeColor = themeColors[data.colorTheme as keyof typeof themeColors] || themeColors.blue;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${themeColor} text-white py-20`}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{data.heroTitle}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">{data.heroSubtitle}</p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Icon name="Phone" size={20} className="mr-2" />
              Записаться на сеанс
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      {data.aboutText && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">{data.aboutTitle}</h2>
            <p className="text-lg text-muted-foreground text-center leading-relaxed">
              {data.aboutText}
            </p>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">{data.servicesTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.services.map((service: any, index: number) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Wallet" size={16} />
                      <span className="text-2xl font-bold text-primary">{service.price} ₽</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Записаться</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">{data.processTitle}</h2>
          <div className="space-y-6">
            {data.processSteps.map((step: string, index: number) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r ${themeColor} text-white flex items-center justify-center font-bold text-lg`}>
                  {index + 1}
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-lg">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">{data.contactsTitle}</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            {data.showPhone && (
              <Button size="lg" variant="outline">
                <Icon name="Phone" size={20} className="mr-2" />
                Позвонить
              </Button>
            )}
            {data.showTelegram && (
              <Button size="lg" variant="outline">
                <Icon name="Send" size={20} className="mr-2" />
                Telegram
              </Button>
            )}
            {data.showWhatsapp && (
              <Button size="lg" variant="outline">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                WhatsApp
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`bg-gradient-to-r ${themeColor} text-white py-8`}>
        <div className="container mx-auto px-4 text-center">
          <p className="opacity-80">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}
