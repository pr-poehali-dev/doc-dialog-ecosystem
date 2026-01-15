import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AnamnesisToolProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAnalyze: (formData: AnamnesisFormData) => void;
  loading: boolean;
  response: string;
}

export interface AnamnesisFormData {
  fullName: string;
  age: string;
  gender: string;
  mainComplaint: string;
  complaintDuration: string;
  painLocation: string;
  painIntensity: string;
  painCharacter: string;
  chronicDiseases: string;
  medications: string;
  injuries: string;
  surgeries: string;
  lifestyle: string;
  physicalActivity: string;
  sleep: string;
  stress: string;
  goals: string;
  contraindications: string;
  additionalInfo: string;
}

export default function AnamnesisTool({
  open,
  onOpenChange,
  onAnalyze,
  loading,
  response
}: AnamnesisToolProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AnamnesisFormData>({
    fullName: '',
    age: '',
    gender: '',
    mainComplaint: '',
    complaintDuration: '',
    painLocation: '',
    painIntensity: '',
    painCharacter: '',
    chronicDiseases: '',
    medications: '',
    injuries: '',
    surgeries: '',
    lifestyle: '',
    physicalActivity: '',
    sleep: '',
    stress: '',
    goals: '',
    contraindications: '',
    additionalInfo: ''
  });

  const handleChange = (field: keyof AnamnesisFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.age || !formData.mainComplaint) {
      toast({
        title: 'Ошибка',
        description: 'Заполните обязательные поля: ФИО, возраст, основная жалоба',
        variant: 'destructive'
      });
      return;
    }
    onAnalyze(formData);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      age: '',
      gender: '',
      mainComplaint: '',
      complaintDuration: '',
      painLocation: '',
      painIntensity: '',
      painCharacter: '',
      chronicDiseases: '',
      medications: '',
      injuries: '',
      surgeries: '',
      lifestyle: '',
      physicalActivity: '',
      sleep: '',
      stress: '',
      goals: '',
      contraindications: '',
      additionalInfo: ''
    });
  };

  const copyAnamnesisToClipboard = () => {
    const anamnesisText = `
АНАМНЕЗ КЛИЕНТА

Общая информация:
- ФИО: ${formData.fullName}
- Возраст: ${formData.age} лет
- Пол: ${formData.gender === 'male' ? 'Мужской' : formData.gender === 'female' ? 'Женский' : 'Не указан'}

Жалобы и симптомы:
- Основная жалоба: ${formData.mainComplaint}
- Длительность: ${formData.complaintDuration || 'Не указана'}
- Локализация: ${formData.painLocation || 'Не указана'}
- Интенсивность боли: ${formData.painIntensity || 'Не указана'}/10
- Характер боли: ${formData.painCharacter || 'Не указан'}

Медицинская история:
- Хронические заболевания: ${formData.chronicDiseases || 'Нет'}
- Принимаемые препараты: ${formData.medications || 'Нет'}
- Травмы: ${formData.injuries || 'Нет'}
- Операции: ${formData.surgeries || 'Нет'}

Образ жизни:
- Профессия: ${formData.lifestyle || 'Не указана'}
- Физическая активность: ${formData.physicalActivity || 'Не указана'}
- Качество сна: ${formData.sleep || 'Не указано'}
- Уровень стресса: ${formData.stress || 'Не указан'}

Цели и ограничения:
- Цели клиента: ${formData.goals || 'Не указаны'}
- Противопоказания: ${formData.contraindications || 'Нет'}
- Дополнительная информация: ${formData.additionalInfo || 'Нет'}

---

AI-АНАЛИЗ:

${response}
    `;
    
    navigator.clipboard.writeText(anamnesisText).then(() => {
      toast({
        title: 'Скопировано',
        description: 'Анамнез и анализ скопированы в буфер обмена'
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Icon name="ClipboardList" size={20} className="text-primary flex-shrink-0" />
            <span className="truncate">Сбор анамнеза клиента</span>
          </DialogTitle>
          <DialogDescription className="text-sm">
            Заполните форму для получения AI-анализа и рекомендаций по работе с клиентом
          </DialogDescription>
        </DialogHeader>

        {!response ? (
          <div className="space-y-6 py-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Общая информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName">ФИО клиента *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Иванов Иван Иванович"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Возраст *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      placeholder="35"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Пол</Label>
                    <Select value={formData.gender} onValueChange={(val) => handleChange('gender', val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Мужской</SelectItem>
                        <SelectItem value="female">Женский</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Жалобы и симптомы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="mainComplaint">Основная жалоба *</Label>
                  <Textarea
                    id="mainComplaint"
                    value={formData.mainComplaint}
                    onChange={(e) => handleChange('mainComplaint', e.target.value)}
                    placeholder="Опишите основную проблему клиента..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="complaintDuration">Как давно беспокоит</Label>
                  <Input
                    id="complaintDuration"
                    value={formData.complaintDuration}
                    onChange={(e) => handleChange('complaintDuration', e.target.value)}
                    placeholder="2 недели / 3 месяца / 1 год"
                  />
                </div>
                <div>
                  <Label htmlFor="painLocation">Локализация боли/дискомфорта</Label>
                  <Input
                    id="painLocation"
                    value={formData.painLocation}
                    onChange={(e) => handleChange('painLocation', e.target.value)}
                    placeholder="Поясница, шея, плечи..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="painIntensity">Интенсивность боли (1-10)</Label>
                    <Input
                      id="painIntensity"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.painIntensity}
                      onChange={(e) => handleChange('painIntensity', e.target.value)}
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="painCharacter">Характер боли</Label>
                    <Input
                      id="painCharacter"
                      value={formData.painCharacter}
                      onChange={(e) => handleChange('painCharacter', e.target.value)}
                      placeholder="Острая, тупая, ноющая..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Медицинская история</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="chronicDiseases">Хронические заболевания</Label>
                  <Textarea
                    id="chronicDiseases"
                    value={formData.chronicDiseases}
                    onChange={(e) => handleChange('chronicDiseases', e.target.value)}
                    placeholder="Гипертония, диабет, артрит..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="medications">Принимаемые препараты</Label>
                  <Textarea
                    id="medications"
                    value={formData.medications}
                    onChange={(e) => handleChange('medications', e.target.value)}
                    placeholder="Название препаратов и дозировка..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="injuries">Травмы в анамнезе</Label>
                  <Textarea
                    id="injuries"
                    value={formData.injuries}
                    onChange={(e) => handleChange('injuries', e.target.value)}
                    placeholder="Переломы, растяжения, ушибы..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="surgeries">Перенесённые операции</Label>
                  <Textarea
                    id="surgeries"
                    value={formData.surgeries}
                    onChange={(e) => handleChange('surgeries', e.target.value)}
                    placeholder="Какие операции и когда..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Образ жизни</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="lifestyle">Профессия и режим работы</Label>
                  <Input
                    id="lifestyle"
                    value={formData.lifestyle}
                    onChange={(e) => handleChange('lifestyle', e.target.value)}
                    placeholder="Офисный работник, сидячая работа 8 часов..."
                  />
                </div>
                <div>
                  <Label htmlFor="physicalActivity">Физическая активность</Label>
                  <Textarea
                    id="physicalActivity"
                    value={formData.physicalActivity}
                    onChange={(e) => handleChange('physicalActivity', e.target.value)}
                    placeholder="Спорт, фитнес, прогулки..."
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sleep">Качество сна</Label>
                    <Input
                      id="sleep"
                      value={formData.sleep}
                      onChange={(e) => handleChange('sleep', e.target.value)}
                      placeholder="Хорошее / Плохое / Бессонница"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stress">Уровень стресса</Label>
                    <Input
                      id="stress"
                      value={formData.stress}
                      onChange={(e) => handleChange('stress', e.target.value)}
                      placeholder="Низкий / Средний / Высокий"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Цели и ограничения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="goals">Цели клиента</Label>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => handleChange('goals', e.target.value)}
                    placeholder="Убрать боль, улучшить осанку, расслабиться..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="contraindications">Противопоказания</Label>
                  <Textarea
                    id="contraindications"
                    value={formData.contraindications}
                    onChange={(e) => handleChange('contraindications', e.target.value)}
                    placeholder="Беременность, онкология, тромбоз..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="additionalInfo">Дополнительная информация</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => handleChange('additionalInfo', e.target.value)}
                    placeholder="Любая дополнительная информация..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button onClick={handleSubmit} disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Icon name="Loader2" className="animate-spin mr-2" size={16} />
                    Анализирую...
                  </>
                ) : (
                  <>
                    <Icon name="Sparkles" className="mr-2" size={16} />
                    Получить AI-анализ
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleReset} disabled={loading}>
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Очистить
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-2 text-sm text-blue-800">
                <Icon name="Info" size={16} className="flex-shrink-0 mt-0.5" />
                <p>
                  Сервис не хранит данные запросов и диалогов. Вы можете скопировать их и сохранить в любое удобное место.
                </p>
              </div>
            </div>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  <div className="flex items-center gap-2">
                    <Icon name="Brain" className="text-primary flex-shrink-0" size={20} />
                    <span className="truncate">AI-анализ анамнеза</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyAnamnesisToClipboard}
                  >
                    <Icon name="Copy" size={16} className="mr-2" />
                    Копировать диалог
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none whitespace-pre-wrap break-words overflow-wrap-anywhere text-sm">
                  {response}
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={handleReset} className="sm:w-auto">
                <Icon name="Plus" size={16} className="mr-2" />
                Новый анамнез
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)} className="sm:w-auto">
                Закрыть
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}