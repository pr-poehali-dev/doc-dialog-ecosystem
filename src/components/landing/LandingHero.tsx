import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface UserProfile {
  full_name?: string;
  phone?: string;
  telegram?: string;
  max_messenger?: string;
  inn?: string;
}

interface LandingHeroProps {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  profilePhoto: string;
  gradientClass: string;
  userProfile?: UserProfile | null;
}

export default function LandingHero({
  heroTitle,
  heroSubtitle,
  heroImage,
  profilePhoto,
  gradientClass,
  userProfile,
}: LandingHeroProps) {
  return (
    <section className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center">
      {heroImage ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}></div>
      )}
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 sm:py-12 text-center text-white">
        {profilePhoto && (
          <img 
            src={profilePhoto} 
            alt="Специалист" 
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full mx-auto mb-4 sm:mb-6 border-4 border-white shadow-2xl object-cover"
          />
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 drop-shadow-lg px-2">
          {heroTitle}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-6 sm:mb-8 max-w-3xl mx-auto drop-shadow px-4">
          {heroSubtitle}
        </p>
        <Button 
          size="lg" 
          className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl w-full sm:w-auto"
          asChild
          disabled={!userProfile?.phone}
        >
          <a href={userProfile?.phone ? `tel:${userProfile.phone}` : '#'}>
            <Icon name="Phone" size={20} className="mr-2" />
            Записаться на сеанс
          </a>
        </Button>
      </div>
    </section>
  );
}