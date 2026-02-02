import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function RegressionHypnosisContent() {
  return (
    <>
      {/* Why Needed with Image */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
            Когда рационального анализа недостаточно
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <Card className="p-8 lg:p-10 bg-gradient-to-br from-muted/30 to-muted/10 border-2 hover:shadow-xl transition-shadow">
                <p className="text-lg mb-6">
                  В работе с людьми специалист регулярно сталкивается с ситуациями, когда:
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    'клиент всё понимает, но не меняется',
                    'инсайт есть, а симптом остаётся',
                    'тело реагирует быстрее, чем мышление',
                    'эмоция возникает без очевидной причины'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Icon name="CircleDot" className="text-primary mt-1 flex-shrink-0" size={20} />
                      <p className="text-base lg:text-lg">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-lg mb-4">
                  Это связано с тем, что значимая часть опыта хранится <strong>в недекларируемой памяти</strong> — на уровне ощущений, образов и телесных реакций.
                </p>
                <p className="text-lg font-medium">
                  Регрессивный гипноз позволяет <strong>организованно и безопасно</strong> работать с этим уровнем.
                </p>
              </Card>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/2a657a80-7508-44bf-88ad-109409602441.jpg"
                alt="Professional therapy session"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is with Image */}
      <section className="bg-muted/20 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
              Что мы называем регрессивным гипнозом
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/8c816ef4-e8b0-4c2e-bd02-2297da99fa7b.jpg"
                  alt="Mindfulness practice"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
              <div>
                <Card className="p-8 lg:p-10 hover:shadow-xl transition-shadow">
                  <p className="text-lg mb-6">
                    Регрессивный гипноз — это метод работы с изменённым состоянием сознания, в котором внимание клиента направляется:
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      'на ранние эпизоды личного опыта',
                      'на символические образы бессознательного',
                      'на телесные и эмоциональные следы памяти'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Icon name="ChevronRight" className="text-primary mt-1 flex-shrink-0" size={20} />
                        <p className="text-base">{item}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-lg mb-4">С точки зрения науки, речь идёт о:</p>
                  <div className="grid gap-3 mb-8">
                    {[
                      'фокусированной активации памяти',
                      'работе с ассоциативными сетями',
                      'реконструкции субъективного опыта',
                      'переработке эмоционально значимых событий'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Icon name="Atom" className="text-primary mt-1 flex-shrink-0" size={20} />
                        <p className="text-base">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <p className="text-lg font-semibold text-center">
                      Мы не обучаем "вере" — мы обучаем методу.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
            Кому подходит обучение
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Психологам и психотерапевтам', desc: 'для углубления работы с травматическим и ранним опытом' },
              { title: 'Коучам и консультантам', desc: 'для работы с ограничивающими стратегиями и бессознательными паттернами' },
              { title: 'Телесным специалистам', desc: 'для интеграции телесных реакций и психических процессов' },
              { title: 'Тем, кто осознанно выбирает профессию', desc: 'и готов обучаться очно, глубоко и ответственно' }
            ].map((item, idx) => (
              <Card key={idx} className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-base text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results with Training Image */}
      <section className="bg-muted/20 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
              Чему вы научитесь
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-4">
                  {[
                    { icon: 'Target', text: 'Проводить регрессивные сеансы с пониманием механизма' },
                    { icon: 'Shield', text: 'Работать с сопротивлением, возрастной и темпоральной ориентацией' },
                    { icon: 'Heart', text: 'Различать психологический и физиологический эффект' },
                    { icon: 'Users', text: 'Интегрировать метод в вашу практику (психотерапия, коучинг, телесная работа)' },
                    { icon: 'BookOpen', text: 'Работать в рамках этической и научно обоснованной модели' }
                  ].map((item, idx) => (
                    <Card key={idx} className="p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name={item.icon} className="text-primary" size={24} />
                        </div>
                        <p className="text-lg pt-2">{item.text}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/7375949b-33b9-4231-befa-f2dae0274abc.jpg"
                  alt="Professional training"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
