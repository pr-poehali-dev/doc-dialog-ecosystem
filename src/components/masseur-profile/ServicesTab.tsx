import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

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
  "Классический массаж": {
    description: "Традиционная техника для расслабления мышц, улучшения кровообращения и общего самочувствия. Идеально подходит для снятия напряжения после рабочего дня.",
    icon: "Sparkles",
    duration: "60 мин",
    price: "от 3000 ₽"
  },
  "Спортивный массаж": {
    description: "Специализированная техника для спортсменов. Помогает восстановиться после тренировок, предотвращает травмы и улучшает спортивные показатели.",
    icon: "Trophy",
    duration: "60-90 мин",
    price: "от 3500 ₽"
  },
  "Лечебный массаж": {
    description: "Профессиональный подход к решению проблем опорно-двигательного аппарата. Эффективен при болях в спине, шее и суставах. Работа с конкретными зонами.",
    icon: "Heart",
    duration: "45-60 мин",
    price: "от 3200 ₽"
  },
  "Антицеллюлитный массаж": {
    description: "Комплексная программа для коррекции фигуры и борьбы с целлюлитом. Улучшает состояние кожи, выводит лишнюю жидкость, моделирует контуры тела.",
    icon: "Zap",
    duration: "60 мин",
    price: "от 3500 ₽"
  },
  "Лимфодренажный массаж": {
    description: "Деликатная техника для активизации лимфотока, снятия отечности и выведения токсинов. Улучшает обменные процессы и укрепляет иммунитет.",
    icon: "Droplet",
    duration: "60 мин",
    price: "от 3200 ₽"
  },
  "Массаж лица": {
    description: "Омолаживающая процедура для улучшения тонуса кожи, разглаживания морщин и контура лица. Естественный лифтинг-эффект без инъекций.",
    icon: "Smile",
    duration: "30-45 мин",
    price: "от 2500 ₽"
  },
  "Восстановительные техники": {
    description: "Индивидуальный подход к восстановлению после травм, операций и интенсивных нагрузок. Возвращение подвижности и снятие болевых синдромов.",
    icon: "RefreshCw",
    duration: "60 мин",
    price: "от 3500 ₽"
  },
  "Профилактика тела": {
    description: "Регулярные сеансы для поддержания здоровья, предотвращения заболеваний и сохранения отличного самочувствия. Комплексная работа со всем телом.",
    icon: "Shield",
    duration: "60 мин",
    price: "от 3000 ₽"
  },
  "Прием в кабинете/салоне": {
    description: "Комфортные условия для проведения сеансов в оборудованном кабинете с профессиональным массажным столом, музыкой и ароматерапией.",
    icon: "Home",
    duration: "от 30 мин",
    price: "индивидуально"
  },
  "Выезд на дом": {
    description: "Удобный формат для занятых людей. Привожу все необходимое оборудование. Сеанс проходит в комфортной домашней обстановке в удобное время.",
    icon: "Car",
    duration: "от 60 мин",
    price: "+ 1000 ₽ к стоимости"
  },
  "Для спортсменов": {
    description: "Специализированные программы для профессиональных и любителей спорта. Ускоренное восстановление, профилактика травм, повышение выносливости.",
    icon: "Dumbbell",
    duration: "60-90 мин",
    price: "от 3500 ₽"
  },
  "Для беременных": {
    description: "Безопасные и комфортные техники для будущих мам. Снятие напряжения в спине, улучшение самочувствия, подготовка к родам. С учетом срока беременности.",
    icon: "Baby",
    duration: "45-60 мин",
    price: "от 3000 ₽"
  }
};

export default function ServicesTab({ masseur }: ServicesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Briefcase" size={24} />
          Услуги и специализации
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
              <div key={spec} className="p-4 rounded-xl border-2 border-primary/10 bg-gradient-to-br from-white to-primary/5 hover:border-primary/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name={serviceInfo.icon} size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{spec}</h3>
                      <div className="flex gap-2">
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
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {serviceInfo.description}
                    </p>
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