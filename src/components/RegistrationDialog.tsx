import { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Checkbox } from "@/components/ui/checkbox";
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: ''
  });
  const [agreed, setAgreed] = useState(false);

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
    
    if (!agreed) {
      toast({
        title: 'Требуется согласие',
        description: 'Пожалуйста, примите условия обработки персональных данных',
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
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userRole', data.user.role);
        
        toast({
          title: 'Регистрация успешна!',
          description: 'Добро пожаловать в Док диалог!'
        });
        
        handleClose();
        
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 500);
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
    setAgreed(false);
    onClose();
  };

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
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreed} 
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm leading-relaxed cursor-pointer"
            >
              Согласен с{' '}
              <Link to="/privacy" className="text-primary hover:underline" onClick={handleClose}>
                условиями обработки персональных данных
              </Link>
              {' '}и{' '}
              <Link to="/terms" className="text-primary hover:underline" onClick={handleClose}>
                условиями договора оферты
              </Link>
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1" disabled={loading || !agreed}>
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