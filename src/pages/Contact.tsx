import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    privacyAccepted: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacyAccepted) {
      toast({
        title: "Ошибка",
        description: "Необходимо принять политику конфиденциальности",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/1bace701-7baa-409d-8546-e2c8dcecd8ce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: "Успешно!",
          description: "Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          privacyAccepted: false
        });
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 pt-[100px] pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Обратная связь
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Заполните форму, и мы свяжемся с вами в ближайшее время
          </p>

          <Card className="border-2 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Сообщение *</Label>
                  <Textarea
                    id="message"
                    placeholder="Напишите ваше сообщение..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="mt-2"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacyAccepted}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, privacyAccepted: checked === true })
                    }
                  />
                  <label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
                    Я принимаю{" "}
                    <a 
                      href="/privacy" 
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      политику конфиденциальности
                    </a>
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Отправить"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;