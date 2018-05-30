/**
 * Function that prevents you from searching when you are offline.
 * @param event
 */
function handleOfflineSearch(event){

    if (!navigator.onLine) {
        event.preventDefault();
        alert("Sorry you cannot search when you're offline!");
    }

}

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
    console.log("You are offline");
    showOfflineWarning();
}, false);

/**
 * When the client gets online, it hides the off line warning
 */
window.addEventListener('online', function(e) {
    // Resync data with server.
    console.log("You are online");
    hideOfflineWarning();
}, false);

/**
 * Function that shows the offline warning div
 */
function showOfflineWarning(){
    if (document.getElementById('offline_div') != null) {
        document.getElementById('offline_div').style.display = 'block';
    }

    if (document.getElementById('g') != null) {
        document.getElementById('g').disabled = 'disabled';
    }

    if (document.getElementById('searchTextInput') != null) {
        document.getElementById('searchTextInput').disabled = 'disabled';
    }
}

/**
 * Function that hides the offline warning div
 */
function hideOfflineWarning(){
    if (document.getElementById('offline_div') != null) {
        document.getElementById('offline_div').style.display = 'none';
    }

    if (document.getElementById('g') != null) {
        document.getElementById('g').disabled = '';
    }

    if (document.getElementById('searchTextInput') != null) {
        document.getElementById('searchTextInput').disabled = '';
    }

}