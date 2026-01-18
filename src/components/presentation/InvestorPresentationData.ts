export const slides = [
  { id: 'cover', title: '🚀 Питч-дек', icon: 'Rocket' },
  { id: 'problem', title: '❌ Проблема', icon: 'AlertCircle' },
  { id: 'solution', title: '✅ Решение', icon: 'Lightbulb' },
  { id: 'market', title: '📊 Рынок', icon: 'TrendingUp' },
  { id: 'product', title: '🎯 Продукт', icon: 'Package' },
  { id: 'economics', title: '💰 Экономика', icon: 'DollarSign' },
  { id: 'competition', title: '⚔️ Конкуренты', icon: 'Target' },
  { id: 'traction', title: '📈 Метрики', icon: 'BarChart3' },
  { id: 'team', title: '👥 Команда', icon: 'Users' },
  { id: 'ask', title: '🎯 Инвестиции', icon: 'Coins' },
];

export const metrics = [
  { label: 'Массажистов', value: '1000+', color: 'from-blue-600 to-cyan-600' },
  { label: 'Школ', value: '50+', color: 'from-purple-600 to-pink-600' },
  { label: 'Салонов', value: '200+', color: 'from-orange-600 to-red-600' },
  { label: 'MRR', value: '₽350K', color: 'from-green-600 to-emerald-600' },
];

export const competitors = [
  {
    name: 'Profi.ru / Яндекс.Услуги',
    model: 'Комиссия 20-30%',
    pros: 'Большая база клиентов',
    cons: 'Высокие комиссии, демпинг, нет обучения',
    threat: 'Средняя'
  },
  {
    name: 'hh.ru / Авито',
    model: 'Объявления',
    pros: 'Известность',
    cons: 'Не нишевые, нет экосистемы',
    threat: 'Низкая'
  },
  {
    name: 'GetCourse / Stepik',
    model: 'Платформа курсов',
    pros: 'Инфраструктура обучения',
    cons: 'Нет профсообщества, нет клиентов',
    threat: 'Низкая'
  },
  {
    name: 'Telegram-каналы школ',
    model: 'Сообщества',
    pros: 'Близость к аудитории',
    cons: 'Нет инструментов монетизации',
    threat: 'Низкая'
  },
];

export const unitEconomics = {
  masseur: {
    arpu: 1990,
    cac: 500,
    ltv: 23880,
    payback: 0.25,
    margin: 75
  },
  school: {
    arpu: 5000,
    cac: 2000,
    ltv: 60000,
    payback: 0.4,
    margin: 80
  },
  salon: {
    arpu: 3000,
    cac: 1500,
    ltv: 36000,
    payback: 0.5,
    margin: 70
  }
};

export const roadmap = [
  {
    quarter: 'Q1 2026',
    goals: ['AI-анамнез v2.0', 'Мобильное приложение', '2000 массажистов'],
    status: 'in-progress'
  },
  {
    quarter: 'Q2 2026',
    goals: ['Видеокурсы на платформе', 'Интеграция платежей', '100 школ'],
    status: 'planned'
  },
  {
    quarter: 'Q3 2026',
    goals: ['Маркетплейс оборудования', 'API для салонов', '500 салонов'],
    status: 'planned'
  },
  {
    quarter: 'Q4 2026',
    goals: ['Выход в СНГ', 'B2B корпоративные программы', 'Break-even'],
    status: 'planned'
  },
];
