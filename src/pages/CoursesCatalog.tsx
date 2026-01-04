import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import RatingDisplay from '@/components/RatingDisplay';

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
  original_price?: number | null;
  discount_price?: number | null;
  view_count?: number;
  created_at: string;
  rating?: number;
  review_count?: number;
  slug?: string;
}

interface Mastermind {
  id: number;
  school_id: number;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  max_participants: number | null;
  price: number | null;
  currency: string;
  image_url: string | null;
  external_url: string;
  status: string;
  original_price?: number | null;
  discount_price?: number | null;
  view_count?: number;
  created_at: string;
  rating?: number;
  review_count?: number;
  slug?: string;
}

interface OfflineTraining {
  id: number;
  school_id: number;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  max_participants: number | null;
  price: number | null;
  currency: string;
  image_url: string | null;
  external_url: string;
  status: string;
  original_price?: number | null;
  discount_price?: number | null;
  view_count?: number;
  created_at: string;
  rating?: number;
  review_count?: number;
  slug?: string;
}

type CatalogItem = (Course & { itemType: 'course' }) | (Mastermind & { itemType: 'mastermind'; category: string; course_type: string }) | (OfflineTraining & { itemType: 'offline_training'; category: string; course_type: string });

const COURSE_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';
const COURSE_LANDINGS_API_URL = 'https://functions.poehali.dev/a81dd7cd-c267-4f44-85f5-0da8353dc741';
const REVIEWS_API_URL = 'https://functions.poehali.dev/dacb9e9b-c76e-4430-8ed9-362ffc8b9566';
const PROMOTIONS_API_URL = 'https://functions.poehali.dev/2ea3a11a-0b11-4f52-9c5e-29fe60c40675';

const CATEGORIES = [
  'Все категории',
  'Классический массаж',
  'Спортивный массаж',
  'Лечебный массаж',
  'SPA массаж',
  'Косметический массаж',
  'Детский массаж',
  'Офлайн мероприятия',
  'Другое'
];

