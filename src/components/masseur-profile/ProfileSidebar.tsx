import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

interface Masseur {
  id: number;
  full_name: string;
  city: string;
  experience_years: number;
  specializations: string[];
  avatar_url: string | null;
  rating: number;
  reviews_count: number;
  about: string;
  phone: string;
  certificates?: string[];
  portfolio_images?: string[];
  education?: string;
  languages?: string[];
  verification_badges?: string[];
  is_premium?: boolean;
}

interface ProfileSidebarProps {
  masseur: Masseur;
  onSendMessage: () => void;
  onBooking: () => void;
  renderStars: (rating: number) => JSX.Element[];
}

const FAVORITES_API = 'https://functions.poehali.dev/1babd863-d072-4116-9af2-df1166fc0f27';

export default function ProfileSidebar({ masseur, onSendMessage, onBooking, renderStars }: ProfileSidebarProps) {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, [masseur.id]);

  const checkIfFavorite = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(FAVORITES_API, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const favoriteIds = data.favorite_ids || [];
        setIsFavorite(favoriteIds.some((f: any) => f.masseur_id === masseur.id));
      }
    } catch (error) {
      console.error('Ошибка проверки избранного:', error);
    }
  };

  const toggleFavorite = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите, чтобы добавить специалиста в избранное",
        variant: "destructive",
      });
      return;
    }

    setLoadingFavorite(true);
    try {
      if (isFavorite) {
        const response = await fetch(`${FAVORITES_API}?masseur_id=${masseur.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsFavorite(false);
          toast({
            title: "Удалено из избранного",
            description: `${masseur.full_name} больше не в избранном`,
          });
        }
      } else {
        const response = await fetch(FAVORITES_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ masseur_id: masseur.id }),
        });

        if (response.ok) {
          setIsFavorite(true);
          toast({
            title: "Добавлено в избранное",
            description: `${masseur.full_name} добавлен в избранное`,
          });
        }
      }
    } catch (error) {
      console.error('Ошибка добавления в избранное:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось выполнить действие",
        variant: "destructive",
      });
    } finally {
      setLoadingFavorite(false);
    }
  };

  return (
    <Card className={`sticky top-24 ${masseur.is_premium ? 'border-amber-400 border-2' : ''}`}>
      <CardHeader className="text-center">
        {masseur.is_premium && (
          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500">
            <Icon name="Crown" size={12} className="mr-1" />
            Премиум
          </Badge>
        )}
        <Avatar className="w-32 h-32 mx-auto mb-4">
          {masseur.avatar_url ? (
            <img src={masseur.avatar_url} alt={masseur.full_name} className="w-full h-full object-cover" />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-4xl">
              {masseur.full_name.charAt(0)}
            </AvatarFallback>
          )}
        </Avatar>
        <CardTitle className="text-2xl">{masseur.full_name}</CardTitle>
        <div className="flex items-center justify-center gap-2 text-muted-foreground mt-2">
          <Icon name="MapPin" size={16} />
          <span>{masseur.city}</span>
        </div>
        {masseur.verification_badges && masseur.verification_badges.length > 0 && (
          <div className="flex justify-center flex-wrap gap-2 mt-3 pt-3 border-t">
            {masseur.verification_badges.includes('education') && (
              <Badge variant="outline" className="text-xs flex items-center gap-1 bg-green-50 border-green-200 text-green-700">
                <Icon name="GraduationCap" size={12} />
                Образование
              </Badge>
            )}
            {masseur.verification_badges.includes('experience') && (
              <Badge variant="outline" className="text-xs flex items-center gap-1 bg-blue-50 border-blue-200 text-blue-700">
                <Icon name="Award" size={12} />
                Опыт
              </Badge>
            )}
            {masseur.verification_badges.includes('identity') && (
              <Badge variant="outline" className="text-xs flex items-center gap-1 bg-purple-50 border-purple-200 text-purple-700">
                <Icon name="BadgeCheck" size={12} />
                Личность
              </Badge>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center pb-4 border-b">
          <div className="flex items-center justify-center gap-1 mb-2">
            {renderStars(Math.round(masseur.rating))}
          </div>
          <p className="text-3xl font-bold">{masseur.rating}</p>
          <p className="text-sm text-muted-foreground">{masseur.reviews_count} отзывов</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Icon name="Briefcase" size={20} className="text-primary" />
            <span className="text-sm">Опыт: {masseur.experience_years} лет</span>
          </div>
          {masseur.languages && (
            <div className="flex items-center gap-3">
              <Icon name="Globe" size={20} className="text-primary" />
              <span className="text-sm">{masseur.languages.join(", ")}</span>
            </div>
          )}
        </div>

        <Button 
          className="w-full" 
          size="lg"
          onClick={onBooking}
        >
          <Icon name="Calendar" size={20} className="mr-2" />
          Записаться
        </Button>
        <Button 
          variant={isFavorite ? "default" : "outline"}
          className="w-full" 
          size="lg"
          onClick={toggleFavorite}
          disabled={loadingFavorite}
        >
          <Icon 
            name="Heart" 
            size={20} 
            className={`mr-2 ${isFavorite ? 'fill-current' : ''}`} 
          />
          {isFavorite ? 'В избранном' : 'В избранное'}
        </Button>
      </CardContent>
    </Card>
  );
}