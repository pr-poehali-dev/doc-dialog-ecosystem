import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ProblemSections = () => {
  return (
    <>
      {/* Problem Section */}
      <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 shadow-xl rounded-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center text-slate-900">
            Знакомая ситуация?
          </h2>
          <p className="text-lg mb-6">К вам приходит клиент и говорит:</p>
          <div className="relative mb-12">
            <img 
              src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/a0373892-a890-4c6b-a442-9da6d18d2715.jpg" 
              alt="Клиент с медицинским заключением" 
              className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg mb-6"
            />
          </div>
          <blockquote className="border-l-4 border-blue-500 pl-6 py-4 mb-8 bg-blue-100/50 rounded-r-xl shadow-sm">
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
      </div>
      </section>

      {/* Real Problem Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="p-8 md:p-12 lg:p-16 bg-white border-2 border-red-200 shadow-2xl rounded-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center text-slate-900">
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
      </div>
      </section>
    </>
  );
};

export default ProblemSections;