import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VacancyCardProps {
  vacancy: {
    id: number;
    title: string;
    compensationFrom?: number;
    compensationTo?: number;
    gross?: boolean;
    companyName: string;
    city?: string;
    online?: boolean;
    vacancyLink?: string;
    companyLink?: string;
    companyApproved?: boolean;
    itAccreditation?: boolean;
    withoutResume?: boolean;
    companyLogo?: string;
    metroStations?: string[];
    workExperience?: string;
    workSchedule?: string;
    compensationFrequency?: string;
    employerHhRating?: number;
    employerItAccreditation?: boolean;
    hrbrand?: string;
    createdAt?: string;
  };
}

const VacancyCard = ({ vacancy }: VacancyCardProps) => {
  const formatSalary = () => {
    if (!vacancy.compensationFrom && !vacancy.compensationTo) {
      return "Зарплата не указана";
    }

    const format = (num: number) => num.toLocaleString('ru-RU');
    const suffix = vacancy.gross ? " (до вычета налогов)" : "";
    const frequency = vacancy.compensationFrequency === 'monthly' ? '/мес' : '';

    if (vacancy.compensationFrom && vacancy.compensationTo) {
      return `${format(vacancy.compensationFrom)} - ${format(vacancy.compensationTo)} ₽${frequency}${suffix}`;
    }
    if (vacancy.compensationFrom) {
      return `от ${format(vacancy.compensationFrom)} ₽${frequency}${suffix}`;
    }
    if (vacancy.compensationTo) {
      return `до ${format(vacancy.compensationTo)} ₽${frequency}${suffix}`;
    }
  };

  const handleApply = () => {
    if (vacancy.vacancyLink) {
      window.open(vacancy.vacancyLink, '_blank');
    }
  };

  const handleCompanyClick = () => {
    if (vacancy.companyLink) {
      window.open(vacancy.companyLink, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all p-6">
      <div className="flex items-start gap-4 mb-4">
        {vacancy.companyLogo ? (
          <img 
            src={vacancy.companyLogo} 
            alt={vacancy.companyName}
            className="w-16 h-16 object-contain rounded-lg border border-gray-200"
          />
        ) : (
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xl">
              {vacancy.companyName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer">
            {vacancy.title}
          </h3>
          
          <div 
            onClick={handleCompanyClick}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer mb-2"
          >
            <span className="font-medium">{vacancy.companyName}</span>
            {vacancy.companyApproved && (
              <Badge variant="secondary" className="text-xs">
                <Icon name="BadgeCheck" size={12} className="mr-1" />
                Проверено
              </Badge>
            )}
            {vacancy.itAccreditation && (
              <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                IT-аккредитация
              </Badge>
            )}
          </div>

          <div className="text-2xl font-bold text-emerald-600 mb-3">
            {formatSalary()}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {vacancy.city && (
              <Badge variant="outline" className="gap-1">
                <Icon name="MapPin" size={14} />
                {vacancy.city}
              </Badge>
            )}
            
            {vacancy.online && (
              <Badge variant="outline" className="gap-1 bg-blue-50 text-blue-700 border-blue-200">
                <Icon name="Monitor" size={14} />
                Удалённо
              </Badge>
            )}

            {vacancy.workExperience && (
              <Badge variant="outline" className="gap-1">
                <Icon name="Briefcase" size={14} />
                {vacancy.workExperience}
              </Badge>
            )}

            {vacancy.workSchedule && (
              <Badge variant="outline" className="gap-1">
                <Icon name="Clock" size={14} />
                {vacancy.workSchedule}
              </Badge>
            )}

            {vacancy.withoutResume && (
              <Badge variant="outline" className="gap-1 bg-green-50 text-green-700 border-green-200">
                <Icon name="FileCheck" size={14} />
                Без резюме
              </Badge>
            )}
          </div>

          {vacancy.metroStations && vacancy.metroStations.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <Icon name="Train" size={16} className="text-gray-400" />
              <span>{vacancy.metroStations.join(', ')}</span>
            </div>
          )}

          {vacancy.employerHhRating && (
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
              <Icon name="Star" size={16} className="text-amber-400 fill-amber-400" />
              <span className="font-medium">{vacancy.employerHhRating.toFixed(1)}</span>
              <span className="text-gray-400">рейтинг работодателя</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-3">
            <Button onClick={handleApply} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Icon name="Send" size={18} className="mr-2" />
              Откликнуться
            </Button>
            
            {vacancy.vacancyLink && (
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open(vacancy.vacancyLink, '_blank')}
              >
                <Icon name="ExternalLink" size={18} className="mr-2" />
                Подробнее
              </Button>
            )}
          </div>
        </div>
      </div>

      {vacancy.createdAt && (
        <div className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
          Опубликовано: {new Date(vacancy.createdAt).toLocaleDateString('ru-RU')}
        </div>
      )}
    </div>
  );
};

export default VacancyCard;
