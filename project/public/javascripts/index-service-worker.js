/**
 * This starts the service worker to go into its process of Install - Activate etc.
 */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function() {
            console.log('Index Page Service Worker Registered');
        });
}