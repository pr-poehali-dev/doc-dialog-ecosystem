import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Course {
  id: number;
  school_id: number;
  title: string;
  description: string;
  category: string;
  course_type: string;
  price: number | null;
  currency: string;
  duration_hours: number | null;
  image_url: string | null;
  external_url: string;
  status: string;
  created_at: string;
}

const COURSE_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';

const CATEGORIES = [
  'Все категории',
  'Классический массаж',
  'Спортивный массаж',
  'Лечебный массаж',
  'SPA массаж',
  'Косметический массаж',
  'Детский массаж',
  'Другое'
];

export default function CoursesCatalog() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все категории');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchQuery, selectedCategory, selectedType, courses]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${COURSE_API_URL}?status=approved`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = [...courses];

    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'Все категории') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(c => c.course_type === selectedType);
    }

    setFilteredCourses(filtered);
  };

  const getCourseTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      online: 'Онлайн',
      offline: 'Офлайн',
      free: 'Бесплатный'
    };
    return labels[type] || type;
  };

  const getCourseTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      online: 'bg-blue-100 text-blue-800',
      offline: 'bg-purple-100 text-purple-800',
      free: 'bg-green-100 text-green-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Каталог курсов
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Профессиональные курсы массажа от лучших школ и экспертов
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск курсов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-md border bg-background min-w-[200px]"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedType === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedType('all')}
              size="sm"
            >
              Все курсы
            </Button>
            <Button
              variant={selectedType === 'online' ? 'default' : 'outline'}
              onClick={() => setSelectedType('online')}
              size="sm"
            >
              <Icon name="Monitor" size={16} className="mr-2" />
              Онлайн
            </Button>
            <Button
              variant={selectedType === 'offline' ? 'default' : 'outline'}
              onClick={() => setSelectedType('offline')}
              size="sm"
            >
              <Icon name="MapPin" size={16} className="mr-2" />
              Офлайн
            </Button>
            <Button
              variant={selectedType === 'free' ? 'default' : 'outline'}
              onClick={() => setSelectedType('free')}
              size="sm"
            >
              <Icon name="Gift" size={16} className="mr-2" />
              Бесплатные
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Icon name="Loader2" size={48} className="mx-auto mb-4 animate-spin text-primary" />
            <p className="text-muted-foreground">Загрузка курсов...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  {course.image_url && (
                    <div className="w-full h-48 overflow-hidden rounded-t-lg">
                      <img 
                        src={course.image_url} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Курс';
                        }}
                      />
                    </div>
                  )}
                  <CardHeader className="flex-1">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <Badge className={getCourseTypeColor(course.course_type)}>
                        {getCourseTypeLabel(course.course_type)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Tag" size={16} className="text-primary" />
                      <span className="text-muted-foreground">{course.category}</span>
                    </div>
                    
                    {course.duration_hours && (
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Clock" size={16} className="text-primary" />
                        <span className="text-muted-foreground">{course.duration_hours} часов</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="text-lg font-bold text-primary">
                        {course.price ? `${course.price.toLocaleString()} ${course.currency}` : 'Бесплатно'}
                      </div>
                      <a href={course.external_url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm">
                          Подробнее
                          <Icon name="ExternalLink" size={16} className="ml-2" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground mb-2">Курсы не найдены</p>
                <p className="text-sm text-muted-foreground">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
