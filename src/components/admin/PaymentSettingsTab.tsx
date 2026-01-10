import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PaymentSettings {
  yoomoney_shop_id: string;
  yoomoney_secret_key: string;
}

export default function PaymentSettingsTab() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<PaymentSettings>({
    yoomoney_shop_id: '',
    yoomoney_secret_key: ''
  });
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/e47da0bb-23a7-45be-b985-3c4e6a87db0d', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to load payment settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/e47da0bb-23a7-45be-b985-3c4e6a87db0d', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        toast({
          title: 'Настройки сохранены',
          description: 'Платёжная система ЮMoney успешно подключена'
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить настройки',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const testConnection = async () => {
    if (!settings.yoomoney_shop_id || !settings.yoomoney_secret_key) {
      toast({
        title: 'Заполните все поля',
        description: 'Укажите Shop ID и секретный ключ',
        variant: 'destructive'
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/e47da0bb-23a7-45be-b985-3c4e6a87db0d/test', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        toast({
          title: 'Подключение успешно',
          description: 'ЮMoney настроено правильно'
        });
      } else {
        const error = await response.json();
        toast({
          title: 'Ошибка подключения',
          description: error.message || 'Проверьте правильность данных',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось проверить подключение',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icon name="Loader2" size={32} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Icon name="CreditCard" size={24} className="text-blue-600" />
            </div>
            <div>
              <CardTitle>Настройка приёма платежей</CardTitle>
              <CardDescription>Подключите ЮMoney для приёма оплат от клиентов</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Icon name="Info" size={18} />
            <AlertDescription>
              Для подключения ЮMoney зарегистрируйтесь на{' '}
              <a 
                href="https://yoomoney.ru/merchant" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium underline hover:text-blue-600"
              >
                yoomoney.ru/merchant
              </a>
              , создайте магазин и скопируйте данные сюда
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shop_id">Shop ID (идентификатор магазина)</Label>
              <Input
                id="shop_id"
                placeholder="123456"
                value={settings.yoomoney_shop_id}
                onChange={(e) => setSettings({ ...settings, yoomoney_shop_id: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Находится в личном кабинете ЮMoney → Настройки магазина
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secret_key">Секретный ключ (Secret Key)</Label>
              <div className="relative">
                <Input
                  id="secret_key"
                  type={showSecret ? 'text' : 'password'}
                  placeholder="sk_test_••••••••••••••••"
                  value={settings.yoomoney_secret_key}
                  onChange={(e) => setSettings({ ...settings, yoomoney_secret_key: e.target.value })}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowSecret(!showSecret)}
                >
                  <Icon name={showSecret ? 'EyeOff' : 'Eye'} size={16} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Находится в ЮMoney → Настройки → Секретные ключи → Создать ключ
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={saveSettings} disabled={saving} className="flex-1">
              {saving ? (
                <>
                  <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                  Сохраняю...
                </>
              ) : (
                <>
                  <Icon name="Save" size={18} className="mr-2" />
                  Сохранить настройки
                </>
              )}
            </Button>
            <Button onClick={testConnection} variant="outline" className="flex-1">
              <Icon name="Zap" size={18} className="mr-2" />
              Проверить подключение
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Как это работает?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-semibold">
              1
            </div>
            <p>Клиент выбирает услугу и нажимает «Записаться и оплатить»</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-semibold">
              2
            </div>
            <p>Система создаёт платёж в ЮMoney и перенаправляет на страницу оплаты</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-semibold">
              3
            </div>
            <p>После успешной оплаты клиент возвращается на сайт, заказ создаётся автоматически</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-semibold">
              4
            </div>
            <p>Деньги поступают на ваш счёт в ЮMoney (за вычетом комиссии платёжной системы)</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Icon name="AlertTriangle" size={18} className="text-amber-600" />
            Важная информация
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Комиссия ЮMoney за приём платежей: 2-5% (зависит от тарифа)</p>
          <p>• Минимальная сумма платежа: 100 ₽</p>
          <p>• Вывод средств на карту: 1-3 рабочих дня</p>
          <p>• Храните секретный ключ в безопасности — не передавайте его третьим лицам</p>
        </CardContent>
      </Card>
    </div>
  );
}