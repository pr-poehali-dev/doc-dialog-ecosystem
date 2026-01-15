import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import AnamnesisGeneralInfoCard from './anamnesis/AnamnesisGeneralInfoCard';
import AnamnesisComplaintsCard from './anamnesis/AnamnesisComplaintsCard';
import AnamnesisMedicalHistoryCard from './anamnesis/AnamnesisMedicalHistoryCard';
import AnamnesisLifestyleCard from './anamnesis/AnamnesisLifestyleCard';
import AnamnesisResult from './anamnesis/AnamnesisResult';

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
            <AnamnesisGeneralInfoCard formData={formData} onChange={handleChange} />
            <AnamnesisComplaintsCard formData={formData} onChange={handleChange} />
            <AnamnesisMedicalHistoryCard formData={formData} onChange={handleChange} />
            <AnamnesisLifestyleCard formData={formData} onChange={handleChange} />

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
          <AnamnesisResult 
            formData={formData} 
            response={response} 
            onReset={handleReset}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
