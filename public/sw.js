const CACHE_NAME = 'docdialog-v1';
const STATIC_CACHE = [
  '/',
  '/src/main.tsx',
  '/src/App.tsx'
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_CACHE);
    })
  );
  self.skipWaiting();
});

// Активация и очистка старых кешей
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Стратегия кеширования: Network First для API, Cache First для статики
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API запросы - Network First
  if (url.hostname.includes('functions.poehali.dev')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clonedResponse);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Статика и изображения - Cache First
  if (url.hostname.includes('cdn.poehali.dev') || 
      request.destination === 'image' ||
      request.destination === 'font') {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clonedResponse);
          });
          return response;
        });
      })
    );
    return;
  }

  // Остальное - Network First
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});
