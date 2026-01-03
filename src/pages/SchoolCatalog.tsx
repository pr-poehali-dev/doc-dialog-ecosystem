import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const SCHOOLS_API_URL = 'https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86';

interface School {
  id: number;
  name: string;
  short_description: string;
  logo_url: string;
  city: string;
  rating: number;
  reviews_count: number;
  slug: string;
  students_count: number;
  founded_year: number;
}

export default function SchoolCatalog() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState<string>('');
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    fetchSchools();
  }, [cityFilter]);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ action: 'catalog', limit: '50' });
      if (cityFilter) params.append('city', cityFilter);
      
      const response = await fetch(`${SCHOOLS_API_URL}?${params}`);
      const data = await response.json();
      
      setSchools(data.schools || []);
      
      // Собираем уникальные города для фильтра
      const uniqueCities = [...new Set(data.schools.map((s: School) => s.city).filter(Boolean))];
      setCities(uniqueCities);
    } catch (error) {
      console.error('Ошибка загрузки каталога школ:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <Navigation />
      
      {/* Герой секция */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Каталог школ массажа
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Найдите лучшие школы и курсы массажа в вашем городе
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/courses">
                <Button variant="outline" size="lg">
                  <Icon name="BookOpen" size={20} className="mr-2" />
                  Каталог курсов
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Фильтры */}
        <div className="mb-8 bg-card rounded-xl shadow-sm p-6 flex gap-4 items-center flex-wrap">
          <div className="flex items-center gap-3">
            <Icon name="MapPin" size={20} className="text-primary" />
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-4 py-2.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background"
            >
              <option value="">Все города</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div className="ml-auto text-sm text-muted-foreground font-medium">
            Найдено школ: <span className="text-primary">{schools.length}</span>
          </div>
        </div>

        {/* Список школ */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground mt-4">Загрузка школ...</p>
          </div>
        ) : schools.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl shadow-sm">
            <Icon name="GraduationCap" size={64} className="text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Школы не найдены</h3>
            <p className="text-muted-foreground">Попробуйте изменить фильтры поиска</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schools.map(school => (
              <Link
                key={school.id}
                to={`/school/${school.slug}`}
                className="bg-card rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-transparent hover:border-primary/20"
              >
                {/* Логотип с градиентом */}
                <div className="relative h-56 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
                  {school.logo_url ? (
                    <img
                      src={school.logo_url}
                      alt={school.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <Icon name="GraduationCap" size={80} className="text-primary/40 group-hover:scale-110 transition-transform duration-500" />
                  )}
                  {/* Оверлей при наведении */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Контент */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {school.name}
                  </h3>
                  
                  {school.short_description && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                      {school.short_description}
                    </p>
                  )}

                  {/* Метаинформация */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {school.city && (
                      <div className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-secondary rounded-full">
                        <Icon name="MapPin" size={14} className="text-primary" />
                        <span className="font-medium">{school.city}</span>
                      </div>
                    )}
                    
                    {school.rating > 0 && (
                      <div className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full">
                        <Icon name="Star" size={14} className="fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{Number(school.rating).toFixed(1)}</span>
                        {school.reviews_count > 0 && (
                          <span className="text-amber-600">({school.reviews_count})</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Статистика */}
                  <div className="pt-4 border-t border-border flex gap-6 text-sm text-muted-foreground">
                    {school.students_count > 0 && (
                      <div className="flex items-center gap-2">
                        <Icon name="Users" size={16} className="text-primary" />
                        <span className="font-medium">{school.students_count}+</span>
                      </div>
                    )}
                    {school.founded_year && (
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={16} className="text-primary" />
                        <span className="font-medium">с {school.founded_year}</span>
                      </div>
                    )}
                  </div>

                  {/* Кнопка */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-primary font-semibold group-hover:gap-2 transition-all">
                      <span>Подробнее о школе</span>
                      <Icon name="ArrowRight" size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}