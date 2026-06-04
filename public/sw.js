const CACHE_NAME = 'naheed-sons-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Empty fetch listener is enough to satisfy PWA install requirements
  // without intercepting and slowing down Next.js RSC data fetching!
});
