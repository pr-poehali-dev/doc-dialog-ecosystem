import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const API_URL = 'https://functions.poehali.dev/049813c7-cf1a-4ff1-93bc-af749304eb0d';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}?action=login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userRole', data.user.role);
        
        toast({
          title: 'Успешный вход',
          description: 'Добро пожаловать в Док диалог!',
        });

        navigate('/dashboard');
      } else if (response.status === 403 && data.email_verified === false) {
        toast({
          title: 'Email не подтвержден',
          description: data.message || 'Пожалуйста, проверьте почту и подтвердите email',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Ошибка входа',
          description: data.error || 'Неверный email или пароль',
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
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/">
            <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-12 mx-auto mb-6" />
          </Link>
          <h1 className="text-3xl font-bold mb-2">Вход в систему</h1>
          <p className="text-gray-600">Войдите в свой аккаунт</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <Link to="/forgot-password" className="text-primary hover:underline">
              Забыли пароль?
            </Link>
          </div>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600">Нет аккаунта? </span>
            <Link to="/register" className="text-primary hover:underline font-semibold">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}