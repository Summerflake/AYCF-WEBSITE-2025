// loader.js
(function() {
  const script = document.createElement('script');
  script.src = '/static/js/script.js?v=' + Date.now(); // Prevent caching
  script.type = 'text/javascript';
  script.defer = true; // Optional, based on your use case
  document.head.appendChild(script);
})();
