import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Pagination from '@/components/forum/Pagination';

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

interface ForumTopicsListProps {
  categoryId?: string;
  recentTopics: Topic[];
  currentPage: number;
  totalPages: number;
  isLoggedIn: boolean;
  onPageChange: (page: number) => void;
  onCreateTopic: () => void;
  getRelativeTime: (dateString: string) => string;
  getRoleBadge: (role: string) => { label: string; color: string };
}

export default function ForumTopicsList({
  categoryId,
  recentTopics,
  currentPage,
  totalPages,
  isLoggedIn,
  onPageChange,
  onCreateTopic,
  getRelativeTime,
  getRoleBadge,
}: ForumTopicsListProps) {
  const navigate = useNavigate();

  return (
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
            onClick={onCreateTopic}
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
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          onPageChange(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
