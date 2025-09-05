const CACHE_NAME = 'meter-tracker-v1';
const urlsToCache = [
  '/meter-tracker/',
  '/meter-tracker/index.html',
  '/meter-tracker/manifest.json',
  '/meter-tracker/icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
      .catch(err => console.error('Cache addAll failed:', err))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().tconst CACHE_NAME = 'meter-tracker-v1';
const urlsToCache = [
  '/meter-tracker/',
  '/meter-tracker/index.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
  }
});