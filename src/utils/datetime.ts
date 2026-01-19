export const MOSCOW_TIMEZONE = 'Europe/Moscow';

export function toMoscowTime(timestamp: string | Date): Date {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  return date;
}

export function formatMoscowTime(timestamp: string | Date, locale: string = 'ru-RU'): string {
  if (!timestamp) return '';
  
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  return date.toLocaleTimeString(locale, { 
    timeZone: MOSCOW_TIMEZONE,
    hour: '2-digit', 
    minute: '2-digit'
  });
}

export function formatMoscowDate(timestamp: string | Date, locale: string = 'ru-RU'): string {
  if (!timestamp) return '';
  
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  return date.toLocaleDateString(locale, { 
    timeZone: MOSCOW_TIMEZONE 
  });
}

export function formatMoscowDateTime(timestamp: string | Date, locale: string = 'ru-RU', options?: Intl.DateTimeFormatOptions): string {
  if (!timestamp) return '';
  
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  return date.toLocaleString(locale, {
    timeZone: MOSCOW_TIMEZONE,
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    ...options
  });
}

export function formatRelativeTime(timestamp: string): string {
  if (!timestamp) return '';
  
  const moscowDate = toMoscowTime(timestamp);
  const now = toMoscowTime(new Date());
  
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