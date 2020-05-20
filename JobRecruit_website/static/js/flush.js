        nowPage = '';   // 当前页数
        keyword = '';  // 关键字
        num = '';    // 每页数
        csrf_token = '';    // CSRF_TOKEN

        window.onload = function () {
            fnMakePostForm();       // 生成表单默认值
            fnAjaxGET(1);   // 发送一次Ajax请求获取数据
            fnRefleshPagerContainer(1);  // 生成pager
            fnMakeAnalyseFigure()  // 生成图表
        };

        // 上一页处理
        function fnPrevPage() {
            var oA_page = document.getElementById("page");
            nowPage = parseInt(oA_page.innerText);
            if(nowPage > 1){
                --nowPage;  // 页号减一
            }
            fnAjaxGET(nowPage);
            fnRefleshPagerContainer(nowPage);
        }

        // 跳转页处理
        function fnJumpPage(page) {
            nowPage = parseInt(page);
            fnAjaxGET(nowPage);
            fnRefleshPagerContainer(nowPage);
        }

        // 下一页处理
        function fnNextPage( ){
            var oA_page = document.getElementById("page");
            nowPage = parseInt(oA_page.innerText);
            ++nowPage;  // 页号加一
            fnAjaxGET(nowPage);
            fnRefleshPagerContainer(nowPage);
        }

        // 利用Ajax创建POST请求
        function fnAjaxPOST(pageNum) {
            var oA_page = document.getElementById("page");
            var oA_keyword = document.getElementById("keyword");
            var oA_num = document.getElementById("num");
            var oA_token = document.getElementById("token");
            nowPage = oA_page.innerText;
            keyword = oA_keyword.innerText;
            num = oA_num.innerText;
            csrf_token = oA_token.innerText;

            var form = new FormData();
            form.append('page', pageNum); // 页数
            form.append('keyword', keyword);
            form.append('num', num);
            form.append('csrfmiddlewaretoken', csrf_token);  // csrf认证

            var xmlhttp;
            if (window.XMLHttpRequest)
            {   // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            else
            {   // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function()
            {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                {
                    // console.log(xmlhttp.responseText);
                    loadJson(xmlhttp.responseText);
                }
            };
            xmlhttp.open("POST","/query",true);
            xmlhttp.send(form);
        }

        // Ajax GET
        function fnAjaxGET(pageNum) {
            var oA_keyword = document.getElementById("keyword");
            var oA_num = document.getElementById("num");
            keyword = oA_keyword.innerText;
            num = oA_num.innerText;

            var xmlhttp;
            if (window.XMLHttpRequest)
            {   // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            else
            {   // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function()
            {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                {
                    // 回调函数
                    loadJson(xmlhttp.responseText);
                }
            };
            var parameters = 'keyword=' + encodeURIComponent(keyword) + '&page=' + pageNum + '&num=' + num;
            var url = '/query?' + parameters;
            xmlhttp.open("GET",url,true);
            xmlhttp.send();
        }

        function loadJson(responseText)
        {
            // 获取数据
            data = JSON.parse(responseText);
            jobs = data['job_list'];
            keyword = data['keyword'];
            page = data['page'];

            // 修改职位内容
            // fnLoadUlHtml(jobs);
            if(Object.keys(jobs).length !== 0){
                fnLoadDictToUl(jobs);
            }

            // 修改当前页数
            var oA_page = document.getElementById("page");
            oA_page.innerHTML =  page;
        }

        function fnLoadDictToUl(jobs) {
            var oUl = document.getElementById("jobs_container");
            HTML = '';

            len = parseInt(Object.keys(jobs['id']).length);
            // for (var i = 0; i < len; ++i) {
            //     alert(jobs['position'][i]);
            // }
            for(var i = 0; i < len; ++i) {
                var job_id = jobs['id'][i];
                var job_position = jobs['position'][i];
                var job_salary = jobs['salary'][i];
                var job_city = jobs['city'][i];
                var job_education = jobs['education'][i];
                var job_work_experience = jobs['work_experience'][i];
                var job_tags = jobs['tags'][i];
                var job_company_name = jobs['company_name'][i];
                var job_company_scale = jobs['company_scale'][i];
                var job_company_field = jobs['company_field'][i];
                var job_company_type = jobs['company_type'][i];
                var job_company_benefits = jobs['company_benefits'][i];
                var job_detail_url = jobs['detail_url'][i];
                var job_district = jobs['district'][i];
                var job_zhaopingren = '';
                var job_zhaopingren_pos = '';

                var str =
                    '<li>' +
                    '<div class="job-primary">' +
                    '   <div class="info-primary">' +
                    '       <div class="primary-wrapper">' +
                    '           <div class="primary-box" href="#">' +
                    '               <div class="job-title>">' +
                    '                   <span class="job-name" href="#"><a href="#">' + job_position + '</a></span>' +
                    '                   <span class="job-area-wrapper"><span>[' + job_city + '·' + job_district + ']</span></span>' +
                    '                   <span class="job-pub-time"></span>' +
                    '               </div>' +
                    '               <div class="job-limit clear-fix">' +
                    '                   <span class="red">' + job_salary + '</span>' +
                    '                   <p>' +
                    job_work_experience +
                    '                       <em class="vline"></em>' +
                    job_education +
                    '                   </p>' +
                    '                   <div class="info-publis">' +
                    // '                       <h3 class="name"><img class="icon-chat" src="#">' +
                    //                             job_zhaopingren +
                    // '                       <em class="vline"></em>' +
                    //                             job_zhaopingren_pos +
                    // '                       </h3>' +
                    '                   </div>' +
                    '               </div>' +
                    '               <div class="info-detail"></div>' +
                    '               </div>' +
                    '           </div>' +
                    '       <div class="info-company">' +
                    '           <div class="company-text">' +
                    '               <h3 class="name"><a href="#">' + job_company_name + '</a>' +
                    '               </h3>' +
                    '               <p>' +
                    '                   <a href="#">' + job_company_field + '</a>' +
                    '                   <em class="vline"></em>' +
                    job_company_type +
                    '                   <em class="vline"></em>' +
                    job_company_scale +
                    '               </p>' +
                    '           </div>' +
                    '           <a href="#"></a>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div class="info-append clear-fix">' +
                    '       <div class="tags">' +
                    '           <span class="tag-item">' + job_tags + '</span>' +
                    '       </div>' +
                    '       <div class="info-desc">' +
                    job_company_benefits +
                    '       </div>' +
                    '   </div>' +
                    '</div>' +
                    '</li>';

                HTML += str;
            }
            oUl.innerHTML = HTML;
        }

        // 修改职位内容
        function fnLoadUlHtml(jobs) {
            var oUl = document.getElementById("jobs_container");
            HTML = '';

            // for(var i = 0; i < jobs.length; ++i){
            //     HTML += '<li>' + jobs[i] + '</li>';
            // }
            for(var i = 0; i < jobs.length; ++i){
                var job_info_list = jobs[i];
                var job_id = job_info_list[0];
                var job_position = job_info_list[1];
                var job_salary = job_info_list[2];
                var job_city = job_info_list[3];
                var job_edcation = job_info_list[4];
                var job_work_experience = job_info_list[5];
                var job_tags = job_info_list[6];
                var job_company_name = job_info_list[7];
                var job_company_scale = job_info_list[8];
                var job_company_field = job_info_list[9];
                var job_company_type = job_info_list[10];
                var job_company_benefits = job_info_list[11];
                var job_detail_url = job_info_list[12];
                var job_district = job_info_list[13];
                var job_zhaopingren = '';
                var job_zhaopingren_pos = '';

                var str =
                    '<li>' +
                    '<div class="job-primary">' +
                    '   <div class="info-primary">' +
                    '       <div class="primary-wrapper">' +
                    '           <div class="primary-box" href="#">' +
                    '               <div class="job-title>">' +
                    '                   <span class="job-name" href="#"><a href="#">'+ job_position + '</a></span>' +
                    '                   <span class="job-area-wrapper"><span>['+ job_city + '·'+ job_district + ']</span></span>' +
                    '                   <span class="job-pub-time"></span>' +
                    '               </div>' +
                    '               <div class="job-limit clear-fix">' +
                    '                   <span class="red">' + job_salary + '</span>' +
                    '                   <p>' +
                                            job_work_experience +
                    '                       <em class="vline"></em>' +
                                            job_edcation +
                    '                   </p>' +
                    '                   <div class="info-publis">' +
                    // '                       <h3 class="name"><img class="icon-chat" src="#">' +
                    //                             job_zhaopingren +
                    // '                       <em class="vline"></em>' +
                    //                             job_zhaopingren_pos +
                    // '                       </h3>' +
                    '                   </div>' +
                    '               </div>' +
                    '               <div class="info-detail"></div>' +
                    '               </div>' +
                    '           </div>' +
                    '       <div class="info-company">' +
                    '           <div class="company-text">' +
                    '               <h3 class="name"><a href="#">' + job_company_name + '</a>' +
                    '               </h3>' +
                    '               <p>' +
                    '                   <a href="#">' + job_company_field + '</a>' +
                    '                   <em class="vline"></em>' +
                                        job_company_type +
                    '                   <em class="vline"></em>' +
                                        job_company_scale +
                    '               </p>' +
                    '           </div>' +
                    '           <a href="#"></a>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div class="info-append clear-fix">' +
                    '       <div class="tags">' +
                    '           <span class="tag-item">' + job_tags +'</span>' +
                    '       </div>' +
                    '       <div class="info-desc">' +
                                job_company_benefits +
                    '       </div>' +
                    '   </div>' +
                    '</div>' +
                    '</li>';

                HTML += str;
            }
            oUl.innerHTML = HTML;
        }
        
        // 修改页面跳转pager_container
        function fnRefleshPagerContainer(jumpPage) {
            // 跳转页显示逻辑，显示当前页及前后两页
            // 假设最大页为30：
            // 当前页为1，显示  [ 1 2 3 ... 30 ]
            // 当前页为2，显示  [ 1 2 3 4 ... 30 ]
            // 当前页为3，显示  [ 1 2 3 4 5 ... 30 ]
            // 当前页为5，显示  [ 1 ... 3 4 5 6 7  ... 30 ]
            // 当前页为20，显示 [ 1 ... 18 19 20 21 22 ... 30 ]
            // 当前页为30，显示 [ 1 ... 28 29 30 ]
            jumpPage = parseInt(jumpPage);
            totalPage = parseInt(document.getElementById("total_page_num").innerText);

            var HTML = '';


            // 上一页按钮
            if(jumpPage == 1){
                HTML += '<span action="prev" class="pager_prev_disabled">上一页</span>';
            }
            else{
                HTML += '<span action="prev" onclick="fnPrevPage()">上一页</span>';
            }

            // 当前页的前两页
            if(jumpPage - 2 > 1){
                HTML += '<span page="' + 1 + '" class="pager_not_current" onclick="fnJumpPage(1)">' + 1 + '</span>...';
            }
            for(var i = jumpPage - 2; i <= jumpPage - 1; ++i){
                if (i < 1){
                    continue;
                }
                HTML += '<span page="' + i + '" class="pager_not_current" onclick="fnJumpPage(' + i + ')">' + i + '</span>';
            }

            // 当前页
            HTML += '<span page="' + jumpPage + '" class="pager_is_current" onclick="fnJumpPage(' + jumpPage + ')">' + jumpPage + '</span>';

            // 当前页的后两页
            for(var i = jumpPage + 1; i <= totalPage && i <= jumpPage + 2; ++i){
                HTML += '<span page="' + i + '" class="pager_not_current" onclick="fnJumpPage(' + i + ')">' + i + '</span>';
            }
            if(jumpPage + 2 < totalPage){
                HTML += '...<span page="' + totalPage + '" class="pager_not_current" onclick="fnJumpPage(' + totalPage + ')">' + totalPage + '</span>';
            }

            // 下一页按钮
            if(jumpPage != totalPage){
                HTML += '<span action="next" onclick="fnNextPage()">下一页</span>';
            }
            else{
                HTML += '<span action="next" class="pager_next_disabled">下一页</span>';
            }


            var oPagerDiv = document.getElementsByClassName("pager_container");
            oPagerDiv[0].innerHTML = HTML;
        }

        function fnMakePostForm() {
            // 获取表单
            var oForm = document.getElementById("query");
            // 添加表单值
            oForm.innerHTML += '<input type="hidden" name="page" value="1">';
            oForm.innerHTML += '<input type="hidden" name="num" value="15">';
        }

        function fnMakeAnalyseFigure() {
            var oD = document.getElementById("d");
            var oT = document.getElementById("t");
            var oK = document.getElementById("keyword");

            var oWordCloud = document.getElementById("wordcloud");
            var oSalary = document.getElementById("salary");
            var oCompanyScale = document.getElementById("company_scale");
            var oCompanyType = document.getElementById("company_type");
            var oEducation = document.getElementById("education");
            var oWorkExperience = document.getElementById("work_experience");

            imgUrl = "/static/images/" + oD.innerText + "/" + oT.innerText + "/" + oK.innerText + "/";
            fnGetFig(imgUrl + "wordcloud.png", oWordCloud);
            fnGetFig(imgUrl + "salary.png", oSalary);
            fnGetFig(imgUrl + "company_scale.png", oCompanyScale);
            fnGetFig(imgUrl + "company_type.png", oCompanyType);
            fnGetFig(imgUrl + "education.png", oEducation);
            fnGetFig(imgUrl + "work_experience.png", oWorkExperience);

        }

        // Ajax获取加载图片
        function fnGetFig(url, oImg) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "blob";
            xhr.onload = function () {
                if (this.status == 200) {
                    var blob = this.response;
                    // 加载图片，并更改样式
                    oImg.src = window.URL.createObjectURL(blob);
                    oImg.style.width = "320px";
                }
            };
            xhr.send(); // 发送请求
        }