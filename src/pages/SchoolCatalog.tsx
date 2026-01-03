import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Шапка */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Каталог школ массажа</h1>
          <p className="text-gray-600 mt-2">Найдите лучшие школы и курсы массажа в вашем городе</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Фильтры */}
        <div className="mb-8 flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={20} className="text-gray-500" />
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Все города</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div className="ml-auto text-sm text-gray-600">
            Найдено школ: {schools.length}
          </div>
        </div>

        {/* Список школ */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Загрузка школ...</p>
          </div>
        ) : schools.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <Icon name="School" size={64} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Школы не найдены</h3>
            <p className="text-gray-600">Попробуйте изменить фильтры поиска</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map(school => (
              <Link
                key={school.id}
                to={`/school/${school.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                {/* Логотип */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center overflow-hidden">
                  {school.logo_url ? (
                    <img
                      src={school.logo_url}
                      alt={school.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Icon name="GraduationCap" size={64} className="text-blue-400" />
                  )}
                </div>

                {/* Контент */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {school.name}
                  </h3>
                  
                  {school.short_description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {school.short_description}
                    </p>
                  )}

                  {/* Метаинформация */}
                  <div className="flex flex-wrap gap-3 text-sm">
                    {school.city && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <Icon name="MapPin" size={16} />
                        <span>{school.city}</span>
                      </div>
                    )}
                    
                    {school.rating > 0 && (
                      <div className="flex items-center gap-1 text-amber-600">
                        <Icon name="Star" size={16} />
                        <span className="font-semibold">{Number(school.rating).toFixed(1)}</span>
                        {school.reviews_count > 0 && (
                          <span className="text-gray-500">({school.reviews_count})</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Дополнительная информация */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4 text-xs text-gray-500">
                    {school.students_count > 0 && (
                      <div className="flex items-center gap-1">
                        <Icon name="Users" size={14} />
                        <span>{school.students_count}+ студентов</span>
                      </div>
                    )}
                    {school.founded_year && (
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        <span>с {school.founded_year}</span>
                      </div>
                    )}
                  </div>

                  {/* Кнопка "Подробнее" */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-blue-600 font-semibold group-hover:gap-2 transition-all">
                      <span>Подробнее</span>
                      <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
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