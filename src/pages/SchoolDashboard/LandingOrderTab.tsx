import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface LandingOrderForm {
  courseName: string;
  courseType: 'course' | 'mastermind' | 'offline';
  description: string;
  targetAudience: string;
  uniqueSellingPoints: string;
  price: string;
  courseDuration: string;
  whatStudentsGet: string;
  program: string;
  authorName: string;
  authorBio: string;
  schoolName: string;
  contactEmail: string;
  contactPhone: string;
  externalFormUrl: string;
  additionalInfo: string;
}

const INITIAL_FORM: LandingOrderForm = {
  courseName: '',
  courseType: 'course',
  description: '',
  targetAudience: '',
  uniqueSellingPoints: '',
  price: '',
  courseDuration: '',
  whatStudentsGet: '',
  program: '',
  authorName: '',
  authorBio: '',
  schoolName: '',
  contactEmail: '',
  contactPhone: '',
  externalFormUrl: '',
  additionalInfo: ''
};

export default function LandingOrderTab() {
  const [form, setForm] = useState<LandingOrderForm>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const API_URL = 'https://functions.poehali.dev/3c603f9a-2c2c-49e8-a7c7-c4fa98866f4c';
      
      const emailData = {
        to: 'info@massagists.ru',
        subject: `Заказ лендинга: ${form.courseName}`,
        html: `
          <h2>Новый заказ продающего лендинга</h2>
          
          <h3>Информация о курсе:</h3>
          <p><strong>Название:</strong> ${form.courseName}</p>
          <p><strong>Тип:</strong> ${form.courseType === 'course' ? 'Курс' : form.courseType === 'mastermind' ? 'Мастермайнд' : 'Очное обучение'}</p>
          <p><strong>Описание:</strong> ${form.description}</p>
          <p><strong>Целевая аудитория:</strong> ${form.targetAudience}</p>
          <p><strong>УТП:</strong> ${form.uniqueSellingPoints}</p>
          <p><strong>Цена:</strong> ${form.price} ₽</p>
          <p><strong>Длительность:</strong> ${form.courseDuration}</p>
          
          <h3>Что получат студенты:</h3>
          <p>${form.whatStudentsGet}</p>
          
          <h3>Программа:</h3>
          <p>${form.program}</p>
          
          <h3>Автор/преподаватель:</h3>
          <p><strong>Имя:</strong> ${form.authorName}</p>
          <p><strong>Биография:</strong> ${form.authorBio}</p>
          
          <h3>Контакты школы:</h3>
          <p><strong>Название:</strong> ${form.schoolName}</p>
          <p><strong>Email:</strong> ${form.contactEmail}</p>
          <p><strong>Телефон:</strong> ${form.contactPhone}</p>
          <p><strong>Ссылка на форму записи:</strong> ${form.externalFormUrl}</p>
          
          ${form.additionalInfo ? `<h3>Дополнительная информация:</h3><p>${form.additionalInfo}</p>` : ''}
        `
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) throw new Error('Ошибка отправки');

      toast({
        title: '✅ Заявка отправлена!',
        description: 'Мы получили ваш заказ и свяжемся с вами в течение 24 часов'
      });

      setForm(INITIAL_FORM);
    } catch (error) {
      toast({
        title: '❌ Ошибка',
        description: 'Не удалось отправить заявку. Попробуйте позже',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateForm = (field: keyof LandingOrderForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon name="Sparkles" size={28} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Закажите продающий лендинг</h3>
            <p className="text-muted-foreground mb-4">
              Современный лендинг для вашего курса повысит конверсию в продажи. 
              Профессиональный дизайн, УТП, призывы к действию.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={18} className="text-green-500" />
                <span>Создание за 2-3 дня</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={18} className="text-green-500" />
                <span>Хостинг на год включён</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={18} className="text-green-500" />
                <span>Всего 2990 ₽</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="BookOpen" size={20} />
              Информация о курсе
            </h3>

            <div>
              <Label htmlFor="courseName">Название курса *</Label>
              <Input
                id="courseName"
                value={form.courseName}
                onChange={(e) => updateForm('courseName', e.target.value)}
                placeholder="Профессиональный массаж лица"
                required
              />
            </div>

            <div>
              <Label htmlFor="courseType">Тип обучения *</Label>
              <select
                id="courseType"
                value={form.courseType}
                onChange={(e) => updateForm('courseType', e.target.value as any)}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="course">Онлайн-курс</option>
                <option value="mastermind">Мастермайнд</option>
                <option value="offline">Очное обучение</option>
              </select>
            </div>

            <div>
              <Label htmlFor="description">Краткое описание (1-2 предложения) *</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => updateForm('description', e.target.value)}
                placeholder="Освойте техники массажа лица за 3 недели..."
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="targetAudience">Для кого этот курс? *</Label>
              <Input
                id="targetAudience"
                value={form.targetAudience}
                onChange={(e) => updateForm('targetAudience', e.target.value)}
                placeholder="Начинающие массажисты, косметологи"
                required
              />
            </div>

            <div>
              <Label htmlFor="uniqueSellingPoints">Уникальные преимущества (через запятую) *</Label>
              <Textarea
                id="uniqueSellingPoints"
                value={form.uniqueSellingPoints}
                onChange={(e) => updateForm('uniqueSellingPoints', e.target.value)}
                placeholder="Сертификат гособразца, Практика на моделях, Поддержка после курса"
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Цена (₽) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={form.price}
                  onChange={(e) => updateForm('price', e.target.value)}
                  placeholder="19990"
                  required
                />
              </div>
              <div>
                <Label htmlFor="courseDuration">Длительность *</Label>
                <Input
                  id="courseDuration"
                  value={form.courseDuration}
                  onChange={(e) => updateForm('courseDuration', e.target.value)}
                  placeholder="3 недели / 24 часа"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="whatStudentsGet">Что получат студенты? *</Label>
              <Textarea
                id="whatStudentsGet"
                value={form.whatStudentsGet}
                onChange={(e) => updateForm('whatStudentsGet', e.target.value)}
                placeholder="- Сертификат&#10;- Доступ к материалам&#10;- Поддержка куратора"
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="program">Программа курса *</Label>
              <Textarea
                id="program"
                value={form.program}
                onChange={(e) => updateForm('program', e.target.value)}
                placeholder="Модуль 1: Анатомия...&#10;Модуль 2: Техники..."
                rows={5}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="User" size={20} />
              Автор/Преподаватель
            </h3>

            <div>
              <Label htmlFor="authorName">Имя преподавателя *</Label>
              <Input
                id="authorName"
                value={form.authorName}
                onChange={(e) => updateForm('authorName', e.target.value)}
                placeholder="Анна Иванова"
                required
              />
            </div>

            <div>
              <Label htmlFor="authorBio">Биография/достижения *</Label>
              <Textarea
                id="authorBio"
                value={form.authorBio}
                onChange={(e) => updateForm('authorBio', e.target.value)}
                placeholder="Практикующий массажист с опытом 10 лет..."
                rows={4}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="Building2" size={20} />
              Контактная информация
            </h3>

            <div>
              <Label htmlFor="schoolName">Название школы *</Label>
              <Input
                id="schoolName"
                value={form.schoolName}
                onChange={(e) => updateForm('schoolName', e.target.value)}
                placeholder="Академия массажа"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactEmail">Email для связи *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => updateForm('contactEmail', e.target.value)}
                  placeholder="info@school.ru"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Телефон *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={form.contactPhone}
                  onChange={(e) => updateForm('contactPhone', e.target.value)}
                  placeholder="+7 900 123-45-67"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="externalFormUrl">Ссылка на вашу форму записи *</Label>
              <Input
                id="externalFormUrl"
                type="url"
                value={form.externalFormUrl}
                onChange={(e) => updateForm('externalFormUrl', e.target.value)}
                placeholder="https://your-site.ru/register"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                На эту форму будут вести кнопки записи с лендинга
              </p>
            </div>

            <div>
              <Label htmlFor="additionalInfo">Дополнительная информация</Label>
              <Textarea
                id="additionalInfo"
                value={form.additionalInfo}
                onChange={(e) => updateForm('additionalInfo', e.target.value)}
                placeholder="Особые пожелания к дизайну, примеры лендингов..."
                rows={3}
              />
            </div>
          </div>

          <div className="bg-accent/20 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-medium">Что будет дальше:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Мы получим вашу заявку и свяжемся в течение 24 часов</li>
                  <li>Обсудим детали и вышлем счёт на 2990 ₽</li>
                  <li>После оплаты создадим лендинг за 2-3 дня</li>
                  <li>Лендинг разместим на нашем домене с вашим брендингом</li>
                  <li>Карточка курса в каталоге будет вести на этот лендинг</li>
                </ol>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <Icon name="Send" size={20} className="mr-2" />
                Отправить заявку на создание лендинга
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
