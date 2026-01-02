import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

const API_URL = 'https://functions.poehali.dev/049813c7-cf1a-4ff1-93bc-af749304eb0d';

export default function Register() {
  const [role, setRole] = useState<'masseur' | 'school' | 'salon'>('masseur');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const profile = role === 'masseur'
      ? { full_name: fullName, phone, city }
      : { name: fullName, phone, city };

    try {
      const response = await fetch(`${API_URL}?action=register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role, profile }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        toast({
          title: 'Регистрация успешна',
          description: 'Добро пожаловать в Док диалог!',
        });

        navigate('/dashboard');
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
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/">
            <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-12 mx-auto mb-6" />
          </Link>
          <h1 className="text-3xl font-bold mb-2">Регистрация</h1>
          <p className="text-gray-600">Создайте аккаунт в экосистеме Док диалог</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="mb-3 block">Тип аккаунта</Label>
              <RadioGroup value={role} onValueChange={(value: any) => setRole(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="masseur" id="masseur" />
                  <Label htmlFor="masseur" className="cursor-pointer">Массажист</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="school" id="school" />
                  <Label htmlFor="school" className="cursor-pointer">Школа массажа</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="salon" id="salon" />
                  <Label htmlFor="salon" className="cursor-pointer">Массажный салон</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="fullName">
                {role === 'masseur' ? 'Полное имя' : 'Название организации'}
              </Label>
              <Input
                id="fullName"
                placeholder={role === 'masseur' ? 'Иван Иванов' : 'Название'}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 900 123-45-67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="city">Город</Label>
              <Input
                id="city"
                placeholder="Москва"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Уже есть аккаунт? </span>
            <Link to="/login" className="text-primary hover:underline font-semibold">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
