// production mode
/*
window.alert = function () { };
window.confirm = function () { return false; };
window.prompt = function () { return null; };

console.log = function () { };
console.warn = function () { };
console.error = function () { };
console.info = function () { };
console.debug = function () { };
console.trace = function () { };
console.table = function () { };
*/

//activate service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

function clearCache(){
  if ('caches' in window) {
  caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
  }).then(() => {
    console.log('All caches deleted.');
  }).catch(err => {
    console.error('Error deleting caches:', err);
  });
} else {
  console.log('Cache API not supported in this browser.');
}
}