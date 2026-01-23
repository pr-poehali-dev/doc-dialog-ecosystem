import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function ProfessionalFooter() {
  const navigate = useNavigate();

  return (
    <>
      {/* Final CTA */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6">
              Начните профессиональное развитие сегодня
            </h2>
            <p className="text-xl sm:text-2xl mb-10 text-white/90">
              Создайте профиль специалиста и получите доступ ко всем возможностям экосистемы
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="text-lg px-10 py-7 bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-white/50 transition-all"
                onClick={() => navigate('/register/masseur')}
              >
                Создать профиль бесплатно
                <Icon name="Sparkles" size={22} className="ml-2" />
              </Button>
              <Button 
                size="lg"
                className="text-lg px-10 py-7 border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white shadow-2xl"
                onClick={() => navigate('/courses')}
              >
                Смотреть курсы
                <Icon name="GraduationCat" size={22} className="ml-2" />
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Check" size={20} />
                <span>Бесплатная регистрация</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={20} />
                <span>5 AI-операций в месяц</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={20} />
                <span>Публичный профиль</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 sm:py-16">
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
                  <button onClick={() => navigate("/register/masseur")} className="hover:text-primary transition-colors">
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
                <li>
                  <button onClick={() => navigate("/dashboard/ai-dialogs")} className="hover:text-primary transition-colors">
                    AI Диалоги
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
              <div className="flex items-center gap-4">
                <a 
                  href="https://t.me/docdialog" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                >
                  <Icon name="Send" size={20} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}