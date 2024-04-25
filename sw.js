const CACHE_NAME = 'cache';

const PRECACHE_ASSETS = [
         './index.html',
         './index.css',
          './android/android-launchericon-512-512.png',
          './android/android-launchericon-192-192.png',
          './android/android-launchericon-144-144.png',
          './android/android-launchericon-96-96.png',
          './android/android-launchericon-72-72.png',
          './android/android-launchericon-48-48.png',

]
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // Verifica se a solicitação pertence à extensão do Chrome
      if (event.request.url.startsWith('chrome-extension://')) {
        return fetch(event.request);
      }

      return fetch(event.request).then(response => {
        // Verifica se a resposta é válida
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clona a resposta para armazenamento em cache
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          // Verifica se a solicitação não pertence à extensão do Chrome antes de armazená-la em cache
          if (!event.request.url.startsWith('chrome-extension://')) {
            cache.put(event.request, responseToCache);
          }
        });

        return response;
      });
    })
  );
});






