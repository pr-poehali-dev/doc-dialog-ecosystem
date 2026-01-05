import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface PricingItem {
  id: number;
  entity_type: string;
  category: string | null;
  promotion_type: string;
  duration_days: number;
  price_rub: number;
  is_active: boolean;
}

const ENTITY_TYPES = {
  course: 'Курсы',
  mastermind: 'Мастермайнды',
  offline_training: 'Офлайн-тренинги'
};

const CATEGORIES = {
  technique: 'Массажные техники',
  business: 'Бизнес и маркетинг',
  soft_skills: 'Общение и психология',
  health: 'Здоровье и безопасность',
  digital: 'Цифровые навыки'
};

const PROMOTION_TYPES = {
  own_category: 'В своей категории',
  all_categories: 'Во всех категориях'
};

export default function PromotionPricingTab() {
  const { toast } = useToast();
  const [pricing, setPricing] = useState<PricingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');

  useEffect(() => {
    loadPricing();
  }, []);

  const loadPricing = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/440adc30-7f65-4182-b68b-60de4ddd9f1d', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Loaded pricing data:', data);
        console.log('Sample item:', data[0]);
        console.log('Grouped keys will be:', data.map((item: PricingItem) => `${item.entity_type}_${item.promotion_type}`));
        setPricing(data);
      } else {
        const errorText = await response.text();
        console.error('Failed to load pricing:', response.status, errorText);
        throw new Error(`Failed to load pricing: ${response.status}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить цены. Проверьте права доступа.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePrice = async (id: number, newPrice: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/440adc30-7f65-4182-b68b-60de4ddd9f1d', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, price_rub: newPrice })
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Цена обновлена'
        });
        setEditingId(null);
        loadPricing();
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить цену',
        variant: 'destructive'
      });
    }
  };

  const groupedPricing = pricing.reduce((acc, item) => {
    const key = `${item.entity_type}_${item.promotion_type}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, PricingItem[]>);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Icon name="Loader2" size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Настройка цен на продвижение</h2>
          <p className="text-sm text-muted-foreground">
            Управляйте ценами на поднятие в топ для разных типов контента и категорий
          </p>
        </div>
        {pricing.length > 0 && (
          <div className="text-xs sm:text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md whitespace-nowrap">
            Загружено: {pricing.length} цен
          </div>
        )}
      </div>

      {pricing.length === 0 && !loading && (
        <div className="text-center p-8 bg-muted/50 rounded-lg">
          <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">Цены не найдены</p>
          <p className="text-muted-foreground">Возможно, требуется инициализация базы данных или у вас нет прав доступа</p>
        </div>
      )}

      {Object.entries(ENTITY_TYPES).map(([entityKey, entityName]) => (
        <div key={entityKey} className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
            <Icon name="Tag" size={18} className="text-primary" />
            {entityName}
          </h3>

          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            {/* Своя категория */}
            {Object.entries(CATEGORIES).map(([catKey, catName]) => {
              const key = `${entityKey}_own_category`;
              const items = groupedPricing[key]?.filter(item => item.category === catKey) || [];

              return (
                <Card key={`${entityKey}_${catKey}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm sm:text-base">
                      {catName} • В своей категории
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {items.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Цены не настроены
                      </p>
                    ) : (
                      <div className="space-y-2 sm:space-y-3">
                        {items
                          .sort((a, b) => a.duration_days - b.duration_days)
                          .map(item => (
                          <div key={item.id} className="flex items-center justify-between p-2 sm:p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Icon name="Clock" size={14} className="text-primary" />
                              <span className="text-xs sm:text-sm font-medium">{item.duration_days} {item.duration_days === 1 ? 'день' : item.duration_days <= 4 ? 'дня' : 'дней'}</span>
                            </div>
                            
                            {editingId === item.id ? (
                              <div className="flex items-center gap-1 sm:gap-2">
                                <Input
                                  type="number"
                                  value={editPrice}
                                  onChange={(e) => setEditPrice(e.target.value)}
                                  className="w-16 sm:w-24 h-7 sm:h-8 text-xs sm:text-sm"
                                  min="0"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => updatePrice(item.id, parseInt(editPrice))}
                                  className="h-7 sm:h-8 w-7 sm:w-8 p-0"
                                >
                                  <Icon name="Check" size={12} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingId(null)}
                                  className="h-7 sm:h-8 w-7 sm:w-8 p-0"
                                >
                                  <Icon name="X" size={12} />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 sm:gap-2">
                                <span className="font-bold text-sm sm:text-lg">{item.price_rub} ₽</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setEditingId(item.id);
                                    setEditPrice(item.price_rub.toString());
                                  }}
                                  className="h-7 sm:h-8 w-7 sm:w-8 p-0"
                                >
                                  <Icon name="Pencil" size={12} />
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}

            {/* Все категории */}
            {(() => {
              const key = `${entityKey}_all_categories`;
              const items = groupedPricing[key]?.filter(item => item.category === null) || [];

              return (
                <Card key={`${entityKey}_all`} className="sm:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                      <Icon name="Globe" size={16} />
                      Во всех категориях
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {items.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Цены не настроены
                      </p>
                    ) : (
                      <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {items
                          .sort((a, b) => a.duration_days - b.duration_days)
                          .map(item => (
                            <div key={item.id} className="flex items-center justify-between p-2 sm:p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Icon name="Clock" size={14} className="text-amber-700" />
                              <span className="text-xs sm:text-sm font-medium">{item.duration_days} {item.duration_days === 1 ? 'день' : item.duration_days <= 4 ? 'дня' : 'дней'}</span>
                            </div>
                            
                            {editingId === item.id ? (
                              <div className="flex items-center gap-1 sm:gap-2">
                                <Input
                                  type="number"
                                  value={editPrice}
                                  onChange={(e) => setEditPrice(e.target.value)}
                                  className="w-16 sm:w-24 h-7 sm:h-8 text-xs sm:text-sm"
                                  min="0"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => updatePrice(item.id, parseInt(editPrice))}
                                  className="h-7 sm:h-8 w-7 sm:w-8 p-0"
                                >
                                  <Icon name="Check" size={12} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingId(null)}
                                  className="h-7 sm:h-8 w-7 sm:w-8 p-0"
                                >
                                  <Icon name="X" size={12} />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 sm:gap-2">
                                <span className="font-bold text-sm sm:text-lg">{item.price_rub} ₽</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setEditingId(item.id);
                                    setEditPrice(item.price_rub.toString());
                                  }}
                                  className="h-7 sm:h-8 w-7 sm:w-8 p-0"
                                >
                                  <Icon name="Pencil" size={12} />
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })()}
          </div>
        </div>
      ))}
    </div>
  );
}