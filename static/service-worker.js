self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('danceshare-v1').then(cache => {
      return cache.addAll([
        '/',
        '/static/styles.css',
        '/static/script.js',
        '/static/index.js',
        '/static/ico/video-marketing.svg'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
