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
}

export default function ToolLimitModal({ open, onOpenChange }: ToolLimitModalProps) {
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
            <div className="text-center">
              <Icon name="Info" size={24} className="text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Лимиты обновятся 1-го числа следующего месяца.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Вы можете докупить дополнительные запросы по 12₽ за штуку на странице инструментов.
              </p>
            </div>
          </div>

          <Button onClick={() => onOpenChange(false)} variant="outline" className="w-full" size="lg">
            Понятно
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}