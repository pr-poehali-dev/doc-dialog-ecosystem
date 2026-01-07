export function toMoscowTime(timestamp: string | Date): Date {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  return date;
}

export function formatMoscowTime(timestamp: string, locale: string = 'ru-RU'): string {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  return date.toLocaleTimeString(locale, { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'Europe/Moscow'
  });
}

export function formatMoscowDate(timestamp: string, locale: string = 'ru-RU'): string {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  return date.toLocaleDateString(locale, {
    timeZone: 'Europe/Moscow'
  });
}

export function formatMoscowDateTime(timestamp: string, locale: string = 'ru-RU'): string {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  return date.toLocaleString(locale, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Moscow'
  });
}

export function formatRelativeTime(timestamp: string): string {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  const moscowDate = new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
  
  const moscowDateStart = new Date(moscowDate);
  moscowDateStart.setHours(0, 0, 0, 0);
  
  const nowStart = new Date(now);
  nowStart.setHours(0, 0, 0, 0);
  
  const diff = nowStart.getTime() - moscowDateStart.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) {
    return `Сегодня ${formatMoscowTime(timestamp)}`;
  } else if (days === 1) {
    return `Вчера ${formatMoscowTime(timestamp)}`;
  } else if (days < 7) {
    return `${days} дн. назад ${formatMoscowTime(timestamp)}`;
  } else {
    return formatMoscowDateTime(timestamp);
  }
}