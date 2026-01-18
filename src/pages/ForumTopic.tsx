import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import ForumRules from '@/components/forum/ForumRules';
import Pagination from '@/components/forum/Pagination';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

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
  const [showRules, setShowRules] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const POSTS_PER_PAGE = 10;
  
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    if (!isLoggedIn) {
      setShowAuthDialog(true);
      setLoading(false);
      return;
    }
    if (topicId) {
      loadTopic();
    }
  }, [topicId, isLoggedIn]);

  useEffect(() => {
    // Обновляем отображаемые посты при изменении страницы
    if (posts.length > 0) {
      updateDisplayedPosts(posts, currentPage);
    }
  }, [currentPage]);

  const loadTopic = async () => {
    try {
      const res = await fetch(`${FORUM_API}?action=topic&topic_id=${topicId}`);
      const data = await res.json();
      setTopic(data.topic);
      const allPosts = data.posts || [];
      setPosts(allPosts);
      
      // Пагинация ответов
      updateDisplayedPosts(allPosts, 1);
    } catch (error) {
      console.error('Failed to load topic:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateDisplayedPosts = (allPosts: Post[], page: number) => {
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    setDisplayedPosts(allPosts.slice(startIndex, endIndex));
    setCurrentPage(page);
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
    if (!isLoggedIn) {
      setShowAuthDialog(true);
      return;
    }
    
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
        await loadTopic(); // Перезагружаем тему с новым ответом
        // Переходим на последнюю страницу после добавления ответа
        const totalPages = Math.ceil((posts.length + 1) / POSTS_PER_PAGE);
        updateDisplayedPosts([...posts], totalPages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <Dialog open={showAuthDialog} onOpenChange={() => navigate('/forum')}>
          <DialogContent className="sm:max-w-[450px] bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white text-xl flex items-center gap-2">
                <Icon name="Lock" size={24} className="text-blue-400" />
                Требуется авторизация
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Для просмотра тем и обсуждений необходимо войти в систему
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-slate-300">
                  Зарегистрируйтесь, чтобы получить доступ к профессиональному форуму и общаться с коллегами
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => navigate('/login')} className="flex-1">
                Войти
              </Button>
              <Button onClick={() => navigate('/register')} variant="outline" className="flex-1">
                Регистрация
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

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
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-12 max-w-5xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button
            onClick={() => navigate('/forum')}
            variant="ghost"
            size="sm"
            className="mb-4 sm:mb-6 text-slate-400 hover:text-white"
          >
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Назад к форуму
          </Button>
          <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {topic.category_name}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500 text-xs sm:text-sm flex items-center gap-1">
              <Icon name="Eye" size={14} />
              {topic.views_count} просмотров
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
            {topic.title}
          </h1>
        </div>

        {/* Original Post */}
        <Card className="bg-slate-900/90 mb-6 sm:mb-8">
          <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Author Info */}
              <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-3 sm:min-w-[140px]">
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl sm:text-2xl font-bold">
                    {topic.author_name.charAt(0)}
                  </span>
                </div>
                <div className="text-left sm:text-center flex-1 sm:flex-initial">
                  <p className="text-white font-semibold text-sm sm:text-base">{topic.author_name}</p>
                  <span className={`text-xs px-2 py-0.5 sm:py-1 rounded-full border ${authorRole.color} inline-block mt-1`}>
                    {authorRole.label}
                  </span>
                  {topic.author_specialization && (
                    <p className="text-slate-500 text-xs mt-1 sm:mt-2 hidden sm:block">{topic.author_specialization}</p>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-slate-300 text-base sm:text-lg whitespace-pre-wrap leading-relaxed">
                  {topic.content}
                </p>
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-500">
                  {getRelativeTime(topic.created_at)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Replies */}
        {posts.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <Icon name="MessageSquare" size={20} />
              Ответы ({posts.length})
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {displayedPosts.map((post) => {
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
                    <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                      {post.is_solution && (
                        <div className="mb-3 sm:mb-4 flex items-center gap-2 text-green-400">
                          <Icon name="CheckCircle" size={18} />
                          <span className="font-semibold text-sm sm:text-base">Решение</span>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        {/* Author Info */}
                        <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:min-w-[140px]">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-lg sm:text-xl font-bold">
                              {post.author_name.charAt(0)}
                            </span>
                          </div>
                          <div className="text-left sm:text-center flex-1 sm:flex-initial">
                            <p className="text-white font-semibold text-sm">{post.author_name}</p>
                            <span className={`text-xs px-2 py-0.5 sm:py-1 rounded-full border ${postAuthorRole.color} inline-block mt-1`}>
                              {postAuthorRole.label}
                            </span>
                            {post.author_specialization && (
                              <p className="text-slate-500 text-xs mt-1 sm:mt-2 hidden sm:block">{post.author_specialization}</p>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <p className="text-slate-300 text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
                            {post.content}
                          </p>
                          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-500">
                            {getRelativeTime(post.created_at)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {/* Pagination for replies */}
            {posts.length > POSTS_PER_PAGE && (
              <Pagination 
                currentPage={currentPage}
                totalPages={Math.ceil(posts.length / POSTS_PER_PAGE)}
                onPageChange={(page) => {
                  updateDisplayedPosts(posts, page);
                  // Скроллим к началу ответов
                  document.querySelector('h2')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }}
              />
            )}
          </div>
        )}

        {/* Reply Form */}
        <Card className="bg-slate-900/90 mt-6 sm:mt-8">
          <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <Icon name="MessageSquare" size={18} />
              Написать ответ
            </h3>
            <Textarea
              placeholder="Поделитесь своим мнением или опытом..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white min-h-[100px] sm:min-h-[120px] mb-3 text-sm sm:text-base"
              maxLength={2000}
            />
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2.5 sm:p-3 mb-3 sm:mb-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                <Icon name="Info" size={13} className="inline mr-1.5 text-blue-400" />
                Соблюдайте{' '}
                <button 
                  onClick={() => setShowRules(true)}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  правила форума
                </button>
                . Запрещены: спам, реклама, ссылки, оскорбления, офф-топик.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                {replyContent.length} / 2000 символов
              </p>
              <Button 
                onClick={handleReply} 
                disabled={submitting || !replyContent.trim()}
                className="gap-2 w-full sm:w-auto"
                size="sm"
              >
                <Icon name="Send" size={16} />
                {submitting ? 'Отправка...' : 'Опубликовать'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forum Rules Dialog */}
      <ForumRules open={showRules} onOpenChange={setShowRules} />
    </div>
  );
}