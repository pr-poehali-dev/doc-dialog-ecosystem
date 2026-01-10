import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FAQItem {
  id: number;
  target_type: 'masseur' | 'salon' | 'school' | 'user';
  category: string;
  question: string;
  answer: string;
  order_index: number;
  created_at: string;
}

interface FAQDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem: FAQItem | null;
  selectedType: 'masseur' | 'salon' | 'school' | 'user';
  formData: {
    category: string;
    question: string;
    answer: string;
  };
  onFormChange: (data: { category: string; question: string; answer: string }) => void;
  categories: string[];
  onSave: () => void;
}

const TARGET_TYPES = [
  { value: 'masseur', label: 'Массажисты' },
  { value: 'salon', label: 'Салоны' },
  { value: 'school', label: 'Школы' },
  { value: 'user', label: 'Пользователи' }
];

export default function FAQDialog({
  open,
  onOpenChange,
  editingItem,
  selectedType,
  formData,
  onFormChange,
  categories,
  onSave
}: FAQDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? 'Редактировать вопрос' : 'Добавить вопрос'}
          </DialogTitle>
          <DialogDescription>
            Для {TARGET_TYPES.find(t => t.value === selectedType)?.label}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Категория</Label>
            <Input
              value={formData.category}
              onChange={(e) => onFormChange({ ...formData, category: e.target.value })}
              placeholder="Общие вопросы"
            />
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    size="sm"
                    variant="outline"
                    onClick={() => onFormChange({ ...formData, category: cat })}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            )}
          </div>
          <div>
            <Label>Вопрос</Label>
            <Input
              value={formData.question}
              onChange={(e) => onFormChange({ ...formData, question: e.target.value })}
              placeholder="Как начать работу?"
            />
          </div>
          <div>
            <Label>Ответ</Label>
            <Textarea
              value={formData.answer}
              onChange={(e) => onFormChange({ ...formData, answer: e.target.value })}
              placeholder="Подробный ответ на вопрос..."
              rows={6}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={onSave}>
            <Icon name="Save" size={18} className="mr-2" />
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
