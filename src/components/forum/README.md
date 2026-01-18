# Компоненты форума

## ForumRules
Диалог с правилами форума. Показывает пользователям правила поведения, запрещенные действия и систему предупреждений.

**Использование:**
```tsx
import ForumRules from '@/components/forum/ForumRules';

const [showRules, setShowRules] = useState(false);

<ForumRules open={showRules} onOpenChange={setShowRules} />
```

## ViolationWarning
Компонент для отображения предупреждений пользователю при нарушении правил форума.

**Типы предупреждений:**
- `first` - Первое предупреждение (желтое)
- `second` - Второе предупреждение с блокировкой на 7 дней (оранжевое)
- `final` - Финальное предупреждение перед удалением (красное)

**Использование:**
```tsx
import ViolationWarning from '@/components/forum/ViolationWarning';

const [showWarning, setShowWarning] = useState(false);
const [warningData, setWarningData] = useState({
  type: 'first' as 'first' | 'second' | 'final',
  reason: ''
});

// Показать предупреждение
const handleViolation = (type: 'first' | 'second' | 'final', reason: string) => {
  setWarningData({ type, reason });
  setShowWarning(true);
};

<ViolationWarning 
  open={showWarning}
  onOpenChange={setShowWarning}
  violationType={warningData.type}
  reason={warningData.reason}
  onAccept={() => {
    setShowWarning(false);
    // Здесь можно добавить логику (например, открыть правила)
  }}
/>
```

**Примеры использования:**

```tsx
// Первое нарушение - спам
handleViolation('first', 'Размещение рекламных ссылок без разрешения модератора');

// Второе нарушение - оскорбления
handleViolation('second', 'Использование нецензурной лексики и оскорбление участников форума');

// Финальное - систематические нарушения
handleViolation('final', 'Многократное нарушение правил форума после двух предупреждений');
```

## Интеграция с backend

Для полной работы системы предупреждений необходимо добавить в базу данных:

1. Таблицу для отслеживания нарушений:
```sql
CREATE TABLE forum_violations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES forum_users(id),
  violation_type VARCHAR(50) NOT NULL, -- 'spam', 'offensive', 'off_topic', etc.
  reason TEXT NOT NULL,
  warning_level INTEGER DEFAULT 1, -- 1, 2, 3
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  moderator_id INTEGER REFERENCES forum_users(id)
);
```

2. Поле в таблице пользователей для счетчика предупреждений:
```sql
ALTER TABLE forum_users 
ADD COLUMN warnings_count INTEGER DEFAULT 0,
ADD COLUMN is_banned BOOLEAN DEFAULT FALSE,
ADD COLUMN ban_until TIMESTAMP NULL;
```

3. Backend endpoint для регистрации нарушения:
```python
def report_violation(user_id, violation_type, reason, moderator_id):
    # Увеличить счетчик предупреждений
    # Если warnings_count >= 3, заблокировать пользователя
    # Отправить уведомление пользователю
    pass
```
