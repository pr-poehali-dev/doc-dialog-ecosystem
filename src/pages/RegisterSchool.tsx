import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/049813c7-cf1a-4ff1-93bc-af749304eb0d';

export default function RegisterSchool() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreed) {
      toast({
        title: 'Требуется согласие',
        description: 'Пожалуйста, примите условия обработки персональных данных',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}?action=register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role: 'school',
          profile: { name: schoolName, phone, city }
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userRole', 'school');
        
        toast({
          title: 'Регистрация успешна',
          description: 'Добро пожаловать в экосистему Док диалог!',
        });

        navigate('/school/dashboard');
      } else {
        toast({
          title: 'Ошибка регистрации',
          description: data.error || 'Не удалось создать аккаунт',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Link to="/">
            <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-12 mx-auto mb-6" />
          </Link>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Icon name="GraduationCap" size={40} className="text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Регистрация школы массажа</h1>
          <p className="text-lg text-muted-foreground">
            Присоединяйтесь к экосистеме Док диалог и получите доступ к тысячам потенциальных студентов
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl p-8 border border-primary/10">
          {/* Преимущества */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-primary/5 rounded-xl">
            <div className="text-center">
              <Icon name="Users" size={32} className="text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Тысячи студентов</p>
            </div>
            <div className="text-center">
              <Icon name="Globe" size={32} className="text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Онлайн присутствие</p>
            </div>
            <div className="text-center">
              <Icon name="TrendingUp" size={32} className="text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Рост продаж</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="schoolName" className="text-base">Название школы массажа *</Label>
              <Input
                id="schoolName"
                placeholder="Московская школа массажа"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-base">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="school@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-base">Пароль *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">Минимум 6 символов</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-base">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 900 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="city" className="text-base">Город</Label>
                <Input
                  id="city"
                  placeholder="Москва"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-2"
                />
              </div>
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
                <Link to="/privacy" className="text-primary hover:underline">
                  условиями обработки персональных данных
                </Link>
                {' '}и{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  условиями договора оферты
                </Link>
              </label>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70" 
                disabled={loading || !agreed}
              >
                {loading ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Регистрация...
                  </>
                ) : (
                  <>
                    <Icon name="CheckCircle" size={20} className="mr-2" />
                    Зарегистрировать школу
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Уже есть аккаунт? </span>
            <Link to="/login" className="text-primary hover:underline font-semibold">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}