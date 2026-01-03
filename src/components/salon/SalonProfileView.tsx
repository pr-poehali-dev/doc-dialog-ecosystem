import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Vacancy {
  id?: number;
  specializations: string[];
  schedule: string;
  salary_from: number | null;
  salary_to: number | null;
  salary_currency: string;
  requirements: string;
  requires_partner_courses: boolean;
  is_active?: boolean;
}

interface Salon {
  id: number;
  user_id: number;
  name: string;
  description: string;
  logo_url: string;
  website: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  photos: string[];
  is_verified: boolean;
  subscription_type: string;
  subscription_expires_at?: string;
  created_at: string;
}

interface SalonProfileViewProps {
  salon: Salon | null;
  vacancies: Vacancy[];
  onEdit: () => void;
}

export default function SalonProfileView({ salon, vacancies, onEdit }: SalonProfileViewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-muted-foreground">Описание</p>
          <p className="mt-1">{salon?.description || 'Не указано'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Город</p>
          <p className="mt-1">{salon?.city || 'Не указан'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Адрес</p>
          <p className="mt-1">{salon?.address || 'Не указан'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Телефон</p>
          <p className="mt-1">{salon?.phone || 'Не указан'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="mt-1">{salon?.email || 'Не указан'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Сайт</p>
          <p className="mt-1">{salon?.website || 'Не указан'}</p>
        </div>
      </div>

      {salon?.photos && salon.photos.length > 0 && (
        <div>
          <p className="text-sm text-muted-foreground mb-2">Фото салона</p>
          <div className="flex flex-wrap gap-2">
            {salon.photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt={`Фото ${idx + 1}`}
                className="w-32 h-32 object-cover rounded"
              />
            ))}
          </div>
        </div>
      )}

      {vacancies.length > 0 && (
        <div>
          <p className="text-sm text-muted-foreground mb-3">Вакансии ({vacancies.length})</p>
          <div className="space-y-3">
            {vacancies.map((vac, idx) => (
              <Card key={idx}>
                <CardContent className="pt-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {vac.specializations.map((spec) => (
                      <Badge key={spec} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm space-y-1">
                    {vac.schedule && (
                      <p>
                        <span className="text-muted-foreground">График:</span> {vac.schedule}
                      </p>
                    )}
                    {(vac.salary_from || vac.salary_to) && (
                      <p>
                        <span className="text-muted-foreground">ЗП:</span>{' '}
                        {vac.salary_from?.toLocaleString()} - {vac.salary_to?.toLocaleString()}{' '}
                        {vac.salary_currency}
                      </p>
                    )}
                    {vac.requires_partner_courses && (
                      <Badge variant="outline" className="mt-1">
                        <Icon name="GraduationCap" size={12} className="mr-1" />
                        Требуется обучение в школах-партнерах
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Button onClick={onEdit}>
        <Icon name="Edit" size={16} className="mr-2" />
        Редактировать
      </Button>
    </div>
  );
}
