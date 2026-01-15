import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserId } from '@/utils/auth';
import { Course, Mastermind, COURSE_API_URL } from './types';

export function useDashboardState(toast: any) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState<'courses' | 'masterminds' | 'offline-training' | 'promo-requests' | 'subscription'>('courses');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [editingMastermindId, setEditingMastermindId] = useState<number | null>(null);
  const [editingTrainingId, setEditingTrainingId] = useState<number | null>(null);

  
  const [courses, setCourses] = useState<Course[]>([]);
  const [masterminds, setMasterminds] = useState<Mastermind[]>([]);
  const [offlineTrainings, setOfflineTrainings] = useState<any[]>([]);

  const [landings, setLandings] = useState<any[]>([]);
  const [schoolId, setSchoolId] = useState<number | null>(null);
  
  const [promoteCourseId, setPromoteCourseId] = useState<number | null>(null);
  const [promoteCourseTitle, setPromoteCourseTitle] = useState('');
  const [promoteCourseCategory, setPromoteCourseCategory] = useState('');
  
  const [promoteMastermindId, setPromoteMastermindId] = useState<number | null>(null);
  const [promoteMastermindTitle, setPromoteMastermindTitle] = useState('');
  
  const [promoteTrainingId, setPromoteTrainingId] = useState<number | null>(null);
  const [promoteTrainingTitle, setPromoteTrainingTitle] = useState('');
  const [pendingPromoRequestsCount, setPendingPromoRequestsCount] = useState(0);
  const [canPromoteToTop, setCanPromoteToTop] = useState(false);

  const loadUserSchool = async () => {
    try {
      const userId = getUserId();

      if (!userId) {
        toast({ title: 'Требуется авторизация', variant: 'destructive' });
        navigate('/login');
        return;
      }

      const response = await fetch('https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86?action=my_schools', {
        headers: { 'X-User-Id': userId }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.schools && data.schools.length > 0) {
          setSchoolId(data.schools[0].id);
        }
      }

      // Загружаем тариф школы
      const subRes = await fetch(`https://functions.poehali.dev/f81f82f7-d9c7-4858-87bc-6701c67f2187?action=my_subscription`, {
        headers: { 'X-User-Id': userId }
      });
      if (subRes.ok) {
        const subData = await subRes.json();
        const plan = subData.subscription?.plan;
        // Базовый тариф не может поднимать в топ (top_promotions_limit=0 или null)
        // Доступно только если top_promotions_limit > 0
        setCanPromoteToTop(plan?.top_promotions_limit > 0);
      }
    } catch (error) {
      console.error('Load school error:', error);
    }
  };

  const loadData = async () => {
    if (!schoolId) return;
    
    try {
      // Загружаем активные промо
      const userId = getUserId();
      let activePromotions: any[] = [];
      try {
        const promoResponse = await fetch('https://functions.poehali.dev/2ea3a11a-0b11-4f52-9c5e-29fe60c40675?action=active', {
          headers: { 'X-User-Id': userId }
        });
        if (promoResponse.ok) {
          const promoData = await promoResponse.json();
          activePromotions = promoData.promotions || [];
        }
      } catch (error) {
        console.error('Failed to load promotions:', error);
      }
      
      if (activeTab === 'courses') {
        const response = await fetch(`${COURSE_API_URL}?type=courses&school_id=${schoolId}&status=all`);
        const data = await response.json();
        // Маппинг данных из courses API в формат Course
        const mappedCourses = data.map((c: any) => {
          const promo = activePromotions.find(p => p.course_id === c.id);
          return {
            id: c.id,
            title: c.title,
            description: c.description || '',
            category: c.category || '',
            course_type: c.course_type || 'online',
            price: c.price,
            currency: c.currency || 'RUB',
            duration_hours: c.duration_hours,
            image_url: c.image_url || null,
            external_url: c.external_url || '',
            status: c.status,
            slug: c.slug,
            created_at: c.created_at,
            view_count: c.view_count || 0,
            promoted_until: promo?.promoted_until || null,
            promotion_type: promo?.promotion_type || null,
            original_price: c.original_price,
            discount_price: c.discount_price,
            moderation_comment: c.moderation_comment
          };
        });
        setCourses(mappedCourses);
      } else if (activeTab === 'masterminds') {
        const response = await fetch(`${COURSE_API_URL}?action=masterminds&school_id=${schoolId}&status=all`);
        const data = await response.json();
        // Добавляем информацию о промо
        const dataWithPromo = data.map((item: any) => {
          const promo = activePromotions.find(p => p.course_id === item.id);
          return {
            ...item,
            promoted_until: promo?.promoted_until || null,
            promotion_type: promo?.promotion_type || null
          };
        });
        setMasterminds(dataWithPromo);
      } else if (activeTab === 'offline-training') {
        const response = await fetch(`${COURSE_API_URL}?action=offline_trainings&school_id=${schoolId}&status=all`);
        if (response.ok) {
          const data = await response.json();
          // Добавляем информацию о промо
          const dataWithPromo = (Array.isArray(data) ? data : []).map((item: any) => {
            const promo = activePromotions.find(p => p.course_id === item.id);
            return {
              ...item,
              promoted_until: promo?.promoted_until || null,
              promotion_type: promo?.promotion_type || null
            };
          });
          setOfflineTrainings(dataWithPromo);
        } else {
          setOfflineTrainings([]);
        }
      } else if (activeTab === 'landings') {
        const userId = getUserId();
        const response = await fetch(`https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86?action=my_schools`, {
          headers: { 'X-User-Id': userId }
        });
        if (response.ok) {
          const data = await response.json();
          setLandings(data.schools || []);
        } else {
          setLandings([]);
        }
      }
    } catch (error) {
      console.error('Load error:', error);
      toast({ title: 'Ошибка загрузки', description: 'Не удалось загрузить данные', variant: 'destructive' });
    }
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setShowAddForm(false);
  };

  useEffect(() => {
    loadUserSchool();
    
    // Обработка URL параметра для переключения вкладки
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['courses', 'masterminds', 'offline-training', 'promo-requests', 'subscription'].includes(tabParam)) {
      setActiveTab(tabParam as typeof activeTab);
    }
    
    // Показываем сообщение об успешной отправке курса на модерацию
    if (location.state?.successMessage) {
      toast({
        title: "✅ Успешно!",
        description: location.state.successMessage,
        duration: 5000
      });
      // Очищаем state после показа
      window.history.replaceState({}, document.title);
    }
  }, []);

  useEffect(() => {
    if (schoolId) {
      loadData();
    }
  }, [activeTab, schoolId]);

  return {
    activeTab,
    setActiveTab,
    showAddForm,
    setShowAddForm,
    editingCourseId,
    setEditingCourseId,
    editingMastermindId,
    setEditingMastermindId,
    editingTrainingId,
    setEditingTrainingId,

    courses,
    setCourses,
    masterminds,
    setMasterminds,
    offlineTrainings,
    setOfflineTrainings,

    setSpecialists,
    landings,
    setLandings,
    schoolId,
    setSchoolId,
    promoteCourseId,
    setPromoteCourseId,
    promoteCourseTitle,
    setPromoteCourseTitle,
    promoteCourseCategory,
    setPromoteCourseCategory,
    promoteMastermindId,
    setPromoteMastermindId,
    promoteMastermindTitle,
    setPromoteMastermindTitle,
    promoteTrainingId,
    setPromoteTrainingId,
    promoteTrainingTitle,
    setPromoteTrainingTitle,
    pendingPromoRequestsCount,
    setPendingPromoRequestsCount,
    canPromoteToTop,
    loadData,
    handleTabChange
  };
}