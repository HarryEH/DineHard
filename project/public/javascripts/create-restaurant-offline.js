/**
 * When the client gets off-line, it sets the onsumbit of the form to be a function that stores the details in session storage
 */
window.addEventListener('offline', function(e) {
    // Queue up events for server.
    console.log("You are offline");

}, false);

/**
 * When the client gets online, it sends the stored form details, resets them
 * and sets the onsubmit function to be the appropriate function
 */
window.addEventListener('online', function(e) {
    // Resync data with server.
    console.log("You are online");

}, false);