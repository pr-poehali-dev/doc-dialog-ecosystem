import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

type UserType = 'masseur' | 'school' | 'salon' | null;

interface RegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userType: UserType;
  dialogContent: {
    title: string;
    description: string;
    icon: string;
  };
}

const RegistrationDialog = ({ isOpen, onClose, userType, dialogContent }: RegistrationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={dialogContent.icon} className="text-primary" size={24} />
            </div>
            <DialogTitle className="text-2xl">{dialogContent.title}</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            {dialogContent.description}
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4 mt-4" onSubmit={(e) => { e.preventDefault(); }}>
          <div className="space-y-2">
            <Label htmlFor="name">Имя {userType === 'masseur' ? '' : 'или название организации'}</Label>
            <Input id="name" placeholder="Введите ваше имя" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" />
          </div>
          {userType === 'masseur' && (
            <div className="space-y-2">
              <Label htmlFor="experience">Опыт работы</Label>
              <Input id="experience" placeholder="Например: 3 года" />
            </div>
          )}
          {userType === 'school' && (
            <div className="space-y-2">
              <Label htmlFor="courses">Какие курсы предлагаете?</Label>
              <Textarea id="courses" placeholder="Опишите ваши курсы" rows={3} />
            </div>
          )}
          {userType === 'salon' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="location">Местоположение салона</Label>
                <Input id="location" placeholder="Город, адрес" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="positions">Какие специалисты нужны?</Label>
                <Textarea id="positions" placeholder="Опишите вакансии" rows={3} />
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="message">Дополнительная информация</Label>
            <Textarea id="message" placeholder="Расскажите о себе" rows={3} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1">Отправить заявку</Button>
            <Button type="button" variant="outline" onClick={onClose}>Отмена</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
