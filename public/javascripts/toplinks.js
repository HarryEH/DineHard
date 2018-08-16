/**
 * Formats the links at the top of the page for when the User is logged in
 */
function isLoggedIn(){
    var topLinks = document.getElementById("top-links");
    var html = "";
    var login = sessionStorage.getItem("login");

    if (login !== true){
        html += '<li><a href="/login">Login</a></li>';
        html += '<li><a href="/register">Register</a></li>';
    } else {
        html += '<li><a href="/profile">View Profile</a></li>';
    }

    topLinks.innerHTML = html;
}