import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ProgramLevelCardProps {
  level: 1 | 2 | 3;
  title: string;
  focus: string;
  imageUrl: string;
  imageAlt: string;
  items: string[];
  result: string;
  price: string;
  infoMessage?: string;
  reverseLayout?: boolean;
  onOpenProgram: (level: 1 | 2 | 3) => void;
  onBooking: () => void;
  bookingUrl?: string;
  fullPaymentUrl?: string;
}

export default function ProgramLevelCard({
  level,
  title,
  focus,
  imageUrl,
  imageAlt,
  items,
  result,
  price,
  infoMessage,
  reverseLayout = false,
  onOpenProgram,
  onBooking,
  bookingUrl,
  fullPaymentUrl
}: ProgramLevelCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="grid lg:grid-cols-5 gap-0">
        <div className={`lg:col-span-2 ${reverseLayout ? 'lg:order-2' : ''}`}>
          <img 
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover min-h-[200px] sm:min-h-[250px]"
            loading="lazy"
          />
        </div>
        <div className={`lg:col-span-3 p-5 sm:p-6 md:p-8 lg:p-10 ${reverseLayout ? 'lg:order-1' : ''}`}>
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xl sm:text-2xl font-bold text-primary">{level}</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">{title}</h3>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg mb-3 sm:mb-4 font-medium">
            {focus}
          </p>
          {infoMessage && (
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
              <p className="text-sm font-medium">
                {infoMessage}
              </p>
            </div>
          )}
          <div className="space-y-3 mb-6">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 sm:gap-3">
                <Icon name="Check" className="text-primary mt-0.5 sm:mt-1 flex-shrink-0" size={16} />
                <p className="text-sm sm:text-base">{item}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
            <p className="text-sm font-medium">
              ✅ {result}
            </p>
          </div>
          <div className="pt-4 sm:pt-6 border-t space-y-4">
            <div className="text-2xl sm:text-3xl font-bold text-primary">
              {price}
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-3 rounded-lg">
              <p className="text-sm font-medium text-center">
                💬 Оплата только после личного общения
              </p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                {level === 1 && 'Оплата за 1 уровень'}
                {level === 2 && 'Оплата за 1 и 2 уровни'}
                {level === 3 && 'Оплата за 1, 2 и 3 уровни'}
              </p>
            </div>
            <div className="space-y-3">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full"
                onClick={() => onOpenProgram(level)}
              >
                <Icon name="BookOpen" className="mr-2" size={20} />
                Программа курса
              </Button>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg" 
                  className="flex-1"
                  onClick={() => {
                    if (bookingUrl) {
                      window.open(bookingUrl, '_blank');
                    } else {
                      onBooking();
                    }
                  }}
                >
                  Забронировать место 10 000 ₽
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    if (fullPaymentUrl) {
                      window.open(fullPaymentUrl, '_blank');
                    } else {
                      onBooking();
                    }
                  }}
                >
                  Оплатить полностью
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}