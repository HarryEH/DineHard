const CACHE_NAME = 'dine-hard-cache-v1';
const ERROR_CACHE = 'dine-hard-error';

const KEY_INDEXEDDB = 'requests';

self.importScripts('javascripts/library/idb-keyval-iife.min.js');

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

    initialiseIfEmpty();

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

var firstTime = true;

self.addEventListener('fetch', function(event) {

    const cloned = event.request.clone();

    event.respondWith (
        fetch(event.request).then( function (response) {

            if (event.request.method === "GET") { // We only want to cache responses to GET requests.
                if (response && response.status === 200 && response.type === 'basic') {
                    var responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(event.request, responseToCache);
                    });
                }
            }

            if (firstTime && response && response.status === 200 && response.type === 'basic') {
                // handle sending the unsent response here
                firstTime = false;
                idbKeyval.get(KEY_INDEXEDDB).then(function(queue){

                    if (queue.length !== 0) {
                        for (var q = 0; q < queue.length; q++) {
                            const request = queue.shift();

                            const R = new Request(request.url, {method: request.method, body: request.body});

                            fetch(R).then(function (r) {
                                idbKeyval.set('requests', queue);
                            }).catch(function (err) {
                                console.log(err);
                            })
                        }
                    }
                });
            }

            return response;
        }).catch(function(e) {

            if (cloned.method !== "GET" && (cloned.url.includes("restaurant") || cloned.url.includes("review") )) {
                // Store in IndexedDB if its a POST that failed.
                idbKeyval.get(KEY_INDEXEDDB).then(function(result){

                    // cloned.text().then(function(text){
                    //     {url: cloned.url, body: text, method: cloned.method}
                        result.push(cloned);
                        idbKeyval.set(KEY_INDEXEDDB, result);
                    // });

                });

                firstTime = true;

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

});

function initialiseIfEmpty(){
    idbKeyval.get(KEY_INDEXEDDB).then(function(response){
        if (response === undefined) {
            idbKeyval.set(KEY_INDEXEDDB, []);
        }
    }).catch(function (err) {
        idbKeyval.set(KEY_INDEXEDDB, []);
    });
}





