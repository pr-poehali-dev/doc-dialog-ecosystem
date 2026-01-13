import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/049813c7-cf1a-4ff1-93bc-af749304eb0d';

export default function ForgotPassword() {
  const [step, setStep] = useState<'email' | 'code' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}?action=request-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Код отправлен',
          description: 'Проверьте свою почту. Код действителен 1 час.',
        });
        setStep('code');
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось отправить код',
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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || newPassword.trim() === '') {
      toast({
        title: 'Ошибка',
        description: 'Введите новый пароль',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Пароли не совпадают',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: 'Ошибка',
        description: 'Пароль должен быть не менее 6 символов',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}?action=reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Пароль изменён',
          description: 'Теперь вы можете войти с новым паролем',
        });
        setStep('success');
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Неверный код или истёк срок действия',
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
          <h1 className="text-3xl font-bold mb-2">Восстановление пароля</h1>
          <p className="text-gray-600">
            {step === 'email' && 'Введите email для получения кода'}
            {step === 'code' && 'Введите код из письма и новый пароль'}
            {step === 'success' && 'Пароль успешно изменён'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 'email' && (
            <form onSubmit={handleRequestReset} className="space-y-6">
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

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Отправка...' : 'Отправить код'}
              </Button>
            </form>
          )}

          {step === 'code' && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <Label htmlFor="code">Код из письма</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>

              <div>
                <Label htmlFor="newPassword">Новый пароль</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Сохранение...' : 'Изменить пароль'}
              </Button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Check" className="text-green-600" size={32} />
              </div>
              <p className="text-gray-600">
                Ваш пароль успешно изменён. Теперь вы можете войти в систему.
              </p>
              <Link to="/login">
                <Button className="w-full">Войти в систему</Button>
              </Link>
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            <Link to="/login" className="text-primary hover:underline">
              <Icon name="ArrowLeft" size={14} className="inline mr-1" />
              Вернуться к входу
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}