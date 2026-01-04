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
  vk: string;
  max_url: string;
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
      const response = await fetch(`${SCHOOLS_API_URL}?action=school&slug=${slug}`);
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
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-end pb-8 md:pb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            {school.logo_url && (
              <img
                src={school.logo_url}
                alt={school.name}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl bg-white p-2 shadow-lg flex-shrink-0"
              />
            )}
            <div className="text-white text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">{school.name}</h1>
              {school.short_description && (
                <p className="text-base sm:text-lg md:text-xl opacity-90 drop-shadow-md">{school.short_description}</p>
              )}
            </div>
          </div>
          
          {/* Рейтинг и контакты */}
          <div className="flex flex-wrap gap-2 sm:gap-4 items-center text-white">
            {school.rating > 0 && (
              <div className="flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base">
                <Icon name="Star" size={16} className="text-amber-400 sm:w-5 sm:h-5" />
                <span className="font-semibold">{Number(school.rating).toFixed(1)}</span>
                <span className="opacity-80 hidden sm:inline">({school.reviews_count} отзывов)</span>
              </div>
            )}
            
            {school.city && (
              <div className="flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base">
                <Icon name="MapPin" size={16} className="sm:w-5 sm:h-5" />
                <span>{school.city}</span>
              </div>
            )}
            
            {!school.is_author_school && school.license_number && (
              <div className="flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base">
                <Icon name="ShieldCheck" size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Лицензия {school.license_number}</span>
                <span className="sm:hidden">{school.license_number}</span>
              </div>
            )}
            
            {school.is_author_school && (
              <div className="flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base">
                <Icon name="Award" size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Авторская школа</span>
                <span className="sm:hidden">Авторская</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* О школе */}
        {school.about_school && (
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">О школе</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{school.about_school}</p>
            </div>
          </section>
        )}

        {/* Достижения */}
        {school.achievements.length > 0 && (
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Наши достижения</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {school.achievements.filter(ach => {
                const suspicious = /туалет|toilet|6 дюймов|inches/i.test(ach.title + ' ' + (ach.description || ''));
                return !suspicious && ach.title && ach.title.length > 2;
              }).map((ach, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    {ach.icon_name && (
                      <div className="flex-shrink-0">
                        <Icon name={ach.icon_name} size={40} className="text-blue-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{ach.title}</h3>
                      {ach.description && <p className="text-sm text-gray-600 leading-relaxed">{ach.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Почему мы */}
        {school.why_choose_us && (
          <section className="mb-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl p-12 shadow-xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Почему выбирают нас</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg leading-relaxed whitespace-pre-wrap">{school.why_choose_us}</p>
            </div>
          </section>
        )}

        {/* Преподаватели */}
        {school.teachers.length > 0 && (
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Наши преподаватели</h2>
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
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Галерея</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {school.gallery.filter(img => {
                const suspicious = img.caption && /туалет|toilet|6 дюймов|inches/i.test(img.caption);
                return !suspicious && img.image_url;
              }).map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                  <img
                    src={img.image_url}
                    alt={img.caption || 'Фото школы'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {img.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white text-sm font-medium">{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Отзывы */}
        {school.reviews.length > 0 && (
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Отзывы студентов</h2>
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
          <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-12 text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Готовы начать обучение?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Запишитесь на курс прямо сейчас и получите профессию массажиста
            </p>
            <a
              href={school.cta_button_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-12 py-4 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              {school.cta_button_text}
              <Icon name="ArrowRight" size={24} />
            </a>
          </section>
        )}

        {/* Контакты */}
        <section className="bg-gray-50 rounded-2xl p-10 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Свяжитесь с нами</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {school.phone && (
              <a href={`tel:${school.phone}`} className="flex items-center gap-4 bg-white p-4 rounded-xl hover:shadow-md transition-shadow group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Icon name="Phone" size={24} className="text-blue-600 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Телефон</div>
                  <div className="font-semibold text-gray-900">{school.phone}</div>
                </div>
              </a>
            )}
            {school.email && (
              <a href={`mailto:${school.email}`} className="flex items-center gap-4 bg-white p-4 rounded-xl hover:shadow-md transition-shadow group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Icon name="Mail" size={24} className="text-blue-600 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Email</div>
                  <div className="font-semibold text-gray-900">{school.email}</div>
                </div>
              </a>
            )}
            {school.address && (
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="MapPin" size={24} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Адрес</div>
                  <div className="font-semibold text-gray-900">{school.address}</div>
                </div>
              </div>
            )}
            {school.website && (
              <a href={school.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white p-4 rounded-xl hover:shadow-md transition-shadow group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Icon name="Globe" size={24} className="text-blue-600 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Веб-сайт</div>
                  <div className="font-semibold text-gray-900">Перейти на сайт</div>
                </div>
              </a>
            )}
          </div>
          
          {/* Социальные сети */}
          {(school.whatsapp || school.vk || school.max_url) && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Мы в социальных сетях</h3>
              <div className="flex justify-center gap-4">
                {school.whatsapp && (
                  <a href={`https://wa.me/${school.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg hover:shadow-xl">
                    <Icon name="MessageCircle" size={24} />
                  </a>
                )}
                {school.vk && (
                  <a href={school.vk} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors shadow-lg hover:shadow-xl" title="VK">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.83 14.44h-1.8c-.66 0-.86-.52-2.05-1.71-1.03-1.01-1.49-1.15-1.75-1.15-.36 0-.46.1-.46.58v1.56c0 .42-.14.67-1.23.67-1.81 0-3.82-1.08-5.24-3.09C4.81 10.34 4.3 8.21 4.3 7.75c0-.26.1-.5.58-.5h1.8c.43 0 .6.2.76.66.85 2.37 2.27 4.44 2.85 4.44.22 0 .32-.1.32-.65V9.6c-.07-1.14-.67-1.24-.67-1.65 0-.2.17-.41.44-.41h2.83c.36 0 .49.19.49.61v3.28c0 .36.16.49.26.49.22 0 .4-.13.82-.54 1.27-1.42 2.18-3.62 2.18-3.62.12-.25.31-.5.78-.5h1.8c.54 0 .66.28.54.66-.21.94-2.37 3.88-2.37 3.88-.18.29-.25.42 0 .75.19.25.8.78 1.21 1.25.75.84 1.33 1.54 1.49 2.03.15.49-.08.74-.58.74z"/>
                    </svg>
                  </a>
                )}
                {school.max_url && (
                  <a href={school.max_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-full flex items-center justify-center transition-colors shadow-lg hover:shadow-xl" title="МАКС">
                    <span className="font-bold text-lg">М</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}