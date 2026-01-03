import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface TargetAudienceItem {
  title: string;
  description: string;
  icon_url: string;
  sort_order: number;
}

interface ProgramModule {
  module_name: string;
  description: string;
  sort_order: number;
}

interface Bonus {
  bonus_name: string;
  description: string;
  sort_order: number;
}

interface LandingFormData {
  target_audience: TargetAudienceItem[];
  results: string[];
  program: ProgramModule[];
  bonuses: Bonus[];
}

interface EditorSectionContentProps {
  section: string;
  form: LandingFormData;
  onFormChange: (updates: Partial<LandingFormData>) => void;
  onAddTargetAudience: () => void;
  onAddResult: () => void;
  onAddProgramModule: () => void;
  onAddBonus: () => void;
}

export function EditorSectionContent({
  section,
  form,
  onFormChange,
  onAddTargetAudience,
  onAddResult,
  onAddProgramModule,
  onAddBonus
}: EditorSectionContentProps) {
  if (section === 'audience') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Для кого курс</h2>
          <Button size="sm" onClick={onAddTargetAudience}>
            <Icon name="Plus" className="mr-2" size={16} />
            Добавить
          </Button>
        </div>
        {form.target_audience.map((item, idx) => (
          <div key={idx} className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Блок {idx + 1}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onFormChange({ target_audience: form.target_audience.filter((_, i) => i !== idx) })}
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
            <Input
              value={item.title}
              onChange={(e) => {
                const updated = [...form.target_audience];
                updated[idx].title = e.target.value;
                onFormChange({ target_audience: updated });
              }}
              placeholder="Заголовок"
            />
            <Textarea
              value={item.description}
              onChange={(e) => {
                const updated = [...form.target_audience];
                updated[idx].description = e.target.value;
                onFormChange({ target_audience: updated });
              }}
              placeholder="Описание"
              rows={2}
            />
            <Input
              value={item.icon_url}
              onChange={(e) => {
                const updated = [...form.target_audience];
                updated[idx].icon_url = e.target.value;
                onFormChange({ target_audience: updated });
              }}
              placeholder="Ссылка на иконку"
            />
          </div>
        ))}
      </div>
    );
  }

  if (section === 'results') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Результаты обучения</h2>
          <Button size="sm" onClick={onAddResult}>
            <Icon name="Plus" className="mr-2" size={16} />
            Добавить
          </Button>
        </div>
        {form.results.map((result, idx) => (
          <div key={idx} className="flex gap-2">
            <Input
              value={result}
              onChange={(e) => {
                const updated = [...form.results];
                updated[idx] = e.target.value;
                onFormChange({ results: updated });
              }}
              placeholder={`Результат ${idx + 1}`}
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onFormChange({ results: form.results.filter((_, i) => i !== idx) })}
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        ))}
      </div>
    );
  }

  if (section === 'program') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Программа курса</h2>
          <Button size="sm" onClick={onAddProgramModule}>
            <Icon name="Plus" className="mr-2" size={16} />
            Добавить модуль
          </Button>
        </div>
        {form.program.map((module, idx) => (
          <div key={idx} className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Модуль {idx + 1}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onFormChange({ program: form.program.filter((_, i) => i !== idx) })}
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
            <Input
              value={module.module_name}
              onChange={(e) => {
                const updated = [...form.program];
                updated[idx].module_name = e.target.value;
                onFormChange({ program: updated });
              }}
              placeholder="Название модуля"
            />
            <Textarea
              value={module.description}
              onChange={(e) => {
                const updated = [...form.program];
                updated[idx].description = e.target.value;
                onFormChange({ program: updated });
              }}
              placeholder="Описание модуля"
              rows={3}
            />
          </div>
        ))}
      </div>
    );
  }

  if (section === 'bonuses') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Бонусы</h2>
          <Button size="sm" onClick={onAddBonus}>
            <Icon name="Plus" className="mr-2" size={16} />
            Добавить бонус
          </Button>
        </div>
        {form.bonuses.map((bonus, idx) => (
          <div key={idx} className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Бонус {idx + 1}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onFormChange({ bonuses: form.bonuses.filter((_, i) => i !== idx) })}
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
            <Input
              value={bonus.bonus_name}
              onChange={(e) => {
                const updated = [...form.bonuses];
                updated[idx].bonus_name = e.target.value;
                onFormChange({ bonuses: updated });
              }}
              placeholder="Название бонуса"
            />
            <Textarea
              value={bonus.description}
              onChange={(e) => {
                const updated = [...form.bonuses];
                updated[idx].description = e.target.value;
                onFormChange({ bonuses: updated });
              }}
              placeholder="Описание бонуса"
              rows={2}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}
