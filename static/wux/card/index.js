"use strict";
var _baseComponent = _interopRequireDefault(require("../helpers/baseComponent")),
  _classNames3 = _interopRequireDefault(require("../helpers/classNames")),
  _styleToCssString = _interopRequireDefault(require("../helpers/styleToCssString"));

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}

function _defineProperty(e, t, a) {
  return t in e ? Object.defineProperty(e, t, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = a, e
}(0, _baseComponent.default)({
  properties: {
    prefixCls: {
      type: String,
      value: "wux-card"
    },
    bordered: {
      type: Boolean,
      value: !0
    },
    full: {
      type: Boolean,
      value: !1
    },
    title: {
      type: String,
      value: ""
    },
    thumb: {
      type: String,
      value: ""
    },
    thumbStyle: {
      type: [String, Object],
      value: "",
      observer: function(e) {
        this.setData({
          extStyle: (0, _styleToCssString.default)(e)
        })
      }
    },
    extra: {
      type: String,
      value: ""
    },
    actions: {
      type: Array,
      value: []
    }
  },
  data: {
    extStyle: ""
  },
  computed: {
    classes: ["prefixCls, bordered, full, actions", function(a, e, t, n) {
      var r;
      return {
        wrap: (0, _classNames3.default)(a, (_defineProperty(r = {}, "".concat(a, "--bordered"), e), _defineProperty(r, "".concat(a, "--full"), t), _defineProperty(r, "".concat(a, "--has-actions"), 0 < n.length), r)),
        hd: "".concat(a, "__hd"),
        content: "".concat(a, "__content"),
        thumb: "".concat(a, "__thumb"),
        extra: "".concat(a, "__extra"),
        bd: "".concat(a, "__bd"),
        ft: "".concat(a, "__ft"),
        actions: "".concat(a, "__actions"),
        action: n.map(function(e) {
          var t;
          return {
            wrap: (0, _classNames3.default)("".concat(a, "__action"), (_defineProperty(t = {}, "".concat(a, "__action--").concat(e.type || "default"), e.type || "default"), _defineProperty(t, "".concat(a, "__action--bold"), e.bold), _defineProperty(t, "".concat(a, "__action--disabled"), e.disabled), _defineProperty(t, "".concat(e.className), e.className), t)),
            hover: e.hoverClass && "default" !== e.hoverClass ? e.hoverClass : "".concat(a, "__action--hover")
          }
        })
      }
    }]
  },
  methods: {
    onAction: function(e) {
      var t = e.currentTarget.dataset.index,
        a = this.data.actions,
        n = a[t];
      n.disabled || this.triggerEvent("action", {
        index: t,
        action: n,
        actions: a
      })
    }
  }
});