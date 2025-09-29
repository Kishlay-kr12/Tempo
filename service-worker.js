const CACHE_NAME = "timer-dashboard-v1";
const ASSETS = [
  "./index.html",
  "./manifest.json",
  "./alarm.mp3",
  "./icon-192.png",
  "./icon-512.png"
];

// Install SW
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Serve cached files
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

// Update cache
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
