import { useState, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { getUserId } from "@/utils/auth";

interface School {
  id: number;
  user_id: number;
  user_email: string;
  name: string;
  slug: string;
  logo_url: string | null;
  description: string | null;
  students_count: number;
  learning_direction: string | null;
  format: string | null;
  city: string | null;
  created_at: string;
  is_verified: boolean;
}

export default function AdminSchoolsTab() {
  const { toast } = useToast();
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFormat, setFilterFormat] = useState<string>('all');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'students'>('date');

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86?action=all_schools', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSchools(data.schools || []);
      } else {
        throw new Error('Failed to load schools');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить школы",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteSchool = async (schoolId: number) => {
    if (!confirm('Удалить школу? Это действие необратимо.')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86?id=${schoolId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        toast({ title: "Успех", description: "Школа удалена" });
        loadSchools();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить школу",
        variant: "destructive"
      });
    }
  };

  const moderateSchool = async (schoolId: number, isVerified: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const userId = getUserId();
      
      if (!token) {
        toast({
          title: "Ошибка авторизации",
          description: "Токен не найден. Пожалуйста, войдите снова.",
          variant: "destructive"
        });
        return;
      }
      
      if (!userId) {
        toast({
          title: "Ошибка авторизации",
          description: "User ID не найден. Пожалуйста, войдите снова.",
          variant: "destructive"
        });
        return;
      }
      
      const response = await fetch(`https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86?action=moderate&id=${schoolId}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'X-User-Id': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_verified: isVerified })
      });
      
      if (response.ok) {
        toast({ 
          title: "Успех", 
          description: isVerified ? "Школа одобрена и опубликована в каталоге" : "Школа отклонена и скрыта из каталога"
        });
        loadSchools();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось изменить статус школы",
        variant: "destructive"
      });
    }
  };

  const uniqueCities = useMemo(() => {
    const cities = schools.map(s => s.city).filter(Boolean);
    return Array.from(new Set(cities)).sort();
  }, [schools]);

  const filteredAndSortedSchools = useMemo(() => {
    let filtered = schools;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.user_email.toLowerCase().includes(query) ||
        s.slug.toLowerCase().includes(query) ||
        s.learning_direction?.toLowerCase().includes(query)
      );
    }

    if (filterFormat !== 'all') {
      filtered = filtered.filter(s => s.format === filterFormat);
    }

    if (filterCity !== 'all') {
      filtered = filtered.filter(s => s.city === filterCity);
    }

    const sorted = [...filtered];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'students') {
      sorted.sort((a, b) => b.students_count - a.students_count);
    } else {
      sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return sorted;
  }, [schools, searchQuery, filterFormat, filterCity, sortBy]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon name="Loader2" size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Все школы ({schools.length})</h2>
        <Button onClick={loadSchools} variant="outline" size="sm">
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Обновить
        </Button>
      </div>

      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Поиск по названию, email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterFormat} onValueChange={setFilterFormat}>
            <SelectTrigger>
              <SelectValue placeholder="Формат обучения" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все форматы</SelectItem>
              <SelectItem value="online">Онлайн</SelectItem>
              <SelectItem value="offline">Офлайн</SelectItem>
              <SelectItem value="hybrid">Гибрид</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCity} onValueChange={setFilterCity}>
            <SelectTrigger>
              <SelectValue placeholder="Город" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все города</SelectItem>
              {uniqueCities.map(city => (
                <SelectItem key={city} value={city!}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(val) => setSortBy(val as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">По дате создания</SelectItem>
              <SelectItem value="name">По названию</SelectItem>
              <SelectItem value="students">По студентам</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(searchQuery || filterFormat !== 'all' || filterCity !== 'all') && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Найдено: {filteredAndSortedSchools.length}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSearchQuery('');
                setFilterFormat('all');
                setFilterCity('all');
              }}
            >
              <Icon name="X" size={14} className="mr-1" />
              Сбросить фильтры
            </Button>
          </div>
        )}
      </Card>

      <div className="grid gap-4">
        {filteredAndSortedSchools.map((school) => (
          <Card key={school.id} className="p-6">
            <div className="flex items-start gap-4">
              {school.logo_url && (
                <img 
                  src={school.logo_url} 
                  alt={school.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold">{school.name}</h3>
                      {school.is_verified ? (
                        <Badge variant="default" className="bg-green-500">
                          <Icon name="CheckCircle" size={12} className="mr-1" />
                          Одобрена
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Icon name="Clock" size={12} className="mr-1" />
                          На модерации
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {school.user_email} • ID: {school.id}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!school.is_verified ? (
                      <Button 
                        onClick={() => moderateSchool(school.id, true)} 
                        variant="default"
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <Icon name="CheckCircle" size={16} className="mr-2" />
                        Одобрить
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => moderateSchool(school.id, false)} 
                        variant="outline"
                        size="sm"
                      >
                        <Icon name="XCircle" size={16} className="mr-2" />
                        Отклонить
                      </Button>
                    )}
                    <Button 
                      onClick={() => deleteSchool(school.id)} 
                      variant="destructive" 
                      size="sm"
                    >
                      <Icon name="Trash2" size={16} className="mr-2" />
                      Удалить
                    </Button>
                  </div>
                </div>

                {school.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {school.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-3">
                  {school.learning_direction && (
                    <Badge variant="secondary">
                      <Icon name="BookOpen" size={14} className="mr-1" />
                      {school.learning_direction}
                    </Badge>
                  )}
                  {school.format && (
                    <Badge variant="outline">
                      <Icon name="Monitor" size={14} className="mr-1" />
                      {school.format}
                    </Badge>
                  )}
                  {school.city && (
                    <Badge variant="outline">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      {school.city}
                    </Badge>
                  )}
                  <Badge>
                    <Icon name="Users" size={14} className="mr-1" />
                    {school.students_count} студентов
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Slug: /{school.slug}</span>
                  <span>•</span>
                  <span>Создана: {new Date(school.created_at).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredAndSortedSchools.length === 0 && schools.length > 0 && (
          <Card className="p-12 text-center">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </Card>
        )}

        {schools.length === 0 && (
          <Card className="p-12 text-center">
            <Icon name="Building2" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Школы не найдены</h3>
            <p className="text-muted-foreground">Пока никто не создал школу</p>
          </Card>
        )}
      </div>
    </div>
  );
}