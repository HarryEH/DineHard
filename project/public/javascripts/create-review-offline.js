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
    loadData();
}, false);


function showOfflineWarning(){
    if (document.getElementById('offline_div') != null) {
        document.getElementById('offline_div').style.display = 'block';
        document.getElementById('search-bar').style.display = 'none';
    }
}

function hideOfflineWarning(){
    if (document.getElementById('offline_div') != null) {
        document.getElementById('offline_div').style.display = 'none';
    }
    if (document.getElementById('search-bar') !=null) {
        document.getElementById('search-bar').style.display = 'block';
    }
}