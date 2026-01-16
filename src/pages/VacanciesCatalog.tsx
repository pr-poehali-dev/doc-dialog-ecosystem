import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from '@/components/ui/icon';
import { Navigation } from '@/components/Navigation';
import MasseursFooter from '@/components/masseurs/MasseursFooter';
import VacancyCard from '@/components/vacancies/VacancyCard';

const VACANCIES_API_URL = 'https://functions.poehali.dev/9ec6649e-d672-475b-a0cf-04f3634699ed';

interface Vacancy {
  id: string;
  source: 'hh' | 'salon';
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
  requirements?: string[];
  description?: string;
  district?: string;
  contacts?: string;
}

export default function VacanciesCatalog() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [scheduleFilter, setScheduleFilter] = useState('all');

  const fetchVacancies = async () => {
    setLoading(true);
    
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (cityFilter && cityFilter !== 'all') params.append('city', cityFilter);
    params.append('limit', '100');

    const url = `${VACANCIES_API_URL}?${params.toString()}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      setVacancies(data.vacancies || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Ошибка загрузки вакансий:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, [searchQuery, cityFilter]);

  const filteredVacancies = vacancies.filter(vacancy => {
    if (scheduleFilter === 'all') return true;
    return vacancy.workSchedule === scheduleFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Вакансии для массажистов</h1>
            <p className="text-lg text-muted-foreground">
              Найдите работу мечты в лучших массажных салонах города
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                  />
                  <Input
                    placeholder="Поиск по названию или компании..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10"
                  />
                </div>
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Город" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все города</SelectItem>
                    <SelectItem value="Москва">Москва</SelectItem>
                    <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
                    <SelectItem value="Новосибирск">Новосибирск</SelectItem>
                    <SelectItem value="Екатеринбург">Екатеринбург</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={scheduleFilter} onValueChange={setScheduleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="График" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Любой график</SelectItem>
                    <SelectItem value="Полный день">Полный день</SelectItem>
                    <SelectItem value="Сменный график">Сменный график</SelectItem>
                    <SelectItem value="Гибкий график">Гибкий график</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(searchQuery || cityFilter !== 'all' || scheduleFilter !== 'all') && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setCityFilter('all');
                      setScheduleFilter('all');
                    }}
                  >
                    <Icon name="X" size={16} className="mr-1" />
                    Сбросить фильтры
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Найдено вакансий: <span className="font-semibold text-foreground">{filteredVacancies.length}</span> из {total}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Загрузка вакансий...</p>
              </div>
            </div>
          ) : filteredVacancies.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Briefcase" size={48} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Вакансии не найдены
              </h3>
              <p className="text-gray-600 mb-6">
                Попробуйте изменить параметры поиска
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setCityFilter('all');
                  setScheduleFilter('all');
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVacancies.map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))}
            </div>
          )}
        </div>
      </main>

      <MasseursFooter />
    </div>
  );
}
