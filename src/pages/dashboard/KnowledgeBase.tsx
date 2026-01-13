import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  target_type: string;
  order_index: number;
}

interface SupportSettings {
  telegram_support_url: string;
}

const defaultFaqData: FAQItem[] = [
  {
    id: 1,
    category: "Начало работы",
    question: "Как начать работать в кабинете специалиста?",
    answer: "После регистрации зайдите в раздел «Публичный профиль» и заполните все обязательные поля: ФИО, город, специализация, опыт работы, фото. Добавьте описание услуг и цены. Чем полнее профиль — тем больше доверия у клиентов."
  },
  {
    id: 2,
    category: "Начало работы",
    question: "Что такое публичный профиль и зачем он нужен?",
    answer: "Публичный профиль — это ваша визитная карточка в каталоге специалистов. Его видят все клиенты платформы. В профиле указываются: ваши услуги, цены, опыт, образование, фото работ. Заполненный профиль увеличивает количество заявок."
  },
  {
    id: 3,
    category: "Начало работы",
    question: "Как создать личную страницу для клиентов?",
    answer: "Перейдите в раздел «Личная страница» → «Создать страницу». В конструкторе добавьте блоки: о себе, услуги, прайс, фото работ, отзывы, контакты. Сохраните и получите уникальную ссылку для отправки клиентам. Страница работает как мини-сайт."
  },
  {
    id: 4,
    category: "Заказы и записи",
    question: "Как принимать заказы от клиентов?",
    answer: "Заказы приходят в раздел «Записи». Вы получаете уведомление о новой записи. Откройте заказ, проверьте детали (дата, время, услуга, комментарий клиента). Подтвердите запись или предложите другое время через сообщения."
  },
  {
    id: 5,
    category: "Заказы и записи",
    question: "Что делать, если клиент не пришёл на сеанс?",
    answer: "Откройте заказ в разделе «Записи» и отметьте статус «Клиент не пришёл». Напишите клиенту сообщение с уточнением причины. Если клиент часто пропускает записи без предупреждения, можете добавить предоплату для будущих записей."
  },
  {
    id: 6,
    category: "Заказы и записи",
    question: "Как изменить или отменить запись?",
    answer: "Зайдите в «Записи», откройте нужный заказ и нажмите «Изменить время» или «Отменить запись». Клиент получит уведомление об изменениях. Если переносите запись, обязательно напишите клиенту причину и предложите альтернативное время."
  },
  {
    id: 7,
    category: "Коммуникация",
    question: "Как общаться с клиентами через платформу?",
    answer: "Все сообщения в разделе «Сообщения». Выберите чат с клиентом и пишите напрямую. Здесь можно уточнить детали записи, отправить рекомендации, напомнить о сеансе. Сообщения приходят в реальном времени."
  },
  {
    id: 8,
    category: "Коммуникация",
    question: "Можно ли отправлять клиентам напоминания о записи?",
    answer: "Да, в разделе «Записи» откройте заказ и нажмите «Отправить напоминание». Клиент получит уведомление за 24 часа или за 3 часа до сеанса (выбирается вручную). Напоминания снижают количество пропущенных записей."
  },
  {
    id: 9,
    category: "Отзывы и репутация",
    question: "Как попросить клиента оставить отзыв?",
    answer: "После завершения сеанса откройте заказ в «Записи» и нажмите «Запросить отзыв». Клиент получит уведомление с просьбой оценить вашу работу. Отзывы повышают рейтинг и доверие новых клиентов."
  },
  {
    id: 10,
    category: "Отзывы и репутация",
    question: "Что делать с негативным отзывом?",
    answer: "Зайдите в «Мои отзывы», найдите отзыв и нажмите «Ответить». Вежливо извинитесь, объясните ситуацию и предложите решение. Адекватный ответ на критику показывает профессионализм. Если отзыв нарушает правила (оскорбления, ложь) — пожалуйтесь модераторам."
  },
  {
    id: 11,
    category: "Отзывы и репутация",
    question: "Как повысить рейтинг на платформе?",
    answer: "Рейтинг растёт от положительных отзывов, заполненности профиля и активности. Просите клиентов оставлять отзывы после каждого сеанса. Обновляйте профиль: добавляйте фото работ, сертификаты, описание новых техник."
  },
  {
    id: 12,
    category: "Продвижение",
    question: "Как продвигать свой профиль на платформе?",
    answer: "В разделе «Продвижение» доступны инструменты: поднятие в топ каталога на 7 дней (500 ₽), выделение цветом (300 ₽/неделя), размещение в рассылке (1000 ₽). Также заполните профиль на 100% и собирайте отзывы — это бесплатно повышает позицию."
  },
  {
    id: 13,
    category: "Продвижение",
    question: "Что даёт PRO-подписка для специалистов?",
    answer: "PRO-подписка (990 ₽/мес) даёт: сниженную комиссию 5% вместо 10%, приоритет в каталоге, отображение бейджа PRO, доступ к аналитике клиентов, возможность создавать промокоды и рассылки."
  },
  {
    id: 14,
    category: "Верификация",
    question: "Как пройти верификацию профиля?",
    answer: "Зайдите в «Верификация» и загрузите документы: паспорт (главная страница + прописка), дипломы/сертификаты об образовании. Модерация занимает 1-3 рабочих дня. Верифицированный профиль получает бейдж и больше доверия клиентов."
  },
  {
    id: 15,
    category: "Верификация",
    question: "Зачем загружать сертификаты и дипломы?",
    answer: "Сертификаты подтверждают ваше образование и квалификацию. Профили с документами получают бейдж «Проверенный специалист» и показываются выше в поиске. Клиенты охотнее записываются к верифицированным мастерам."
  },
  {
    id: 16,
    category: "Настройки",
    question: "Как настроить уведомления о новых заказах?",
    answer: "Зайдите в «Настройки» → «Уведомления». Включите нужные каналы: push-уведомления в браузере, email, Telegram. Выберите типы событий: новые заказы, сообщения, отзывы, напоминания о сеансах."
  },
  {
    id: 17,
    category: "Настройки",
    question: "Как изменить график работы в профиле?",
    answer: "Откройте «Публичный профиль» → «Расписание». Укажите рабочие дни и часы. Можно задать разное время для разных дней недели. Клиенты увидят актуальное расписание и смогут записаться только на доступные слоты."
  },
  {
    id: 18,
    category: "Клиентская база",
    question: "Как работать с базой клиентов?",
    answer: "Раздел «CRM-клиенты» хранит всех ваших клиентов. Для каждого записывайте: контакты, историю сеансов, особенности здоровья, предпочтения. Перед сеансом открывайте карточку клиента, чтобы вспомнить детали."
  },
  {
    id: 19,
    category: "Клиентская база",
    question: "Можно ли отправлять клиентам рассылки?",
    answer: "Да, в разделе «CRM-клиенты» → «Рассылка». Выберите сегмент (все клиенты / давно не были / новые) и отправьте сообщение: акция, новая услуга, поздравление. Доступно только для PRO-подписки."
  },
  {
    id: 20,
    category: "Обучение",
    question: "Где найти обучающие материалы по работе с платформой?",
    answer: "Раздел «Обучение клиентов» содержит статьи, видео и инструкции: как работать с диагнозами, техники массажа, бизнес-советы. Материалы обновляются еженедельно. Также доступны вебинары от опытных специалистов."
  },
  {
    id: 21,
    category: "Обучение",
    question: "Как участвовать в вебинарах и мероприятиях?",
    answer: "В разделе «Сообщество» публикуются анонсы вебинаров, встреч специалистов, конференций. Зарегистрируйтесь на событие и получите ссылку на подключение. Участие бесплатное для всех специалистов платформы."
  },
  {
    id: 22,
    category: "Техподдержка",
    question: "Как связаться с поддержкой платформы?",
    answer: "Нажмите на иконку чата в правом нижнем углу или зайдите в «Сообщения» → «Поддержка». Опишите проблему или вопрос. Среднее время ответа — 1-2 часа в рабочее время (пн-пт, 9:00-21:00 МСК)."
  },
  {
    id: 23,
    category: "Техподдержка",
    question: "Что делать, если заказ не отображается в кабинете?",
    answer: "Обновите страницу (F5) и проверьте раздел «Записи» ещё раз. Если заказ не появился — напишите в поддержку с указанием: имя клиента, дата записи, услуга. Техподдержка восстановит заказ в течение 1 часа."
  },
  {
    id: 24,
    category: "Безопасность",
    question: "Как защищены мои данные на платформе?",
    answer: "Все данные хранятся на защищённых серверах с SSL-шифрованием. Доступ к личной информации имеете только вы и модераторы (при проверке документов). Платёжные данные обрабатываются через PCI DSS сертифицированные сервисы."
  },
  {
    id: 25,
    category: "Безопасность",
    question: "Можно ли скрыть свой номер телефона от клиентов?",
    answer: "Да, в настройках профиля включите опцию «Связь только через платформу». Клиенты смогут писать вам только в чате на сайте, номер телефона не отображается. Это защищает от спама и неадекватных клиентов."
  }
];

