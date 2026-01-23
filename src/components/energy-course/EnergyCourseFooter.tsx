import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

export default function EnergyCourseFooter() {
  const navigate = useNavigate();

  return (
    <>
      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Готовы работать из наполненного состояния?
            </h2>
            <p className="text-xl text-purple-200 mb-8">
              Запишитесь на курс или задайте вопросы в Telegram
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Button 
              size="lg"
              className="text-lg px-10 py-7 bg-white text-indigo-900 hover:bg-gray-100 shadow-2xl hover:shadow-white/50 transition-all"
              onClick={() => window.open('https://t.me/docdialog', '_blank')}
            >
              <Icon name="Rocket" size={22} className="mr-2" />
              Записаться на курс
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-10 py-7 border-2 border-white bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
              onClick={() => window.open('https://t.me/docdialog_bot', '_blank')}
            >
              <Icon name="MessageCircle" size={22} className="mr-2" />
              Задать вопрос
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/Group 7 (7).png" 
                  alt="Док диалог" 
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Экосистема для профессионального роста специалистов по телу
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Для специалистов</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => navigate("/register")} className="hover:text-primary transition-colors">
                    Регистрация
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/courses")} className="hover:text-primary transition-colors">
                    Курсы
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/masseurs")} className="hover:text-primary transition-colors">
                    Каталог специалистов
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Для школ</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => navigate("/schools-info")} className="hover:text-primary transition-colors">
                    Для школ
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/register/school")} className="hover:text-primary transition-colors">
                    Разместить школу
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/schools")} className="hover:text-primary transition-colors">
                    Каталог школ
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => navigate("/about")} className="hover:text-primary transition-colors">
                    О платформе
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/privacy")} className="hover:text-primary transition-colors">
                    Политика конфиденциальности
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/terms")} className="hover:text-primary transition-colors">
                    Условия использования
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-400 max-w-4xl mx-auto">
                Док диалог не оказывает медицинских услуг, не ставит диагнозы и не назначает лечение. Вся информация носит ознакомительный характер.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-400 text-center sm:text-left">
                <p>© 2025 Док диалог. Все права защищены.</p>
                <p className="mt-1">ИП Водопьянов С.Г. ИНН 165045847936</p>
                <p>ОГРНИП 321508100047334</p>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href="https://t.me/docdialog" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                >
                  <Icon name="Send" size={20} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Telegram</span>
                </a>
                <a 
                  href="https://t.me/docdialog_bot" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                >
                  <Icon name="Bot" size={20} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Тех поддержка</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
