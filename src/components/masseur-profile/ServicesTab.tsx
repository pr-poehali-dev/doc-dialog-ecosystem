import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface Masseur {
  id: number;
  full_name: string;
  city: string;
  experience_years: number;
  specializations: string[];
  avatar_url: string | null;
  rating: number;
  reviews_count: number;
  about: string;
  phone: string;
  certificates?: string[];
  portfolio_images?: string[];
  education?: string;
  languages?: string[];
  verification_badges?: string[];
  is_premium?: boolean;
}

interface ServicesTabProps {
  masseur: Masseur;
}

const serviceDescriptions: Record<string, { description: string; icon: string; duration?: string; price?: string }> = {
  "Релакс тела": {
    description: "Полное расслабление и снятие напряжения после интенсивного рабочего дня. Помогаю восстановить энергию, улучшить настроение и общее самочувствие.",
    icon: "Sparkles",
    duration: "60 мин",
    price: "от 3000 ₽"
  },
  "Восстановительные техники": {
    description: "Индивидуальный подход к восстановлению после нагрузок. Возвращаю подвижность и помогаю вернуться к активной жизни с комфортом.",
    icon: "RefreshCw",
    duration: "60 мин",
    price: "от 3500 ₽"
  },
  "Профилактика тела": {
    description: "Регулярные сеансы для поддержания здоровья и хорошего самочувствия. Работаю со всем телом, помогая сохранить отличную форму на долгие годы.",
    icon: "Shield",
    duration: "60 мин",
    price: "от 3000 ₽"
  },
  "Для спортсменов": {
    description: "Специализированные программы для тех, кто активно занимается спортом. Ускоренное восстановление, профилактика перегрузок, повышение выносливости.",
    icon: "Dumbbell",
    duration: "60-90 мин",
    price: "от 3500 ₽"
  },
  "Коррекция фигуры": {
    description: "Комплексная программа для улучшения контуров тела. Помогаю улучшить состояние кожи, вывести лишнюю жидкость и достичь желаемых форм.",
    icon: "Zap",
    duration: "60 мин",
    price: "от 3500 ₽"
  },
  "Работа с лицом": {
    description: "Омолаживающие техники для улучшения тонуса кожи и контура лица. Естественный эффект лифтинга без каких-либо вмешательств.",
    icon: "Smile",
    duration: "30-45 мин",
    price: "от 2500 ₽"
  },
  "Выезд к клиенту": {
    description: "Удобный формат для занятых людей. Привожу все необходимое оборудование. Сеанс проходит в комфортной домашней обстановке в удобное время.",
    icon: "Car",
    duration: "от 60 мин",
    price: "+ 1000 ₽ к стоимости"
  },
  "Прием в кабинете/салоне": {
    description: "Комфортные условия для проведения сеансов в оборудованном кабинете с профессиональным столом, приятной музыкой и атмосферой.",
    icon: "Home",
    duration: "от 30 мин",
    price: "индивидуально"
  }
};

export default function ServicesTab({ masseur }: ServicesTabProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const userStr = localStorage.getItem('user');
  const userRole = userStr ? JSON.parse(userStr).role : null;

  const handleBookService = async (serviceName: string, serviceInfo: any) => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      toast({
        title: 'Требуется авторизация',
        description: 'Войдите в систему, чтобы записаться на услугу',
        variant: 'destructive'
      });
      navigate('/login');
      return;
    }

    const user = JSON.parse(userStr);
    
    // Проверка: только клиенты могут заказывать услуги
    if (user.role === 'salon') {
      toast({
        title: 'Недоступно для салонов',
        description: 'Заказывать услуги могут только клиенты. Салоны могут писать напрямую через кнопку "Написать".',
        variant: 'destructive'
      });
      return;
    }
    
    if (user.role !== 'client') {
      toast({
        title: 'Недоступно',
        description: 'Заказывать услуги могут только клиенты',
        variant: 'destructive'
      });
      return;
    }

    const message = `Хочу записаться на услугу: ${serviceName}\n\n${serviceInfo.description}\n\nДлительность: ${serviceInfo.duration || 'не указана'}\nСтоимость: ${serviceInfo.price || 'по договоренности'}`;
    
    try {
      const response = await fetch('https://functions.poehali.dev/04d0b538-1cf5-4941-9c06-8d1bef5854ec?action=create-order', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          masseur_id: masseur.id,
          service_name: serviceName,
          service_description: serviceInfo.description,
          duration: serviceInfo.duration,
          price: serviceInfo.price,
          message: message
        })
      });

      if (response.ok) {
        navigate(`/dashboard/messages?chat=${masseur.id}&message=${encodeURIComponent(message)}`);
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      navigate(`/dashboard/messages?chat=${masseur.id}&message=${encodeURIComponent(message)}`);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
          <Icon name="Briefcase" size={20} className="flex-shrink-0 sm:w-6 sm:h-6" />
          <span className="break-words">Услуги и специализации</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {masseur.specializations.map((spec) => {
            const serviceInfo = serviceDescriptions[spec] || {
              description: "Профессиональный подход и индивидуальная работа с каждым клиентом. Использую проверенные техники для достижения максимального результата.",
              icon: "CheckCircle2",
              duration: "60 мин",
              price: "от 3000 ₽"
            };
            
            return (
              <div key={spec} className="p-3 sm:p-4 rounded-xl border-2 border-primary/10 bg-gradient-to-br from-white to-primary/5 hover:border-primary/30 transition-all">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name={serviceInfo.icon} size={20} className="text-primary sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-base sm:text-lg break-words">{spec}</h3>
                      <div className="flex flex-wrap gap-2">
                        {serviceInfo.duration && (
                          <Badge variant="secondary" className="text-xs whitespace-nowrap">
                            <Icon name="Clock" size={12} className="mr-1" />
                            {serviceInfo.duration}
                          </Badge>
                        )}
                        {serviceInfo.price && (
                          <Badge variant="outline" className="text-xs font-semibold whitespace-nowrap">
                            {serviceInfo.price}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {serviceInfo.description}
                    </p>
                    {userRole === 'client' && (
                      <Button
                        onClick={() => handleBookService(spec, serviceInfo)}
                        className="w-full"
                        size="sm"
                      >
                        <Icon name="Calendar" size={16} className="mr-2" />
                        Хочу записаться
                      </Button>
                    )}
                    {userRole === 'salon' && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                        <Icon name="Info" size={16} className="inline mr-2" />
                        Для связи используйте кнопку "Написать"
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}