import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

interface Masseur {
  id: number;
  full_name: string;
  city: string;
  address?: string;
  experience_years: number;
  specializations: string[];
  avatar_url: string | null;
  rating: number;
  reviews_count: number;
  about: string;
  verification_badges?: string[];
  is_premium?: boolean;
  promoted_until?: string | null;
  is_promoted?: boolean;
}

const MasseursDirectory = () => {
  const [masseurs, setMasseurs] = useState<Masseur[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"rating" | "experience">("rating");

  useEffect(() => {
    loadMasseurs();
  }, []);

  const loadMasseurs = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/49394b85-90a2-40ca-a843-19e551c6c436');
      if (response.ok) {
        const data = await response.json();
        const masseursWithPromoted = (data.masseurs || data).map((m: Masseur) => ({
          ...m,
          is_promoted: m.promoted_until ? new Date(m.promoted_until) > new Date() : false
        }));
        setMasseurs(masseursWithPromoted);
      }
    } catch (error) {
      console.error('Ошибка загрузки массажистов:', error);
    }
  };

  const cities = ["all", ...Array.from(new Set(masseurs.map(m => m.city)))];
  const specializations = ["all", ...Array.from(new Set(masseurs.flatMap(m => m.specializations)))];

  const filteredMasseurs = masseurs
    .filter(m => 
      (selectedCity === "all" || m.city === selectedCity) &&
      (selectedSpecialization === "all" || m.specializations.includes(selectedSpecialization)) &&
      (searchQuery === "" || m.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || m.city.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      return b.experience_years - a.experience_years;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Каталог специалистов по телу
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Найдите профессионального специалиста по телу в вашем городе
          </p>
        </div>

        <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск по имени или городу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 md:h-10"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2.5 md:py-2 rounded-md border bg-background w-full text-base md:text-sm"
              >
                <option value="all">Все города</option>
                {cities.filter(c => c !== "all").map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="px-4 py-2.5 md:py-2 rounded-md border bg-background w-full text-base md:text-sm"
              >
                <option value="all">Все специализации</option>
                {specializations.filter(s => s !== "all").map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={sortBy === "rating" ? "default" : "outline"}
              onClick={() => setSortBy("rating")}
              size="sm"
              className="flex-1 sm:flex-none"
            >
              <Icon name="Star" size={16} className="mr-2" />
              По рейтингу
            </Button>
            <Button
              variant={sortBy === "experience" ? "default" : "outline"}
              onClick={() => setSortBy("experience")}
              size="sm"
              className="flex-1 sm:flex-none"
            >
              <Icon name="Award" size={16} className="mr-2" />
              По опыту
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredMasseurs.map((masseur) => {
            const isPromoted = masseur.promoted_until ? new Date(masseur.promoted_until) > new Date() : false;
            return (
            <Link key={masseur.id} to={`/masseurs/${masseur.id}`}>
              <Card className={`hover:shadow-lg transition-all cursor-pointer h-full relative overflow-visible ${
                isPromoted 
                  ? 'ring-2 ring-purple-500 shadow-xl shadow-purple-200/50 bg-gradient-to-br from-purple-50/50 to-blue-50/50' 
                  : masseur.is_premium 
                  ? 'ring-2 ring-amber-400 shadow-xl shadow-amber-200/50' 
                  : ''
              }`}>
                {isPromoted && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <Icon name="Rocket" size={14} />
                      ТОП
                    </div>
                  </div>
                )}
                {masseur.is_premium && !isPromoted && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <Icon name="Crown" size={14} />
                      Премиум
                    </div>
                  </div>
                )}
                <CardHeader className="p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    {masseur.avatar_url ? (
                      <img 
                        src={masseur.avatar_url} 
                        alt={masseur.full_name}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-xl md:text-2xl font-bold flex-shrink-0">
                        {masseur.full_name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-base md:text-lg truncate">{masseur.full_name}</h3>
                        {masseur.verification_badges && masseur.verification_badges.includes('identity') && (
                          <Icon name="BadgeCheck" size={16} className="text-blue-500 flex-shrink-0" title="Личность подтверждена" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Icon name="MapPin" size={14} className="flex-shrink-0" />
                        <span className="truncate">{masseur.city}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-sm md:text-base">{masseur.rating}</span>
                        </div>
                        <span className="text-xs md:text-sm text-muted-foreground">
                          {masseur.reviews_count} отзывов
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {masseur.verification_badges && masseur.verification_badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t">
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
                <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6">
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{masseur.about}</p>
                  
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <Icon name="Briefcase" size={16} className="text-primary" />
                    <span className="font-medium">{masseur.experience_years} лет опыта</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {masseur.specializations.slice(0, 3).map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {masseur.specializations.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{masseur.specializations.length - 3}
                      </Badge>
                    )}
                  </div>

                  {masseur.address && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 text-xs md:text-sm h-9"
                      onClick={(e) => {
                        e.preventDefault();
                        const address = encodeURIComponent(`${masseur.city}, ${masseur.address}`);
                        window.open(`https://yandex.ru/maps/?text=${address}`, '_blank');
                      }}
                    >
                      <Icon name="MapPin" size={14} className="mr-2" />
                      Показать на карте
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Link>
          )})}
        </div>

        {filteredMasseurs.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">Массажисты не найдены</p>
            <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить фильтры поиска</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MasseursDirectory;