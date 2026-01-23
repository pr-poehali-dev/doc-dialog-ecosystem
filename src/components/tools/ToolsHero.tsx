import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

interface ToolsHeroProps {
  onScrollToTools: () => void;
}

export default function ToolsHero({ onScrollToTools }: ToolsHeroProps) {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-16">
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
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-white drop-shadow-2xl leading-tight px-2">
            Инструменты для специалиста
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-50 mb-8 md:mb-10 leading-relaxed drop-shadow-lg font-medium px-2">
            Цифровые помощники, которые помогают безопасно работать с клиентами, 
            принимать взвешенные решения и не выходить за границы своей компетенции
          </p>
          <div className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/20 mb-8 md:mb-10 mx-2">
            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
              Инструменты Док диалог созданы для специалистов, работающих с телом и людьми.
              <br />
              Они помогают понять клиента глубже, оценить риски и принять правильное решение — 
              работать дальше или направить к врачу.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button size="lg" onClick={onScrollToTools} className="text-lg px-10 py-6 bg-white text-blue-600 hover:bg-blue-50 shadow-xl">
              <Icon name="Search" className="mr-2" size={22} />
              Смотреть инструменты
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/register')} className="text-lg px-10 py-6 bg-blue-600 text-white border-2 border-white hover:bg-blue-700 shadow-xl">
              <Icon name="Sparkles" className="mr-2" size={22} />
              Попробовать бесплатно
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
