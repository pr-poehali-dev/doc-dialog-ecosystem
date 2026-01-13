import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import TypeSelector from './kb/TypeSelector';
import SettingsCard from './kb/SettingsCard';
import FAQList from './kb/FAQList';
import FAQDialog from './kb/FAQDialog';

interface FAQItem {
  id: number;
  target_type: 'masseur' | 'salon' | 'school' | 'user';
  category: string;
  question: string;
  answer: string;
  order_index: number;
  created_at: string;
}

export default function KnowledgeBaseManagement() {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<'masseur' | 'salon' | 'school' | 'user'>('masseur');
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [telegramUrl, setTelegramUrl] = useState('https://t.me/SergeuVodopianov');
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    category: '',
    question: '',
    answer: '',
  });

  useEffect(() => {
    loadFAQ();
    loadSettings();
  }, [selectedType]);

  const loadFAQ = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372?target_type=${selectedType}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setFaqItems(data.items || []);
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить базу знаний',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      const response = await fetch(
        `https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372?action=settings&target_type=${selectedType}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setTelegramUrl(data.telegram_support_url || 'https://t.me/+QgiLIa1gFRY4Y2Iy');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveFAQ = async () => {
    if (!formData.question || !formData.answer || !formData.category) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem 
        ? `https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372?id=${editingItem.id}`
        : 'https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          target_type: selectedType,
          ...formData
        })
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: editingItem ? 'Вопрос обновлён' : 'Вопрос добавлен'
        });
        setShowDialog(false);
        setEditingItem(null);
        setFormData({ category: '', question: '', answer: '' });
        loadFAQ();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить вопрос',
        variant: 'destructive'
      });
    }
  };

  const deleteFAQ = async (id: number) => {
    if (!confirm('Удалить этот вопрос?')) return;

    try {
      const response = await fetch(
        `https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372?id=${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Вопрос удалён'
        });
        loadFAQ();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить вопрос',
        variant: 'destructive'
      });
    }
  };

  const saveSettings = async () => {
    try {
      const response = await fetch(
        'https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372?action=save_settings',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            target_type: selectedType,
            telegram_support_url: telegramUrl
          })
        }
      );

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Настройки сохранены'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить настройки',
        variant: 'destructive'
      });
    }
  };

  const importDefaultFAQ = async () => {
    const defaultFAQ = [
      { category: "Начало работы", question: "Как начать работать в кабинете специалиста?", answer: "После регистрации зайдите в раздел «Публичный профиль» и заполните все обязательные поля: ФИО, город, специализация, опыт работы, фото. Добавьте описание услуг и цены. Чем полнее профиль — тем больше доверия у клиентов." },
      { category: "Начало работы", question: "Что такое публичный профиль и зачем он нужен?", answer: "Публичный профиль — это ваша визитная карточка в каталоге специалистов. Его видят все клиенты платформы. В профиле указываются: ваши услуги, цены, опыт, образование, фото работ. Заполненный профиль увеличивает количество заявок." },
      { category: "Начало работы", question: "Как создать личную страницу для клиентов?", answer: "Перейдите в раздел «Личная страница» → «Создать страницу». В конструкторе добавьте блоки: о себе, услуги, прайс, фото работ, отзывы, контакты. Сохраните и получите уникальную ссылку для отправки клиентам. Страница работает как мини-сайт." },
      { category: "Заказы и записи", question: "Как принимать заказы от клиентов?", answer: "Заказы приходят в раздел «Записи». Вы получаете уведомление о новой записи. Откройте заказ, проверьте детали (дата, время, услуга, комментарий клиента). Подтвердите запись или предложите другое время через сообщения." },
      { category: "Заказы и записи", question: "Что делать, если клиент не пришёл на сеанс?", answer: "Откройте заказ в разделе «Записи» и отметьте статус «Клиент не пришёл». Напишите клиенту сообщение с уточнением причины. Если клиент часто пропускает записи без предупреждения, можете добавить предоплату для будущих записей." },
      { category: "Заказы и записи", question: "Как изменить или отменить запись?", answer: "Зайдите в «Записи», откройте нужный заказ и нажмите «Изменить время» или «Отменить запись». Клиент получит уведомление об изменениях. Если переносите запись, обязательно напишите клиенту причину и предложите альтернативное время." },
      { category: "Коммуникация", question: "Как общаться с клиентами через платформу?", answer: "Все сообщения в разделе «Сообщения». Выберите чат с клиентом и пишите напрямую. Здесь можно уточнить детали записи, отправить рекомендации, напомнить о сеансе. Сообщения приходят в реальном времени." },
      { category: "Коммуникация", question: "Можно ли отправлять клиентам напоминания о записи?", answer: "Да, в разделе «Записи» откройте заказ и нажмите «Отправить напоминание». Клиент получит уведомление за 24 часа или за 3 часа до сеанса (выбирается вручную). Напоминания снижают количество пропущенных записей." },
      { category: "Отзывы и репутация", question: "Как попросить клиента оставить отзыв?", answer: "После завершения сеанса откройте заказ в «Записи» и нажмите «Запросить отзыв». Клиент получит уведомление с просьбой оценить вашу работу. Отзывы повышают рейтинг и доверие новых клиентов." },
      { category: "Отзывы и репутация", question: "Что делать с негативным отзывом?", answer: "Зайдите в «Мои отзывы», найдите отзыв и нажмите «Ответить». Вежливо извинитесь, объясните ситуацию и предложите решение. Адекватный ответ на критику показывает профессионализм. Если отзыв нарушает правила (оскорбления, ложь) — пожалуйтесь модераторам." },
      { category: "Отзывы и репутация", question: "Как повысить рейтинг на платформе?", answer: "Рейтинг растёт от положительных отзывов, заполненности профиля и активности. Просите клиентов оставлять отзывы после каждого сеанса. Обновляйте профиль: добавляйте фото работ, сертификаты, описание новых техник." },
      { category: "Продвижение", question: "Как продвигать свой профиль на платформе?", answer: "В разделе «Продвижение» доступны инструменты: поднятие в топ каталога на 7 дней (500 ₽), выделение цветом (300 ₽/неделя), размещение в рассылке (1000 ₽). Также заполните профиль на 100% и собирайте отзывы — это бесплатно повышает позицию." },
      { category: "Продвижение", question: "Что даёт PRO-подписка для специалистов?", answer: "PRO-подписка (990 ₽/мес) даёт: сниженную комиссию 5% вместо 10%, приоритет в каталоге, отображение бейджа PRO, доступ к аналитике клиентов, возможность создавать промокоды и рассылки." },
      { category: "Верификация", question: "Как пройти верификацию профиля?", answer: "Зайдите в «Верификация» и загрузите документы: паспорт (главная страница + прописка), дипломы/сертификаты об образовании. Модерация занимает 1-3 рабочих дня. Верифицированный профиль получает бейдж и больше доверия клиентов." },
      { category: "Верификация", question: "Зачем загружать сертификаты и дипломы?", answer: "Сертификаты подтверждают ваше образование и квалификацию. Профили с документами получают бейдж «Проверенный специалист» и показываются выше в поиске. Клиенты охотнее записываются к верифицированным мастерам." },
      { category: "Настройки", question: "Как настроить уведомления о новых заказах?", answer: "Зайдите в «Настройки» → «Уведомления». Включите нужные каналы: push-уведомления в браузере, email, Telegram. Выберите типы событий: новые заказы, сообщения, отзывы, напоминания о сеансах." },
      { category: "Настройки", question: "Как изменить график работы в профиле?", answer: "Откройте «Публичный профиль» → «Расписание». Укажите рабочие дни и часы. Можно задать разное время для разных дней недели. Клиенты увидят актуальное расписание и смогут записаться только на доступные слоты." },
      { category: "Клиентская база", question: "Как работать с базой клиентов?", answer: "Раздел «CRM-клиенты» хранит всех ваших клиентов. Для каждого записывайте: контакты, историю сеансов, особенности здоровья, предпочтения. Перед сеансом открывайте карточку клиента, чтобы вспомнить детали." },
      { category: "Клиентская база", question: "Можно ли отправлять клиентам рассылки?", answer: "Да, в разделе «CRM-клиенты» → «Рассылка». Выберите сегмент (все клиенты / давно не были / новые) и отправьте сообщение: акция, новая услуга, поздравление. Доступно только для PRO-подписки." },
      { category: "Обучение", question: "Где найти обучающие материалы по работе с платформой?", answer: "Раздел «Обучение клиентов» содержит статьи, видео и инструкции: как работать с диагнозами, техники массажа, бизнес-советы. Материалы обновляются еженедельно. Также доступны вебинары от опытных специалистов." },
      { category: "Обучение", question: "Как участвовать в вебинарах и мероприятиях?", answer: "В разделе «Сообщество» публикуются анонсы вебинаров, встреч специалистов, конференций. Зарегистрируйтесь на событие и получите ссылку на подключение. Участие бесплатное для всех специалистов платформы." },
      { category: "Техподдержка", question: "Как связаться с поддержкой платформы?", answer: "Нажмите на иконку чата в правом нижнем углу или зайдите в «Сообщения» → «Поддержка». Опишите проблему или вопрос. Среднее время ответа — 1-2 часа в рабочее время (пн-пт, 9:00-21:00 МСК)." },
      { category: "Техподдержка", question: "Что делать, если заказ не отображается в кабинете?", answer: "Обновите страницу (F5) и проверьте раздел «Записи» ещё раз. Если заказ не появился — напишите в поддержку с указанием: имя клиента, дата записи, услуга. Техподдержка восстановит заказ в течение 1 часа." },
      { category: "Безопасность", question: "Как защищены мои данные на платформе?", answer: "Все данные хранятся на защищённых серверах с SSL-шифрованием. Доступ к личной информации имеете только вы и модераторы (при проверке документов). Платёжные данные обрабатываются через PCI DSS сертифицированные сервисы." },
      { category: "Безопасность", question: "Можно ли скрыть свой номер телефона от клиентов?", answer: "Да, в настройках профиля включите опцию «Связь только через платформу». Клиенты смогут писать вам только в чате на сайте, номер телефона не отображается. Это защищает от спама и неадекватных клиентов." }
    ];

    try {
      toast({
        title: 'Импорт начат',
        description: `Добавляю ${defaultFAQ.length} вопросов...`
      });

      let successCount = 0;
      for (const item of defaultFAQ) {
        const response = await fetch('https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            target_type: 'masseur',
            ...item
          })
        });

        if (response.ok) successCount++;
      }

      toast({
        title: 'Импорт завершён',
        description: `Добавлено ${successCount} из ${defaultFAQ.length} вопросов`
      });
      
      loadFAQ();
    } catch (error) {
      toast({
        title: 'Ошибка импорта',
        description: 'Не удалось импортировать вопросы',
        variant: 'destructive'
      });
    }
  };

  const categories = Array.from(new Set(faqItems.map(item => item.category)));
  
  const faqCounts = {
    masseur: faqItems.filter(i => i.target_type === 'masseur').length,
    salon: faqItems.filter(i => i.target_type === 'salon').length,
    school: faqItems.filter(i => i.target_type === 'school').length,
    user: faqItems.filter(i => i.target_type === 'user').length,
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({ category: '', question: '', answer: '' });
    setShowDialog(true);
  };

  const handleEdit = (item: FAQItem) => {
    setEditingItem(item);
    setFormData({
      category: item.category,
      question: item.question,
      answer: item.answer
    });
    setShowDialog(true);
  };

  return (
    <div className="space-y-6">
      <TypeSelector
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        faqCounts={faqCounts}
      />

      <SettingsCard
        selectedType={selectedType}
        telegramUrl={telegramUrl}
        onTelegramUrlChange={setTelegramUrl}
        onSave={saveSettings}
      />

      <FAQList
        selectedType={selectedType}
        faqItems={faqItems}
        loading={loading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddNew={handleAddNew}
        onEdit={handleEdit}
        onDelete={deleteFAQ}
        onImportDefault={importDefaultFAQ}
      />

      <FAQDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        editingItem={editingItem}
        selectedType={selectedType}
        formData={formData}
        onFormChange={setFormData}
        categories={categories}
        onSave={saveFAQ}
      />
    </div>
  );
}