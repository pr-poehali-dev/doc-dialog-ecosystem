import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

export default function ToolsDialogs() {
  const navigate = useNavigate();

  const differences = [
    'обучены именно на тематике работы с телом и клиентами',
    'адаптированы под реальную практику специалистов',
    'ориентированы на безопасность, а не на «советы»',
    'не подталкивают к работе, если есть риск',
    'помогают принять решение: работать или направить к врачу'
  ];

  return (
    <>
      {/* Dialogs Tool Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-purple-50/50 to-blue-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Инструменты «Диалоги»</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Поддержка специалиста в сложных ситуациях, где важны не техники, а решения
            </p>
          </div>

          <Card className="border-2 border-purple-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg flex items-center justify-center">
                  <Icon name="MessageCircle" size={24} className="text-white sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Диалоги Док диалог</h3>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="w-full aspect-[16/9] rounded-lg sm:rounded-xl overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/0a4849c3-128f-42ab-8e8f-d2b6b813fd22.jpg" 
                  alt="Профессиональное общение специалистов"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-base sm:text-lg leading-relaxed">
                Единое пространство для профессионального общения и поддержки специалиста.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { title: 'Супервизия', desc: 'помощь в разборе сложных ситуаций' },
                  { title: 'Разбор случаев', desc: 'анализ работы с клиентами без осуждения' },
                  { title: 'Границы', desc: 'помощь в ситуациях давления, ожиданий и манипуляций' },
                  { title: 'Выгорание', desc: 'поддержка в состоянии усталости и потери мотивации' },
                  { title: 'Развитие', desc: 'помощь в выборе дальнейшего профессионального пути' }
                ].map((item, index) => (
                  <div key={index} className="bg-purple-50 rounded-lg p-3 sm:p-4">
                    <h4 className="font-bold text-base sm:text-lg mb-1">{item.title}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <p className="font-semibold text-base sm:text-lg mb-2">Для чего это нужно:</p>
                <p className="text-base sm:text-lg">Чтобы специалист не оставался один на один со сложными решениями.</p>
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Почему это не «обычный ИИ»</h2>
          <p className="text-base sm:text-lg md:text-xl text-center text-muted-foreground mb-8 md:mb-12">
            Инструменты Док диалог — это не универсальный чат-бот.
          </p>

          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Их отличие:</h3>
              <div className="space-y-4 mb-8">
                {differences.map((diff, index) => (
                  <div key={index} className="flex items-start gap-3 sm:gap-4 bg-white/80 rounded-lg p-3 sm:p-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed">{diff}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
                <p className="text-base sm:text-lg md:text-xl font-semibold">
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">Про безопасность клиента и специалиста</h2>
          
          <Card className="border-2 border-green-200 bg-white/80 backdrop-blur-sm mb-8">
            <CardContent className="p-6 sm:p-8">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <p className="text-base sm:text-lg md:text-xl text-center font-medium leading-relaxed">
                  Мы считаем, что профессионализм — это не только умение работать руками,
                  <br />
                  но и умение вовремя сказать:
                </p>
                <p className="text-lg sm:text-xl md:text-2xl text-center font-bold text-green-700 mt-3 sm:mt-4">
                  «С этим вопросом лучше обратиться к врачу».
                </p>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Инструменты Док диалог помогают:</h3>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  'не выходить за границы своей компетенции',
                  'снизить риск осложнений',
                  'выстроить доверие с клиентом',
                  'работать спокойно и уверенно'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-green-50 rounded-lg p-3 sm:p-4">
                    <Icon name="Shield" size={20} className="text-green-600 flex-shrink-0 sm:w-6 sm:h-6" />
                    <span className="text-base sm:text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
