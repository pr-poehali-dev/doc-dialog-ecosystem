import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const SCHOOLS_API_URL = 'https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86';

interface SchoolData {
  id: number;
  name: string;
  short_description: string;
  description: string;
  logo_url: string;
  cover_url: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  whatsapp: string;
  telegram: string;
  vk: string;
  instagram: string;
  license_number: string;
  is_author_school: boolean;
  founded_year: number;
  students_count: number;
  teachers_count: number;
  mission: string;
  about_school: string;
  why_choose_us: string;
  cta_button_text: string;
  cta_button_url: string;
  rating: number;
  reviews_count: number;
  seo_title: string;
  seo_description: string;
  achievements: Array<{ title: string; description: string; icon_name: string }>;
  teachers: Array<{ name: string; position: string; bio: string; photo_url: string; experience_years: number; specialization: string }>;
  reviews: Array<{ author_name: string; author_photo_url: string; rating: number; review_text: string; course_name: string; created_at: string }>;
  gallery: Array<{ image_url: string; caption: string }>;
}

export default function SchoolLanding() {
  const { slug } = useParams<{ slug: string }>();
  const [school, setSchool] = useState<SchoolData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchool();
  }, [slug]);

  const fetchSchool = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${SCHOOLS_API_URL}/slug/${slug}`);
      if (!response.ok) throw new Error('Школа не найдена');
      const data = await response.json();
      setSchool(data);
      
      // SEO
      if (data.seo_title) document.title = data.seo_title;
      if (data.seo_description) {
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute('content', data.seo_description);
      }
    } catch (error) {
      console.error('Ошибка загрузки школы:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertCircle" size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Школа не найдена</h2>
          <p className="text-gray-600">Проверьте правильность ссылки</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Обложка */}
      <section className="relative h-[500px] bg-gradient-to-br from-blue-600 to-indigo-700">
        {school.cover_url && (
          <img
            src={school.cover_url}
            alt={school.name}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <div className="flex items-center gap-4 mb-6">
            {school.logo_url && (
              <img
                src={school.logo_url}
                alt={school.name}
                className="w-24 h-24 rounded-xl bg-white p-2 shadow-lg"
              />
            )}
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-2">{school.name}</h1>
              {school.short_description && (
                <p className="text-xl opacity-90">{school.short_description}</p>
              )}
            </div>
          </div>
          
          {/* Рейтинг и контакты */}
          <div className="flex flex-wrap gap-4 items-center text-white">
            {school.rating > 0 && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Icon name="Star" size={20} className="text-amber-400" />
                <span className="font-semibold">{school.rating.toFixed(1)}</span>
                <span className="opacity-80">({school.reviews_count} отзывов)</span>
              </div>
            )}
            
            {school.city && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Icon name="MapPin" size={20} />
                <span>{school.city}</span>
              </div>
            )}
            
            {!school.is_author_school && school.license_number && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Icon name="ShieldCheck" size={20} />
                <span>Лицензия {school.license_number}</span>
              </div>
            )}
            
            {school.is_author_school && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Icon name="Award" size={20} />
                <span>Авторская школа</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* О школе */}
        {school.about_school && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">О школе</h2>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{school.about_school}</p>
          </section>
        )}

        {/* Достижения */}
        {school.achievements.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Наши достижения</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {school.achievements.map((ach, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
                  {ach.icon_name && <Icon name={ach.icon_name} size={48} className="text-blue-600 mx-auto mb-4" />}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{ach.title}</h3>
                  {ach.description && <p className="text-gray-600">{ach.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Почему мы */}
        {school.why_choose_us && (
          <section className="mb-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-6">Почему выбирают нас</h2>
            <p className="text-lg leading-relaxed whitespace-pre-wrap opacity-95">{school.why_choose_us}</p>
          </section>
        )}

        {/* Преподаватели */}
        {school.teachers.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Наши преподаватели</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {school.teachers.map((teacher, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {teacher.photo_url && (
                    <img src={teacher.photo_url} alt={teacher.name} className="w-full h-64 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{teacher.name}</h3>
                    {teacher.position && <p className="text-blue-600 font-medium mb-3">{teacher.position}</p>}
                    {teacher.experience_years && (
                      <p className="text-sm text-gray-600 mb-2">Опыт: {teacher.experience_years} лет</p>
                    )}
                    {teacher.specialization && (
                      <p className="text-sm text-gray-600 mb-3">{teacher.specialization}</p>
                    )}
                    {teacher.bio && <p className="text-gray-700 text-sm">{teacher.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Галерея */}
        {school.gallery.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Галерея</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {school.gallery.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
                  <img
                    src={img.image_url}
                    alt={img.caption || 'Фото школы'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {img.caption && (
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <p className="text-white text-center text-sm">{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Отзывы */}
        {school.reviews.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Отзывы студентов</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {school.reviews.map((review, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    {review.author_photo_url ? (
                      <img src={review.author_photo_url} alt={review.author_name} className="w-12 h-12 rounded-full" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
                        <Icon name="User" size={24} className="text-blue-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{review.author_name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={16}
                            className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      {review.course_name && (
                        <p className="text-sm text-gray-600 mt-1">Курс: {review.course_name}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.review_text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        {school.cta_button_text && school.cta_button_url && (
          <section className="text-center py-16">
            <a
              href={school.cta_button_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-12 py-4 rounded-full transition-colors shadow-lg hover:shadow-xl"
            >
              {school.cta_button_text}
              <Icon name="ArrowRight" size={24} />
            </a>
          </section>
        )}

        {/* Контакты */}
        <section className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Контакты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {school.phone && (
              <a href={`tel:${school.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                <Icon name="Phone" size={20} />
                <span>{school.phone}</span>
              </a>
            )}
            {school.email && (
              <a href={`mailto:${school.email}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                <Icon name="Mail" size={20} />
                <span>{school.email}</span>
              </a>
            )}
            {school.address && (
              <div className="flex items-center gap-3 text-gray-700">
                <Icon name="MapPin" size={20} />
                <span>{school.address}</span>
              </div>
            )}
            {school.website && (
              <a href={school.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                <Icon name="Globe" size={20} />
                <span>Сайт</span>
              </a>
            )}
          </div>
          
          {/* Соцсети */}
          <div className="flex gap-4 mt-6">
            {school.whatsapp && (
              <a href={`https://wa.me/${school.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">
                <Icon name="MessageCircle" size={28} />
              </a>
            )}
            {school.telegram && (
              <a href={school.telegram} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                <Icon name="Send" size={28} />
              </a>
            )}
            {school.instagram && (
              <a href={school.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700">
                <Icon name="Instagram" size={28} />
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
