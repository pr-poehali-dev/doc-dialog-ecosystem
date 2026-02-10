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
    <section className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {heroImage ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}></div>
      )}
      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 sm:py-16 text-center">
        {profilePhoto && (
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-rose-400/30 rounded-full blur-2xl scale-110"></div>
            <img 
              src={profilePhoto} 
              alt="Специалист" 
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full border-4 border-white/20 shadow-2xl object-cover backdrop-blur"
            />
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-2xl leading-tight tracking-tight">
          {heroTitle}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto drop-shadow-lg leading-relaxed font-light">
          {heroSubtitle}
        </p>
        <Button 
          size="lg" 
          className="bg-white text-gray-900 hover:bg-white/90 shadow-2xl px-8 py-6 text-lg font-semibold rounded-full transition-all hover:scale-105"
          asChild
          disabled={!userProfile?.phone}
        >
          <a href={userProfile?.phone ? `tel:${userProfile.phone}` : '#'}>
            <Icon name="Phone" size={22} className="mr-2" />
            Записаться на сеанс
          </a>
        </Button>
      </div>
    </section>
  );
}