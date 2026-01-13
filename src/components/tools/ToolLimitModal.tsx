import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ToolLimitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgradeClick: () => void;
}

export default function ToolLimitModal({ open, onOpenChange, onUpgradeClick }: ToolLimitModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
            <Icon name="AlertTriangle" size={24} className="text-orange-600" />
          </div>
          <DialogTitle className="text-center">Лимит исчерпан</DialogTitle>
          <DialogDescription className="text-center">
            Вы исчерпали лимит бесплатных использований AI-инструментов в этом месяце.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Icon name="Crown" size={18} className="text-primary" />
              Преимущества Premium
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Безлимитное использование AI-инструментов</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Неограниченные диалоги для супервизии</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Приоритетная поддержка</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Доступ к новым инструментам в первую очередь</span>
              </li>
            </ul>
          </div>

          <Button onClick={onUpgradeClick} className="w-full" size="lg">
            <Icon name="Crown" size={18} className="mr-2" />
            Перейти на Premium
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Лимиты обновятся 1-го числа следующего месяца
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
