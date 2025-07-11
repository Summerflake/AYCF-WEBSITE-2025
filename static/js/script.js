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
    navigator.serviceWorker.register('/static/js/service-worker.js') 
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
