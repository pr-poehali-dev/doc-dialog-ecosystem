import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const MedicalAnalysisLanding = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Расшифровка заключения врача
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Инструмент для массажистов и телесных специалистов
          </p>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
            Поймите запрос клиента спокойно, понятно и безопасно — без догадок и медицинских рисков.
          </p>
        </div>

        {/* Problem Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <Card className="p-8 md:p-12 bg-white border-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Знакомая ситуация?
            </h2>
            <p className="text-lg mb-6">К вам приходит клиент и говорит:</p>
            <blockquote className="border-l-4 border-blue-500 pl-6 py-4 mb-8 bg-blue-50 rounded-r-lg">
              <p className="text-xl italic">«Вот заключение врача, посмотрите, пожалуйста…»</p>
            </blockquote>
            <p className="text-lg mb-6">Вы открываете фото или файл — и видите:</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span className="text-lg">плотный текст</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span className="text-lg">сложные формулировки</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span className="text-lg">медицинские термины</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span className="text-lg">диагнозы, которые вы <strong>не имеете права трактовать</strong></span>
              </li>
            </ul>
            <p className="text-lg mb-6">И в этот момент внутри:</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span className="text-lg">сомнение</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span className="text-lg">напряжение</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span className="text-lg">страх сказать что-то не так</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span className="text-lg">неуверенность, какой формат массажа предложить</span>
              </li>
            </ul>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <p className="text-lg">
                ❗️Хотя клиенту от вас нужно не лечение,<br />
                а <strong>понимание, спокойствие и грамотный подход</strong>.
              </p>
            </div>
          </Card>
        </div>

        {/* Real Problem Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-red-50 to-orange-50 border-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              В чём реальная сложность для массажиста
            </h2>
            <p className="text-lg mb-6">Проблема не в том, что у вас «не хватает знаний».</p>
            <p className="text-lg mb-6">Проблема в том, что:</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span className="text-lg">заключения пишутся <strong>не для массажистов</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span className="text-lg">медицинский язык не предназначен для диалога с клиентом</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span className="text-lg">любая неточная формулировка может создать риск</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span className="text-lg">разбираться в одиночку — долго и тревожно</span>
              </li>
            </ul>
            <p className="text-lg mb-6">В итоге:</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span className="text-lg">кто-то игнорирует заключение</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span className="text-lg">кто-то боится брать клиента</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span className="text-lg">кто-то действует наугад</span>
              </li>
            </ul>
            <p className="text-lg font-semibold">И всё это — <strong>лишний стресс</strong>, которого можно избежать.</p>
          </Card>
        </div>

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
          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <Card className="p-8 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <h3 className="text-2xl font-bold">Шаг 1</h3>
              </div>
              <p className="text-lg mb-4">Загрузите <strong>фото или файл с текстом заключения</strong></p>
              <p className="text-md text-muted-foreground mb-3">📄 Подходит:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 mt-1" />
                  <span>фото с телефона</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 mt-1" />
                  <span>скан</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 mt-1" />
                  <span>PDF</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 mt-1" />
                  <span>текстовый файл</span>
                </li>
              </ul>
            </Card>

            {/* Step 2 */}
            <Card className="p-8 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold">Шаг 2</h3>
              </div>
              <p className="text-lg mb-4">Укажите, <strong>что именно вас интересует</strong></p>
              <p className="text-md text-muted-foreground mb-3">Например:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>какой формат массажа может подойти</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>на что стоит обратить внимание в работе</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>какие зоны требуют осторожности</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>есть ли ограничения для телесной практики</span>
                </li>
              </ul>
            </Card>

            {/* Step 3 */}
            <Card className="p-8 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <h3 className="text-2xl font-bold">Шаг 3</h3>
              </div>
              <p className="text-lg mb-4">Нажмите кнопку <strong>«Анализ»</strong></p>
              <p className="text-md text-muted-foreground mb-3">Через короткое время вы получите:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 mt-1" />
                  <span>структурированную информацию</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 mt-1" />
                  <span>без медицинских обещаний</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 mt-1" />
                  <span>без интерпретации диагнозов</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 mt-1" />
                  <span>в понятной логике для специалиста по телу</span>
                </li>
              </ul>
            </Card>

            {/* Step 4 */}
            <Card className="p-8 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <h3 className="text-2xl font-bold">Шаг 4</h3>
              </div>
              <p className="text-lg mb-4">Скопируйте и сохраните результат</p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-md mb-3">📌 Важно:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon name="Circle" size={6} className="mt-1.5 fill-current" />
                    <span>Док диалог <strong>не сохраняет</strong> заключение и результат анализа</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Circle" size={6} className="mt-1.5 fill-current" />
                    <span>информация <strong>не попадает в базу данных</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Circle" size={6} className="mt-1.5 fill-current" />
                    <span>вы можете скопировать текст и сохранить его <strong>в свою записную</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Circle" size={6} className="mt-1.5 fill-current" />
                    <span>данные используются <strong>только в момент анализа</strong></span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>

        {/* Safety Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-purple-50 to-pink-50 border-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Почему это безопасно
            </h2>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Lock" size={32} className="text-purple-600" />
                  <h3 className="text-2xl font-bold">Конфиденциальность</h3>
                </div>
                <ul className="space-y-2 ml-11">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-green-500 mt-1" />
                    <span className="text-lg">файлы не хранятся</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-green-500 mt-1" />
                    <span className="text-lg">данные не архивируются</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-green-500 mt-1" />
                    <span className="text-lg">информация не передаётся третьим лицам</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Scale" size={32} className="text-purple-600" />
                  <h3 className="text-2xl font-bold">Профессиональные границы</h3>
                </div>
                <ul className="space-y-2 ml-11">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-green-500 mt-1" />
                    <span className="text-lg">инструмент не лечит</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-green-500 mt-1" />
                    <span className="text-lg">не даёт медицинских назначений</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-green-500 mt-1" />
                    <span className="text-lg">не заменяет врача</span>
                  </li>
                </ul>
                <p className="text-lg mt-4 ml-11">Он помогает <strong>понять контекст</strong> и выстроить корректную работу.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Польза для массажиста
          </h2>
          <div className="space-y-6">
            <Card className="p-6 md:p-8 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <Icon name="CheckCircle" size={32} className="text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-3">Уверенность</h3>
                  <p className="text-lg">
                    Вы понимаете, с чем пришёл клиент,<br />
                    и не действуете вслепую.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <Icon name="CheckCircle" size={32} className="text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-3">Спокойный диалог</h3>
                  <p className="text-lg mb-3">Легче объяснить:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="Circle" size={8} className="mt-2 fill-current" />
                      <span>что вы можете предложить</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Circle" size={8} className="mt-2 fill-current" />
                      <span>как будет проходить работа</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Circle" size={8} className="mt-2 fill-current" />
                      <span>где находятся границы массажа</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <Icon name="CheckCircle" size={32} className="text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-3">Помощь в выборе формата</h3>
                  <p className="text-lg mb-3">Инструмент помогает:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="Circle" size={8} className="mt-2 fill-current" />
                      <span>определить, где лучше мягкий подход</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Circle" size={8} className="mt-2 fill-current" />
                      <span>какие зоны не стоит перегружать</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Circle" size={8} className="mt-2 fill-current" />
                      <span>как выстроить работу аккуратно</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <Icon name="CheckCircle" size={32} className="text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-3">Экономия времени</h3>
                  <p className="text-lg mb-3">Не нужно:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="Circle" size={8} className="mt-2 fill-current" />
                      <span>гуглить термины</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Circle" size={8} className="mt-2 fill-current" />
                      <span>гадать</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Circle" size={8} className="mt-2 fill-current" />
                      <span>перечитывать текст по несколько раз</span>
                    </li>
                  </ul>
                  <p className="text-lg mt-4">Всё — по делу и структурировано.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <Icon name="CheckCircle" size={32} className="text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-3">Профессиональный уровень</h3>
                  <p className="text-lg mb-3">Клиент чувствует:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="Circle" size={8} className="mt-2 fill-current" />
                      <span>внимание</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Circle" size={8} className="mt-2 fill-current" />
                      <span>аккуратность</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Circle" size={8} className="mt-2 fill-current" />
                      <span>ответственность</span>
                    </li>
                  </ul>
                  <p className="text-lg mt-4">Это напрямую повышает <strong>доверие</strong>.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Target Audience Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-blue-50 to-cyan-50 border-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Для кого этот инструмент
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <Icon name="Check" size={24} className="text-green-500 flex-shrink-0" />
                <span className="text-lg">для массажистов</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <Icon name="Check" size={24} className="text-green-500 flex-shrink-0" />
                <span className="text-lg">для телесных практиков</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <Icon name="Check" size={24} className="text-green-500 flex-shrink-0" />
                <span className="text-lg">для специалистов без медицинской лицензии</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <Icon name="Check" size={24} className="text-green-500 flex-shrink-0" />
                <span className="text-lg">для тех, кто работает с новыми клиентами</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg sm:col-span-2">
                <Icon name="Check" size={24} className="text-green-500 flex-shrink-0" />
                <span className="text-lg">для тех, кто хочет практиковать спокойно и осознанно</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Why Free Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-amber-50 to-yellow-50 border-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Почему бесплатно
            </h2>
            <p className="text-lg mb-6">Мы хотим, чтобы массажисты:</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Icon name="Heart" size={24} className="text-red-500 flex-shrink-0 mt-1" />
                <span className="text-lg">не боялись сложных ситуаций</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Heart" size={24} className="text-red-500 flex-shrink-0 mt-1" />
                <span className="text-lg">чувствовали опору</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Heart" size={24} className="text-red-500 flex-shrink-0 mt-1" />
                <span className="text-lg">понимали ценность инструментов Док диалог</span>
              </li>
            </ul>
            <p className="text-lg">
              Этот инструмент — часть экосистемы,<br />
              которая создаётся <strong>для поддержки специалиста</strong>, а не для давления.
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Попробовать бесплатно
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Icon name="ArrowRight" size={24} className="flex-shrink-0" />
                <span className="text-lg">Загрузите заключение</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="ArrowRight" size={24} className="flex-shrink-0" />
                <span className="text-lg">Укажите ваши вопросы</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="ArrowRight" size={24} className="flex-shrink-0" />
                <span className="text-lg">Получите понятную информацию</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="ArrowRight" size={24} className="flex-shrink-0" />
                <span className="text-lg">Работайте спокойнее и увереннее</span>
              </div>
            </div>

            {/* Demo Form */}
            <div className="bg-white rounded-lg p-6 md:p-8 text-foreground">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Загрузите заключение врача
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Icon name="Upload" size={40} className="mx-auto mb-3 text-gray-400" />
                      {file ? (
                        <p className="text-sm font-medium">{file.name}</p>
                      ) : (
                        <>
                          <p className="text-sm font-medium mb-1">Нажмите для загрузки</p>
                          <p className="text-xs text-muted-foreground">
                            Фото, PDF, DOC, TXT до 10MB
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="question" className="block text-sm font-medium mb-2">
                    Что вас интересует?
                  </label>
                  <Textarea
                    id="question"
                    placeholder="Например: какой формат массажа подойдёт? На какие зоны обратить внимание?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={4}
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={analyzing || !file || !question.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
                  size="lg"
                >
                  {analyzing ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Анализирую...
                    </>
                  ) : (
                    <>
                      <Icon name="Search" size={20} className="mr-2" />
                      Начать анализ бесплатно
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Данные не сохраняются. Конфиденциальность гарантируется.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            Часть экосистемы <strong>Док диалог</strong> — инструменты для массажистов
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mx-auto"
          >
            Узнать больше о платформе
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MedicalAnalysisLanding;
