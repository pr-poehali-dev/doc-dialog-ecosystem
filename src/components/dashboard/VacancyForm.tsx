import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const SALON_API = 'https://functions.poehali.dev/01aa5a2f-6476-4fbc-ba10-6808960c8a21';
const PAYMENT_API = 'https://functions.poehali.dev/7497cf71-d442-407d-99d7-d6ec11e01322';

const SPECIALIZATIONS = [
  'Классический массаж',
  'Спортивный массаж',
  'Антицеллюлитный массаж',
  'Лимфодренажный массаж',
  'Массаж лица',
  'Детский массаж',
  'Тайский массаж',
  'Стоун-терапия',
];

interface VacancyFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function VacancyForm({ open, onClose, onSuccess }: VacancyFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [needsPayment, setNeedsPayment] = useState(false);
  const [vacancyCount, setVacancyCount] = useState(0);
  const [formData, setFormData] = useState({
    specializations: [] as string[],
    schedule: '',
    salary_from: '',
    salary_to: '',
    requirements: '',
    requires_partner_courses: false,
  });

  useEffect(() => {
    if (open) {
      checkVacancyCount();
    }
  }, [open]);

  const checkVacancyCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch(PAYMENT_API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setVacancyCount(data.count || 0);
        setNeedsPayment(data.count > 0);
      }
    } catch (error) {
      console.error('Ошибка проверки количества вакансий:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.specializations.length === 0) {
      toast({
        title: 'Ошибка',
        description: 'Выберите хотя бы одну специализацию',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: 'Ошибка',
          description: 'Необходима авторизация',
          variant: 'destructive',
        });
        return;
      }

      // Тестовый режим - все вакансии создаются бесплатно
      const res = await fetch(`${SALON_API}?action=add_vacancy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          salary_from: formData.salary_from ? parseFloat(formData.salary_from) : null,
          salary_to: formData.salary_to ? parseFloat(formData.salary_to) : null,
        }),
      });

      if (res.ok) {
        toast({
          title: 'Успех',
          description: needsPayment 
            ? 'Вакансия добавлена (тестовый режим - без оплаты)' 
            : 'Вакансия успешно добавлена',
        });
        onSuccess?.();
        onClose();
      } else {
        const error = await res.json();
        toast({
          title: 'Ошибка',
          description: error.error || 'Не удалось добавить вакансию',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Произошла ошибка при добавлении вакансии',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSpecialization = (spec: string) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter((s) => s !== spec)
        : [...prev.specializations, spec],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Добавить вакансию</DialogTitle>
          <DialogDescription>
            <span className="text-blue-600 font-medium">
              <Icon name="TestTube" size={14} className="inline mr-1" />
              Тестовый режим: все вакансии бесплатны
            </span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Специализации *</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {SPECIALIZATIONS.map((spec) => (
                <div key={spec} className="flex items-center space-x-2">
                  <Checkbox
                    id={spec}
                    checked={formData.specializations.includes(spec)}
                    onCheckedChange={() => toggleSpecialization(spec)}
                  />
                  <label htmlFor={spec} className="text-sm cursor-pointer">
                    {spec}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="schedule">График работы</Label>
            <Input
              id="schedule"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              placeholder="Например: Полный день, 5/2"
              maxLength={500}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salary_from">Зарплата от (₽)</Label>
              <Input
                id="salary_from"
                type="number"
                value={formData.salary_from}
                onChange={(e) => setFormData({ ...formData, salary_from: e.target.value })}
                placeholder="50000"
                min="0"
                step="1000"
              />
            </div>
            <div>
              <Label htmlFor="salary_to">Зарплата до (₽)</Label>
              <Input
                id="salary_to"
                type="number"
                value={formData.salary_to}
                onChange={(e) => setFormData({ ...formData, salary_to: e.target.value })}
                placeholder="150000"
                min="0"
                step="1000"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="requirements">Требования</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="Опыт работы, образование, навыки..."
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="requires_partner_courses"
              checked={formData.requires_partner_courses}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, requires_partner_courses: checked as boolean })
              }
            />
            <label htmlFor="requires_partner_courses" className="text-sm cursor-pointer">
              Требуется обучение в школах-партнёрах
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Отмена
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Обработка...
                </>
              ) : (
                <>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}