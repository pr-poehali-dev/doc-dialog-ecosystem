import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PageBuilder() {
  const { toast } = useToast();
  const [pageData, setPageData] = useState({
    heroTitle: 'Оздоровительный массаж',
    heroSubtitle: 'Профессиональный специалист по телу с опытом 5+ лет',
    aboutTitle: 'Обо мне',
    aboutText: '',
    servicesTitle: 'Услуги массажа',
    services: [
      { name: 'Релаксационный массаж', duration: '60 мин', price: '3000' },
      { name: 'Восстановительный массаж', duration: '90 мин', price: '4500' },
    ],
    processTitle: 'Как проходит сеанс',
    processSteps: [
      'Консультация и обсуждение пожеланий',
      'Подбор техник массажа',
      'Сеанс массажа в комфортной обстановке',
      'Рекомендации после сеанса',
    ],
    contactsTitle: 'Связаться со мной',
    showPhone: true,
    showTelegram: true,
    showWhatsapp: true,
    colorTheme: 'blue',
  });

  const [isPublished, setIsPublished] = useState(false);

  const colorThemes = [
    { value: 'blue', label: 'Синий', color: 'bg-blue-500' },
    { value: 'green', label: 'Зелёный', color: 'bg-green-500' },
    { value: 'purple', label: 'Фиолетовый', color: 'bg-purple-500' },
    { value: 'orange', label: 'Оранжевый', color: 'bg-orange-500' },
  ];

  const handleSave = () => {
    toast({
      title: "Страница сохранена",
      description: "Ваша личная страница успешно обновлена",
    });
  };

  const handlePublish = () => {
    setIsPublished(true);
    toast({
      title: "Страница опубликована",
      description: "Теперь вы можете делиться ссылкой с клиентами",
    });
  };

  const copyPageLink = () => {
    const link = `https://dokdialog.ru/page/${pageData.heroTitle.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Ссылка скопирована",
      description: "Поделитесь страницей с вашими клиентами",
    });
  };

  const addService = () => {
    setPageData({
      ...pageData,
      services: [...pageData.services, { name: '', duration: '', price: '' }]
    });
  };

  const removeService = (index: number) => {
    setPageData({
      ...pageData,
      services: pageData.services.filter((_, i) => i !== index)
    });
  };

  const updateService = (index: number, field: string, value: string) => {
    const updatedServices = [...pageData.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setPageData({ ...pageData, services: updatedServices });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Конструктор личной страницы</h1>
              <p className="text-muted-foreground">Создайте профессиональный лендинг для клиентов</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => {
                localStorage.setItem('pageBuilderData', JSON.stringify(pageData));
                window.open('/dashboard/page-preview', '_blank');
              }}>
                <Icon name="Eye" size={18} className="mr-2" />
                Предпросмотр
              </Button>
              {isPublished && (
                <Button variant="secondary" onClick={copyPageLink}>
                  <Icon name="Copy" size={18} className="mr-2" />
                  Скопировать ссылку
                </Button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Главный экран (Hero)</CardTitle>
                  <CardDescription>Первое, что увидят клиенты</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Заголовок</Label>
                    <Input
                      placeholder="Оздоровительный массаж"
                      value={pageData.heroTitle}
                      onChange={(e) => setPageData({ ...pageData, heroTitle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Подзаголовок</Label>
                    <Input
                      placeholder="Профессиональный массажист..."
                      value={pageData.heroSubtitle}
                      onChange={(e) => setPageData({ ...pageData, heroSubtitle: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Обо мне</CardTitle>
                  <CardDescription>Расскажите о своём опыте</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Заголовок раздела</Label>
                    <Input
                      value={pageData.aboutTitle}
                      onChange={(e) => setPageData({ ...pageData, aboutTitle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Текст</Label>
                    <Textarea
                      placeholder="Расскажите о себе, опыте, подходе к работе"
                      value={pageData.aboutText}
                      onChange={(e) => setPageData({ ...pageData, aboutText: e.target.value })}
                      rows={5}
                    />
                    <p className="text-xs text-muted-foreground">
                      ⚠️ Избегайте медицинских терминов. Используйте: "оздоровление", "релакс", "восстановление"
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Услуги</CardTitle>
                      <CardDescription>Форматы работы и ориентировочная стоимость</CardDescription>
                    </div>
                    <Button size="sm" onClick={addService}>
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 mb-4">
                    <Label>Заголовок раздела</Label>
                    <Input
                      value={pageData.servicesTitle}
                      onChange={(e) => setPageData({ ...pageData, servicesTitle: e.target.value })}
                    />
                  </div>
                  {pageData.services.map((service, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Услуга {index + 1}</Label>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeService(index)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                      <Input
                        placeholder="Название услуги"
                        value={service.name}
                        onChange={(e) => updateService(index, 'name', e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="60 мин"
                          value={service.duration}
                          onChange={(e) => updateService(index, 'duration', e.target.value)}
                        />
                        <Input
                          placeholder="3000 ₽"
                          value={service.price}
                          onChange={(e) => updateService(index, 'price', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Как проходит сеанс</CardTitle>
                  <CardDescription>Этапы работы с клиентом</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Заголовок раздела</Label>
                    <Input
                      value={pageData.processTitle}
                      onChange={(e) => setPageData({ ...pageData, processTitle: e.target.value })}
                    />
                  </div>
                  {pageData.processSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <Input
                        value={step}
                        onChange={(e) => {
                          const newSteps = [...pageData.processSteps];
                          newSteps[index] = e.target.value;
                          setPageData({ ...pageData, processSteps: newSteps });
                        }}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки дизайна</CardTitle>
                  <CardDescription>Выберите цветовую тему</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={pageData.colorTheme} onValueChange={(value) => setPageData({ ...pageData, colorTheme: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colorThemes.map((theme) => (
                        <SelectItem key={theme.value} value={theme.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded ${theme.color}`} />
                            {theme.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Контакты</CardTitle>
                  <CardDescription>Какие способы связи показывать</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Заголовок раздела</Label>
                    <Input
                      value={pageData.contactsTitle}
                      onChange={(e) => setPageData({ ...pageData, contactsTitle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Показывать телефон</Label>
                      <Switch
                        checked={pageData.showPhone}
                        onCheckedChange={(checked) => setPageData({ ...pageData, showPhone: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Показывать Telegram</Label>
                      <Switch
                        checked={pageData.showTelegram}
                        onCheckedChange={(checked) => setPageData({ ...pageData, showTelegram: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Показывать WhatsApp</Label>
                      <Switch
                        checked={pageData.showWhatsapp}
                        onCheckedChange={(checked) => setPageData({ ...pageData, showWhatsapp: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Sparkles" className="text-primary" size={24} />
                    Готовые шаблоны
                  </CardTitle>
                  <CardDescription>Используйте профессионально оформленные блоки</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Image" size={18} className="mr-2" />
                    Добавить галерею фото
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Star" size={18} className="mr-2" />
                    Блок отзывов
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Award" size={18} className="mr-2" />
                    Сертификаты и дипломы
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="MapPin" size={18} className="mr-2" />
                    Карта проезда
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Публикация</CardTitle>
                  <CardDescription>Опубликуйте страницу и делитесь ссылкой</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isPublished ? (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="CheckCircle" className="text-green-600" size={20} />
                        <p className="font-medium text-green-900">Страница опубликована</p>
                      </div>
                      <p className="text-sm text-green-700 mb-3">
                        Ваша личная страница доступна по ссылке
                      </p>
                      <Button onClick={copyPageLink} className="w-full" variant="secondary">
                        <Icon name="Copy" size={16} className="mr-2" />
                        Скопировать ссылку
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={handlePublish} className="w-full">
                      <Icon name="Globe" size={18} className="mr-2" />
                      Опубликовать страницу
                    </Button>
                  )}
                  <Button onClick={handleSave} variant="outline" className="w-full">
                    <Icon name="Save" size={18} className="mr-2" />
                    Сохранить черновик
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}