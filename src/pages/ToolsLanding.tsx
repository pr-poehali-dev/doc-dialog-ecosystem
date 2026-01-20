import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import SchoolsFooter from "@/components/schools/SchoolsFooter";
import { useNavigate } from "react-router-dom";

const ToolsLanding = () => {
  const navigate = useNavigate();

  const scrollToTools = () => {
    document.getElementById('tools-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  const tools = [
    {
      icon: 'FileText',
      title: 'Расшифровка заключений',
      subtitle: 'Понятное объяснение медицинских документов простым языком',
      description: 'Инструмент помогает разобраться в том, что написано в медицинских заключениях и обследованиях клиента. Без сложных слов — с пояснением, на что стоит обратить внимание специалисту по телу.',
      helps: [
        'есть ли ограничения для работы',
        'где стоит быть особенно осторожным',
        'когда лучше направить клиента к врачу'
      ],
      color: 'from-blue-500/10 to-blue-500/5'
    },
    {
      icon: 'ClipboardList',
      title: 'Сбор анамнеза',
      subtitle: 'Помогает задать правильные вопросы до начала работы',
      description: 'Инструмент структурирует диалог с клиентом и помогает собрать важную информацию о его состоянии, образе жизни и жалобах.',
      helps: [
        'не упустить важные детали',
        'заранее увидеть возможные риски',
        'выстроить безопасную стратегию работы'
      ],
      color: 'from-purple-500/10 to-purple-500/5'
    },
    {
      icon: 'Activity',
      title: 'Анализ боли',
      subtitle: 'Помогает понять, с чем может быть связана боль клиента',
      description: 'Инструмент помогает проанализировать жалобы на боль и понять, когда можно работать, а когда лучше остановиться и направить клиента к врачу.',
      important: 'Инструмент не ставит диагнозов, а помогает оценить ситуацию и риски.',
      color: 'from-orange-500/10 to-orange-500/5'
    }
  ];

  const whyNeeded = [
    'Подходят ли этому человеку мои техники?',
    'Не наврежу ли я, продолжая работу?',
    'Нужно ли направить клиента к врачу и к какому?',
    'Достаточно ли информации, чтобы принимать решение?'
  ];

  const benefits = [
    'снизить риск ошибок',
    'защитить клиента',
    'защитить специалиста',
    'помочь принимать спокойные и обоснованные решения'
  ];

  const differences = [
    'обучены именно на тематике работы с телом и клиентами',
    'адаптированы под реальную практику специалистов',
    'ориентированы на безопасность, а не на «советы»',
    'не подталкивают к работе, если есть риск',
    'помогают принять решение: работать или направить к врачу'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://cdn.poehali.dev/files/3b1b03fe-2310-4289-ab50-fcf2d3334a04.jpg" 
            alt="Технологии для специалистов"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-purple-900/80 to-blue-800/85"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white drop-shadow-2xl leading-tight">
              Инструменты Док диалог для специалистов
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 mb-10 leading-relaxed drop-shadow-lg font-medium">
              Цифровые помощники, которые помогают безопасно работать с клиентами, 
              принимать взвешенные решения и не выходить за границы своей компетенции
            </p>
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20 mb-10">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                Инструменты Док диалог созданы для специалистов, работающих с телом и людьми.
                <br />
                Они помогают понять клиента глубже, оценить риски и принять правильное решение — 
                работать дальше или направить к врачу.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button size="lg" onClick={scrollToTools} className="text-lg px-10 py-6 bg-white text-blue-600 hover:bg-blue-50 shadow-xl">
                <Icon name="Search" className="mr-2" size={22} />
                Смотреть инструменты
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/register/specialist')} className="text-lg px-10 py-6 bg-blue-600 text-white border-2 border-white hover:bg-blue-700 shadow-xl">
                <Icon name="Sparkles" className="mr-2" size={22} />
                Попробовать бесплатно
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Needed Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Зачем это нужно в реальной практике
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Каждый специалист сталкивается с ситуациями, когда важно остановиться и задать себе вопрос:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {whyNeeded.map((question, index) => (
              <Card key={index} className="border-2 border-blue-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Icon name="HelpCircle" size={20} className="text-blue-600" />
                  </div>
                  <p className="text-lg font-medium leading-relaxed">{question}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50/80 to-blue-50/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Инструменты Док диалог созданы, чтобы:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={16} className="text-purple-700" />
                    </div>
                    <span className="text-lg font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tools List Section */}
      <section id="tools-list" className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Инструменты для работы с клиентом</h2>
            <p className="text-xl text-muted-foreground">
              Помогают собрать информацию, понять состояние клиента и определить, можно ли работать дальше
            </p>
          </div>

          <div className="space-y-8">
            {tools.map((tool, index) => (
              <Card key={index} className={`border-2 bg-gradient-to-br ${tool.color} hover:shadow-xl transition-all duration-300`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center flex-shrink-0">
                      <Icon name={tool.icon as any} size={32} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{tool.title}</h3>
                      <p className="text-lg text-muted-foreground font-medium">{tool.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {index === 0 && (
                      <div className="w-full md:w-64 aspect-square rounded-xl overflow-hidden flex-shrink-0 bg-white p-2">
                        <img 
                          src="https://cdn.poehali.dev/files/ea54ba01-bf8d-4fa1-b924-a18290ba8469.jpg" 
                          alt="Специалист анализирует медицинские снимки"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                    {index === 1 && (
                      <div className="w-full md:w-64 aspect-square rounded-xl overflow-hidden flex-shrink-0 bg-white p-2">
                        <img 
                          src="https://cdn.poehali.dev/files/19f3d66b-a720-4516-a2cd-29f24e014739.jpg" 
                          alt="Специалист проводит онлайн консультацию"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                    {index === 2 && (
                      <div className="w-full md:w-64 aspect-square rounded-xl overflow-hidden flex-shrink-0 bg-white p-2">
                        <img 
                          src="https://cdn.poehali.dev/files/1e5360de-56c2-49e0-8d56-4582113d6b2b.jpg" 
                          alt="Врач проводит медицинский осмотр"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 flex items-center">
                      <p className="text-lg leading-relaxed">{tool.description}</p>
                    </div>
                  </div>
                  
                  {tool.helps && (
                    <div className="bg-white/80 rounded-xl p-6">
                      <p className="font-semibold mb-3 text-lg">Помогает понять:</p>
                      <ul className="space-y-2">
                        {tool.helps.map((help, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Icon name="ChevronRight" size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                            <span className="text-base">{help}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {tool.important && (
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                      <p className="flex items-start gap-3">
                        <Icon name="AlertCircle" size={20} className="text-amber-600 flex-shrink-0 mt-1" />
                        <span className="font-medium">{tool.important}</span>
                      </p>
                    </div>
                  )}

                  <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => navigate('/register')}>
                    Попробовать бесплатно
                    <Icon name="Sparkles" className="ml-2" size={20} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dialogs Tool Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-purple-50/50 to-blue-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Инструменты «Диалоги»</h2>
            <p className="text-xl text-muted-foreground">
              Поддержка специалиста в сложных ситуациях, где важны не техники, а решения
            </p>
          </div>

          <Card className="border-2 border-purple-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg flex items-center justify-center">
                  <Icon name="MessageCircle" size={32} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold">Диалоги Док диалог</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="w-full aspect-[16/9] rounded-xl overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/0a4849c3-128f-42ab-8e8f-d2b6b813fd22.jpg" 
                  alt="Профессиональное общение специалистов"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-lg leading-relaxed">
                Единое пространство для профессионального общения и поддержки специалиста.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Супервизия', desc: 'помощь в разборе сложных ситуаций' },
                  { title: 'Разбор случаев', desc: 'анализ работы с клиентами без осуждения' },
                  { title: 'Границы', desc: 'помощь в ситуациях давления, ожиданий и манипуляций' },
                  { title: 'Выгорание', desc: 'поддержка в состоянии усталости и потери мотивации' },
                  { title: 'Развитие', desc: 'помощь в выборе дальнейшего профессионального пути' }
                ].map((item, index) => (
                  <div key={index} className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <p className="font-semibold text-lg mb-2">Для чего это нужно:</p>
                <p className="text-lg">Чтобы специалист не оставался один на один со сложными решениями.</p>
              </div>

              <Button size="lg" className="w-full sm:w-auto" onClick={() => navigate('/register')}>
                Начать общение бесплатно
                <Icon name="Sparkles" className="ml-2" size={20} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Not Regular AI Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Почему это не «обычный ИИ»</h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Инструменты Док диалог — это не универсальный чат-бот.
          </p>

          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Их отличие:</h3>
              <div className="space-y-4 mb-8">
                {differences.map((diff, index) => (
                  <div key={index} className="flex items-start gap-4 bg-white/80 rounded-lg p-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-lg leading-relaxed">{diff}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 text-center">
                <p className="text-xl font-semibold">
                  ИИ в Док диалог — это ассистент специалиста, а не замена его ответственности.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Safety Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-green-50/50 to-blue-50/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Про безопасность клиента и специалиста</h2>
          
          <Card className="border-2 border-green-200 bg-white/80 backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                <p className="text-xl text-center font-medium leading-relaxed">
                  Мы считаем, что профессионализм — это не только умение работать руками,
                  <br />
                  но и умение вовремя сказать:
                </p>
                <p className="text-2xl text-center font-bold text-green-700 mt-4">
                  «С этим вопросом лучше обратиться к врачу».
                </p>
              </div>

              <h3 className="text-2xl font-bold mb-6">Инструменты Док диалог помогают:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'не выходить за границы своей компетенции',
                  'снизить риск осложнений',
                  'выстроить доверие с клиентом',
                  'работать спокойно и уверенно'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-green-50 rounded-lg p-4">
                    <Icon name="Shield" size={24} className="text-green-600 flex-shrink-0" />
                    <span className="text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Free Access Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Попробуйте бесплатно</h2>
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <Icon name="Gift" size={64} className="mx-auto mb-6 text-blue-600" />
              <p className="text-xl leading-relaxed mb-8">
                У всех инструментов Док диалог есть бесплатный доступ.
                <br />
                Вы можете попробовать их в работе и понять, насколько они подходят именно вам.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => navigate('/register/specialist')} className="text-lg px-8">
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Попробовать бесплатно
                </Button>
                <Button size="lg" variant="outline" onClick={scrollToTools} className="text-lg px-8">
                  <Icon name="Search" className="mr-2" size={20} />
                  Выбрать инструмент
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-purple-50/50 to-blue-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Инструменты, которые поддерживают специалиста
          </h2>
          <p className="text-2xl text-muted-foreground mb-12 font-medium">
            Не чтобы лечить — а чтобы понимать, принимать решения и работать безопасно
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={scrollToTools} className="text-lg px-10 py-6">
              Смотреть инструменты
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/register/specialist')} className="text-lg px-10 py-6">
              Начать бесплатно
            </Button>
          </div>
        </div>
      </section>

      <SchoolsFooter />
    </div>
  );
};

export default ToolsLanding;