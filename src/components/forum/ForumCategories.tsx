import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  topics_count: number;
  posts_count: number;
}

interface ForumCategoriesProps {
  categories: Category[];
  getCategoryColor: (color: string) => string;
}

export default function ForumCategories({ categories, getCategoryColor }: ForumCategoriesProps) {
  const navigate = useNavigate();

  return (
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
  );
}
