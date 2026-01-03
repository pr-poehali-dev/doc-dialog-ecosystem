import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

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
}

export default function AdminSchoolsTab() {
  const { toast } = useToast();
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

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

      <div className="grid gap-4">
        {schools.map((school) => (
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
                    <h3 className="text-xl font-bold mb-1">{school.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {school.user_email} • ID: {school.id}
                    </p>
                  </div>
                  <Button 
                    onClick={() => deleteSchool(school.id)} 
                    variant="destructive" 
                    size="sm"
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить
                  </Button>
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
