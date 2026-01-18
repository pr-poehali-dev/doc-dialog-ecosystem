interface PremiumSlideContentProps {
  activeSlide: number;
}

export default function PremiumSlideContent({ activeSlide }: PremiumSlideContentProps) {
  return (
    <>
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
          <h2 className="text-4xl md:text-5xl font-light mb-4">Для салонов и пространств</h2>
          <p className="text-slate-500 mb-12">SPA, массажные студии, велнес-центры</p>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-sm font-light">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-normal mb-3">Привлечение клиентов</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Профиль салона с услугами, командой специалистов, отзывами и геолокацией. 
                    Видимость в каталоге
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
                  <h3 className="text-xl font-normal mb-3">Поиск специалистов</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Доступ к базе профессионалов по телу. 
                    Отклики на вакансии, прямые приглашения, фильтры по навыкам
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
                  <h3 className="text-xl font-normal mb-3">Управление командой</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Салон может управлять своими специалистами, публиковать их услуги, 
                    строить единую репутацию
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
                  <h3 className="text-xl font-normal mb-3">Аренда кабинетов</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Публикация предложений об аренде кабинетов для независимых практиков
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="border-l-2 border-slate-900 pl-8 py-2">
                <p className="text-lg text-slate-900">
                  Салон не платит комиссию за привлечение клиентов или специалистов
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
          <h2 className="text-4xl md:text-5xl font-light mb-4">Для школ и обучающих центров</h2>
          <p className="text-slate-500 mb-12">Школы массажа, курсы по работе с телом, образовательные программы</p>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-sm font-light">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-normal mb-3">Прямой доступ к аудитории</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Публикация курсов и программ. 
                    Специалисты видят предложения в своих профилях и могут откликнуться
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
                  <h3 className="text-xl font-normal mb-3">Верификация выпускников</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Школа может выдавать сертификаты, которые становятся отличительными знаками 
                    в профиле специалиста
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
                  <h3 className="text-xl font-normal mb-3">Репутация и узнаваемость</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Профиль школы с описанием, преподавателями, отзывами. 
                    Видимость в каталоге образовательных программ
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
                  <h3 className="text-xl font-normal mb-3">Прямая связь с учениками</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Школа взаимодействует с потенциальными учениками напрямую, 
                    без рекламных посредников
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="border-l-2 border-slate-900 pl-8 py-2">
                <p className="text-lg text-slate-900">
                  Школа не платит комиссию за привлечение учеников
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
          <p className="text-slate-500 mb-12">Люди, ищущие специалистов по телу и осознанный подход к практике</p>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-sm font-light">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-normal mb-3">Простой поиск по геолокации</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Найти специалиста, салон или школу рядом с вами. 
                    Фильтры по методу, стажу, цене
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
                  <h3 className="text-xl font-normal mb-3">Прозрачность и доверие</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Реальные отзывы, верифицированные профили, рейтинг. 
                    Видно, кто специалист, где учился, какой опыт
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
                  <h3 className="text-xl font-normal mb-3">Прямая связь</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Напрямую связаться со специалистом или салоном. 
                    Без посредников, без скрытых наценок
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
                  <h3 className="text-xl font-normal mb-3">AI Диалоги для выбора</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Поговорите с AI, чтобы понять, какой метод, специалист 
                    или практика вам подходит
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="border-l-2 border-slate-900 pl-8 py-2">
                <p className="text-lg text-slate-900">
                  Клиент платит только специалисту, без комиссий платформе
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide 6: Philosophy */}
      {activeSlide === 6 && (
        <div className="animate-fade-in py-12">
          <p className="text-sm uppercase tracking-widest text-slate-400 mb-12">Философия</p>
          
          <div className="space-y-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
                Почему мы не берём комиссии<br />
                и не вмешиваемся в оплаты?
              </h2>
              <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed max-w-3xl">
                Потому что мы не посредник и не маркетплейс. 
                Мы — инфраструктура для прямого, честного взаимодействия
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                  <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                </div>
                <h3 className="text-xl font-normal mb-4">Прозрачность</h3>
                <p className="text-slate-600 leading-relaxed">
                  Все условия открыты. 
                  Нет скрытых сборов, комиссий, платежей "за привлечение"
                </p>
              </div>

              <div>
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                  <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                </div>
                <h3 className="text-xl font-normal mb-4">Экологичность</h3>
                <p className="text-slate-600 leading-relaxed">
                  Не навязываем продажи, не манипулируем. 
                  Предоставляем инструменты и отходим в сторону
                </p>
              </div>

              <div>
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                  <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                </div>
                <h3 className="text-xl font-normal mb-4">Долгосрочность</h3>
                <p className="text-slate-600 leading-relaxed">
                  Мы строим отношения, а не продаём лиды. 
                  Экосистема живёт, потому что в ней удобно всем
                </p>
              </div>
            </div>

            <div className="border-t-2 border-slate-100 pt-12">
              <p className="text-2xl md:text-3xl font-light text-slate-900 leading-relaxed">
                Док диалог — это не бизнес в классическом смысле.<br />
                Это инфраструктурный проект для людей,<br />
                которые хотят взаимодействовать осознанно
              </p>
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
              Док диалог —<br />
              это пространство для прямого диалога<br />
              между теми, кто ищет,<br />
              и теми, кто помогает
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                  <p className="text-lg text-slate-900">Для специалистов — видимость, инструменты, развитие</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                  <p className="text-lg text-slate-900">Для салонов — клиенты, команда, репутация</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                  <p className="text-lg text-slate-900">Для школ — прямой доступ к студентам</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                  <p className="text-lg text-slate-900">Для клиентов — прозрачность, выбор, доверие</p>
                </div>
              </div>

              <div className="border-l-2 border-slate-200 pl-8">
                <p className="text-xl text-slate-600 font-light leading-relaxed">
                  Без комиссий.<br />
                  Без посредников.<br />
                  Без агрессивных продаж.<br />
                  Только прямой, честный диалог
                </p>
              </div>
            </div>

            <div className="pt-12 border-t-2 border-slate-100">
              <p className="text-3xl md:text-4xl font-light text-slate-900">
                Присоединяйтесь к Док диалог
              </p>
              <p className="text-xl text-slate-500 mt-4">
                Создайте профиль, найдите нужных людей, начните диалог
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
