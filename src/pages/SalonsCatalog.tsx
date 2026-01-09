import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Vacancy {
  id: number;
  specializations: string[];
  schedule: string;
  salary_from: number | null;
  salary_to: number | null;
  salary_currency: string;
  requirements: string;
  requires_partner_courses: boolean;
}

interface Salon {
  id: number;
  name: string;
  description: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  photos: string[];
  is_verified: boolean;
  vacancies: Vacancy[];
}

const SPECIALIZATIONS = [
  'Классический массаж',
  'Спортивный массаж',
  'Антицеллюлитный массаж',
  'Лимфодренажный массаж',
  'Массаж лица',
  'Детский массаж',
  'Тайский массаж',
  'Стоун-терапия',
];

export default function SalonsCatalog() {
  const navigate = useNavigate();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (cityFilter) params.append('city', cityFilter);
      if (specializationFilter) params.append('specialization', specializationFilter);

      const response = await fetch(
        `https://functions.poehali.dev/7c31e642-ecc3-4052-8e54-c5527834ffb3?${params}`
      );
      const data = await response.json();
      setSalons(data);
    } catch (error) {
      console.error('Ошибка загрузки салонов:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = () => {
    fetchSalons();
  };

  const filteredSalons = salons.filter((salon) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      salon.name.toLowerCase().includes(query) ||
      salon.city.toLowerCase().includes(query) ||
      salon.description?.toLowerCase().includes(query)
    );
  });

  const cities = Array.from(new Set(salons.map((s) => s.city))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Каталог салонов</h1>
              <p className="text-purple-100">Найдите салон мечты с вакансиями для массажистов</p>
            </div>
            <Button variant="outline" className="bg-white text-purple-600" onClick={() => navigate('/')}>
              На главную
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Поиск по названию или городу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={cityFilter || 'all'} onValueChange={(v) => setCityFilter(v === 'all' ? '' : v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Все города" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все города</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={specializationFilter || 'all'} onValueChange={(v) => setSpecializationFilter(v === 'all' ? '' : v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Все специализации" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все специализации</SelectItem>
                  {SPECIALIZATIONS.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleFilterChange} size="sm">
                <Icon name="Search" size={16} className="mr-2" />
                Применить фильтры
              </Button>
              {(cityFilter || specializationFilter || searchQuery) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCityFilter('');
                    setSpecializationFilter('');
                    setSearchQuery('');
                    setTimeout(fetchSalons, 0);
                  }}
                >
                  <Icon name="X" size={16} className="mr-2" />
                  Сбросить
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <Icon name="Loader" size={48} className="mx-auto animate-spin text-purple-600 mb-4" />
            <p className="text-muted-foreground">Загрузка салонов...</p>
          </div>
        ) : filteredSalons.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Салонов не найдено</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSalons.map((salon) => (
              <Card key={salon.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{salon.name}</CardTitle>
                        {salon.is_verified && (
                          <Badge variant="default" className="bg-green-500">
                            <Icon name="CheckCircle" size={12} className="mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Icon name="MapPin" size={14} />
                        {salon.city}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {salon.photos && salon.photos.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {salon.photos.slice(0, 3).map((photo, idx) => (
                        <img
                          key={idx}
                          src={photo}
                          alt={`${salon.name} ${idx + 1}`}
                          className="w-24 h-24 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}

                  {salon.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{salon.description}</p>
                  )}

                  {salon.vacancies && salon.vacancies.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name="Briefcase" size={16} className="text-purple-600" />
                        <span className="text-sm font-medium">
                          {salon.vacancies.length} {salon.vacancies.length === 1 ? 'вакансия' : 'вакансий'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {Array.from(
                          new Set(salon.vacancies.flatMap((v) => v.specializations))
                        ).map((spec) => (
                          <Badge key={spec} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-2 space-y-1 text-sm">
                        {salon.vacancies.some((v) => v.salary_from || v.salary_to) && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="Coins" size={14} />
                            <span>
                              от{' '}
                              {Math.min(
                                ...salon.vacancies
                                  .map((v) => v.salary_from)
                                  .filter((s): s is number => s !== null)
                              ).toLocaleString()}{' '}
                              до{' '}
                              {Math.max(
                                ...salon.vacancies
                                  .map((v) => v.salary_to)
                                  .filter((s): s is number => s !== null)
                              ).toLocaleString()}{' '}
                              ₽
                            </span>
                          </div>
                        )}
                        {salon.vacancies.some((v) => v.requires_partner_courses) && (
                          <div className="flex items-center gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge variant="outline" className="text-xs cursor-help">
                                    <Icon name="GraduationCap" size={12} className="mr-1" />
                                    Обучение в школах-партнерах
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p className="text-sm">
                                    Салон требует наличие сертификата об обучении в школах-партнерах платформы. 
                                    Это гарантирует высокий уровень квалификации специалистов.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    {salon.address && (
                      <div className="flex items-start gap-2 text-sm">
                        <Icon name="MapPin" size={14} className="text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground flex-1">{salon.address}</span>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      {salon.phone && (
                        <a href={`tel:${salon.phone}`} className="flex items-center gap-1 hover:text-purple-600">
                          <Icon name="Phone" size={14} />
                          {salon.phone}
                        </a>
                      )}
                      {salon.email && (
                        <a
                          href={`mailto:${salon.email}`}
                          className="flex items-center gap-1 hover:text-purple-600"
                        >
                          <Icon name="Mail" size={14} />
                          {salon.email}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {salon.address && (
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          window.open(
                            `https://yandex.ru/maps/?text=${encodeURIComponent(`${salon.city}, ${salon.address}`)}`,
                            '_blank'
                          )
                        }
                      >
                        <Icon name="Map" size={16} className="mr-2" />
                        На карте
                      </Button>
                    )}
                    {salon.website ? (
                      <Button
                        className={salon.address ? 'flex-1' : 'w-full'}
                        onClick={() => window.open(salon.website, '_blank')}
                      >
                        <Icon name="ExternalLink" size={16} className="mr-2" />
                        Сайт
                      </Button>
                    ) : (
                      <Button
                        className={salon.address ? 'flex-1' : 'w-full'}
                        onClick={() => window.open(`tel:${salon.phone}`, '_self')}
                      >
                        <Icon name="Phone" size={16} className="mr-2" />
                        Связаться
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}