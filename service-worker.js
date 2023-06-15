const staticCacheName = 'static-den-calc-v1';

const cashedAssets = ['index.html', 'main.js', 'style.css'];

self.addEventListener('install', async (event) => {
  console.log('install');
  const cache = await caches.open(staticCacheName);
  await cache.addAll(cashedAssets);
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  event.respondWith(cacheFirst(request));
});

async function cacheFirst(req) {
  const cashed = await caches.match(req);
  return cashed ?? fetch(req);
}

self.addEventListener('activate', async (event) => {
  console.log('activate');
});
