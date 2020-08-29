const CACHE_NAME_STATIC = 'static-version-1';
const CACHE_NAME_DYNAMIC = 'dynamic-version-5'
const urlsToCache = [
    'index.html', 
    'offline.html',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
];

const self = this;

// Install service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME_STATIC)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    )      
});


//Fetch event catching
self.addEventListener('fetch', event => {
    if (!(event.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol
    event.respondWith(
        caches.match(event.request).then((cacheRes) => {
            return cacheRes ||  fetch(event.request).then(fetchRes => {
                return caches.open(CACHE_NAME_DYNAMIC).then(cache => {
                    cache.put(event.request.url, fetchRes.clone());
                    return fetchRes
                })
            }); 
        }).catch(() => caches.match('offline.html'))
    );
})




// Activate the serviceworker and remove the old one
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME_STATIC);
    event.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(keys
              .filter(key => key !== CACHE_NAME_STATIC)
              .map(key => caches.delete(key))
            );
          })   
    )
});