import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import confetti from 'canvas-confetti';

interface RegressionHypnosisFooterProps {
  openFaq: number | null;
  setOpenFaq: (value: number | null) => void;
  faqs: Array<{ question: string; answer: string }>;
}

export default function RegressionHypnosisFooter({ openFaq, setOpenFaq, faqs }: RegressionHypnosisFooterProps) {
  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };
  return (
    <>
      {/* How It Works */}
      <section className="bg-muted/20 py-12 sm:py-16 lg:py-24 xl:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 lg:mb-12 text-center px-2">
              Как проходит обучение
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  icon: 'Presentation',
                  title: 'Теория',
                  desc: 'Лекции, разборы, научное обоснование — без эзотерики и мистификации'
                },
                {
                  icon: 'Users',
                  title: 'Практика',
                  desc: 'Работа в триадах, демонстрации, отработка в парах и малых группах'
                },
                {
                  icon: 'MessageCircle',
                  title: 'Обратная связь',
                  desc: 'Супервизия, разбор, поддержка — всё под контролем опытного ведущего'
                }
              ].map((item, idx) => (
                <Card key={idx} className="p-5 sm:p-6 md:p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6">
                    <Icon name={item.icon} className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{item.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Author/Trainer */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 xl:py-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 lg:mb-12 text-center px-2">
            Ведущий
          </h2>
          <Card className="p-5 sm:p-6 md:p-8 lg:p-12 hover:shadow-xl transition-shadow">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Опытный специалист с научным подходом</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  'Практика регрессивного гипноза более 12 лет',
                  'Обучение и супервизия специалистов с 2015 года',
                  'Автор методических материалов и программ',
                  'Работа в рамках доказательного подхода'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 sm:gap-3">
                    <Icon name="Award" className="text-primary mt-0.5 sm:mt-1 flex-shrink-0" size={18} />
                    <p className="text-sm sm:text-base md:text-lg">{item}</p>
                  </div>
                ))}
              </div>
              <div className="bg-muted p-4 sm:p-5 md:p-6 rounded-lg mt-4 sm:mt-6">
                <p className="text-sm sm:text-base md:text-lg italic">
                  "Я обучаю тому, что работает. Без мистики, без обещаний чудес — только практика, метод и понимание механизма."
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/20 py-12 sm:py-16 lg:py-24 xl:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 lg:mb-12 text-center px-2">
              Частые вопросы
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, idx) => (
                <Card 
                  key={idx} 
                  className="p-4 sm:p-5 md:p-6 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <div className="flex justify-between items-start gap-3 sm:gap-4">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">{faq.question}</h3>
                      {openFaq === idx && (
                        <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3">{faq.answer}</p>
                      )}
                    </div>
                    <Icon 
                      name={openFaq === idx ? "ChevronUp" : "ChevronDown"} 
                      className="text-primary flex-shrink-0" 
                      size={20} 
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 xl:py-32">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 sm:p-8 md:p-12 lg:p-16 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
              Готовы начать обучение?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Оставьте заявку, и мы свяжемся с вами для уточнения деталей и выбора программы
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <Button 
                size="lg" 
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto w-full sm:w-auto"
                onClick={handleConfetti}
              >
                Оставить заявку
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto w-full sm:w-auto"
                onClick={handleConfetti}
              >
                Задать вопрос
              </Button>
            </div>
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t">
              <p className="text-xs sm:text-sm text-muted-foreground px-2">
                📧 info@docdialog.su · 📱 +7 (999) 123-45-67 · 📍 Москва, ЦАО
              </p>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}