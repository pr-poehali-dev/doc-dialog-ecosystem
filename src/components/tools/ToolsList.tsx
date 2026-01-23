import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

export default function ToolsList() {
  const navigate = useNavigate();

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
      color: 'from-blue-500/10 to-blue-500/5',
      imageIndex: 0
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
      color: 'from-purple-500/10 to-purple-500/5',
      imageIndex: 1
    },
    {
      icon: 'Activity',
      title: 'Анализ боли',
      subtitle: 'Помогает понять, с чем может быть связана боль клиента',
      description: 'Инструмент помогает проанализировать жалобы на боль и понять, когда можно работать, а когда лучше остановиться и направить клиента к врачу.',
      important: 'Инструмент не ставит диагнозов, а помогает оценить ситуацию и риски.',
      color: 'from-orange-500/10 to-orange-500/5',
      imageIndex: 2
    }
  ];

  const images = [
    'https://cdn.poehali.dev/files/ea54ba01-bf8d-4fa1-b924-a18290ba8469.jpg',
    'https://cdn.poehali.dev/files/19f3d66b-a720-4516-a2cd-29f24e014739.jpg',
    'https://cdn.poehali.dev/files/1e5360de-56c2-49e0-8d56-4582113d6b2b.jpg'
  ];

  const imageAlts = [
    'Специалист анализирует медицинские снимки',
    'Специалист проводит онлайн консультацию',
    'Врач проводит медицинский осмотр'
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

  return (
    <>
      {/* Why Needed Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Зачем это нужно в реальной практике
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Каждый специалист сталкивается с ситуациями, когда важно остановиться и задать себе вопрос:
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            {whyNeeded.map((question, index) => (
              <Card key={index} className="border-2 border-blue-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Icon name="HelpCircle" size={20} className="text-blue-600" />
                  </div>
                  <p className="text-base sm:text-lg font-medium leading-relaxed">{question}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50/80 to-blue-50/80 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Инструменты Док диалог созданы, чтобы:</h3>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={16} className="text-purple-700" />
                    </div>
                    <span className="text-base sm:text-lg font-medium">{benefit}</span>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Инструменты для работы с клиентом</h2>
            <p className="text-xl text-muted-foreground">
              Помогают собрать информацию, понять состояние клиента и определить, можно ли работать дальше
            </p>
          </div>

          <div className="space-y-8">
            {tools.map((tool, index) => (
              <Card key={index} className={`border-2 bg-gradient-to-br ${tool.color} hover:shadow-xl transition-all duration-300`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white shadow-md flex items-center justify-center flex-shrink-0">
                      <Icon name={tool.icon as any} size={24} className="text-blue-600 sm:w-8 sm:h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2">{tool.title}</h3>
                      <p className="text-base sm:text-lg text-muted-foreground font-medium">{tool.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                    <div className="w-full md:w-64 aspect-square rounded-lg md:rounded-xl overflow-hidden flex-shrink-0 bg-white p-1.5 sm:p-2">
                      <img 
                        src={images[tool.imageIndex]} 
                        alt={imageAlts[tool.imageIndex]}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1 flex items-center">
                      <p className="text-base sm:text-lg leading-relaxed">{tool.description}</p>
                    </div>
                  </div>
                  
                  {tool.helps && (
                    <div className="bg-white/80 rounded-lg sm:rounded-xl p-4 sm:p-6">
                      <p className="font-semibold mb-3 text-base sm:text-lg">Помогает понять:</p>
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
    </>
  );
}
