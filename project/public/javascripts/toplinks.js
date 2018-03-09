function isLoggedIn(){
    var login = sessionStorage.getItem("login");
    var topLinks = document.getElementById("top-links");
    var html = "";
    if (login == true){
        html += '<li><a href="/profile">View Profile</a></li>';
    } else {
        html += '<li><a href="/login">Login</a></li>';
        html += '<li><a href="/register">Register</a></li>';
    }

    topLinks.innerHTML = html;
}