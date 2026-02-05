import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import Icon from '@/components/ui/icon';
import CatalogFilters from './CoursesCatalog/CatalogFilters';
import CatalogItemCard from './CoursesCatalog/CatalogItemCard';
import SchoolsFooter from '@/components/schools/SchoolsFooter';
import { apiCache } from '@/utils/cache';
import { 
  CatalogItem, 
  Course, 
  Mastermind, 
  OfflineTraining,
  COURSE_API_URL,
  COURSE_LANDINGS_API_URL,
  REVIEWS_API_URL,
  PROMOTIONS_API_URL
} from './CoursesCatalog/types';

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
      
      // Используем кеш для всех запросов
      const [coursesData, mastermindsData, offlineTrainingsData] = await Promise.all([
        apiCache.fetch<Course[]>('courses-approved', async () => {
          const response = await fetch(`${COURSE_API_URL}?status=approved`);
          return response.json();
        }),
        apiCache.fetch<Mastermind[]>('masterminds-approved', async () => {
          const response = await fetch(`${COURSE_API_URL}?action=masterminds&status=approved`);
          return response.json();
        }),
        apiCache.fetch<OfflineTraining[]>('trainings-approved', async () => {
          const response = await fetch(`${COURSE_API_URL}?action=offline_trainings&status=approved`);
          return response.json();
        })
      ]);
      
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
      
      const mastermindsWithCovers = mastermindsData.map(m => ({
        ...m,
        image_url: (m as any).cover_url || m.image_url
      }));
      
      const trainingsWithCovers = offlineTrainingsData.map(t => ({
        ...t,
        image_url: (t as any).cover_url || t.image_url
      }));
      
      const getCategoryLabel = (category: string | undefined) => {
        const labels: Record<string, string> = {
          technique: 'Массажные техники',
          business: 'Бизнес и маркетинг',
          soft_skills: 'Общение и психология',
          health: 'Здоровье и безопасность',
          digital: 'Цифровые навыки'
        };
        return labels[category || 'technique'] || 'Массажные техники';
      };

      const allItemsWithoutRatings: CatalogItem[] = [
        ...coursesWithCovers.map(c => ({ ...c, itemType: 'course' as const })),
        ...mastermindsWithCovers.map(m => ({ 
          ...m, 
          itemType: 'mastermind' as const,
          category: getCategoryLabel((m as any).category),
          course_type: 'offline',
          duration_hours: null
        })),
        ...trainingsWithCovers.map(t => ({ 
          ...t, 
          itemType: 'offline_training' as const,
          category: getCategoryLabel((t as any).category),
          course_type: 'offline',
          duration_hours: null
        }))
      ];
      
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
      
      // Функция для генерации стабильного случайного числа на основе ID
      const generateStableRandom = (id: number, seed: number) => {
        const hash = (id * 9301 + seed * 49297) % 233280;
        return hash / 233280;
      };
      
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
          
          // Специальный рейтинг для Мастермайнда в Москве
          if (item.id === 51 && item.itemType === 'mastermind') {
            return { ...item, rating: 5.0, review_count: 141 };
          }
          
          // Генерируем стабильные случайные значения на основе ID курса
          const stableRating = 4.5 + generateStableRandom(item.id, 1) * 0.5; // от 4.5 до 5.0
          const stableReviewCount = Math.floor(50 + generateStableRandom(item.id, 2) * 200); // от 50 до 250
          
          return { ...item, rating: stableRating, review_count: stableReviewCount };
        })
      );
      
      const itemsWithPromo = itemsWithRatings.map(item => {
        const promo = activePromotions.find(p => p.course_id === item.id);
        return {
          ...item,
          has_promotion: !!promo,
          promoted_until: promo?.promoted_until || null,
          promotion_type: promo?.promotion_type || null
        };
      });
      
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

    // Пересортировка с учётом типа промо и выбранной категории
    filtered.sort((a, b) => {
      // all_categories промо всегда первые
      const aIsAllCategories = a.has_promotion && a.promotion_type === 'all_categories';
      const bIsAllCategories = b.has_promotion && b.promotion_type === 'all_categories';
      
      if (aIsAllCategories && !bIsAllCategories) return -1;
      if (!aIsAllCategories && bIsAllCategories) return 1;
      
      // own_category промо в своей категории
      const aIsOwnCategory = a.has_promotion && 
        a.promotion_type === 'own_category' && 
        (selectedCategory === 'Все категории' || a.category === selectedCategory);
      const bIsOwnCategory = b.has_promotion && 
        b.promotion_type === 'own_category' && 
        (selectedCategory === 'Все категории' || b.category === selectedCategory);
      
      if (aIsOwnCategory && !bIsOwnCategory) return -1;
      if (!aIsOwnCategory && bIsOwnCategory) return 1;
      
      // Среди промо сортируем по дате окончания (позже купленные - выше)
      if (a.has_promotion && b.has_promotion) {
        return new Date(b.promoted_until).getTime() - new Date(a.promoted_until).getTime();
      }
      
      // Без промо - по дате создания
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    setFilteredItems(filtered);
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
            Профессиональные курсы массажа и офлайн-мероприятия от лучших школ и экспертов
          </p>
        </div>

        <CatalogFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        {loading ? (
          <div className="text-center py-12">
            <Icon name="Loader2" size={48} className="mx-auto mb-4 animate-spin text-primary" />
            <p className="text-muted-foreground">Загрузка курсов...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {filteredItems.map((item) => (
                <CatalogItemCard key={`${item.itemType}-${item.id}`} item={item} />
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
      <SchoolsFooter />
    </div>
  );
}