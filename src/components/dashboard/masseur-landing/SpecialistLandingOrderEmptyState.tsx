import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Props {
  onCreateClick: () => void;
}

export default function SpecialistLandingOrderEmptyState({ onCreateClick }: Props) {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl p-8 md:p-12 text-center border border-primary/20">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
        <Icon name="Layout" className="text-primary" size={40} />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold mb-3">Создадим лендинг для вас</h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-lg">
        Получите профессиональный лендинг для привлечения клиентов
      </p>

      <div className="bg-white rounded-lg p-6 mb-8 max-w-2xl mx-auto border border-gray-200">
        <h3 className="font-semibold text-lg mb-4 flex items-center justify-center gap-2">
          <Icon name="Sparkles" className="text-primary" size={20} />
          Преимущества лендинга
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-left">
          <div className="flex gap-3">
            <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-medium">Быстрее в поиске</p>
              <p className="text-sm text-gray-600">Лендинг на нашем домене быстрее попадает в выдачу Google и Яндекс</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-medium">Год хостинга бесплатно</p>
              <p className="text-sm text-gray-600">Никаких дополнительных платежей за размещение</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-medium">Клиенты из поиска</p>
              <p className="text-sm text-gray-600">Потенциальные клиенты найдут вас в интернете</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-medium">Доступная цена</p>
              <p className="text-sm text-gray-600">Всего <span className="text-primary font-semibold">5 000 ₽</span> за создание</p>
            </div>
          </div>
        </div>
      </div>

      <Button 
        onClick={onCreateClick} 
        size="lg"
        className="text-lg px-8"
      >
        <Icon name="Plus" className="mr-2" size={20} />
        Заказать лендинг
      </Button>
    </div>
  );
}
