import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import MasseursFooter from '@/components/masseurs/MasseursFooter';

interface Vacancy {
  id: number;
  salonName: string;
  position: string;
  salary: string;
  schedule: string;
  district: string;
  requirements: string[];
  description: string;
  contacts: string;
}

const mockVacancies: Vacancy[] = [
  {
    id: 1,
    salonName: "Массажный салон «Гармония»",
    position: "Массажист",
    salary: "от 80 000 ₽",
    schedule: "Полный день",
    district: "Центральный",
    requirements: ["Опыт от 1 года", "Сертификат массажиста", "Знание различных техник"],
    description: "Ищем профессионального массажиста в команду. Дружный коллектив, современное оборудование, стабильный поток клиентов.",
    contacts: "+7 (900) 123-45-67"
  }
];

export default function VacanciesCatalog() {
  const [vacancies] = useState<Vacancy[]>(mockVacancies);
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [scheduleFilter, setScheduleFilter] = useState('all');

  const filteredVacancies = vacancies.filter(vacancy => {
    const matchesSearch = vacancy.salonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vacancy.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = districtFilter === 'all' || vacancy.district === districtFilter;
    const matchesSchedule = scheduleFilter === 'all' || vacancy.schedule === scheduleFilter;
    
    return matchesSearch && matchesDistrict && matchesSchedule;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Вакансии для массажистов</h1>
            <p className="text-lg text-muted-foreground">
              Найдите работу мечты в лучших массажных салонах города
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Поиск по названию салона или должности..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={districtFilter} onValueChange={setDistrictFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Район" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все районы</SelectItem>
                    <SelectItem value="Центральный">Центральный</SelectItem>
                    <SelectItem value="Северный">Северный</SelectItem>
                    <SelectItem value="Южный">Южный</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={scheduleFilter} onValueChange={setScheduleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="График" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Любой график</SelectItem>
                    <SelectItem value="Полный день">Полный день</SelectItem>
                    <SelectItem value="Сменный график">Сменный график</SelectItem>
                    <SelectItem value="Гибкий график">Гибкий график</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Найдено вакансий: <span className="font-semibold text-foreground">{filteredVacancies.length}</span>
            </p>
          </div>

          <div className="grid gap-6">
            {filteredVacancies.map((vacancy) => (
              <Card key={vacancy.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{vacancy.position}</CardTitle>
                      <p className="text-lg text-muted-foreground mb-3">{vacancy.salonName}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-sm">
                          <Icon name="MapPin" size={14} className="mr-1" />
                          {vacancy.district}
                        </Badge>
                        <Badge variant="secondary" className="text-sm">
                          <Icon name="Clock" size={14} className="mr-1" />
                          {vacancy.schedule}
                        </Badge>
                        <Badge variant="default" className="text-sm bg-green-600">
                          <Icon name="Wallet" size={14} className="mr-1" />
                          {vacancy.salary}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="FileText" size={18} />
                        Описание
                      </h4>
                      <p className="text-muted-foreground">{vacancy.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="CheckCircle" size={18} />
                        Требования
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {vacancy.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex-1">
                            <Icon name="Send" size={18} className="mr-2" />
                            Откликнуться
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Отклик на вакансию</DialogTitle>
                            <DialogDescription>
                              {vacancy.salonName} — {vacancy.position}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <Label htmlFor="name">Ваше имя</Label>
                              <Input id="name" placeholder="Иван Иванов" />
                            </div>
                            <div>
                              <Label htmlFor="phone">Телефон</Label>
                              <Input id="phone" placeholder="+7 (900) 000-00-00" />
                            </div>
                            <div>
                              <Label htmlFor="message">Сопроводительное письмо</Label>
                              <Textarea 
                                id="message" 
                                placeholder="Расскажите о себе и своём опыте..."
                                rows={4}
                              />
                            </div>
                            <Button className="w-full">
                              Отправить отклик
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="outline" className="flex-1">
                        <Icon name="Phone" size={18} className="mr-2" />
                        {vacancy.contacts}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredVacancies.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Вакансии не найдены</h3>
                  <p className="text-muted-foreground">
                    Попробуйте изменить параметры поиска
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <MasseursFooter />
    </div>
  );
}