import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface SettingsCardProps {
  selectedType: 'masseur' | 'salon' | 'school' | 'user';
  telegramUrl: string;
  onTelegramUrlChange: (url: string) => void;
  onSave: () => void;
}

const TARGET_TYPES = [
  { value: 'masseur', label: 'Массажисты' },
  { value: 'salon', label: 'Салоны' },
  { value: 'school', label: 'Школы' },
  { value: 'user', label: 'Пользователи' }
];

export default function SettingsCard({ selectedType, telegramUrl, onTelegramUrlChange, onSave }: SettingsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Settings" size={20} />
          Настройки поддержки
        </CardTitle>
        <CardDescription>
          Ссылка на Telegram-канал поддержки для {TARGET_TYPES.find(t => t.value === selectedType)?.label}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            value={telegramUrl}
            onChange={(e) => onTelegramUrlChange(e.target.value)}
            placeholder="https://t.me/..."
          />
          <Button onClick={onSave}>
            <Icon name="Save" size={18} className="mr-2" />
            Сохранить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
