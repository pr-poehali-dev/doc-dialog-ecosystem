// Простой кеш для API запросов
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class SimpleCache {
  private cache: Map<string, CacheItem<any>> = new Map();
  private ttl: number = 5 * 60 * 1000; // 5 минут по умолчанию

  async fetch<T>(key: string, fetcher: () => Promise<T>, ttl?: number): Promise<T> {
    const cached = this.cache.get(key);
    const now = Date.now();

    // Проверяем валидность кеша
    if (cached && (now - cached.timestamp) < (ttl || this.ttl)) {
      return cached.data as T;
    }

    // Загружаем свежие данные
    const data = await fetcher();
    this.cache.set(key, { data, timestamp: now });
    return data;
  }

  clear(key?: string) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  // Очистка устаревших записей
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

export const apiCache = new SimpleCache();

// Автоматическая очистка каждые 10 минут
setInterval(() => apiCache.cleanup(), 10 * 60 * 1000);
