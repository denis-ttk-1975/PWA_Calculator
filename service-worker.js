const staticCacheName = 'static-den-calc-v1';

const cashedAssets = ['index.html', 'main.js', 'style.css'];

self.addEventListener('install', (event) => {
  console.log('install');
  event.waitUntil(async () => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(cashedAssets);
  });
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(staticCacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

async function cacheFirst(req) {
  const cashed = await caches.match(req);
  return cashed ?? (await fetch(req));
}

self.addEventListener('activate', async (event) => {
  console.log('activate');
});
