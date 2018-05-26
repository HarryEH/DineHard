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

var queue = [];

self.addEventListener('fetch', function(event) {

    const cloned = event.request.clone();

    console.log(queue);

    if (event.request.method !== "GET" && !event.request.url.includes("login")) {
        console.log(cloned);
    }

    event.respondWith (
        fetch(event.request).then( function (response) {
            if (event.request.method === "GET") {
                if (response && response.status === 200 && response.type === 'basic') {
                    var responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(event.request, responseToCache);
                    });
                }
            }

            if (response && response.status === 200 && response.type === 'basic') {
                // handle sending the unsent response here
                if (queue.length !== 0) {
                    const len = queue.length
                    for (var q = 0; q < len; q++) {
                        const request = queue.shift();
                        fetch(request).then(function (r) {
                            console.log("unsent message sent and response received");
                            console.log(r);
                        }).catch(function (err) {
                            console.err(err);
                            // something went wrong when sending this...
                        })
                    }
                }
            }

            return response;
        }).catch(function(e) {

            console.log("in the catch");

            if (cloned.method !== "GET" && !cloned.url.includes("login") && !cloned.url.includes("socket")) {
                console.log(queue);
                console.log(cloned.url);
                queue.push(cloned);
            }

            return caches.open(CACHE_NAME).then(function(cache) {
                return caches.match(event.request).then(function (response) {
                    // Cache hit - return the cache response (the cached page)
                    if (response) {
                        return response;
                    } else {
                        return caches.match('/offline.html').then(function(r){return r;})
                    }
                })
            });
        })
    );

    // if (event.request.method === "GET") {
    //     var fetchRequest = event.request.clone();
    //     return fetch(fetchRequest).then( function (response) {
    //
    //         if (!response || response.status !== 200 || response.type !== 'basic') {
    //             return response;
    //         }
    //
    //         var responseToCache = response.clone();
    //         caches.open(CACHE_NAME)
    //             .then(function (cache) {
    //                 cache.put(event.request, responseToCache);
    //             });
    //         return response;
    //     });
    // }

});





