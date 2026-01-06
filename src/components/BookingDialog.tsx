import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  masseurName: string;
  masseurId: number;
  specializations: string[];
}

export const BookingDialog = ({ isOpen, onClose, masseurName, masseurId, specializations }: BookingDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    appointmentDate: "",
    appointmentTime: "",
    massageType: specializations[0] || "",
    duration: "60",
    notes: ""
  });

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", 
    "17:00", "18:00", "19:00", "20:00"
  ];

  const durations = [
    { value: "30", label: "30 минут" },
    { value: "60", label: "60 минут" },
    { value: "90", label: "90 минут" },
    { value: "120", label: "120 минут" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.clientPhone || !formData.appointmentDate || !formData.appointmentTime || !formData.massageType) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Заявка отправлена!",
      description: `${masseurName} свяжется с вами для подтверждения записи на ${formData.appointmentDate} в ${formData.appointmentTime}`,
    });

    setFormData({
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      appointmentDate: "",
      appointmentTime: "",
      massageType: specializations[0] || "",
      duration: "60",
      notes: ""
    });
    
    onClose();
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Запись к специалисту по телу</DialogTitle>
          <DialogDescription>
            Заполните форму, и {masseurName} свяжется с вами для подтверждения
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Ваше имя *</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Введите ваше имя"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientPhone">Телефон *</Label>
              <Input
                id="clientPhone"
                type="tel"
                value={formData.clientPhone}
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                placeholder="+7 (999) 123-45-67"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientEmail">Email (необязательно)</Label>
            <Input
              id="clientEmail"
              type="email"
              value={formData.clientEmail}
              onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
              placeholder="your@email.com"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appointmentDate">Желаемая дата *</Label>
              <Input
                id="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                min={getTomorrowDate()}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="appointmentTime">Время *</Label>
              <select
                id="appointmentTime"
                value={formData.appointmentTime}
                onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                className="w-full px-3 py-2 rounded-md border bg-background"
                required
              >
                <option value="">Выберите время</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="massageType">Тип массажа *</Label>
              <select
                id="massageType"
                value={formData.massageType}
                onChange={(e) => setFormData({ ...formData, massageType: e.target.value })}
                className="w-full px-3 py-2 rounded-md border bg-background"
                required
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Длительность</Label>
              <select
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                {durations.map((duration) => (
                  <option key={duration.value} value={duration.value}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Дополнительная информация</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Укажите пожелания или особенности..."
              rows={3}
            />
          </div>

          <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Info" size={16} className="text-primary" />
              <span className="font-medium">Как это работает:</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6">
              <li>• Вы отправляете заявку на запись</li>
              <li>• Массажист получает уведомление</li>
              <li>• Он свяжется с вами для подтверждения времени</li>
              <li>• После подтверждения вы получите SMS-напоминание</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              <Icon name="Calendar" size={20} className="mr-2" />
              Отправить заявку
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};