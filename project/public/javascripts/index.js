function handleOfflineSearch(event){

    if (!navigator.onLine) {
        event.preventDefault();
        alert("Sorry you cannot search when you're offline!");
    }

}

