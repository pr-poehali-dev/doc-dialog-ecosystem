import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { BookingDialog } from "@/components/BookingDialog";
import { useToast } from "@/hooks/use-toast";
import ProfileSidebar from "@/components/masseur-profile/ProfileSidebar";
import AboutTab from "@/components/masseur-profile/AboutTab";
import ServicesTab from "@/components/masseur-profile/ServicesTab";
import ReviewsTab from "@/components/masseur-profile/ReviewsTab";

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

  const handleSendMessage = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    if (masseur) {
      navigate(`/dashboard/messages?masseur=${masseur.id}`);
    }
  };

  const handleBooking = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    if (masseur) {
      navigate(`/dashboard/messages?masseur=${masseur.id}&booking=true`);
    }
  };

  useEffect(() => {
    loadMasseurProfile();
  }, [id]);

  const loadMasseurProfile = async () => {
    try {
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
            <ProfileSidebar 
              masseur={masseur}
              onSendMessage={handleSendMessage}
              onBooking={handleBooking}
              renderStars={renderStars}
            />
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">О специалисте</TabsTrigger>
                <TabsTrigger value="services">Услуги</TabsTrigger>
                <TabsTrigger value="reviews">Отзывы ({masseur.reviews_count})</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <AboutTab masseur={masseur} />
              </TabsContent>

              <TabsContent value="services">
                <ServicesTab masseur={masseur} />
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <ReviewsTab 
                  masseur={masseur}
                  reviews={reviews}
                  renderStars={renderStars}
                />
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