import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function PremiumPresentation() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { id: 'cover', label: 'Док диалог' },
    { id: 'essence', label: 'Суть' },
    { id: 'specialists', label: 'Специалисты' },
    { id: 'salons', label: 'Салоны' },
    { id: 'schools', label: 'Школы' },
    { id: 'clients', label: 'Клиенты' },
    { id: 'philosophy', label: 'Философия' },
    { id: 'summary', label: 'Итог' },
  ];

  const nextSlide = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    }
  };

  const prevSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Slide indicators */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-1 transition-all duration-300 ${
              index === activeSlide 
                ? 'w-12 bg-slate-900' 
                : 'w-8 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-12">
        <div className="max-w-5xl w-full">
          
          {/* Slide 0: Cover */}
          {activeSlide === 0 && (
            <div className="animate-fade-in text-center py-20">
              <div className="mb-16">
                <div className="w-2 h-2 bg-slate-900 rounded-full mx-auto mb-12"></div>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-12 tracking-tight leading-none">
                Док диалог
              </h1>
              
              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">
                  Экосистема осознанного взаимодействия
                </p>
                <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">
                  с телом, профессией и выбором
                </p>
              </div>

              <div className="mt-20 flex items-center justify-center gap-12 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <span>1000+ специалистов</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <span>50+ школ</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <span>200+ салонов</span>
                </div>
              </div>
            </div>
          )}

          {/* Slide 1: Essence */}
          {activeSlide === 1 && (
            <div className="animate-fade-in py-12">
              <p className="text-sm uppercase tracking-widest text-slate-400 mb-12">Что такое Док диалог</p>
              
              <div className="space-y-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                  Профессиональная экосистема,<br />
                  объединяющая специалистов по телу,<br />
                  салоны, школы и клиентов<br />
                  в одном цифровом пространстве
                </h2>

                <div className="border-l-2 border-slate-200 pl-8 py-4">
                  <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">
                    Мы создаём среду, где взаимодействие строится<br />
                    на понимании, доверии и прямом диалоге,<br />
                    а не на посредниках, комиссиях<br />
                    и агрессивных продажах
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 2: Specialists */}
          {activeSlide === 2 && (
            <div className="animate-fade-in py-12">
              <p className="text-sm uppercase tracking-widest text-slate-400 mb-6">Ценность</p>
              <h2 className="text-4xl md:text-5xl font-light mb-4">Для специалистов по телу</h2>
              <p className="text-slate-500 mb-12">Массажисты, телесные практики, специалисты по работе с телом</p>

              <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Видимость и доверие</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Публичный профиль с верификацией, отзывами клиентов и рейтингом. 
                        Клиенты видят реального специалиста, а не рекламу
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Прямой контакт с клиентами</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Клиент находит специалиста по геолокации и связывается напрямую. 
                        Без комиссий и посредников
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Профессиональное развитие</h3>
                      <p className="text-slate-600 leading-relaxed">
                        AI Диалоги для супервизии и саморефлексии. 
                        Доступ к обучению и предложениям от школ. 
                        Отличительные знаки за пройденное обучение
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Инструменты для практики</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Личный лендинг, управление запросами и сообщениями, продвижение профиля
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="border-l-2 border-slate-900 pl-8 py-2">
                    <p className="text-lg text-slate-900">
                      Док диалог не участвует в оплатах услуг и не влияет на ваш прайс
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 3: Salons */}
          {activeSlide === 3 && (
            <div className="animate-fade-in py-12">
              <p className="text-sm uppercase tracking-widest text-slate-400 mb-6">Ценность</p>
              <h2 className="text-4xl md:text-5xl font-light mb-4">Для салонов</h2>
              <p className="text-slate-500 mb-12">Салоны массажа, студии телесных практик, пространства с услугами для тела</p>

              <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Поиск специалистов</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Размещение вакансий, отклики от специалистов внутри экосистемы, 
                        верифицированные профили
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Привлечение клиентов без демпинга</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Клиенты находят салон по геолокации и выбирают осознанно, 
                        без купонов и скидочных агрегаторов
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Повышение доверия к салону</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Карточка салона, отзывы клиентов, рейтинг
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Дополнительные возможности</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Указание аренды кабинетов, привлечение специалистов в команду
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="border-l-2 border-slate-900 pl-8 py-2">
                    <p className="text-lg text-slate-900">
                      Все оплаты происходят напрямую между салоном и клиентом
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 4: Schools */}
          {activeSlide === 4 && (
            <div className="animate-fade-in py-12">
              <p className="text-sm uppercase tracking-widest text-slate-400 mb-6">Ценность</p>
              <h2 className="text-4xl md:text-5xl font-light mb-4">Для школ и образовательных проектов</h2>
              <p className="text-slate-500 mb-12">Школы массажа, телесных практик, курсы по бизнесу, маркетингу и развитию специалистов</p>

              <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Целевая аудитория</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Доступ к действующим специалистам, тем, кто уже ищет обучение, 
                        и профессиональному сообществу
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Продвижение без сложной инфраструктуры</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Размещение курсов, бесплатные продукты, автовебинары, подписочные предложения. 
                        Все переходы — по партнёрским ссылкам
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Повышение доверия к школе</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Карточка школы, отзывы и рейтинг, статус партнёра экосистемы
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Дополнительные точки касания</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Запросы на скидки, интерес со стороны специалистов, 
                        долгосрочное присутствие в сообществе
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="border-l-2 border-slate-900 pl-8 py-2">
                    <p className="text-lg text-slate-900">
                      Док диалог не принимает оплату за обучение
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 5: Clients */}
          {activeSlide === 5 && (
            <div className="animate-fade-in py-12">
              <p className="text-sm uppercase tracking-widest text-slate-400 mb-6">Ценность</p>
              <h2 className="text-4xl md:text-5xl font-light mb-4">Для клиентов</h2>
              <p className="text-slate-500 mb-12">Люди, которые ищут специалистов по телу и хотят делать осознанный выбор</p>

              <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Удобный поиск</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Специалистов и салонов по геолокации, профилю, отзывам и рейтингу
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Прямой диалог</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Клиент общается напрямую со специалистом без колл-центров и посредников
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Прозрачность</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Кто специалист, где принимает, какой опыт — всё видно до записи
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm font-light">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-normal mb-3">Понимание медицинских заключений</h3>
                      <p className="text-slate-600 leading-relaxed">
                        ИИ-инструмент помогает понять сложный текст, разобраться в формулировках, 
                        снизить тревожность
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="bg-slate-50 border border-slate-200 px-8 py-6 rounded-sm">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Инструмент носит информационный характер и не заменяет консультацию врача
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 6: Philosophy */}
          {activeSlide === 6 && (
            <div className="animate-fade-in py-12 text-center">
              <p className="text-sm uppercase tracking-widest text-slate-400 mb-12">Философия проекта</p>
              
              <div className="max-w-3xl mx-auto space-y-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                  Док диалог —<br />
                  это не маркетплейс услуг
                </h2>

                <div className="space-y-8">
                  <p className="text-2xl md:text-3xl text-slate-600 font-light">
                    Это экосистема диалога
                  </p>

                  <div className="grid grid-cols-2 gap-8 max-w-xl mx-auto">
                    <div className="border-t border-slate-200 pt-4">
                      <p className="text-lg text-slate-900">с собой</p>
                    </div>
                    <div className="border-t border-slate-200 pt-4">
                      <p className="text-lg text-slate-900">с профессией</p>
                    </div>
                    <div className="border-t border-slate-200 pt-4">
                      <p className="text-lg text-slate-900">с сообществом</p>
                    </div>
                    <div className="border-t border-slate-200 pt-4">
                      <p className="text-lg text-slate-900">с осознанным выбором</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 space-y-4 border-t-2 border-slate-900 max-w-md mx-auto">
                  <p className="text-xl text-slate-900">Мы не лечим</p>
                  <p className="text-xl text-slate-900">Мы не обещаем</p>
                  <p className="text-xl text-slate-900">Мы помогаем понимать<br />и выстраивать взаимодействие</p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 7: Summary */}
          {activeSlide === 7 && (
            <div className="animate-fade-in py-12">
              <p className="text-sm uppercase tracking-widest text-slate-400 mb-12">Итог</p>
              
              <div className="space-y-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                  Док диалог объединяет<br />
                  в одном пространстве
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="border-t-2 border-slate-900 pt-6">
                    <p className="text-2xl mb-2">Специалистов</p>
                    <p className="text-slate-500">1000+</p>
                  </div>
                  <div className="border-t-2 border-slate-900 pt-6">
                    <p className="text-2xl mb-2">Салоны</p>
                    <p className="text-slate-500">200+</p>
                  </div>
                  <div className="border-t-2 border-slate-900 pt-6">
                    <p className="text-2xl mb-2">Школы</p>
                    <p className="text-slate-500">50+</p>
                  </div>
                  <div className="border-t-2 border-slate-900 pt-6">
                    <p className="text-2xl mb-2">Клиентов</p>
                    <p className="text-slate-500">Тысячи</p>
                  </div>
                </div>

                <div className="space-y-6 max-w-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-slate-900 rounded-full mt-3 shrink-0"></div>
                    <p className="text-xl text-slate-600">Без комиссий за услуги</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-slate-900 rounded-full mt-3 shrink-0"></div>
                    <p className="text-xl text-slate-600">Без медицинских обещаний</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-1 h-1 bg-slate-900 rounded-full mt-3 shrink-0"></div>
                    <p className="text-xl text-slate-600">С фокусом на осознанный выбор и доверие</p>
                  </div>
                </div>

                <div className="pt-8">
                  <a 
                    href="https://dokdialog.ru" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-sm uppercase tracking-widest border-b border-slate-900 pb-1 hover:border-slate-400 transition-colors"
                  >
                    dokdialog.ru
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4">
        <button
          onClick={prevSlide}
          disabled={activeSlide === 0}
          className={`w-12 h-12 border border-slate-300 flex items-center justify-center transition-all ${
            activeSlide === 0 
              ? 'opacity-20 cursor-not-allowed' 
              : 'hover:border-slate-900 hover:bg-slate-50'
          }`}
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        
        <div className="text-sm text-slate-400 tabular-nums">
          {String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
        
        <button
          onClick={nextSlide}
          disabled={activeSlide === slides.length - 1}
          className={`w-12 h-12 border border-slate-300 flex items-center justify-center transition-all ${
            activeSlide === slides.length - 1 
              ? 'opacity-20 cursor-not-allowed' 
              : 'hover:border-slate-900 hover:bg-slate-50'
          }`}
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>

      {/* Keyboard navigation hint */}
      <div className="fixed bottom-8 left-8 z-50 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 border border-slate-200 rounded">←</span>
          <span className="px-2 py-1 border border-slate-200 rounded">→</span>
          <span>Навигация</span>
        </div>
      </div>

      {/* Keyboard navigation */}
      <div className="hidden">
        {typeof window !== 'undefined' && window.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight') nextSlide();
          if (e.key === 'ArrowLeft') prevSlide();
        })}
      </div>
    </div>
  );
}
