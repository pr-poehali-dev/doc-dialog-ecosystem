import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import VacancyCard from "@/components/vacancies/VacancyCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VACANCIES_LIST_URL = "https://functions.poehali.dev/5f413b9d-7151-490d-8f2e-5bc5088e3aec";

interface Vacancy {
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
}

const VacanciesImport = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [onlineFilter, setOnlineFilter] = useState("all");
  const [total, setTotal] = useState(0);

  const fetchVacancies = async () => {
    setLoading(true);
    
    const params = new URLSearchParams();
    if (cityFilter && cityFilter !== 'all') params.append('city', cityFilter);
    if (experienceFilter && experienceFilter !== 'all') params.append('workExperience', experienceFilter);
    if (onlineFilter && onlineFilter !== 'all') params.append('online', onlineFilter);
    params.append('limit', '50');

    const url = `${VACANCIES_LIST_URL}?${params.toString()}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    setVacancies(data.vacancies || []);
    setTotal(data.total || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchVacancies();
  }, [cityFilter, experienceFilter, onlineFilter]);

  const filteredVacancies = vacancies.filter(vacancy => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      vacancy.title.toLowerCase().includes(query) ||
      vacancy.companyName.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Каталог вакансий
          </h1>
          <p className="text-lg text-gray-600">
            Найдено вакансий: <span className="font-bold text-emerald-600">{filteredVacancies.length}</span> из {total}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Поиск по названию или компании
              </label>
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                />
                <Input
                  placeholder="Frontend Developer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Город
              </label>
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Все города" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все города</SelectItem>
                  <SelectItem value="Москва">Москва</SelectItem>
                  <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
                  <SelectItem value="Новосибирск">Новосибирск</SelectItem>
                  <SelectItem value="Екатеринбург">Екатеринбург</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Опыт работы
              </label>
              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Любой опыт" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любой опыт</SelectItem>
                  <SelectItem value="Нет опыта">Нет опыта</SelectItem>
                  <SelectItem value="От 1 до 3 лет">От 1 до 3 лет</SelectItem>
                  <SelectItem value="От 3 до 6 лет">От 3 до 6 лет</SelectItem>
                  <SelectItem value="Более 6 лет">Более 6 лет</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Формат работы
              </label>
              <Select value={onlineFilter} onValueChange={setOnlineFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Любой формат" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любой формат</SelectItem>
                  <SelectItem value="true">Удалённо</SelectItem>
                  <SelectItem value="false">В офисе</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(searchQuery || cityFilter !== 'all' || experienceFilter !== 'all' || onlineFilter !== 'all') && (
            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setCityFilter("all");
                  setExperienceFilter("all");
                  setOnlineFilter("all");
                }}
              >
                <Icon name="X" size={16} className="mr-1" />
                Сбросить фильтры
              </Button>
            </div>
          )}
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
                setSearchQuery("");
                setCityFilter("all");
                setExperienceFilter("all");
                setOnlineFilter("all");
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
    </div>
  );
};

export default VacanciesImport;