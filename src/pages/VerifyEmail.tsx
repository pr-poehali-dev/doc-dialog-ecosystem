import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Helmet } from 'react-helmet-async';

const AUTH_API = 'https://functions.poehali.dev/049813c7-cf1a-4ff1-93bc-af749304eb0d';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('Токен подтверждения не найден');
      return;
    }

    verifyEmail(token);
  }, [searchParams]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`${AUTH_API}?action=verify-email&token=${token}`);
      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Email успешно подтвержден! Теперь вы можете войти в систему.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Ошибка подтверждения email');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Произошла ошибка при подтверждении email');
    }
  };

  return (
    <>
      <Helmet>
        <title>Подтверждение email - Док диалог</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center">
              {status === 'loading' && 'Подтверждение email...'}
              {status === 'success' && 'Email подтвержден!'}
              {status === 'error' && 'Ошибка подтверждения'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              {status === 'loading' && (
                <div className="flex justify-center">
                  <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {status === 'success' && (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="CheckCircle2" size={32} className="text-green-600" />
                  </div>
                  <p className="text-gray-600">{message}</p>
                  <Button onClick={() => navigate('/login')} size="lg" className="w-full">
                    Войти в систему
                  </Button>
                </div>
              )}

              {status === 'error' && (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="XCircle" size={32} className="text-red-600" />
                  </div>
                  <p className="text-gray-600">{message}</p>
                  <div className="flex gap-3">
                    <Button onClick={() => navigate('/register')} variant="outline" className="flex-1">
                      Регистрация
                    </Button>
                    <Button onClick={() => navigate('/login')} className="flex-1">
                      Войти
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
