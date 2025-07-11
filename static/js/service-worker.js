// Service Worker

const CACHE_NAME = 'aycf-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html', // fallback
  'fenlunti.html',
  'field_trip.html',
  'jiaban.html',
  'organising_team.html',
  'timeline.html',
  'resources.html',
  'robots.txt',
  'sitemap.xml',

  // TIMELINE JSON FILES
  'timeline/timeline1.json',
  'timeline/timeline2.json',
  'timeline/timeline3.json',

  // STATIC FILES

  'static/css/bootstrap.css',
  'static/css/bootstrap.min.map',
  'static/css/style.css',
  'static/fonts/font.css',
  'static/js/bootstrap.bundle.min.js',
  'static/js/boostrap.bundle.min.js.map',
  'static/js/script.js',
  'static/js/service-worker.js',

  // IMAGES
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

  // TIMELINE IMAGES
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

//include other filepaths
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching files');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            // Optional: only cache GET requests
            if (event.request.method === 'GET') {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        })
        .catch(() => {
          // Return offline.html for navigation requests when offline
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
    })
  );
});
