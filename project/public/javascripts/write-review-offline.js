/**
 * When the page loads, check if you are offline or online.
 */
function initialMessageDisplay(){
    if (navigator.onLine) {
        hideOfflineWarning();
    } else {
        showOfflineWarning();
    }
}

/**
 * When the client gets off-line, it shows an off line warning to the user
 * so that it is clear that the data is stale
 */
window.addEventListener('offline', function(e) {
    // Queue up events for server.
    showOfflineWarning();
}, false);

/**
 * When the client gets online, it hides the off line warning
 */
window.addEventListener('online', function(e) {
    // Resync data with server.
    hideOfflineWarning();
}, false);


/**
 * Function that shows the offline warning div
 */
function showOfflineWarning(){
    if (document.getElementById('offline_div') != null) {
        document.getElementById('offline_div').style.display = 'block';
    }
}

/**
 * Function that hides the offline warning div
 */
function hideOfflineWarning(){
    if (document.getElementById('offline_div') != null) {
        document.getElementById('offline_div').style.display = 'none';
    }

}