export default function KnowledgeBase() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<FAQItem[]>(defaultFaqData);
  const [supportUrl, setSupportUrl] = useState('https://t.me/+QgiLIa1gFRY4Y2Iy');
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<'masseur' | 'salon' | 'school' | 'user'>('masseur');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      let type: 'masseur' | 'salon' | 'school' | 'user' = 'user';
      
      if (user.role === 'masseur') type = 'masseur';
      else if (user.role === 'salon') type = 'salon';
      else if (user.role === 'school') type = 'school';
      
      setUserType(type);
      loadFAQ(type);
    } else {
      setLoading(false);
    }
  }, []);

  const loadFAQ = async (type: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372?target_type=${type}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setFaqData(data.items);
        }
      }

      const settingsResponse = await fetch(
        `https://functions.poehali.dev/63fa554e-a9fa-4ee0-8105-240950837372?action=settings&target_type=${type}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (settingsResponse.ok) {
        const settingsData = await settingsResponse.json();
        if (settingsData.telegram_support_url) {
          setSupportUrl(settingsData.telegram_support_url);
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки базы знаний:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(new Set(faqData.map(item => item.category)));

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Icon name="Loader2" className="animate-spin mx-auto mb-4 text-primary" size={48} />
          <p className="text-gray-600">Загрузка базы знаний...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-4 -ml-2"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">База знаний</h1>
        <p className="text-gray-600 text-lg">Ответы на все вопросы по работе в кабинете</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Поиск по вопросам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className="rounded-full"
        >
          Все темы
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredFAQ.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all hover:border-primary/50"
          >
            <button
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="text-xs text-primary font-medium mb-1">{item.category}</div>
                <div className="text-base md:text-lg font-semibold text-gray-900">{item.question}</div>
              </div>
              <Icon
                name="ChevronDown"
                className={`text-gray-400 flex-shrink-0 transition-transform ${
                  expandedId === item.id ? 'rotate-180' : ''
                }`}
                size={20}
              />
            </button>
            {expandedId === item.id && (
              <div className="px-6 py-4 pt-0 border-t border-gray-100">
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFAQ.length === 0 && (
        <div className="text-center py-12">
          <Icon name="SearchX" className="text-gray-300 mx-auto mb-4" size={48} />
          <p className="text-gray-500 text-lg">Ничего не найдено по вашему запросу</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
            }}
            className="mt-4"
          >
            Сбросить фильтры
          </Button>
        </div>
      )}

      <div className="mt-12 bg-primary/5 rounded-xl p-6 border border-primary/10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="HelpCircle" className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Не нашли ответ?</h3>
            <p className="text-gray-700 mb-4">Свяжитесь с нашей поддержкой — ответим в течение 1-2 часов</p>
            <a href={supportUrl} target="_blank" rel="noopener noreferrer">
              <Button>
                <Icon name="MessageCircle" size={18} className="mr-2" />
                Написать в поддержку
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}