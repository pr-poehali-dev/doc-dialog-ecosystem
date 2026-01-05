import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: number;
  target_type: 'masseur' | 'salon' | 'school' | 'user';
  category: string;
  question: string;
  answer: string;
  order_index: number;
  created_at: string;
}

interface KBSettings {
  target_type: 'masseur' | 'salon' | 'school' | 'user';
  telegram_support_url: string;
}

const TARGET_TYPES = [
  { value: 'masseur', label: 'Массажисты', icon: 'User' },
  { value: 'salon', label: 'Салоны', icon: 'Building' },
  { value: 'school', label: 'Школы', icon: 'GraduationCap' },
  { value: 'user', label: 'Пользователи', icon: 'Users' }
];

export default function KnowledgeBaseManagement() {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<'masseur' | 'salon' | 'school' | 'user'>('school');
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [telegramUrl, setTelegramUrl] = useState('https://t.me/+QgiLIa1gFRY4Y2Iy');
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    category: '',
    question: '',
    answer: '',
  });

  useEffect(() => {
    loadFAQ();
    loadSettings();
  }, [selectedType]);

  const loadFAQ = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372?target_type=${selectedType}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setFaqItems(data.items || []);
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить базу знаний',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      const response = await fetch(
        `https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372?action=settings&target_type=${selectedType}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setTelegramUrl(data.telegram_support_url || 'https://t.me/+QgiLIa1gFRY4Y2Iy');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveFAQ = async () => {
    if (!formData.question || !formData.answer || !formData.category) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem 
        ? `https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372?id=${editingItem.id}`
        : 'https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          target_type: selectedType,
          ...formData
        })
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: editingItem ? 'Вопрос обновлён' : 'Вопрос добавлен'
        });
        setShowDialog(false);
        setEditingItem(null);
        setFormData({ category: '', question: '', answer: '' });
        loadFAQ();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить вопрос',
        variant: 'destructive'
      });
    }
  };

  const deleteFAQ = async (id: number) => {
    if (!confirm('Удалить этот вопрос?')) return;

    try {
      const response = await fetch(
        `https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372?id=${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Вопрос удалён'
        });
        loadFAQ();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить вопрос',
        variant: 'destructive'
      });
    }
  };

  const saveSettings = async () => {
    try {
      const response = await fetch(
        'https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372?action=save_settings',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            target_type: selectedType,
            telegram_support_url: telegramUrl
          })
        }
      );

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Настройки сохранены'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить настройки',
        variant: 'destructive'
      });
    }
  };

  const categories = Array.from(new Set(faqItems.map(item => item.category)));
  const filteredItems = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Выбор типа */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {TARGET_TYPES.map(type => (
          <Card
            key={type.value}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedType === type.value ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedType(type.value as any)}
          >
            <CardContent className="pt-6 text-center">
              <Icon name={type.icon as any} size={32} className="mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">{type.label}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {faqItems.filter(i => i.target_type === type.value).length} вопросов
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Настройки Telegram */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Settings" size={20} />
            Настройки поддержки
          </CardTitle>
          <CardDescription>
            Ссылка на Telegram-канал поддержки для {TARGET_TYPES.find(t => t.value === selectedType)?.label}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={telegramUrl}
              onChange={(e) => setTelegramUrl(e.target.value)}
              placeholder="https://t.me/..."
            />
            <Button onClick={saveSettings}>
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Управление FAQ */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>База знаний для {TARGET_TYPES.find(t => t.value === selectedType)?.label}</CardTitle>
              <CardDescription>
                Всего {faqItems.length} вопросов в {categories.length} категориях
              </CardDescription>
            </div>
            <Button onClick={() => {
              setEditingItem(null);
              setFormData({ category: '', question: '', answer: '' });
              setShowDialog(true);
            }}>
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить вопрос
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Поиск */}
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по вопросам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Список вопросов */}
          {loading ? (
            <div className="text-center py-12">
              <Icon name="Loader2" size={48} className="animate-spin mx-auto text-muted-foreground" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="HelpCircle" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Нет вопросов в базе знаний</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredItems.map((item) => (
                <AccordionItem key={item.id} value={`item-${item.id}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-start gap-3 pr-4 flex-1">
                      <Icon name="HelpCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium">{item.question}</div>
                        <div className="text-xs text-muted-foreground mt-1">{item.category}</div>
                      </div>
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingItem(item);
                            setFormData({
                              category: item.category,
                              question: item.question,
                              answer: item.answer
                            });
                            setShowDialog(true);
                          }}
                        >
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteFAQ(item.id)}
                        >
                          <Icon name="Trash2" size={16} className="text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pl-8 pr-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>

      {/* Диалог добавления/редактирования */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Редактировать вопрос' : 'Добавить вопрос'}
            </DialogTitle>
            <DialogDescription>
              Для {TARGET_TYPES.find(t => t.value === selectedType)?.label}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Категория</Label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Общие вопросы"
              />
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      size="sm"
                      variant="outline"
                      onClick={() => setFormData({ ...formData, category: cat })}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <Label>Вопрос</Label>
              <Input
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="Как начать работу?"
              />
            </div>
            <div>
              <Label>Ответ</Label>
              <Textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                placeholder="Подробный ответ на вопрос..."
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Отмена
            </Button>
            <Button onClick={saveFAQ}>
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}