import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function MasseursFooter() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">Д</span>
              </div>
              <span className="text-xl font-bold">Док диалог</span>
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

        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400 text-center sm:text-left">
            <p>© 2025 Док диалог. Все права защищены.</p>
            <p className="mt-1">ИП Водопьянов С.Г. ИНН 165045847936</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://t.me/SergeuVodopianov" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              <Icon name="MessageCircle" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}