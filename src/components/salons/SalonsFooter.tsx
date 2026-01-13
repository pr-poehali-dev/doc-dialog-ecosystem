import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function SalonsFooter() {
  const navigate = useNavigate();

  return (
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
              Находим проверенных специалистов для вашего салона
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Для салонов</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => navigate("/salon/cabinet")} className="hover:text-secondary transition-colors">
                  Разместить вакансию
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/masseurs")} className="hover:text-secondary transition-colors">
                  Найти специалиста
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/salons")} className="hover:text-secondary transition-colors">
                  Каталог салонов
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Для специалистов</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => navigate("/masseurs-info")} className="hover:text-secondary transition-colors">
                  Для массажистов
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/register")} className="hover:text-secondary transition-colors">
                  Регистрация
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/courses")} className="hover:text-secondary transition-colors">
                  Курсы
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Поддержка</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => navigate("/about")} className="hover:text-secondary transition-colors">
                  О платформе
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/privacy")} className="hover:text-secondary transition-colors">
                  Политика конфиденциальности
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/terms")} className="hover:text-secondary transition-colors">
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
            <a href="https://t.me/SergeuVodopianov" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors">
              <Icon name="MessageCircle" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}