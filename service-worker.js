importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.NetworkFirst()
)

const CACHE_NAME = 'polygraficke-nastroje-pamet';
const urlsToCache = [
    '/',
    '/404.html',
    '/index.html',
    '/css/index.css',
    '/Rezani/index.html',
    '/Rezani/app.js',
    '/js/bundle.js'
];

// Instalace service workeru a cacheování základních zdrojů
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Zpracování požadavků pomocí cache a sítě
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Pokud je odpověď v cache, vrátí ji
            if (response) {
                return response;
            }

            // Pokud není, požádá o ni síť a uloží do cache
            return fetch(event.request).then(
                networkResponse => {
                    // Kontrola, zda je odpověď platná
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                        return networkResponse;
                    }

                    // Klonování odpovědi
                    const responseToCache = networkResponse.clone();

                    // Otevření cache a uložení odpovědi
                    caches.open(CACHE_NAME)
                    .then(cache => {
                        cache.put(event.request, responseToCache);
                    });

                    return networkResponse;
                }
            );
        }).catch(() => {
            // Pokud selže síť i cache, zobrazí se offline stránka
            return caches.match('/404.html');
        })
    );
});

// Správa cache při aktivaci nového service workeru
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
