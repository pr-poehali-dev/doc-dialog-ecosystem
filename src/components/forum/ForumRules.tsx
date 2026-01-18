import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface ForumRulesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ForumRules({ open, onOpenChange }: ForumRulesProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-slate-900 border-slate-700 max-h-[90vh] overflow-y-auto px-4 sm:px-6">
        <DialogHeader>
          <DialogTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
            <Icon name="ShieldCheck" size={24} className="text-blue-400 flex-shrink-0" />
            <span>Правила форума DocDialog</span>
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm sm:text-base">
            Пожалуйста, ознакомьтесь с правилами перед участием в обсуждениях
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 text-slate-300">
          {/* Основные принципы */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 flex items-center gap-2">
              <Icon name="Heart" size={18} className="text-blue-400 flex-shrink-0" />
              <span>Основные принципы</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-1 text-blue-400 flex-shrink-0" />
                <span>Относитесь друг к другу с уважением и профессионализмом</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-1 text-blue-400 flex-shrink-0" />
                <span>Обсуждайте только темы, связанные с массажем, остеопатией, обучением и профессиональным развитием</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-1 text-blue-400 flex-shrink-0" />
                <span>Делитесь опытом, помогайте коллегам решать профессиональные задачи</span>
              </li>
            </ul>
          </div>

          {/* Запрещено */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 flex items-center gap-2">
              <Icon name="AlertTriangle" size={18} className="text-red-400 flex-shrink-0" />
              <span>Строго запрещено</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <Icon name="X" size={16} className="mt-1 text-red-400 flex-shrink-0" />
                <div>
                  <strong className="text-white">Нецензурные выражения и оскорбления</strong>
                  <p className="text-slate-400 mt-0.5">Любые формы грубости, унижения или оскорбления других участников</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="X" size={16} className="mt-1 text-red-400 flex-shrink-0" />
                <div>
                  <strong className="text-white">Спам и реклама</strong>
                  <p className="text-slate-400 mt-0.5">Размещение рекламных сообщений, ссылок на сторонние ресурсы, навязчивые предложения услуг</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="X" size={16} className="mt-1 text-red-400 flex-shrink-0" />
                <div>
                  <strong className="text-white">Политика и религия</strong>
                  <p className="text-slate-400 mt-0.5">Обсуждение политических, религиозных и других тем, не связанных с профессиональной деятельностью</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="X" size={16} className="mt-1 text-red-400 flex-shrink-0" />
                <div>
                  <strong className="text-white">Офф-топик</strong>
                  <p className="text-slate-400 mt-0.5">Сообщения, не относящиеся к теме обсуждения или профессиональной сфере</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="X" size={16} className="mt-1 text-red-400 flex-shrink-0" />
                <div>
                  <strong className="text-white">Плагиат и нарушение авторских прав</strong>
                  <p className="text-slate-400 mt-0.5">Копирование чужих материалов без указания источника</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Ответственность */}
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 flex items-center gap-2">
              <Icon name="Shield" size={18} className="text-orange-400 flex-shrink-0" />
              <span>Ответственность за нарушения</span>
            </h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-400 font-bold">1</span>
                </div>
                <div>
                  <strong className="text-yellow-400">Первое нарушение — предупреждение</strong>
                  <p className="text-slate-400 mt-0.5">Модератор отправит вам личное сообщение с указанием на нарушение</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-400 font-bold">2</span>
                </div>
                <div>
                  <strong className="text-orange-400">Повторное нарушение — временная блокировка</strong>
                  <p className="text-slate-400 mt-0.5">Доступ к форуму будет ограничен на 7 дней</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 font-bold">3</span>
                </div>
                <div>
                  <strong className="text-red-400">Третье нарушение — удаление из системы</strong>
                  <p className="text-slate-400 mt-0.5">Ваш аккаунт будет навсегда удален из платформы DocDialog</p>
                </div>
              </div>
            </div>
          </div>

          {/* Рекомендации */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 flex items-center gap-2">
              <Icon name="Lightbulb" size={18} className="text-green-400 flex-shrink-0" />
              <span>Рекомендации</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-1 text-green-400 flex-shrink-0" />
                <span>Формулируйте вопросы четко и подробно — это поможет получить качественные ответы</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-1 text-green-400 flex-shrink-0" />
                <span>Используйте функцию поиска перед созданием новой темы</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-1 text-green-400 flex-shrink-0" />
                <span>Благодарите коллег за помощь и отмечайте решения, которые помогли</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-1 text-green-400 flex-shrink-0" />
                <span>Делитесь своим опытом — он может быть полезен другим специалистам</span>
              </li>
            </ul>
          </div>

          {/* Модерация */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              <Icon name="Info" size={16} className="inline mr-1.5 text-blue-400" />
              Администрация оставляет за собой право удалять сообщения, нарушающие правила, без предварительного уведомления. 
              В случае систематических нарушений аккаунт может быть заблокирован без возможности восстановления.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-3 sm:pt-4">
          <Button onClick={() => onOpenChange(false)} className="gap-2 w-full sm:w-auto" size="sm">
            <Icon name="CheckCircle" size={16} />
            Понятно
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}