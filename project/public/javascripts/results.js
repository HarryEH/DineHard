function radioButtonChange(){
    $(document).ready(function() {
        $('input[type=radio][name=searchArea]').change(function() {
            if (this.value == 'nearMe') {
                alert("Search Results Near Me");
            }
            else if (this.value == 'all') {
                alert("Search All Results");
            }
        });
    });
}

function sliderChange(){
    var slider = document.getElementById("distRange");
    var output = document.getElementById("distVal");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;
    }
}