import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface LandingHeroProps {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  profilePhoto: string;
  gradientClass: string;
}

export default function LandingHero({
  heroTitle,
  heroSubtitle,
  heroImage,
  profilePhoto,
  gradientClass,
}: LandingHeroProps) {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
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
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        {profilePhoto && (
          <img 
            src={profilePhoto} 
            alt="Специалист" 
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-2xl object-cover"
          />
        )}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          {heroTitle}
        </h1>
        <p className="text-lg md:text-2xl text-white/95 mb-8 max-w-3xl mx-auto drop-shadow">
          {heroSubtitle}
        </p>
        <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl">
          <Icon name="Phone" size={20} className="mr-2" />
          Записаться на сеанс
        </Button>
      </div>
    </section>
  );
}
