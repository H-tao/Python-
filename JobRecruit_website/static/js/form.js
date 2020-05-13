window.onload = function () {
    fnPostForm();
    fnTipsMove();

    var oDDs = document.getElementsByClassName("job_container");
    for(var i = 0; i < oDDs.length; ++i){
        var oAs = oDDs[i].getElementsByTagName("a");
        for(var j = 0; j < oAs.length; ++j){
            oAs[j].onclick = function () {
                this.href = "/jobs?keyword=" + encodeURIComponent(this.innerHTML) + "&page=1&num=15";
            }
        }
    }

    var oAs = document.getElementsByClassName("hot-job");
    for(var i = 0; i < oAs.length; ++i){
        oAs[i].onclick = function () {
                this.href = "/jobs?keyword=" + encodeURIComponent(this.innerHTML) + "&page=1&num=15";
        }
    }


};

function fnPostForm() {
    // 获取表单
    var oForm = document.getElementById("query");
    // 添加表单值
    oForm.innerHTML += '<input type="hidden" name="page" value="1">';
    oForm.innerHTML += '<input type="hidden" name="num" value="15">';
}

function fnTipsMove() {
    var oDiv = document.getElementById('tips');
    var iLeft = 200;  // 左边距离
    var iMove = 2; // 移动中间量
    var iSpped = 2; // 移动速度
    var timer = setInterval(moving, 30); // 每30毫秒运行moving
    function moving(){
        // 移动到位置1000
        if(iLeft >= 400){
            // clearInterval(timer);  // 停止定时器
            iMove = -iSpped;
        }
        else if(iLeft < 200){
            // clearInterval(timer);  // 停止定时器
            iMove = iSpped;
        }

        iLeft += iMove;  // 每次运行距离加3px
        oDiv.style.left = iLeft + 'px';
    }
}


