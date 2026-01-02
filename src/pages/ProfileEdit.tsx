import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    city: "",
    experience_years: "",
    about: "",
    education: "",
    languages: [] as string[],
    specializations: [] as string[],
    certificates: [] as string[]
  });

  const [newSpecialization, setNewSpecialization] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newCertificate, setNewCertificate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const mockProfile = {
      full_name: "Иван Иванов",
      phone: "+7 (999) 123-45-67",
      city: "Москва",
      experience_years: "5",
      about: "Профессиональный массажист с медицинским образованием",
      education: "Медицинский университет",
      languages: ["Русский", "Английский"],
      specializations: ["Классический массаж", "Спортивный массаж"],
      certificates: ["Сертификат массажиста"]
    };

    setFormData(mockProfile);
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast({
        title: "Профиль сохранен!",
        description: "Все изменения успешно применены",
      });
      setLoading(false);
    }, 1000);
  };

  const addSpecialization = () => {
    if (newSpecialization.trim()) {
      setFormData({
        ...formData,
        specializations: [...formData.specializations, newSpecialization.trim()]
      });
      setNewSpecialization("");
    }
  };

  const removeSpecialization = (index: number) => {
    setFormData({
      ...formData,
      specializations: formData.specializations.filter((_, i) => i !== index)
    });
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setFormData({
        ...formData,
        languages: [...formData.languages, newLanguage.trim()]
      });
      setNewLanguage("");
    }
  };

  const removeLanguage = (index: number) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((_, i) => i !== index)
    });
  };

  const addCertificate = () => {
    if (newCertificate.trim()) {
      setFormData({
        ...formData,
        certificates: [...formData.certificates, newCertificate.trim()]
      });
      setNewCertificate("");
    }
  };

  const removeCertificate = (index: number) => {
    setFormData({
      ...formData,
      certificates: formData.certificates.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
            <div>
              <h1 className="text-4xl font-bold">Редактирование Профиля</h1>
              <p className="text-muted-foreground mt-2">Заполните информацию о себе</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
                <CardDescription>Эти данные будут видны в каталоге массажистов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">ФИО *</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Город *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Москва"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience_years">Опыт работы (лет) *</Label>
                    <Input
                      id="experience_years"
                      type="number"
                      value={formData.experience_years}
                      onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                      placeholder="5"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about">О себе *</Label>
                  <Textarea
                    id="about"
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    placeholder="Расскажите о себе, своем опыте и подходе к работе..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Образование</Label>
                  <Input
                    id="education"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    placeholder="РНИМУ им. Пирогова, факультет медицинской реабилитации"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Специализации</CardTitle>
                <CardDescription>Добавьте виды массажа, которые вы практикуете</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newSpecialization}
                    onChange={(e) => setNewSpecialization(e.target.value)}
                    placeholder="Например: Классический массаж"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialization())}
                  />
                  <Button type="button" onClick={addSpecialization}>
                    <Icon name="Plus" size={20} />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
                      {spec}
                      <button
                        type="button"
                        onClick={() => removeSpecialization(index)}
                        className="ml-2 hover:text-destructive"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Языки</CardTitle>
                <CardDescription>На каких языках вы можете общаться с клиентами</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Например: Английский"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                  />
                  <Button type="button" onClick={addLanguage}>
                    <Icon name="Plus" size={20} />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.languages.map((lang, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
                      {lang}
                      <button
                        type="button"
                        onClick={() => removeLanguage(index)}
                        className="ml-2 hover:text-destructive"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Сертификаты и дипломы</CardTitle>
                <CardDescription>Добавьте информацию о ваших сертификатах</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newCertificate}
                    onChange={(e) => setNewCertificate(e.target.value)}
                    placeholder="Например: Сертификат массажиста международного образца"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertificate())}
                  />
                  <Button type="button" onClick={addCertificate}>
                    <Icon name="Plus" size={20} />
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.certificates.map((cert, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border bg-secondary/50">
                      <Icon name="Award" size={20} className="text-primary" />
                      <span className="flex-1">{cert}</span>
                      <button
                        type="button"
                        onClick={() => removeCertificate(index)}
                        className="hover:text-destructive"
                      >
                        <Icon name="Trash2" size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="submit" size="lg" disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  <>
                    <Icon name="Save" size={20} className="mr-2" />
                    Сохранить изменения
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => navigate('/dashboard')}>
                Отмена
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}