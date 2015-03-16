/*! nice Validator 0.7.3
 * (c) 2012-2014 Jony Zhang <zj86@live.cn>, MIT Licensed
 * http://niceue.com/validator/
 */
!function (e, t) {
    "use strict";
    function i(n, s) {
        var r = this;
        return !r instanceof i ? new i(n, s) : (r.$el = e(n), r._init(n, s), t)
    }

    function n(e, t) {
        var i = t ? t === !0 ? this : t : n.prototype;
        if (z(e))for (var s in e)i[s] = r(e[s])
    }

    function s(e, t) {
        var i = t ? t === !0 ? this : t : s.prototype;
        if (z(e))for (var n in e) {
            if (!e[n])return;
            i[n] = e[n]
        }
    }

    function r(t) {
        switch (e.type(t)) {
            case"function":
                return t;
            case"array":
                return function (e) {
                    return t[0].test(e.value) || t[1] || !1
                };
            case"regexp":
                return function (e) {
                    return t.test(e.value)
                }
        }
    }

    function a(t) {
        var i = "";
        return e.map(t.split(" "), function (e) {
            i += "," + ("#" === e.charAt(0) ? e : '[name="' + e + '"]')
        }), i.substring(1)
    }

    function l(t) {
        var i;
        if (t && t.tagName) {
            switch (t.tagName) {
                case"INPUT":
                case"SELECT":
                case"TEXTAREA":
                case"BUTTON":
                case"FIELDSET":
                    i = t.form || e(t).closest("." + k);
                    break;
                case"FORM":
                    i = t;
                    break;
                default:
                    i = e(t).closest("." + k)
            }
            return e(i).data(h) || e(i)[h]().data(h)
        }
    }

    function u(e) {
        var t, i = e.currentTarget;
        i.form && null === K(i.form, q) && (t = l(i), t ? (t._parse(i), t["_" + e.type](e)) : K(i, V, null))
    }

    function o(i, n) {
        var s = e.trim(K(i, V + "-" + n));
        if (s)return s = Function("return " + s)(), s ? r(s) : t
    }

    function d(e, t, i, n) {
        var s = t.msg, r = t._r;
        return z(s) && (s = s[r]), Q(s) || (s = K(e, A + "-" + r) || K(e, A) || i || (n ? Q(n) ? n : n[r] : "")), s
    }

    function c(e) {
        var t;
        return e && (t = H.exec(e)), t ? t[1] : ""
    }

    function f(e) {
        return "INPUT" === e.tagName && "checkbox" === e.type || "radio" === e.type
    }

    function g(e) {
        return Date.parse(e.replace(/\.|\-/g, "/"))
    }

    var p, m, h = "validator", v = "." + h, y = ".rule", _ = ".field", b = ".form", k = "nice-" + h, w = "n-ok", M = "n-error", O = "n-tip", $ = "n-loading", x = "msg-box", C = "aria-required", F = "aria-invalid", V = "data-rule", A = "data-msg", R = "data-tip", T = "data-ok", S = "data-target", E = "data-inputstatus", q = "novalidate", N = ":verifiable", j = /(!?)\s?(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?\s*(;|\||&)?/g, D = /(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?/, I = /(?:([^:;\(\[]*):)?(.*)/, U = /[^\x00-\xff]/g, H = /^.*(top|right|bottom|left).*$/, L = /(?:(post|get):)?(.+)/i, P = /<|>/g, W = e.noop, B = e.proxy, X = e.isFunction, J = e.isArray, Q = function (e) {
        return "string" == typeof e
    }, z = function (e) {
        return e && "[object Object]" === Object.prototype.toString.call(e)
    }, G = !window.XMLHttpRequest, K = function (e, i, n) {
        return n === t ? e.getAttribute(i) : (null === n ? e.removeAttribute(i) : e.setAttribute(i, "" + n), t)
    }, Y = window.console || {log: W, info: W}, Z = {
        debug: 0,
        timely: 1,
        theme: "default",
        ignore: "",
        focusInvalid: !0,
        beforeSubmit: W,
        validClass: "n-valid",
        invalidClass: "n-invalid",
        msgWrapper: "span",
        msgMaker: function (e) {
            var t, i = {error: M, ok: w, tip: O, loading: $}[e.type];
            return t = '<span class="msg-wrap ' + i + '" role="alert">', t += e.arrow + e.icon + '<span class="n-msg">' + e.msg + "</span>", t += "</span>"
        },
        msgIcon: '<span class="n-icon"></span>',
        msgArrow: "",
        msgClass: "",
        defaultMsg: "{0} is not valid.",
        loadingMsg: "Validating..."
    }, et = {"default": {formClass: "n-default", msgClass: "n-right", showOk: ""}};
    e.fn[h] = function (t) {
        var n = this, s = arguments;
        return n.is(":input") ? n : (!n.is("form") && (n = this.find("form")), !n.length && (n = this), n.each(function () {
            var n = e(this).data(h);
            if (n)if (Q(t)) {
                if ("_" === t.charAt(0))return;
                n[t].apply(n, Array.prototype.slice.call(s, 1))
            } else t && (n._reset(!0), n._init(this, t)); else new i(this, t)
        }), this)
    }, e.fn.isValid = function (e, t) {
        var i, n, s = l(this[0]), r = X(e);
        return s ? (s.checkOnly = !!t, n = s.options, i = s._multiValidate(this.is(":input") ? this : this.find(N), function (t) {
            t || !n.focusInvalid || s.checkOnly || s.$el.find(":input[" + F + "]:first").focus(), r && e.call(null, t), s.checkOnly = !1
        }), r ? this : i) : !0
    }, e.expr[":"].verifiable = function (e) {
        var t = e.nodeName.toLowerCase();
        return ("input" === t && !{
            submit: 1,
            button: 1,
            reset: 1,
            image: 1
        }[e.type] || "select" === t || "textarea" === t) && e.disabled === !1
    }, i.prototype = {
        _init: function (i, r) {
            var l, u, o, d = this;
            if (X(r) && (r = {valid: r}), r = r || {}, o = K(i, "data-" + h + "-option"), o = o && "{" === o.charAt(0) ? Function("return " + o)() : {}, u = et[r.theme || o.theme || Z.theme], l = d.options = e.extend({}, Z, u, o, d.options, r), d.rules = new n(l.rules, !0), d.messages = new s(l.messages, !0), d.elements = d.elements || {}, d.deferred = {}, d.errors = {}, d.fields = {}, d._initFields(l.fields), J(l.groups) && e.map(l.groups, function (i) {
                    return Q(i.fields) && X(i.callback) ? (i.$elems = d.$el.find(a(i.fields)), e.map(i.fields.split(" "), function (e) {
                        d.fields[e] = d.fields[e] || {}, d.fields[e].group = i
                    }), t) : null
                }), d.msgOpt = {
                    type: "error",
                    pos: c(l.msgClass),
                    wrapper: l.msgWrapper,
                    cls: l.msgClass,
                    style: l.msgStyle,
                    icon: l.msgIcon,
                    arrow: l.msgArrow,
                    show: l.msgShow,
                    hide: l.msgHide
                }, d.isAjaxSubmit = !1, l.valid || !e.trim(K(i, "action")))d.isAjaxSubmit = !0; else {
                var f = e[e._data ? "_data" : "data"](i, "events");
                f && f.valid && e.map(f.valid, function (e) {
                    return -1 !== e.namespace.indexOf("form") ? 1 : null
                }).length && (d.isAjaxSubmit = !0)
            }
            d.$el.data(h) || (d.$el.data(h, d).addClass(k + " " + l.formClass).on("submit" + v + " validate" + v, B(d, "_submit")).on("reset" + v, B(d, "_reset")).on("showtip" + v, B(d, "_showTip")).on("focusin" + v + " click" + v + " showtip" + v, N, B(d, "_focusin")).on("focusout" + v + " validate" + v, N, B(d, "_focusout")), l.timely >= 2 && d.$el.on("keyup" + v + " paste" + v, N, B(d, "_focusout")).on("click" + v, ":radio,:checkbox", B(d, "_focusout")).on("change" + v, 'select,input[type="file"]', B(d, "_focusout")), d._novalidate = K(i, q), K(i, q, q))
        }, _initFields: function (t) {
            var i = this;
            z(t) && e.each(t, function (e, t) {
                if (null === t) {
                    var n = i.elements[e];
                    n && i._resetElement(n, !0), delete i.fields[e]
                } else i.fields[e] = Q(t) ? {rule: t} : t
            }), i.$el.find(N).each(function () {
                i._parse(this)
            })
        }, _parse: function (e) {
            var t, i = this, n = e.name, s = K(e, V);
            s && K(e, V, null), (e.id && "#" + e.id in i.fields || !e.name) && (n = "#" + e.id), n && (t = i.fields[n] || {}, t.key = n, t.old = {}, t.rule = t.rule || s || "", t.rule && (t.rule.match(/match|checked/) && (t.must = !0), -1 !== t.rule.indexOf("required") && (t.required = !0, K(e, C, !0)), ("timely"in t && !t.timely || !i.options.timely) && K(e, "notimely", !0), Q(t.target) && K(e, S, t.target), Q(t.tip) && K(e, R, t.tip), i.fields[n] = i._parseRule(t)))
        }, _parseRule: function (e) {
            var i = I.exec(e.rule), n = this.options;
            if (i)return e._i = 0, i[1] && (e.display = i[1]), !e.display && n.display && (e.display = n.display), i[2] && (e.rules = [], i[2].replace(j, function () {
                var i = arguments;
                i[3] = i[3] || i[4], e.rules.push({
                    not: "!" === i[1],
                    method: i[2],
                    params: i[3] ? i[3].split(", ") : t,
                    or: "|" === i[5]
                })
            })), e
        }, _multiValidate: function (i, n) {
            var s = this, r = s.options;
            return s.verifying = !0, s.isValid = !0, r.ignore && (i = i.not(r.ignore)), i.each(function (e, i) {
                var n = s.getField(i);
                return n && (s._validate(i, n), !s.isValid && r.stopOnError) ? !1 : t
            }), e.when.apply(null, e.map(s.deferred, function (e) {
                return e
            })).done(function () {
                n.call(s, s.isValid), s.verifying = !1
            }), e.isEmptyObject(s.deferred) ? s.isValid : t
        }, _submit: function (t) {
            var i = this, n = i.options, s = t.target, r = "submit" === t.type;
            t.preventDefault(), m && ~(m = !1) || i.submiting || "validate" === t.type && i.$el[0] !== s || n.beforeSubmit.call(i, s) === !1 || (n.debug && Y.log("\n" + t.type), i._reset(), i.submiting = !0, i._multiValidate(i.$el.find(N), function (t) {
                var a, l = t || 2 === n.debug ? "valid" : "invalid";
                t || (n.focusInvalid && i.$el.find(":input[" + F + '="true"]:first').focus(), a = e.map(i.errors, function (e) {
                    return e
                })), i.submiting = !1, X(n[l]) && n[l].call(i, s, a), i.$el.trigger(l + b, [s, a]), t && !i.isAjaxSubmit && r && (m = !0, p && p.name && i.$el.append('<input type="hidden" name="' + p.name + '" value="' + e(p).val() + '">'), s.submit())
            }))
        }, _reset: function (e) {
            var t = this;
            t.errors = {}, e && t.$el.find(N).each(function (e, i) {
                t._resetElement(i)
            })
        }, _resetElement: function (t, i) {
            var n = this.options;
            e(t).removeClass(n.validClass + " " + n.invalidClass), this.hideMsg(t), i && K(t, C, null)
        }, _focusin: function (t) {
            var i, n = this, s = n.options, r = t.target;
            n.verifying || ("showtip" !== t.type && "error" === K(r, E) && s.focusCleanup && (e(r).removeClass(s.invalidClass), n.hideMsg(r)), i = K(r, R), i && n.showMsg(r, {
                type: "tip",
                msg: i
            }))
        }, _focusout: function (t) {
            var i, n, s = this, r = s.options, a = t.target, l = t.type, u = {click: 1, change: 1, paste: 1}, o = 0;
            if (!u[l]) {
                if ("validate" === l)n = !0; else {
                    if (K(a, "notimely"))return;
                    if (r.timely >= 2 && "keyup" !== l)return
                }
                if (r.ignore && e(a).is(r.ignore))return;
                if ("keyup" === l) {
                    var d = t.keyCode, c = {8: 1, 9: 1, 16: 1, 32: 1, 46: 1};
                    if (9 === d && !a.value)return;
                    if (48 > d && !c[d])return;
                    o = r.timely >= 100 ? r.timely : 500
                }
            }
            i = s.getField(a), i && (o ? (i._t && clearTimeout(i._t), i._t = setTimeout(function () {
                s._validate(a, i, n)
            }, o)) : s._validate(a, i, n))
        }, _showTip: function (e) {
            var t = this;
            t.$el[0] === e.target && t.$el.find(N + "[" + R + "]").each(function () {
                t.showMsg(this, {msg: K(this, R), type: "tip"})
            })
        }, _validatedField: function (t, i, n) {
            var s = this, r = s.options, a = n.isValid = i.isValid = !!n.isValid, l = a ? "valid" : "invalid";
            n.key = i.key, n.rule = i._r, a ? n.type = "ok" : (s.submiting && (s.errors[i.key] = n.msg), s.isValid = !1), i.old.value = t.value, i.old.id = t.id, s.elements[i.key] = n.element = t, s.$el[0].isValid = a ? s.isFormValid() : a, X(i[l]) && i[l].call(s, t, n), e(t).attr(F, a ? null : !0).removeClass(a ? r.invalidClass : r.validClass).addClass(n.skip ? "" : a ? r.validClass : r.invalidClass).trigger(l + _, [n, s]), s.$el.triggerHandler("validation", [n, s]), s.checkOnly || (i.msgMaker || r.msgMaker) && s[n.showOk || n.msg ? "showMsg" : "hideMsg"](t, n, i)
        }, _validatedRule: function (i, n, s, r) {
            n = n || o.getField(i), r = r || {};
            var a, l, u, o = this, c = o.options, f = n._r, g = !1;
            if (null === s)return o._validatedField(i, n, {isValid: !0, skip: !0}), t;
            if (s === !0 || s === t || "" === s ? g = !0 : Q(s) ? a = s : z(s) && (s.error ? a = s.error : (a = s.ok, g = !0)), n.rules && (l = n.rules[n._i], l.not && (a = t, g = "required" === f || !g), l.or))if (g)for (; n._i < n.rules.length && n.rules[n._i].or;)n._i++; else u = !0;
            u || (g ? (r.isValid = g, c.showOk !== !1 && (Q(a) || (Q(n.ok) ? a = n.ok : Q(K(i, T)) ? a = K(i, T) : Q(c.showOk) && (a = c.showOk)), Q(a) && (r.showOk = g, r.msg = a)), e(i).trigger("valid" + y, [f, r.msg])) : (r.msg = (d(i, n, a, o.messages[f]) || Z.defaultMsg).replace("{0}", o._getDisplay(i, n.display || "")), e(i).trigger("invalid" + y, [f, r.msg]))), c.debug && Y.log("   " + n._i + ": " + f + " => " + (g || r.msg || g)), u || g && n._i < n.rules.length - 1 ? (n._i++, o._checkRule(i, n)) : (n._i = 0, o._validatedField(i, n, r))
        }, _checkRule: function (i, n) {
            var s, r, a = this, l = n.key, u = n.rules[n._i], d = u.method, c = u.params;
            a.submiting && a.deferred[l] || (r = n.old, n._r = d, s = !n.must && r.ret !== t && r.rule === u && r.id === i.id && i.value && r.value === i.value ? r.ret : (o(i, d) || a.rules[d] || W).call(a, i, c, n), z(s) && X(s.then) ? (a.deferred[l] = s, !a.checkOnly && a.showMsg(i, {
                type: "loading",
                msg: a.options.loadingMsg
            }, n), s.then(function (s, l, o) {
                var d, c = o.responseText, f = n.dataFilter || a.options.dataFilter;
                "json" === this.dataType ? c = s : "{" === c.charAt(0) && (c = e.parseJSON(c) || {}), X(f) || (f = function (e) {
                    return Q(e) || z(e) && ("error"in e || "ok"in e) ? e : t
                }), d = f(c), d === t && (d = f(c.data)), r.rule = u, r.ret = d, a._validatedRule(i, n, d)
            }, function (e, t) {
                a._validatedRule(i, n, t)
            }).always(function () {
                delete a.deferred[l]
            }), n.isValid = t) : a._validatedRule(i, n, s))
        }, _validate: function (i, n) {
            if (!i.disabled && null === K(i, q)) {
                var s, r = this, a = {}, l = n.group, u = n.isValid = !0;
                if (n.rules || r._parse(i), r.options.debug && Y.info(n.key), l && (s = l.callback.call(r, l.$elems), s !== t && (r.hideMsg(l.target, {}, n), s === !0 ? s = t : (n._i = 0, n._r = "group", u = !1, r.hideMsg(i, {}, n), e.extend(a, l)))), u && !n.required && !n.must && !i.value) {
                    if ("tip" === K(i, E))return;
                    if (!f(i))return r._validatedField(i, n, {isValid: !0}), t
                }
                s !== t ? r._validatedRule(i, n, s, a) : n.rule && r._checkRule(i, n)
            }
        }, test: function (e, i) {
            var n, s, r, a = this, l = D.exec(i);
            return l && (s = l[1], s in a.rules && (r = l[2] || l[3], r = r ? r.split(", ") : t, n = a.rules[s].call(a, e, r))), n === !0 || n === t || null === n
        }, getRangeMsg: function (e, t, i, n) {
            if (t) {
                var s = this, r = s.messages[i] || "", a = t[0].split("~"), l = a[0], u = a[1], o = "rg", d = [""], c = +e === +e;
                if (2 === a.length) {
                    if (l && u) {
                        if (c && e >= +l && +u >= e)return !0;
                        d = d.concat(a)
                    } else if (l && !u) {
                        if (c && e >= +l)return !0;
                        d.push(l), o = "gte"
                    } else if (!l && u) {
                        if (c && +u >= e)return !0;
                        d.push(u), o = "lte"
                    }
                } else {
                    if (e === +l)return !0;
                    d.push(l), o = "eq"
                }
                return r && (n && r[o + n] && (o += n), d[0] = r[o]), s.renderMsg.apply(null, d)
            }
        }, renderMsg: function () {
            var e = arguments, t = e[0], i = e.length;
            if (t) {
                for (; --i;)t = t.replace("{" + i + "}", e[i]);
                return t
            }
        }, _getDisplay: function (e, t) {
            return Q(t) ? t : X(t) ? t.call(this, e) : ""
        }, _getMsgOpt: function (t) {
            return e.extend({}, this.msgOpt, Q(t) ? {msg: t} : t)
        }, _getMsgDOM: function (t, i) {
            var n, s, r, a = e(t);
            if (a.is(":input") ? (r = i.target || K(t, S), r && (r = X(r) ? r.call(this, t) : this.$el.find(r), r.length && (r.is(":input") ? t = r.get(0) : n = r)), n || (s = !f(t) && t.id ? t.id : t.name, n = this.$el.find(i.wrapper + "." + x + '[for="' + s + '"]'))) : n = a, !n.length)if (a = this.$el.find(r || t), n = e("<" + i.wrapper + ">").attr({
                    "class": x + (i.cls ? " " + i.cls : ""),
                    style: i.style || "",
                    "for": s
                }), f(t)) {
                var l = a.parent();
                n.appendTo(l.is("label") ? l.parent() : l)
            } else n[i.pos && "right" !== i.pos ? "insertBefore" : "insertAfter"](a);
            return n
        }, showMsg: function (t, i, n) {
            var s, r = this, a = r.options;
            if (i = r._getMsgOpt(i), (i.msg || i.showOk) && (t = e(t).get(0), e(t).is(N) && (K(t, E, i.type), n = n || r.getField(t), n && (i.style = n.msgStyle || i.style, i.cls = n.msgClass || i.cls, i.wrapper = n.msgWrapper || i.wrapper, i.target = n.target || a.target)), s = (n || {}).msgMaker || a.msgMaker)) {
                var l = r._getMsgDOM(t, i), u = l[0].className;
                !H.test(u) && l.addClass(i.cls), G && "bottom" === i.pos && (l[0].style.marginTop = e(t).outerHeight() + "px"), l.html(s.call(r, i))[0].style.display = "", X(i.show) && i.show.call(r, l, i.type)
            }
        }, hideMsg: function (t, i, n) {
            var s = this, r = s.options;
            t = e(t).get(0), i = s._getMsgOpt(i), e(t).is(N) && (K(t, E, null), K(t, F, null), n = n || s.getField(t), n && (i.wrapper = n.msgWrapper || i.wrapper, i.target = n.target || r.target));
            var a = s._getMsgDOM(t, i);
            a.length && (X(i.hide) ? i.hide.call(s, a, i.type) : a[0].style.display = "none")
        }, mapMsg: function (t) {
            var i = this;
            e.each(t, function (e, t) {
                var n = i.elements[e] || i.$el.find(':input[name="' + e + '"]')[0];
                i.showMsg(n, t)
            })
        }, setMsg: function (e) {
            new s(e, this.messages)
        }, setRule: function (t) {
            new n(t, this.rules), e.map(this.fields, function (e) {
                e.old = {}
            })
        }, getField: function (e) {
            var t, i = this;
            return t = e.id && "#" + e.id in i.fields || !e.name ? "#" + e.id : e.name, K(e, V) && i._parse(e), i.fields[t]
        }, setField: function (e, t) {
            var i = {};
            Q(e) ? i[e] = t : z(e) && (i = e), this._initFields(i)
        }, isFormValid: function () {
            var e = this.fields;
            for (var t in e)if (!e[t].isValid)return e[t].isValid;
            return !0
        }, holdSubmit: function (e) {
            this.submiting = e === t || e
        }, cleanUp: function () {
            this._reset(1)
        }, destroy: function () {
            this._reset(1), this.$el.off(v).removeData(h), K(this.$el[0], q, this._novalidate)
        }
    }, e(document).on("focusin", ":input[" + V + "]", function (e) {
        u(e)
    }).on("click", "input,button", function (e) {
        var t = this, i = t.name;
        if (t.form)if ("submit" === t.type)p = t, null !== K(t, q) && (m = !0); else if (i && f(t)) {
            var n = t.form.elements[i];
            n.length && (n = n[0]), K(n, V) && u(e)
        }
    }).on("submit validate", "form", function (t) {
        if (null === K(this, q)) {
            var i, n = e(this);
            n.data(h) || (i = n[h]().data(h), e.isEmptyObject(i.fields) ? (K(this, q, q), n.off(v).removeData(h)) : i._submit(t))
        }
    }), new n({
        required: function (t, i) {
            var n = e.trim(t.value), s = !0;
            if (i)if (1 === i.length) {
                if (!n && !this.test(t, i[0]))return K(t, C, null), null;
                K(t, C, !0)
            } else"not" === i[0] && e.map(i.slice(1), function (t) {
                n === e.trim(t) && (s = !1)
            });
            return s && !!n
        }, integer: function (e, t) {
            var i, n = "0|", s = "[1-9]\\d*", r = t ? t[0] : "*";
            switch (r) {
                case"+":
                    i = s;
                    break;
                case"-":
                    i = "-" + s;
                    break;
                case"+0":
                    i = n + s;
                    break;
                case"-0":
                    i = n + "-" + s;
                    break;
                default:
                    i = n + "-?" + s
            }
            return i = "^(?:" + i + ")$", RegExp(i).test(e.value) || this.messages.integer[r]
        }, match: function (t, i, n) {
            if (i) {
                var s, r, a, l, u, o, d, c = this, f = "eq";
                if (1 === i.length ? a = i[0] : (f = i[0], a = i[1]), u = "#" === a.charAt(0) ? a : ':input[name="' + a + '"]', o = c.$el.find(u)[0]) {
                    if (d = c.getField(o), s = t.value, r = o.value, n._match || (c.$el.on("valid" + _ + v, u, function () {
                            e(t).trigger("validate")
                        }), n._match = d._match = 1), !n.required && "" === s && "" === r)return null;
                    if (i[2] && ("date" === i[2] ? (s = g(s), r = g(r)) : "time" === i[2] && (s = +s.replace(":", ""), r = +r.replace(":", ""))), "eq" !== f && !isNaN(+s) && isNaN(+r))return !0;
                    switch (l = c.messages.match[f].replace("{1}", c._getDisplay(t, d.display || a)), f) {
                        case"lt":
                            return +r > +s || l;
                        case"lte":
                            return +r >= +s || l;
                        case"gte":
                            return +s >= +r || l;
                        case"gt":
                            return +s > +r || l;
                        case"neq":
                            return s !== r || l;
                        default:
                            return s === r || l
                    }
                }
            }
        }, range: function (e, t) {
            return this.getRangeMsg(+e.value, t, "range")
        }, checked: function (t, i, n) {
            if (f(t)) {
                var s, r, a = this;
                return r = a.$el.find('input[name="' + t.name + '"]').filter(function () {
                    var t = this;
                    return !s && f(t) && (s = t), !t.disabled && t.checked && e(t).is(":visible")
                }).length, i ? a.getRangeMsg(r, i, "checked") : !!r || d(s, n, "") || a.messages.required
            }
        }, length: function (e, t) {
            var i = e.value, n = (t[1] ? i.replace(U, "xx") : i).length;
            return this.getRangeMsg(n, t, "length", t[1] ? "_2" : "")
        }, remote: function (t, i) {
            if (i) {
                var n, s = this, r = L.exec(i[0]), a = r[2], l = (r[1] || "POST").toUpperCase(), u = {};
                return u[t.name] = t.value, i[1] && e.map(i.slice(1), function (t) {
                    var i, n = t.split(":");
                    t = e.trim(n[0]), i = e.trim(n[1] || "") || t, u[t] = s.$el.find("#" === i.charAt(0) ? i : ':input[name="' + i + '"]').val()
                }), u = e.param(u), "POST" === l && (n = a.indexOf("?"), -1 !== n && (u += "&" + a.substring(n + 1, a.length), a = a.substring(0, n))), e.ajax({
                    url: a,
                    type: l,
                    data: u,
                    cache: !1
                })
            }
        }, filter: function (e, t) {
            e.value = e.value.replace(t ? RegExp("[" + t[0] + "]", "gm") : P, "")
        }
    }), i.config = function (t) {
        e.each(t, function (e, t) {
            "rules" === e ? new n(t) : "messages" === e ? new s(t) : Z[e] = t
        })
    }, i.setTheme = function (t, i) {
        z(t) ? e.each(t, function (e, t) {
            et[e] = t
        }) : Q(t) && z(i) && (et[t] = i)
    }, e[h] = i
}(jQuery);
