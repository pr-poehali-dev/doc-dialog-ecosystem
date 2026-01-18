import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentTopics, setRecentTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadForumData();
  }, [categoryId]);

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
      setRecentTopics(topicsData.topics || []);
    } catch (error) {
      console.error('Failed to load forum:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка форума...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="mb-6"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            На главную
          </Button>
          <h1 className="text-5xl font-bold text-white mb-4">
            Профессиональный форум
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Общайтесь с коллегами, делитесь опытом, получайте советы от профессионалов
          </p>
        </div>

        {/* Categories */}
        {!categoryId && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Категории</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className={`${getCategoryColor(category.color)} cursor-pointer hover:scale-105 transition-transform`}
                  onClick={() => navigate(`/forum/category/${category.id}`)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <Icon name={category.icon as any} size={28} />
                    {category.name}
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">
              {categoryId ? 'Темы категории' : 'Последние обсуждения'}
            </h2>
            {categoryId && (
              <Button onClick={() => navigate('/forum')} variant="outline">
                Все категории
              </Button>
            )}
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
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${roleBadge.color}`}>
                            {roleBadge.label}
                          </span>
                          <span className="text-slate-400 text-sm">{topic.author_name}</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-500 text-sm">
                            {getRelativeTime(topic.created_at)}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {topic.title}
                        </h3>
                        <p className="text-slate-400 text-sm line-clamp-2">
                          {topic.content}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 text-sm text-slate-500">
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
        </div>
      </div>
    </div>
  );
}