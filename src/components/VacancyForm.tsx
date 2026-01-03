import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Vacancy {
  specializations: string[];
  schedule: string;
  salary_from: number | null;
  salary_to: number | null;
  salary_currency: string;
  requirements: string;
  requires_partner_courses: boolean;
}

interface VacancyFormProps {
  vacancies: Vacancy[];
  onChange: (vacancies: Vacancy[]) => void;
}

const MASSAGE_SPECIALIZATIONS = [
  'Классический массаж',
  'Спортивный массаж',
  'Антицеллюлитный массаж',
  'Лимфодренажный массаж',
  'Лечебный массаж',
  'SPA-процедуры',
  'Тайский массаж',
  'Расслабляющий массаж'
];

export default function VacancyForm({ vacancies, onChange }: VacancyFormProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const addVacancy = () => {
    onChange([
      ...vacancies,
      {
        specializations: [],
        schedule: '',
        salary_from: null,
        salary_to: null,
        salary_currency: 'RUB',
        requirements: 'Обязательно прохождение курсов в школах-партнерах Док Диалог',
        requires_partner_courses: true
      }
    ]);
    setExpandedIndex(vacancies.length);
  };

  const removeVacancy = (index: number) => {
    onChange(vacancies.filter((_, i) => i !== index));
    setExpandedIndex(null);
  };

  const updateVacancy = (index: number, field: keyof Vacancy, value: any) => {
    const updated = vacancies.map((v, i) => (i === index ? { ...v, [field]: value } : v));
    onChange(updated);
  };

  const toggleSpecialization = (vacancyIndex: number, spec: string) => {
    const vacancy = vacancies[vacancyIndex];
    const newSpecs = vacancy.specializations.includes(spec)
      ? vacancy.specializations.filter((s) => s !== spec)
      : [...vacancy.specializations, spec];
    updateVacancy(vacancyIndex, 'specializations', newSpecs);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Вакансии массажистов</Label>
        <Button type="button" variant="outline" size="sm" onClick={addVacancy}>
          <Icon name="Plus" size={16} className="mr-1" />
          Добавить вакансию
        </Button>
      </div>

      {vacancies.length === 0 && (
        <p className="text-sm text-muted-foreground">Нет активных вакансий</p>
      )}

      {vacancies.map((vacancy, index) => (
        <Card key={index}>
          <CardHeader
            className="cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                Вакансия #{index + 1}
                {vacancy.specializations.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({vacancy.specializations.join(', ')})
                  </span>
                )}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Icon
                  name={expandedIndex === index ? 'ChevronUp' : 'ChevronDown'}
                  size={20}
                />
              </div>
            </div>
          </CardHeader>

          {expandedIndex === index && (
            <CardContent className="space-y-4 pt-0">
              <div>
                <Label className="mb-2 block">Специализации *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {MASSAGE_SPECIALIZATIONS.map((spec) => (
                    <div key={spec} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${index}-${spec}`}
                        checked={vacancy.specializations.includes(spec)}
                        onCheckedChange={() => toggleSpecialization(index, spec)}
                      />
                      <label
                        htmlFor={`${index}-${spec}`}
                        className="text-sm cursor-pointer"
                      >
                        {spec}
                      </label>
                    </div>
                  ))}
                </div>
                {vacancy.specializations.length === 0 && (
                  <p className="text-xs text-destructive mt-1">Выберите хотя бы одну специализацию</p>
                )}
              </div>

              <div>
                <Label htmlFor={`schedule-${index}`}>График работы</Label>
                <Input
                  id={`schedule-${index}`}
                  value={vacancy.schedule}
                  onChange={(e) => updateVacancy(index, 'schedule', e.target.value)}
                  placeholder="Например: 5/2, с 9:00 до 18:00"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor={`salary-from-${index}`}>ЗП от (₽)</Label>
                  <Input
                    id={`salary-from-${index}`}
                    type="number"
                    value={vacancy.salary_from || ''}
                    onChange={(e) =>
                      updateVacancy(
                        index,
                        'salary_from',
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    placeholder="50000"
                  />
                </div>
                <div>
                  <Label htmlFor={`salary-to-${index}`}>ЗП до (₽)</Label>
                  <Input
                    id={`salary-to-${index}`}
                    type="number"
                    value={vacancy.salary_to || ''}
                    onChange={(e) =>
                      updateVacancy(
                        index,
                        'salary_to',
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    placeholder="100000"
                  />
                </div>
                <div>
                  <Label htmlFor={`currency-${index}`}>Валюта</Label>
                  <Input
                    id={`currency-${index}`}
                    value={vacancy.salary_currency}
                    onChange={(e) => updateVacancy(index, 'salary_currency', e.target.value)}
                    placeholder="RUB"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`requirements-${index}`}>Требования</Label>
                <Textarea
                  id={`requirements-${index}`}
                  value={vacancy.requirements}
                  onChange={(e) => updateVacancy(index, 'requirements', e.target.value)}
                  rows={3}
                  placeholder="Опишите требования к кандидату"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`partner-${index}`}
                  checked={vacancy.requires_partner_courses}
                  onCheckedChange={(checked) =>
                    updateVacancy(index, 'requires_partner_courses', checked)
                  }
                />
                <label htmlFor={`partner-${index}`} className="text-sm cursor-pointer">
                  Требуется прохождение курсов в школах-партнерах Док Диалог
                </label>
              </div>

              {vacancy.requires_partner_courses && (
                <Badge variant="secondary" className="text-xs">
                  <Icon name="GraduationCap" size={12} className="mr-1" />
                  Партнерская программа обучения
                </Badge>
              )}

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeVacancy(index)}
              >
                <Icon name="Trash2" size={16} className="mr-1" />
                Удалить вакансию
              </Button>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
