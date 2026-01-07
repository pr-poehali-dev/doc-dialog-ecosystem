import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

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

interface Review {
  id: number;
  author_name: string;
  author_avatar: string | null;
  rating: number;
  comment: string;
  massage_type: string;
  created_at: string;
  is_verified: boolean;
  masseur_reply?: string | null;
  masseur_reply_at?: string | null;
}

interface ReviewsTabProps {
  masseur: Masseur;
  reviews: Review[];
  renderStars: (rating: number) => JSX.Element[];
  orderId?: number;
}

export default function ReviewsTab({ masseur, reviews, renderStars, orderId }: ReviewsTabProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newReview, setNewReview] = useState({ rating: 5, massage_type: '', comment: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [expandedReply, setExpandedReply] = useState<number | null>(null);
  const userRole = localStorage.getItem('userRole');

  return (
    <div className="space-y-4">
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="MessageSquarePlus" size={20} />
            Оставить отзыв
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!localStorage.getItem('token') ? (
            <div className="text-center py-8">
              <Icon name="Lock" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                Войдите в систему, чтобы оставить отзыв
              </p>
              <Button onClick={() => navigate('/login')}>
                Войти
              </Button>
            </div>
          ) : userRole === 'masseur' || userRole === 'school' ? (
            <div className="text-center py-8 bg-amber-50 border border-amber-200 rounded-lg">
              <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-amber-600" />
              <p className="font-semibold text-lg mb-2 text-amber-900">
                Только клиенты могут оставлять отзывы
              </p>
              <p className="text-sm text-amber-700">
                {userRole === 'masseur' ? 'Массажисты' : 'Школы'} не могут оставлять отзывы другим специалистам
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Оценка</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Icon
                        name="Star"
                        size={32}
                        className={star <= newReview.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Виды услуг</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newReview.massage_type}
                  onChange={(e) => setNewReview({ ...newReview, massage_type: e.target.value })}
                >
                  <option value="">Выберите услугу</option>
                  {masseur?.specializations.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ваш отзыв</label>
                <Textarea
                  placeholder="Расскажите о вашем опыте..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows={4}
                />
              </div>
              <Button
                className="w-full"
                onClick={async () => {
                  if (!newReview.massage_type || !newReview.comment) {
                    toast({
                      title: 'Заполните все поля',
                      description: 'Выберите вид массажа и напишите отзыв',
                      variant: 'destructive'
                    });
                    return;
                  }
                  
                  setIsSubmittingReview(true);
                  
                  try {
                    const token = localStorage.getItem('token');
                    const response = await fetch('https://functions.poehali.dev/8b4cf7f3-28ec-45d5-9c69-5d586d0f96c1?action=submit-review', {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        masseur_id: masseur.id,
                        rating: newReview.rating,
                        comment: newReview.comment,
                        massage_type: newReview.massage_type
                      })
                    });
                    
                    const data = await response.json();
                    
                    if (response.ok) {
                      // Если есть orderId, завершаем заказ
                      if (orderId) {
                        try {
                          const orderResponse = await fetch('https://functions.poehali.dev/04d0b538-1cf5-4941-9c06-8d1bef5854ec?action=update-order-status', {
                            method: 'POST',
                            headers: {
                              'Authorization': `Bearer ${token}`,
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              orderId: orderId,
                              status: 'completed'
                            })
                          });
                          
                          if (!orderResponse.ok) {
                            console.error('Failed to update order status');
                          }
                        } catch (err) {
                          console.error('Error updating order:', err);
                        }
                      }
                      
                      toast({
                        title: 'Отзыв отправлен на модерацию',
                        description: 'Ваш отзыв появится после проверки администратором'
                      });
                      setNewReview({ rating: 5, massage_type: '', comment: '' });
                      
                      // Перенаправляем в заказы
                      setTimeout(() => {
                        navigate('/dashboard/my-orders');
                      }, 1500);
                    } else {
                      toast({
                        title: 'Ошибка',
                        description: data.error || 'Не удалось отправить отзыв',
                        variant: 'destructive'
                      });
                    }
                  } catch (error) {
                    console.error('Error submitting review:', error);
                    toast({
                      title: 'Ошибка',
                      description: 'Не удалось отправить отзыв',
                      variant: 'destructive'
                    });
                  } finally {
                    setIsSubmittingReview(false);
                  }
                }}
                disabled={isSubmittingReview}
              >
                <Icon name="Send" size={18} className="mr-2" />
                {isSubmittingReview ? 'Отправка...' : 'Отправить отзыв'}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white">
                  {review.author_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold flex items-center gap-2">
                      {review.author_name}
                      {review.is_verified && (
                        <Badge variant="secondary" className="text-xs">
                          <Icon name="CheckCircle2" size={12} className="mr-1" />
                          Проверено
                        </Badge>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString('ru-RU', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <Badge variant="outline" className="mb-3">
                  {review.massage_type}
                </Badge>
                <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                
                {review.masseur_reply && (
                  <div className="mt-4">
                    <button
                      onClick={() => setExpandedReply(expandedReply === review.id ? null : review.id)}
                      className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      <Icon 
                        name={expandedReply === review.id ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                      />
                      Ответ массажиста
                    </button>
                    
                    {expandedReply === review.id && (
                      <div className="mt-3 pl-4 border-l-2 border-primary/30 bg-primary/5 p-4 rounded-r-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="MessageCircle" className="text-primary" size={16} />
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.masseur_reply_at!).toLocaleDateString('ru-RU', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{review.masseur_reply}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}