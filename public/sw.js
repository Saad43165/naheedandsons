const CACHE_NAME = 'naheed-sons-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // We don't cache anything aggressively right now,
  // we just need the fetch listener to exist for PWA validation!
  event.respondWith(fetch(event.request));
});
