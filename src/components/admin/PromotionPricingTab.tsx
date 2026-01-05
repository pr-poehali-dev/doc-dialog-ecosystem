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
        setPricing(data);
      } else {
        throw new Error('Failed to load pricing');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить цены',
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
      <div>
        <h2 className="text-2xl font-bold mb-2">Настройка цен на продвижение</h2>
        <p className="text-muted-foreground">
          Управляйте ценами на поднятие в топ для разных типов контента и категорий
        </p>
      </div>

      {Object.entries(ENTITY_TYPES).map(([entityKey, entityName]) => (
        <div key={entityKey} className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Icon name="Tag" size={20} className="text-primary" />
            {entityName}
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Своя категория */}
            {Object.entries(CATEGORIES).map(([catKey, catName]) => {
              const key = `${entityKey}_own_category`;
              const items = groupedPricing[key]?.filter(item => item.category === catKey) || [];

              return (
                <Card key={`${entityKey}_${catKey}`}>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {catName} • В своей категории
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {items
                        .sort((a, b) => a.duration_days - b.duration_days)
                        .map(item => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Icon name="Clock" size={16} className="text-primary" />
                              <span className="font-medium">{item.duration_days} {item.duration_days === 1 ? 'день' : item.duration_days <= 4 ? 'дня' : 'дней'}</span>
                            </div>
                            
                            {editingId === item.id ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  value={editPrice}
                                  onChange={(e) => setEditPrice(e.target.value)}
                                  className="w-24 h-8"
                                  min="0"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => updatePrice(item.id, parseInt(editPrice))}
                                >
                                  <Icon name="Check" size={14} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingId(null)}
                                >
                                  <Icon name="X" size={14} />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-lg">{item.price_rub} ₽</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setEditingId(item.id);
                                    setEditPrice(item.price_rub.toString());
                                  }}
                                >
                                  <Icon name="Pencil" size={14} />
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Все категории */}
            {(() => {
              const key = `${entityKey}_all_categories`;
              const items = groupedPricing[key]?.filter(item => item.category === null) || [];

              return (
                <Card key={`${entityKey}_all`} className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Icon name="Globe" size={18} />
                      Во всех категориях
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-3">
                      {items
                        .sort((a, b) => a.duration_days - b.duration_days)
                        .map(item => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Icon name="Clock" size={16} className="text-amber-700" />
                              <span className="font-medium">{item.duration_days} {item.duration_days === 1 ? 'день' : item.duration_days <= 4 ? 'дня' : 'дней'}</span>
                            </div>
                            
                            {editingId === item.id ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  value={editPrice}
                                  onChange={(e) => setEditPrice(e.target.value)}
                                  className="w-24 h-8"
                                  min="0"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => updatePrice(item.id, parseInt(editPrice))}
                                >
                                  <Icon name="Check" size={14} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingId(null)}
                                >
                                  <Icon name="X" size={14} />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-lg">{item.price_rub} ₽</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setEditingId(item.id);
                                    setEditPrice(item.price_rub.toString());
                                  }}
                                >
                                  <Icon name="Pencil" size={14} />
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
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