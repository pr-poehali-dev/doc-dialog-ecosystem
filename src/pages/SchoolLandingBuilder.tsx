import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { getUserId } from '@/utils/auth';

interface LandingData {
  name: string;
  shortDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  logoUrl: string;
  coverUrl: string;
  advantages: string[];
  courses: Array<{
    title: string;
    duration: string;
    price: string;
    description: string;
  }>;
  teachers: Array<{
    name: string;
    specialization: string;
    experience: string;
    photo: string;
  }>;
  gallery: string[];
  contacts: {
    city: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    whatsapp: string;
    vk: string;
    max_url: string;
  };
  testimonials: Array<{
    name: string;
    text: string;
    rating: number;
  }>;
  stats: {
    studentsCount: string;
    yearsExperience: string;
    coursesCount: string;
    rating: string;
  };
}

const SCHOOL_API_URL = 'https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86';

export default function SchoolLandingBuilder() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<LandingData>({
    name: '',
    shortDescription: '',
    heroTitle: '',
    heroSubtitle: '',
    aboutText: '',
    logoUrl: '',
    coverUrl: '',
    advantages: ['', '', '', ''],
    courses: [{ title: '', duration: '', price: '', description: '' }],
    teachers: [{ name: '', specialization: '', experience: '', photo: '' }],
    gallery: ['', '', '', ''],
    contacts: {
      city: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      whatsapp: '',
      vk: '',
      max_url: ''
    },
    testimonials: [{ name: '', text: '', rating: 5 }],
    stats: {
      studentsCount: '',
      yearsExperience: '',
      coursesCount: '',
      rating: '5.0'
    }
  });

  useEffect(() => {
    if (id) {
      loadSchoolData();
    }
  }, [id]);

  const loadSchoolData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const userId = getUserId();
      
      if (!userId) {
        console.error('User ID not found');
        navigate('/login');
        return;
      }

      const response = await fetch(`${SCHOOL_API_URL}?action=edit&id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Id': userId
        }
      });

      if (response.ok) {
        const schoolData = await response.json();
        
        // Преобразуем достижения
        const advantages = schoolData.achievements?.map((a: any) => a.title) || ['', '', '', ''];
        while (advantages.length < 4) advantages.push('');
        
        // Преобразуем преподавателей
        const teachers = schoolData.teachers?.map((t: any) => ({
          name: t.name || '',
          specialization: t.specialization || '',
          experience: t.experience_years ? `${t.experience_years} лет` : '',
          photo: t.photo_url || ''
        })) || [];
        
        // Преобразуем галерею
        const gallery = schoolData.gallery?.map((g: any) => g.image_url) || [];
        while (gallery.length < 4) gallery.push('');
        
        // Преобразуем отзывы
        const testimonials = schoolData.reviews?.map((r: any) => ({
          name: r.author_name || '',
          text: r.review_text || '',
          rating: r.rating || 5
        })) || [];
        
        setData({
          name: schoolData.name || '',
          shortDescription: schoolData.short_description || '',
          heroTitle: schoolData.name || '',
          heroSubtitle: schoolData.short_description || '',
          aboutText: schoolData.about_school || schoolData.description || '',
          logoUrl: schoolData.logo_url || '',
          coverUrl: schoolData.cover_url || '',
          advantages,
          courses: [{ title: '', duration: '', price: '', description: '' }],
          teachers,
          gallery,
          contacts: {
            city: schoolData.city || '',
            address: schoolData.address || '',
            phone: schoolData.phone || '',
            email: schoolData.email || '',
            website: schoolData.website || '',
            whatsapp: schoolData.whatsapp || '',
            vk: schoolData.vk || '',
            max_url: schoolData.max_url || ''
          },
          testimonials,
          stats: {
            studentsCount: schoolData.students_count?.toString() || '',
            yearsExperience: schoolData.founded_year ? (new Date().getFullYear() - schoolData.founded_year).toString() : '',
            coursesCount: '',
            rating: schoolData.rating?.toString() || '5.0'
          }
        });
      } else {
        console.error('Failed to load school data:', await response.text());
      }
    } catch (error) {
      console.error('Ошибка загрузки школы:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (path: string, value: any) => {
    const keys = path.split('.');
    setData((prev) => {
      const updated = { ...prev };
      let current: any = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const addCourse = () => {
    setData((prev) => ({
      ...prev,
      courses: [...prev.courses, { title: '', duration: '', price: '', description: '' }]
    }));
  };

  const addTeacher = () => {
    setData((prev) => ({
      ...prev,
      teachers: [...prev.teachers, { name: '', specialization: '', experience: '', photo: '' }]
    }));
  };

  const addTestimonial = () => {
    setData((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { name: '', text: '', rating: 5 }]
    }));
  };

  const handleGenerate = () => {
    setPreview(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const userId = getUserId();
      
      if (!userId) {
        alert('Ошибка: не удалось получить ID пользователя. Пожалуйста, войдите снова.');
        navigate('/login');
        return;
      }
      
      const url = id ? `${SCHOOL_API_URL}?action=update&id=${id}` : SCHOOL_API_URL;
      const method = id ? 'PUT' : 'POST';

      // Генерируем slug из названия
      const generateSlug = (name: string) => {
        return name
          .toLowerCase()
          .replace(/[^а-яa-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
      };

      // Преобразуем данные в формат, который ожидает backend
      const schoolData = {
        name: data.name,
        slug: generateSlug(data.name),
        short_description: data.shortDescription,
        description: data.aboutText,
        logo_url: data.logoUrl || null,
        cover_url: data.coverUrl || null,
        city: data.contacts.city,
        address: data.contacts.address,
        phone: data.contacts.phone,
        email: data.contacts.email,
        website: data.contacts.website,
        whatsapp: data.contacts.whatsapp,
        vk: data.contacts.vk,
        max_url: data.contacts.max_url,
        students_count: parseInt(data.stats.studentsCount) || null,
        founded_year: data.stats.yearsExperience ? new Date().getFullYear() - parseInt(data.stats.yearsExperience) : null
      };

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Id': userId.toString(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(schoolData)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Лендинг школы сохранён!');
        // Переходим на публичный лендинг школы
        if (result.slug) {
          navigate(`/school/${result.slug}`);
        } else {
          navigate('/school/dashboard');
        }
      } else {
        const error = await response.text();
        console.error('Server error:', error);
        alert('Ошибка сохранения лендинга');
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка сохранения лендинга');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Icon name="Loader2" size={48} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (preview) {
    return (
      <div className="min-h-screen bg-white">
        {/* Навигация с кнопками */}
        <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Button variant="outline" onClick={() => setPreview(false)}>
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Редактировать
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Icon name="Check" size={18} className="mr-2" />
              Опубликовать лендинг
            </Button>
          </div>
        </div>

        {/* Hero секция */}
        <section 
          className="relative h-[600px] flex items-center justify-center text-white"
          style={{
            backgroundImage: data.coverUrl ? `url(${data.coverUrl})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-center px-4 max-w-4xl">
            {data.logoUrl && (
              <img src={data.logoUrl} alt="Логотип" className="h-20 mx-auto mb-6 object-contain" />
            )}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              {data.heroTitle || 'Название школы'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
              {data.heroSubtitle || 'Подзаголовок'}
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg">
              Записаться на курс
            </Button>
          </div>
        </section>

        {/* Статистика */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {data.stats.studentsCount && (
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {data.stats.studentsCount}+
                  </div>
                  <div className="text-gray-600">Студентов обучено</div>
                </div>
              )}
              {data.stats.yearsExperience && (
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {data.stats.yearsExperience}
                  </div>
                  <div className="text-gray-600">Лет опыта</div>
                </div>
              )}
              {data.stats.coursesCount && (
                <div>
                  <div className="text-4xl font-bold text-pink-600 mb-2">
                    {data.stats.coursesCount}
                  </div>
                  <div className="text-gray-600">Курсов</div>
                </div>
              )}
              {data.stats.rating && (
                <div>
                  <div className="text-4xl font-bold text-amber-600 mb-2">
                    {data.stats.rating}
                  </div>
                  <div className="text-gray-600">Рейтинг</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* О школе */}
        {data.aboutText && (
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">О школе</h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {data.aboutText}
              </p>
            </div>
          </section>
        )}

        {/* Преимущества */}
        {data.advantages.some(a => a.trim()) && (
          <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">Наши преимущества</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {data.advantages.filter(a => a.trim()).map((adv, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                      <Icon name="Check" size={24} className="text-white" />
                    </div>
                    <p className="text-gray-800 font-medium">{adv}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Курсы */}
        {data.courses.some(c => c.title) && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">Наши курсы</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.courses.filter(c => c.title).map((course, i) => (
                  <Card key={i} className="hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        {course.duration && (
                          <div className="flex items-center text-gray-600">
                            <Icon name="Clock" size={18} className="mr-2" />
                            {course.duration}
                          </div>
                        )}
                        {course.price && (
                          <div className="flex items-center text-gray-600">
                            <Icon name="Coins" size={18} className="mr-2" />
                            {course.price}
                          </div>
                        )}
                      </div>
                      {course.description && (
                        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                      )}
                      <Button className="w-full">Подробнее</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Преподаватели */}
        {data.teachers.some(t => t.name) && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">Наши преподаватели</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.teachers.filter(t => t.name).map((teacher, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 text-center shadow-md">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center overflow-hidden">
                      {teacher.photo ? (
                        <img src={teacher.photo} alt={teacher.name} className="w-full h-full object-cover" />
                      ) : (
                        <Icon name="User" size={48} className="text-white" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{teacher.name}</h3>
                    <p className="text-purple-600 mb-2">{teacher.specialization}</p>
                    <p className="text-sm text-gray-600">{teacher.experience}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Отзывы */}
        {data.testimonials.some(t => t.text) && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">Отзывы студентов</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.testimonials.filter(t => t.text).map((testimonial, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <div className="flex mb-3">
                        {Array.from({ length: testimonial.rating }).map((_, j) => (
                          <Icon key={j} name="Star" size={18} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                      <p className="font-semibold">— {testimonial.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Галерея */}
        {data.gallery.some(g => g.trim()) && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">Галерея</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.gallery.filter(g => g.trim()).map((img, i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden">
                    <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Контакты и CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Начните обучение прямо сейчас!</h2>
            <p className="text-xl mb-8 text-white/90">
              Записывайтесь на курсы и станьте профессиональным массажистом
            </p>
            <div className="space-y-4 mb-8">
              {data.contacts.phone && (
                <div className="flex items-center justify-center">
                  <Icon name="Phone" size={20} className="mr-2" />
                  <a href={`tel:${data.contacts.phone}`} className="text-lg hover:underline">
                    {data.contacts.phone}
                  </a>
                </div>
              )}
              {data.contacts.email && (
                <div className="flex items-center justify-center">
                  <Icon name="Mail" size={20} className="mr-2" />
                  <a href={`mailto:${data.contacts.email}`} className="text-lg hover:underline">
                    {data.contacts.email}
                  </a>
                </div>
              )}
              {data.contacts.address && (
                <div className="flex items-center justify-center">
                  <Icon name="MapPin" size={20} className="mr-2" />
                  <span className="text-lg">{data.contacts.city}, {data.contacts.address}</span>
                </div>
              )}
            </div>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Записаться на консультацию
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3">Создайте лендинг вашей школы</h1>
          <p className="text-gray-600">Заполните форму, и мы автоматически создадим профессиональный лендинг</p>
        </div>

        {/* Индикатор шагов */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                {s < 4 && <div className={`w-12 h-1 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Шаг 1: Основная информация */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Шаг 1: Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Название школы *</Label>
                <Input
                  value={data.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Академия массажа Гармония"
                />
              </div>
              <div>
                <Label>Краткое описание</Label>
                <Input
                  value={data.shortDescription}
                  onChange={(e) => updateField('shortDescription', e.target.value)}
                  placeholder="Профессиональное обучение массажу с 2010 года"
                />
              </div>
              <div>
                <Label>Заголовок на главной странице *</Label>
                <Input
                  value={data.heroTitle}
                  onChange={(e) => updateField('heroTitle', e.target.value)}
                  placeholder="Станьте профессиональным массажистом"
                />
              </div>
              <div>
                <Label>Подзаголовок</Label>
                <Input
                  value={data.heroSubtitle}
                  onChange={(e) => updateField('heroSubtitle', e.target.value)}
                  placeholder="Обучение с нуля до трудоустройства за 3 месяца"
                />
              </div>
              <div>
                <Label>Ссылка на логотип школы</Label>
                <Input
                  value={data.logoUrl}
                  onChange={(e) => updateField('logoUrl', e.target.value)}
                  placeholder="https://example.com/logo.png"
                  type="url"
                />
                <p className="text-xs text-muted-foreground mt-1">Используется в шапке лендинга</p>
              </div>
              <div>
                <Label>Ссылка на фото для шапки</Label>
                <Input
                  value={data.coverUrl}
                  onChange={(e) => updateField('coverUrl', e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                  type="url"
                />
                <p className="text-xs text-muted-foreground mt-1">Фон первого экрана (рекомендуем 1920x800px)</p>
              </div>
              <div>
                <Label>О школе (подробное описание)</Label>
                <Textarea
                  value={data.aboutText}
                  onChange={(e) => updateField('aboutText', e.target.value)}
                  rows={6}
                  placeholder="Расскажите о вашей школе, миссии, истории, достижениях..."
                />
              </div>

              <div className="pt-4">
                <h3 className="font-semibold mb-3">Статистика школы</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Количество студентов</Label>
                    <Input
                      value={data.stats.studentsCount}
                      onChange={(e) => updateField('stats.studentsCount', e.target.value)}
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <Label>Лет опыта</Label>
                    <Input
                      value={data.stats.yearsExperience}
                      onChange={(e) => updateField('stats.yearsExperience', e.target.value)}
                      placeholder="15"
                    />
                  </div>
                  <div>
                    <Label>Курсов</Label>
                    <Input
                      value={data.stats.coursesCount}
                      onChange={(e) => updateField('stats.coursesCount', e.target.value)}
                      placeholder="12"
                    />
                  </div>
                  <div>
                    <Label>Рейтинг</Label>
                    <Input
                      value={data.stats.rating}
                      onChange={(e) => updateField('stats.rating', e.target.value)}
                      placeholder="4.9"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Шаг 2: Преимущества и курсы */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Шаг 2: Преимущества и курсы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Преимущества школы (до 4 штук)</h3>
                {data.advantages.map((adv, i) => (
                  <div key={i} className="mb-2">
                    <Input
                      value={adv}
                      onChange={(e) => {
                        const newAdv = [...data.advantages];
                        newAdv[i] = e.target.value;
                        updateField('advantages', newAdv);
                      }}
                      placeholder={`Преимущество ${i + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Курсы</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addCourse}>
                    <Icon name="Plus" size={16} className="mr-1" />
                    Добавить курс
                  </Button>
                </div>
                {data.courses.map((course, i) => (
                  <Card key={i} className="mb-4">
                    <CardContent className="pt-4 space-y-3">
                      <Input
                        value={course.title}
                        onChange={(e) => {
                          const newCourses = [...data.courses];
                          newCourses[i].title = e.target.value;
                          updateField('courses', newCourses);
                        }}
                        placeholder="Название курса"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          value={course.duration}
                          onChange={(e) => {
                            const newCourses = [...data.courses];
                            newCourses[i].duration = e.target.value;
                            updateField('courses', newCourses);
                          }}
                          placeholder="Длительность (3 месяца)"
                        />
                        <Input
                          value={course.price}
                          onChange={(e) => {
                            const newCourses = [...data.courses];
                            newCourses[i].price = e.target.value;
                            updateField('courses', newCourses);
                          }}
                          placeholder="Цена (45 000 ₽)"
                        />
                      </div>
                      <Textarea
                        value={course.description}
                        onChange={(e) => {
                          const newCourses = [...data.courses];
                          newCourses[i].description = e.target.value;
                          updateField('courses', newCourses);
                        }}
                        placeholder="Краткое описание курса"
                        rows={2}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Шаг 3: Преподаватели и отзывы */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Шаг 3: Преподаватели и отзывы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Преподаватели</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addTeacher}>
                    <Icon name="Plus" size={16} className="mr-1" />
                    Добавить преподавателя
                  </Button>
                </div>
                {data.teachers.map((teacher, i) => (
                  <Card key={i} className="mb-4">
                    <CardContent className="pt-4 space-y-3">
                      <Input
                        value={teacher.name}
                        onChange={(e) => {
                          const newTeachers = [...data.teachers];
                          newTeachers[i].name = e.target.value;
                          updateField('teachers', newTeachers);
                        }}
                        placeholder="Имя преподавателя"
                      />
                      <Input
                        value={teacher.specialization}
                        onChange={(e) => {
                          const newTeachers = [...data.teachers];
                          newTeachers[i].specialization = e.target.value;
                          updateField('teachers', newTeachers);
                        }}
                        placeholder="Специализация"
                      />
                      <Input
                        value={teacher.experience}
                        onChange={(e) => {
                          const newTeachers = [...data.teachers];
                          newTeachers[i].experience = e.target.value;
                          updateField('teachers', newTeachers);
                        }}
                        placeholder="Опыт работы"
                      />
                      <Input
                        value={teacher.photo}
                        onChange={(e) => {
                          const newTeachers = [...data.teachers];
                          newTeachers[i].photo = e.target.value;
                          updateField('teachers', newTeachers);
                        }}
                        placeholder="URL фото (опционально)"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Отзывы студентов</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addTestimonial}>
                    <Icon name="Plus" size={16} className="mr-1" />
                    Добавить отзыв
                  </Button>
                </div>
                {data.testimonials.map((testimonial, i) => (
                  <Card key={i} className="mb-4">
                    <CardContent className="pt-4 space-y-3">
                      <Input
                        value={testimonial.name}
                        onChange={(e) => {
                          const newTestimonials = [...data.testimonials];
                          newTestimonials[i].name = e.target.value;
                          updateField('testimonials', newTestimonials);
                        }}
                        placeholder="Имя студента"
                      />
                      <Textarea
                        value={testimonial.text}
                        onChange={(e) => {
                          const newTestimonials = [...data.testimonials];
                          newTestimonials[i].text = e.target.value;
                          updateField('testimonials', newTestimonials);
                        }}
                        placeholder="Текст отзыва"
                        rows={3}
                      />
                      <div>
                        <Label>Рейтинг (1-5)</Label>
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          value={testimonial.rating}
                          onChange={(e) => {
                            const newTestimonials = [...data.testimonials];
                            newTestimonials[i].rating = parseInt(e.target.value) || 5;
                            updateField('testimonials', newTestimonials);
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Шаг 4: Контакты и галерея */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Шаг 4: Контакты и галерея</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Контактная информация</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Город</Label>
                      <Input
                        value={data.contacts.city}
                        onChange={(e) => updateField('contacts.city', e.target.value)}
                        placeholder="Москва"
                      />
                    </div>
                    <div>
                      <Label>Адрес</Label>
                      <Input
                        value={data.contacts.address}
                        onChange={(e) => updateField('contacts.address', e.target.value)}
                        placeholder="ул. Тверская, 10"
                      />
                    </div>
                  </div>
                  <Input
                    value={data.contacts.phone}
                    onChange={(e) => updateField('contacts.phone', e.target.value)}
                    placeholder="Телефон: +7 (999) 123-45-67"
                  />
                  <Input
                    value={data.contacts.email}
                    onChange={(e) => updateField('contacts.email', e.target.value)}
                    placeholder="Email: info@school.ru"
                  />
                  <Input
                    value={data.contacts.website}
                    onChange={(e) => updateField('contacts.website', e.target.value)}
                    placeholder="Сайт: https://school.ru"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Социальные сети</h3>
                <div className="space-y-3">
                  <div>
                    <Label>WhatsApp (номер телефона)</Label>
                    <Input
                      value={data.contacts.whatsapp}
                      onChange={(e) => updateField('contacts.whatsapp', e.target.value)}
                      placeholder="+79991234567"
                    />
                  </div>
                  <div>
                    <Label>VK (ссылка на группу или профиль)</Label>
                    <Input
                      value={data.contacts.vk}
                      onChange={(e) => updateField('contacts.vk', e.target.value)}
                      placeholder="https://vk.com/yourschool"
                    />
                  </div>
                  <div>
                    <Label>МАКС (ссылка на профиль)</Label>
                    <Input
                      value={data.contacts.max_url}
                      onChange={(e) => updateField('contacts.max_url', e.target.value)}
                      placeholder="https://max.ru/yourschool"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Галерея (до 4 фотографий)</h3>
                <p className="text-sm text-gray-600 mb-3">Укажите URL изображений вашей школы</p>
                {data.gallery.map((img, i) => (
                  <div key={i} className="mb-2">
                    <Input
                      value={img}
                      onChange={(e) => {
                        const newGallery = [...data.gallery];
                        newGallery[i] = e.target.value;
                        updateField('gallery', newGallery);
                      }}
                      placeholder={`URL фото ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Навигация по шагам */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => {
              if (step === 1) {
                navigate('/school/dashboard');
              } else {
                setStep(Math.max(1, step - 1));
              }
            }}
          >
            <Icon name="ChevronLeft" size={18} className="mr-2" />
            Назад
          </Button>

          {step < 4 ? (
            <Button onClick={() => setStep(Math.min(4, step + 1))}>
              Далее
              <Icon name="ChevronRight" size={18} className="ml-2" />
            </Button>
          ) : (
            <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700">
              <Icon name="Eye" size={18} className="mr-2" />
              Посмотреть результат
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}