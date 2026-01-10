import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface TypeSelectorProps {
  selectedType: 'masseur' | 'salon' | 'school' | 'user';
  onTypeChange: (type: 'masseur' | 'salon' | 'school' | 'user') => void;
  faqCounts: Record<string, number>;
}

const TARGET_TYPES = [
  { value: 'masseur', label: 'Массажисты', icon: 'User' },
  { value: 'salon', label: 'Салоны', icon: 'Building' },
  { value: 'school', label: 'Школы', icon: 'GraduationCap' },
  { value: 'user', label: 'Пользователи', icon: 'Users' }
];

export default function TypeSelector({ selectedType, onTypeChange, faqCounts }: TypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {TARGET_TYPES.map(type => (
        <Card
          key={type.value}
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedType === type.value ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onTypeChange(type.value as any)}
        >
          <CardContent className="pt-6 text-center">
            <Icon name={type.icon as any} size={32} className="mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">{type.label}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {faqCounts[type.value] || 0} вопросов
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
