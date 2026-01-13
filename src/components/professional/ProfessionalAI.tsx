import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ProfessionalAI() {
  const navigate = useNavigate();

  const aiTools = [
    { icon: 'Users', title: 'Супервизия', description: 'Разбор сложных ситуаций с клиентами' },
    { icon: 'FileText', title: 'Разбор случая', description: 'Глубокий анализ клиентских запросов' },
    { icon: 'Shield', title: 'Границы', description: 'Работа с профессиональными границами' },
    { icon: 'Heart', title: 'Выгорание', description: 'Профилактика эмоционального истощения' },
    { icon: 'TrendingUp', title: 'Развитие', description: 'Стратегия профессионального роста' },
    { icon: 'Stethoscope', title: 'Медицинский анализ', description: 'Расшифровка заключений МРТ, УЗИ' }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/55b7c094-4bc1-43ee-823f-185339203d50.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full mb-6 shadow-xl">
              <Icon name="Sparkles" size={20} />
              <span className="font-semibold">Ядро экосистемы</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Профессиональная супервизия 24/7
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              AI Диалоги — это конфиденциальное пространство, где вы можете обсудить рабочие ситуации, профессиональные сомнения и развитие навыков
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {aiTools.map((tool, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                    <Icon name={tool.icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{tool.title}</h3>
                  <p className="text-sm text-gray-300">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="text-lg px-10 py-7 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/50 transition-all"
              onClick={() => navigate('/dashboard/ai-dialogs')}
            >
              Начать диалог с AI
              <Icon name="MessageSquare" size={22} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
