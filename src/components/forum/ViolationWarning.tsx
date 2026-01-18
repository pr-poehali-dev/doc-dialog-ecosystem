import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface ViolationWarningProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  violationType: 'first' | 'second' | 'final';
  reason: string;
  onAccept: () => void;
}

export default function ViolationWarning({ 
  open, 
  onOpenChange, 
  violationType, 
  reason,
  onAccept 
}: ViolationWarningProps) {
  
  const warningContent = {
    first: {
      icon: 'AlertTriangle' as const,
      iconColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      title: 'Предупреждение о нарушении правил',
      description: 'Это первое предупреждение. Пожалуйста, ознакомьтесь с правилами форума.',
      message: 'Ваше сообщение нарушило правила форума',
      consequence: 'При повторном нарушении ваш доступ к форуму будет временно ограничен на 7 дней.',
    },
    second: {
      icon: 'ShieldAlert' as const,
      iconColor: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      title: 'Повторное нарушение правил',
      description: 'Это второе предупреждение. Доступ к форуму будет ограничен.',
      message: 'Вы получили второе предупреждение за нарушение правил форума',
      consequence: 'Ваш доступ к форуму временно ограничен на 7 дней. При третьем нарушении аккаунт будет удален навсегда.',
    },
    final: {
      icon: 'XCircle' as const,
      iconColor: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      title: 'Окончательное предупреждение',
      description: 'Ваш аккаунт будет удален из системы.',
      message: 'Вы получили третье предупреждение за систематическое нарушение правил',
      consequence: 'Ваш аккаунт будет навсегда удален из платформы DocDialog без возможности восстановления.',
    },
  };

  const content = warningContent[violationType];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-slate-900 border-slate-700 px-4 sm:px-6">
        <DialogHeader>
          <DialogTitle className={`text-white text-lg sm:text-xl flex items-center gap-2 sm:gap-3 ${content.bgColor} ${content.borderColor} border p-3 sm:p-4 rounded-lg`}>
            <Icon name={content.icon} size={28} className={`${content.iconColor} flex-shrink-0`} />
            <span className="leading-tight">{content.title}</span>
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm sm:text-base pt-2">
            {content.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-5 py-3 sm:py-4">
          {/* Сообщение о нарушении */}
          <div className={`${content.bgColor} ${content.borderColor} border rounded-lg p-3 sm:p-4`}>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Icon name="AlertCircle" size={16} className={`${content.iconColor} flex-shrink-0`} />
              <span>{content.message}</span>
            </h4>
            <div className="bg-slate-800/80 rounded p-2.5 sm:p-3 mt-2 sm:mt-3">
              <p className="text-xs sm:text-sm text-slate-300">
                <strong className="text-white">Причина:</strong> {reason}
              </p>
            </div>
          </div>

          {/* Последствия */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 sm:p-4">
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Icon name="Info" size={16} className="text-blue-400 flex-shrink-0" />
              <span>Последствия</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {content.consequence}
            </p>
          </div>

          {/* Напоминание о правилах */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <Icon name="BookOpen" size={16} className="inline mr-2 text-blue-400" />
              Пожалуйста, ознакомьтесь с{' '}
              <button 
                onClick={() => {
                  // Здесь можно открыть правила форума
                  onAccept();
                }}
                className="text-blue-400 hover:text-blue-300 underline font-medium"
              >
                правилами форума
              </button>
              {' '}и соблюдайте их для поддержания профессиональной атмосферы общения.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button 
            onClick={onAccept}
            className={`gap-2 w-full sm:w-auto ${violationType === 'final' ? 'bg-red-600 hover:bg-red-700' : ''}`}
            size="sm"
          >
            <Icon name="Check" size={16} />
            {violationType === 'final' ? 'Понятно' : 'Принимаю к сведению'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}