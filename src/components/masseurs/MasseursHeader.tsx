import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function MasseursHeader() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-10" />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Войти
            </Button>
            <Button onClick={() => navigate("/register")} className="bg-gradient-to-r from-primary to-primary/90">
              Начать карьеру
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}