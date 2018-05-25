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

    const cunt = event.request.clone();
    // console.log(event.request);
    //
    // event.request.arrayBuffer().then(function(r){
    //     var enc = new TextDecoder("utf-8");
    //     var arr = new Uint8Array(r);
    //     console.log(enc.decode(arr));
    // });
    //
    // console.log(event.request);


    event.respondWith (
        fetch(event.request).then( function (response) {
            if (event.request.method === "GET") {
                if (response && response.status === 200 && response.type === 'basic') {
                    var responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(event.request, responseToCache);
                    });
                }

            } else {
                console.log(cunt);

                // event.request.arrayBuffer()
                // event.request.blob()
                // event.request.json()
                // event.request.text()
                // event.request.formData()

                // cunt.arrayBuffer().then(function(r){
                //     var enc = new TextDecoder("utf-8");
                //     var arr = new Uint8Array(r);
                //     console.log(enc.decode(arr));
                // });

                cunt.text().then(function(r){
                    console.log(r);
                }).catch(function(err){console.log(err)});
            }
            return response;
        }).catch(function(e) {
            console.error('Fetch failed; returning a cached or offline page instead.', e);
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





