import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

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

const AUTH_API_URL = 'https://functions.poehali.dev/049813c7-cf1a-4ff1-93bc-af749304eb0d';

const RegistrationDialog = ({ isOpen, onClose, userType, dialogContent }: RegistrationDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.name) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${AUTH_API_URL}?action=register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: userType,
          profile: {
            full_name: formData.name,
            name: formData.name,
            phone: formData.phone,
            city: formData.city
          }
        })
      });

      const data = await response.json();

      if (response.ok) {
        setRegistered(true);
        toast({
          title: 'Регистрация успешна!',
          description: 'Проверьте вашу почту для подтверждения аккаунта'
        });
      } else {
        toast({
          title: 'Ошибка регистрации',
          description: data.error || 'Попробуйте позже',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось зарегистрироваться',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', password: '', phone: '', city: '' });
    setRegistered(false);
    onClose();
  };

  if (registered) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Icon name="CheckCircle" className="text-green-600" size={24} />
              </div>
              <DialogTitle className="text-2xl">Проверьте почту</DialogTitle>
            </div>
            <DialogDescription className="text-base">
              Мы отправили письмо с подтверждением на <strong>{formData.email}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <Icon name="Mail" size={16} className="inline mr-2" />
                Перейдите по ссылке в письме для активации аккаунта
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Не получили письмо? Проверьте папку "Спам" или запросите новое письмо.
            </p>
            <Button onClick={handleClose} className="w-full">
              Понятно
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">
              {userType === 'masseur' ? 'Имя и фамилия' : 'Название организации'} *
            </Label>
            <Input 
              id="name" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={userType === 'masseur' ? 'Иван Иванов' : 'Название школы/салона'}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input 
              id="email" 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль *</Label>
            <Input 
              id="password" 
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Минимум 6 символов"
              minLength={6}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input 
              id="phone" 
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+7 (999) 123-45-67"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Город</Label>
            <Input 
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Москва"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                  Регистрация...
                </>
              ) : (
                'Зарегистрироваться'
              )}
            </Button>
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;