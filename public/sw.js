self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Simple pass-through fetch to satisfy PWA installability
  event.respondWith(fetch(event.request).catch(() => new Response("Offline mode")));
});
