function load(loggedIn){
    if (sessionStorage.getItem("userLat") == null){
        getLocation();
    } else if(sessionStorage.getItem("userLong") == null){
        getLocation();
    }

    if(sessionStorage.getItem("login") == null){
        sessionStorage.setItem("login", false);
    } else {
        sessionStorage.setItem("login", loggedIn);
    }
}