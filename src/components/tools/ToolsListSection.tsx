import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function ToolsListSection() {
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
      image: 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/8f8aad29-7772-4791-9eef-44371404f25a.jpg',
      imageAlt: 'Специалист изучает медицинские документы'
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
      image: 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/3bb0ecec-63fe-4688-8b98-ee3ddccf2f35.jpg',
      imageAlt: 'Консультация и сбор анамнеза'
    },
    {
      icon: 'Activity',
      title: 'Анализ боли',
      subtitle: 'Помогает понять, с чем может быть связана боль клиента',
      description: 'Инструмент помогает проанализировать жалобы на боль и понять, когда можно работать, а когда лучше остановиться и направить клиента к врачу.',
      important: 'Инструмент не ставит диагнозов, а помогает оценить ситуацию и риски.',
      color: 'from-orange-500/10 to-orange-500/5',
      image: 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/8893c7ba-e842-49fd-b405-86044ce698dd.jpg',
      imageAlt: 'Анализ боли и диагностика'
    }
  ];

  const differences = [
    'обучены именно на тематике работы с телом и клиентами',
    'адаптированы под реальную практику специалистов',
    'ориентированы на безопасность, а не на «советы»',
    'не подталкивают к работе, если есть риск',
    'помогают принять решение: работать или направить к врачу'
  ];

  return (
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
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className={index % 2 === 0 ? 'md:order-1' : 'md:order-2'}>
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
                  <CardContent className="space-y-4 sm:space-y-6">
                    <p className="text-base sm:text-lg leading-relaxed">{tool.description}</p>
                    
                    {tool.helps && (
                      <div className="space-y-3">
                        <p className="font-semibold text-base sm:text-lg">Инструмент помогает понять:</p>
                        <div className="space-y-2">
                          {tool.helps.map((help, i) => (
                            <div key={i} className="flex items-start gap-2 sm:gap-3">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Icon name="Check" size={14} className="text-blue-600" />
                              </div>
                              <span className="text-sm sm:text-base">{help}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {tool.important && (
                      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                        <p className="text-sm sm:text-base font-medium text-orange-800">
                          ⚠️ Важно: {tool.important}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </div>

                <div className={`rounded-2xl overflow-hidden shadow-xl ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <img 
                    src={tool.image} 
                    alt={tool.imageAlt}
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-16 border-2 border-blue-200 bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-10">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
              Чем отличаются от обычного ChatGPT и других AI?
            </h3>
            <div className="space-y-4">
              {differences.map((item, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={16} className="text-blue-700 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-base sm:text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}