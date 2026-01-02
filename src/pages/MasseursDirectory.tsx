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
  experience_years: number;
  specializations: string[];
  avatar_url: string | null;
  rating: number;
  reviews_count: number;
  about: string;
}

const MasseursDirectory = () => {
  const [masseurs, setMasseurs] = useState<Masseur[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"rating" | "experience">("rating");

  useEffect(() => {
    const mockMasseurs: Masseur[] = [
      {
        id: 1,
        full_name: "Анна Петрова",
        city: "Москва",
        experience_years: 8,
        specializations: ["Классический массаж", "Антицеллюлитный", "Лимфодренаж"],
        avatar_url: null,
        rating: 4.9,
        reviews_count: 127,
        about: "Профессиональный массажист с медицинским образованием"
      },
      {
        id: 2,
        full_name: "Дмитрий Соколов",
        city: "Санкт-Петербург",
        experience_years: 12,
        specializations: ["Спортивный массаж", "Реабилитация", "Тайский массаж"],
        avatar_url: null,
        rating: 4.95,
        reviews_count: 203,
        about: "Работаю со спортсменами и после травм"
      },
      {
        id: 3,
        full_name: "Елена Иванова",
        city: "Москва",
        experience_years: 5,
        specializations: ["Расслабляющий массаж", "Ароматерапия", "Массаж лица"],
        avatar_url: null,
        rating: 4.85,
        reviews_count: 89,
        about: "SPA-массаж для релаксации и красоты"
      },
      {
        id: 4,
        full_name: "Сергей Михайлов",
        city: "Казань",
        experience_years: 15,
        specializations: ["Лечебный массаж", "Мануальная терапия", "Остеопатия"],
        avatar_url: null,
        rating: 5.0,
        reviews_count: 341,
        about: "Дипломированный врач и массажист"
      }
    ];
    setMasseurs(mockMasseurs);
  }, []);

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
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Каталог массажистов
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Найдите профессионального массажиста в вашем городе
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск по имени или городу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2 rounded-md border bg-background"
            >
              <option value="all">Все города</option>
              {cities.filter(c => c !== "all").map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-4 py-2 rounded-md border bg-background"
            >
              <option value="all">Все специализации</option>
              {specializations.filter(s => s !== "all").map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={sortBy === "rating" ? "default" : "outline"}
              onClick={() => setSortBy("rating")}
              size="sm"
            >
              <Icon name="Star" size={16} className="mr-2" />
              По рейтингу
            </Button>
            <Button
              variant={sortBy === "experience" ? "default" : "outline"}
              onClick={() => setSortBy("experience")}
              size="sm"
            >
              <Icon name="Award" size={16} className="mr-2" />
              По опыту
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMasseurs.map((masseur) => (
            <Link key={masseur.id} to={`/masseurs/${masseur.id}`}>
              <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {masseur.full_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 truncate">{masseur.full_name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Icon name="MapPin" size={14} />
                        <span>{masseur.city}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{masseur.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {masseur.reviews_count} отзывов
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{masseur.about}</p>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Briefcase" size={16} className="text-primary" />
                    <span className="font-medium">{masseur.experience_years} лет опыта</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
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
                </CardContent>
              </Card>
            </Link>
          ))}
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