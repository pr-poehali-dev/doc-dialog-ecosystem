import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import ForumRules from '@/components/forum/ForumRules';
import Pagination from '@/components/forum/Pagination';

const FORUM_API = 'https://functions.poehali.dev/12c571f0-4ac4-4674-97a6-42fe8b17072a';

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  topics_count: number;
  posts_count: number;
}

interface Topic {
  id: number;
  title: string;
  content: string;
  author_name: string;
  author_role: string;
  category_name: string;
  category_color: string;
  replies_count: number;
  views_count: number;
  created_at: string;
  last_activity: string;
}

export default function Forum() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [allTopics, setAllTopics] = useState<Topic[]>([]); // Все темы
  const [recentTopics, setRecentTopics] = useState<Topic[]>([]); // Отображаемые темы
  const [loading, setLoading] = useState(true);
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);
  const [newTopic, setNewTopic] = useState({
    title: '',
    content: '',
    category_id: categoryId || '',
    author_id: 1, // Временно: первый пользователь
  });
  const [submitting, setSubmitting] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const TOPICS_PER_PAGE = 10;
  
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    setCurrentPage(1); // Сброс на первую страницу при смене категории
    loadForumData();
  }, [categoryId]);

  useEffect(() => {
    // Обновляем отображаемые темы при смене страницы
    const startIndex = (currentPage - 1) * TOPICS_PER_PAGE;
    const endIndex = startIndex + TOPICS_PER_PAGE;
    setRecentTopics(allTopics.slice(startIndex, endIndex));
  }, [currentPage, allTopics]);

  const loadForumData = async () => {
    try {
      const categoriesRes = await fetch(`${FORUM_API}?action=categories`);
      const categoriesData = await categoriesRes.json();
      setCategories(categoriesData.categories || []);

      const topicsUrl = categoryId 
        ? `${FORUM_API}?action=topics&category_id=${categoryId}`
        : `${FORUM_API}?action=topics`;
      const topicsRes = await fetch(topicsUrl);
      const topicsData = await topicsRes.json();
      const fetchedTopics = topicsData.topics || [];
      
      setAllTopics(fetchedTopics);
      setTotalPages(Math.ceil(fetchedTopics.length / TOPICS_PER_PAGE));
      
      const startIndex = (currentPage - 1) * TOPICS_PER_PAGE;
      const endIndex = startIndex + TOPICS_PER_PAGE;
      setRecentTopics(fetchedTopics.slice(startIndex, endIndex));
    } catch (error) {
      console.error('Failed to load forum:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentCategory = categories.find(c => c.id === Number(categoryId));
  const pageTitle = currentCategory 
    ? `${currentCategory.name} - Профессиональный форум`
    : 'Профессиональный форум - Обсуждения и советы';
  const pageDescription = currentCategory
    ? `${currentCategory.description} - Общайтесь с коллегами и делитесь опытом`
    : 'Общайтесь с коллегами, делитесь опытом, получайте советы от профессионалов в различных областях';

  const getCategoryColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-slate-900/95 border-blue-500/50',
      purple: 'bg-slate-900/95 border-purple-500/50',
      green: 'bg-slate-900/95 border-green-500/50',
      red: 'bg-slate-900/95 border-red-500/50',
      orange: 'bg-slate-900/95 border-orange-500/50',
      cyan: 'bg-slate-900/95 border-cyan-500/50',
    };
    return colors[color] || colors.blue;
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} мин назад`;
    if (diffHours < 24) return `${diffHours} ч назад`;
    if (diffDays < 7) return `${diffDays} д назад`;
    return date.toLocaleDateString('ru-RU');
  };

  const getRoleBadge = (role: string) => {
    const roles: Record<string, { label: string; color: string }> = {
      masseur: { label: 'Массажист', color: 'bg-blue-500/20 text-blue-300' },
      school: { label: 'Школа', color: 'bg-purple-500/20 text-purple-300' },
      salon: { label: 'Салон', color: 'bg-green-500/20 text-green-300' },
      client: { label: 'Клиент', color: 'bg-gray-500/20 text-gray-300' },
    };
    return roles[role] || roles.masseur;
  };

  const handleCreateTopic = async () => {
    if (!isLoggedIn) {
      setShowAuthDialog(true);
      return;
    }
    
    if (!newTopic.title.trim() || !newTopic.content.trim() || !newTopic.category_id) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${FORUM_API}?action=topic`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTopic),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: 'Успешно!',
          description: 'Тема создана',
        });
        setIsNewTopicOpen(false);
        setNewTopic({ title: '', content: '', category_id: categoryId || '', author_id: 1 });
        navigate(`/forum/topic/${data.topic_id}`);
      } else {
        throw new Error('Failed to create topic');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать тему',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка форума...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {currentCategory && (
          <link rel="canonical" href={`https://docdialog.su/forum/${categoryId}`} />
        )}
        {!currentCategory && (
          <link rel="canonical" href="https://docdialog.su/forum" />
        )}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": currentCategory 
              ? `https://docdialog.su/forum/${categoryId}`
              : "https://docdialog.su/forum",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Главная",
                  "item": "https://docdialog.su"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Форум",
                  "item": "https://docdialog.su/forum"
                }
              ]
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0 mb-6">
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <Button
                onClick={() => navigate('/dashboard')}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-initial"
              >
                <Icon name="Rocket" size={18} className="mr-2" />
                <span className="hidden sm:inline">Платформа</span>
                <span className="sm:hidden">Платформа</span>
              </Button>
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                size="sm"
                className="flex-1 sm:flex-initial"
              >
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                <span className="hidden sm:inline">На главную</span>
                <span className="sm:hidden">Главная</span>
              </Button>
            </div>
            <Button
              onClick={() => setShowRules(true)}
              variant="outline"
              size="sm"
              className="gap-2 w-full sm:w-auto"
            >
              <Icon name="ShieldCheck" size={18} />
              <span className="hidden sm:inline">Правила форума</span>
              <span className="sm:hidden">Правила</span>
            </Button>
          </div>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Профессиональный форум
            </h1>
            <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto px-2">
              Общайтесь с коллегами, делитесь опытом, получайте советы от профессионалов
            </p>
          </div>
        </div>

        {/* Categories */}
        {!categoryId && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Категории</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className={`${getCategoryColor(category.color)} cursor-pointer hover:scale-105 transition-transform`}
                  onClick={() => navigate(`/forum/category/${category.id}`)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 sm:gap-3 text-white text-base sm:text-lg">
                    <Icon name={category.icon as any} size={24} className="flex-shrink-0" />
                    <span>{category.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Icon name="MessageSquare" size={16} />
                      <span>{category.topics_count} тем</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="MessageCircle" size={16} />
                      <span>{category.posts_count} ответов</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          </div>
        )}

        {/* Recent Topics */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {categoryId ? 'Темы категории' : 'Последние обсуждения'}
            </h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              {categoryId && (
                <Button onClick={() => navigate('/forum')} variant="outline" size="sm" className="w-full sm:w-auto">
                  <Icon name="Grid" size={16} className="mr-2" />
                  Все категории
                </Button>
              )}
              <Button 
                onClick={() => {
                  if (!isLoggedIn) {
                    setShowAuthDialog(true);
                  } else {
                    setIsNewTopicOpen(true);
                  }
                }} 
                className="gap-2 w-full sm:w-auto" 
                size="sm"
              >
                <Icon name="Plus" size={18} />
                Создать тему
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {recentTopics.map((topic) => {
              const roleBadge = getRoleBadge(topic.author_role);
              return (
                <Card
                  key={topic.id}
                  className="bg-slate-900/90 hover:bg-slate-900 cursor-pointer transition-colors"
                  onClick={() => navigate(`/forum/topic/${topic.id}`)}
                >
                  <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                      <div className="flex-1 w-full">
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${roleBadge.color}`}>
                            {roleBadge.label}
                          </span>
                          <span className="text-slate-400 text-xs sm:text-sm">{topic.author_name}</span>
                          <span className="text-slate-600 hidden sm:inline">•</span>
                          <span className="text-slate-500 text-xs sm:text-sm">
                            {getRelativeTime(topic.created_at)}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 leading-tight">
                          {topic.title}
                        </h3>
                        <p className="text-slate-400 text-sm line-clamp-2 mb-3 sm:mb-0">
                          {topic.content}
                        </p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 text-sm text-slate-500 w-full sm:w-auto justify-between sm:justify-start">
                        <div className="flex items-center gap-1">
                          <Icon name="MessageSquare" size={16} />
                          <span>{topic.replies_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Eye" size={16} />
                          <span>{topic.views_count}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Pagination */}
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      </div>

      {/* Auth Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-[450px] bg-slate-900 border-slate-700 px-4 sm:px-6">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center gap-2">
              <Icon name="Lock" size={24} className="text-blue-400" />
              Требуется авторизация
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-sm sm:text-base">
              Для создания тем и ответов необходимо войти в систему
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                Зарегистрируйтесь, чтобы:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-0.5 text-blue-400 flex-shrink-0" />
                  <span>Создавать темы и обсуждения</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-0.5 text-blue-400 flex-shrink-0" />
                  <span>Отвечать на вопросы коллег</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-0.5 text-blue-400 flex-shrink-0" />
                  <span>Общаться с профессионалами</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => navigate('/login')} 
              className="flex-1"
            >
              Войти
            </Button>
            <Button 
              onClick={() => navigate('/register')} 
              variant="outline"
              className="flex-1"
            >
              Регистрация
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Forum Rules Dialog */}
      <ForumRules open={showRules} onOpenChange={setShowRules} />

      {/* Create Topic Dialog */}
      <Dialog open={isNewTopicOpen} onOpenChange={setIsNewTopicOpen}>
        <DialogContent className="sm:max-w-[600px] bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Создать новую тему</DialogTitle>
            <DialogDescription className="text-slate-400">
              Задайте вопрос или начните обсуждение
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                Категория
              </label>
              <Select
                value={newTopic.category_id.toString()}
                onValueChange={(value) => setNewTopic({ ...newTopic, category_id: value })}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()} className="text-white">
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                Заголовок
              </label>
              <Input
                placeholder="О чём вы хотите спросить?"
                value={newTopic.title}
                onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                maxLength={200}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                Описание
              </label>
              <Textarea
                placeholder="Опишите вашу проблему или вопрос подробнее..."
                value={newTopic.content}
                onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white min-h-[150px]"
                maxLength={2000}
              />
              <p className="text-xs text-slate-500 mt-1">
                {newTopic.content.length} / 2000 символов
              </p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <p className="text-xs text-slate-300">
                <Icon name="Info" size={14} className="inline mr-1.5 text-blue-400" />
                Пожалуйста, соблюдайте{' '}
                <button 
                  onClick={() => {
                    setIsNewTopicOpen(false);
                    setShowRules(true);
                  }}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  правила форума
                </button>
                . Запрещены: спам, реклама, ссылки, оскорбления, офф-топик.
              </p>
            </div>
            <div className="flex gap-3 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setIsNewTopicOpen(false)}
                disabled={submitting}
              >
                Отмена
              </Button>
              <Button onClick={handleCreateTopic} disabled={submitting}>
                {submitting ? 'Создание...' : 'Создать тему'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </>
  );
}