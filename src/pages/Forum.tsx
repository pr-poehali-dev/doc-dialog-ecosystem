import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/hooks/use-toast';
import ForumRules from '@/components/forum/ForumRules';
import ForumHeader from '@/components/forum/ForumHeader';
import ForumCategories from '@/components/forum/ForumCategories';
import ForumTopicsList from '@/components/forum/ForumTopicsList';
import ForumDialogs from '@/components/forum/ForumDialogs';

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
  const [allTopics, setAllTopics] = useState<Topic[]>([]);
  const [recentTopics, setRecentTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);
  const [newTopic, setNewTopic] = useState({
    title: '',
    content: '',
    category_id: categoryId || '',
    author_id: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const TOPICS_PER_PAGE = 10;
  
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    setCurrentPage(1);
    loadForumData();
  }, [categoryId]);

  useEffect(() => {
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

  const handleCreateTopicClick = () => {
    if (!isLoggedIn) {
      setShowAuthDialog(true);
    } else {
      setIsNewTopicOpen(true);
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
        <div className="container mx-auto px-3 sm:px-4 pt-6 sm:pt-12 pb-6 sm:pb-12">
          <ForumHeader onShowRules={() => setShowRules(true)} />

          {!categoryId && (
            <ForumCategories 
              categories={categories}
              getCategoryColor={getCategoryColor}
            />
          )}

          <ForumTopicsList 
            categoryId={categoryId}
            recentTopics={recentTopics}
            currentPage={currentPage}
            totalPages={totalPages}
            isLoggedIn={isLoggedIn}
            onPageChange={setCurrentPage}
            onCreateTopic={handleCreateTopicClick}
            getRelativeTime={getRelativeTime}
            getRoleBadge={getRoleBadge}
          />
        </div>

        <ForumRules open={showRules} onOpenChange={setShowRules} />

        <ForumDialogs 
          showAuthDialog={showAuthDialog}
          setShowAuthDialog={setShowAuthDialog}
          isNewTopicOpen={isNewTopicOpen}
          setIsNewTopicOpen={setIsNewTopicOpen}
          newTopic={newTopic}
          setNewTopic={setNewTopic}
          categories={categories}
          submitting={submitting}
          handleCreateTopic={handleCreateTopic}
        />
      </div>
    </>
  );
}