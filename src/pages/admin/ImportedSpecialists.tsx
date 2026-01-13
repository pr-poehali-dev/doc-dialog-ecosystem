import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface ImportedSpecialist {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  description: string;
  photo_url?: string;
  location?: string;
  phone?: string;
  email?: string;
  price?: string;
  schedule?: string;
  rating?: number;
  reviews_count?: number;
  created_at: string;
}

export default function ImportedSpecialists() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [specialists, setSpecialists] = useState<ImportedSpecialist[]>([]);
  const [filteredSpecialists, setFilteredSpecialists] = useState<ImportedSpecialist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');

  useEffect(() => {
    fetchSpecialists();
  }, []);

  useEffect(() => {
    filterSpecialists();
  }, [searchQuery, selectedSpecialization, specialists]);

  const fetchSpecialists = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/9da994a5-6308-436a-955e-2708f96084b4?action=list', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSpecialists(data.specialists || []);
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить список специалистов',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterSpecialists = () => {
    let filtered = [...specialists];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.specialization.toLowerCase().includes(query) ||
        s.location?.toLowerCase().includes(query)
      );
    }

    if (selectedSpecialization !== 'all') {
      filtered = filtered.filter(s => 
        s.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase())
      );
    }

    setFilteredSpecialists(filtered);
  };

  const getSpecializations = () => {
    const specs = new Set(specialists.map(s => s.specialization));
    return Array.from(specs);
  };

  const deleteSpecialist = async (id: number) => {
    if (!confirm('Удалить этого специалиста?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://functions.poehali.dev/9da994a5-6308-436a-955e-2708f96084b4?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast({
          title: 'Удалено',
          description: 'Специалист удалён из списка'
        });
        fetchSpecialists();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить специалиста',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/admin')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Импортированные специалисты</h1>
              <p className="text-muted-foreground">Всего: {specialists.length}</p>
            </div>
          </div>
          <Button onClick={() => navigate('/admin/import-specialists')}>
            <Icon name="Upload" size={18} className="mr-2" />
            Импортировать ещё
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Поиск по имени, специализации, городу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="px-4 py-2 border rounded-md bg-white"
              >
                <option value="all">Все специализации</option>
                {getSpecializations().map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="text-center py-12">
            <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Загрузка специалистов...</p>
          </div>
        ) : filteredSpecialists.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Icon name="UserX" size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-4">
                {searchQuery || selectedSpecialization !== 'all' 
                  ? 'Специалисты не найдены по заданным фильтрам' 
                  : 'Нет импортированных специалистов'}
              </p>
              {!searchQuery && selectedSpecialization === 'all' && (
                <Button onClick={() => navigate('/admin/import-specialists')}>
                  Импортировать специалистов
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredSpecialists.map((specialist) => (
              <Card key={specialist.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {specialist.photo_url ? (
                      <img 
                        src={specialist.photo_url} 
                        alt={specialist.name}
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-gray-200"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 ${specialist.photo_url ? 'hidden' : ''}`}
                    >
                      {specialist.name.charAt(0)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{specialist.name}</h3>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="secondary">{specialist.specialization}</Badge>
                            {specialist.experience && (
                              <Badge variant="outline">{specialist.experience}</Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSpecialist(specialist.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {specialist.description}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                        {specialist.location && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="MapPin" size={14} />
                            <span className="truncate">{specialist.location}</span>
                          </div>
                        )}
                        {specialist.phone && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="Phone" size={14} />
                            <span className="truncate">{specialist.phone}</span>
                          </div>
                        )}
                        {specialist.price && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="DollarSign" size={14} />
                            <span className="truncate">{specialist.price}</span>
                          </div>
                        )}
                        {specialist.rating && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="Star" size={14} className="text-amber-500" />
                            <span>{specialist.rating} ({specialist.reviews_count || 0})</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}