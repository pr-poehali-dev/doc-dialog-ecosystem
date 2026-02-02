import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RegressionHypnosisFooterProps {
  openFaq: number | null;
  setOpenFaq: (value: number | null) => void;
  faqs: Array<{ question: string; answer: string }>;
}

export default function RegressionHypnosisFooter({ openFaq, setOpenFaq, faqs }: RegressionHypnosisFooterProps) {
  return (
    <>
      {/* How It Works */}
      <section className="bg-muted/20 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
              Как проходит обучение
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
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
                <Card key={idx} className="p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Icon name={item.icon} className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Author/Trainer */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
            Ведущий
          </h2>
          <Card className="p-8 md:p-12 hover:shadow-xl transition-shadow">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">Опытный специалист с научным подходом</h3>
              <div className="space-y-4">
                {[
                  'Практика регрессивного гипноза более 12 лет',
                  'Обучение и супервизия специалистов с 2015 года',
                  'Автор методических материалов и программ',
                  'Работа в рамках доказательного подхода'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Icon name="Award" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p className="text-base md:text-lg">{item}</p>
                  </div>
                ))}
              </div>
              <div className="bg-muted p-6 rounded-lg mt-6">
                <p className="text-base md:text-lg italic">
                  "Я обучаю тому, что работает. Без мистики, без обещаний чудес — только практика, метод и понимание механизма."
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/20 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
              Частые вопросы
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <Card 
                  key={idx} 
                  className="p-6 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold mb-2">{faq.question}</h3>
                      {openFaq === idx && (
                        <p className="text-muted-foreground mt-3">{faq.answer}</p>
                      )}
                    </div>
                    <Icon 
                      name={openFaq === idx ? "ChevronUp" : "ChevronDown"} 
                      className="text-primary flex-shrink-0" 
                      size={24} 
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <Card className="p-10 md:p-16 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Готовы начать обучение?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Оставьте заявку, и мы свяжемся с вами для уточнения деталей и выбора программы
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 h-auto">
                Оставить заявку
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
                Задать вопрос
              </Button>
            </div>
            <div className="mt-8 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                📧 info@docdialog.su · 📱 +7 (999) 123-45-67 · 📍 Москва, ЦАО
              </p>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
