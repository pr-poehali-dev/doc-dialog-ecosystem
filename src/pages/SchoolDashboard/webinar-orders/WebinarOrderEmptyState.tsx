import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface WebinarOrderEmptyStateProps {
  onCreateClick: () => void;
}

export default function WebinarOrderEmptyState({ onCreateClick }: WebinarOrderEmptyStateProps) {
  return (
    <Card className="p-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Video" size={32} className="text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">Разместите свой первый автовебинар</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Размещая автовебинар на нашей платформе, ваши посетители думают, что вы проводите вебинар онлайн в реальном времени. 
          Настраиваются боты для имитации вопросов и ответов, клиенты видят кнопки офферов на ваши продукты в нужный момент и могут 
          приобретать курсы без вашего присутствия. Вы можете настроить расписание трансляций, а запись автоматически отправляется клиенту.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-lg mb-1">5 000 ₽</p>
            <p className="text-sm text-gray-600">Настройка и размещение</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg">
            <p className="font-semibold text-lg mb-1">5 000 ₽/мес</p>
            <p className="text-sm text-gray-600">4 трансляции</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-lg">
            <p className="font-semibold text-lg mb-1">8 000 ₽/мес</p>
            <p className="text-sm text-gray-600">8 трансляций</p>
          </div>
        </div>
        <Button size="lg" onClick={onCreateClick}>
          <Icon name="Plus" size={20} className="mr-2" />
          Заполнить заявку
        </Button>
      </div>
    </Card>
  );
}
