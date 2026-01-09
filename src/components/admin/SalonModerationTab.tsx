import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const SALON_API = 'https://functions.poehali.dev/01aa5a2f-6476-4fbc-ba10-6808960c8a21';

interface Salon {
  id: number;
  owner_id: number;
  owner_email?: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  instagram?: string;
  images: string[];
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export default function SalonModerationTab() {
  const { toast } = useToast();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadSalons();
  }, []);

  const loadSalons = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${SALON_API}?action=admin_list`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setSalons(data.salons || []);
      } else {
        toast({ title: 'Ошибка загрузки салонов', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка сервера', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (salonId: number, verify: boolean) => {
    setProcessing(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${SALON_API}?action=verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ salon_id: salonId, verify })
      });

      if (res.ok) {
        toast({ 
          title: verify ? 'Салон верифицирован!' : 'Верификация отменена',
          description: verify ? 'Салон теперь виден в каталоге' : 'Салон скрыт из каталога'
        });
        setSelectedSalon(null);
        loadSalons();
      } else {
        const data = await res.json();
        toast({ title: data.error || 'Ошибка верификации', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка сервера', variant: 'destructive' });
    } finally {
      setProcessing(false);
    }
  };

  const pendingSalons = salons.filter(s => !s.is_verified);
  const verifiedSalons = salons.filter(s => s.is_verified);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon name="Loader2" className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pending Salons */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">На модерации</h2>
          <Badge variant="secondary">{pendingSalons.length}</Badge>
        </div>
        
        {pendingSalons.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              <Icon name="CheckCircle" className="mx-auto mb-2 text-gray-400" size={48} />
              <p>Нет салонов на модерации</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {pendingSalons.map(salon => (
              <Card key={salon.id} className="border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{salon.name}</h3>
                        <Badge variant="outline" className="bg-amber-100 text-amber-700">
                          <Icon name="Clock" size={14} className="mr-1" />
                          Ожидает
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{salon.description}</p>
                      
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Icon name="MapPin" size={14} />
                          {salon.address}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Phone" size={14} />
                          {salon.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Mail" size={14} />
                          {salon.email}
                        </span>
                      </div>

                      {salon.images && salon.images.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {salon.images.slice(0, 3).map((img, idx) => (
                            <img 
                              key={idx} 
                              src={img} 
                              alt={`${salon.name} ${idx + 1}`}
                              className="w-20 h-20 object-cover rounded border"
                            />
                          ))}
                          {salon.images.length > 3 && (
                            <div className="w-20 h-20 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-500">
                              +{salon.images.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-400">
                        Создано: {new Date(salon.created_at).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => setSelectedSalon(salon)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Icon name="Eye" size={16} className="mr-2" />
                        Проверить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Verified Salons */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Верифицированные</h2>
          <Badge variant="secondary">{verifiedSalons.length}</Badge>
        </div>
        
        {verifiedSalons.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              <Icon name="Building" className="mx-auto mb-2 text-gray-400" size={48} />
              <p>Нет верифицированных салонов</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {verifiedSalons.map(salon => (
              <Card key={salon.id} className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{salon.name}</h3>
                        <Badge className="bg-green-600 text-white">
                          <Icon name="CheckCircle" size={14} className="mr-1" />
                          Verified
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{salon.description}</p>
                      
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Icon name="MapPin" size={14} />
                          {salon.address}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Phone" size={14} />
                          {salon.phone}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedSalon(salon)}
                    >
                      <Icon name="Eye" size={16} className="mr-2" />
                      Просмотр
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedSalon} onOpenChange={() => setSelectedSalon(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedSalon?.name}
              {selectedSalon?.is_verified && (
                <Badge className="bg-green-600">
                  <Icon name="CheckCircle" size={14} className="mr-1" />
                  Verified
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              Детальная информация о салоне
            </DialogDescription>
          </DialogHeader>

          {selectedSalon && (
            <div className="space-y-4">
              {/* Images */}
              {selectedSalon.images && selectedSalon.images.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Фотографии:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedSalon.images.map((img, idx) => (
                      <img 
                        key={idx}
                        src={img}
                        alt={`${selectedSalon.name} ${idx + 1}`}
                        className="w-full h-40 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Описание:</h4>
                  <p>{selectedSalon.description}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500">Адрес:</h4>
                  <p>{selectedSalon.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-500">Телефон:</h4>
                    <p>{selectedSalon.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500">Email:</h4>
                    <p>{selectedSalon.email}</p>
                  </div>
                </div>

                {(selectedSalon.website || selectedSalon.instagram) && (
                  <div className="grid grid-cols-2 gap-4">
                    {selectedSalon.website && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-500">Сайт:</h4>
                        <a href={selectedSalon.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                          {selectedSalon.website}
                        </a>
                      </div>
                    )}
                    {selectedSalon.instagram && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-500">Instagram:</h4>
                        <a href={`https://instagram.com/${selectedSalon.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                          {selectedSalon.instagram}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <div className="text-xs text-gray-400 pt-2 border-t">
                  <p>Создано: {new Date(selectedSalon.created_at).toLocaleString('ru-RU')}</p>
                  <p>Обновлено: {new Date(selectedSalon.updated_at).toLocaleString('ru-RU')}</p>
                  {selectedSalon.owner_email && <p>Владелец: {selectedSalon.owner_email}</p>}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                {!selectedSalon.is_verified ? (
                  <>
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleVerify(selectedSalon.id, true)}
                      disabled={processing}
                    >
                      <Icon name="CheckCircle" size={16} className="mr-2" />
                      Верифицировать
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedSalon(null)}
                      disabled={processing}
                    >
                      Отмена
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleVerify(selectedSalon.id, false)}
                      disabled={processing}
                    >
                      <Icon name="XCircle" size={16} className="mr-2" />
                      Отменить верификацию
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedSalon(null)}
                      disabled={processing}
                    >
                      Закрыть
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}