export default function CoursesCatalog() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<CatalogItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все категории');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchQuery, selectedCategory, selectedType, items]);

  const loadAllItems = async () => {
    try {
      setLoading(true);
      
      const [coursesResponse, mastermindsResponse, offlineTrainingsResponse] = await Promise.all([
        fetch(`${COURSE_API_URL}?status=approved`),
        fetch(`${COURSE_API_URL}?action=masterminds&status=approved`),
        fetch(`${COURSE_API_URL}?action=offline_trainings&status=approved`)
      ]);
      
      const coursesData: Course[] = await coursesResponse.json();
      const mastermindsData: Mastermind[] = await mastermindsResponse.json();
      const offlineTrainingsData: OfflineTraining[] = await offlineTrainingsResponse.json();
      
      // Обогащаем курсы обложками из course-landings API
      const coursesWithCovers = await Promise.all(
        coursesData.map(async (course) => {
          if (course.slug) {
            try {
              const landingResponse = await fetch(`${COURSE_LANDINGS_API_URL}?slug=${course.slug}`);
              if (landingResponse.ok) {
                const landingData = await landingResponse.json();
                return { ...course, image_url: landingData.cover_url || course.image_url };
              }
            } catch (error) {
              console.error('Failed to fetch cover for course:', course.slug, error);
            }
          }
          return course;
        })
      );
      
      // Для мастермайндов и очного обучения используем cover_url из API если есть
      const mastermindsWithCovers = mastermindsData.map(m => ({
        ...m,
        image_url: (m as any).cover_url || m.image_url
      }));
      
      const trainingsWithCovers = offlineTrainingsData.map(t => ({
        ...t,
        image_url: (t as any).cover_url || t.image_url
      }));
      
      const allItemsWithoutRatings: CatalogItem[] = [
        ...coursesWithCovers.map(c => ({ ...c, itemType: 'course' as const })),
        ...mastermindsWithCovers.map(m => ({ 
          ...m, 
          itemType: 'mastermind' as const,
          category: 'Офлайн мероприятия',
          course_type: 'offline',
          duration_hours: null
        })),
        ...trainingsWithCovers.map(t => ({ 
          ...t, 
          itemType: 'offline_training' as const,
          category: 'Офлайн мероприятия',
          course_type: 'offline',
          duration_hours: null
        }))
      ];
      
      // Загружаем активные промо для всех курсов/мастермайндов/обучений
      let activePromotions: any[] = [];
      try {
        const promoResponse = await fetch(`${PROMOTIONS_API_URL}?action=active_all`);
        if (promoResponse.ok) {
          const promoData = await promoResponse.json();
          activePromotions = promoData.promotions || [];
        }
      } catch (error) {
        console.error('Failed to load promotions:', error);
      }
      
      const itemsWithRatings = await Promise.all(
        allItemsWithoutRatings.map(async (item) => {
          try {
            const response = await fetch(
              `${REVIEWS_API_URL}?entity_type=${item.itemType}&entity_id=${item.id}`
            );
            if (response.ok) {
              const reviews = await response.json();
              if (reviews.length > 0) {
                const avgRating = reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length;
                return { ...item, rating: avgRating, review_count: reviews.length };
              }
            }
          } catch (error) {
            console.error('Failed to load reviews for item:', item.id, error);
          }
          return { ...item, rating: 0, review_count: 0 };
        })
      );
      
      // Добавляем информацию о промо и сортируем
      const itemsWithPromo = itemsWithRatings.map(item => {
        const promo = activePromotions.find(p => p.course_id === item.id);
        return {
          ...item,
          has_promotion: !!promo,
          promoted_until: promo?.promoted_until || null,
          promotion_type: promo?.promotion_type || null
        };
      });
      
      // Сортируем: сначала с промо (по дате окончания), потом без промо (по дате создания)
      itemsWithPromo.sort((a, b) => {
        if (a.has_promotion && !b.has_promotion) return -1;
        if (!a.has_promotion && b.has_promotion) return 1;
        if (a.has_promotion && b.has_promotion) {
          return new Date(b.promoted_until).getTime() - new Date(a.promoted_until).getTime();
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      
      setItems(itemsWithPromo);
    } catch (error) {
      console.error('Load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = [...items];

    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'Все категории') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.course_type === selectedType);
    }

    setFilteredItems(filtered);
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
            Каталог курсов и мастермайндов
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Профессиональные курсы массажа и офлайн-мероприятия от лучших школ и экспертов
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
              {filteredItems.map((item) => (
                <Card key={`${item.itemType}-${item.id}`} className="hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">
                  <div className="w-full h-56 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-90"></div>
                    <img 
                      src={item.image_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800';
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={getCourseTypeColor(item.course_type) + ' shadow-lg'}>
                        {item.itemType === 'mastermind' ? 'Мастермайнд' : item.itemType === 'offline_training' ? 'Очное обучение' : getCourseTypeLabel(item.course_type)}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="flex-1 pb-3">
                    <CardTitle className="text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</CardTitle>
                    <div className="mb-3">
                      <RatingDisplay 
                        rating={item.rating || 0} 
                        reviewCount={item.review_count || 0} 
                        size="sm" 
                      />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{item.description || 'Профессиональное обучение массажу с практикой и поддержкой опытных наставников.'}</p>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950 px-2 py-1.5 rounded-lg">
                        <Icon name="Tag" size={14} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span className="text-blue-700 dark:text-blue-300 truncate">{item.category}</span>
                      </div>
                      {item.itemType === 'mastermind' || item.itemType === 'offline_training' ? (
                        <div className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950 px-2 py-1.5 rounded-lg">
                          <Icon name="Calendar" size={14} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
                          <span className="text-purple-700 dark:text-purple-300 truncate">
                            {new Date(item.event_date).toLocaleDateString('ru-RU', { 
                              day: 'numeric', 
                              month: 'short'
                            })}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-950 px-2 py-1.5 rounded-lg">
                          <Icon name="Clock" size={14} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-green-700 dark:text-green-300 truncate">
                            {item.duration_hours ? `${item.duration_hours} ч` : '3 месяца'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {(item.itemType === 'mastermind' || item.itemType === 'offline_training') && item.location && (
                      <div className="flex items-center gap-2 text-xs bg-amber-50 dark:bg-amber-950 px-2 py-1.5 rounded-lg">
                        <Icon name="MapPin" size={14} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
                        <span className="text-amber-700 dark:text-amber-300 truncate">{item.location}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t mt-3">
                      <div>
                        {item.discount_price ? (
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground line-through">
                              {item.original_price?.toLocaleString()} ₽
                            </span>
                            <span className="text-2xl font-bold text-red-600">
                              {item.discount_price.toLocaleString()} ₽
                            </span>
                          </div>
                        ) : item.price ? (
                          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {item.price.toLocaleString()} ₽
                          </span>
                        ) : (
                          <span className="text-2xl font-bold text-green-600">Бесплатно</span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        className="group-hover:bg-primary group-hover:shadow-lg transition-all"
                        onClick={() => {
                          if (item.itemType === 'mastermind') {
                            if ('slug' in item && item.slug) {
                              window.location.href = `/mastermind/landing/${item.slug}`;
                            } else {
                              window.location.href = `/mastermind/${item.id}`;
                            }
                          } else if (item.itemType === 'offline_training') {
                            if ('slug' in item && item.slug) {
                              window.location.href = `/offline-training/${item.slug}`;
                            }
                          } else if ('slug' in item && item.slug) {
                            window.location.href = `/course/landing/${item.slug}`;
                          } else {
                            window.location.href = `/course/${item.id}`;
                          }
                        }}
                      >
                        Подробнее
                        <Icon name="ArrowRight" size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredItems.length === 0 && (
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