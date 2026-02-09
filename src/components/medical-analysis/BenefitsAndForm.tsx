import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const BenefitsAndForm = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

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

    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      toast({
        title: 'Анализ завершён',
        description: 'Результат готов к просмотру',
      });
    }, 3000);
  };

  return (
    <>
      {/* Benefits Section */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Какая польза для массажиста
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <Icon name="Shield" size={32} className="text-blue-600" />
              <h3 className="text-xl font-bold">Безопасность</h3>
            </div>
            <p className="text-muted-foreground">
              Вы не выходите за профессиональные границы — инструмент подсказывает, где нужна осторожность
            </p>
          </Card>

          <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <Icon name="Heart" size={32} className="text-red-600" />
              <h3 className="text-xl font-bold">Спокойствие</h3>
            </div>
            <p className="text-muted-foreground">
              Нет страха перед заключениями — вы понимаете суть и действуете уверенно
            </p>
          </Card>

          <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <Icon name="Users" size={32} className="text-green-600" />
              <h3 className="text-xl font-bold">Доверие клиента</h3>
            </div>
            <p className="text-muted-foreground">
              Клиент видит, что вы вникаете в его ситуацию — это укрепляет контакт и лояльность
            </p>
          </Card>

          <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <Icon name="Clock" size={32} className="text-purple-600" />
              <h3 className="text-xl font-bold">Экономия времени</h3>
            </div>
            <p className="text-muted-foreground">
              Не нужно гуглить термины часами — всё разъясняется быстро и точно
            </p>
          </Card>
        </div>
      </div>

      {/* Demo Form Section */}
      <div className="max-w-3xl mx-auto mb-20">
        <Card className="p-8 md:p-12 bg-gradient-to-br from-blue-50 to-purple-50 border-2">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Попробуйте прямо сейчас
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-3">
                Загрузите заключение врача
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Icon name="Upload" size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-lg mb-2">
                    {file ? file.name : 'Нажмите для выбора файла'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Поддерживаются форматы: JPG, PNG, PDF, DOC
                  </p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3">
                Ваш вопрос
              </label>
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Например: Что означает 'грыжа L5-S1'? Можно ли делать массаж спины?"
                className="min-h-[120px] text-base"
              />
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full py-6 text-lg"
              size="lg"
            >
              {analyzing ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" />
                  Анализируем...
                </>
              ) : (
                <>
                  <Icon name="Sparkles" className="mr-2" />
                  Получить расшифровку
                </>
              )}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Демо-версия для ознакомления. Полный функционал доступен после регистрации.
            </p>
          </div>
        </Card>
      </div>

      {/* Important Note Section */}
      <div className="max-w-4xl mx-auto mb-20">
        <Card className="p-8 md:p-12 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
          <div className="flex items-start gap-4">
            <Icon name="AlertCircle" size={32} className="text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-4">Важно помнить</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="Circle" size={8} className="mt-2 fill-current flex-shrink-0" />
                  <span>Этот инструмент <strong>не заменяет врача</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Circle" size={8} className="mt-2 fill-current flex-shrink-0" />
                  <span>Это <strong>не медицинская консультация</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Circle" size={8} className="mt-2 fill-current flex-shrink-0" />
                  <span>Массажист работает в рамках своих профессиональных компетенций</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Circle" size={8} className="mt-2 fill-current flex-shrink-0" />
                  <span>Инструмент помогает <strong>понять текст</strong>, но решение о работе с клиентом всегда остаётся за специалистом</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto text-center pb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Работайте спокойно, уверенно и безопасно
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Инструмент «Расшифровка заключения» — для тех, кто ценит профессионализм и заботу о клиентах
        </p>
        <Button size="lg" className="px-12 py-6 text-lg">
          <Icon name="Sparkles" className="mr-2" />
          Начать использовать
        </Button>
      </div>
    </>
  );
};

export default BenefitsAndForm;
