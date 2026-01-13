import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

interface Props {
  targetType: 'masseur' | 'salon' | 'school' | 'user';
}

export default function KnowledgeBasePublic({ targetType }: Props) {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [telegramUrl, setTelegramUrl] = useState('https://t.me/SergeuVodopianov');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  useEffect(() => {
    loadData();
  }, [targetType]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Загружаем FAQ
      const faqResponse = await fetch(
        `https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372?target_type=${targetType}`
      );
      
      if (faqResponse.ok) {
        const faqData = await faqResponse.json();
        setFaqItems(faqData.items || []);
      }

      // Загружаем настройки
      const settingsResponse = await fetch(
        `https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372?action=settings&target_type=${targetType}`
      );
      
      if (settingsResponse.ok) {
        const settingsData = await settingsResponse.json();
        setTelegramUrl(settingsData.telegram_support_url || 'https://t.me/+QgiLIa1gFRY4Y2Iy');
      }
    } catch (error) {
      console.error('Error loading knowledge base:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Все', ...Array.from(new Set(faqItems.map(item => item.category)))];

  const filteredFAQ = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Card>
          <CardContent className="py-12 text-center">
            <Icon name="Loader2" size={48} className="animate-spin mx-auto text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Icon name="BookOpen" size={28} />
            База знаний
          </CardTitle>
          <CardDescription>
            Ответы на часто задаваемые вопросы
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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

          {/* Категории */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* FAQ список */}
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
              <p>По вашему запросу ничего не найдено</p>
              <p className="text-sm mt-2">Попробуйте изменить поисковый запрос или выбрать другую категорию</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQ.map((item) => (
                <AccordionItem key={item.id} value={`item-${item.id}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-start gap-3 pr-4">
                      <Icon name="HelpCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{item.question}</div>
                        <div className="text-xs text-muted-foreground mt-1">{item.category}</div>
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

          {/* Дополнительная помощь */}
          {telegramUrl && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Icon name="MessageCircle" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Не нашли ответ?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Если у вас остались вопросы, свяжитесь с нашей службой поддержки
                    </p>
                    <a 
                      href={telegramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
                    >
                      <Icon name="Send" size={16} />
                      Написать в поддержку
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}