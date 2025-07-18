// Name of the cache
const CACHE_NAME = 'aycf-cache-v1';

// Files to cache during install
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',

  // HTML Pages
  'fenlunti.html',
  'field_trip.html',
  'jiaban.html',
  'organising_team.html',
  'timeline.html',
  'resources.html',
  'robots.txt',
  'sitemap.xml',

  // JSON Timeline Files
  'timeline/timeline1.json',
  'timeline/timeline2.json',
  'timeline/timeline3.json',

  // CSS & Fonts
  'static/css/bootstrap.css',
  'static/css/bootstrap.min.map',
  'static/css/style.css',
  'static/fonts/font.css',

  // JS
  'static/js/bootstrap.bundle.min.js',
  'static/js/boostrap.bundle.min.js.map',
  'static/js/script.js',
  'static/js/service-worker.js',

  // General Images
  'static/assets/admin.jpg',
  'static/assets/clocktower.jpg',
  'static/assets/concepts.jpg',
  'static/assets/hci.jpg',
  'static/assets/hua-logo.png',
  'static/assets/lixie.webp',
  'static/assets/logs.jpg',
  'static/assets/mrboblee.jpg',
  'static/assets/mrfu.jpg',
  'static/assets/mslexie.jpg',
  'static/assets/ntuc.jpg',
  'static/assets/progs.jpg',
  'static/assets/pubs.jpg',
  'static/assets/shengxi.jpg',
  'static/assets/sph.jpg',
  'static/assets/sutd.jpg',
  'static/assets/theme_logo.jpg',

  // Timeline Images
  'static/assets/timeline/1.svg',
  'static/assets/timeline/2.svg',
  'static/assets/timeline/3.svg',
  'static/assets/timeline/4.svg',
  'static/assets/timeline/5.svg',
  'static/assets/timeline/6.svg',
  'static/assets/timeline/7.svg',
  'static/assets/timeline/8.svg',
  'static/assets/timeline/9.svg',
  'static/assets/timeline/10.svg',
  'static/assets/timeline/11.svg',
  'static/assets/timeline/12.svg',
  'static/assets/timeline/13.svg',
  'static/assets/timeline/14.svg',
  'static/assets/timeline/15.svg',
  'static/assets/timeline/16.svg',
  'static/assets/timeline/17.svg'
];

// Install: Pre-cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching assets...');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  const whitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!whitelist.includes(cacheName)) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Fetch: Serve from cache, fallback to network, then to offline.html if needed
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || event.request.method !== 'GET') {
            return networkResponse;
          }

          // Clone and cache the new response
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // If request is a navigation (e.g., user trying to load a page), return offline fallback
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
    })
  );
});
