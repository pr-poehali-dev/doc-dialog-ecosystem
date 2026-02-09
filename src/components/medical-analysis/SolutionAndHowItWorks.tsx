import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const SolutionAndHowItWorks = () => {
  return (
    <>
      {/* Solution Section */}
      <div className="max-w-4xl mx-auto mb-20">
        <Card className="p-8 md:p-12 bg-gradient-to-br from-green-50 to-emerald-50 border-2">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Решение — инструмент «Расшифровка заключения» в Док диалог
          </h2>
          <p className="text-lg mb-6">
            Мы создали инструмент, который помогает массажисту <strong>спокойно разобраться в тексте заключения</strong>, не нарушая границ профессии.
          </p>
          <div className="bg-white p-6 rounded-lg border-2 mb-6">
            <p className="text-lg mb-4">
              Это <strong>не медицинская консультация</strong><br />
              и <strong>не постановка диагнозов</strong>.
            </p>
            <p className="text-lg">
              Это — перевод сложного текста<br />
              на <strong>понятный, нейтральный и практичный язык</strong>.
            </p>
          </div>
        </Card>
      </div>

      {/* How It Works Section */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Как работает инструмент
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
              <Icon name="Upload" size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">1. Загружаете заключение</h3>
            <p className="text-center text-muted-foreground">
              Фото или файл — в любом формате. Система распознаёт текст автоматически.
            </p>
          </Card>

          <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
              <Icon name="MessageSquare" size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">2. Указываете запрос</h3>
            <p className="text-center text-muted-foreground">
              Например: «Что значит "дорсопатия"?» или «Какие есть ограничения для массажа?»
            </p>
          </Card>

          <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6 mx-auto">
              <Icon name="Sparkles" size={32} className="text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">3. Получаете ответ</h3>
            <p className="text-center text-muted-foreground">
              Простое объяснение на вашем языке — с учётом границ профессии массажиста.
            </p>
          </Card>
        </div>
      </div>

      {/* What's Included Section */}
      <div className="max-w-4xl mx-auto mb-20">
        <Card className="p-8 md:p-12 bg-white border-2">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Что входит в расшифровку
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <Icon name="CheckCircle2" size={24} className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-semibold mb-1">Расшифровка терминов</p>
                <p className="text-muted-foreground">Понятное объяснение слов из заключения — без медицинского сленга</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Icon name="CheckCircle2" size={24} className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-semibold mb-1">Практический смысл</p>
                <p className="text-muted-foreground">Что это значит для работы массажиста — с учётом профессиональных границ</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Icon name="CheckCircle2" size={24} className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-semibold mb-1">Рекомендации для разговора с клиентом</p>
                <p className="text-muted-foreground">Как обсудить запрос спокойно и корректно</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Icon name="CheckCircle2" size={24} className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-semibold mb-1">Указания на ограничения</p>
                <p className="text-muted-foreground">Когда стоит направить клиента к врачу или действовать с особой осторожностью</p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
};

export default SolutionAndHowItWorks;
