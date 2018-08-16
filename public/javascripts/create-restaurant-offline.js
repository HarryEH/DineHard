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

    if (document.getElementById('autocomplete') != null) {
        document.getElementById('autocomplete').placeholder = 'Enter Address Manually';
        document.getElementById('autocomplete').disabled = 'Enter Address Manually';
    }

    if (document.getElementById('street_number') != null) {
        document.getElementById('street_number').disabled = '';
    }

    if (document.getElementById('route') != null) {
        document.getElementById('route').disabled = '';
    }

    if (document.getElementById('postal_code') != null) {
        document.getElementById('postal_code').disabled = '';
    }

}

/**
 * Function that hides the offline warning div
 */
function hideOfflineWarning(){
    if (document.getElementById('offline_div') != null) {
        document.getElementById('offline_div').style.display = 'none';
    }

    if (document.getElementById('autocomplete') != null) {
        document.getElementById('autocomplete').placeholder = 'Enter and select address';
    }

    if (document.getElementById('street_number') != null) {
        document.getElementById('street_number').disabled = 'true';
    }

    if (document.getElementById('route') != null) {
        document.getElementById('route').disabled = 'true';
    }

    if (document.getElementById('postal_code') != null) {
        document.getElementById('postal_code').disabled = 'true';
    }


}