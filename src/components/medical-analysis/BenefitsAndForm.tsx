import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const BenefitsAndForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [demoUsed, setDemoUsed] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    const used = localStorage.getItem('demo_medical_analysis_used');
    setDemoUsed(used === 'true');
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file || !question.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Загрузите заключение и укажите вопрос',
        variant: 'destructive',
      });
      return;
    }

    // Проверка: если демо уже использовано и пользователь не авторизован
    const token = localStorage.getItem('token');
    if (demoUsed && !token) {
      setShowAuthPrompt(true);
      return;
    }

    setAnalyzing(true);

    try {
      // Конвертируем файл в base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const base64 = reader.result as string;
          
          // Вызываем API
          const response = await fetch('https://functions.poehali.dev/f392e088-3274-4326-8906-2c23f7045160', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-User-Id': token ? localStorage.getItem('user') || 'demo' : 'demo'
            },
            body: JSON.stringify({
              action: 'analyze_tool',
              tool: 'medical_conclusion',
              text: question,
              image: base64,
              fileName: file.name
            })
          });

          const data = await response.json();

          if (response.ok && data.result) {
            setResult(data.result);
            setShowResult(true);
            
            // Отмечаем, что демо использовано (только для неавторизованных)
            if (!token) {
              localStorage.setItem('demo_medical_analysis_used', 'true');
              setDemoUsed(true);
            }

            toast({
              title: 'Анализ завершён',
              description: 'Результат готов к просмотру',
            });
          } else {
            throw new Error(data.error || 'Ошибка анализа');
          }
        } catch (error) {
          console.error('Analysis error:', error);
          toast({
            title: 'Ошибка',
            description: error instanceof Error ? error.message : 'Не удалось выполнить анализ',
            variant: 'destructive',
          });
        } finally {
          setAnalyzing(false);
        }
      };

      reader.onerror = () => {
        setAnalyzing(false);
        toast({
          title: 'Ошибка',
          description: 'Не удалось прочитать файл',
          variant: 'destructive',
        });
      };
    } catch (error) {
      setAnalyzing(false);
      toast({
        title: 'Ошибка',
        description: 'Не удалось выполнить анализ',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-slate-900">
              Какая польза для массажиста
            </h2>
            <p className="text-xl text-center text-slate-600 mb-16 max-w-3xl mx-auto">
              Работайте уверенно и профессионально
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <Card className="p-6 lg:p-8 bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl border-2 border-blue-100">
                <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-blue-100 rounded-full mb-6 mx-auto">
                  <Icon name="Shield" size={36} className="text-blue-600" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-4 text-center text-slate-900">Безопасность</h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  Вы не выходите за профессиональные границы — инструмент подсказывает, где нужна осторожность
                </p>
              </Card>

              <Card className="p-6 lg:p-8 bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl border-2 border-red-100">
                <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-red-100 rounded-full mb-6 mx-auto">
                  <Icon name="Heart" size={36} className="text-red-600" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-4 text-center text-slate-900">Спокойствие</h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  Нет страха перед заключениями — вы понимаете суть и действуете уверенно
                </p>
              </Card>

              <Card className="p-6 lg:p-8 bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl border-2 border-green-100">
                <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-green-100 rounded-full mb-6 mx-auto">
                  <Icon name="Users" size={36} className="text-green-600" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-4 text-center text-slate-900">Доверие клиента</h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  Клиент видит, что вы вникаете в его ситуацию — это укрепляет контакт и лояльность
                </p>
              </Card>

              <Card className="p-6 lg:p-8 bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl border-2 border-purple-100">
                <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-purple-100 rounded-full mb-6 mx-auto">
                  <Icon name="Clock" size={36} className="text-purple-600" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-4 text-center text-slate-900">Экономия времени</h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  Не нужно гуглить термины часами — всё разъясняется быстро и точно
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Form Section */}
      <section id="demo-form" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-20">
            <Card className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-purple-200 shadow-2xl rounded-2xl">
              <div className="text-center mb-12">
                <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
                  🎁 БЕСПЛАТНАЯ ДЕМО-ВЕРСИЯ
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
                  Попробуйте прямо сейчас
                </h2>
                <p className="text-xl text-slate-600">
                  Загрузите заключение и получите расшифровку за 2 минуты
                </p>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="block text-xl font-bold mb-4 text-slate-900">
                    Загрузите заключение врача
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-purple-500 hover:bg-purple-50/30 transition-all cursor-pointer">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*,.pdf,.doc,.docx"
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mx-auto mb-6">
                        <Icon name="Upload" size={48} className="text-purple-600" />
                      </div>
                      <p className="text-xl mb-3 font-semibold text-slate-900">
                        {file ? `✓ ${file.name}` : 'Нажмите для выбора файла'}
                      </p>
                      <p className="text-base text-slate-600">
                        Поддерживаются форматы: JPG, PNG, PDF, DOC, DOCX
                      </p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xl font-bold mb-4 text-slate-900">
                    Ваш вопрос
                  </label>
                  <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Например: Что означает 'грыжа L5-S1'? Можно ли делать массаж спины?"
                    className="min-h-[140px] text-lg border-2 border-slate-200 focus:border-purple-500 rounded-xl p-4"
                  />
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full py-8 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all rounded-xl"
                  size="lg"
                >
                  {analyzing ? (
                    <>
                      <Icon name="Loader2" className="mr-3 animate-spin" size={28} />
                      Анализируем...
                    </>
                  ) : (
                    <>
                      <Icon name="Sparkles" className="mr-3" size={28} />
                      Получить расшифровку бесплатно
                    </>
                  )}
                </Button>

                <p className="text-center text-slate-500 text-sm">
                  Демо-версия для ознакомления. Полный функционал доступен после регистрации.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Section with Trust */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/0218aa96-466d-49ab-9928-f5e78c7e8ee1.jpg" 
                  alt="Консультация специалиста с клиентом" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
                  Доверие через понимание
                </h2>
                <p className="text-xl text-slate-700 mb-8 leading-relaxed">
                  Когда вы уверенно объясняете клиенту его ситуацию простыми словами, это создаёт атмосферу доверия и профессионализма.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                    <Icon name="CheckCircle2" size={28} className="text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-lg text-slate-700">Клиенты возвращаются снова</p>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                    <Icon name="CheckCircle2" size={28} className="text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-lg text-slate-700">Рекомендуют вас знакомым</p>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                    <Icon name="CheckCircle2" size={28} className="text-purple-600 flex-shrink-0 mt-1" />
                    <p className="text-lg text-slate-700">Ценят ваш профессионализм</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Note Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto mb-20">
            <Card className="p-8 md:p-12 lg:p-16 bg-white border-2 border-yellow-300 shadow-2xl rounded-2xl">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Icon name="AlertCircle" size={40} className="text-yellow-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-slate-900">Важно помнить</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                      <Icon name="Circle" size={12} className="mt-2 fill-current flex-shrink-0 text-yellow-600" />
                      <span className="text-lg text-slate-800">Этот инструмент <strong>не заменяет врача</strong></span>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                      <Icon name="Circle" size={12} className="mt-2 fill-current flex-shrink-0 text-yellow-600" />
                      <span className="text-lg text-slate-800">Это <strong>не медицинская консультация</strong></span>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                      <Icon name="Circle" size={12} className="mt-2 fill-current flex-shrink-0 text-yellow-600" />
                      <span className="text-lg text-slate-800">Массажист работает в рамках своих профессиональных компетенций</span>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                      <Icon name="Circle" size={12} className="mt-2 fill-current flex-shrink-0 text-yellow-600" />
                      <span className="text-lg text-slate-800">Инструмент помогает <strong>понять текст</strong>, но решение о работе с клиентом всегда остаётся за специалистом</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Работайте спокойно, уверенно и безопасно
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
              Инструмент «Расшифровка заключения» — для тех, кто ценит профессионализм и заботу о клиентах
            </p>
            <Button 
              size="lg" 
              onClick={() => document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className="px-12 py-8 text-xl font-bold bg-white text-purple-600 hover:bg-slate-100 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all rounded-xl"
            >
              <Icon name="Sparkles" className="mr-3" size={28} />
              Начать использовать бесплатно
            </Button>
            <p className="text-white/80 mt-6">
              Присоединяйтесь к 1000+ специалистов, которые уже используют инструмент
            </p>
          </div>
        </div>
      </section>

      {/* Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Результат анализа</DialogTitle>
            <DialogDescription>
              Расшифровка медицинского заключения
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <div className="prose prose-slate max-w-none">
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                {result}
              </div>
            </div>
            {demoUsed && !localStorage.getItem('token') && (
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Icon name="Info" size={28} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      Хотите продолжить использовать инструмент?
                    </h4>
                    <p className="text-slate-700 mb-4">
                      Зарегистрируйтесь и получите доступ ко всем функциям без ограничений
                    </p>
                    <Button
                      onClick={() => navigate('/register')}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Icon name="UserPlus" className="mr-2" size={20} />
                      Зарегистрироваться
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Auth Prompt Dialog */}
      <Dialog open={showAuthPrompt} onOpenChange={setShowAuthPrompt}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Требуется регистрация</DialogTitle>
            <DialogDescription>
              Демо-версия уже использована
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0">
                  <Icon name="Lock" size={32} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Вы уже использовали бесплатную демо-версию
                  </h4>
                </div>
              </div>
              <p className="text-slate-700 mb-4">
                Зарегистрируйтесь для расширенного анализа — вы получите подробную расшифровку, рекомендации по работе и указания на ограничения
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => navigate('/register')}
                className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Icon name="UserPlus" className="mr-2" size={24} />
                Зарегистрироваться
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="w-full py-6 text-lg font-bold"
              >
                <Icon name="LogIn" className="mr-2" size={24} />
                Уже есть аккаунт? Войти
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BenefitsAndForm;