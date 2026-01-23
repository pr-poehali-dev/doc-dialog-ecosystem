import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

export default function EnergyCourseFooter() {
  const navigate = useNavigate();

  return (
    <>
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.2),transparent_50%)]"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-100 to-indigo-200 bg-clip-text text-transparent">
                Готовы работать из наполненного состояния?
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-200 font-light">
              Запишитесь на курс или задайте вопросы в Telegram
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 max-w-3xl mx-auto">
            <Button 
              size="lg"
              className="w-full sm:flex-1 text-base sm:text-lg md:text-xl px-8 sm:px-10 py-6 sm:py-7 md:py-8 bg-white text-indigo-900 hover:bg-gray-50 shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105 font-semibold"
              onClick={() => window.open('https://school.brossok.ru/buy/61', '_blank')}
            >
              <Icon name="Rocket" size={22} className="mr-2" />
              Записаться на курс
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="w-full sm:flex-1 text-base sm:text-lg md:text-xl px-8 sm:px-10 py-6 sm:py-7 md:py-8 border-2 border-white bg-white/5 backdrop-blur-xl text-white hover:bg-white/15 transition-all duration-300 hover:scale-105 font-semibold"
              onClick={() => window.open('https://t.me/SergeuVodopianov', '_blank')}
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