import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  requirement: string;
}

export default function TrustBadges() {
  const { toast } = useToast();
  const [badges, setBadges] = useState<BadgeItem[]>([
    {
      id: 'verified-education',
      name: 'Подтверждённое образование',
      description: 'Образование проверено администрацией',
      icon: 'GraduationCap',
      earned: true,
      requirement: 'Загрузить сертификаты и пройти проверку'
    },
    {
      id: 'school-partner',
      name: 'Партнёр школы',
      description: 'Выпускник партнёрской школы массажа',
      icon: 'Award',
      earned: true,
      requirement: 'Пройти обучение в партнёрской школе'
    },
    {
      id: 'verified-reviews',
      name: 'Проверенные отзывы',
      description: 'Есть подтверждённые отзывы от клиентов',
      icon: 'Star',
      earned: false,
      progress: 60,
      requirement: 'Получить 5 отзывов от реальных клиентов (3/5)'
    },
    {
      id: 'active-member',
      name: 'Активный участник',
      description: 'Регулярно участвует в жизни сообщества',
      icon: 'Users',
      earned: false,
      progress: 40,
      requirement: 'Участвовать в мастермайндах и обсуждениях'
    },
    {
      id: 'profile-complete',
      name: 'Заполненный профиль',
      description: 'Профиль заполнен полностью',
      icon: 'CheckCircle',
      earned: false,
      progress: 80,
      requirement: 'Заполнить все разделы профиля'
    },
    {
      id: 'long-term',
      name: 'Опытный специалист',
      description: 'Более 3 лет в экосистеме',
      icon: 'Clock',
      earned: false,
      progress: 33,
      requirement: 'Быть участником экосистемы 3+ года'
    },
    {
      id: 'mentor',
      name: 'Наставник',
      description: 'Помогает начинающим массажистам',
      icon: 'Heart',
      earned: false,
      progress: 0,
      requirement: 'Провести 10 консультаций новичкам'
    },
    {
      id: 'salon-verified',
      name: 'Проверен салоном',
      description: 'Рекомендован профессиональным салоном',
      icon: 'Building2',
      earned: false,
      progress: 0,
      requirement: 'Получить рекомендацию от салона-партнёра'
    },
  ]);

  const earnedBadges = badges.filter(b => b.earned);
  const inProgressBadges = badges.filter(b => !b.earned && b.progress && b.progress > 0);
  const lockedBadges = badges.filter(b => !b.earned && (!b.progress || b.progress === 0));

  const overallProgress = Math.round((earnedBadges.length / badges.length) * 100);

  const getIconColor = (earned: boolean) => {
    return earned ? 'text-primary' : 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Система доверия</h1>
              <p className="text-muted-foreground">Бейджи повышают доверие клиентов и видимость в каталоге</p>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Ваш прогресс</CardTitle>
              <CardDescription>Заработано {earnedBadges.length} из {badges.length} бейджей</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={overallProgress} className="h-3" />
                <p className="text-sm text-muted-foreground text-right">{overallProgress}% завершено</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">{earnedBadges.length}</p>
                  <p className="text-sm text-muted-foreground">Заработано</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">{inProgressBadges.length}</p>
                  <p className="text-sm text-muted-foreground">В процессе</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-gray-600">{lockedBadges.length}</p>
                  <p className="text-sm text-muted-foreground">Заблокировано</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {earnedBadges.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Award" className="text-primary" size={24} />
                  Заработанные бейджи
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {earnedBadges.map((badge) => (
                    <Card key={badge.id} className="border-primary/20 bg-primary/5">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <Icon name={badge.icon as any} className="text-primary-foreground" size={32} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{badge.name}</h3>
                              <Badge variant="default">Получен</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                            <p className="text-xs text-muted-foreground italic">✓ {badge.requirement}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {inProgressBadges.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Target" className="text-blue-600" size={24} />
                  В процессе получения
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {inProgressBadges.map((badge) => (
                    <Card key={badge.id} className="border-blue-200">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Icon name={badge.icon as any} className="text-blue-600" size={32} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{badge.name}</h3>
                              <Badge variant="secondary">{badge.progress}%</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                            <Progress value={badge.progress} className="h-2 mb-2" />
                            <p className="text-xs text-muted-foreground">{badge.requirement}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {lockedBadges.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Lock" className="text-muted-foreground" size={24} />
                  Доступные для получения
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {lockedBadges.map((badge) => (
                    <Card key={badge.id} className="opacity-75">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Icon name={badge.icon as any} className="text-gray-400" size={32} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{badge.name}</h3>
                              <Badge variant="outline">Заблокирован</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                            <p className="text-xs text-muted-foreground">Требование: {badge.requirement}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Card className="mt-6 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Sparkles" className="text-primary" size={24} />
                Почему бейджи важны?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Icon name="TrendingUp" className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-medium">Повышение доверия</p>
                  <p className="text-sm text-muted-foreground">Клиенты чаще выбирают специалистов с бейджами</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Eye" className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-medium">Приоритет в каталоге</p>
                  <p className="text-sm text-muted-foreground">Профили с бейджами показываются выше в поиске</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Shield" className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-medium">Профессионализм</p>
                  <p className="text-sm text-muted-foreground">Бейджи подтверждают вашу квалификацию и опыт</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
