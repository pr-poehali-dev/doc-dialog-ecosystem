import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function ProfessionalHero() {
  const navigate = useNavigate();

  return (
    <section className="relative py-12 md:py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/files/mid-shot-woman-talking-man-counselor.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-purple-200 shadow-lg">
            <Icon name="Sparkles" className="text-purple-600" size={18} />
            <span className="text-sm font-semibold text-gray-700">Док диалог для специалистов по телу</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent px-2">
            Настрой диалог с собой
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-6 md:mb-10 leading-relaxed px-4 max-w-4xl mx-auto font-medium">
            Экосистема для специалистов по телу, которые хотят расти профессионально, а не просто искать клиентов.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto"
              onClick={() => navigate('/register/masseur')}
            >
              Создать профиль специалиста
              <Icon name="ArrowRight" size={22} className="ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              className="text-lg px-10 py-7 w-full sm:w-auto border-2 bg-white/50 backdrop-blur-sm"
              onClick={() => navigate('/dashboard/ai-dialogs')}
            >
              Попробовать AI
              <Icon name="Sparkles" size={22} className="ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-3xl mx-auto">
            {[
              { number: "24/7", label: "AI Поддержка" },
              { number: "6+", label: "AI Инструментов" },
              { number: "3000+", label: "Специалистов" },
            ].map((stat, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-purple-100">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">{stat.number}</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}