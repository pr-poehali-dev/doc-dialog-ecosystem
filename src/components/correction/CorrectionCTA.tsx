import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const CorrectionCTA = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6TTAgMTRjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMi0xMi01LjM3My0xMi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 drop-shadow-lg">
            Готовы работать с фигурой осознанно?
          </h2>
          <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Освойте коррекцию фигуры и получите поток клиентов без затрат на рекламу
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-white text-rose-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all" asChild>
              <a href="https://school.brossok.ru/buy/43" target="_blank" rel="noopener noreferrer">
                <Icon name="Play" size={18} className="mr-2" />
                Записаться на курс
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-rose-600 transition-all" asChild>
              <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
                <Icon name="MessageCircle" size={18} className="mr-2" />
                Задать вопрос
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorrectionCTA;