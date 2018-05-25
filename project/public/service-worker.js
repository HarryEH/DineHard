const CACHE_NAME = 'dine-hard-cache-v1';
const ERROR_CACHE = 'dine-hard-error';
const urlsToCache = [
// add the files you want to cache here
    '/',
    '/stylesheets/style.css',
    '/offline.html'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    console.log('[ServiceWorker] Install');

    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
                console.log('[ServiceWorker] Caching app shell');
                return cache.addAll(urlsToCache);
        })
    );

});

self.addEventListener('activate', function(event){
    console.log('[ServiceWorker] Activate');

    event.waitUntil(
       caches.keys().then(function(keyList) {
           return Promise.all(keyList.map(function(key){
               if(key !== CACHE_NAME) {
                   console.log('[ServiceWorker] Removing old cache', key);
                   return caches.delete(key);
               }
           }))
       })
    )
});

self.addEventListener('fetch', function(event) {
    console.log(event.request);
    event.respondWith (
        fetch(event.request).catch(function(e) {
            console.error('Fetch failed; returning a cached or offline page instead.', e);
            return caches.open(CACHE_NAME).then(function(cache) {
                //return cache.match(event.request);
                return caches.match(event.request).then(function (response) {
                    // Cache hit - return the cache response (the cached page)
                    if (response) {
                        console.log("here1");
                        return response;
                    } else {
                        console.log("here2");
                        return caches.match('/offline.html').then(function(r){return r;})
                    }
                })
            });
        })
        // fetch(event.request).catch(function(err) {
        //     // it checks if the requested page is among the cached ones
        //     caches.match(event.request).then(function (response) {
        //         // Cache hit - return the cache response (the cached page)
        //         if (response) {
        //             console.log("here1");
        //             return response;
        //         } else {
        //             console.log("here2");
        //             return caches.match('/offline.html').then(function(r){return r;})
        //         }
        //     })
        // })
    );

    var fetchRequest = event.request.clone();
    return fetch(fetchRequest).then( function (response) {
        // Check if we received a valid response. A basic response is one that
        // is made to our own site. Do not cache responses to requests made
        // to other sites
        if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
        }
        // IMPORTANT: as mentioned we must clone the response.
        // A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();
        caches.open(CACHE_NAME)
            .then(function (cache) {
                cache.put(event.request, responseToCache);
            });
        return response;
    });
});




