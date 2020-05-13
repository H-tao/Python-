function loadCss(e) {
    var t = document.createElement("link");
    t.type = "text/css", t.rel = "stylesheet", t.href = e, document.getElementsByTagName("head")[0].appendChild(t)
}

function seriesLoadScripts(e, t) {
    if ("object" != typeof e) var e = [e];
    var i = document.getElementsByTagName("head").item(0) || document.documentElement, n = new Array, s = e.length - 1,
        a = function (o) {
            n[o] = document.createElement("script"), n[o].setAttribute("type", "text/javascript"), n[o].setAttribute("charset", "UTF-8"), n[o].onload = n[o].onreadystatechange = function () {
                this.onload = this.onreadystatechange = null, this.parentNode.removeChild(this), o != s ? a(o + 1) : "function" == typeof t && t()
            }, n[o].setAttribute("src", e[o]), i.appendChild(n[o])
        };
    a(0)
}

function isVisiable(e) {
    if (e) {
        var t = e.getBoundingClientRect();
        return t.top > 0 && window.innerHeight - t.top > 0 || t.top <= 0 && t.bottom >= 0
    }
}

function isEmptyObject(e) {
    var t;
    for (t in e) return !1;
    return !0
}

function getQueryString(e) {
    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"), i = window.location.search.substr(1).match(t);
    return null != i ? unescape(i[2]) : null
}

function getQueryObject() {
    var e = location.search, t = {};
    if (-1 != e.indexOf("?")) {
        var i = e.substr(1);
        strs = i.split("&");
        for (var n = 0; n < strs.length; n++) t[strs[n].split("=")[0]] = unescape(strs[n].split("=")[1])
    }
    return t
}

function getQueryArray() {
    var e = location.search, t = [];
    if (-1 != e.indexOf("?")) {
        t = e.substr(1).split("&")
    }
    return t
}

function localStorageInstance(e, t) {
    try {
        if (window.localStorage) if ("" === t) window.localStorage.removeItem(e); else {
            if (0 != t && !t) return window.localStorage[e];
            window.localStorage[e] = t
        } else if ("" === t) cookie.clearcookie(e); else {
            if (0 != t && !t) return cookie.get(e);
            cookie.set(e, t, 1e4)
        }
    } catch (e) {
    }
}

function getUuid(e, t) {
    var i, n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), s = [];
    if (t = t || n.length, e) for (i = 0; i < e; i++) s[i] = n[0 | Math.random() * t]; else {
        var a;
        for (s[8] = s[13] = s[18] = s[23] = "-", s[14] = "4", i = 0; i < 36; i++) s[i] || (a = 0 | 16 * Math.random(), s[i] = n[19 == i ? 3 & a | 8 : a])
    }
    return s.join("")
}

function filterXss(e) {
    return e ? e.replace(/\</g, "&lt;").replace(/\>/g, "&gt;") : e
}

function bindObjOutsiteClick(e, t, i) {
    var n = "doc_" + (new Date).getTime(), s = "doc_" + (new Date).getTime() + 1;
    e.attr("class") && e.attr("class", e.attr("class").replace(/doc_(\d+)/g, "")), e.addClass(n), t && (t.attr("class", t.attr("class").replace(/doc_(\d+)/g, "")), t.addClass(s)), setTimeout(function () {
        $(document).bind("click", function (t) {
            $(t.target).hasClass(s) || $(t.target).parents(".showErrorBox").length || 0 == $(t.target).parents("." + n).length && (e.hide(), "function" == typeof i && i(), $(document).unbind("click"))
        })
    }, 200)
}

function unbindObjOutsiteClick(e, t) {
    "function" == typeof t && t(), $(document).unbind("click")
}

function Utemplate(e, t) {
    function i(e, t) {
        return a += t ? e.match(s) ? e + "\n" : "arr.push(" + e + ");\n" : "" != e ? "arr.push('" + e.replace(/"/g, '\\"') + "');\n" : "", arguments.callee
    }

    for (var n = /<%([^%>]+)?%>/g, s = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, a = "var arr = []; \n", o = 0; match = n.exec(e);) i(e.slice(o, match.index))(match[1], !0), o = match.index + match[0].length;
    return i(e.substr(o, e.length - o)), a += "return arr.join('')", new Function(a.replace(/[\r\t\n]/g, "")).apply(t)
}

function Utemplate(e, t) {
    function i(e, t) {
        return a += t ? e.match(s) ? e + "\n" : "arr.push(" + e + ");\n" : "" != e ? "arr.push('" + e.replace(/"/g, '\\"') + "');\n" : "", arguments.callee
    }

    for (var n = /<%([^%>]+)?%>/g, s = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, a = "var arr = []; \n", o = 0; match = n.exec(e);) i(e.slice(o, match.index))(match[1], !0), o = match.index + match[0].length;
    return i(e.substr(o, e.length - o)), a += "return arr.join('')", new Function(a.replace(/[\r\t\n]/g, "")).apply(t)
}

function placeholderSupport() {
    return "placeholder" in document.createElement("input")
}

function loadGatewayScript(e, t, i) {
    function n(i) {
        a[i] = document.createElement("script"), a[i].setAttribute("type", "text/javascript"), a[i].setAttribute("charset", "UTF-8"), a[i].onload = a[i].onreadystatechange = function () {
            this.onload = this.onreadystatechange = null, this.parentNode.removeChild(this), i != o ? n(i + 1) : "function" == typeof t && t()
        }, a[i].setAttribute("src", e[i]), "IFRAME" != s.tagName ? s.appendChild(a[i]) : s.contentDocument.body ? s.contentDocument.body.appendChild(a[i]) : s.contentDocument.documentElement.appendChild(a[i])
    }

    "object" != typeof e && (e = [e]);
    var s = i || document.getElementsByTagName("head").item(0) || document.documentElement, a = new Array,
        o = e.length - 1;
    n(0)
}

function ajaxGetaway(e) {
    if ([31, 32, 35, 36, 37].indexOf(e) >= 0) switch (e) {
        case 31:
            window.location.href = "/antispam/forbidden/page?code=31";
            break;
        case 32:
            window.location.href = "/antispam/forbidden/page?code=32";
            break;
        case 35:
        case 36:
            window.location.href = "/wapi/zpAntispam/verify/sliderNew?callbackUrl=" + encodeURIComponent(window.location.href);
            break;
        case 37:
            zpData && (window.location.href = "/web/common/security-check.html?seed=" + encodeURIComponent(data.seed) + "&name=" + encodeURIComponent(data.name) + "&ts=" + encodeURIComponent(data.ts) + "&callbackUrl=" + encodeURIComponent(window.location.href))
    } else setGatewayCookie()
}

function EventManger() {
    var e = {};
    this.subscribe = function (t, i) {
        void 0 === e[t] && (e[t] = []), e[t].push({context: this, callback: i})
    }, this.publish = function (t) {
        if (void 0 === e[t]) return !1;
        for (var i = Array.prototype.slice.call(arguments, 1), n = 0, s = e[t].length; n < s; n++) {
            var a = e[t][n];
            a.callback.apply(a.context, i)
        }
    }
}

function getsec(e) {
    var t = 1 * e.substring(1, e.length), i = e.substring(0, 1);
    return "s" == i ? 1e3 * t : "h" == i ? 60 * t * 60 * 1e3 : "d" == i ? 24 * t * 60 * 60 * 1e3 : void 0
}

var DEBUG = !0, UA = window.navigator.userAgent, isIE, isWebkit, isZpdesk, ipcRenderer, isTouch = !1;
(UA.indexOf("Edge/") > -1 || UA.indexOf("MSIE ") > -1 || UA.indexOf("Trident/") > -1) && (isIE = !0);
var supportsCalcVh = !!window.CSS && CSS.supports("height", "calc(100vh - 0px)");
if (UA.indexOf("ZhipinDesktop/") > -1 && (isZpdesk = !0, ipcRenderer = window.top.ipcRenderer), isZpdesk && ipcRenderer.send("messageLogout"), "ontouchstart" in window) {
    var isTouch = !0;
    document.addEventListener("touchstart", function () {
    }, !1)
}
var loadScript = function (e) {
    var t, i;
    if (e && "" != e) for (t = e.split(","), i = 0; i < t.length; i++) $.getScript(t[i])
};
$(function () {
    "undefined" != typeof loginjson && 1 == loginjson.act && ($(".sign-register .form-btn .btn").html("" == loginjson.btnValue ? "鐧诲綍" : loginjson.btnValue), $(".sign-register .sign-tab").hide(), $(".sign-register .title").html(loginjson.titleValue))
});
var Cookie = {
    get: function (e) {
        var t, i = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
        return (t = document.cookie.match(i)) ? unescape(t[2]) : null
    }, getObj: function () {
        for (var e = document.cookie.split(";"), t = "{", i = 0; i < e.length; i++) {
            var n = e[i].split("=");
            t += '"' + n[0].replace(/\s+/g, "") + '":"' + decodeURIComponent(n[1]) + '",'
        }
        return t = t.slice(0, -1), t += "}", JSON.parse(t)
    }, set: function (e, t, i, n, s) {
        var a = e + "=" + encodeURIComponent(t);
        if (i) {
            a += ";expires=" + new Date(i).toGMTString()
        }
        a = n ? a + ";domain=" + n : a, a = s ? a + ";path=" + s : a, document.cookie = a
    }, del: function (e, t, i) {
        var n = new Date("1970/01/01"), s = e + "=null;expires=" + n.toGMTString();
        s = t ? s + ";domain=" + t : s, s = i ? s + ";path=" + i : s, document.cookie = s
    }
}, cookie = {
    get: function (e) {
        var t, i = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
        return (t = document.cookie.match(i)) ? unescape(t[2]) : null
    }, set: function (e, t, i) {
        if (i) {
            var n = new Date;
            n.setMinutes(i), document.cookie = e + "=" + encodeURIComponent(t) + ";expires=" + n.toGMTString()
        } else document.cookie = e + "=" + encodeURIComponent(t)
    }, clearcookie: function (e, t, i) {
        cookie.get(e) && (document.cookie = e + "=" + (t ? ";path=" + t : "") + (i ? ";domain=" + i : "") + ";expires=Thu,01-Jan-1970 00:00:01 GMT")
    }
}, PAGE_ACTIVITY = !0;
!function () {
    function e(e) {
        var i = {focus: !0, focusin: !0, pageshow: !0, blur: !1, focusout: !1, pagehide: !1};
        e = e || window.event, PAGE_ACTIVITY = e.type in i ? i[e.type] : !this[t]
    }

    var t = "hidden";
    t in document ? document.addEventListener("visibilitychange", e) : (t = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", e) : (t = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", e) : (t = "msHidden") in document ? document.addEventListener("msvisibilitychange", e) : "onfocusin" in document ? document.onfocusin = document.onfocusout = e : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = e
}(), window.INTERFACE_URLS = {
    homeUrl: "/",
    logoutUrl: "/logout/",
    chatProtoUrl: "/v2/web/boss/js/module/chat.proto"
}, function () {
    $(".nav-figure").length && ($(".standard").length || ($(".user-nav ul a").eq(0).attr("disabled", "disabled"), $(".user-nav ul a").eq(0).on("click", function (e) {
        alert("璇峰崌绾ф偍鐨勬祻瑙堝櫒鎵嶈兘浣跨敤鑱婂ぉ鍔熻兘"), e.preventDefault()
    })))
}();
var KZ = KZ || {};
KZ = {
    form: {
        Prompt: function (e, t) {
            var i = $('<div class="kz_tishi" style="position:absolute;z-index:9999;"/>').html(e);
            0 == $(".kz_tishi").length && (i.appendTo("body").delay(1500).fadeOut(500, function () {
                $(this).remove()
            }), i.css({
                left: 1 == t ? ($(window).width() - i.outerWidth()) / 2 : 0,
                top: 1 == t ? ($(window).height() - i.outerHeight()) / 2 : 0,
                width: 1 == t ? "auto" : "100%",
                position: "fixed"
            }))
        }
    }, pageLock: {
        show: function (e, t, i, n, s) {
            var a;
            if (a = $(".guide").length ? $(window.document) : $(window.parent.document), 0 == a.find(t.selector).length) {
                a.width(), $(t).outerWidth(), $(window).height(), $(t).outerHeight()
            } else {
                a.width(), a.find(t.selector).outerWidth(), $(window).height(), a.find(t.selector).outerHeight()
            }
            if (!a.find("#lockpage").length > 0) {
                $("<div id='lockpage'/>").css({
                    position: "fixed",
                    zIndex: e || 20,
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    background: "#000",
                    opacity: .8
                }).appendTo(a.find("body"))
            }
            a.find("#lockpage").css("height", $(document).height() + "px"), 0 == a.find(t.selector).length ? ($(t).appendTo(a.find("body")), a.find(t).css({
                position: "fixed",
                zIndex: e + 1,
                left: "50%",
                top: "50%",
                "margin-left": "-" + $(t).outerWidth() / 2 + "px",
                "margin-top": "-" + $(t).outerHeight() / 2 + "px",
                display: "block"
            })) : a.find(t.selector).css({
                position: "fixed",
                zIndex: e + 1,
                left: "50%",
                top: "50%",
                "margin-left": "-" + $(t.selector).outerWidth() / 2 + "px",
                "margin-top": "-" + $(t.selector).outerHeight() / 2 + "px",
                display: "block"
            }), KZ.pageLock.hide(i, t, s), "function" == typeof n && n()
        }, hide: function (e, t, i) {
            var n;
            n = $(".guide").length ? $(window.document) : $(window.parent.document), n.find(e).click(function (e) {
                void 0 === i && n.find(t).appendTo("body"), $(t).hide(), n.find("#lockpage").remove(), e.preventDefault()
            })
        }, runHide: function (e) {
            var t;
            t = $(".guide").length ? $(window.document) : $(window.parent.document), t.find(e.selector).length > 0 ? setTimeout(function () {
                t.find(e).remove()
            }, 100) : t.find(e).hide(), t.find("#lockpage").remove()
        }, runRemove: function (e) {
            var t;
            t = $(".guide").length ? $(window.document) : $(window.parent.document), t.find(e).appendTo("body"), $(e).hide(), t.find("#lockpage").remove()
        }
    }
};
var explorer = window.navigator.userAgent;
if (explorer.indexOf("MSIE") >= 0) {
    var b_version = navigator.appVersion, version = b_version.split(";");
    window.IE = parseInt(version[1].replace(/[^\d\.]/g, "")), $("html").addClass("ie")
} else window.IE = 0;
window.IE > 0 && window.IE < 9 && !Array.prototype.indexOf && (Array.prototype.indexOf = function (e) {
    for (var t = 0; t < this.length; t++) if (e === this[t]) return t;
    return -1
}), $(function () {
    $.extend({
        initUploadPortrait: function (e) {
            var t = $.extend({
                title: "涓婁紶鐓х墖",
                url: "uploadURL=/companyugc/upload/logo.json?c=uploadPortrit&amp;jsCallback=uploadOk",
                callback: null
            }, e), i = "";
            i += '<section class="p_dialog uploadPortrait"><div class="dialog_con"><a href="#" rel="nofollow" class="dialog_close"></a><div id="uploadLogoFlash"><h3>' + t.title + '</h3><object id="FlashID" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="550" height="440"><param name="movie" value="/v2/web/geek/images/portrait.swf" /><param name="quality" value="high" /><param name="wmode" value="transparent" /><param name="flashVars" value="' + t.url + '" />\x3c!--[if !IE]>--\x3e<object type="application/x-shockwave-flash" data="/v2/web/geek/images/portrait.swf" width="550" height="440">\x3c!--<![endif]--\x3e<param name="quality" value="high" /><param name="wmode" value="transparent" /><param name="flashVars" value="' + t.url + '" />\x3c!--[if !IE]>--\x3e</object>\x3c!--<![endif]--\x3e</object></div></div></section>', $(".p_dialog").length <= 0 && $(i).appendTo("body"), KZ.pageLock.show(1e3, ".uploadPortrait", ".uploadPortrait .dialog_close"), top.uploadOk = function (e) {
                var i = "string" == typeof e ? $.parseJSON(e) : e;
                if (i && 1 == i.rescode) {
                    var n = i.url || [];
                    t.callback && (t.callback(n, i), KZ.pageLock.runHide(".uploadPortrait"))
                } else alert("鍥剧墖涓婁紶澶辫触")
            }
        }
    })
});
var crop = {
    cWidth: 350, cHeight: 350, cR: 175, show: function (e) {
        this.opts = e, crop.uploadEl = e.element, this.inited || (this.bindFileInput(e.defaultAvatarHtml), this.inited = !0, this.selected = !1), e.title && this.html.find(".hd span").text(e.title), KZ.pageLock.show(1e3, ".avatar_layer_html5", ".avatar_layer_html5 .close")
    }, hide: function () {
        this.html.find(".close").click()
    }, bindFileInput: function (e) {
        var t = this;
        this.html || (this.html = e || $('<div class="avatar_layer avatar_layer_html5">\t\t\t\t\t\t\t\t<div class="hd"><span/><i class="close"/></div>\t\t\t\t\t\t\t\t<div class="main">\t\t\t\t\t\t\t\t\t<div class="selectpic">\t\t\t\t\t\t\t\t\t\t<div class="sbox">\t\t\t\t\t\t\t\t\t\t\t<a class="btns" href="#">閫夋嫨鍥剧墖</a>\t\t\t\t\t\t\t\t\t\t\t<input type="file" class="selectfile">\t\t\t\t\t\t\t\t\t\t\t<p>鍙敮鎸丣PG銆丳NG锛屽ぇ灏忎笉瓒呰繃2M</p>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t<div class="editbox">\t\t\t\t\t\t\t\t\t\t\t<canvas></canvas>\t\t\t\t\t\t\t\t\t\t\t<div class="pop"><i></i></div>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="layer_btns">\t\t\t\t\t\t\t\t\t\t<span class="change">鏇存崲鍥剧墖<input type="file" class="selectfile"></span>\t\t\t\t\t\t\t\t\t\t<a class="cancel close" href="#">鍙� 娑�</a>\t\t\t\t\t\t\t\t\t\t<a class="sure"  href="#" ka="avatar_layer_html5_button_sure">纭� 瀹�</a>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>'), this.html.appendTo("body"), e ? (t.html.find(".img-box").on("click", function () {
            $(this).addClass("img-checked").siblings().removeClass("img-checked")
        }), this.html.find(".sure").on("click", function (e) {
            if (t.selected) "function" == typeof t.opts.callback && crop.getCropData(t.opts.callback), t.hide(), t.clear(), e.preventDefault(); else {
                if (!t.html.find(".img-checked").length) return alert("璇烽€夋嫨鍥剧墖"), !1;
                $.ajax({
                    url: $("[upload-base64-url]").attr("upload-base64-url"),
                    type: "post",
                    data: {headImg: t.html.find(".img-checked img").attr("data-id")},
                    dataType: "json",
                    success: function (i) {
                        if (i.rescode) {
                            var n = $(".avatar_box .avatar img");
                            n.attr("src", i.url[0]), n.closest("dd").find("input:hidden[name=tiny]").val(i.url[0]), n.closest("dd").find("input:hidden[name=large]").val(i.url[1]), t.hide(), t.clear(), e.preventDefault(), crop.uploadEl.find(".tip-text").remove(), "function" == typeof t.opts.sysImgCallback && t.opts.sysImgCallback(i.url)
                        } else alert("鍥剧墖淇濆瓨澶辫触")
                    }
                })
            }
        })) : this.html.find(".sure").on("click", function (e) {
            if (!t.selected) return alert("璇烽€夋嫨鍥剧墖"), !1;
            "function" == typeof t.opts.callback && crop.getCropData(t.opts.callback), t.hide(), t.clear(), e.preventDefault()
        }), this.html.find(".cancel").bind("click", function (e) {
            t.clear(), e.preventDefault()
        })), this.html.find(".selectfile,.layer_btns .selectfile").change(function (t) {
            if (t.target.files.length) {
                e && crop.uploadEl.find(".tip-text").remove();
                var i = t.target.files[0];
                if (!/image\/\w+/.test(i.type)) return alert("璇风‘淇濇枃浠朵负鍥惧儚绫诲瀷"), !1;
                if (window.FileReader) {
                    var n = new FileReader;
                    n.onloadstart = function (e) {
                    }, n.onloadend = function (e) {
                        var t = new Image;
                        t.onload = function () {
                            crop.resetImg(t)
                        }, t.src = e.target.result
                    }, n.readAsDataURL(i)
                }
            }
        })
    }, clear: function () {
        this.editbox && (this.html.find(".selectfile").val(""), this.editbox.css({backgroundImage: "none"}).hide(), this.html.find(".selectpic").find(".sbox").show(), this.msk.clearRect(0, 0, this.cWidth, this.cHeight), this.html.find(".layer_btns .change").hide())
    }, resetImg: function (e) {
        this.selected = !0;
        var t = this, i = this.html.find(".selectpic").find(".sbox").hide().end().find(".editbox").show();
        this.html.find(".layer_btns .change").css("display", "inline-block"), this.editbox = i;
        var n = this.compress(e, 1);
        this.img = n, i.css({backgroundImage: "url(" + n + ")"}), this.circle = {
            x: this.cWidth / 2,
            y: this.cHeight / 2,
            r: 75
        }, this.popbox = i.find(".pop"), this.pop = i.find(".pop i"), this.popbox.css({
            left: this.circle.x - this.circle.r,
            top: this.circle.y - this.circle.r,
            width: 2 * this.circle.r,
            height: 2 * this.circle.r
        });
        t.html.find(".selectpic .editbox .pop .move-icon").length && t.html.find(".selectpic .editbox .pop .move-icon").remove(), t.html.find(".selectpic .editbox .pop").append('<div class="move-icon"></div>'), t.html.find(".selectpic .editbox .pop .move-icon").hide();
        t.html.find(".selectpic .editbox .pop i .scale-icon").length && t.html.find(".selectpic .editbox .pop i .scale-icon").remove(), t.html.find(".selectpic .editbox .pop i").append('<div class="scale-icon"></div>'), t.html.find(".selectpic .editbox .pop i .scale-icon").hide(), this.popbox.bind("mousedown", function (e) {
            var i = {x: crop.circle.x, y: crop.circle.y, r: crop.circle.r},
                n = {x: e.clientX, y: e.clientY, left: $(this).position().left, top: $(this).position().top};
            t.html.bind("mousemove", function (e) {
                var t = e.clientX - n.x, s = e.clientY - n.y;
                crop.circle.x = i.x + t, crop.circle.y = i.y + s, crop.popbox.css({
                    left: crop.circle.x - crop.circle.r,
                    top: crop.circle.y - crop.circle.r,
                    width: 2 * crop.circle.r,
                    height: 2 * crop.circle.r
                }), crop.draw(crop.circle)
            }), t.html.bind("mouseup", function (e) {
                crop.circle.x - crop.circle.r < 0 && (crop.circle.x = crop.circle.r), crop.circle.x + crop.circle.r > t.cWidth && (crop.circle.x = t.cWidth - crop.circle.r), crop.circle.y - crop.circle.r < 0 && (crop.circle.y = crop.circle.r), crop.circle.y + crop.circle.r > t.cHeight && (crop.circle.y = t.cHeight - crop.circle.r), crop.popbox.css({
                    left: crop.circle.x - crop.circle.r,
                    top: crop.circle.y - crop.circle.r,
                    width: 2 * crop.circle.r,
                    height: 2 * crop.circle.r
                }), crop.draw(crop.circle), t.html.unbind("mousemove mouseup")
            }), t.html.find(".selectpic .editbox .pop .move-icon").show()
        }), this.popbox.bind("mouseover", function (e) {
            t.html.find(".selectpic .editbox .pop .move-icon").show()
        }), this.popbox.bind("mouseleave", function (e) {
            t.html.find(".selectpic .editbox .pop .move-icon").hide()
        }), this.pop.bind("mouseenter", function () {
            return t.html.find(".selectpic .editbox .pop .move-icon").hide(), t.html.find(".selectpic .editbox .pop .scale-icon").show(), !1
        }), this.pop.bind("mouseleave", function () {
            return t.html.find(".selectpic .editbox .pop .scale-icon").hide(), t.html.find(".selectpic .editbox .pop .move-icon").hide(), !1
        }), this.pop.bind("mousedown", function (e) {
            var i = {x: crop.circle.x, y: crop.circle.y, r: crop.circle.r},
                n = {x: e.clientX, y: e.clientY, left: $(this).position().left, top: $(this).position().top};
            t.html.bind("mousemove", function (e) {
                var s = e.clientX - n.x, a = e.clientY - n.y, o = Math.max(s, a);
                crop.circle.r = i.r + o, crop.popbox.css({
                    left: crop.circle.x - crop.circle.r,
                    top: crop.circle.y - crop.circle.r,
                    width: 2 * crop.circle.r,
                    height: 2 * crop.circle.r
                }), crop.draw(crop.circle), t.html.find(".selectpic .editbox .pop .scale-icon").show(), t.html.find(".selectpic .editbox .pop .move-icon").hide()
            }), t.html.bind("mouseup", function () {
                crop.circle.r < 75 && (crop.circle.r = 75), crop.circle.r > t.cR && (crop.circle.r = t.cR), crop.circle.x - crop.circle.r < 0 && (crop.circle.x = crop.circle.r), crop.circle.x + crop.circle.r > t.cWidth && (crop.circle.x = t.cWidth - crop.circle.r), crop.circle.y - crop.circle.r < 0 && (crop.circle.y = crop.circle.r), crop.circle.y + crop.circle.r > t.cHeight && (crop.circle.y = t.cHeight - crop.circle.r), crop.popbox.css({
                    left: crop.circle.x - crop.circle.r,
                    top: crop.circle.y - crop.circle.r,
                    width: 2 * crop.circle.r,
                    height: 2 * crop.circle.r
                }), crop.draw(crop.circle), t.html.unbind("mousemove mouseup"), t.html.find(".selectpic .editbox .pop .scale-icon").hide(), t.html.find(".selectpic .editbox .pop .move-icon").css({
                    left: crop.circle.r - 15,
                    top: crop.circle.r - 15
                })
            }), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation()
        }), this.mask = this.html.find(".selectpic canvas").get(0), this.msk = this.mask.getContext("2d"), this.mask.width = this.cWidth, this.mask.height = this.cHeight, this.draw(this.circle)
    }, draw: function (e) {
        var t = this.msk;
        t.clearRect(0, 0, this.cWidth, this.cHeight), t.globalCompositeOperation = "source-over", t.beginPath(), t.fillStyle = "#000000", t.rect(0, 0, this.cWidth, this.cHeight), t.globalAlpha = .6, t.fill(), t.closePath(), t.globalCompositeOperation = "destination-out", t.beginPath(), t.fillStyle = "", t.arc(e.x, e.y, e.r, 0, 2 * Math.PI, !1), t.fill(), t.closePath()
    }, getCropData: function (e) {
        var t = this.circle, i = new Image;
        i.crossOrigin = "Anonymous", i.onload = function () {
            var n = document.createElement("canvas");
            n.width = 2 * t.r, n.height = 2 * t.r;
            var s = n.getContext("2d");
            s.clearRect(0, 0, n.width, n.height), s.fillStyle = "#fff", s.fillRect(0, 0, n.width, n.height), s.drawImage(i, -1 * (t.x - t.r), -1 * (t.y - t.r));
            var a = n.toDataURL("image/jpeg", 1);
            e(a)
        }, i.src = this.img
    }, compress: function (e, t) {
        var i = this.cWidth, n = this.cHeight;
        e.width > e.height ? (imageWidth = i, imageHeight = Math.round(n * (e.height / e.width))) : e.width < e.height ? (imageHeight = n, imageWidth = Math.round(i * (e.width / e.height))) : (imageWidth = i, imageHeight = n), t = imageWidth / e.width;
        var s = document.createElement("canvas");
        s.width = i, s.height = n;
        var a = s.getContext("2d");
        return a.clearRect(0, 0, s.width, s.height), imageWidth < s.width ? a.drawImage(e, (s.width - imageWidth) / 2, 0, imageWidth, imageHeight) : a.drawImage(e, 0, (s.height - imageHeight) / 2, imageWidth, imageHeight), s.toDataURL("image/png", t)
    }
};
if (function (e) {
    function t() {
        return new Date(Date.UTC.apply(Date, arguments))
    }

    var i = function (t, i) {
        var a = this;
        this.element = e(t), this.container = i.container || "body", this.inDate = i.inDate || [], this.language = i.language || this.element.data("date-language") || "en", this.language = this.language in n ? this.language : "en", this.isRTL = n[this.language].rtl || !1, this.formatType = i.formatType || this.element.data("format-type") || "standard", this.format = s.parseFormat(i.format || this.element.data("date-format") || n[this.language].format || s.getDefaultFormat(this.formatType, "input"), this.formatType), this.isInline = !1, this.isVisible = !1, this.isInput = this.element.is("input"), this.bootcssVer = this.isInput ? this.element.is(".form-control") ? 3 : 2 : this.bootcssVer = this.element.is(".input-group") ? 3 : 2, this.component = !!this.element.is(".date") && (3 == this.bootcssVer ? this.element.find(".input-group-addon .glyphicon-th, .input-group-addon .glyphicon-time, .input-group-addon .glyphicon-calendar").parent() : this.element.find(".add-on .icon-th, .add-on .icon-time, .add-on .icon-calendar").parent()), this.componentReset = !!this.element.is(".date") && (3 == this.bootcssVer ? this.element.find(".input-group-addon .glyphicon-remove").parent() : this.element.find(".add-on .icon-remove").parent()), this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.linkField = i.linkField || this.element.data("link-field") || !1, this.linkFormat = s.parseFormat(i.linkFormat || this.element.data("link-format") || s.getDefaultFormat(this.formatType, "link"), this.formatType), this.minuteStep = i.minuteStep || this.element.data("minute-step") || 5, this.pickerPosition = i.pickerPosition || this.element.data("picker-position") || "bottom-right", this.showMeridian = i.showMeridian || this.element.data("show-meridian") || !1, this.initialDate = i.initialDate || new Date, this.minLimitYear = i.minLimitYear || !1, this._attachEvents(), this.formatViewType = "datetime", "formatViewType" in i ? this.formatViewType = i.formatViewType : "formatViewType" in this.element.data() && (this.formatViewType = this.element.data("formatViewType")), this.minView = 0, "minView" in i ? this.minView = i.minView : "minView" in this.element.data() && (this.minView = this.element.data("min-view")), this.minView = s.convertViewMode(this.minView), this.maxView = s.modes.length - 1, "maxView" in i ? this.maxView = i.maxView : "maxView" in this.element.data() && (this.maxView = this.element.data("max-view")), this.maxView = s.convertViewMode(this.maxView), this.wheelViewModeNavigation = !1, "wheelViewModeNavigation" in i ? this.wheelViewModeNavigation = i.wheelViewModeNavigation : "wheelViewModeNavigation" in this.element.data() && (this.wheelViewModeNavigation = this.element.data("view-mode-wheel-navigation")), this.wheelViewModeNavigationInverseDirection = !1, "wheelViewModeNavigationInverseDirection" in i ? this.wheelViewModeNavigationInverseDirection = i.wheelViewModeNavigationInverseDirection : "wheelViewModeNavigationInverseDirection" in this.element.data() && (this.wheelViewModeNavigationInverseDirection = this.element.data("view-mode-wheel-navigation-inverse-dir")), this.wheelViewModeNavigationDelay = 100, "wheelViewModeNavigationDelay" in i ? this.wheelViewModeNavigationDelay = i.wheelViewModeNavigationDelay : "wheelViewModeNavigationDelay" in this.element.data() && (this.wheelViewModeNavigationDelay = this.element.data("view-mode-wheel-navigation-delay")), this.startViewMode = 2, "startView" in i ? this.startViewMode = i.startView : "startView" in this.element.data() && (this.startViewMode = this.element.data("start-view")), this.startViewMode = s.convertViewMode(this.startViewMode), this.viewMode = this.startViewMode, this.viewSelect = this.minView, "viewSelect" in i ? this.viewSelect = i.viewSelect : "viewSelect" in this.element.data() && (this.viewSelect = this.element.data("view-select")), this.viewSelect = s.convertViewMode(this.viewSelect), this.forceParse = !0, "forceParse" in i ? this.forceParse = i.forceParse : "dateForceParse" in this.element.data() && (this.forceParse = this.element.data("date-force-parse")), this.picker = e(3 == this.bootcssVer ? s.templateV3 : s.template).appendTo(this.isInline ? this.element : this.container).on({
            click: e.proxy(this.click, this),
            mousedown: e.proxy(this.mousedown, this)
        }), this.wheelViewModeNavigation && (e.fn.mousewheel ? this.picker.on({mousewheel: e.proxy(this.mousewheel, this)}) : console.log("Mouse Wheel event is not supported. Please include the jQuery Mouse Wheel plugin before enabling this option")), this.isInline ? this.picker.addClass("datetimepicker-inline") : this.picker.addClass("datetimepicker-dropdown-" + this.pickerPosition), this.isRTL && (this.picker.addClass("datetimepicker-rtl"), 3 == this.bootcssVer ? this.picker.find(".prev span, .next span").toggleClass("glyphicon-arrow-left glyphicon-arrow-right") : this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")), this.minLimitYear && this.picker.addClass("date-showminyear"), e(document).on("click", function (t) {
            0 === e(t.target).closest(".datetimepicker").length && a.hide()
        }), this.autoclose = !1, "autoclose" in i ? this.autoclose = i.autoclose : "dateAutoclose" in this.element.data() && (this.autoclose = this.element.data("date-autoclose")), this.keyboardNavigation = !0, "keyboardNavigation" in i ? this.keyboardNavigation = i.keyboardNavigation : "dateKeyboardNavigation" in this.element.data() && (this.keyboardNavigation = this.element.data("date-keyboard-navigation")), this.todayBtn = i.todayBtn || this.element.data("date-today-btn") || !1, this.todayHighlight = i.todayHighlight || this.element.data("date-today-highlight") || !1, this.weekStart = (i.weekStart || this.element.data("date-weekstart") || n[this.language].weekStart || 0) % 7, this.weekEnd = (this.weekStart + 6) % 7, this.startDate = -1 / 0, this.endDate = 1 / 0, this.daysOfWeekDisabled = [], this.setStartDate(i.startDate || this.element.data("date-startdate")), this.setEndDate(i.endDate || this.element.data("date-enddate")), this.setDaysOfWeekDisabled(i.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled")), this.fillDow(), this.fillMonths(), this.update(), this.showMode(), this.timer = null, this.isInline && this.show()
    };
    i.prototype = {
        constructor: i, _events: [], _attachEvents: function () {
            this._detachEvents(), this.isInput ? this._events = [[this.element, {
                click: e.proxy(this.show, this),
                keyup: e.proxy(this.update, this),
                keydown: e.proxy(this.keydown, this)
            }]] : this.component && this.hasInput ? (this._events = [[this.element.find("input"), {
                click: e.proxy(this.show, this),
                keyup: e.proxy(this.update, this),
                keydown: e.proxy(this.keydown, this)
            }], [this.component, {click: e.proxy(this.show, this)}]], this.componentReset && this._events.push([this.componentReset, {click: e.proxy(this.reset, this)}])) : this.element.is("div") ? this.isInline = !0 : this._events = [[this.element, {click: e.proxy(this.show, this)}]];
            for (var t, i, n = 0; n < this._events.length; n++) t = this._events[n][0], i = this._events[n][1], t.on(i)
        }, _detachEvents: function () {
            for (var e, t, i = 0; i < this._events.length; i++) e = this._events[i][0], t = this._events[i][1], e.off(t);
            this._events = []
        }, show: function (t) {
            if (this.picker.is(":visible")) return void this.picker.hide();
            e(".datetimepicker").hide(), e(".dropdown-select-open").removeClass("dropdown-select-open"), e(".dropdown-menu-open").removeClass("dropdown-menu-open"), this.element.closest(".dropdown-select").addClass("dropdown-select-open"), this.element.closest(".dropdown-wrap").addClass("dropdown-menu-open"), this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.forceParse && this.update(), this.place(), e(window).on("resize", e.proxy(this.place, this)), t && (t.stopPropagation(), t.preventDefault()), this.isVisible = !0, this.element.trigger({
                type: "show",
                date: this.date
            })
        }, hide: function (t) {
            this.isVisible && (this.isInline || (this.element.closest(".dropdown-select").removeClass("dropdown-select-open"), this.picker.hide(), e(window).off("resize", this.place), this.viewMode = this.startViewMode, this.showMode(), this.isInput || e(document).off("mousedown", this.hide), this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this.isVisible = !1, this.element.trigger({
                type: "hide",
                date: this.date
            })))
        }, remove: function () {
            this._detachEvents(), this.picker.remove(), delete this.picker, delete this.element.data().datetimepicker
        }, getDate: function () {
            var e = this.getUTCDate();
            return new Date(e.getTime() + 6e4 * e.getTimezoneOffset())
        }, getUTCDate: function () {
            return this.date
        }, setDate: function (e) {
            this.setUTCDate(new Date(e.getTime() - 6e4 * e.getTimezoneOffset()))
        }, setUTCDate: function (e) {
            e >= this.startDate && e <= this.endDate ? (this.date = e, this.setValue(), this.viewDate = this.date, this.fill()) : this.element.trigger({
                type: "outOfRange",
                date: e,
                startDate: this.startDate,
                endDate: this.endDate
            })
        }, setFormat: function (e) {
            this.format = s.parseFormat(e, this.formatType);
            var t;
            this.isInput ? t = this.element : this.component && (t = this.element.find("input")), t && t.val() && this.setValue()
        }, setValue: function () {
            var t = this.getFormattedDate();
            this.isInput ? this.element.val(t) : (this.component && this.element.find("input").val(t), this.element.data("date", t)), this.linkField && e("#" + this.linkField).val(this.getFormattedDate(this.linkFormat))
        }, getFormattedDate: function (e) {
            return void 0 == e && (e = this.format), s.formatDate(this.date, e, this.language, this.formatType)
        }, setStartDate: function (e) {
            this.startDate = e || -1 / 0, this.startDate !== -1 / 0 && (this.startDate = s.parseDate(this.startDate, this.format, this.language, this.formatType)), this.update(), this.updateNavArrows()
        }, setEndDate: function (e) {
            this.endDate = e || 1 / 0, this.endDate !== 1 / 0 && (this.endDate = s.parseDate(this.endDate, this.format, this.language, this.formatType)), this.update(), this.updateNavArrows()
        }, setDaysOfWeekDisabled: function (t) {
            this.daysOfWeekDisabled = t || [], e.isArray(this.daysOfWeekDisabled) || (this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)), this.daysOfWeekDisabled = e.map(this.daysOfWeekDisabled, function (e) {
                return parseInt(e, 10)
            }), this.update(), this.updateNavArrows()
        }, place: function () {
            if (!this.isInline) {
                var t = 0;
                e("div").each(function () {
                    var i = parseInt(e(this).css("zIndex"), 10);
                    i > t && (t = i)
                });
                var i, n, s, a, o = t + 10;
                a = this.container instanceof e ? this.container.offset() : e(this.container).offset(), this.component ? (i = this.component.offset(), s = i.left, "bottom-left" != this.pickerPosition && "top-left" != this.pickerPosition || (s += this.component.outerWidth() - this.picker.outerWidth())) : (i = this.element.offset(), s = i.left), s + 220 > document.body.clientWidth && (s = document.body.clientWidth - 220), n = "top-left" == this.pickerPosition || "top-right" == this.pickerPosition ? i.top - this.picker.outerHeight() : i.top + this.height, n -= a.top, s -= a.left, this.picker.css({
                    top: n,
                    left: s,
                    zIndex: o
                })
            }
        }, update: function () {
            var e, t = !1;
            arguments && arguments.length && ("string" == typeof arguments[0] || arguments[0] instanceof Date) ? (e = arguments[0], t = !0) : ("string" == typeof (e = (this.isInput ? this.element.val() : this.element.find("input").val()) || this.element.data("date") || this.initialDate) || e instanceof String) && (e = e.replace(/^\s+|\s+$/g, "")), e || (e = new Date, t = !1), this.date = s.parseDate(e, this.format, this.language, this.formatType), t && this.setValue(), this.date < this.startDate ? this.viewDate = new Date(this.startDate) : this.date > this.endDate ? this.viewDate = new Date(this.endDate) : this.viewDate = new Date(this.date), this.fill()
        }, fillDow: function () {
            for (var e = this.weekStart, t = "<tr>"; e < this.weekStart + 7;) t += '<th class="dow">' + n[this.language].daysMin[e++ % 7] + "</th>";
            t += "</tr>", this.picker.find(".datetimepicker-days thead").append(t)
        }, fillMonths: function () {
            for (var e = "", t = 0; t < 12;) e += '<span class="month">' + n[this.language].monthsShort[t++] + "</span>"
            ;
            this.picker.find(".datetimepicker-months td").html(e)
        }, fill: function () {
            if (null != this.date && null != this.viewDate) {
                var i = new Date(this.viewDate), a = i.getUTCFullYear(), o = i.getUTCMonth(), r = i.getUTCDate(),
                    c = i.getUTCHours(), l = i.getUTCMinutes(),
                    d = this.startDate !== -1 / 0 ? this.startDate.getUTCFullYear() : -1 / 0,
                    p = this.startDate !== -1 / 0 ? this.startDate.getUTCMonth() : -1 / 0,
                    u = this.endDate !== 1 / 0 ? this.endDate.getUTCFullYear() : 1 / 0,
                    h = this.endDate !== 1 / 0 ? this.endDate.getUTCMonth() : 1 / 0,
                    f = new t(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate()).valueOf(),
                    m = new Date;
                if (this.picker.find(".datetimepicker-days thead th:eq(1)").text(n[this.language].months[o] + " " + a), "time" == this.formatViewType) {
                    var g = c % 12 ? c % 12 : 12, v = (g < 10 ? "0" : "") + g, w = (l < 10 ? "0" : "") + l,
                        y = n[this.language].meridiem[c < 12 ? 0 : 1];
                    this.picker.find(".datetimepicker-hours thead th:eq(1)").text(v + ":" + w + " " + (y ? y.toUpperCase() : "")), this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(v + ":" + w + " " + (y ? y.toUpperCase() : ""))
                } else this.picker.find(".datetimepicker-hours thead th:eq(1)").text(r + " " + n[this.language].months[o] + " " + a), this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(r + " " + n[this.language].months[o] + " " + a);
                this.picker.find("tfoot th.today").html('<div class="today-btn">' + n[this.language].today + "</div>").toggle(!1 !== this.todayBtn), this.fillMonths();
                var b = t(a, o - 1, 28, 0, 0, 0, 0), $ = s.getDaysInMonth(b.getUTCFullYear(), b.getUTCMonth());
                b.setUTCDate($), b.setUTCDate($ - (b.getUTCDay() - this.weekStart + 7) % 7);
                var x = new Date(b);
                x.setUTCDate(x.getUTCDate() + 42), x = x.valueOf();
                for (var C, k = [], T = ""; b.valueOf() < x;) {
                    var _ = "";
                    if (b.getUTCDay() == this.weekStart && k.push("<tr>"), C = "", T = b.getUTCDate(), b.getUTCFullYear() < a || b.getUTCFullYear() == a && b.getUTCMonth() < o ? C += " old" : (b.getUTCFullYear() > a || b.getUTCFullYear() == a && b.getUTCMonth() > o) && (C += " new"), this.todayHighlight && b.getUTCFullYear() == m.getFullYear() && b.getUTCMonth() == m.getMonth() && T == m.getDate() && (C += " today", T = "浠婃棩"), b.valueOf() == f && (C += " active"), b.valueOf() + 864e5 <= this.startDate || b.valueOf() > this.endDate || -1 !== e.inArray(b.getUTCDay(), this.daysOfWeekDisabled)) C += " disabled"; else {
                        var S = "" + b.getUTCFullYear() + b.getUTCMonth() + b.getUTCDate();
                        this.inDate.filter(function (e) {
                            return "" + e.year + e.month + e.day === S
                        }).length && (_ = '<i class="indate-dot"></i>')
                    }
                    k.push('<td class="day' + C + '"><em>' + b.getUTCDate() + "</em>" + _ + "</td>"), b.getUTCDay() == this.weekEnd && k.push("</tr>"), b.setUTCDate(b.getUTCDate() + 1)
                }
                this.picker.find(".datetimepicker-days tbody").empty().append(k.join("")), k = [];
                for (var D = "", E = "", I = "", j = 0; j < 24; j++) {
                    var P = t(a, o, r, j);
                    C = "", P.valueOf() + 36e5 <= this.startDate || P.valueOf() > this.endDate ? C += " disabled" : c == j && (C += " active"), this.showMeridian && 2 == n[this.language].meridiem.length ? (E = j < 12 ? n[this.language].meridiem[0] : n[this.language].meridiem[1], E != I && ("" != I && k.push("</fieldset>"), k.push('<fieldset class="hour"><legend>' + E.toUpperCase() + "</legend>")), I = E, D = j % 12 ? j % 12 : 12, k.push('<span class="hour' + C + " hour_" + (j < 12 ? "am" : "pm") + '">' + D + "</span>"), 23 == j && k.push("</fieldset>")) : (D = j + ":00", k.push('<span class="hour' + C + '">' + D + "</span>"))
                }
                this.picker.find(".datetimepicker-hours td").html(k.join("")), k = [], D = "", E = "", I = "";
                for (var j = 0; j < 60; j += this.minuteStep) {
                    var P = t(a, o, r, c, j, 0);
                    C = "", P.valueOf() < this.startDate || P.valueOf() > this.endDate ? C += " disabled" : Math.floor(l / this.minuteStep) == Math.floor(j / this.minuteStep) && (C += " active"), this.showMeridian && 2 == n[this.language].meridiem.length ? (E = c < 12 ? n[this.language].meridiem[0] : n[this.language].meridiem[1], E != I && ("" != I && k.push("</fieldset>"), k.push('<fieldset class="minute"><legend>' + E.toUpperCase() + "</legend>")), I = E, D = c % 12 ? c % 12 : 12, k.push('<span class="minute' + C + '">' + D + ":" + (j < 10 ? "0" + j : j) + "</span>"), 59 == j && k.push("</fieldset>")) : (D = j + ":00", k.push('<span class="minute' + C + '">' + c + ":" + (j < 10 ? "0" + j : j) + "</span>"))
                }
                this.picker.find(".datetimepicker-minutes td").html(k.join(""));
                var A = this.date.getUTCFullYear(),
                    R = this.picker.find(".datetimepicker-months").find("th:eq(1)").text(a).end().find("span").removeClass("active");
                A == a && R.eq(this.date.getUTCMonth()).addClass("active"), (a < d || a > u) && R.addClass("disabled"), a == d && R.slice(0, p).addClass("disabled"), a == u && R.slice(h + 1).addClass("disabled"), k = "", a = 10 * parseInt(a / 10, 10);
                var O = this.picker.find(".datetimepicker-years").find("th:eq(1)").text(a + "-" + (a + 9)).end().find("td");
                a -= 1;
                for (var j = -1; j < 11; j++) {
                    var U = a;
                    if (this.minLimitYear && a < this.minLimitYear) return;
                    this.minLimitYear && a == this.minLimitYear && (U = a + 1 + "浠ュ墠"), k += '<span class="year' + (-1 == j || 10 == j ? " old" : "") + (A == a ? " active" : "") + (a < d || a > u ? " disabled" : "") + '" data-year="' + a + '">' + U + "</span>", a += 1
                }
                O.html(k), this.place(), this.updateNavArrows()
            }
        }, updateNavArrows: function () {
            var e = new Date(this.viewDate), t = e.getUTCFullYear(), i = e.getUTCMonth(), n = e.getUTCDate(),
                s = e.getUTCHours(),
                a = this.picker.find(".datetimepicker-years").find(".year").last().hasClass("disabled");
            switch (this.viewMode) {
                case 0:
                    this.startDate !== -1 / 0 && t <= this.startDate.getUTCFullYear() && i <= this.startDate.getUTCMonth() && n <= this.startDate.getUTCDate() && s <= this.startDate.getUTCHours() ? this.picker.find(".prev").css({visibility: "hidden"}) : this.picker.find(".prev").css({visibility: "visible"}), this.endDate !== 1 / 0 && t >= this.endDate.getUTCFullYear() && i >= this.endDate.getUTCMonth() && n >= this.endDate.getUTCDate() && s >= this.endDate.getUTCHours() ? this.picker.find(".next").css({visibility: "hidden"}) : this.picker.find(".next").css({visibility: "visible"});
                    break;
                case 1:
                    this.startDate !== -1 / 0 && t <= this.startDate.getUTCFullYear() && i <= this.startDate.getUTCMonth() && n <= this.startDate.getUTCDate() ? this.picker.find(".prev").css({visibility: "hidden"}) : this.picker.find(".prev").css({visibility: "visible"}), this.endDate !== 1 / 0 && t >= this.endDate.getUTCFullYear() && i >= this.endDate.getUTCMonth() && n >= this.endDate.getUTCDate() ? this.picker.find(".next").css({visibility: "hidden"}) : this.picker.find(".next").css({visibility: "visible"});
                    break;
                case 2:
                    this.startDate !== -1 / 0 && t <= this.startDate.getUTCFullYear() && i <= this.startDate.getUTCMonth() ? this.picker.find(".prev").css({visibility: "hidden"}) : this.picker.find(".prev").css({visibility: "visible"}), this.endDate !== 1 / 0 && t >= this.endDate.getUTCFullYear() && i >= this.endDate.getUTCMonth() ? this.picker.find(".next").css({visibility: "hidden"}) : this.picker.find(".next").css({visibility: "visible"});
                    break;
                case 3:
                case 4:
                    this.startDate !== -1 / 0 && t <= this.startDate.getUTCFullYear() ? this.picker.find(".prev").css({visibility: "hidden"}) : this.picker.find(".prev").css({visibility: "visible"}), this.endDate !== 1 / 0 && t >= this.endDate.getUTCFullYear() ? this.picker.find(".next").css({visibility: "hidden"}) : a ? this.picker.find(".next").css({visibility: "hidden"}) : this.picker.find(".next").css({visibility: "visible"})
            }
        }, mousewheel: function (t) {
            if (t.preventDefault(), t.stopPropagation(), !this.wheelPause) {
                this.wheelPause = !0;
                var i = t.originalEvent, n = i.wheelDelta, s = n > 0 ? 1 : 0 === n ? 0 : -1;
                this.wheelViewModeNavigationInverseDirection && (s = -s), this.showMode(s), setTimeout(e.proxy(function () {
                    this.wheelPause = !1
                }, this), this.wheelViewModeNavigationDelay)
            }
        }, click: function (i) {
            i.stopPropagation(), i.preventDefault();
            var n = e(i.target).closest("span, td, th, legend");
            if (n.is(".glyphicon") && (n = e(n).parent().closest("span, td, th, legend")), 1 == n.length) {
                if (n.is(".disabled")) return void this.element.trigger({
                    type: "outOfRange",
                    date: this.viewDate,
                    startDate: this.startDate,
                    endDate: this.endDate
                });
                switch (n[0].nodeName.toLowerCase()) {
                    case"th":
                        switch (n[0].className) {
                            case"switch":
                                this.showMode(1);
                                break;
                            case"prev":
                            case"next":
                                this.picker.find(".prev").css({visibility: "hidden"}), this.picker.find(".next").css({visibility: "hidden"}), this.throttle(function () {
                                    var e = s.modes[this.viewMode].navStep * ("prev" == n[0].className ? -1 : 1);
                                    switch (this.viewMode) {
                                        case 0:
                                            this.viewDate = this.moveHour(this.viewDate, e);
                                            break;
                                        case 1:
                                            this.viewDate = this.moveDate(this.viewDate, e);
                                            break;
                                        case 2:
                                            this.viewDate = this.moveMonth(this.viewDate, e);
                                            break;
                                        case 3:
                                        case 4:
                                            this.viewDate = this.moveYear(this.viewDate, e)
                                    }
                                    this.fill(), this.element.trigger({
                                        type: n[0].className + ":" + this.convertViewModeText(this.viewMode),
                                        date: this.viewDate,
                                        startDate: this.startDate,
                                        endDate: this.endDate
                                    })
                                }, 300);
                                break;
                            case"today":
                                var a = new Date;
                                a = t(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), 0), a < this.startDate ? a = this.startDate : a > this.endDate && (a = this.endDate), this.viewMode = this.startViewMode, this.showMode(0), this._setDate(a), this.fill(), this.autoclose && this.hide()
                        }
                        break;
                    case"span":
                        if (!n.is(".disabled")) {
                            var o = this.viewDate.getUTCFullYear(), r = this.viewDate.getUTCMonth(),
                                c = this.viewDate.getUTCDate(), l = this.viewDate.getUTCHours(),
                                d = this.viewDate.getUTCMinutes(), p = this.viewDate.getUTCSeconds();
                            if (n.is(".month") ? (this.viewDate.setUTCDate(1), r = n.parent().find("span").index(n), c = this.viewDate.getUTCDate(), this.viewDate.setUTCMonth(r), this.element.trigger({
                                type: "changeMonth",
                                date: this.viewDate
                            }), this.viewSelect >= 3 && this._setDate(t(o, r, c, l, d, p, 0))) : n.is(".year") ? (this.viewDate.setUTCDate(1), o = parseInt(n.text(), 10) || 0, n.text().indexOf("浠ュ墠") > -1 && (o -= 1), this.viewDate.setUTCFullYear(o), this.element.trigger({
                                type: "changeYear",
                                date: this.viewDate
                            }), this.viewSelect >= 4 && this._setDate(t(o, r, c, l, d, p, 0)), this.minLimitYear && this.minLimitYear == o && (this.viewMode = this.startViewMode, this.showMode(0), this._setDate(t(o, 0, c, l, d, p, 0)), this.fill(), this.hide())) : n.is(".hour") ? (l = parseInt(n.text(), 10) || 0, (n.hasClass("hour_am") || n.hasClass("hour_pm")) && (12 == l && n.hasClass("hour_am") ? l = 0 : 12 != l && n.hasClass("hour_pm") && (l += 12)), this.viewDate.setUTCHours(l), this.element.trigger({
                                type: "changeHour",
                                date: this.viewDate
                            }), this.viewSelect >= 1 && this._setDate(t(o, r, c, l, d, p, 0))) : n.is(".minute") && (d = parseInt(n.text().substr(n.text().indexOf(":") + 1), 10) || 0, this.viewDate.setUTCMinutes(d), this.element.trigger({
                                type: "changeMinute",
                                date: this.viewDate
                            }), this.viewSelect >= 0 && this._setDate(t(o, r, c, l, d, p, 0))), 0 != this.viewMode) {
                                var u = this.viewMode;
                                this.minLimitYear && this.minLimitYear == o ? this.showMode(0) : this.showMode(-1), this.fill(), u == this.viewMode && this.autoclose && this.hide()
                            } else this.fill(), this.autoclose && this.hide()
                        }
                        break;
                    case"td":
                        if (n.is(".day") && !n.is(".disabled")) {
                            var c = parseInt(n.text(), 10) || 1, o = this.viewDate.getUTCFullYear(),
                                r = this.viewDate.getUTCMonth(), l = this.viewDate.getUTCHours(),
                                d = this.viewDate.getUTCMinutes(), p = this.viewDate.getUTCSeconds();
                            n.is(".old") ? 0 === r ? (r = 11, o -= 1) : r -= 1 : n.is(".new") && (11 == r ? (r = 0, o += 1) : r += 1), this.viewDate.setUTCFullYear(o), this.viewDate.setUTCMonth(r, c), this.element.trigger({
                                type: "changeDay",
                                date: this.viewDate
                            }), this.viewSelect >= 2 && this._setDate(t(o, r, c, l, d, p, 0))
                        }
                        var u = this.viewMode;
                        this.showMode(-1), this.fill(), u == this.viewMode && this.autoclose && this.hide()
                }
            }
        }, throttle: function (e, t) {
            var i = this;
            clearTimeout(this.timer), this.timer = setTimeout(function () {
                e.call(i)
            }, t)
        }, _setDate: function (e, t) {
            t && "date" != t || (this.date = e), t && "view" != t || (this.viewDate = e), this.fill(), this.setValue();
            var i;
            this.isInput ? i = this.element : this.component && (i = this.element.find("input")), i && (i.change(), this.autoclose), this.element.trigger({
                type: "changeDate",
                date: this.date
            })
        }, moveMinute: function (e, t) {
            if (!t) return e;
            var i = new Date(e.valueOf());
            return i.setUTCMinutes(i.getUTCMinutes() + t * this.minuteStep), i
        }, moveHour: function (e, t) {
            if (!t) return e;
            var i = new Date(e.valueOf());
            return i.setUTCHours(i.getUTCHours() + t), i
        }, moveDate: function (e, t) {
            if (!t) return e;
            var i = new Date(e.valueOf());
            return i.setUTCDate(i.getUTCDate() + t), i
        }, moveMonth: function (e, t) {
            if (!t) return e;
            var i, n, s = new Date(e.valueOf()), a = s.getUTCDate(), o = s.getUTCMonth(), r = Math.abs(t);
            if (t = t > 0 ? 1 : -1, 1 == r) n = -1 == t ? function () {
                return s.getUTCMonth() == o
            } : function () {
                return s.getUTCMonth() != i
            }, i = o + t, s.setUTCMonth(i), (i < 0 || i > 11) && (i = (i + 12) % 12); else {
                for (var c = 0; c < r; c++) s = this.moveMonth(s, t);
                i = s.getUTCMonth(), s.setUTCDate(a), n = function () {
                    return i != s.getUTCMonth()
                }
            }
            for (; n();) s.setUTCDate(--a), s.setUTCMonth(i);
            return s
        }, moveYear: function (e, t) {
            return this.moveMonth(e, 12 * t)
        }, dateWithinRange: function (e) {
            return e >= this.startDate && e <= this.endDate
        }, keydown: function (e) {
            if (this.picker.is(":not(:visible)")) return void (27 == e.keyCode && this.show());
            var t, i, n, s = !1;
            switch (e.keyCode) {
                case 27:
                    this.hide(), e.preventDefault();
                    break;
                case 37:
                case 39:
                    if (!this.keyboardNavigation) break;
                    t = 37 == e.keyCode ? -1 : 1, viewMode = this.viewMode, e.ctrlKey ? viewMode += 2 : e.shiftKey && (viewMode += 1), 4 == viewMode ? (i = this.moveYear(this.date, t), n = this.moveYear(this.viewDate, t)) : 3 == viewMode ? (i = this.moveMonth(this.date, t), n = this.moveMonth(this.viewDate, t)) : 2 == viewMode ? (i = this.moveDate(this.date, t), n = this.moveDate(this.viewDate, t)) : 1 == viewMode ? (i = this.moveHour(this.date, t), n = this.moveHour(this.viewDate, t)) : 0 == viewMode && (i = this.moveMinute(this.date, t), n = this.moveMinute(this.viewDate, t)), this.dateWithinRange(i) && (this.date = i, this.viewDate = n, this.setValue(), this.update(), e.preventDefault(), s = !0);
                    break;
                case 38:
                case 40:
                    if (!this.keyboardNavigation) break;
                    t = 38 == e.keyCode ? -1 : 1, viewMode = this.viewMode, e.ctrlKey ? viewMode += 2 : e.shiftKey && (viewMode += 1), 4 == viewMode ? (i = this.moveYear(this.date, t), n = this.moveYear(this.viewDate, t)) : 3 == viewMode ? (i = this.moveMonth(this.date, t), n = this.moveMonth(this.viewDate, t)) : 2 == viewMode ? (i = this.moveDate(this.date, 7 * t), n = this.moveDate(this.viewDate, 7 * t)) : 1 == viewMode ? this.showMeridian ? (i = this.moveHour(this.date, 6 * t), n = this.moveHour(this.viewDate, 6 * t)) : (i = this.moveHour(this.date, 4 * t), n = this.moveHour(this.viewDate, 4 * t)) : 0 == viewMode && (i = this.moveMinute(this.date, 4 * t), n = this.moveMinute(this.viewDate, 4 * t)), this.dateWithinRange(i) && (this.date = i, this.viewDate = n, this.setValue(), this.update(), e.preventDefault(), s = !0);
                    break;
                case 13:
                    if (0 != this.viewMode) {
                        var a = this.viewMode;
                        this.showMode(-1), this.fill(), a == this.viewMode && this.autoclose && this.hide()
                    } else this.fill(), this.autoclose && this.hide();
                    e.preventDefault();
                    break;
                case 9:
                    this.hide()
            }
            if (s) {
                var o;
                this.isInput ? o = this.element : this.component && (o = this.element.find("input")), o && o.change(), this.element.trigger({
                    type: "changeDate",
                    date: this.date
                })
            }
        }, showMode: function (e) {
            if (e) {
                var t = Math.max(0, Math.min(s.modes.length - 1, this.viewMode + e));
                t >= this.minView && t <= this.maxView && (this.element.trigger({
                    type: "changeMode",
                    date: this.viewDate,
                    oldViewMode: this.viewMode,
                    newViewMode: t
                }), this.viewMode = t)
            }
            this.picker.find(">div").hide().filter(".datetimepicker-" + s.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
        }, reset: function (e) {
            this._setDate(null, "date")
        }, convertViewModeText: function (e) {
            switch (e) {
                case 4:
                    return "decade";
                case 3:
                    return "year";
                case 2:
                    return "month";
                case 1:
                    return "day";
                case 0:
                    return "hour"
            }
        }
    }, e.fn.datetimepicker = function (t) {
        var n = Array.apply(null, arguments);
        n.shift();
        var s;
        return this.each(function () {
            var a = e(this), o = a.data("datetimepicker"), r = "object" == typeof t && t;
            if (o || a.data("datetimepicker", o = new i(this, e.extend({}, e.fn.datetimepicker.defaults, r))), "string" == typeof t && "function" == typeof o[t] && void 0 !== (s = o[t].apply(o, n))) return !1
        }), void 0 !== s ? s : this
    }, e.fn.datetimepicker.defaults = {}, e.fn.datetimepicker.Constructor = i;
    var n = e.fn.datetimepicker.dates = {
        en: {
            days: ["鏄熸湡鏃�", "鏄熸湡涓€", "鏄熸湡浜�", "鏄熸湡涓�", "鏄熸湡鍥�", "鏄熸湡浜�", "鏄熸湡鍏�", "鏄熸湡鏃�"],
            daysShort: ["鍛ㄦ棩", "鍛ㄤ竴", "鍛ㄤ簩", "鍛ㄤ笁", "鍛ㄥ洓", "鍛ㄤ簲", "鍛ㄥ叚", "鍛ㄦ棩"],
            daysMin: ["鏃�", "涓€", "浜�", "涓�", "鍥�", "浜�", "鍏�", "鏃�"],
            months: ["涓€鏈�", "浜屾湀", "涓夋湀", "鍥涙湀", "浜旀湀", "鍏湀", "涓冩湀", "鍏湀", "涔濇湀", "鍗佹湀", "鍗佷竴鏈�", "鍗佷簩鏈�"],
            monthsShort: ["涓€鏈�", "浜屾湀", "涓夋湀", "鍥涙湀", "浜旀湀", "鍏湀", "涓冩湀", "鍏湀", "涔濇湀", "鍗佹湀", "鍗佷竴鏈�", "鍗佷簩鏈�"],
            today: "鑷充粖",
            suffix: [],
            meridiem: ["涓婂崍", "涓嬪崍"]
        }
    }, s = {
        modes: [{clsName: "minutes", navFnc: "Hours", navStep: 1}, {
            clsName: "hours",
            navFnc: "Date",
            navStep: 1
        }, {clsName: "days", navFnc: "Month", navStep: 1}, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {clsName: "years", navFnc: "FullYear", navStep: 10}],
        isLeapYear: function (e) {
            return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
        },
        getDaysInMonth: function (e, t) {
            return [31, s.isLeapYear(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
        },
        getDefaultFormat: function (e, t) {
            if ("standard" == e) return "input" == t ? "yyyy-mm-dd hh:ii" : "yyyy-mm-dd hh:ii:ss";
            if ("php" == e) return "input" == t ? "Y-m-d H:i" : "Y-m-d H:i:s";
            throw new Error("Invalid format type.")
        },
        validParts: function (e) {
            if ("standard" == e) return /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
            if ("php" == e) return /[dDjlNwzFmMnStyYaABgGhHis]/g;
            throw new Error("Invalid format type.")
        },
        nonpunctuation: /[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,
        parseFormat: function (e, t) {
            var i = e.replace(this.validParts(t), "\0").split("\0"), n = e.match(this.validParts(t));
            if (!i || !i.length || !n || 0 == n.length) throw new Error("Invalid date format.");
            return {separators: i, parts: n}
        },
        parseDate: function (s, a, o, r) {
            if (s instanceof Date) {
                var c = new Date(s.valueOf() - 6e4 * s.getTimezoneOffset());
                return c.setMilliseconds(0), c
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(s) && (a = this.parseFormat("yyyy-mm-dd", r)), /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(s) && (a = this.parseFormat("yyyy-mm-dd hh:ii", r)), /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(s) && (a = this.parseFormat("yyyy-mm-dd hh:ii:ss", r)), /^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(s)) {
                var l, d, p = /([-+]\d+)([dmwy])/, u = s.match(/([-+]\d+)([dmwy])/g);
                s = new Date;
                for (var h = 0; h < u.length; h++) switch (l = p.exec(u[h]), d = parseInt(l[1]), l[2]) {
                    case"d":
                        s.setUTCDate(s.getUTCDate() + d);
                        break;
                    case"m":
                        s = i.prototype.moveMonth.call(i.prototype, s, d);
                        break;
                    case"w":
                        s.setUTCDate(s.getUTCDate() + 7 * d);
                        break;
                    case"y":
                        s = i.prototype.moveYear.call(i.prototype, s, d)
                }
                return t(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate(), s.getUTCHours(), s.getUTCMinutes(), s.getUTCSeconds(), 0)
            }
            var f, m, l, u = s && s.match(this.nonpunctuation) || [], s = new Date(0, 0, 0, 0, 0, 0, 0), g = {},
                v = ["hh", "h", "ii", "i", "ss", "s", "yyyy", "yy", "M", "MM", "m", "mm", "D", "DD", "d", "dd", "H", "HH", "p", "P"],
                w = {
                    hh: function (e, t) {
                        return e.setUTCHours(t)
                    }, h: function (e, t) {
                        return e.setUTCHours(t)
                    }, HH: function (e, t) {
                        return e.setUTCHours(12 == t ? 0 : t)
                    }, H: function (e, t) {
                        return e.setUTCHours(12 == t ? 0 : t)
                    }, ii: function (e, t) {
                        return e.setUTCMinutes(t)
                    }, i: function (e, t) {
                        return e.setUTCMinutes(t)
                    }, ss: function (e, t) {
                        return e.setUTCSeconds(t)
                    }, s: function (e, t) {
                        return e.setUTCSeconds(t)
                    }, yyyy: function (e, t) {
                        return e.setUTCFullYear(t)
                    }, yy: function (e, t) {
                        return e.setUTCFullYear(2e3 + t)
                    }, m: function (e, t) {
                        for (t -= 1; t < 0;) t += 12;
                        for (t %= 12, e.setUTCMonth(t); e.getUTCMonth() != t;) {
                            if (isNaN(e.getUTCMonth())) return e;
                            e.setUTCDate(e.getUTCDate() - 1)
                        }
                        return e
                    }, d: function (e, t) {
                        return e.setUTCDate(t)
                    }, p: function (e, t) {
                        return e.setUTCHours(1 == t ? e.getUTCHours() + 12 : e.getUTCHours())
                    }
                };
            if (w.M = w.MM = w.mm = w.m, w.dd = w.d, w.P = w.p, s = t(s.getFullYear(), s.getMonth(), s.getDate(), s.getHours(), s.getMinutes(), s.getSeconds()), u.length == a.parts.length) {
                for (var h = 0, y = a.parts.length; h < y; h++) {
                    if (f = parseInt(u[h], 10), l = a.parts[h], isNaN(f)) switch (l) {
                        case"MM":
                            m = e(n[o].months).filter(function () {
                                var e = this.slice(0, u[h].length);
                                return e == u[h].slice(0, e.length)
                            }), f = e.inArray(m[0], n[o].months) + 1;
                            break;
                        case"M":
                            m = e(n[o].monthsShort).filter(function () {
                                var e = this.slice(0, u[h].length), t = u[h].slice(0, e.length);
                                return e.toLowerCase() == t.toLowerCase()
                            }), f = e.inArray(m[0], n[o].monthsShort) + 1;
                            break;
                        case"p":
                        case"P":
                            f = e.inArray(u[h].toLowerCase(), n[o].meridiem)
                    }
                    g[l] = f
                }
                for (var b, h = 0; h < v.length; h++) (b = v[h]) in g && !isNaN(g[b]) && w[b](s, g[b])
            }
            return s
        },
        formatDate: function (t, i, a, o) {
            if (null == t) return "";
            var r;
            if ("standard" == o) r = {
                yy: t.getUTCFullYear().toString().substring(2),
                yyyy: t.getUTCFullYear(),
                m: t.getUTCMonth() + 1,
                M: n[a].monthsShort[t.getUTCMonth()],
                MM: n[a].months[t.getUTCMonth()],
                d: t.getUTCDate(),
                D: n[a].daysShort[t.getUTCDay()],
                DD: n[a].days[t.getUTCDay()],
                p: 2 == n[a].meridiem.length ? n[a].meridiem[t.getUTCHours() < 12 ? 0 : 1] : "",
                h: t.getUTCHours(),
                i: t.getUTCMinutes(),
                s: t.getUTCSeconds()
            }, 2 == n[a].meridiem.length ? r.H = r.h % 12 == 0 ? 12 : r.h % 12 : r.H = r.h, r.HH = (r.H < 10 ? "0" : "") + r.H, r.P = r.p.toUpperCase(), r.hh = (r.h < 10 ? "0" : "") + r.h, r.ii = (r.i < 10 ? "0" : "") + r.i, r.ss = (r.s < 10 ? "0" : "") + r.s, r.dd = (r.d < 10 ? "0" : "") + r.d, r.mm = (r.m < 10 ? "0" : "") + r.m; else {
                if ("php" != o) throw new Error("Invalid format type.");
                r = {
                    y: t.getUTCFullYear().toString().substring(2),
                    Y: t.getUTCFullYear(),
                    F: n[a].months[t.getUTCMonth()],
                    M: n[a].monthsShort[t.getUTCMonth()],
                    n: t.getUTCMonth() + 1,
                    t: s.getDaysInMonth(t.getUTCFullYear(), t.getUTCMonth()),
                    j: t.getUTCDate(),
                    l: n[a].days[t.getUTCDay()],
                    D: n[a].daysShort[t.getUTCDay()],
                    w: t.getUTCDay(),
                    N: 0 == t.getUTCDay() ? 7 : t.getUTCDay(),
                    S: t.getUTCDate() % 10 <= n[a].suffix.length ? n[a].suffix[t.getUTCDate() % 10 - 1] : "",
                    a: 2 == n[a].meridiem.length ? n[a].meridiem[t.getUTCHours() < 12 ? 0 : 1] : "",
                    g: t.getUTCHours() % 12 == 0 ? 12 : t.getUTCHours() % 12,
                    G: t.getUTCHours(),
                    i: t.getUTCMinutes(),
                    s: t.getUTCSeconds()
                }, r.m = (r.n < 10 ? "0" : "") + r.n, r.d = (r.j < 10 ? "0" : "") + r.j, r.A = r.a.toString().toUpperCase(), r.h = (r.g < 10 ? "0" : "") + r.g, r.H = (r.G < 10 ? "0" : "") + r.G, r.i = (r.i < 10 ? "0" : "") + r.i, r.s = (r.s < 10 ? "0" : "") + r.s
            }
            for (var t = [], c = e.extend([], i.separators), l = 0, d = i.parts.length; l < d; l++) c.length && t.push(c.shift()), t.push(r[i.parts[l]]);
            return c.length && t.push(c.shift()), t.join("")
        },
        convertViewMode: function (e) {
            switch (e) {
                case 4:
                case"decade":
                    e = 4;
                    break;
                case 3:
                case"year":
                    e = 3;
                    break;
                case 2:
                case"month":
                    e = 2;
                    break;
                case 1:
                case"day":
                    e = 1;
                    break;
                case 0:
                case"hour":
                    e = 0
            }
            return e
        },
        headTemplate: '<thead><tr><th class="prev"><i class="fz fz-arrow-left"></i></th><th colspan="5" class="switch"></th><th class="next"><i class="fz fz-arrow-right"></i></th></tr></thead>',
        headTemplateV3: '<thead><tr><th class="prev"><span class="glyphicon glyphicon-arrow-left"></span> </th><th colspan="5" class="switch"></th><th class="next"><span class="glyphicon glyphicon-arrow-right"></span> </th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot class="tfoot"><tr><th colspan="7" class="today"></th></tr></tfoot>'
    };
    s.template = '<div class="datetimepicker"><div class="datetimepicker-minutes"><table class="table-condensed">' + s.headTemplate + s.contTemplate + s.footTemplate + '</table></div><div class="datetimepicker-hours"><table class="table-condensed">' + s.headTemplate + s.contTemplate + s.footTemplate + '</table></div><div class="datetimepicker-days"><table class="table-condensed">' + s.headTemplate + "<tbody></tbody>" + s.footTemplate + '</table></div><div class="datetimepicker-months"><table class="table-condensed">' + s.headTemplate + s.contTemplate + s.footTemplate + '</table></div><div class="datetimepicker-years"><table class="table-condensed">' + s.headTemplate + s.contTemplate + s.footTemplate + "</table></div></div>", s.templateV3 = '<div class="datetimepicker"><div class="datetimepicker-minutes"><table class=" table-condensed">' + s.headTemplateV3 + s.contTemplate + s.footTemplate + '</table></div><div class="datetimepicker-hours"><table class=" table-condensed">' + s.headTemplateV3 + s.contTemplate + s.footTemplate + '</table></div><div class="datetimepicker-days"><table class=" table-condensed">' + s.headTemplateV3 + "<tbody></tbody>" + s.footTemplate + '</table></div><div class="datetimepicker-months"><table class="table-condensed">' + s.headTemplateV3 + s.contTemplate + s.footTemplate + '</table></div><div class="datetimepicker-years"><table class="table-condensed">' + s.headTemplateV3 + s.contTemplate + s.footTemplate + "</table></div></div>", e.fn.datetimepicker.DPGlobal = s, e.fn.datetimepicker.noConflict = function () {
        return e.fn.datetimepicker = old, this
    }, e(document).on("focus.datetimepicker.data-api click.datetimepicker.data-api", '[data-provide="datetimepicker"]', function (t) {
        var i = e(this);
        i.data("datetimepicker") || (t.preventDefault(), i.datetimepicker("show"))
    }), e(function () {
        e('[data-provide="datetimepicker-inline"]').datetimepicker()
    })
}(window.jQuery), function (e) {
    var t = 0, i = Array.prototype.slice;
    e.cleanData = function (t) {
        return function (i) {
            var n, s, a;
            for (a = 0; null != (s = i[a]); a++) try {
                (n = e._data(s, "events")) && n.remove && e(s).triggerHandler("remove")
            } catch (e) {
            }
            t(i)
        }
    }(e.cleanData), e.widget = function (t, i, n) {
        var s, a, o, r, c = {}, l = t.split(".")[0];
        return t = t.split(".")[1], s = l + "-" + t, n || (n = i, i = e.Widget), e.expr[":"][s.toLowerCase()] = function (t) {
            return !!e.data(t, s)
        }, e[l] = e[l] || {}, a = e[l][t], o = e[l][t] = function (e, t) {
            return this._createWidget ? void (arguments.length && this._createWidget(e, t)) : new o(e, t)
        }, e.extend(o, a, {
            version: n.version,
            _proto: e.extend({}, n),
            _childConstructors: []
        }), r = new i, r.options = e.widget.extend({}, r.options), e.each(n, function (t, n) {
            return e.isFunction(n) ? void (c[t] = function () {
                var e = function () {
                    return i.prototype[t].apply(this, arguments)
                }, s = function (e) {
                    return i.prototype[t].apply(this, e)
                };
                return function () {
                    var t, i = this._super, a = this._superApply;
                    return this._super = e, this._superApply = s, t = n.apply(this, arguments), this._super = i, this._superApply = a, t
                }
            }()) : void (c[t] = n)
        }), o.prototype = e.widget.extend(r, {widgetEventPrefix: a ? r.widgetEventPrefix || t : t}, c, {
            constructor: o,
            namespace: l,
            widgetName: t,
            widgetFullName: s
        }), a ? (e.each(a._childConstructors, function (t, i) {
            var n = i.prototype;
            e.widget(n.namespace + "." + n.widgetName, o, i._proto)
        }), delete a._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o), o
    }, e.widget.extend = function (t) {
        for (var n, s, a = i.call(arguments, 1), o = 0, r = a.length; r > o; o++) for (n in a[o]) s = a[o][n], a[o].hasOwnProperty(n) && void 0 !== s && (t[n] = e.isPlainObject(s) ? e.isPlainObject(t[n]) ? e.widget.extend({}, t[n], s) : e.widget.extend({}, s) : s);
        return t
    }, e.widget.bridge = function (t, n) {
        var s = n.prototype.widgetFullName || t;
        e.fn[t] = function (a) {
            var o = "string" == typeof a, r = i.call(arguments, 1), c = this;
            return o ? this.each(function () {
                var i, n = e.data(this, s);
                return "instance" === a ? (c = n, !1) : n ? e.isFunction(n[a]) && "_" !== a.charAt(0) ? (i = n[a].apply(n, r), i !== n && void 0 !== i ? (c = i && i.jquery ? c.pushStack(i.get()) : i, !1) : void 0) : e.error("no such method '" + a + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + a + "'")
            }) : (r.length && (a = e.widget.extend.apply(null, [a].concat(r))), this.each(function () {
                var t = e.data(this, s);
                t ? (t.option(a || {}), t._init && t._init()) : e.data(this, s, new n(a, this))
            })), c
        }
    }, e.Widget = function () {
    }, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {disabled: !1, create: null},
        _createWidget: function (i, n) {
            n = e(n || this.defaultElement || this)[0], this.element = e(n), this.uuid = t++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), n !== this && (e.data(n, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (e) {
                    e.target === n && this.destroy()
                }
            }), this.document = e(n.style ? n.ownerDocument : n.document || n), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), i), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function () {
            return this.element
        },
        option: function (t, i) {
            var n, s, a, o = t;
            if (0 === arguments.length) return e.widget.extend({}, this.options);
            if ("string" == typeof t) if (o = {}, n = t.split("."), t = n.shift(), n.length) {
                for (s = o[t] = e.widget.extend({}, this.options[t]), a = 0; a < n.length - 1; a++) s[n[a]] = s[n[a]] || {}, s = s[n[a]];
                if (t = n.pop(), 1 === arguments.length) return void 0 === s[t] ? null : s[t];
                s[t] = i
            } else {
                if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                o[t] = i
            }
            return this._setOptions(o), this
        },
        _setOptions: function (e) {
            var t;
            for (t in e) this._setOption(t, e[t]);
            return this
        },
        _setOption: function (e, t) {
            return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
        },
        enable: function () {
            return this._setOptions({disabled: !1})
        },
        disable: function () {
            return this._setOptions({disabled: !0})
        },
        _on: function (t, i, n) {
            var s, a = this;
            "boolean" != typeof t && (n = i, i = t, t = !1), n ? (i = s = e(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, s = this.widget()), e.each(n, function (n, o) {
                function r() {
                    return t || !0 !== a.options.disabled && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0
                }

                "string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);
                var c = n.match(/^([\w:-]*)\s*(.*)$/), l = c[1] + a.eventNamespace, d = c[2];
                d ? s.delegate(d, l, r) : i.bind(l, r)
            })
        },
        _off: function (t, i) {
            i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
        },
        _delay: function (e, t) {
            function i() {
                return ("string" == typeof e ? n[e] : e).apply(n, arguments)
            }

            var n = this;
            return setTimeout(i, t || 0)
        },
        _hoverable: function (t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {
                mouseenter: function (t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                }, mouseleave: function (t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (t) {
            this.focusable = this.focusable.add(t), this._on(t, {
                focusin: function (t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                }, focusout: function (t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (t, i, n) {
            var s, a, o = this.options[t];
            if (n = n || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent) for (s in a) s in i || (i[s] = a[s]);
            return this.element.trigger(i, n), !(e.isFunction(o) && !1 === o.apply(this.element[0], [i].concat(n)) || i.isDefaultPrevented())
        }
    }, e.each({show: "fadeIn", hide: "fadeOut"}, function (t, i) {
        e.Widget.prototype["_" + t] = function (n, s, a) {
            "string" == typeof s && (s = {effect: s});
            var o, r = s ? !0 === s || "number" == typeof s ? i : s.effect || i : t;
            s = s || {}, "number" == typeof s && (s = {duration: s}), o = !e.isEmptyObject(s), s.complete = a, s.delay && n.delay(s.delay), o && e.effects && e.effects.effect[r] ? n[t](s) : r !== t && n[r] ? n[r](s.duration, s.easing, a) : n.queue(function (i) {
                e(this)[t](), a && a.call(n[0]), i()
            })
        }
    }), e.widget
}(jQuery), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery)
}(function (e) {
    "use strict";
    var t = 0, i = e, n = "parseJSON";
    "JSON" in window && "parse" in JSON && (i = JSON, n = "parse"), e.ajaxTransport("iframe", function (i) {
        if (i.async) {
            var n, s, a, o = i.initialIframeSrc || "javascript:false;";
            return {
                send: function (r, c) {
                    n = e('<form style="display:none;"></form>'), n.attr("accept-charset", i.formAcceptCharset), a = /\?/.test(i.url) ? "&" : "?", "DELETE" === i.type ? (i.url = i.url + a + "_method=DELETE", i.type = "POST") : "PUT" === i.type ? (i.url = i.url + a + "_method=PUT", i.type = "POST") : "PATCH" === i.type && (i.url = i.url + a + "_method=PATCH", i.type = "POST"), t += 1, s = e('<iframe src="' + o + '" name="iframe-transport-' + t + '"></iframe>').bind("load", function () {
                        var t, a = e.isArray(i.paramName) ? i.paramName : [i.paramName];
                        s.unbind("load").bind("load", function () {
                            var t;
                            try {
                                if (t = s.contents(), !t.length || !t[0].firstChild) throw new Error
                            } catch (e) {
                                t = void 0
                            }
                            c(200, "success", {iframe: t}), e('<iframe src="' + o + '"></iframe>').appendTo(n), window.setTimeout(function () {
                                n.remove()
                            }, 0)
                        }), n.prop("target", s.prop("name")).prop("action", i.url).prop("method", i.type), i.formData && e.each(i.formData, function (t, i) {
                            e('<input type="hidden"/>').prop("name", i.name).val(i.value).appendTo(n)
                        }), i.fileInput && i.fileInput.length && "POST" === i.type && (t = i.fileInput.clone(), i.fileInput.after(function (e) {
                            return t[e]
                        }), i.paramName && i.fileInput.each(function (t) {
                            e(this).prop("name", a[t] || i.paramName)
                        }), n.append(i.fileInput).prop("enctype", "multipart/form-data").prop("encoding", "multipart/form-data"), i.fileInput.removeAttr("form")), n.submit(), t && t.length && i.fileInput.each(function (i, n) {
                            var s = e(t[i]);
                            e(n).prop("name", s.prop("name")).attr("form", s.attr("form")), s.replaceWith(n)
                        })
                    }), n.append(s).appendTo(document.body)
                }, abort: function () {
                    s && s.unbind("load").prop("src", o), n && n.remove()
                }
            }
        }
    }), e.ajaxSetup({
        converters: {
            "iframe text": function (t) {
                return t && e(t[0].body).text()
            }, "iframe json": function (t) {
                return t && i[n](e(t[0].body).text())
            }, "iframe html": function (t) {
                return t && e(t[0].body).html()
            }, "iframe xml": function (t) {
                var i = t && t[0];
                return i && e.isXMLDoc(i) ? i : e.parseXML(i.XMLDocument && i.XMLDocument.xml || e(i.body).html())
            }, "iframe script": function (t) {
                return t && e.globalEval(e(t[0].body).text())
            }
        }
    })
}), function (e) {
    "use strict"
    ;"function" == typeof define && define.amd ? define(["jquery", "jquery-ui/ui/widget"], e) : "object" == typeof exports ? e(require("jquery"), require("./vendor/jquery.ui.widget")) : e(window.jQuery)
}(function (e) {
    "use strict";

    function t(t) {
        var i = "dragover" === t;
        return function (n) {
            n.dataTransfer = n.originalEvent && n.originalEvent.dataTransfer;
            var s = n.dataTransfer;
            s && -1 !== e.inArray("Files", s.types) && !1 !== this._trigger(t, e.Event(t, {delegatedEvent: n})) && (n.preventDefault(), i && (s.dropEffect = "copy"))
        }
    }

    e.support.fileInput = !(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent) || e('<input type="file"/>').prop("disabled")), e.support.xhrFileUpload = !(!window.ProgressEvent || !window.FileReader), e.support.xhrFormDataFileUpload = !!window.FormData, e.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice), e.widget("blueimp.fileupload", {
        options: {
            dropZone: e(document),
            pasteZone: void 0,
            fileInput: void 0,
            replaceFileInput: !0,
            paramName: void 0,
            singleFileUploads: !0,
            limitMultiFileUploads: void 0,
            limitMultiFileUploadSize: void 0,
            limitMultiFileUploadSizeOverhead: 512,
            sequentialUploads: !1,
            limitConcurrentUploads: void 0,
            forceIframeTransport: !1,
            redirect: void 0,
            redirectParamName: void 0,
            postMessage: void 0,
            multipart: !0,
            maxChunkSize: void 0,
            uploadedBytes: void 0,
            recalculateProgress: !0,
            progressInterval: 100,
            bitrateInterval: 500,
            autoUpload: !0,
            messages: {uploadedBytes: "Uploaded bytes exceed file size"},
            i18n: function (t, i) {
                return t = this.messages[t] || t.toString(), i && e.each(i, function (e, i) {
                    t = t.replace("{" + e + "}", i)
                }), t
            },
            formData: function (e) {
                return e.serializeArray()
            },
            add: function (t, i) {
                if (t.isDefaultPrevented()) return !1;
                (i.autoUpload || !1 !== i.autoUpload && e(this).fileupload("option", "autoUpload")) && i.process().done(function () {
                    i.submit()
                })
            },
            processData: !1,
            contentType: !1,
            cache: !1,
            timeout: 0
        },
        _specialOptions: ["fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport"],
        _blobSlice: e.support.blobSlice && function () {
            return (this.slice || this.webkitSlice || this.mozSlice).apply(this, arguments)
        },
        _BitrateTimer: function () {
            this.timestamp = Date.now ? Date.now() : (new Date).getTime(), this.loaded = 0, this.bitrate = 0, this.getBitrate = function (e, t, i) {
                var n = e - this.timestamp;
                return (!this.bitrate || !i || n > i) && (this.bitrate = (t - this.loaded) * (1e3 / n) * 8, this.loaded = t, this.timestamp = e), this.bitrate
            }
        },
        _isXHRUpload: function (t) {
            return !t.forceIframeTransport && (!t.multipart && e.support.xhrFileUpload || e.support.xhrFormDataFileUpload)
        },
        _getFormData: function (t) {
            var i;
            return "function" === e.type(t.formData) ? t.formData(t.form) : e.isArray(t.formData) ? t.formData : "object" === e.type(t.formData) ? (i = [], e.each(t.formData, function (e, t) {
                i.push({name: e, value: t})
            }), i) : []
        },
        _getTotal: function (t) {
            var i = 0;
            return e.each(t, function (e, t) {
                i += t.size || 1
            }), i
        },
        _initProgressObject: function (t) {
            var i = {loaded: 0, total: 0, bitrate: 0};
            t._progress ? e.extend(t._progress, i) : t._progress = i
        },
        _initResponseObject: function (e) {
            var t;
            if (e._response) for (t in e._response) e._response.hasOwnProperty(t) && delete e._response[t]; else e._response = {}
        },
        _onProgress: function (t, i) {
            if (t.lengthComputable) {
                var n, s = Date.now ? Date.now() : (new Date).getTime();
                if (i._time && i.progressInterval && s - i._time < i.progressInterval && t.loaded !== t.total) return;
                i._time = s, n = Math.floor(t.loaded / t.total * (i.chunkSize || i._progress.total)) + (i.uploadedBytes || 0), this._progress.loaded += n - i._progress.loaded, this._progress.bitrate = this._bitrateTimer.getBitrate(s, this._progress.loaded, i.bitrateInterval), i._progress.loaded = i.loaded = n, i._progress.bitrate = i.bitrate = i._bitrateTimer.getBitrate(s, n, i.bitrateInterval), this._trigger("progress", e.Event("progress", {delegatedEvent: t}), i), this._trigger("progressall", e.Event("progressall", {delegatedEvent: t}), this._progress)
            }
        },
        _initProgressListener: function (t) {
            var i = this, n = t.xhr ? t.xhr() : e.ajaxSettings.xhr();
            n.upload && (e(n.upload).bind("progress", function (e) {
                var n = e.originalEvent;
                e.lengthComputable = n.lengthComputable, e.loaded = n.loaded, e.total = n.total, i._onProgress(e, t)
            }), t.xhr = function () {
                return n
            })
        },
        _deinitProgressListener: function (t) {
            var i = t.xhr ? t.xhr() : e.ajaxSettings.xhr();
            i.upload && e(i.upload).unbind("progress")
        },
        _isInstanceOf: function (e, t) {
            return Object.prototype.toString.call(t) === "[object " + e + "]"
        },
        _initXHRData: function (t) {
            var i, n = this, s = t.files[0], a = t.multipart || !e.support.xhrFileUpload,
                o = "array" === e.type(t.paramName) ? t.paramName[0] : t.paramName;
            t.headers = e.extend({}, t.headers), t.contentRange && (t.headers["Content-Range"] = t.contentRange), a && !t.blob && this._isInstanceOf("File", s) || (t.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(s.uploadName || s.name) + '"'), a ? e.support.xhrFormDataFileUpload && (t.postMessage ? (i = this._getFormData(t), t.blob ? i.push({
                name: o,
                value: t.blob
            }) : e.each(t.files, function (n, s) {
                i.push({name: "array" === e.type(t.paramName) && t.paramName[n] || o, value: s})
            })) : (n._isInstanceOf("FormData", t.formData) ? i = t.formData : (i = new FormData, e.each(this._getFormData(t), function (e, t) {
                i.append(t.name, t.value)
            })), t.blob ? i.append(o, t.blob, s.uploadName || s.name) : e.each(t.files, function (s, a) {
                (n._isInstanceOf("File", a) || n._isInstanceOf("Blob", a)) && i.append("array" === e.type(t.paramName) && t.paramName[s] || o, a, a.uploadName || a.name)
            })), t.data = i) : (t.contentType = s.type || "application/octet-stream", t.data = t.blob || s), t.blob = null
        },
        _initIframeSettings: function (t) {
            var i = e("<a></a>").prop("href", t.url).prop("host");
            t.dataType = "iframe " + (t.dataType || ""), t.formData = this._getFormData(t), t.redirect && i && i !== location.host && t.formData.push({
                name: t.redirectParamName || "redirect",
                value: t.redirect
            })
        },
        _initDataSettings: function (e) {
            this._isXHRUpload(e) ? (this._chunkedUpload(e, !0) || (e.data || this._initXHRData(e), this._initProgressListener(e)), e.postMessage && (e.dataType = "postmessage " + (e.dataType || ""))) : this._initIframeSettings(e)
        },
        _getParamName: function (t) {
            var i = e(t.fileInput), n = t.paramName;
            return n ? e.isArray(n) || (n = [n]) : (n = [], i.each(function () {
                for (var t = e(this), i = t.prop("name") || "files[]", s = (t.prop("files") || [1]).length; s;) n.push(i), s -= 1
            }), n.length || (n = [i.prop("name") || "files[]"])), n
        },
        _initFormSettings: function (t) {
            t.form && t.form.length || (t.form = e(t.fileInput.prop("form")), t.form.length || (t.form = e(this.options.fileInput.prop("form")))), t.paramName = this._getParamName(t), t.url || (t.url = t.form.prop("action") || location.href), t.type = (t.type || "string" === e.type(t.form.prop("method")) && t.form.prop("method") || "").toUpperCase(), "POST" !== t.type && "PUT" !== t.type && "PATCH" !== t.type && (t.type = "POST"), t.formAcceptCharset || (t.formAcceptCharset = t.form.attr("accept-charset"))
        },
        _getAJAXSettings: function (t) {
            var i = e.extend({}, this.options, t);
            return this._initFormSettings(i), this._initDataSettings(i), i
        },
        _getDeferredState: function (e) {
            return e.state ? e.state() : e.isResolved() ? "resolved" : e.isRejected() ? "rejected" : "pending"
        },
        _enhancePromise: function (e) {
            return e.success = e.done, e.error = e.fail, e.complete = e.always, e
        },
        _getXHRPromise: function (t, i, n) {
            var s = e.Deferred(), a = s.promise();
            return i = i || this.options.context || a, !0 === t ? s.resolveWith(i, n) : !1 === t && s.rejectWith(i, n), a.abort = s.promise, this._enhancePromise(a)
        },
        _addConvenienceMethods: function (t, i) {
            var n = this, s = function (t) {
                return e.Deferred().resolveWith(n, t).promise()
            };
            i.process = function (t, a) {
                return (t || a) && (i._processQueue = this._processQueue = (this._processQueue || s([this])).then(function () {
                    return i.errorThrown ? e.Deferred().rejectWith(n, [i]).promise() : s(arguments)
                }).then(t, a)), this._processQueue || s([this])
            }, i.submit = function () {
                return "pending" !== this.state() && (i.jqXHR = this.jqXHR = !1 !== n._trigger("submit", e.Event("submit", {delegatedEvent: t}), this) && n._onSend(t, this)), this.jqXHR || n._getXHRPromise()
            }, i.abort = function () {
                return this.jqXHR ? this.jqXHR.abort() : (this.errorThrown = "abort", n._trigger("fail", null, this), n._getXHRPromise(!1))
            }, i.state = function () {
                return this.jqXHR ? n._getDeferredState(this.jqXHR) : this._processQueue ? n._getDeferredState(this._processQueue) : void 0
            }, i.processing = function () {
                return !this.jqXHR && this._processQueue && "pending" === n._getDeferredState(this._processQueue)
            }, i.progress = function () {
                return this._progress
            }, i.response = function () {
                return this._response
            }
        },
        _getUploadedBytes: function (e) {
            var t = e.getResponseHeader("Range"), i = t && t.split("-"), n = i && i.length > 1 && parseInt(i[1], 10);
            return n && n + 1
        },
        _chunkedUpload: function (t, i) {
            t.uploadedBytes = t.uploadedBytes || 0;
            var n, s, a = this, o = t.files[0], r = o.size, c = t.uploadedBytes, l = t.maxChunkSize || r,
                d = this._blobSlice, p = e.Deferred(), u = p.promise();
            return !(!(this._isXHRUpload(t) && d && (c || ("function" === e.type(l) ? l(t) : l) < r)) || t.data) && (!!i || (c >= r ? (o.error = t.i18n("uploadedBytes"), this._getXHRPromise(!1, t.context, [null, "error", o.error])) : (s = function () {
                var i = e.extend({}, t), u = i._progress.loaded;
                i.blob = d.call(o, c, c + ("function" === e.type(l) ? l(i) : l), o.type), i.chunkSize = i.blob.size, i.contentRange = "bytes " + c + "-" + (c + i.chunkSize - 1) + "/" + r, a._trigger("chunkbeforesend", null, i), a._initXHRData(i), a._initProgressListener(i), n = (!1 !== a._trigger("chunksend", null, i) && e.ajax(i) || a._getXHRPromise(!1, i.context)).done(function (n, o, l) {
                    c = a._getUploadedBytes(l) || c + i.chunkSize, u + i.chunkSize - i._progress.loaded && a._onProgress(e.Event("progress", {
                        lengthComputable: !0,
                        loaded: c - i.uploadedBytes,
                        total: c - i.uploadedBytes
                    }), i), t.uploadedBytes = i.uploadedBytes = c, i.result = n, i.textStatus = o, i.jqXHR = l, a._trigger("chunkdone", null, i), a._trigger("chunkalways", null, i), c < r ? s() : p.resolveWith(i.context, [n, o, l])
                }).fail(function (e, t, n) {
                    i.jqXHR = e, i.textStatus = t, i.errorThrown = n, a._trigger("chunkfail", null, i), a._trigger("chunkalways", null, i), p.rejectWith(i.context, [e, t, n])
                }).always(function () {
                    a._deinitProgressListener(i)
                })
            }, this._enhancePromise(u), u.abort = function () {
                return n.abort()
            }, s(), u)))
        },
        _beforeSend: function (e, t) {
            0 === this._active && (this._trigger("start"), this._bitrateTimer = new this._BitrateTimer, this._progress.loaded = this._progress.total = 0, this._progress.bitrate = 0), this._initResponseObject(t), this._initProgressObject(t), t._progress.loaded = t.loaded = t.uploadedBytes || 0, t._progress.total = t.total = this._getTotal(t.files) || 1, t._progress.bitrate = t.bitrate = 0, this._active += 1, this._progress.loaded += t.loaded, this._progress.total += t.total
        },
        _onDone: function (t, i, n, s) {
            var a = s._progress.total, o = s._response;
            s._progress.loaded < a && this._onProgress(e.Event("progress", {
                lengthComputable: !0,
                loaded: a,
                total: a
            }), s), o.result = s.result = t, o.textStatus = s.textStatus = i, o.jqXHR = s.jqXHR = n, this._trigger("done", null, s)
        },
        _onFail: function (e, t, i, n) {
            var s = n._response;
            n.recalculateProgress && (this._progress.loaded -= n._progress.loaded, this._progress.total -= n._progress.total), s.jqXHR = n.jqXHR = e, s.textStatus = n.textStatus = t, s.errorThrown = n.errorThrown = i, this._trigger("fail", null, n)
        },
        _onAlways: function (e, t, i, n) {
            this._trigger("always", null, n)
        },
        _onSend: function (t, i) {
            i.submit || this._addConvenienceMethods(t, i);
            var n, s, a, o, r = this, c = r._getAJAXSettings(i), l = function () {
                return r._sending += 1, c._bitrateTimer = new r._BitrateTimer, n = n || ((s || !1 === r._trigger("send", e.Event("send", {delegatedEvent: t}), c)) && r._getXHRPromise(!1, c.context, s) || r._chunkedUpload(c) || e.ajax(c)).done(function (e, t, i) {
                    r._onDone(e, t, i, c)
                }).fail(function (e, t, i) {
                    r._onFail(e, t, i, c)
                }).always(function (e, t, i) {
                    if (r._deinitProgressListener(c), r._onAlways(e, t, i, c), r._sending -= 1, r._active -= 1, c.limitConcurrentUploads && c.limitConcurrentUploads > r._sending) for (var n = r._slots.shift(); n;) {
                        if ("pending" === r._getDeferredState(n)) {
                            n.resolve();
                            break
                        }
                        n = r._slots.shift()
                    }
                    0 === r._active && r._trigger("stop")
                })
            };
            return this._beforeSend(t, c), this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending ? (this.options.limitConcurrentUploads > 1 ? (a = e.Deferred(), this._slots.push(a), o = a.then(l)) : (this._sequence = this._sequence.then(l, l), o = this._sequence), o.abort = function () {
                return s = [void 0, "abort", "abort"], n ? n.abort() : (a && a.rejectWith(c.context, s), l())
            }, this._enhancePromise(o)) : l()
        },
        _onAdd: function (t, i) {
            var n, s, a, o, r = this, c = !0, l = e.extend({}, this.options, i), d = i.files, p = d.length,
                u = l.limitMultiFileUploads, h = l.limitMultiFileUploadSize, f = l.limitMultiFileUploadSizeOverhead,
                m = 0, g = this._getParamName(l), v = 0;
            if (!p) return !1;
            if (h && void 0 === d[0].size && (h = void 0), (l.singleFileUploads || u || h) && this._isXHRUpload(l)) if (l.singleFileUploads || h || !u) if (!l.singleFileUploads && h) for (a = [], n = [], o = 0; o < p; o += 1) m += d[o].size + f, (o + 1 === p || m + d[o + 1].size + f > h || u && o + 1 - v >= u) && (a.push(d.slice(v, o + 1)), s = g.slice(v, o + 1), s.length || (s = g), n.push(s), v = o + 1, m = 0); else n = g; else for (a = [], n = [], o = 0; o < p; o += u) a.push(d.slice(o, o + u)), s = g.slice(o, o + u), s.length || (s = g), n.push(s); else a = [d], n = [g];
            return i.originalFiles = d, e.each(a || d, function (s, o) {
                var l = e.extend({}, i);
                return l.files = a ? o : [o], l.paramName = n[s], r._initResponseObject(l), r._initProgressObject(l), r._addConvenienceMethods(t, l), c = r._trigger("add", e.Event("add", {delegatedEvent: t}), l)
            }), c
        },
        _replaceFileInput: function (t) {
            var i = t.fileInput, n = i.clone(!0), s = i.is(document.activeElement);
            t.fileInputClone = n, e("<form></form>").append(n)[0].reset(), i.after(n).detach(), s && n.focus(), e.cleanData(i.unbind("remove")), this.options.fileInput = this.options.fileInput.map(function (e, t) {
                return t === i[0] ? n[0] : t
            }), i[0] === this.element[0] && (this.element = n)
        },
        _handleFileTreeEntry: function (t, i) {
            var n, s = this, a = e.Deferred(), o = [], r = function (e) {
                e && !e.entry && (e.entry = t), a.resolve([e])
            }, c = function (e) {
                s._handleFileTreeEntries(e, i + t.name + "/").done(function (e) {
                    a.resolve(e)
                }).fail(r)
            }, l = function () {
                n.readEntries(function (e) {
                    e.length ? (o = o.concat(e), l()) : c(o)
                }, r)
            };
            return i = i || "", t.isFile ? t._file ? (t._file.relativePath = i, a.resolve(t._file)) : t.file(function (e) {
                e.relativePath = i, a.resolve(e)
            }, r) : t.isDirectory ? (n = t.createReader(), l()) : a.resolve([]), a.promise()
        },
        _handleFileTreeEntries: function (t, i) {
            var n = this;
            return e.when.apply(e, e.map(t, function (e) {
                return n._handleFileTreeEntry(e, i)
            })).then(function () {
                return Array.prototype.concat.apply([], arguments)
            })
        },
        _getDroppedFiles: function (t) {
            t = t || {};
            var i = t.items;
            return i && i.length && (i[0].webkitGetAsEntry || i[0].getAsEntry) ? this._handleFileTreeEntries(e.map(i, function (e) {
                var t;
                return e.webkitGetAsEntry ? (t = e.webkitGetAsEntry(), t && (t._file = e.getAsFile()), t) : e.getAsEntry()
            })) : e.Deferred().resolve(e.makeArray(t.files)).promise()
        },
        _getSingleFileInputFiles: function (t) {
            t = e(t);
            var i, n;
            t.prop("webkitEntries") || t.prop("entries");
            if (i = e.makeArray(t.prop("files")), i.length) void 0 === i[0].name && i[0].fileName && e.each(i, function (e, t) {
                t.name = t.fileName, t.size = t.fileSize
            }); else {
                if (!(n = t.prop("value"))) return e.Deferred().resolve([]).promise();
                i = [{name: n.replace(/^.*\\/, "")}]
            }
            return e.Deferred().resolve(i).promise()
        },
        _getFileInputFiles: function (t) {
            return t instanceof e && 1 !== t.length ? e.when.apply(e, e.map(t, this._getSingleFileInputFiles)).then(function () {
                return Array.prototype.concat.apply([], arguments)
            }) : this._getSingleFileInputFiles(t)
        },
        _onChange: function (t) {
            var i = this, n = {fileInput: e(t.target), form: e(t.target.form)};
            this._getFileInputFiles(n.fileInput).always(function (s) {
                n.files = s, i.options.replaceFileInput && i._replaceFileInput(n), !1 !== i._trigger("change", e.Event("change", {delegatedEvent: t}), n) && i._onAdd(t, n)
            })
        },
        _onPaste: function (t) {
            var i = t.originalEvent && t.originalEvent.clipboardData && t.originalEvent.clipboardData.items,
                n = {files: []};
            i && i.length && (e.each(i, function (e, t) {
                var i = t.getAsFile && t.getAsFile();
                i && n.files.push(i)
            }), !1 !== this._trigger("paste", e.Event("paste", {delegatedEvent: t}), n) && this._onAdd(t, n))
        },
        _onDrop: function (t) {
            t.dataTransfer = t.originalEvent && t.originalEvent.dataTransfer;
            var i = this, n = t.dataTransfer, s = {};
            n && n.files && n.files.length && (t.preventDefault(), this._getDroppedFiles(n).always(function (n) {
                s.files = n, !1 !== i._trigger("drop", e.Event("drop", {delegatedEvent: t}), s) && i._onAdd(t, s)
            }))
        },
        _onDragOver: t("dragover"),
        _onDragEnter: t("dragenter"),
        _onDragLeave: t("dragleave"),
        _initEventHandlers: function () {
            this._isXHRUpload(this.options) && (this._on(this.options.dropZone, {
                dragover: this._onDragOver,
                drop: this._onDrop,
                dragenter: this._onDragEnter,
                dragleave: this._onDragLeave
            }), this._on(this.options.pasteZone, {paste: this._onPaste})), e.support.fileInput && this._on(this.options.fileInput, {change: this._onChange})
        },
        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, "dragenter dragleave dragover drop"), this._off(this.options.pasteZone, "paste"), this._off(this.options.fileInput, "change")
        },
        _destroy: function () {
            this._destroyEventHandlers()
        },
        _setOption: function (t, i) {
            var n = -1 !== e.inArray(t, this._specialOptions);
            n && this._destroyEventHandlers(), this._super(t, i), n && (this._initSpecialOptions(), this._initEventHandlers())
        },
        _initSpecialOptions: function () {
            var t = this.options;
            void 0 === t.fileInput ? t.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]') : t.fileInput instanceof e || (t.fileInput = e(t.fileInput)), t.dropZone instanceof e || (t.dropZone = e(t.dropZone)), t.pasteZone instanceof e || (t.pasteZone = e(t.pasteZone))
        },
        _getRegExp: function (e) {
            var t = e.split("/"), i = t.pop();
            return t.shift(), new RegExp(t.join("/"), i)
        },
        _isRegExpOption: function (t, i) {
            return "url" !== t && "string" === e.type(i) && /^\/.*\/[igm]{0,3}$/.test(i)
        },
        _initDataAttributes: function () {
            var t = this, i = this.options, n = this.element.data();
            e.each(this.element[0].attributes, function (e, s) {
                var a, o = s.name.toLowerCase();
                /^data-/.test(o) && (o = o.slice(5).replace(/-[a-z]/g, function (e) {
                    return e.charAt(1).toUpperCase()
                }), a = n[o], t._isRegExpOption(o, a) && (a = t._getRegExp(a)), i[o] = a)
            })
        },
        _create: function () {
            this._initDataAttributes(), this._initSpecialOptions(), this._slots = [], this._sequence = this._getXHRPromise(!0), this._sending = this._active = 0, this._initProgressObject(this), this._initEventHandlers()
        },
        active: function () {
            return this._active
        },
        progress: function () {
            return this._progress
        },
        add: function (t) {
            var i = this;
            t && !this.options.disabled && (t.fileInput && !t.files ? this._getFileInputFiles(t.fileInput).always(function (e) {
                t.files = e, i._onAdd(null, t)
            }) : (t.files = e.makeArray(t.files), this._onAdd(null, t)))
        },
        send: function (t) {
            if (t && !this.options.disabled) {
                if (t.fileInput && !t.files) {
                    var i, n, s = this, a = e.Deferred(), o = a.promise();
                    return o.abort = function () {
                        return n = !0, i ? i.abort() : (a.reject(null, "abort", "abort"), o)
                    }, this._getFileInputFiles(t.fileInput).always(function (e) {
                        if (!n) {
                            if (!e.length) return void a.reject();
                            t.files = e, i = s._onSend(null, t), i.then(function (e, t, i) {
                                a.resolve(e, t, i)
                            }, function (e, t, i) {
                                a.reject(e, t, i)
                            })
                        }
                    }), this._enhancePromise(o)
                }
                if (t.files = e.makeArray(t.files), t.files.length) return this._onSend(null, t)
            }
            return this._getXHRPromise(!1, t && t.context)
        }
    })
}), "undefined" == typeof jQuery) throw new Error("jquery-confirm requires jQuery");
var jconfirm, Jconfirm;
!function (e) {
    "use strict";
    e.fn.confirm = function (t, i) {
        return void 0 === t && (t = {}), "string" == typeof t && (t = {
            content: t,
            title: i || !1
        }), e(this).each(function () {
            var i = e(this);
            i.on("click", function (n) {
                n.preventDefault();
                var s = e.extend({}, t);
                i.attr("data-title") && (s.title = i.attr("data-title")), i.attr("data-content") && (s.content = i.attr("data-content")), s.$target = i, i.attr("href") && !t.confirm && (s.confirm = function () {
                    location.href = i.attr("href")
                }), e.confirm(s)
            })
        }), e(this)
    }, e.confirm = function (e, t) {
        return void 0 === e && (e = {}), "string" == typeof e && (e = {content: e, title: t || !1}), jconfirm(e)
    }, e.alert = function (e, t) {
        return void 0 === e && (e = {}), "string" == typeof e && (e = {
            content: e,
            title: t || !1
        }), e.cancelButton = !1, jconfirm(e)
    }, jconfirm = function (t) {
        void 0 === t && (t = {}), jconfirm.defaults && e.extend(jconfirm.pluginDefaults, jconfirm.defaults);
        var t = e.extend({}, jconfirm.pluginDefaults, t);
        return new Jconfirm(t)
    }, Jconfirm = function (t) {
        e.extend(this, t), this._init()
    }, Jconfirm.prototype = {
        _init: function () {
            var e = this;
            this._rand = Math.round(99999 * Math.random()), this._buildHTML(), this._bindEvents(), setTimeout(function () {
                e.open(), e._watchContent()
            }, 0)
        }, _buildHTML: function () {
            var t = this;
            this.animation = "anim-" + this.animation.toLowerCase(), this.closeAnimation = "anim-" + this.closeAnimation.toLowerCase(), this.theme = "jconfirm-" + this.theme.toLowerCase(), "anim-none" == this.animation && (this.animationSpeed = 0), this._lastFocused = e("body").find(":focus"), this.$el = e(this.template).appendTo(this.container).addClass(this.theme), this.$el.find(".jconfirm-box-container").addClass(this.columnClass), this.$el.find(".jconfirm-bg").css(this._getCSS(this.animationSpeed, 1)), this.$el.find(".jconfirm-bg").css("opacity", this.opacity), this.$b = this.$el.find(".jconfirm-box").css(this._getCSS(this.animationSpeed, this.animationBounce)).addClass(this.animation), this.$body = this.$b, this.rtl && this.$el.addClass("rtl"), this._contentReady = e.Deferred(), this._modalReady = e.Deferred(), this.$title = this.$el.find(".title"), this.contentDiv = this.$el.find("div.content"), this.$content = this.contentDiv, this.$contentPane = this.$el.find(".content-pane"), this.$icon = this.$el.find(".icon-c"), this.$closeIcon = this.$el.find(".closeIcon"), this.$contentPane.css(this._getCSS(this.animationSpeed, 1)), this.setTitle(), this.setIcon(), this._setButtons(), this.closeIconClass && this.$closeIcon.html('<i class="' + this.closeIconClass + '"></i>'), t._contentHash = this._hash(t.$content.html()), e.when(this._contentReady, this._modalReady).then(function () {
                t.setContent(), t.setTitle(), t.setIcon()
            }), this._getContent(), this._imagesLoaded(), this.autoClose && this._startCountDown()
        }, _unwatchContent: function () {
            clearInterval(this._timer)
        }, _hash: function () {
            if ("function" == typeof btoa) return btoa(encodeURIComponent(this.$content.html()))
        }, _watchContent: function () {
            var e = this;
            this._timer = setInterval(function () {
                var t = e._hash(e.$content.html());
                e._contentHash != t && (e._contentHash = t, e.setDialogCenter(), e._imagesLoaded())
            }, this.watchInterval)
        }, _bindEvents: function () {
            var t = this, i = !1;
            this.$el.find(".jconfirm-scrollpane").click(function (e) {
                i || t.backgroundDismiss && (t.cancel(), t.close()), i = !1
            }), this.$el.find(".jconfirm-box").click(function (e) {
                i = !0
            }), this.$confirmButton && this.$confirmButton.click(function (e) {
                e.preventDefault();
                var i = t.confirm(t.$b);
                t._stopCountDown(), t.onAction("confirm"), (void 0 === i || i) && t.close()
            }), this.$cancelButton && this.$cancelButton.click(function (e) {
                e.preventDefault();
                var i = t.cancel(t.$b);
                t._stopCountDown(), t.onAction("cancel"), (void 0 === i || i) && t.close()
            }), this.$closeButton && this.$closeButton.click(function (e) {
                e.preventDefault(), t._stopCountDown(), t.cancel(), t.onAction("close"), t.close()
            }), this.keyboardEnabled && setTimeout(function () {
                e(window).on("keyup." + this._rand, function (e) {
                    t.reactOnKey(e)
                })
            }, 500), e(window).on("resize." + this._rand, function () {
                t.setDialogCenter(!0)
            })
        }, _getCSS: function (e, t) {
            return {
                "-webkit-transition-duration": e / 1e3 + "s",
                "transition-duration": e / 1e3 + "s",
                "-webkit-transition-timing-function": "cubic-bezier(.36,1.1,.2, " + t + ")",
                "transition-timing-function": "cubic-bezier(.36,1.1,.2, " + t + ")"
            }
        }, _imagesLoaded: function () {
            var t = this;
            e.each(this.$content.find("img:not(.loaded)"), function (i, n) {
                var s = setInterval(function () {
                    "0px" !== e(n).css("height") && (e(n).addClass("loaded"), t.setDialogCenter(), clearInterval(s))
                }, 40)
            })
        }, _setButtons: function () {
            this.$btnc = this.$el.find(".buttons"), this.confirmButton && "" !== e.trim(this.confirmButton) && (this.$confirmButton = e('<button type="button" class="btn">' + this.confirmButton + "</button>").appendTo(this.$btnc).addClass(this.confirmButtonClass)), this.cancelButton && "" !== e.trim(this.cancelButton) && (this.buttonsReverse ? this.$cancelButton = e('<button type="button" class="btn">' + this.cancelButton + "</button>").prependTo(this.$btnc).addClass(this.cancelButtonClass) : this.$cancelButton = e('<button type="button" class="btn">' + this.cancelButton + "</button>").appendTo(this.$btnc).addClass(this.cancelButtonClass)), this.buttonOther && "" !== e.trim(this.buttonOther) && e(this.buttonOther).prependTo(this.$btnc), this.confirmButton || this.cancelButton || this.$btnc.hide(), this.confirmButton || this.cancelButton || null !== this.closeIcon || (this.$closeButton = this.$b.find(".closeIcon").show()), !0 === this.closeIcon && (this.$closeButton = this.$b.find(".closeIcon").show())
        }, setTitle: function (e) {
            this.title = void 0 !== e ? e : this.title, this.$title.html(this.title || "")
        }, setIcon: function (e) {
            this.title = "undefined" != typeof string ? e : this.title, this.$icon.html(this.icon ? '<i class="' + this.icon + '"></i>' : "")
        }, setContent: function (e) {
            this.content = void 0 === e ? this.content : e, "" == this.content ? (this.$content.html(this.content), this.$contentPane.hide()) : (this.$content.html(this.content), this.$contentPane.show()), this.$content.hasClass("loading") && (this.$content.removeClass("loading"), this.$btnc.find("button").prop("disabled", !1))
        }, _getContent: function (t) {
            var i = this;
            if (t = t || this.content, this._isAjax = !1, this.content) if ("string" == typeof this.content) if ("url:" === this.content.substr(0, 4).toLowerCase()) {
                this._isAjax = !0, this.$content.addClass("loading"), this.$btnc.find("button").prop("disabled", !0);
                var n = this.content.substring(4, this.content.length);
                e.get(n).done(function (e) {
                    i.content = e, i._contentReady.resolve()
                }).always(function (e, t, n) {
                    "function" == typeof i.contentLoaded && i.contentLoaded(e, t, n)
                })
            } else this.setContent(this.content), this._contentReady.reject(); else if ("function" == typeof this.content) {
                this.$content.addClass("loading"), this.$btnc.find("button").attr("disabled", "disabled");
                var s = this.content(this);
                "object" != typeof s ? console.error("The content function must return jquery promise.") : "function" != typeof s.always ? console.error("The object returned is not a jquery promise.") : (this._isAjax = !0, s.always(function (e, t) {
                    i._contentReady.resolve()
                }))
            } else console.error("Invalid option for property content, passed: " + typeof this.content); else this.content = "", this.setContent(this.content), this._contentReady.reject();
            this.setDialogCenter()
        }, _stopCountDown: function () {
            clearInterval(this.timerInterval), this.$cd && this.$cd.remove()
        }, _startCountDown: function () {
            var t = this.autoClose.split("|");
            if (/cancel/.test(t[0]) && "alert" === this.type) return !1;
            if (/confirm|cancel/.test(t[0])) {
                this.$cd = e('<span class="countdown"></span>').appendTo(this["$" + t[0] + "Button"]);
                var i = this;
                i.$cd.parent().click();
                var n = t[1] / 1e3;
                this.timerInterval = setInterval(function () {
                    i.$cd.html(" (" + (n -= 1) + ")"), 0 === n && (i.$cd.html(""), i.$cd.parent().trigger("click"), clearInterval(i.timerInterval))
                }, 1e3)
            } else console.error("Invalid option " + t[0] + ", must be confirm/cancel")
        }, reactOnKey: function (t) {
            var i = e(".jconfirm");
            if (i.eq(i.length - 1)[0] !== this.$el[0]) return !1;
            var n = t.which;
            if (this.contentDiv.find(":input").is(":focus") && /13|32/.test(n)) return !1;
            -1 !== e.inArray(n, this.cancelKeys) && (this.$cancelButton ? this.$cancelButton.click() : this.close()), -1 !== e.inArray(n, this.confirmKeys) && this.$confirmButton && this.$confirmButton.click()
        }, setDialogCenter: function () {
            if ("none" == this.$contentPane.css("display")) var t = 0, i = 0; else {
                var t = this.$content.outerHeight(), i = this.$contentPane.height();
                0 == i && (i = t)
            }
            var n = this.$content.outerWidth();
            this.$content.css({clip: "rect(0px " + (100 + n) + "px " + t + "px -100px)"}), this.$contentPane.css({height: t});
            var s = e(window).height(), a = this.$b.outerHeight() - i + t, o = (s - a) / 2;
            if (a > s - 100) {
                var r = {"margin-top": 50, "margin-bottom": 50};
                e("body").addClass("jconfirm-noscroll")
            } else {
                var r = {"margin-top": o};
                e("body").removeClass("jconfirm-noscroll")
            }
            this.$b.css(r)
        }, close: function () {
            var t = this;
            if (this.isClosed()) return !1;
            "function" == typeof this.onClose && this.onClose(), this._unwatchContent(), t._lastFocused.focus(), e(window).unbind("resize." + this._rand), this.keyboardEnabled && e(window).unbind("keyup." + this._rand), t.$el.find(".jconfirm-bg").removeClass("seen"), e("body").removeClass("jconfirm-noscroll"), this.$b.addClass(this.closeAnimation);
            var i = "anim-none" == this.closeAnimation ? 0 : this.animationSpeed;
            return setTimeout(function () {
                t.$el.remove()
            }, 25 * i / 100), jconfirm.record.closed += 1, jconfirm.record.currentlyOpen -= 1, !0
        }, open: function () {
            var e = this;
            if (this.isClosed()) return !1;
            e.$el.find(".jconfirm-bg").addClass("seen"), this.$b.removeClass(this.animation), this.$b.find("input[autofocus]:visible:first").focus(), jconfirm.record.opened += 1, jconfirm.record.currentlyOpen += 1, "function" == typeof this.onOpen && this.onOpen();
            var t = "jconfirm-box" + this._rand;
            return this.$b.attr("aria-labelledby", t).attr("tabindex", -1).focus(), this.$title ? this.$title.attr("id", t) : this.$content && this.$content.attr("id", t), setTimeout(function () {
                e.$b.css({"transition-property": e.$b.css("transition-property") + ", margin"}), e._modalReady.resolve()
            }, this.animationSpeed), !0
        }, isClosed: function () {
            return "" === this.$el.css("display")
        }
    }, jconfirm.pluginDefaults = {
        template: '<div class="jconfirm"><div class="jconfirm-bg"></div><div class="jconfirm-scrollpane"><div class="container"><div class="row"><div class="jconfirm-box-container"><div class="jconfirm-box" role="dialog" aria-labelledby="labelled" tabindex="-1"><div class="closeIcon">&times;</div><div class="title-c"><span class="icon-c"></span><span class="title"></span></div><div class="content-pane"><div class="content"></div></div><div class="buttons"></div><div class="jquery-clear"></div></div></div></div></div></div></div>',
        title: "鎻愮ず",
        content: "纭畾鍚�",
        contentLoaded: function () {
        },
        icon: "",
        opacity: null,
        confirmButton: "纭畾",
        cancelButton: "鍙栨秷",
        confirmButtonClass: "btn",
        cancelButtonClass: "btn btn-slight",
        buttonsReverse: !1,
        theme: "white",
        animation: "scale",
        closeAnimation: "none",
        animationSpeed: 500,
        animationBounce: 1.2,
        keyboardEnabled: !1,
        rtl: !1,
        confirmKeys: [13],
        cancelKeys: [27],
        container: "body",
        confirm: function () {
        },
        cancel: function () {
        },
        backgroundDismiss: !0,
        autoClose: !1,
        closeIcon: null,
        closeIconClass: !1,
        watchInterval: 100,
        columnClass: "pop-container",
        onOpen: function () {
        },
        onClose: function () {
        },
        onAction: function () {
        }
    }, jconfirm.record = {opened: 0, closed: 0, currentlyOpen: 0}
}(jQuery), function (e, t, i) {
    "use strict";
    var n = (e(t), e(document), !-[1] && t.XMLHttpRequest, !1), s = function (t) {
        this.settings = e.extend({}, s.defaults, t), this.init()
    };
    s.defaults = {
        bind: !1,
        wrapClass: "",
        content: "璇风◢绛�...",
        title: "鎻愮ず",
        onCancel: null,
        onOpen: null,
        onConfirm: null,
        onClose: null,
        closeText: !0,
        confirmText: "纭畾",
        cancelText: "鍙栨秷",
        position: "center",
        inline: !1,
        isSelecter: !1,
        element: null,
        preKa: "",
        autoTime: null,
        lock: !0,
        closeLayer: !0,
        opacityLock: !1
    }, s.prototype = {
        init: function () {
            this.create()
        }, create: function () {
            var t = "", i = "", n = "", s = "", a = "", o = "", r = "";
            this.settings.type && (t = '<i class="icon-dialog icon-dialog-' + this.settings.type + '"></i>'), this.settings.lock && (n = '<div class="dialog-layer"></div>', this.settings.opacityLock && (n = '<div class="dialog-layer dialog-opacity-layer"></div>')), this.settings.preKa && (s = this.settings.preKa + "_"), ("around" == this.settings.position || this.settings.inline) && (a = '<span class="icon-dialog-arrow"></span>'), this.settings.closeText && (o = '<a href="javascript:;" class="close" ka="' + s + 'dialog_close"><i class="icon-close"></i></a>'), (this.settings.confirmText || this.settings.cancelText) && (r = '<div class="dialog-footer"><div class="btns"></div></div>'), i = '<div class="dialog-wrap">' + n + '<div class="dialog-container">' + a + '<div class="dialog-title">' + t + '<h3 class="title">' + this.settings.title + "</h3>" + o + '</div><div class="dialog-con">' + this.settings.content + "</div>" + r + "</div></div>", e(".dialog-wrap").length && !this.settings.inline && e(".dialog-wrap").each(function () {
                e(this).hasClass("v-transfer-dom") || e(this).remove()
            }), this.settings.inline && this.settings.element ? this.dialog = e(i).appendTo(e(this.settings.element).parent()) : this.dialog = e(i).appendTo("body"), (this.settings.onConfirm || this.settings.confirmText) && this.onConfirm(), (this.settings.onCancel && !1 !== this.settings.cancelText || this.settings.cancelText) && this.onCancel(), this.settings.wrapClass && this.dialog.addClass(this.settings.wrapClass), this.settings.type && this.dialog.addClass("dialog-icons-default"), this.settings.position && this.position(), this.bindEvent(), e("body").addClass("dialog-open"), e.isFunction(this.settings.onOpen) && (this.settings.bind ? this.settings.onOpen.apply(this, this.dialog) : this.settings.onOpen(this.dialog)), this.settings.lock && this.lock(), this.autoInter && clearInterval(this.autoInter), e.isNumeric(this.settings.autoTime) && this.autoCloseTimer()
        }, onConfirm: function () {
            var t = this, i = this.dialog.find(".dialog-footer .btns");
            e("<span>", {
                ClASS: "btn btn-sure",
                text: t.settings.confirmText,
                ka: (t.settings.preKa ? t.settings.preKa + "_" : "") + "dialog_confirm",
                click: function () {
                    e.isFunction(t.settings.onConfirm) ? t.settings.bind ? t.settings.onConfirm.apply(t, t.dialog) : t.settings.onConfirm(t.dialog) : t.close("confirm")
                }
            }).prependTo(i)
        }, onCancel: function () {
            var t = this, i = this.dialog.find(".dialog-footer .btns");
            e("<span>", {
                ClASS: "btn btn-outline btn-cancel",
                text: t.settings.cancelText,
                ka: (t.settings.preKa ? t.settings.preKa + "_" : "") + "dialog_cancel",
                click: function () {
                    e.isFunction(t.settings.onCancel) ? t.settings.bind ? t.settings.onCancel.apply(t, t.dialog) : t.settings.onCancel(t.dialog) : t.close("cancel")
                }
            }).prependTo(i)
        }, size: function () {
            var e = this.dialog.find(".dialog-con");
            this.dialog.find(".dialog-container");
            e.css({width: this.settings.width, height: this.settings.height})
        }, position: function () {
            if (this.settings.element) {
                var i = this, n = i.settings.element, s = i.dialog.find(".dialog-container").outerWidth(),
                    a = e(n).offset(), o = a.left + n.width() / 2;
                o < s && (o = s / 2), i.settings.inline || "around" != i.settings.position || i.dialog.css({
                    left: o + "px",
                    top: a.top + "px"
                }), i.settings.inline && (i.dialog.get(0).getBoundingClientRect().top > 330 && t.innerHeight - i.dialog.get(0).getBoundingClientRect().top < 280 && i.dialog.addClass("dialog-up-default"), i.settings.isSelecter && e(document).on("click", function (t) {
                    t.target == n.get(0) || t.target.parentNode == n.get(0) || e(t.target).closest(".dialog-selecter-default").length || (i.dialog.closest(".dropdown-wrap").removeClass("dropdown-menu-open"), i.close())
                }))
            }
        }, lock: function () {
            if (!n) {
                var e = this;
                e.dialog.find(".dialog-container");
                this.settings.closeLayer && e.dialog.find(".dialog-layer").on("click", function () {
                    e.close()
                })
            }
        }, unLock: function () {
            this.settings.lock && n && (e("html,body").css("overflow", "visible"), n = !1)
        }, close: function (t) {
            e.isFunction(this.settings.onClose) && this.settings.onClose(this.dialog, t || ""), this.dialog.remove(), this.unLock(), this.autoInter && clearInterval(this.autoInter), e("body").removeClass("dialog-open")
        }, hide: function (t) {
            e.isFunction(this.settings.onClose) && this.settings.onClose(this.dialog, t || ""), this.dialog.hide(), this.unLock(), e("body").removeClass("dialog-open")
        }, autoCloseTimer: function () {
            var e = this, t = e.dialog.find(".btn-sure"), i = e.settings.autoTime, n = t.text();
            i && (e.autoInter && clearInterval(e.autoInter), e.autoInter = setInterval(function () {
                i <= 1 ? (clearInterval(e.autoInter), e.close("timer")) : (i--, t.text(n + "(" + i + "s)"))
            }, 1e3))
        }, bindEvent: function () {
            var i = this;
            this.dialog.find(".close").on("click", function () {
                i.close("")
            }), e(t).on("resize.dialog", function () {
                i.settings.onResize && i.settings.onResize(i.dialog)
            })
        }
    }, e.dialog = function (e) {
        return new s(e)
    }
}(jQuery, window), function (e) {
    "use strict";
    Array.prototype.indexOf || (Array.prototype.indexOf = function (e, t) {
        var i;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var n = Object(this), s = n.length >>> 0;
        if (0 === s) return -1;
        var a = +t || 0;
        if (Math.abs(a) === 1 / 0 && (a = 0), a >= s) return -1;
        for (i = Math.max(a >= 0 ? a : s - Math.abs(a), 0); i < s;) {
            if (i in n && n[i] === e) return i;
            i++
        }
        return -1
    });
    var t = function (t, i) {
        var i = i || {};
        this.selected = [], this.$body = e(document.body), this.$element = e(t), this.option = e.extend({}, i), this.init()
    }, i = {
        category: function () {
            var t = e.Deferred();
            return e.get("/wapi/zpCommon/data/industry.json", function (e) {
                t.resolve(e.zpData)
            }), t
        }
    }, n = {
        container: function () {
            return '<div class="industry-tip"><div class="industry-tip-item fl"></div><span class="fl gray">鏈€澶氬彲閫�3涓涓�</span><a class="confirm" href="javascript:;">纭畾</a></div><div class="industry-panel"><div class="data-tips"><div class="spinner spinner-circle"><div class="loader"></div><span>姝ｅ湪鍔犺浇鏁版嵁...</span></div></div></div>'
        }, industry: function (t, i) {
            var n = "<table>", s = [];
            i && e.each(i, function (e, t) {
                s.push(parseInt(t.code, 10))
            });
            var a = function (t) {
                var i = "";
                return e.each(t, function (e, t) {
                    var n = s.indexOf(t.code) > -1 ? "selected" : "";
                    i += '<p><span class="' + n + '" data-code="' + t.code + '">' + t.name + "</span></p>"
                }), i
            };
            return e.each(t, function (e, t) {
                n += "<tr>", n += '<td class="industry-category" data-code="' + t.code + '">' + t.name + "</td>", n += "<td>", n += a(t.subLevelModelList), n += "</td>", n += "</tr>"
            }), n += "</table>"
        }
    };
    t.prototype.init = function () {
        var t = this, i = this.$element;
        if (i.hasClass("disabled")) return !1;
        i.off("click").on("click", function () {
            e(".industry-wrapper").length || t.show()
        })
    }, t.prototype.toggleSelected = function () {
        var t = this, i = "";
        t.selected = [], e(".industry-multiple-wrapper .selected").each(function (i, n) {
            t.selected.push({name: e(n).text(), code: e(n).attr("data-code")})
        }), e.each(t.selected, function (e, t) {
            i += '<p data-code="' + t.code + '"><span class="text">' + t.name + '</span><i class="i-close"></i></p>'
        }), e(".industry-multiple-wrapper .industry-tip-item").html(i)
    }, t.prototype.show = function () {
        var t = this, s = t.option.multiple ? "industry-multiple-wrapper " : "";
        t.$dialog = e.dialog({
            bind: !0,
            title: "璇烽€夋嫨琛屼笟绫诲埆",
            content: n.container(),
            closeText: !0,
            confirmText: !1,
            cancelText: !1,
            inline: !0,
            wrapClass: s + "industry-wrapper",
            lock: !0,
            onOpen: function (s) {
                var a = (new Date).getTime();
                e(s).on("click.industry", "table span", function () {
                    var i = {name: e(this).text(), code: e(this).attr("data-code")};
                    t.option.multiple ? (t.selected.length < 3 ? e(this).addClass("selected") : e(this).hasClass("selected") || e.toast({
                        type: "warning",
                        content: "鏈€澶氬彲閫夋嫨3涓涓�"
                    }), t.toggleSelected()) : (t.$element.trigger("selected.industry", i), t.$element.data("selected", [i]), t.close())
                }), e(s).on("click.industry", ".industry-tip .i-close", function () {
                    var i = e(this).parent("p").attr("data-code");
                    e(s).find(".selected[data-code=" + i + "]").removeClass("selected"), t.toggleSelected()
                }), e(s).on("click.industry", ".industry-tip .confirm", function () {
                    t.$element.data("selected", t.selected), t.selected.length ? t.$element.trigger("selected.industry", [t.selected]) : t.$element.trigger("selected.industry", [{
                        name: "涓嶉檺",
                        code: 0
                    }]), t.close()
                }), i.category().then(function (i) {
                    var o = (new Date).getTime() - a, r = o > 500 ? o : 500 - o;
                    setTimeout(function () {
                        e(s).find(".industry-panel").html(n.industry(i, t.$element.data("selected"))), t.toggleSelected()
                    }, r)
                })
            },
            onClose: function (t) {
                e(t).off("click.industry")
            }
        })
    }, t.prototype.close = function () {
        this.$dialog && this.$dialog.close()
    };
    var s = function (i) {
        return this.each(function () {
            var n = e(this), s = n.data("boss.industry");
            s || n.data("boss.industry", s = new t(this, i)), "string" == typeof i && s[i].call(n)
        })
    }, a = e.fn.industry;
    e.fn.industry = s, e.fn.industry.Constructor = t, e.fn.industry.noConflict = function () {
        return e.fn.industry = a, this
    }
}(jQuery), function (e, t, i) {
    "use strict";
    var n = (e(t), e(document), !1), s = function (t) {
        if ("string" == typeof t) var t = {content: t};
        this.settings = e.extend({}, s.defaults, t), this.init()
    };
    s.defaults = {
        content: "鎻愮ず",
        lock: !1,
        wrapClass: null,
        type: null,
        position: "top",
        parentWrap: "body",
        time: 2300,
        pending: ""
    }, s.prototype = {
        init: function () {
            this.create(), this.settings.lock && this.lock()
        }, create: function () {
            var t = "", i = "", n = this;
            this.settings.type && (t = '<i class="icon-toast-' + this.settings.type + '"></i>'), i = '<div data-pending="' + this.settings.pending + '" id="toast"><div class="toast-con">' + t + this.settings.content + "</div></div>", e("#toast").length && e("#toast").remove(), this.toast = e(i).appendTo(this.settings.parentWrap), this.settings.wrapClass && this.toast.addClass(this.settings.wrapClass), this.settings.position && this.position(), this.time(), this.toast.on("click", function () {
                n.close()
            })
        }, position: function () {
            "top" == this.settings.position && this.toast.css("top", 0), "center" == this.settings.position && this.toast.css("bottom", 0), "bottom" == this.settings.position && this.toast.css("bottom", 0)
        }, lock: function () {
            n || (e("html,body").css("overflow", "hidden"), n = !0)
        }, unLock: function () {
            this.settings.lock && n && (e("html,body").css("overflow", "visible"), n = !1)
        }, close: function () {
            var e = this;
            e.toast.addClass("slideup"), setTimeout(function () {
                e.toast.removeClass("slideup").remove()
            }, 500), e.unLock()
        }, time: function () {
            var e = this;
            this.settings.time && "loading" != this.settings.type && (this.closeTimer = setTimeout(function () {
                e.close()
            }, this.settings.time))
        }
    }, e.toast = function (e) {
        new s(e)
    }
}(jQuery, window), function (e, t, i) {
    function n() {
        this.defaultData = [{code: "100000", name: "鎶€鏈�"}, {code: "", name: ""}, {
            code: "",
            name: ""
        }], this.list = this.defaultData, this.active = "active"
    }

    n.prototype = {
        init: function (t) {
            return this.positionType = e('<div class="common-position-type"></div>'), this.callback = t.callback, this.levelType = t.onlyTwoLevel, this.hasSearch = !!t.hasSearch, "object" != typeof t.data ? this.getData(t) : (this.json = t.data, this.addHtml()), this.list
        }, getData: function (t) {
            var i = this;
            e.get(t.data, function (e) {
                e.zpData ? i.json = e.zpData : i.json = e.data, i.addHtml(t.onlyTwoLevel)
            })
        }, addEvent: function () {
            var t = this, i = e(".js-dialog-position"), n = e(".js-common-position");
            this.$search = i.find(".js-position-search"), this.$searchLists = this.$search.find(".position-lists .normal ul"), this.$searchBlank = this.$search.find(".position-lists .blank"), this.$searchInput = this.$search.find(".position-input input"), this.$searchSearchbtn = this.$search.find(".position-input .icon-p-search"), this.currentSelection = -1, n.off("click"), n.on("click", ".js-type li", function () {
                t.list[0].code = e(this).attr("data-code"), t.list[0].name = e(this).text(), t.setOneList(this), t.appendTwoList(e(this).attr("data-code"))
            }), n.on("click", ".js-content .js-li", function () {
                t.list[1].code = e(this).attr("data-code"), t.list[1].name = e(this).text(), t.getValue(this)
            }), n.on("click", ".js-content .js-ol-li", function () {
                t.setPop(this), t.removeNode(e(".js-dialog-position"))
            }), this.$searchInput.on("input focus", function () {
                var i = e(this).val().trim();
                t.getSearchList(i)
            }), this.$searchInput.on("keydown", function (e) {
                t.suggestSelected(e, t)
            }), this.$searchSearchbtn.on("click", function () {
                var i = e(this).siblings(".ipt").val().trim();
                t.getSearchList(i)
            }), this.$searchLists.on("click", "li", function () {
                t.setPop(this), t.removeNode(e(".js-dialog-position"));
                try {
                    _T.sendEvent("position_keyword_click")
                } catch (e) {
                }
            }), i.on("click", function (i) {
                e(i.target).parents(".js-position-search").length || (t.$searchLists.addClass("hide"), t.$searchBlank.addClass("hide"))
            })
        }, getSearchList: function (e) {
            var t = this, i = (t.$search, t.$searchLists), n = t.$searchBlank;
            if (!e) return i.html("").addClass("hide"), void n.addClass("hide");
            var s = function (e) {
                for (var i = t.json, n = [], s = 0; s < i.length; s++) {
                    var a = i[s].name, o = i[s].subLevelModelList || i[s].children || i[s].subList;
                    if (o && o.length) for (var r = 0; r < o.length; r++) {
                        var c = o[r].name, l = o[r].subLevelModelList || o[r].children || o[r].subList;
                        if (t.levelType) {
                            var d = o[r].code || o[r].id, p = e.toLowerCase(), u = c.toLowerCase();
                            u.indexOf(p) >= 0 && n.push({name: c, code: d, text: a})
                        } else if (l && l.length) for (var h = 0; h < l.length; h++) {
                            var f = l[h].name, m = l[h].code || l[h].id, g = e.toLowerCase(), v = f.toLowerCase();
                            v.indexOf(g) >= 0 && n.push({name: f, code: m, text: a + "-" + c})
                        }
                    }
                }
                return n
            }(e);
            try {
                _T.sendEvent("position_keyword_search")
            } catch (e) {
            }
            s.length ? function (e, s) {
                i.html("");
                for (var a = 0; a < e.length; a++) {
                    var o = e[a].name.toLowerCase(), r = s.toLowerCase(), c = o.indexOf(r), l = r.length,
                        d = e[a].name.substring(0, c) + '<span class="h">' + e[a].name.substring(c, c + l) + "</span>" + e[a].name.substring(c + l);
                    i.append('<li data-code="' + e[a].code + '" data-text="' + e[a].name + '"><p class="p-name">' + d + '</p><span class="p-des">' + e[a].text + "</span></li>")
                }
                i.removeClass("hide"), n.addClass("hide"), t.currentSelection = -1, t.$searchLists.scrollTop(0)
            }(s, e) : (i.html("").addClass("hide"), n.removeClass("hide"))
        }, suggestSelected: function (t, i) {
            var n = i, s = n.$searchLists.find("li");
            if ("" != n.$searchInput.val().trim()) switch (t.which) {
                case 38:
                    s.removeClass("selected"), -1 == n.currentSelection || 0 == n.currentSelection ? (n.currentSelection = -1, n.currentSelection = s.length - 1) : n.currentSelection--, s.eq(n.currentSelection).addClass("selected"), n.scrollVisiable(s.eq(n.currentSelection), "up");
                    break;
                case 40:
                    t.preventDefault(), s.removeClass("selected"), n.currentSelection > s.length - 2 && (n.currentSelection = -1), n.currentSelection++, s.eq(n.currentSelection).addClass("selected"), n.scrollVisiable(s.eq(n.currentSelection), "down");
                    break;
                case 13:
                    n.currentSelection = -1;
                    var a = n.$searchLists.find("li.selected"), o = a.get(0);
                    if (a.length) {
                        n.setPop(o), n.removeNode(e(".js-dialog-position"));
                        try {
                            _T.sendEvent("position_keyword_click")
                        } catch (t) {
                        }
                    }
                    break;
                case 27:
                    n.currentSelection = -1, n.$searchInput.val(""), n.$searchLists.html("").addClass("hide"), n.$searchBlank.addClass("hide")
            }
        }, scrollVisiable: function (t, i) {
            var t = t, n = this.$searchLists;
            if (!t) return !1;
            var s = n.find("li").length, a = e(t).index(), o = a > 4 ? a - 4 : 0,
                r = "down" == i && (o < s - 4 || 0 === a), c = "up" == i && (a < s - 5 || a == s - 1);
            "up" == i && (o = a), (c || r) && n.scrollTop(o * e(t).height())
        }, addHtml: function (e) {
            var t = '<div class="common-position js-common-position ' + (e ? "level-two" : "") + ' ">',
                i = [t, '<ul class="type js-type"></ul>', '<div class="content js-content"></div>', "</div>"];
            this.positionType.html(i.join("")), this.positionType.find(".js-type").append(this.getOneData(this.json, e)), e ? this.appendTwoList(1e7) : this.appendTwoList(1e5), this.dialog(), this.addEvent()
        }, appendTwoList: function (t) {
            var i = this.joinTwoData(this.getTwoData(t)), n = e(".js-common-position");
            n = n.length ? n : this.positionType, n.find(".js-content").html(i)
        }, getValue: function (t) {
            var i = e(t).parents(".js-two"), n = e(".js-two"), s = e(".js-li"),
                a = this.getThreeData(e(t).attr("data-code")), o = this.joinThreeData(a);
            a ? (this.resetHTML(n, s), e(t).addClass(this.active), i.append(o)) : (this.setPop(t), this.removeNode(e(".js-dialog-position")))
        }, getOneData: function (t, i) {
            var n = this, s = "";
            return e.each(t, function (e, t) {
                var a = t.name, o = n.getCode(t);
                s += o + "" == "100000" || i && o + "" == "10000000" ? '<li class="active" title="' + a + '" data-code="' + o + '">' + a + "</li>" : '<li title="' + a + '" data-code="' + o + '"">' + a + "</li>"
            }), s
        }, getTwoData: function (t) {
            var i = "", n = this;
            return e.each(this.json, function (e, s) {
                var a = n.getCode(s);
                parseInt(t, 10) === a && (i = s.subLevelModelList || s.children || s.subList)
            }), i
        }, getThreeData: function (t) {
            var i = "", n = this;
            return e.each(this.json, function (s, a) {
                var o = a.subLevelModelList || a.children || a.subList;
                e.each(o, function (e, s) {
                    if (n.getCode(s) == t) return i = s.subLevelModelList || s.children || s.subList, !1
                })
            }), i
        }, removeNode: function (e) {
            e.remove()
        }, setOneList: function (t) {
            var i = this;
            e(".js-type li").map(function (t, n) {
                e(n).removeClass(i.active)
            }), e(t).addClass(this.active)
        }, joinTwoData: function (t) {
            var i = "", n = 0, s = this, a = t.length || 0;
            return e.each(t, function (e, t) {
                var o = s.getCode(t), r = t.name;
                e % 4 == 0 && (i += '<div class="js-two"><ul class="navs" data-eq=' + n++ + ">"), i += '<li class="js-li" data-code="' + o + '">' + r + "</li>", e % 4 != 3 && e !== a - 1 || (i += "</ul></div>")
            }), i
        }, joinThreeData: function (t) {
            var i = this, n = '<ol class="list block">';
            return e.each(t, function (e, t) {
                var s = i.getCode(t), a = t.name;
                n += '<li class="js-ol-li" data-code="' + s + '">' + a + "</li>"
            }), n += "</ol>"
        }, getCode: function (e) {
            return e.code || e.id
        }, setPop: function (t) {
            e(".js-dialog-position").hide(), this.list[2].code = e(t).attr("data-code"), this.list[2].name = e(t).attr("data-text") || e(t).text(), this.callback(this.list), this.list = this.defaultData
        }, resetHTML: function (t, i) {
            var n = this;
            t.map(function (t, i) {
                e(i).find("ol").remove()
            }), i.map(function (t, i) {
                e(i).removeClass(n.active)
            })
        }, getDialogTitleView: function () {
            if (this.hasSearch) {
                return '<div class="position-search js-position-search s-position-search"><div class="position-input"><input class="ipt" placeholder="璇疯緭鍏ヨ亴浣嶅叧閿瘝" type="text" name=""><i class="icon-p-search"></i></div><div class="position-lists"><div class="normal"><ul class="hide"></ul></div><div class="blank hide">鏆傛棤鍖归厤鑱屼綅锛岃鑷鍦ㄤ笅鏂归€夋嫨娣诲姞</div></div></div>'
            }
            return ""
        }, dialog: function () {
            e.dialog({
                title: "璇烽€夋嫨鑱岀被" + this.getDialogTitleView(),
                content: this.positionType.html(),
                closeText: !0,
                confirmText: "",
                cancelText: "",
                wrapClass: "layer-position js-dialog-position",
                preKa: "",
                inline: !1
            })
        }
    }, e.Position = n
}(jQuery, window);
var Payment = function () {
    function e(e) {
        var e = $.extend({
            article: "", text: "", cancelText: !1, confirmText: "纭畾", close: function () {
            }, confirm: function () {
            }
        }, e);
        $.dialog({
            title: "",
            content: r.notice(e),
            confirmText: e.confirmText,
            cancelText: e.cancelText,
            closeText: !0,
            wrapClass: "commerical-success-notice pop-payment",
            lock: !0
        })
    }

    function t(e) {
        var e = $.extend({
            article: "", text: "", confirmText: "纭畾", close: function () {
            }, confirm: function () {
            }
        }, e), t = function () {
            var t = this.$content, i = this;
            t.on("click", ".success-confirm", function () {
                i.close(), e.confirm("confirm")
            }), t.on("click", ".success-cancel", function () {
                i.close(), e.confirm("close")
            })
        };
        $.confirm({
            backgroundDismiss: !1,
            content: r.success(e),
            confirmButton: !1,
            cancelButton: !1,
            buttonsReverse: !0,
            closeIcon: !1,
            columnClass: "pop-payment",
            title: !1,
            onOpen: t,
            onClose: e.close,
            ononfirm: e.confirm
        })
    }

    function i(e, t, i) {
        var n, s = !0, a = {bzbParam: e.bzbParam};
        e.query && (a = $.extend(a, e.query));
        var t = $.extend({
            success: function () {
            }, fail: function () {
            }
        }, t), r = function (i) {
            s && (n.close(), i.ptype = e.data.payType, t.success(i))
        }, c = function () {
            $(".pop-payment .PaymentCheck").html('<i class="loader-gray-17"></i>姝ｅ湪鏌ヨ鏀粯缁撴灉锛岃绋嶅悗'), o.get.queryStatus(e, a).then(function (e) {
                if (1 !== e.zpData.state) {
                    $(".pop-payment .PaymentCheck").html('<span class="gray">鏈敮浠樻垚鍔燂紝璇锋偍鎵爜瀹屾垚鏀粯銆�</span><a class="PayCheckBtn" href="javascript:">閲嶆柊鏌ヨ</a>')
                } else 0 === e.code && 1 == e.zpData.state && (s = !1, r(e))
            })
        }, l = function () {
            o.get.queryStatus(e, a).then(function (e) {
                0 === e.code && 1 !== e.zpData.state ? s && setTimeout(l, 3e3) : 0 === e.code ? (s && r(e), s = !1) : $.toast({
                    type: "error",
                    content: e.message
                })
            })
        }, d = function () {
            var e = this.$content;
            n = this, setTimeout(l, 1500), e.on("click", ".PayCheckBtn", c)
        }, p = function () {
            s = !1, t.close && t.close()
        }, u = function () {
        };
        !function (e) {
            $.confirm({
                content: e,
                confirmButton: !1,
                cancelButton: !1,
                buttonsReverse: !0,
                closeIcon: !1,
                columnClass: "pop-payment",
                title: !1,
                onOpen: d,
                onClose: p,
                confirm: u
            })
        }(i)
    }

    function n(e, t) {
        var i, n = {
            success: function () {
            }, cancel: function () {
            }, fail: function () {
            }
        }, t = $.extend(n, t), e = $.extend({recharge: !1}, e), c = function (e, t) {
            o.post.purchase(e, t).then(function (n) {
                var o = !!e.condition && e.condition(n);
                return 0 != n.code || 1 !== n.zpData.status && 3 !== n.zpData.status && !e.recharge ? ($.toast({
                    type: "error",
                    content: n.message
                }), !1) : o ? e.success(n.zpData) : 4 == e.data.payType && 1 === n.zpData.status ? (i && i.close("confirm"), t.buy && t.buy({
                    pay: e.amount,
                    orderId: n.zpData.orderId,
                    orderNo: n.zpData.orderNo,
                    balance: e.balance,
                    payType: e.data.payType
                }), t.success(n.zpData)) : (e.orderId = n.zpData.orderId, e.qrCode = n.zpData.qrUrl, e.orderNo = n.zpData.orderNo, 2 == e.data.payType ? s(e, t) : a(e, t), t.buy && t.buy({
                    pay: e.amount,
                    balance: e.balance,
                    payType: e.data.payType,
                    orderNo: n.orderNo
                }), void (i && i.close("confirm")))
            }, function () {
            })
        }, l = function (n) {
            var s = $(n);
            i = this, s.on("click", ".prop-order-type p", function () {
                if ($(this).hasClass("selected") || $(this).hasClass("disabled")) return !1;
                s.find(".prop-order-type .selected").addClass("disabled").removeClass("selected"), $(this).addClass("selected").addClass("disabled"), e.data.payType = $(this).attr("data-payType"), c(e, t)
            }), s.on("click", ".btn-block", function () {
                if ($(this).hasClass("disabled")) return !1;
                e.data.payType = 4, $(this).addClass("disabled"), c(e, t)
            }), s.on("click", ".item-coupon-list span", function () {
                $(this).hasClass("selected") ? $(this).removeClass("selected") : ($(".item-coupon-list .selected").removeClass("selected"), $(this).addClass("selected"));
                var t = $(this).index(), i = e.userCouponList[t], n = $(this).parents("li").find(".discount-desc");
                $(this).hasClass("selected") ? (e.coupon = i.offAmount, e.discountId = i.discountId, n.text(i.discountDesc), s.find(".coupon-selected").text("-" + e.coupon + "鐩磋眴").show()) : (e.coupon = 0, e.discountId = "0", n.html("&nbsp;"), s.find(".coupon-selected").text(e.userCouponList.length + "寮犲彲鐢�"));
                var a = e.amount, o = 100 * e.coupon + e.totalOffAmount, r = e.amount - e.balance - o,
                    c = a > o + e.balance ? r : e.amount - o;
                e.pay = c, e.cost = r, e.cost <= 0 && (e.data.payType = 4), s.find(".pay-amount").text(e.pay / 100 + "鐩磋眴"), e.cost > 0 || e.recharge ? (s.find(".prop-order-type").show(), s.find(".btn-block").hide()) : (s.find(".btn-block").show(), s.find(".prop-order-type").hide())
            }), s.on("click", ".coupon-left", function () {
                s.find(".item-coupon").toggleClass("unfold")
            }), s.on("click", ".coupon-selected", function () {
                s.find(".item-coupon").toggleClass("unfold")
            }), s.on("click", ".bead-close", function () {
                i.close(), t.cancel && t.cancel()
            })
        }, d = function () {
            return t.fail()
        }, p = function () {
        }, u = function (e) {
            $.dialog({
                bind: !0,
                title: "",
                content: e,
                closeText: !1,
                confirmText: "",
                cancelText: "",
                closeLayer: !1,
                inline: !0,
                wrapClass: "pop-payment flex-dialog-wrap",
                onOpen: l,
                onClose: d,
                confirm: p
            })
        };
        if ($(".pop-payment").length) return !1;
        if (e.recharge) u(r.recharge(e)); else {
            var h = e.prePayUrl || "";
            o.post.order(e, h, function (i) {
                if (1011 === i.code && (window.location.href = "/logout/"), 1 === i.experience) return void t.success(i);
                var n = {
                    discountId: i.discountId,
                    itemIcon: i.bizIcon,
                    balance: i.remainAmount,
                    amount: i.amount,
                    totalOffAmount: i.totalOffAmount - i.offAmount,
                    needAmount: i.needAmount + i.offAmount,
                    pay: i.needAmount,
                    cost: i.amount - i.remainAmount - i.totalOffAmount,
                    note: i.bizNote || "",
                    coupon: i.offAmount,
                    bzbParam: i.bzbParam,
                    discountList: i.discountList,
                    userCouponList: i.userCouponList,
                    discountParam: i.discountParam,
                    description: i.bizName ? i.bizName : e.description
                };
                e = $.extend(e, n), e.cost < 1 && (e.data.payType = 4), 0 == e.amount || 0 == e.needAmount ? t.success(e) : u(r.purchase(e))
            })
        }
    }

    function s(e, t) {
        var n = {type: "wx", name: "寰俊鏀粯", pay: e.pay, qrCode: e.qrCode};
        i(e, t, r.pay(n)), __conversion("payment_wx")
    }

    function a(e, t) {
        var n = {type: "zfb", name: "鏀粯瀹�", pay: e.pay, qrCode: e.qrCode};
        i(e, t, r.pay(n)), __conversion("payment_zfb")
    }

    var o = {}, r = {}, c = "Free";
    return o.get = {}, o.post = {}, o.post.orderInfo = function (e, t) {
        var i = $.Deferred();
        return $.post("/wapi/zpp/user/bzbOrderInfo", {bzbParam: e}, function (e) {
            0 == e.code ? i.resolve(e) : $.toast({type: "error", content: e.message})
        }), i
    }, o.get.coupon = function (e) {
        var t = $.Deferred();
        return $.get("/wapi/zpp/user/bzbDiscountList", {bzbParam: e, pageSize: 10}, function (e) {
            0 == e.code ? t.resolve(e) : $.toast({type: "error", content: e.message})
        }), t
    }, o.post.order = function (e, t, i) {
        c = "pending";
        var n = "/wapi/zpitem/web/itemMall/preOrder/" + e.itemId;
        !e.data.priceId && e.itemId || (n = "/wapi/zpblock/order/preorder");
        var s = function (e) {
            c = "free", $.when(o.post.orderInfo(e), o.get.coupon(e)).then(function (t, n) {
                t.userCouponList = n.zpData.discountList || [];
                var s = $.extend({}, t.zpData, {bzbParam: e, userCouponList: n.zpData.discountList || []});
                i(s)
            })
        }, a = function (e) {
            if ("string" == typeof e && (e = JSON.parse(e)), 1011 === e.code) return window.location.href = "/user/login";
            0 == e.code && 1 == e.zpData.status ? 1 === e.zpData.experience ? i(e.zpData) : s(e.zpData.bzbParam) : $.toast({
                type: "error",
                content: e.message
            })
        };
        e.data.priceId ? (e.data.bz = e.data.business, e.data.jid = e.data.jobId, $.post(n, e.data, a)) : $.post(n, {paramsJson: encodeURIComponent(JSON.stringify(e.data))}, a)
    }, o.get.queryStatus = function (e, t) {
        var i = $.Deferred();
        return $.ajax({
            method: "post",
            url: "/wapi/zpp/user/payOrderSync",
            data: {orderId: e.orderId},
            cache: !1,
            success: function (e) {
                i.resolve(e)
            }
        }), i
    }, o.post.purchase = function (e, t) {
        var i = $.Deferred(), n = "/wapi/zpp/user/bzbOrder", s = {
            discountParam: e.discountParam,
            bzbParam: e.bzbParam,
            discountId: e.discountId,
            bzbChannel: e.data.payType
        };
        return e.recharge && (n = "/wapi/zpp/user/rechargeBean", s = {
            amount: 100 * e.data.beanCount,
            payChannel: e.data.payType
        }), $.ajax({
            method: "post", url: n, data: s, cache: !1, success: function (e) {
                if (0 != e.code) return $.toast({type: "error", content: e.message}), i.reject(e), t.fail();
                i.resolve(e)
            }, error: function () {
                return t.fail()
            }
        }), i
    }, r.pay = function (e) {
        return Utemplate('<div class="mb-payment"><p class="mb-payment-title"><img src="/v2/web/boss/images/icon-shield.png" />瀹夊叏鏀粯</p><div class="mb-pay-info"><i class="icon-<%this.type%>"></i><%this.name%><i class="currency">锟�</i><i class="amount"><%this.pay / 100%></i></div><div class="qr-code"><img src="<%this.qrCode%>" /></div><div class="mb-payment-result PaymentCheck"><span class="gray">浣跨敤<%this.name%>鎵爜鏀粯</span><a class="PayCheckBtn" href="javascript:">鎴戝凡鏀粯</a></div></div>', e)
    }, r.purchase = function (e) {
        return Utemplate('<div class="mb-payment"><p class="mb-payment-title"><img src="/v2/web/boss/images/icon-shield.png" /><%if(this.article){%><%this.article%><%}else{%>纭鏀粯<%}%><i class="bead-close"></i></p><dl class="order-detail"><dt><img src="<%this.itemIcon%>"><div class="item-prop fl"><p ><span class="item-name"><%this.description%></span><%if(this.note){%><br><%this.note%><%}%></p></div><span class="fr"><%this.amount/100%>鐩磋眴</span></dt><%if (0 < this.discountList.length) {%><dd class="item-coupon"><p>浼樻儬</p><ul class="pay-active-list"><%for(var j=0;j<this.discountList.length;j++){%><li><i class="tag-desc"><%this.discountList[j].discountTag%></i><%if(this.discountList[j].discountType == 1){%><span class="amount-desc coupon-selected"><%this.discountList[j].discountAmountDesc%></span><%}else{%><span class="amount-desc"><%this.discountList[j].discountAmountDesc%></span><%}%><p class="discount-desc"><%this.discountList[j].discountDesc%></p><%if(this.discountList[j].discountType == 1){%><div class="item-coupon-list"><%for(var i=0;i<this.userCouponList.length;i++){%><span <%if(i==0){%>class="selected"<%}%> data-id="<%this.userCouponList[i].discountId%>" <%if(this.userCouponList[i].selected){%>class="selected"<%}%>>鍑�<%this.userCouponList[i].offAmount%>鐩磋眴</span><%}%></div><%}%></li><%}%></ul></dd><%}%><dd>鐩磋眴浣欓<span class="fr"><%this.balance/100%>鐩磋眴</span></dd><dd>杩橀渶鏀粯<span class="fr pay-amount"><%this.pay/100%>鐩磋眴</span></dd></dl><div class="prop-order"><div class="prop-order-type" <%if(this.cost <= 0){%>style="display: none;"<%}%>> <div class="prop-type-article">鐩磋眴浣欓涓嶈冻锛岃閫夋嫨鏀粯鏂瑰紡锛�</div> <p class="fl payment-wx" data-type="wx" data-payType="2"><i class="icon-wx"></i>寰俊鏀粯</p> <p class="fr payment-zfb" data-type="zfb" data-payType="1"><i class="icon-zfb"></i>鏀粯瀹�</p> </div><div class="prop-buttons"><button class="btn btn-block"  <%if(0 < this.cost){%>style="display: none;"<%}%>>绔嬪嵆鏀粯</button></div><div class="payment-agreement">浠樿垂鍗宠〃绀哄悓鎰�<a href="https://m.zhipin.com/H5/html/protocol/incrementProtocol.html" target="_blank">銆夿oss鐩磋仒澧炲€兼湇鍔″崗璁€�</a></div></div></div>', e)
    }, r.recharge = function (e) {
        return Utemplate('<div class="mb-payment"><p class="mb-payment-title"><img src="/v2/web/boss/images/icon-shield.png" />纭鏀粯<i class="bead-close"></i></p><dl class="order-detail"><dt><img src="/v2/web/boss/images/prop/icon-bean.png" /><span class="item-name"><%this.description%></span><span class="fr"><%this.amount/100%>鐩磋眴</span></dt><dd>鏀粯閲戦<span class="fr pay-amount">锟�<%this.pay/100%></span></dd></dl><div class="prop-order"><div class="prop-order-type"> <div class="prop-type-article">璇烽€夋嫨鏀粯鏂瑰紡锛�</div> <p class="fl payment-wx" data-type="wx" data-payType="2"><i class="icon-wx"></i>寰俊鏀粯</p> <p class="fr payment-zfb" data-type="zfb" data-payType="1"><i class="icon-zfb"></i>鏀粯瀹�</p> </div><div class="payment-agreement">浠樿垂鍗宠〃绀哄悓鎰�<a href="https://m.zhipin.com/H5/html/protocol/incrementProtocol.html" target="_blank">銆夿oss鐩磋仒澧炲€兼湇鍔″崗璁€�</a></div></div></div>', e)
    }, r.success = function (e) {
        return Utemplate('<div class="mb-payment"><p class="mb-payment-title"><img src="/v2/web/boss/images/icon-shield.png" />瀹夊叏鏀粯</p><div class="pay-info-text"><img src="/v2/web/boss/images/layer/succ.png" /><p class="article"><%this.article%></p><div class="text gray"><%this.text%></div><p><%if(this.cancelText){%><a href="javascript:" class="success-cancel btn"><%this.cancelText%></a><%}%><a href="javascript:" class="btn-primary success-confirm btn"><%this.confirmText%></a></p></div></div>', e)
    }, r.notice = function (e) {
        return Utemplate('<div class="mb-payment"><p class="mb-payment-title"><img src="/v2/web/boss/images/icon-shield.png" />瀹夊叏鏀粯</p><div class="pay-info-text"><img src="/v2/web/boss/images/layer/succ.png" /><p class="article"><%this.article%></p><div class="text gray"><%this.text%></div></p></div></div>', e)
    }, {wx: s, zfb: a, notice: e, success: t, purchase: n, balance: o.get.balance}
}(), Purchase = function () {
    function e(e, t, i) {
        Payment.success({
            article: e || "璐拱鎴愬姛", text: t || "", confirm: function () {
                i.confirm && i.confirm()
            }, close: function () {
                i.close && i.close()
            }
        })
    }

    function t(t, i, n) {
        "-1" == n.item.view ? n.item.view = "涓嶉檺" : n.item.view = (n.item.view + "").replace("浜�", "") + "浜�";
        var s = n.action ? n.action : "鍙戝竷", a = {
            ordinary: {
                1: "鐏垎鑱屼綅鏅€氱増" + s + "鎴愬姛锛佸彲淇濇寔鑱屼綅鍦ㄧ嚎<%this.description%>锛屾湡闂存瘡鏃ユ煡鐪嬬墰浜轰笂闄�<%this.view%>锛屽紑鑱婁笂闄�<%this.employ%>銆�",
                2: "",
                3: "鐏垎鑱屼綅鏅€氱増" + n.action + "鎴愬姛锛佸彲淇濇寔鑱屼綅鍦ㄧ嚎<%this.description%>锛屾湡闂存瘡鏃ユ煡鐪嬬墰浜轰笂闄�<%this.view%>锛屽紑鑱婁笂闄�<%this.employ%>銆�",
                4: "宸叉垚鍔熷崌绾ц嚦鐏垎鑱屼綅鐣呰亰鐗堬紒褰撳墠鍓╀綑鏈夋晥鏈�<%this.restDays%>澶╋紝鏈熼棿姣忔棩鏌ョ湅鐗涗汉<%this.view%>锛屽紑鑱�<%this.employ%>浜恒€�"
            },
            carefree: {
                1: "鐏垎鑱屼綅鐣呰亰鐗堝彂甯冩垚鍔燂紒鍙繚鎸佽亴浣嶅湪绾�<%this.description%>锛屾湡闂存瘡鏃ユ煡鐪嬬墰浜�<%this.view%>锛屽紑鑱婄墰浜�<%this.employ%>銆�",
                2: "",
                3: "鐏垎鑱屼綅鐣呰亰鐗�" + n.action + "鎴愬姛锛佸彲淇濇寔鑱屼綅鍦ㄧ嚎<%this.description%>锛屾湡闂存瘡鏃ユ煡鐪嬬墰浜�<%this.view%>锛屽紑鑱婄墰浜�<%this.employ%>銆�",
                4: "宸叉垚鍔熷崌绾ц嚦鐏垎鑱屼綅鐣呰亰鐗堬紒褰撳墠鍓╀綑鏈夋晥鏈�<%this.restDays%>澶╋紝鏈熼棿姣忔棩鏌ョ湅鐗涗汉<%this.view%>锛屽紑鑱�<%this.employ%>浜恒€�"
            },
            experience: {
                1: "鐏垎鑱屼綅鏅€氱増鍙戝竷鎴愬姛锛佽鑱屼綅鍙厤璐瑰湪绾�<%this.expiredays%>澶╋紝涓洪伩鍏嶅奖鍝嶆嫑鑱橈紝璇峰強鏃跺欢闀挎嫑鑱樻椂闀裤€�",
                2: "鐏垎鑱屼綅鏅€氱増鍙戝竷鎴愬姛锛佽鑱屼綅鍙厤璐瑰湪绾�<%this.expiredays%>澶╋紝涓洪伩鍏嶅奖鍝嶆嫑鑱橈紝璇峰強鏃跺欢闀挎嫑鑱樻椂闀裤€�",
                3: "鐏垎鑱屼綅鏅€氱増鍙戝竷鎴愬姛锛佽鑱屼綅鍙厤璐瑰湪绾�<%this.expiredays%>澶╋紝涓洪伩鍏嶅奖鍝嶆嫑鑱橈紝璇峰強鏃跺欢闀挎嫑鑱樻椂闀裤€�",
                4: "鐏垎鑱屼綅鏅€氱増鍙戝竷鎴愬姛锛佽鑱屼綅鍙厤璐瑰湪绾�<%this.expiredays%>澶╋紝涓洪伩鍏嶅奖鍝嶆嫑鑱橈紝璇峰強鏃跺欢闀挎嫑鑱樻椂闀裤€�",
                5: "鐏垎鑱屼綅鏅€氱増鍙戝竷鎴愬姛锛佽鑱屼綅鍙厤璐瑰湪绾�<%this.expiredays%>澶╋紝涓洪伩鍏嶅奖鍝嶆嫑鑱橈紝璇峰強鏃跺欢闀挎嫑鑱樻椂闀裤€�"
            }
        }, o = {
            ordinary: {1: "鐏垎鑱屼綅-鏅€氱増", 2: "", 3: "鐏垎鑱屼綅-鏅€氱増", 4: "鐏垎鑱屼綅-鏅€氱増"},
            carefree: {1: "鐏垎鑱屼綅-鐣呰亰鐗�", 2: "", 3: "鐏垎鑱屼綅-鐣呰亰鐗�", 4: "鐏垎鑱屼綅-鐣呰亰鐗�"},
            experience: {1: "鐏垎鑱屼綅", 2: "", 3: "", 4: "", 5: "鐏垎鑱屼綅"}
        }, r = {
            0: {
                1: "block_sendjob_purchase_hot_",
                2: "block_extendjob_purchase_hot_",
                3: "block_openjob_purchase_hot_",
                4: "block_upgradejob_purchase_hot_"
            },
            1: {
                1: "block_sendjob_purchase_super_",
                2: "block_extendjob_purchase_super_",
                3: "block_openjob_purchase_super_",
                4: "block_upgradejob_purchase_super_"
            }
        };
        try {
            var c = r[i.hotJobType][i.action] + i.priceId;
            _T.sendEvent(c)
        } catch (e) {
        }
        var s = n.item.type || "ordinary", l = Utemplate(a[s][i.action], n.item), d = o[s][i.action],
            p = n.action ? n.action + "鎴愬姛" : "鍙戝竷鎴愬姛";
        (n.item.combos && n.item.combos.activityType || n.item.activityType) && (l += '<ul class="vip-promotion-2018-notice"><li>1.娲诲姩鎴鏃堕棿2019骞�1鏈�1鏃�,瓒呭嚭娲诲姩鏃堕棿鑼冨洿锛岃喘涔扮殑鍟嗗搧涓嶅啀浜彈娲诲姩鎶樻墸</li><li>2.鏈浼樻儬娲诲姩浠呴拡瀵归儴鍒嗙敤鎴�,鏈€缁堣В閲婃潈褰払OSS鐩磋仒鎵€鏈�</li><li>3.娲诲姩鏈熼棿璐拱鐨勫晢鍝佸師鍒欎笂鏃犳硶鐢宠閫€娆�,濡傚洜骞冲彴鍘熷洜瀵艰嚧鎮ㄦ棤娉曚娇鐢ㄨ处鍙风殑璧犻€佹椂闀胯鑱旂郴瀹㈡湇</li></ul>');
        var u = function (t) {
            e(p, l, n), "function" == typeof n.success && n.success(t)
        }, h = {url: t, data: i, description: d, amount: n.item.pay, success: u}, f = {
            success: function (e) {
                var t = {1: "bean", 2: "wx", 3: "zfb"};
                i.hotJobType && i.action && e.ptype && window.top.__conversion(r[i.hotJobType][i.action] + t[e.ptype] + "_" + i.priceId), u(e)
            }
        };
        Payment.purchase(h, f)
    }

    return {
        vip: function (e, t) {
            var i = t || {}, n = function () {
                $.toast({type: "success", content: "鎮ㄥ凡鎴愬姛璐拱VIP璐﹀彿锛屽彲鍦╒IP鏉冪泭椤甸潰鏌ョ湅浣跨敤鏄庣粏"}), i.success && i.success()
            }, s = {
                url: "/boss/item/pay/vipaccount.json",
                data: e,
                description: "璐拱閬撳叿锛氥€孷IP璐﹀彿銆�- 1涓湀",
                amount: parseInt(e.amount, 10),
                success: n
            }, a = {success: n};
            Payment.purchase(s, a)
        }, position: t, commercial: function (t, i) {
            var n = 11 == i.item.business ? "鏅€氳亴浣�" : "鐏垎鑱屼綅", s = "";
            i.item && i.item.categoryList && i.item.categoryList.filter(function (e) {
                return e.name && e.name.indexOf("閬撳叿璐拱鎶樻墸") > -1
            }).length && (s = "锛圴IP閬撳叿涓撲韩浠风洰鍓嶅彧鏀寔6.12浠ヤ笂鐗堟湰鍜岀綉椤电増浣跨敤锛屾殏涓嶆敮鎸乮OS锛�");
            var a = {
                1: "鍏嶈垂璇曠敤鐏垎鑱屼綅",
                2: n + "-<%this.priceName%>",
                3: "鍗囩骇VIP璐﹀彿",
                4: "璐拱" + i.item.title,
                5: "鍗囩骇VIP璐﹀彿",
                6: n + "-<%this.priceName%>",
                7: "",
                8: "",
                9: "鍏嶈垂璇曠敤鐏垎鑱屼綅",
                10: n + "-<%this.priceName%>",
                11: "鍗囩骇VIP璐﹀彿",
                12: "璐拱<%this.title%>",
                16: "鍗囩骇VIP璐﹀彿"
            }, o = {
                1: "鐏垎鑱屼綅鍙戝竷鎴愬姛锛佽鑱屼綅鍙�<%this.title%>锛屼负閬垮厤褰卞搷鎷涜仒锛岃鍙婃椂寤堕暱鎷涜仒鏃堕暱銆�",
                2: n + "<%this.priceName%>鍙戝竷鎴愬姛锛佸彲淇濇寔鑱屼綅鍦ㄧ嚎涓€涓湀锛屾湡闂村彲<%this.descList[1].bottomDesc%>鐗涗汉<%this.descList[1].count%><%this.descList[1].unitDesc%>锛�<%this.descList[0].bottomDesc%><%this.descList[0].count%><%this.descList[0].unitDesc%>銆�",
                3: "鎮ㄥ凡鎴愬姛璐拱VIP璐﹀彿锛屽彲鍦╒IP鏉冪泭椤甸潰鏌ョ湅浣跨敤鏄庣粏" + s,
                4: "鎮ㄥ凡鎴愬姛璐拱銆�<%this.title%>銆嶏紝<%if(this.business != 16){%><%this.inDate%>鍐咃紝<%}%>涓诲姩娌熼€氫汉鏁�<%this.chat%>锛岃禒閫佷富鍔ㄦ煡鐪嬩汉鏁�<%this.view%>銆�",
                5: "鎮ㄥ凡鎴愬姛璐拱VIP璐﹀彿锛屽彲鍦╒IP鏉冪泭椤甸潰鏌ョ湅浣跨敤鏄庣粏" + s,
                6: n + "<%this.priceName%>鍙戝竷鎴愬姛锛佸彲淇濇寔鑱屼綅鍦ㄧ嚎<%this.expireName%>锛屾湡闂村彲<%this.descList[1].bottomDesc%>鐗涗汉<%this.descList[1].count%><%this.descList[1].unitDesc%>锛�<%this.descList[0].bottomDesc%><%this.descList[0].count%><%this.descList[0].unitDesc%>銆�",
                7: "",
                8: "",
                9: "",
                10: n + "<%this.priceName%>鍙戝竷鎴愬姛锛佸彲淇濇寔鑱屼綅鍦ㄧ嚎<%this.expireName%>锛屾湡闂村彲<%this.descList[1].bottomDesc%>鐗涗汉<%this.descList[1].count%><%this.descList[1].unitDesc%>锛�<%this.descList[0].bottomDesc%><%this.descList[0].count%><%this.descList[0].unitDesc%>銆�",
                11: "鎮ㄥ凡鎴愬姛璐拱VIP璐﹀彿锛屽彲鍦╒IP鏉冪泭椤甸潰鏌ョ湅浣跨敤鏄庣粏" + s,
                12: "",
                16: "鎮ㄥ凡鎴愬姛璐拱VIP璐﹀彿锛屽彲鍦╒IP鏉冪泭椤甸潰鏌ョ湅浣跨敤鏄庣粏" + s
            };
            4 == i.item.cardId && (i.title = i.item.title, i.item.chat = i.item.chatDescList[0], i.item.inDate = i.item.chatDescList.length > 2 ? i.item.chatDescList[1] : "", i.item.view = "+" + 2 * parseInt(i.item.chat, 10) + "娆�");
            var r = i.item ? i.item : i, c = r.cardId, l = a[c] ? Utemplate(a[c], r) : "", d = 9 == c ? function (e) {
                return e.categoryList ? e.categoryList.map(function (e) {
                    return e.bottomDesc + e.count + e.unitDesc
                }).join("锛�") : ""
            }(r) : o[c] ? Utemplate(o[c], r) : "", p = function (t) {
                var n = function () {
                };
                if (i.success ? n = i.success : i.confirm && (n = i.confirm), 1 === t.experience) return e("鍏嶈垂璇曠敤鐏垎鑱屼綅", t.dialog.content, {confirm: n}), !0;
                if (t.bzbParam) return $.get("/wapi/zpblock/order/bzbquery", {bzbParam: t.bzbParam}).success(function (t) {
                    e(t.zpData.dialog.title, t.zpData.dialog.content, {confirm: n})
                }), !0;
                var s = "";
                3 == c && r.activityType && (s = '<ul class="vip-promotion-2018-notice"><li>鐗瑰埆娉ㄦ剰锛�</li><li>1. 娲诲姩鏈熼棿锛屾瘡涓敤鎴峰彧鑳借喘涔颁竴娆IP璐﹀彿锛屼笉鍙娆¤喘涔帮紱</li><li>2. 娲诲姩鏈熼棿璐拱鐨勫晢鍝佸師鍒欎笂鏃犳硶鐢宠閫€娆撅紝濡傚洜骞冲彴鍘熷洜瀵艰嚧鎮ㄦ棤娉曚娇鐢ㄨ处鍙风殑璧犻€佹椂闀胯鑱旂郴瀹㈡湇锛�</li></ul>'),
                2 == c && r.activityType && (s = '<ul class="vip-promotion-2018-notice"><li>鐗瑰埆娉ㄦ剰锛�</li><li>1. 娲诲姩鎴鏃堕棿1鏈�1鏃�,瓒呭嚭娲诲姩鏃堕棿鑼冨洿锛岃喘涔扮殑鍟嗗搧涓嶅啀浜彈娲诲姩鎶樻墸锛�</li><li>2. 鏈浼樻儬娲诲姩浠呴拡瀵归儴鍒嗙敤鎴�,鏈€缁堣В閲婃潈褰払OSS鐩磋仒鎵€鏈夛紱</li><li>3. 娲诲姩鏈熼棿璐拱鐨勫晢鍝佸師鍒欎笂鏃犳硶鐢宠閫€娆惧鍥犲钩鍙板師鍥犲鑷存偍鏃犳硶浣跨敤璐﹀彿鐨勮禒閫佹椂闀胯鑱旂郴瀹㈡湇锛�</li></ul>'), e(l, d + s, {confirm: n})
            }, u = {
                url: "/boss/block/pay.json",
                data: t,
                tid: r.p || "",
                description: l,
                amount: parseInt(r.beanCount, 10),
                success: p
            };
            i.item.article && (u.article = i.item.article);
            var h = {
                buy: function (e) {
                    var t = {action: "confirm-payment", p: "", p2: r.beanCount, p3: e.balance, p4: e.pay, p5: e.pay};
                    Block.action(t)
                }, success: p
            };
            Payment.purchase(u, h)
        }
    }
}(), Recharge = function () {
    function e(e) {
        var t = {
            recharge: !0,
            url: e.url || "/boss/item/rechargebean.json",
            amount: 100 * e.amount,
            pay: 100 * e.pay,
            description: "鐩磋眴鍏呭€硷細" + e.amount + "涓�",
            data: {beanCount: e.amount}
        }, i = {
            success: function (t) {
                e.save ? Payment.success({
                    article: "鐩磋眴鍏呭€兼垚鍔�",
                    text: "鏈鍏呭€间负鎮ㄨ妭鐪佷簡" + e.save + "鍏�"
                }) : Payment.success({
                    article: "鐩磋眴鍏呭€兼垚鍔�",
                    text: "浣犲彲浠ュ湪 BOSS鐩磋仒 APP銆岄挶鍖呫€嶄腑鏌ョ湅鍏呭€兼槑缁�"
                }), "function" == e.callback && e.callback({pay: e.pay, save: e.save, amount: e.amount})
            }
        };
        Payment.purchase(t, i)
    }

    function t(t) {
        var i = function (e) {
            var e = $(".recharge-beans-rebate .selected").length ? parseInt($(".recharge-beans-rebate .selected").attr("data-amount"), 10) : $(".recharge-beans-rebate .ipt").val();
            if ($(".recharge-beans-rebate .order-info").remove(), e > 0) {
                $(".recharge-beans-rebate .btn-sure").removeClass("disabled");
                var t = a(e, n(e)),
                    i = '<div class="order-info">鏀粯閲戦<span class="order-amount">锟�' + t.pay + '</span><span class="gray">(宸插噺' + t.save + "鍏冿級</span></div>";
                $(i).insertBefore($(".recharge-beans-rebate .btns"))
            } else $(".recharge-beans-rebate .btn-sure").addClass("disabled")
        }, n = function (e) {
            var i = 0;
            for (var n in t.discountInfo.rangeDiscount) {
                e >= parseInt(n, 10) && (i = t.discountInfo.rangeDiscount[n])
            }
            return i
        }, o = function (e) {
            $(e).on("input", ".ipt-amount", function () {
                var t = $(this).val().replace(/\D+/g, "");
                t.length && (t = parseInt($(this).val(), 10)), $(this).val(t), $(e).find(".recharge-rebate-panel .selected").removeClass("selected"), i()
            }), $(e).on("click", ".recharge-rebate-panel li", function () {
                $(e).find(".recharge-rebate-panel .selected").removeClass("selected"), $(this).addClass("selected"), i()
            }), i()
        }, r = function (i) {
            if ($(i).find(".btn-sure").hasClass("disabled")) return !1;
            var s = $(".recharge-beans-rebate .selected").length ? parseInt($(".recharge-beans-rebate .selected").attr("data-amount"), 10) : $(".recharge-beans-rebate .ipt").val();
            e($.extend({url: t.url, callback: t.success, confirm: t.success}, a(s, n(s)))), $(i).remove()
        };
        $.dialog({
            title: "鐩磋眴鍏呭€�", content: s.rebate(function () {
                return [100, 200, 300, 500, 1e3].map(function (e) {
                    return {amount: e, save: a(e, n(e)).save}
                })
            }()), confirmText: "纭畾鍏呭€�", cancelText: !1, wrapClass: "recharge-beans-rebate", onOpen: o, onConfirm: r
        })
    }

    function i(t) {
        var i = t.discount ? .9 : 1, n = function (e) {
            var t = function (t) {
                var t = parseInt(t, 10), n = a(t, i);
                $(e).find(".order-save").text("-锟�" + n.save), $(e).find(".order-pay").text("锟�" + n.pay), t ? $(e).find(".btn-sure").removeClass("disabled") : $(e).find(".btn-sure").addClass("disabled")
            };
            $(e).on("input", ".ipt-amount", function () {
                var e = $(this).val().replace(/\D+/g, "");
                e.length && (e = parseInt($(this).val(), 10)), $(this).val(e), t(e)
            }), t(100)
        }, o = function (n) {
            if ($(n).find(".btn-sure").hasClass("disabled")) return !1;
            var s = $(n).find(".ipt-amount").val();
            e($.extend({callback: t.success, url: t.url}, a(s, i))), $(n).remove()
        };
        $.dialog({
            title: "鐩磋眴鍏呭€�",
            content: s.original(t),
            confirmText: "纭畾鍏呭€�",
            cancelText: !1,
            wrapClass: "recharge-beans-original",
            onOpen: n,
            onConfirm: o
        })
    }

    var n = {get: {}};
    n.get.discount = function () {
        var e = $.Deferred();
        return $.get("/boss/item/recharge/discount/check.json", function (t) {
            1 == t.rescode ? e.resolve(t) : $.toast({type: "error", content: t.message})
        }), e
    };
    var s = {
        rebate: function (e) {
            return Utemplate('<p class="gray ios-off">ios鐢ㄦ埛鐙韩鍏呭€兼姌鎵ｏ紙浠呴檺缃戦〉鐗堬級</p><div><p class="pull-left">鐩磋眴鍏呭€�</p><div class="recharge-rebate-panel"><ul><%for(var i=0; i<this.list.length; i++){%><li ka="selected_amount_<%this.list[i].amount%>" <%if(this.list[i].amount==500){%> class="selected"<%}%> data-amount="<%this.list[i].amount%>"><p class="rebate-item"><%this.list[i].amount%>鐩磋眴<span class="rebate-off">鍑�<%this.list[i].save%>鍏�</span><span class="interval"></span></p></li><%}%></ul><input class="ipt ipt-amount" maxlength="4" placeholder="杈撳叆浠绘剰鐩磋眴鏁�"></div></div>', {list: e})
        }, original: function (e) {
            return Utemplate('<ul><li><span class="pull-left">鍏呭€肩洿璞嗕釜鏁�</span><p><input type="text" value="100" maxlength="4" class="ipt-amount"></p></li><%if(this.discount){%><li><span class="pull-left">iOS鐢ㄦ埛9鎶樹紭鎯�</span><p class="order-save"></p></li><%}%><li><span class="pull-left">閲戦</span><p  class="order-pay"></p></li><li><p class="ios-notice">鍥爄OS鏀跨瓥闄愬埗锛岀洿璞嗗湪iOS绔疺6.17浠ヤ笂鐗堟湰浠呭彲鐢ㄤ簬閬撳叿璐拱銆�<br>瀹夊崜鍙奝C绔笉鍙楀奖鍝嶃€�</p></li></ul>', e)
        }
    }, a = function (e, t) {
        if (!e) return {amount: 0, save: 0, pay: 0};
        var i = 100 * e, n = Math.floor(i * t);
        return {amount: e, save: (i - n) / 100, pay: n / 100}
    };
    return function (e) {
        n.get.discount().then(function (n) {
            var s = $.extend(e || {}, n);
            return n.discountInfo && n.discountInfo.rangeDiscount && !isEmpty(n.discountInfo.rangeDiscount) ? t(s) : i(s)
        })
    }
}(), __conversion = __conversion || function (e) {
    try {
        _T.sendEvent(e)
    } catch (e) {
    }
}, Salary = function () {
    function e() {
        return function (e, t) {
            for (var n = e, s = [], a = i.unit(n); n <= t;) s.push(n), a = i.unit(n), n += a;
            return s
        }(1, 250)
    }

    function t(e) {
        for (var t = i.max(e), n = i.unit(e), s = Math.floor(e / n) * n, a = [], o = i.unit(s); s < t;) o = i.unit(s), (s += o) <= t && a.push(s);
        return a
    }

    var i = {};
    return i.number = function (e) {
        var t = this;
        if (!(this instanceof i.number)) return new i.number(e);
        t.number = e, this.between = function (e, i) {
            return e <= t.number && t.number <= i
        }
    }, i.unit = function (e) {
        var t = i.number(e);
        return t.between(1, 29) ? 1 : t.between(30, 99) ? 5 : e >= 100 ? 10 : 1
    }, i.max = function (e) {
        return e <= 10 ? e + 5 : e <= 30 ? 2 * e : e <= 99 ? Math.min(120, e + 30) : Math.min(260, 2 * e)
    }, {min: e, max: t}
}(), Auxiliary = function () {
    var e = function (e) {
        var t = 0, e = e;
        len = e.length, charCode = -1;
        for (var i = 0; i < len; i++) charCode = e.charCodeAt(i), charCode >= 0 && charCode <= 128 ? t += .5 : t += 1;
        return Math.round(t)
    }, t = function (e) {
        for (var t = 0, i = e.length, n = -1, s = 0; s < i; s++) n = e.charCodeAt(s), t += n >= 0 && n <= 128 ? 1 : 2;
        return t
    };
    return {getByteLength: t, getHybridLength: e}
}();
!function (e) {
    "use strict";
    var t = function (t, i) {
        this.$body = e(document.body), this.$element = e(t), this.page = 1, this.isShowBefore = "false" !== this.$element.attr("isShowBefore"), this.isShowNow = "false" !== this.$element.attr("isShowNow"), this.isNoWorkExp = "true" === this.$element.attr("isNoWorkExp"), this.isShowToday = "false" !== this.$element.attr("isShowToday"), this.order = this.$element.attr("order") || "desc", this.init()
    };
    t.prototype.init = function () {
        if (!this.$element.hasClass("disabled")) {
            var t = this;
            this.dates = this.date(), t.render(), t.$wrap.on("click", ".year", function () {
                t.selectYear(e(this))
            }), t.$wrap.on("click", ".month", function () {
                t.selectMonth(e(this))
            }), t.$wrap.on("click", ".prev", function (e) {
                t.prev(), e.stopPropagation()
            }), t.$wrap.on("click", ".next", function (e) {
                t.next(), e.stopPropagation()
            }), this.$element.on("click", function () {
                t.$wrap.is(":visible") ? t.hide() : t.show()
            }), e(document).on("click.workStart", function (e) {
                !t.$wrap.is(":visible") || t.$wrap[0].contains(e.target) || t.$element[0].contains(e.target) || t.hide()
            })
        }
    }, t.prototype.getFill = function () {
        var t;
        return t = this.$element.attr("data-fill") ? e("input[name=" + this.$element.attr("data-fill") + "]").val().split("-") : this.$element.val().split("-"), {
            year: t.length ? t[0] : "",
            month: t.length > 1 ? t[1] : ""
        }
    }, t.prototype.render = function () {
        this.$wrap = e('<div class="workstartpicker-wrap"><div class="year-wrap"></div><div class="month-wrap"></div></div>');
        var t = this.template();
        this.$wrap.find(".year-wrap").html(t), e("body").append(this.$wrap)
    }, t.prototype.date = function () {
        var e = parseInt(this.$element.attr("data-min"), 10), t = parseInt(this.$element.attr("data-max"), 10), i = [];
        if (this.isShowBefore && i.push({
            name: e + "鍓�",
            value: e - 1
        }), "desc" === this.order) for (var n = e; n <= t; n++) i.push({
            name: n,
            value: n,
            hasChild: !0
        }); else for (var n = e; n <= t; n++) i.unshift({name: n, value: n, hasChild: !0});
        return this.isShowNow && i.push({name: "搴斿眾鐢�", value: 0}), this.isNoWorkExp && i.push({
            name: "鏃犲伐浣滅粡楠�",
            value: 0
        }), i.reverse(), i
    }, t.prototype.template = function () {
        for (var e = 12 * (this.page - 1), t = 12 * this.page, i = this.dates.slice(e, t), n = "desc" === this.order ? i[i.length - 1].name + " - " + i[0].name : i[0].name + " - " + i[i.length - 1].name, s = this.getFill().year, a = '<div class="title"><i class="prev"></i><i class="next"></i><p class="text">' + n + '</p></div><div class="content"><ul>', o = 0; o < i.length; o++) {
            a += '<li class="year ' + (s == i[o].value ? "selected" : "") + '" data-val="' + i[o].value + '">' + i[o].name + "</li>"
        }
        return a += "</ul></div>"
    }, t.prototype.month = function (e) {
        for (var t = ["涓€鏈�", "浜屾湀", "涓夋湀", "鍥涙湀", "浜旀湀", "鍏湀", "涓冩湀", "鍏湀", "涔濇湀", "鍗佹湀", "鍗佷竴鏈�", "鍗佷簩鏈�"], i = '<div class="title"><p class="text">' + e + '</p></div><div class="content"><ul>', n = this.getFill(), s = 0; s < 12; s++) {
            i += '<li class="month ' + (n.year == e && parseInt(n.month, 10) == s + 1 ? "selected" : "") + '">' + t[s] + "</li>"
        }
        return i += "</ul></div>"
    }, t.prototype.prev = function () {
        if (this.page > 1) {
            this.page--;
            var e = this.template();
            this.$wrap.find(".year-wrap").html(e)
        }
    }, t.prototype.next = function () {
        var e = Math.ceil(this.dates.length / 12);
        if (this.page < e) {
            this.page++;
            var t = this.template();
            this.$wrap.find(".year-wrap").html(t)
        }
    }, t.prototype.selectMonth = function (e) {
        var t = this.$wrap.find(".month-wrap .text").text(), i = e.index() >= 9 ? e.index() + 1 : "0" + (e.index() + 1);
        this.fill(t, i)
    }, t.prototype.selectYear = function (e) {
        var t = e.attr("data-val"), i = this.dates.filter(function (e) {
            return e.value == t
        });
        if (i[0] && i[0].hasChild) {
            var n = this.month(t);
            this.$wrap.find(".month-wrap").html(n), this.$wrap.addClass("month-panel")
        } else this.fill(t)
    }, t.prototype.fill = function (t, i) {
        var t = this.dates.filter(function (e) {
            return e.value == t
        })[0], n = t.value, s = t.name, a = this.$element.attr("data-fill"), o = e("input[name=" + a + "]");
        i && (n += "-" + i, s += "-" + i), this.$element.val(s), o && o.val(n), this.hide()
    }, t.prototype.show = function () {
        var e = this.$element.offset();
        this.$wrap.css({left: e.left + "px", top: this.$element.outerHeight() + e.top + "px"});
        var t = this.getFill();
        this.$wrap.find(".selected").removeClass("selected"), "" !== t.year && this.$wrap.find(".year-wrap li[data-val=" + t.year + "]").addClass("selected"), this.$wrap.show()
    }, t.prototype.hide = function () {
        this.$wrap.hide(), this.$wrap.removeClass("month-panel")
    };
    var i = function (i) {
        return this.each(function () {
            var n = e(this), s = n.data("boss.date");
            s || n.data("boss.date", s = new t(this, i)), "string" == typeof i && s[i].call(n)
        })
    }, n = e.fn.workstartpicker;
    e.fn.workstartpicker = i, e.fn.workstartpicker.Constructor = t, e.fn.workstartpicker.noConflict = function () {
        return e.fn.chosen = n, this
    }
}(jQuery), function (e, t) {
    "use strict";
    "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], function (e) {
        return t(e)
    }) : t(e.jQuery)
}(this, function (e) {
    "use strict";
    var t = function (i, n) {
        this.$element = e(i), this.options = e.extend({}, t.defaults, n), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.select = this.options.select || this.select, this.autoSelect = "boolean" != typeof this.options.autoSelect || this.options.autoSelect, this.highlighter = this.options.highlighter || this.highlighter, this.render = this.options.render || this.render, this.updater = this.options.updater || this.updater, this.displayText = this.options.displayText || this.displayText, this.source = this.options.source, this.delay = this.options.delay, this.$menu = e(this.options.menu), this.$appendTo = this.options.appendTo ? e(this.options.appendTo) : null, this.fitToElement = "boolean" == typeof this.options.fitToElement && this.options.fitToElement, this.shown = !1, this.listen(), this.showHintOnFocus = ("boolean" == typeof this.options.showHintOnFocus || "all" === this.options.showHintOnFocus) && this.options.showHintOnFocus, this.afterSelect = this.options.afterSelect, this.addItem = !1, this.emptyItem = !1, this.value = this.$element.val() || this.$element.text(), this.keyPressed = !1
    };
    t.prototype = {
        constructor: t, select: function () {
            var e = this.$menu.find(".active").data("value");
            if (this.$element.data("active", e), this.autoSelect || e) {
                var t = this.updater(e);
                t || (t = ""), this.$element.val(this.displayText(t) || t).text(this.displayText(t) || t).change(), this.afterSelect(t)
            }
            return this.hide()
        }, updater: function (e) {
            return e
        }, setSource: function (e) {
            this.source = e
        }, show: function () {
            var t, i = e.extend({}, this.$element.position(), {height: this.$element[0].offsetHeight}),
                n = "function" == typeof this.options.scrollHeight ? this.options.scrollHeight.call() : this.options.scrollHeight;
            this.shown ? t = this.$menu : this.$appendTo ? (t = this.$menu.appendTo(this.$appendTo), this.hasSameParent = this.$appendTo.is(this.$element.parent())) : (t = this.$menu.insertAfter(this.$element), this.hasSameParent = !0);
            var s = e(t).parent().hasClass("dropup"),
                a = (s || (i.top, i.height), e(t).hasClass("dropdown-menu-right"));
            a || i.left;
            return t.show(), !0 === this.options.fitToElement && t.css("width", this.$element.outerWidth() + "px"), this.shown = !0, this
        }, hide: function () {
            return this.$menu.hide(), this.shown = !1, this
        }, lookup: function (t) {
            if (this.query = void 0 !== t && null !== t ? t : this.$element.val() || this.$element.text() || "", this.query.length < this.options.minLength && !this.options.showHintOnFocus) return this.shown ? this.hide() : this;
            var i = e.proxy(function () {
                e.isFunction(this.source) && 3 === this.source.length ? this.source(this.query, e.proxy(this.process, this), e.proxy(this.process, this)) : e.isFunction(this.source) ? this.source(this.query, e.proxy(this.process, this)) : this.source && this.process(this.source)
            }, this);
            clearTimeout(this.lookupWorker), this.lookupWorker = setTimeout(i, this.delay)
        }, process: function (t) {
            var i = this;
            return t = e.grep(t, function (e) {
                return void 0 !== e && i.matcher(e)
            }), t = this.sorter(t), t.length || this.options.addItem || this.options.emptyItem ? (t.length > 0 ? this.$element.data("active", t[0]) : (this.$element.data("active", null), this.options.emptyItem && (t.push(i.query), this.map[t[0]] = t[0])), "all" != this.options.items && (t = t.slice(0, this.options.items)), this.options.addItem && t.push(this.options.addItem), this.render(t).show()) : this.shown ? this.hide() : this
        }, matcher: function (e) {
            return ~this.displayText(e).toLowerCase().indexOf(this.query.toLowerCase())
        }, sorter: function (e) {
            for (var t, i = [], n = [], s = []; t = e.shift();) {
                var a = this.displayText(t);
                a.toLowerCase().indexOf(this.query.toLowerCase()) ? ~a.indexOf(this.query) ? n.push(t) : s.push(t) : i.push(t)
            }
            return i.concat(n, s)
        }, highlighter: function (e) {
            var t = this.query;
            if ("" === t) return e;
            var i, n = e.match(/(>)([^<]*)(<)/g), s = [], a = [];
            if (n && n.length) for (i = 0; i < n.length; ++i) n[i].length > 2 && s.push(n[i]); else s = [], s.push(e);
            t = t.replace(/[\(\)\/\.\*\+\?\[\]]/g, function (e) {
                return "\\" + e
            });
            var o, r = new RegExp(t, "g");
            for (i = 0; i < s.length; ++i) (o = s[i].match(r)) && o.length > 0 && a.push(s[i]);
            for (i = 0; i < a.length; ++i) e = e.replace(a[i], a[i].replace(r, "<strong>$&</strong>"));
            return e
        }, render: function (t) {
            var i = this, n = this, s = !1, a = [], o = i.options.separator;
            return e.each(t, function (e, i) {
                e > 0 && i[o] !== t[e - 1][o] && a.push({__type: "divider"}), !i[o] || 0 !== e && i[o] === t[e - 1][o] || a.push({
                    __type: "category",
                    name: i[o]
                }), a.push(i)
            }), t = e(a).map(function (t, a) {
                if ("category" == (a.__type || !1)) return e(i.options.headerHtml).text(a.name)[0];
                if ("divider" == (a.__type || !1)) return e(i.options.headerDivider)[0];
                var o = n.displayText(a);
                return t = e(i.options.item).data("value", a), t.find("a").html(i.highlighter(o, a)), o == n.$element.val() && (t.addClass("active"), n.$element.data("active", a), s = !0), t[0]
            }), 1 == t.length && i.options.emptyItem && t.eq(0).addClass("empty").find("a").prepend("<span>鍥炶溅娣诲姞鏍囩</span>"), t.length && n.$menu.parent().find(".skills-pannel").hide(), this.autoSelect && !s && (t.filter(":not(.dropdown-header)").first().addClass("active"), this.$element.data("active", t.first().data("value"))), this.$menu.html(t), this
        }, displayText: function (e) {
            return void 0 !== e && void 0 !== e.name ? e.name : e
        }, next: function (t) {
            var i = this.$menu.find(".active").removeClass("active"), n = i.next();
            n.length || (n = e(this.$menu.find("li")[0])), n.addClass("active"), n.hasClass("empty") || this.$element.val(n.text())
        }, prev: function (e) {
            var t = this.$menu.find(".active").removeClass("active"), i = t.prev();
            i.length || (i = this.$menu.find("li").last()), i.addClass("active"), i.hasClass("empty") || this.$element.val(i.text())
        }, listen: function () {
            this.$element.on("focus", e.proxy(this.focus, this)).on("blur", e.proxy(this.blur, this)).on("keypress", e.proxy(this.keypress, this)).on("propertychange input", e.proxy(this.input, this)).on("keyup", e.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", e.proxy(this.keydown, this)), this.$menu.on("click", e.proxy(this.click, this)).on("mouseenter", "li", e.proxy(this.mouseenter, this)).on("mouseleave", "li", e.proxy(this.mouseleave, this)).on("mousedown", e.proxy(this.mousedown, this))
        }, destroy: function () {
            this.$element.data("typeahead", null), this.$element.data("active", null), this.$element.off("focus").off("blur").off("keypress").off("propertychange input").off("keyup"), this.eventSupported("keydown") && this.$element.off("keydown"), this.$menu.remove(), this.destroyed = !0
        }, eventSupported: function (e) {
            var t = e in this.$element;
            return t || (this.$element.setAttribute(e, "return;"), t = "function" == typeof this.$element[e]), t
        }, move: function (e) {
            if (this.shown) switch (e.keyCode) {
                case 9:
                case 13:
                case 27:
                    e.preventDefault();
                    break;
                case 38:
                    if (e.shiftKey) return;
                    e.preventDefault(), this.prev();
                    break;
                case 40:
                    if (e.shiftKey) return;
                    e.preventDefault(), this.next()
            }
        }, keydown: function (t) {
            this.keyPressed = !0, this.suppressKeyPressRepeat = ~e.inArray(t.keyCode, [40, 38, 9, 13, 27]), this.shown || 40 != t.keyCode ? this.move(t) : this.lookup()
        }, keypress: function (e) {
            this.suppressKeyPressRepeat || this.move(e)
        }, input: function (e) {
            var t = this.$element.val() || this.$element.text();
            this.value !== t && (this.value = t, this.lookup())
        }, keyup: function (e) {
            if (!this.destroyed) switch (e.keyCode) {
                case 40:
                case 38:
                case 16:
                case 17:
                case 18:
                    break;
                case 9:
                    if (!this.shown || this.showHintOnFocus && !this.keyPressed) return;
                    this.select();
                    break;
                case 13:
                    if (!this.shown) return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown) return;
                    this.hide()
            }
        }, focus: function (e) {
            this.focused || (this.focused = !0, this.keyPressed = !1, this.options.showHintOnFocus && !0 !== this.skipShowHintOnFocus && ("all" === this.options.showHintOnFocus ? this.lookup("") : this.lookup())), this.skipShowHintOnFocus && (this.skipShowHintOnFocus = !1)
        }, blur: function (e) {
            this.mousedover || this.mouseddown || !this.shown ? this.mouseddown && (this.skipShowHintOnFocus = !0, this.$element.focus(), this.mouseddown = !1) : (this.hide(), this.focused = !1, this.keyPressed = !1)
        }, click: function (e) {
            e.preventDefault(), this.skipShowHintOnFocus = !0, this.select(), this.$element.focus(), this.hide()
        }, mouseenter: function (t) {
            this.mousedover = !0, this.$menu.find(".active").removeClass("active"), e(t.currentTarget).addClass("active")
        }, mouseleave: function (e) {
            this.mousedover = !1, !this.focused && this.shown && this.hide()
        }, mousedown: function (e) {
            this.mouseddown = !0, this.$menu.one("mouseup", function (e) {
                this.mouseddown = !1
            }.bind(this))
        }
    };
    var i = e.fn.typeahead;
    e.fn.typeahead = function (i) {
        var n = arguments;
        return "string" == typeof i && "getActive" == i ? this.data("active") : this.each(function () {
            var s = e(this), a = s.data("typeahead"), o = "object" == typeof i && i;
            a || s.data("typeahead", a = new t(this, o)), "string" == typeof i && a[i] && (n.length > 1 ? a[i].apply(a, Array.prototype.slice.call(n, 1)) : a[i]())
        })
    }, t.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu" role="listbox"></ul>',
        item: '<li><a class="dropdown-item" href="javascript:;" role="option"></a></li>',
        minLength: 1,
        scrollHeight: 0,
        autoSelect: !0,
        afterSelect: e.noop,
        addItem: !1,
        delay: 0,
        separator: "category",
        headerHtml: '<li class="dropdown-header"></li>',
        headerDivider: '<li class="divider" role="separator"></li>'
    }, e.fn.typeahead.Constructor = t, e.fn.typeahead.noConflict = function () {
        return e.fn.typeahead = i, this
    }, e(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (t) {
        var i = e(this);
        i.data("typeahead") || i.typeahead(i.data())
    })
}), function (e) {
    "use strict";

    function t(t, i) {
        this.isInit = !0, this.itemsArray = [], this.$element = e(t), this.$element.hide(), this.isSelect = "SELECT" === t.tagName, this.multiple = this.isSelect && t.hasAttribute("multiple"), this.objectItems = i && i.itemValue, this.placeholderText = t.hasAttribute("placeholder") ? this.$element.attr("placeholder") : "", this.inputSize = Math.max(1, this.placeholderText.length), this.$container = e('<div class="bootstrap-tagsinput"></div>'), this.$input = e('<input type="text" placeholder="' + this.placeholderText + '"/>').appendTo(this.$container), this.$element.before(this.$container), this.build(i), this.isInit = !1
    }

    function i(e, t) {
        if ("function" != typeof e[t]) {
            var i = e[t];
            e[t] = function (e) {
                return e[i]
            }
        }
    }

    function n(e, t) {
        if ("function" != typeof e[t]) {
            var i = e[t];
            e[t] = function () {
                return i
            }
        }
    }

    function s(e) {
        return e ? c.text(e).html() : ""
    }

    function a(e) {
        var t = 0;
        if (document.selection) {
            e.focus();
            var i = document.selection.createRange();
            i.moveStart("character", -e.value.length), t = i.text.length
        } else (e.selectionStart || "0" == e.selectionStart) && (t = e.selectionStart);
        return t
    }

    function o(t, i) {
        var n = !1;
        return e.each(i, function (e, i) {
            if ("number" == typeof i && t.which === i) return n = !0, !1;
            if (t.which === i.which) {
                var s = !i.hasOwnProperty("altKey") || t.altKey === i.altKey,
                    a = !i.hasOwnProperty("shiftKey") || t.shiftKey === i.shiftKey,
                    o = !i.hasOwnProperty("ctrlKey") || t.ctrlKey === i.ctrlKey;
                if (s && a && o) return n = !0, !1
            }
        }), n
    }

    var r = {
        tagClass: function (e) {
            return "label label-info"
        },
        focusClass: "focus",
        itemValue: function (e) {
            return e ? e.toString() : e
        },
        itemText: function (e) {
            return this.itemValue(e)
        },
        itemTitle: function (e) {
            return null
        },
        freeInput: !0,
        addOnBlur: !0,
        maxTags: void 0,
        maxChars: void 0,
        confirmKeys: [13, 44],
        delimiter: ",",
        delimiterRegex: null,
        cancelConfirmKeysOnEmpty: !1,
        onTagExists: function (e, t) {
            t.hide().fadeIn()
        },
        trimValue: !1,
        allowDuplicates: !1,
        triggerChange: !0,
        listTags: !1,
        showListTags: null
    };
    t.prototype = {
        constructor: t, add: function (t, i, n) {
            var a = this;
            if (!(a.options.maxTags && a.itemsArray.length >= a.options.maxTags) && (!1 === t || t)) {
                if ("string" == typeof t && a.options.trimValue && (t = e.trim(t)), "object" == typeof t && !a.objectItems) throw"Can't add objects when itemValue option is not set";
                if (!t.toString().match(/^\s*$/)) {
                    if (a.isSelect && !a.multiple && a.itemsArray.length > 0 && a.remove(a.itemsArray[0]), "string" == typeof t && "INPUT" === this.$element[0].tagName) {
                        var o = a.options.delimiterRegex ? a.options.delimiterRegex : a.options.delimiter,
                            r = t.split(o);
                        if (r.length > 1) {
                            for (var c = 0; c < r.length; c++) this.add(r[c], !0);
                            return void (i || a.pushVal(a.options.triggerChange))
                        }
                    }
                    var l = a.options.itemValue(t), d = a.options.itemText(t), p = a.options.tagClass(t),
                        u = a.options.itemTitle(t), h = e.grep(a.itemsArray, function (e) {
                            return a.options.itemValue(e) === l
                        })[0];
                    if (!h || a.options.allowDuplicates) {
                        if (!(a.items().toString().length + t.length + 1 > a.options.maxInputLength)) {
                            var f = e.Event("beforeItemAdd", {item: t, cancel: !1, options: n});
                            if (a.$element.trigger(f), !f.cancel) {
                                a.itemsArray.push(t);
                                var m = e('<span class="tag ' + s(p) + (null !== u ? '" title="' + u : "") + '">' + s(d) + '<span data-role="remove"></span></span>');
                                m.data("item", t), a.findInputWrapper().before(m), m.after(" ");
                                var g = e('option[value="' + encodeURIComponent(l) + '"]', a.$element).length || e('option[value="' + s(l) + '"]', a.$element).length;
                                if (a.isSelect && !g) {
                                    var v = e("<option selected>" + s(d) + "</option>");
                                    v.data("item", t), v.attr("value", l), a.$element.append(v)
                                }
                                i || a.pushVal(a.options.triggerChange), a.options.maxTags !== a.itemsArray.length && a.items().toString().length !== a.options.maxInputLength || a.$container.addClass("bootstrap-tagsinput-max"), e(".typeahead, .twitter-typeahead", a.$container).length && a.$input.typeahead("val", ""), this.isInit ? a.$element.trigger(e.Event("itemAddedOnInit", {
                                    item: t,
                                    options: n
                                })) : a.$element.trigger(e.Event("itemAdded", {item: t, options: n}))
                            }
                        }
                    } else if (a.options.onTagExists) {
                        var w = e(".tag", a.$container).filter(function () {
                            return e(this).data("item") === h
                        });
                        a.options.onTagExists(t, w)
                    }
                }
            }
        }, remove: function (t, i, n) {
            var s = this;
            if (s.objectItems && (t = "object" == typeof t ? e.grep(s.itemsArray, function (e) {
                return s.options.itemValue(e) == s.options.itemValue(t)
            }) : e.grep(s.itemsArray, function (e) {
                return s.options.itemValue(e) == t
            }), t = t[t.length - 1]), t) {
                var a = e.Event("beforeItemRemove", {item: t, cancel: !1, options: n});
                if (s.$element.trigger(a), a.cancel) return;
                e(".tag", s.$container).filter(function () {
                    return e(this).data("item") === t
                }).remove(), e("option", s.$element).filter(function () {
                    return e(this).data("item") === t
                }).remove(), -1 !== e.inArray(t, s.itemsArray) && s.itemsArray.splice(e.inArray(t, s.itemsArray), 1)
            }
            i || s.pushVal(s.options.triggerChange), s.options.maxTags > s.itemsArray.length && s.$container.removeClass("bootstrap-tagsinput-max"), s.$element.trigger(e.Event("itemRemoved", {
                item: t,
                options: n
            })), s.options.itemRemoved && s.options.itemRemoved(t)
        }, removeAll: function () {
            var t = this;
            for (e(".tag", t.$container).remove(), e("option", t.$element).remove(); t.itemsArray.length > 0;) t.itemsArray.pop();
            t.pushVal(t.options.triggerChange)
        }, refresh: function () {
            var t = this;
            e(".tag", t.$container).each(function () {
                var i = e(this), n = i.data("item"), a = t.options.itemValue(n), o = t.options.itemText(n),
                    r = t.options.tagClass(n);
                if (i.attr("class", null), i.addClass("tag " + s(r)), i.contents().filter(function () {
                    return 3 == this.nodeType
                })[0].nodeValue = s(o), t.isSelect) {
                    e("option", t.$element).filter(function () {
                        return e(this).data("item") === n
                    }).attr("value", a)
                }
            })
        }, items: function () {
            return this.itemsArray
        }, pushVal: function () {
            var t = this, i = e.map(t.items(), function (e) {
                return t.options.itemValue(e).toString()
            });
            t.$element.val(i, !0), t.options.triggerChange && t.$element.trigger("change")
        }, build: function (t) {
            var s = this;
            if (s.options = e.extend({}, r, t), s.objectItems && (s.options.freeInput = !1), i(s.options, "itemValue"), i(s.options, "itemText"), n(s.options, "tagClass"), s.options.listTags && e(s.options.listTags).on("click", "li", function () {
                s.add(e(this).text()), s.options.showListTags(e(this).text(), s)
            }), s.options.typeahead) {
                var c = s.options.typeahead || {};
                n(c, "source"), s.$input.typeahead(e.extend({}, c, {
                    source: function (t, i) {
                        function n(e) {
                            for (var t = [], n = 0; n < e.length; n++) {
                                var o = s.options.itemText(e[n]);
                                a[o] = e[n], t.push(o)
                            }
                            i(t)
                        }

                        this.map = {};
                        var a = this.map, o = c.source(t);
                        e.isFunction(o.success) ? o.success(n) : e.isFunction(o.then) ? o.then(n) : e.when(o).then(n)
                    }, updater: function (e) {
                        return s.add(this.map[e]), this.map[e]
                    }, matcher: function (e) {
                        return -1 !== e.toLowerCase().indexOf(this.query.trim().toLowerCase())
                    }, sorter: function (e) {
                        return e.sort()
                    }, highlighter: function (e) {
                        var t, i = this.query.replace(/(^\s*)|(\s*$)/g, "");
                        if ("" == i) return e;
                        i = i.replace(/[\(\)\/\.\*\+\?\[\]]/g, function (e) {
                            return "\\" + e
                        });
                        try {
                            t = new RegExp("(" + i + ")", "ig")
                        } catch (e) {
                        }
                        return e.replace(t, '<u class="h">$1</u>')
                    }
                }))
            }
            if (s.options.typeaheadjs) {
                var l = s.options.typeaheadjs;
                e.isArray(l) || (l = [null, l]), e.fn.typeahead.apply(s.$input, l).on("typeahead:selected", e.proxy(function (e, t, i) {
                    var n = 0;
                    l.some(function (e, t) {
                        return e.name === i && (n = t, !0)
                    }), l[n].valueKey ? s.add(t[l[n].valueKey]) : s.add(t), s.$input.typeahead("val", "")
                }, s))
            }
            s.$container.on("click", e.proxy(function (e) {
                s.$element.attr("disabled") || s.$input.removeAttr("disabled"), s.$input.focus()
            }, s)), s.options.addOnBlur && s.options.freeInput && s.$input.on("focusout", e.proxy(function (t) {
                0 === e(".typeahead, .twitter-typeahead", s.$container).length && (s.add(s.$input.val()), s.$input.val(""))
            }, s)), s.$container.on({
                focusin: function () {
                    s.$container.addClass(s.options.focusClass)
                }, focusout: function () {
                    s.$container.removeClass(s.options.focusClass)
                }
            }), s.$container.on("keydown", "input", e.proxy(function (t) {
                var i = e(t.target), n = s.findInputWrapper();
                if (s.$element.attr("disabled")) return void s.$input.attr("disabled", "disabled");
                switch (t.which) {
                    case 8:
                        if (0 === a(i[0])) {
                            var o = n.prev();
                            o.length && s.remove(o.data("item"))
                        }
                        break;
                    case 46:
                        if (0 === a(i[0])) {
                            var r = n.next();
                            r.length && s.remove(r.data("item"))
                        }
                        break;
                    case 37:
                        var c = n.prev();
                        0 === i.val().length && c[0] && (c.before(n), i.focus());
                        break;
                    case 39:
                        var l = n.next();
                        0 === i.val().length && l[0] && (l.after(n), i.focus())
                }
                var d = i.val().length;
                Math.ceil(d / 5);
                i.attr("size", Math.max(this.inputSize, i.val().length))
            }, s)), s.$container.on("keypress", "input", e.proxy(function (t) {
                var i = e(t.target);
                if (s.$element.attr("disabled")) return void s.$input.attr("disabled", "disabled");
                var n = i.val(), a = s.options.maxChars && n.length >= s.options.maxChars;
                s.options.freeInput && (o(t, s.options.confirmKeys) || a) && (0 !== n.length && (s.add(a ? n.substr(0, s.options.maxChars) : n), i.val("")), !1 === s.options.cancelConfirmKeysOnEmpty && t.preventDefault());
                var r = i.val().length;
                Math.ceil(r / 5);
                i.attr("size", Math.max(this.inputSize, i.val().length))
            }, s)), s.$container.on("click", "[data-role=remove]", e.proxy(function (t) {
                s.$element.attr("disabled") || s.remove(e(t.target).closest(".tag").data("item"))
            }, s)), s.options.itemValue === r.itemValue && ("INPUT" === s.$element[0].tagName ? s.add(s.$element.val()) : e("option", s.$element).each(function () {
                s.add(e(this).attr("value"), !0)
            })), s.options.onReady && s.options.onReady(s)
        }, destroy: function () {
            var e = this;
            e.$container.off("keypress", "input"), e.$container.off("click", "[role=remove]"), e.$container.remove(), e.$element.removeData("tagsinput"), e.$element.show()
        }, focus: function () {
            this.$input.focus()
        }, input: function () {
            return this.$input
        }, findInputWrapper: function () {
            for (var t = this.$input[0], i = this.$container[0]; t && t.parentNode !== i;) t = t.parentNode;
            return e(t)
        }
    }, e.fn.tagsinput = function (i, n, s) {
        var a = [];
        return this.each(function () {
            var o = e(this).data("tagsinput");
            if (o) if (i || n) {
                if (void 0 !== o[i]) {
                    if (3 === o[i].length && void 0 !== s) var r = o[i](n, null, s); else var r = o[i](n);
                    void 0 !== r && a.push(r)
                }
            } else a.push(o); else o = new t(this, i), e(this).data("tagsinput", o), a.push(o), "SELECT" === this.tagName && e("option", e(this)).attr("selected", "selected"), e(this).val(e(this).val())
        }), "string" == typeof i ? a.length > 1 ? a : a[0] : a
    }, e.fn.tagsinput.Constructor = t;
    var c = e("<div />");
    e(function () {
        e("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput()
    })
}(window.jQuery), function (e, t, i) {
    "use strict";

    function n(e, t) {
        return e.replace(/\$\w+\$/gi, function (e) {
            var i = t[e.replace(/\$/g, "")];
            return i + "" == "undefined" ? "" : i
        })
    }

    function s(e, t, n) {
        return function (s) {
            "function" == typeof e && e.call(n, s && s.length > 0 ? s : i, t)
        }
    }

    var a = t, o = a.document;
    e.fn.suggestion = function (t) {
        var i = this, a = t.throttleTime || 150, r = void 0 === t.focusSugges || !!t.focusSugges,
            c = t.onRequest || function () {
                return ""
            }, l = '<div class="suggestion" style="display: none;"><ul class="suggestion-list"></ul>';
        t.blankHTML && (l += '<div class="suggestion-blank">', l += n(t.blankHTML, {searchText: '<span class="suggestion-text"></span>'}), l += "</div>"), l += "</div>", this.each(function (n, d) {
            function p(e) {
                b(e, f), g.trigger("suggestion.hide")
            }

            function u(t, i) {
                "" !== e.trim(m.val()) && g.trigger("suggestion.show");
                var n = e(t || "");
                D = -1, S = 0, n.length > 0 ? (S = n.length, n.each(function (t, s) {
                    var a = e(this);
                    a.text() === i && (n.removeClass("active"), a.addClass("active"), D = t)
                }), v.show(), w.length > 0 && w.hide()) : (v.hide(), w.length > 0 && (y.text(i), w.show())), v.html(n)
            }

            function h() {
                var t = e.trim(m.val());
                if (t) {
                    var i = c(t, function (e) {
                        u(e, t)
                    });
                    i && u(i, t)
                } else v.html(""), g.trigger("suggestion.hide")
            }

            var f = e(d);
            t.wrap || t.list || f.append(l);
            var m = e(t.input || ".suggestion-ipt", f).length > 0 ? e(t.input || ".suggestion-ipt", f) : e(".suggestion-ipt", f),
                g = e(t.wrap || ".suggestion", f).length > 0 ? e(t.wrap || ".suggestion", f) : e(".suggestion", f),
                v = e(t.list, g).length > 0 ? e(t.list, g) : e(".suggestion-list", g),
                w = e(t.blank, g).length > 0 ? e(t.blank, g) : e(".suggestion-blank", g), y = e(".suggestion-text", w),
                b = s(t.onChecked, f, i), $ = s(t.onHover, f, i), x = s(t.onShow, f, i), C = s(t.onHide, f, i), k = 0,
                T = !1, _ = !0, S = 0, D = -1;
            g.bind("suggestion.show", function () {
                g.show(), x()
            }), g.bind("suggestion.hide", function () {
                g.hide(), C()
            }), m.on("focus", function () {
                r && e.trim(e(this).val()) && h()
            }), m.on("blur", function () {
                var t = e.trim(m.val());
                if (_ && g.is(":visible")) if (e("li.active", v).length > 0) p(e("li.active", v)); else {
                    var i = -1;
                    e("li", v).each(function (n) {
                        e.trim(e(this).val()) === t && (i = n)
                    }), i > -1 ? p(e("li", v).eq(i)) : p()
                }
            }), m.on("compositionstart", function () {
                T = !0
            }), m.on("compositionend", function () {
                T = !1, h()
            }), m.on("input", function (t) {
                if (!T) {
                    var i = e.trim(m.val());
                    clearTimeout(k), "" === i ? g.trigger("suggestion.hide") : k = setTimeout(function () {
                        h()
                    }, a)
                }
            }), m.on("keydown", function (t) {
                if (!(g.is(":hidden") || 0 == S || T || 13 != t.keyCode && 38 != t.keyCode && 40 != t.keyCode)) {
                    switch (t.preventDefault(), t.keyCode) {
                        case 13:
                            return e("li.active", v).trigger("click"), void m.blur();
                        case 38:
                            --D, -2 == D && (D = e("li", v).length - 1);
                            break;
                        case 40:
                            ++D, D == e("li", v).length && (D = -1)
                    }
                    e("li", v).removeClass("active"), -1 != D && e("li", v).eq(D).addClass("active");
                    var i;
                    -1 == D ? 38 == t.keyCode ? i = e("li", v).last() : 40 == t.keyCode && (i = e("li", v).first()) : i = e("li", v).eq(D)
                    ;var n = e(".suggestion", f), s = n.height(), a = n.offset().top, o = i.height(),
                        r = i.offset().top, c = v.parent().scrollTop();
                    r < a ? v.parent().scrollTop(c - (a - r)) : r + o > a + s && v.parent().scrollTop(c + (r + o - (a + s))), $(e("li.active", v), f)
                }
            }), v.on("mouseenter", "li", function (t) {
                e(this).addClass("hover"), $(e(this), f)
            }), v.on("mouseleave", "li", function (t) {
                e(this).removeClass("hover")
            }), v.on("mouseleave", function () {
                $(e("li.active", this), f)
            }), g.on("mousedown", function (e) {
                _ = !1
            }), e(o).on("click", function (t) {
                e(t.target).closest(g).length && p(e(t.target).closest(e("li", g)))
            }), e(o).on("mouseup", function (t) {
                _ = !0, 0 == e(t.target).closest(m).length && m.trigger("blur")
            })
        }), t.ready && t.ready.call(this, this)
    }
}(jQuery, window), function (e, t, i) {
    "use strict";

    function n(e, t) {
        return e.replace(/\$\w+\$/gi, function (e) {
            var i = t[e.replace(/\$/g, "")];
            return i + "" == "undefined" ? "" : i
        })
    }

    function s(e, t) {
        for (var i = t.length, s = "", a = 0; a < i; a++) s += n(e, t[a]);
        return s
    }

    function a(e, t, n) {
        return function (s) {
            "function" == typeof e && e.call(n, s && s.length > 0 ? s : i, t)
        }
    }

    function o(e) {
        var t = e || m;
        return function (e) {
            return s(t, d[e].subLevelModelList)
        }
    }

    function r(t) {
        if (v) return void t();
        w.push(t), y || e.ajax({
            url: "/wapi/zpCommon/data/city.json", type: "get", dataType: "json", success: function (e) {
                if (0 == e.code) {
                    e.zpData.hotCityList.splice(0, 1);
                    var t = e.zpData.cityList, i = t.length, s = e.zpData.hotCityList, a = s.length,
                        o = {code: 1e8, name: "鐑棬", subLevelModelList: s, firstChar: "a", rank: 0, index: 0};
                    e.zpData.locationCity && (f = e.zpData.locationCity), d.push(o), u[o.code] = o, u[o.name] = o, g += n(m, o);
                    for (var r = 0; r < i; r++) {
                        var c = t[r].subLevelModelList.length;
                        t[r].index = r + 1, d.push(t[r]), u[t[r].name] = t[r], u[t[r].code] = t[r], g += n(m, t[r]);
                        for (var l = 0; l < c; l++) t[r].subLevelModelList[l].index = l, t[r].subLevelModelList[l].provinceCode = t[r].code, t[r].subLevelModelList[l].province = t[r].name, t[r].subLevelModelList[l].provinceIndex = t[r].index, p[t[r].subLevelModelList[l].code] = t[r].subLevelModelList[l], p[t[r].subLevelModelList[l].name] = t[r].subLevelModelList[l]
                    }
                    for (var b, $ = 0; $ < a; $++) s[$].index = $, b = 1e4 * parseInt(s[$] / 1e4), u[b] && (s[$].provinceCode = u[b].code, s[$].province = u[b].name, s[$].provinceIndex = u[b].index), h[s[$].code] = s[$], h[s[$].name] = s[$];
                    v = !0, y = !0;
                    for (var x; x = w.shift();) x()
                }
            }
        })
    }

    var c = t, l = c.document, d = [], p = {}, u = {}, h = {}, f = null,
        m = '<li data-code="$code$" data-name="$name$">$name$</li>', g = "", v = !1, w = [], y = !1;
    e.fn.citySelector = function (t) {
        var i = this, n = o(t.cityItemTemp),
            c = t.suggestItemHtml || '<li data-code="$code$" data-name="$name$"><span>$province$</span>$name$</li>';
        e(this).length && r(function () {
            var o = t.provinceItemTemp ? s(t.provinceItemTemp, d) : g;
            i.each(function () {
                function r(e, t) {
                    var i = y.height(), n = y.offset().top, s = e.height(), a = e.offset().top, o = t.height(),
                        r = t.offset().top, c = b.scrollTop(), l = $.scrollTop();
                    a < n ? b.scrollTop(c - (n - a)) : a + s > n + i && b.scrollTop(c + (a + s - (n + i))), r < n ? $.scrollTop(l - (n - r)) : r + o > n + i && $.scrollTop(l + (r + o - (n + i)))
                }

                function d() {
                    var t = e("li", b).removeClass("active").eq(x).addClass("active"),
                        i = e("li", $).removeClass("active").eq(C).addClass("active");
                    0 === k ? ($.removeClass("city-selector-cur"), b.addClass("city-selector-cur")) : (b.removeClass("city-selector-cur"), $.addClass("city-selector-cur")), r(t, i)
                }

                function u() {
                    $.html(n(x)), d()
                }

                function m(t) {
                    var i = e.trim(t);
                    if (i) {
                        var n = p[i];
                        n && (h[n.code] ? (x = 0, C = h[n.code].index) : (x = n.provinceIndex, C = n.index), k = 1, u())
                    }
                }

                var g = e(this);
                g.append('<div class="city-selector"><ul class="city-selector-province"></ul><ul class="city-selector-citys"></ul></div>'), f && t.onLocation && "function" == typeof t.onLocation && t.onLocation.call(this, f);
                var v = e(t.input || ".suggestion-ipt", g).length > 0 ? e(t.input || ".suggestion-ipt", g) : e(".suggestion-ipt", g),
                    w = (e(t.input || ".suggestion-ipt", g).length > 0 ? e(t.input || ".suggestion-ipt", g) : e(".suggestion-ipt", g), e.trim(v.val())),
                    y = e(".city-selector", g), b = e(".city-selector-province", g), $ = e(".city-selector-citys", g),
                    x = 0, C = 0, k = 0, T = !0, _ = !1, S = a(t.onChecked, g, i), D = a(t.onHover, g, i),
                    E = a(t.onShow, g, i), I = a(t.onHide, g, i);
                y.bind("selector.show", function () {
                    y.is(":hidden") && (y.show(), E())
                }), y.bind("selector.hide", function () {
                    y.is(":visible") && (y.hide(), I())
                }), b.html(o), u(), w && m(w), v.is(":focus") && y.trigger("selector.show"), b.on("mouseenter", function (e) {
                    k = 0, d()
                }), $.on("mouseenter", function (e) {
                    k = 1, d()
                }), e("li", b).on("mouseenter", function (t) {
                    var i = e("li", b).index(this);
                    i != x && (x = i, C = 0, u(), D(e("li.active", $)))
                }), e($).on("mouseenter", "li", function (t) {
                    var i = e("li", $).index(this);
                    i != C && (C = i, d(), D(e("li.active", $)))
                }), e($).on("click", "li", function (t) {
                    S(e(this)), y.trigger("selector.hide")
                }), e("li", b).on("click", function (t) {
                    S(e("li.active", $)), y.trigger("selector.hide")
                }), v.on("focus", function () {
                    g.find(".dropdown-select").addClass("dropdown-select-open"), y.trigger("selector.show")
                }), v.on("blur", function () {
                    g.find(".dropdown-select").removeClass("dropdown-select-open"), T && y.is(":visible") && y.trigger("selector.hide")
                }), v.on("input", function (t) {
                    "" === e.trim(t.target.value) ? y.trigger("selector.show") : y.trigger("selector.hide")
                }), v.on("keydown", function (t) {
                    var i = t.keyCode;
                    if (!(y.is(":hidden") || 13 != i && 37 != i && 38 != i && 39 != i && 40 != i)) {
                        t.preventDefault();
                        var n = !1;
                        switch (i) {
                            case 13:
                                e("li.active", $).trigger("click"), v.blur();
                                break;
                            case 38:
                                0 === k ? (--x, C = 0, n = !0) : --C;
                                break;
                            case 40:
                                0 === k ? (++x, C = 0, n = !0) : ++C;
                                break;
                            case 37:
                                k = 0;
                                break;
                            case 39:
                                k = 1
                        }
                        var s = e("li", b).length - 1, a = e("li", $).length - 1;
                        x < 0 ? x = s : x > s && (x = 0), C < 0 ? C = a : C > a && (C = 0), n ? u() : d()
                    }
                }), y.on("mousedown", function (e) {
                    T = !1
                }), e(l).on("mouseup", function (t) {
                    T = !0, 0 == e(t.target).closest(v).length && y.trigger("selector.hide")
                }), g.suggestion({
                    input: v,
                    focusSugges: !1,
                    blankHTML: '鏃犳鍩庡競<a href="javascript:;">鍘婚€夋嫨</a>',
                    ready: function () {
                        e(".suggestion-blank", this).on("click", function () {
                            y.trigger("selector.show")
                        })
                    },
                    onShow: function () {
                        _ = !0
                    },
                    onHide: function () {
                        _ = !1
                    },
                    onRequest: function (t, i) {
                        if (!t) return void i("");
                        e.ajax({
                            url: "/autocomplete/city.json",
                            data: {query: t || ""},
                            type: "get",
                            dataType: "json",
                            success: function (t) {
                                if (t && t.data instanceof Array) {
                                    for (var n = t.data, a = n.length, o = [], r = 0; r < a; r++) o.push(p[n[r].code]);
                                    i(e(s(c, o)))
                                }
                            }
                        })
                    },
                    onChecked: function (e, t) {
                        e && e.length > 0 && m(e.text()), S(e, g)
                    },
                    onHover: function (e, t) {
                        D(e, g)
                    }
                })
            })
        })
    }
}(jQuery, window), function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
}(function (e) {
    var t, i = {
        get: function (e) {
            return n[t].get.apply(this, [e])
        }, set: function (e, i) {
            var s, a = parseInt(e), o = parseInt(i);
            return void 0 === e ? a = 0 : e < 0 && (a = this[0].value.length + a), void 0 !== i && (s = i >= 0 ? a + o : this[0].value.length + o), n[t].set.apply(this, [a, s]), this
        }, setcursor: function (e) {
            return this.textrange("set", e, 0)
        }, replace: function (e) {
            return n[t].replace.apply(this, [String(e)]), this
        }, insert: function (e) {
            return this.textrange("replace", e)
        }
    }, n = {
        xul: {
            get: function (e) {
                var t = {
                    position: this[0].selectionStart,
                    start: this[0].selectionStart,
                    end: this[0].selectionEnd,
                    length: this[0].selectionEnd - this[0].selectionStart,
                    text: this.val().substring(this[0].selectionStart, this[0].selectionEnd)
                };
                return void 0 === e ? t : t[e]
            }, set: function (e, t) {
                void 0 === t && (t = this[0].value.length), this[0].selectionStart = e, this[0].selectionEnd = t
            }, replace: function (e) {
                var t = this[0].selectionStart, i = this[0].selectionEnd, n = this.val();
                this.val(n.substring(0, t) + e + n.substring(i, n.length)), this[0].selectionStart = t, this[0].selectionEnd = t + e.length
            }
        }, msie: {
            get: function (e) {
                var t = document.selection.createRange();
                if (void 0 === t) {
                    var i = {
                        position: 0,
                        start: 0,
                        end: this.val().length,
                        length: this.val().length,
                        text: this.val()
                    };
                    return void 0 === e ? i : i[e]
                }
                var n = 0, s = 0, a = this[0].value.length, o = this[0].value.replace(/\r\n/g, "\n"),
                    r = this[0].createTextRange(), c = this[0].createTextRange();
                r.moveToBookmark(t.getBookmark()), c.collapse(!1), -1 === r.compareEndPoints("StartToEnd", c) ? (n = -r.moveStart("character", -a), n += o.slice(0, n).split("\n").length - 1, -1 === r.compareEndPoints("EndToEnd", c) ? (s = -r.moveEnd("character", -a), s += o.slice(0, s).split("\n").length - 1) : s = a) : (n = a, s = a);
                var i = {position: n, start: n, end: s, length: a, text: t.text};
                return void 0 === e ? i : i[e]
            }, set: function (e, t) {
                var i = this[0].createTextRange();
                if (void 0 !== i) {
                    void 0 === t && (t = this[0].value.length);
                    var n = e - (this[0].value.slice(0, e).split("\r\n").length - 1),
                        s = t - (this[0].value.slice(0, t).split("\r\n").length - 1);
                    i.collapse(!0), i.moveEnd("character", s), i.moveStart("character", n), i.select()
                }
            }, replace: function (e) {
                document.selection.createRange().text = e
            }
        }
    };
    e.fn.extend({
        textrange: function (n) {
            var s = "get", a = {};
            return void 0 === this[0] ? this : ("string" == typeof n ? s = n : "object" == typeof n && (s = n.method || s, a = n), void 0 === t && (t = "selectionStart" in this[0] ? "xul" : document.selection ? "msie" : "unknown"), "unknown" === t ? this : (a.nofocus || document.activeElement === this[0] || this[0].focus(), "function" == typeof i[s] ? i[s].apply(this, Array.prototype.slice.call(arguments, 1)) : void e.error("Method " + s + " does not exist in jQuery.textrange")))
        }
    })
}), function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
}(function (e) {
    function t(e, t, i) {
        return e.start >= t && e.start <= t + i.length && e.end >= t ? 1 : e.end >= t && e.end <= t + i.length ? 2 : e.start <= t && t + i.length <= e.end ? 3 : 0
    }

    function i(e) {
        return c.test(e)
    }

    function n(e) {
        return l.test(e)
    }

    function s(e) {
        return e.replace(d, "")
    }

    function a(t, i) {
        return e.trim(t) + " " + s(i)
    }

    function o(e, i) {
        for (var n = e.split(/[\n\r]/g), s = 0, a = -1, o = 0, r = 0, c = 0, l = 0, d = 0, p = 0; p < n.length; p++) d = t(i, s, n[p]), d && (1 == d ? (a = p, r = i.start - l) : 2 == d && (c = i.end - l), o++), l += n[p].length + 1, s += n[p].length + 1;
        return 0 == c && (c = r), {startLine: a, startLineIndex: r, lineCount: o, endLineIndex: c}
    }

    function r(e, t) {
        for (var r, c, d, p = e.val(), u = e.textrange("get"), h = u.start, f = 0, m = p.split(/[\n\r]/g), g = o(p, u), v = g.startLine, w = g.startLineIndex, y = g.endLineIndex, b = g.lineCount, $ = t ? n(m[v]) : i(m[v]), x = m[Math.max(v - 1, 0)].match(l), C = t ? x && x[4] ? x[4] : "." : "鈼�", k = x && x[3] ? parseInt(x[3]) : 0, T = 0, _ = 0; _ < b; _++) c = _ + v, r = m[c], T = r.length, $ ? r = s(r) : (k++, r = a((t ? k : "") + C, r)), d = r.length - T, c === v ? (h += w + d < 0 ? -1 * w : d, h = Math.max(h, 0), f += 1 == b ? y - w : r.length - Math.max(w + d, 0)) : f += _ == b - 1 ? Math.max(y + d, 1) : r.length, _ > 0 && f++, m[c] = r;
        e.val(m.join("\n")).textrange("set", h, f).focus().trigger("input")
    }

    var c = /^((\s+)?鈼�(\s+)?)/,
        l = /^((\s+)?(\d+)([\.|銆乚)(\s+)?)/,d=/^((\s+)?(((\d+)([\.|銆乚))|鈼�))(\s+)?/;e.fn.extend({textarealist:function(t){var a=e.extend({wrapClass:".serial-wrap",btnNum:".serial-btn-num",btnBullet:".serial-btn-bullet"});this.each(function(){if(!this.__textareaListInited){this.__textareaListInited=!0;var t=e(this),c=t.closest(a.wrapClass).length>0?t.closest(a.wrapClass):t.parent(),l=e(a.btnNum,c);e(a.btnBullet,c).on("click",function(){r(t,!1)}),l.on("click",function(){r(t,1)}),t.on("keyup",function(a){if(13==a.keyCode){var c=t.val(),l=t.textrange("get"),d=c.split(/[\n\r]/g
), p = o(c, l), u = d[Math.max(p.startLine - 1, 0)];
e.trim(s(u)) && (n(u) ? r(t, 1) : i(u) && r(t, !1))
}
})
}
})
}
})
})
;var isEmpty = function (e) {
    return Array.isArray(e) && 0 === e.length || Object.prototype.isPrototypeOf(e) && 0 === Object.keys(e).length
};
Date.prototype.Format = function (e) {
    var t = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var i in t) new RegExp("(" + i + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[i] : ("00" + t[i]).substr(("" + t[i]).length)));
    return e
}, Array.prototype.unique = function (e) {
    if (this.length < 2) return [this[0]] || [];
    for (var t = {}, i = [], n = 0; n < this.length; n++) {
        var s = this[n], a = !!e && typeof t[s] != typeof s;
        (void 0 === t[s] || a) && (t[s] = s, i.push(s))
    }
    return i
}, Array.prototype.indexOf = function (e) {
    for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
    return -1
}, Array.prototype.remove = function (e) {
    var t = this.indexOf(e);
    t > -1 && this.splice(t, 1)
}, Array.prototype.filter || (Array.prototype.filter = function (e) {
    "use strict";
    if (void 0 === this || null === this) throw new TypeError;
    var t = Object(this), i = t.length >>> 0;
    if ("function" != typeof e) throw new TypeError;
    for (var n = [], s = arguments.length >= 2 ? arguments[1] : void 0, a = 0; a < i; a++) if (a in t) {
        var o = t[a];
        e.call(s, o, a, t) && n.push(o)
    }
    return n
}), Array.prototype.map || (Array.prototype.map = function (e, t) {
    var i, n, s;
    if (null == this) throw new TypeError(" this is null or not defined");
    var a = Object(this), o = a.length >>> 0;
    if ("[object Function]" != Object.prototype.toString.call(e)) throw new TypeError(e + " is not a function");
    for (t && (i = t), n = new Array(o), s = 0; s < o;) {
        var r, c;
        s in a && (r = a[s], c = e.call(i, r, s, a), n[s] = c), s++
    }
    return n
}), Array.prototype.indexOf || (Array.prototype.indexOf = function (e, t) {
    var i;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var n = Object(this), s = n.length >>> 0;
    if (0 === s) return -1;
    var a = 0 | t;
    if (a >= s) return -1;
    for (i = Math.max(a >= 0 ? a : s - Math.abs(a), 0); i < s;) {
        if (i in n && n[i] === e) return i;
        i++
    }
    return -1
}), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
    value: function (e) {
        if (null == this) throw new TypeError('"this" is null or not defined');
        var t = Object(this), i = t.length >>> 0;
        if ("function" != typeof e) throw new TypeError("predicate must be a function");
        for (var n = arguments[1], s = 0; s < i;) {
            var a = t[s];
            if (e.call(n, a, s, t)) return a;
            s++
        }
    }
}), "function" != typeof Array.prototype.reduce && (Array.prototype.reduce = function (e, t) {
    "use strict";
    if (null === this || void 0 === this) throw new TypeError("Array.prototype.reduce called on null or undefined");
    if ("function" != typeof e) throw new TypeError(e + " is not a function");
    var i, n, s = this.length >>> 0, a = !1;
    for (1 < arguments.length && (n = t, a = !0), i = 0; s > i; ++i) this.hasOwnProperty(i) && (a ? n = e(n, this[i], i, this) : (n = this[i], a = !0));
    if (!a) throw new TypeError("Reduce of empty array with no initial value");
    return n
}), function (e, t, n, s) {
    var a = function (t, i) {
        var n = this;
        n.$element = t, n.defaults = {
            width: 840,
            height: 256,
            start: 1,
            speed: 400,
            interval: 3e3,
            autoPlay: !1,
            dotShow: !0,
            navShow: !0,
            arrShow: !0,
            touch: !0,
            effect: "slide",
            fadeOut: !0,
            afterSlider: function () {
            }
        }, n.clickable = !0, n.options = e.extend({}, n.defaults, i)
    };
    a.prototype = {
        init: function () {
            var n = this, s = n.$element, a = s.children("ul"), o = a.children("li"), r = o.length, c = n.options.start,
                l = 0, d = 0;
            if (n.options.arrShow) {
                s.append('<a href="javascript:;" class="btn-direction btn-prev prev"></a><a href="javascript:;" class="btn-direction btn-next next"></a>')
            }
            for (i = 1; i <= r; i++) c == i && o.eq(c - 1).addClass("cur");
            if (n.options.dotShow) {
                var p = "";
                for (i = 1; i <= r; i++) c == i ? p += '<i data-index="' + i + '" class="cur"></i>' : p += '<i data-index="' + i + '"></i>';
                var u = '<div class="slider-dot">' + p + "</div>";
                s.append(u)
            }
            var h = function () {
                var e = s.width(), t = n.options.height / n.options.width * e;
                s.css("height", t)
            };
            if (s.css("height", n.options.height), h(), e(t).resize(function () {
                h()
            }), n.options.arrShow && (s.find(".next").on("click", function (e) {
                e.preventDefault(), n.clickable && (c >= r ? c = 1 : c += 1, n.moveTo(c, "next"))
            }), s.find(".prev").on("click", function (e) {
                e.preventDefault(), n.clickable && (1 == c ? c = r : c -= 1, n.moveTo(c, "prev"))
            })), n.options.dotShow && s.find(".slider-dot i").on("mouseover", function (t) {
                if (t.preventDefault(), void 0 !== f && clearInterval(f), n.clickable) {
                    var i = e(this).data("index");
                    dir = i > c ? "next" : "prev", i != c && (c = i, n.moveTo(c, dir))
                }
            }), n.options.navShow && s.parent().find(".slider-nav a").on("mouseover", function (t) {
                if (t.preventDefault(), n.clickable) {
                    var i = e(this).data("index");
                    dir = i > c ? "next" : "prev", i != c && (c = i, n.moveTo(c, dir))
                }
            }), n.options.autoPlay) {
                var f, m = function () {
                    c++, c > r && (c = 1), n.moveTo(c, "next")
                };
                f = setInterval(m, n.options.interval), s.hover(function () {
                    f = clearInterval(f)
                }, function () {
                    f = setInterval(m, n.options.interval)
                })
            }
            n.options.touch && o.on({
                touchstart: function (e) {
                    l = e.originalEvent.touches[0].clientY, d = e.originalEvent.touches[0].clientX
                }, touchend: function (e) {
                    var t = e.originalEvent.changedTouches[0].clientY, i = e.originalEvent.changedTouches[0].clientX,
                        s = l - t, a = d - i;
                    Math.abs(a) > Math.abs(s) && (a > 5 ? (c >= r ? c = 1 : c += 1, n.moveTo(c, "next")) : (1 == c ? c = r : c -= 1, n.moveTo(c, "prev"))), l = null, d = null
                }, touchmove: function (e) {
                    e.preventDefault && e.preventDefault()
                }
            })
        }, moveTo: function (t, i) {
            var n = this, s = n.$element, a = n.clickable, o = s.find(".slider-dot i"),
                r = s.parent().find(".slider-nav a"), c = s.children("ul"), l = c.children("li");
            if (!a) return !1;
            if (n.clickable = !1, "fade" == n.options.effect) 1 == n.options.fadeOut ? c.children(".cur").fadeOut(function () {
                e(this).removeClass("cur")
            }) : c.children(".cur").hide().removeClass("cur"), l.eq(t - 1).fadeIn(function () {
                e(this).addClass("cur"), n.clickable = !0
            }); else {
                var d = s.width();
                "prev" == i && (d *= -1), c.children(".cur").stop().animate({left: -d}, n.options.speed, function () {
                    e(this).removeClass("cur")
                }), l.eq(t - 1).css("left", d + "px").addClass("cur").stop().animate({left: 0}, n.options.speed, function () {
                    n.clickable = !0
                })
            }
            n.options.afterSlider.call(n), o.removeClass("cur"), o.eq(t - 1).addClass("cur"), r.removeClass("cur"), r.eq(t - 1).addClass("cur")
        }
    }, e.fn.hwSlider = function (e) {
        var t = new a(this, e);
        return this.each(function () {
            t.init()
        })
    }
}(jQuery, window, document);
var PlaceholderCheck = {
    init: function (e) {
        if (!placeholderSupport()) {
            var t;
            t = e ? e.find("[placeholder]") : $("[placeholder]"), t.focus(function () {
                var e = $(this);
                e.val() == e.attr("placeholder") && (e.val(""), e.removeClass("placeholder"))
            }).blur(function () {
                var e = $(this);
                "" != e.val() && e.val() != e.attr("placeholder") || (e.addClass("placeholder"), e.val(e.attr("placeholder")))
            }).blur()
        }
    }
};
$(function () {
    PlaceholderCheck.init()
});
var Storage = {
    get: function (e) {
        var t = this._getStorage(), i = "";
        if (t) return (i = t.getItem(e)) && JSON.parse(i)
    }, set: function (e, t) {
        var i = this._getStorage();
        e && void 0 !== t && i.setItem(e, JSON.stringify(t))
    }, del: function (e, t) {
        var i = this._getStorage();
        if (i) if (e && t) for (var e in i) 0 === e.indexOf(prefix) && i.removeItem(e); else e ? i.removeItem(e) : i.clear()
    }, _getStorage: function () {
        var e;
        try {
            e = window.localStorage
        } catch (e) {
        }
        return e
    }
}, Report = {
    init: function () {
        Report.uploadCount = 0, Report.reasonCode = "", Report.handleEntryClick()
    }, getReportTypeList: function () {
        $.toast({type: "loading", content: "鍔犺浇涓炬姤绫诲瀷涓�..."});
        var e = {parentCode: 0};
        $.post({
            url: "/wapi/zpuser/h5/user/report/getAllReason", data: e, success: function (e) {
                0 == e.code ? e && e.zpData && e.zpData.length ? ($("#toast").remove(), Report.handleReportTypeListDom(e.zpData)) : $.toast({
                    type: "error",
                    content: "鏆傛湭鎵惧埌浜岀骇鏍囩"
                }) : 7 == e.code && void 0 !== Detail ? Detail.showSign(1011) : $.toast({
                    content: e.message,
                    type: "error"
                })
            }, error: function (e) {
                $.toast({content: e.message || "璇锋眰澶辫触", type: "error"})
            }
        })
    }, handleReportTypeListDom: function (e) {
        var t = "";
        $.each(e, function (e, i) {
            t += '<div class="type-item" data-first-title=' + i.name + " data-code=" + i.code + '><div class="type-item-inner"><div class="first-title">' + i.name + '</div><div class="second-title">' + i.desc + '</div><div class="right-icon"></div></div></div>'
        });
        var i = '<div class="type-list">' + t + "</div>";
        $.dialog({
            title: "閫夋嫨涓炬姤绫诲瀷",
            content: i,
            inline: !0,
            confirmText: !1,
            cancelText: !1,
            wrapClass: "dialog-report-type-list",
            onOpen: function (e) {
                e.find(".type-item").on("click", function (e) {
                    var t = $(this).attr("data-first-title"), i = $(this).attr("data-code");
                    try {
                        var n = {action: "system-safely-report-typechoose", p1: t, p2: i};
                        Report.myActionLog(n)
                    } catch (e) {
                    }
                    Report.getSecondTitleList(t, i), $(".dialog-report-type-list").hide(), Report.reasonCode = i, $.toast({
                        type: "loading",
                        content: "鍔犺浇涓炬姤璇︽儏涓�..."
                    })
                })
            }
        })
    }, setReportSubbmitPageDom: function (e, t) {
        var i = "";
        $.each(t, function (e, t) {
            i += '<div class="second-title" data-second-title=' + t.name + " data-code=" + t.code + ">" + t.name + "</div>"
        });
        var n = function (e) {
            e.remove(), Report.uploadCount--
        };
        $.get("/wapi/zpuser/wap/report/random", function (t) {
            0 == t.code ? ($("#toast").remove(), $.dialog({
                content: '<div class="prop-inner"><div class="my-title"><div class="back-to-first"></div><div class="title-text">琛ュ厖涓炬姤璇佹嵁</div></div><div class="form-row"><span class="t">涓炬姤鍘熷洜锛�</span><div class="report-first-title">' + e + '</div></div><div class="form-row form-row-choice"><span class="t multiple-t-warp"><span class="require-icon">* </span>鍏蜂綋鎯呭喌璇存槑锛�<div class="multiple-choice-text">锛堝彲澶氶€夛級</div></span><div class="report-second-title-list">' + i + '</div></div><div class="form-row"><span class="t"><span class="require-icon">*</span> 琛ュ厖璇存槑锛�</span><div class="ipt-wrap"><textarea name="content" ka="report-content" class="ipt reason-content-ipt" placeholder="琛ュ厖鏇磋缁嗙殑璇存槑锛屽彲甯姪宸ヤ綔浜哄憳鏇村揩瀹氫綅闂锛屽揩閫熷鐞�" data-range="1,500" maxlength="500" data-blank="璇疯緭鍏ヤ妇鎶ュ唴瀹�"></textarea><span class="count-num"><em>0</em>/500</span></div><span class="text-error"></span></div><div class="form-row"><span class="t">楠岃瘉鐮侊細</span><div class="verify-box ipt-wrap"><input type="text" class="ipt verify-ipt " name="captcha" ka="report-captcha" placeholder="楠岃瘉鐮�" maxlength="4" data-blank="璇疯緭鍏ラ獙璇佺爜"><img src="/wapi/zppassport/captcha?randomKey=' + t.zpData.randomKey + '" class="loaded"><input type="hidden" name="randomKey" class="randomkey" value="' + t.zpData.randomKey + '"></div><span class="text-error"></span></div><div class="form-row"><span class="t t-pic">璇佹嵁鎴浘锛�</span><div class="upload"><div class="preview"><ul><div class="upload-btn"><span class="icon-plus"></span><a href="javascript:;">涓婁紶鍥剧墖</a><input id="fileupload" type="file" name="file" ka="report-picture"></div></ul></div><span class="text-error pic-error"></span></div></div></div>',
                title: "",
                inline: !0,
                cancelButton: "鍙栨秷",
                confirmButton: "纭",
                wrapClass: "pop-report",
                onOpen: function (e) {
                    "FormsUI" in window && FormsUI.dropSelect(e), "DropDown" in window && DropDown.init(e), e.find(".verify-box img").on("click", function () {
                        $(this).attr("src", "/wapi/zppassport/captcha/?randomKey=" + $(this).siblings(".randomkey").val() + "&_r=" + (new Date).getTime())
                    }), e.find("#fileupload").on("click", function (t) {
                        $(this).next(".verify-box") ? Report.checkForm($(".verify-box")) ? Report.uploadPictures($(this), e) : t.preventDefault() : Report.uploadPictures($(this), e)
                    }), e.find(".second-title").on("click", function (e) {
                        $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active")
                    }), e.on("click", ".link-close", function () {
                        n($(this).parents("li"))
                    }), e.find(".back-to-first").on("click", function (t) {
                        Report.handleClickBack(e)
                    }), e.find(".reason-content-ipt").on("input", function () {
                        var t = $(this).val().length;
                        e.find(".count-num em").text(t)
                    })
                },
                onConfirm: function (e) {
                    return Report.submitForm(e, "", "")
                },
                onClose: function () {
                    $(".dialog-report-type-list").remove()
                }
            })) : 7 == t.code && void 0 !== Detail ? Detail.showSign(1011) : $.toast({
                content: t.message,
                type: "error"
            })
        })
    }, getSecondTitleList: function (e, t) {
        var i = {parentCode: t};
        $.post({
            url: "/wapi/zpuser/h5/user/report/getAllReason", data: i, success: function (t) {
                0 == t.code ? t.zpData && t.zpData.length ? Report.setReportSubbmitPageDom(e, t.zpData) : $.toast({
                    type: "error",
                    content: "鏆傛湭鎵惧埌浜岀骇鏍囩"
                }) : 7 == t.code && void 0 !== Detail ? Detail.showSign(1011) : $.toast({
                    content: t.message,
                    type: "error"
                })
            }, error: function (e) {
                $.toast({content: e.message || "璇锋眰澶辫触", type: "error"})
            }
        })
    }, handleEntryClick: function () {
        $("body").on("click", ".icon-report,.link-report", function () {
            try {
                var e = {action: "detail-report-click", p1: _reportData.reportedId, p3: _reportData.targetId, p6: 3};
                Report.myActionLog(e)
            } catch (e) {
            }
            Report.getReportTypeList();
            try {
                _T.sendEvent("report_geek_" + $(".icon-report").siblings(".icon-coop").attr("data-uid"))
            } catch (e) {
            }
        })
    }, uploadPictures: function (el, popContent) {
        var url = "/wapi/zpupload/image/uploadSingle", typeRule = /(\.|\/)(png|jpg|jpeg)$/i, maxSize = 3e6, el = el,
            previewEl = el.closest(".upload").find(".preview"), uploadContainer = el.closest(".upload"),
            vertifyEl = popContent.find(".verify-box .ipt");
        el.fileupload({
            method: "POST",
            url: url,
            dataType: "text",
            acceptFileTypes: typeRule,
            maxChunkSize: maxSize,
            formData: {token: window.top._PAGE.token ? window.top._PAGE.token.split("|")[0] : ""},
            add: function (e, t) {
                var i = t.files[0], n = i.name, s = i.size;
                return fileInfo = i, typeRule.test(n) ? s > maxSize ? void $.toast({
                    content: "璇蜂笂浼�3M浠ュ唴鐨勬枃浠�",
                    type: "error"
                }) : Report.uploadCount >= 6 ? void popContent.find(".preview").siblings(".text-error").html("鏈€澶氬彲浠ヤ笂浼�6寮犵収鐗�") : (popContent.find(".preview").siblings(".text-error").html(""), t.formData = {source: "report"}, void t.submit()) : void $.toast({
                    content: "璇蜂笂浼爌ng銆乯pg銆乯peg 鏍煎紡鐨勬枃浠�",
                    type: "error"
                })
            },
            done: function (e, data) {
                var result = data.result;
                "string" == typeof result && (result = eval("(" + result + ")")), 0 == result.code ? (Report.uploadCount++, setTimeout(function () {
                    previewEl.find("ul").find(".upload-btn").before('<li><img src="' + result.zpData.url + '" data-img="' + result.zpData.url + '"/><i class="link-close"></i></li>')
                }, 500)) : (uploadContainer.find("a").html("涓婁紶鍥剧墖"), $.toast({
                    content: result.resmsg,
                    type: "error"
                }), "楠岃瘉鐮侀敊璇�" == result.resmsg && (vertifyEl.val("").focus(), popContent.find(".verify-box img").click()))
            },
            fail: function (e, t) {
                uploadContainer.find("a").html("涓婁紶鍥剧墖"), $.toast({content: "涓婁紶澶辫触", type: "error"})
            }
        })
    }, submitForm: function (e, t, i) {
        var n = e, s = $.trim(n.find("textarea").val()), a = !1, o = this, r = "", c = "", l = [], d = "";
        if (n.find(".active").each(function () {
            l.push($(this).attr("data-code"))
        }), !(l = l.join(","))) return $.toast({type: "error", content: "璇峰厛閫夋嫨璇存槑鏍囩"}), !1;
        n.find(".ipt-wrap").each(function () {
            return a = o.checkForm($(this)), o.checkForm($(this))
        }), n.find(".preview img").each(function () {
            r += $(this).attr("data-img") + ","
        }), r = r.substring(0, r.length - 1), "" != t ? (c = t, d = i) : "_reportData" in window ? (c = _reportData.reportedId, d = _reportData.targetId) : (c = Chat.curUserData.uid, d = Chat.curUserData.infoData.expectId);
        var p = {
            reportedId: c,
            reasonCode: Report.reasonCode,
            content: s,
            targetId: d,
            imgUrl: r || "",
            randomKey: n.find(".randomkey").val(),
            captcha: $(".verify-box input").val(),
            source: 2,
            reasonLabel: l
        };
        return a && (a = !1, $.ajax({
            url: "/wapi/zpuser/wap/user/report",
            type: "POST",
            data: p,
            dataType: "JSON",
            timeout: 3e4,
            success: function (t) {
                0 === t.code ? ($.toast({
                    content: "鎻愪氦鎴愬姛锛岃鑰愬績绛夊緟鍙嶉",
                    type: "success"
                }), Report.uploadCount = 0, e.remove()) : ($.toast({
                    content: t.message,
                    type: "error"
                }), "楠岃瘉鐮侀敊璇�" == t.message && (n.find(".verify-box .ipt").val("").focus(), n.find(".verify-box img").click()))
            },
            error: function (e) {
            }
        })), !1
    }, checkForm: function (e) {
        var t, i = e.find(".ipt").val();
        if (void 0 != e.find(".ipt").attr("data-range")) {
            if (t = e.find(".ipt").attr("data-range").split(",")[1], i.length > t) return e.next(".text-error").html("璇疯緭鍏�" + t + "涓瓧浠ュ唴鐨勫唴瀹�"), !1;
            e.next(".text-error").html("")
        }
        if ("" == i) {
            var n = e.find(".ipt").attr("data-blank");
            return e.find(".ipt").focus(), e.next(".text-error").html(n), !1
        }
        return e.next(".text-error").html(""), !0
    }, handleClickBack: function (e) {
        var t = !0, i = "", n = [];
        e.find(".active").each(function () {
            n.push($(this).attr("data-code"))
        }), n.length && (t = !1), $(".reason-content-ipt").val() && (t = !1), $(".verify-ipt").val() && (t = !1), e.find(".preview img").each(function () {
            i += $(this).attr("data-img") + ","
        }), i = i.substring(0, i.length - 1), i.length && (t = !1), t ? ($(".dialog-report-type-list").show(), $(".pop-report").remove()) : $.dialog({
            content: "鍐呭鏈彁浜わ紝纭閫€鍑哄悧锛�",
            title: "娓╅Θ鎻愮ず",
            inline: !0,
            wrapClass: "dialog-back-to-type-list",
            onConfirm: function (e) {
                e.remove(), setTimeout(function () {
                    $(".dialog-report-type-list").show(), $(".pop-report").remove()
                }, 300)
            }
        })
    }, myActionLog: function (e) {
        try {
            $.ajax({
                method: "post",
                url: "/wapi/zpCommon/actionLog/common.json",
                data: {ba: JSON.stringify(e)},
                cache: !1,
                success: function (e) {
                },
                error: function () {
                }
            })
        } catch (e) {
        }
    }
};
$(function () {
    Report.init()
});
var Block = function () {
        function e(e, t) {
            var i = e, n = $.confirm({
                content: t,
                title: !1,
                closeIcon: !0,
                cancelButton: !!i.cancelText && i.cancelText,
                confirmButton: i.confirmText || "纭畾",
                confirmButtonClass: "fr",
                columnClass: "pop-block " + i.style,
                onOpen: function () {
                    i.ka && this.$confirmButton.attr("ka", i.ka), i.vka && __conversion(i.vka), i.open && i.open(this)
                },
                confirm: function () {
                    if (i.next && i.next(this.$content), !i.next && i.confirm && i.confirm(), 0 == i.autoClose) return !1
                },
                cancel: function (e) {
                    i.cancel && e && i.cancel()
                },
                onClose: function (e) {
                    i.close && i.close()
                }
            });
            return $(document).on("_BEFORE_UNLOAD", function () {
                n.close()
            }), n
        }

        function t(t) {
            var i = t, n = t.content || a({title: i.title, description: i.description});
            i.style = "pop-block-alert", e(i, n)
        }

        function i(t, i) {
            if (i.dpGray && i.blockPageData) return PositionShop.hot(t, i);
            var n, s = {}, o = function (e, t) {
                var n = (i.isEdit, "鍙戝竷");
                e.text("浠樿垂" + n + "鑱屼綅锛氾骏" + t)
            }, r = function () {
                if ("vip" == $(".hot-list-tab .checked").attr("data-cls")) return s.vip.type = "vip", s.vip;
                var e = $("input[name=ordinary]").filter(":checked"), t = e.attr("data-type"), i = e.attr("data-index");
                return selected = s[t][i], selected.type = t, selected.activityType = s.activityType, selected.activityEndDate = s.activityEndDate, selected.ba = s.ba, selected
            }, d = function (e) {
                var t = function (e) {
                    return "<i>" + ("0" + e).substr(-2, 2).split("").join("</i><i>") + "</i>"
                };
                if (s.activityType && s.activityEndDate) {
                    var i = s.activityEndDate;
                    n = new Clocking(i, 1e3), n.interval(function (i) {
                        var n = "";
                        n = i.day > 0 ? '<span class="prom-text">璺濈粨鏉�</span>' + t(i.day) + "&nbsp;澶�" : '<span class="prom-text">璺濈粨鏉熻繕鍓�</span>' + t(i.hour) + "锛�" + t(i.minute) + "锛�" + t(i.second), e.find(".hot-promotion").html(n)
                    })
                }
            }, p = {
                open: function (e) {
                    var t = e.$content;
                    if (t.on("change", "input[name='ordinary']", function () {
                        var i = $(this).attr("data-type"), n = $(this).attr("data-index"), a = s[i][n];
                        o(e.$confirmButton, a.pay), t.find("." + i + "-view").text(a.view), t.find("." + i + "-employ").text(a.employ)
                    }), t.on("click", ".hot-list-tab li", function () {
                        $(".hot-list-tab .checked").removeClass("checked"), $(this).addClass("checked"), t.find(".block-storm").removeClass("combination-ord").removeClass("combination-vip").addClass("combination-" + $(this).attr("data-cls")), "ord" == $(this).attr("data-cls") ? (e.$confirmButton.removeClass("btn-vip-rose"), t.find("input[name=ordinary]").filter(":checked").trigger("change")) : e.$confirmButton.addClass("btn-vip-rose").text("寮€閫歏IP甯愬彿")
                    }), $(".hot-list-tab li.checked").length ? $(".hot-list-tab li.checked").trigger("click") : t.find("input[name=ordinary]").filter(":checked").trigger("change"), e.$btnc.on("click", ".trial a", function () {
                        var t = s.experience;
                        t.type = "experience", i.confirm(t), e.close(), __conversion("block_sendjob_purchase_trial")
                    }), s.experience) {
                        e.$btnc.append(Utemplate('<p class="trial">鎮ㄦ湁涓€娆″厤璐逛綋楠屾満浼氾紝鍙厤璐硅瘯鐢ㄧ伀鐖嗚亴浣嶆櫘閫氱増<%this.expiredays%>澶╋紝<a href="javascript:">鐐瑰嚮鍏嶈垂浣跨敤</a></p>', s.experience))
                    }
                    d(t)
                }, next: function () {
                    var e = r();
                    i.confirm && i.confirm(e)
                }
            };
            i.canBuyVip ? function () {
                $.when(u({sf: i.sf || "", vipPriceId: i.vipPriceId}), h(t)).then(function (t, n) {
                    s = n, s.vip = {
                        ba: t.detailPage.ba,
                        vipPriceId: i.vipPriceId,
                        pay: t.detailPage.currentPriceDesc.replace(/[^\d.]/g, "")
                    };
                    var o = $.extend(p, i);
                    e(o, a({title: o.title, description: o.description}) + l.storm(t.detailPage, n))
                })
            }() : function () {
                var n = function (t) {
                    s = t;
                    var n = $.extend(p, i);
                    e(n, a({title: n.title, description: n.description}) + c.storm(t))
                };
                t.combos ? n(t.combos) : h(t).then(function (e) {
                    n(e)
                })
            }()
        }

        function n(t, i) {
            var n, s = function (t) {
                n = t;
                var s = i, r = a({title: s.title, description: s.description}) + o(t);
                s.next = function () {
                    var e = $("input[name=super]").filter(":checked").attr("data-index"), t = n.prices[e];
                    s.confirm(t)
                }, s.open = function (e) {
                    var s = e.$content, a = function (e, t) {
                        var n = (i.isEdit, "鍙戝竷");
                        e.text("浠樿垂" + n + "鑱屼綅锛氾骏" + t)
                    }, o = (i.isEdit, "浠樿垂鍙戝竷鑱屼綅");
                    if (e.$confirmButton.text(o + "锛氾骏" + t.pay), e.$btnc.on("click", ".trial a", function () {
                        var t = n.experience;
                        t.type = "experience", i.confirm(t), e.close(), __conversion("block_sendjob_purchase_trial")
                    }), s.on("change", "input[name='super']", function () {
                        var t = $(this).attr("data-index"), i = n.prices[t];
                        a(e.$confirmButton, i.pay);
                        var o = "鍙繚鎸佽亴浣嶅湪绾�" + i.expiredays + "澶╋紝鏈熼棿姣忔棩鏌ョ湅璇︽儏" + i.view + "锛屽紑鑱婁笂闄愪负" + i.employ + "銆�";
                        s.find(".hot-intro").text(o)
                    }), s.find("input[name=super]").filter(":checked").trigger("change"), n.experience) {
                        e.$btnc.append(Utemplate('<p class="trial">浣犳湁涓€娆″厤璐逛綋楠屾満浼氾紝鍙互鍏嶈垂璇曠敤鐏垎鑱屼綅闄愬埗鐗� <%this.expiredays%> 澶╋紝<a ka="block_sendjob_purchase_super_trial" href="javascript:">鐐瑰嚮鍏嶈垂浣跨敤</a></p>', n.experience))
                    }
                }, e(s, r)
            };
            t.combos ? s(t.combos) : p(t).then(function (e) {
                s(e)
            }), console.log(arguments)
        }

        function s(t, i) {
            var n = i, s = n.content || r(t);
            n.style = "pop-block-upgrade", n.open = function (e) {
                e.$confirmButton.text("浠樿垂鍗囩骇鑱屼綅锛�" + t.currentPriceDesc)
            }, e(n, s)
        }

        var a = function (e) {
            return Utemplate(' <div class="block-intro"><img src="/v2/web/boss/images/icon-lock-24.png"><dl><dt><%this.title%></dt><dd class="gray"><%this.description%></dd></dl><div class="clear"></div></div>', e)
        }, o = function (e) {
            return -1 == e.view ? e.view = "鏃犱笂闄�" : e.view = e.view, Utemplate('<div class="hot-list hot-list"><p class="hot-intro">鍙繚鎸佽亴浣嶅湪绾�<%this.description%>锛屾湡闂存瘡鏃ユ煡鐪嬭鎯�<%this.view%>锛屽紑鑱婁笂闄愪负<%this.employ%>銆�</p><ul class="ordinary"><%for(var i=0;i<this.prices.length;i++){%><li><label class="radio"><input data-index="<%i%>" type="radio" <%if(i == 0){%>checked<%}%> name="super" value="<%i%>"><span>鏅€氱増锛�<%this.prices[i].description%><%if(this.prices[i].discount){%><em class="discount"><%this.prices[i].discount%></em><%}%><em class="pay">锟�<%this.prices[i].pay%>/鑱屼綅</em></span></label></li><%}%></ul></div>', e)
        }, r = function (e) {
            return e.hlShortDesc.name = function () {
                var t = e.hlShortDesc, i = t.name;
                return t.highlightList && t.highlightList.length && $.each(t.highlightList, function (e, t) {
                    var n = i.substr(t.startIndex, t.endIndex)
                    ;i = i.replace(n, "<b>" + n + "</b>")
                }), i
            }(), Utemplate('<div class="super-upgrade-panel"><div  class="super-upgrade-description"><span class="icon-lock"></span><div class="description"><h4><%this.title%>鏅€氱増锛�<%this.animationTitle%></h4><p><%this.shortDesc.name%></p><p><%this.hlShortDesc.name%></p></div></div><dl class="super-upgrade-list"><dt>鐣呰亰鐗�<span class="icon-upgrade">鍗囩骇</span></dt><%for(var i=0;i<this.descList.length;i++){%><dd><%this.descList[i]%><i class="icon-check"></i></dd><%}%><dd><b>鍗囩骇鎵€闇€浠锋牸锛�</b><span class="bean-number"><%this.currentPriceDesc%></span><span class="upgrade-discount">闄愭椂鎶樻墸</span><span class="annotation"><%this.upgradeDesc%></span></dd></dl><p class="notice">*浠ヤ笂浠锋牸鍧囦负鍗曚釜鑱屼綅浠锋牸锛屼笉鍚屽煄甯備笉鍚岃亴绫讳环鏍兼湁鎵€娉㈠姩</p></div>', e)
        }, c = {
            vip: function (e) {
                var t = {pay: e.currentPriceDesc, list: e.lineList};
                return Utemplate('<table class="vip-grid"><thead><tr><th>璐﹀彿鏉冪泭</th><th style="width: 90px;">璁よ瘉璐﹀彿</th><th style="width: 70px;">VIP璐﹀彿</th></tr></thead><tbody><%for (var i=0;i<this.list.length;i++){%><tr><td><div class="cut-off"><%this.list[i].itemDesc%><i class="gray"><%this.list[i].itemDescHint%></i></div></td><td class="gray"><%this.list[i].curDesc%></td><td class="primrose"><%this.list[i].totalDesc%></td></tr><%}%></tbody></table><div class="vip-counter"><p class="fl">鏉冪泭鎬讳环鍊�<i>闄愭椂鎶樻墸</i></p><p class="fr primrose">楼<%this.pay%></p></div>', t)
            }, storm: function (e) {
                return Utemplate('<%if(this.activityType){%><div class="hot-promotion"></div><%}%><div class="hot-list"><p class="hot-intro ordinary">鐏垎鑱屼綅鏅€氱増锛屾瘡鏃ユ煡鐪嬭鎯�<span class="ordinary-view"><%this.ordinary[0].view%></span>锛屽紑鑱�<span class="ordinary-employ"><%this.ordinary[0].employ%></span></p><ul class="ordinary"><%for(var i=0;i<this.ordinary.length;i++){%><li><label class="radio"><input data-index="<%i%>" data-type="ordinary" type="radio" <%if(i == 0){%>checked<%}%> name="ordinary" value="0"><span>鏅€氱増锛�<%this.ordinary[i].description%><%if(this.ordinary[i].discount){%><em class="discount"><%this.ordinary[i].discount%></em><%}%><em class="pay">锟�<%this.ordinary[i].pay%>/鑱屼綅</em></span></label></li><%}%></ul><%if(this.carefree.length){%><p class="hot-intro ordinary" style="padding-top: 9px;">鐏垎鑱屼綅鐣呰亰鐗堬紝姣忔棩鏌ョ湅璇︽儏<span class="carefree-view"><%this.carefree[0].view%></span>锛屽紑鑱�<span class="carefree-employ"><%this.carefree[0].employ%></span></p><ul class="ordinary"><%for(var j=0;j<this.carefree.length;j++){%><li><label class="radio"><input data-index="<%j%>" type="radio" data-type="carefree" name="ordinary" value="0"><span>鐣呰亰鐗堬紝<%this.carefree[j].description%><%if(this.carefree[j].discount){%><em class="discount"><%this.carefree[j].discount%></em><%}%><em class="pay">锟�<%this.carefree[j].pay%>/鑱屼綅</em></span></label></li><%}%></ul><%}%>', e)
            }
        }, l = {
            vip: function (e) {
                return '<div class="vip-ordinary-grid">' + c.vip(e) + "</div>"
            }, storm: function (e, t) {
                return '<div class="block-storm combination-vip"><div class="hot-list-tab"><ul><li data-cls="vip" class="checked">寮€閫歏IP</li><li data-cls="ord">鍗曠嫭鍙戝竷</li></ul></div><div class="vip-wrap">' + c.vip(e) + '</div><div class="ordinary-wrap">' + c.storm(t) + "</div></div>"
            }
        }, d = function (e) {
            var e = e;
            return $.isArray(e) ? $.each(e, function (t, i) {
                -1 == i.view ? e[t].view = "鏃犱笂闄�" : e[t].view = i.view + "浜�", -1 == i.employ ? e[t].employ = "鏃犱笂闄�" : e[t].employ = i.employ + "浜�"
            }) : (-1 == e.view ? e.view = "鏃犱笂闄�" : e.view = e.view + "浜�", -1 == e.employ ? e.employ = "鏃犱笂闄�" : e.employ = e.employ + "浜�"), e
        }, p = function (e) {
            var t = $.Deferred();
            return $.get("/bossweb/job/superprice.json", e).success(function (e) {
                1 == e.rescode && (e.prices = d(e.prices), e.experience && (e.experience = d(e.experience)), t.resolve(e))
            }), t
        }, u = function (e) {
            var t = $.Deferred();
            return $.get("/bossweb/job/vipaccountprice.json", e).success(function (e) {
                1 == e.rescode && t.resolve(e)
            }), t
        }, h = function (e) {
            var t = $.Deferred();
            return e.combos ? t.resolve(e.combos) : $.get("/bossweb/job/price.json", e).success(function (e) {
                if (1 == e.rescode) {
                    var i = {};
                    i.ordinary = d(e.ordinary), i.carefree = d(e.carefree), e.experience && (i.experience = d(e.experience)), i.activityType = e.activityType, i.activityEndDate = e.activityEndDate, t.resolve(i)
                }
            }), t
        }, f = function (t, i) {
            u(t).then(function (n) {
                var s = i,
                    o = a({title: s.title || "鍙戝竷鏅€氳亴浣嶄釜鏁板凡杈句笂闄�", description: s.description}) + l.vip(n.detailPage);
                s.style = "pop-vip", s.cancelText = "鎴戝啀鎯虫兂", s.confirmText = "寮€閫歏IP甯愬彿", s.next = function () {
                    i.confirm({
                        ba: n.detailPage.ba,
                        vipPriceId: t.vipPriceId,
                        pay: n.detailPage.currentPriceDesc.replace(/[^\d.]/g, "")
                    })
                }, e(s, o)
            })
        }, m = function (e) {
            var t = e;
            return e && "[object Object]" !== Object.prototype.toString.call(e) && (t = JSON.parse(decodeURIComponent(e))), t
        };
        return {
            confirm: t, purchase: i, super: n, upgrade: s, vip: f, action: function (e, t) {
                var t = t || {}, i = $.extend(e, t);
                $.ajax({
                    method: "post",
                    url: "/wapi/zpCommon/actionLog/common.json",
                    data: {ba: JSON.stringify(i)},
                    cache: !1,
                    success: function (e) {
                    },
                    error: function () {
                    }
                })
            }, formatBA: m
        }
    }(), Upgrade = function () {
        var e = function (e, t) {
            window.top.Purchase.position("/boss/block/pay.json", {
                priceId: t.priceId,
                action: 4,
                hotJobType: 0,
                business: t.business || "",
                targetId: t.targetId,
                targetType: t.targetType
            }, {
                item: t, success: e.success, confirm: function () {
                }
            })
        }, t = function (t, i) {
            if (!0 === i.dpGray || "true" === i.dpGray) return PositionShop.upgrade(t, i);
            var n = {
                cancelText: "鎴戝啀鎯虫兂", vka: "block_upgradejob_purchase_hot", cancel: function () {
                }, confirm: function () {
                    i.ba && Block.action(Block.formatBA(i.ba), {
                        p4: 4,
                        p5: i.priceId,
                        action: "user-block-biz-button"
                    }), e({
                        success: function () {
                        }
                    }, i)
                }
            };
            window.top.Block.upgrade(t, $.extend(n, i))
        };
        return {
            include: function (e, i) {
                return !!e.upgrade && (t(e, i), !0)
            }, render: t
        }
    }(), DirectAccessCard = function () {
        var e = {}, t = {
            prop: function (e) {
                var t = $.Deferred();
                return $.get("/boss/item/quicktop/selposition.json?jobId=" + e).success(function (e) {
                    1 == e.rescode ? t.resolve(e) : $.toast({type: "error", content: e.resmsg})
                }), t
            }
        }, i = {
            notice: function (e) {
                return Utemplate('<div class="free-notice-panel"><h4 class="subhead">淇濆瓨鎴愬姛</h4><p>鎮ㄤ娇鐢ㄥ厤璐规潈鐩婂彂甯冧簡涓€涓櫘閫氳亴浣嶏紝</p><p>璇ヨ亴浣嶄环鍊�50鍏�/鏈堬紝</p><p>鍓╀綑鍙厤璐瑰湪绾挎櫘閫氳亴浣嶆暟锛�<%this.unPubCount%>涓€�</p><i class="bead-close"></i></div>', e)
            }, recommend: function (e, t) {
                return (t.title ? i.notice(t) : Utemplate('<div class="brief-panel"><p class="icon-brief icon-success"></p><div class="brief-description"><p class="heading">淇濆瓨鎴愬姛</p><p class="position gray"><span class="position-name"><%this.positionName%></span><em class="vline"></em><%this.locationName%><em class="vline"></em><%this.lowSalary%>K-<%this.highSalary%>K</p></div><i class="bead-close"></i></div>', e)) + Utemplate('<div class="introduce-panel"><img src="/v2/web/boss/images/prop/promotion.png"><p class="slogan">鎬ヨ仒鐩撮€氬崱闄愭椂涓撲韩</p><p class="intro-text">缃《鑱屼綅+閭€绾︽姇閫掞紝绔嬪嵆鎻愬崌鑱屼綅鎷涜仒鏁堢巼</p><p class="notice">鑱屼綅鍙戝竷24灏忔椂鍐呴檺鏃惰喘涔�</p><button class="btn">绔嬪嵆浣撻獙</button></div>', e)
            }, card: function (e) {
                return Utemplate('<div class="brief-panel"><p class="icon-brief icon-card"></p><div class="brief-description"><p class="heading">鎬ヨ仒鐩撮€氬崱璐拱</p><p class="position gray">缃《鑱屼綅+閭€绾︽姇閫掞紝绔嬪嵆鎻愬崌鑱屼綅鎷涜仒鏁堢巼</p></div><i class="card-discount"></i></div><div class="card-description"><p class="position gray">浣跨敤鑱屼綅锛�<span class="position-name"><%this.job.positionName%></span><em class="vline"></em><%this.job.locationName%><em class="vline"></em><%this.job.lowSalary%>K-<%this.job.highSalary%>K</p><p class="direct-notice">璐拱鍚庡嵆缃《璇ヨ亴浣嶏紝杩炵画缃《24灏忔椂</p><div class="position-category"><div class="position-tip">缃《鑱岀被<p class="fr gray">閫夋嫨鏇村鑱岀被缃《锛屾彁鍗囨嫑鑱樻晥鏋滐紝鍙韩棰濆鎶樻墸</p></div><%if(1 < this.positionList.length){%><dl><dt><%this.positionList[0].name%></dt><%for(var i=1; i<this.positionList.length;i++){%><dd><%this.positionList[i].name%></dd><%}%></dl><%}%></div></div>', e)
            }
        }, n = function () {
            setTimeout(function () {
                window.top.location.href = "/chat/im?mu=/bossweb/joblist.html"
            }, 1e3)
        }, s = function () {
            var t = $(".direct-card-pop .position-category .selected"), i = t.length > 0 ? t.length : 0,
                n = Math.min(i, e.positionDiscount.length - 1), s = e.positionDiscount[n],
                a = 1e3 * e.positionList[0].price;
            t.each(function (t, i) {
                var t = $(this).index();
                a += 1e3 * e.positionList[t].price
            });
            var o = Math.floor(a * (1 - s) / 1e3);
            return {amount: a / 1e3, discount: s, save: t.length > 0 ? Math.ceil(a / 1e3 - o) : 0, pay: o}
        }, a = function () {
            var e = s(), t = "閫夋嫨鏇村鑱岀被缃《锛屾彁鍗囨嫑鑱樻晥鏋滐紝鍙韩棰濆鎶樻墸";
            if (e.discount > 0) {
                t = "鎷涜仒鏁堟灉鎻愬崌" + ($(".direct-card-pop .position-category .selected").length + 1) + "鍊� 棰濆绔嬪噺" + 100 * e.discount + "% ", $(".direct-card-pop .position-tip .gray").addClass("discount-tip").text(t)
            } else $(".direct-card-pop .discount-tip").removeClass("discount-tip").text(t);
            $(".direct-card-pop .dialog-footer  .prop-total").remove();
            var i = '<p class="prop-total">锟�<em>' + e.pay;
            e.save > 0 && (i += "</em><span>(宸茬渷" + e.save + ")</span>"), i += "</p>", $(".direct-card-pop .dialog-footer .btns").append(i)
        }, o = function (e) {
            var t = s(), i = function () {
                Payment.success({
                    article: "璐拱鎴愬姛",
                    text: "鍗冲埢缃《鑱屼綅24灏忔椂锛岄個绾﹀尮閰嶇墰浜烘姇閫�,鍙湪BOSS鐩磋仒APP銆屾垜鐨勯亾鍏枫€嶄腑鏌ョ湅浣跨敤鏁堟灉",
                    confirm: function () {
                        n()
                    }
                })
            }, a = {
                url: "/boss/item/pay/quicktop.json",
                data: e,
                description: "璐拱绠€鍘嗙洿閫氬崱",
                amount: t.pay,
                itemId: "b6ed128ee1b8d2841HI~",
                success: i,
                close: function () {
                },
                cancel: function () {
                }
            }, o = {success: i, cancel: n, close: n};
            Payment.purchase(a, o)
        }, r = function (t) {
            e = $.extend({}, t);
            $.dialog({
                bind: !0,
                title: "",
                closeLayer: !1,
                content: i.card(t),
                wrapClass: "direct-card-pop",
                confirmText: "璐拱骞朵娇鐢�",
                cancelText: "鍙栨秷",
                onOpen: function (e) {
                    $(e).on("click", ".position-category dd", function () {
                        $(this).toggleClass("selected"), a()
                    }), a()
                },
                onConfirm: function () {
                    var t = [];
                    $(".direct-card-pop .position-category .selected").each(function (i, n, s) {
                        var a = $(this).index();
                        t.push(e.positionList[a].code)
                    });
                    var i = {jobId: e.job.jobId, positionCode: t.join(","), userCouponId: ""};
                    o(i), this.close(), __conversion("ermergency_buy")
                },
                onClose: function (e) {
                    $(e).off("click")
                },
                onCancel: function () {
                    n()
                }
            })
        }, c = function (e, s) {
            var s = s || {};
            $.dialog({
                bind: !0,
                title: "",
                closeLayer: !1,
                content: i.recommend(e, s),
                wrapClass: "direct-card-pop",
                confirmText: !1,
                cancelText: !1,
                onOpen: function (i) {
                    var s = this;
                    $(i).on("click", ".bead-close", function () {
                        s.close(), n()
                    }), $(i).on("click", ".introduce-panel .btn", function () {
                        s.close(), t.prop(e.jobId).then(function (e) {
                            r(e)
                        }), __conversion("ermergency_edit")
                    }), __conversion("ermergency_card")
                },
                onClose: function (e) {
                    $(e).off("click")
                }
            })
        };
        return {
            show: r, notice: function (e) {
                $.dialog({
                    bind: !0,
                    title: "",
                    closeLayer: !1,
                    content: i.notice(e),
                    wrapClass: "direct-card-pop",
                    confirmText: !1,
                    cancelText: !1,
                    onOpen: function (e) {
                        var t = this;
                        $(e).on("click", ".bead-close", function () {
                            t.close(), n()
                        })
                    },
                    onClose: function (e) {
                        $(e).off("click")
                    }
                })
            }, recommend: c
        }
    }(), Feedback = {
        _picCount: 0, _limitPicCount: 3, getContent: function () {
            var e = this;
            $.get("/faqfeedback/pc/create.json").success(function (t) {
                $.dialog({
                    content: t.html,
                    title: '鎰忚鍙嶉<span class="tips">锛堢櫥褰曠敤鎴凤紝鎻愪氦鍙嶉鍚庡彲鍦ˋpp绔煡鐪嬪鏈嶅洖澶嶇殑娑堟伅锛�</span>',
                    closeText: !0,
                    cancelButton: "鍙栨秷",
                    confirmButton: "纭",
                    inline: !0,
                    wrapClass: "pop-feedback",
                    onOpen: function (t) {
                        var i = t.find(".upload-pics"), n = t.find(".upload-pic-btn"),
                            s = t.find(".upload-pic-btn-wrapper"), a = t.find(".verify-box");
                        Feedback._picCount = 0, a.find("img").on("click", function () {
                            $(this).attr("src", "/captcha/?randomKey=" + $(this).siblings(".randomkey").val() + "&_r=" + (new Date).getTime())
                        }), n.on("click", function (n) {
                            if (i.children(".upload-pic").length >= Feedback._limitPicCount) return $.toast({
                                content: "鏈€澶氫笂浼�" + Feedback._limitPicCount + "寮犲浘鐗�",
                                type: "error"
                            }), n.preventDefault(), !1;
                            a ? e.checkForm(a) ? e.uploadPicture(i, t) : n.preventDefault() : e.uploadPicture(i, t)
                        }), i.on("click", ".remove-pic", function (e) {
                            $(this).closest(".upload-pic").remove(), --Feedback._picCount, i.children(".upload-pic").length < Feedback._limitPicCount && s.show()
                        })
                    },
                    onConfirm: function (t) {
                        return e.submitForm(t)
                    },
                    onCancel: function (e) {
                        try {
                            _T.sendEvent("feedback_cancel")
                        } catch (e) {
                        }
                        e.remove()
                    }
                })
            })
        }, uploadPicture: function (elPicsWrap, popContent) {
            var vertifyEl = popContent.find(".verify-box .ipt"), uploadWaringTimer = null, reg = /(\.|\/)(png|jpg|jpeg)$/i;
            elPicsWrap.fileupload({
                method: "POST",
                url: "/faqfeedback/pc/upload/picture.json",
                dataType: "text",
                acceptFileTypes: reg,
                maxChunkSize: 2e6,
                formData: {
                    randomKey: popContent.find(".randomkey").val() || "",
                    captcha: popContent.find(".verify-box input").val() || ""
                },
                add: function (e, t) {
                    var i = t.files[0], n = i.name, s = i.size;
                    return reg.test(n) ? s > 2e6 ? void $.toast({
                        content: "涓婁紶鏂囦欢杩囧ぇ(鏈€澶�2M)",
                        type: "error"
                    }) : Feedback._picCount >= Feedback._limitPicCount ? (clearTimeout(uploadWaringTimer), uploadWaringTimer = setTimeout(function () {
                        $.toast({type: "warning", content: "鏈€澶氫笂浼�3寮犲浘鐗�"})
                    }, 100), !1) : (++Feedback._picCount, void t.submit()) : void $.toast({
                        content: "璇蜂笂浼爌ng銆乯pg銆乯peg 鏍煎紡鐨勬枃浠�",
                        type: "error"
                    })
                },
                done: function (e, data) {
                    var result = data.result;
                    if ("string" == typeof result && (result = eval("(" + result + ")")), 1 == result.rescode) {
                        elPicsWrap.find(".upload-pic-btn-wrapper").before('<div class="upload-pic"><div class="remove-pic"></div><img src="' + result.url[0] + '" data-img="' + result.url[1] + '"/></div>'), elPicsWrap.find(".upload-pic").length >= Feedback._limitPicCount && elPicsWrap.find(".upload-pic-btn-wrapper").hide();
                        try {
                            _T.sendEvent("feedback_pic")
                        } catch (e) {
                        }
                    } else clearTimeout(uploadWaringTimer), $.toast({
                        content: result.resmsg ? result.resmsg : result.message ? result.message : "涓婁紶澶辫触",
                        type: "error"
                    }), "楠岃瘉鐮侀敊璇�" == result.resmsg && (vertifyEl.val("").focus(), popContent.find(".verify-box img").click()), --Feedback._picCount
                },
                fail: function (e, t) {
                    clearTimeout(uploadWaringTimer), $.toast({content: "涓婁紶澶辫触", type: "error"}), --Feedback._picCount
                }
            })
        }, submitForm: function (e) {
            var t, i = e, n = i.find("textarea").val(), s = this;
            i.find(".ipt-wrap").each(function () {
                return t = s.checkForm($(this)), s.checkForm($(this))
            });
            var a = {
                content: n,
                imgurl: i.find(".upload-pic img").map(function (e, t) {
                    return $(t).data("img")
                }).get() || null,
                screen: $(window).width() + "*" + $(window).height(),
                pk: $("#page_key_name").val(),
                randomKey: i.find(".randomkey").val(),
                captcha: $(".verify-box input").val()
            };
            return t && (t = !1, $.ajax({
                url: "/faqfeedback/pc/save.json",
                type: "POST",
                data: a,
                traditional: !0,
                dataType: "JSON",
                timeout: 3e4,
                success: function (t) {
                    if (t.rescode) {
                        $.toast({content: "鍙嶉鎴愬姛锛佹垜浠細灏藉揩鏍稿疄澶勭悊", type: "success"});
                        try {
                            _T.sendEvent("feedback_success")
                        } catch (e) {
                        }
                        e.remove()
                    } else {
                        $.toast({
                            content: t.resmsg || "鎻愪氦澶辫触锛岃绋嶅悗鍐嶈瘯",
                            type: "error"
                        }), i.find(".verify-box .ipt").val(""), i.find(".verify-box img").click();
                        try {
                            _T.sendEvent("feedback_fail")
                        } catch (e) {
                        }
                    }
                },
                error: function (e) {
                    $.toast({content: "鎻愪氦澶辫触锛岃绋嶅悗鍐嶈瘯", type: "error"});
                    try {
                        _T.sendEvent("feedback_fail")
                    } catch (e) {
                    }
                }
            })), !1
        }, checkForm: function (e) {
            var t, i, n = e.find(".ipt").val();
            if (void 0 != e.find(".ipt").attr("data-range")) {
                var s = e.find(".ipt").attr("data-range").split(",");
                if (i = s[0], t = s[1], n.length > t) return e.next(".text-error").html("璇疯緭鍏�" + t + "涓瓧浠ュ唴鐨勫唴瀹�"), !1;
                if (e.next(".text-error").html(""), n.length < i) return e.next(".text-error").html("鍐呭鎻忚堪鑷冲皯" + i + "涓瓧"), !1;
                e.next(".text-error").html("")
            }
            if ("" == n) {
                var a = e.find(".ipt").attr("data-blank");
                return e.find(".ipt").focus(), e.next(".text-error").html(a), !1
            }
            return e.next(".text-error").html(""), !0
        }
    }, SECURITY_SCRIPT_PATH = "/web/common/security-js/", GATEWAY_TOKEN_NAME = "__zp_stoken__",
    GATEWAY_SEED_NAME = "__zp_sseed__", GATEWAY_SCRIPT_NAME = "__zp_sname__", GATEWAY_TS_NAME = "__zp_sts__",
    COOKIE_DOMAIN = function () {
        var e = location.hostname;
        return "localhost" === e || /^(\d+\.){3}\d+$/.test(e) ? e : "." + e.split(".").slice(-2).join(".")
    }(), setGatewayCookie = function () {
        function e(e, i) {
            var n = (new Date).getTime() + 2304e5, s = "";
            try {
                s = (new t).z(e, parseInt(i) + 60 * (480 + (new Date).getTimezoneOffset()) * 1e3)
            } catch (e) {
            }
            if (s && (Cookie.set(GATEWAY_TOKEN_NAME, s, n, COOKIE_DOMAIN, "/"), void 0 !== window.wst && "function" == typeof window.wst.postMessage)) {
                var a = {
                    name: "setWKCookie",
                    params: {
                        url: COOKIE_DOMAIN,
                        name: GATEWAY_TOKEN_NAME,
                        value: encodeURIComponent(s),
                        expiredate: n,
                        path: "/"
                    }
                };
                window.wst.postMessage(JSON.stringify(a))
            }
            return Cookie.del(GATEWAY_SEED_NAME, COOKIE_DOMAIN, "/"), Cookie.del(GATEWAY_SCRIPT_NAME, COOKIE_DOMAIN, "/"), Cookie.del(GATEWAY_TS_NAME, COOKIE_DOMAIN, "/"), s
        }

        var t, i = {}, n = document.createElement("iframe");
        return n.style.display = "none", n.name = "zhipinFrame", (document.body || document.documentElement).appendChild(n), function (s, a, o) {
            if (s && a && o || (s = Cookie.get(GATEWAY_SEED_NAME), a = Cookie.get(GATEWAY_SCRIPT_NAME), o = Cookie.get(GATEWAY_TS_NAME)), s && a && o) return i["" + a] ? void e(s, o) : void loadGatewayScript(SECURITY_SCRIPT_PATH + a + ".js", function () {
                i["" + a] = 1, t = n.contentWindow.ABC, e(s, o)
            }, n)
        }
    }();
$(function () {
    setGatewayCookie()
}), "_PAGE" in window && _PAGE.token ? $.ajaxSettings.beforeSend = function (e, t) {
    e.setRequestHeader("token", _PAGE.token.split("|")[0])
} : "_PAGE" in window.top && window.top._PAGE.token && ($.ajaxSettings.beforeSend = function (e, t) {
    e.setRequestHeader("token", window.top._PAGE.token.split("|")[0])
}), $.ajaxSettings.statusCode = {
    200: function (e) {
        if ("string" == typeof e) try {
            e = JSON.parse(e)
        } catch (e) {
        }
        e && ajaxGetaway(e.code, e.zpData)
    }, 602: function () {
        try {
            _T.sendTracking("geek_code_602_logout")
        } catch (e) {
        }
    }, 603: function () {
        window.location.href = "/web/geek/guide"
    }
};
var browser = {
    versions: function () {
        var e = navigator.userAgent;
        navigator.appVersion;
        return {
            trident: e.indexOf("Trident") > -1,
            presto: e.indexOf("Presto") > -1,
            webKit: e.indexOf("AppleWebKit") > -1,
            gecko: e.indexOf("Gecko") > -1 && -1 == e.indexOf("KHTML"),
            mobile: !!e.match(/AppleWebKit.*Mobile.*/),
            ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: e.indexOf("Android") > -1 || e.indexOf("Adr") > -1,
            iPhone: e.indexOf("iPhone") > -1,
            iPad: e.indexOf("iPad") > -1,
            webApp: -1 == e.indexOf("Safari"),
            weixin: e.indexOf("MicroMessenger") > -1,
            qq: " qq" == e.match(/\sQQ/i)
        }
    }(), language: (navigator.browserLanguage || navigator.language).toLowerCase()
}, VerrifyCode = window.VerrifyCode || function () {
    var e = new Date, t = e.getFullYear() + "" + e.getMonth() + e.getDay(), i = function (e, i) {
        seriesLoadScripts("//g.alicdn.com/sd/ncpc/nc.js?t=" + t, function () {
            var t = ["BOSS_PC", (new Date).getTime(), Math.random().toString(16)].join(":"), n = {
                renderTo: "#" + e.id,
                appkey: e.appkey || "FFFF0N00000000006DC1",
                scene: e.scene || "nc_login",
                token: t,
                customWidth: i.find(".row-code").width(),
                trans: {position: "sign-sms"},
                elementID: ["sign-sms"],
                is_Opt: 0,
                language: "cn",
                isEnabled: !0,
                timeout: 3e3,
                times: 5,
                apimap: {},
                callback: function (e) {
                    i.find("input[name=csig]").length || (i.find("form").append('<input type="hidden" name="csig" />'), i.find("form").append('<input type="hidden" name="ctoken" />'), i.find("form").append('<input type="hidden" name="csessionId" />'), i.find("form").append('<input type="hidden" value="FFFF0N00000000006DC1" name="cappKey" />'), i.find("form").append('<input type="hidden" value="nc_login" name="cscene" />')), i.find("input[name=csig]").val(e.sig), i.find("input[name=ctoken]").val(t), i.find("input[name=csessionId]").val(e.csessionid), $(".top-sign-box").length && setTimeout(function () {
                        QuickSign.checkForm($(".top-sign-box").find(".btn-sms").closest("form"), !0)
                    }, 500)
                }
            };
            setTimeout(function () {
                new noCaptcha(n).upLang("cn", {
                    _startTEXT: "璇锋寜浣忔粦鍧楋紝鎷栧姩鍒版渶鍙宠竟",
                    _yesTEXT: "楠岃瘉閫氳繃",
                    _error300: '鍝庡憖锛屽嚭閿欎簡锛岀偣鍑�<a href="javascript:__nc.reset()">鍒锋柊</a>鍐嶆潵涓€娆�',
                    _errorNetwork: '缃戠粶涓嶇粰鍔涳紝璇�<a href="javascript:__nc.reset()">鐐瑰嚮鍒锋柊</a>'
                })
            }, 1)
        })
    }, n = function (e, i) {
        seriesLoadScripts("//g.alicdn.com/sd/nch5/index.js?t=" + t, function () {
            var t = ["BOSS_H5", (new Date).getTime(), Math.random().toString(16)].join(":"), n = NoCaptcha.init({
                renderTo: "#" + e.id,
                appkey: e.appkey || "FFFF0N00000000006DC1",
                scene: "nc_login_h5",
                token: t,
                customWidth: "100%",
                trans: {position: "sign-h5"},
                elementID: ["sign-h5"],
                is_Opt: 0,
                language: "cn",
                timeout: 1e4,
                retryTimes: 5,
                errorTimes: 5,
                inline: !1,
                apimap: {},
                bannerHidden: !1,
                initHidden: !1,
                callback: function (e) {
                    i.find("input[name=csig]").length || (i.find("form").append('<input type="hidden" name="csig" />'), i.find("form").append('<input type="hidden" name="ctoken" />'), i.find("form").append('<input type="hidden" name="csessionId" />'), i.find("form").append('<input type="hidden" value="FFFF0N00000000006DC1" name="cappKey" />'), i.find("form").append('<input type="hidden" value="nc_login" name="cscene" />')), i.find("input[name=csig]").val(e.sig), i.find("input[name=ctoken]").val(t), i.find("input[name=csessionId]").val(e.csessionid)
                },
                error: function (e) {
                }
            });
            NoCaptcha.setEnabled(!0), n.reset(), NoCaptcha.upLang("cn", {
                LOADING: "鍔犺浇涓�...",
                SLIDER_LABEL: "璇峰悜鍙虫粦鍔ㄩ獙璇�",
                CHECK_Y: "楠岃瘉閫氳繃",
                CHECK_N: "楠岃瘉鏈€氳繃"
            })
        })
    }, s = function (e, t) {
        var s = e || {}, a = t || $(".sign-form:visible");
        if (e || (s.id = a.find(".row-code").attr("id"), s.scene = a.find("input[name=cscene]").val(), s.appkey = a.find("input[name=cappKey]").val()), !s.id) return !1;
        browser.versions.mobile ? n(s, a) : i(s, a)
    }, a = function (e) {
        if (!e || !e.length) return !1;
        var t = e.parents(".sign-form").length ? e.parents(".sign-form") : e.parents("form"),
            i = "verrify" + Math.random().toString(32).substr(-6, 6);
        e.empty(), e.attr("id", i), t.find("input[name=csig]").length ? (t.find("input[name=csig]").val(""), t.find("input[name=ctoken]").val(""), t.find("input[name=csessionId]").val("")) : (t.find("form").append('<input type="hidden" value="" name="csig" />'), t.find("form").append('<input type="hidden" value="" name="ctoken" />'), t.find("form").append('<input type="hidden" value="" name="csessionId" />'), t.find("form").append('<input type="hidden" value="FFFF0N00000000006DC1" name="cappKey" />'), t.find("form").append('<input type="hidden" value="nc_login" name="cscene" />')), s({
            id: i,
            scene: t.find("input[name=cscene]").val(),
            appkey: t.find("input[name=cappKey]").val()
        }, t)
    }, o = function () {
        $(".sign-form .row-code").each(function () {
            a($(this))
        })
    };
    return o(), {build: o, reset: a}
}();
Array.prototype.filter || (Array.prototype.filter = function (e) {
    "use strict";
    if (void 0 === this || null === this) throw new TypeError;
    var t = Object(this), i = t.length >>> 0;
    if ("function" != typeof e) throw new TypeError;
    for (var n = [], s = arguments.length >= 2 ? arguments[1] : void 0, a = 0; a < i; a++) if (a in t) {
        var o = t[a];
        e.call(s, o, a, t) && n.push(o)
    }
    return n
});
var __Tween = {
    bounceOut: function (e, t, i, n) {
        return (e /= n) < 1 / 2.75 ? i * (7.5625 * e * e) + t : e < 2 / 2.75 ? i * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t : e < 2.5 / 2.75 ? i * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t : i * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
    }
}, __throttle = function (e, t, i) {
    var n = null;
    return function () {
        (new Date).getTime();
        clearTimeout(n), n = setTimeout(e, t)
    }
}, EventBus = new EventManger, myCookie = {};
myCookie.getCookie = function (e) {
    var t, i = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
    return (t = document.cookie.match(i)) ? unescape(t[2]) : null
}, myCookie.setCookie = function (e, t, i) {
    var n = getsec(i), s = new Date;
    s.setTime(s.getTime() + 1 * n), document.cookie = e + "=" + escape(t) + ";expires=" + s.toGMTString()
}, myCookie.delCookie = function (e) {
    var t = new Date;
    t.setTime(t.getTime() - 1);
    var i = myCookie.getCookie(e);
    null != i && (document.cookie = e + "=" + i + ";expires=" + t.toGMTString())
}, window.myCookie = myCookie, $(function () {
    function e() {
        $.dialog({
            title: "",
            content: '<iframe src="/activity/cc/registerprotocol" frameborder="0" style="display:block;width:100%;height:370px;"></iframe>',
            closeLayer: !1,
            closeText: !1,
            confirmText: "鍚屾剰",
            cancelText: !1,
            bind: !0,
            wrapClass: "dialog-text-content",
            lock: !0,
            onConfirm: function () {
                this.close(), $.get("/wapi/zpgeek/agreement/agree.json")
            }
        })
    }

    function t() {
        var e = arguments;
        f <= h - 1 && (u.eq(f).stop(!0).animate({width: "300px"}, 500).siblings().stop(!0).animate({width: "98px"}, 500), ++f == h && (f = 0)), p = setTimeout(e.callee, 5e3)
    }

    function i() {
        if (g) {
            try {
                _T.sendEvent("city-sites-dialog-show")
            } catch (e) {
            }
            $.dialog({
                title: "",
                content: g,
                closeText: !0,
                cancelText: "",
                confirmText: "",
                wrapClass: "home-city-dialog"
            })
        }
    }

    function n() {
        $(window).scrollTop() >= $("#main").offset().top ? $(".column-search-panel").addClass("fixed") : $(".column-search-panel").removeClass("fixed")
    }

    function s() {
        var e = (v.offset().top, $(window).scrollTop(), $("body").outerHeight(), b.height(), $(window).height() - ($("#footer").offset().top - $(document).scrollTop()));
        e > 0 ? w.css("bottom", e) : w.css("bottom", 0)
    }

    function a(e) {
        e.find("img").each(function (e, t) {
            "" == $(this).attr("src") && $(this).attr("src", $(this).attr("data-src"))
        })
    }

    function o() {
        k.css({left: $(".nav-school-new").offset().left - 210, display: "block"})
    }

    function r() {
        k.css({display: "none"})
    }

    $.ajax({
        type: "get", url: "/wapi/zpgeek/agreement/update/tip.json", dataType: "json", success: function (t) {
            0 == t.code && t.zpData && t.zpData.showTip && e()
        }
    });
    var c = {
        init: function (e) {
            this.tabName = e, this.siderTab = {
                interest: {
                    title: "鎰熷叴瓒ｇ殑鑱屼綅",
                    requestUrl: "/wapi/zprelation/interaction/geekGetJob?tag=4&isActive=true",
                    url: "/web/geek/jobsfromchat?tag=4",
                    index: 1
                },
                contact: {
                    title: "娌熼€氳繃鐨勮亴浣�",
                    requestUrl: "/wapi/zprelation/interaction/geekGetJob?tag=5&isActive=true",
                    url: "/web/geek/jobsfromchat?tag=5",
                    index: 2
                },
                deliver: {
                    title: "鎶曢€掕繃鐨勮亴浣�",
                    requestUrl: "/wapi/zprelation/resume/geekDeliverList",
                    url: "/web/geek/jobsfromchat?tag=3",
                    index: 3
                },
                interview: {
                    title: "闈㈣瘯鏃ョ▼",
                    requestUrl: "/wapi/zprelation/interview/geek/data.json",
                    url: "/web/geek/jobsfromchat?tag=2",
                    index: 4
                }
            }, this.curTab = this.siderTab[this.tabName], this.interviewData = {}, this.showSlideList()
        }, showSlideList: function () {
            var e = this, t = c.loadFun();
            $("#siderbar .sider-detail").remove();
            var i = '<div class="sider-detail">            <p class="sider-title">' + this.curTab.title + '<a href="javascript:;">鏌ョ湅鍏ㄩ儴</a></p>            ' + t + "            </div>";
            $("#siderbar").append(i), this.tabTemplate(function (t) {
                var i = "";
                i = '<p class="sider-title">' + e.curTab.title + '<a href="javascript:;">鏌ョ湅鍏ㄩ儴</a></p>                ' + t + " ", $("#siderbar .sider-detail").html(i)
            })
        }, tabCheckall: function () {
            if (!_PAGE.uid) return void Detail.showSign(1011);
            location.href = this.curTab.url
        }, getTagData: function () {
            var e = $.Deferred();
            return $.get(this.curTab.requestUrl).success(function (t) {
                t ? ("function" == typeof ajaxGetaway && ajaxGetaway(t.code), e.resolve(t)) : $.toast({
                    content: "鏁版嵁鍔犺浇鍑洪敊锛岃绋嶅悗鍐嶈瘯",
                    type: "error"
                })
            }), e
        }, tabTemplate: function (e) {
            var t = this, i = "";
            this.getTagData().then(function (n) {
                if (0 == n.code && n.zpData) {
                    var s = n.zpData.cardList || n.zpData.interviewList;
                    if (0 == s.length) return i = t.errorTips("notHave"), void e(i);
                    i = 4 == t.curTab.index ? c.getInterviewTemplate(s) : c.getOtherTemplate(s)
                } else 1011 == n.code || 7 == n.code ? i = t.errorTips("notLogin") : $.toast({
                    content: n.message,
                    type: "error"
                });
                e(i)
            })
        }, getOtherTemplate: function (e) {
            var t = this, i = "", n = "", s = "", a = "", o = "", r = "";
            return $.each(e, function (e, c) {
                s = "", a = "/job_detail/" + c.encryptJobId + ".html", o = c.salaryDesc, 2 == c.jobValidStatus && (s = "opacity", a = "javascript:;", o = "鍋滄鎷涜仒"), c.salaryMonthText && (r = "路" + c.salaryMonthText), 1 == t.curTab.index && (i = '<button class="btn btn-primary btn-small btn-sider-interest"  data-jobid="' + c.encryptJobId + '">绉婚櫎</button>');
                var l = c.brandStageName ? '<span class="vline"></span><span>' + c.brandStageName + "</span>" : "";
                n += '                         <li class="' + s + '">                            <a href="' + a + '">                                <h4><span class="sider-degree">' + o + r + '</span><span class="sider-position-title"><span class="title-text' + (c.agentRecruitJob ? "" : " no-medium") + '">' + c.jobName + "</span>" + (c.agentRecruitJob ? '<img class="job-medium-icon" src="https://z.zhipin.com/web/geek/resource/job-medium-icon2.png" alt="浠ｆ嫑鑱屼綅">' : "") + '</span></h4>                                <p class="company-info">                                    <span>' + c.brandName + "</span>" + l + '                                </p>                                <p>                                    <img class="user-avatar" src="' + c.bossAvatar + '" alt=""/>                                    <span class="user-text">' + c.bossName + '<span class="vline"></span>' + c.bossTitle + "</span>                                    " + i + "                                </p>                            </a>                        </li>"
            }), '                    <ul class="sider-template">                        ' + n + '                      </ul>                    <a class="siderbar-more" href="' + this.curTab.url + '">鏌ョ湅鏇村</a>'
        }, getInterviewTemplate: function (e) {
            var t = "", i = "";
            btnstr = "";
            var n = c.getInterviewData(e);
            this.interviewData = n;
            for (var s in n) {
                var a = new Date(n[s][0].appointmentDate), o = a.getDate(), r = +a.getMonth() + 1;
                i = "", $.each(n[s], function (e, t) {
                    btnstr = "", 0 == t.statusCode && (btnstr = '                        <span class="btns-sider-interview">                            <a href="javascript:;" class="btn btn-cancel">鎷掔粷</a>                            <a href="javascript:;" class="btn btn-submit">鎺ュ彈</a>                        </span>'), i += '                    <li data-interviewId="' + t.interviewIdStr + '">                        <div class="interview-container">                            <h4 class="sub-title"><span class="interview-status">' + t.statusDesc + '</span><span class="company-name">' + t.brandName + '</span></h4>                            <p class="interview-info">                                鏃堕棿锛�<span>' + t.appointmentTime.split(" ")[1] + "</span><br>                                鑱屼綅锛�<span>" + t.jobName + "</span><br>                                钖祫锛�<span>" + t.jobSalary + '</span><br>                            </p>                            <p class="interview-user-info">                                <img src="' + t.bossAvatar + '"  alt=""/>                                <span class="user-text">' + t.bossName + '<span class="vline"></span>' + t.bossTitle + "</span>                                " + btnstr + "                            </p>                        </div>                     </li>"
                }), t += '                <div class="oneday-wrap ' + s + '" data-value = "' + s + '">                <p class="interview-time"> ' + n[s][0].appointmentWeekDesc + " <span>" + r + "鏈�" + o + '鏃�</span></p>                <ul class="interview-list">                ' + i + "                </ul>                </div>"
            }
            return t += '<a class="siderbar-more" href="/geek/tag/interview/">鏌ョ湅鏇村</a>'
        }, getInterviewData: function (e) {
            var t = {};
            return $.each(e, function (e, i) {
                var n = i.interviewIdStr;
                t[n] || (t[n] = []), t[n].push(i)
            }), t
        }, errorTips: function (e) {
            return "notHave" == e ? '                <div class="sider-error-tip">                    <i class="not-have"></i>                    <p>鏆傛椂娌℃湁' + this.curTab.title + '</p>                    <a href="/job_detail" class="btn btn-sider-more">鏌ョ湅鏇村鑱屼綅</a>                </div>' : '                <div class="sider-error-tip">                    <i class="not-login"></i>                    <p>鐧诲綍鍚庢煡鐪�' + this.curTab.title + '</p>                    <a href="javascript:;" class="btn btn-login">鍘荤櫥褰�</a>                </div>'
        }, loadFun: function () {
            return '            <div class="sider-load">                <i></i>                <p>鍔犺浇涓紝璇风◢绛�</p>            </div>'
        }, interviewDefer: function (e, t) {
            var i = $.Deferred();
            return $.get("/wapi/zprelation/interview/geek/operate.json", {interviewId: e, status: t}, function (e) {
                0 == e.code ? i.resolve(e) : $.toast({content: e.resmsg, type: "error"})
            }), i
        }, showInviteTip: function (e) {
            $.dialog({
                content: '<div class="text">路 闈㈣瘯鍓嶄竴澶�18鐐瑰墠锛屽弻鏂归兘鍙互鐢宠鍙栨秷銆�<br>路 濡備笉鍙栨秷锛岃鎸夋椂鍑哄腑闈㈣瘯锛屼笉瑕佺埥绾︺€�<br>路 瀵规柟鐖界害锛岀害瀹氭椂闂�30鍒嗛挓鍙互鎶曡瘔銆�<br>路 鐖界害涓€鏂癸紝骞冲彴鍥炲姞銆愪笉鑹褰曘€戝苟鍏ず銆�<br>路 涓轰簡鏂逛究鑱旂郴锛岄個璇烽潰璇曟垚鍔熷悗锛屽弻鏂硅嚜鍔ㄤ氦鎹㈡墜鏈鸿仈绯绘柟寮忋€�<br>路 瀵规柟灏嗚嚜鍔ㄨ幏鍙栦綘鐨勭畝鍘嗛檮浠躲€�</div>',
                title: "绾﹂潰璇曡瘹淇″畧鍒�",
                closeText: !1,
                cancelText: "鎴戝啀鎯虫兂",
                confirmText: "淇濊瘉涓嶇埥绾�",
                wrapClass: "interview-pop",
                onOpen: function (e) {
                },
                onConfirm: function (t) {
                    e(), t.remove()
                }
            })
        }, eventHander: function () {
            var e = this;
            $("body").on("click", "#siderbar .siderbar-top li a", function (e) {
                e.preventDefault()
            }), $("body").on("click", "#siderbar .siderbar-top li", function (e) {
                e.preventDefault();
                var t = $(this), i = t.attr("data-value");
                t.addClass("active").siblings().removeClass("active"), c.init(i), $("#siderbar .sider-detail").width("310px").css("overflow-y", "auto")
            }), $("body").on("click", "#siderbar .btn-login", function () {
                Detail.showSign(1011)
            }), $("body").on("click", function (e) {
                var t = e.target;
                0 == $(t).closest("#siderbar ").length && ($("#siderbar .sider-detail").width("0px").css("overflow-y", "hidden"), $("#siderbar .siderbar-top li").removeClass("active"))
            }), $("body").on("click", "#siderbar .sider-template li", function (e) {
                var t = e.target;
                if ($(t).hasClass("btn-sider-interest")) {
                    e.preventDefault();
                    var i = $(this);
                    $.post("/geek/tag/jobtagupdate.json", {
                        jobId: $(t).attr("data-jobid"),
                        tag: "4",
                        flag: "0"
                    }, function () {
                        i.slideUp(300, function () {
                            i.remove()
                        })
                    })
                }
            }), $("body").on("click", "#siderbar .btns-sider-interview ", function (t) {
                var i = $(this), n = i.closest("li").index(), s = i.closest(".oneday-wrap").attr("data-value"),
                    a = t.target;
                return $(a).hasClass("btn-submit") ? c.showInviteTip(function () {
                    c.interviewDefer(i.closest("li").attr("data-interviewId"), 1).then(function () {
                        i.closest("li").find(".interview-status").html("鍗冲皢闈㈣瘯").end().find(".btns-sider-interview").remove()
                    })
                }) : c.interviewDefer(i.closest("li").attr("data-interviewId"), 2).then(function () {
                    e.interviewData[s].splice(n, 1), i.closest("li").find(".interview-status").html("宸叉嫆缁�").end().slideUp(300, function () {
                        $(this).remove(), 0 == e.interviewData[s].length && $("." + s).remove()
                    })
                }), !1
            }), $("body").on("click", "#siderbar .sider-title a", function () {
                c.tabCheckall()
            })
        }
    }, l = $("#header"), d = $("#siderbar");
    if ($(window).scroll(function () {
        var e = $(window).scrollTop(), t = l.height() + $("#top-active-box").height(), i = t - e > 0 ? t - e : 0;
        d.css("top", i + "px"), e < 20 && d.css("top", i - 1 + "px")
    }), c.eventHander(), $(".promotion-main a").each(function () {
        if ($(this).attr("href").indexOf("admaster.com.cn") > -1) {
            (new Image).src = "https://v.admaster.com.cn/i/a131280,b3590554,c4789,i0,m202,8a1,8b2,0k10038,h"
        }
    }), $(".link-logout").on("click", function (e) {
        e.preventDefault(), $.ajax({
            type: "get",
            url: "/wapi/zppassport/user/logout",
            dataType: "json",
            success: function (e) {
                if (0 == e.code) {
                    var t = window.location.hostname;
                    t = t.substring(t.indexOf(".")), Cookie.del("t", t, "/"), Cookie.del("wt", t, "/"), e.zpData.toUrl ? window.location.href = e.zpData.toUrl : window.location.href = "/"
                } else $.toast({type: "error", content: "鏈嶅姟鍣ㄥ紓甯�"})
            },
            error: function () {
                $.toast({type: "error", content: "鏈嶅姟鍣ㄥ紓甯�"})
            }
        })
    }), window.resumeQueryBar = {
        getQueryBar: function () {
            var e = this;
            clearTimeout(this.timer), $.ajax({
                type: "get",
                url: "/wapi/zpgeek/resume/parser/querybar.json",
                dataType: "json",
                success: function (t) {
                    if (0 !== t.code || 1 !== t.zpData.showType || !t.zpData.parserId) return void (e.count && (e.count--, e.timer = setTimeout(function () {
                        e.getQueryBar()
                    }, 2e3)));
                    e.setBar(t.zpData)
                }
            })
        }, setBar: function (e) {
            var t = '<div class="header-resume-new"><a ka="to_resume_click_1" href="/web/geek/resumeAnalyze?parserId=' + e.parserId + '">绠€鍘嗘洿鏂版彁閱�<span class="new" style="display:block;">new</span><div class="header-resume-tip">闄勪欢[' + e.resumeName + ']宸茶В鏋愭垚鍔燂紝鍙墠寰€鏌ョ湅骞惰ˉ鍏呰嚦鍦ㄧ嚎绠€鍘�<span class="header-resume-btn">鍘绘煡鐪�</span></div></a></div>';
            if ($("#header .user-nav .header-resume-new").length) $("#header .user-nav .header-resume-new").replaceWith(t); else {
                $("#header .user-nav").prepend(t);
                try {
                    _T.sendEvent("to_resume_expose")
                } catch (e) {
                }
            }
        }, timer: null, count: 0, loop: function () {
            0 === this.count && (this.count = 2), this.getQueryBar()
        }
    }, resumeQueryBar.getQueryBar(), $.fn.hoverDelay = function (e) {
        var t, i, n = {
            hoverDuring: 200, outDuring: 200, hoverEvent: function () {
                $.noop()
            }, outEvent: function () {
                $.noop()
            }
        }, s = $.extend(n, e || {});
        return $(this).each(function () {
            $(this).hover(function () {
                clearTimeout(i), t = setTimeout(s.hoverEvent, s.hoverDuring)
            }, function () {
                clearTimeout(t), i = setTimeout(s.outEvent, s.outDuring)
            })
        })
    }, $(".city-page-btn.next").on("click", function () {
        $(".slider-city-li").animate({left: "-198px"}), $(".city-page-btn.next").hide(), $(".city-page-btn.prev").show()
    }), $(".city-page-btn.prev").on("click", function () {
        $(".slider-city-li").animate({left: "0px"}), $(".city-page-btn.next").show(), $(".city-page-btn.prev").hide()
    }), $(".home-box .slider-main").length && ($(".home-box .slider-main").hwSlider({
        autoPlay: !0,
        arrShow: !0,
        dotShow: !0,
        navShow: !0,
        touch: !0,
        height: 240,
        interval: 5e3,
        effect: "fade"
    }), $(".slider-box .pic-all").length)) {
        var p, u = $(".slider-box .pic-all a"), h = u.length, f = 0;
        u.hover(function () {
            clearTimeout(p), 300 != $(this).width() && $(this).stop(!0).animate({width: "300px"}, 500).siblings().stop(!0).animate({width: "98px"}, 500)
        }, function () {
            f = $(this).index(), t()
        }), t()
    }
    var m = function () {
        Attachment.showUploadWarningPretreatment({
            showCvEntry: !0,
            title: "",
            confirmText: "涓婁紶闄勪欢绠€鍘�",
            callbackUpload: function () {
                $.toast({type: "success", content: "涓婁紶鎴愬姛"})
            }
        })
    };
    $(".top-sign-box .btn-dialog-upload").on("click", m), $("#header .header-resume-upload").on("click", function () {
        "undefined" == typeof _PAGE || _PAGE.isGeekChat || m()
    });
    var g = "";
    if (function () {
        $.ajax({
            type: "GET",
            url: "/wapi/zpgeek/common/data/citysites.json",
            data: {},
            dataType: "json",
            success: function (e) {
                if (0 == e.code && e.zpData && e.zpData.length > 0) {
                    var t = "", i = "";
                    $.each(e.zpData, function (e, n) {
                        n.name + "绔�" === _PAGE.citySiteName ? t = n : i += '<li class="city-item"><a ka="city-sites-' + n.code + '" href="' + n.url + '">' + n.name + "绔�</a></li>"
                    });
                    var n = '<div class="title"><h4 class="title-content title-main">鍩庡競閫夋嫨</h4><div class="title-content title-sub">鍒囨崲鍩庡競鍒嗙珯锛屽鎵惧綋鍦板績浠伐浣�</div></div><div class="content"><div class="content-prompt"><p class="prompt-title">浜茬埍鐨勭敤鎴锋偍濂斤細</p><p class="prompt-desc">鍒囨崲鍩庡競鍒嗙珯锛岃鎴戜滑涓烘偍鎻愪緵鏇村噯纭殑淇℃伅</p></div><p class="cur-pos">褰撳墠瀹氫綅锛�</p><div class="cur-city"><i class="icon-poi"></i><span class="city-name"><a ka="city-sites-' + t.code + '" href="' + t.url + '">' + t.name + '绔�</a></span></div><div class="content-title">鐐瑰嚮杩斿洖 鈥�<span class="city-writing">鍏ㄥ浗绔�</span>鈥� 鎴栧垏鎹㈠埌浠ヤ笅鍩庡競</div><div class="city-wrapper"><ul class="city-list">' + i + '</ul></div><div class="content-footer">鍏朵粬鍒嗙珯寮€閫氫腑锛屾暚璇锋湡寰厏</div></div>';
                    g = n
                }
            }
        })
    }(), $("#header .nav-city .nav-city-box").on("click", i), $("#header .choose-city").on("click", i), $(".nav-city .dorpdown-city").on("click", "li", function () {
        var e = [], t = getQueryObject();
        t.city = $(this).attr("data-val"), $.each(t, function (t, i) {
            e.push(t + "=" + i)
        }), window.location.href = "/?" + e.join("&")
    }), $(".nav-city").find(".dorpdown-province").on("mouseover", "li", function () {
        var e = $(this).index(), t = ($(this).parent().find("li"), $(".nav-city").find(".dorpdown-city ul"));
        $(".nav-city .dorpdown-province .cur").removeClass("cur"), $(this).addClass("cur"), t.removeClass("show"), t.eq(e).addClass("show");
        var i = t.eq(e).find("li");
        i.length > 0 && t.eq(e).find("li.cur").length < 1 && i.eq(0).addClass("cur")
    }), $(".nav-city").find(".dorpdown-province").on("click", "li", function () {
        var e = $(this).index(), t = $(".nav-city").find(".dorpdown-city ul"), i = t.eq(e);
        i.find("li").length > 0 && i.find("li").eq(0).trigger("click")
    }), $(".semwrap .slider-main").length) {
        if ($(".semwrap .slider-main").hasClass("disabled")) return;
        $(".slider-main").hwSlider({
            autoPlay: !0,
            arrShow: !0,
            dotShow: !1,
            navShow: !0,
            touch: !0,
            interval: 5e3,
            width: 582,
            speed: 1e3,
            height: 426
        })
    }
    if ($(".manager-list .manager-inner").length && $(".manager-list li").length > 1 && ($(".manager-list h3").css("background", "none"), $(".manager-list .manager-inner").hwSlider({
        autoPlay: !0,
        arrShow: !1,
        dotShow: !0,
        interval: 5e3,
        speed: 500,
        width: 330,
        height: 163,
        navShow: !0,
        touch: !0,
        effect: "fade",
        fadeOut: !1,
        afterSlider: function () {
            $(".manager-list .fold-text").each(function () {
                $(this).height() > 106 ? $(this).find(".more-view").show() : $(this).find(".more-view").hide()
            })
        }
    })), $(".picture-list .slider-main").length && $(".picture-list li").length > 1 && $(".picture-list .slider-main").hwSlider({
        autoPlay: !0,
        arrShow: !0,
        dotShow: !0,
        interval: 5e3,
        speed: 500,
        width: 330,
        height: 165,
        navShow: !0,
        touch: !0
    }), $(".job-menu dl").each(function (e) {
        var t = $(this);
        t.hoverDelay({
            hoverDuring: 100, outDuring: 100, hoverEvent: function () {
                t.addClass("cur");
                var i = function (e) {
                    var i = (t.find(".menu-sub"), $(".job-menu").offset().top - t.offset().top - 3);
                    return Math.max(i, e)
                }, n = 0, s = 0, a = 0;
                if ($(".top-sign-box").length && (s = 130), $(".top-active-box").length && (a = 120), n = s + a, 0 != e || 10 == e && $(".ie7").length) {
                    var o = t.get(0).getBoundingClientRect().top - n, r = t.find(".menu-sub");
                    r.height() < o ? r.css({"margin-top": i(53 - r.height()) + "px"}) : o < 70 && o > 0 ? r.css({"margin-top": "-1px"}) : o < 0 ? r.css({"margin-top": i(o) + "px"}) : r.css({"margin-top": i(47 - o) + "px"})
                } else 0 != e && 1 != e || !$(".column-search-panel").length || t.find(".menu-sub").css({"margin-top": "-5px"})
            }, outEvent: function () {
                t.removeClass("cur").children(".menu-sub")
            }
        })
    }), $(".show-all").hover(function () {
        $(".show-all").hide(), $(".all-box").show()
    }, function () {
    }), $(".job-menu").hover(function () {
    }, function () {
        $(".show-all").show(), $(".all-box").hide()
    }), $(".menu-all .sub-tab li").eq(0).css({
        "border-top-color": "#fff",
        "padding-top": "15px",
        "padding-bottom": "14px"
    }), $(".menu-all .sub-tab li").eq(1).css({"margin-top": "-1px"}), $(".menu-all .sub-tab li").on("click", function () {
        var e = $(this).index(), t = $(this).parent().find("li"),
            i = $(this).closest(".menu-sub").find(".sub-content ul");
        t.removeClass("cur"), $(this).addClass("cur"), i.removeClass("show"), i.eq(e).addClass("show"), 0 == e && $(this).css("border-top-color", "#fff"), e == t.length - 1 ? $(this).css({
            "border-bottom-color": "#fff",
            "margin-top": "-1px",
            "padding-top": "1px"
        }) : t.eq(t.length - 1).css({"border-bottom-color": "#FDFDFE", "margin-top": "0", "padding-top": "0"})
    }), $(".company-detail-grab .promotion-job ul").length && $(".company-detail-grab .promotion-job li").length > 1 && ($(".company-detail-grab .promotion-job .option").on("click", "i", function () {
        var e = $(".company-detail-grab .promotion-job ul"), t = e.filter(".cur"), i = e.index(t), n = i;
        $(this).hasClass("prev") && (0 === i ? n = e.length - 1 : n -= 1, e.removeClass("cur left-out right-out"), t.addClass("left-out"), e.eq(n).addClass("cur")), $(this).hasClass("next") && (i === e.length - 1 ? n = 0 : n += 1, e.removeClass("cur left-out right-out"), t.addClass("right-out"), e.eq(n).addClass("cur"))
    }), $(".company-detail-grab .promotion-job ul").on("transitionEnd webkitTransitionEnd", function () {
        $(this).removeClass("left-out right-out")
    })), $(".link-recruit").on("click", function () {
        $(this).parent().find(".recruit-tip").fadeIn()
    }), $(".nav-figure").on("mouseover", function () {
        $(this).addClass("selected").find(".dropdown").show(), $(this).find(".recruit-tip").hide()
    }).on("mouseout", function () {
        $(this).removeClass("selected").find(".dropdown").hide(), $(this).find(".recruit-tip").hide()
    }), $(".condition-insdustry .btn-all").on("click", function () {
        $(this).parent().toggleClass("show-all-insdustry")
    }), $(".condition-city .link-district").on("click", function () {
        $(".condition-district").addClass("show-condition-district"), $(".condition-area").removeClass("show-condition-area"), $(".condition-city .selected").removeClass("selected"), $(this).addClass("selected")
    }), $(".condition-city .link-area").on("click", function () {
        $(".condition-area").addClass("show-condition-area"), $(".condition-district").removeClass("show-condition-district"), $(".condition-city .selected").removeClass("selected"), $(this).addClass("selected")
    }), $(".siderbar-back-top").on("click", function () {
        $("html,body").animate({scrollTop: "0px"}, 400)
    }), ($(".home-box").length || $(".condition-box").length) && ($(".job-list").on("click", "li", function (e) {
        var t = $(this), i = t.find(".info-primary a"), n = i.attr("href"), s = $(".job-tab"),
            a = s.attr("data-keyword"), o = s.attr("data-l3code"), r = s.attr("data-filter"),
            c = s.attr("data-rescount"), l = s.attr("data-page"), d = i.attr("data-index"), p = i.attr("data-lid"),
            u = i.attr("data-itemid"), h = s.attr("data-lid"), f = i.attr("data-jobid");
        if ("A" != e.target.nodeName && !$(e.target).closest("a").length && 0 === $(e.target).parents(".detail-top-right").length && !$(e.target).hasClass("btn-startchat") && 0 === $(e.target).parents(".btn-startchat").length) {
            t.wrap('<form action="' + n + '" method="get" target="_blank"></form>'), t.append('<input type="hidden" name="ka" value="' + i.attr("ka") + '_blank" />'), t.append('<input type="hidden" name="lid" value="' + p + '" />'), t.closest("form").submit();
            try {
                _T.sendEvent(i.attr("ka") + "_job")
            } catch (e) {
            }
            t.find('input[name="ka"]').remove(), t.find('input[name="lid"]').remove(), t.unwrap("form")
        }
        if ("A" == e.target.nodeName && e.target.href.indexOf("job_detail") > -1) {
            var m = e.target.getAttribute("href"), g = e.target.getAttribute("data-lid"),
                v = e.target.getAttribute("ka"), w = $(e.target);
            return w.wrap('<form action="' + m + '" method="get" target="_blank"></form>'), w.append('<input type="hidden" name="ka" value="' + v + '_blank" />'), w.append('<input type="hidden" name="lid" value="' + g + '" />'), w.closest("form").submit(), w.find('input[name="ka"]').remove(), w.find('input[name="lid"]').remove(), w.unwrap("form"), !1
        }
        var y = {
            keyword: a,
            l3code: o,
            filter: r,
            rescount: c,
            page: l,
            index: d,
            lid: p,
            itemid: u,
            source: h,
            jobid: f
        };
        "A" == e.target.nodeName && 0 != $(e.target).parents(".company-text").length && (y = {
            keyword: a,
            l3code: o,
            filter: r,
            rescount: c,
            page: l,
            index: d,
            lid: p,
            itemid: 0,
            source: h,
            jobid: f,
            brand_id: i.attr("brand-id")
        }), $.ajax({
            type: "POST",
            url: "/wapi/zpCommon/actionLog/search.json",
            data: y,
            dataType: "json",
            success: function (e) {
            }
        })
    }), $(".job-list").on("click", ".company-item", function (e) {
        var t = $(this), i = t.parents(".job-list").find("li").first().find(".info-primary a"),
            n = (i.attr("href"), $(".job-tab")), s = n.attr("data-keyword"), a = n.attr("data-l3code"),
            o = n.attr("data-filter"), r = n.attr("data-rescount"), c = n.attr("data-page"), l = i.attr("data-index"),
            d = i.attr("data-lid"), p = (i.attr("data-itemid"), n.attr("data-lid"));
        i.attr("data-jobid");
        $.ajax({
            type: "POST",
            url: "/wapi/zpCommon/actionLog/search.json",
            data: {keyword: s, l3code: a, filter: o, rescount: r, page: c, index: l, lid: d, itemid: 0, source: p},
            dataType: "json",
            success: function (e) {
            }
        })
    }), $(".job-list .company-item").find('a[href="/gongsi/c76ab226aa5051ec03By3dQ~.html"]').attr("href", "https://www.zhipin.com/activity/custom/booking/index.html"), $(".job-list .info-primary .job-title").each(function (e) {
        var t = $(this), i = t.parent().attr("data-jid"), n = t.parent().attr("data-lid"), s = "", a = !1;
        (i || n) && t.hoverDelay({
            hoverDuring: 400, outDuring: 500, hoverEvent: function () {
                var e = document.documentElement.clientHeight - t.get(0).getBoundingClientRect().top;
                if ("" === t.find(".info-detail").text()) $.ajax({
                    type: "GET",
                    url: "/wapi/zpgeek/view/job/card.json?jid=" + i + "&lid=" + n,
                    data: {},
                    dataType: "json",
                    success: function (n) {
                        var o = n.zpData.html;
                        t.parent().find(".info-detail").html(o);
                        var r = t.parent().find(".info-detail").height();
                        e < r + 18 && t.parent().find(".info-detail").css("top", -(r - e + 18) + "px"), t.parent().addClass("cur"), t.parent().find(".info-detail").hover(function () {
                            a = !0
                        }, function () {
                            t.parent().removeClass("cur"), a = !1
                        }), s = setTimeout(function () {
                            try {
                                _T.sendEvent("show_popjob_" + i)
                            } catch (e) {
                            }
                        }, 1e3)
                    }
                }); else {
                    var o = t.parent().find(".info-detail").height();
                    e < o + 18 && t.parent().find(".info-detail").css("top", -(o - e + 18) + "px"), t.parent().addClass("cur"), s = setTimeout(function () {
                        try {
                            _T.sendEvent("show_popjob_" + i)
                        } catch (e) {
                        }
                    }, 1e3)
                }
            }, outEvent: function () {
                a || (clearTimeout(s), t.parent().removeClass("cur"), t.parent().find(".info-detail").css("top", 0))
            }
        })
    })), $(".info-primary").on("click", ".link-like", function (e) {
        e.preventDefault(), Detail.setInterest($(this))
    }), $(".info-primary").on("click", ".btn-startchat", function (e) {
        e.preventDefault()
    }), $(".filter-select-box .dropdown-select").each(function (e) {
        var t = $(this);
        t.hover(function (e) {
            t.parent().addClass("cur")
        }, function () {
            t.parent().removeClass("cur")
        })
    }), $(".now-city-pos .dropdown-wrap").each(function (e) {
        var t = $(this);
        t.hoverDelay({
            hoverDuring: 100, outDuring: 100, hoverEvent: function () {
                t.addClass("cur")
            }, outEvent: function () {
                t.removeClass("cur")
            }
        })
    }), $(".column-search-panel").length && ($(window).scroll(function () {
        n()
    }), n()), $(".footer-scan").length) {
        $("#siderbar").css({bottom: "304px", transition: "all 0.2s"});
        var v = $("#footer"), w = $(".footer-scan"), y = $(".home-box .job-list"), b = $(window);
        y.css("margin-bottom", "105px"), s(), $(window).scroll(function () {
            s()
        }), w.find(".footer-scan-close").click(function () {
            w.fadeOut(300, function () {
                y.css({"margin-bottom": "15px", transition: "all 0.2s"}), $("#siderbar").css({
                    bottom: "214px",
                    transition: "all 0.2s"
                })
            })
        })
    }
    if ($(window).width() < 1348 && $(".footer-scan .btns").css("margin-right", "84px"), $(window).resize(function () {
        $(window).width() < 1348 ? $(".footer-scan .btns").css("margin-right", "84px") : $(".footer-scan .btns").css("margin-right", "0")
    }), setTimeout(function () {
        if (window._T) {
            var e = window.screen.width, t = window.screen.height, i = window.innerWidth, n = window.innerHeight;
            try {
                _T.sendTracking("screen_geek_" + e + "_" + t + "_avail_" + i + "_" + n), _T.sendEvent("screen_geek_" + e + "_" + t + "_avail_" + i + "_" + n)
            } catch (e) {
            }
        }
    }, 2e3), $("body").on("click", "#siderbar .siderbar-feedback", function () {
        Feedback.getContent()
    }), $("#footer").on("click", ".footer-feedback", function () {
        Feedback.getContent()
    }), $(".common-tab-box").on("click", "h3 span", function () {
        var e = $(this).index(), t = $(this).parents(".common-tab-box").first();
        if ($(this).parents("h3").first().find("span").removeClass("cur"), $(this).addClass("cur"), $(t).find("ul").removeClass("cur"), $(t).find("ul").eq(e).addClass("cur"), a($(t).find("ul").eq(e)), t.hasClass("job-tab-box")) {
            var i = t.find(".cur li").first();
            i.attr("data-url") && t.find(".common-tab-more a").attr("href", "/" + i.attr("data-url"))
        }
    }), a($(".common-tab-box ul.cur")), $(".job-menu-school dl").each(function (e) {
        var t = $(this);
        t.hoverDelay({
            hoverDuring: 100, outDuring: 100, hoverEvent: function () {
                t.siblings().removeClass("cur"), t.addClass("cur")
            }
        })
    }), $(".school-body").length, $(".school-banner .info-btn").each(function (e) {
        var t = $(this);
        t.hoverDelay({
            hoverDuring: 100, outDuring: 100, hoverEvent: function () {
                t.addClass("cur")
            }, outEvent: function () {
                t.removeClass("cur")
            }
        })
    }), $(".school-typebox").length && $(".school-typebox").on("click", "div", function () {
        if ($(this).hasClass("cur")) return !1
    }), $(".nav-school-new").length) {
        $("#header").append('<div class="school-nav-box"><a href="/xiaoyuan/"><div class="img-box xiaoyuan"></div></a><a href="/xiaoyuan/renshebu/"><div class="img-box renshebu"></div></a><a href="/xiaoyuan/yangshi/"><div class="img-box yangshi"></div></a></div>');
        var x = !1, C = !1, k = $("#header .school-nav-box");
        $(".nav-school-new").on("mouseenter", function (e) {
            ((x = !0) || C) && o()
        }), $(".nav-school-new").on("mouseleave", function (e) {
            x = !1, setTimeout(function () {
                x || C || r()
            }, 300)
        }), k.on("mouseenter", function (e) {
            C = !0
        }), k.on("mouseleave", function (e) {
            C = !1, r()
        }), $(".nav-school-new").on("click", function () {
            return !1
        })
    }
}), function () {
    function e(e) {
        var t = e.picUrl, i = e.resourceUrl,
            n = '<div id="top-active-box" class="top-active-box" style="height:0; overflow:hidden;background-image: url(' + t + '); background-color: #000;"><div class="active-close"></div><a class="banner-landing" target="_blank" href="' + i + '"></a></div>';
        $(".home-body #header").before(n);
        $(window).scrollTop();
        $("#top-active-box").animate({height: 120}, function () {
            window.scrollTo(0, 0)
        }), $("#top-active-box").length && $("#siderbar").animate({top: "169px"}), $(".active-close").on("click", function () {
            $(".top-active-box").remove(), $("#siderbar").css("top", "49px")
        })
    }

    $.ajax({
        type: "get", url: "/wapi/zpgeek/webtopbanner/query.json", success: function (t) {
            if (0 == t.code) {
                var i = t.zpData;
                i.picUrl && i.resourceUrl && e(i)
            }
        }
    })
}(), function () {
    if ("_PAGE" in window && _PAGE.ws && !isIE && -1 == window.location.href.indexOf("/web/geek/chat")) {
        var e = [], t = "https://static.weizhipin.com/zhipin-geek/dev";
        "pre-www.zhipin.com" == window.location.host ? t = "https://static.weizhipin.com/zhipin-geek/pre" : window.location.host.indexOf(".zhipin.com") > -1 && (t = "https://static.zhipin.com/v2"), e = "undefined" == typeof Paho ? ["/v2/web/geek/chat/mqtt.js", staticPath + "/web/geek/js/socket.js"] : [t + "/web/geek/js/socket.js"], seriesLoadScripts(e, function () {
            EventBus.subscribe("MESSAGE_STATISTIVS", function (e) {
                0 != e ? (e > 99 && (e = "99+"), $(".nav-chat-num").show().text(e)) : $(".nav-chat-num").hide().text("")
            })
        })
    }
}(), function () {
    function e() {
        if ("undefined" != typeof _ERROR_FOR_WECHAT && _ERROR_FOR_WECHAT && _ERROR_FOR_WECHAT.isWechat) UserCheck.checkPhone("/wapi/zppassport/login/phone", "/wapi/zppassport/send/smsCode", _ERROR_FOR_WECHAT.phone, _ERROR_FOR_WECHAT.regionCode, null, {
            closeLayer: !1,
            closeText: !1,
            isWxLogin: !0
        }); else if ("undefined" != typeof _ERROR_TYPE && _ERROR_TYPE && _ERROR_TYPE.resCode) {
            $(".page-sign").on("click", ".close", function () {
                window.location.href = jumpUrl
            }), $.dialog({
                title: "鐧诲綍澶辫触",
                content: _ERROR_TYPE.resMsg,
                confirmText: "鐭ラ亾浜�",
                cancelText: !1,
                wrapClass: "dialog-prop-default dialog-error-tip",
                lock: !0,
                closeLayer: !1,
                closeText: !1,
                onConfirm: function (e) {
                    window.location.href = jumpUrl
                }
            });
            try {
                _T.sendEvent("address_diff")
            } catch (e) {
            }
        } else window.location.href = jumpUrl
    }

    function t() {
        void 0 === UserCheck ? setTimeout(t, 500) : e()
    }

    if ($("body").hasClass("wechat-login-tip")) try {
        t()
    } catch (e) {
        window.location.href = jumpUrl
    }
}();
var Search = {
    init: function () {
        function e() {
            $(".city-dialog .city-wrapper").on("click", ".city-cur", function (e) {
                var t = $(e.target).text(), i = $(e.target).attr("data-val");
                return $(".search-box .city-sel .label-text b").text(t), $(".search-box .city-code").attr("value", i), $(".city-dialog.city-letter-show").hide(), !1
            })
        }

        function t() {
            $(".city-dialog .city-wrapper").on("click", ".city-cur", function (e) {
                var t = $(e.target).attr("data-val"), i = "/c" + t + "/?ka=sel-city-" + t;
                window.location.href = i, $(".city-dialog.city-letter-show").hide()
            })
        }

        function i() {
            $(".city-dialog .city-wrapper").on("click", ".city-cur", function (e) {
                var t = ($(e.target).text(), $(e.target).attr("data-val")), i = "/gongsi/_zzz_c" + t + "/";
                window.location.href = i, $(".city-dialog.city-letter-show").hide()
            })
        }

        Search.searchBox = $(".search-box"), Search.isLoading = !1, $(".bottom-banner .closeIcon").on("click", function () {
            $(this).parents(".bottom-banner").hide()
        }), Search.searchBox.find(".city-sel").on("click", function (t) {
            Search.renderCityDialogNew(e)
        }), Search.searchBox.find(".position-sel").on("click", function (e) {
            Search.searchBox.toggleClass("show-position")
        }), Search.searchBox.find(".industry-sel").on("click", function (e) {
            Search.searchBox.toggleClass("show-industry")
        }), Search.searchBox.find(".dorpdown-province").on("mouseover", "li", function () {
            var e = $(this).index(), t = $(this).parent().find("li"), i = Search.searchBox.find(".dorpdown-city ul");
            t.removeClass("cur"), $(this).addClass("cur"), i.removeClass("show"), i.eq(e).addClass("show");
            var n = i.eq(e).find("li");
            n.length > 0 && i.eq(e).find("li.cur").length < 1 && n.eq(0).addClass("cur")
        }), Search.searchBox.find(".dorpdown-province").on("click", "li", function () {
            var e = $(this).index(), t = Search.searchBox.find(".dorpdown-city ul"), i = t.eq(e);
            i.find("li").length > 0 && i.find("li").eq(0).trigger("click")
        }), Search.searchBox.find(".dorpdown-city").on("click", "li", function () {
            var e = Search.searchBox.find(".city-sel").find(".label-text b"), t = Search.searchBox.find(".city-code"),
                i = Search.searchBox.find(".city-name");
            e.text($(this).text()), t.val($(this).attr("data-val")), i.val($(this).text()), Search.searchBox.find(".dorpdown-city ul .cur").removeClass("cur"), $(this).addClass("cur")
        }), Search.searchBox.length && (Search.loadIndustryData(Search.renderIndustry), Search.loadCityData(Search.renderCity)), Search.searchBox.find(".dropdown-menu").each(function () {
            function e(e) {
                a.length && (3 == a.attr("data-level") && a.html('<ul class="tree-1"></ul><ul class="tree-2"></ul><ul class="tree-3"></ul>'), 2 == a.attr("data-level") && a.html('<ul class="tree-1"></ul><ul class="tree-2"></ul>'), Search.getTreeData(a, e)), o.length && Resume.getTag(formEl, !0), t.on("mouseenter", "li", function () {
                    if ($(this).closest(".select-tree").length) {
                        var t = $(this).closest(".select-tree").attr("data-level");
                        if ($(this).parent().find("li").removeClass("selected"), $(this).addClass("selected"), 3 == t) {
                            if ($(this).closest(".tree-1").length) return $(this).closest(".select-tree").find(".tree-3").hide(), Search.getTreeData(a, e, $(this).attr("data-id")), !1;
                            if ($(this).closest(".tree-2").length) return $(this).closest(".select-tree").find(".tree-3").show(), s.attr("level2", $(this).attr("data-id")), Search.getTreeData(a, e, $(this).closest(".select-tree").find(".tree-1 .selected").attr("data-id"), $(this).attr("data-id")), !1
                        }
                        if (2 == t) {
                            if ($(this).closest(".tree-1").length) return $(this).closest(".select-tree").find(".tree-3").hide(), Search.getTreeData(a, e, $(this).attr("data-id")), !1;
                            if ($(this).closest(".tree-2").length) return $(this).closest(".select-tree").find(".tree-3").show(), s.attr("level2", $(this).attr("data-id")), Search.getTreeData(a, e, $(this).closest(".select-tree").find(".tree-1 .selected").attr("data-id"), $(this).attr("data-id")), !1
                        }
                    }
                }), t.on("click", "li", function () {
                    var e = $(this).closest(".select-tree").attr("data-level");
                    if (3 != e || $(this).closest(".tree-1").length || $(this).closest(".tree-2").length) {
                        if (3 != e || !$(this).closest(".tree-1").length) return !1;
                        0 == $(this).attr("data-id") && (n.text("鑱屼綅绫诲瀷"), s.val($(this).attr("")), Search.searchBox.removeClass("show-position"))
                    } else n.text($(this).text()), s.val($(this).attr("data-val")), Search.searchBox.removeClass("show-position")
                })
            }

            var t = $(this), i = Search.searchBox.find(".position-sel"), n = i.find(".label-text b"),
                s = Search.searchBox.find(".position-code"), a = t.find(".select-tree"), o = t.find(".tags-cells");
            Search.loadPositionData(e)
        }), Search.searchBox.find("form").on("submit", function (e) {
            var t = $(this), i = t.find(".ipt-search"), n = i.val().replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
            if ("鎼滅储鑱屼綅銆佸叕鍙�" == n && i.val(""), "" != n && window.localStorage) {
                var s = Storage.get("_Search_History");
                if (s) if (-1 === s.indexOf(n)) s.unshift(n), Storage.set("_Search_History", s); else {
                    var a = [];
                    $(s).each(function (e, t) {
                        e >= 3 || t != n && a.push(t)
                    }), a.unshift(n), Storage.set("_Search_History", a)
                } else Storage.set("_Search_History", [n])
            }
        }), $(document).on("click", function (e) {
            $(e.target).closest(".city-sel").length || $(e.target).closest(".dorpdown-province").length || (Search.searchBox.removeClass("show-city"), $("#header .nav-city").length && !$(e.target).closest(".nav-city-box").length && $("#header .nav-city").removeClass("show-city")), $(e.target).closest(".position-sel").length || $(e.target).closest(".position-box").length || Search.searchBox.removeClass("show-position"), $(e.target).closest(".industry-sel").length || Search.searchBox.removeClass("show-industry"), $(e.target).closest(".suggest-result").length || $(e.target).closest(".ipt-search").length || Search.searchBox.find(".suggest-result").hide()
        }), Search.searchBox.find(".industry-box").on("click", " li a", function (e) {
            return "涓嶉檺" == $(this).text() ? Search.searchBox.find(".industry-sel").find(".label-text b").text("琛屼笟涓嶉檺") : Search.searchBox.find(".industry-sel").find(".label-text b").text($(this).text()), Search.searchBox.find(".industry-code").val($(this).parent().attr("data-val")), Search.searchBox.find(".industry-box ul .cur").removeClass("cur"), $(this).parent().addClass("cur"), e.preventDefault(), Search.searchBox.toggleClass("show-industry"), !1
        }), Search.searchBox.find(".ipt-search").on("paste keyup", function (e) {
            if (13 != e.which && 27 != e.which && 38 != e.which && 40 != e.which) {
                Search.suggestTimer && clearTimeout(Search.suggestTimer);
                var t = $(this);
                Search.suggestTimer = setTimeout(function () {
                    Search.suggest(t)
                }, 200)
            }
        }), $(".geek-inside").length || Search.fillHistory(), Search.searchBox.find(".ipt-search").on("focus", function (e) {
            if (!$(".geek-inside").length) {
                var t = $(this).closest(".search-box");
                Search.fillHistory(), t.find(".suggest-result li").length && t.find(".suggest-result").show()
            }
        }), Search.searchBox.find(".ipt-search").focus(function () {
            $(this).closest("form").addClass("search-form-shadow"), $(this).closest(".ipt-wrap").addClass("ipt-wrap-hover"), $(this).closest("form").find(".city-sel").addClass("city-sel-hover"), $(this).closest("form").find(".industry-sel").addClass("industry-sel-hover"), $(this).closest("form").find(".position-sel").addClass("position-sel-hover")
        }), Search.searchBox.find(".ipt-search").blur(function () {
            $(this).closest("form").removeClass("search-form-shadow"), $(this).closest(".ipt-wrap").removeClass("ipt-wrap-hover"), $(this).closest("form").find(".city-sel").removeClass("city-sel-hover"), $(this).closest("form").find(".industry-sel").removeClass("industry-sel-hover"), $(this).closest("form").find(".position-sel").removeClass("position-sel-hover")
        }), Search.searchBox.find(".suggest-result").on("click", "li", function () {
            Search.addInput($(this))
        });
        var n = -1;
        if (Search.searchBox.find(".ipt-search").keydown(function (e) {
            var t = Search.searchBox.find(".suggest-result li");
            switch (e.which) {
                case 38:
                    t.removeClass("selected"), -1 == n ? (n = -1, n = t.length - 1) : n--, t.eq(n).addClass("selected"), Search.addInput(t.eq(n), !0), Search.scrollVisiable(t.eq(n), "up");
                    break;
                case 40:
                    e.preventDefault(), t.removeClass("selected"), n > t.length - 2 && (n = -1), n++, t.eq(n).addClass("selected"), Search.addInput(t.eq(n), !0), Search.scrollVisiable(t.eq(n), "down");
                    break;
                case 13:
                    n = -1;
                    break;
                case 27:
                    n = -1, Search.searchBox.find(".ipt-search").val("")
            }
        }), Search.searchBox.length && 0 == $(".company-detail-grab").length && $(".job-list .company-card a").on("click", function () {
            var e = $(this), t = e.closest(".job-list");
            $.ajax({
                type: "POST",
                url: "/wapi/zpCommon/actionLog/search.json",
                dataType: "JSON",
                data: {
                    keyword: t.attr("data-keyword"),
                    l3code: t.attr("data-l3code"),
                    filter: t.attr("data-filter"),
                    rescount: t.attr("data-rescount"),
                    page: t.attr("data-page"),
                    index: e.attr("data-index"),
                    lid: e.attr("data-lid"),
                    itemid: e.attr("data-itemid"),
                    jobid: e.attr("data-jobid"),
                    source: t.attr("data-source")
                }
            })
        }), $(".company-card").on("click", function (e) {
            $(e.target).hasClass("btn") || ($(e.target).closest(".company-card").find(".btn").eq(0).click(), window.location.href = $(this).find(".btn").eq(0).attr("href"))
        }), $(".condition-box .btn-allcity").on("click", function () {
            Search.renderCityDialogNew(t)
        }), Search.loadSubscribeModule(), $(".company-search").length) {
            var s = ($(".select-city-wrapper").html(), $(".filter-box .expect").offset().top), a = $(".top-filter-bar");
            $(".filter-condition a").on("click", function () {
                $(this).toggleClass("selected")
            }), $(".dropdown-wrap").on("mouseenter", function () {
                $(this).addClass("dropdown-menu-open")
            }).on("mouseleave", function () {
                $(this).removeClass("dropdown-menu-open")
            }).on("click", function () {
                $(this).toggleClass("dropdown-menu-open")
            }), $(".all-city").on("click", function () {
                Search.renderCityDialogNew(i)
            }), $(window).scrollTop() > s && a.addClass("show"), $(window).on("scroll", function () {
                $(this).scrollTop() > s ? a.addClass("show") : a.removeClass("show")
            }), $(".expect-filter").on("click", function (e) {
                _PAGE.uid || (Detail.showSign(1011), e.preventDefault())
            })
        }
    }, loadSubscribeModule: function () {
        if ($(".subscribe-wechat-wrapper").length) {
            var e = $(".subscribe-wechat-wrapper");
            if (window.localStorage) {
                var t = Storage.get("wechat_subscribe_job");
                if (t) {
                    ((new Date).getTime() - t) / 36e5 < 24 || Search.showSubScribeModule(e)
                } else Search.showSubScribeModule(e)
            } else Search.showSubScribeModule(e), e.find(".close").attr("title", "");
            e.find(".close").on("click", function () {
                e.fadeOut("fast"), window.localStorage && Storage.set("wechat_subscribe_job", (new Date).getTime())
            })
        }
    }, showSubScribeModule: function (e) {
        $.ajax({
            url: "/wapi/zpgeek/job/subscribe.json",
            type: "GET",
            data: {
                sceneStr: e.find("input[name=sceneStr]").val(),
                filter: decodeURI(e.find("input[name=filter]").val())
            },
            dataType: "json",
            success: function (t) {
                if (0 == t.code) {
                    e = e || $(".subscribe-wechat-wrapper"), e.find("img").attr("src", t.zpData.qrUrl), e.fadeIn("fast");
                    try {
                        _T.sendEvent("subscription_pop")
                    } catch (e) {
                    }
                }
            },
            error: function () {
            }
        })
    }, fillHistory: function () {
        try {
            if (window.localStorage) {
                var e = Storage.get("_Search_History");
                $(".suggest-result ul").empty(), $(e).each(function (e, t) {
                    e >= 3 || $(".suggest-result ul").append("<li>" + t + "</li>")
                })
            }
        } catch (e) {
        }
    }, loadIndustryData: function (e) {
        $.ajax({
            type: "GET",
            url: "/wapi/zpCommon/data/oldindustry.json",
            data: {},
            dataType: "json",
            success: function (t) {
                e(t.zpData)
            }
        })
    }, renderIndustry: function (e) {
        var t = $(".industry-box").find("ul");
        t.empty(), t.append('<li data-val=""><a href="javascript:;">涓嶉檺</a></li>'), $(e).each(function (e, i) {
            t.append('<li data-val="' + i.code + '" ka="sel-industry-' + (e + 1) + '"><a href="javascript:;">' + i.name + "</a></li>")
        })
    }, loadCityData: function (e) {
        $.ajax({
            type: "GET", url: "/wapi/zpCommon/data/city.json", data: {}, dataType: "json", success: function (t) {
                e(t.zpData), Search.cityData = t.zpData
            }
        })
    }, renderCity: function (e) {
        if (!$(".dorpdown-province").parents(".geek-inside").length) {
            $(".dorpdown-province").empty(), $(".dorpdown-city").empty();
            var t = e.hotCityList, i = e.cityList;
            $(".dorpdown-province").append('<li class="">鐑棬</li>');
            var n = $("<ul></ul>");
            $(t).each(function (e, t) {
                $(n).append('<li ka="hot-city-' + t.code + '" data-val="' + t.code + '" class="cur">' + t.name + "</li>")
            }), $(".dorpdown-city").append(n), $(i).each(function (e, t) {
                $(".dorpdown-province").append('<li ka="sel-province-' + (e + 1) + '" class="">' + t.name + "</li>");
                var i = $("<ul></ul>"), n = t.subLevelModelList;
                $(n).each(function (e, t) {
                    $(i).append('<li ka="hot-city-' + t.code + '" data-val="' + t.code + '" class="cur">' + t.name + "</li>")
                }), $(".dorpdown-city").append(i)
            })
        }
    }, loadPositionData: function (e) {
        $.ajax({
            type: "GET",
            url: "/wapi/zpCommon/data/position.json",
            data: {},
            dataType: "json",
            success: function (t) {
                "function" == typeof ajaxGetaway && ajaxGetaway(t.code), e(t.zpData)
            }
        })
    }, getTreeData: function (e, t, i, n) {
        var s, a, o, r = "", c = "", l = "";
        for (s = 0; s < t.length; s++) {
            var d = t[s].subLevelModelList;
            if (r += '<li data-id="' + t[s].code + '">' + t[s].name + "</li>", d && i && t[s].code == i) for (a = 0; a < d.length; a++) {
                var p = d[a].subLevelModelList;
                if (c += '<li data-id="' + d[a].code + '">' + d[a].name + "</li>", p && n && d[a].code == n) for (o = 0; o < p.length; o++) l += '<li data-val="' + p[o].code + '">' + p[o].name + "</li>"
            }
        }
        i || (e.find(".tree-1").html('<li data-id="0" class="">涓嶉檺</li>' + r), e.find(".tree-2").html('<li class="blank">閫夋嫨鑱岀被</li>')), n ? e.find(".tree-3").html(l) : i && e.find(".tree-2").html(c)
    }, suggest: function (e) {
        var e = e, t = e.val().replace(/(^\s*)|(\s*$)/g, ""), i = e.closest(".search-box").find(".suggest-result"),
            n = i.find("ul");
        if ("" == t) return void i.hide();
        $.ajax({
            type: "GET",
            url: "/wapi/zpgeek/autocomplete/query.json",
            dataType: "JSON",
            cache: !1,
            data: {query: t},
            success: function (e) {
                var t, s, e = e, a = "";
                if (e.zpData && e.zpData.data && e.zpData.data.length) {
                    for (t = e.zpData.data, s = 0; s < t.length; s++) a += "<li>" + t[s].hlname + "</li>";
                    n.html(a), i.show()
                } else n.html('<li class="blank-data">鏆傛棤鍖归厤缁撴灉</li>');
                Search.isLoading = !1
            },
            error: function (e) {
                Search.isLoading = !1
            }
        })
    }, hightLight: function (e, t) {
        var t = t.replace(/(^\s*)|(\s*$)/g, "");
        if ("" == t) return e;
        var i = t;
        return e.replace(t.toLowerCase(), '<em class="text-blue">' + i + "</em>").replace(t.toUpperCase(), '<em class="text-blue">' + i + "</em>")
    },
    addInput: function (e, t) {
        var e = e, i = e.text().replace('<u class="h">', "").replace("</u>", "");
        Search.searchBox.find(".ipt-search").val(i), t || (Search.searchBox.find(".suggest-result").hide(), Search.searchBox.find("form").submit())
    }, scrollVisiable: function (e, t) {
        var e = e, i = Search.searchBox.find(".suggest-result ul");
        if (!e) return !1;
        var n = i.find("li").length, s = $(e).index(), a = s > 4 ? s - 4 : 0, o = "down" == t && (a < n - 4 || 0 === s),
            r = "up" == t && (s < n - 5 || s == n - 1);
        "up" == t && (a = s), (r || o) && i.scrollTop(a * $(e).height())
    }, renderCityDialog: function () {
        var e = [];
        Search.cityData.cityList.forEach(function (t, i) {
            -1 === ["鍖椾含", "涓婃捣", "澶╂触", "閲嶅簡"].indexOf(t.name) && e.push(t)
        }), e.unshift({name: "鐑棬鍩庡競", subLevelModelList: Search.cityData.hotCityList});
        var t = e.map(function (e, t) {
                return 0 == t ? "<li>" + e.name + "</li>" : '<li ka="sel-province-' + t + '">' + e.name + "</li>"
            }).join(""),
            i = '<h4>璇烽€夋嫨鍩庡競</h4><div class="city-wrapper"><ul class="section-province">' + t + '</ul><ul class="section-city"></ul>';
        $.dialog({
            content: i,
            title: "",
            closeText: !0,
            cancelText: "",
            confirmText: "",
            wrapClass: "city-dialog",
            onOpen: function (t) {
                var i = t.find(".section-province li");
                i.on("click", function () {
                    i.removeClass("active"), $(this).addClass("active");
                    var n = e[$(this).index()].subLevelModelList.map(function (e, t) {
                        return '<li><a href="/c' + e.code + '/" ka="sel-city-' + e.code + '">' + e.name + "</a></li>"
                    }).join("");
                    t.find(".section-city").html(n)
                }), i.first().click()
            },
            onConfirm: function (e) {
            }
        })
    }, renderCityDialogNew: function (e) {
        $.ajax({type: "GET", url: "/wapi/zpCommon/data/cityGroup.json", dataType: "JSON"}).success(function (t) {
            if (0 == t.code) {
                var i = [], n = t.zpData.cityGroup;
                i.unshift({name: "鐑棬鍩庡競", subLevelModelList: t.zpData.hotCityList});
                var s = {ABCDE: [], FGHJ: [], KLMN: [], PQRST: [], WXYZ: []};
                n.forEach(function (e, t) {
                    /[ABCDE]/g.test(e.firstChar) && s.ABCDE.push(e), /[FGHJ]/g.test(e.firstChar) && s.FGHJ.push(e), /[KLMN]/g.test(e.firstChar) && s.KLMN.push(e), /[PQRST]/g.test(e.firstChar) && s.PQRST.push(e), /[WXYZ]/g.test(e.firstChar) && s.WXYZ.push(e)
                });
                for (var a in s) i.push({name: a, subLevelModelList: s[a]});
                var o = i.map(function (e, t) {
                        return 0 == t ? "<li>" + e.name + "</li>" : '<li ka="sel-province-' + t + '">' + e.name + "</li>"
                    }).join(""),
                    r = '<h4>璇烽€夋嫨鍩庡競</h4><div class="city-wrapper"><ul class="section-province">' + o + '</ul><ul class="section-city"><div class="city-title"></div><ul class="city-main"></ul></ul>';
                $.dialog({
                    content: r,
                    title: "",
                    closeText: !0,
                    cancelText: "",
                    confirmText: "",
                    wrapClass: "city-dialog city-letter-show",
                    onOpen: function (e) {
                        var t = e.find(".section-province li");
                        t.on("click", function () {
                            if (e.find(".section-city").scrollTop(0), t.removeClass("active"), $(this).addClass("active"), "鐑棬鍩庡競" == i[$(this).index()].name) {
                                var n = i[$(this).index()].subLevelModelList.map(function (e, t) {
                                    return '<li class="hot-city"><span class="city-cur"  data-val="' + e.code + '" >' + e.name + "</span></li>"
                                }).join("");
                                e.find(".section-city").html(n)
                            } else {
                                var n = "";
                                i[$(this).index()].subLevelModelList.map(function (e, t) {
                                    var i = '<li class="classify-city"><div class="city-title">' + e.firstChar + '</div><ul class="city-main">';
                                    e.cityList.forEach(function (e, t) {
                                        i += '<li> <span class="city-cur" data-val="' + e.code + '" >' + e.name + "</span></li>"
                                    }), i += "</ul></li>", n += i
                                }), e.find(".section-city").html(n)
                            }
                        }), t.first().click()
                    },
                    onConfirm: function (e) {
                    }
                }), e && e()
            }
        }).error(function (e) {
        })
    }
};
$(function () {
    Search.init()
});
var Filter = {
    init: function () {
        Filter.filterBox = $(".filter-select-box"), Filter.filterBox.on("click", "ul li", function () {
            var e = $(this).find(".sub-list");
            e.hasClass("show-sub") ? e.removeClass("show-sub") : (Filter.filterBox.find(".show-sub").removeClass("show-sub"), e.addClass("show-sub"))
        }), $(document).on("click", function (e) {
            $(e.target).closest(".filter-select-box").length || Filter.filterBox.find(".show-sub").removeClass("show-sub")
        }), $(window).on("scroll", function () {
            $(this).scrollTop() > 300 ? $("#filter-box").length && ($("#filter-box").addClass("show-top"), $(".job-box").addClass("show-top")) : ($("#filter-box").removeClass("show-top"), $(".job-box").removeClass("show-top"))
        })
    }
};
$(function () {
    Filter.init()
});
var PositionHistory = {
    init: function () {
        if ($(".job-box .sider-list").length && window.localStorage) {
            var e = Storage.get("_Job_History");
            e && PositionHistory.renderList(e)
        }
    }, renderList: function (e) {
        if ($(".job-box").find(".nomargin").html(this.showPersonalityText()), 0 !== e.length) {
            var t = $(".job-box .sider-list").first();
            $(e).each(function (e, i) {
                e > 4 || $("ul", t).append('<li>\n    <a href="/job_detail/' + i.job_id + '.html" ka="viewed_list_' + (e + 1) + '">\n        <h4>' + i.job_name + ' <span class="salary">' + i.job_salary + "</span></h4>\n        <p>" + i.company + "</p>\n    </a>\n</li>")
            }), $(t).show()
        }
    }, showPersonalityText: function () {
        return testHtml = '<ul class="resume-refresh"> <li class="refresh-test"><h4>浜旂淮鑱屼笟鎬ф牸娴嬭瘎</h4><i class="refresh-test-img"></i><p>涓撲笟鍒嗘瀽鑱屽満浼樺娍</p><a class="btn refresh-btn" target="_blank" href="/activity/personality/index.html?ka=rcmd-list-personality">绔嬪嵆娴嬭瘯</a></li></ul>', testHtml
    }
};
$(function () {
    PositionHistory.init()
});
var Detail = {
    init: function (wrap) {
        function showBanner() {
            $(this).scrollTop() >= $(".job-box").offset().top ? isSliding || (isSliding = !0, smallBanner.slideDown(300, function () {
                isSliding = !1
            })) : smallBanner.hide()
        }

        function setPopjobTop(e, t, i) {
            var n = e.find(".info-detail"),
                s = document.documentElement.clientHeight - t.get(0).getBoundingClientRect().top, a = n.height();
            s < a + 18 && n.css("top", -(a - s + 18) + "px"), e.addClass("cur"), hoverTimer = setTimeout(function () {
                try {
                    _T.sendEvent("show_popjob_" + i)
                } catch (e) {
                }
            }, 1e3)
        }

        function switchExpandVisibility() {
            var e = $(".links-content.cur");
            e.length > 0 && (e.height() > 145 ? $(".links-box .expand-btn").css("display", "block") : $(".links-box .expand-btn").css("display", "none"))
        }

        Detail.firstIn = !0, $(".links").css("height", "70px"), $(".links label").each(function () {
            var e = $(this).closest(".links"), t = !1, i = e.hasClass("links-friends");
            $(this).click(function () {
                t ? (i ? e.css("height", "30px") : e.css("height", "70px"), t = !1, $(this).html('<span>灞曞紑</span><i class="fz fz-slidedown"></i>')) : (e.css("height", "auto"), t = !0, $(this).html('<span>鏀惰捣</span><i class="fz fz-slideup"></i>'))
            })
        }), $(".links-friends").css("height", "27px");
        var linkLabel = $(".links-friends label"), linkWid = 0, linkConWid = $(".links-friends dd").width();
        $(".links-friends a").each(function () {
            linkWid += $(this).width() + 26
        }), linkWid > linkConWid ? linkLabel.show() : linkLabel.hide(), $(".business-detail").css("height", "46px"), $(".business-detail label").on("click", function () {
            var e = $(this).closest(".business-detail");
            e.toggleClass("show-business-all"), e.hasClass("show-business-all") ? ($(this).find("span").text("鏀惰捣"), $(this).find(".fz").removeClass("fz-slidedown").addClass("fz-slideup")) : ($(this).find("span").text("灞曞紑"), $(this).find(".fz").removeClass("fz-slideup").addClass("fz-slidedown"))
        }), $(".btn-signup").on("click", function () {
            $(this).parents(".bottom-banner").length ? Detail.showSign(5) : Detail.showSign(1)
        }), $(".fold-text .more-view").each(function () {
            var e = $(this).closest(".job-sec"), t = $(this).closest(".fold-text");
            if (e && 0 != e.length) {
                e.height(e.height()).css("overflow", "hidden");
                var i = t.height();
                t.css({
                    maxHeight: "none",
                    overflow: "visible"
                }), i + 10 > t.height() && $(this).remove(), e.removeAttr("style"), t.removeAttr("style")
            }
        }), $(".fold-text .more-view").on("click", function () {
            $(this).find(".fz-slidedown").length ? ($(this).parent().css({
                "max-height": "none",
                overflow: "visible"
            }), $(this).css("bottom", "-20px"), $(this).html('鏀惰捣<i class="fz fz-slideup"></i></a>').show()) : ($(this).parent().removeAttr("style"), $(this).removeAttr("style"), $(this).html('...灞曞紑<i class="fz fz-slidedown"></i></a>').show())
        });
        var tagContainer = $(".tag-container"), containerWidth = tagContainer.width();
        if (tagContainer.each(function (e, t) {
            var i = 0;
            $(this).find(".job-tags").not(".tag-all").find("span").each(function (e, t) {
                if (i += $(this).outerWidth() + 10, containerWidth < i) return tagContainer.find(".tag-more").show().css({
                    opacity: 1,
                    left: i - $(this).outerWidth() - 10 + "px"
                }), !1
            })
        }), $(".company-card").on("click", function (e) {
            $(e.target).hasClass("btn") || (window.location.href = $(this).find(".btn").eq(0).attr("href"))
        }), $(".detail-content .job-sec .fold-text").text().length > 175 && $(".detail-content .job-sec .more-view").show(), $(".manager-list .fold-text").each(function () {
            $(this).height() > 106 ? $(this).find(".more-view").show() : $(this).find(".more-view").hide()
        }), $(".company-info").length && $(".company-info .text").text().length < 250 && $(".company-info .look-all span").remove(), $(".job-op .btn-container, .smallbanner .btns").on("click", ".btn", function (e) {
            var t = $(this);
            if (t.hasClass("btn-outline")) {
                if ($(".detail-grab").length || $(".company-detail-grab").length && !t.hasClass("btn-disabled")) Detail.startChat(t); else {
                    if (t.hasClass("btn-loading") || t.hasClass("btn-disabled")) return;
                    Attachment.getAttachmentList(function (e) {
                        var i = {};
                        if (0 == e.code && e.zpData && (i = e.zpData), 0 == e.code) if (i = e.zpData, i.resumeCount > 1) Attachment.showResumeSelecter(i, {
                            callbackConfirm: function (e) {
                                Detail.deliveResume(t, "", e)
                            }
                        }); else if (0 == i.resumeCount) Attachment.showUploadWarning({
                            title: "璇锋偍涓婁紶闄勪欢绠€鍘嗭紝鍗冲彲瀹屾垚鎶曢€�",
                            confirmText: "绔嬪嵆涓婁紶",
                            cancelText: "鍙栨秷",
                            callbackUpload: function () {
                                t.click()
                            }
                        }); else {
                            var n = i.resumeList[0] ? i.resumeList[0].resumeId : "";
                            Detail.deliveResume(t, "", n)
                        } else 7 != e.code && 1011 != e.code || Detail.showSign(1011)
                    })
                }
                e.preventDefault()
            } else t.hasClass("btn-startchat") && ("绔嬪嵆娌熼€�" == t.text() ? (e.preventDefault(), Detail.startChat(t)) : Detail.startChat(t))
        }), $(".link-like").on("click", function () {
            "鎰熷叴瓒�" == $(this).text() ? Detail.dialogInterest($(this)) : Detail.setInterest($(this))
        }), $(".link-wechat-share").on("click", function (e) {
            if ("A" != e.target.nodeName) return !1;
            var t = $(this),
                i = $('<div id="wechat-qrcode-wrap">\n    <div class="arrow">\n        <span class="arrow-shadow"></span>\n        <span class="arrow-noumenon"></span>\n    </div>\n    <div class="qrcode">\n        <div class="qrcode-inner">\n           <img class="qrcode-img" src="" alt=""/>\n           <img class="brand-logo" src="" alt=""/>\n        </div>\n    </div>\n</div>');
            i.find(".qrcode-inner").hide(), i.appendTo(t).show(), $("<div id='wechat-qrcode-layer'></div>").appendTo(t.closest("body")), $("#wechat-qrcode-layer:not(#wechat-qrcode-wrap)").on("click", function (e) {
                $("#wechat-qrcode-wrap").remove(), $("#wechat-qrcode-layer").off("click").remove(), e.stopPropagation(), e.preventDefault()
            }), $.ajax({url: t.data("url"), type: "GET", dataType: "JSON"}).success(function (e) {
                if (1 == e.rescode) {
                    i.find(".qrcode-img").attr("src", e.qrUrl);
                    var n = "https://img.bosszhipin.com/beijin/mcs/banner/20180813/4b1a485efe4a8c3cad3e25f33b0118fc81bc5d36f26f00574e0187ae0298df1a.jpg?x-oss-process=image/resize,l_69,image/circle,r_69/format,png";
                    _jobInfo && _jobInfo.brand_logo && "" != _jobInfo.brand_logo && (n = _jobInfo.brand_logo + "?x-oss-process=image/resize,l_69,image/circle,r_69/format,png"), i.find(".brand-logo").attr("src", n), i.find(".qrcode-inner").show(), _T.sendEvent("mini_share_" + t.data("url").substring(t.data("url").indexOf("jobId=") + 6))
                } else $("#wechat-qrcode-wrap").remove(), $("#wechat-qrcode-layer").off("click").remove(), $.toast({
                    type: "error",
                    content: e.resmsg
                })
            }).error(function () {
                $("#wechat-qrcode-wrap").remove(), $("#wechat-qrcode-layer").off("click").remove(), $.toast({
                    type: "error",
                    content: "鑾峰彇鍒嗕韩鐮佸け璐�"
                })
            })
        }), this.companyDetail(), this.detailMap(), $(".detail-hasmore .detail-hasmore-layer .detail-hasmore-btn").on("click", function () {
            $(this).closest(".detail-hasmore").removeClass("detail-hasmore")
        }), $(".location-item").on("click", function () {
            $(this).parent().find(".location-item").removeClass("show-map"), $(this).addClass("show-map")
        }), $(".chat-history .btn-accept").on("click", function () {
            Detail.checkAcceptInvite($(this))
        }), $(".chat-history .btn-refuse").on("click", function () {
            Detail.refuseInvite($(this))
        }), $(".chat-history .btn-like").on("click", function () {
            Detail.setInterest($(this))
        }), $(".chat-history .btn-startchat").on("click", function () {
            Detail.startChat($(this))
        }), $(".job-list").on("click", ".btn-startchat", function () {
            var e = $(this).data("url").split("?")[1].split("&")[0].split("=")[1];
            Detail.startChat($(this), "", function (t) {
                _T.sendEvent((1011 == t.code ? "hoverjob_greet_tosign_" : "hoverjob_greet_") + e)
            }, function () {
                _T.sendEvent("hoverjob_greet_" + e)
            })
        }), $(".attachment-resume-upload").on("click", function () {
            Attachment.showUploadWarningPretreatment({showCvEntry: !0, title: "", confirmText: "涓婁紶闄勪欢绠€鍘�"})
        }), $(".company-detail-grab").length && $(".company-detail-grab .load-more").on("click", function () {
            var el = $(".company-detail-grab").find(".job-list"), loadMoreBtn = el.find(".load-more"),
                nowPage = parseInt(el.attr("data-page")), companyId = el.attr("data-companyid"),
                hasMore = el.attr("data-hasmore");
            "false" != hasMore && ($(this).find(".more").text("鍔犺浇涓�..."), $.ajax({
                type: "GET",
                url: "/gongsi/ljobdata.json",
                data: {companyId: companyId, page: nowPage + 1},
                dataType: "json",
                success: function (result) {
                    "string" == typeof result && (result = eval("(" + result + ")")), 0 === result.code ? (el.attr("data-page", nowPage + 1), el.find("ul").append(result.zpData.html), result.zpData.hasMore || loadMoreBtn.hide(), loadMoreBtn.find(".more").text("鐐瑰嚮鍔犺浇鏇村")) : loadMoreBtn.find(".more").text("鐐瑰嚮鍔犺浇鏇村")
                },
                error: function (e) {
                }
            }))
        }), "undefined" != typeof _userInfo) {
            this.showMes();
            var that = this;
            if (_userInfo.isLogin) {
                if (!_userInfo.isPerfect) {
                    var conTip = $(".container-tip");
                    setTimeout(function () {
                        Detail.canClick = !0, $(".avatar img").on("click", function () {
                            that.showGuide()
                        })
                    }, 4e3), $(".tip-box a").attr("href", "/web/geek/guide")
                }
            } else {
                var conTip = $(".container-tip");
                setTimeout(function () {
                    Detail.canClick = !0, $(".avatar img").on("click", function () {
                        $(".jconfirm").length && $(".jconfirm").remove(), Detail.canClick && that.showGuide()
                    })
                }, 4e3), $(".container-tip .tip-box>a").on("click", function () {
                    if ($(".jconfirm").length && $(".jconfirm").remove(), 1 != $(this).data("load")) {
                        var e = $(this);
                        e.data("load", !0), $(".container-tip").fadeOut(function () {
                            $.confirm({
                                content: $("#pop-hide-container").html(),
                                title: !1,
                                confirmButton: !1,
                                cancelButton: !1,
                                closeIcon: !0,
                                columnClass: "pop-sign-box",
                                onOpen: function () {
                                    Singup.init()
                                },
                                onClose: function () {
                                    Singup.cdAni && (clearInterval(Singup.cdAni), Singup.cdAni = null), that.showMes()
                                }
                            }), e.data("load", !1)
                        })
                    }
                })
            }
            if (_userInfo.hasKaAnotherS) try {
                _T.sendEvent("detail_with_another_s_from_same_boss")
            } catch (e) {
            }
        }
        $(".job-detail .slider-main").length && $(".slider-main").hwSlider({
            autoPlay: !1,
            arrShow: !0,
            dotShow: !0,
            navShow: !0,
            touch: !0,
            width: 834,
            height: 391
        }), Detail.pushJobLocal();
        var Banner = $(".job-banner"), smallBanner = $(".smallbanner"), bannerHeight = smallBanner.height(),
            isSliding = !1;
        if ($(document).height() - $(window).height() < 260 || 0 == $(".job-banner").length || (showBanner(), $(window).scroll(function () {
            showBanner()
        })), $(".company-banner").length && (showBanner(), $(window).scroll(function () {
            showBanner()
        })), $(".job-select").length > 0) {
            var $selects = $(".job-select");
            $(".job-select").on("mouseenter", function () {
                $(this).addClass("open");
                var e = $(this).attr("data-ka");
                if (e) try {
                    _T.sendEvent(e)
                } catch (e) {
                }
            }).on("mouseleave", function () {
                $(this).removeClass("open")
            })
        }
        if ($("#jobFilter").length > 0 && $(".job-filter").length > 0 && $("#jobFilter").on("click", function () {
            if ($(this).parent().toggleClass("job-filter-show").hasClass("job-filter-show")) try {
                _T.sendEvent("comp_filter")
            } catch (e) {
            }
        }), $(".company-job").length > 0) {
            var hoverTimer = "";
            $(".job-list .info-primary h3.name").each(function (e) {
                var t = $(this), i = t.closest("[data-jid]").attr("data-jid"),
                    n = t.closest("[data-lid]").attr("data-lid");
                t.hoverDelay({
                    hoverDuring: 400, hoverEvent: function () {
                        var e = t.find(".info-detail");
                        "" == $.trim(e.text()) ? $.ajax({
                            type: "GET",
                            url: "/wapi/zpgeek/view/job/card.json",
                            data: {jid: i, lid: n, type: 2},
                            dataType: "json",
                            success: function (n) {
                                if (0 == n.code) {
                                    var s = n.zpData.html;
                                    e.html(s), setPopjobTop(t, t.closest("li"), i)
                                }
                            }
                        }) : setPopjobTop(t, t.closest("li"), i)
                    }, outEvent: function () {
                        clearTimeout(hoverTimer), t.removeClass("cur"), t.find(".info-detail").css("top", 0)
                    }
                })
            })
        }
        if ($(".links-box").length > 0) {
            var $el = $(".links-box"), $titleItems = $(".links-box .title-item"),
                $linksContents = $(".links-box .links-content"), $expandBtn = $(".links-box .expand-btn a");
            switchExpandVisibility(), $linksContents.addClass("limited"), $el.on("click", ".title-item", function () {
                var e = $(this), t = e.index();
                $titleItems.removeClass("cur"), $linksContents.removeClass("cur"), e.addClass("cur"), $($linksContents[t]).addClass("cur").removeClass("limited"), switchExpandVisibility(), $linksContents.addClass("limited"), $expandBtn.html('<span>灞曞紑</span><i class="fz fz-slidedown"></i>')
            }), $expandBtn.on("click", function () {
                var e = $(".links-wrapper").find(".cur");
                e.toggleClass("limited"), e.hasClass("limited") ? $expandBtn.html('<span>灞曞紑</span><i class="fz fz-slidedown"></i>') : $expandBtn.html('<span>鏀惰捣</span><i class="fz fz-slideup"></i>')
            })
        }
        $(".company-job.company-desc .job-list li").length > 0 && $(".company-job.company-desc .job-list").on("click", "li", function (e) {
            if ("A" !== e.target.nodeName && -1 === e.target.className.indexOf("startchat")) {
                var t = $(this), i = t.find('a[href*="job_detail"]'), n = i.attr("href"),
                    s = $(this).find("[data-lid]").attr("data-lid"),
                    a = '<form action="' + n + '" method="get" target="_blank" style="display: none;"><input type="hidden" name="ka" value="' + i.attr("ka") + '_blank" /><input type="hidden" name="lid" value="' + s + '" /></form>';
                t.append(a), t.find("form").submit(), t.find("form").remove()
            }
        }), $(".job-list").length > 0 && $(".job-list").on("click", ".false-link", function () {
            return !1
        })
    }, checkAcceptInvite: function (e, t, i) {
        var n = i || {};
        $.ajax({
            type: "GET",
            url: "/wapi/zprelation/interview/geek/accept/precheck.json",
            dataType: "json",
            data: {bossId: e.data("boss"), bossSource: n.bossSource || 0},
            success: function (i) {
                var s = i.zpData;
                0 == i.code && (Attachment.attachmentList = s, s.hasInterviewed || t ? Detail.beforeAcceptInvite(e, s, n) : Detail.showInviteTip(e, s, n))
            }
        })
    }, beforeAcceptInvite: function (e, t, i) {
        if (t.hasSend) Detail.acceptInvite(e, "", i); else if (t.resumeCount > 1) Attachment.showResumeSelecter(t, {
            callbackConfirm: function (t) {
                Detail.acceptInvite(e, t, i)
            }
        }); else {
            var n = t.resumeList[0] ? t.resumeList[0].resumeId : "";
            Detail.acceptInvite(e, n, i)
        }
    }, pushJobLocal: function () {
        if ("undefined" != typeof _jobInfo && window.localStorage && _jobInfo) {
            var e = Storage.get("_Job_History");
            if (e) if (-1 === JSON.stringify(e).indexOf(JSON.stringify(_jobInfo))) e.unshift(_jobInfo), Storage.set("_Job_History", e); else {
                var t = [];
                $(e).each(function (e, i) {
                    e >= 5 || i.job_id != _jobInfo.job_id && t.push(i)
                }), t.unshift(_jobInfo), Storage.set("_Job_History", t)
            } else Storage.set("_Job_History", [_jobInfo])
        }
    }, showGrabTip: function (e) {
        $.dialog({
            content: '<div class="tip-text">鎶辨瓑锛岃鑱屼綅褰撳墠鏃犳硶鎶曢€�</div>',
            title: "鎻愮ず",
            type: "warning",
            closeText: !1,
            cancelText: "鍙栨秷",
            confirmText: "鏌ョ湅鎺ㄨ崘鑱屼綅",
            wrapClass: "",
            onOpen: function (e) {
            },
            onConfirm: function (e) {
                window.location.href = "/job_detail/"
            }
        }), e.text("鎶曢€掔畝鍘�").removeClass("btn-loading")
    }, postDeliveResume: function (e, t) {
        var i = t;
        e.attr("data-url");
        $.ajax({
            url: "/wapi/zpgeek/resume/onekeydeliver.json",
            data: i,
            type: "post",
            dataType: "json",
            success: function (n) {
                if (0 === n.code) $.dialog({
                    content: '<div class="tip-text">鎮ㄧ殑闄勪欢绠€鍘嗗凡缁忓彂閫佺粰Boss锛岃闈欏€欎匠闊炽€�</div>',
                    title: "鎶曢€掓垚鍔�",
                    type: "success",
                    cancelText: "",
                    autoTime: 4,
                    confirmText: "纭畾",
                    wrapClass: "",
                    onOpen: function (e) {
                        $(".btn-sendresume").text("宸叉姇閫�").removeClass("btn-loading").addClass("btn-disabled")
                    },
                    onConfirm: function (e) {
                        e.remove()
                    }
                }); else if (1 === n.code) {
                    var s = (n.zpData.bizCode, n.zpData.bizMessage), a = n.zpData.bizData;
                    a.chatRemindDialog ? ($.extend(i, {cid: 1}), Detail.showBlockDialog(a.chatRemindDialog, e, 17, t.resumeId, i)) : $.toast({
                        content: s,
                        type: "error"
                    })
                } else 24 === n.code ? Detail.showSign(3) : 7 == n.code || 1011 === n.code ? Detail.showSign(1011) : $.toast({
                    content: n.message,
                    type: "error"
                })
            },
            error: function (e) {
                $.toast({content: "璇风◢鍚庡啀璇�", type: "error"})
            }
        })
    }, deliveResume: function (e, t, i) {
        var n = t || e.attr("data-url");
        e.attr("redirect-url");
        n = n.replace("/gchat/deliveryResume.json", "/wapi/zpgeek/resume/onekeydeliver.json"), e.hasClass("btn-loading") || e.hasClass("btn-disabled") || (e.html('<i class="icon-loading"></i>鎶曢€掍腑').addClass("btn-loading"), $.ajax({
            url: n + "&resumeId=" + i, type: "post", dataType: "json", success: function (t) {
                var n = t.zpData || {};
                0 === t.code ? $.dialog({
                    content: '<div class="tip-text">鎮ㄧ殑闄勪欢绠€鍘嗗凡缁忓彂閫佺粰Boss锛岃闈欏€欎匠闊炽€�</div>',
                    title: "鎶曢€掓垚鍔�",
                    type: "success",
                    cancelText: "",
                    autoTime: 4,
                    confirmText: "纭畾",
                    wrapClass: "",
                    onOpen: function (t) {
                        $(".btn-sendresume").text("宸叉姇閫�").removeClass("btn-loading").addClass("btn-disabled"), $(e).text("宸叉姇閫�").removeClass("btn-loading").addClass("btn-disabled")
                    },
                    onConfirm: function (e) {
                        e.remove()
                    }
                }) : n.bizCode ? 1 == n.bizCode ? (Detail.showBlockDialog(n.bizData.chatRemindDialog, e, 2, i), e.text("鎶曢€掔畝鍘�").removeClass("btn-loading")) : 2 == n.bizCode ? Detail.showGrabTip(e) : $.dialog({
                    content: '<div class="tip-text">' + n.resmsg + "</div>",
                    title: "鎮ㄤ笉澶鍚堣boss鐨勮姹�",
                    type: "warning",
                    closeText: !1,
                    cancelText: "鍐嶇湅鐪�",
                    confirmText: "缁х画鎶曢€�",
                    wrapClass: "",
                    onConfirm: function (e) {
                        e.remove(), location.reload()
                    }
                }) : 1011 == t.code || 7 == t.code ? (Detail.showSign(1011), e.text("鎶曢€掔畝鍘�").removeClass("btn-loading")) : 1 == t.code ? $.dialog({
                    content: t.message,
                    title: "",
                    type: "warning",
                    closeText: !1,
                    cancelText: !1,
                    confirmText: "纭畾",
                    wrapClass: "",
                    onConfirm: function (e) {
                        e.remove(), location.reload()
                    }
                }) : ($.dialog({
                    content: t.message,
                    title: "",
                    type: "warning",
                    closeText: !1,
                    cancelText: !1,
                    confirmText: "纭畾",
                    wrapClass: "",
                    onConfirm: function (e) {
                        e.remove()
                    }
                }), e.text("鎶曢€掔畝鍘�").removeClass("btn-loading"))
            }, error: function (t) {
                e.text("鎶曢€掔畝鍘�").removeClass("btn-loading")
            }
        }))
    }, startChat: function (e, t, i, n) {
        var e = e, s = t || e.attr("data-url"), a = e.attr("redirect-url");
        "javascript:;" != e.attr("href") || e.hasClass("btn-disabled") || (e.addClass("btn-disabled"), $.ajax({
            type: "POST", url: s, dataType: "JSON", data: null, success: function (t) {
                if (0 == t.code) {
                    if ("绔嬪嵆娌熼€�" == e.text() && t.zpData && t.zpData.greeting) var n = $.dialog({
                        content: '<div class="greet-con" id="greet">' + t.zpData.greeting + "</div><span>濡傞渶淇敼鎵撴嫑鍛煎唴瀹癸紝璇峰湪銆愯处鍙疯缃�-璁剧疆鎷涘懠璇€戦〉闈慨鏀�</span>",
                        title: "宸插悜BOSS鍙戦€佹秷鎭�",
                        closeText: !1,
                        cancelText: "鐣欏湪姝ら〉",
                        confirmText: "缁х画娌熼€�",
                        inline: !0,
                        wrapClass: "greet-pop",
                        closeLayer: !1,
                        onOpen: function (e) {
                            e.find(".verify-box img").on("click", function () {
                                $(this).attr("src", "/captcha/?randomKey=" + $(this).siblings(".randomkey").val() + "&_r=" + (new Date).getTime())
                            }), e.find("#fileupload").on("click", function (t) {
                                $(this).next(".verify-box") ? _this.checkForm($(".verify-box")) ? _this.uploadPicture($(this), e) : t.preventDefault() : _this.uploadPicture($(this), e)
                            })
                        },
                        onConfirm: function (e) {
                            try {
                                _T.sendEvent("go_greet_done_continue")
                            } catch (e) {
                            }
                            window.location.href = a
                        },
                        onCancel: function () {
                            try {
                                _T.sendEvent("go_greet_done_cancel")
                            } catch (e) {
                            }
                            n.close("cancel")
                        }
                    }); else window.location.href = a;
                    e.attr("href", e.attr("redirect-url")).text("缁х画娌熼€�"), e.removeClass("btn-disabled")
                } else 7 == t.code || 1011 == t.code ? (Detail.showSign(1011), e.removeClass("btn-disabled")) : 1 == t.code ? t.zpData && 1 == t.zpData.bizCode ? (Detail.showBlockDialog(t.zpData.bizData.chatRemindDialog, e, 1), e.removeClass("btn-disabled")) : t.zpData && 2 == t.zpData.bizCode ? Detail.showGrabTip(e) : ($.toast({
                    content: t.message,
                    type: "error"
                }), e.removeClass("btn-disabled")) : 24 == t.code ? ($.toast({
                    content: "璇峰埌APP涓垏鎹㈠埌鐗涗汉韬唤鍚庡啀閲嶈瘯",
                    type: "error"
                }), e.removeClass("btn-disabled")) : 25 == t.code ? (e.removeClass("btn-disabled"), window.location.href = "/web/geek/guide") : ($.toast({
                    content: t.message,
                    type: "error"
                }), e.removeClass("btn-disabled"));
                i && i(t)
            }, error: function (t) {
                e.removeClass("btn-disabled"), n && n()
            }
        }))
    }, sendEventAction: function (e, t) {
        $.ajax({
            type: "POST",
            url: "/wapi/zpCommon/actionLog/geek/chatremind.json",
            data: {ba: e.ba, action: t},
            dataType: "JSON",
            success: function (e) {
            }
        })
    }, showBlockDialog: function (e, t, i, n, s) {
        Detail.sendEventAction(e, "addf-limit-popup-c");
        var a = e.title, o = e.content, r = e.buttonList, c = e.remindType, l = "";
        e.showNotRemind && (l = "<div class='remindType'><label><input type='checkbox'>涓嶅啀鎻愰啋</label></div>");
        var d = {
            content: "<p>" + o + "</p>" + l,
            title: a,
            closeText: !1,
            cancelText: 2 === r.length && r[0].text,
            confirmText: 2 === r.length ? r[1].text : r[0].text,
            inline: !0,
            wrapClass: "greet-pop",
            closeLayer: !1,
            onOpen: function (e) {
            },
            onConfirm: function (a) {
                if (Detail.sendEventAction(e, "addf-limit-popup-connect"), e.showNotRemind && $(".remindType input:checked").length && Detail.sendRemindType(c), p.close(), 2 == c) return void (1 == i ? Detail.startChat(t, r[1].webUrl) : 17 == i ? Detail.postDeliveResume(t, s) : Detail.deliveResume(t, r[1].webUrl, n));
                2 === r.length ? window.open(r[1].webUrl) : r[0].url && window.open(r[0].webUrl)
            }
        };
        2 === r.length && (d.onCancel = function () {
            if (Detail.sendEventAction(e, "addf-limit-popup-connect"), p.close(), 2 === r.length) {
                if (4 == c) return void (17 == i ? Detail.postDeliveResume(t, s) : Detail.startChat(t, r[0].webUrl));
                r[0].url && window.open(r[0].webUrl)
            }
        });
        var p = $.dialog(d)
    }, sendRemindType: function (e) {
        $.ajax({
            type: "POST",
            url: " /gchat/noMoreChatRemind.json",
            data: {remindType: e},
            dataType: "json",
            success: function (e) {
            }
        })
    }, showSign: function (e) {
        var t = "pop-sign-box";
        4 != e && $(".sign-wrap").hasClass("sign-wrap-v2") && (t += " sign-wrap-v2"), $.confirm({
            content: $(".sign-wrap:hidden").html(),
            title: !1,
            confirmButton: !1,
            cancelButton: !1,
            closeIcon: !0,
            backgroundDismiss: !1,
            columnClass: t,
            onOpen: function () {
                var t = this;
                Sign.init(t.$content), 4 == e ? (t.$content.find(".sign-form").hide(), t.$content.find(".sign-welcome").show(), Sign.countDown(t.$content.find(".sign-welcome .welcome-box .count-down"), function () {
                    window.location.href = t.$content.find(".sign-welcome .welcome-box .btn").attr("href")
                })) : 5 == e && (t.$content.find(".sign-register").show(), t.$content.find(".sign-register").find(".verifyimg").click());
                var i = "verrify" + Math.random().toString(32).substr(-10, 6),
                    n = this.$content.find(".sign-form:visible").find(".row-code");
                n.attr("id", i), VerrifyCode.reset(n)
            },
            onClose: function () {
                Sign.interCount && (clearInterval(Sign.interCount), Sign.interCount = null)
            }
        })
    }, showMes: function () {
        if (!_userInfo.isLogin || !_userInfo.isPerfect) {
            var e = $(".message");
            Detail.canClick = !1, $.each(_userInfo.text, function (t, i) {
                e.find(".text").eq(t).html(i)
            }), Detail.firstIn ? (setTimeout(function () {
                $(".container-mes").fadeIn(), $(".container-mes").find(".avatar").css("display", "block")
            }, 1e3), setTimeout(function () {
                e.css("top", "40px"), e.fadeIn(), e.find("li").eq(0).fadeIn()
            }, 1800), setTimeout(function () {
                e.find("li").eq(1).fadeIn()
            }, 2600), setTimeout(function () {
                e.find("li").eq(2).fadeIn(), Detail.canClick = !0
            }, 3400), Detail.firstIn = !1) : (e.css("top", "40px"), e.fadeIn(200), $(".container-mes").find(".avatar").fadeIn(200), Detail.canClick = !0)
        }
    }, showTip: function () {
        if ((!_userInfo.isLogin || !_userInfo.isPerfect) && _userInfo.showTip) {
            var e = $(".avatar img");
            Detail.canClick = !1, setTimeout(function () {
                $(".message").css("z-index", "101"), $(".aladingtip").fadeIn(), e.addClass("avatar-ani"), e.mouseover(function () {
                    $(this).removeClass("avatar-ani")
                }), e.mouseout(function () {
                    $(this).addClass("avatar-ani")
                })
            }, 3400), $(".aladingtip").click(function () {
                $(this).fadeOut(function () {
                    e.removeClass("avatar-ani"), e.unbind("mouseover mouseout")
                })
            })
        }
    }, showGuide: function () {
        var e = $(".container-tip"), t = $(".container-mes"), i = this;
        t.find(".message").css({
            top: "20px",
            "-webkit-transition": "all linear .2s",
            transition: "all linear .2s"
        }).fadeOut(), t.find(".avatar").fadeOut(), $(".aladingtip").fadeOut(), e.fadeIn(200), e.find(".tip-box").css({
            "margin-bottom": "35px",
            "-webkit-transition": "all linear .2s",
            transition: "all linear .2s"
        }), e.find(".trangle").css({
            bottom: "69px",
            "-webkit-transition": "all linear .2s",
            transition: "all linear .2s"
        }), e.find("a.close").click(function () {
            e.find(".tip-box").css({
                "margin-bottom": "15px",
                "-webkit-transition": "all linear .2s",
                transition: "all linear .2s"
            }), e.find(".trangle").css({
                bottom: "49px",
                "-webkit-transition": "all linear .2s",
                transition: "all linear .2s"
            }), $(".message").css("top", "160px"), e.fadeOut(function () {
                i.showMes()
            }), $(".jconfirm").length && $(".jconfirm").remove()
        })
    }, getQueryString: function (e, t) {
        var i = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"), n = t.split("?")[1].match(i);
        return null != n ? unescape(n[2]) : null
    }, getIntersetStatus: function (e) {
        var t = Detail.getQueryString("jobId", e.attr("data-url")), i = $.Deferred();
        return $.ajax({
            type: "POST",
            url: "/wapi/zpgeek/resume/onekeydeliver/precheck.json",
            data: {jobId: t},
            dataType: "json",
            success: function (t) {
                0 == t.code ? t.zpData && t.zpData.result ? Detail.setInterest(e) : i.resolve(t) : 7 == t.code || 1011 == t.code ? Detail.showSign(1011) : ($.toast({
                    content: t.message,
                    type: "error"
                }), 25 === t.code && setTimeout(function () {
                    window.location.href = "/web/geek/guide"
                }, 1e3))
            },
            error: function (e) {
                $.toast({content: e.resmsg, type: "error"})
            }
        }), i
    }, interestGeekDel: function (e, t) {
        var i = Detail.getQueryString("jobId", e.attr("data-url"));
        $.ajax({
            type: "POST",
            url: "/wapi/zpitem/web/geekInfoRight/feedback.json",
            data: {encryptJobId: i, encryptUsedId: t.usedId, flag: 1},
            dataType: "json",
            success: function (t) {
                0 == t.code ? ($.toast({
                    content: "鎰熷叴瓒ｆ垚鍔�",
                    type: "success"
                }), Detail.setInterest(e)) : $.toast({content: t.message, type: "error"})
            },
            error: function () {
                $.toast({content: "閬撳叿浣跨敤澶辫触锛岃绋嶅悗鍐嶈瘯锛�", type: "error"})
            }
        })
    }, interestGeekBomb: function (e) {
        var t = $.Deferred(), i = Detail.getQueryString("jobId", e.attr("data-url"));
        return $.ajax({
            type: "POST",
            url: "/wapi/zpitem/web/geekBomb/interest",
            data: {encryptJobId: i},
            dataType: "json",
            success: function (i) {
                0 == i.code && i.zpData.interestResult ? (Detail.setInterest(e), t.resolve(i)) : t.reject(i.message)
            },
            error: function () {
                t.reject("閬撳叿浣跨敤澶辫触锛岃绋嶅悗鍐嶈瘯锛�")
            }
        }), t
    }, interestGeekOther: function (e, t) {
        var i = Detail.getQueryString("jobId", e.attr("data-url")),
            n = {jobId: i, oneKeyType: t.oneKeyType ? t.oneKeyType : "4"};
        Attachment.getAttachmentList(function (t) {
            var i = {};
            0 == t.code && t.zpData ? i = t.zpData : 7 == t.code && Detail.showSign(1011), i.resumeCount > 1 ? (Attachment.showResumeSelecter(i, {
                callbackConfirm: function (t) {
                    $.extend(n, {resumeId: t}), Detail.postDeliveResume(e.closest(".btns").find(".btn-sendresume"), n)
                }
            }), Detail.setInterest(e)) : 0 == i.resumeCount ? Attachment.showUploadWarning({
                title: "鎮ㄨ繕娌℃湁涓婁紶闄勪欢绠€鍘�",
                confirmText: "绔嬪嵆涓婁紶",
                cancelText: "鍙栨秷",
                callbackUpload: function () {
                    e.click()
                }
            }) : 1 == i.resumeCount && ($.extend(n, {resumeId: i.resumeList[0].resumeId}), Detail.postDeliveResume(e.closest(".btns").find(".btn-sendresume"), n), Detail.setInterest(e))
        })
    }, dialogInterest: function (e) {
        Detail.getIntersetStatus(e).then(function (t) {
            var i = t.zpData, n = "鎰熷叴瓒�";
            3 === i.bizCode && (n = "瑕�, 鍙戠畝鍘�");
            var s = "";
            s += '<i class="arrow-noumenon"></i>', s += "<p>" + i.bizMessage || t.message + "</p>", s += '<div class="btn-wrap">', s += "</div>";
            var a = $.dialog({
                content: s,
                title: "",
                closeText: !1,
                confirmText: n,
                cancelText: "涓�, 鍙劅鍏磋叮",
                element: e,
                inline: !0,
                opacityLock: !0,
                wrapClass: "dialog-interes",
                onOpen: function (e) {
                },
                onConfirm: function (t) {
                    1 == i.bizCode ? Detail.interestGeekDel(e, d) : 2 == i.bizCode ? Detail.interestGeekBomb(e).then(function (t) {
                        Detail.startChat(e.parents(".op-links").siblings(".btn-startchat"))
                    }).fail(function (e) {
                        $.toast({content: e, type: "error"})
                    }) : Detail.interestGeekOther(e, d), t.remove()
                },
                onCancel: function (t) {
                    Detail.setInterest(e), a.close()
                }
            })
        })
    }, uploadResume: function (e) {
        var t = $.dialog({
            content: '<p>涓婁紶闄勪欢绠€鍘嗭紝璁〣OSS鏇村揩鏇村叏闈㈢殑浜嗚В浣�<br>鏀寔DOC锛孌OCX锛孭DF锛孞PG锛孭NG鏍煎紡闄勪欢锛屾枃浠跺ぇ灏忎笉瓒呰繃8M</p><input id="fileupload"  type="file" name="file" ka="user-resume-upload-file">',
            title: "鎮ㄨ繕娌℃湁涓婁紶闄勪欢绠€鍘�",
            closeText: !1,
            confirmText: "纭畾",
            cancelText: "鍙栨秷",
            wrapClass: "dialog-uploadResume",
            onOpen: function (e) {
            },
            onConfirm: function (i) {
                Resume.beforeResumeUpload(function () {
                    $("#fileupload").click(), Resume.fileUpload(e, function () {
                        t.close()
                    })
                })
            }
        })
    }, setInterest: function (e) {
        var t = e.attr("data-url"), i = null;
        e.hasClass("disabled") || (i = "鎰熷叴瓒�" == e.text() ? 1 : 0, e.addClass("disabled"), $.ajax({
            type: "POST",
            url: t,
            data: {flag: i},
            dataType: "json",
            success: function (t) {
                1 == t.rescode ? 1 == i ? e.attr("job-id") ? e.text("鍙栨秷鎰熷叴瓒�").addClass("active").attr("ka", "popjob_notinterest_" + e.attr("job-id")) : e.text("鍙栨秷鎰熷叴瓒�").addClass("active").attr("ka", "job_detail_unlike") : e.attr("job-id") ? e.text("鎰熷叴瓒�").removeClass("active").attr("ka", "popjob_interest_" + e.attr("job-id")) : e.text("鎰熷叴瓒�").removeClass("active").attr("ka", "job_detail_like") : 1011 == t.code ? ($(".jconfirm").length && $(".jconfirm").remove(), Detail.showSign(1011)) : $.toast({
                    content: t.resmsg,
                    type: "error"
                }), e.removeClass("disabled")
            },
            error: function (t) {
                e.removeClass("disabled"), 603 === t.status || $.toast({content: "缃戠粶鎴栨湇鍔℃晠闅滐紝璇风◢鍚庡啀璇�", type: "error"})
            }
        }))
    }, showInviteTip: function (e, t, i) {
        $.dialog({
            content: '<div class="text">路 闈㈣瘯鍓嶄竴澶�18鐐瑰墠锛屽弻鏂归兘鍙互鐢宠鍙栨秷銆�<br>路 濡備笉鍙栨秷锛岃鎸夋椂鍑哄腑闈㈣瘯锛屼笉瑕佺埥绾︺€�<br>路 瀵规柟鐖界害锛岀害瀹氭椂闂�30鍒嗛挓鍙互鎶曡瘔銆�<br>路 鐖界害涓€鏂癸紝骞冲彴鍥炲姞銆愪笉鑹褰曘€戝苟鍏ず銆�<br>路 涓轰簡鏂逛究鑱旂郴锛岄個璇烽潰璇曟垚鍔熷悗锛屽弻鏂硅嚜鍔ㄤ氦鎹㈡墜鏈鸿仈绯绘柟寮忋€�<br>路 瀵规柟灏嗚嚜鍔ㄨ幏鍙栦綘鐨勭畝鍘嗛檮浠躲€�</div>',
            title: "绾﹂潰璇曡瘹淇″畧鍒�",
            closeText: !1,
            cancelText: "鎴戝啀鎯虫兂",
            confirmText: "淇濊瘉涓嶇埥绾�",
            wrapClass: "interview-pop",
            onOpen: function (e) {
            },
            onConfirm: function (n) {
                Detail.beforeAcceptInvite(e, t, i), n.remove()
            }
        })
    }, acceptInvite: function (e, t, i) {
        var n = e.attr("data-url") + "&resumeId=" + (t || "");
        $.ajax({
            type: "POST", url: n, data: null, dataType: "json", success: function (e) {
                0 == e.code ? ($.toast({content: "宸叉帴鍙楅個璇�", type: "success"}), setTimeout(function () {
                    window.location.reload()
                }, 1500)) : 1011 == e.code ? Detail.showSign(1011) : 0 == e.rescode ? (alert(e.message), location.reload()) : ($.toast({
                    content: e.message,
                    type: "error"
                }), setTimeout(function () {
                    window.location.reload()
                }, 1500))
            }, error: function () {
                $.toast({content: "缃戠粶鎴栨湇鍔℃晠闅滐紝璇风◢鍚庡啀璇�", type: "error"})
            }
        })
    }, refuseInvite: function (e) {
        var t = e.attr("data-url");
        e.hasClass("disabled") || (e.addClass("disabled"), $.ajax({
            type: "POST",
            url: t,
            data: null,
            dataType: "json",
            success: function (t) {
                0 == t.code ? $.dialog({
                    content: '<div class="text">宸叉嫆缁濋潰璇曢個璇�</div>',
                    title: "",
                    closeText: !1,
                    cancelText: "",
                    confirmText: "纭畾",
                    wrapClass: "refuse-pop",
                    onOpen: function (e) {
                    },
                    onConfirm: function (e) {
                        e.remove(), setTimeout(function () {
                            window.location.reload()
                        }, 1500)
                    },
                    onClose: function () {
                        setTimeout(function () {
                            window.location.reload()
                        }, 1500)
                    }
                }) : 1011 == t.code ? Detail.showSign(1011) : ($.toast({
                    content: t.resmsg,
                    type: "error"
                }), setTimeout(function () {
                    window.location.reload()
                }, 1500)), e.removeClass("disabled")
            },
            error: function () {
                $.toast({content: "缃戠粶鎴栨湇鍔℃晠闅滐紝璇风◢鍚庡啀璇�", type: "error"}), e.removeClass("disabled")
            }
        }))
    }, companyDetail: function () {
        $(".job-location .job-location-map[data-content]").each(function () {
            var e = $(this), t = e.attr("data-content");
            !$.trim(e.html()) && t && (new AMap.Geocoder).getLocation(t, function (t, i) {
                if ("complete" === t && "OK" === i.info) {
                    var n = i.geocodes[0].location;
                    e.html('<img src="https://restapi.amap.com/v3/staticmap?zoom=16&amp;size=836*174&amp;markers=mid,0xFF0000,A:' + n.lng + "," + n.lat + '&amp;key=21b56a6cc83fad7668dbb0e9564759a7" alt="鍏徃鍦板潃"><p>鐐瑰嚮鏌ョ湅鍦板浘</p>')
                }
            })
        }), $(".js-open-map").on("click", function () {
            var e = $(this).find("img").attr("src").match(/:([^&]+)/g), t = e[1].replace(":", ""),
                i = $(this).attr("data-content"),
                n = ['<div class="job-location job-location-width">', '<div class="location-address">' + i + "</div>", '<div id="map-container" class="map-container" data-long-lat="' + t + '"></div>', "</div>"];
            $.dialog({
                content: n.join(""),
                title: "",
                closeText: !0,
                cancelText: "",
                confirmText: "",
                wrapClass: "map-pop",
                onOpen: function (e) {
                    var n = t.split(","), s = new AMap.Map("map-container", {
                        resizeEnable: !0,
                        scrollWheel: !0,
                        center: [n[0], n[1]],
                        zoom: 16
                    }), a = (s.on("click", function () {
                    }), s.on("mouseout", function () {
                    }), new AMap.Marker({
                        map: s,
                        position: [n[0], n[1]],
                        icon: new AMap.Icon({
                            size: new AMap.Size(42, 50),
                            image: "https://static.zhipin.com/zhipin/v40//web/geek/images/icon-poi.png",
                            imageOffset: new AMap.Pixel(0, -60)
                        })
                    }));
                    AMap.event.addListener(a, "click", function () {
                        infoWindow.open(s, a.getPosition())
                    }), AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function () {
                        var e = new AMap.ToolBar, t = new AMap.Scale;
                        s.addControl(e), s.addControl(t)
                    }), infoWindow = new AMap.InfoWindow({
                        content: i,
                        offset: new AMap.Pixel(5, -25)
                    }), infoWindow.open(s, s.getCenter()), e.find(".dialog-container").css({margin: "-250px 0 0 -330px"})
                }
            })
        })
    }, detailMap: function () {
        $(".js-open-detail").on("click", function () {
            var e = $(this).attr("data-id"), t = $(this).attr("data-lat"), i = $(this).attr("data-content"),
                n = ['<div class="location-item show-map location-item-pop">', '<div class="location-address"><a href="javascript:;" class="more-view><i class="fz fz-slidedown"></i></a>' + i + "</div>", '<div class="map-container js-map-container" id="' + e + '" data-long-lat="' + t + '"></div>', "</div>"];
            $.dialog({
                content: n.join(""),
                title: "",
                closeText: !0,
                cancelText: "",
                confirmText: "",
                wrapClass: "map-pop",
                onOpen: function (e) {
                    $(".js-map-container").each(function () {
                        var e = $(this).attr("id"), t = $(this).attr("data-long-lat").split(","),
                            n = new AMap.Map(e, {resizeEnable: !0, scrollWheel: !0, center: [t[0], t[1]], zoom: 16}),
                            s = (n.on("click", function () {
                            }), n.on("mouseout", function () {
                            }), new AMap.Marker({
                                map: n,
                                position: [t[0], t[1]],
                                icon: new AMap.Icon({
                                    size: new AMap.Size(42, 50),
                                    image: "https://static.zhipin.com/zhipin/v40//web/geek/images/icon-poi.png",
                                    imageOffset: new AMap.Pixel(0, -60)
                                })
                            }));
                        AMap.event.addListener(s, "click", function () {
                            infoWindow.open(n, s.getPosition())
                        }), infoWindow = new AMap.InfoWindow({
                            content: i,
                            offset: new AMap.Pixel(5, -25)
                        }), infoWindow.open(n, n.getCenter()), AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function () {
                            var e = new AMap.ToolBar, t = new AMap.Scale;
                            n.addControl(e), n.addControl(t)
                        })
                    }), $(".dialog-container").css({margin: "-250px 0 0 -325px"})
                }
            }), $(".dialog-container").css({margin: "-250px 0 0 -325px"})
        })
    }, showPropDetail: function () {
        var e = $(".prop-item"), t = e.find(".prop-container"), i = e.find(".prop-detail");
        if ("undefined" != typeof _jobInfo) {
            $.get("/geek/item/competitive/jobdetail.json", {jobId: _jobInfo.job_id}, function (n) {
                1 == n.rescode ? (e.find(".prop-default").removeClass("prop-default"), e.find("h3").append("<span>宸插紑鍚�</span>"), t.find(".level-" + (n.data.position + 1)).prepend('<p class="text-position icon-position">鎮ㄧ殑浣嶇疆</p>'), i.find(".pull-right").siblings().html("涓汉缁煎悎鎺掑悕锛�<span>鍦�<em>" + n.data.totalNum + "</em>浜轰腑鎺掑悕绗�<em>" + n.data.rank + "</em></span>"), i.find(".pull-right").html('<a href="javascript:;" class="link-detail" ka="check_personal_competitive_detail">鏌ョ湅瀹屾暣涓汉绔炰簤鍔�</a>')) : (e.find(".prop-default").removeClass("prop-default"), t.prepend('<p class="text-position">浣犲湪锛熶綅缃�</p>'), i.find(".pull-right").html('<a href="javascript:;" class="link-detail" ka="check_personal_competitive_detail">鏌ョ湅瀹屾暣涓汉绔炰簤鍔�</a>'))
            });
            var n = function () {
                var e = $.Deferred();
                return $.get("/geek/item/competitive/usestatus.json", {jobId: _jobInfo.job_id}, function (t) {
                    e.resolve(t)
                }), e
            }, s = function (e, t) {
                $.ajax({
                    url: "/geek/item/competitive/useitem.json",
                    data: {targetId: e.targetId},
                    type: "post",
                    success: function (e) {
                        1 == e.rescode ? window.location.href = e.jumpUrl : 2 == e.rescode ? Detail.showPop({
                            title: "娓╅Θ鎻愮ず",
                            content: "鎮ㄧ殑閬撳叿娆℃暟宸茬敤瀹�<br />璇峰厛璐拱绔炰簤鍔涘垎鏋愬櫒锛屽姪浣犳彁楂樻眰鑱岃儨绠�",
                            confirmText: "鍘昏喘涔�",
                            callback: function (e) {
                                e.find(".btn-sure").on("click", function () {
                                    try {
                                        _T.sendEvent("to_buy_warm_tips")
                                    } catch (e) {
                                    }
                                    e.remove(), ItemShop.analyzer()
                                })
                            }
                        }) : 3 == e.rescode ? Detail.showPop({
                            title: "娓╅Θ鎻愮ず",
                            content: "鎮ㄧ殑绠€鍘嗘湭瀹屽杽锛屾棤娉曚娇鐢ㄧ珵浜夊姏鍒嗘瀽鍣�<br />瀹屽杽绠€鍘嗗悗锛岄亾鍏蜂娇鐢ㄦ晥鏋滀細鏇村ソ鍝�",
                            confirmText: "绔嬪嵆瀹屽杽",
                            callback: function (t) {
                                t.find(".btn-sure").on("click", function () {
                                    try {
                                        _T.sendEvent("complete_immediately_resume_uncompleted")
                                    } catch (e) {
                                    }
                                    window.location.href = e.jumpUrl
                                })
                            }
                        }) : 4 == e.rescode && Detail.showPop({
                            title: "娓╅Θ鎻愮ず",
                            content: "璇ヨ亴浣嶅凡鍋滄鎷涜仒锛屾殏鏃舵棤娉曚娇鐢ㄩ亾鍏�<br />鍘荤湅鐪嬪叾浠栬亴浣�",
                            confirmText: "鎴戠煡閬撳暒",
                            callback: function (e) {
                                e.find(".btn-sure").on("click", function () {
                                    e.remove();
                                    try {
                                        _T.sendEvent("to_buy_warm_tips")
                                    } catch (e) {
                                    }
                                })
                            }
                        })
                    }
                })
            }, a = function () {
                n().then(function (e) {
                    if (1011 == e.code) return void Detail.showSign();
                    if (0 == e.rescode) $.toast({
                        content: "鎮ㄥソ锛屽垏鎹㈠埌鐗涗汉韬唤锛屽嵆鍙煡鐪嬩釜浜虹珵浜夊姏鍒嗘瀽",
                        type: "error"
                    }); else if (1 == e.rescode) {
                        try {
                            _T.sendEvent("show_personal_competitive_detail")
                        } catch (e) {
                        }
                        window.location.href = e.data.jumpUrl
                    } else if (0 != e.data.itemLeftCount) $.dialog({
                        title: "",
                        content: "纭畾瀵硅鑱屼綅浣跨敤绔炰簤鍔涘垎鏋愬櫒锛�",
                        confirmText: "浣跨敤1/" + e.data.itemLeftCount,
                        cancelText: "鎴戝啀鎯虫兂",
                        wrapClass: "dialog-icons-default dialog-alert-default dialog-around-default dialog-opacity-layer",
                        position: "around",
                        opacityLock: !0,
                        element: i.find(".link-detail"),
                        inline: !0,
                        onConfirm: function (t) {
                            try {
                                _T.sendEvent("use_item_tips")
                            } catch (e) {
                            }
                            var i = {targetId: e.data.targetId};
                            s(i)
                        },
                        onCancel: function (e) {
                            try {
                                _T.sendEvent("on_second_thought_item_tips")
                            } catch (e) {
                            }
                            e.remove()
                        }
                    }); else {
                        var t = function () {
                            try {
                                _T.sendEvent("item_pay_buy_competitive_detail")
                            } catch (e) {
                            }
                            Payment.success({
                                article: "璐拱鎴愬姛",
                                text: "鏄惁纭畾瀵硅鑱屼綅浣跨敤绔炰簤鍒嗘瀽鍣紵",
                                cancelText: "鎴戝啀鎯虫兂",
                                confirmText: "绔嬪嵆浣跨敤",
                                confirm: function (e) {
                                    if ("confirm" == e) {
                                        try {
                                            _T.sendEvent("use_immediately_purchase_success")
                                        } catch (e) {
                                        }
                                        n().then(function (e) {
                                            if (2 == e.rescode) {
                                                var t = {targetId: e.data.targetId};
                                                s(t, wrap)
                                            } else $.toast({content: e.resmsg, type: "error"})
                                        })
                                    } else try {
                                        _T.sendEvent("on_second_thought_purchase_success")
                                    } catch (e) {
                                    }
                                }
                            })
                        };
                        ItemShop.analyzer(t)
                    }
                })
            };
            i.on("click", ".link-detail", function () {
                try {
                    var e = {action: "biz-item-geekcompetitive-click", p1: "job-detail-bottom"};
                    Report.myActionLog(e)
                } catch (e) {
                }
                a()
            })
        }
    }, showPop: function (e) {
        $.dialog({
            title: e.title,
            content: e.content,
            confirmText: e.confirmText,
            wrapClass: "layer-prop-tip",
            cancelText: !1,
            onOpen: function (t) {
                "function" == typeof e.callback && e.callback(t)
            }
        })
    }, myActionLog: function (e) {
        try {
            $.ajax({
                method: "post",
                url: "/wapi/zpCommon/actionLog/common.json",
                data: {ba: JSON.stringify(e)},
                cache: !1,
                success: function (e) {
                },
                error: function () {
                }
            })
        } catch (e) {
        }
    }
};
$(function () {
    Detail.init(), Detail.showPropDetail()
});
var Deliver = {
    init: function () {
        0 != $(".deliver-list").length && (Deliver.isLoading = !1, Deliver.type = "list", Deliver.listContainer = $(".job-box"), Deliver.listWrap = Deliver.listContainer.find(".deliver-list"), Deliver.tipsContainer = Deliver.listWrap.find(".data-tips"), Deliver.listCon = Deliver.listWrap.find("ul"), Deliver.listMoreEl = Deliver.listWrap.find(".loadmore"), Deliver.para = {page: 0}, Deliver.getData(1, !0), Deliver.listMoreEl.on("click", function () {
            Deliver.isLoading || Deliver.listMoreEl.hasClass("disabled") || Deliver.getData()
        }), Deliver.listCon.on("click", ".btn", function (e) {
            var t = $(this);
            Detail.startChat(t), e.preventDefault()
        }))
    }, getData: function (e, t) {
        e && (Deliver.para.page = 0, Deliver.listCon.html(""), Deliver.listWrap.find(".user-list").hide(), Deliver.listWrap.find(".detail-box").hide()), Deliver.para.page++, Deliver.isLoading = !0, Deliver.para.page > 1 && (Deliver.listMoreEl.addClass("disabled"), Deliver.listMoreEl.text("姝ｅ湪鍔犺浇涓�...")), $.ajax({
            type: "GET",
            url: "/geek/deliveryinfo.json",
            dataType: "JSON",
            cache: !1,
            data: Deliver.para,
            success: function (t) {
                var t = t, i = "";
                1 == t.rescode && (1 == t.hasMore ? Deliver.listMoreEl.removeClass("disabled").text("鍔犺浇鏇村").show() : Deliver.para.page > 1 && Deliver.listMoreEl.addClass("disabled").text("娌℃湁鏇村浜�").show(), "" == t.html ? e && Deliver.tipsContainer.html('<div class="data-blank"><i class="tip-nodata"></i><b>娌℃湁鐩稿叧鏁版嵁</b></div>').show() : (i += t.html, Deliver.listCon.append(i), Deliver.tipsContainer.html("").hide()), e && Deliver.listCon.find("li").length < 10 && Deliver.listMoreEl.text("娌℃湁鏇村浜�").addClass("disabled").hide()), Deliver.isLoading = !1
            },
            error: function (t) {
                Deliver.para.page > 1 && Deliver.listMoreEl.removeClass("disabled").text("鏁版嵁鍔犺浇鍑洪敊").show(), Deliver.isLoading = !1, e && (Deliver.listMoreEl.hide(), Deliver.tipsContainer.html('<div class="data-blank"><i class="tip-errordata"></i><b>鏁版嵁鍔犺浇鍑洪敊</b></div>').show())
            }
        })
    }
};
$(function () {
    Deliver.init()
}), $(function () {
    $(".ie").length && (window.IE = !0);
    var e = function () {
        $.dialog({
            type: "info",
            title: "鏂板ご鍍忓凡鎻愪氦瀹℃牳",
            content: '<div class="tip-text">澶村儚淇敼宸叉彁浜ゅ鏍革紝瀹℃牳閫氳繃鍚庤嚜鍔ㄦ洿鏂版偍鐨勪俊鎭�</div>',
            closeText: !0,
            confirmText: "鐭ラ亾浜�",
            cancelText: "",
            closeLayer: !1,
            preKa: "",
            wrapClass: "dialog-icons-default dialog-avatar-tip",
            lock: !0,
            onOpen: function (e) {
            },
            onConfirm: function (e) {
                e.remove()
            },
            onClose: function (e) {
            }
        })
    };
    $(".avatar_box").on("click", function () {
        if ($(".profile_form").length) window.IE ? $.initUploadPortrait({
            title: "涓婁紶鐓х墖",
            url: $("[upload]").attr("upload"),
            callback: function (t, i) {
                var n = $(".profile_form .avatar_line img.avatar");
                if ($("#user_info").length > 0 && $(window.parent.document).find(".aside_nav_bar .avatar img").attr("src", t[0]), $(".resume-box").length) {
                    var s = n.closest("form");
                    $.ajax({
                        type: "POST",
                        url: s.attr("action"),
                        dataType: "JSON",
                        data: {tiny: t[0], large: t[1]},
                        success: function (t) {
                            1 == t.rescode && (n.attr("src", t.url[1]), n.closest("dd").find("input:hidden[name=large]").val(t.url[1]), n.closest("dd").find("input:hidden[name=tiny]").val(t.url[0]), n.closest("dd").find(".error_hint").html("").hide(), t.verifyTip && e())
                        },
                        error: function (e) {
                        }
                    })
                }
            }
        }) : crop.show({
            callback: function (t) {
                t && $.post($("[upload-base64-url]").attr("upload-base64-url"), {data: t}, function (t) {
                    if (t.rescode) {
                        var i = $(".profile_form .avatar_line img.avatar");
                        i.attr("src", t.url[0]), i.closest("dd").find("input:hidden[name=tiny]").val(t.url[0]), i.closest("dd").find("input:hidden[name=large]").val(t.url[1]), $("#user_info").length > 0 && $(window.parent.document).find(".aside_nav_bar .avatar img").attr("src", t.url[0]), t.verifyTip && e()
                    } else alert("鍥剧墖淇濆瓨澶辫触")
                }, "json")
            }
        }); else if (window.IE) $.initUploadPortrait({
            title: "涓婁紶鐓х墖",
            url: $("[upload]").attr("upload"),
            callback: function (t, i) {
                var n = $(".profile_form .avatar_line img.avatar");
                n.attr("src", t[1]), n.closest("dd").find("input:hidden[name=large]").val(t[1]), n.closest("dd").find("input:hidden[name=tiny]").val(t[0]), n.closest("dd").find(".error_hint").html("").hide(), i && i.verifyTip && e()
            }
        }); else {
            var t = $(".avatar_layer"), i = $(this);
            crop.show({
                element: i, defaultAvatarHtml: t, callback: function (t) {
                    t && $.post($("[upload-base64-url]").attr("upload-base64-url"), {data: t}, function (t) {
                        if (t.rescode) {
                            var n = $(".avatar_box .avatar img");
                            n.attr("src", t.url[0]), n.closest("dd").find("input:hidden[name=tiny]").val(t.url[0]), n.closest("dd").find("input:hidden[name=large]").val(t.url[1]), i.find(".tip-text").remove(), t.verifyTip && e()
                        } else alert("鍥剧墖淇濆瓨澶辫触")
                    }, "json")
                }
            })
        }
    })
});
var Validate = {
    init: function (e, t, i) {
        var n = e, s = n.find("input,textarea");
        n.on("submit", function (e) {
            var a = !1;
            if (s.each(function () {
                if ($(this).val($(this).val().replace(/(^[\s\n\r]*)|([\s\n\r]*$)/g, "")), !$(this).attr("disabled") && ($(this).hasClass("required") || $(this).attr("data-range")) && !Validate.check($(this), !0)) return a = !1, !1;
                a = !0
            }), a) {
                if (n.attr("action").indexOf("/geek/user/save.json") > -1 && n.find("input[name=name]").length && !n.find("input[name=name]").hasClass("disabled")) {
                    var o = $("input[name=name]").val();
                    if (Auxiliary.getByteLength(o) < 4) return $.toast({
                        type: "error",
                        content: "濮撳悕搴斾负2-12涓眽瀛楁垨4-24涓瓧姣�"
                    }), !1
                }
                i ? Guide.postData(n, t) : (Resume.postData(n, t), Resume.formStatus = !1)
            } else {
                var r = $(".tip-text");
                r.length && $("body,html").stop().animate({scrollTop: r.offset().top - r.closest("dl").height()})
            }
            e.preventDefault()
        }), s.each(function () {
            var e = $(this).closest("dd").find(".count-num");
            $(this).attr("disabled") || !$(this).hasClass("required") && !$(this).attr("data-range") || (t || Validate.check($(this), !1, e), $(this).bind("input keyup", function () {
                Validate.check($(this), !1, e)
            }))
        }), n.find(".form-btns .btn-back").on("click", function () {
            n.closest(".resume-item").removeClass("resume-item-open")
        }), n.find('input[name="locationName"]').on("blur", function () {
            "" != $(this).val() && "" == $(this).parent().find('input[name="location"]').val() ? ($(this).val(""), Validate.showError($(this), "璇疯緭鍏ユ纭殑鍩庡競")) : Validate.hideError($(this))
        }), n.find('input[name="degree"]').closest("dd").find(".dropdown-menu li").on("click", function () {
            "206" == $(this).attr("data-val") || "209" == $(this).attr("data-val") ? (n.find('input[name="major"]').addClass("disabled").val("").attr("disabled", "disabled"), Validate.hideError(n.find('input[name="major"]'))) : n.find('input[name="major"]').removeClass("disabled").removeAttr("disabled"), n.find('.ipt-range, input[name="startDateCode"], input[name="endDateCode"]').val("")
        })
    }, getLength: function (e) {
        for (var t = 0, e = e.replace(/(^[\s\n\r]*)|([\s\n\r]*$)/g, ""), i = e.length, n = -1, s = 0; s < i; s++) n = e.charCodeAt(s), t += n > 255 ? 1 : .5;
        return Math.ceil(t)
    }, check: function (e, t, i) {
        var e = e, n = e.attr("data-range"), s = Validate.getLength(e.val().trim()), a = e.val().replace(/(\s*$)/g, "");
        if (e.hasClass("required") && "" == a) {
            if (t) return Validate.showError(e, e.attr("data-blank")), !1;
            Validate.hideError(e)
        } else Validate.hideError(e);
        if ("locationName" == e.attr("name") && "" != a && "" == e.parent().find('input[name="location"]').val()) return Validate.showError(e, "璇疯緭鍏ユ纭殑鍩庡競"), !1;
        if (t && "gender" == e.attr("name") && Number(a) < 0) return Validate.showError(e, e.attr("data-blank")), !1;
        if (n) {
            if (n = n.split(","), i && i.length && i.html("<em" + (s > n[1] ? ' class="red"' : "") + ">" + s + "</em>/" + n[1]), s > n[1] || s < n[0]) return Validate.showError(e, "璇疯緭鍏� " + n[0] + "-" + n[1] + " 涓瓧"), !1;
            Validate.hideError(e)
        }
        return !0
    }, showError: function (e, t) {
        var i = '<div class="tip-text">' + t + "</div>",
            n = e.closest("dd").length ? e.closest("dd") : e.closest(".form-row");
        Validate.hideError(e), n.find(".tip-text").remove(), $(i).appendTo(n), e.addClass("ipt-error"), $(".babresume-warning") && $(".babresume-warning").hide()
    }, hideError: function (e) {
        e.closest("dd").find(".tip-text").remove(), e.removeClass("ipt-error")
    }
};
$(function () {
    $(".form-resume").each(function () {
        Validate.init($(this))
    })
});
var FormsUI = {
        eq: 0, appointedBlueCollarPosition: [], init: function (e) {
            var t = e || $(document);
            if (this.dropSelect(t), this.prettyRadio(t), this.formEl = t, t.find(".ipt-datetimepicker").length) {
                var i = new Date;
                nowYear = i.getFullYear(), nowMonth = i.getMonth() + 1, nowThisDate = i.getDate(), t.find(".ipt-datetimepicker").each(function (e) {
                    var t = $(this), i = e, n = t.attr("data-format") || "yyyy-mm-dd", s = t.hasClass("date-range"),
                        a = t.attr("data-today"), o = t.attr("data-type"), r = t.attr("data-minYear") || !1, c = 2, l = 2;
                    (o && "y-m-d" == o || "y-m" == o) && (c = 4), "yyyy-mm" == n && (l = 3), t.datetimepicker({
                        format: n,
                        startView: c,
                        minView: l,
                        autoclose: 1,
                        weekStart: 1,
                        minLimitYear: r,
                        todayHighlight: !0,
                        container: _PAGE && _PAGE.isGeekChat ? "#resume-history" : "body",
                        endDate: nowYear + "-" + nowMonth + "-" + nowThisDate,
                        todayBtn: a ? 1 : 0
                    }).on("changeDate", function (e) {
                        t.closest("dd").find(".tip-text").hide();
                        var i = t.closest(".form-row").find(".date-range").eq(0);
                        if (a) {
                            if (new Date(e.date) < new Date(i.val())) return alert("缁撴潫鏃堕棿涓嶈兘灏忎簬寮€濮嬫椂闂�"), !1
                        } else if (s && "startDate" == t.attr("name")) {
                            var n = t.closest(".form-row").find(".date-range").eq(1);
                            new Date(e.date).getFullYear() == (new Date).getFullYear() && new Date(e.date).getMonth() == (new Date).getMonth() ? (n.parent().addClass("show-prefix-today"), n.parent().find('input[name="now"]').val("1"), n.removeClass("required")) : (n.parent().removeClass("show-prefix-today"), n.parent().find('input[name="now"]').val(""), n.addClass("required")), "1989-01" == t.val() ? n.datetimepicker("setStartDate", "1990-01") : n.datetimepicker("setStartDate", t.val())
                        }
                        s && "endDate" == t.attr("name") && (new Date(e.date).getFullYear() == (new Date).getFullYear() && new Date(e.date).getMonth() == (new Date).getMonth() ? (t.parent().addClass("show-prefix-today"), t.parent().find('input[name="now"]').val("1"), t.removeClass("required")) : (t.parent().removeClass("show-prefix-today"), t.parent().find('input[name="now"]').val(""), t.addClass("required"))), $(e.target).attr("data-minyear") && (new Date(e.date).getFullYear() <= 1989 ? i.parent().addClass("show-prefix-minyear") : i.parent().removeClass("show-prefix-minyear"))
                    }), "birthday" == t.attr("name") && (t.datetimepicker("setStartDate", "1950-01"), t.datetimepicker("setEndDate", nowYear - 15 + "-12")), s && "startDate" == t.attr("name") && t.datetimepicker("setStartDate", "1989-01"), s && "endDate" == t.attr("name") && ("" == t.val() && "" == t.closest(".form-row").find(".date-range").eq(0).val() ? t.datetimepicker("setStartDate", "1990-01") : t.datetimepicker("setStartDate", t.closest(".form-row").find(".date-range").eq(0).val())), t.parent().find(".prefix-minyear,.prefix-today").on("click", function (e) {
                        if (!$(".datetimepicker").eq(i).is(":visible")) return setTimeout(function () {
                            t.datetimepicker("show")
                        }, 1), !1;
                        t.datetimepicker("hide")
                    }), t.on("click", function () {
                        $(".workstartpicker-wrap").hide().removeClass("month-panel")
                    })
                })
            }
            t.find(".ipt-workyear").length && t.find(".ipt-workyear").workstartpicker(), t.find(".start-salary").on("click", "li", function () {
                FormsUI.changeSalary($(this).attr("data-val"))
            }), FormsUI.setMinSlary(), t.find(".select-industry .industry-cells").on("click", "span", function () {
                var e = $(this).closest("dd");
                if ($(this).hasClass("selected")) $(this).removeClass("selected"), e.find(".select-industry .industry-title h3").removeClass("red"), e.find(".select-industry .industry-title p.gray").removeClass("red").text("鏈€澶氬彲閫� 3 涓妧鑳芥爣绛�"); else {
                    if (e.find(".select-industry .industry-cells .selected").length > 2) return e.find(".select-industry .industry-title h3").addClass("red"), void e.find(".select-industry .industry-title p.gray").addClass("red").text("鏈€澶氬彲閫� 3 涓妧鑳芥爣绛�");
                    $(this).addClass("selected")
                }
            }), t.find(".select-industry .industry-title").on("click", ".btn", function (e) {
                e.preventDefault();
                var t = $(this).closest("dd"), i = t.find(".industry-title .ipt"), n = !1;
                if ("纭畾" == $(this).text()) {
                    var s = [], a = [];
                    t.find(".select-industry .industry-cells .selected").each(function () {
                        s.push($(this).text()), a.push($(this).attr("data-val") || $(this).text())
                    }), s.length || (s.push("涓嶉檺"), a.push("0")), t.find(".select-industry").closest("dd").find(".dropdown-select .ipt").val(s.join("路")), t.find(".select-industry").closest("dd").find('.dropdown-select input[type="hidden"]').val(a.join("路")), t.find(".select-industry").closest("dd").find(".dropdown-select").removeClass("dropdown-select-open"), t.find(".select-industry").closest("dd").find(".dropdown-menu").removeClass("dropdown-menu-open")
                } else if ("鍙栨秷" == $(this).text()) t.find(".select-industry").closest("dd").find(".dropdown-select").removeClass("dropdown-select-open"), t.find(".select-industry").closest("dd").find(".dropdown-menu").removeClass("dropdown-menu-open"); else if ($(this).hasClass("btn-addtag")) {
                    var o = Validate.getLength(i.val()), r = t.find(".select-industry .industry-title p.gray");
                    if ("" == i.val().replace(/(\s*$)/g, "")) return r.text("璇疯緭鍏ユ爣绛惧悕绉�").addClass("red"), void i.val("");
                    if (o > 6) return void r.text("璇疯緭鍏ヤ笉瓒呰繃6涓瓧鐨勬爣绛惧悕绉�").addClass("red");
                    if (t.find(".select-industry .industry-cells span").each(function () {
                        if ($(this).text() == i.val()) return void (n = !0);
                        n = !1
                    }), n) r.addClass("red").text("璇ユ爣绛惧凡瀛樺湪"); else {
                        if (t.find(".industry-cells .blank-tag").remove(), r.text("鏈€澶氬彲閫� 3 涓妧鑳芥爣绛�"), t.find(".select-industry .industry-cells .selected").length > 2) return void r.addClass("red");
                        r.removeClass("red"), t.find(".industry-cells").prepend('<span class="selected">' + i.val() + "</span>"), i.val("")
                    }
                }
            }), t.find(".ipt-autocomplete").on("input keyup", function () {
                var e = $(this);
                FormsUI.suggestTimer && clearTimeout(FormsUI.suggestTimer), FormsUI.suggestTimer = setTimeout(function () {
                    e.parent().find('input[type="hidden"]').val(""), FormsUI.getSuggest(e)
                }, 200)
            }), t.find(".suggest-complete").on("click", "li", function () {
                FormsUI.setSuggest($(this))
            }), FormsUI.initIndustry(t)
        }, initIndustry: function (e) {
            var t = e.find("input[name=industryStr]").length ? e.find("input[name=industryStr]") : e.find("input[name=industryCategory]"),
                i = e.find("input[name=industryCodes]").length ? e.find("input[name=industryCodes]") : e.find("input[name=industryCode]");
            if (t.length) {
                var n = [], s = t.val().split("路"), a = i.val().split("路");
                $.each(a, function (e, t) {
                    n.push({name: s[e], code: a[e]})
                }), t.industry({multiple: !e.find("input[name=industryCategory]").length}).data("selected", n).on("selected.industry", function (e, n) {
                    t.closest("dd").find(".tip-text").hide();
                    var s = [], a = [];
                    $.isArray(n) ? ($.each(n, function (e, t) {
                        s.push(t.name), a.push(t.code)
                    }), t.val(s.join("路")), i.val(a.join("路"))) : (t.val(n.name), i.val(n.code))
                })
            }
        }, prettyRadio: function (e) {
            var t = this, e = e || $(document);
            e && e.find(".radio-list").each(function () {
                var e = t.hasJsResumeRadioSelect($(this)), i = $(this), n = i.find('input[type="hidden"]');
                i.on("click", "label", function () {
                    $(this).hasClass("ipt-disabled") || (e ? t.notSelectRadio() : t.selectRadio(i, n, $(this)), i.find("label").removeClass("radio-checked"), $(this).addClass("radio-checked"), n.val($(this).attr("data-val")))
                })
            })
        }, notSelectRadio: function () {
            $.toast("宸插疄鍚嶈璇佺敤鎴蜂笉鍙慨鏀规€у埆", "warning")
        }, selectRadio: function (e, t, i) {
            e.find("label").removeClass("radio-checked"), i.addClass("radio-checked"), t.val(i.attr("data-val"))
        }, hasJsResumeRadioSelect: function (e) {
            return !!e.hasClass("js-resume-radio-select")
        }, dropSelect: function (e) {
            function t(e) {
                return {209: 6, 208: 5, 206: 6, 202: 5, 203: 8, 204: 5, 205: 8}[e]
            }

            function i(e) {
                return {209: 3, 208: 3, 206: 3, 202: 3, 203: 4, 204: 3, 205: 4}[e]
            }

            function n(n, s, a) {
                if (s.hasClass("ipt-range") && "start" == s.attr("data-range")) {
                    var o, r = s.closest(".form-row"), c = s.closest("dd").find(".dropdown-menu ul"),
                        l = (c.find("li").last().attr("data-val"), r.find('.ipt-range[data-range="end"]')),
                        d = l.parent().find('input[type="hidden"]'), p = l.closest("dd").find(".dropdown-menu ul"),
                        u = e.find('input[name="degree"]').val(),
                        h = parseInt(n.attr("data-val"), 10) || parseInt(n.val(), 10), f = t(u), m = h + f, g = "",
                        v = ((new Date).getFullYear(), h + i(u));
                    if (!h) return;
                    if (!u) return $.toast({type: "error", content: "璇峰厛閫夋嫨瀛﹀巻"}), !1;
                    if (1989 == h) g = '<li data-val="1989" ka="edu-end-' + o + '">1990骞翠互鍓�</li>'; else for (var o = m; o > h; o--) g += '<li data-val="' + o + '" ka="edu-end-' + o + '">' + o + "</li>";
                    p.html(g), a || (l.val(p.find("li:last").text()), d.val(p.find("li:last").attr("data-val")), l.val(v), d.val(v))
                }
            }

            function s(e, t) {
                FormsUI.appointedBlueCollarPosition.length || $.ajax({
                    type: "GET",
                    url: "/wapi/zpgeek/common/data/bluecollarposition.json",
                    dataType: "json",
                    async: !1,
                    success: function (e) {
                        0 === e.code && e.zpData && (FormsUI.appointedBlueCollarPosition = e.zpData)
                    }
                }), FormsUI.appointedBlueCollarPosition.indexOf(t) >= 0 ? (e.closest(".form-work").find("textarea[name=responsibility]").removeAttr("data-range").closest("dd").find(".tip-text").remove(), e.closest(".form-resume").find("textarea[name=responsibility]").removeClass("required").removeAttr("data-range").closest("dd").find(".tip-text").remove().end().closest("dl").find("dt").html("宸ヤ綔鍐呭锛堥€夊～锛�")) : (e.closest(".form-work").find("textarea[name=responsibility]").attr("data-range", "5,1600"), e.closest(".form-resume").find("textarea[name=responsibility]").addClass("required").attr("data-range", "5,1600").closest("dl").find("dt").html("宸ヤ綔鍐呭"))
            }

            var e = e || $(document);
            if (e) {
                var a = e.find('input[placeholder="閫夋嫨鑱屼綅绫诲瀷"], input[placeholder="鎮ㄧ殑鑱屼綅"]').next('input[name="position"]'),
                    o = a ? a.val() : "";
                if (o && s(a, o), 0 === FormsUI.eq) {
                    var r = new $.Position;
                    $(document).on("click", 'input[placeholder="閫夋嫨鏈熸湜鑱屼綅"]', function () {
                        var e = $(this), t = "undefined" != typeof isGeekIntern && isGeekIntern;
                        r.init({
                            data: t ? "/wapi/zpCommon/data/intern.json" : jobData,
                            onlyTwoLevel: t,
                            callback: function (t) {
                                e.val(t[2].name), e.next().val(t[2].code)
                            },
                            hasSearch: !0
                        })
                    }), $(document).on("click", 'input[placeholder="閫夋嫨鑱屼綅绫诲瀷"], input[placeholder="鎮ㄧ殑鑱屼綅"]', function () {
                        var e = $(this);
                        r.init({
                            data: jobData, callback: function (t) {
                                e.val(t[2].name), e.next().val(t[2].code), e.next().attr("level2", t[1].code), e.next().attr("level3", t[2].code), $('input[placeholder="閫夋嫨鎶€鑳芥爣绛�"]').val(""), $('input[placeholder="閫夋嫨鎶€鑳芥爣绛�"]').next().val(""), $(".select-tags .industry-cells").html(""), Resume.getSkillsData({
                                    p1: t[2].code,
                                    p2: t[1].code
                                }, !0), e.closest("dd").find(".tip-text").hide(), "閫夋嫨鑱屼綅绫诲瀷" == e.attr("placeholder") && e.closest(".form-row").find('input[name="positionName"]').val(t[2].name), "guide" == e.data("type") && Guide.showSugSkillTag(t[2].code), s(e, t[2].code)
                            }, hasSearch: !0
                        })
                    }), FormsUI.eq = 1
                }
                e.find(".dropdown-select").each(function () {
                    var t = $(this), i = t.find('.ipt-range[data-range="start"]'), s = t.find('input[name="highSalary"]');
                    t.on("click", function () {
                        $(this).hasClass("dropdown-disabled") || ($(this).hasClass("dropdown-select-open") || (e.find(".dropdown-select-open").removeClass("dropdown-select-open"), e.find(".dropdown-menu-open").removeClass("dropdown-menu-open")), $(this).toggleClass("dropdown-select-open"), t.next(".dropdown-menu").toggleClass("dropdown-menu-open"))
                    }), t.find('.ipt-range[data-range="end"]') && n(i, i, !0), "" == s.val() && (s.closest(".dropdown-select").addClass("dropdown-disabled"), s.closest(".dropdown-select").find(".ipt").attr("disabled", "disabled"))
                });
                var c = e.find("input[name=eduType]").siblings(".edu-type"), l = e.find("input[name=eduType]").val();
                c.length && c.find(".btn").each(function () {
                    l > 0 && (l == $(this).attr("data-val") ? $(this).attr("class", "btn btn-outline") : $(this).attr("class", "btn btn-slight")), $(this).on("click", function () {
                        $(this).hasClass("btn-slight") && ($(this).removeClass("btn-slight").addClass("btn-outline"), $(this).siblings().removeClass("btn-outline").addClass("btn-slight")), c.next().val($(this).attr("data-val"))
                    })
                }), e.find(".dropdown-menu").each(function () {
                    var t = $(this), i = t.prev(".dropdown-select"), s = i.find("input[readonly]"),
                        a = i.find('input[type="hidden"]'), o = t.find(".select-tree"), r = t.find(".tags-cells");
                    o.length && (3 == o.attr("data-level") && o.html('<ul class="tree-1"></ul><ul class="tree-2"></ul><ul class="tree-3"></ul>'), 2 == o.attr("data-level") && o.html('<ul class="tree-1"></ul><ul class="tree-2"></ul>'), FormsUI.getTreeData(o, jobData)), r.length && void 0 !== Resume && Resume.getTag(e, !0), t.on("click", "li", function () {
                        var e = $(this).parent().parent().siblings(".edu-type");
                        if (c.length && e.length && ($(this).attr("data-val") <= 205 ? ($(c).removeClass("hide"), $(c.find(".btn")[0]).attr("class", "btn btn-outline"), $(c.find(".btn")[1]).attr("class", "btn btn-slight"), c.next().val(1)) : ($(c).hasClass("hide") || $(c).addClass("hide"), $(c.find(".btn")[0]).attr("class", "btn btn-outline"), $(c.find(".btn")[1]).attr("class", "btn btn-slight"), c.next().val(""))), $(this).closest(".select-tree").length) {
                            var r = $(this).closest(".select-tree").attr("data-level");
                            if ($(this).parent().find("li").removeClass("selected"), $(this).addClass("selected"), 3 == r) {
                                if ($(this).closest(".tree-1").length) return $(this).closest(".select-tree").find(".tree-3").hide(), FormsUI.getTreeData(o, jobData, $(this).attr("data-id")), !1;
                                if ($(this).closest(".tree-2").length) return $(this).closest(".select-tree").find(".tree-3").show(), a.attr("level2", $(this).attr("data-id")), FormsUI.getTreeData(o, jobData, $(this).closest(".select-tree").find(".tree-1 .selected").attr("data-id"), $(this).attr("data-id")), !1
                            }
                            if (2 == r) {
                                if ($(this).closest(".tree-1").length) return $(this).closest(".select-tree").find(".tree-3").hide(), FormsUI.getTreeData(o, jobData, $(this).attr("data-id")), !1;
                                if ($(this).closest(".tree-2").length) return $(this).closest(".select-tree").find(".tree-3").show(), a.attr("level2", $(this).attr("data-id")), FormsUI.getTreeData(o, jobData, $(this).closest(".select-tree").find(".tree-1 .selected").attr("data-id"), $(this).attr("data-id")), !1
                            }
                        }
                        if (n($(this), s), s.val($(this).text()), void 0 !== $(this).data("val") && a.val($(this).attr("data-val")), a.closest("dd").find(".tip-text").remove(), t.removeClass("dropdown-menu-open"), i.removeClass("dropdown-select-open"), "position" == a.attr("name")) {
                            var l = $(this).closest(".form-resume").find(".select-tags");
                            l.closest("dd").find(".ipt").val(""), l.closest("dd").find('input[type="hidden"]').val(""), Resume.getTag(l.closest(".form-resume"))
                        }
                        if ("position" == a.attr("name") && $(this).closest(".form-work")) {
                            var l = $(this).closest(".form-work").find(".select-tags");
                            l.closest("dd").find(".ipt").val(""), l.closest("dd").find('input[type="hidden"]').val(""), Resume.getTag(l.closest(".form-work"))
                        }
                    })
                }), $(document).on("click", function (t) {
                    $(t.target).closest(".dropdown-menu").length || $(t.target).closest(".dropdown-select").length || (e.find(".dropdown-select").removeClass("dropdown-select-open"), e.find(".dropdown-menu").removeClass("dropdown-menu-open"))
                })
            }
        }, getTreeData: function (e, t, i, n) {
            var s, a, o, r = "", c = "", l = "";
            for (s = 0; s < t.length; s++) {
                var d = t[s].children;
                if (r += '<li data-id="' + t[s].id + '">' + t[s].name + "</li>", d && i && t[s].id == i) for (a = 0; a < d.length; a++) {
                    var p = d[a].children;
                    if (c += '<li data-id="' + d[a].id + '">' + d[a].name + "</li>", p && n && d[a].id == n) for (o = 0; o < p.length; o++) l += '<li data-val="' + p[o].id + '">' + p[o].name + "</li>"
                }
            }
            i || (e.find(".tree-1").html(r), e.find(".tree-2").html('<li class="blank">閫夋嫨鑱岀被</li>')), n ? e.find(".tree-3").html(l) : i && e.find(".tree-2").html(c)
        }, setMinSlary: function () {
            var e = Salary.min(), t = '<li data-val="闈㈣">闈㈣</li>';
            $.each(e, function (e, i) {
                t += '<li data-val="' + i + '">' + i + "K</li>"
            }), FormsUI.formEl.find(".start-salary .dropdown-menu ul").html(t), FormsUI.changeSalary(FormsUI.formEl.find("input[name=lowSalary]").val(), !0)
        }, changeSalary: function (e, t) {
            if (e) {
                var i = $(".end-salary"), n = i.find(".ipt"), s = i.find('input[type="hidden"]'), a = i.find("ul"), e = e,
                    o = 0;
                if (e && (n.closest(".dropdown-select").removeClass("dropdown-disabled").parent().parent().find(".range-devide").show(), n.removeAttr("disabled")), "闈㈣" == e) n.val("闈㈣").parent().hide().parent().parent().find(".range-devide").hide(), s.val("闈㈣"); else {
                    e = parseInt(e, 10), n.val(n.val() + "K").parent().show();
                    var r = Salary.max(parseInt(e, 10)), c = "";
                    $.each(r, function (e, t) {
                        c += '<li data-val="' + t + '">' + t + "K</li>"
                    }), a.html(c), o = r[0]
                }
                t && 0 == e && 0 == s.val() && n.parent().hide(), t || (n.val(o + "K"), s.val(o))
            }
        }, getSuggest: function (el) {
            var el = el, url = el.attr("data-url"), keyword = el.val(),
                resultPannel = el.parent().find(".suggest-complete");
            if ("" == keyword) return void resultPannel.removeClass("dropdown-menu-open");
            resultPannel.html("<ul></ul>").addClass("dropdown-menu");
            var resultCon = resultPannel.find("ul");
            $.ajax({
                type: "POST", url: url, dataType: "JSON", data: {query: keyword}, success: function (result) {
                    var result = result.data, str = "", i;
                    if ("string" == typeof result && (result = eval("(" + result + ")")), result && result.length) {
                        for (i = 0; i < result.length; i++) str += '<li data-val="' + result[i].code + '">' + (result[i].country ? '<span class="ignore">' + result[i].country + "</span>" : "") + result[i].hlname + "</li>";
                        resultCon.html(str), resultPannel.addClass("dropdown-menu-open")
                    }
                }, error: function (e) {
                }
            })
        }, setSuggest: function (e) {
            var t = e.closest("dd").find(".ipt"), i = e.closest("dd").find('input[name="location"]'),
                n = e.closest("dd").find('input[type="hidden"]'), s = e.clone();
            s.find(".ignore").remove(), t.val(s.text()), i.val(e.attr("data-val")), n.val(e.attr("data-val")), e.closest(".suggest-complete").removeClass("dropdown-menu-open"), t.parent().find(".tip-text").remove()
        }
    }
;$(function () {
    ($(".resume").length || $(".job-detail").length) && FormsUI.init()
});
var ResumeEditor = {
    init: function () {
    }
}, Resume = {
    ownerTags: [], skillsData: [], formStatus: !1, parserId: "", init: function () {
        if (0 != $(".progress-score").length) {
            var e = $(".progress-score").text();
            $(".progress p").css("width", e)
        }
        Resume.canSubmit = !1, $(".resume-item").on("click", ".link-add", function (e) {
            Resume.getData($(this)), e.preventDefault()
        }), $(".resume-item:not('#resume-history,#resume-userinfo')").on("click", ".userinfo-con, .summary-con, .purpose-list>li, .history-project>li, .social-account>li", function (e) {
            Resume.getData($(this).find(".link-edit"))
        }), $("#resume-history").on("click", ".userinfo-con, .summary-con, .purpose-list>li, .history-project>li .item-form-list, .social-account>li", function (e) {
            return Resume.bookJobData($(this).find(".link-edit")), !1
        }), $(".resume-item").on("click", ".link-delete", function (e) {
            Resume.removeData($(this)), e.preventDefault(), e.stopPropagation()
        }), $("#resume-userinfo").on("click", ".link-edit", function (e) {
            Resume.getData($(this)), e.preventDefault(), e.stopPropagation()
        }), $(".resume-nav .link-edit").on("click", function (e) {
            var t = $(this).attr("data-target");
            Resume.getData($("#" + t).find(".link-edit")), e.preventDefault()
        }), $(".resume-nav .link-add").on("click", function (e) {
            var t = $(this).attr("data-target");
            Resume.getData($("#" + t).find(".link-add")), e.preventDefault()
        }), $(".prv-view-btn").on("click", function () {
            Resume.showPreviewResume()
        }), "undefined" != typeof editItem && (1 == editItem ? $("#resume-purpose .link-add").click() : 2 == editItem && $(".userinfo-con").click());
        Resume.isShowResumeAnalyzeTools(!0), $(document).on("click", ".paddingTop60 .go-detail", function () {
            $.ajax({
                url: "/wapi/zpgeek/resume/parser/querybar.json",
                type: "get",
                dataType: "json",
                success: function (e) {
                    e.zpData && e.zpData.showType && 1 === e.zpData.showType ? window.location.href = "/web/geek/resumeAnalyze?parserId=" + Resume.parserId : $.toast({
                        content: "瀵瑰簲闄勪欢宸茶鍒犻櫎",
                        type: "error"
                    })
                },
                error: function (e) {
                    $.toast({content: e.message, type: "error"})
                }
            })
        }), $(document).on("click", ".paddingTop60 .close", function () {
            $.ajax({
                url: "/wapi/zpgeek/resume/parser/closebar.json",
                type: "post",
                dataType: "json",
                success: function (e) {
                    0 === e.code && ($(".resume-analyze-tools").remove(), $(".resume").removeClass("paddingTop60"))
                },
                error: function (e) {
                    $.toast({content: e.message, type: "error"})
                }
            })
        })
    }, isShowResumeAnalyzeTools: function (e) {
        var t = !1;
        return $.ajax({
            url: "/wapi/zpgeek/resume/parser/querybar.json",
            type: "get",
            dataType: "json",
            success: function (i) {
                if (i.zpData && i.zpData.showType && 1 === i.zpData.showType) {
                    var n = i.zpData.parserId, s = i.zpData.resumeName;
                    Resume.parserId = n, Resume.showResumeAnalyzeTools(s), t = !0;
                    try {
                        _T.sendEvent("to_resume_expose")
                    } catch (e) {
                    }
                } else e && Resume.badResume()
            },
            error: function (t) {
                $.toast({content: t.message, type: "error"}), e && Resume.badResume()
            }
        }), t
    }, showResumeAnalyzeTools: function (e) {
        var t = "宸蹭负鎮ㄨВ鏋愪簡闄勪欢銆�" + e + "銆戠殑鍐呭锛屾偍鍙皢瑙ｆ瀽缁撴灉琛ュ厖鍒板湪绾跨畝鍘嗕腑",
            i = '<div class="resume-analyze-tools"><p><span class="name-text">' + t + '</span><span class="go-detail" ka="to_resume_click">鍘绘煡鐪�</span></p><p class="close" ka="to_resume_cancel"></p></div>';
        $(".resume").addClass("paddingTop60"), $(".paddingTop60").append(i)
    }, showPreviewResume: function () {
        $.dialog({
            title: "",
            content: '<div class="frame-preview-resume"><iframe src="/geek/resume/preview"></iframe></div>',
            closeText: !0,
            confirmText: "",
            cancelText: "",
            wrapClass: "dialog-layer-full dialog-resume-full",
            lock: !0,
            onOpen: function (e) {
                $("body").css("overflow", "hidden")
            },
            onClose: function () {
                $("body").css("overflow", "visible")
            }
        })
    }, unique: function (e, t) {
        if (e.length < 2) return [e[0]] || [];
        for (var i = {}, n = [], s = 0; s < e.length; s++) {
            var a = e[s], o = !!t && typeof i[a] != typeof a;
            (void 0 === i[a] || o) && (i[a] = a, n.push(a))
        }
        return n
    }, selectMajorInit: function () {
        $(".dropmajor").suggestion({
            onRequest: function (e, t) {
                if (!e) return void t("");
                $.ajax({
                    url: "/autocomplete/major.json",
                    data: {query: e || ""},
                    type: "get",
                    dataType: "json",
                    success: function (e) {
                        if (e && e.data instanceof Array) {
                            var i = e.data.map(function (e) {
                                return "<li data-code=" + e.id + ">" + e.hlname + "</li>"
                            }).join("");
                            t(i)
                        }
                    }
                })
            }, onChecked: function (e, t) {
                if (e && e.length) {
                    var i = $(".dropmajor").find(".suggestion-ipt").val(e.text());
                    Validate.check(i, !1, null)
                }
            }
        })
    }, selectSchoolInit: function () {
        $(".dropschool").suggestion({
            onRequest: function (e, t) {
                if (!e) return void t("");
                $.ajax({
                    url: "/autocomplete/school.json",
                    data: {query: e || ""},
                    type: "get",
                    dataType: "json",
                    success: function (e) {
                        if (e && e.data instanceof Array) {
                            var i = e.data.map(function (e) {
                                return "<li data-code=" + e.code + "><i>" + e.country + "</i><em>" + e.hlname + "</em></li>"
                            }).join("");
                            t(i)
                        }
                    }
                })
            }, onChecked: function (e, t) {
                if (e && e.length) {
                    var i = $(".dropschool").find(".suggestion-ipt").val(e.find("em").text());
                    $(".dropschool").find("input[type=hidden]").val(e.data("code")), Validate.check(i, !1, null)
                }
            }
        })
    }, eduTypeInit: function (e) {
        var t = e.find("input[name=degree]").val(), i = e.find(".edu-type"), n = i.find("input[name=eduType]").val();
        t <= 205 && (i.removeClass("hide"), i.find(".btn").each(function (e, t) {
            $(this).attr("data-val") == n && ($(this).removeClass("btn-slight").addClass("btn-outline"), $(this).siblings().removeClass("btn-outline").addClass("btn-slight")), $(this).on("click", function () {
                $(this).hasClass("btn-slight") && ($(this).removeClass("btn-slight").addClass("btn-outline"), $(this).siblings().removeClass("btn-outline").addClass("btn-slight")), i.find("input[name=eduType]").val($(this).attr("data-val"))
            })
        })), e.find('input[name="degree"]').closest("dd").find(".dropdown-menu li").on("click", function () {
            $(this).attr("data-val") <= 205 ? (i.removeClass("hide"), $(i.find(".btn")[0]).attr("class", "btn btn-outline"), $(i.find(".btn")[1]).attr("class", "btn btn-slight"), i.find("input[name=eduType]").val("1")) : (i.hasClass("hide") || i.addClass("hide"), $(i.find(".btn")[0]).attr("class", "btn btn-outline"), $(i.find(".btn")[1]).attr("class", "btn btn-slight"), i.find("input[name=eduType]").val(""))
        })
    }, selectCompanyInit: function (e) {
        $(".dropcompany").suggestion({
            onRequest: function (e, t) {
                if (!e) return void t("");
                $.ajax({
                    url: "/wapi/zpgeek/autocomplete/company.json",
                    data: {query: e || ""},
                    type: "get",
                    dataType: "json",
                    success: function (e) {
                        var e = e.zpData.data;
                        if (e && e instanceof Array) {
                            var i = e.map(function (e) {
                                return "<li data-code=" + e.id + ">" + e.hlname + "</li>"
                            }).join("");
                            t(i)
                        }
                    }
                })
            }, onChecked: function (t, i) {
                if (t && t.length) {
                    var n = $(".dropcompany").find(".suggestion-ipt").val(t.text());
                    e && e(t.data("code")), Validate.check(n, !1, null)
                }
            }
        })
    }, getCompanyIndustry: function (e, t) {
        $.ajax({
            url: "/autocomplete/industry.json",
            data: {comId: e},
            type: "get",
            dataType: "json",
            success: function (e) {
                1 == e.rescode && (t.find('input[name="industryCategory"]').val(e.data.name), t.find('input[name="industryCode"]').val(e.data.code || ""))
            }
        })
    }, selectCityInit: function () {
        var e = $('[name="locationName"]').val(), t = $('[name="location"]').val();
        $(".dropcity").citySelector({
            onLocation: function (e, t) {
                Resume.autoLocation = e.name;
                var i = $(this), n = i.find(".suggestion-ipt");
                e.name && !n.val() && (n.val(e.name).next().val(e.code), i.addClass("auto-location"), n.on("focus", function () {
                    i.removeClass("auto-location")
                }))
            }, onChecked: function (i, n) {
                i && i.length && (e = i.data("name"), t = i.data("code")), $('[name="locationName"]', n).val(e), $('[name="location"]', n).val(t)
            }
        })
    }, renderSkills: function (e) {
        var t, e = e, i = "";
        if (Resume.owerSkillData && Resume.owerSkillData.length && (e = Resume.unique(e.concat(Resume.owerSkillData))), e.length) {
            for (t = 0; t < e.length; t++) i += "<li><span>" + e[t] + "</span></li>";
            Resume.tagsPannel.find("ul").html(i)
        } else Resume.tagsPannel.find("ul").html('<div class="empty">杈撳叆鏍囩鍚嶇О锛屾寜鍥炶溅娣诲姞</div>')
    }, getLength: function (e) {
        for (var t = 0, e = e.replace(/(^[\s\n\r]*)|([\s\n\r]*$)/g, ""), i = e.length, n = -1, s = 0; s < i; s++) n = e.charCodeAt(s), t += n > 255 ? 1 : .5;
        return Math.ceil(t)
    }, listenSkills: function () {
        Resume.skillsContainer = $(".dropdown-skills"), Resume.tagsPannel = Resume.skillsContainer.find(".skills-pannel");
        var e = $(".ipt-tagsinput"), t = [];
        e.length && (e.removeAttr("readonly"), "" != e.val() && (t = e.val().split("路"), e.val(t.join(",")), Resume.owerSkillData = t), e.tagsinput({
            tagClass: "",
            maxTags: 3,
            confirmKeys: [13],
            addOnBlur: !1,
            itemText: function (e) {
                return this.itemValue(e)
            },
            typeahead: {
                autoSelect: !1,
                source: function (e) {
                    return Resume.unique(Resume.skillsData.concat(t))
                },
                menu: '<div class="result-selecter"></div>',
                appendTo: $(".dropdown-skills .dropdown-menu"),
                emptyItem: !0,
                afterSelect: function (e) {
                    this.$element.val(""), Resume.tagsPannel.show(), Resume.skillsContainer.addClass("dropdown-menu-open"), Resume.skillsContainer.find(".result-selecter").hide()
                }
            },
            listTags: ".dropdown-skills .skills-pannel, .work-skill-tips",
            showListTags: function (e, t) {
                t.options.maxTags && t.itemsArray.length >= t.options.maxTags && Resume.skillsContainer.removeClass("dropdown-menu-open")
            }
        }), Resume.skillsContainer.find(".dropdown-select .tag").length > 2 && Resume.skillsContainer.find(".bootstrap-tagsinput input").attr("placeholder", "").css("width", "60px"), e.on("itemAdded", function (t) {
            var i = !0, n = !1, s = t.item.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            if (Resume.getLength(s) > 6 && (n = !0), Resume.tagsPannel.find("li").each(function () {
                $(this).text() == s && (i = !1, n = !1)
            }), n && (Resume.skillsContainer.find(".bootstrap-tagsinput .tag:last").find('span[data-role="remove"]').click(), Validate.showError(e, "鏈€澶氬厑璁歌緭鍏�6涓腑鏂囧瓧绗�")), i && !n && (Resume.tagsPannel.find("div.empty").remove(), Resume.tagsPannel.find("ul").append("<li><span>" + s + "</span></li>"), Resume.tagsPannel.show(), Resume.skillsContainer.find(".result-selecter").hide(), Resume.skillsData = Resume.unique(Resume.skillsData), Resume.skillsData.push(s)), !n) {
                return Resume.skillsContainer.find("input").last().val($(this).val().split(",").join("路")), Validate.hideError(e), void (Resume.skillsContainer.find(".dropdown-select .tag").length > 2 && Resume.skillsContainer.find(".bootstrap-tagsinput input").attr("placeholder", "").css("width", "60px"))
            }
            Resume.skillsContainer.find(".bootstrap-tagsinput input").css("width", "130px")
        }), e.on("itemRemoved", function (e) {
            Resume.skillsContainer.find(".result-selecter").hide(), Resume.skillsContainer.find("input").last().val($(this).val().split(",").join("路")), Resume.skillsContainer.find(".dropdown-select .tag").length || Resume.skillsContainer.find(".bootstrap-tagsinput input").attr("placeholder", "閫夋嫨鎴栬緭鍏ユ妧鑳芥爣绛�").css("width", "130px"), setTimeout(function () {
                Resume.tagsPannel.parent().addClass("dropdown-menu-open")
            }, 0)
        }), Resume.skillsContainer.find(".dropdown-select .bootstrap-tagsinput input").attr("maxLength", "12"), Resume.tagsPannel.on("click", "li", function () {
            return !1
        }))
    }, getSkillsData: function (e, t) {
        $.ajax({
            url: "/common/data/positionSkill",
            type: "GET",
            data: {positonLv2: e.p2, position: e.p1},
            dataType: "JSON",
            timeout: 3e4,
            success: function (e) {
                Resume.skillsData = e || [], Resume.renderSkills(e), $(".dropdown-skills .dropdown-select").css("pointer-events", "auto"), t && Resume.skillsContainer.find('.tag span[data-role="remove"]').trigger("click")
            }
        })
    }, getSkillsData: function (e, t) {
        $.ajax({
            url: "/wapi/zpCommon/data/positionSkill",
            type: "GET",
            data: {positonLv2: e.p2, position: e.p1},
            dataType: "JSON",
            timeout: 3e4,
            success: function (e) {
                Resume.skillsData = e.zpData || [], Resume.renderSkills(e.zpData), $(".dropdown-skills .dropdown-select").css("pointer-events", "auto"), t && Resume.skillsContainer.find('.tag span[data-role="remove"]').trigger("click")
            }
        })
    }, getTag: function (e, t) {
        var i = e, n = i.find(".tags-cells"), s = "", a = "",
            o = (n.closest("dd").find(".ipt"), i.find('input[name="position"]').attr("level2")),
            r = i.find('input[name="position"]').attr("level3");
        o && $.ajax({
            type: "GET",
            url: " /wapi/zpCommon/data/positionSkill",
            dataType: "JSON",
            data: {positonLv2: o, position: r},
            success: function (e) {
                var i, e = e.zpData, o = "", r = n.closest("dd").find(".ipt").val().split("路"), c = [];
                if (e.length > 0) {
                    for (i = 0; i < e.length; i++) o = $.inArray(e[i], r) > -1 ? ' class="selected"' : "", a += "<span" + o + ' ka="tag-' + e[i] + '">' + e[i] + "</span>", c.push(e[i]);
                    if (t) for (var l = 0; l < r.length; l++) -1 == $.inArray(r[l], c) && (Resume.ownerTags.push(r[l]), s += '<span class="selected" ka="tag-' + r[l] + '">' + r[l] + "</span>")
                } else a = '<div class="blank-tag">杩樻湭娣诲姞鏍囩</div>';
                n.html(s + a)
            },
            error: function (e) {
            }
        })
    }, getFormStatus: function (e) {
        $.dialog({
            content: '<div class="tip-text">閫€鍑虹紪杈戝悗锛屾洿鏂扮殑鍐呭涓嶄細鑷姩淇濆瓨</div>',
            title: "鏈夊唴瀹规病鏈変繚瀛橈紝纭畾閫€鍑虹紪杈戝悧锛�",
            type: "warning",
            closeText: !0,
            confirmText: "纭畾",
            cancelText: "鍙栨秷",
            onConfirm: function (t) {
                e(), t.remove()
            },
            error: function () {
            }
        })
    }, bookJobData: function (e) {
        var t = this;
        ($(".resume-item").hasClass("resume-item-open") || $(".resume-item").hasClass("resume-list-wrap-open")) && t.formStatus ? t.getFormStatus(function () {
            $("#resume-history").find(".edit-form-list").html("").end().find(".item-form").html(""), $(".resume-item").removeClass("resume-item-open").siblings(".resume-item").removeClass(".resume-item-open").removeClass(".resume-list-wrap-open"), e.hasClass("link-add") ? t.getDataShow(e) : t.EditDataForm(e), t.formStatus = !1
        }) : ($("#resume-history").find(".edit-form-list").html("").end().find(".item-form").html(""), e.hasClass("link-add") ? t.getDataShow(e) : t.EditDataForm(e))
    }, getData: function (e) {
        var t = this;
        ($(".resume-item").hasClass("resume-item-open") || $(".resume-item").hasClass("resume-list-wrap-open")) && t.formStatus ? t.getFormStatus(function () {
            t.getDataShow(e), t.formStatus = !1
        }) : t.getDataShow(e)
    }, EditDataForm: function (el) {
        var self = this, el = el, url = el.data("url"), nowResumeItem = el.closest("li"),
            formCon = nowResumeItem.find(".edit-form-list"), moduleName = nowResumeItem.attr("id");
        $(".resume-item").attr("class", "resume-item"), el.closest(".resume-item").addClass("resume-list-wrap-open"), nowResumeItem.removeClass("resume-list-open").siblings("li").removeClass("resume-list-open"), $.ajax({
            type: "POST", url: url, dataType: "JSON", data: null, success: function (result) {
                var result = result;
                if ("string" == typeof result && (result = eval("(" + result + ")")), 1 == result.rescode) {
                    formCon.html(result.html), formCon = nowResumeItem.find(".edit-form-list"), nowResumeItem.addClass("resume-list-open"), formCon.find(".form-btns .btn-back").on("click", function (e) {
                        return el.closest(".resume-item").removeClass("resume-list-wrap-open"), nowResumeItem.removeClass("resume-list-open"), $("html,body").animate({scrollTop: nowResumeItem.offset().top + "px"}, 500), !1
                    }), formCon.find(".form-btns .btn-delete").unbind("click").on("click", function (e) {
                        Resume.removeData(el, $(this)), e.preventDefault()
                    });
                    var isAdd = !1;
                    if (result.resoper || (isAdd = !0), FormsUI.init(formCon.find("form"), isAdd), Validate.init(formCon.find("form"), isAdd), PlaceholderCheck.init(formCon.find("form")), $(".ipt-workyear").length && $(".ipt-workyear").workstartpicker(), formCon.find(".dropcity").length && (formCon.find(".dropcity .dropdown-select").off("click"), Resume.selectCityInit()), formCon.find(".dropdown-skills").length) {
                        Resume.listenSkills();
                        var $position = formCon.find('input[name="position"]'), p2 = $position.attr("level2"),
                            p1 = $position.attr("level3");
                        p1 && p2 && Resume.getSkillsData({p1: p1, p2: p2});
                        var $position = formCon.find('input[name="position"]');
                        $position.val() || (formCon.find(".dropdown-skills .dropdown-select").css("pointer-events", "none"), Resume.skillsContainer.on("click", function () {
                            $position.val() || Validate.showError(formCon.find('input[name="position"]'), "璇峰厛閫夋嫨鑱屼綅绫诲瀷")
                        }))
                    }
                    formCon.find(".dropcompany").length && Resume.selectCompanyInit(function (e) {
                        Resume.getCompanyIndustry(e, formCon)
                    }), formCon.find(".dropschool").length && (Resume.selectSchoolInit(), Resume.selectMajorInit()), formCon.find(".serial-toolbar").length && $(".serial-area", formCon).textarealist(), "resume-userinfo" == moduleName && Resume.userinfoEvtInit(formCon), formCon.find("form").find("input,textarea").on("focus", function () {
                        self.formStatus = !0
                    })
                } else Resume.showError(result.resmsg);
                $("html,body").animate({scrollTop: formCon.offset().top + "px"}, 500), $(".ipt-workyear").length && $(".ipt-workyear").workstartpicker()
            }, error: function (e) {
                Resume.showError()
            }
        })
    }, getDataShow: function (el) {
        var self = this, el = el, url = el.data("url"), nowResumeItem = el.closest(".resume-item"),
            formCon = nowResumeItem.find(".item-form"), moduleName = nowResumeItem.attr("id");
        $(".resume-item").attr("class", "resume-item"), $.ajax({
            type: "POST", url: url, dataType: "JSON", data: null, success: function (result) {
                var result = result;
                if ("string" == typeof result && (result = eval("(" + result + ")")), 1 == result.rescode) {
                    formCon.html(result.html), nowResumeItem.addClass("resume-item-open"), formCon.find(".form-btns .btn-back").on("click", function () {
                        nowResumeItem.removeClass("resume-item-open"), $("html,body").animate({scrollTop: nowResumeItem.offset().top + "px"}, 500)
                    }), formCon.find(".form-btns .btn-delete").unbind("click").on("click", function (e) {
                        Resume.removeData(el, $(this)), e.preventDefault()
                    });
                    var isAdd = !1;
                    if (result.resoper || (isAdd = !0), FormsUI.init(formCon.find("form"), isAdd), Validate.init(formCon.find("form"), isAdd), PlaceholderCheck.init(formCon.find("form")), $(".ipt-workyear").length && $(".ipt-workyear").workstartpicker(), formCon.find(".dropcity").length && (formCon.find(".dropcity .dropdown-select").off("click"), Resume.selectCityInit()), formCon.find(".dropdown-skills").length) {
                        Resume.listenSkills();
                        var $position = formCon.find('input[name="position"]'), p2 = $position.attr("level2"),
                            p1 = $position.attr("level3");
                        p1 && p2 && Resume.getSkillsData({p1: p1, p2: p2});
                        var $position = formCon.find('input[name="position"]');
                        $position.val() || (formCon.find(".dropdown-skills .dropdown-select").css("pointer-events", "none"), Resume.skillsContainer.on("click", function () {
                            $position.val() || Validate.showError(formCon.find('input[name="position"]'), "璇峰厛閫夋嫨鑱屼綅绫诲瀷")
                        }))
                    }
                    formCon.find(".dropcompany").length && Resume.selectCompanyInit(function (e) {
                        Resume.getCompanyIndustry(e, formCon)
                    }), formCon.find(".dropschool").length && (Resume.selectSchoolInit(), Resume.selectMajorInit(), Resume.eduTypeInit(formCon)), formCon.find(".serial-toolbar").length && $(".serial-area", formCon).textarealist(), "resume-userinfo" == moduleName && Resume.userinfoEvtInit(formCon), formCon.find("form").find("input,textarea").on("focus", function () {
                        self.formStatus = !0
                    })
                } else Resume.showError(result.resmsg);
                $("html,body").animate({scrollTop: formCon.offset().top + "px"}, 500), $(".ipt-workyear").length && $(".ipt-workyear").workstartpicker()
            }, error: function (e) {
                Resume.showError()
            }
        })
    }, userinfoEvtInit: function (e) {
        $("dl", e).on("mouseenter", function () {
            $(this).find(".tip-text-hover").show()
        }).on("mouseleave", function () {
            $(this).find(".tip-text-hover").hide()
        }).on("click", ".name-tip li", function () {
            $(this).closest(".tip-text-hover").hide()
        }).on("click", ".radio-square", function () {
            if (!$(this).hasClass("ipt-disabled")) {
                var t = $("#resume-userinfo .name-tip ul li:last strong"), i = t.html(),
                    n = i.substr(0, i.length - 2) + (1 == $(this).data("val") ? "鍏堢敓" : "濂冲＋");
                t.html(n), 1 == $(".name-tip input:checked").val() && $('input[name="name"]', e).prev().val(n)
            }
        }).on("change", ".name-tip input", function () {
            var e = $(this).parent().find("strong").text();
            $(this).closest("dd").find(".ipt:first").val(e)
        }), $('input[name="name"]', e).prev().on("change", function () {
            $(this).next().val($(this).val())
        })
    }, postData: function (form, isAdd) {
        var formEl = form, url = formEl.attr("action"), primaryWrap = formEl.closest(".resume-item"),
            primaryCon = primaryWrap.find(".item-primary"), primaryModule = primaryWrap.attr("id"),
            submitBtn = formEl.find("button[type=submit]");
        formEl.find(".show-prefix-today").length && (formEl.find('input[name="endDate"]').val(""), formEl.find('input[name="now"]').val("1"));
        var subData = formEl.serialize();
        $("input[name=birthday]").length && $("input[name=birthday]").is(":disabled") && (subData += "&birthday=" + $("input[name=birthday]").val()), submitBtn.addClass("btn-disabled"), $.ajax({
            type: "POST", url: url, dataType: "JSON", data: subData, success: function (result) {
                var result = result, str = "", resultId = "", itemEl;
                if ("string" == typeof result && (result = eval("(" + result + ")")), result.forceFace && (alert("鎮ㄧ殑璐﹀彿褰撳墠澶勪簬涓嶅彲浣跨敤鐘舵€侊紝璇风櫥褰旴OSS鐩磋仒鎵嬫満APP鏌ョ湅璇︽儏"), window.location.href = "/logout/"), 1 == result.rescode) {
                    if (primaryWrap.removeClass("resume-item-open"), str = result.html, resultId = $(str).attr("id"), "resume-userinfo" == primaryModule) if (primaryCon.find(".userinfo-con").html(str), result.isAudit) $.dialog({
                        content: '<div class="tip-text">淇敼宸叉彁浜ゅ鏍革紝瀹℃牳閫氳繃鍚庯紝灏嗘洿鏂版偍鐨勪俊鎭�</div>',
                        title: "娓╅Θ鎻愮ず",
                        closeText: !0,
                        type: "warning",
                        confirmText: "鍏抽棴",
                        cancelText: "",
                        onConfirm: function (e) {
                            e.remove()
                        }
                    }); else {
                        var $resumeHistory = $("#resume-history");
                        "0" == formEl.find('input[name="startWorkYearCode"]').val() ? ($resumeHistory.find("h3.title").html("瀹炰範缁忓巻").next().attr("data-role", "practice"), $resumeHistory.find(".link-add").html('<i class="iboss-tianjia"></i><span>娣诲姞</span>'), $resumeHistory.find(".link-delete").show()) : ($resumeHistory.find("h3.title").html("宸ヤ綔缁忓巻").next().attr("data-role", ""), $resumeHistory.find(".link-add").html('<i class="iboss-tianjia"></i><span>娣诲姞</span>'), $resumeHistory.find(".history-project li").length < 2 && $resumeHistory.find(".link-delete").hide())
                    }
                    if ("resume-summary" == primaryModule && (primaryCon.find(".text p").remove(), primaryCon.find(".text").prepend(str)), "resume-purpose" == primaryModule && (primaryWrap.find('li[id="' + resultId + '"]').length ? primaryWrap.find('li[id="' + resultId + '"]').after(str).remove() : (primaryCon.find(".purpose-list").append(str), primaryWrap.find(".purpose-list li").length > 1 && primaryWrap.find(".purpose-list .link-delete").show(), primaryWrap.find(".purpose-list li").length > 2 && primaryWrap.find(".link-add").hide())), "resume-history" == primaryModule || "resume-project" == primaryModule || "resume-education" == primaryModule || "resume-volunteer" == primaryModule) {
                        var limitLength = 0;
                        "resume-education" != primaryModule && "resume-volunteer" !== primaryModule && "resume-history" != primaryModule || (limitLength = 10), "resume-project" == primaryModule && (limitLength = 15), isAdd ? (Resume.rankHistoryItem(primaryCon.find(".history-project"), result.html), (primaryCon.find(".history-project li").length > 1 || "practice" == primaryCon.find(".history-project").data("role")) && primaryWrap.find(".history-project .link-delete").show(), primaryCon.find(".history-project li").length > limitLength - 1 && primaryCon.find(".link-add").hide()) : (primaryCon.find('li[id="' + resultId + '"]').remove(), Resume.rankHistoryItem(primaryCon.find(".history-project"), result.html))
                    }
                    "resume-social" == primaryModule && (primaryCon.find('li[id="' + resultId + '"]').length ? primaryCon.find('li[id="' + resultId + '"]').after(str).remove() : (primaryCon.find(".social-account").append(str), primaryCon.find("ul li").length > 2 && primaryCon.find(".link-add").hide())), $("html,body").animate({scrollTop: primaryWrap.offset().top + "px"}, 500)
                } else result.bizcode ? 1156 == result.bizcode ? Resume.showError("宸ヤ綔缁忓巻鏁伴噺宸茶揪涓婇檺锛屽彲鍒犻櫎閮ㄥ垎缁忓巻鍐嶆坊鍔�") : 1157 == result.bizcode ? Resume.showError("鏁欒偛缁忓巻鏁伴噺宸茶揪涓婇檺锛屽彲鍒犻櫎閮ㄥ垎缁忓巻鍐嶆坊鍔�") : 1158 == result.bizcode && Resume.showError("椤圭洰缁忛獙鏁伴噺宸茶揪涓婇檺锛屽彲鍒犻櫎閮ㄥ垎缁忓巻鍐嶆坊鍔�") : Resume.showError(result.resmsg);
                submitBtn.removeClass("btn-disabled"), Resume.canSubmit = !0
            }, error: function () {
                submitBtn.removeClass("btn-disabled"), Resume.canSubmit = !0, Resume.showError()
            }
        }), Resume.canSubmit = !1
    }, transformPeriod: function (e) {
        return "鑷充粖" == e[1] ? e[1] = 9999 : "1990浠ュ墠" == e[1] && (e[1] = 1e3), "1990浠ュ墠" == e[0] && (e[0] = 1e3), e
    }, rankHistoryItem: function (e, t) {
        var i = [];
        e.find(".period").each(function (e, t) {
            if (t.innerHTML) {
                var n = t.innerHTML.split("-");
                i.push(Resume.transformPeriod(n))
            }
        });
        var n = $(t).find(".period").html();
        n && (n = n.split("-"), n = Resume.transformPeriod(n));
        for (var s = !0, a = 0; a < i.length; a++) {
            if (n[1] > i[a][1]) {
                e.find("li").eq(a).before(t), s = !1;
                break
            }
            if (n[1] == i[a][1] && n[0] > i[a][0]) {
                e.find("li").eq(a).before(t), s = !1;
                break
            }
        }
        s && e.append(t)
    }, removeData: function (el, btn) {
        var el = el, url = el.attr("data-url"), primaryWrap = el.closest(".resume-item"),
            primaryCon = primaryWrap.find(".item-primary"), primaryModule = primaryWrap.attr("id"),
            formCon = el.closest(".resume-item").find(".item-form");
        btn && (url = btn.attr("data-url")), $.dialog({
            content: '<div class="tip-text">鍒犻櫎鍚庝笉鍙仮澶嶏紝纭鍒犻櫎鍚楋紵</div>',
            title: "娓╅Θ鎻愮ず",
            type: "warning",
            closeText: !0,
            onConfirm: function (wrap) {
                var _self = this;
                return $.ajax({
                    type: "POST", url: url, dataType: "JSON", data: {}, success: function (result) {
                        el.closest(".item-primary").find(".link-add").show();
                        var result = result;
                        if ("string" == typeof result && (result = eval("(" + result + ")")), result.rescode) {
                            var $ul = el.closest(".history-project").length ? el.closest(".history-project") : el.closest(".purpose-list");
                            el.closest("li").remove(), el.closest(".resume-item").removeClass("resume-item-open"), "resume-purpose" != primaryModule && "resume-history" != primaryModule && "resume-education" != primaryModule || "practice" != $ul.data("role") && 1 == $ul.find("li").length && $ul.find("li .link-delete").hide(), $("html,body").animate({scrollTop: primaryWrap.closest(".resume-item").offset().top + "px"}, 500)
                        } else Resume.showError(result.resmsg);
                        wrap.remove()
                    }
                }), !1
            },
            error: function () {
                Resume.showError()
            }
        })
    }, showError: function (e) {
        $.dialog({
            content: '<div class="tip-text">' + (e || "鏈嶅姟鍣ㄩ敊璇紝璇风◢鍚庡啀璇�") + "</div>",
            title: "娓╅Θ鎻愮ず",
            closeText: !0,
            confirmText: "纭畾",
            cancelText: "",
            type: "error"
        })
    }, resumeFresh: function (e) {
        function t(e) {
            0 != $(".resume-refresh").length && $(".resume-refresh").remove();
            var t = '<ul class="resume-refresh"> <li class="refresh-lines"><h4>绠€鍘嗘椿璺冨害</h4><div class="resume-refresh-tip"><i></i><p>鍒锋柊绠€鍘嗘彁鍗囨椿璺冨害锛屾彁鍗囨椿璺冨害<br>鍙彁楂樼畝鍘嗘帓鍚嶏紝姣忓ぉ鍙兘鍒锋柊1娆�</p></div><div class="resume-refresh-loading"></a><i></i><p>鍔犺浇涓�</p></div></ul>';
            "user" == this.type ? $("#async-sider").append(t) : $(".deliver-sider").append(t), l(e, function (e, t) {
                var i = '<li class="refresh-lines"><div class="svg-sub"><span class="svg-my">鎴戠殑</span><span class="svg-other">鍚岃</span></div><h4>绠€鍘嗘椿璺冨害</h4><div class="resume-refresh-tip"><i></i><p>鍒锋柊绠€鍘嗘彁鍗囨椿璺冨害锛屾彁鍗囨椿璺冨害<br>鍙彁楂樼畝鍘嗘帓鍚嶏紝姣忓ぉ鍙兘鍒锋柊1娆�</p></div>' + t;
                "user" == this.type ? $("#async-sider .resume-refresh").html(i) : $(".deliver-sider .resume-refresh").html(i)
            })
        }

        function i() {
            return ""
        }

        function n(e) {
            var t = this, i = (t.baseLine, e.data.resumeActiveness), n = i.recentActiveness, s = n,
                a = i.similarGeekRecentActiveness, c = s.concat(a), l = i.date8Arr,
                d = 0 == Math.max.apply({}, c) ? 100 : Math.max.apply({}, c);
            t.baseLine = t.highBase / d;
            for (var p = [], u = [], h = n.length / 3 - 1; h >= 0; h--) {
                p = [];
                for (var f = 2; f >= 0; f--) p.push({
                    xAxis: o(l[3 * h + f]),
                    series: [r("", n, h, f), r("", a, h, f)],
                    yAxis: [r(t.baseLine, n, h, f), r(t.baseLine, a, h, f)]
                });
                u.push(p)
            }
            return u
        }

        function s(e) {
            var t = "", i = "", s = n(e), t = "";
            return $.each(s, function (e, n) {
                i = "", 9 == e && (i = "active"), t += '                <li class="' + i + '"><svg class="refesh-svg"  width="168" height="130"><g><line x1="8" y1="104" x2="140" y2="104" class="x-axis"/><line x1="8" y1="84" x2="140" y2="84" class="x-axis"/><line x1="8" y1="64" x2="140" y2="64" class="x-axis"/><line x1="8" y1="44" x2="140" y2="44" class="x-axis"/><line x1="8" y1="24" x2="140" y2="24" class="x-axis"/></g><g></g>' + a(e, n) + "</svg></li>"
            }), t
        }

        function a(e, t) {
            var i = "", n = "";
            this.xAxisDot = this.xAxisWidth / t.length;
            var s, a = "", o = "", r = "", c = "", l = [[], []];
            return $.each(t, function (t, s) {
                n = "", a = parseInt(xAxisDot * t + 20), 2 == t && (r = "dn"), 9 == e && (2 == t ? (s.xAxis = "浠婂ぉ", n = "degree", c = '<text class="today-dots ' + n + ' dn" x="137" y="' + s.yAxis[1] + '" > +' + s.series[0] + "</text>") : 1 == t && (s.xAxis = "鏄ㄥぉ")), o += '<g class="bg-x' + t + ' " transform="translate(5,20)"><line x1="' + a + '" y2="84"  x2="' + a + '" y2="84" class="bg-axis" data-value="' + t + '"/></g>', i += '<g class="refresh-x  x' + t + ' " data-value="' + t + '" transform="translate(5,20)"><text x="' + (a - 10) + '" y="104" class="fresh-day" width="30" >' + s.xAxis + '</text><text class="similar-series" x="' + a + '" y="' + (s.yAxis[1] - 5) + '" >' + s.series[1] + '</text><text class="my-series ' + r + " " + n + '" x="' + a + '" y="' + (s.yAxis[0] - 5) + '" >' + s.series[0] + '</text><circle class="similar-yaxis" cx="' + a + '" cy="' + s.yAxis[1] + '" r="2"/><circle class="my-yaxis ' + n + '" cx="' + a + '" cy="' + s.yAxis[0] + '" r="2"/></g>', l[0].push(s.yAxis[1]), l[1].push(s.yAxis[0])
            }), $.each(l, function (t, i) {
                s = 9 == e && 1 == t ? "degree" : "", l += '<g  transform="translate(5,20)"><polyline  class="refesh-line  refesh-line' + t + " " + s + '"   points="20,' + Math.abs(i[0]) + " 70," + Math.abs(i[1]) + " 120," + Math.abs(i[2]) + '" fill="none"/></g>'
            }), o + c + l + i
        }

        function o(e) {
            return parseInt(e.toString().substring(6, 8)) + "鏃�"
        }

        function r(e, t, i, n) {
            return "" == e ? t[3 * i + n] : parseInt(100 - e * t[3 * i + n] - 16)
        }

        function c() {
            var e = this, t = e.resData, i = (e.freshBtn, t.data.resumeActiveness), n = i.recentActiveness;
            if (0 == i.leftCount && 0 == i.refreshed) {
                u();
                f({action: "refresh-resume-pop-up", p: _PAGE.uid, p2: 1})
            } else {
                var s = {from: "resume" == this.type ? 2 : 1};
                1 == !i.free && i.leftCount > 0 && $.extend(s, {userItemId: i.encryptUserItemId}), p("/geek/item/resumerefresh/useitem.json", "post", s).then(function (t) {
                    if (1 == t.rescode) {
                        d();
                        var i = $(".refresh-free-count").find("span"), s = parseInt(i.text()), a = s >= 1 ? s - 1 : s;
                        i.html(a);
                        var o = e.baseLine, r = t.data, c = 100 - o * n[2] - 16, l = 100 - o * n[1] - 16, p = r - n[0];
                        e.refeshBase = 100 - o * r - 16, e.refeshBase < 0 ? e.refeshBase = 0 : e.refeshBase > 84 && (e.refeshBase = 84), e.refeshBase = e.refeshBase >= 0 ? e.refeshBase : 0, $(".resume-refresh .degree").attr("y", e.refeshBase + "px").attr("cy", e.refeshBase + "px").attr("y1", e.refeshBase + 5 + "px").attr("points", "20," + c + " 70," + l + " 120," + e.refeshBase).text(r), $(".resume-refresh .my-series.degree").attr("y", e.refeshBase - 1 + "px").text(r), $(".resume-refresh .today-dots.degree").attr("y", e.refeshBase + 13 + "px").html("+" + p).show(300).hide(3e3), $(".resume-refresh .refresh-btn").removeClass("refresh-btn").addClass("refresh-bt-grey")
                    } else h(t)
                }).fail(function (e) {
                    h(e)
                })
            }
        }

        function l(e, t) {
            var n = this;
            p("/geek/item/resumerefresh/activeness.json", "get", {}).then(function (a) {
                if (n.resData = a, a.data.resumeActiveness) {
                    if (resumeActiveness = a.data.resumeActiveness, list = resumeActiveness.recentActiveness, 0 == resumeActiveness.refreshed) var o = '<a class="btn refresh-btn" href="javascript:;">鍒锋柊绠€鍘�</a>'; else if (resumeActiveness.refreshDays > 1) var o = '<a class="btn refresh-bt-grey" href="javascript:;">宸茶繛缁埛鏂�' + resumeActiveness.refreshDays + " 澶�</a>"; else var o = '<a class="btn refresh-bt-grey" href="javascript:;">浠婃棩宸插埛鏂�</a>';
                    var r = 0 == resumeActiveness.free ? "鍓╀綑娆℃暟" : "鍓╀綑鍏嶈垂娆℃暟", l = 0;
                    1 == resumeActiveness.free && 2 == resumeActiveness.leftCount && (l = 1);
                    var p = '<div class="resume-refresh-hwslider"></a><ul>' + s(a) + '</ul> <a href="javascript:;"  class="arrow-prev"></a><a href="javascript:;"  class="arrow-next"></a></div>' + o + '<p class="refresh-text"><span class="refresh-free-count"><span>' + resumeActiveness.leftCount + "</span>娆�</span><span>" + r + "</span></p></li>" + i();
                    t(l, p), 1 == e && c();
                    var u = $(".resume-refresh");
                    u.on("click", ".refresh-btn", function () {
                        n.freshBtn = $(this), c()
                    });
                    var h = $(".refresh-x");
                    $(".refresh-x, .bg-axis").hover(function () {
                        $(".bg-x" + $(this).attr("data-value")).find(".bg-axis").addClass("axis-hover"), $(".refresh-x.x" + $(this).attr("data-value")).addClass("axis-active"), h.find(".dn").hide()
                    }, function () {
                        $(".bg-axis").removeClass("axis-hover"), h.removeClass("axis-active").find(".dn").show()
                    }), $(".similar-yaxis").hover(function () {
                        h.addClass("my-series-grey")
                    }, function () {
                        h.removeClass("my-series-grey")
                    }), u.find(".my-yaxis").hover(function () {
                        $(this).attr("r", 3)
                    }, function () {
                        $(this).attr("r", 2)
                    }), d()
                }
            })
        }

        function d() {
            var e = this, t = $(".resume-refresh-hwslider"), i = $(".resume-refresh-hwslider .arrow-prev"),
                n = $(".resume-refresh-hwslider .arrow-next"), s = t.children("ul"), a = s.children("li"), o = a.length,
                r = 10, c = !0, l = function (e, i) {
                    if (!c) return !1;
                    c = !1;
                    var n = t.width();
                    "prev" == i && (n *= -1), s.children(".active").stop().animate({left: -n}, 400, function () {
                        $(this).removeClass("active")
                    }), a.eq(e - 1).css("left", n + "px").addClass("active").stop().animate({left: 0}, 400, function () {
                        c = !0
                    })
                };
            10 == r && n.hide(300), 10 != e.hwIndex && (l(10, "next"), e.hwIndex = 10), n.on("click", function (t) {
                t.preventDefault(), i.show(300), c && (r >= o ? r = o : (r += 1, e.hwIndex = r, l(r, "next"), r == o ? n.hide(300) : n.show(300)))
            }), i.on("click", function (t) {
                t.preventDefault(), n.show(300), c && (1 == r ? r = 1 : (r -= 1, e.hwIndex = r, l(r, "prev"), 1 == r ? i.hide(300) : i.show(300)))
            })
        }

        function p(e, t, i) {
            var n = $.Deferred();
            return $.ajax({
                type: t, url: e, dataType: "JSON", data: i, success: function (e) {
                    e.rescode ? n.resolve(e) : $.toast({content: e.resmsg, type: "error"})
                }, error: function () {
                }
            }), n
        }

        function u() {
            p("/business/item/sellunit.json", "get", {itemType: "b5799fd5b0d1ce3b1XU~"}).then(function (e) {
                for (var t = e.itemSellUnit, i = t.itemSellItemList, n = "", s = 0; s < i.length; s++) {
                    var a = "", o = "", r = "", c = i.length - 1;
                    a = 0 == i[s].decreaseAmount ? "" : "锛堣妭鐪伮�" + i[s].decreaseAmount + "锛�", s == c && (o = "item-hot selected"), r = i[c].beanAmount - e.beanCount > 0 ? i[c].beanAmount - e.beanCount : 0, n += '<li data-id="' + i[s].encryptBeanItemId + '" class="' + o + '" data-money ="' + i[s].beanAmount + '">                                <div class="pull-right"><span class="text-orange">锟�' + i[s].beanAmount + "</span></div>                                <p>" + i[s].specDesc + '<span class="text-gray">' + a + "</span></p>                             </li>"
                }
                return '<div class="title">                                    <img src="' + t.itemIcon + '">                                    <p>' + t.itemName + '</p>                                    <p class="sub-title">姣忔棩鏈€澶氫娇鐢�1娆�</p>                                </div>                                <ul class="purchase-container">' + n + ' </ul>                                <div class="sells-pay">                                    <p class="pull-left"><span class="prop-sells-total">閲戦锛毬�<span>' + i[c].beanAmount + '</span></span><span class="prop-sells-banlance">浣欓锛毬�<span>' + e.beanCount + '</span></span></p>                                    <p class="pull-right">闇€瑕佹敮浠橈細<em class="text-orange prop-sells-pay">閲戦锛毬�<span>' + r + "</span></em></p>                                </div>"
            }).then(function (e) {
                $.dialog({
                    title: "",
                    wrapClass: "layer-prop-purchase",
                    content: e,
                    confirmText: "绔嬪嵆鏀粯",
                    cancelText: !1,
                    onOpen: function (e) {
                        e.find(".purchase-container li").on("click", function () {
                            var t = e.find(".prop-sells-total span"), i = e.find(".prop-sells-banlance span"),
                                n = e.find(".prop-sells-pay span");
                            $(this).siblings().removeClass("selected"), $(this).addClass("selected"), t.text($(this).attr("data-money")), t.text() - i.text() > 0 ? n.text(t.text() - i.text()) : n.text(0)
                        })
                    },
                    onConfirm: function (e) {
                        var i = function (e) {
                            Payment.success({
                                article: "璐拱鎴愬姛",
                                confirmText: "绔嬪嵆鍒锋柊",
                                cancelText: "绋嶅悗鍒锋柊",
                                text: '<p class="resume-pay-success">浣跨敤璇存槑锛�1.姣忓ぉ鏈€澶氬彲鍒锋柊1娆★紝鎻愬崌绠€鍘嗘帓鍚嶏紱<br> 2.鍓╀綑娆℃暟锛屽彲鍦ㄧ畝鍘嗘椿璺冨害椤甸潰鏌ョ湅</p>',
                                confirm: function (e) {
                                    "close" == e ? window.location.reload() : t(1);
                                    try {
                                        _T.sendEvent("use_immediately_purchase_success")
                                    } catch (e) {
                                    }
                                }
                            })
                        }, n = e.find(".purchase-container li.selected").attr("data-id"), s = {
                            url: "/geek/item/pay.json",
                            prePayUrl: "/geek/item/prepay.json",
                            data: {itemId: n},
                            itemId: n,
                            success: i
                        }, a = {
                            success: i, buy: function (e) {
                                f({action: "confirm-payment", p: parseInt(e.payType) - 1, p2: _PAGE.uid})
                            }
                        };
                        setTimeout(function () {
                            Payment.purchase(s, a), e.remove()
                        }, 100), f({
                            action: "payment-immediately",
                            p: n,
                            p2: _PAGE.uid,
                            p3: e.find(".purchase-container li.selected").index()
                        })
                    }
                })
            })
        }

        function h(e) {
            var t = "绔嬪嵆瀹屽杽", i = "绋嶅悗瀹屽杽";
            4 == e.rescode ? (t = "鎴戠煡閬撳暒", i = !1) : 3 == e.rescode && (t = "鍙栨秷闅愯棌", i = "绋嶅悗澶勭悊"), $.dialog({
                title: "鏆傛椂鏃犳硶鍒锋柊绠€鍘�",
                wrapClass: "dialog-icons-default",
                content: '<div class="tip-text">' + e.resmsg + "</div>",
                confirmText: t,
                cancelText: i,
                type: "warning",
                onConfirm: function (t) {
                    4 != e.rescode ? window.location.href = e.jumpUrl : t.remove()
                }
            }), f({action: "refresh-resume-pop-up", p: _PAGE.uid, p2: e.rescode})
        }

        function f(e) {
            var t = $.extend({}, e);
            $.ajax({
                method: "post",
                url: "/wapi/zpCommon/actionLog/common.json",
                data: {ba: JSON.stringify(t)},
                cache: !1,
                success: function (e) {
                },
                error: function () {
                }
            })
        }

        !function (e) {
            this.baseLine = .074, this.highBase = 64, this.refeshBase = 10, this.type = e, this.resData = {}, this.freshBtn = "", this.hwIndex = 10, this.xAxisWidth = 150, this.xAxisDot = 0, t(0)
        }(e)
    }, badResume: function () {
        $.ajax({
            url: "/wapi/zpgeek/resume/quality/query.json", type: "get", dataType: "json", success: function (e) {
                0 == e.code && (-1 == e.zpData.quality && (3001 == e.zpData.resumeDetailStatus ? $(".resume").append("<div class='resume-warning'><p>褰撳墠绠€鍘嗕俊鎭笉瀹屽杽,褰卞搷鑱婂ぉ鍥炲鐜�,淇敼鍚庝綘灏嗚幏寰楁洿澶氱殑姹傝亴鏈轰細</p><a href='javascript:;'>绠€鍘嗘病闂</a></div>") : $(".resume").append("<div class='resume-warning'><p>褰撳墠绠€鍘嗕俊鎭笉瀹屽杽锛屽凡涓轰綘鐢� <img src='" + staticPath + "/web/geek/images/icon-bad-resume-pre.png'> 鏍囩ず鍑洪渶瑕佷慨鏀圭殑妯″潡</p><a href='javascript:;'>绠€鍘嗘病闂</a></div>"), $(".resume-warning").css("display", "flex")), $(".resume-warning a").click(function () {
                    $.dialog({
                        content: "<div class='badResume-desc'>鑻ヤ綘褰撳墠绠€鍘嗗～鍐欐病闂,璇风偣鍑荤珛鍗充笂鎶�,鎴戜滑浼氬敖蹇牳鏌�</div><div class='item'><textarea name='responsibility' class='badResume-textInfo serial-area' placeholder='浣犱篃鍙互绠€鐭弿杩颁笂鎶ュ師鍥�,浠ヤ究鎴戜滑鎻愪緵鏇村ソ鐨勫府鍔�(閫夊～)' data-range='0,150' data-blank='璇疯緭鍏�150瀛楀唴鐨勪笂鎶ュ唴瀹�'></textarea></div><div class='badResume-count'><span class='num'>0</span>/150</div>",
                        title: "绠€鍘嗕笂鎶�",
                        type: "normal",
                        closeText: !0,
                        cancelText: "鍙栨秷",
                        confirmText: "绔嬪嵆涓婃姤",
                        wrapClass: "resume-warning-pop",
                        onConfirm: function (e) {
                            var t = $(".resume-warning-pop .badResume-textInfo").val();
                            $.ajax({
                                url: "/wapi/zpgeek/resume/garbage/report.json",
                                type: "post",
                                data: {content: t},
                                dataType: "json",
                                success: function (t) {
                                    0 == t.code ? (e.remove(), $.toast({
                                        content: t.zpData.msg,
                                        type: "success"
                                    }), $(".resume-warning-pop .badResume-textInfo").val("")) : $.toast({
                                        content: t.zpData.msg,
                                        type: "error"
                                    })
                                }
                            })
                        },
                        onClose: function () {
                            $(".resume-warning-pop .badResume-textInfo").val("")
                        }
                    }), $(".resume-warning-pop .badResume-textInfo").bind("input propertychange", function () {
                        var e = $(".resume-warning-pop .badResume-textInfo").val();
                        if ("" != e) {
                            var t = e.length <= 150 ? e.length : 150;
                            if (e.length > 150) {
                                var i = e.substring(0, 150);
                                $(".resume-warning-pop .badResume-textInfo").val(i)
                            }
                            $(".num").html(t)
                        } else $(".num").html(0)
                    })
                }))
            }
        })
    }
}, Attachment = {
    init: function (e) {
        var t = $(".position-manage").length, i = $(".user-center").length;
        Attachment.previewErrorNum = 0, Attachment.attachmentList = [], Attachment.worksList = [], t && Attachment.getResumeSider(), i && Attachment.getUcenterSider(), Attachment.getAttachmentList(), "miniscan" == getQueryString("from") && 1 == getQueryString("annexType") ? Attachment.showUploadWarning({
            title: '<div style="margin: 5px; text-align: center">鎮ㄧ幇鍦ㄥ彲浠ョ洿鎺ヤ笂浼犱綔鍝侀泦闄勪欢</div>',
            confirmText: "涓婁紶浣滃搧闆嗛檮浠�",
            isWorks: !0,
            callbackClose: function () {
                var e = window.location.href.split("from=miniscan&annexType=1");
                window.location.href = e.join("")
            },
            callbackUpload: function () {
                setTimeout(function () {
                    var e = window.location.href.split("from=miniscan&annexType=1");
                    window.location.href = e.join("")
                }, 300)
            },
            callbackClosePreviewDialog: function () {
                setTimeout(function () {
                    var e = window.location.href.split("from=miniscan&annexType=1");
                    window.location.href = e.join("")
                }, 300)
            }
        }) : "miniscan" == getQueryString("from") && Attachment.showUploadWarning({
            title: '<div style="margin: 5px; text-align: center">鎮ㄧ幇鍦ㄥ彲浠ョ洿鎺ヤ笂浼犻檮浠剁畝鍘�</div>',
            callbackClose: function () {
                var e = window.location.href.split("from=miniscan");
                window.location.href = e.join("")
            },
            callbackUpload: function () {
                setTimeout(function () {
                    var e = window.location.href.split("from=miniscan");
                    window.location.href = e.join("")
                }, 300)
            },
            callbackClosePreviewDialog: function () {
                setTimeout(function () {
                    var e = window.location.href.split("from=miniscan");
                    window.location.href = e.join("")
                }, 300)
            }
        })
    }, initEvents: function (e) {
        var t = e;
        t.find("#fileupload-trigger").on("click", function () {
            1 == Attachment.attachmentList.resumeCount && Attachment.attachmentList.addResumeTip ? Attachment.showVersionDialog() : Attachment.showUploadWarning()
        }), t.find("#fileupload-trigger-works").on("click", function () {
            1 == Attachment.worksList.resumeCount && Attachment.worksList.addResumeTip ? Attachment.showVersionDialog({
                confirmText: "涓婁紶浣滃搧闆嗛檮浠�",
                isWorks: !0
            }) : Attachment.showUploadWarning({confirmText: "涓婁紶浣滃搧闆嗛檮浠�", isWorks: !0})
        });
        var i = null;
        t.find(".annex-list li").on("mouseenter", function () {
            i && clearTimeout(i), t.find(".annex-card").stop(!0).hide(), $(this).find(".annex-card").stop(!0).show()
        }), t.find(".annex-list").on("mouseleave", function () {
            i = setTimeout(function () {
                t.find(".annex-card").stop(!0).hide()
            }, 500)
        }), t.find(".annex-item").on("click", ".del-btn", function () {
            Attachment.deleteResume($(this))
        }), t.find(".annex-card").on("click", ".rename-btn", function () {
            Attachment.renameResume($(this))
        }), t.find(".annex-card").on("click", ".load-btn", function () {
            var e = $(this).closest("li").index() + 1;
            try {
                _T.sendEvent("download_resume_" + e)
            } catch (e) {
            }
        }), t.find(".resume-works-tip").on("click", ".icon", function () {
            $(this).parent().addClass("hidden"), t.find(".title").removeClass("has-tip")
        })
    }, getResumeSider: function (e) {
        var t = $(".sider");
        $.ajax({
            url: "/geek/resume/sidebar.json", type: "get", success: function (e) {
                1 == e.rescode ? (t.html(e.html), Attachment.initEvents(t)) : t.html('<p class="gray">鏁版嵁鍔犺浇鍑洪敊</p>'), Resume.resumeFresh("resume")
            }, error: function () {
                t.html('<p class="gray">鏁版嵁鍔犺浇鍑洪敊</p>')
            }
        })
    }, getUcenterSider: function () {
        var e = $(".sider");
        $.ajax({
            type: "GET", url: "/geek/infodata.json", data: null, dataType: "json", success: function (t) {
                1 == t.rescode ? (e.html(t.html), Attachment.initMember(e), Attachment.initEvents(e)) : e.html('<p class="gray">鏁版嵁鍔犺浇鍑洪敊</p>'), Resume.resumeFresh("user")
            }, error: function () {
                e.html('<p class="gray">鏁版嵁鍔犺浇鍑洪敊</p>')
            }
        })
    }, initMember: function (e) {
        var t = e;
        t.find(".userinfo-box  .dropdown-select").on("click", function () {
            $(this).toggleClass("dropdown-select-open")
        }), $(document).on("click", function (e) {
            $(e.target).closest(".now-state").length || t.find(".userinfo-box  .dropdown-select").removeClass("dropdown-select-open")
        }), t.find(".filter-select-box .dropdown-select").on("click", "a", function (e) {
            e.stopPropagation()
        }), t.find(".sider-recommend li").eq(0).find(".red-dot").length ? $(".chat-history .job-tab a").eq(0).attr("ka", "personal_top_added_1") : $(".chat-history .job-tab a").eq(0).attr("ka", "personal_top_added_0"), t.find(".sider-recommend li").eq(1).find(".red-dot").length ? $(".chat-history .job-tab a").eq(1).attr("ka", "personal_top_sawme_1") : $(".chat-history .job-tab a").eq(1).attr("ka", "personal_top_sawme_0"), t.find(".now-state .dropdown-menu").on("click", "li", function () {
            var e = $(this).attr("data-val");
            t.find(".now-state input").val($(this).text()), Attachment.changeApplyStatus(e, t)
        })
    }, changeApplyStatus: function (e, t) {
        $.ajax({
            type: "POST",
            url: "/geek/saveApplyStatus.json",
            data: {applyStatus: e},
            dataType: "json",
            success: function (i) {
                1 == i.rescode && (t.find(".now-state input").attr("ka", "base_info_status_from_" + e), $.toast({
                    content: "淇敼鎴愬姛",
                    type: "success"
                }))
            }
        })
    }, getAttachmentList: function (e) {
        $.ajax({
            type: "GET",
            url: "/wapi/zpgeek/resume/attachment/checkbox.json",
            dataType: "json",
            success: function (t) {
                0 == t.code && t.zpData && (Attachment.attachmentList = t.zpData), e && e(t)
            }
        })
    }, showVersionDialog: function (e) {
        $.dialog({
            content: '<div class="tip-text"><p>绯荤粺妫€娴嬪埌鎮ㄧ殑BOSS鐩磋仒APP鐗堟湰杩囦綆锛屾棤娉曚娇鐢ㄥ闄勪欢绠€鍘嗗姛鑳姐€�</p><p>榛樿闄勪欢绠€鍘嗕负鏈€鏂颁笂浼犵殑绠€鍘嗭紝璇峰強鏃跺崌绾PP鐗堟湰銆�</p></div>',
            title: "APP鏈€鏂扮増鏈彁渚涘浠介檮浠剁畝鍘嗗姛鑳�",
            type: "warning",
            closeText: !0,
            cancelText: "",
            confirmText: "缁х画涓婁紶",
            onConfirm: function (t) {
                t.remove(), Attachment.showUploadWarning(e)
            }
        })
    }, getResumeAccept: function () {
        var e = "image/jpg,image/jpeg,image/png,application/vnd.ms-powerpoint,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation";
        return UA.indexOf("Windows NT 6.1") > -1 && (e = "*"), e
    }, showUploadWarningPretreatment: function (e) {
        $.ajax({
            type: "GET", url: "/geek/attresume/upload/check.json", dataType: "json", success: function (t) {
                if (1 == t.rescode && t.data) {
                    var i = t.data;
                    if (!i.isLogin) return window.location.href = "/geek/attresume/parser.html", !0;
                    if (i.resumeCount >= 3 && i.isComplete) return $.dialog({
                        content: "鍚屾椂鍙兘鏈�3浠介檮浠剁畝鍘嗭紝璇峰墠寰€绠€鍘嗛〉鍒犻櫎涓€浠藉悗鍐嶄笂浼�",
                        title: "鎻愮ず",
                        type: "warning",
                        closeText: !0,
                        cancelText: "",
                        confirmText: "鎴戠煡閬撲簡",
                        onConfirm: function (e) {
                            try {
                                _T.sendEvent("dialog_over")
                            } catch (e) {
                            }
                            e.remove()
                        }
                    }), !0;
                    if (e.isComplete = i.isComplete, e.resumeCount = i.resumeCount, i.isComplete) window.resumeQueryBar && window.resumeQueryBar.loop(); else {
                        var n = i.resumeCount >= 3 ? "/web/geek/guide?maxResumeCount=true" : "/web/geek/guide";
                        e.callbackUpload = function () {
                            setTimeout(function () {
                                window.location.href = n
                            }, 500)
                        }
                    }
                    e.showCvEntry && e.isComplete ? Attachment.showCvUploadDailog(e) : Attachment.showUploadWarning(e)
                } else $.toast({type: "error", content: "鏈嶅姟鍣ㄥ紓甯�"})
            }, error: function () {
                $.toast({type: "error", content: "鏈嶅姟鍣ㄥ紓甯�"})
            }
        })
    }, showCvUploadDailog: function (e) {
        $.dialog({
            content: '<dl class="resume-wrap"><dd class="sec-upload"><div class="upload-wrap"><p class="upload-guide">鎷栨嫿鏂囦欢鍒拌繖閲�</p><p class="upload-tip">鏀寔DOC銆丏OCX銆丳DF銆丣PG銆丳NG鏍煎紡闄勪欢</p></div><a href="javascript:;" ka="resume_attach_upload" class="btn btn-primary btn-file">涓婁紶闄勪欢绠€鍘� <input type="file" name="file" ka="user-resume-upload-file" accept="image/jpg, image/jpeg, image/png, application/vnd.ms-powerpoint, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation"></a></dd><dd class="sec-make"><div class="zhipin-resume-img"></div><a href="https://cv.zhipin.com/resume/html/my-resumes" target="_blank" ka="resume_attach_create" class="btn btn-primary">鍦ㄧ嚎蹇€熷埗浣�</a></dd></dl>',
            title: "",
            closeText: !0,
            confirmText: "",
            cancelText: "",
            wrapClass: "upload-resume-dialog",
            onOpen: function (t) {
                t.find(".btn-file").on("click", function () {
                    Attachment.bindUploadEvent($(this), t, e)
                }), Attachment.bindUploadEvent(t.find(".sec-upload"), t, e)
            }
        })
    }, showUploadWarning: function (e) {
        var t = {title: "", confirmText: "涓婁紶闄勪欢绠€鍘�", cancelText: "", callbackChat: null, callbackUpload: null},
            e = $.extend(t, e), i = "", n = "upload-dialog-box", s = "dialog_cancel", a = "";
        e.cancelText && ("鍏堣亰鑱�" == e.cancelText && (s = "dialog_upload_deliver_chat"), i = '<button type="button" class="btn btn-outline" ka="' + s + '">' + e.cancelText + "</button>", n = "upload-dialog-deliver"), e.isComplete || (a = '<p>娌℃湁闄勪欢绠€鍘�&nbsp;<a href="/web/geek/guide" ka="nlp_no_resume">&nbsp;鍦ㄧ嚎濉啓</a></p>'), $.dialog({
            content: '<div class="' + n + '"><p>鏀寔DOC銆丏OCX銆丳DF銆丣PG銆丳NG鏍煎紡闄勪欢</p><p class="red">鏂囦欢澶у皬涓嶈秴杩�8M</p><div class="btns">' + i + '<a href="javascript:;" class="btn btn-file">' + e.confirmText + '<input id="fileupload" type="file" name="file" ka="user-resume-upload-file" title="" accept="' + Attachment.getResumeAccept() + '"></a></div>' + a + "</div>",
            title: e.title,
            closeText: !0,
            confirmText: "",
            cancelText: "",
            wrapClass: "dialog-primary-default",
            onOpen: function (t) {
                t.find(".btn-file").on("click", function () {
                    Attachment.bindUploadEvent($(this), t, e)
                }), t.find(".btn-outline").on("click", function () {
                    e && e.callbackChat ? e.callbackChat() : t.remove()
                })
            },
            onClose: function () {
                e && e.callbackClose && e.callbackClose()
            }
        })
    }, bindUploadEvent: function (el, wrap, params) {
        var fileInfo = {}, reg = /(\.|\/)(ppt|pptx|doc|docx|pdf|png|jpg|jpeg)$/i, params = params || {};
        Attachment.previewErrorNum = 0, el.fileupload({
            method: "POST",
            url: "/wapi/zpupload/resume/uploadFile.json",
            dataType: "text",
            acceptFileTypes: reg,
            maxChunkSize: 8e6,
            formData: {token: window.top._PAGE.token ? window.top._PAGE.token.split("|")[0] : ""},
            add: function (e, t) {
                var i = t.files[0], n = i.name, s = i.size;
                if (fileInfo = i, reg.test(n)) if (s > 8e6) {
                    Attachment.fileUploadError("涓婁紶鏂囦欢瓒呰繃8鍏嗭紝璇烽噸鏂伴€夋嫨");
                    try {
                        _T.sendEvent("user_resume_size_limit")
                    } catch (e) {
                    }
                } else t.submit(), !1 !== params.isComplete && Attachment.showResumeStatusDialog("added", fileInfo); else {
                    Attachment.fileUploadError("閫夋嫨鐨勬枃浠舵棤鏁堬紝璇烽噸鏂伴€夋嫨");
                    try {
                        _T.sendEvent("user_resume_size_notsupport")
                    } catch (e) {
                    }
                }
            },
            done: function (e, data) {
                var result = data.result;
                if ("string" == typeof result && (result = eval("(" + result + ")")), 0 == result.code && result.zpData) {
                    if (!1 === params.isComplete) return Attachment.preLoadResumeSilence(el, $.extend(result.zpData, fileInfo), params), !0;
                    Attachment.preLoadResume($.extend(result.zpData, fileInfo), params)
                } else {
                    Attachment.showResumeStatusDialog("fail", fileInfo);
                    try {
                        _T.sendEvent("user_resume_upload_error")
                    } catch (e) {
                    }
                }
            },
            fail: function (e, t) {
                Attachment.showResumeStatusDialog("fail", fileInfo);
                try {
                    _T.sendEvent("user_resume_upload_error")
                } catch (e) {
                }
            }
        })
    }, preLoadResumeSilence: function (e, t, i) {
        if (!t.previewUrl) return !1;
        if (i.resumeCount >= 3) return i && i.callbackUpload && i.callbackUpload(), !1;
        var n = new Image;
        return n.src = "/wapi/zpgeek/resume/preview4geek/" + t.previewUrl, n.onload = function () {
            return Attachment.postSaveResume(e, t, i), Attachment.consoleSuccessLog(t), !0
        }, n.onerror = function () {
            return ++Attachment.previewErrorNum < 3 && (Attachment.preLoadResume(t), Attachment.consoleLog(t), !1)
        }, !1
    }, preLoadResume: function (e, t) {
        if (e.previewUrl) {
            var i = new Image;
            i.src = "/wapi/zpgeek/resume/preview4geek/" + e.previewUrl, i.onload = function () {
                Attachment.showResumeStatusDialog("success", e, t), Attachment.consoleSuccessLog(e)
            }, i.onerror = function () {
                Attachment.previewErrorNum++, Attachment.previewErrorNum < 3 ? Attachment.preLoadResume(e) : Attachment.showResumeStatusDialog("preview", e), Attachment.consoleLog(e)
            }
        }
    }, showResumeStatusDialog: function (e, t, i) {
        var n = Attachment.getResumeTemplate(e, t);
        $.dialog({
            title: "",
            content: n,
            closeText: !0,
            confirmText: "",
            cancelText: "",
            wrapClass: "dialog-layer-full dialog-resume-full",
            lock: !0,
            onOpen: function (e) {
                $("body").css("overflow", "hidden"), !1 in window && e.find(".img-box").css("height", window.innerHeight - 92 + "px"), $("html").hasClass("ie") && e.find(".resume-wrap").css("height", window.innerHeight - 40 + "px"), e.find("#fileupload").on("click", function () {
                    Attachment.bindUploadEvent($(this), null, i)
                }), e.find(".btn-sure").on("click", function () {
                    Attachment.postSaveResume($(this), t, i)
                }), e.find(".link-refresh ").on("click", function () {
                    Attachment.preLoadResume(t)
                })
            },
            onClose: function () {
                $("body").css("overflow", "visible"), i && i.callbackClosePreviewDialog && i.callbackClosePreviewDialog()
            }
        })
    }, getResumeTemplate: function (e, t) {
        var t = t || {}, i = "", n = "", s = "";
        if (t.name) {
            var a = t.name.split(".").length;
            i = t.name.split(".")[a - 1]
        }
        switch (e) {
            case"added":
                n = '<div class="data-tips"><div class="tip-inner"><p><i class="icon-upload-resume"></i></p><p class="gray"><i class="icon-loading-chrysanthemum"></i>姝ｅ湪涓婁紶涓�</p></div></div>', s = '<h3 class="title">闄勪欢鐘舵€�</h3>' + (t.name ? "<p>闄勪欢鍚嶇О锛�" + t.name + "</p>" : "") + '<p class="gray">闄勪欢鍐呭鍙兘棰勮10椤碉紝涓旀湁涓€瀹氬帇缂╋紝浣嗕笉褰卞搷Boss鐪嬪埌鍐呭鐨勮川閲�</p>';
                break;
            case"success":
                n = '<div class="img-box"><img src="/wapi/zpgeek/resume/preview4geek/' + t.previewUrl + '"/></div>', s = '<h3 class="title">闄勪欢纭</h3>' + (t.name ? "<p>闄勪欢鍚嶇О锛�" + t.name + "</p>" : "") + (t.size ? "<p>闄勪欢澶у皬锛�" + parseInt(t.size / 1024) + " KB</p>" : "") + (i ? "<p>闄勪欢鏍煎紡锛�" + i + "</p>" : "") + '<p class="gray">闄勪欢鍐呭鍙兘棰勮10椤碉紝涓旀湁涓€瀹氬帇缂╋紝浣嗕笉褰卞搷Boss鐪嬪埌鍐呭鐨勮川閲忋€�</p><p class="gray">Boss灏嗕綘杞彂缁欏悓浜嬫椂锛屽彲鑳戒細灏嗛檮浠剁畝鍘嗕竴骞惰浆鍙戙€�</p><div class="btns"><a href="javascript:;" class="btn btn-file btn-outline">閲嶆柊閫夋嫨<input id="fileupload" type="file" name="file" ka="user_resume_add_reupload" title="" accept="' + Attachment.getResumeAccept() + '"></a><button type="button" class="btn btn-sure" ka="user_resume_add_sure">纭畾娣诲姞</button></div>';
                break;
            case"preview":
                n = '<div class="data-tips"><div class="tip-inner"><p><i class="icon-upload-resume"></i></p><p class="gray">棰勮澶辫触</p><p class="gray">鐐瑰嚮 <a href="javascript:;" class="link-refresh text-blue" ka="user-resume-refresh">鍒锋柊</a> 閲嶆柊棰勮</p></div></div>', s = '<h3 class="title">闄勪欢鐘舵€�</h3><p>闄勪欢灏嗗湪鎶曢€掑悗琚獴oss棰勮鏌ョ湅锛岃纭鏄剧ず姝ｇ‘锛堥瑙堝彧灞曠ず鍓�10椤碉級</p>' + (t.name ? '<p class="gray">闄勪欢鍚嶇О锛�' + t.name + "</p>" : "") + '<div class="btns"><a href="javascript:;" class="btn btn-through btn-file">閲嶆柊閫夋嫨<input id="fileupload" type="file" name="file" ka="user-resume-upload-fail-reupload" title="" accept="' + Attachment.getResumeAccept() + '"></a></div><p class="gray">鏀寔doc锛宒ocx锛宲df锛宩pg锛宲ng鏍煎紡闄勪欢锛屾枃浠跺ぇ灏忎笉瓒呰繃8M</p>';
                break;
            case"fail":
                n = '<div class="data-tips"><div class="tip-inner"><p><i class="icon-upload-resume"></i></p><p class="gray">涓婁紶澶辫触</p><p class="gray">璇烽噸鏂颁笂浼狅紝濡備粛鐒舵棤娉曟垚鍔燂紝鍙皾璇曟洿鏀规枃浠舵牸寮�</p></div></div>', s = '<h3 class="title">闄勪欢鐘舵€�</h3><p>闄勪欢灏嗗湪鎶曢€掑悗琚獴oss棰勮鏌ョ湅锛岃纭鏄剧ず姝ｇ‘锛堥瑙堝彧灞曠ず鍓�10椤碉級</p>' + (t.name ? '<p class="gray">闄勪欢鍚嶇О锛�' + t.name + "</p>" : "") + '<div class="btns"><a href="javascript:;" class="btn btn-through btn-file">閲嶆柊閫夋嫨<input id="fileupload" type="file" name="file" ka="user-resume-upload-fail-reupload" title="" accept="' + Attachment.getResumeAccept() + '"></a></div><p class="gray">鏀寔doc锛宒ocx锛宲df锛宩pg锛宲ng鏍煎紡闄勪欢锛屾枃浠跺ぇ灏忎笉瓒呰繃8M</p>'
        }
        return '<div class="pop-resume-box"><div class="resume-wrap"><h3 class="title">涓婁紶闄勪欢</h3>' + n + '</div><div class="resume-sider">' + s + "</div></div>"
    }, fileUploadError: function (e) {
        $.dialog({
            content: '<div class="tip-text">' + e + "</div>",
            title: "鎻愮ず",
            type: "error",
            closeText: !0,
            confirmText: "纭畾",
            cancelText: "",
            wrapClass: "",
            onOpen: function (e) {
            }
        })
    }, postSaveResume: function (e, t, i) {
        e.hasClass("disabled") || (e && e.addClass("disabled"), $.ajax({
            type: "POST",
            url: "/wapi/zpgeek/resume/attachment/save.json?previewUrl=" + t.previewUrl + "&annexType=" + (i.isWorks ? 1 : 0),
            dataType: "JSON",
            data: {},
            success: function (t) {
                if (0 == t.code) {
                    $.toast({
                        type: "success",
                        content: "涓婁紶鎴愬姛"
                    }), e && e.closest(".dialog-wrap").remove(), i && i.callbackUpload && i.callbackUpload(), Attachment.reflushSider(), $("body").css("overflow", "visible");
                    var n = setInterval(function () {
                        Resume.isShowResumeAnalyzeTools(!1) && clearInterval(n)
                    }, 1e3);
                    setTimeout(function () {
                        clearInterval(n)
                    }, 5e3)
                } else 0 == t.code && "鏈€澶氫笂浼犱笁浠界畝鍘�" == t.message ? $.toast({
                    type: "error",
                    content: t.message
                }) : 0 == t.code && "姝ｅ湪淇濆瓨锛岀◢绛夌墖鍒�" == t.message ? $.toast({
                    type: "error",
                    content: t.message
                }) : $.toast({type: "error", content: "淇濆瓨澶辫触"});
                e && e.removeClass("disabled")
            },
            error: function () {
                $.toast({type: "error", content: "淇濆瓨澶辫触锛岃绋嶅悗鍐嶈瘯"}), e && e.removeClass("disabled")
            }
        }))
    }, consoleLog: function (e) {
        $.ajax({
            type: "POST",
            url: "/wapi/zpCommon/actionLog/previewFail.json",
            dataType: "JSON",
            data: {previewUrl: e.previewUrl},
            success: function (e) {
            }
        })
    }, consoleSuccessLog: function (e) {
        $.ajax({
            type: "POST",
            url: "/wapi/zpCommon/actionLog/previewSuccess.json",
            dataType: "JSON",
            data: {previewUrl: e.previewUrl},
            success: function (e) {
            }
        })
    }, deleteResume: function (e) {
        var t = e.closest(".annex-list").find("li").length, i = e.closest("li").attr("data-id"),
            n = "纭畾鍒犻櫎璇ラ檮浠剁畝鍘嗗悧锛熷垹闄ゅ悗灏嗘棤娉曞悜BOSS鎶曢€掔畝鍘嗐€�";
        t > 1 && (n = "纭鍒犻櫎璇ラ檮浠剁畝鍘嗗悧锛熷凡鍙戦€佺粰Boss鐨勯檮浠剁畝鍘嗕笉鍙楀垹闄ゅ奖鍝嶃€�"), $.dialog({
            content: '<div class="tip-text">' + n + "</div>",
            title: "娓╅Θ鎻愮ず",
            type: "warning",
            onConfirm: function (t) {
                var n = e.closest("li").index() + 1;
                $.ajax({
                    type: "POST",
                    url: "/wapi/zpgeek/resume/attachment/delete.json",
                    data: {resumeId: i},
                    dataType: "json",
                    success: function (e) {
                        0 == e.code ? ($.toast({
                            content: "鍒犻櫎鎴愬姛",
                            type: "success"
                        }), Attachment.reflushSider()) : $.toast({content: e.message, type: "error"})
                    }
                });
                try {
                    _T.sendEvent("delete_resume_" + n)
                } catch (e) {
                }
                t.remove()
            }
        })
    }, renameResume: function (e, t) {
        var i = e.closest("li").find(".basis").text(), n = i.replace(/\s/g, "").split("."),
            s = n.splice(0, n.length - 1), a = n.splice(n.length - 1, 1);
        $.dialog({
            content: '<div class="pop-resume-rename"><p>璇疯緭鍏ヤ綘纭畾瑕佷慨鏀圭殑绠€鍘嗗悕绉�</p><p><input maxlength="30" placeholder="璇疯緭鍏ョ畝鍘嗗悕绉�" value="' + s + '" class="ipt" /></p></div>',
            title: "淇敼闄勪欢绠€鍘嗗悕绉�",
            wrapClass: "dialog-primary-default",
            onOpen: function (e) {
                e.find(".ipt").on("keyup", function () {
                    $(this).val().replace(/\s/g, "") ? e.find(".btn-sure").removeClass("btn-disabled") : e.find(".btn-sure").addClass("btn-disabled")
                })
            },
            onConfirm: function (t) {
                var i = e.closest("li").attr("data-id"), n = e.closest("li").index() + 1,
                    s = t.find(".ipt").val().replace(/\s/g, "");
                if (s.length) {
                    s.length > 30 ? $.toast({content: "瀛楁暟涓嶈兘瓒呰繃30", type: "warning"}) : ($.ajax({
                        type: "POST",
                        url: "/wapi/zpgeek/resume/attachment/name/update.json",
                        data: {resumeId: i, customName: s + "." + a},
                        dataType: "json",
                        success: function (e) {
                            0 == e.code ? ($.toast({
                                content: "閲嶅懡鍚嶆垚鍔�",
                                type: "success"
                            }), Attachment.reflushSider()) : $.toast({content: e.resmsg, type: "error"})
                        },
                        error: function () {
                            $.toast({content: "閲嶅懡鍚嶅け璐ワ紝璇风◢鍚庡啀璇�", type: "error"})
                        }
                    }), t.remove());
                    try {
                        _T.sendEvent("rename_resume_" + n)
                    } catch (e) {
                    }
                }
            }
        })
    }, reflushSider: function () {
        $(".user-center").length && Attachment.getUcenterSider($("#async-sider")), $(".position-manage").length && (Attachment.getResumeSider(), Attachment.getAttachmentList())
    }, showUploadDeliver: function (e) {
        $.dialog({
            content: '<div class="upload-dialog-deliver"><p class="gray">鏀寔DOC銆丏OCX銆丳DF銆丣PG銆丳NG鏍煎紡闄勪欢</p><p>鏂囦欢澶у皬涓嶈秴杩�8M</p><div class="btns"><a href="javascript:;" class="btn btn-file">涓婁紶闄勪欢绠€鍘�<input id="fileupload" type="file" name="file" ka="user-resume-upload-file" title="" accept="' + Attachment.getResumeAccept() + '"></a><button type="button" class="btn btn-outline">鍏堣亰鑱�</button></div></div>',
            title: "鎮ㄨ繕娌℃湁涓婁紶闄勪欢绠€鍘�",
            confirmText: "",
            cancelText: "",
            wrapClass: "dialog-primary-default",
            onOpen: function (t) {
                t.find(".btn-file").on("click", function () {
                    Attachment.bindUploadEvent($(this), t)
                }), t.find(".btn-outline").on("click", function () {
                    e && e.callbackChat && e.callbackChat()
                })
            }
        })
    }, showResumeSelecter: function (e, t) {
        for (var i = "", n = 0, s = "", a = e.resumeList || [], o = 0; o < a.length; o++) s += '<li><div class="side">' + a[o].uploadTime + '<span class="size">' + a[o].resumeSizeDesc + '</span><input type="radio" value="' + (a[o].resumeId || a[o].encryptId) + '" /></div><img src="' + staticPath + "/web/geek/images/icon-" + a[o].suffixName.toLowerCase() + '.png" alt="" />' + (a[o].showName || a[o].customName || a[o].originalName) + "</li>";
        s = '<ul class="resume-list">' + s + "</ul>", $.dialog({
            content: s,
            title: "璇烽€夋嫨闇€瑕佹姇閫掔殑闄勪欢绠€鍘�",
            confirmText: "纭畾",
            cancelText: "",
            wrapClass: "choose-resume-dialog",
            onOpen: function (e) {
                var t = e.find(".btn-sure");
                t.addClass("btn-disabled"), e.find(".dialog-container").on("click", ".resume-list li", function () {
                    var e = $(this);
                    e.parent().find("input").prop("checked", !1), e.find("input").prop("checked", !0), t.removeClass("btn-disabled"), i = e.find("input:checked").val(), n = e.index()
                });
                try {
                    _T.sendEvent("show_select_resume_dialog")
                } catch (e) {
                }
            },
            onConfirm: function (e) {
                if (!e.find(".btn-sure").hasClass("btn-disabled")) {
                    if (t && t.callbackConfirm) {
                        t.callbackConfirm(i);
                        try {
                            _T.sendEvent("select_resume_" + n)
                        } catch (e) {
                        }
                    }
                    e.remove()
                }
            }
        })
    }
};
$(function () {
    var e = $(".position-manage").length, t = $(".user-center").length;
    e && Resume.init(), (e || t) && Attachment.init(), $(".resume-update-pop .cancel").click(function () {
        $(".resume-update-pop").hide()
    }), $(".resume-update-pop .jumpto-update").click(function () {
        location.href = "/web/geek/resume"
    })
});
var Guide = {
    init: function () {
        Resume.listenSkills(), Resume.selectCompanyInit(), Resume.selectCityInit();
        var e = $(".experience-info input[name=position]");
        e.length && e.val() && e.attr("level2") && Resume.getSkillsData({
            p1: e.val(),
            p2: e.attr("level2")
        }, !1), $(".guide .container form").each(function () {
            FormsUI.init($(this)), "" != $(this).find(".required").val() ? Validate.init($(this), !1, !0) : Validate.init($(this), !0, !0)
        }), $(".position-info .sub-title span:first-of-type").text(this.setBossCount), $(".btn-footer .prev").on("click", function () {
            Guide.showPrevForms($(this))
        }), $(".guide .change-identity").on("click", function () {
            Guide.changeIdentity()
        }), $(".guide .upload-resume-nlp").on("click", function () {
            Guide.uploadResumeNlp()
        });
        var t = $(".change-identity"), i = $(".upload-resume-nlp");
        $(".base-info").hasClass("hide") ? (t.addClass("hide"), i.addClass("hide")) : (t.removeClass("hide"), i.removeClass("hide")), Guide.$skipExpInfoEl = $(".experience-info .hide"), Guide.$workSkillTipsEl = $(".experience-info .work-skill-tips"), Guide.$freshGraduateEl = $(".base-info .row-fresh-graduate input[name=freshGraduate]"), Guide.$rowSalaryEl = $(".position-info .row-salary"), Guide.$rowRowExpectPositionEl = $(".position-info .row-expect-position"), Guide.$positionInfoFreshGraduateEl = $(".position-info input[name=freshGraduate]"), Guide.$positionNameEl = $(".position-info input[name=positionName]"), Guide.$positionEl = $(".position-info input[name=position]"), Guide.$expectedJobIdEl = $(".position-info input[name=expectedJobId]"), $(".guide .skip").on("click", function () {
            Guide.showNextForms($(this))
        }), $(".base-info").find('input[name="startWorkYearCode"]').length && 0 == $(".base-info").find('input[name="startWorkYearCode"]').val() ? Guide.$skipExpInfoEl.removeClass("hide") : Guide.$skipExpInfoEl.addClass("hide"), $(".ipt-tagsinput").on("itemAdded", function (e) {
            Guide.$workSkillTipsEl.find("li").each(function (t, i) {
                if (i.innerHTML == e.item) return $(this).addClass("selected"), !0
            })
        }).on("itemRemoved", function (e) {
            Guide.$workSkillTipsEl.find("li").each(function (t, i) {
                if (i.innerHTML == e.item) return $(this).removeClass("selected"), !0
            })
        }), $(".serial-area").textarealist(), $("body").hasClass("guide") && $(window).on("beforeunload", function () {
            return "鍐呭灏氭湭淇濆瓨锛岀涓€浠藉ソ宸ヤ綔浠呬粎宸渶鍚庝竴姝ワ紝纭绂诲紑褰撳墠椤甸潰鍚楋紵"
        }), $(".guide .workstartpicker-wrap").on("click", "li", function () {
            var e = $(".guide .row-apply-status"), t = $(".guide .row-fresh-graduate"),
                i = $(".guide .work-or-practice");
            0 == $(this).data("val") ? (Guide.$rowSalaryEl.show(), Guide.$rowSalaryEl.find(".required").prop("disabled", !1), Guide.$rowRowExpectPositionEl.show(), Guide.$rowRowExpectPositionEl.find(".required").prop("disabled", !1), Guide.$positionInfoFreshGraduateEl.val(0), Guide.$positionNameEl.val(""), Guide.$positionEl.val(""), Guide.$expectedJobIdEl.val(normalExpectId || ""), isGeekIntern = !1, e.hide(), t.show().find("input[name=freshGraduate]").prop("disabled", !1), i.text("瀹炰範")) : $(this).hasClass("month") && (Guide.$rowSalaryEl.show(), Guide.$rowSalaryEl.find(".required").prop("disabled", !1), Guide.$rowRowExpectPositionEl.show(), Guide.$rowRowExpectPositionEl.find(".required").prop("disabled", !1), Guide.$positionInfoFreshGraduateEl.val(0), Guide.$positionNameEl.val(""), Guide.$positionEl.val(""), Guide.$expectedJobIdEl.val(normalExpectId || ""), isGeekIntern = !1, e.show(), t.hide().find("label").removeClass("radio-checked").end().find("input[name=freshGraduate]").val("").prop("disabled", !0), i.text("宸ヤ綔"))
        }), $(".guide .row-fresh-graduate").on("click", "label", function () {
            Guide.$positionNameEl.val(""), Guide.$positionEl.val(""), 2 == $(this).data("val") ? (isGeekIntern = !0, Guide.$rowSalaryEl.hide(), Guide.$rowSalaryEl.find(".required").prop("disabled", !0), Guide.$rowRowExpectPositionEl.hide(), Guide.$rowRowExpectPositionEl.find(".required").prop("disabled", !0), Guide.$positionInfoFreshGraduateEl.val(2), Guide.$expectedJobIdEl.val(internExpectId || "")) : (isGeekIntern = !1, Guide.$rowSalaryEl.show(), Guide.$rowSalaryEl.find(".required").prop("disabled", !1), Guide.$rowRowExpectPositionEl.show(), Guide.$rowRowExpectPositionEl.find(".required").prop("disabled", !1), Guide.$positionInfoFreshGraduateEl.val(1), Guide.$expectedJobIdEl.val(normalExpectId || ""))
        })
    }, changeIdentity: function () {
        $.dialog({
            content: '<div style="padding:10px 0;">浣犲綋鍓嶆鍦ㄨ繘琛岀墰浜鸿韩浠界殑淇℃伅瀹屽杽锛岀‘瀹氳鍒囨崲鍒癇OSS韬唤涔堬紵</div>',
            title: "鎿嶄綔鎻愮ず",
            closeText: !0,
            confirmText: "纭畾",
            cancelText: "鍙栨秷",
            wrapClass: "dialog-prop-default",
            onConfirm: function (e) {
                $(window).off("beforeunload"), $.toast({type: "loading", content: "鍒囨崲涓�"}), $.ajax({
                    type: "POST",
                    url: "/user/identity/switch.json",
                    dataType: "JSON",
                    data: {identity: 1},
                    success: function (e) {
                        $("#toast").remove(), 1 == e.rescode ? e.toUrl ? ($.toast({
                            type: "success",
                            content: "鍒囨崲鎴愬姛锛屾鍦ㄨ烦杞�"
                        }), setTimeout(function () {
                            window.location.href = e.toUrl
                        }, 500)) : $.toast({type: "error", content: "鍒囨崲澶辫触"}) : $.toast({
                            type: "error",
                            content: e.resmsg
                        })
                    },
                    error: function () {
                        $("#toast").remove(), $.toast({type: "error", content: "鍒囨崲澶辫触"})
                    }
                });
                try {
                    _T.sendEvent("switch_recruit_ok")
                } catch (e) {
                }
                e.remove()
            },
            onCancel: function (e) {
                try {
                    _T.sendEvent("switch_recruit_cancel")
                } catch (e) {
                }
                e.remove()
            }
        })
    }, uploadResumeNlp: function () {
        $.dialog({
            content: "鎴戜滑灏嗕細蹇€熻瘑鍒绠€鍘嗗苟杞负鐢靛瓙妗ｏ紝纭鍚庡氨鍙互蹇€熻繘琛屾眰鑱屼箣鏃�",
            title: "鍒涘缓涓€浠紹OSS鐩磋仒绠€鍘�",
            closeText: !0,
            confirmText: "",
            cancelText: "杩斿洖鍒涘缓绠€鍘�",
            wrapClass: "dialog-prop-default dialog-resume-nlp",
            onOpen: function (e) {
                e.find(".dialog-footer .btn-sure").html('閫夋嫨鏂囦欢<input id="fileupload" type="file" name="file" accept="application/msword, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document">'), e.find(".dialog-container").append('<div class="over-layer"></div>'), AnalysisResume.initUploadResume(function (e) {
                    AnalysisResume.saveSilent($("#fileupload").data("resume")).then(function () {
                        $(winlowSalarydow).off("beforeunload"), window.location.href = "/web/geek/guide?cvpk=" + e.data.key
                    }, function () {
                        $(window).off("beforeunload"), window.location.href = "/web/geek/guide?cvpk=" + e.data.key
                    })
                }, function () {
                    e.find(".dialog-container").find(".over-layer").hide()
                }, function () {
                    e.find(".dialog-container").find(".over-layer").show()
                })
            },
            onConfirm: function (e) {
            }
        })
    }, __conversion: function (e) {
        try {
            _T.sendEvent(e)
        } catch (e) {
        }
    }, setBossCount: function () {
        return Math.round(4e3 * Math.random() + 1e3)
    }, showPrevForms: function (e) {
        var t = e.closest(".info-box"), i = t.addClass("hide").prev(".info-box").removeClass("hide"),
            n = $(".change-identity");
        i.hasClass("base-info") ? n.removeClass("hide") : n.addClass("hide")
    }, showNextForms: function (e) {
        var t = e.closest(".info-box"), i = t.addClass("hide").next(".info-box").removeClass("hide"),
            n = $(".change-identity");
        i.hasClass("base-info") ? n.removeClass("hide") : n.addClass("hide")
    }, postData: function (form, isAdd) {
        var formEl = form, formWrap = formEl.parents(".info-box"), formIndex = formWrap.index(),
            url = formEl.attr("action"), btnEl = formEl.find('.btn[type="submit"]'), oldText = btnEl.text(),
            ka = "complete-" + formEl.find('button[type="submit"]').attr("ka"), subData = formEl.serialize();
        btnEl.addClass("btn-disabled").text("璇风◢鍚�").css("pointer-events", "none"), $("input[name=birthday]").length && $("input[name=birthday]").is(":disabled") && (subData += "&birthday=" + $("input[name=birthday]").val()), $(".base-info").find('input[name="startWorkYearCode"]').length && 0 == $(".base-info").find('input[name="startWorkYearCode"]').val() ? Guide.$skipExpInfoEl.removeClass("hide") : Guide.$skipExpInfoEl.addClass("hide"), $.ajax({
            type: "POST", url: url, dataType: "JSON", data: subData, success: function (result) {
                if ("string" == typeof result && (result = eval("(" + result + ")")), result.forceFace && (alert("鎮ㄧ殑璐﹀彿褰撳墠澶勪簬涓嶅彲浣跨敤鐘舵€侊紝璇风櫥褰旴OSS鐩磋仒鎵嬫満APP鏌ョ湅璇︽儏"), window.location.href = "/logout/"), 1 == result.rescode) {
                    if (Guide.__conversion(ka), result.toUrl) Guide.processSuccess(result.toUrl); else {
                        if (formEl.data("url")) return void Guide.postAnother(formEl);
                        Guide.showNextForms(formWrap)
                    }
                    result.encryptId && (formEl.find('input[name ="id"]').length ? formEl.find('input[name ="id"]').val(result.encryptId) : formEl.find('input[name ="expectedJobId"]').val(result.encryptId))
                } else Resume.showError(result.resmsg);
                btnEl.removeClass("btn-disabled").text(oldText).css("pointer-events", "auto")
            }, error: function () {
                Resume.showError(),
                    btnEl.removeClass("btn-disabled").text(oldText).css("pointer-events", "auto")
            }
        })
    }, postAnother: function (form) {
        var formEl = form, formWrap = formEl.parents(".info-box"), url = formEl.data("url"),
            btnEl = formEl.find('.btn[type="submit"]'), oldText = btnEl.text(),
            ka = "complete-" + formEl.find('button[type="submit"]').attr("ka"), subData = formEl.serialize();
        btnEl.addClass("btn-disabled").text("璇风◢鍚�").css("pointer-events", "none"), $("input[name=birthday]").length && $("input[name=birthday]").is(":disabled") && (subData += "&birthday=" + $("input[name=birthday]").val()), $.ajax({
            type: "POST",
            url: url,
            dataType: "JSON",
            data: subData,
            success: function (result) {
                "string" == typeof result && (result = eval("(" + result + ")")), result.forceFace && (alert("鎮ㄧ殑璐﹀彿褰撳墠澶勪簬涓嶅彲浣跨敤鐘舵€侊紝璇风櫥褰旴OSS鐩磋仒鎵嬫満APP鏌ョ湅璇︽儏"), window.location.href = "/logout/"), 1 == result.rescode ? (Guide.__conversion(ka), result.toUrl ? Guide.processSuccess(result.toUrl) : Guide.showNextForms(formWrap), result.encryptId && (formEl.find('input[name ="id"]').length ? formEl.find('input[name ="id"]').val(result.encryptId) : formEl.find('input[name ="expectedJobId"]').val(result.encryptId))) : Resume.showError(result.resmsg), btnEl.removeClass("btn-disabled").text(oldText).css("pointer-events", "auto")
            },
            error: function () {
                Resume.showError(), btnEl.removeClass("btn-disabled").text(oldText).css("pointer-events", "auto")
            }
        })
    }, processSuccess: function (e) {
        $(window).off("beforeunload"), $.toast({
            content: "璧勬枡宸插畬鍠�",
            type: "success"
        }), window.location.href.indexOf("maxResumeCount") > -1 ? $.dialog({
            title: "",
            content: "鍚屾椂鍙兘鏈�3浠介檮浠剁畝鍘嗭紝璇峰墠寰€绠€鍘嗛〉鍒犻櫎涓€浠藉悗鍐嶄笂浼�",
            type: "warning",
            closeText: !0,
            confirmText: "鎴戠煡閬撲簡",
            cancelText: "",
            preKa: "",
            wrapClass: "dialog-icons-default",
            lock: !0,
            onConfirm: function (t) {
                try {
                    _T.sendEvent("dialog_over")
                } catch (e) {
                }
                t.remove(), setTimeout(function () {
                    window.location.href = e
                }, 1e3)
            },
            onClose: function (t) {
                t.remove(), setTimeout(function () {
                    window.location.href = e
                }, 1e3)
            }
        }) : setTimeout(function () {
            window.location.href = e
        }, 1e3)
    }, showSugSkillTag: function (e) {
        $.ajax({
            type: "GET",
            url: "/common/data/skill/recommendbyposition.json",
            dataType: "JSON",
            data: {position: e},
            success: function (e) {
                if (1 == e.rescode) {
                    var t = "<ul>";
                    $.each(e.data, function (e, i) {
                        t += "<li>" + i + "</li>"
                    }), t += "</ul>", Guide.$workSkillTipsEl.html(t)
                }
            },
            error: function () {
            }
        })
    }
};
$(function () {
    Guide.init()
});
var UserCheck = {
    checkPhone: function (e, t, i, n, s, a) {
        s = s || (i ? i.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : "***********"), t = t || "/registe/sendSms.json";
        var o = "";
        o += '<div class="sign-form check-phone"><form action="' + e + '" method="post">', o += '<div class="form-row"><span class="cell-title">褰撳墠鐧诲綍璐﹀彿</span><span>' + s + "</span></div>", o += i ? '<input name="phone" value="' + i + '" type="hidden"/>' : "", o += n ? '<input name="regionCode" value="' + n + '" type="hidden"/>' : "", o += '<div class="form-row">', o += '<span class="cell-title" style="vertical-align: top;line-height: 40px;">婊戝姩瀹屾垚楠岃瘉</span><div class="row-code ipt-wrap" style="width: 324px; height: 42px;"></div>', o += '<div class="verifyimg-error red"></div>', o += "</div>", o += '<div class="form-row row-sms">', o += '<span class="cell-title">鐭俊楠岃瘉鐮�</span>', o += '<span class="ipt-wrap">', o += '<i class="icon-sign-sms"></i><input type="text" class="ipt ipt-sms required" placeholder="鐭俊楠岃瘉鐮�" name="phoneCode" maxlength="6" autocomplete="off"/>', o += '<input type="hidden" name="smsType" value="1" /><button type="button" class="btn btn-sms" data-url="' + t + '">鑾峰彇楠岃瘉鐮�</button>', o += '</span><div class="phonecode-error red"></div></div>', o += '<div class="form-footer">', o += '<div class="btns"><button class="btn btn-outline btn-cancel" type="button">鍙栨秷</button><button class="btn btn-sure" type="submit">纭畾</button></div>', o += "</div>", o += '<input type="hidden" name="randomKey" class="randomkey" value=""/>', o += a && a.isWxLogin ? '<input type="hidden" name="isWxLogin" value="true"/>' : "", o += "</form></div>", $.dialog({
            content: o,
            title: "璇烽獙璇佹墜鏈哄彿",
            cancelButton: "鍙栨秷",
            confirmButton: "纭",
            wrapClass: "dialog-prop-default check-phone-wrap",
            closeLayer: !a || !1 !== a.closeLayer,
            closeText: !a || !1 !== a.closeText,
            onOpen: function (e) {
                UserCheck.getRandomkey(e), e.find(".sign-form").data("flow", "sincodeck"), UserCheck.initEvent(e), VerrifyCode.reset(e.find(".row-code"))
            }
        })
    }, initEvent: function (e) {
        e.find("form").on("submit", function (t) {
            UserCheck.checkForm($(this)) && UserCheck.submitForm($(this), !1, e), t.preventDefault()
        }), e.find(".form-footer .btn-cancel").on("click", function () {
            e.find(".dialog-footer .btn-cancel").click()
        }), e.find(".btn-sms").on("click", function () {
            UserCheck.checkForm(e.find("form"), !0) && UserCheck.submitForm(e.find("form"), !0, e)
        }), e.find(".ipt").on("focus", function (e) {
            $(this).parent().addClass("focus-wrap")
        }).on("blur", function () {
            $(this).parent().removeClass("focus-wrap")
        }), e.find(".verifyimg").on("click", function () {
            $(this).attr("src", "/captcha/?randomKey=" + $(this).closest(".form-row").find(".randomkey").val() + "&_r=" + (new Date).getTime());
            try {
                _T.sendEvent("signin_verify_code")
            } catch (e) {
            }
        })
    }, checkForm: function (e, t) {
        var i = $(".check-phone-wrap input[name=csessionId]"), n = e.find(".ipt-sms");
        if (!i.length || "" == i.val()) return UserCheck.showError(e, $(".verifyimg-error"), "璇锋粦鍔ㄥ畬鎴愰獙璇�", !0), i.focus(), !1;
        if ($(".verifyimg-error").text(""), !t) {
            if ("" == n.val()) return UserCheck.showError(e, $(".phonecode-error"), "璇峰～鍐欑煭淇￠獙璇佺爜", !0), n.focus(), !1;
            if (!n.val().match(/^.{4,6}$/)) return UserCheck.showError(e, $(".phonecode-error"), "璇峰～鍐欐纭殑鐭俊楠岃瘉鐮�", !0), n.focus(), !1;
            if (n.val().match(/\D+/)) return UserCheck.showError(e, $(".phonecode-error"), "璇峰～鍐欐纭殑鐭俊楠岃瘉鐮�", !0), n.val(""), n.focus(), !1;
            $(".phonecode-error").text("")
        }
        return !0
    }, submitForm: function (e, t, i) {
        var n = e.find(".btn-sms"), s = e.find(".btn-sure"), a = t ? n.data("url") : e.attr("action");
        t || s.html("鎻愪氦涓�...").addClass("btn-disabled"), $.ajax({
            url: a, type: "post", dataType: "json", data: e.serialize(), success: function (a) {
                a.zpData && (a.rescode = 0 == a.code ? 1 : 1 == a.code ? 0 : a.code, a.type = a.zpData.type, a.resmsg = a.message);
                var o = e.attr("action");
                if (1 != a.rescode && VerrifyCode.reset(e.find(".row-code")), t) if (2 == a.type) if (n.html('宸插彂閫�(<em class="num">60s</em>)').addClass("count-down btn-disabled"), UserCheck.countDown(n, function () {
                    n.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled")
                }), n.parent().find(".ipt-sms").focus(), 4 == a.errorType) {
                    UserCheck.showError(e, $(".phonecode-error"), "鑾峰彇楠岃瘉鐮佽繃浜庨绻侊紝璇风◢鍚庡啀璇�", !0);
                    try {
                        _T.sendEvent("signin_sms_send_lot")
                    } catch (e) {
                    }
                } else try {
                    _T.sendEvent("signin_sms_send_sms")
                } catch (e) {
                } else UserCheck.showError(e, $(".phonecode-error"), a.resmsg, !0), $.toast({
                    type: "error",
                    content: a.resmsg
                }), n.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled"); else if (setTimeout(function () {
                    s.html("纭畾").removeClass("btn-disabled")
                }, 500), "/login/phone.json" == o) if (1 == a.rescode) Sign.callbackSms(e, a), i.remove(); else {
                    i.remove();
                    var r = {code: 0 == a.rescode ? 1 : 1 == a.rescode ? 0 : a.rescode, message: a.resmsg, zpData: a};
                    Sign.dealSignFail($(".sign-pwd").find("form"), n, t, r)
                } else "/wechat/account/unbind.json" == o ? 1 == a.rescode ? (i.remove(), $.toast({
                    type: "success",
                    content: "瑙ｇ粦鎴愬姛"
                }), Account.elSideNav.find("li").eq(Account.convertTypeToIndex(5)).click()) : $.toast({
                    type: "error",
                    content: a.resmsg
                }) : "/wapi/zppassport/login/phone" == o && (0 == a.code ? (Sign.callbackSms(e, a.zpData), i.remove()) : (i.remove(), Sign.dealSignFail($(".sign-pwd").find("form"), n, t, a)))
            }, error: function () {
                $.toast({type: "error", content: "鏈嶅姟鍣ㄥ紓甯�"})
            }
        })
    }, showError: function (e, t, i, n) {
        if (t.text(i), VerrifyCode.reset(e.find(".row-code")), i.indexOf("鐭俊楠岃瘉鐮�") >= 0 && e.find(".ipt-sms").focus().val(""), n) try {
            _T.sendEvent(e.closest(".sign-form").data("flow") + "_error")
        } catch (e) {
        }
        $(window).width() < 800 && UserCheck.showToast(i)
    }, countDown: function (e, t) {
        var i = parseInt(e.find(".num").text().replace("s"), 10);
        UserCheck.interCount = setInterval(function () {
            i--, e.find(".num").text(i + "s"), i <= 0 && (t(), clearInterval(UserCheck.interCount), UserCheck.interCount = null)
        }, 1e3)
    }, showToast: function (e) {
        var t = $('<div class="toast"><p>' + e + "</p></div>");
        $(".toast").length && $(".toast").remove(), UserCheck.timerToast && clearTimeout(UserCheck.timerToast), $("body").append(t), $(".toast").show(), UserCheck.timerToast = setTimeout(function () {
            UserCheck.hideToast(t)
        }, 2e3)
    }, hideToast: function () {
        $(".toast").fadeOut(function () {
            $(".toast").remove()
        })
    }, getRandomkey: function (e) {
        var t = e.find(".ipt-code"), i = t.attr("data-url");
        "" == e.find(".randomkey").val() && $.ajax({
            url: i,
            type: "POST",
            dataType: "json",
            data: {pk: $("#page_key_name").val()},
            success: function (t) {
                1 == t.rescode && (e.find(".randomkey").val(t.randomKey), e.find(".verifyimg").click())
            },
            error: function (e) {
            }
        })
    }
}, browser = {
    versions: function () {
        var e = navigator.userAgent;
        navigator.appVersion;
        return {
            trident: e.indexOf("Trident") > -1,
            presto: e.indexOf("Presto") > -1,
            webKit: e.indexOf("AppleWebKit") > -1,
            gecko: e.indexOf("Gecko") > -1 && -1 == e.indexOf("KHTML"),
            mobile: !!e.match(/AppleWebKit.*Mobile.*/),
            ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: e.indexOf("Android") > -1 || e.indexOf("Adr") > -1,
            iPhone: e.indexOf("iPhone") > -1,
            iPad: e.indexOf("iPad") > -1,
            webApp: -1 == e.indexOf("Safari"),
            weixin: e.indexOf("MicroMessenger") > -1,
            qq: " qq" == e.match(/\sQQ/i)
        }
    }(), language: (navigator.browserLanguage || navigator.language).toLowerCase()
}, ka_pr = "";
(browser.versions.mobile || browser.versions.android || browser.versions.ios) && (ka_pr = "wap_");
var VerrifyCode = window.VerrifyCode || function () {
    var e = new Date, t = e.getFullYear() + "" + e.getMonth() + e.getDay(), i = function (e, i) {
        seriesLoadScripts("//g.alicdn.com/sd/ncpc/nc.js?t=" + t, function () {
            var t = ["BOSS_PC", (new Date).getTime(), Math.random().toString(16)].join(":"), n = {
                renderTo: "#" + e.id,
                appkey: e.appkey || "FFFF0N00000000006DC1",
                scene: e.scene || "nc_login",
                token: t,
                customWidth: i.find(".row-code").width(),
                trans: {position: "sign-sms"},
                elementID: ["sign-sms"],
                is_Opt: 0,
                language: "cn",
                isEnabled: !0,
                timeout: 3e3,
                times: 5,
                apimap: {},
                callback: function (e) {
                    i.find("input[name=csig]").length || (i.find("form").append('<input type="hidden" name="csig" />'), i.find("form").append('<input type="hidden" name="ctoken" />'), i.find("form").append('<input type="hidden" name="csessionId" />'), i.find("form").append('<input type="hidden" value="FFFF0N00000000006DC1" name="cappKey" />'), i.find("form").append('<input type="hidden" value="nc_login" name="cscene" />')), i.find("input[name=csig]").val(e.sig), i.find("input[name=ctoken]").val(t), i.find("input[name=csessionId]").val(e.csessionid)
                }
            };
            setTimeout(function () {
                new noCaptcha(n).upLang("cn", {
                    _startTEXT: "璇锋寜浣忔粦鍧楋紝鎷栧姩鍒版渶鍙宠竟",
                    _yesTEXT: "楠岃瘉閫氳繃",
                    _error300: '鍝庡憖锛屽嚭閿欎簡锛岀偣鍑�<a href="javascript:__nc.reset()">鍒锋柊</a>鍐嶆潵涓€娆�',
                    _errorNetwork: '缃戠粶涓嶇粰鍔涳紝璇�<a href="javascript:__nc.reset()">鐐瑰嚮鍒锋柊</a>'
                })
            }, 1)
        })
    }, n = function (e, i) {
        seriesLoadScripts("//g.alicdn.com/sd/nch5/index.js?t=" + t, function () {
            var t = ["BOSS_H5", (new Date).getTime(), Math.random().toString(16)].join(":"), n = NoCaptcha.init({
                renderTo: "#" + e.id,
                appkey: e.appkey || "FFFF0N00000000006DC1",
                scene: "nc_login_h5",
                token: t,
                customWidth: "100%",
                trans: {position: "sign-h5"},
                elementID: ["sign-h5"],
                is_Opt: 0,
                language: "cn",
                timeout: 1e4,
                retryTimes: 5,
                errorTimes: 5,
                inline: !1,
                apimap: {},
                bannerHidden: !1,
                initHidden: !1,
                callback: function (e) {
                    i.find("input[name=csig]").length || (i.find("form").append('<input type="hidden" name="csig" />'), i.find("form").append('<input type="hidden" name="ctoken" />'), i.find("form").append('<input type="hidden" name="csessionId" />'), i.find("form").append('<input type="hidden" value="FFFF0N00000000006DC1" name="cappKey" />'), i.find("form").append('<input type="hidden" value="nc_login" name="cscene" />')), i.find("input[name=csig]").val(e.sig), i.find("input[name=ctoken]").val(t), i.find("input[name=csessionId]").val(e.csessionid)
                },
                error: function (e) {
                }
            });
            NoCaptcha.setEnabled(!0), n.reset(), NoCaptcha.upLang("cn", {
                LOADING: "鍔犺浇涓�...",
                SLIDER_LABEL: "璇峰悜鍙虫粦鍔ㄩ獙璇�",
                CHECK_Y: "楠岃瘉閫氳繃",
                CHECK_N: "楠岃瘉鏈€氳繃"
            })
        })
    }, s = function (e, t) {
        var s = e || {}, a = t || $(".sign-form:visible");
        if (e || (s.id = a.find(".row-code").attr("id"), s.scene = a.find("input[name=cscene]").val(), s.appkey = a.find("input[name=cappKey]").val()), !s.id) return !1;
        browser.versions.mobile ? n(s, a) : i(s, a)
    }, a = function (e) {
        if (!e || !e.length) return !1;
        var t = e.parents(".sign-form"), i = "verrify" + Math.random().toString(32).substr(-6, 6);
        t.find("input[name=csig]").val(""), t.find("input[name=ctoken]").val(""), t.find("input[name=csessionId]").val(""), e.empty(), e.attr("id", i), s({
            id: i,
            scene: t.find("input[name=cscene]").val(),
            appkey: t.find("input[name=cappKey]").val()
        }, t)
    }, o = function () {
        $(".sign-form .row-code").each(function () {
            a($(this))
        })
    };
    return o(), {build: o, reset: a}
}(), Sign = {
    xhrs: {},
    randomLoading: !1,
    tooLongCode: [400031, 400032, 400062, 400063, 400070, 400071, 4e3, 4002, 4003, 4009, 4022, 4040, 4512],
    init: function (e) {
        Sign.addScanGuide(), e && void 0 !== PlaceholderCheck && PlaceholderCheck.init(), void 0 !== localStorageInstance && localStorageInstance("hasEnterJob", "");
        var t = e || $(".sign-wrap");
        if (Sign.source = getQueryString("s"), Sign.source && (Sign.directUrls = {
            recharge: "/weixin/official/toPay",
            actRecharge: "/special3SignUp/home?signUpId=" + getQueryString("signUpId"),
            wapSem: "/",
            url: getQueryString("jumpUrl") ? decodeURIComponent(getQueryString("jumpUrl")) : "/"
        }), getQueryString("appId") && !t.find("input[name=appId]").length && t.find("form").append('<input type="hidden" name="appId" value="' + getQueryString("appId") + '" />'), function () {
            t.find(".sign-scan .qrcode-box").length && (t.find(".scan-help-down li").eq(1).hide(), t.find(".scan-help-top li").eq(0).css({
                "border-top-left-radius": "20px",
                "border-bottom-left-radius": "20px"
            }), t.find(".scan-help-top li").eq(1).css({
                "border-top-right-radius": "20px",
                "border-bottom-right-radius": "20px"
            }), t.find(".sign-scan .qrcode-box p em, .sign-scan .qrcode-box .sign-scan-help").hover(function () {
                $(this).closest(".qrcode-box").children(".sign-scan-help").show().stop().animate({
                    "margin-left": "0px",
                    opacity: 1
                }, 200)
            }, function () {
                var e = $(this).closest(".qrcode-box").children(".sign-scan-help");
                e.stop().animate({"margin-left": "-10px", opacity: 0}, 200, function () {
                    e.hide()
                })
            })), t.find(".sign-scan .scan-help-tab li").on("click", function () {
                var e = $(this).index();
                $(this).addClass("active").siblings().removeClass("active"), t.find(".scan-help-content li").eq(e).addClass("active").siblings().removeClass("active")
            })
        }(), t.find(".sign-tab").on("click", "span", function () {
            var e = $(this);
            e.hasClass("cur") || (e.hasClass("link-signin") && Sign.showPannel(t, "signin"), e.hasClass("link-sms") && Sign.showPannel(t, "sms"), e.hasClass("link-scan") && Sign.showPannel(t, "scan"))
        }), window.location.href.indexOf("dashboard/separateorders") > -1 && t.find(".sign-tab .link-scan").click(), t.find(".purpose-row").on("click", "span", function () {
            var e = $(this).index(), t = $(this).closest("form");
            t.find('input[name="purpose"]').val(e);
            var i = t.closest(".sign-form").find(".sign-slide-box ul");
            0 === e ? (i.filter(".geek-slide").removeClass("hide"), i.filter(".boss-slide").addClass("hide")) : 1 === e && (i.filter(".geek-slide").addClass("hide"), i.filter(".boss-slide").removeClass("hide")), $(this).addClass("cur").siblings().removeClass("cur"), VerrifyCode.reset($(this).parents(".sign-form").find(".row-code"))
        }), t.find(".text-tip .link-signup").on("click", function () {
            Sign.showPannel(t, "register")
        }), t.find(".text-tip .link-signin").on("click", function () {
            t.find(".sign-pwd").length ? Sign.showPannel(t, "signin") : Sign.showPannel(t, "sms")
        }), t.find(".phone-switch").on("click", function () {
            Sign.showPannel(t, "register"), _T.sendEvent("signup_switch_phone")
        }), t.find(".ewm-switch").on("click", function () {
            Sign.showPannel(t, "miniapp"), _T.sendEvent("signup_switch_ewm")
        }), t.find(".text-tip .link-sms").on("click", function () {
            Sign.showPannel(t, "sms")
        }), t.find(".link-bind-wechat-signin").on("click", function () {
            Sign.showPannel(t, "bind-wechat-signin")
        }), t.find(".link-bind-wechat-signup").on("click", function () {
            Sign.showPannel(t, "bind-wechat-signup")
        }), Sign.dropSelect(t), t.find("form").on("submit", function (e) {
            Sign.checkForm($(this)), e.preventDefault()
        }), t.find(".btn-sms").on("click", function () {
            var e = $(this).closest("form");
            Sign.checkForm(e, !0)
        }), t.find(".ipt").on("focus", function (e) {
            $(this).parent().addClass("focus-wrap")
        }).on("blur", function () {
            $(this).parent().removeClass("focus-wrap")
        }), t.find(".ipt-phone").removeAttr("ka").on("click", function () {
            try {
                _T.sendEvent(ka_pr + $(this).closest(".sign-form").data("flow") + "_mobileck")
            } catch (e) {
            }
        }), t.find(".verifyimg").on("click", function () {
            $(this).attr("src", "/captcha/?randomKey=" + $(this).closest(".form-row").find(".randomkey").val() + "&_r=" + (new Date).getTime());
            try {
                _T.sendEvent("signin_verify_code")
            } catch (e) {
            }
        }), t.find(".sign-form").each(function () {
            $(this).find("form").length && !$(this).find('form input[name="pk"]').length && $(this).find("form").prepend('<input type="hidden" name="pk" value="' + $("#page_key_name").val() + '" />');
            var e = "";
            if ($(this).hasClass("sign-pwd") && (e = "sincode"), $(this).hasClass("sign-sms") && (e = "sinsms"), $(this).hasClass("sign-scan") && (e = "sinqr"), $(this).hasClass("sign-register") && (e = "sup"), $(this).data("flow", ka_pr + e), $(this).is(":visible")) try {
                _T.sendEvent(e + "_load")
            } catch (e) {
            }
            if ($(this).find(".randomkey").length && "" == $(this).find(".randomkey").val()) return Sign.getRandomkey(t, $(this)), !1
        }), $(".invalid-box .btn").on("click", function () {
            var t = $(this).closest(".sign-form");
            t.find(".invalid-box").hide(), t.hasClass("sign-scan") ? (Sign.scanPending(e), Sign.scanValid()) : (Sign.checkIsScanned(t), Sign.RegScanValid(t))
        }), $(".sign-scan").is(":visible")) {
            if (!$(".sign-scan").find(".qrcodeimg-box img").attr("src")) {
                var i = "/wapi/zpweixin/qrcode/getqrcode?content=" + $(".sign-scan .uuid").val() + "&w=200&h=200";
                $(".sign-scan .qrcodeimg-box img").attr("src", i)
            }
            Sign.scanPending(t), Sign.scanValid()
        }
        $(".sign-miniapp").is(":visible") && ($(".sign-miniapp").find(".qrcodeimg-box img").attr("src") || $(".sign-miniapp .qrcodeimg-box img").attr("src", "/wapi/zpgeek/miniapp/" + $(".sign-miniapp .scene").val()), Sign.checkIsScanned($(".sign-miniapp")), Sign.RegScanValid($(".sign-miniapp"))), cookie.get("hasShowLoginTip") ? t.find(".qrcode-tip").hide() : t.find(".qrcode-tip").show(), t.find(".qrcode-tip .gray").on("click", function () {
            t.find(".qrcode-tip").hide(), cookie.set("hasShowLoginTip", "1", 3e4)
        }), Sign.initWechatBind(t);
        var n = e.find("#sign-side");
        n.length && Sign.drawSideSignBg(n[0])
    },
    setWxUrlRandomParam: function (e) {
        return e.indexOf("?") < 0 ? e + "?random=" + (new Date).getTime() : e + "&random=" + (new Date).getTime()
    },
    initWechatBind: function (e) {
        "undefined" != typeof wxBindData && seriesLoadScripts("https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js", function () {
            e.find(".link-wechat-login").on("click", function () {
                $.dialog({
                    title: "",
                    content: '<div class="wechat-login-dialog-layer"></div><div class="wechat-login-wrap"><div id="wechat-login"></div><div class="overdue"><span>浜岀淮鐮佸凡杩囨湡</span><button class="btn btn-refresh">鐐瑰嚮鍒锋柊</button></div></div>',
                    closeText: !0,
                    confirmText: !1,
                    cancelText: !1,
                    wrapClass: "dialog-layer-full dialog-wechat-login",
                    onOpen: function (e) {
                        var t = (new WxLogin({
                            id: "wechat-login",
                            appid: wxBindData.appid || "wxf68ac2d384a75d96",
                            scope: wxBindData.scope,
                            redirect_uri: wxBindData.redirect_uri,
                            state: wxBindData.state,
                            style: "white",
                            href: window.location.origin + "/v2/web/geek/css/wechat-scan.css"
                        }), $(".wechat-login-wrap .overdue"));
                        setTimeout(function () {
                            t.is(":visible") || t.show()
                        }, 6e4), t.find(".btn-refresh").on("click", function () {
                            setTimeout(function () {
                                t.is(":visible") || t.show()
                            }, 6e4), t.hide();
                            new WxLogin({
                                id: "wechat-login",
                                appid: wxBindData.appid,
                                scope: wxBindData.scope,
                                redirect_uri: wxBindData.redirect_uri,
                                state: wxBindData.state,
                                style: "white",
                                href: window.location.origin + "/v2/web/geek/css/wechat-scan.css"
                            })
                        }), $(".wechat-login-dialog-layer").on("click", function () {
                            e.remove()
                        })
                    },
                    onConfirm: function (e) {
                        e.remove()
                    },
                    onClose: function (e) {
                        try {
                            _T.sendEvent("wx_qr_off")
                        } catch (e) {
                        }
                    }
                })
            })
        })
    },
    showPannel: function (e, t) {
        e.find(".sign-form").hide();
        var i, n;
        switch (t) {
            case"signin":
                i = e.find(".sign-pwd"), n = "sincodeck";
                break;
            case"sms":
                i = e.find(".sign-sms"), n = "sinsmsck";
                break;
            case"scan":
                i = e.find(".sign-scan"), n = "sinqrck";
                break;
            case"register":
                i = e.find(".sign-register"), n = "supck";
                break;
            case"welcome":
                i = e.find(".sign-welcome");
                break;
            case"history":
                i = e.find(".sign-history");
                break;
            case"deliver":
                i = e.find(".sign-deliver");
                break;
            case"validate":
                i = e.find(".sign-validate");
                break;
            case"miniapp":
                i = e.find(".sign-miniapp");
                break;
            case"bind-wechat-signin":
                i = e.find(".sign-bind-wechat-signin");
                break;
            case"bind-wechat-signup":
                i = e.find(".sign-bind-wechat-signup")
        }
        if (n) {
            i.data("flow", n);
            try {
                _T.sendEvent(ka_pr + n + "_load")
            } catch (e) {
            }
        }
        Sign.timer && clearTimeout(Sign.timer), i.show(), i.find(".verifyimg").click(), i.find(".qrcodeimg-box img").attr("src") && i.find(".qrcodeimg-box img").attr("src", ""), "scan" == t && Sign.getRandomkey(e, i, function (t) {
            Sign.scanPending(e), Sign.scanValid()
        }), "miniapp" == t && (Sign.checkIsScanned(i), Sign.RegScanValid(i), i.find(".qrcodeimg-box img").attr("src", "/wapi/zpgeek/miniapp/" + i.find(".scene").val()));
        var s = "verrify" + Math.random().toString(32).substr(-10, 6),
            a = e.find(".sign-form:visible").find(".row-code");
        a.attr("id", s), VerrifyCode.reset(a)
    },
    dropSelect: function (e) {
        e.find(".dropdown-select").each(function () {
            $(this).on("click", function () {
                $(this).hasClass("dropdown-disabled") || ($(this).toggleClass("dropdown-select-open"), $(this).closest(".form-row").find(".dropdown-menu").toggleClass("dropdown-menu-open"))
            })
        }), e.find(".dropdown-menu").each(function () {
            var e = $(this), t = e.closest(".form-row").find(".dropdown-select"), i = t.find(".text-select"),
                n = t.find('input[type="hidden"]');
            e.on("click", "li", function () {
                i.text($(this).attr("data-val")), n.val($(this).attr("data-val")), n.closest("dd").find(".tip-text").remove(), e.removeClass("dropdown-menu-open"), t.removeClass("dropdown-select-open")
            })
        }), $(document).on("touchend click", function (t) {
            $(t.target).closest(".dropdown-menu").length || $(t.target).closest(".dropdown-select").length || (e.find(".dropdown-select").removeClass("dropdown-select-open"), e.find(".dropdown-menu").removeClass("dropdown-menu-open"))
        })
    },
    getRandomkey: function (e, t, i) {
        var n = null;
        t.find(".ipt-code").length && (t.find(".ipt-code"), n = t.find(".randomkey")), n && "" != n.val() || Sign.randomLoading || (Sign.randomLoading = !0, Sign.xhrs.randomKey = $.ajax({
            url: "/wapi/zppassport/captcha/randkey",
            type: "POST",
            dataType: "json",
            data: {pk: $("#page_key_name").val()},
            success: function (t) {
                Sign.randomLoading = !1;
                var n = t.zpData;
                0 == t.code && (e.find(".randomkey").val(n.randKey), e.find(".verifyimg").click(), e.find(".qrcodeimg-box img").attr("src", "/wapi/zpweixin/qrcode/getqrcode?content=" + n.qrId + "&w=200&h=200"), e.find(".uuid").val(n.qrId), i && i(n))
            },
            error: function (e) {
            }
        }))
    },
    checkForm: function (e, t) {
        var e = e, i = e.find(".ipt-phone"), n = e.find('input[name="regionCode"]'), s = e.find(".ipt-pwd"),
            a = e.find("input[name=csessionId]"), o = e.find(".ipt-sms"), r = e.find("input[name=policy]"),
            c = (e.find("input[name=policy]"), e.find(".row-code"));
        if (i.length) {
            if ("" == i.val()) {
                Sign.showError(i, "璇峰～鍐欐墜鏈哄彿"), i.focus();
                try {
                    _T.sendEvent(i.closest(".sign-form").data("flow") + "_mobile")
                } catch (e) {
                }
                return !1
            }
            if (/^\D+$/.test(i.val())) return i.val(""), !1;
            if ("+86" == n.val() && !/^(1[3456789][0-9]{9})$/.test(i.val())) {
                Sign.showError(i, "璇锋纭～鍐欐墜鏈哄彿"), i.focus();
                try {
                    _T.sendEvent(i.closest(".sign-form").data("flow") + "_mobile")
                } catch (e) {
                }
                return !1
            }
            if (!/^(\d{6,11})$/.test(i.val())) {
                Sign.showError(i, "璇锋纭～鍐欐墜鏈哄彿"), i.focus();
                try {
                    _T.sendEvent(i.closest(".sign-form").data("flow") + "_mobile")
                } catch (e) {
                }
                return !1
            }
            Sign.hideError(i)
        }
        if (s.length) {
            if ("" == s.val()) return Sign.showError(s, "璇峰～鍐欏瘑鐮�"), s.focus(), !1;
            Sign.hideError(s)
        }
        if (a.length) {
            if ("" == a.val()) return Sign.showError(c, "璇锋粦鍔ㄥ畬鎴愰獙璇�"), a.focus(), !1;
            Sign.hideError(a)
        }
        if (!t && r.length && !r.is(":checked")) return alert("璇烽槄璇诲苟鍚屾剰BOSS鐩磋仒鐢ㄦ埛鍗忚锛屾柟鍙敞鍐�"), !1;
        if (o.length && !t) {
            if ("" == o.val()) return Sign.showError(o, "璇峰～鍐欑煭淇￠獙璇佺爜"), o.focus(), !1;
            if (!o.val().match(/^.{4,6}$/)) return Sign.showError(o, "璇峰～鍐欐纭殑鐭俊楠岃瘉鐮�"), o.focus(), !1;
            if (o.val().match(/\D+/)) return Sign.showError(o, "璇峰～鍐欐纭殑鐭俊楠岃瘉鐮�"), o.val(""), o.focus(), !1;
            Sign.hideError(o)
        }
        Sign.postData(e, t)
    },
    postData: function (formEl, isSms) {
        $(".sign-register").length && ($(".sign-register form").attr("action", "/wapi/zppassport/login/phone"), $(".sign-register").find('input[name="smsType"]').val(7));
        var formEl = formEl, formType = formEl.closest(".sign-form"), btnSms = formEl.find(".btn-sms"),
            url = formEl.attr("action"), btnEl = formEl.find(".form-btn .btn");
        if (isSms) {
            if (btnSms.hasClass("btn-disabled")) return;
            url = "/wapi/zppassport/send/smsCode", btnSms.addClass("btn-disabled").html("璇风◢鍚�")
        } else {
            if (btnEl.hasClass("btn-disabled")) return;
            btnEl.addClass("btn-disabled")
        }
        $.ajax({
            url: url, type: "post", dataType: "json", data: formEl.serialize(), success: function (result) {
                var result = result;
                "string" == typeof result && (result = eval("(" + result + ")")), result.zpData ? Sign.dealSignResult(formEl, formType, btnSms, btnEl, isSms, result) : Sign.dealSignResultOld(formEl, formType, btnSms, btnEl, isSms, result)
            }, error: function (e) {
                Sign.showError(formEl, "鏈嶅姟鍣ㄩ敊璇紝璇风◢鍚庡啀璇�", !0), isSms ? btnSms.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled") : btnEl.removeClass("btn-disabled")
            }
        })
    },
    dealSignResult: function (e, t, i, n, s, a) {
        var o = a.zpData,
            r = "/registe/headhunter/save.json" == e.attr("action") || "/registe/save.json" == e.attr("action") || "/wapi/zppassport/user/registered" == e.attr("action");
        if ((0 != a.code && 6 != a.code || 2 == o.type && r || 4 == o.type) && VerrifyCode.reset(e.find(".row-code")), 0 == a.code) {
            if (t.hasClass("sign-pwd") && Sign.callbackPwd(e, o), t.hasClass("sign-sms")) if (s) if (i.html('宸插彂閫� <em class="num">60s</em>').addClass("count-down btn-disabled"), Sign.countDown(i, function () {
                i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled")
            }), i.parent().find(".ipt-sms").focus(), 4 == o.errorType) {
                Sign.showError(e, "鑾峰彇楠岃瘉鐮佽繃浜庨绻侊紝璇风◢鍚庡啀璇�", !0);
                try {
                    _T.sendEvent("signin_sms_send_lot")
                } catch (e) {
                }
            } else try {
                _T.sendEvent("signin_sms_send_sms")
            } catch (e) {
            } else Sign.callbackSms(e, o);
            if (t.hasClass("sign-register")) if (s) {
                i.html('宸插彂閫� <em class="num">60s</em>').addClass("count-down btn-disabled"), Sign.countDown(i, function () {
                    i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled")
                }), i.parent().find(".ipt-sms").focus(), e.append('<input type="hidden" name="rescode" value="1" />');
                try {
                    _T.sendEvent("signin_register_send_sms")
                } catch (e) {
                }
            } else "function" == typeof _PAGE.RegisterCallback ? _PAGE.RegisterCallback() : QuickSign.callbackRegister(e, o);
            if (t.hasClass("sign-bind-wechat-signin")) if (s) if (2 == o.type) if (i.html('宸插彂閫� <em class="num">60s</em>').addClass("count-down btn-disabled"), Sign.countDown(i, function () {
                i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled")
            }), i.parent().find(".ipt-sms").focus(), 4 == o.errorType) {
                Sign.showError(e, "鑾峰彇楠岃瘉鐮佽繃浜庨绻侊紝璇风◢鍚庡啀璇�", !0);
                try {
                    _T.sendEvent("signin_sms_send_lot")
                } catch (e) {
                }
            } else try {
                _T.sendEvent("signin_sms_send_sms")
            } catch (e) {
            } else Sign.showError(e, a.message, !0), i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled"); else Sign.callbackWechatBind(e, o);
            if (t.hasClass("sign-bind-wechat-signup")) if (s) if (2 == o.type) Sign.showError(e, a.message, !0), i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled"); else {
                i.html('宸插彂閫� <em class="num">60s</em>').addClass("count-down btn-disabled"), Sign.countDown(i, function () {
                    i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled")
                }), i.parent().find(".ipt-sms").focus();
                try {
                    _T.sendEvent("signin_register_send_sms")
                } catch (e) {
                }
            } else Sign.callbackWechatBindRegister(e, o);
            if (t.hasClass("sign-resume")) if (s) if (i.html('宸插彂閫� <em class="num">60s</em>').addClass("count-down btn-disabled"), Sign.countDown(i, function () {
                i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled")
            }), i.parent().find(".ipt-sms").focus(), 4 == o.errorType) {
                Sign.showError(e, "鑾峰彇楠岃瘉鐮佽繃浜庨绻侊紝璇风◢鍚庡啀璇�", !0);
                try {
                    _T.sendEvent("signin_sms_send_lot")
                } catch (e) {
                }
            } else try {
                _T.sendEvent("signin_sms_send_sms")
            } catch (e) {
            } else AnalysisResume.signOrRegisterCallback(e, o);
            if (t.hasClass("sign-quick")) if (s) if (i.html('宸插彂閫� <em class="num">60s</em>').addClass("count-down btn-disabled"), Sign.countDown(i, function () {
                i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled")
            }), i.parent().find(".ipt-sms").focus(), e.append('<input type="hidden" name="rescode" value="1" />'), 4 == o.errorType) {
                Sign.showError(e, "鑾峰彇楠岃瘉鐮佽繃浜庨绻侊紝璇风◢鍚庡啀璇�", !0);
                try {
                    _T.sendEvent("signin_sms_send_lot")
                } catch (e) {
                }
            } else try {
                _T.sendEvent("signin_sms_send_sms")
            } catch (e) {
            } else QuickSign.callbackRegister(e, o)
        } else 4545 == a.code ? Sign.showError(e, a.message, !0) : Sign.dealSignFail(e, i, s, a);
        s || n.removeClass("btn-disabled")
    },
    toScanLogin: function () {
        $.dialog({
            title: "鎻愮ず",
            content: "涓轰簡鎮ㄧ殑璐﹀彿瀹夊叏锛屾湰娆＄櫥褰曢渶瑕丄PP鎵爜鐧诲綍",
            closeText: !0,
            cancelText: "",
            confirmText: "鍘绘壂鐮�",
            wrapClass: "dialog-prop-default pop-sign-wechat",
            onConfirm: function (e) {
                e.remove(), Sign.action({action: "user-sao-safety-click"}), $(".semwrap7").length ? ("none" == $(".pop-sign-wrap").css("display") && $(".show-pop-sign").click(), Sign.showPannel($(".pop-sign"), "scan")) : ($(".sign-form ").hide(), $(".sign-scan").show(), $(".sign-tab .link-scan").click())
            }
        })
    },
    action: function (e) {
        var t = $.extend({}, e);
        $.ajax({
            method: "post",
            url: "/wapi/zpCommon/actionLog/common.json",
            data: {ba: JSON.stringify(t)},
            cache: !1,
            success: function (e) {
            },
            error: function () {
            }
        })
    },
    dealSignFail: function (e, t, i, n) {
        var s = n.zpData || {};
        if (0 == n.code) {
            var a = {
                content: n.message, confirmButton: "鐭ラ亾浜�", openCallback: function (e) {
                    e.$confirmButton.parent().css("text-align", "center")
                }
            };
            Sign.showConfirm(a), i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val(""), e.find(".verifyimg").click()
        } else if (7 == n.code || 8 == n.code) {
            if (7 == n.code && 2 == s.bizcode) {
                var a = {
                    content: '<div class="sign-hunter-gray">濡傛灉鎮ㄦ槸鐚庡ご锛岃璇锋嫧鎵撳鏈嶇數璇濓細400-0655-799杩涜鐢宠瘔銆傚悓浜嬪凡缁忔敞鍐屾垚鍔烞oss鐩磋仒鐚庡ご鐗堬紝璇峰皢TA鐨勬墜鏈哄彿鎻愪緵缁欏鏈嶃€�</div>',
                    title: "姝よ处鍙峰湪BOSS鐩磋仒琚娆′妇鎶ワ紝鏆備笉鏀寔浣跨敤",
                    confirmButton: "鐭ラ亾浜�",
                    columnClass: "pop-sign-hunter"
                };
                Sign.showConfirm(a)
            } else if (7 == n.code && 3 == n.bizcode) {
                var a = {
                    content: '<p>鎮ㄥ綋鍓嶈韩浠戒负BOSS锛屾槸鍚﹀垏鎹负鐚庡ご锛�</p><ul class="pop-content"><li>涓虹墰浜烘湇鍔★紝涓ョ鐚庡ご鍐掑厖BOSS</li><li>鍒囨崲涓虹寧澶磋韩浠藉悗锛屾偍灏嗚幏寰桞OSS鐩磋仒鐨勯珮绔墰浜虹畝鍘嗭紝浜湁鏇村叿绔炰簤鍔涚殑鐚庡ご浼氬憳鏈嶅姟銆�</li><li>鐚庡ご韬唤鐢熸晥鍚庯紝鎮ㄤ笉鑳戒互BOSS韬唤鐧诲綍APP</li><li>鎮ㄧ殑BOSS鐩磋仒璐︽埛涓湁<span class="orange">閫€娆�' + n.balance + "鍏�</span>锛屽垏鎹负鐚庡ご韬唤鍚庯紝鍙互鍒癇OSS鐩磋仒寰俊鍏紬鍙蜂腑鎻愮幇</li></ul>",
                    title: "鎮ㄥ皢瑕佸垏鎹负鐚庡ご韬唤",
                    cancelButton: "鍙栨秷",
                    confirmButton: "鍒囨崲涓虹寧澶�",
                    columnClass: "pop-sign-hunter",
                    openCallback: function (e) {
                        e.$confirmButton.parent().css("text-align", "center")
                    },
                    confirmCallback: function () {
                        window.location.href = "/user/transto/headhunter.html?token=" + n.token
                    },
                    cancelCallback: function () {
                        window.location.href = "https://www.zhipin.com/logoutToUrl/?toUrl=https://lie.zhipin.com"
                    }
                };
                Sign.showConfirm(a)
            } else if (7 != n.code || 3 != s.bizcode && 4 != s.bizcode) if (7 != n.code || 6 != s.bizcode && 8 != s.bizcode) if (7 == n.code && 5 == s.bizcode) {
                var a = {
                    content: '<div class="sign-hunter-gray">濡傛灉鎮ㄦ槸鐚庡ご锛岃璇锋嫧鎵撳鏈嶇數璇濓細400-0655-799杩涜鐢宠瘔銆傚悓浜嬪凡缁忔敞鍐屾垚鍔烞oss鐩磋仒鐚庡ご鐗堬紝璇峰皢TA鐨勬墜鏈哄彿鎻愪緵缁欏鏈嶃€�</div>',
                    title: "姝よ处鍙峰湪BOSS鐩磋仒琚娆′妇鎶ワ紝鏆備笉鏀寔浣跨敤",
                    confirmButton: "鐭ラ亾浜�",
                    columnClass: "pop-sign-hunter"
                };
                Sign.showConfirm(a)
            } else if (7 == n.code && 11 == s.bizcode) {
                try {
                    _T.sendEvent("hunter_account_freeze")
                } catch (e) {
                }
                var a = {
                    content: '<div class="sign-hunter-gray">鐢变簬鎮ㄧ殑璐﹀彿娑夊強杩濊锛屾殏涓嶆敮鎸佷娇鐢ㄣ€�</div>',
                    title: "璐﹀彿閿佸畾",
                    confirmButton: "鐭ラ亾浜�",
                    columnClass: "pop-sign-hunter"
                };
                Sign.showConfirm(a)
            } else if (7 == n.code && 12 == s.bizcode) {
                try {
                    _T.sendEvent("hunter_account_locked")
                } catch (e) {
                }
                var a = {
                    content: '<div class="sign-hunter-gray">                            <i class="icon-fail"></i>                            <div class="freeze-container"><p class="reject-title">闈炲父鎶辨瓑锛屾偍鐨勮处鍙峰凡琚喕缁�</p>                            <p class="reject-reason">' + n.message + '</p>                            <p>鎮ㄥ彲浠ラ€氳繃浠ヤ笅鏂瑰紡鐢宠瘔</p>                            <div class="reject-content">                            璇蜂娇鐢ㄩ偖绠憋細' + s.userEmail + "<br />鍙戦€侀偖浠惰嚦boss@kanzhun.com<br />                            閭欢鏍囬鏍煎紡锛氬喕缁撶敵璇�+鎮ㄧ殑娉ㄥ唽鎵嬫満鍙�<br />                            閭欢鍐呭璇峰～鍐欐偍鐨勫叕鍙稿叏绉板拰鍏朵粬鐢宠瘔鍐呭                            </div></div>                            </div>",
                    title: "",
                    closeIcon: !0,
                    confirmButton: "鐭ラ亾浜�",
                    columnClass: "pop-sign-hunter sign-freeze"
                };
                Sign.showConfirm(a)
            } else {
                var a = {
                    content: n.message, confirmButton: "鐭ラ亾浜�", openCallback: function (e) {
                        e.$confirmButton.parent().css("text-align", "center")
                    }
                };
                Sign.showConfirm(a)
            } else {
                var a = {
                    content: '<div class="sign-hunter-gray">鎮ㄧ殑BOSS鐩磋仒璐︽埛涓湁鏈娇鐢ㄧ殑閬撳叿銆佹湭娑堣€楃殑鐩磋眴锛屽垏鎹负鐚庡ご韬唤鍚庡皢鏃犳硶浣跨敤銆�<br />\t\t\t\t\t\t\t璇峰厛鐧诲綍APP灏嗕粯璐逛骇鍝佹秷鑰椼€佺洿璞嗘秷鑰楋紝鍐嶉噸鏂扮櫥褰曠寧澶寸銆�</div>',
                    title: "璇锋偍鍏堟竻绌轰粯璐逛骇鍝�",
                    confirmButton: "鐭ラ亾浜�",
                    columnClass: "pop-sign-hunter"
                };
                Sign.showConfirm(a)
            } else {
                var a = {
                    content: '<div class="sign-hunter-gray">鎮ㄧ殑BOSS鐩磋仒璐︽埛涓湁鏈娇鐢ㄧ殑閬撳叿銆佹湭娑堣€楃殑鐩磋眴锛屽垏鎹负鐚庡ご韬唤鍚庡皢鏃犳硶浣跨敤銆�<br />\t\t\t\t\t\t\t璇峰厛鐧诲綍APP灏嗕粯璐逛骇鍝佹秷鑰椼€佺洿璞嗘秷鑰楋紝鍐嶉噸鏂扮櫥褰曠寧澶寸銆�</div>',
                    title: "璇锋偍鍏堟竻绌轰粯璐逛骇鍝�",
                    confirmButton: "鐭ラ亾浜�",
                    columnClass: "pop-sign-hunter"
                };
                Sign.showConfirm(a)
            }
            i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val(""), e.find(".verifyimg").click()
        } else if (9 == n.code) {
            if (1 == s.bizcode || 0 == s.bizcode) {
                var a = {
                    content: '<p>鎮ㄥ綋鍓嶈韩浠戒负BOSS锛屾槸鍚﹀垏鎹负鐚庡ご锛�</p><ul class="pop-content"><li>涓虹墰浜烘湇鍔★紝涓ョ鐚庡ご鍐掑厖BOSS</li><li>鍒囨崲涓虹寧澶磋韩浠藉悗锛屾偍灏嗚幏寰桞OSS鐩磋仒鐨勯珮绔墰浜虹畝鍘嗭紝浜湁鏇村叿绔炰簤鍔涚殑鐚庡ご浼氬憳鏈嶅姟銆�</li><li>鐚庡ご韬唤鐢熸晥鍚庯紝鎮ㄤ笉鑳戒互BOSS韬唤鐧诲綍APP</li></ul>',
                    title: "鎮ㄥ皢瑕佸垏鎹负鐚庡ご韬唤",
                    cancelButton: "鍙栨秷",
                    confirmButton: "鍒囨崲涓虹寧澶�",
                    columnClass: "pop-sign-hunter",
                    openCallback: function (e) {
                        e.$confirmButton.parent().css("text-align", "center")
                    },
                    confirmCallback: function () {
                        window.location.href = "/user/transto/headhunter.html?token=" + s.token
                    },
                    cancelCallback: function () {
                        window.location.href = "https://www.zhipin.com/logoutToUrl/?toUrl=https://lie.zhipin.com"
                    }
                };
                Sign.showConfirm(a)
            } else if (7 == s.bizcode) {
                var a = {
                    content: '<p>鎮ㄥ綋鍓嶇郴缁熻韩浠戒负鐗涗汉锛屾槸鍚﹀垏鎹负鐚庡ご锛�</p><ul class="pop-content"><li>鍒囨崲涓虹寧澶磋韩浠藉悗锛屾偍灏嗚幏寰桞OSS鐩磋仒鐨勯珮绔墰浜虹畝鍘嗭紝浜湁鏇村叿绔炰簤鍔涚殑鐚庡ご浼氬憳鏈嶅姟銆�</li><li>鐚庡ご韬唤鐢熸晥鍚庯紝鎮ㄤ笉鑳戒互鐗涗汉韬唤鐧诲綍APP</li></ul>',
                    title: "鎮ㄥ皢瑕佸垏鎹负鐚庡ご韬唤",
                    cancelButton: "鍙栨秷",
                    confirmButton: "鍒囨崲涓虹寧澶�",
                    columnClass: "pop-sign-hunter",
                    openCallback: function (e) {
                        e.$confirmButton.parent().css("text-align", "center")
                    },
                    confirmCallback: function () {
                        window.location.href = "/user/transto/headhunter.html?token=" + s.token
                    },
                    cancelCallback: function () {
                        window.location.href = "https://www.zhipin.com/logoutToUrl/?toUrl=https://lie.zhipin.com"
                    }
                };
                Sign.showConfirm(a)
            } else if (6 == s.bizcode || 8 == s.bizcode) {
                var a = {
                    content: '<p>鎮ㄥ凡娉ㄥ唽杩嘊OSS鐩磋仒锛屾槸鍚﹀垏鎹负鐚庡ご韬唤锛�</p><ul class="pop-content"><li>涓虹墰浜烘湇鍔★紝涓ョ鐚庡ご鍐掑厖BOSS</li><li>鍒囨崲涓虹寧澶磋韩浠藉悗锛屾偍灏嗚幏寰桞OSS鐩磋仒鐨勯珮绔墰浜虹畝鍘嗭紝浜湁鏇村叿绔炰簤鍔涚殑鐚庡ご浼氬憳鏈嶅姟銆�</li><li class="bold">鎮ㄧ殑BOSS鐩磋仒璐︽埛涓墿浣�' + s.beancount + "涓洿璞嗭紝鍒囨崲涓虹寧澶磋韩浠藉悗鏃犳硶浣跨敤銆備絾鐩磋眴浠嶄細淇濈暀銆�</li><li>鐚庡ご韬唤鐢熸晥鍚庯紝鎮ㄤ笉鑳戒互鐗涗汉鎴朆OSS韬唤鐧诲綍APP</li></ul>",
                    title: "鎮ㄥ皢瑕佸垏鎹负鐚庡ご韬唤",
                    cancelButton: "鍙栨秷",
                    confirmButton: "鍒囨崲涓虹寧澶�",
                    columnClass: "pop-sign-hunter",
                    openCallback: function (e) {
                        e.$confirmButton.parent().css("text-align", "center")
                    },
                    confirmCallback: function () {
                        window.location.href = "/user/transto/headhunter.html?token=" + s.token
                    },
                    cancelCallback: function () {
                        window.location.href = "https://www.zhipin.com/logoutToUrl/?toUrl=https://lie.zhipin.com"
                    }
                };
                Sign.showConfirm(a)
            } else if (-1 == n.code) Sign.showError(e, n.message); else {
                var a = {
                    content: '<p>鎮ㄥ綋鍓嶈韩浠戒负BOSS锛岃閫夋嫨鏄惁灏嗚韩浠藉垏鎹负鐚庡ご</p><ul class="pop-content"><li>閫夋嫨鐚庡ご韬唤鍚庯紝鎮ㄥ皢浠ョ寧澶磋韩浠藉彂甯冭亴浣嶃€佹悳绱㈡煡鐪媆t绠€鍘嗐€佹洿楂樻晥鐨勮仈绯荤墰浜�</li><li>鐚庡ご韬唤涓嶣OSS韬唤鍙彲閫夋嫨涓€涓紝閫夋嫨鐚庡ご韬唤鍚庯紝涓嶈兘鍐嶄互Boss韬唤鐧诲綍</li></ul>',
                    title: "閫夋嫨韬唤",
                    cancelButton: "鍙栨秷",
                    confirmButton: "鍒囨崲涓虹寧澶�",
                    columnClass: "pop-sign-hunter",
                    openCallback: function (e) {
                        e.$confirmButton.parent().css("text-align", "center")
                    },
                    confirmCallback: function () {
                        window.location.href = "/user/transto/headhunter.html?token=" + s.token
                    },
                    cancelCallback: function () {
                        window.location.href = "https://www.zhipin.com/logoutToUrl/?toUrl=https://lie.zhipin.com"
                    }
                };
                Sign.showConfirm(a)
            }
            i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val(""), e.find(".verifyimg").click()
        } else if (6 == n.code) Sign.showError(e, "鐭俊楠岃瘉鐮侀敊璇�", !0); else if (10002 == n.code) $.dialog({
            title: "",
            content: '<div style="padding: 4px 0 30px;">璇峰垏鎹㈣嚦鐗涗汉韬唤锛屽啀閲嶆柊灏濊瘯</div>',
            type: "error",
            closeText: !0,
            confirmText: "纭畾",
            cancelText: !1,
            preKa: "",
            wrapClass: "dialog-icons-default",
            lock: !0
        }); else if (10004 == n.code) $.dialog({
            title: "",
            content: '<div style="padding: 4px 0 30px;">鎮ㄧ殑绠€鍘嗕俊鎭凡瀹屽杽锛岀洿鎺ュ幓鐧诲綍鍗冲彲 </div>',
            type: "error",
            closeText: !0,
            confirmText: "纭畾",
            cancelText: !1,
            preKa: "",
            wrapClass: "dialog-icons-default",
            lock: !0
        }); else if (400023 == n.code) UserCheck.checkPhone("/login/phone.json", null, e.find("input[name=account]").val(), e.find("input[name=regionCode]").val()); else if (400046 == n.code) $.dialog({
            title: "缁戝畾澶辫触",
            content: "鎮ㄥ綋鍓嶄娇鐢ㄧ殑寰俊鍙峰凡缁戝畾杩嘊OSS鐩磋仒璐﹀彿锛岃鐧诲綍鍏朵粬寰俊鍙峰啀閲嶈瘯",
            closeText: !0,
            cancelText: "",
            confirmText: "鐭ラ亾浜�",
            wrapClass: "dialog-prop-default pop-sign-wechat",
            onConfirm: function (e) {
                e.remove()
            }
        }), i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val(""), e.find(".verifyimg").click(); else if (400041 == n.code) $.dialog({
            title: "缁戝畾澶辫触",
            content: "褰撳墠BOSS鐩磋仒璐﹀彿宸茬粦瀹氳繃寰俊锛屽彲鐩存帴浣跨敤鍏宠仈鐨勫井淇℃壂鐮佺櫥褰�",
            closeText: !0,
            cancelText: "",
            confirmText: "鐭ラ亾浜�",
            wrapClass: "dialog-prop-default pop-sign-wechat",
            onConfirm: function (e) {
                e.remove()
            }
        }), i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val(""), e.find(".verifyimg").click(); else if (n.code > 4e5 && n.code < 401e3) if (Sign.tooLongCode.indexOf(n.code)) {
            var o = "";
            switch (n.code) {
                case 400026:
                    o = "鏍规嵁鐩稿叧娉曞緥瑙勫畾锛屽洜鎮ㄦ湭婊�16鍛ㄥ瞾锛屾殏涓嶆敮鎸佷娇鐢紝鐩磋嚦鎮ㄥ勾婊�16鍛ㄥ瞾璐﹀彿鑷姩瑙ｅ喕锛�";
                    break;
                case 400027:
                    o = "璐﹀彿宸插喕缁擄紝璇风櫥褰旴OSS鐩磋仒 APP 鎸夌収鎻愮ず瀹屾垚瑙ｅ喕鎿嶄綔銆�";
                    break;
                case 400021:
                    o = "璇ユ墜鏈哄彿宸叉敞閿€锛屾棤娉曟敞鍐�";
                    break;
                case 400033:
                case 400034:
                    o = "鎮ㄧ殑璐︽埛瀛樺湪瀹夊叏闅愭偅锛岃浣跨敤鐭俊楠岃瘉鐮佺櫥褰曘€�";
                    break;
                default:
                    o = n.message
            }
            $.dialog({
                title: "鎻愮ず",
                content: o,
                closeText: !0,
                cancelText: "",
                confirmText: "鐭ラ亾浜�",
                wrapClass: "dialog-prop-default",
                onConfirm: function (e) {
                    e.remove()
                }
            }), i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val("")
        } else Sign.showError(e, n.message, !0), i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val(""); else if (n.code > 4e3 && n.code < 5e3) if (4002 === n.code) {
            var r = "400-065-5799", c = "https://lie.zhipin.com";
            n.zpData && (n.zpData.link && (c = n.zpData.link), n.zpData.tel && (r = function (e, t) {
                var i, n, s = $.trim(e), a = "", o = "", r = 0, c = 0;
                for (t.indexOf("-") > -1 ? (i = t.split("-"), o = "-") : (i = t.split(" "), o = "-"), r = 0; r < i.length; r++) n = c + Number(i[r]), a += s.substring(c, n), r < i.length - 1 && (a += o), c = n;
                return a
            }(n.zpData.tel, "3-3-4"))), $.dialog({
                title: "鏆備笉鏀寔鐧婚檰",
                content: "鎮ㄥ凡娉ㄥ唽BOSS鐩磋仒鐩寸寧閭︼紝璇峰墠寰€鐩寸寧閭︿娇鐢ㄣ€傝嫢鎮ㄥ凡涓嶆槸鐚庡ご锛屽彲鑷寸數瀹㈡湇娉ㄩ攢鐚庡ご韬唤銆�",
                closeText: !0,
                cancelText: "鑱旂郴瀹㈡湇",
                confirmText: "鍓嶅線鐩寸寧閭�",
                wrapClass: "dialog-prop-default",
                onConfirm: function (e) {
                    e.remove(), window.open(c)
                },
                onCancel: function (e) {
                    e.remove(), $.dialog({
                        title: "",
                        content: "瀹㈡湇鐑嚎锛�" + r,
                        closeText: !0,
                        cancelText: !1,
                        confirmText: "鐭ラ亾浜�",
                        wrapClass: "dialog-prop-default",
                        onConfirm: function (e) {
                            e.remove()
                        },
                        onCancel: function (e) {
                            e.remove()
                        }
                    })
                }
            })
        } else if (Sign.tooLongCode.indexOf(n.code)) {
            var o = "";
            n.code, o = n.message, $.dialog({
                title: "鎻愮ず",
                content: o,
                closeText: !0,
                cancelText: "",
                confirmText: "鐭ラ亾浜�",
                wrapClass: "dialog-prop-default",
                onConfirm: function (e) {
                    e.remove()
                }
            }), i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val("")
        } else Sign.showError(e, n.message, !0), i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val(""); else Sign.showError(e, n.message, !0), i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val("")
    },
    dealSignResultOld: function (e, t, i, n, s, a) {
        var o = "/registe/headhunter/save.json" == e.attr("action") || "/registe/save.json" == e.attr("action");
        if ((1 != a.rescode && 6 != a.rescode || 2 == a.type && o || 4 == a.type) && VerrifyCode.reset(e.find(".row-code")), 1 == a.rescode) {
            if (t.hasClass("sign-pwd") && Sign.callbackPwd(e, a), t.hasClass("sign-sms")) if (s) if (2 == a.type) if (i.html('宸插彂閫� <em class="num">60s</em>').addClass("count-down btn-disabled"), Sign.countDown(i, function () {
                i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled")
            }), i.parent().find(".ipt-sms").focus(), 4 == a.errorType) {
                Sign.showError(e, "鑾峰彇楠岃瘉鐮佽繃浜庨绻侊紝璇风◢鍚庡啀璇�", !0);
                try {
                    _T.sendEvent("signin_sms_send_lot")
                } catch (e) {
                }
            } else try {
                _T.sendEvent("signin_sms_send_sms")
            } catch (e) {
            } else Sign.showError(e, a.resmsg, !0), i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled"); else Sign.callbackSms(e, a);
            if (t.hasClass("sign-register")) if (s) if (2 == a.type) Sign.showError(e, a.resmsg, !0), i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled"); else if (i.html('宸插彂閫� <em class="num">60s</em>').addClass("count-down btn-disabled"), Sign.countDown(i, function () {
                i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled")
            }), i.parent().find(".ipt-sms").focus(), 4 == a.errorType) {
                Sign.showError(e, "鑾峰彇楠岃瘉鐮佽繃浜庨绻侊紝璇风◢鍚庡啀璇�", !0);
                try {
                    _T.sendEvent("signin_sms_send_lot")
                } catch (e) {
                }
            } else {
                e.append('<input type="hidden" name="rescode" value="1" />');
                try {
                    _T.sendEvent("signin_sms_send_sms")
                } catch (e) {
                }
            } else "function" == typeof _PAGE.RegisterCallback ? _PAGE.RegisterCallback() : QuickSign.callbackRegister(e, a);
            if (t.hasClass("sign-bind-wechat-signin")) if (s) if (2 == a.type) if (i.html('宸插彂閫� <em class="num">60s</em>').addClass("count-down btn-disabled"), Sign.countDown(i, function () {
                i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled")
            }), i.parent().find(".ipt-sms").focus(), 4 == a.errorType) {
                Sign.showError(e, "鑾峰彇楠岃瘉鐮佽繃浜庨绻侊紝璇风◢鍚庡啀璇�", !0);
                try {
                    _T.sendEvent("signin_sms_send_lot")
                } catch (e) {
                }
            } else try {
                _T.sendEvent("signin_sms_send_sms")
            } catch (e) {
            } else Sign.showError(e, a.resmsg, !0), i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled"); else Sign.callbackWechatBind(e, a);
            if (t.hasClass("sign-bind-wechat-signup")) if (s) if (2 == a.type) Sign.showError(e, a.resmsg, !0), i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled"); else {
                i.html('宸插彂閫� <em class="num">60s</em>').addClass("count-down btn-disabled"), Sign.countDown(i, function () {
                    i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled")
                }), i.parent().find(".ipt-sms").focus();
                try {
                    _T.sendEvent("signin_register_send_sms")
                } catch (e) {
                }
            } else Sign.callbackWechatBindRegister(e, a);
            if (t.hasClass("sign-resume")) if (s) if (i.html('宸插彂閫� <em class="num">60s</em>').addClass("count-down btn-disabled"), Sign.countDown(i, function () {
                i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled")
            }), i.parent().find(".ipt-sms").focus(), 4 == a.errorType) {
                Sign.showError(e, "鑾峰彇楠岃瘉鐮佽繃浜庨绻侊紝璇风◢鍚庡啀璇�", !0);
                try {
                    _T.sendEvent("signin_sms_send_lot")
                } catch (e) {
                }
            } else try {
                _T.sendEvent("signin_sms_send_sms")
            } catch (e) {
            } else AnalysisResume.signOrRegisterCallback(e, a);
            if (t.hasClass("sign-quick")) if (s) if (2 == a.type) Sign.showError(e, a.resmsg, !0), i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled"); else if (i.html('宸插彂閫� <em class="num">60s</em>').addClass("count-down btn-disabled"), Sign.countDown(i, function () {
                i.html("鍙戦€侀獙璇佺爜").removeClass("count-down btn-disabled")
            }), i.parent().find(".ipt-sms").focus(), 4 == a.errorType) {
                Sign.showError(e, "鑾峰彇楠岃瘉鐮佽繃浜庨绻侊紝璇风◢鍚庡啀璇�", !0);
                try {
                    _T.sendEvent("signin_sms_send_lot")
                } catch (e) {
                }
            } else {
                e.append('<input type="hidden" name="rescode" value="1" />');
                try {
                    _T.sendEvent("signin_sms_send_sms")
                } catch (e) {
                }
            } else QuickSign.callbackRegister(e, a)
        } else Sign.dealSignFailOld(e, i, s, a);
        s || n.removeClass("btn-disabled")
    },
    dealSignFailOld: function (e, t, i, n) {
        if (0 == n.rescode) {
            var s = {
                content: n.resmsg, confirmButton: "鐭ラ亾浜�", openCallback: function (e) {
                    e.$confirmButton.parent().css("text-align", "center")
                }
            };
            Sign.showConfirm(s), i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val(""), e.find(".verifyimg").click()
        } else if (7 == n.rescode || 8 == n.rescode) {
            if (7 == n.rescode && 2 == n.bizcode) {
                var s = {
                    content: '<div class="sign-hunter-gray">濡傛灉鎮ㄦ槸鐚庡ご锛岃璇锋嫧鎵撳鏈嶇數璇濓細400-0655-799杩涜鐢宠瘔銆傚悓浜嬪凡缁忔敞鍐屾垚鍔烞oss鐩磋仒鐚庡ご鐗堬紝璇峰皢TA鐨勬墜鏈哄彿鎻愪緵缁欏鏈嶃€�</div>',
                    title: "姝よ处鍙峰湪BOSS鐩磋仒琚娆′妇鎶ワ紝鏆備笉鏀寔浣跨敤",
                    confirmButton: "鐭ラ亾浜�",
                    columnClass: "pop-sign-hunter"
                };
                Sign.showConfirm(s)
            } else if (7 != n.rescode || 3 != n.bizcode && 4 != n.bizcode) if (7 != n.rescode || 6 != n.bizcode && 8 != n.bizcode) if (7 == n.rescode && 5 == n.bizcode) {
                var s = {
                    content: '<div class="sign-hunter-gray">濡傛灉鎮ㄦ槸鐚庡ご锛岃璇锋嫧鎵撳鏈嶇數璇濓細400-0655-799杩涜鐢宠瘔銆傚悓浜嬪凡缁忔敞鍐屾垚鍔烞oss鐩磋仒鐚庡ご鐗堬紝璇峰皢TA鐨勬墜鏈哄彿鎻愪緵缁欏鏈嶃€�</div>',
                    title: "姝よ处鍙峰湪BOSS鐩磋仒琚娆′妇鎶ワ紝鏆備笉鏀寔浣跨敤",
                    confirmButton: "鐭ラ亾浜�",
                    columnClass: "pop-sign-hunter"
                };
                Sign.showConfirm(s)
            } else if (7 == n.rescode && 11 == n.bizcode) {
                try {
                    _T.sendEvent("hunter_account_freeze")
                } catch (e) {
                }
                var s = {
                    content: '<div class="sign-hunter-gray">鐢变簬鎮ㄧ殑璐﹀彿娑夊強杩濊锛屾殏涓嶆敮鎸佷娇鐢ㄣ€�</div>',
                    title: "璐﹀彿閿佸畾",
                    confirmButton: "鐭ラ亾浜�",
                    columnClass: "pop-sign-hunter"
                };
                Sign.showConfirm(s)
            } else if (7 == n.rescode && 12 == n.bizcode) {
                try {
                    _T.sendEvent("hunter_account_locked")
                } catch (e) {
                }
                var s = {
                    content: '<div class="sign-hunter-gray">                            <i class="icon-fail"></i>                            <div class="freeze-container"><p class="reject-title">闈炲父鎶辨瓑锛屾偍鐨勮处鍙峰凡琚喕缁�</p>                            <p class="reject-reason">' + n.resmsg + '</p>                            <p>鎮ㄥ彲浠ラ€氳繃浠ヤ笅鏂瑰紡鐢宠瘔</p>                            <div class="reject-content">                            璇蜂娇鐢ㄩ偖绠憋細' + n.userEmail + "<br />鍙戦€侀偖浠惰嚦boss@kanzhun.com<br />                            閭欢鏍囬鏍煎紡锛氬喕缁撶敵璇�+鎮ㄧ殑娉ㄥ唽鎵嬫満鍙�<br />                            閭欢鍐呭璇峰～鍐欐偍鐨勫叕鍙稿叏绉板拰鍏朵粬鐢宠瘔鍐呭                            </div></div>                            </div>",
                    title: "",
                    closeIcon: !0,
                    confirmButton: "鐭ラ亾浜�",
                    columnClass: "pop-sign-hunter sign-freeze"
                };
                Sign.showConfirm(s)
            } else {
                var s = {
                    content: n.resmsg, confirmButton: "鐭ラ亾浜�", openCallback: function (e) {
                        e.$confirmButton.parent().css("text-align", "center")
                    }
                };
                Sign.showConfirm(s)
            } else {
                var s = {
                    content: '<div class="sign-hunter-gray">鎮ㄧ殑BOSS鐩磋仒璐︽埛涓湁鏈娇鐢ㄧ殑閬撳叿銆佹湭娑堣€楃殑鐩磋眴鎴栭挶鍖呬腑鏈夐€€娆撅紝鍒囨崲涓虹寧澶磋韩浠藉悗灏嗘棤娉曚娇鐢ㄣ€�<br />\t\t\t\t\t\t\t璇峰厛鐧诲綍APP灏嗕粯璐逛骇鍝佹秷鑰楁垨棰嗗彇绾㈠寘锛屽啀閲嶆柊鐧诲綍鐚庡ご绔€�</div>',
                    title: "璇锋偍鍏堟竻绌轰粯璐逛骇鍝併€佺洿璞嗘垨棰嗗彇绾㈠寘",
                    confirmButton: "鐭ラ亾浜�",
                    columnClass: "pop-sign-hunter"
                };
                Sign.showConfirm(s)
            } else {
                var s = {
                    content: '<div class="sign-hunter-gray">鎮ㄧ殑BOSS鐩磋仒璐︽埛涓湁鏈娇鐢ㄧ殑閬撳叿銆佹垨閽卞寘涓湁閫€娆撅紝鍒囨崲涓虹寧澶磋韩浠藉悗灏嗘棤娉曚娇鐢ㄣ€�<br />\t\t\t\t\t\t\t璇峰厛鐧诲綍APP灏嗕粯璐逛骇鍝佹秷鑰楁垨棰嗗彇绾㈠寘锛屽啀閲嶆柊鐧诲綍鐚庡ご绔€�</div>',
                    title: "璇锋偍鍏堟竻绌轰粯璐逛骇鍝佹垨棰嗗彇绾㈠寘",
                    confirmButton: "鐭ラ亾浜�",
                    columnClass: "pop-sign-hunter"
                };
                Sign.showConfirm(s)
            }
            i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val(""), e.find(".verifyimg").click()
        } else if (9 == n.rescode) {
            if (1 == n.bizcode || 0 == n.bizcode) {
                var s = {
                    content: '<p>鎮ㄥ綋鍓嶈韩浠戒负BOSS锛屾槸鍚﹀垏鎹负鐚庡ご锛�</p><ul class="pop-content"><li>涓虹墰浜烘湇鍔★紝涓ョ鐚庡ご鍐掑厖BOSS</li><li>鍒囨崲涓虹寧澶磋韩浠藉悗锛屾偍灏嗚幏寰桞OSS鐩磋仒鐨勯珮绔墰浜虹畝鍘嗭紝浜湁鏇村叿绔炰簤鍔涚殑鐚庡ご浼氬憳鏈嶅姟銆�</li><li>鐚庡ご韬唤鐢熸晥鍚庯紝鎮ㄤ笉鑳戒互BOSS韬唤鐧诲綍APP</li></ul>',
                    title: "鎮ㄥ皢瑕佸垏鎹负鐚庡ご韬唤",
                    cancelButton: "鍙栨秷",
                    confirmButton: "鍒囨崲涓虹寧澶�",
                    columnClass: "pop-sign-hunter",
                    openCallback: function (e) {
                        e.$confirmButton.parent().css("text-align", "center")
                    },
                    confirmCallback: function () {
                        window.location.href = "/user/transto/headhunter.html?token=" + n.token
                    },
                    cancelCallback: function () {
                        window.location.href = "https://www.zhipin.com/logoutToUrl/?toUrl=https://lie.zhipin.com"
                    }
                };
                Sign.showConfirm(s)
            } else if (7 == n.bizcode) {
                var s = {
                    content: '<p>鎮ㄥ綋鍓嶇郴缁熻韩浠戒负鐗涗汉锛屾槸鍚﹀垏鎹负鐚庡ご锛�</p><ul class="pop-content"><li>鍒囨崲涓虹寧澶磋韩浠藉悗锛屾偍灏嗚幏寰桞OSS鐩磋仒鐨勯珮绔墰浜虹畝鍘嗭紝浜湁鏇村叿绔炰簤鍔涚殑鐚庡ご浼氬憳鏈嶅姟銆�</li><li>鐚庡ご韬唤鐢熸晥鍚庯紝鎮ㄤ笉鑳戒互鐗涗汉韬唤鐧诲綍APP</li></ul>',
                    title: "鎮ㄥ皢瑕佸垏鎹负鐚庡ご韬唤",
                    cancelButton: "鍙栨秷",
                    confirmButton: "鍒囨崲涓虹寧澶�",
                    columnClass: "pop-sign-hunter",
                    openCallback: function (e) {
                        e.$confirmButton.parent().css("text-align", "center")
                    },
                    confirmCallback: function () {
                        window.location.href = "/user/transto/headhunter.html?token=" + n.token
                    },
                    cancelCallback: function () {
                        window.location.href = "https://www.zhipin.com/logoutToUrl/?toUrl=https://lie.zhipin.com"
                    }
                };
                Sign.showConfirm(s)
            } else if (6 == n.bizcode || 8 == n.bizcode) {
                var s = {
                    content: '<p>鎮ㄥ凡娉ㄥ唽杩嘊OSS鐩磋仒锛屾槸鍚﹀垏鎹负鐚庡ご韬唤锛�</p><ul class="pop-content"><li>涓虹墰浜烘湇鍔★紝涓ョ鐚庡ご鍐掑厖BOSS</li><li>鍒囨崲涓虹寧澶磋韩浠藉悗锛屾偍灏嗚幏寰桞OSS鐩磋仒鐨勯珮绔墰浜虹畝鍘嗭紝浜湁鏇村叿绔炰簤鍔涚殑鐚庡ご浼氬憳鏈嶅姟銆�</li><li class="bold">鎮ㄧ殑BOSS鐩磋仒璐︽埛涓墿浣�' + n.beancount + "涓洿璞嗭紝鍒囨崲涓虹寧澶磋韩浠藉悗鏃犳硶浣跨敤銆備絾鐩磋眴浠嶄細淇濈暀銆�</li><li>鐚庡ご韬唤鐢熸晥鍚庯紝鎮ㄤ笉鑳戒互鐗涗汉鎴朆OSS韬唤鐧诲綍APP</li></ul>",
                    title: "鎮ㄥ皢瑕佸垏鎹负鐚庡ご韬唤",
                    cancelButton: "鍙栨秷",
                    confirmButton: "鍒囨崲涓虹寧澶�",
                    columnClass: "pop-sign-hunter",
                    openCallback: function (e) {
                        e.$confirmButton.parent().css("text-align", "center")
                    },
                    confirmCallback: function () {
                        window.location.href = "/user/transto/headhunter.html?token=" + n.token
                    },
                    cancelCallback: function () {
                        window.location.href = "https://www.zhipin.com/logoutToUrl/?toUrl=https://lie.zhipin.com"
                    }
                };
                Sign.showConfirm(s)
            } else if (-1 == n.rescode) Sign.showError(e, n.resmsg); else {
                var s = {
                    content: '<p>鎮ㄥ綋鍓嶈韩浠戒负BOSS锛岃閫夋嫨鏄惁灏嗚韩浠藉垏鎹负鐚庡ご</p><ul class="pop-content"><li>閫夋嫨鐚庡ご韬唤鍚庯紝鎮ㄥ皢浠ョ寧澶磋韩浠藉彂甯冭亴浣嶃€佹悳绱㈡煡鐪媆t绠€鍘嗐€佹洿楂樻晥鐨勮仈绯荤墰浜�</li><li>鐚庡ご韬唤涓嶣OSS韬唤鍙彲閫夋嫨涓€涓紝閫夋嫨鐚庡ご韬唤鍚庯紝涓嶈兘鍐嶄互Boss韬唤鐧诲綍</li></ul>',
                    title: "閫夋嫨韬唤",
                    cancelButton: "鍙栨秷",
                    confirmButton: "鍒囨崲涓虹寧澶�",
                    columnClass: "pop-sign-hunter",
                    openCallback: function (e) {
                        e.$confirmButton.parent().css("text-align", "center")
                    },
                    confirmCallback: function () {
                        window.location.href = "/user/transto/headhunter.html?token=" + n.token
                    },
                    cancelCallback: function () {
                        window.location.href = "https://www.zhipin.com/logoutToUrl/?toUrl=https://lie.zhipin.com"
                    }
                };
                Sign.showConfirm(s)
            }
            i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val(""), e.find(".verifyimg").click()
        } else if (6 == n.rescode) Sign.showError(e, "鐭俊楠岃瘉鐮侀敊璇�", !0); else if (10002 == n.rescode) $.dialog({
            title: "",
            content: '<div style="padding: 4px 0 30px;">璇峰垏鎹㈣嚦鐗涗汉韬唤锛屽啀閲嶆柊灏濊瘯</div>',
            type: "error",
            closeText: !0,
            confirmText: "纭畾",
            cancelText: !1,
            preKa: "",
            wrapClass: "dialog-icons-default",
            lock: !0
        }); else if (10004 == n.rescode) $.dialog({
            title: "",
            content: '<div style="padding: 4px 0 30px;">鎮ㄧ殑绠€鍘嗕俊鎭凡瀹屽杽锛岀洿鎺ュ幓鐧诲綍鍗冲彲 </div>',
            type: "error",
            closeText: !0,
            confirmText: "纭畾",
            cancelText: !1,
            preKa: "",
            wrapClass: "dialog-icons-default",
            lock: !0
        }); else if (400023 == n.rescode) UserCheck.checkPhone("/login/phone.json", null, e.find("input[name=account]").val(), e.find("input[name=regionCode]").val()); else if (400046 == n.rescode) $.dialog({
            title: "缁戝畾澶辫触",
            content: "鎮ㄥ綋鍓嶄娇鐢ㄧ殑寰俊鍙峰凡缁戝畾杩嘊OSS鐩磋仒璐﹀彿锛岃鐧诲綍鍏朵粬寰俊鍙峰啀閲嶈瘯",
            closeText: !0,
            cancelText: "",
            confirmText: "鐭ラ亾浜�",
            wrapClass: "dialog-prop-default pop-sign-wechat",
            onConfirm: function (e) {
                e.remove()
            }
        }), i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val(""), e.find(".verifyimg").click(); else if (400041 == n.rescode) $.dialog({
            title: "缁戝畾澶辫触",
            content: "褰撳墠BOSS鐩磋仒璐﹀彿宸茬粦瀹氳繃寰俊锛屽彲鐩存帴浣跨敤鍏宠仈鐨勫井淇℃壂鐮佺櫥褰�",
            closeText: !0,
            cancelText: "",
            confirmText: "鐭ラ亾浜�",
            wrapClass: "dialog-prop-default pop-sign-wechat",
            onConfirm: function (e) {
                e.remove()
            }
        }), i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val(""), e.find(".verifyimg").click(); else if (n.rescode > 4e5 && n.rescode < 401e3) if (400031 == n.rescode) Sign.showError(e, n.resmsg, !0); else {
            var a = "";
            switch (n.rescode) {
                case 400026:
                    a = "鏍规嵁鐩稿叧娉曞緥瑙勫畾锛屽洜鎮ㄦ湭婊�16鍛ㄥ瞾锛屾殏涓嶆敮鎸佷娇鐢紝鐩磋嚦鎮ㄥ勾婊�16鍛ㄥ瞾璐﹀彿鑷姩瑙ｅ喕锛�";
                    break;
                case 400027:
                    a = "璐﹀彿宸插喕缁擄紝璇风櫥褰旴OSS鐩磋仒 APP 鎸夌収鎻愮ず瀹屾垚瑙ｅ喕鎿嶄綔銆�";
                    break;
                case 400021:
                    a = "璇ユ墜鏈哄彿宸叉敞閿€锛屾棤娉曟敞鍐�";
                    break;
                case 400033:
                case 400034:
                    a = "鎮ㄧ殑璐︽埛瀛樺湪瀹夊叏闅愭偅锛岃浣跨敤鐭俊楠岃瘉鐮佺櫥褰曘€�";
                    break;
                default:
                    a = n.resmsg
            }
            $.dialog({
                title: "鎻愮ず",
                content: a,
                closeText: !0,
                cancelText: "",
                confirmText: "鐭ラ亾浜�",
                wrapClass: "dialog-prop-default",
                onConfirm: function (e) {
                    e.remove()
                }
            }), i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val("")
        } else Sign.showError(e, n.resmsg, !0), i && t.html("鍙戦€侀獙璇佺爜").removeClass("btn-disabled"), e.find(".ipt-code").val("")
    },
    callbackPwd: function (e, t) {
        try {
            _T.sendEvent(e.closest(".sign-form").data("flow") + "_done")
        } catch (e) {
        }
        return Sign.source ? void (window.location.href = Sign.setWxUrlRandomParam(Sign.directUrls[Sign.source])) : isZpdesk && 1 != t.identity ? void Sign.showDeskGeekTip() : ($(".semwrap").length && (window.location.href = "/"), void (t.toUrl ? window.location.href = Sign.setWxUrlRandomParam(decodeURIComponent(t.toUrl)) : 1 == t.identity ? window.location.href = Sign.setWxUrlRandomParam("https://www.zhipin.com/chat/im") : $(".page-sign").length ? window.location.href = Sign.setWxUrlRandomParam("https://www.zhipin.com/") : window.location.href = Sign.setWxUrlRandomParam(window.location.href)))
    },
    callbackSms: function (e, t) {
        e.closest(".sign-form").find(".tip-error");
        try {
            _T.sendEvent(e.closest(".sign-form").data("flow") + "_done")
        } catch (e) {
        }
        return Sign.source ? void (window.location.href = Sign.directUrls[Sign.source]) : isZpdesk && 1 != t.identity ? void Sign.showDeskGeekTip() : $(".semwrap").length ? void (window.location.href = "/") : void (t.toUrl ? window.location.href = Sign.setWxUrlRandomParam(decodeURIComponent(t.toUrl)) : 1 == t.identity ? window.location.href = Sign.setWxUrlRandomParam("https://www.zhipin.com/chat/im") : $(".page-sign").length ? window.location.href = Sign.setWxUrlRandomParam("https://www.zhipin.com/") : window.location.href = Sign.setWxUrlRandomParam(window.location.href))
    },
    callbackWechatBind: function (e, t) {
        try {
            _T.sendEvent(e.closest(".sign-form").data("flow") + "_done")
        } catch (e) {
        }
        return Sign.source ? void (window.location.href = Sign.directUrls[Sign.source]) : isZpdesk && 1 != t.identity ? void Sign.showDeskGeekTip() : void (t.toUrl ? window.location.href = Sign.setWxUrlRandomParam(decodeURIComponent(t.toUrl)) : 1 == t.identity ? window.location.href = Sign.setWxUrlRandomParam("https://www.zhipin.com/chat/im") : $(".page-sign").length ? window.location.href = Sign.setWxUrlRandomParam("https://www.zhipin.com/") : window.location.href = Sign.setWxUrlRandomParam(window.location.href))
    },
    callbackWechatBindRegister: function (e, t) {
        var i = $(".sign-wrap"), n = e.find('input[name="purpose"]').val(), s = "g";
        "1" == n && (s = "b");
        try {
            _T.sendEvent(e.closest(".sign-form").data("flow") + "_done_" + s)
        } catch (e) {
        }
        if (e.closest(".pop-sign-box").length && (i = e.closest(".pop-sign-box")), t.toUrl) {
            $.toast({content: "娉ㄥ唽鎴愬姛锛屾鍦ㄤ负鎮ㄨ烦杞埌瀹屽杽椤甸潰", type: "success"});
            var a = "";
            a = -1 != t.toUrl.indexOf("http") ? t.toUrl : "https://www.zhipin.com" + t.toUrl, window.location.href = decodeURIComponent(a)
        } else Sign.source ? ($.toast({content: "娉ㄥ唽鎴愬姛", type: "success"}), setTimeout(function () {
            window.location.href = Sign.directUrls[Sign.source]
        }, 3e3)) : Sign.showPannel(i, "welcome")
    },
    callbackRegister: function (e, t) {
        var i = $(".sign-wrap"), n = e.find('input[name="purpose"]').val(), s = "g";
        "1" == n && (s = "b");
        try {
            _T.sendEvent(e.closest(".sign-form").data("flow") + "_done_" + s)
        } catch (e) {
        }
        if (e.closest(".pop-sign-box").length && (i = e.closest(".pop-sign-box")), t.toUrl) {
            $.toast({content: "娉ㄥ唽鎴愬姛锛岃嚜鍔ㄨ烦杞畬鍠勯〉闈�", type: "success"});
            var a = "";
            a = -1 != t.toUrl.indexOf("http") ? t.toUrl : "https://www.zhipin.com" + t.toUrl, window.location.href = decodeURIComponent(a)
        } else {
            if (Sign.source) return $.toast({
                content: "娉ㄥ唽鎴愬姛",
                type: "success"
            }), void (window.location.href = Sign.directUrls[Sign.source]);
            Sign.showPannel(i, "welcome")
        }
    },
    addScanGuide: function () {
        $(".download-btn").hover(function () {
            $(".app-load-box").show().stop().animate({"margin-left": "0px", opacity: 1}, 200)
        }, function () {
            $(".app-load-box").stop().animate({"margin-left": "-10px", opacity: 0}, 200, function () {
                $(".app-load-box").hide()
            })
        }), $(".page-sign .sign-wrap-v2 .scan-switch").on("click", function () {
            $(".page-sign .sign-wrap-v2 .sign-pwd .sign-tab .link-scan").click()
        }), $(".page-sign .sign-wrap-v2 .pwd-switch").on("click", function () {
            Sign.showPannel($(".page-sign .sign-wrap"), "signin")
        }), $(".page-sign .sign-wrap-v2 .scan-login-btn").on("click", function () {
            $(".page-sign .sign-wrap-v2 .sign-pwd .sign-tab .link-scan").click()
        }), $(".page-sign .sign-wrap-v2 .pwd-login-btn").on("click", function () {
            Sign.showPannel($(".page-sign .sign-wrap"), "signin")
        })
    },
    callbackCheckRegister: function (e, t) {
        try {
            _T.sendEvent(e.closest(".sign-form").data("flow") + "_done")
        } catch (e) {
        }
        var i = e.parents(".login-wechat").find(".bind-box"), n = i.find("form"),
            s = i.find('form .btn[type="submit"]');
        e.parents(".login-wechat .register-box").addClass("hide"), i.removeClass("hide"), i.find(".ipt-phone").val(t.account), Sign.init(i), t.isRegistered ? (n.attr("action", "/login/headhunter/phone.json"), n.find('input[name="smsType"]').val(4), s.text("鐧诲綍锛屽苟缁戝畾鎵嬫満鍙�")) : (n.attr("action", "/registe/headhunter/save.json"), n.parents(".sign-form").removeClass(".sign-sms"), n.find('input[name="smsType"]').val(5), s.text("娉ㄥ唽"), n.parents(".sign-form").removeClass("sign-sms").addClass("sign-register"))
    },
    showConfirm: function (e) {
        $.confirm({
            content: e.content,
            title: e.title,
            closeIcon: !!e.closeIcon && e.closeIcon,
            cancelButton: !!e.cancelButton && e.cancelButton,
            confirmButton: !!e.confirmButton && e.confirmButton,
            columnClass: e.columnClass || "defaultConfirm",
            backgroundDismiss: !1,
            onOpen: function () {
                e.openCallback && e.openCallback(this)
            },
            confirm: function () {
                e.confirmCallback && e.confirmCallback()
            },
            cancel: function () {
                e.cancelCallback && e.cancelCallback()
            }
        })
    },
    showError: function (e, t, i) {
        var n = e.closest(".sign-form"), s = e.closest(".form-row").find(".tip-error");
        if (s.length || (s = n.find(".tip-error-form")), s.length || (s = n.find(".tip-error").eq(0)), s.text(t).show(), "鐭俊楠岃瘉鐮侀敊璇�" == t && n.find(".ipt-sms").focus().val(""), i) try {
            _T.sendEvent(n.closest(".sign-form").data("flow") + "_error")
        } catch (e) {
        }
        isTouch && $(window).width() < 800 && Sign.showToast(t), (n.hasClass("sign-bind-wechat-signin") || n.hasClass("sign-bind-wechat-signup")) && $.toast({
            type: "error",
            content: t
        })
    },
    hideError: function (e) {
        var t = e.find(".tip-error");
        t.length || (t = e.closest(".sign-form").find(".tip-error")), t.text(""), (e.closest(".sign-wrap").hasClass("sign-wrap-v2") || e.closest(".pop-sign-box").hasClass("sign-wrap-v2")) && t.hide()
    },
    showToast: function (e) {
        var t = $('<div class="toast"><p>' + e + "</p></div>");
        $(".toast").length && $(".toast").remove(), Sign.timerToast && clearTimeout(Sign.timerToast), $("body").append(t), $(".toast").show(), Sign.timerToast = setTimeout(function () {
            Sign.hideToast(t)
        }, 2e3)
    },
    hideToast: function () {
        $(".toast").fadeOut(function () {
            $(".toast").remove()
        })
    },
    countDown: function (e, t) {
        var i = parseInt(e.find(".num").text().replace("s"), 10);
        Sign.interCount = setInterval(function () {
            i--, e.find(".num").text(i + "s"), i <= 0 && (t(), clearInterval(Sign.interCount), Sign.interCount = null)
        }, 1e3)
    },
    scanValid: function () {
        Sign.timer = setTimeout(function () {
            $(".sign-scan .invalid-box").show()
        }, 18e4)
    },
    scanJump: function (e, t, i, n) {
        $.ajax({
            type: "GET",
            url: "/wapi/zppassport/qrcode/dispatcher",
            data: {qrId: t},
            dataType: "json",
            cache: !1,
            timeout: 1e5,
            success: function (t) {
                Sign.action({action: "user-sao-success"}), 0 == t.code && t.zpData.toUrl && (n = t.zpData.toUrl);
                var s = "";
                $(".semwrap").length && (s = n.indexOf("?") > -1 ? "&jumpUrl=/" : "?jumpUrl=/");
                var a = e.find(".sign-scan").length ? e.find(".sign-scan").data("flow") : "web";
                "validate" in i && i.validate ? (Sign.sendKaEvent(a + "_done"), isZpdesk ? Sign.checkDeskIsBoss(function (e) {
                    1 == e ? window.location.href = n : Sign.showDeskGeekTip()
                }) : window.location.href = n + s) : "allweb" in i && i.allweb ? (Sign.sendKaEvent(a + "_done"), isZpdesk ? Sign.checkDeskIsBoss(function (e) {
                    1 == e ? window.location.href = n + s : Sign.showDeskGeekTip()
                }) : window.location.href = n + s) : ("validate" in i && i.validate, Sign.sendKaEvent(a + "_error"), setTimeout("window.location.reload()", 3e3))
            },
            error: function () {
                e.find(".sign-scan").is(":visible") && "none" == $(".sign-scan .invalid-box").css("display") && setTimeout(function () {
                    Sign.scanPending(e)
                }, 5e3)
            }
        })
    },
    scanPending: function (e) {
        var t = e.find(".sign-scan .uuid").val(), i = e.find(".sign-scan .qrcodeimg-box img").data("url"), n = this;
        t && e.find(".sign-scan").is(":visible") && $.ajax({
            type: "GET",
            url: "/scan?uuid=" + t,
            dataType: "json",
            cache: !1,
            timeout: 1e5,
            success: function (s) {
                s.scaned ? s.newScaned ? ($(".sign-scan .qrcode-box").hide(), $(".sign-scan .text-tip").hide(), $(".sign-scan .login-step-box").show(), n.scanGetHeadImg(t), n.scanLogin(e, t, s, i + t)) : n.scanJump(e, t, s, i + t) : e.find(".sign-scan").is(":visible") && "none" == $(".sign-scan .invalid-box").css("display") && Sign.scanPending(e)
            },
            error: function () {
                e.find(".sign-scan").is(":visible") && "none" == $(".sign-scan .invalid-box").css("display") && setTimeout(function () {
                    Sign.scanPending(e)
                }, 5e3)
            }
        })
    },
    scanGetHeadImg: function (e) {
        $.ajax({
            type: "GET",
            url: "/wapi/zppassport/qrcode/getHeadImg?qrId=" + e,
            dataType: "json",
            cache: !1,
            timeout: 1e5,
            success: function (e) {
                0 == e.code && e.zpData && e.zpData.large && $(".sign-scan .login-step-box img").attr("src", e.zpData.large)
            },
            error: function () {
            }
        })
    },
    scanLogin: function (e, t, i, n) {
        var s = this;
        $.ajax({
            type: "GET",
            url: "/wapi/zppassport/qrcode/scanLogin?qrId=" + t,
            dataType: "json",
            cache: !1,
            timeout: 1e5,
            success: function (i) {
                if (i.scaned) if (i.login) $(".sign-scan .login-step-text .login-step-title").text("姝ｅ湪鐧诲綍..."), $(".sign-scan .login-step-text .login-step-detail").hide(), Sign.scanJump(e, t, i, n); else {
                    $(".sign-scan .qrcode-box").show(), $(".sign-scan .text-tip").show(), $(".sign-scan .login-step-box").hide();
                    var a = e.find(".sign-scan");
                    Sign.getRandomkey(e, a, function (t) {
                        Sign.scanPending(e), Sign.scanValid()
                    })
                } else s.scanLogin(e, t, i, n)
            },
            error: function () {
                setTimeout(function () {
                    s.scanLogin(e, t, i, n)
                }, 5e3)
            }
        })
    },
    showDeskGeekTip: function () {
        $.confirm({
            content: "浣犲綋鍓嶆槸鐗涗汉韬唤锛岃鍦� BOSS鐩磋仒 APP 鐨勩€庤缃€忛€夐」涓垏鎹㈣韩浠藉悗閲嶈瘯",
            title: "璇峰垏鎹负 Boss 韬唤鍚庣櫥褰�",
            closeIcon: !1,
            cancelButton: !1,
            confirmButton: "纭畾",
            columnClass: "",
            backgroundDismiss: !1,
            onOpen: function () {
                this.$confirmButton.parent().css("text-align", "center")
            },
            confirm: function () {
            },
            error: function (e) {
            }
        })
    },
    checkDeskIsBoss: function (e) {
        $.ajax({
            type: "post", url: "/user/identity/check.json", dataType: "json", success: function (t) {
                1 == t.rescode ? e(t.identity) : alert("鐧诲綍澶辫触锛岃绋嶅悗鍐嶈瘯")
            }, error: function () {
                alert("鐧诲綍澶辫触锛岃绋嶅悗鍐嶈瘯")
            }
        })
    },
    checkIsScanned: function (e) {
        var t = e.find(".scene").val(), i = e.find(".qrcodeimg-box img").data("url");
        t && e.is(":visible") && $.ajax({
            type: "GET",
            url: "/scan?uuid=" + t,
            dataType: "json",
            cache: !1,
            timeout: 1e5,
            success: function (n) {
                n.scaned ? (_T.sendEvent("wx_sao_success_" + t), $(".sign-wrap .sign-form").hide(), $(".sign-succ").show(), setTimeout(function () {
                    window.location.href = i
                }, 3e3)) : e.is(":visible") && "none" == e.find(".invalid-box").css("display") && Sign.checkIsScanned(e)
            },
            error: function () {
                e.is(":visible") && "none" == e.find(".invalid-box").css("display") && setTimeout(function () {
                    Sign.checkIsScanned(e)
                }, 5e3)
            }
        })
    },
    RegScanValid: function (e) {
        Sign.timer = setTimeout(function () {
            e.find(".invalid-box").show()
        }, 18e4)
    },
    sendKaEvent: function (e) {
        try {
            _T.sendEvent(e)
        } catch (e) {
        }
    },
    drawSideSignBg: function (e) {
        function t() {
            i.clearRect(0, 0, e.width, e.height), 360 === ++a && (a = 0);
            for (var r = o.length - 1; r >= 0; r--) {
                i.fillStyle = o[r];
                var c = (a + 100 * r) * Math.PI / 180, l = Math.sin(c) * n, d = Math.cos(c) * n;
                i.beginPath(), i.moveTo(0, s + l), i.bezierCurveTo(e.width / 2, s + l - n, e.width / 2, s + d - n, e.width, s + d), i.lineTo(e.width, e.height), i.lineTo(0, e.height), i.lineTo(0, s + l), i.closePath(), i.fill()
            }
            requestAnimFrame(t)
        }

        var i = e.getContext("2d");
        e.width = e.parentNode.offsetWidth, window.requestAnimFrame = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e) {
                window.setTimeout(e, 1e3 / 60)
            }
        }();
        var n = e.height / 7, s = e.height / 1.3, a = 0, o = ["rgba(255,255,255, 0.4)", "rgba(255,255,255, 0.30)"];
        t()
    }
};
$(function () {
    $(".sign-wrap").length && $(".sign-wrap").is(":visible") && Sign.init($(".sign-wrap:visible")), void 0 !== PlaceholderCheck && PlaceholderCheck.init()
});
var hunterSign = {
    init: function () {
        ($(".hunter-index").length || $(".hunter-register").length) && ($(".hunter-index .btn-sign").on("click", function () {
            hunterSign.showPop($(this))
        }), $(".hunter-register").length && Sign.dropSelect($(this).find(".sign-form")), hunterSign.setErcode(), $(".hunter-index").find(".sign-form .tab span").on("click", function () {
            hunterSign.switchTab($(this))
        }), $(".hunter-register").find(".register-op").on("click", function () {
            hunterSign.switchRegister($(this))
        }), $(".hunter-index").length && (hunterSign.elAnimate(), $(window).scroll(function () {
            hunterSign.elAnimate(), $(window).scrollTop() >= 50 ? $(".fix-container").slideDown() : $(".fix-container").slideUp()
        })), $(window).scrollTop() >= 50 ? $(".fix-container").slideDown() : $(".fix-container").slideUp())
    }, showPop: function (e) {
        $.confirm({
            content: $(".sign-wrap").html(),
            title: !1,
            confirmButton: !1,
            cancelButton: !1,
            closeIcon: !0,
            columnClass: "pop-sign-box",
            onOpen: function () {
                var t = this;
                e.hasClass("btn-register") && (t.$content.find(".sign-form").hide(), t.$content.find(".sign-register").show()), Sign.init(t.$content)
            }
        })
    }, switchTab: function (e) {
        var t = e.index(), i = e.parents(".sign-form");
        e.addClass("cur").siblings().removeClass("cur"), i.find(".tab-container").eq(t).show().siblings(".tab-container").hide(), 0 == t && ($(".code-container .overdue").hide(), hunterSign.setErcode()), i.find(".tip-error").html("")
    }, switchRegister: function (e) {
        var t = e.parents(".login-container").index(), i = e.parents(".login-wechat");
        i.find(".login-container").eq(t).addClass("hide").siblings().removeClass("hide"), Sign.init(), i.find(".tip-error").html("")
    }, isVisible: function (e) {
        return $(window).height() > e.offset().top - $(window).scrollTop() + 100
    }, elAnimate: function () {
        hunterSign.isVisible($(".hunter-index .info-box").eq(0)) && $(".hunter-index .info-box").eq(0).animate({
            marginTop: "0",
            opacity: "1"
        }, 400), hunterSign.isVisible($(".hunter-index .info-box").eq(1)) && $(".hunter-index .info-box").eq(1).animate({
            marginTop: "76px",
            opacity: "1"
        }, 300)
    }, setErcode: function () {
        if ($("#login_container").length && _PAGE.appid) {
            for (var e = "", t = document.querySelectorAll('link[type="text/css"]'), i = 0; i < t.length; i++) {
                var n = t[i].getAttribute("href");
                n && (n.indexOf("http") > -1 || 0 == n.indexOf("//")) && n.indexOf("/web/") > -1 && (e = n.split("/web/")[0])
            }
            var s = (new WxLogin({
                id: "login_container",
                appid: _PAGE.appid,
                scope: _PAGE.scope,
                redirect_uri: _PAGE.redirectUri,
                state: "",
                style: "",
                href: e + "/web/hunter/css/hunter-index.css"
            }), $(".code-container .overdue"));
            setTimeout(function () {
                s.is(":visible") || s.show()
            }, 6e4), s.find(".btn-refresh").on("click", function () {
                setTimeout(function () {
                    s.is(":visible") || s.show()
                }, 6e4), s.hide();
                new WxLogin({
                    id: "login_container",
                    appid: _PAGE.appid,
                    scope: _PAGE.scope,
                    redirect_uri: _PAGE.redirectUri,
                    state: "",
                    style: "",
                    href: e + "/web/hunter/css/hunter-index.css"
                })
            })
        }
    }
};
$(function () {
    hunterSign.init()
});
var GeekAccount = {
    URL: {
        mobile: {url: "/user/update/mobile.json", method: "POST"},
        sendsms: {url: "/user/account/sendsms.json", method: "POST"},
        password: {url: "/user/update/password.json", method: "POST"},
        del: {url: "/setting/geek/replyword/del.json", method: "get"},
        add: {url: "/setting/geek/replyword/add.json", method: "get"},
        greeting: {url: "/geek/update/greeting.json", method: "POST"}
    }, init: function () {
        this.changeTab(), this.requestData($(".account-container .set-page"), $(".account-container .set-page ul li.cur").data("tab"), $(".account-container .set-page ul li.cur").data("url"))
    }, showModalToast: function (e, t) {
        $.toast({content: e, lock: !0, type: t, wrapClass: "", position: "top", time: 3e3})
    }, appendAccount: function () {
        $(".account-container .set-page .set-nav").prepend('<div class="account-manager">璐﹀彿璁剧疆</div>')
    }, changeTab: function () {
        var e = this;
        $(".account-container .set-page ul").on("click", "li", function () {
            $(this).siblings("li").removeClass("cur"), $(this).addClass("cur");
            var t = $(this).data("url"), i = $(this).data("tab");
            e.requestData($(".account-container .set-page"), i, t)
        })
    }, switchGreetingBtn: function () {
        var e = this;
        $(".account-container .sayhello-form").on("click", ".switch-op .op-switch", function () {
            var t = $(this);
            t.hasClass("op-switch-on") ? e.submitSwitch(0, t) : e.submitSwitch(1, t)
        })
    }, submitSwitch: function (e, t) {
        if (!t.hasClass("disabled")) {
            t.addClass("disabled");
            var i = this;
            $.ajax({
                url: i.URL.greeting.url, method: i.URL.greeting.method, dataType: "json", data: {status: e},
                success: function (n) {
                    1 == n.rescode ? (i.showModalToast("璁剧疆鎴愬姛", "success"), i.switchSuccessFn(e, t)) : 0 == n.rescode && i.showModalToast(n.resmsg, "error"), t.removeClass("disabled")
                }, error: function () {
                    t.removeClass("disabled")
                }
            })
        }
    }, switchSuccessFn: function (e, t) {
        var i = t.parents(".switch-op").siblings("p.gray"), n = {
            0: "鎷涘懠璇凡鍏抽棴锛岀郴缁熷皢涓嶅啀涓烘偍鍙戝嚭鎵撴嫑鍛艰锛屾偍鍙兘浼氭敹鍒版洿灏態oss鐨勫洖澶�",
            1: "閫夋嫨涓€涓嫑鍛艰锛屽湪鎮ㄥ拰Boss鍙戣捣鑱婂ぉ鏃讹紝绯荤粺涓烘偍鑷姩鍙戝嚭"
        };
        if (0 == e) {
            t.removeClass("op-switch-on").addClass("op-switch-off"), t.parents(".setting-switch").siblings().remove(), i.text(n[0]);
            try {
                _T.sendEvent("icebreaker_off")
            } catch (e) {
            }
        } else {
            try {
                _T.sendEvent("icebreaker_on")
            } catch (e) {
            }
            t.parents(".set-content").siblings(".set-nav").find("ul li.cur").trigger("click")
        }
    }, requestData: function (e, t, i) {
        var n = this;
        $.ajax({
            url: i, method: "get", dataType: "json", success: function (i) {
                i.rescode && (e.find(".set-content").remove(), "" == i.html && e.append('<div class="set-content"></div>'), e.append(i.html));
                var s = $(".account-container .bind-phone .operate-area .phone-num");
                s.html();
                switch (t) {
                    case"phone":
                        n.formValidate(), n.confirmChangePhone(), n.randomImage(), n.dropSelect($(".phone-form")), $(".ipt-message-code").attr("maxlength", "6");
                        break;
                    case"pwd":
                        n.confirmChangePassword();
                        break;
                    case"usalchat":
                        n.chatTabOperate(), n.chatUseSentence();
                        break;
                    case"sayhello":
                        n.submitUsal(), n.switchGreetingBtn()
                }
            }
        })
    }, submitUsal: function () {
        var e = this, t = $(".sayhello-form"), i = $(".sayhello-form").find(".ipt-area");
        $(".account-container .sayhello-form").on("change", ".radio-list .radio input", function () {
            var t = $(this).val();
            $.ajax({
                url: e.URL.greeting.url,
                method: e.URL.greeting.method,
                dataType: "json",
                data: {status: 1, templateId: t},
                success: function (e) {
                    if (1 == e.rescode) $.toast({
                        content: "璁剧疆鎴愬姛",
                        lock: !0,
                        type: "success",
                        wrapClass: "",
                        position: "top",
                        time: 3e3
                    }); else if (0 == e.rescode) {
                        var t = e.resmsg;
                        $.toast({content: t, lock: !0, type: "error", wrapClass: "", position: "top", time: 3e3})
                    }
                }
            })
        }), t.on("click", ".op-sentence .link-add", function () {
            t.find(".defined-form").addClass("show-defined-form"), t.find(".btn-remove").hide(), t.find('.defined-form input[name="templateId"]').val(""), t.find(".defined-form .ipt-area").text("").val("").focus(), $(window).scrollTop($(".account-container").height()), e.countArea(i), t.find(".defined-form .tip-text").text("璇蜂笉瑕佸～鍐欐墜鏈恒€丵Q銆佸井淇＄瓑鑱旂郴鏂瑰紡鎴栧箍鍛婁俊鎭紝鍚﹀垯绯荤粺灏嗗皝绂佹偍鐨勮处鍙凤紒")
        }), t.on("click", ".link-modify", function () {
            var n = $(this).closest("li").find("span").text();
            t.find(".defined-form").addClass("show-defined-form"), t.find(".defined-form .ipt-area").focus(), i.text(n).val(n), t.find('input[name="templateId"]').val($(this).closest("li").find('input[name="sendMsg"]').val()), t.find(".btn-remove").show(), $(window).scrollTop($(".account-container").height()), e.countArea(i), t.find(".defined-form .tip-text").text("璇蜂笉瑕佸～鍐欐墜鏈恒€丵Q銆佸井淇＄瓑鑱旂郴鏂瑰紡鎴栧箍鍛婁俊鎭紝鍚﹀垯绯荤粺灏嗗皝绂佹偍鐨勮处鍙凤紒")
        }), i.on("input", function () {
            e.countArea($(this))
        }), t.on("click", ".defined-form .btns .btn", function () {
            if ($(this).hasClass("btn-back")) $(this).closest(".defined-form").removeClass("show-defined-form"); else if ($(this).hasClass("btn-remove")) e.delGreetingword($(this)); else {
                if ($(this).closest("dl").find(".defined-form .count-num .red").length) return !1;
                e.postGreetingWord($(this))
            }
        })
    }, chatTabOperate: function () {
        var e = this;
        $(".account-container .set-usalbox").on("click", ".op-sentence .link-add", function () {
            $(this).closest("dl").find(".defined-form").addClass("show-defined-form"), $(this).closest("dl").find(".defined-form .ipt-area").focus(), $(this).closest("dl").find(".defined-form .tip-text").text("璇蜂笉瑕佸～鍐欐墜鏈恒€丵Q銆佸井淇＄瓑鑱旂郴鏂瑰紡鎴栧箍鍛婁俊鎭紝鍚﹀垯绯荤粺灏嗗皝绂佹偍鐨勮处鍙凤紒"), $(window).scrollTop($(".account-container").height()), $(this).closest("dl").find(".count-num").length && e.countArea($(this).closest("dl").find(".ipt-area"))
        }), $(".account-container .defined-form .ipt-area").on("input", function () {
            e.countArea($(this))
        }), $(".set-usalbox").on("click", ".defined-form .btns .btn", function () {
            if ($(this).hasClass("btn-back")) $(this).closest("dl").find(".defined-form").removeClass("show-defined-form"), $(".account-container .defined-form .ipt-area").val(""); else {
                if ("" == $(this).closest("dl").find(".defined-form .ipt-area").val().replace(/(\s*$)/g, "")) return $(this).closest("dl").find(".defined-form .tip-text").text("璇疯緭鍏ユ纭殑甯哥敤璇�"), $(this).closest("dl").find(".defined-form .ipt-area").focus(), !1;
                if ($(this).closest("dl").find(".defined-form .count-num .red").length) return $(this).closest("dl").find(".defined-form .tip-text").text("甯哥敤璇笉鑳借秴杩�200涓瓧"), $(this).closest("dl").find(".defined-form .ipt-area").focus(), !1;
                e.renderList($(".account-container .defined-form .ipt-area").val())
            }
        }), $(".set-usalbox .sentence-list").on("click", ".link-remove", function () {
            e.delData($(this)), e.chatUseSentence()
        })
    }, delData: function (e) {
        var t = this, e = e;
        e.attr("data-url"), e.closest(".sentence-list");
        $.dialog({
            title: "",
            content: "纭鍒犻櫎璇ユ潯甯哥敤璇悧锛�",
            confirmText: "纭畾",
            element: e,
            cancelText: "鍙栨秷",
            inline: !0,
            opacityLock: !0,
            wrapClass: "dialog-around-default",
            onOpen: function (e) {
                e.find(".dialog-footer .btns .btn-cancel").attr("ka", "chatwords_delete_cancel"), e.find(".dialog-footer .btns .btn-sure").attr("ka", "chatwords_delete_sure")
            },
            onConfirm: function (i) {
                $.ajax({
                    url: t.URL.del.url,
                    method: t.URL.del.method,
                    data: {id: e.attr("data-id")},
                    dataType: "json",
                    success: function (i) {
                        if (1 == i.rescode) e.closest("li").fadeOut(function () {
                            e.parent("li").remove(), t.chatUseSentence()
                        }); else {
                            var n = i.resmsg;
                            $.toast({content: n, lock: !0, type: "error", wrapClass: "", position: "top", time: 3e3})
                        }
                    }
                })
            },
            onClose: function (e) {
            }
        })
    }, postGreetingWord: function (e) {
        var t = e.closest("form"), i = t.attr("action"), n = t.serialize();
        return t.find(".ipt-area").val(t.find(".ipt-area").val().replace(/(^[\s\n\r]*)|([\s\n\r]*$)/g, "")), "" == t.find(".ipt-area").val().replace(/(\s*$)/g, "") ? (t.find(".tip-text").text("璇疯緭鍏ユ纭殑鎵撴嫑鍛艰"), t.find(".ipt-area").focus(), !1) : t.find(".count-num .red").length ? (t.find(".tip-text").text("鎵撴嫑鍛艰涓嶈兘瓒呰繃60涓瓧"), t.find(".ipt-area").focus(), !1) : !e.hasClass("disabled") && (e.addClass("disabled"), void $.ajax({
            url: i, type: "POST", data: n, dataType: "JSON", timeout: 3e4, success: function (i) {
                if (i.rescode) {
                    var n = e.closest(".sayhello-form");
                    e.closest(".show-defined-tab").length ? ($.toast({
                        content: "淇濆瓨鎴愬姛",
                        type: "success"
                    }), e.closest(".show-defined-tab").find("li.cur").attr("data-text", filterXss(t.find(".ipt-area").val()))) : (n.find(".defined-form").removeClass("show-defined-form"), n.find(".sentence-list").length && n.find(".sentence-list ul").append(i.html), n.find(".sayhello-list").length && (t.find('input[name="templateId"]').val() ? n.find('input[value="' + t.find('input[name="templateId"]').val() + '"]').closest("li").find("span").text(t.find(".ipt-area").val()) : (n.find(".sayhello-list ul").append(i.html), n.find(".op-sentence").hide())))
                } else $.toast({content: i.resmsg, type: "error"});
                e.removeClass("disabled"), t.find(".tip-text").text("璇蜂笉瑕佸～鍐欐墜鏈恒€丵Q銆佸井淇＄瓑鑱旂郴鏂瑰紡鎴栧箍鍛婁俊鎭紝鍚﹀垯绯荤粺灏嗗皝绂佹偍鐨勮处鍙凤紒")
            }, error: function (i) {
                e.removeClass("disabled"), t.find(".tip-text").text("璇蜂笉瑕佸～鍐欐墜鏈恒€丵Q銆佸井淇＄瓑鑱旂郴鏂瑰紡鎴栧箍鍛婁俊鎭紝鍚﹀垯绯荤粺灏嗗皝绂佹偍鐨勮处鍙凤紒"), $.toast({
                    content: "淇濆瓨澶辫触锛岃妫€鏌ョ綉缁滃悗閲嶈瘯",
                    type: "error"
                })
            }
        }))
    }, delGreetingword: function (e) {
        var e = e, t = e.closest("form");
        $.dialog({
            title: "纭鍒犻櫎璇ユ潯鎵撴嫑鍛艰鍚楋紵",
            content: "",
            confirmText: "纭畾",
            cancelText: "鍙栨秷",
            wrapClass: "dialog-chat-default dialog-alert-default setting-remove-dialog",
            onOpen: function (e) {
            },
            onConfirm: function (i) {
                var n = t.find('input[name="templateId"]').val(),
                    s = t.closest(".sayhello-form").find('input[name="sendMsg"]').eq(0).val();
                $.ajax({
                    url: "/geek/delete/customgreeting.json",
                    type: "POST",
                    data: {templateId: n, candidateId: s},
                    dataType: "JSON",
                    timeout: 3e4,
                    success: function (s) {
                        s.rescode ? ($.toast({
                            content: "鍒犻櫎鎴愬姛",
                            type: "success"
                        }), t.closest(".sayhello-form").find('.sayhello-list input[value="' + n + '"]').closest("li").remove(), t.closest(".sayhello-form").find('.sayhello-list input[type="radio"]').eq(0).prop("checked", "checked"), t.find(".ipt-area").text("").val(""), t.find('input[name="templateId"]').val(""), e.closest(".defined-form").removeClass("show-defined-form"), t.closest(".sayhello-form").find(".op-sentence").show()) : $.toast({
                            content: s.resmsg,
                            type: "error"
                        }), i.remove()
                    },
                    error: function (e) {
                        $.toast({content: "鍒犻櫎澶辫触锛岃绋嶅悗鍐嶈瘯", type: "error"}), i.remove()
                    }
                })
            },
            onClose: function (e) {
            }
        })
    }, renderList: function (e) {
        var t = this;
        $.ajax({
            url: t.URL.add.url,
            method: t.URL.add.method,
            dataType: "json",
            data: {word: $(".set-usalbox .ipt-area").val().replace(/(^[\s\n\r]*)|([\s\n\r]*$)/g, "")},
            success: function (e) {
                if (1 == e.rescode) $(".account-container .sentence-list ul").append(e.html), $(".account-container .defined-form .ipt-area").val(""), $(".set-usalbox .op-sentence .link-add").closest("dl").find(".defined-form").removeClass("show-defined-form"), t.chatUseSentence(); else if (0 == e.rescode) {
                    var i = e.resmsg;
                    $.toast({
                        content: i,
                        lock: !0,
                        type: "error",
                        wrapClass: "",
                        position: "top",
                        time: 3e3
                    }), $(".account-container .defined-form .ipt-area").focus()
                }
            }
        })
    }, getLength: function (e) {
        if (!e) return 0;
        for (var t = 0, e = e.replace(/(^[\s\n\r]*)|([\s\n\r]*$)/g, ""), i = e.length, n = -1, s = 0; s < i; s++) n = e.charCodeAt(s), t += n > 255 ? 1 : .5;
        return Math.ceil(t)
    }, countArea: function (e) {
        var t = this, e = e, i = e.attr("data-range"), n = t.getLength(e.val()),
            s = e.closest(".defined-form").find(".count-num");
        s && s.length && (i = i.split(","), s.html("<em" + (n > i[1] ? ' class="red"' : "") + ">" + n + "</em>/" + i[1]))
    }, phoneNumShow: function (e) {
        var t = e || String(e);
        return t.slice(0, 3) + "****" + t.slice(7)
    }, dropSelect: function (e) {
        e.find(".dropdown-select").each(function () {
            $(this).on("click", function () {
                $(this).hasClass("dropdown-disabled") || ($(this).toggleClass("dropdown-select-open"), $(this).closest(".form-row").find(".dropdown-menu").toggleClass("dropdown-menu-open"))
            })
        }), e.find(".dropdown-menu").each(function () {
            var e = $(this), t = e.closest(".form-row").find(".dropdown-select"), i = t.find(".text-select"),
                n = t.find('input[type="hidden"]');
            e.on("click", "li", function () {
                i.text($(this).attr("data-val")), n.val($(this).attr("data-val")), n.closest("dd").find(".tip-text").remove(), e.removeClass("dropdown-menu-open"), t.removeClass("dropdown-select-open")
            })
        }), $(document).on("touchend click", function (t) {
            $(t.target).closest(".dropdown-menu").length || $(t.target).closest(".dropdown-select").length || (e.find(".dropdown-select").removeClass("dropdown-select-open"), e.find(".dropdown-menu").removeClass("dropdown-menu-open"))
        })
    }, getRandomkey: function (e, t) {
        var t = t, i = t.find(".ipt-code"), n = i.attr("data-url"), s = t.find(".randomkey");
        "" == s.val() && $.ajax({
            url: n,
            type: "POST",
            dataType: "json",
            data: {pk: $("#page_key_name").val()},
            success: function (t) {
                if (1 == t.rescode) {
                    t.qrId;
                    e.find(".randomkey").val(t.randomKey), s.parent().find(".verifyimg").click(), e.find(".sign-scan .qrcode-box img").attr("src", "/qrcode/" + t.qrId), e.find(".uuid").val(t.qrId)
                }
            },
            error: function (e) {
            }
        })
    }, randomImage: function () {
        var e = this, t = $(".phone-form .operate-area");
        if (t.find(".randomkey").length && "" == t.find(".randomkey").val()) return e.getRandomkey(t, $(".phone-form")), !1;
        t.find(".verifyimg").on("click", function () {
            $(this).attr("src", "/captcha/?randomKey=" + $(this).closest(".form-row").find(".randomkey").val() + "&_r=" + (new Date).getTime())
        })
    }, formValidate: function () {
        var e = this;
        $(".get-message-code").on("click", function () {
            var t = ($(this).closest("form"), e.formPhoneValidate()), i = e.formImageCodeValidate();
            if (t && i) {
                var n = $(this);
                $.ajax({
                    url: e.URL.sendsms.url,
                    method: e.URL.sendsms.method,
                    dataType: "json",
                    data: {
                        randomKey: $(".phone-form .randomkey").val(),
                        regionCode: $(".phone-form .text-select").text(),
                        mobile: $(".phone-form .ipt-phone").val(),
                        captcha: $(".phone-form .ipt-image-code").val()
                    },
                    success: function (t) {
                        if (1 == t.rescode) $(".get-message-code").html('<em class="num">60s</em> 鍚庨噸璇�').addClass("count-down"), e.countDown($(".count-down"), function () {
                            n.html("閲嶆柊鍙戦€侀獙璇佺爜").removeClass("count-down")
                        }), $.toast({
                            content: "楠岃瘉鐮佺煭淇″凡鍙戦€侊紝璇锋煡鏀�",
                            lock: !0,
                            type: "success",
                            wrapClass: "",
                            position: "top",
                            time: 3e3
                        }); else if (0 == t.rescode) {
                            var i = t.resmsg;
                            switch (t.errorType) {
                                case 1:
                                    e.showError($(".ipt-phone"), i);
                                    break;
                                case 2:
                                    e.showError($(".ipt-image-code"), i);
                                    break;
                                case 4:
                                    e.showError($(".ipt-message-code"), i)
                            }
                        }
                    },
                    error: function () {
                        $.toast({
                            content: "缃戠粶閿欒淇敼澶辫触",
                            lock: !0,
                            type: "error",
                            wrapClass: "",
                            position: "top",
                            time: 3e3
                        })
                    }
                })
            }
        })
    }, countDown: function (e, t) {
        var i = this, n = parseInt(e.find(".num").text().replace("s"), 10);
        i.interCount = setInterval(function () {
            n--, e.find(".num").text(n + "s"), n <= 0 && (t(), clearInterval(i.interCount), i.interCount = null)
        }, 1e3)
    }, formPhoneValidate: function () {
        var e = this;
        e.removeError($(".ipt-phone"));
        var t = $(".ipt-phone").val(), i = $(".text-select").text();
        return t.length ? /^\D+$/.test(t) ? ($(".ipt-phone").val(""), e.showError($(".ipt-phone"), "璇疯緭鍏ユ纭殑鎵嬫満鍙�"), $(".ipt-phone").focus(), !1) : "+86" != i || /^(1[3456789][0-9]{9})$/.test(t) ? !!/^(\d{6,11})$/.test(t) || (e.showError($(".ipt-phone"), "璇疯緭鍏ユ纭殑鎵嬫満鍙�"), $(".ipt-phone").focus(), !1) : (e.showError($(".ipt-phone"), "璇疯緭鍏ユ纭殑鎵嬫満鍙�"), $(".ipt-phone").focus(), !1) : (e.showError($(".ipt-phone"), "璇疯緭鍏ユ墜鏈哄彿"), !1)
    }, formMessageCodeValidate: function () {
        var e = this;
        e.removeError($(".ipt-message-code"));
        var t = $(".ipt-message-code").val();
        return t.length ? "" == t ? (e.showError($(".ipt-message-code"), "鐭俊楠岃瘉鐮侀敊璇�"), $(".ipt-message-code").focus(), !1) : t.match(/^.{4,6}$/) ? !t.match(/\D+/) || ($(".ipt-message-code").val(""), e.showError($(".ipt-message-code"), "鐭俊楠岃瘉鐮侀敊璇�"), $(".ipt-message-code").focus(), !1) : (e.showError($(".ipt-message-code"), "鐭俊楠岃瘉鐮侀敊璇�"), $(".ipt-message-code").focus(), !1) : (e.showError($(".ipt-message-code"), "璇疯緭鍏ョ煭淇￠獙璇佺爜"), $(".ipt-message-code").focus(), !1)
    }, formImageCodeValidate: function () {
        var e = this;
        e.removeError($(".ipt-image-code"));
        var t = $(".ipt-image-code").val();
        return t.length ? "" == t ? (e.showError($(".ipt-image-code"), "鍥剧墖楠岃瘉鐮侀敊璇�"), $(".ipt-image-code").focus(), !1) : t.match(/^.{4}$/) ? !t.match(/[\u4e00-\u9fa5]/) || ($(".ipt-image-code").val(""), e.showError($(".ipt-image-code"), "鍥剧墖楠岃瘉鐮侀敊璇�"), $(".ipt-image-code").focus(), !1) : (e.showError($(".ipt-image-code"), "鍥剧墖楠岃瘉鐮侀敊璇�"), $(".ipt-image-code").focus(), !1) : (e.showError($(".ipt-image-code"), "璇疯緭鍏ュ浘鐗囬獙璇佺爜"), $(".ipt-image-code").focus(), !1)
    }, showError: function (e, t) {
        e.addClass("ipt-error"), e.parent(".ipt-wrap").length && e.parent(".ipt-wrap").parent(".form-row").append('<div class="tip-text">' + t + "</div>"), e.parent(".cell-wrap").length && (e.parent(".cell-wrap").parent(".form-row").find(".tip-text").remove(), e.parent(".cell-wrap").parent(".form-row").append('<div class="tip-text">' + t + "</div>"))
    }, lisLength: function () {
        return $(".sentence-list ul li").length
    }, removeError: function (e) {
        e.removeClass("ipt-error"), e.parent(".ipt-wrap").length ? e.parent(".ipt-wrap").parent(".form-row").find(".tip-text").remove() : e.parent(".cell-wrap").parent(".form-row").find(".tip-text").remove()
    }, confirmChangePhone: function () {
        var e = this;
        $(".phone-form").on("submit", function (t) {
            $(this);
            t.preventDefault();
            var i = e.formPhoneValidate(), n = e.formMessageCodeValidate(), s = e.formImageCodeValidate();
            i && n && s && $.ajax({
                url: e.URL.mobile.url,
                method: e.URL.mobile.method,
                dataType: "json",
                data: {
                    randomKey: $(".phone-form .randomkey").val(),
                    regionCode: $(".phone-form .text-select").html(),
                    mobile: $(".phone-form .ipt-phone").val(),
                    captcha: $(".phone-form .ipt-image-code").val(),
                    smsCode: $(".phone-form .ipt-message-code").val()
                },
                success: function (t) {
                    if (1 == t.rescode) $.toast({
                        content: "鎵嬫満鍙蜂慨鏀规垚鍔燂紝璇烽噸鏂扮櫥褰�",
                        lock: !0,
                        type: "success",
                        wrapClass: "",
                        position: "top",
                        time: 3e3
                    }), setTimeout(function () {
                        window.location.href = "/logout/"
                    }, 1e3); else if (0 == t.rescode) {
                        var i = t.resmsg;
                        switch (t.errorType) {
                            case 1:
                                e.showError($(".ipt-phone"), i);
                                break;
                            case 2:
                                e.showError($(".ipt-image-code"), i);
                                break;
                            case 3:
                                e.showError($(".ipt-message-code"), i)
                        }
                    }
                },
                error: function () {
                    $.toast({
                        content: "缃戠粶閿欒淇敼澶辫触",
                        lock: !0,
                        type: "error",
                        wrapClass: "",
                        position: "top",
                        time: 3e3
                    })
                }
            })
        })
    }, refreshPage: function (e) {
        setTimeout(function () {
            $(".account-container .set-nav ul li").eq(e).click()
        }, 300)
    }, confirmChangePassword: function () {
        var e = this;
        $(".pwd-form").on("submit", function (t) {
            if (t.preventDefault(), $(this).find(".form-btn .btn-origin-pwd").length) {
                t.preventDefault();
                var i = e.pwdConfirm(), n = e.pwdConfirmAgain();
                i && n && $.ajax({
                    url: e.URL.password.url,
                    method: e.URL.password.method,
                    dataType: "json",
                    data: {newPassword: $(".pwd-form .ipt-pwd-orginal").val()},
                    success: function (t) {
                        if (1 == t.rescode) $.toast({
                            content: "瀵嗙爜淇敼鎴愬姛锛岃閲嶆柊鐧诲綍",
                            lock: !0,
                            type: "success",
                            wrapClass: "",
                            position: "top",
                            time: 3e3
                        }), setTimeout(function () {
                            window.location.href = "/logout/"
                        }, 1e3); else {
                            var i = t.resmsg;
                            e.showError($(".ipt-pwd-orginal"), i)
                        }
                    },
                    error: function () {
                    }
                })
            } else $(this).find(".form-btn .btn-confirm-change-pwd").length && (t.preventDefault(), e.changePasswordConfirmSet())
        })
    }, pwdConfirm: function () {
        var e = this, t = $(".ipt-pwd-orginal").val();
        return e.removeError($(".ipt-pwd-orginal")), t.length ? !!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(t) || (e.showError($(".ipt-pwd-orginal"), "璇疯缃�6-20浣嶆暟瀛椾笌瀛楁瘝缁勫悎瀵嗙爜"), $(".ipt-pwd-orginal").val(""), $(".ipt-pwd-orginal").focus(), !1) : (e.removeError($(".ipt-pwd-orginal")), e.showError($(".ipt-pwd-orginal"), "璇疯緭鍏ュ瘑鐮�"), !1)
    }, pwdConfirmAgain: function () {
        var e = this, t = $(".ipt-pwd-orginal-confirm").val(), i = $(".ipt-pwd-orginal").val();
        return e.removeError($(".ipt-pwd-orginal-confirm")), t.length ? i === t || (e.showError($(".ipt-pwd-orginal-confirm"), "涓ゆ杈撳叆瀵嗙爜涓嶄竴鑷�"), $(".ipt-pwd-orginal-confirm").focus(), !1) : (e.removeError($(".ipt-pwd-orginal-confirm")), e.showError($(".ipt-pwd-orginal-confirm"), "璇烽噸澶嶈緭鍏ュ瘑鐮�"), !1)
    }, oldPassword: function () {
        var e = this, t = $(".ipt-pwd-old");
        return e.removeError(t), !!t.val().length || (e.showError(t, "璇疯緭鍏ユ棫瀵嗙爜"), t.focus(), !1)
    }, newPassword: function () {
        var e = this, t = $(".ipt-pwd-new");
        $(".ipt-pwd-old").val();
        e.removeError(t);
        var i = t.val();
        return i.length ? !!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(i) || (e.showError(t, "璇疯缃�6-20浣嶆暟瀛椾笌瀛楁瘝缁勫悎瀵嗙爜"), t.focus(), !1) : (e.showError(t, "璇疯緭鍏ユ柊瀵嗙爜"), t.focus(), !1)
    }, setConfirmChangePassword: function () {
        var e = this, t = $(".ipt-pwd-confirm"), i = $(".ipt-pwd-new").val();
        e.removeError(t);
        var n = t.val();
        return n.length ? i === n || (e.showError(t, "涓ゆ杈撳叆瀵嗙爜涓嶄竴鑷�"), t.focus(), !1) : (e.showError(t, "璇峰啀娆¤緭鍏ユ柊瀵嗙爜"), t.focus(), !1)
    }, changePasswordConfirmSet: function () {
        var e = this, t = e.oldPassword(), i = e.newPassword(), n = e.setConfirmChangePassword();
        t && i && n && $.ajax({
            url: e.URL.password.url,
            method: e.URL.password.method,
            dataType: "json",
            data: {oldPassword: $(".pwd-form .ipt-pwd-old").val(), newPassword: $(".pwd-form .ipt-pwd-new").val()},
            success: function (t) {
                if (1 == t.rescode) $.toast({
                    content: "瀵嗙爜淇敼鎴愬姛锛岃閲嶆柊鐧诲綍",
                    lock: !0,
                    type: "success",
                    wrapClass: "",
                    position: "top",
                    time: 3e3
                }), setTimeout(function () {
                    window.location.href = "/logout/"
                }, 1e3); else if (0 == t.rescode) {
                    var i = t.resmsg;
                    switch (t.errorType) {
                        case 1:
                            e.showError($(".ipt-pwd-old"), i);
                            break;
                        case 2:
                            e.showError($(".ipt-pwd-new"), i)
                    }
                    e.showError($(".ipt-pwd-orginal"), i)
                }
            },
            error: function () {
            }
        })
    }, chatUseSentence: function () {
        $(".account-container .sentence-list ul li").length ? $(".set-usalbox .title").length ? ($(".no-chat-wrap").addClass("hide"), $(".set-usalbox .title").removeClass("hide")) : ($(".set-usalbox .set-item").prepend('<h3 class="title">甯哥敤璇�</h3>'), $(".no-chat-wrap").addClass("hide")) : $(".no-chat-wrap").length ? ($(".no-chat-wrap").removeClass("hide"), $(".set-usalbox .title").addClass("hide")) : ($(".account-container .set-usalbox .set-item").prepend('<div class="no-chat-wrap"><h3 class="no-chat">鎮ㄨ繕娌℃湁甯哥敤鍥炲璇�</h3><div class="no-chat-subtitle">璁剧疆甯哥敤鍥炲璇紝鍙湪娌熼€氳亰澶╂椂鐩存帴閫夌敤锛屽噺灏戦噸澶嶈緭鍏�</div></div>'), $(".account-container .set-usalbox .set-item h3.title").addClass("hide"))
    }
};
$(function () {
    window.location.href.indexOf("/geek/account/management") > 0 && GeekAccount.init()
});
var QuickSign = {
    init: function () {
        if ($(".top-sign-box").length) {
            $(".top-sign-box").find(".ipt-code").attr("maxlength", "6");
            var e = $(".top-sign-box");
            $(".show-code-box").on("click", function () {
                if (!$(this).hasClass("btn-disabled")) {
                    var t = $(e).find(".ipt-phone").val();
                    "" != t && /^(1[3456789][0-9]{9})$/.test(t) ? ($(".code-form-box").show(), VerrifyCode.reset($(".code-form-box .row-code"))) : $.toast({
                        content: "璇疯緭鍏ユ纭殑鎵嬫満鍙�",
                        type: "warning"
                    })
                }
            }), e.find("form .registe-btn").on("click", function (e) {
                e.preventDefault(), $(this).hasClass("btn-disabled") || QuickSign.checkForm($(this).closest("form"))
            }), e.find(".btn-sms").on("click", function () {
                var e = $(this).closest("form");
                QuickSign.checkForm(e, !0)
            }), e.find(".verifyimg").on("click", function () {
                $(this).attr("src", "/captcha/?randomKey=" + $(this).closest(".code-form-content").find(".randomkey").val() + "&_r=" + (new Date).getTime());
                try {
                    _T.sendEvent("signin_verify_code")
                } catch (e) {
                }
            }), QuickSign.getRandomkey(e, e.find("form")), $("body").on("click", function (e) {
                $(e.target).parents(".step-form").length || $(".code-form-box").hide()
            })
        }
    }, getRandomkey: function (e, t) {
        var t = t, i = t.find(".ipt-code"), n = i.attr("data-url"), s = t.find(".randomkey");
        "" == s.val() && $.ajax({
            url: n,
            type: "POST",
            dataType: "json",
            data: {pk: $("#page_key_name").val()},
            success: function (t) {
                if (1 == t.rescode) {
                    t.qrId;
                    e.find(".randomkey").val(t.randomKey), s.parent().find(".verifyimg").click(), e.find(".sign-scan .qrcode-box img").attr("src", "/qrcode/" + t.qrId), e.find(".uuid").val(t.qrId)
                }
            },
            error: function (e) {
            }
        })
    }, callbackRegister: function (e, t) {
        try {
            var i = e.attr("ka");
            i && _T.sendEvent(i)
        } catch (e) {
        }
        var n = e.find('input[name="purpose"]').val(), s = "g";
        "1" == n && (s = "b");
        try {
            _T.sendEvent(e.closest(".sign-form").data("flow") + "_done_" + s)
        } catch (e) {
        }
        if (t.isCompletion) if (t.toUrl) {
            $.toast({content: "鐧诲綍鎴愬姛", type: "success"});
            var a = "";
            a = -1 != t.toUrl.indexOf("http") ? t.toUrl : "https://www.zhipin.com" + t.toUrl, setTimeout(function () {
                window.location.href = decodeURIComponent(a)
            }, 500)
        } else window.location.reload(); else {
            var o = t.autoRegister ? "娉ㄥ唽鎴愬姛锛屾鍦ㄤ负鎮ㄨ烦杞埌瀹屽杽椤甸潰" : "鐧诲綍鎴愬姛锛屾鍦ㄤ负鎮ㄨ烦杞埌瀹屽杽椤甸潰";
            $.toast({content: o, type: "success"}), window.location.href = "/web/geek/guide"
        }
    }, countDown: function (e, t) {
        var i = parseInt(e.find(".num").text().replace("s"), 10);
        Sign.interCount = setInterval(function () {
            i--, e.find(".num").text(i + "s"), i <= 0 && (t(), clearInterval(Sign.interCount), Sign.interCount = null)
        }, 1e3)
    }, checkForm: function (e, t) {
        var e = e, i = e.find(".ipt-phone"), n = e.find("input[name=csessionId]"), s = e.find(".ipt-sms");
        if (i.length) {
            if ("" == i.val()) {
                $.toast({content: "璇疯緭鍏ユ纭殑鎵嬫満鍙�", type: "warning"}), i.focus();
                try {
                    _T.sendEvent(i.closest(".sign-form").data("flow") + "_mobile")
                } catch (e) {
                }
                return !1
            }
            if (/^\D+$/.test(i.val())) return i.val(""), !1;
            if (!/^(1[3456789][0-9]{9})$/.test(i.val())) {
                $.toast({content: "璇疯緭鍏ユ纭殑鎵嬫満鍙�", type: "warning"}), i.focus();
                try {
                    _T.sendEvent(i.closest(".sign-form").data("flow") + "_mobile")
                } catch (e) {
                }
                return !1
            }
        }
        if (n.length && "" == n.val()) return $.toast({content: "璇锋粦鍔ㄥ畬鎴愰獙璇�", type: "warning"}), n.focus(), !1;
        if (s.length && !t) {
            if ("" == s.val()) return $.toast({content: "璇峰～鍐欑煭淇￠獙璇佺爜", type: "warning"}), s.focus(), !1;
            if (!s.val().match(/^.{4,6}$/)) return $.toast({content: "鐭俊楠岃瘉鐮侀敊璇�", type: "warning"}), s.focus(), !1;
            if (s.val().match(/\D+/)) return $.toast({
                content: "鐭俊楠岃瘉鐮侀敊璇�",
                type: "warning"
            }), s.val(""), s.focus(), !1
        }
        QuickSign.postData(e, t)
    }, postData: function (formEl, isSms) {
        var formEl = formEl, btnSms = formEl.find(".show-code-box"), url = formEl.attr("action"),
            btnEl = formEl.find(".registe-btn");
        if (isSms) {
            if (btnSms.hasClass("btn-disabled")) return;
            url = btnSms.attr("data-url"), btnSms.addClass("btn-disabled").html("绋嶅悗")
        } else {
            if (btnEl.hasClass("btn-disabled")) return;
            btnEl.addClass("btn-disabled")
        }
        $.ajax({
            url: url, type: "post", dataType: "json", data: formEl.serialize(), success: function (result) {
                var result = result;
                "string" == typeof result && (result = eval("(" + result + ")"));
                var zpData = result.zpData || {};
                if (0 !== result.code && VerrifyCode.reset(formEl.find(".row-code")), 0 == result.code) if (isSms) if (2 == zpData.type) $.toast({
                    content: result.message,
                    type: "warning"
                }), btnSms.html("鑾峰彇").removeClass("count-down btn-disabled"); else {
                    $.toast({
                        content: "鐭俊楠岃瘉鐮佸凡鍙戦€�",
                        type: "success"
                    }), $(".code-form-box").hide(), btnSms.html('(<em class="num">60s</em>)').addClass("count-down btn-disabled"), QuickSign.countDown(btnSms, function () {
                        btnSms.html("鑾峰彇").removeClass("count-down btn-disabled")
                    }), btnSms.parent().find(".ipt-sms").focus(), formEl.append('<input type="hidden" name="rescode" value="1" />');
                    try {
                        _T.sendEvent("signin_register_send_sms")
                    } catch (e) {
                    }
                } else QuickSign.callbackRegister(formEl, zpData); else 1 == result.code ? ($.toast({
                    content: result.message,
                    type: "warning"
                }), isSms && btnSms.html("鑾峰彇").removeClass("btn-disabled"), formEl.find(".ipt-code").val(""), formEl.find(".verifyimg").click()) : 6 == result.code ? $.toast({
                    content: "鐭俊楠岃瘉鐮侀敊璇�",
                    type: "warning"
                }) : ($.toast({
                    content: result.message,
                    type: "warning"
                }), isSms && btnSms.html("鑾峰彇").removeClass("btn-disabled"), formEl.find(".ipt-code").val(""), formEl.find(".verifyimg").click());
                isSms || btnEl.removeClass("btn-disabled")
            }, error: function (e) {
                $.toast({
                    content: "鏈嶅姟鍣ㄩ敊璇紝璇风◢鍚庡啀璇�",
                    type: "warning"
                }), isSms ? btnSms.html("鑾峰彇").removeClass("btn-disabled") : btnEl.removeClass("btn-disabled")
            }
        })
    }
};
$(function () {
    QuickSign.init()
});
var Settings = {
    init: function () {
        Settings.post = function (e, t) {
            var i = $.Deferred();
            return $.ajax({
                url: e, data: t, type: "json", method: "post", success: function (e) {
                    1 == e.rescode ? i.resolve(e) : ($.toast({type: "error", content: e.resmsg}), i.reject(e))
                }
            }), i
        }, Settings.page = 1;
        var e;
        $(window).on("scroll", function () {
            e && clearTimeout(e);
            var t = $(".company-container").find(".loadmore");
            !t.hasClass("disabled") && t.is(":visible") && (e = setTimeout(function () {
                Settings.isVisiable(t.get(0)) && Settings.loadMore(t, $(".company-container .company-list"))
            }, 100))
        })
    }, showLayer: function (e) {
        var t = e.html();
        $.dialog({
            title: "",
            wrapClass: "layer-privacy",
            confirmText: "",
            cancelText: "",
            content: t,
            onOpen: function (e) {
                e.find(".btn-search").off("click").on("click", function () {
                    var t = filterXss($(this).prev(".ipt").val());
                    e.find(".description");
                    "" != t.trim() && Settings.searchCompany(t, e)
                }), $(document).off("keydown").on("keydown", function (t) {
                    if (13 == t.keyCode) {
                        var i = e.find(".search-box .ipt").val();
                        e.find(".description");
                        if ("" == i.trim()) return;
                        Settings.searchCompany(i, e)
                    }
                })
            }
        })
    }, setStatus: function (e) {
        var t = 1;
        if (e.hasClass("op-on")) {
            t = 0;
            try {
                _T.sendEvent("unhide_resume")
            } catch (e) {
            }
        } else try {
            _T.sendEvent("hide_resume")
        } catch (e) {
        }
        Settings.post("/geek/privacy/resumeStatus/update.json", {status: t}).then(function (t) {
            $.toast({
                type: "success",
                content: "鎿嶄綔鎴愬姛"
            }), e.hasClass("op-off") ? e.removeClass("op-off").addClass("op-on").prev("span").text("宸查殣钘忕畝鍘�") : e.removeClass("op-on").addClass("op-off").prev("span").text("宸插紑鏀剧畝鍘�")
        })
    }, cancelMask: function (e) {
        var t = e.attr("data-id");
        e.hasClass("disabled") || (e.addClass("disabled"), Settings.post("/geek/privacy/maskCompany/delete.json", {comIds: t}).then(function () {
            e.parents("li").remove(), $.toast({
                type: "success",
                content: "鎿嶄綔鎴愬姛"
            }), Account.setTab($(".set-nav").find("li[data-tab=privacy]")), e.removeClass("disabled")
        }))
    }, searchCompany: function (e, t) {
        var i = t.find(".description");
        Settings.post("/autocomplete/maskcompany.json", {searchContent: e}).then(function (n) {
            var s = n.suggestList, a = "", o = "", r = "disabled";
            if (s.length) {
                for (var c = 0; c < s.length; c++) s[c].mark ? o += '<li data-id="' + s[c].encryptComId + '">\t\t\t\t\t\t\t<label class="checkbox">\t\t\t\t\t\t\t\t<span class="gray">宸插睆钄�</span>\t\t\t\t\t\t\t</label>\t\t\t\t\t\t\t<div class="company-name">\t\t\t\t\t\t\t\t<p>' + s[c].company.name + '</p>\t\t\t\t\t\t\t\t<p class="gray">' + (null == s[c].desc ? "" : s[c].desc.hlname) + "</p>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</li>" : (o += '<li data-id="' + s[c].encryptComId + '">\t\t\t\t\t\t\t<label class="checkbox">\t\t\t\t\t\t\t\t<input type="checkbox" checked="checked">\t\t\t\t\t\t\t\t<span></span>\t\t\t\t\t\t\t</label>\t\t\t\t\t\t\t<div class="company-name">\t\t\t\t\t\t\t\t<p>' + s[c].company.name + '</p>\t\t\t\t\t\t\t\t<p class="gray">' + (null == s[c].desc ? "" : s[c].desc.hlname) + "</p>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</li>", r = "");
                a = '<div class="search-result"><p class="gray">涓庘€�' + e + "鈥濈浉鍏崇殑鍏徃锛屽叡" + s.length + '涓�</p>\t\t\t\t\t\t<ul class="result-list">' + o + '</ul></div>\t\t\t\t\t\t<div class="op">\t\t\t\t\t\t\t<div class="pull-right">\t\t\t\t\t\t\t\t<button class="btn ' + r + '">灞忚斀鎵€閫夊叕鍙�</button>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<label class="checkbox check-all">\t\t\t\t\t\t\t\t<input type="checkbox" checked="checked" class="disabled">\t\t\t\t\t\t\t\t<span>鍏ㄩ€�</span>\t\t\t\t\t\t\t</label>\t\t\t\t\t\t</div>'
            } else a = '<div class="search-result"><p class="gray">涓庘€�' + e + "鈥濈浉鍏崇殑鍏徃锛屽叡" + s.length + '涓�</p><div class="tips"><img src="' + staticPath + '/web/geek/images/settings-tip.png"><p class="gray">娌℃湁鎵惧埌鎮ㄦ悳绱㈢殑鍏徃</p></div></div>';
            i.html(a), i.find(".check-all input").on("change", function () {
                var e = i.find(".result-list input");
                Settings.selectAll($(this), e)
            }), i.find(".checkbox input").on("change", function () {
                if (i.find(".check-all input").prop("checked", !0), !$(this).prop("checked")) return void i.find(".check-all input").prop("checked", !1);
                i.find(".checkbox input").each(function () {
                    if (0 == $(this).prop("checked")) return void i.find(".check-all input").prop("checked", !1)
                })
            }), i.find(".op .btn").on("click", function () {
                if (!$(this).hasClass("disabled")) {
                    var e = [];
                    if (i.find(".result-list li").each(function () {
                        $(this).find("input").is(":checked") && e.push($(this).attr("data-id"))
                    }), e.length) {
                        var n = e.join(",");
                        Settings.post("/geek/privacy/maskCompany/add.json", {comIds: n}).then(function (e) {
                            if (e.rescode) {
                                $.toast({type: "success", content: "鎿嶄綔鎴愬姛"});
                                try {
                                    _T.sendEvent("block_selected_comp")
                                } catch (e) {
                                }
                                Account.setTab($(".set-nav").find("li[data-tab=privacy]"))
                            }
                            t.remove()
                        })
                    } else {
                        $(this).prev("span").remove(), $(this).before("<span>鑷冲皯閫夋嫨涓€涓叕鍙�</span>")
                    }
                }
            });
            try {
                _T.sendEvent("search_block_comp")
            } catch (e) {
            }
        })
    }, selectAll: function (e, t) {
        e[0].checked ? t.prop("checked", !0) : t.prop("checked", !1)
    }, isVisiable: function (e) {
        var t = e.getBoundingClientRect();
        return t.top > 0 && window.innerHeight - t.top > 0 || t.top < 0 && t.bottom >= 0
    }, loadMore: function (e, t) {
        var i = e.attr("data-url"), n = "";
        Settings.page++, $.get(i, {page: Settings.page}, function (i) {
            if (i.rescode) {
                for (var s = i.maskCompanyList, a = 0; a < s.length; a++) n += '<li><span class="link-cancel" data-id="' + s[a].encryptComId + '">鍙栨秷灞忚斀</span>' + s[a].comName + "</li>";
                i.hasMore || e.text("娌℃湁鏇村浜�").addClass("disabled"), t.append(n)
            }
        })
    }
};
$(function () {
    Settings.init()
});
var preview = {
    doc: $(document), init: function () {
        this.expectPos = this.doc.find(".expect-pos"), this.optionWrapper = this.doc.find(".pos-select .option-wrapper"), this.loadBtn = this.doc.find(".frame-footer .btn"), this.positionToggle(), this.selectionHide(), this.positionChange()
    }, positionToggle: function () {
        this.expectPos.on("click", ".option-slted", function () {
            preview.optionWrapper.toggle()
        })
    }, changeHref: function (e) {
        var t = this.loadBtn.attr("href");
        t = t.substr(0, t.indexOf("&")) + "&expectId=" + e, this.loadBtn.attr("href", t)
    }, positionChange: function () {
        this.expectPos.on("click", ".option-wrapper li", function () {
            $(".option-slted .option-value").html($(this).html()), $(".pos-slted").html($(this).html()), preview.optionWrapper.hide();
            var e = $(this).data("id");
            preview.changeHref(e)
        })
    }, selectionHide: function () {
        this.doc.on("click", function (e) {
            "option-value" != e.target.className && "pos-tip" != e.target.className && preview.optionWrapper.hide()
        })
    }
};
preview.init(), $(function () {
    if ($("#competitive-main").length) {
        var e = [], t = [];
        _COMPETITIVE_PAGE.reportDataJson || (_COMPETITIVE_PAGE.reportDataJson = _COMPETITIVE_PAGE.data), _COMPETITIVE_PAGE.reportDataJson.General_Market.forEach(function (t) {
            e.push(t.count)
        }), _COMPETITIVE_PAGE.reportDataJson.General.forEach(function (e) {
            t.push(e.count)
        }), $("#container").highcharts({
            chart: {
                polar: !0,
                type: "area",
                animation: !1,
                tooltip: !1,
                backgroundColor: "#f9fafc",
                plotBackgroundColor: "#f9fafc"
            },
            plotOptions: {series: {animation: !1}},
            tooltip: {enabled: !1},
            title: {text: null},
            credits: {enabled: !1},
            pane: {size: "80%"},
            xAxis: {
                labels: {
                    rotation: 0,
                    align: "center",
                    distance: 26,
                    style: {font: "normal 11px Verdana, sans-serif", color: "blank"}
                },
                categories: ["涓嶣OSS娌熼€氭儏鍐�", "瀛﹀巻", "涓庤鑱屼綅鍖归厤搴�", "宸ヤ綔缁忛獙"],
                tickmarkPlacement: "on",
                lineWidth: 0,
                gridLineWidth: 3,
                gridLineDashStyle: "ShortDot",
                gridLineColor: "green",
                gridZIndex: 40
            },
            yAxis: {gridLineInterpolation: "polygon", lineWidth: 0, min: 0},
            legend: {
                align: "center",
                verticalAlign: "bottom",
                y: 0,
                x: 90,
                layout: "vertical",
                squareSymbol: !1,
                symbolWidth: 40,
                symbolHeight: 10,
                symbolRadius: 0,
                itemStyle: {fontSize: "11px", fontWeight: "normal"}
            },
            animation: !1,
            series: [{name: "甯傚満姘村钩", data: e, pointPlacement: "on", color: "rgb(188,249,232)"}, {
                name: "鎮ㄧ殑鎯呭喌",
                data: t,
                pointPlacement: "on",
                color: "rgb(103,148,248)"
            }]
        })
    }
}), $(document).ready(function () {
    function e() {
        l++, u++, r += .01;
        var e = -Math.sin(r), t = Math.cos(r);
        l < i[0] && (c < 1 ? c += c > .03 ? 1 / (2 * i[0]) : 1 / (5 * i[0]) : c = 0, o.save(), o.globalAlpha = l > 1 ? 1 : 0, o.beginPath(), o.fillStyle = "rgba(83,202,195," + c + ")", o.arc(n / 2 + 125 * e, s / 2 + 125 * t, 7, 0, 2 * Math.PI), o.fill(), o.restore()), u > 10 && u < i[1] && (p.clearRect(0, 0, n, s), p.save(), p.translate(n / 2, s / 2), p.rotate(u * Math.PI / 320), p.fillStyle = "rgb(83,202,195)", p.beginPath(), p.arc(-120, 75, 5, 0, 2 * Math.PI, !0), p.closePath(), p.fill(), p.restore())
    }

    if ($("#competitive-main").length) {
        var t = _COMPETITIVE_PAGE.position / _COMPETITIVE_PAGE.commNum, i = [];
        t <= .25 ? (i = [340, 340], $(".competitive_text").html("鏋佸ソ"),
            $(".competitive_text").parents(".row-one").find(".chart_title").find("p").eq(1).html("鏋佸ソ")) : t > .25 && t <= .5 ? (i = [260, 260], $(".competitive_text").html("浼樼"), $(".competitive_text").parents(".row-one").find(".chart_title").find("p").eq(1).html("浼樼")) : t > .5 && t <= .75 ? (i = [160, 160], $(".competitive_text").html("鑹ソ"), $(".competitive_text").parents(".row-one").find(".chart_title").find("p").eq(1).html("鑹ソ")) : t > .75 && (i = [88, 88], $(".competitive_text").html("涓€鑸�"), $(".competitive_text").parents(".row-one").find(".chart_title").find("p").eq(1).html("涓€鑸�"));
        var n, s, a = document.getElementById("canvas"), o = a.getContext("2d"), r = 1, c = 0;
        n = $(".competition_show_chart img").width(), s = $(".competition_show_chart img").height();
        var l = 0, d = document.getElementById("canvas1"), p = d.getContext("2d"), u = 0;
        setInterval(e, 10)
    }
});
var text = {
    Job_Hot_Min: "鍦ㄤ竴澶ф尝鐗涗汉鍒版潵涔嬪墠锛岃刀绱у嬀鎼瑽oss锛屾嬁涓嬭繖涓亴浣嶏紒",
    Job_Hot_Medium: "璇ヨ亴浣嶅鍙楃墰浜洪潚鐫愶紝鍊煎緱浜夊彇锛�",
    Job_Hot_Max: "璇ヨ亴浣嶅鍙楃墰浜洪潚鐫愶紝鍊煎緱浜夊彇锛�",
    Job_Hot_SuperMax: "璇ヨ亴浣嶅鍙楃墰浜洪潚鐫愶紝鍊煎緱浜夊彇锛�",
    Comm_Boss_Ignore: "鍐嶅悜Boss璇︾粏浠嬬粛涓€涓嬭嚜宸卞惂",
    Comm_Comm: "鍦ㄤ笌Boss鐨勬矡閫氫腑锛岃Ta鎰熷彈鍒颁綘鐨勮鍙笌鏈熷緟",
    Comm_Deliver: "鍦ㄤ笌Boss鐨勬矡閫氫腑锛岃Ta鎰熷彈鍒颁綘鐨勮鍙笌鏈熷緟",
    Comm_Exchange: "鍦ㄤ笌Boss鐨勬矡閫氫腑锛岃Ta鎰熷彈鍒颁綘鐨勮鍙笌鏈熷緟",
    Comm_Interview: "Offer璺濅綘鍙湁涓€姝ヤ箣閬ワ紒",
    Boss_Active_Min: "澶氫笌Boss鎵撴嫑鍛硷紝璁㏕a鐪嬪埌浼樼鐨勪綘缁堜簬鍑虹幇鍦ㄤ簡Ta鐨勯潰鍓�",
    Boss_Active_Medium: "Boss瀵硅鑱屼綅鐨勯渶姹傛瘮杈冪揣鎬ワ紝蹇幓鍕炬惌鍚э紒",
    Boss_Active_Max: "Boss瀵硅鑱屼綅鐨勯渶姹傛瘮杈冪揣鎬ワ紝蹇幓鍕炬惌鍚э紒",
    Boss_Active_SuperMax: "Boss瀵硅鑱屼綅闇€姹傞潪甯哥揣鎬ワ紝蹇幓鍕炬惌鍚э紒",
    CV_30: "绠€鍘嗗苟涓嶄唬琛ㄥ叏閮紝鍛婅瘔Boss浣犵殑鎬佸害涓庡疄鍔涳紒",
    CV_50: "涓嶣oss淇濇寔绉瀬鐨勬矡閫氾紝鎵嶆洿鏈夊彲鑳借幏寰楄繖涓満浼�",
    CV_80: "涓嶣oss淇濇寔绉瀬鐨勬矡閫氾紝鎵嶆洿鏈夊彲鑳借幏寰楄繖涓満浼�",
    CV_80_Plus: "浣犳湁寰堝ぇ鍑犵巼琚獴oss璁ゅ彲锛岀Н鏋佸睍鐜颁綘鑷繁锛�"
};
$(document).ready(function () {
    function e() {
        $("#competitive-main").length && window.ids.forEach(function (e) {
            if (i(e.id) && !e.excute) {
                var t = "#" + e.id;
                e.excute = !0;
                e.width > 0 && ($(t).animate({width: e.width + "px"}, "slow"), $(t).css("overflow", "visible")), e.height > 0 && ($(t).animate({height: e.height + "px"}, "slow"), $(t).css("overflow", "visible"))
            }
        })
    }

    function t(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
    }

    if ($("#competitive-main").length) {
        window.ids = [{id: "Comm_Interview", width: 0, height: 0, excute: !1}, {
            id: "Comm_Exchange",
            width: 0,
            height: 0,
            excute: !1
        }, {id: "Comm_Deliver", width: 0, height: 0, excute: !1}, {
            id: "Comm_Comm",
            width: 0,
            height: 0,
            excute: !1
        }, {id: "Comm_Boss_Ignore", width: 0, height: 0, excute: !1}, , {
            id: "CV_30",
            width: 0,
            height: 0,
            excute: !1
        }, , {id: "CV_50", width: 0, height: 0, excute: !1}, , {
            id: "CV_80",
            width: 0,
            height: 0,
            excute: !1
        }, {id: "CV_80_Plus", width: 0, height: 0, excute: !1}, {
            id: "Degree_HighScool_And_Below",
            width: 0,
            height: 0,
            excute: !1
        }, {id: "Degree_Junior", width: 0, height: 0, excute: !1}, {
            id: "Degree_Bachelor",
            width: 0,
            height: 0,
            excute: !1
        }, {id: "Degree_Master", width: 0, height: 0, excute: !1}, {
            id: "Degree_Phd",
            width: 0,
            height: 0,
            excute: !1
        }, {id: "Exp_Fresh", width: 0, height: 0, excute: !1}, {
            id: "Exp_Less_1",
            width: 0,
            height: 0,
            excute: !1
        }, {id: "Exp_1_3", width: 0, height: 0, excute: !1}, {
            id: "Exp_3_5",
            width: 0,
            height: 0,
            excute: !1
        }, {id: "Exp_5_10", width: 0, height: 0, excute: !1}, {
            id: "Exp_10_Plus",
            width: 0,
            height: 0,
            excute: !1
        }, {id: "Salary_NO", width: 0, height: 0, excute: !1}, {
            id: "Salary_Min",
            width: 0,
            height: 0,
            excute: !1
        }, {id: "Salary_Medium", width: 0, height: 0, excute: !1}, {
            id: "Salary_Max",
            width: 0,
            height: 0,
            excute: !1
        }, {id: "Salary_SuperMax", width: 0, height: 0, excute: !1}, {
            id: "container",
            width: 0,
            height: 0,
            excute: !1
        }];
        var i = function (e) {
            var e = "#" + e, t = $(e), i = t.offset(), n = $(window);
            return !(n.scrollTop() > i.top + t.outerHeight() || n.scrollTop() + n.height() < i.top)
        }, n = function (e, t) {
            var i;
            return function () {
                var n = this, s = arguments;
                clearTimeout(i), i = setTimeout(function () {
                    t.apply(n, s)
                }, e)
            }
        };
        $(window).scroll(n(200, e)), n(200, e)(), _COMPETITIVE_PAGE.reportDataJson.Communicate.forEach(function (e, t, i) {
            var n = "#" + e.factor, s = $(".hoz_bar").width(), a = e.rate * s / 100, o = 0;
            if (ids.map(function (t) {
                t.id == e.factor && (t.width = a)
            }), $(n).find(".percent").html(e.rate + "%"), e.isCur && ($(n).find(".work_exp").show(), $("#contract-text").html(text[e.factor])), e.isCur && 0 != t) {
                for (var r = t - 1; r >= 0; r--) o += i[r].rate;
                0 == o && $("#contract").html("1%").prev("span").html("瓒呰繃浜�"), o < 50 && o > 0 && $("#contract").html(parseInt(o) + "%").prev("span").html("瓒呰繃浜�"), o >= 50 && 100 - o != 0 && $("#contract").html(parseInt(100 - o) + "%").prev("span").html("鎺掑悕鍓�")
            } else 0 == t && (o = 100);
            100 - o == 0 && $("#contract").html("1%").prev("span").html("瓒呰繃浜�")
        }), _COMPETITIVE_PAGE.reportDataJson.CVMatch.forEach(function (e, t, i) {
            var n = "#" + e.factor, s = 0, a = $(".match_wrap").data("height") * parseInt($("html").css("fontSize"));
            if (height = e.rate * a / 100, ids.map(function (t) {
                t.id == e.factor && (t.height = height)
            }), $(n).find(".percent").html(e.rate + "%"), e.isCur && ($(n).find(".match").show(), $("#CVMatch-text").html(text[e.factor])), e.isCur && 0 != t) {
                for (var o = t - 1; o >= 0; o--) s += i[o].rate;
                0 == s && $("#CVMatch").html("1%").prev("span").html("瓒呰繃浜�"), s < 50 && s > 0 && $("#CVMatch").html(parseInt(s) + "%").prev("span").html("瓒呰繃浜�"), s >= 50 && 100 - s != 0 && $("#CVMatch").html(+parseInt(100 - s) + "%").prev("span").html("鎺掑悕鍓�")
            } else 0 == t && (s = 100);
            100 - s == 0 && $("#CVMatch").html("1%").prev("span").html("瓒呰繃浜�")
        }), _COMPETITIVE_PAGE.reportDataJson.Degree.forEach(function (e, t, i) {
            var n = "#" + e.factor, s = 0, a = $(".qua_wrap").data("height") * parseInt($("html").css("fontSize")),
                o = e.rate * a / 100;
            if (ids.map(function (t) {
                t.id == e.factor && (t.height = o)
            }), $(n).find(".percent").html(e.rate + "%"), e.isCur && $(n).find(".match").show(), e.isCur && 0 != t) {
                for (var r = t - 1; r >= 0; r--) s += i[r].rate;
                0 == s && $("#Degree").html("1%").prev("span").html("瓒呰繃浜�"), s < 50 && s > 0 && $("#Degree").html(+parseInt(s) + "%").prev("span").html("瓒呰繃浜�"), s >= 50 && 100 - s != 0 && $("#Degree").html(+parseInt(100 - s) + "%").prev("span").html("鎺掑悕鍓�")
            } else 0 == t && (s = 100);
            100 - s == 0 && $("#Degree").html("1%").prev("span").html("瓒呰繃浜�")
        }), _COMPETITIVE_PAGE.reportDataJson.Experience.forEach(function (e, t, i) {
            var n = "#" + e.factor, s = 0, a = $(".hoz_bar").width(), o = e.rate * a / 100;
            if (ids.map(function (t) {
                t.id == e.factor && (t.width = o)
            }), $(n).find(".percent").html(e.rate + "%"), e.isCur && ($(n).find(".work_exp").show(), $("#Experience + p").html(text[e.factor])), e.isCur && 0 != t) {
                for (var r = t - 1; r >= 0; r--) s += i[r].rate;
                0 == s && $("#Experience").html("1%").prev("span").html("瓒呰繃浜�"), s < 50 && s > 0 && $("#Experience").html(+parseInt(s) + "%").prev("span").html("瓒呰繃浜�"), s >= 50 && 100 - s != 0 && $("#Experience").html(+parseInt(100 - s) + "%").prev("span").html("鎺掑悕鍓�")
            } else 0 == t && (s = 100);
            100 - s == 0 && $("#Experience").html("1%").prev("span").html("瓒呰繃浜�")
        }), _COMPETITIVE_PAGE.reportDataJson.Salary_Dynamic.forEach(function (e, t, i) {
            var n = "#" + e.factor, s = 0, a = $(".sal_wrap").data("height") * parseInt($("html").css("fontSize"));
            if (height = e.rate * a / 100, ids.map(function (t) {
                t.id == e.factor && (t.height = height)
            }), $(".Xtext").children()[t].innerText = e.name, $(n).find(".percent").html(e.rate + "%"), e.isCur && $(n).find(".sal").show(), e.isCur && 0 != t) {
                for (var o = t - 1; o >= 0; o--) s += i[o].rate;
                0 == s && $("#Salary_Dynamic").html("1%").prev("span").html("瓒呰繃浜�"), s < 50 && s > 0 && $("#Salary_Dynamic").html(+parseInt(s) + "%").prev("span").html("瓒呰繃浜�"), s >= 50 && 100 - s != 0 && $("#Salary_Dynamic").html(+parseInt(100 - s) + "%").prev("span").html("鎺掑悕鍓�"), $("#Salary_Dynamic + p").html(text[e.factor])
            } else 0 == t && (s = 100);
            100 - s == 0 && $("#Salary_Dynamic").html("1%").prev("span").html("瓒呰繃浜�"), e.isCur && "Salary_NO" == e.factor && $("#Salary_Dynamic").html(e.rate + "%").prev("span").html("鏈～鍐�")
        });
        var s = "https://static.zhipin.com/v2/web/geek/images/peak_pink.png",
            a = "https://static.zhipin.com/v2/web/geek/images/peak_purple.png";
        _COMPETITIVE_PAGE.reportDataJson.Boss_Active.forEach(function (e, t) {
            var i = "#" + e.factor;
            if (e.isCur) {
                $(i).attr("src", s), $(i).hasClass("no_active") && $(i).removeClass("no_active"), $(i).hasClass("active") || $(i).addClass("active");
                for (var n = "", o = 0; o <= t; o++) n += "<img style='width: 20px; height: 20px; margin-left:10px; '  src='https://static.zhipin.com/v2/web/geek/images/icon-top.png' />";
                $("#Boss_Active").html("Boss娲昏穬鎯呭喌锛�" + e.name + n), $("#Boss_Active-text").html(text[e.factor])
            } else $(i).attr("src", a), $(i).hasClass("no_active") || $(i).addClass("no_active"), $(i).hasClass("active") && $(i).removeClass("active")
        });
        var s = "https://static.zhipin.com/v2/web/geek/images/peak_red.png",
            a = "https://static.zhipin.com/v2/web/geek/images/peak_blue.png";
        _COMPETITIVE_PAGE.reportDataJson.Job_Hot_Degree.forEach(function (e, t) {
            var i = "#" + e.factor;
            if (e.isCur) {
                $(i).attr("src", s), $(i).hasClass("no_active") && $(i).removeClass("no_active"), $(i).hasClass("active") || $(i).addClass("active");
                for (var n = "", o = 0; o <= t; o++) n += "<img style='width: 20px; height: 20px; margin-left:10px; '  src='https://static.zhipin.com/v2/web/geek/images/icon-fire.png' />";
                $("#Job_Hot_Degree").html("鑱屼綅鐑害锛�" + e.name + n), $("#Job_Hot_Degree-text").html(text[e.factor])
            } else $(i).attr("src", a), $(i).hasClass("no_active") || $(i).addClass("no_active"), $(i).hasClass("active") && $(i).removeClass("active")
        });
        var o = [[0, 1.46, 2.85, 4.24], [0, 1.26, 2.85, 4.24], [0, 1.46, 2.65, 4.24], [0, 1.46, 2.8, 4.04]];
        _COMPETITIVE_PAGE.reportDataJson.Boss_Active.forEach(function (e, t, i) {
            e.isCur && o[t].forEach(function (e, t, i) {
                $("#boss_Active img").eq(t).css("left", e + "rem")
            })
        }), _COMPETITIVE_PAGE.reportDataJson.Job_Hot_Degree.forEach(function (e, t, i) {
            e.isCur && o[t].forEach(function (e, t, i) {
                $("#job_Hot img").eq(t).css("left", e + "rem")
            })
        }), _COMPETITIVE_PAGE.position / _COMPETITIVE_PAGE.commNum > .5 && 1 - _COMPETITIVE_PAGE.position / _COMPETITIVE_PAGE.commNum != 0 && $("#rank").html("涓汉缁煎悎绔炰簤鍔涳細瓒呰繃浜�" + parseInt(100 * (1 - _COMPETITIVE_PAGE.position / _COMPETITIVE_PAGE.commNum)) + "%"), _COMPETITIVE_PAGE.position / _COMPETITIVE_PAGE.commNum < .5 && _COMPETITIVE_PAGE.position / _COMPETITIVE_PAGE.commNum > 0 && $("#rank").html("涓汉缁煎悎绔炰簤鍔涳細鎺掑悕鍓�" + parseInt(100 * _COMPETITIVE_PAGE.position / _COMPETITIVE_PAGE.commNum) + "%鐨勪汉"), (_COMPETITIVE_PAGE.position / _COMPETITIVE_PAGE.commNum == 0 || 1 - _COMPETITIVE_PAGE.position / _COMPETITIVE_PAGE.commNum == 0) && $("#rank").html("涓汉缁煎悎绔炰簤鍔涳細瓒呰繃浜�1%鐨勪汉"), $(".work_card").click(function (e) {
            var t = $(this).data("url");
            t && (window.location.href = t)
        }), _COMPETITIVE_PAGE.hasFriendRelation || ($(".start-chat").show(), $(".sub").html("绔嬪嵆娌熼€�"), $(".start-chat").on("click", function () {
            Detail.startChat($(this))
        })), $(".competitive-time").html("璇勪及鏃堕棿锛�" + (new Date).toISOString().slice(0, 10)), $(".evaluate_time").html("璇勪及鏃堕棿锛�" + (new Date).toISOString().slice(0, 10)), setTimeout(function () {
            $(".competition_show > p").hide()
        }, 2e3), $(".tip").click(function (e) {
            $(".tip span").show(), t(e)
        }), $(document).on("click touchstart", function (e) {
            $(".tip span").hide()
        })
    }
});
var ItemShop = function () {
    function e(e) {
        var n, s = function () {
            e && e()
        }, a = function (e) {
            var t = this, i = $(e);
            i.off("click"), i.on("click", ".analyzer-combo-list dd", function () {
                i.find(".analyzer-combo-list .selected").removeClass("selected"), $(this).addClass("selected"), i.find(".analyzer-combo-list dt").removeClass("disabled")
            }), i.on("click", ".analyzer-combo-list dt", function () {
                t.close();
                var e = i.find(".analyzer-combo-list .selected").attr("data-id"), n = {
                    url: "/geek/item/pay.json",
                    prePayUrl: "/geek/item/prepay.json",
                    data: {itemId: e},
                    itemId: e,
                    success: s
                }, a = {
                    success: s, buy: function (e) {
                    }
                };
                setTimeout(function () {
                    Payment.purchase(n, a)
                }, 100)
            })
        };
        t.combo("bf0aaab5053fa3e71nU~").then(function (e) {
            n = e, $.dialog({
                bind: !0,
                title: "",
                content: i.analyzer(e),
                closeText: !0,
                confirmText: !1,
                cancelText: !1,
                wrapClass: "prop-analyzer-wrap",
                lock: !0,
                onOpen: a,
                onConfirm: function (e) {
                }
            })
        })
    }

    var t = {
        combo: function (e) {
            var t = $.Deferred();
            return $.get("/business/item/sellunit.json?itemType=" + e).success(function (e) {
                1 == e.rescode ? t.resolve(e.itemSellUnit) : $.toast({content: e.resmsg, type: "error"})
            }), t
        }
    }, i = {
        analyzer: function (e) {
            return Utemplate('<div class="analyzer-head"><i class="icon-logo"></i><div><h4><%this.itemName%></h4><%this.itemNote%></div></div><ul class="analyzer-list"><li><div class="analyzer-item"><p class="icon-item icon-compete"></p><p>鐭ュ繁鐭ュ郊</p><p class="gray">娲炴倝姹傝亴鑳滅畻</p></div><div class="analyzer-item"><p class="icon-item icon-compete-hover"></p></div></li><li><div class="analyzer-item"><p class="icon-item icon-expect"></p><p>浜嗚В钖祫姘村钩</p><p class="gray">鏌ョ湅鏈熸湜钖祫鍗犳瘮</p></div><div class="analyzer-item"><p class="icon-item icon-expect-hover"></p><p>鏈熸湜钖祫鍗犳瘮</p><p class="gray">璁〣OSS璁ゅ彲浣狅紝鎵嶈兘鍖归厤濂界殑钖祫</p></div></li><li><div class="analyzer-item"><p class="icon-item icon-active"></p><p>瀹炴椂鎷涜仒鍔ㄦ€�</p><p class="gray">浜嗚В鑱屼綅杩�90澶╂暟鎹�</p></div><div class="analyzer-item"><p class="icon-item icon-active-hover"></p><p>BOSS娲昏穬鎯呭喌</p><p class="gray">BOSS瀵硅鑱屼綅闇€姹傞潪甯哥揣鎬�</p></div></li></ul><dl class="analyzer-combo-list"><dt ka="item_pay_buy_competitive_chat">绔嬪嵆璐拱</dt><%for(var i=0;i<this.itemSellItemList.length;i++){%><dd <%if(i== 2){%>class="discount selected"<%}%> data-id="<%this.itemSellItemList[i].encryptBeanItemId%>"><%this.itemSellItemList[i].specDesc%><i class="line"></i><%this.itemSellItemList[i].beanAmount%>鐩磋眴</dd><%}%></dl>', e)
        }
    };
    return {
        analyzer: e, personality: function (e) {
            var t = function () {
                Payment.success({
                    article: "璐拱鎴愬姛", text: "", confirmText: "绔嬪嵆浣跨敤", confirm: function (t) {
                        e && e(t)
                    }
                })
            }, i = {
                url: "/geek/item/pay.json",
                prePayUrl: "/geek/item/prepay.json",
                data: {itemId: "b015f75cd5e9aa4c1nR-"},
                itemId: "b015f75cd5e9aa4c1nR-",
                success: t
            }, n = {
                success: t, buy: function (e) {
                }
            };
            Payment.purchase(i, n)
        }
    }
}();
$(function () {
    if ($(".satisfaction-feedback").length || $(".satisfaction-feedback .satisfaction").length) {
        var e = $(".satisfaction-feedback");
        e.find("textarea").on("input", function () {
            if (Validate.getLength($(this).val()) > 150) return $.toast({type: "error", content: "涓嶈秴杩�150涓眽瀛�"}), !1
        }), e.find(".satisfaction").on("click", function () {
            $(this).hasClass("selected") ? ($(this).removeClass("selected").siblings(".satisfaction").removeClass("selected"), e.find(".btn").addClass("disabled").prop("disabled", !0), e.find("input[name='level']").val("")) : ($(this).addClass("selected").siblings(".satisfaction").removeClass("selected"), e.find(".btn").removeClass("disabled").prop("disabled", !1), e.find("input[name='level']").val($(this).data("level")))
        }), e.on("submit", function () {
            if (e.find(".selected").length) return Validate.getLength(e.find("textarea").val()) > 150 ? void $.toast({
                type: "error",
                content: "涓嶈秴杩�150涓眽瀛�"
            }) : ($.ajax({
                url: "/wapi/zpCommon/actionLog/geek/searchjob/feekback.json",
                type: "POST",
                data: e.serialize(),
                dataType: "JSON",
                timeout: 3e4
            }).success(function (t) {
                0 == t.code ? ($.toast({
                    type: "success",
                    content: "<span class='icon-toast-content'>鎰熻阿鍙嶉</span>",
                    wrapClass: "satisfaction-wrap"
                }), e.remove()) : $.toast({type: "error", content: t.message})
            }).error(function () {
                $.toast({type: "error", content: "鏈嶅姟鍣ㄥ紓甯�"})
            }), !1)
        })
    }
}), AnalysisResume = {
    init: function () {
        if ($("#wrap").hasClass("sign-resume-wrapper")) {
            var e = $(".sign-resume-wrapper"), t = e.find(".upload-resume"), i = e.find(".page-loading"),
                n = e.find(".sign-resume");
            AnalysisResume.initUploadResume(function (e) {
                n.find(".sign-slide-box ul").find(".count").eq(0).text(e.data.validUserBaseInfoNum).end().eq(1).text(e.data.validWorkExpNum).end().eq(2).text(e.data.validEduExpNum).end().eq(3).text(e.data.validExpectNum), n.find("input[name=cvpk]").val(e.data.key), n.find("input[name=phone]").val(e.data.phone ? e.data.phone : ""), i.addClass("hide"), $(".sign-resume").removeClass("hide")
            }, function () {
                i.addClass("hide"), t.removeClass("hide");
                try {
                    _T.sendEvent("nlp_resume_upload_fail")
                } catch (e) {
                }
            }, function () {
                t.addClass("hide"), i.removeClass("hide")
            })
        }
    }, initUploadResume: function (successCallback, failCallback, loadingCallback) {
        var reg = /(\.|\/)(doc|docx|pdf)$/i;
        $("#fileupload").fileupload({
            method: "POST",
            url: "/wapi/zpgeek/resume/attachment/parser/upload.json",
            dataType: "text",
            acceptFileTypes: reg,
            maxChunkSize: 8388608,
            add: function (e, t) {
                "function" == typeof loadingCallback && loadingCallback();
                var i = t.files[0], n = i.name, s = i.size;
                return reg.test(n) ? s > 1e7 ? ($.dialog({
                    title: "",
                    content: '<div style="padding: 4px 0 30px;">鎮ㄤ笂浼犵殑鏂囦欢瓒呰繃8M锛岃閲嶆柊閫夋嫨</div>',
                    type: "warning",
                    closeText: !0,
                    confirmText: "纭畾",
                    cancelText: !1,
                    preKa: "",
                    wrapClass: "dialog-icons-default",
                    lock: !0
                }), void ("function" == typeof failCallback && failCallback())) : ($(this).data("resume", i), void t.submit()) : ($.dialog({
                    title: "",
                    content: '<div style="padding: 4px 0 30px;">浠呮敮鎸丏OC銆丏OCX銆丳DF鏍煎紡绠€鍘嗘枃浠讹紝璇烽噸鏂伴€夋嫨</div>',
                    type: "warning",
                    closeText: !0,
                    confirmText: "纭畾",
                    cancelText: !1,
                    preKa: "",
                    wrapClass: "dialog-icons-default",
                    lock: !0,
                    onConfirm: function (e) {
                        e.remove(), $("#fileupload").click()
                    }
                }), void ("function" == typeof failCallback && failCallback()))
            },
            done: function (e, data) {
                var result = data.result;
                switch ("string" == typeof result && (result = eval("(" + result + ")")), result.code) {
                    case 0:
                        result.data = result.zpData, result.data.key && "" != result.data.key.trim() ? "function" == typeof successCallback && successCallback(result) : ($.dialog({
                            title: "",
                            content: '<div style="padding: 4px 0 30px;">鏆備笖鏃犳硶瑙ｆ瀽锛屾偍鍙互閫夋嫨鍏朵粬鏂囦欢鎴栬€呭皾璇曠洿鎺ユ敞鍐屻€�</div>',
                            type: "error",
                            closeText: !0,
                            confirmText: "纭畾",
                            cancelText: !1,
                            preKa: "",
                            wrapClass: "dialog-icons-default",
                            lock: !0
                        }), "function" == typeof failCallback && failCallback());
                        break;
                    case 24:
                        $.dialog({
                            title: "",
                            content: '<div style="padding: 4px 0 30px;">璇峰垏鎹㈣嚦鐗涗汉韬唤</div>',
                            type: "error",
                            closeText: !0,
                            confirmText: "纭畾",
                            cancelText: !1,
                            preKa: "",
                            wrapClass: "dialog-icons-default",
                            lock: !0
                        });
                        break;
                    case 200214:
                        $.toast({content: "鐗涗汉韬唤宸插畬鍠勶紝鍗冲皢涓轰綘璺宠浆涓汉涓績椤�", type: "info"}), setTimeout(function () {
                            window.location.href = "/web/geek/recommend"
                        }, 1e3);
                        break;
                    case 200143:
                        $.dialog({
                            title: "",
                            content: '<div style="padding: 4px 0 30px;">鏈嶅姟鍣ㄦ湭鑾峰彇鍒颁笂浼犳枃浠讹紝璇锋洿鎹㈡枃浠舵垨绋嶅悗閲嶈瘯</div>',
                            type: "error",
                            closeText: !0,
                            confirmText: "纭畾",
                            cancelText: !1,
                            preKa: "",
                            wrapClass: "dialog-icons-default",
                            lock: !0
                        });
                        break;
                    case 200140:
                        $.dialog({
                            title: "",
                            content: '<div style="padding: 4px 0 30px;">鎮ㄤ笂浼犵殑鏂囦欢瓒呰繃8M锛岃閲嶆柊閫夋嫨</div>',
                            type: "warning",
                            closeText: !0,
                            confirmText: "纭畾",
                            cancelText: !1,
                            preKa: "",
                            wrapClass: "dialog-icons-default",
                            lock: !0
                        });
                        break;
                    case 200147:
                        $.dialog({
                            title: "",
                            content: '<div style="padding: 4px 0 30px;">浠呮敮鎸丏OC銆丏OCX銆丳DF鏍煎紡绠€鍘嗘枃浠讹紝璇烽噸鏂伴€夋嫨</div>',
                            type: "warning",
                            closeText: !0,
                            confirmText: "纭畾",
                            cancelText: !1,
                            preKa: "",
                            wrapClass: "dialog-icons-default",
                            lock: !0
                        });
                        break;
                    default:
                        $.dialog({
                            title: "",
                            content: '<div style="padding: 4px 0 30px;">鏈嶅姟鍣ㄥ紓甯革紝璇风◢鍚庨噸璇�</div>',
                            type: "error",
                            closeText: !0,
                            confirmText: "纭畾",
                            cancelText: !1,
                            preKa: "",
                            wrapClass: "dialog-icons-default",
                            lock: !0
                        })
                }
                0 != result.code && "function" == typeof failCallback && failCallback()
            },
            fail: function (e, t) {
                $.dialog({
                    title: "",
                    content: '<div style="padding: 4px 0 30px;">鏈嶅姟鍣ㄥ紓甯革紝璇风◢鍚庨噸璇�</div>',
                    type: "error",
                    closeText: !0,
                    confirmText: "纭畾",
                    cancelText: !1,
                    preKa: "",
                    wrapClass: "dialog-icons-default",
                    lock: !0
                }), "function" == typeof failCallback && failCallback()
            }
        })
    }, signOrRegisterCallback: function (e, t) {
        var i = e.find(".form-footer .btn").addClass("btn-waiting"), n = $("#fileupload").data("resume");
        if (t.resumeCount >= 3 && t.isComplete) $.dialog({
            title: "",
            content: "鍚屾椂鍙兘鏈�3浠介檮浠剁畝鍘嗭紝璇峰墠寰€绠€鍘嗛〉鍒犻櫎涓€浠藉悗鍐嶄笂浼�",
            type: "warning",
            closeText: !0,
            confirmText: "鎴戠煡閬撲簡",
            cancelText: "",
            wrapClass: "dialog-icons-default",
            lock: !0,
            onConfirm: function (e) {
                try {
                    _T.sendEvent("dialog_over")
                } catch (e) {
                }
                e.remove(), AnalysisResume.callbackDone(i, t)
            }
        }); else {
            if (t.resumeCount >= 3) {
                var s = "";
                t.toUrl.indexOf("?") > -1 ? s += "&" : s += "?", t.toUrl += s + "maxResumeCount=true"
            }
            AnalysisResume.saveSilent(n, t.t).then(function () {
                AnalysisResume.callbackDone(i, t)
            }, function () {
                AnalysisResume.callbackDone(i, t)
            })
        }
    }, saveSilent: function (resume, token) {
        var def = $.Deferred();
        if (!resume || "object" != typeof resume) return void def.reject();
        var formData = new FormData, secReqData = {};
        return formData.append("file", resume), $.trim(token) && (formData.append("token", token), secReqData = {token: token}), $.ajax({
            url: "/wapi/zpupload/resume/uploadFile.json",
            type: "POST",
            data: formData,
            contentType: !1,
            processData: !1,
            success: function (data) {
                if ("string" == typeof data && (data = eval("(" + data + ")")), 0 == data.code) {
                    var img = new Image;
                    img.onload = function () {
                        $.ajax({
                            type: "POST",
                            url: "/wapi/zpgeek/resume/attachment/save.json?previewUrl=" + data.zpData.previewUrl,
                            dataType: "JSON",
                            data: secReqData,
                            success: function () {
                                def.resolve()
                            },
                            error: function () {
                                def.reject()
                            }
                        })
                    }, img.onerror = function () {
                        def.reject()
                    }, img.src = "/wapi/zpgeek/resume/preview4geek/" + data.zpData.previewUrl
                } else def.reject()
            },
            error: function () {
                def.reject()
            }
        }), def
    }, callbackDone: function (e, t) {
        e.removeClass("btn-waiting"), window.location.href = t.toUrl
    }
}, $(function () {
    $(".sign-resume-wrapper").length && AnalysisResume.init()
});