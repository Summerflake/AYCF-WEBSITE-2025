// const CACHE_NAME = 'aycf-c-v1';
// const urlsToCache = [
//   '/',
//   '/index.html',
//   '/offline.html',

//   // HTML Pages
//   'fenlunti.html',
//   'field_trip.html',
//   'jiaban.html',
//   'organising_team.html',
//   'timeline.html',
//   'resources.html',
//   'robots.txt',
//   'sitemap.xml',

//   // JSON Timeline Files
//   'timeline/timeline1.json',
//   'timeline/timeline2.json',
//   'timeline/timeline3.json',

//   // CSS & Fonts
//   'static/css/bootstrap.css',
//   'static/css/bootstrap.min.map',
//   'static/css/style.css',
//   'static/fonts/font.css',

//   // JS
//   'static/js/bootstrap.bundle.min.js',
//   'static/js/boostrap.bundle.min.js.map',
//   'static/js/script.js',
//   'static/js/service-worker.js',

//   // General Images
//   'static/assets/admin.jpg',
//   'static/assets/clocktower.jpg',
//   'static/assets/concepts.jpg',
//   'static/assets/hci.jpg',
//   'static/assets/hua-logo.png',
//   'static/assets/lixie.webp',
//   'static/assets/logs.jpg',
//   'static/assets/mrboblee.jpg',
//   'static/assets/mrfu.jpg',
//   'static/assets/mslexie.jpg',
//   'static/assets/ntuc.jpg',
//   'static/assets/progs.jpg',
//   'static/assets/pubs.jpg',
//   'static/assets/shengxi.jpg',
//   'static/assets/sph.jpg',
//   'static/assets/sutd.jpg',
//   'static/assets/theme_logo.jpg',

//   // Timeline Images
//   'static/assets/timeline/1.svg',
//   'static/assets/timeline/2.svg',
//   'static/assets/timeline/3.svg',
//   'static/assets/timeline/4.svg',
//   'static/assets/timeline/5.svg',
//   'static/assets/timeline/6.svg',
//   'static/assets/timeline/7.svg',
//   'static/assets/timeline/8.svg',
//   'static/assets/timeline/9.svg',
//   'static/assets/timeline/10.svg',
//   'static/assets/timeline/11.svg',
//   'static/assets/timeline/12.svg',
//   'static/assets/timeline/13.svg',
//   'static/assets/timeline/14.svg',
//   'static/assets/timeline/15.svg',
//   'static/assets/timeline/16.svg',
//   'static/assets/timeline/17.svg'
// ];

// // Install event - cache files
// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => {
//         return cache.addAll(urlsToCache);
//       })
//       .then(() => self.skipWaiting())
//   );
// });

// // Activate event - clean up old caches
// self.addEventListener('activate', event => {
//   event.waitUntil(
//     caches.keys()
//       .then(cacheNames => 
//         Promise.all(
//           cacheNames.filter(name => name !== CACHE_NAME)
//             .map(name => caches.delete(name))
//         )
//       )
//       .then(() => self.clients.claim())
//   );
// });

// // Fetch event - serve from cache if available, else fetch from network
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(cachedResponse => {
//         if (cachedResponse) {
//           return cachedResponse; // return cached file
//         }
//         // fetch from network and cache new response for future
//         return fetch(event.request).then(networkResponse => {
//           // Check for valid response
//           if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
//             return networkResponse;
//           }

//           // Clone response to cache
//           const responseToCache = networkResponse.clone();

//           caches.open(CACHE_NAME).then(cache => {
//             cache.put(event.request, responseToCache);
//           });

//           return networkResponse;
//         }).catch(() => {
//           // fallback to offline.html for navigation requests if offline
//           if (event.request.mode === 'navigate') {
//             return caches.match('/offline.html');
//           }
//         });
//       })
//   );
// });
