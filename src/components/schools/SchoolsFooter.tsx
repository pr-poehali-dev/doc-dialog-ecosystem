import { useNavigate } from "react-router-dom";

export default function SchoolsFooter() {
  const navigate = useNavigate();

  return (
    <footer className="py-12 border-t bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-8" />
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/about')}>О проекте</span>
            <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/schools')}>Школы</span>
            <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/courses')}>Курсы</span>
            <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/privacy')}>Политика конфиденциальности</span>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-muted-foreground">
          © 2024 Док диалог. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
