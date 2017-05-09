var SFELion = SFELion || {};
SFELion.dialog = SFELion.dialog || (function(a, g, h, c) {
    if (!jQuery) {
        throw new Error("The plugin requires jQuery")
    }
    var j = /MSIE/.test(navigator.userAgent);
    var e = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent);
    var k = true;
    h.fn.snfadeIn = function(m, b) {
        return this.animate({opacity: "show"}, m, function() {
            if (!!j) {
                this.style.removeAttribute("filter")
            }
            if (h.isFunction(b)) {
                b()
            }
        })
    };
    var f = '<div class="m-lion-dialog-overlay"><div class="close lay overlay" ></div></div>';
    var i = '<div class="m-lion-dialog"><i class="lion"></i><div class="container"><div class="title"><h3>温馨提示</h3></div><a href="javascript:;" class="btn close" title="关闭"></a><i class="semi-circle"></i><div class="content"></div></div></div>';
    var l;
    function d(n) {
        n.mLionDialog = function(u) {
            if (k) {
                b(u);
                k = false
            }
        };
        n.unmLionDialog = function(u) {
            s(u);
            k = true
        };
        n.mLionDialog.defaults = {css: {width: "450px", position: "fixed", _position: "absolute"}, overlayCss: {}, title: "温馨提示", message: "", callback: null, http: null, fadeIn: 0, fadeOut: 0, overlay: true, overlayClick: false, timeout: null, draggable: true, iframeSrc: /^https/i.test(window.location.href || "") ? "https://imgssl.suning.com/images/ShoppingArea/Common/blankbg.gif" : "about:blank"};
        var r, o, p, m;
        function b(u) {
            u = n.extend({}, n.mLionDialog.defaults, u || {});
            if (r) {
                clearTimeout(r)
            }
            n("body").append(i).append(f);
            t(u);
            q(u);
            o = u
        }
        function s(v) {
            if (!!v) {
                v = n.extend({}, n.mLionDialog.defaults, v || {})
            } else {
                v = o
            }
            var u = typeof v.fadeOut == "number" ? v.fadeOut : 0;
            n(".m-lion-dialog").children().fadeOut(0, function() {
                n(".m-lion-dialog").remove()
            });
            n(".m-lion-dialog-overlay").children().fadeOut(u, function() {
                n(".m-lion-dialog-overlay").remove()
            });
            if (p !== c) {
                v.message.html(m)
            }
            p = c
        }
        function t(w) {
            if (!!w.message && !w.http) {
                if (typeof w.message == "object") {
                    p = w.message.children().size() ? w.message.children() : w.message.html();
                    m = w.message.children().size() ? p.clone() : w.message.html();
                    n(".m-lion-dialog").find(".content").append(p)
                } else {
                    if (typeof w.message == "string") {
                        n(".m-lion-dialog").find(".content").html(w.message)
                    }
                }
            } else {
                if (!w.message && !!w.http && typeof w.http == "function") {
                    w.http(n(".m-lion-dialog"), w)
                } else {
                    if (!w.message && !w.http) {
                        throw new Error("至少,必须设置其中一个参数");
                        return
                    }
                }
            }
            if (typeof w.css == "object") {
                n(".m-lion-dialog").css(w.css);
                if (e) {
                    n(".m-lion-dialog").css("position", "absolute")
                }
            }
            var B = n(".m-lion-dialog");
            var u = n(".m-lion-dialog-overlay");
            var y = n(".m-lion-dialog-overlay .lay");
            var z = typeof w.fadeIn == "number" ? w.fadeIn : 0;
            var x = n.extend({}, n.mLionDialog.defaults.css, w.css || {});
            B.children().snfadeIn(0, function() {
                if (typeof w.callback == "function") {
                    w.callback(this, w)
                }
            });
            if (typeof w.title == "string") {
                if (w.title == "") {
                    n(".m-lion-dialog .title").html("")
                } else {
                    n(".m-lion-dialog .title h3").html(w.title)
                }
            }
            function A() {
                var D = n(".m-lion-dialog").height();
                var E = n(a).height();
                var C = n("body").height();
                if (e) {
                    B.css({marginLeft: -B.width() / 2, marginTop: (D > E ? 0 : (n(document).scrollTop() - n(".m-lion-dialog").height() / 2)), top: (D > E ? 0 : "50%")})
                } else {
                    B.css(x).css({marginLeft: -B.width() / 2, marginTop: (D > E ? 0 : -D / 2), top: (D > E ? 0 : "50%")})
                }
                y.height(Math.max(C, E))
            }
            A();
            if (e) {
                n(a).scroll(function() {
                    B.css({marginTop: (n(".m-lion-dialog").height() > n(a).height() ? n(document).scrollTop() : (n(document).scrollTop() - n(".m-lion-dialog").height() / 2))})
                })
            }
            n(a).resize(function() {
                A()
            });
            var v = n.extend({}, n.mLionDialog.defaults.overlayCss, w.overlayCss || {});
            if (w.overlay === true) {
                y.css(v).snfadeIn(z)
            }
        }
        function q(v) {
            var w = [".m-lion-dialog .close"];
            if (typeof v.timeout == "number") {
                r = setTimeout(function() {
                    n.unmLionDialog()
                }, v.timeout)
            }
            if (!!v.overlayClick) {
                w.push(".m-lion-dialog-overlay")
            }
            for (var u = 0; u < w.length; u++) {
                n(w[u]).click(function() {
                    n.unmLionDialog()
                })
            }
        }}
    d(jQuery)
})(window, document, jQuery);
if (typeof define === "function") {
    define("SFE.dialog.dev", ["jquery"], function(b, a, c) {
        c.exports = SFELion.dialog
    })
} else {
    window.$ = window.jQuery = jQuery
}
;