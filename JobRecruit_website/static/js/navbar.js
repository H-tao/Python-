window.onload = function(){
    var oDDs = document.getElementsByClassName("job_container");
    alert(oDDs.length);
    for(var i = 0; i < oDDs.length; ++i){
        var oAs = oDDs[i].getElementsByTagName("a");
        alert(oAs.innerHTML);
        for(var j = 0; j < oAs.length; ++j){
            oAs[j].onclick = function () {
                alert(this.innerHTML);
                // this.href = "http://127.0.0.1/jobs?keyword=" + encodeURIComponent(this.innerHTML) + "&page=1&num=10";
            }
        }
    }
};


$("dd.jobs_container").each(function () {
    this.children().css('backgroud-color', 'red');
});
