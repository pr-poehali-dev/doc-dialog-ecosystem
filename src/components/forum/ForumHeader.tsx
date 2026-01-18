import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ForumHeaderProps {
  onShowRules: () => void;
}

export default function ForumHeader({ onShowRules }: ForumHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0 mb-6">
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-initial"
          >
            <Icon name="Rocket" size={18} className="mr-2" />
            <span className="hidden sm:inline">Платформа</span>
            <span className="sm:hidden">Платформа</span>
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="sm"
            className="flex-1 sm:flex-initial"
          >
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            <span className="hidden sm:inline">На главную</span>
            <span className="sm:hidden">Главная</span>
          </Button>
        </div>
        <Button
          onClick={onShowRules}
          variant="outline"
          size="sm"
          className="gap-2 w-full sm:w-auto"
        >
          <Icon name="ShieldCheck" size={18} />
          <span className="hidden sm:inline">Правила форума</span>
          <span className="sm:hidden">Правила</span>
        </Button>
      </div>
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
          Профессиональный форум
        </h1>
        <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto px-2">
          Общайтесь с коллегами, делитесь опытом, получайте советы от профессионалов
        </p>
      </div>
    </div>
  );
}
