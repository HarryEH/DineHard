const CACHE_NAME = 'dine-hard-cache-v1';
const ERROR_CACHE = 'dine-hard-error';
const urlsToCache = [
// add the files you want to cache here
    '/',
    '/index',
    '/stylesheets/*',
    '/javascripts/*',
    '/results*',
    '/*'
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

// self.addEventListener('activate', function(event){
//    console.log('[ServiceWorker] Activate');
//    e.waitUntil(
//        caches.keys().then(function(keyList) {
//            return Promise.all(keyList.map(function(key){
//                if(key !== cacheName && key !== dataCacheName) {
//                    console.log('[ServiceWorker] Removing old cache', key);
//                    return caches.delete(key);
//                }
//            }))
//        })
//    )
// });

// self.addEventListener('fetch', function(event) {
//
//     event.respondWith(
//         caches.match(event.request)
//             .then(function(response) {
//                 if (response) {
//                     return response;     // if valid response is found in cache return it
//                 } else {
//                     return fetch(event.request)     //fetch from internet
//                         .then(function(res) {
//                             return caches.open(CACHE_NAME)
//                                 .then(function(cache) {
//                                     cache.put(event.request.url, res.clone());    //save the response for future
//                                     return res;   // return the fetched data
//                                 })
//                         })
//                         .catch(function(err) {       // fallback mechanism
//                             return caches.open(ERROR_CACHE)
//                                 .then(function(cache) {
//                                     return cache.match('/offline.html');
//                                 });
//                         });
//                 }
//             })
//     );
// });



//
// console.log(event.request);
// event.respondWith(
//     // it checks if the requested page is among the cached ones
//     caches.match(event.request).then(function (response) {
//         // Cache hit - return the cache response (the cached page)
//         if (response) {
//             return response;
//         } //cache does not have the page — go to the server
//         return fetch(event.request);
//     })
// );
// var fetchRequest = event.request.clone();
// return fetch(fetchRequest).then( function (response) {
//     // Check if we received a valid response. A basic response is one that
//     // is made to our own site. Do not cache responses to requests made
//     // to other sites
//     if (!response || response.status !== 200 || response.type !== 'basic') {
//         return response;
//     }
//     // IMPORTANT: as mentioned we must clone the response.
//     // A response is a stream
//     // and because we want the browser to consume the response
//     // as well as the cache consuming the response, we need
//     // to clone it so we have two streams.
//     var responseToCache = response.clone();
//     caches.open(CACHE_NAME)
//         .then(function (cache) {
//             cache.put(event.request, responseToCache);
//         });
//     return response;
// });

