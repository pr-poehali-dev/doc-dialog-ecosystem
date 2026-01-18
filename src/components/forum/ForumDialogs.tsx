import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

interface ForumDialogsProps {
  showAuthDialog: boolean;
  setShowAuthDialog: (show: boolean) => void;
  isNewTopicOpen: boolean;
  setIsNewTopicOpen: (open: boolean) => void;
  newTopic: {
    title: string;
    content: string;
    category_id: string;
    author_id: number;
  };
  setNewTopic: (topic: any) => void;
  categories: Category[];
  submitting: boolean;
  handleCreateTopic: () => void;
}

export default function ForumDialogs({
  showAuthDialog,
  setShowAuthDialog,
  isNewTopicOpen,
  setIsNewTopicOpen,
  newTopic,
  setNewTopic,
  categories,
  submitting,
  handleCreateTopic,
}: ForumDialogsProps) {
  const navigate = useNavigate();

  return (
    <>
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
                  <span>Создавать темы и участвовать в обсуждениях</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-0.5 text-blue-400 flex-shrink-0" />
                  <span>Получать ответы от профессионалов</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-0.5 text-blue-400 flex-shrink-0" />
                  <span>Делиться своим опытом и знаниями</span>
                </li>
              </ul>
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

      {/* Create Topic Dialog */}
      <Dialog open={isNewTopicOpen} onOpenChange={setIsNewTopicOpen}>
        <DialogContent className="sm:max-w-[600px] bg-slate-900 border-slate-700 px-4 sm:px-6">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Создать новую тему</DialogTitle>
            <DialogDescription className="text-slate-400 text-sm sm:text-base">
              Опишите вашу тему подробно, чтобы получить качественные ответы
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Категория</label>
              <Select
                value={newTopic.category_id}
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Заголовок</label>
              <Input
                placeholder="Краткое описание вашего вопроса"
                value={newTopic.title}
                onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Описание</label>
              <Textarea
                placeholder="Подробно опишите ваш вопрос или тему для обсуждения..."
                value={newTopic.content}
                onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
                className="min-h-[150px] bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
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
    </>
  );
}
