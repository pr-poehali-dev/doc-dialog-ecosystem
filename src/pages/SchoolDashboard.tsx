import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  course_type: string;
  price: number | null;
  currency: string;
  duration_hours: number | null;
  image_url: string | null;
  external_url: string;
  status: string;
  created_at: string;
}

interface Mastermind {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  max_participants: number | null;
  current_participants: number;
  price: number | null;
  currency: string;
  image_url: string | null;
  external_url: string;
  status: string;
  created_at: string;
}

interface SpecialistRequest {
  id: number;
  title: string;
  description: string;
  specialty: string;
  budget_from: number | null;
  budget_to: number | null;
  currency: string;
  location: string | null;
  deadline_date: string | null;
  status: string;
  created_at: string;
}

const COURSE_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';

export default function SchoolDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'courses' | 'masterminds' | 'specialists'>('courses');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [masterminds, setMasterminds] = useState<Mastermind[]>([]);
  const [specialists, setSpecialists] = useState<SpecialistRequest[]>([]);
  
  const schoolId = 2; // Temporarily hardcoded, should come from auth
  
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: 'Классический массаж',
    course_type: 'online',
    price: '',
    duration_hours: '',
    image_url: '',
    external_url: ''
  });
  
  const [mastermindForm, setMastermindForm] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    max_participants: '',
    price: '',
    image_url: '',
    external_url: ''
  });
  
  const [specialistForm, setSpecialistForm] = useState({
    title: '',
    description: '',
    specialty: 'Видеооператор',
    budget_from: '',
    budget_to: '',
    location: '',
    deadline_date: ''
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      if (activeTab === 'courses') {
        const response = await fetch(`${COURSE_API_URL}?school_id=${schoolId}&status=all`);
        const data = await response.json();
        setCourses(data);
      } else if (activeTab === 'masterminds') {
        const response = await fetch(`${COURSE_API_URL}?action=masterminds&school_id=${schoolId}&status=all`);
        const data = await response.json();
        setMasterminds(data);
      } else if (activeTab === 'specialists') {
        const response = await fetch(`${COURSE_API_URL}?action=specialists&school_id=${schoolId}&status=all`);
        const data = await response.json();
        setSpecialists(data);
      }
    } catch (error) {
      console.error('Load error:', error);
      toast({ title: 'Ошибка загрузки', description: 'Не удалось загрузить данные', variant: 'destructive' });
    }
  };

  const handleAddCourse = async () => {
    try {
      const response = await fetch(`${COURSE_API_URL}?type=courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school_id: schoolId,
          ...courseForm,
          price: courseForm.price ? parseFloat(courseForm.price) : null,
          duration_hours: courseForm.duration_hours ? parseInt(courseForm.duration_hours) : null
        })
      });
      
      if (response.ok) {
        toast({ title: 'Курс добавлен', description: 'Курс отправлен на модерацию' });
        setShowAddForm(false);
        setCourseForm({ title: '', description: '', category: 'Классический массаж', course_type: 'online', price: '', duration_hours: '', image_url: '', external_url: '' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить курс', variant: 'destructive' });
    }
  };

  const handleAddMastermind = async () => {
    try {
      const response = await fetch(`${COURSE_API_URL}?type=masterminds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school_id: schoolId,
          ...mastermindForm,
          price: mastermindForm.price ? parseFloat(mastermindForm.price) : null,
          max_participants: mastermindForm.max_participants ? parseInt(mastermindForm.max_participants) : null
        })
      });
      
      if (response.ok) {
        toast({ title: 'Мастермайнд добавлен', description: 'Мастермайнд отправлен на модерацию' });
        setShowAddForm(false);
        setMastermindForm({ title: '', description: '', event_date: '', location: '', max_participants: '', price: '', image_url: '', external_url: '' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить мастермайнд', variant: 'destructive' });
    }
  };

  const handleAddSpecialist = async () => {
    try {
      const response = await fetch(`${COURSE_API_URL}?type=specialists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school_id: schoolId,
          ...specialistForm,
          budget_from: specialistForm.budget_from ? parseFloat(specialistForm.budget_from) : null,
          budget_to: specialistForm.budget_to ? parseFloat(specialistForm.budget_to) : null
        })
      });
      
      if (response.ok) {
        toast({ title: 'Запрос создан', description: 'Объявление о поиске специалиста опубликовано' });
        setShowAddForm(false);
        setSpecialistForm({ title: '', description: '', specialty: 'Видеооператор', budget_from: '', budget_to: '', location: '', deadline_date: '' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось создать запрос', variant: 'destructive' });
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      active: 'bg-blue-100 text-blue-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    
    const labels: Record<string, string> = {
      pending: 'На модерации',
      approved: 'Одобрено',
      rejected: 'Отклонено',
      active: 'Активно',
      closed: 'Закрыто'
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Кабинет школы</h1>
          <p className="text-muted-foreground">Управление курсами, мастермайндами и поиском специалистов</p>
        </div>

        <div className="flex gap-2 mb-6 border-b">
          <button
            onClick={() => { setActiveTab('courses'); setShowAddForm(false); }}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'courses' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Icon name="BookOpen" size={18} className="inline mr-2" />
            Курсы
          </button>
          <button
            onClick={() => { setActiveTab('masterminds'); setShowAddForm(false); }}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'masterminds' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Icon name="Users" size={18} className="inline mr-2" />
            Мастермайнды
          </button>
          <button
            onClick={() => { setActiveTab('specialists'); setShowAddForm(false); }}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'specialists' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Icon name="Search" size={18} className="inline mr-2" />
            Найти специалиста
          </button>
        </div>

        <div className="mb-6">
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Icon name="Plus" size={18} className="mr-2" />
            {activeTab === 'courses' && 'Добавить курс'}
            {activeTab === 'masterminds' && 'Добавить мастермайнд'}
            {activeTab === 'specialists' && 'Найти специалиста'}
          </Button>
        </div>

        {showAddForm && activeTab === 'courses' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Добавить новый курс</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Название курса*</Label>
                <Input value={courseForm.title} onChange={(e) => setCourseForm({...courseForm, title: e.target.value})} />
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea value={courseForm.description} onChange={(e) => setCourseForm({...courseForm, description: e.target.value})} rows={3} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Категория*</Label>
                  <select value={courseForm.category} onChange={(e) => setCourseForm({...courseForm, category: e.target.value})} className="w-full px-3 py-2 border rounded-md">
                    <option>Классический массаж</option>
                    <option>Спортивный массаж</option>
                    <option>Лечебный массаж</option>
                    <option>SPA массаж</option>
                    <option>Косметический массаж</option>
                    <option>Детский массаж</option>
                    <option>Другое</option>
                  </select>
                </div>
                <div>
                  <Label>Тип курса*</Label>
                  <select value={courseForm.course_type} onChange={(e) => setCourseForm({...courseForm, course_type: e.target.value})} className="w-full px-3 py-2 border rounded-md">
                    <option value="online">Онлайн</option>
                    <option value="offline">Офлайн</option>
                    <option value="free">Бесплатный</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Цена (₽)</Label>
                  <Input type="number" value={courseForm.price} onChange={(e) => setCourseForm({...courseForm, price: e.target.value})} />
                </div>
                <div>
                  <Label>Длительность (часов)</Label>
                  <Input type="number" value={courseForm.duration_hours} onChange={(e) => setCourseForm({...courseForm, duration_hours: e.target.value})} />
                </div>
              </div>
              <div>
                <Label>URL изображения</Label>
                <Input value={courseForm.image_url} onChange={(e) => setCourseForm({...courseForm, image_url: e.target.value})} placeholder="https://..." />
              </div>
              <div>
                <Label>Ссылка на курс (внешний сайт)*</Label>
                <Input value={courseForm.external_url} onChange={(e) => setCourseForm({...courseForm, external_url: e.target.value})} placeholder="https://..." />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddCourse}>Добавить курс</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Отмена</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {showAddForm && activeTab === 'masterminds' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Добавить мастермайнд</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Название*</Label>
                <Input value={mastermindForm.title} onChange={(e) => setMastermindForm({...mastermindForm, title: e.target.value})} />
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea value={mastermindForm.description} onChange={(e) => setMastermindForm({...mastermindForm, description: e.target.value})} rows={3} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Дата и время*</Label>
                  <Input type="datetime-local" value={mastermindForm.event_date} onChange={(e) => setMastermindForm({...mastermindForm, event_date: e.target.value})} />
                </div>
                <div>
                  <Label>Место проведения</Label>
                  <Input value={mastermindForm.location} onChange={(e) => setMastermindForm({...mastermindForm, location: e.target.value})} placeholder="Москва, ул. ..." />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Макс. участников</Label>
                  <Input type="number" value={mastermindForm.max_participants} onChange={(e) => setMastermindForm({...mastermindForm, max_participants: e.target.value})} />
                </div>
                <div>
                  <Label>Цена (₽)</Label>
                  <Input type="number" value={mastermindForm.price} onChange={(e) => setMastermindForm({...mastermindForm, price: e.target.value})} />
                </div>
              </div>
              <div>
                <Label>URL изображения</Label>
                <Input value={mastermindForm.image_url} onChange={(e) => setMastermindForm({...mastermindForm, image_url: e.target.value})} placeholder="https://..." />
              </div>
              <div>
                <Label>Ссылка для регистрации*</Label>
                <Input value={mastermindForm.external_url} onChange={(e) => setMastermindForm({...mastermindForm, external_url: e.target.value})} placeholder="https://..." />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddMastermind}>Добавить мастермайнд</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Отмена</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {showAddForm && activeTab === 'specialists' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Найти специалиста</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Название вакансии*</Label>
                <Input value={specialistForm.title} onChange={(e) => setSpecialistForm({...specialistForm, title: e.target.value})} placeholder="Требуется видеооператор" />
              </div>
              <div>
                <Label>Описание*</Label>
                <Textarea value={specialistForm.description} onChange={(e) => setSpecialistForm({...specialistForm, description: e.target.value})} rows={4} placeholder="Подробное описание требований..." />
              </div>
              <div>
                <Label>Специализация*</Label>
                <select value={specialistForm.specialty} onChange={(e) => setSpecialistForm({...specialistForm, specialty: e.target.value})} className="w-full px-3 py-2 border rounded-md">
                  <option>Видеооператор</option>
                  <option>Фотограф</option>
                  <option>Монтажер</option>
                  <option>Дизайнер</option>
                  <option>Копирайтер</option>
                  <option>SMM-специалист</option>
                  <option>Другое</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Бюджет от (₽)</Label>
                  <Input type="number" value={specialistForm.budget_from} onChange={(e) => setSpecialistForm({...specialistForm, budget_from: e.target.value})} />
                </div>
                <div>
                  <Label>Бюджет до (₽)</Label>
                  <Input type="number" value={specialistForm.budget_to} onChange={(e) => setSpecialistForm({...specialistForm, budget_to: e.target.value})} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Город</Label>
                  <Input value={specialistForm.location} onChange={(e) => setSpecialistForm({...specialistForm, location: e.target.value})} placeholder="Москва" />
                </div>
                <div>
                  <Label>Срок до</Label>
                  <Input type="date" value={specialistForm.deadline_date} onChange={(e) => setSpecialistForm({...specialistForm, deadline_date: e.target.value})} />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddSpecialist}>Опубликовать</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Отмена</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'courses' && courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  {getStatusBadge(course.status)}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Tag" size={16} className="text-primary" />
                    <span>{course.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Monitor" size={16} className="text-primary" />
                    <span>{course.course_type === 'online' ? 'Онлайн' : course.course_type === 'offline' ? 'Офлайн' : 'Бесплатный'}</span>
                  </div>
                  {course.price && (
                    <div className="flex items-center gap-2">
                      <Icon name="DollarSign" size={16} className="text-primary" />
                      <span>{course.price.toLocaleString()} {course.currency}</span>
                    </div>
                  )}
                  {course.duration_hours && (
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} className="text-primary" />
                      <span>{course.duration_hours} часов</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {activeTab === 'masterminds' && masterminds.map((mm) => (
            <Card key={mm.id}>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{mm.title}</CardTitle>
                  {getStatusBadge(mm.status)}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{mm.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <span>{new Date(mm.event_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  {mm.location && (
                    <div className="flex items-center gap-2">
                      <Icon name="MapPin" size={16} className="text-primary" />
                      <span>{mm.location}</span>
                    </div>
                  )}
                  {mm.max_participants && (
                    <div className="flex items-center gap-2">
                      <Icon name="Users" size={16} className="text-primary" />
                      <span>{mm.current_participants}/{mm.max_participants} участников</span>
                    </div>
                  )}
                  {mm.price && (
                    <div className="flex items-center gap-2">
                      <Icon name="DollarSign" size={16} className="text-primary" />
                      <span>{mm.price.toLocaleString()} {mm.currency}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {activeTab === 'specialists' && specialists.map((spec) => (
            <Card key={spec.id}>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{spec.title}</CardTitle>
                  {getStatusBadge(spec.status)}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">{spec.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Briefcase" size={16} className="text-primary" />
                    <span>{spec.specialty}</span>
                  </div>
                  {(spec.budget_from || spec.budget_to) && (
                    <div className="flex items-center gap-2">
                      <Icon name="DollarSign" size={16} className="text-primary" />
                      <span>
                        {spec.budget_from && spec.budget_to 
                          ? `${spec.budget_from.toLocaleString()}-${spec.budget_to.toLocaleString()}`
                          : spec.budget_from 
                            ? `от ${spec.budget_from.toLocaleString()}`
                            : `до ${spec.budget_to?.toLocaleString()}`
                        } {spec.currency}
                      </span>
                    </div>
                  )}
                  {spec.location && (
                    <div className="flex items-center gap-2">
                      <Icon name="MapPin" size={16} className="text-primary" />
                      <span>{spec.location}</span>
                    </div>
                  )}
                  {spec.deadline_date && (
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={16} className="text-primary" />
                      <span>До {new Date(spec.deadline_date).toLocaleDateString('ru-RU')}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {activeTab === 'courses' && courses.length === 0 && !showAddForm && (
          <div className="text-center py-12 text-muted-foreground">
            <Icon name="BookOpen" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Пока нет курсов. Добавьте первый курс!</p>
          </div>
        )}

        {activeTab === 'masterminds' && masterminds.length === 0 && !showAddForm && (
          <div className="text-center py-12 text-muted-foreground">
            <Icon name="Users" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Пока нет мастермайндов. Добавьте первое мероприятие!</p>
          </div>
        )}

        {activeTab === 'specialists' && specialists.length === 0 && !showAddForm && (
          <div className="text-center py-12 text-muted-foreground">
            <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Пока нет запросов. Создайте первое объявление!</p>
          </div>
        )}
      </div>
    </div>
  );
}
