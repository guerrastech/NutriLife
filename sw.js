const cacheName = "sw-page";

self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll([
          './index.html',
          './index.css',
          './assets/images/app-icon.png',
          './assets/app-icons/android/android-launchericon-48-48.png',
          './assets/app-icons/android/android-launchericon-72-72.png',
          './assets/app-icons/android/android-launchericon-96-96.png',
          './assets/app-icons/android/android-launchericon-144-144.png',
          './assets/app-icons/android/android-launchericon-192-192.png',
          './assets/app-icons/android/android-launchericon-512-512.png'
        ]);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(error => {
        console.error('Error in fetching:', error);
      })
  );
});
