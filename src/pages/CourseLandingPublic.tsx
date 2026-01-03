import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const LANDING_API_URL = 'https://functions.poehali.dev/428c2825-cfd3-4c2c-9666-df1320295ced';

interface Landing {
  id: number;
  school: {
    id: number;
    name: string;
    logo: string;
    description: string;
    students_count: number;
  };
  title: string;
  short_description: string;
  format: string;
  category: string;
  cover_url: string;
  cta_button_text: string;
  author: {
    name: string;
    photo_url: string;
    position: string;
    description: string;
    experience: string;
  };
  learning_format: {
    duration: string;
    lesson_format: string;
    support_info: string;
    access_period: string;
    city: string;
    location: string;
    event_dates: string;
    days_count: number;
  };
  pricing: {
    price_text: string;
    payment_format: string;
    discount_info: string;
    partner_link: string;
  };
  promo: {
    description: string;
    notification_email: string;
    notification_text: string;
  };
  seo: {
    title: string;
    description: string;
    slug: string;
  };
  target_audience: Array<{ title: string; description: string; icon_url: string }>;
  results: string[];
  program: Array<{ module_name: string; description: string }>;
  bonuses: Array<{ bonus_name: string; description: string }>;
}

export default function CourseLandingPublic() {
  const { slug } = useParams();
  const { toast } = useToast();
  const [landing, setLanding] = useState<Landing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLanding();
  }, [slug]);

  const loadLanding = async () => {
    try {
      const response = await fetch(`${LANDING_API_URL}?slug=${slug}`);
      
      if (response.ok) {
        const data = await response.json();
        setLanding(data);
      } else {
        toast({ title: 'Ошибка', description: 'Лендинг не найден', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить лендинг', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!landing) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Лендинг не найден</h1>
          <p className="text-muted-foreground">Возможно, он был удален или еще не опубликован</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero секция */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {landing.format}
                </span>
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">{landing.title}</h1>
              <p className="text-xl text-muted-foreground mb-8">{landing.short_description}</p>
              
              {landing.school && (
                <div className="flex items-center gap-4 mb-8 p-4 bg-card rounded-lg">
                  {landing.school.logo && (
                    <img src={landing.school.logo} alt={landing.school.name} className="w-16 h-16 rounded-full object-cover" />
                  )}
                  <div>
                    <div className="font-semibold">{landing.school.name}</div>
                    {landing.school.students_count && (
                      <div className="text-sm text-muted-foreground">
                        {landing.school.students_count}+ выпускников
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <Button size="lg" className="text-lg px-8">
                {landing.cta_button_text}
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </div>
            
            {landing.cover_url && (
              <div className="relative">
                <img
                  src={landing.cover_url}
                  alt={landing.title}
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Автор курса */}
      {landing.author.name && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Об авторе курса</h2>
            <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {landing.author.photo_url && (
                  <img
                    src={landing.author.photo_url}
                    alt={landing.author.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                )}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">{landing.author.name}</h3>
                  {landing.author.position && (
                    <p className="text-primary font-medium mb-4">{landing.author.position}</p>
                  )}
                  {landing.author.description && (
                    <p className="text-muted-foreground mb-4">{landing.author.description}</p>
                  )}
                  {landing.author.experience && (
                    <p className="text-sm text-muted-foreground">{landing.author.experience}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Для кого курс */}
      {landing.target_audience.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Для кого этот курс</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {landing.target_audience.map((item, idx) => (
                <div key={idx} className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  {item.icon_url && (
                    <img src={item.icon_url} alt="" className="w-12 h-12 mb-4" />
                  )}
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Результаты обучения */}
      {landing.results.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Чему вы научитесь</h2>
            <div className="max-w-3xl mx-auto grid gap-4">
              {landing.results.map((result, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-card p-4 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {idx + 1}
                  </div>
                  <p className="flex-1">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Программа курса */}
      {landing.program.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Программа курса</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {landing.program.map((module, idx) => (
                <div key={idx} className="bg-card rounded-lg p-6 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{module.module_name}</h3>
                      <p className="text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Формат обучения */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Формат обучения</h2>
          <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              {(landing.format === 'онлайн' || landing.format === 'гибрид') && (
                <>
                  {landing.learning_format.duration && (
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <Icon name="Clock" size={20} />
                        <span className="font-semibold">Длительность</span>
                      </div>
                      <p className="text-muted-foreground">{landing.learning_format.duration}</p>
                    </div>
                  )}
                  {landing.learning_format.access_period && (
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <Icon name="Calendar" size={20} />
                        <span className="font-semibold">Срок доступа</span>
                      </div>
                      <p className="text-muted-foreground">{landing.learning_format.access_period}</p>
                    </div>
                  )}
                  {landing.learning_format.lesson_format && (
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <Icon name="Video" size={20} />
                        <span className="font-semibold">Формат уроков</span>
                      </div>
                      <p className="text-muted-foreground">{landing.learning_format.lesson_format}</p>
                    </div>
                  )}
                  {landing.learning_format.support_info && (
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <Icon name="MessageCircle" size={20} />
                        <span className="font-semibold">Поддержка</span>
                      </div>
                      <p className="text-muted-foreground">{landing.learning_format.support_info}</p>
                    </div>
                  )}
                </>
              )}
              {(landing.format === 'офлайн' || landing.format === 'гибрид') && (
                <>
                  {landing.learning_format.city && (
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <Icon name="MapPin" size={20} />
                        <span className="font-semibold">Город</span>
                      </div>
                      <p className="text-muted-foreground">{landing.learning_format.city}</p>
                    </div>
                  )}
                  {landing.learning_format.event_dates && (
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <Icon name="Calendar" size={20} />
                        <span className="font-semibold">Даты</span>
                      </div>
                      <p className="text-muted-foreground">{landing.learning_format.event_dates}</p>
                    </div>
                  )}
                  {landing.learning_format.location && (
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <Icon name="Building" size={20} />
                        <span className="font-semibold">Место проведения</span>
                      </div>
                      <p className="text-muted-foreground">{landing.learning_format.location}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Бонусы */}
      {landing.bonuses.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Бонусы при покупке</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {landing.bonuses.map((bonus, idx) => (
                <div key={idx} className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border-2 border-primary/20">
                  <div className="flex items-start gap-3">
                    <Icon name="Gift" className="text-primary flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{bonus.bonus_name}</h3>
                      <p className="text-sm text-muted-foreground">{bonus.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Стоимость */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Стоимость обучения</h2>
            {landing.pricing.price_text && (
              <div className="text-5xl font-bold text-primary mb-6">{landing.pricing.price_text}</div>
            )}
            {landing.pricing.payment_format && (
              <p className="text-lg text-muted-foreground mb-4">{landing.pricing.payment_format}</p>
            )}
            {landing.pricing.discount_info && (
              <div className="bg-yellow-100 text-yellow-800 inline-block px-4 py-2 rounded-lg mb-8">
                <Icon name="Percent" size={16} className="inline mr-2" />
                {landing.pricing.discount_info}
              </div>
            )}
            <div className="mt-8">
              <Button size="lg" className="text-lg px-12">
                {landing.cta_button_text}
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
              {landing.pricing.partner_link && (
                <p className="text-sm text-muted-foreground mt-4">
                  <a href={landing.pricing.partner_link} target="_blank" rel="noopener noreferrer" className="underline">
                    Перейти на сайт курса
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Промокод */}
      {landing.promo.description && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-card rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <Icon name="Tag" className="text-primary flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-2xl font-bold mb-4">Промокод</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{landing.promo.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
