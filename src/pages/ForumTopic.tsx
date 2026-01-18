import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const FORUM_API = 'https://functions.poehali.dev/12c571f0-4ac4-4674-97a6-42fe8b17072a';

interface Post {
  id: number;
  author_name: string;
  author_role: string;
  author_bio: string;
  author_specialization: string;
  content: string;
  is_solution: boolean;
  created_at: string;
}

interface Topic {
  id: number;
  title: string;
  content: string;
  author_name: string;
  author_role: string;
  author_bio: string;
  author_specialization: string;
  category_name: string;
  category_color: string;
  views_count: number;
  created_at: string;
}

export default function ForumTopic() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (topicId) {
      loadTopic();
    }
  }, [topicId]);

  const loadTopic = async () => {
    try {
      const res = await fetch(`${FORUM_API}?action=topic&topic_id=${topicId}`);
      const data = await res.json();
      setTopic(data.topic);
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Failed to load topic:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role: string) => {
    const roles: Record<string, { label: string; color: string }> = {
      masseur: { label: 'Массажист', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      school: { label: 'Школа', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
      salon: { label: 'Салон', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
      client: { label: 'Клиент', color: 'bg-gray-500/20 text-gray-300 border-gray-500/30' },
    };
    return roles[role] || roles.masseur;
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
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleReply = async () => {
    if (!replyContent.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите текст ответа',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${FORUM_API}?action=post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic_id: topicId,
          author_id: 1, // Временно
          content: replyContent,
          is_solution: false,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Успешно!',
          description: 'Ответ опубликован',
        });
        setReplyContent('');
        loadTopic(); // Перезагружаем тему с новым ответом
      } else {
        throw new Error('Failed to post reply');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось опубликовать ответ',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Тема не найдена</div>
      </div>
    );
  }

  const authorRole = getRoleBadge(topic.author_role);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => navigate('/forum')}
            variant="ghost"
            className="mb-6 text-slate-400 hover:text-white"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к форуму
          </Button>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {topic.category_name}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500 text-sm flex items-center gap-1">
              <Icon name="Eye" size={16} />
              {topic.views_count} просмотров
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {topic.title}
          </h1>
        </div>

        {/* Original Post */}
        <Card className="bg-slate-900/90 mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-6">
              {/* Author Info */}
              <div className="flex flex-col items-center gap-3 min-w-[160px]">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {topic.author_name.charAt(0)}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold">{topic.author_name}</p>
                  <span className={`text-xs px-2 py-1 rounded-full border ${authorRole.color} inline-block mt-1`}>
                    {authorRole.label}
                  </span>
                  {topic.author_specialization && (
                    <p className="text-slate-500 text-xs mt-2">{topic.author_specialization}</p>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-slate-300 text-lg whitespace-pre-wrap leading-relaxed">
                  {topic.content}
                </p>
                <div className="mt-6 pt-4 border-t border-slate-800 text-sm text-slate-500">
                  {getRelativeTime(topic.created_at)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Replies */}
        {posts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Icon name="MessageSquare" size={24} />
              Ответы ({posts.length})
            </h2>
            <div className="space-y-6">
              {posts.map((post) => {
                const postAuthorRole = getRoleBadge(post.author_role);
                return (
                  <Card
                    key={post.id}
                    className={`${
                      post.is_solution
                        ? 'bg-green-900/20 border-green-500/30'
                        : 'bg-slate-900/90'
                    }`}
                  >
                    <CardContent className="pt-6">
                      {post.is_solution && (
                        <div className="mb-4 flex items-center gap-2 text-green-400">
                          <Icon name="CheckCircle" size={20} />
                          <span className="font-semibold">Решение</span>
                        </div>
                      )}
                      <div className="flex gap-6">
                        {/* Author Info */}
                        <div className="flex flex-col items-center gap-3 min-w-[160px]">
                          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl font-bold">
                              {post.author_name.charAt(0)}
                            </span>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-semibold text-sm">{post.author_name}</p>
                            <span className={`text-xs px-2 py-1 rounded-full border ${postAuthorRole.color} inline-block mt-1`}>
                              {postAuthorRole.label}
                            </span>
                            {post.author_specialization && (
                              <p className="text-slate-500 text-xs mt-2">{post.author_specialization}</p>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                            {post.content}
                          </p>
                          <div className="mt-4 text-sm text-slate-500">
                            {getRelativeTime(post.created_at)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Reply Form */}
        <Card className="bg-slate-900/90 mt-8">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Icon name="MessageSquare" size={20} />
              Написать ответ
            </h3>
            <Textarea
              placeholder="Поделитесь своим мнением или опытом..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white min-h-[120px] mb-4"
              maxLength={2000}
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">
                {replyContent.length} / 2000 символов
              </p>
              <Button 
                onClick={handleReply} 
                disabled={submitting || !replyContent.trim()}
                className="gap-2"
              >
                <Icon name="Send" size={16} />
                {submitting ? 'Отправка...' : 'Опубликовать'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}