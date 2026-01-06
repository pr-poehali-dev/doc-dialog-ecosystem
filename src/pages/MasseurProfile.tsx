import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { BookingDialog } from "@/components/BookingDialog";
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
}

const MasseurProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [masseur, setMasseur] = useState<Masseur | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, massage_type: '', comment: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const handleSendMessage = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    navigate('/dashboard/messages');
  };

  useEffect(() => {
    loadMasseurProfile();
  }, [id]);

  const loadMasseurProfile = async () => {
    try {
      // Загружаем список всех массажистов
      const response = await fetch('https://functions.poehali.dev/49394b85-90a2-40ca-a843-19e551c6c436');
      if (response.ok) {
        const masseurs = await response.json();
        const foundMasseur = masseurs.find((m: any) => m.id === parseInt(id || '0'));
        
        if (foundMasseur) {
          setMasseur(foundMasseur);
          return;
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    }
    
    // Fallback на mock данные если не нашли
    const mockMasseur: Masseur = {
      id: 1,
      full_name: "Анна Петрова",
      city: "Москва",
      phone: "+7 (999) 123-45-67",
      experience_years: 8,
      specializations: ["Классический массаж", "Антицеллюлитный", "Лимфодренаж", "Массаж спины", "Расслабляющий массаж"],
      avatar_url: null,
      rating: 4.9,
      reviews_count: 127,
      about: "Профессиональный массажист с медицинским образованием. Специализируюсь на классическом и антицеллюлитном массаже. Использую авторские методики и натуральные масла. Работаю как в салоне, так и с выездом на дом.",
      education: "РНИМУ им. Пирогова, факультет медицинской реабилитации",
      languages: ["Русский", "Английский"],
      certificates: [
        "Сертификат массажиста международного образца",
        "Диплом о медицинском образовании",
        "Курс повышения квалификации по лимфодренажу"
      ],
      portfolio_images: []
    };

    const mockReviews: Review[] = [
      {
        id: 1,
        author_name: "Мария Иванова",
        author_avatar: null,
        rating: 5,
        comment: "Анна - прекрасный специалист! После антицеллюлитного массажа заметны реальные результаты. Профессиональный подход, приятная атмосфера. Обязательно вернусь снова!",
        massage_type: "Антицеллюлитный массаж",
        created_at: "2024-01-15",
        is_verified: true
      },
      {
        id: 2,
        author_name: "Елена Смирнова",
        author_avatar: null,
        rating: 5,
        comment: "Очень довольна! Классический массаж спины был именно тем, что нужно. Анна учла все мои пожелания и проблемные зоны. Рекомендую!",
        massage_type: "Классический массаж",
        created_at: "2024-01-10",
        is_verified: true
      },
      {
        id: 3,
        author_name: "Ольга Петрова",
        author_avatar: null,
        rating: 5,
        comment: "Лимфодренажный массаж превзошел все ожидания! Чувствуется легкость, отеки ушли. Спасибо большое!",
        massage_type: "Лимфодренаж",
        created_at: "2024-01-05",
        is_verified: false
      },
      {
        id: 4,
        author_name: "Анастасия Волкова",
        author_avatar: null,
        rating: 4,
        comment: "Хороший массажист, профессионально выполняет свою работу. Единственное - хотелось бы чуть больше времени на процедуру.",
        massage_type: "Расслабляющий массаж",
        created_at: "2023-12-28",
        is_verified: true
      }
    ];

    setMasseur(mockMasseur);
    setReviews(mockReviews);
  };

  if (!masseur) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-xl">Загрузка...</p>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={20}
        className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <Link to="/masseurs" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <Icon name="ArrowLeft" size={20} />
          Назад к каталогу
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
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

                <Button className="w-full" size="lg" onClick={handleSendMessage}>
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Написать
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={() => setIsBookingOpen(true)}
                >
                  <Icon name="Calendar" size={20} className="mr-2" />
                  Записаться
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">О специалисте</TabsTrigger>
                <TabsTrigger value="services">Услуги</TabsTrigger>
                <TabsTrigger value="reviews">Отзывы ({masseur.reviews_count})</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>О специалисте</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{masseur.about}</p>
                    
                    {masseur.education && (
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Icon name="GraduationCap" size={20} className="text-primary" />
                          Образование
                        </h3>
                        <p className="text-muted-foreground">{masseur.education}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services">
                <Card>
                  <CardHeader>
                    <CardTitle>Специализации</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {masseur.specializations.map((spec) => (
                        <div key={spec} className="flex items-center gap-3 p-3 rounded-lg border bg-secondary/50">
                          <Icon name="CheckCircle2" size={20} className="text-primary" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-purple-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="MessageSquarePlus" size={20} />
                      Оставить отзыв
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {localStorage.getItem('token') ? (
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
                            toast({
                              title: 'Отзыв отправлен',
                              description: 'Спасибо за ваш отзыв!'
                            });
                            setNewReview({ rating: 5, massage_type: '', comment: '' });
                            setIsSubmittingReview(false);
                          }}
                          disabled={isSubmittingReview}
                        >
                          <Icon name="Send" size={18} className="mr-2" />
                          Отправить отзыв
                        </Button>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <Icon name="Lock" size={48} className="mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground mb-4">
                          Войдите в систему, чтобы оставить отзыв
                        </p>
                        <Button onClick={() => navigate('/login')}>
                          Войти
                        </Button>
                      </div>
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
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {masseur && (
          <BookingDialog
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            masseurName={masseur.full_name}
            masseurId={masseur.id}
            specializations={masseur.specializations}
          />
        )}
      </div>
    </div>
  );
};

export default MasseurProfile;