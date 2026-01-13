import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  target_type: 'masseur' | 'salon' | 'school' | 'user';
  category: string;
  question: string;
  answer: string;
  order_index: number;
  created_at: string;
}

interface FAQListProps {
  selectedType: 'masseur' | 'salon' | 'school' | 'user';
  faqItems: FAQItem[];
  loading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddNew: () => void;
  onEdit: (item: FAQItem) => void;
  onDelete: (id: number) => void;
  onImportDefault: () => void;
}

const TARGET_TYPES = [
  { value: 'masseur', label: 'Массажисты' },
  { value: 'salon', label: 'Салоны' },
  { value: 'school', label: 'Школы' },
  { value: 'user', label: 'Пользователи' }
];

export default function FAQList({
  selectedType,
  faqItems,
  loading,
  searchQuery,
  onSearchChange,
  onAddNew,
  onEdit,
  onDelete,
  onImportDefault
}: FAQListProps) {
  const categories = Array.from(new Set(faqItems.map(item => item.category)));
  const filteredItems = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>База знаний для {TARGET_TYPES.find(t => t.value === selectedType)?.label}</CardTitle>
            <CardDescription>
              Всего {faqItems.length} вопросов в {categories.length} категориях
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {(selectedType === 'masseur' || selectedType === 'salon') && faqItems.length === 0 && (
              <Button onClick={onImportDefault} variant="outline">
                <Icon name="Download" size={18} className="mr-2" />
                Импортировать {selectedType === 'masseur' ? '25' : '23'} вопросов
              </Button>
            )}
            <Button onClick={onAddNew}>
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить вопрос
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по вопросам..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

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
                        onClick={() => onEdit(item)}
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDelete(item.id)}
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
  );
}