(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
  [1297],
  {
    16282: (e, t) => {
      "use strict";
      function i(e, t) {
        if (void 0 === e)
          throw new Error((null != t ? t : "Value") + " is undefined");
        return e;
      }
      function s(e, t) {
        if (null === e) throw new Error((null != t ? t : "Value") + " is null");
        return e;
      }
      Object.defineProperty(t, "__esModule", {value: !0}),
        (t.ensureNever =
          t.ensure =
          t.ensureNotNull =
          t.ensureDefined =
          t.assert =
            void 0),
        (t.assert = function (e, t) {
          if (!e) throw new Error("Assertion failed" + (t ? ": " + t : ""));
        }),
        (t.ensureDefined = i),
        (t.ensureNotNull = s),
        (t.ensure = function (e, t) {
          return s(i(e, t), t);
        }),
        (t.ensureNever = function (e) {});
    },
    75496: (e, t) => {
      "use strict";
      function i(e) {
        return Math.round(1e10 * e) / 1e10;
      }
      Object.defineProperty(t, "__esModule", {value: !0}),
        (t.alignTo =
          t.fixComputationError =
          t.isNaN =
          t.isInteger =
          t.isNumber =
            void 0),
        (t.isNumber = function (e) {
          return "number" == typeof e && isFinite(e);
        }),
        (t.isInteger = function (e) {
          return "number" == typeof e && e % 1 == 0;
        }),
        (t.isNaN = function (e) {
          return !(e <= 0 || e > 0);
        }),
        (t.fixComputationError = i),
        (t.alignTo = function (e, t) {
          var s = e / t,
            r = Math.floor(s),
            n = s - r;
          return n > 2e-10 ? i(n > 0.5 ? (r + 1) * t : r * t) : e;
        });
    },
    73211: (e, t) => {
      "use strict";
      (t.hasProperty = t.isObject = void 0),
        (t.isObject = function (e) {
          var t = typeof e;
          return null !== e && ("object" === t || "function" === t);
        }),
        (t.hasProperty = function (e, t) {
          return t in e;
        });
    },
    71044: (e, t, i) => {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0}),
        (t.pointInCircle =
          t.pointInPolygon =
          t.pointInBox =
          t.pointInTriangle =
          t.pointInHalfplane =
            void 0);
      var s = i(95196);
      (t.pointInHalfplane = function (e, t) {
        var i = t.edge;
        return i.A * e.x + i.B * e.y + i.C > 0 === t.isPositive;
      }),
        (t.pointInTriangle = function (e, t, i, r) {
          var n = t.add(i).scaled(0.5).add(r).scaled(0.5),
            o = s.intersectLineSegments(t, i, n, e);
          return (
            null === o &&
            null === (o = s.intersectLineSegments(i, r, n, e)) &&
            null === (o = s.intersectLineSegments(r, t, n, e))
          );
        }),
        (t.pointInBox = function (e, t) {
          return (
            e.x >= t.min.x && e.x <= t.max.x && e.y >= t.min.y && e.y <= t.max.y
          );
        }),
        (t.pointInPolygon = function (e, t) {
          for (
            var i = t.length - 1, s = !1, r = e.x, n = e.y, o = 0;
            o < t.length;
            o++
          ) {
            var a = t[o],
              l = t[i];
            ((a.y < n && l.y >= n) || (l.y < n && a.y >= n)) &&
              a.x + ((n - a.y) / (l.y - a.y)) * (l.x - a.x) < r &&
              (s = !s),
              (i = o);
          }
          return s;
        }),
        (t.pointInCircle = function (e, t, i) {
          return (e.x - t.x) * (e.x - t.x) + (e.y - t.y) * (e.y - t.y) <= i * i;
        });
    },
    89684: (e, t) => {
      "use strict";
      function i(e, t, i) {
        var s = t.subtract(e),
          r = i.subtract(e).dotProduct(s) / s.dotProduct(s);
        return {coeff: r, distance: e.addScaled(s, r).subtract(i).length()};
      }
      Object.defineProperty(t, "__esModule", {value: !0}),
        (t.distanceToSegment = t.distanceToLine = void 0),
        (t.distanceToLine = i),
        (t.distanceToSegment = function (e, t, s) {
          var r = i(e, t, s);
          if (0 <= r.coeff && r.coeff <= 1) return r;
          var n = e.subtract(s).length(),
            o = t.subtract(s).length();
          return n < o ? {coeff: 0, distance: n} : {coeff: 1, distance: o};
        });
    },
    95196: (e, t, i) => {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0}),
        (t.intersectPolygons =
          t.intersectPolygonAndHalfplane =
          t.intersectRayAndBox =
          t.intersectLineAndBox =
          t.intersectLineSegments =
          t.intersectLines =
          t.intersectLineSegmentAndBox =
            void 0);
      var s = i(16282),
        r = i(72927),
        n = i(89684),
        o = i(71044);
      function a(e, t) {
        var i = e.A,
          s = t.A,
          n = e.B,
          o = t.B,
          a = e.C,
          l = t.C,
          c = i * o - s * n;
        if (Math.abs(c) < 1e-6) return null;
        var h = (n * l - o * a) / c,
          d = (s * a - i * l) / c;
        return new r.Point(h, d);
      }
      function l(e, t, i, s) {
        var r = (function (e, t, i, s) {
          var r = t.subtract(e),
            n = s.subtract(i),
            o = r.x * n.y - r.y * n.x;
          if (Math.abs(o) < 1e-6) return null;
          var a = e.subtract(i);
          return (a.y * n.x - a.x * n.y) / o;
        })(e, t, i, s);
        if (null === r) return null;
        var o = t.subtract(e).scaled(r).add(e),
          a = n.distanceToSegment(i, s, o);
        return Math.abs(a.distance) < 1e-6 ? r : null;
      }
      function c(e, t) {
        for (var i = 0, s = e; i < s.length; i++) {
          var n = s[i];
          if (r.equalPoints(n, t)) return !1;
        }
        return e.push(t), !0;
      }
      function h(e, t) {
        return (
          !(
            e.length > 0 &&
            (r.equalPoints(e[e.length - 1], t) || r.equalPoints(e[0], t))
          ) && (e.push(t), !0)
        );
      }
      function d(e, t) {
        for (var i = [], s = 0; s < e.length; ++s) {
          var n = e[s],
            l = e[(s + 1) % e.length],
            c = r.lineThroughPoints(n, l);
          if (o.pointInHalfplane(n, t)) {
            if ((h(i, n), !o.pointInHalfplane(l, t)))
              null !== (d = a(c, t.edge)) && h(i, d);
          } else if (o.pointInHalfplane(l, t)) {
            var d;
            null !== (d = a(c, t.edge)) && h(i, d);
          }
        }
        return i.length >= 3 ? i : null;
      }
      (t.intersectLineSegmentAndBox = function (e, t) {
        var i = e[0].x,
          s = e[0].y,
          n = e[1].x,
          o = e[1].y,
          a = t.min.x,
          l = t.min.y,
          c = t.max.x,
          h = t.max.y;
        function d(e, t, i, s, r, n) {
          var o = 0;
          return (
            e < i ? (o |= 1) : e > r && (o |= 2),
            t < s ? (o |= 4) : t > n && (o |= 8),
            o
          );
        }
        for (
          var u = d(i, s, a, l, c, h), p = d(n, o, a, l, c, h), _ = !1, m = 0;
          ;

        ) {
          if (m > 1e3)
            throw new Error("Cohen - Sutherland algorithm: infinity loop");
          if ((m++, !(u | p))) {
            _ = !0;
            break;
          }
          if (u & p) break;
          var g = u || p,
            f = void 0,
            v = void 0;
          8 & g
            ? ((f = i + ((n - i) * (h - s)) / (o - s)), (v = h))
            : 4 & g
            ? ((f = i + ((n - i) * (l - s)) / (o - s)), (v = l))
            : 2 & g
            ? ((v = s + ((o - s) * (c - i)) / (n - i)), (f = c))
            : ((v = s + ((o - s) * (a - i)) / (n - i)), (f = a)),
            g === u
              ? (u = d((i = f), (s = v), a, l, c, h))
              : (p = d((n = f), (o = v), a, l, c, h));
        }
        return _
          ? r.equalPoints(r.point(i, s), r.point(n, o))
            ? r.point(i, s)
            : r.lineSegment(r.point(i, s), r.point(n, o))
          : null;
      }),
        (t.intersectLines = a),
        (t.intersectLineSegments = l),
        (t.intersectLineAndBox = function (e, t) {
          var i = t.min.x,
            n = t.min.y,
            o = t.max.x,
            a = t.max.y;
          if (0 === e.A) {
            var l = -e.C / e.B;
            return n <= l && l <= a
              ? r.lineSegment(r.point(i, l), r.point(o, l))
              : null;
          }
          if (0 === e.B) {
            var h = -e.C / e.A;
            return i <= h && h <= o
              ? r.lineSegment(r.point(h, n), r.point(h, a))
              : null;
          }
          var d = [],
            u = function (t) {
              var i = (function (e, t) {
                return -(e.C + e.A * t) / e.B;
              })(e, t);
              n <= i && i <= a && c(d, new r.Point(t, i));
            },
            p = function (t) {
              var s = (function (e, t) {
                return -(e.C + e.B * t) / e.A;
              })(e, t);
              i <= s && s <= o && c(d, new r.Point(s, t));
            };
          switch ((u(i), p(n), u(o), p(a), d.length)) {
            case 0:
              return null;
            case 1:
              return d[0];
            case 2:
              return r.equalPoints(d[0], d[1])
                ? d[0]
                : r.lineSegment(d[0], d[1]);
          }
          return (
            s.assert(!1, "We should have at most two intersection points"), null
          );
        }),
        (t.intersectRayAndBox = function (e, t, i) {
          var s = l(e, t, i.min, new r.Point(i.max.x, i.min.y)),
            n = l(e, t, new r.Point(i.max.x, i.min.y), i.max),
            a = l(e, t, i.max, new r.Point(i.min.x, i.max.y)),
            c = l(e, t, new r.Point(i.min.x, i.max.y), i.min),
            h = [];
          if (
            (null !== s && s >= 0 && h.push(s),
            null !== n && n >= 0 && h.push(n),
            null !== a && a >= 0 && h.push(a),
            null !== c && c >= 0 && h.push(c),
            0 === h.length)
          )
            return null;
          h.sort(function (e, t) {
            return e - t;
          });
          var d = o.pointInBox(e, i) ? h[0] : h[h.length - 1];
          return e.addScaled(t.subtract(e), d);
        }),
        (t.intersectPolygonAndHalfplane = d),
        (t.intersectPolygons = function (e, t) {
          for (var i = e, s = 0; s < t.length && null !== i; ++s) {
            var n = t[s],
              o = t[(s + 1) % t.length],
              a = t[(s + 2) % t.length],
              l = r.lineThroughPoints(n, o);
            i = d(i, r.halfplaneThroughPoint(l, a));
          }
          return i;
        });
    },
    72927: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0}),
        (t.equalBoxes =
          t.box =
          t.halfplaneThroughPoint =
          t.halfplane =
          t.lineSegment =
          t.lineThroughPoints =
          t.line =
          t.equalPoints =
          t.point =
          t.Point =
            void 0);
      var i = (function () {
        function e(e, t) {
          (this.x = e), (this.y = t);
        }
        return (
          (e.prototype.add = function (t) {
            return new e(this.x + t.x, this.y + t.y);
          }),
          (e.prototype.addScaled = function (t, i) {
            return new e(this.x + i * t.x, this.y + i * t.y);
          }),
          (e.prototype.subtract = function (t) {
            return new e(this.x - t.x, this.y - t.y);
          }),
          (e.prototype.dotProduct = function (e) {
            return this.x * e.x + this.y * e.y;
          }),
          (e.prototype.crossProduct = function (e) {
            return this.x * e.y - this.y * e.x;
          }),
          (e.prototype.signedAngle = function (e) {
            return Math.atan2(this.crossProduct(e), this.dotProduct(e));
          }),
          (e.prototype.angle = function (e) {
            return Math.acos(this.dotProduct(e) / (this.length() * e.length()));
          }),
          (e.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
          }),
          (e.prototype.scaled = function (t) {
            return new e(this.x * t, this.y * t);
          }),
          (e.prototype.normalized = function () {
            return this.scaled(1 / this.length());
          }),
          (e.prototype.transposed = function () {
            return new e(-this.y, this.x);
          }),
          (e.prototype.clone = function () {
            return new e(this.x, this.y);
          }),
          e
        );
      })();
      function s(e, t) {
        return new i(e, t);
      }
      function r(e, t) {
        return e.x === t.x && e.y === t.y;
      }
      function n(e, t, i) {
        if (0 === e && 0 === t)
          throw new Error("A and B can not be both equal to zero.");
        return {A: e, B: t, C: i};
      }
      function o(e, t) {
        return {edge: e, isPositive: t};
      }
      (t.Point = i),
        (t.point = s),
        (t.equalPoints = r),
        (t.line = n),
        (t.lineThroughPoints = function (e, t) {
          if (r(e, t)) throw new Error("Points should be distinct");
          return n(e.y - t.y, t.x - e.x, e.x * t.y - t.x * e.y);
        }),
        (t.lineSegment = function (e, t) {
          if (r(e, t))
            throw new Error("Points of a segment should be distinct");
          return [e, t];
        }),
        (t.halfplane = o),
        (t.halfplaneThroughPoint = function (e, t) {
          return o(e, e.A * t.x + e.B * t.y + e.C > 0);
        }),
        (t.box = function (e, t) {
          return {
            min: s(Math.min(e.x, t.x), Math.min(e.y, t.y)),
            max: s(Math.max(e.x, t.x), Math.max(e.y, t.y)),
          };
        }),
        (t.equalBoxes = function (e, t) {
          return r(e.min, t.min) && r(e.max, t.max);
        });
    },
    51102: (e, t, i) => {
      "use strict";
      t.transformPoint =
        t.translationMatrix =
        t.scalingMatrix =
        t.rotationMatrix =
          void 0;
      var s = i(72927);
      (t.rotationMatrix = function (e) {
        var t = Math.cos(e),
          i = Math.sin(e);
        return [
          [t, -i, 0],
          [i, t, 0],
          [0, 0, 1],
        ];
      }),
        (t.scalingMatrix = function (e, t) {
          return [
            [e, 0, 0],
            [0, t, 0],
            [0, 0, 1],
          ];
        }),
        (t.translationMatrix = function (e, t) {
          return [
            [1, 0, e],
            [0, 1, t],
            [0, 0, 1],
          ];
        }),
        (t.transformPoint = function (e, t) {
          for (var i = [t.x, t.y, 1], r = [0, 0, 0], n = 0; n < 3; n++)
            for (var o = 0; o < 3; o++) r[n] += i[o] * e[n][o];
          return new s.Point(r[0], r[1]);
        });
    },
    14563: (e, t, i) => {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0});
      var s = i(75496);
      function r(e, t, i) {
        return s.isNaN(t) || t < e ? e : t > i ? i : Math.round(t);
      }
      function n(e, t, i) {
        return s.isNaN(t) || t < e ? e : t > i ? i : Math.round(1e4 * t) / 1e4;
      }
      function o(e) {
        return r(0, e, 255);
      }
      function a(e) {
        return r(0, e, 255);
      }
      function l(e) {
        return r(0, e, 255);
      }
      function c(e) {
        return n(0, e, 1);
      }
      function h(e) {
        return n(0, e, 1);
      }
      function d(e) {
        return n(0, e, 1);
      }
      function u(e) {
        return n(0, e, 1);
      }
      function p(e) {
        return n(0, e, 1);
      }
      function _(e) {
        return n(0, e, 1);
      }
      function m(e) {
        var t = e[0] / 255,
          i = e[1] / 255,
          s = e[2] / 255,
          r = Math.min(t, i, s),
          n = Math.max(t, i, s),
          o = 0,
          a = 0,
          l = (r + n) / 2;
        if (r === n) (o = 0), (a = 0);
        else {
          var c = n - r;
          switch (((a = l > 0.5 ? c / (2 - n - r) : c / (n + r)), n)) {
            case t:
              o = ((i - s) / c + (i < s ? 6 : 0)) / 6;
              break;
            case i:
              o = ((s - t) / c + 2) / 6;
              break;
            case s:
              o = ((t - i) / c + 4) / 6;
          }
        }
        return [o, a, l];
      }
      function g(e, t, i) {
        return (
          i < 0 && (i += 1),
          i > 1 && (i -= 1),
          i < 1 / 6
            ? e + 6 * (t - e) * i
            : i < 0.5
            ? t
            : i < 2 / 3
            ? e + (t - e) * (2 / 3 - i) * 6
            : e
        );
      }
      function f(e) {
        var t,
          i,
          s,
          r = e[0],
          n = e[1],
          c = e[2];
        if (0 === n) t = i = s = c;
        else {
          var h = c < 0.5 ? c * (1 + n) : c + n - c * n,
            d = 2 * c - h;
          (t = g(d, h, r + 1 / 3)), (i = g(d, h, r)), (s = g(d, h, r - 1 / 3));
        }
        return [o(255 * t), a(255 * i), l(255 * s)];
      }
      (t.normalizeRedComponent = o),
        (t.normalizeGreenComponent = a),
        (t.normalizeBlueComponent = l),
        (t.normalizeAlphaComponent = c),
        (t.rgb = function (e, t, i) {
          return [o(e), a(t), l(i)];
        }),
        (t.areEqualRgb = function (e, t) {
          return e[0] === t[0] && e[1] === t[1] && e[2] === t[2];
        }),
        (t.rgba = function (e, t, i, s) {
          if (Array.isArray(e)) {
            var r = e;
            return (s = t), [r[0], r[1], r[2], c(s)];
          }
          var n = t;
          return (i = i || 0), (s = s || 0), [o(e), a(n), l(i), c(s)];
        }),
        (t.areEqualRgba = function (e, t) {
          return (
            e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3]
          );
        }),
        (t.normalizeHue = h),
        (t.normalizeHslSaturation = d),
        (t.normalizeHsvSaturation = u),
        (t.normalizeLightness = p),
        (t.normalizeValue = _),
        (t.hsl = function (e, t, i) {
          return [h(e), d(t), p(i)];
        }),
        (t.areEqualHsl = function (e, t) {
          return e[0] === t[0] && e[1] === t[1] && e[2] === t[2];
        }),
        (t.hsv = function (e, t, i) {
          return [h(e), u(t), _(i)];
        }),
        (t.areEqualHsv = function (e, t) {
          return e[0] === t[0] && e[1] === t[1] && e[2] === t[2];
        }),
        (t.rgbToHsl = m),
        (t.hslToRgb = f),
        (t.rgbToHsv = function (e) {
          var t = e[0],
            i = e[1],
            s = e[2],
            r = t / 255,
            n = i / 255,
            o = s / 255,
            a = Math.min(r, n, o),
            l = Math.max(r, n, o),
            c = l - a,
            h = 0,
            d = 0 === l ? 0 : c / l,
            u = l;
          if (l === a) h = 0;
          else
            switch (l) {
              case t:
                h = ((n - o) / c + (n < o ? 6 : 0)) / 6;
                break;
              case i:
                h = ((o - r) / c + 2) / 6;
                break;
              case s:
                h = ((r - n) / c + 4) / 6;
            }
          return [h, d, u];
        }),
        (t.hsvToRgb = function (e) {
          var t = e[0],
            i = e[1],
            s = e[2],
            r = Math.floor(6 * t),
            n = 6 * t - r,
            c = s * (1 - i),
            h = s * (1 - n * i),
            d = s * (1 - (1 - n) * i),
            u = 0,
            p = 0,
            _ = 0;
          switch (r % 6) {
            case 0:
              (u = s), (p = d), (_ = c);
              break;
            case 1:
              (u = h), (p = s), (_ = c);
              break;
            case 2:
              (u = c), (p = s), (_ = d);
              break;
            case 3:
              (u = c), (p = h), (_ = s);
              break;
            case 4:
              (u = d), (p = c), (_ = s);
              break;
            case 5:
              (u = s), (p = c), (_ = h);
          }
          return [o(255 * u), a(255 * p), l(255 * _)];
        });
      var v = [0.199, 0.687, 0.114];
      function S(e) {
        return v[0] * e[0] + v[1] * e[1] + v[2] * e[2];
      }
      function y(e, t, i) {
        void 0 === i && (i = 0.05);
        var s = m(e),
          r = s[0] + t * i;
        return (s[0] = h(r - Math.floor(r))), f(s);
      }
      function b(e, t, i) {
        void 0 === i && (i = 0.05);
        var s = e[0],
          r = e[1],
          n = e[2],
          o = e[3],
          a = y([s, r, n], t, i);
        return [a[0], a[1], a[2], o];
      }
      (t.rgbToGrayscale = S),
        (t.distanceRgb = function (e, t) {
          var i = e[0],
            s = e[1],
            r = e[2],
            n = t[0] - i,
            o = t[1] - s,
            a = t[2] - r;
          return Math.sqrt(n * n + o * o + a * a);
        }),
        (t.invertRgb = function (e) {
          return [255 - e[0], 255 - e[1], 255 - e[2]];
        }),
        (t.darkenRgb = function (e, t) {
          var i = m(e);
          return f([i[0], i[1], p(i[2] - t / 100)]);
        }),
        (t.blendRgba = function (e, t) {
          var i = e[0],
            s = e[1],
            r = e[2],
            n = e[3],
            h = t[0],
            d = t[1],
            u = t[2],
            p = t[3],
            _ = c(1 - (1 - p) * (1 - n));
          return [
            o((h * p) / _ + (i * n * (1 - p)) / _),
            a((d * p) / _ + (s * n * (1 - p)) / _),
            l((u * p) / _ + (r * n * (1 - p)) / _),
            _,
          ];
        }),
        (t.shiftRgb = y),
        (t.shiftRgba = b),
        (t.shiftColor = function (e, t, i) {
          return void 0 === i && (i = 0.05), E(b(B(e), t, i));
        });
      var w,
        P,
        C,
        T,
        x = {
          aliceblue: "#f0f8ff",
          antiquewhite: "#faebd7",
          aqua: "#00ffff",
          aquamarine: "#7fffd4",
          azure: "#f0ffff",
          beige: "#f5f5dc",
          bisque: "#ffe4c4",
          black: "#000000",
          blanchedalmond: "#ffebcd",
          blue: "#0000ff",
          blueviolet: "#8a2be2",
          brown: "#a52a2a",
          burlywood: "#deb887",
          cadetblue: "#5f9ea0",
          chartreuse: "#7fff00",
          chocolate: "#d2691e",
          coral: "#ff7f50",
          cornflowerblue: "#6495ed",
          cornsilk: "#fff8dc",
          crimson: "#dc143c",
          cyan: "#00ffff",
          darkblue: "#00008b",
          darkcyan: "#008b8b",
          darkgoldenrod: "#b8860b",
          darkgray: "#a9a9a9",
          darkgreen: "#006400",
          darkkhaki: "#bdb76b",
          darkmagenta: "#8b008b",
          darkolivegreen: "#556b2f",
          darkorange: "#ff8c00",
          darkorchid: "#9932cc",
          darkred: "#8b0000",
          darksalmon: "#e9967a",
          darkseagreen: "#8fbc8f",
          darkslateblue: "#483d8b",
          darkslategray: "#2f4f4f",
          darkturquoise: "#00ced1",
          darkviolet: "#9400d3",
          deeppink: "#ff1493",
          deepskyblue: "#00bfff",
          dimgray: "#696969",
          dodgerblue: "#1e90ff",
          feldspar: "#d19275",
          firebrick: "#b22222",
          floralwhite: "#fffaf0",
          forestgreen: "#228b22",
          fuchsia: "#ff00ff",
          gainsboro: "#dcdcdc",
          ghostwhite: "#f8f8ff",
          gold: "#ffd700",
          goldenrod: "#daa520",
          gray: "#808080",
          green: "#008000",
          greenyellow: "#adff2f",
          honeydew: "#f0fff0",
          hotpink: "#ff69b4",
          indianred: "#cd5c5c",
          indigo: "#4b0082",
          ivory: "#fffff0",
          khaki: "#f0e68c",
          lavender: "#e6e6fa",
          lavenderblush: "#fff0f5",
          lawngreen: "#7cfc00",
          lemonchiffon: "#fffacd",
          lightblue: "#add8e6",
          lightcoral: "#f08080",
          lightcyan: "#e0ffff",
          lightgoldenrodyellow: "#fafad2",
          lightgreen: "#90ee90",
          lightgrey: "#d3d3d3",
          lightpink: "#ffb6c1",
          lightsalmon: "#ffa07a",
          lightseagreen: "#20b2aa",
          lightskyblue: "#87cefa",
          lightslateblue: "#8470ff",
          lightslategray: "#778899",
          lightsteelblue: "#b0c4de",
          lightyellow: "#ffffe0",
          lime: "#00ff00",
          limegreen: "#32cd32",
          linen: "#faf0e6",
          magenta: "#ff00ff",
          maroon: "#800000",
          mediumaquamarine: "#66cdaa",
          mediumblue: "#0000cd",
          mediumorchid: "#ba55d3",
          mediumpurple: "#9370d8",
          mediumseagreen: "#3cb371",
          mediumslateblue: "#7b68ee",
          mediumspringgreen: "#00fa9a",
          mediumturquoise: "#48d1cc",
          mediumvioletred: "#c71585",
          midnightblue: "#191970",
          mintcream: "#f5fffa",
          mistyrose: "#ffe4e1",
          moccasin: "#ffe4b5",
          navajowhite: "#ffdead",
          navy: "#000080",
          oldlace: "#fdf5e6",
          olive: "#808000",
          olivedrab: "#6b8e23",
          orange: "#ffa500",
          orangered: "#ff4500",
          orchid: "#da70d6",
          palegoldenrod: "#eee8aa",
          palegreen: "#98fb98",
          paleturquoise: "#afeeee",
          palevioletred: "#d87093",
          papayawhip: "#ffefd5",
          peachpuff: "#ffdab9",
          peru: "#cd853f",
          pink: "#ffc0cb",
          plum: "#dda0dd",
          powderblue: "#b0e0e6",
          purple: "#800080",
          red: "#ff0000",
          rosybrown: "#bc8f8f",
          royalblue: "#4169e1",
          saddlebrown: "#8b4513",
          salmon: "#fa8072",
          sandybrown: "#f4a460",
          seagreen: "#2e8b57",
          seashell: "#fff5ee",
          sienna: "#a0522d",
          silver: "#c0c0c0",
          skyblue: "#87ceeb",
          slateblue: "#6a5acd",
          slategray: "#708090",
          snow: "#fffafa",
          springgreen: "#00ff7f",
          steelblue: "#4682b4",
          tan: "#d2b48c",
          teal: "#008080",
          thistle: "#d8bfd8",
          tomato: "#ff6347",
          turquoise: "#40e0d0",
          violet: "#ee82ee",
          violetred: "#d02090",
          wheat: "#f5deb3",
          white: "#ffffff",
          whitesmoke: "#f5f5f5",
          yellow: "#ffff00",
          yellowgreen: "#9acd32",
        };
      function I(e, t) {
        return t in e;
      }
      function M(e) {
        var t = w.re.exec(e);
        return null !== t ? w.parse(t) : null;
      }
      function L(e) {
        var t = P.re.exec(e);
        return null !== t ? P.parse(t) : null;
      }
      function A(e) {
        var t = C.re.exec(e);
        return null !== t ? C.parse(t) : null;
      }
      function k(e) {
        var t = T.re.exec(e);
        return null !== t ? T.parse(t) : null;
      }
      function E(e) {
        return "rgba(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
      }
      function D(e) {
        if (((e = e.toLowerCase()), I(x, e))) {
          var t = L(x[e]);
          if (null !== t) return t;
          throw new Error("Invalid named color definition");
        }
        var i = M(e);
        if (null !== i) return i;
        var s = L(e);
        if (null !== s) return s;
        var r = A(e);
        if (null !== r) return r;
        var n = k(e);
        return null !== n ? [n[0], n[1], n[2]] : null;
      }
      function V(e) {
        if (((e = e.toLowerCase()), I(x, e))) {
          var t = L(x[e]);
          if (null !== t) return [t[0], t[1], t[2], 1];
          throw new Error("Invalid named color definition");
        }
        var i = M(e);
        if (null !== i) return [i[0], i[1], i[2], 1];
        var s = L(e);
        if (null !== s) return [s[0], s[1], s[2], 1];
        var r = A(e);
        if (null !== r) return [r[0], r[1], r[2], 1];
        var n = k(e);
        return null !== n ? n : null;
      }
      function B(e) {
        var t = V(e);
        if (null !== t) return t;
        throw new Error(
          "Passed color string does not match any of the known color representations",
        );
      }
      !(function (e) {
        (e.re =
          /^rgb\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*\)$/),
          (e.parse = function (e) {
            return [
              o(parseInt(e[1], 10)),
              a(parseInt(e[2], 10)),
              l(parseInt(e[3], 10)),
            ];
          });
      })(w || (w = {})),
        (t.rgbToString = function (e) {
          return "rgb(" + e[0] + ", " + e[1] + ", " + e[2] + ")";
        }),
        (function (e) {
          (e.re = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/),
            (e.parse = function (e) {
              return [
                o(parseInt(e[1], 16)),
                a(parseInt(e[2], 16)),
                l(parseInt(e[3], 16)),
              ];
            });
        })(P || (P = {})),
        (t.rgbToHexString = function (e) {
          var t = e[0],
            i = e[1],
            s = e[2],
            r = t.toString(16),
            n = i.toString(16),
            o = s.toString(16);
          return (
            "#" +
            (1 === r.length ? "0" : "") +
            r +
            (1 === n.length ? "0" : "") +
            n +
            (1 === o.length ? "0" : "") +
            o
          );
        }),
        (function (e) {
          (e.re = /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/),
            (e.parse = function (e) {
              return [
                o(parseInt(e[1] + e[1], 16)),
                a(parseInt(e[2] + e[2], 16)),
                l(parseInt(e[3] + e[3], 16)),
              ];
            });
        })(C || (C = {})),
        (function (e) {
          (e.re =
            /^rgba\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?[\d]{0,10}(?:\.\d+)?)\s*\)$/),
            (e.parse = function (e) {
              return [
                o(parseInt(e[1], 10)),
                a(parseInt(e[2], 10)),
                l(parseInt(e[3], 10)),
                c(parseFloat(e[4])),
              ];
            });
        })(T || (T = {})),
        (t.rgbaToString = E),
        (t.rgbToBlackWhiteString = function (e, t) {
          if (t < 0 || t > 255)
            throw new Error(
              "invalid threshold value, valid values are [0, 255]",
            );
          return S(e) >= t ? "white" : "black";
        }),
        (t.tryParseRgb = D),
        (t.parseRgb = function (e) {
          var t = D(e);
          if (null !== t) return t;
          throw new Error(
            "Passed color string does not match any of the known color representations",
          );
        }),
        (t.tryParseRgba = V),
        (t.parseRgba = B);
    },
    59621: e => {
      e.exports = {
        "css-value-chart-controls-bar-height-with-border": "calc(38px + 1px)",
        "css-value-chart-controls-bar-border": "1px",
      };
    },
    72111: () => {},
    11739: e => {
      e.exports = {
        "tv-spinner__container-rotate": "tv-spinner__container-rotate-19aXx8o_",
        "tv-spinner__left-spin": "tv-spinner__left-spin-19aXx8o_",
        "tv-spinner__right-spin": "tv-spinner__right-spin-19aXx8o_",
      };
    },
    36563: e => {
      e.exports = {
        "tv-transition--fade-in": "tv-transition--fade-in-1zC4Mcq2",
        "tv-transition--fade-out": "tv-transition--fade-out-1zC4Mcq2",
        "tv-transition--slide-out": "tv-transition--slide-out-1zC4Mcq2",
      };
    },
    1267: e => {
      e.exports = {
        container: "container-e6Js9pSl",
        inner: "inner-e6Js9pSl",
        "border-left": "border-left-e6Js9pSl",
        "border-right": "border-right-e6Js9pSl",
        "border-top": "border-top-e6Js9pSl",
        "border-bottom": "border-bottom-e6Js9pSl",
        "top-right-radius": "top-right-radius-e6Js9pSl",
        "top-left-radius": "top-left-radius-e6Js9pSl",
        "bottom-right-radius": "bottom-right-radius-e6Js9pSl",
        "bottom-left-radius": "bottom-left-radius-e6Js9pSl",
      };
    },
    54119: () => {},
    93801: () => {},
    28429: e => {
      e.exports = {
        css_value_currency_label_top: "6",
        css_value_currency_label_radius: "4",
        css_value_currency_label_text_horizontal_padding: "4",
        css_value_border_color_light: "#D1D4DC",
        css_value_border_color_dark: "#363A45",
        "price-axis-currency-label-wrapper":
          "price-axis-currency-label-wrapper-25tFaE37",
        "price-axis-currency-label": "price-axis-currency-label-25tFaE37",
        readonly: "readonly-25tFaE37",
        multiline: "multiline-25tFaE37",
        "price-axis-currency-label-dropdown":
          "price-axis-currency-label-dropdown-25tFaE37",
        "price-axis-currency-label-text":
          "price-axis-currency-label-text-25tFaE37",
        "price-axis-currency-label-arrow-down":
          "price-axis-currency-label-arrow-down-25tFaE37",
      };
    },
    92175: e => {
      e.exports = {
        labelwidth: "19px",
        labelheight: "19px",
        bordersize: "2px",
        bottommargin: "5px",
        gearheight: "15px",
        gearwidth: "15px",
        "price-axis-stub": "price-axis-stub-1DJMiIgd",
        wrapper: "wrapper-1DJMiIgd",
        label: "label-1DJMiIgd",
        symbol: "symbol-1DJMiIgd",
        gear: "gear-1DJMiIgd",
        "fixed-gear": "fixed-gear-1DJMiIgd",
        "fixed-symbol": "fixed-symbol-1DJMiIgd",
      };
    },
    95411: () => {},
    46596: () => {},
    53805: e => {
      e.exports = {"css-value-header-toolbar-height": "38px"};
    },
    91498: e => {
      e.exports = {
        "css-value-pane-controls-padding-left": "1px",
        "css-value-pane-controls-padding-right": "5px",
      };
    },
    8325: () => {},
    78746: e => {
      e.exports = {
        "common-tooltip": "common-tooltip-36YLR71G",
        "common-tooltip--hidden": "common-tooltip--hidden-36YLR71G",
        "common-tooltip--horizontal": "common-tooltip--horizontal-36YLR71G",
        "common-tooltip--farther": "common-tooltip--farther-36YLR71G",
        "common-tooltip--vertical": "common-tooltip--vertical-36YLR71G",
        "common-tooltip-farther": "common-tooltip-farther-36YLR71G",
        "common-tooltip--direction_normal":
          "common-tooltip--direction_normal-36YLR71G",
        "common-tooltip__body": "common-tooltip__body-36YLR71G",
        "common-tooltip__button-container":
          "common-tooltip__button-container-36YLR71G",
        "common-tooltip__body--no-buttons":
          "common-tooltip__body--no-buttons-36YLR71G",
        "common-tooltip__button": "common-tooltip__button-36YLR71G",
        "common-tooltip--direction_reversed":
          "common-tooltip--direction_reversed-36YLR71G",
        "common-tooltip__ear-holder": "common-tooltip__ear-holder-36YLR71G",
        "common-tooltip__ear-holder--below":
          "common-tooltip__ear-holder--below-36YLR71G",
        "common-tooltip__ear-holder--above":
          "common-tooltip__ear-holder--above-36YLR71G",
        "common-tooltip__ear-holder--before":
          "common-tooltip__ear-holder--before-36YLR71G",
        "common-tooltip__ear-holder--after":
          "common-tooltip__ear-holder--after-36YLR71G",
        "common-tooltip__body--with-hotkey":
          "common-tooltip__body--with-hotkey-36YLR71G",
        "common-tooltip__body--width_wide":
          "common-tooltip__body--width_wide-36YLR71G",
        "common-tooltip__body--width_narrow":
          "common-tooltip__body--width_narrow-36YLR71G",
        "common-tooltip__body--no-padding":
          "common-tooltip__body--no-padding-36YLR71G",
        "common-tooltip__hotkey-block": "common-tooltip__hotkey-block-36YLR71G",
        "common-tooltip__hotkey-block--divider":
          "common-tooltip__hotkey-block--divider-36YLR71G",
        "common-tooltip__hotkey-text": "common-tooltip__hotkey-text-36YLR71G",
        "common-tooltip__hotkey-button":
          "common-tooltip__hotkey-button-36YLR71G",
        "common-tooltip__plus-sign": "common-tooltip__plus-sign-36YLR71G",
      };
    },
    53312: (e, t, i) => {
      "use strict";
      i.r(t), i.d(t, {colorsPalette: () => h, getHexColorByName: () => d});
      const s = JSON.parse(
          '{"color-white":"#ffffff","color-black":"#000000","color-cold-gray-50":"#F8F9FD","color-cold-gray-100":"#F0F3FA","color-cold-gray-150":"#E0E3EB","color-cold-gray-200":"#D1D4DC","color-cold-gray-250":"#C1C4CD","color-cold-gray-300":"#B2B5BE","color-cold-gray-350":"#A3A6AF","color-cold-gray-400":"#9598A1","color-cold-gray-450":"#868993","color-cold-gray-500":"#787B86","color-cold-gray-550":"#6A6D78","color-cold-gray-600":"#5D606B","color-cold-gray-650":"#50535E","color-cold-gray-700":"#434651","color-cold-gray-750":"#363A45","color-cold-gray-800":"#2A2E39","color-cold-gray-850":"#1E222D","color-cold-gray-900":"#131722","color-cold-gray-950":"#0C0E15","color-ripe-red-50":"#FFEBEC","color-ripe-red-100":"#FCCBCD","color-ripe-red-200":"#FAA1A4","color-ripe-red-300":"#F77C80","color-ripe-red-400":"#F7525F","color-ripe-red-500":"#F23645","color-ripe-red-600":"#CC2F3C","color-ripe-red-700":"#B22833","color-ripe-red-800":"#991F29","color-ripe-red-900":"#801922","color-ripe-red-a100":"#FF8080","color-ripe-red-a200":"#FF5252","color-ripe-red-a400":"#FF3333","color-ripe-red-a600":"#CC2929","color-ripe-red-a700":"#802028","color-ripe-red-a800":"#4D191D","color-ripe-red-a900":"#331F20","color-tan-orange-50":"#FFF3E0","color-tan-orange-100":"#FFE0B2","color-tan-orange-200":"#FFCC80","color-tan-orange-300":"#ffb74d","color-tan-orange-400":"#FFA726","color-tan-orange-500":"#FF9800","color-tan-orange-600":"#FB8C00","color-tan-orange-700":"#F57C00","color-tan-orange-800":"#EF6C00","color-tan-orange-900":"#e65100","color-tan-orange-a200":"#ffab40","color-tan-orange-a400":"#ff9100","color-tan-orange-a700":"#FF6D00","color-iguana-green-100":"#C8E6C9","color-iguana-green-200":"#A5D6A7","color-iguana-green-300":"#81c784","color-iguana-green-400":"#66BB6A","color-iguana-green-500":"#4caf50","color-iguana-green-600":"#43a047","color-iguana-green-700":"#388e3c","color-iguana-green-800":"#2E7D32","color-iguana-green-900":"#1B5E20","color-iguana-green-a700":"#00c853","color-banana-yellow-100":"#FFF9C4","color-banana-yellow-200":"#FFF59D","color-banana-yellow-300":"#FFF176","color-banana-yellow-400":"#ffee58","color-banana-yellow-500":"#ffeb3b","color-banana-yellow-600":"#fdd835","color-banana-yellow-700":"#fbc02d","color-banana-yellow-800":"#f9a825","color-banana-yellow-900":"#F57F17","color-banana-yellow-a400":"#ffea00","color-banana-yellow-a700":"#ffd600","color-tv-blue-50":"#E3EFFD","color-tv-blue-100":"#BBD9FB","color-tv-blue-200":"#90BFF9","color-tv-blue-300":"#5B9CF6","color-tv-blue-400":"#3179F5","color-tv-blue-500":"#2962FF","color-tv-blue-600":"#1E53E5","color-tv-blue-700":"#1848CC","color-tv-blue-800":"#143EB3","color-tv-blue-900":"#0C3299","color-tv-blue-a100":"#82b1ff","color-tv-blue-a200":"#448aff","color-tv-blue-a400":"#2979ff","color-tv-blue-a600":"#2962FF","color-tv-blue-a700":"#143A87","color-tv-blue-a800":"#142E61","color-tv-blue-a900":"#132042","color-deep-blue-100":"#D1C4E9","color-deep-blue-200":"#B39DDB","color-deep-blue-300":"#9575cd","color-deep-blue-400":"#7e57c2","color-deep-blue-500":"#673ab7","color-deep-blue-700":"#512da8","color-deep-blue-800":"#4527A0","color-deep-blue-900":"#311B92","color-deep-blue-a100":"#b388ff","color-deep-blue-a400":"#651FFF","color-deep-blue-a700":"#6200EA","color-minty-green-50":"#DAF2EE","color-minty-green-100":"#ACE5DC","color-minty-green-200":"#70CCBD","color-minty-green-300":"#42BDA8","color-minty-green-400":"#22AB94","color-minty-green-500":"#089981","color-minty-green-600":"#06806B","color-minty-green-700":"#056656","color-minty-green-800":"#004D40","color-minty-green-900":"#00332A","color-minty-green-a400":"#2BD9BC","color-minty-green-a700":"#24B29B","color-minty-green-a900":"#082621","color-grapes-purple-50":"#F3E5F5","color-grapes-purple-100":"#E1BEE7","color-grapes-purple-200":"#CE93D8","color-grapes-purple-300":"#ba68c8","color-grapes-purple-400":"#ab47bc","color-grapes-purple-500":"#9c27b0","color-grapes-purple-600":"#8e24aa","color-grapes-purple-700":"#7b1fa2","color-grapes-purple-800":"#6A1B9A","color-grapes-purple-900":"#4A148C","color-grapes-purple-a200":"#E040FB","color-grapes-purple-a400":"#D500F9","color-grapes-purple-a700":"#aa00ff","color-berry-pink-100":"#F8BBD0","color-berry-pink-200":"#f48fb1","color-berry-pink-300":"#f06292","color-berry-pink-400":"#ec407a","color-berry-pink-500":"#e91e63","color-berry-pink-600":"#D81B60","color-berry-pink-700":"#C2185B","color-berry-pink-800":"#AD1457","color-berry-pink-900":"#880E4F","color-berry-pink-a100":"#ff80ab","color-berry-pink-a200":"#ff4081","color-sky-blue-100":"#B2EBF2","color-sky-blue-200":"#80DEEA","color-sky-blue-300":"#4dd0e1","color-sky-blue-400":"#26c6da","color-sky-blue-500":"#00bcd4","color-sky-blue-600":"#00acc1","color-sky-blue-700":"#0097A7","color-sky-blue-800":"#00838F","color-sky-blue-900":"#006064","color-sky-blue-a400":"#00e5ff","color-sky-blue-a700":"#00B8D4","color-deep-blue-600":"#5E35B1","color-facebook":"#1877F2","color-deep-facebook":"#1564CA","color-twitter":"#1DA1F2","color-deep-twitter":"#188CD3","color-youtube":"#FF0000","color-linkedin":"#007BB5","color-aqua-spring":"#ebf9f5","color-army-green":"#3d2c12","color-army-green-2":"#31230d","color-athens-gray-1":"#f2f3f5","color-athens-gray-2":"#f7f8fa","color-athens-gray-3":"#eceff2","color-black-180":"#b4b4b4","color-blue-dianne":"#21384d","color-bluish":"#2185cc","color-bright-gray":"#363c4e","color-brownish-grey":"#8d6e63","color-carnation":"#f04561","color-catskill-white":"#e1ecf2","color-charade":"#2f3241","color-charcoal-grey":"#323337","color-curious-blue":"#299dcd","color-dark-blue-grey":"#123440","color-darkness-blue-grey":"#12213b","color-dark-grey":"#292a2d","color-dark-grey-blue":"#28415a","color-dark-sky-blue":"#37a6ef","color-deep-sea-blue":"#016087","color-ebony-clay":"#262b3e","color-foam":"#d7f0fb","color-gull-gray":"#9db2bd","color-humming-bird":"#d3eef9","color-keppel-1":"#37bc9b","color-keppel-2":"#34b293","color-lavender-blush":"#ffedf0","color-lightish-purple":"#a75ee8","color-loblolly":"#c5cbce","color-manatee":"#878ca8","color-mandy":"#eb4d5c","color-medium-blue":"#2e7bb2","color-milk-chocolate":"#6f2626","color-mirage-1":"#131722","color-mirage-2":"#171b29","color-mirage-3":"#1c2030","color-mischka":"#d6d8e0","color-morning-glory":"#9addcc","color-oslo-gray":"#8b8e95","color-pale":"#fff2cf","color-pale-grey-1":"#f9fafb","color-pale-grey-2":"#e7ebee","color-pale-sky":"#6b7988","color-picton-blue-1":"#3bb3e4","color-puerto-rico":"#3bc2a1","color-purple-brown":"#4e2934","color-purple-brown-2":"#3d2028","color-radical-red":"#ff4a68","color-regent-gray":"#8797a5","color-scooter":"#38acdb","color-silver-tree":"#53b987","color-slate-gray":"#758696","color-sundown":"#ffa4b3","color-sunglow":"#ffca3b","color-tan-hide":"#ff9850","color-trout-1":"#4c525e","color-trout-2":"#4f5966","color-violet-1":"#332738","color-violet-2":"#271d2b","color-white-ice":"#ebf7fc","color-wild-watermelon":"#ff5773","color-readonly-input":"#b4b4b4","color-brand-dark":"#2a2c39","color-seeking-alpha-brand":"#ff7200"}',
        ),
        r = JSON.parse(
          '{"color-bg-primary":"color-white","color-bg-primary-hover":"color-cold-gray-100","color-bg-secondary":"color-white","color-bg-highlight":"color-cold-gray-50","color-bg-scroll-buttons":"color-cold-gray-100","color-legacy-bg-scroll-buttons":"color-cold-gray-850","color-legacy-bg-widget":"color-white","color-text-primary":"color-cold-gray-900","color-text-secondary":"color-cold-gray-500","color-text-tertiary":"color-cold-gray-400","color-text-disabled":"color-cold-gray-300","color-accent-content":"color-cold-gray-900","color-box-shadow":"color-cold-gray-300","color-divider":"color-cold-gray-150","color-divider-hover":"color-cold-gray-100","color-divider-secondary":"color-cold-gray-100","color-active-hover-text":"color-cold-gray-900","color-alert-text":"color-cold-gray-900","color-border-table":"color-cold-gray-100","color-brand":"color-tv-blue-500","color-brand-active":"color-tv-blue-700","color-brand-hover":"color-tv-blue-600","color-chart-page-bg":"color-cold-gray-150","color-common-tooltip-bg":"color-cold-gray-800","color-danger":"color-ripe-red-400","color-danger-hover":"color-ripe-red-500","color-danger-active":"color-ripe-red-600","color-depthrenderer-stroke-style":"color-cold-gray-100","color-highlight-new":"color-tan-orange-50","color-input-bg":"color-white","color-input-publish-bg":"color-white","color-link":"color-tv-blue-500","color-link-hover":"color-tv-blue-600","color-link-active":"color-tv-blue-700","color-list-nth-child-bg":"color-cold-gray-50","color-pane-bg":"color-white","color-pane-secondary-bg":"color-cold-gray-100","color-popup-menu-item-hover-bg":"color-cold-gray-100","color-popup-menu-separator":"color-cold-gray-150","color-screener-description":"color-cold-gray-650","color-success":"color-minty-green-500","color-success-hover":"color-minty-green-600","color-success-active":"color-minty-green-700","color-toolbar-button-text":"color-cold-gray-900","color-toolbar-button-text-hover":"color-cold-gray-900","color-toolbar-button-text-active":"color-tv-blue-500","color-toolbar-button-text-active-hover":"color-tv-blue-600","color-toolbar-button-background-hover":"color-cold-gray-100","color-toolbar-button-background-secondary-hover":"color-cold-gray-150","color-toolbar-toggle-button-background-active":"color-tv-blue-500","color-toolbar-toggle-button-background-active-hover":"color-tv-blue-600","color-toolbar-interactive-element-text-normal":"color-cold-gray-900","color-toolbar-interactive-element-text-hover":"color-cold-gray-900","color-toolbar-opened-element-bg":"color-cold-gray-100","color-tooltip-bg":"color-cold-gray-800","color-tv-dialog-caption":"color-cold-gray-650","color-tv-dropdown-item-hover-bg":"color-cold-gray-100","color-underlined-text":"color-cold-gray-500","color-widget-pages-bg":"color-white","color-warning":"color-tan-orange-500","color-growing":"color-minty-green-400","color-falling":"color-ripe-red-400","color-forex-icon":"color-cold-gray-750","color-list-item-active-bg":"color-tv-blue-400","color-list-item-hover-bg":"color-tv-blue-50","color-list-item-text":"color-cold-gray-800","color-price-axis-label-back":"color-cold-gray-150","color-price-axis-label-text":"color-cold-gray-650","color-price-axis-gear":"color-cold-gray-900","color-price-axis-gear-hover":"color-black","color-price-axis-highlight":"color-cold-gray-150","color-bid":"color-tv-blue-500","color-border":"color-cold-gray-150","color-border-chat-fields":"color-cold-gray-250","color-border-hover":"color-cold-gray-250","color-button-hover-bg":"color-cold-gray-150","color-depthrenderer-fill-style":"color-cold-gray-650","color-disabled-border-and-color":"color-cold-gray-150","color-disabled-input":"color-cold-gray-150","color-empty-container-message":"color-cold-gray-500","color-icons":"color-cold-gray-500","color-input-textarea-readonly":"color-cold-gray-650","color-input-placeholder-text":"color-cold-gray-350","color-item-active-blue":"color-tv-blue-50","color-item-hover-active-bg":"color-tv-blue-100","color-item-hover-bg":"color-tv-blue-100","color-item-hover-blue":"color-tv-blue-100","color-item-selected-blue":"color-tv-blue-50","color-item-active-text":"color-white","color-item-active-bg":"color-tv-blue-500","color-list-item":"color-cold-gray-450","color-news-highlight":"color-tv-blue-100","color-placeholder":"color-cold-gray-350","color-row-hover-active-bg":"color-cold-gray-100","color-sb-scrollbar-body-bg":"color-cold-gray-200","color-section-separator-border":"color-cold-gray-300","color-separator-table-chat":"color-cold-gray-150","color-tag-active-bg":"color-cold-gray-200","color-tag-hover-bg":"color-cold-gray-150","color-text-regular":"color-cold-gray-700","color-tv-button-checked":"color-cold-gray-550","color-scroll-bg":"color-cold-gray-400","color-scroll-border":"color-cold-gray-100","color-widget-border":"color-cold-gray-100","color-scroll-buttons-arrow":"color-white","color-control-intent-default":"color-cold-gray-200","color-control-intent-success":"color-minty-green-600","color-control-intent-primary":"color-tv-blue-500","color-control-intent-warning":"color-tan-orange-500","color-control-intent-danger":"color-ripe-red-500","color-pre-market":"color-tan-orange-600","color-pre-market-bg":"color-tan-orange-400","color-post-market":"color-tv-blue-500","color-post-market-bg":"color-tv-blue-400","color-market-open":"color-minty-green-500","color-market-open-bg":"color-minty-green-400","color-market-closed":"color-cold-gray-400","color-market-holiday":"color-cold-gray-400","color-invalid-symbol":"color-ripe-red-400","color-invalid-symbol-hover":"color-ripe-red-700","color-replay-mode":"color-tv-blue-500","color-replay-mode-icon":"color-white","color-replay-mode-hover":"color-tv-blue-600","color-notaccurate-mode":"color-berry-pink-700","color-notaccurate-mode-bg":"color-berry-pink-400","color-delay-mode":"color-tan-orange-700","color-delay-mode-bg":"color-tan-orange-400","color-eod-mode":"color-grapes-purple-700","color-eod-mode-bg":"color-grapes-purple-400","color-data-problem":"color-ripe-red-600","color-data-problem-bg":"color-ripe-red-400","color-data-problem-hover":"color-ripe-red-700","color-list-item-bg-highlighted":"color-tv-blue-50","color-list-item-bg-selected":"color-tv-blue-100","color-list-item-bg-highlighted-hover":"color-tv-blue-100","color-list-item-bg-selected-hover":"color-tv-blue-200","color-screener-header-bg":"color-white","color-screener-header-bg-hover":"color-cold-gray-100","color-marker-flagged":"color-ripe-red-400","color-marker-flagged-hovered":"color-ripe-red-600","color-ask":"color-ripe-red-400","color-sell":"color-ripe-red-400","color-buy":"color-tv-blue-500","color-neutral":"color-cold-gray-500","color-pro":"color-minty-green-400","color-pro-hover":"color-minty-green-600","color-pro-plus":"color-tv-blue-500","color-pro-plus-hover":"color-tv-blue-600","color-pro-premium":"color-tan-orange-500","color-pro-premium-hover":"color-tan-orange-700","color-trial":"color-cold-gray-500","color-trial-hover":"color-cold-gray-600","color-mod":"color-ripe-red-400","color-mod-hover":"color-ripe-red-600","color-ad":"color-banana-yellow-a700","color-broker-featured":"color-minty-green-400","color-broker-featured-hover":"color-minty-green-600","color-alert-status-active":"color-minty-green-400","color-alert-status-stopped":"color-ripe-red-500","color-alert-status-triggered":"color-tan-orange-500","color-covid19-confirmed":"color-ripe-red-500","color-covid19-recovered":"color-minty-green-500","color-covid19-deaths":"color-cold-gray-450","color-overlay":"color-cold-gray-400","color-search-button-hover":"color-cold-gray-150","color-common-tooltip-text":"color-cold-gray-100","color-replay-data-mode":"color-radical-red","color-legacy-success":"color-keppel-1","color-collapse-tabs-border":"color-athens-gray-3","color-site-widget-hover":"color-athens-gray-1","color-attention":"color-sunglow","color-card-border":"color-cold-gray-150","color-card-border-hover":"color-cold-gray-300","color-background-special-primary":"color-white","color-stroke-special-primary":"color-cold-gray-150","color-selection-bg":"color-tv-blue-100"}',
        );
      var n = i(16282);
      const o = {...s, ...r},
        a = {},
        l = Object.keys(o).length,
        c = /^#[0-9A-F]{6}$/i;
      Object.keys(o).forEach(e => {
        const t = (function e(t, i = []) {
          const s = o[t];
          if (!s) return null;
          if (c.test(s)) return s;
          const r = s;
          return (
            i.push(t),
            -1 !== i.indexOf(r)
              ? (console.warn("Colors definitions cycled"), s)
              : i.length > l
              ? (console.warn(
                  "Too many variables-link in HEX-color search: " + i[0],
                ),
                null)
              : e(r, i)
          );
        })(e);
        a[e] = (0, n.ensureNotNull)(t);
      });
      const h = a;
      function d(e) {
        const t = h[e];
        if (!t) throw new Error("No such color " + e);
        return t;
      }
    },
    8596: (e, t, i) => {
      "use strict";
      i.d(t, {dur: () => s, easingFunc: () => r, CubicBezier: () => n});
      const s = 350,
        r = {
          linear: e => e,
          easeInQuad: e => e * e,
          easeOutQuad: e => e * (2 - e),
          easeInOutQuad: e => (e < 0.5 ? 2 * e * e : (4 - 2 * e) * e - 1),
          easeInCubic: e => e * e * e,
          easeOutCubic: e => --e * e * e + 1,
          easeInOutCubic: e =>
            e < 0.5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
          easeInQuart: e => e * e * e * e,
          easeOutQuart: e => 1 - --e * e * e * e,
          easeInOutQuart: e =>
            e < 0.5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e,
          easeInQuint: e => e * e * e * e * e,
          easeOutQuint: e => 1 + --e * e * e * e * e,
          easeInOutQuint: e =>
            e < 0.5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e,
        };
      class n {
        constructor(e, t, i, s) {
          (this._mX1 = e), (this._mY1 = t), (this._mX2 = i), (this._mY2 = s);
        }
        easingFunc(e) {
          return this._mX1 === this._mY1 && this._mX2 === this._mY2
            ? e
            : this._calcBezier(this._getTForX(e));
        }
        _a(e, t) {
          return 1 - 3 * t + 3 * e;
        }
        _b(e, t) {
          return 3 * t - 6 * e;
        }
        _c(e) {
          return 3 * e;
        }
        _calcBezier(e) {
          return (
            ((this._a(this._mY1, this._mY2) * e +
              this._b(this._mY1, this._mY2)) *
              e +
              this._c(this._mY1)) *
            e
          );
        }
        _getSlope(e) {
          return (
            3 * this._a(this._mX1, this._mX2) * e * e +
            2 * this._b(this._mX1, this._mX2) * e +
            this._c(this._mX1)
          );
        }
        _getTForX(e) {
          let t = e;
          for (let i = 0; i < 4; ++i) {
            const i = this._getSlope(t);
            if (0 === i) return t;
            t -= (this._calcBezier(t) - e) / i;
          }
          return t;
        }
      }
    },
    30618: (e, t, i) => {
      "use strict";
      i.d(t, {setupChartEventHint: () => d});
      var s = i(16282),
        r = i(79881),
        n = i(64222),
        o = i(15521),
        a = i(33033),
        l = i(43367),
        c = i(42998),
        h = i(27490);
      function d(e, t = !1) {
        if (!h.enabled("popup_hints")) return;
        const d = e.getContainer();
        let u = null,
          p = null;
        function _(e, t) {
          if (u) u.show(e, g.bind(null, t));
          else {
            const s = o.tool.value();
            Promise.all([i.e(5453), i.e(5514), i.e(6166)])
              .then(i.bind(i, 25057))
              .then(i => {
                (u = new i.ChartEventHintRenderer(d)),
                  s === o.tool.value() && u.show(e, g.bind(null, t));
              });
          }
        }
        function m(e) {
          return !Boolean(n.getBool(e));
        }
        function g(e) {
          n.setValue(e, !0, {forceFlush: !0}),
            (0, s.ensureNotNull)(u).destroy(),
            null !== p && p(),
            (u = null);
        }
        o.tool.subscribe(function () {
          if (!m("hint.touchPainting")) return;
          const e = o.tool.value(),
            t = (0, a.isLineToolDrawWithoutPoints)(e),
            i = l.CheckMobile.any();
          !(0, a.isStudyLineToolName)(e) ||
          "LineToolRegressionTrend" === e ||
          t ||
          i
            ? (0, a.isLineToolName)(e) &&
              !(0, a.isLineDrawnWithPressedButton)(e) &&
              !t &&
              i
              ? _(
                  (0, r.t)(
                    "Move the point to position the anchor then tap to place",
                  ),
                  "hint.touchPainting",
                )
              : u && u.hide()
            : _((0, r.t)("Click to set a point"), "hint.touchPainting");
        }),
          o.createdLineTool.subscribe(null, function () {
            const e = o.tool.value();
            "LineToolPath" === e && m("hint.finishBuildPathByDblClick")
              ? _(
                  (0, r.t)("Double-click to finish Path"),
                  "hint.finishBuildPathByDblClick",
                )
              : "LineToolPolyline" === e &&
                m("hint.finishBuildPolylineByDblClick") &&
                _(
                  (0, r.t)("Double-click to finish Polyline"),
                  "hint.finishBuildPolylineByDblClick",
                );
          }),
          o.finishedLineTool.subscribe(null, function () {
            if (u) {
              const e = o.tool.value();
              "LineToolPath" === e
                ? g("hint.finishBuildPathByDblClick")
                : "LineToolPolyline" === e &&
                  g("hint.finishBuildPolylineByDblClick");
            }
          }),
          t ||
            l.CheckMobile.any() ||
            !m("hint.startFocusedZoom") ||
            (p = (function (e, t) {
              let i = !1;
              const s = r => {
                r
                  ? (i && t(r), e.onZoom().unsubscribe(null, s))
                  : i || (t(r), (i = !0));
              };
              return (
                e.onZoom().subscribe(null, s),
                () => e.onZoom().unsubscribe(null, s)
              );
            })(e, function (e) {
              if (!m("hint.startFocusedZoom")) return;
              if (e) u && ((p = null), g("hint.startFocusedZoom"));
              else {
                const e = c.isMacKeyboard ? "⌘" : "Ctrl";
                _(
                  (0, r.t)(
                    "Press and hold {key} while zooming to maintain the chart position",
                  ).format({key: e}),
                  "hint.startFocusedZoom",
                );
              }
            }));
      }
    },
    82831: (e, t, i) => {
      "use strict";
      i.d(t, {setupChartScreenshotHint: () => o});
      var s = i(79881),
        r = i(18437),
        n = i(16282);
      function o(e, t) {
        const o = (0, s.t)(
            "Link to the chart image copied to clipboard {emoji}",
          ).format({emoji: "👍"}),
          a = (0, s.t)("Chart image copied to clipboard {emoji}").format({
            emoji: "👍",
          });
        r.on("onServerScreenshotCopiedToClipboard", () => h(o), null),
          r.on("onClientScreenshotCopiedToClipboard", () => h(a), null);
        let l = null;
        const c = e.getContainer();
        function h(e) {
          l
            ? l.show(e)
            : Promise.all([i.e(4652), i.e(5514), i.e(92)])
                .then(i.bind(i, 38868))
                .then(i => {
                  l ||
                    ((l = new i.ChartScreenshotHintRenderer(
                      (0, n.ensureNotNull)(c),
                      {bottomPadding: t.seriesControlBarEnabled},
                    )),
                    l.show(e));
                });
        }
      }
    },
    65726: (e, t, i) => {
      "use strict";
      i.d(t, {getTooltipData: () => r, setTooltipData: () => n});
      const s = new WeakMap();
      function r(e, t) {
        const i = s.get(e);
        return i instanceof Function ? i(t) : i && i[t];
      }
      function n(e, t, i) {
        if (i instanceof Function) return void s.set(e, i);
        const r = s.get(e),
          n = void 0 === r || r instanceof Function ? {} : r;
        (n[t] = i), s.set(e, n);
      }
    },
    19598: (e, t, i) => {
      "use strict";
      i.d(t, {hotKeySerialize: () => r, hotKeyDeserialize: () => n});
      var s = i(79039);
      function r(e) {
        return (0, s.clean)(JSON.stringify(e));
      }
      function n(e) {
        return JSON.parse((0, s.clean)(e, !0));
      }
    },
    74384: (e, t, i) => {
      "use strict";
      i.d(t, {hide: () => G, show: () => U, showOnElement: () => z});
      var s = i(96404);
      let r = 0,
        n = 0,
        o = 0;
      function a() {
        clearTimeout(r), clearTimeout(n), clearTimeout(o);
      }
      function l(e, t) {
        r = setTimeout(e, t);
      }
      const c = "tooltip-root-element";
      let h;
      function d() {
        const e = document.getElementById(c);
        e
          ? (h = e)
          : ((h = document.createElement("div")),
            (h.id = c),
            document.body.appendChild(h));
      }
      function u() {
        h && (h.innerHTML = "");
      }
      "interactive" === document.readyState
        ? d()
        : document.addEventListener("DOMContentLoaded", d);
      var p = i(16282);
      const _ = {
          default: "",
          white: "theme-white",
          "round-shadow": "theme-round-shadow",
        },
        m = Object.keys(_);
      var g = i(65726),
        f = i(19598),
        v = i(67235),
        S = i(76553),
        y = (i(95068), i(39197)),
        b = i(57968),
        w = i(43367),
        P = i(78746);
      function C(e) {
        const t = (function (e) {
            const t = e.hasAttribute("data-tooltip")
              ? e.getAttribute("data-tooltip")
              : e.getAttribute("title");
            return (
              t &&
                ((0, g.setTooltipData)(e, "text", t),
                e.removeAttribute("title")),
              (0, g.getTooltipData)(e, "text") || ""
            );
          })(e),
          i = e.getBoundingClientRect(),
          s = {h: i.height, w: i.width, x: i.left, y: i.top},
          r = e.getAttribute("data-color-theme") || "",
          n = e.classList.contains("common-tooltip-html"),
          o = parseInt(e.getAttribute("data-tooltip-delay") || ""),
          a = parseInt(e.getAttribute("data-tooltip-debounce") || "");
        let l = {type: "none"};
        return (
          t &&
            (l = {
              type: n ? "html" : "text",
              data: t,
            }),
          {
            above: e.classList.contains("common-tooltip-above"),
            below: e.classList.contains("common-tooltip-below"),
            otl: e.classList.contains("common-tooltip-otl"),
            otr: e.classList.contains("common-tooltip-otr"),
            vertical: e.classList.contains("common-tooltip-vertical"),
            hotkey: e.getAttribute("data-tooltip-hotkey"),
            narrow: e.classList.contains("common-tooltip-narrow"),
            wide: e.classList.contains("common-tooltip-wide"),
            colorTheme: r,
            tooltipDelay: o,
            tooltipDebounce: a,
            rect: s,
            content: l,
            target: e,
          }
        );
      }
      function T(e) {
        const t = E.cloneNode(!0),
          i = B(t),
          {content: s} = e;
        switch (s.type) {
          case "element":
            (i.innerHTML = ""), i.appendChild(s.data);
            break;
          case "html":
            i.innerHTML = s.data;
            break;
          case "text":
            if (e.hotkey) {
              const e = V.cloneNode(!0);
              (e.innerText = s.data), i.appendChild(e);
            } else i.innerText = s.data;
        }
        if (e.hotkey) {
          const t = "none" !== s.type,
            r = D.cloneNode(!0),
            n = (0, f.hotKeyDeserialize)(e.hotkey),
            o = n.keys.map(
              e =>
                `<span class="${P["common-tooltip__hotkey-button"]}">${e}</span>`,
            );
          (r.innerHTML = (function (e, t) {
            return e.replace(/{\d}|{hotkey_\d}/gi, e => {
              const i = Number(e.match(/\d/));
              return t[i];
            });
          })(n.text, o).replace(
            /\s\+\s/g,
            `<span class="${P["common-tooltip__plus-sign"]}">+</span>`,
          )),
            i.classList.add(P["common-tooltip__body--with-hotkey"]),
            t && r.classList.add(P["common-tooltip__hotkey-block--divider"]),
            i.appendChild(r);
        }
        return t.addEventListener("contextmenu", y.preventDefault), t;
      }
      function x(e, t) {
        const i = t.rect;
        if (!i) return;
        !(function (e, t) {
          const i = m.includes(t) ? _[t] : "";
          e.classList.remove(...m.map(e => _[e]).filter(e => !!e)),
            i && !e.classList.contains(i) && e.classList.add(i);
        })(e, t.colorTheme || "default"),
          t.addClass && e.classList.add(t.addClass);
        const s = B(e),
          r = e.querySelector("." + P["common-tooltip__button-container"]);
        s.classList.toggle(
          P["common-tooltip__body--width_wide"],
          Boolean(t.wide),
        ),
          s.classList.toggle(
            P["common-tooltip__body--no-padding"],
            Boolean(t.noPadding),
          ),
          s.classList.toggle(
            P["common-tooltip__body--width_narrow"],
            Boolean(t.narrow),
          ),
          s.classList.toggle(P["common-tooltip__body--no-buttons"], !0),
          (s.style.left = M(0)),
          (s.style.width = M(s.clientWidth + (Boolean(t.noPadding) ? 0 : 2)));
        const n = document.body.clientWidth,
          o =
            w.CheckMobile.iOS() || ((0, w.supportTouch)() && (0, w.isMac)())
              ? window.innerHeight
              : document.body.clientHeight,
          a = t.vertical,
          l = t.extendMargin || (a && i.w < 20) || (!a && i.h < 20);
        e.classList.toggle(P["common-tooltip--farther"], l),
          e.classList.toggle(P["common-tooltip--vertical"], a),
          e.classList.toggle(P["common-tooltip--horizontal"], !a);
        const c = (function (e) {
            return e.querySelector("." + P["common-tooltip__ear-holder"]);
          })(e),
          h = e.offsetHeight;
        if (a) {
          const a = 10,
            l = o - 10,
            d = 12,
            u = a + d,
            p = l - d,
            _ = (0, b.clamp)(i.y + i.h / 2, u, p) - h / 2,
            m = _ + h;
          (e.style.left = M(i.x + i.w)),
            (e.style.top = M(_)),
            _ < a
              ? (s.style.top = r.style.top = M(a - _))
              : m > l && (s.style.top = r.style.top = M(l - m));
          const {right: g} = (
              e.querySelector(":last-child") || s
            ).getBoundingClientRect(),
            f = g + 10 > n;
          e.classList.toggle(P["common-tooltip--direction_reversed"], f),
            e.classList.toggle(P["common-tooltip--direction_normal"], !f);
          let v = f ? "after" : "before";
          (0, S.isRtl)()
            ? ((v = t.otr ? "after" : v), (v = t.otl ? "before" : v))
            : ((v = t.otr ? "before" : v), (v = t.otl ? "after" : v)),
            c.classList.toggle(
              P["common-tooltip__ear-holder--before"],
              "before" === v,
            ),
            c.classList.toggle(
              P["common-tooltip__ear-holder--after"],
              "after" === v,
            ),
            "after" === v &&
              ((e.style.left = "auto"), (e.style.right = M(n - i.x)));
        } else {
          const a = i.x - (s.offsetWidth - i.w) / 2,
            l = n - 10 - e.offsetWidth,
            d = Math.max(10, Math.min(a, l));
          e.style.left = M(d);
          const u = l < a;
          e.classList.toggle(P["common-tooltip--direction_reversed"], u),
            e.classList.toggle(P["common-tooltip--direction_normal"], !u);
          const p = (function (e, t, i, s) {
            if (e.above) return N(t, s) ? "above" : "below";
            if (e.below)
              return (function (e, t, i) {
                return i.y + i.h + t + 10 < e;
              })(t, i, s)
                ? "below"
                : "above";
            return N(i, s) ? "above" : "below";
          })(t, o, h, i);
          "above" === p
            ? (e.style.bottom = M(o - i.y))
            : (e.style.top = M(i.y + i.h)),
            c.classList.add(
              "above" === p
                ? P["common-tooltip__ear-holder--above"]
                : P["common-tooltip__ear-holder--below"],
            );
          const {left: _} = s.getBoundingClientRect();
          let m = Math.trunc(i.x + i.w / 2 - (_ + s.clientWidth / 2));
          (e.style.left = M(d + m)),
            (e.style.width = M(s.clientWidth + r.clientWidth)),
            (m = u ? Math.max(0, m) : Math.min(0, m)),
            (r.style.left = M(-m)),
            (s.style.left = M(-m));
        }
      }
      function I(e) {
        e.classList.toggle(P["common-tooltip--hidden"], !0);
      }
      function M(e) {
        return Math.floor(e) + "px";
      }
      const L = `\n\t<div id="common-tooltip-wrapper" class="${P["common-tooltip"]}">\n\t\t<div class="${P["common-tooltip__ear-holder"]}" >\n\t\t\t<div class="${P["common-tooltip__body"]} js-tooltip-body"></div>\n\t\t</div>\n\t\t<div class="${P["common-tooltip__button-container"]}"></div>\n\t</div>\n`,
        A = `\n\t<div class="${P["common-tooltip__hotkey-block"]}"></div>\n`,
        k = `\n\t<div class="${P["common-tooltip__hotkey-text"]}"></div>\n`,
        E = (0, v.parseHtmlElement)(L),
        D = (0, v.parseHtmlElement)(A),
        V = (0, v.parseHtmlElement)(k);
      function B(e) {
        return e.querySelector("." + P["common-tooltip__body"]);
      }
      function N(e, t) {
        return 10 + e < t.y;
      }
      var R = i(60934);
      let O = !1,
        F = null,
        W = null;
      s.mobiletouch ||
        document.addEventListener(
          "mouseover",
          function (e) {
            var t;
            if (
              null === (t = e.sourceCapabilities) || void 0 === t
                ? void 0
                : t.firesTouchEvents
            )
              return;
            const i = e.target,
              s = e.currentTarget,
              r = (function (e, t, i) {
                const s = [];
                for (; e && e !== t; )
                  e.classList && e.classList.contains(i) && s.push(e),
                    (e =
                      e.parentElement ||
                      ((r = e.parentNode) &&
                        (r.nodeType === Node.ELEMENT_NODE ? r : null)));
                var r;
                return s;
              })(i, s, "apply-common-tooltip");
            for (const t of r) {
              if ("buttons" in e) {
                if (1 & e.buttons) continue;
              } else if (1 === e.which) continue;
              const i = () => z(t);
              if (i()) {
                const e = e => {
                    e.target instanceof Element &&
                      e.target.contains(t) &&
                      s(null, !0);
                  },
                  s = (r, n = !1) => {
                    t.removeEventListener("common-tooltip-update", i),
                      t.removeEventListener("mouseleave", s),
                      t.removeEventListener("mousedown", s),
                      document.removeEventListener("scroll", e, {capture: !0}),
                      W && (W.destroy(), (W = null)),
                      G(n);
                  };
                t.addEventListener("common-tooltip-update", i),
                  t.addEventListener("mouseleave", s),
                  t.addEventListener("mousedown", s),
                  document.addEventListener("scroll", e, {capture: !0}),
                  null === W &&
                    ((W = (0, R.createGroup)({desc: "Tooltip"})),
                    W.add({desc: "Hide", hotkey: 27, handler: s}));
                break;
              }
            }
          },
          !0,
        );
      const H = new MutationObserver(() => {
          if (F && F.options.target) {
            let e;
            (e =
              "isConnected" in F.options.target
                ? F.options.target.isConnected
                : document.body.contains(F.options.target)),
              e || G();
          }
        }),
        z = (e, t = {}) => {
          const {content: i, ...s} = Y(t),
            r = C(e),
            n = Object.assign(r, s);
          return (
            "none" !== i.type && (n.content = i),
            !("none" === n.content.type && !n.hotkey) &&
              ((n.target = e), U(n), !0)
          );
        },
        U = e => {
          const t = Y(e),
            i = T(t);
          var s;
          if (
            ((F = {options: t, element: i}),
            (s = i),
            u(),
            h && h.appendChild(s),
            a(),
            !O)
          )
            return (
              I(i),
              void l(
                () => q(i),
                (function (e) {
                  return "number" != typeof e.tooltipDelay ||
                    isNaN(e.tooltipDelay)
                    ? 500
                    : e.tooltipDelay;
                })(t),
              )
            );
          const {tooltipDebounce: r} = e;
          "number" != typeof r || isNaN(r) ? q(i) : l(() => q(i), r);
        };
      function j() {
        u(), (O = !1), (F = null);
      }
      const G = e => {
        if ((a(), H.disconnect(), !F)) return;
        if (!e && !O) return;
        const {element: t, options: i} = F,
          s = () => {
            t.removeEventListener("mouseleave", s),
              I(t),
              e
                ? j()
                : (o = setTimeout(() => {
                    j();
                  }, 250));
          };
        var r, l;
        i.tooltipHideDelay
          ? ((r = () => {
              t.querySelector(":hover")
                ? t.addEventListener("mouseleave", s)
                : s();
            }),
            (l = i.tooltipHideDelay),
            (n = setTimeout(r, l)))
          : s();
      };
      function q(e) {
        const {options: t} = (0, p.ensureNotNull)(F);
        if (
          (x(e, t),
          (function (e) {
            e.classList.toggle(P["common-tooltip--hidden"], !1);
          })(e),
          H.observe(document, {childList: !0, subtree: !0}),
          (O = !0),
          t.forceHideOnMove)
        ) {
          const e = () => {
            document.removeEventListener("mousemove", e), G();
          };
          document.addEventListener("mousemove", e);
        }
      }
      function Y(e) {
        if (
          (function (e) {
            return "content" in e;
          })(e)
        )
          return e;
        const {inner: t, html: i, text: s, ...r} = e;
        let n = {type: "none"};
        return (
          t && (n = {type: "element", data: t}),
          s && (n = {type: i ? "html" : "text", data: s}),
          {content: n, ...r}
        );
      }
    },
    41547: (e, t, i) => {
      "use strict";
      i.d(t, {ChartPage: () => d});
      var s = i(32856),
        r = i.n(s),
        n = i(30779);
      function o(e, t) {
        let i = 0;
        for (const {min: s, max: r} of t) {
          if (e < s || r < s) continue;
          const t = Math.min(e, r);
          if (((i = Math.max(i, t)), e === i)) break;
        }
        return i;
      }
      function a(e) {
        const t = [];
        if (void 0 === e) return [];
        Array.isArray(e) || (e = [e]);
        for (const i of e) {
          let e, s;
          isFinite(i) ? (e = s = Number(i)) : ((e = +i.min), (s = +i.max)),
            (e < 0 || isNaN(e)) && (e = 0),
            isNaN(s) && (s = 1 / 0),
            e <= s && s > 0 && t.push({min: e, max: s});
        }
        return t.sort((e, t) => e.min - t.min || e.max - t.max), t;
      }
      function l(e, t) {
        if (e.length !== t.length) return !1;
        for (let i = e.length; i--; ) {
          if (e[i].min !== t[i].min) return !1;
          if (e[i].max !== t[i].max) return !1;
        }
        return !0;
      }
      var c = i(27490);
      const h = c.enabled("no_min_chart_width");
      class d {
        constructor(e) {
          (this._processVisibility = e => {
            const t = e.container.value();
            return this._affectsLayout(e.name)
              ? (t && t.classList.toggle("js-hidden", !1), !0)
              : (t && t.classList.toggle("js-hidden", !0), !1);
          }),
            (this._setWidth = (e, t) => {
              let i = t;
              this._fullscreenArea !== e.name &&
                (e.availWidth.setValue(t),
                e.canNegotiate.width && (i = o(t, e.negotiations.width)));
              const s = e.container.value();
              return s && (s.style.width = i + "px"), e.width.setValue(i), i;
            }),
            (this._setHeight = (e, t) => {
              let i = t;
              this._fullscreenArea !== e.name &&
                (e.availHeight.setValue(t),
                e.canNegotiate.height && (i = o(t, e.negotiations.height)));
              const s = e.container.value();
              return s && (s.style.height = i + "px"), e.height.setValue(i), i;
            });
          const t = e.container.value();
          if (!t)
            throw new Error("bridge.container.value() must be an element");
          (this._container = t),
            (this._availableAreas = [
              "left",
              "tradingpanel",
              "right",
              "top",
              "bottom",
              "center",
              "topleft",
              "extratop",
            ]),
            (this._areas = {}),
            (this._bridge = e),
            (this._width = e.width),
            (this._height = e.height),
            this._width.subscribe(() => this.recalculate()),
            this._height.subscribe(() => this.recalculate()),
            this._bridge.visible.subscribe(() => this._updateVisibility()),
            this._bridge.fullscreen.subscribe(() =>
              this._onParentFullscreenChange(),
            ),
            this.recalculate();
        }
        allocate(e) {
          const t = e && e.areaName;
          if (-1 === this._availableAreas.indexOf(t))
            throw new Error("unknown options.areaName");
          this.free(t);
          const i = this._createDOM(t),
            s = {
              name: t,
              canNegotiate: {
                width:
                  "left" === t ||
                  "right" === t ||
                  "tradingpanel" === t ||
                  "topleft" === t,
                height:
                  "top" === t ||
                  "bottom" === t ||
                  "topleft" === t ||
                  "extratop" === t,
              },
              negotiations: {width: [], height: []},
              remove: () => {
                for (const e in this._areas)
                  this._areas[e] === s && this.free(e);
              },
              negotiateWidth: e => {
                if (!s.canNegotiate.width) return;
                const t = a(e);
                l(s.negotiations.width, t) ||
                  ((s.negotiations.width = t), this.recalculate());
              },
              negotiateHeight: e => {
                if (!s.canNegotiate.height) return;
                const t = a(e);
                l(s.negotiations.height, t) ||
                  ((s.negotiations.height = t), this.recalculate());
              },
              requestFullscreen: () => {
                this._fullscreenArea ||
                  (("right" !== t && "center" !== t) ||
                    (this._fullscreenArea = t),
                  "center" === t && this._bridge.requestFullscreen(),
                  this._updateFullscreen());
              },
              exitFullscreen: () => {
                t === this._fullscreenArea &&
                  ((this._fullscreenArea = void 0),
                  "center" === t && this._bridge.exitFullscreen(),
                  this._updateFullscreen());
              },
              width: new (r())(),
              height: new (r())(),
              availWidth: new (r())(),
              availHeight: new (r())(),
              alive: new (r())(!0),
              container: new (r())(i),
              visible: new (r())(!0),
              fullscreen: new (r())(!1),
              fullscreenable: new (r())("right" === t || "center" === t),
              rdState: new n.ResizerDetacherState(),
            };
          return (
            s.rdState.pushOwner(s),
            (this._areas[t] = s),
            s.rdState.owner.subscribe(
              e => {
                const i = s.container.value();
                if (e !== s)
                  i &&
                    ((i.innerHTML = ""),
                    i.parentElement && i.parentElement.removeChild(i));
                else {
                  let e = null;
                  for (let i = this._availableAreas.indexOf(t); i--; ) {
                    const t = this._availableAreas[i];
                    if (this._affectsLayout(t)) {
                      e = this._areas[t].container.value();
                      break;
                    }
                  }
                  i &&
                    (e && i.parentElement
                      ? i.insertAdjacentElement("afterend", e)
                      : this._container.appendChild(i));
                }
                this.recalculate();
              },
              {callWithLast: !0},
            ),
            s.rdState.bridge()
          );
        }
        free(e) {
          const t = this._areas[e];
          if (!t) return;
          this._areas[e] = void 0;
          const i = t.container.value();
          i && i.parentElement && i.parentElement.removeChild(i),
            t.alive.setValue(!1);
        }
        recalculate() {
          const e = {};
          this._recalcSingleRunToken = e;
          const t = this._areas.topleft,
            i = this._areas.left,
            s = this._areas.tradingpanel,
            r = this._areas.right,
            n = this._areas.top,
            o = this._areas.bottom,
            a = this._areas.center,
            l = this._areas.extratop,
            c = this._width.value(),
            d = this._height.value();
          let u = 0,
            p = 0,
            _ = 0,
            m = 0,
            g = 0,
            f = 0,
            v = 0,
            S = 0;
          if (
            (e === this._recalcSingleRunToken &&
              l &&
              this._processVisibility(l) &&
              ((S = this._setHeight(l, d)), this._setWidth(l, c)),
            e === this._recalcSingleRunToken && t && this._processVisibility(t))
          ) {
            (v = this._setHeight(t, d)),
              (f = this._setWidth(t, c)),
              f && (f += 4);
            const e = t.container.value();
            e && (e.style.top = S + "px");
          }
          if (
            e === this._recalcSingleRunToken &&
            i &&
            this._processVisibility(i)
          ) {
            const e = i.container.value();
            e && (e.style.top = v + S + "px"),
              this._setHeight(i, d - v - S),
              (_ = this._setWidth(i, c)),
              _ && (_ += 4);
          }
          if (
            e === this._recalcSingleRunToken &&
            s &&
            this._processVisibility(s)
          ) {
            this._setHeight(s, d);
            let e = c - _;
            h || (e -= 300), (g = this._setWidth(s, e));
          }
          if (
            e === this._recalcSingleRunToken &&
            r &&
            this._processVisibility(r)
          ) {
            this._setHeight(r, d - S);
            let e = c - _ - g;
            h || (e -= 300), (m = this._setWidth(r, e));
            const t = r.container.value();
            t && (t.style.top = S + "px");
          }
          const y = g + m,
            b = y ? 4 : 0;
          if (
            e === this._recalcSingleRunToken &&
            n &&
            this._processVisibility(n)
          ) {
            const e = Math.max(f, _),
              t = n.container.value();
            t && ((t.style.left = e + "px"), (t.style.top = S + "px"));
            const i = c - e - g - m - b;
            this._setWidth(n, i), (u = this._setHeight(n, d));
          }
          let w = 0;
          const P = c - _ - g - m - b;
          if (
            e === this._recalcSingleRunToken &&
            o &&
            this._processVisibility(o)
          ) {
            const e = o.container.value();
            e &&
              ((e.style.left = _ + "px"),
              e.classList.toggle("no-border-top-left-radius", !_),
              e.classList.toggle("no-border-top-right-radius", !y)),
              this._setWidth(o, P);
            const t = d - S;
            (w = Math.min(300, t - 0)), (p = this._setHeight(o, t) + 4);
          }
          if (
            e === this._recalcSingleRunToken &&
            a &&
            this._processVisibility(a)
          ) {
            const e = a.container.value();
            e &&
              ((e.style.left = _ + "px"),
              (e.style.top = u + S + "px"),
              e.classList.toggle("no-border-bottom-left-radius", !p || !_),
              e.classList.toggle("no-border-bottom-right-radius", !y || !p)),
              this._setWidth(a, P);
            const t = d - u - p - S;
            this._setHeight(a, Math.max(t, w));
          }
          if (
            e === this._recalcSingleRunToken &&
            s &&
            this._affectsLayout("tradingpanel")
          ) {
            const e = s.container.value();
            e && ((e.style.right = m + "px"), (e.style.top = S + "px"));
          }
          e === this._recalcSingleRunToken && this._updateVisibility();
        }
        _affectsLayout(e) {
          const t = this._areas[e];
          if (!t) return !1;
          if (t.rdState.owner.value() !== t) return !1;
          if (this._fullscreenArea && this._fullscreenArea !== e) return u(e);
          if (this._width.value() <= 567 || this._height.value() <= 445) {
            if (!["center", "top", "left", "topleft", "extratop"].includes(e))
              return !1;
          }
          return !0;
        }
        _updateVisibility() {
          const e = this._bridge.visible.value();
          for (let t = 0; t < this._availableAreas.length; t++) {
            const i = this._availableAreas[t],
              s = this._areas[i];
            s &&
              (e && this._affectsLayout(i)
                ? s.visible.setValue(!0)
                : s.visible.setValue(!1));
          }
        }
        _onParentFullscreenChange() {
          this._bridge.fullscreen.value() ||
            ((this._fullscreenArea = void 0), this._updateFullscreen());
        }
        _updateFullscreen() {
          const e = void 0 !== this._fullscreenArea;
          for (let t = 0; t < this._availableAreas.length; t++) {
            const i = this._availableAreas[t],
              s = this._areas[i];
            if (!s) continue;
            if (i === this._fullscreenArea) {
              s.fullscreen.setValue(!0);
              continue;
            }
            s.fullscreen.setValue(!1);
            const r = s.container.value();
            r && r.classList.toggle("js-hidden", e && !u(i));
          }
          this._updateVisibility(), this.recalculate();
        }
        _createDOM(e) {
          const t = document.createElement("div");
          return (
            t.classList.add("layout__area--" + e),
            (t.style.position = "absolute"),
            "bottom" === e ? (t.style.bottom = "0") : (t.style.top = "0"),
            "right" === e || "tradingpanel" === e
              ? (t.style.right = "0")
              : (t.style.left = "0"),
            t
          );
        }
      }
      function u(e) {
        const t = c.enabled("side_toolbar_in_fullscreen_mode"),
          i = c.enabled("header_in_fullscreen_mode");
        return "center" === e || ("left" === e && t) || ("top" === e && i);
      }
    },
    30779: (e, t, i) => {
      "use strict";
      i.d(t, {ResizerDetacherState: () => o});
      var s = i(16282),
        r = i(32856),
        n = i.n(r);
      class o {
        constructor(e) {
          (this._alive = new (n())()),
            (this._container = new (n())()),
            (this._width = new (n())()),
            (this._height = new (n())()),
            (this._fullscreen = new (n())()),
            (this._detachable = new (n())()),
            (this._fullscreenable = new (n())()),
            (this._visible = new (n())()),
            (this._availWidth = new (n())()),
            (this._availHeight = new (n())()),
            (this._owner = new (n())()),
            (this._ownersStack = []),
            (this.owner = this._owner.readonly()),
            (this._bridge = {
              alive: this._alive.readonly(),
              container: this._container.readonly(),
              width: this._width.readonly(),
              height: this._height.readonly(),
              fullscreen: this._fullscreen.readonly(),
              detachable: this._detachable.readonly(),
              fullscreenable: this._fullscreenable.readonly(),
              visible: this._visible.readonly(),
              availWidth: this._availWidth.readonly(),
              availHeight: this._availHeight.readonly(),
              remove: () => {
                const e = this._owner.value();
                e && e.remove && e.remove();
              },
              negotiateWidth: e => {
                const t = this._owner.value();
                t && t.negotiateWidth && t.negotiateWidth(e);
              },
              negotiateHeight: e => {
                const t = this._owner.value();
                t && t.negotiateHeight && t.negotiateHeight(e);
              },
              requestFullscreen: () => {
                const e = this._owner.value();
                e && e.requestFullscreen && e.requestFullscreen();
              },
              exitFullscreen: () => {
                const e = this._owner.value();
                e && e.exitFullscreen && e.exitFullscreen();
              },
              detach: e => {
                const t = this._owner.value();
                t && t.detach && t.detach(e);
              },
              attach: () => {
                const e = this._owner.value();
                e && e.attach && e.attach();
              },
            }),
            e && this.pushOwner(e);
        }
        bridge() {
          return this._bridge;
        }
        pushOwner(e) {
          if (!e.alive.value()) return;
          for (const e of this._ownersStack) this._unsubscribeOwner(e);
          const t = {owner: e};
          this._ownersStack.push(t), this._subscribeOwner(t);
        }
        _subscribeOwner(e) {
          const t = e.owner;
          if (
            (e.deathWatcher ||
              (this._alive.setValue(!0),
              (e.deathWatcher = t.alive.spawn()),
              e.deathWatcher.subscribe(t => {
                t || this._deadHandler(e);
              })),
            this._owner.setValue(t),
            !e.subscriptions)
          ) {
            const i = (e.subscriptions = []);
            this._visible.setValue(!1);
            const s = (e, t) => {
              if (e) {
                const s = e.spawn();
                i.push(s),
                  s.subscribe(
                    e => {
                      t.setValue(e);
                    },
                    {callWithLast: !0},
                  );
              } else t.deleteValue();
            };
            s(t.container, this._container),
              s(t.width, this._width),
              s(t.height, this._height),
              s(t.fullscreen, this._fullscreen),
              s(t.detachable, this._detachable),
              s(t.fullscreenable, this._fullscreenable),
              s(t.availWidth, this._availWidth),
              s(t.availHeight, this._availHeight),
              s(t.visible, this._visible);
          }
        }
        _unsubscribeOwner(e, t) {
          if (e.subscriptions) {
            for (const t of e.subscriptions) t.unsubscribe();
            e.subscriptions = null;
          }
          t &&
            e.deathWatcher &&
            (e.deathWatcher.unsubscribe(), (e.deathWatcher = null));
        }
        _deadHandler(e) {
          const t = this._ownersStack.indexOf(e);
          (0, s.assert)(-1 !== t, "sanitized owner should be in stack");
          for (let e = this._ownersStack.length - 1; e >= t; e--)
            this._unsubscribeOwner(this._ownersStack[e], !0);
          (this._ownersStack.length = t),
            t > 0
              ? this._subscribeOwner(this._ownersStack[t - 1])
              : (this._alive.setValue(!1), this._owner.deleteValue());
        }
      }
    },
    89979: (e, t, i) => {
      "use strict";
      i.d(t, {Root: () => d});
      i(79881);
      var s = i(32856),
        r = i.n(s),
        n = i(30779);
      class o {
        constructor(e) {
          (this._document = e), (this.isFullscreen = new (r())());
          const t = () => {
            const e = [
              "fullscreenElement",
              "webkitFullscreenElement",
              "mozFullscreenElement",
              "mozFullScreenElement",
              "msFullscreenElement",
            ];
            for (let t = 0; t < e.length; t++) {
              const i = e[t];
              if (i in this._document) {
                this.isFullscreen.setValue(!!this._document[i]);
                break;
              }
            }
          };
          t();
          for (const i of [
            "fullscreenchange",
            "webkitfullscreenchange",
            "mozfullscreenchange",
            "MSFullscreenChange",
          ])
            e.addEventListener(i, t, !1);
        }
        enter() {
          const e = this._document.documentElement;
          for (const t of [
            "requestFullscreen",
            "mozRequestFullScreen",
            "webkitRequestFullscreen",
            "msRequestFullscreen",
          ])
            if ("function" == typeof e[t]) {
              e[t]();
              break;
            }
          this.isFullscreen.setValue(!0);
        }
        exit() {
          const e = this._document;
          for (const t of [
            "exitFullscreen",
            "mozCancelFullScreen",
            "mozExitFullscreen",
            "webkitExitFullscreen",
            "msExitFullscreen",
          ])
            if ("function" == typeof e[t]) {
              e[t]();
              break;
            }
          this.isFullscreen.setValue(!1);
        }
      }
      class a {
        constructor(e) {
          let t;
          this.isVisible = new (r())(!0);
          let i = null;
          for (const s of ["", "moz", "ms", "webkit"]) {
            const r = s ? s + "Hidden" : "hidden";
            if (r in e) {
              (t = s + "visibilitychange"),
                (i = () => {
                  this.isVisible.setValue(!e[r]);
                }),
                i(),
                e.addEventListener(t, i, !1);
              break;
            }
          }
          this.destroy = () => {
            i && (e.removeEventListener(t, i, !1), (i = null));
          };
        }
      }
      var l = i(22900),
        c = i(16282),
        h = i(43367);
      class d {
        constructor(e) {
          (this._updateDocumentHeight = e => {
            "visual" === this._viewportType &&
              this._window.document.documentElement.style.setProperty(
                "height",
                e + "px",
                "important",
              );
          }),
            (this._window = e),
            (this._fullscreenApi = new o(e.document)),
            (this._viewportType =
              h.CheckMobile.iOS() &&
              !(0, l.isOnMobileAppPage)("any") &&
              this._window.visualViewport
                ? "visual"
                : "quirks"),
            "visual" === this._viewportType
              ? (this._viewport = (0, c.ensureDefined)(
                  this._window.visualViewport,
                ))
              : (this._viewport = this._window);
          const t = (this._layoutSizeSensor =
            this._window.document.createElement("div"));
          (t.id = "layout-size-sensor"),
            (t.style.position = "fixed"),
            (t.style.top = "0"),
            (t.style.left = "0"),
            (t.style.right = "0"),
            (t.style.bottom = "0"),
            (t.style.pointerEvents = "none"),
            (t.style.visibility = "hidden"),
            this._initFullscreen();
        }
        allocate() {
          this.free();
          const e = this._window.document,
            t = e.createElement("div");
          t.classList.add("js-rootresizer__contents"),
            (t.style.position = "relative"),
            (t.style.width = "100%"),
            (t.style.height = "100%"),
            e.body.insertAdjacentElement("afterbegin", t),
            e.body.insertAdjacentElement("afterbegin", this._layoutSizeSensor),
            (this._visibilityApi = new a(this._window.document));
          const i = {
            alive: new (r())(!0),
            fullscreenable: new (r())(!0),
            container: new (r())(t),
            width: new (r())(),
            height: new (r())(),
            availWidth: new (r())(),
            availHeight: new (r())(),
            visible: this._visibilityApi.isVisible,
            fullscreen: this._fullscreenApi.isFullscreen,
            remove: () => {
              i.alive.setValue(!1);
            },
            attach: () => {
              i.alive.setValue(!1), this._window.close();
            },
            requestFullscreen: () => {
              this._requestFullscreen();
            },
            exitFullscreen: () => {
              this._exitFullscreen();
            },
          };
          return (
            i.alive.subscribe(e => {
              e || i !== this._area || this.free();
            }),
            (this._area = i),
            (this._resizeHandler = () => {
              const e = this._width(i) || 800,
                t = this._height(i) || 600;
              i.availHeight.setValue(t),
                i.availWidth.setValue(e),
                i.height.setValue(t),
                i.width.setValue(e);
            }),
            this._area.height.subscribe(this._updateDocumentHeight, {
              callWithLast: !0,
            }),
            this._resizeHandler(),
            this._viewport.addEventListener("resize", this._resizeHandler),
            new n.ResizerDetacherState(i).bridge()
          );
        }
        free() {
          if (
            (this._resizeHandler &&
              (this._viewport.removeEventListener(
                "resize",
                this._resizeHandler,
              ),
              (this._resizeHandler = void 0)),
            this._visibilityApi &&
              (this._visibilityApi.destroy(), (this._visibilityApi = void 0)),
            this._area)
          ) {
            const e = this._area;
            (this._area = void 0),
              e.height.unsubscribe(this._updateDocumentHeight),
              e.alive.setValue(!1);
            const t = e.container.value(),
              i = null == t ? void 0 : t.parentElement;
            i && (i.removeChild(t), i.removeChild(this._layoutSizeSensor));
          }
        }
        _height(e) {
          if ("visual" === this._viewportType)
            return this._layoutSizeSensor.clientHeight;
          return e.container.value().clientHeight;
        }
        _width(e) {
          return e.container.value().clientWidth;
        }
        _requestFullscreen() {
          this._fullscreenApi.enter();
        }
        _exitFullscreen() {
          this._fullscreenApi.exit();
        }
        _initFullscreen() {
          this._fullscreenApi.isFullscreen.subscribe(e => {
            this._resizeHandler && this._resizeHandler();
          });
        }
      }
    },
    98852: (e, t, i) => {
      "use strict";
      i.d(t, {DEFAULT_SIZE: () => s, spinnerSizeMap: () => r});
      const s = "large",
        r = {
          mini: "xsmall",
          xsmall: "xsmall",
          small: "small",
          medium: "medium",
          large: "large",
        };
    },
    23214: (e, t, i) => {
      "use strict";
      i.d(t, {Spinner: () => o});
      i(11739);
      var s = i(67235),
        r = i(98852);
      const n = (0, s.parseHtmlElement)(
        '\n\t\t<div class="tv-spinner" role="progressbar">\n\t\t\t<div class="tv-spinner__spinner-layer">\n\t\t\t\t<div class="tv-spinner__background tv-spinner__width_element"></div>\n\t\t\t\t<div class="tv-spinner__circle-clipper tv-spinner__width_element tv-spinner__circle-clipper--left"></div>\x3c!--\n\t\t\t\t--\x3e<div class="tv-spinner__circle-clipper tv-spinner__width_element tv-spinner__circle-clipper--right"></div>\n\t\t\t</div>\n\t\t</div>\n\t',
      );
      class o {
        constructor(e) {
          (this._shown = !1),
            (this._el = n.cloneNode(!0)),
            this.setSize(r.spinnerSizeMap[e || r.DEFAULT_SIZE]);
        }
        spin(e) {
          return (
            this._el.classList.add("tv-spinner--shown"),
            void 0 === this._container &&
              ((this._container = e), void 0 !== e && e.appendChild(this._el)),
            (this._shown = !0),
            this
          );
        }
        stop(e) {
          return (
            e &&
              void 0 !== this._container &&
              this._container.removeChild(this._el),
            this._el.classList.remove("tv-spinner--shown"),
            (this._shown = !1),
            this
          );
        }
        setStyle(e) {
          return (
            Object.keys(e).forEach(t => {
              const i = e[t];
              void 0 !== i && this._el.style.setProperty(t, i);
            }),
            this
          );
        }
        style() {
          return this._el.style;
        }
        setSize(e) {
          const t = void 0 !== e ? "tv-spinner--size_" + e : "";
          return (
            (this._el.className = `tv-spinner ${t} ${
              this._shown ? "tv-spinner--shown" : ""
            }`),
            this
          );
        }
        getEl() {
          return this._el;
        }
        destroy() {
          this.stop(), delete this._el, delete this._container;
        }
      }
    },
    6369: (e, t, i) => {
      "use strict";
      i.d(t, {createStubElem: () => r});
      var s = i(1267);
      function r(e = [], t = []) {
        const i = document.createElement("div"),
          r = document.createElement("div");
        return (
          i.appendChild(r),
          i.classList.add(s.container),
          r.classList.add(s.inner),
          e.forEach(e => {
            i.classList.add(s[e]);
          }),
          t.forEach(e => {
            i.classList.add(s[e]);
          }),
          i
        );
      }
    },
    73900: (e, t, i) => {
      "use strict";
      i.r(t),
        i.d(t, {
          lineToolEntityInfo: () => o,
          studyEntityInfo: () => a,
          seriesEntityInfo: () => l,
          entityForDataSource: () => c,
        });
      var s = i(17e3),
        r = i(85125),
        n = i(67945);
      function o(e) {
        return {
          id: e.id(),
          name:
            ((t = e.toolname),
            Object.keys(r.supportedLineTools).find(
              e => r.supportedLineTools[e].name === t,
            ) || null),
        };
        var t;
      }
      function a(e) {
        return {id: e.id(), name: e.metaInfo().description};
      }
      function l(e) {
        return {id: e.id(), name: "Main Series"};
      }
      function c(e, t) {
        return t === e.mainSeries()
          ? l(e.mainSeries())
          : (0, s.isStudy)(t)
          ? a(t)
          : (0, n.isLineTool)(t)
          ? o(t)
          : null;
      }
    },
    24947: (e, t, i) => {
      "use strict";
      i.r(t),
        i.d(t, {isLineToolRiskReward: () => a, LineDataSourceApi: () => c});
      var s = i(16282),
        r = i(47903);
      const n = new Map([
        ["LineToolRiskRewardLong", 2],
        ["LineToolRiskRewardShort", 2],
        ["LineToolBezierQuadro", 3],
        ["LineToolBezierCubic", 4],
      ]);
      function o(e) {
        const t = n.get(e.toolname);
        if (void 0 !== t) return t;
        const i = e.pointsCount();
        return -1 === i ? e.points().length : i;
      }
      function a(e) {
        return (
          "LineToolRiskRewardLong" === e || "LineToolRiskRewardShort" === e
        );
      }
      const l = [
        "alwaysShowStats",
        "entryPrice",
        "inputs.first bar time",
        "inputs.last bar time",
        "interval",
        "linesWidths",
        "points",
        "snapTo45Degrees",
        "stopPrice",
        "symbol",
        "symbolStateVersion",
        "currencyId",
        "unitId",
        "targetPrice",
        "zOrderVersion",
      ];
      class c {
        constructor(e, t, i) {
          (this._source = e), (this._model = t), (this._pointsConverter = i);
        }
        isSelectionEnabled() {
          return this._source.isSelectionEnabled();
        }
        setSelectionEnabled(e) {
          this._source.setSelectionEnabled(e);
        }
        isSavingEnabled() {
          return this._source.isSavedInChart();
        }
        setSavingEnabled(e) {
          this._source.setSavingInChartEnabled(e);
        }
        isShowInObjectsTreeEnabled() {
          return this._source.showInObjectTree();
        }
        setShowInObjectsTreeEnabled(e) {
          this._source.setShowInObjectsTreeEnabled(e);
        }
        isUserEditEnabled() {
          return this._source.userEditEnabled();
        }
        setUserEditEnabled(e) {
          this._source.setUserEditEnabled(e);
        }
        bringToFront() {
          this._model.bringToFront([this._source]);
        }
        sendToBack() {
          this._model.sendToBack([this._source]);
        }
        getProperties() {
          return this._source.properties().state(l, !0);
        }
        setProperties(e) {
          this._setProps(this._source.properties(), e, "");
        }
        getPoints() {
          let e = this._source.points();
          const t = o(this._source);
          return (
            e.length > t &&
              ((0, s.assert)(a(this._source.toolname)), (e = e.slice(0, t))),
            this._pointsConverter.dataSourcePointsToPriced(e)
          );
        }
        setPoints(e) {
          if (this._source.isFixed()) return;
          const t = o(this._source);
          if (t !== e.length)
            throw new Error(
              `Wrong points count. Required: ${t}, provided: ${e.length}`,
            );
          const i = this._pointsConverter.apiPointsToDataSource(e);
          this._model.startChangingLinetool(this._source),
            this._model.changeLinePoints(this._source, i),
            this._model.endChangingLinetool(!0),
            this._source.createServerPoints();
        }
        ownerSourceId() {
          return (0, s.ensureNotNull)(this._source.ownerSource()).id();
        }
        changePoint(e, t) {
          if (this._source.isFixed()) return;
          const i = this._pointsConverter.apiPointsToDataSource([e])[0];
          this._model.startChangingLinetool(this._source, {...i}, t),
            this._model.changeLinePoint({...i}),
            this._model.endChangingLinetool(!1),
            this._source.createServerPoints();
        }
        isHidden() {
          return this._source.isSourceHidden();
        }
        getRawPoints() {
          return this._source.points();
        }
        setRawPoint(e, t) {
          this._model.startChangingLinetool(this._source, {...t}, e),
            this._model.changeLinePoint({...t}),
            this._model.endChangingLinetool(!1);
        }
        move(e, t) {
          this._model.startMovingSources(
            [this._source],
            {logical: e},
            null,
            new Map(),
          ),
            this._model.moveSources({logical: t}, new Map()),
            this._model.endMovingSources(!1);
        }
        dataAndViewsReady() {
          return this._source.dataAndViewsReady();
        }
        zorder() {
          return this._source.zorder();
        }
        symbol() {
          return this._source.properties().symbol.value();
        }
        currency() {
          return this._source.properties().currencyId.value();
        }
        unit() {
          return this._source.properties().unitId.value();
        }
        _setProps(e, t, i) {
          for (const s in t) {
            if (!t.hasOwnProperty(s)) continue;
            const n = 0 === i.length ? s : `${i}.${s}`;
            if (e.hasOwnProperty(s)) {
              const i = t[s];
              (0, r.isHashObject)(i)
                ? this._setProps(e[s], i, n)
                : e[s].setValue(i);
            } else console.warn(`Unknown property "${n}"`);
          }
        }
      }
    },
    23605: (e, t, i) => {
      "use strict";
      i.d(t, {PaneApi: () => u});
      var s = i(16282),
        r = i(95996),
        n = i(73900),
        o = i(47903),
        a = i(79881),
        l = i(90963),
        c = i(5980);
      const h = new l.TranslatedString(
        "change pane height",
        (0, a.t)("change pane height"),
      );
      class d extends c.UndoCommand {
        constructor(e, t, i) {
          super(h),
            (this._model = e),
            (this._paneIndex = t),
            (this._paneHeight = i),
            (this._prevStretchFactors = this._model
              .panes()
              .map(e => e.stretchFactor()));
        }
        redo() {
          this._model.changePanesHeight(this._paneIndex, this._paneHeight);
        }
        undo() {
          const e = this._model.panes();
          for (let t = 0; t < e.length; ++t)
            e[t].setStretchFactor(
              (0, s.ensureDefined)(this._prevStretchFactors[t]),
            );
          this._model.fullUpdate();
        }
      }
      class u {
        constructor(e, t) {
          (this._priceScales = new WeakMap()),
            (this._pane = e),
            (this._chartWidget = t);
        }
        hasMainSeries() {
          return this._pane.containsMainSeries();
        }
        getLeftPriceScales() {
          return this._pane.leftPriceScales().map(this._getPriceScaleApi, this);
        }
        getRightPriceScales() {
          return this._pane
            .rightPriceScales()
            .map(this._getPriceScaleApi, this);
        }
        getMainSourcePriceScale() {
          const e = this._pane.mainDataSource();
          if (null === e) return null;
          const t = e.priceScale();
          return null === t || this._pane.isOverlay(e)
            ? null
            : this._getPriceScaleApi(t);
        }
        setMaximized(e) {
          if (this._pane.isMaximized() !== e)
            for (const e of this._chartWidget.paneWidgets())
              if (e.state() === this._pane) {
                this._chartWidget.toggleMaximizePane(e);
                break;
              }
        }
        legendLoaded() {
          const e = this._chartWidget.paneByState(this._pane);
          return Boolean(e && e.statusWidget());
        }
        getAllEntities() {
          const e = this._pane.model();
          return this._pane
            .sourcesByGroup()
            .allIncludingHidden()
            .map(t => (0, n.entityForDataSource)(e, t))
            .filter(o.notNull)
            .filter(e => null !== e.name);
        }
        getHeight() {
          return this._pane.height();
        }
        setHeight(e) {
          const t = this._chartWidget.model().model(),
            i = t.panes();
          (0, s.assert)(
            i.length > 1,
            "Unable to change pane's height if there is only one pane",
          );
          const r = i.indexOf(this._pane);
          (0, s.assert)(-1 !== r, "Invalid pane index");
          const n = new d(t, r, e);
          this._chartWidget.model().undoHistory().pushUndoCommand(n);
        }
        moveTo(e) {
          const t = this.paneIndex();
          t !== e &&
            ((0, s.assert)(
              e >= 0 && e < this._chartWidget.paneWidgets().length,
              "Invalid pane index",
            ),
            this._chartWidget.model().movePane(t, e));
        }
        paneIndex() {
          return this._chartWidget.model().model().panes().indexOf(this._pane);
        }
        _getPriceScaleApi(e) {
          let t = this._priceScales.get(e);
          return (
            void 0 === t &&
              ((t = new r.PriceScaleApi(this._chartWidget.model(), e)),
              this._priceScales.set(e, t)),
            t
          );
        }
      }
    },
    95996: (e, t, i) => {
      "use strict";
      i.d(t, {PriceScaleApi: () => s});
      class s {
        constructor(e, t) {
          (this._chartUndoModel = e),
            (this._chartModel = e.model()),
            (this._priceScale = t);
        }
        getMode() {
          const e = this._priceScale.properties().childs();
          return e.percentage.value()
            ? 2
            : e.indexedTo100.value()
            ? 3
            : e.log.value()
            ? 1
            : 0;
        }
        setMode(e) {
          this._priceScale.setMode({
            percentage: 2 === e,
            log: 1 === e,
            indexedTo100: 3 === e,
          });
        }
        isInverted() {
          return this._priceScale.isInverted();
        }
        setInverted(e) {
          this._priceScale.properties().childs().isInverted.setValue(e);
        }
        getVisiblePriceRange() {
          return this._priceScale.priceRangeInPrice();
        }
        setVisiblePriceRange(e) {
          this._priceScale.setPriceRangeInPrice(e),
            this._chartModel.lightUpdate();
        }
        hasMainSeries() {
          return this._priceScale.hasMainSeries();
        }
        getStudies() {
          return this._priceScale.getStudies().map(e => e.id());
        }
        currency() {
          const e = this._priceScale.currency(
            this._chartModel.availableCurrencies(),
          );
          return null === e
            ? null
            : {selectedCurrency: e.selectedCurrency, readOnly: e.readOnly};
        }
        setCurrency(e) {
          this._chartUndoModel.setPriceScaleCurrency(this._priceScale, e);
        }
        unit() {
          const e = this._priceScale.unit(this._chartModel.availableUnits());
          return null === e
            ? null
            : {
                selectedUnit: e.selectedUnit,
                readOnly: 0 === e.availableGroups.size,
                availableGroups: Array.from(e.availableGroups),
              };
        }
        setUnit(e) {
          this._chartUndoModel.setPriceScaleUnit(this._priceScale, e);
        }
      }
    },
    9062: (e, t, i) => {
      "use strict";
      function s(e, t) {
        const i = e.dataSourceForId(t);
        if (null === i)
          throw new Error(`Chart has no study or shape with id "${t}"`);
        return i;
      }
      i.d(t, {SelectionApi: () => r});
      class r {
        constructor(e) {
          this._model = e;
        }
        add(e) {
          Array.isArray(e)
            ? this._model.selectionMacro(t => {
                e.map(s.bind(null, this._model)).forEach(e =>
                  t.addSourceToSelection(e),
                );
              })
            : this.add([e]);
        }
        canBeAddedToSelection(e) {
          const t = s(this._model, e);
          return this._model.selection().canBeAddedToSelection(t);
        }
        set(e) {
          Array.isArray(e)
            ? this._model.selectionMacro(t => {
                t.clearSelection(),
                  e
                    .map(s.bind(null, this._model))
                    .forEach(e => t.addSourceToSelection(e));
              })
            : this.set([e]);
        }
        remove(e) {
          Array.isArray(e)
            ? this._model.selectionMacro(t => {
                e.map(s.bind(null, this._model)).forEach(e =>
                  t.removeSourceFromSelection(e),
                );
              })
            : this.remove([e]);
        }
        contains(e) {
          const t = s(this._model, e);
          return this._model.selection().isSelected(t);
        }
        allSources() {
          return this._model
            .selection()
            .dataSources()
            .map(e => e.id());
        }
        isEmpty() {
          return this._model.selection().isEmpty();
        }
        clear() {
          this._model.selectionMacro(e => {
            e.clearSelection();
          });
        }
        onChanged() {
          return this._model.onSelectedSourceChanged();
        }
      }
    },
    90920: (e, t, i) => {
      "use strict";
      i.d(t, {SeriesApi: () => l});
      var s = i(16282),
        r = i(31495),
        n = i(3062),
        o = i(13863),
        a = i(95996);
      class l {
        constructor(e, t) {
          (this._series = e), (this._undoModel = t), (this._model = t.model());
        }
        isUserEditEnabled() {
          return this._series.userEditEnabled();
        }
        setUserEditEnabled(e) {
          this._series.setUserEditEnabled(e);
        }
        mergeUp() {
          this._model.isMergeUpAvailableForSource(this._series) &&
            new r.MergeUpUndoCommand(this._model, this._series, null).redo();
        }
        mergeDown() {
          this._model.isMergeDownAvailableForSource(this._series) &&
            new r.MergeDownUndoCommand(this._model, this._series, null).redo();
        }
        unmergeUp() {
          this._model.isUnmergeAvailableForSource(this._series) &&
            new n.UnmergeUpUndoCommand(this._model, this._series, null).redo();
        }
        unmergeDown() {
          this._model.isUnmergeAvailableForSource(this._series) &&
            new n.UnmergeDownUndoCommand(
              this._model,
              this._series,
              null,
            ).redo();
        }
        detachToRight() {
          new o.MoveToNewPriceScaleUndoCommand(
            this._model,
            this._series,
            this._pane(),
            "right",
            null,
          ).redo();
        }
        detachToLeft() {
          new o.MoveToNewPriceScaleUndoCommand(
            this._model,
            this._series,
            this._pane(),
            "left",
            null,
          ).redo();
        }
        detachNoScale() {
          new o.MoveToNewPriceScaleUndoCommand(
            this._model,
            this._series,
            this._pane(),
            "overlay",
            null,
          ).redo();
        }
        changePriceScale(e) {
          const t = (0, s.ensureNotNull)(
            this._model.paneForSource(this._series),
          );
          switch (e) {
            case "new-left":
              new o.MoveToNewPriceScaleUndoCommand(
                this._model,
                this._series,
                t,
                "left",
                null,
              ).redo();
              break;
            case "new-right":
              new o.MoveToNewPriceScaleUndoCommand(
                this._model,
                this._series,
                t,
                "right",
                null,
              ).redo();
              break;
            case "no-scale":
              (0, s.assert)(
                t.actionNoScaleIsEnabled(this._series),
                "Unable to leave a pane without any non-overlay price scale",
              ),
                new o.MoveToNewPriceScaleUndoCommand(
                  this._model,
                  this._series,
                  t,
                  "overlay",
                  null,
                ).redo();
              break;
            default:
              const i = this._model.dataSourceForId(e);
              if (null === i)
                throw new Error(`There is no study with entityId='${e}'`);
              const r = this._model.paneForSource(i) === t;
              (0, s.assert)(r, "Study should be on the main pane");
              const n = (0, s.ensureNotNull)(i.priceScale());
              new o.MoveToExistingPriceScaleUndoCommand(
                this._model,
                this._series,
                t,
                n,
                null,
              ).redo();
          }
        }
        isVisible() {
          return this._series.properties().childs().visible.value();
        }
        setVisible(e) {
          this._series.properties().childs().visible.setValue(e);
        }
        bringToFront() {
          this._model.bringToFront([this._series]);
        }
        sendToBack() {
          this._model.sendToBack([this._series]);
        }
        entityId() {
          return this._series.id();
        }
        chartStyleProperties(e) {
          return this._series
            .properties()
            .childs()
            [c(e)].state(["inputs", "inputsInfo"]);
        }
        setChartStyleProperties(e, t) {
          this._series.properties().childs()[c(e)].mergeAndFire(t);
        }
        barsCount() {
          return this._series.bars().size();
        }
        symbolSource() {
          return {
            symbol: this._series.symbol(),
            currencyId: this._series.currency(),
            unitId: this._series.unit(),
          };
        }
        isLoading() {
          return this._series.isLoading();
        }
        data() {
          return this._series.data();
        }
        priceScale() {
          return new a.PriceScaleApi(
            this._undoModel,
            this._series.priceScale(),
          );
        }
        _pane() {
          return (0, s.ensureNotNull)(this._model.paneForSource(this._series));
        }
      }
      function c(e) {
        switch (e) {
          case 0:
            return "barStyle";
          case 1:
            return "candleStyle";
          case 2:
            return "lineStyle";
          case 3:
            return "areaStyle";
          case 4:
            return "renkoStyle";
          case 5:
            return "kagiStyle";
          case 6:
            return "pnfStyle";
          case 7:
            return "pbStyle";
          case 8:
            return "haStyle";
          case 9:
            return "hollowCandleStyle";
          case 10:
            return "baselineStyle";
          case 11:
            return "rangeStyle";
          case 12:
            return "hiloStyle";
          default:
            (0, s.ensureNever)(e);
        }
        throw new Error("unsupported chart style: " + e);
      }
    },
    52703: (e, t, i) => {
      "use strict";
      i.d(t, {StudyApi: () => S});
      var s = i(16282),
        r = i(5729),
        n = i.n(r),
        o = i(47903),
        a = i(70635),
        l = i(11204),
        c = i(32158),
        h = i(3062),
        d = i(31495),
        u = i(13863),
        p = i(21209),
        _ = i(42010),
        m = i(78333),
        g = i(95996),
        f = i(73748),
        v = i(25682);
      class S {
        constructor(e, t) {
          (this._onStudyCompleted = new (n())()),
            (this._onStudyError = new (n())()),
            (this._study = e),
            (this._chartWidget = t),
            (this._undoModel = this._chartWidget.model()),
            (this._model = this._undoModel.model()),
            this._study.onAboutToBeDestroyed().subscribe(this, () => {
              this._study.onStatusChanged().unsubscribeAll(this),
                this._study.onAboutToBeDestroyed().unsubscribeAll(this);
            }),
            this._study.onStatusChanged().subscribe(this, e => {
              switch (e.type) {
                case f.StudyStatusType.Completed:
                  this._onStudyCompleted.fire();
                  break;
                case f.StudyStatusType.Error:
                  this._onStudyError.fire();
              }
            });
        }
        isUserEditEnabled() {
          return this._study.userEditEnabled();
        }
        setUserEditEnabled(e) {
          this._study.setUserEditEnabled(e);
        }
        getInputsInfo() {
          return (0, v.getStudyInputsInfo)(this._study.metaInfo());
        }
        getInputValues() {
          const e = this._study.inputs({symbolsForChartApi: !1, asObject: !0});
          return Object.keys(e).map(t => {
            const i = e[t];
            return {id: t, value: (0, o.isObject)(i) ? i.v : i};
          });
        }
        setInputValues(e) {
          const t = this.getInputValues();
          for (const i of e) {
            void 0 !== t.find(e => e.id === i.id)
              ? this._study.properties().inputs[i.id].setValue(i.value)
              : console.warn(`There is no such input: "${i.id}"`);
          }
        }
        mergeUp() {
          this._model.isMergeUpAvailableForSource(this._study) &&
            new d.MergeUpUndoCommand(this._model, this._study, null).redo();
        }
        mergeDown() {
          this._model.isMergeDownAvailableForSource(this._study) &&
            new d.MergeDownUndoCommand(this._model, this._study, null).redo();
        }
        unmergeUp() {
          this._model.isUnmergeAvailableForSource(this._study) &&
            new h.UnmergeUpUndoCommand(this._model, this._study, null).redo();
        }
        unmergeDown() {
          this._model.isUnmergeAvailableForSource(this._study) &&
            new h.UnmergeDownUndoCommand(this._model, this._study, null).redo();
        }
        onDataLoaded() {
          return this._onStudyCompleted;
        }
        onStudyError() {
          return this._onStudyError;
        }
        mergeUpWithUndo() {
          this._model.isMergeUpAvailableForSource(this._study) &&
            this._undoModel.mergeSourceUp(this._study);
        }
        mergeDownWithUndo() {
          this._model.isMergeDownAvailableForSource(this._study) &&
            this._undoModel.mergeSourceDown(this._study);
        }
        unmergeUpWithUndo() {
          this._model.isUnmergeAvailableForSource(this._study) &&
            this._undoModel.unmergeSourceUp(this._study);
        }
        unmergeDownWithUndo() {
          this._model.isUnmergeAvailableForSource(this._study) &&
            this._undoModel.unmergeSourceDown(this._study);
        }
        priceScale() {
          return new g.PriceScaleApi(
            this._undoModel,
            (0, s.ensureNotNull)(this._study.priceScale()),
          );
        }
        symbolSource() {
          const e = (0, s.ensureNotNull)(this._study.symbolSource());
          return {
            symbol: e.symbol(),
            currencyId: e.currency(),
            unitId: e.unit(),
          };
        }
        currency() {
          return this._study.currency();
        }
        changePriceScale(e) {
          const t = (0, s.ensureNotNull)(
              this._model.paneForSource(this._model.mainSeries()),
            ),
            i = (0, s.ensureNotNull)(this._model.paneForSource(this._study));
          switch (e) {
            case "no-scale":
              (0, s.assert)(
                i.actionNoScaleIsEnabled(this._study),
                "Unable to leave a pane without any non-overlay price scale",
              ),
                new u.MoveToNewPriceScaleUndoCommand(
                  this._model,
                  this._study,
                  i,
                  "overlay",
                  null,
                ).redo();
              break;
            case "as-series":
              (0, s.assert)(i === t, "Study should be on the main pane"),
                new u.MoveToExistingPriceScaleUndoCommand(
                  this._model,
                  this._study,
                  i,
                  this._model.mainSeries().priceScale(),
                  null,
                ).redo();
              break;
            case "new-left":
              new u.MoveToNewPriceScaleUndoCommand(
                this._model,
                this._study,
                i,
                "left",
                null,
              ).redo();
              break;
            case "new-right":
              new u.MoveToNewPriceScaleUndoCommand(
                this._model,
                this._study,
                i,
                "right",
                null,
              ).redo();
              break;
            default:
              const r = this._model.dataSourceForId(e);
              if (null === r)
                throw new Error(`There is no study with entityId='${e}'`);
              const n = i === this._model.paneForSource(r);
              (0, s.assert)(n, "Both studies should be on the same pane");
              const o = (0, s.ensureNotNull)(r.priceScale()),
                a = (0, c.sourceNewCurrencyOnPinningToPriceScale)(
                  this._study,
                  o,
                  this._model,
                ),
                h = (0, _.sourceNewUnitOnPinningToPriceScale)(
                  this._study,
                  o,
                  this._model,
                );
              new u.MoveToExistingPriceScaleUndoCommand(
                this._model,
                this._study,
                i,
                o,
                null,
              ).redo(),
                null !== a &&
                  new l.SetPriceScaleCurrencyUndoCommand(
                    o,
                    a,
                    this._undoModel.chartWidget(),
                    null,
                  ).redo(),
                null !== h &&
                  new m.SetPriceScaleUnitUndoCommand(
                    o,
                    h,
                    this._undoModel.chartWidget(),
                    null,
                  ).redo();
          }
        }
        isVisible() {
          return this._study.properties().visible.value();
        }
        setVisible(e) {
          this._study.properties().visible.setValue(e);
        }
        bringToFront() {
          this._model.bringToFront([this._study]);
        }
        sendToBack() {
          this._model.sendToBack([this._study]);
        }
        applyOverrides(e) {
          (0, a.applyOverridesToStudy)(this._study, e);
        }
        dataLength() {
          return this._study.status().type !== f.StudyStatusType.Completed
            ? 0
            : this._study.metaInfo().plots.length > 0
            ? this._study.data().size()
            : this._model.mainSeries().bars().size();
        }
        isLoading() {
          return this._study.isLoading();
        }
        properties() {
          return this._study.properties();
        }
        async applyToEntireLayout() {
          const e = new p.ActionsProvider(this._chartWidget),
            t = (await e.contextMenuActionsForSources([this._study])).find(
              e => "applyStudyToEntireLayout" === e.id,
            );
          t && t.execute();
        }
      }
    },
    25682: (e, t, i) => {
      "use strict";
      i.d(t, {getStudyInputsInfo: () => r});
      var s = i(79881);
      function r(e) {
        return void 0 === e.inputs
          ? []
          : e.inputs.map(e => ({
              ...e,
              id: e.id,
              localizedName:
                void 0 !== e.name ? (0, s.t)(e.name, {context: "input"}) : "",
            }));
      }
    },
    50388: (e, t, i) => {
      "use strict";
      i.d(t, {ChartSession: () => u});
      var s = i(5729),
        r = i.n(s),
        n = i(16282),
        o = i(32856),
        a = i.n(o),
        l = i(45259),
        c = i(65447);
      const h = (0, c.getLogger)("ChartApi.AbstractSession");
      var d = i(47903);
      (0, c.getLogger)("ChartSession");
      class u extends class {
        constructor(e, t, i) {
          (this._isConnected = new (a())(!1)),
            (this._state = 0),
            (this._isConnectForbidden = !1),
            (this._sessionId = ""),
            (this._sessionIdChanged = new (r())()),
            (this._chartApi = e),
            (this._sessionPrefix = t),
            (this._shouldReconnectAfterCriticalError = i);
        }
        destroy() {
          this._logNormal("Destroying session"),
            this._isConnected.unsubscribe(),
            this.disconnect(),
            this._sessionIdChanged.destroy(),
            delete this._chartApi,
            this._logNormal("Session has been destroyed");
        }
        isConnected() {
          return this._isConnected;
        }
        sessionId() {
          return this._sessionId;
        }
        onSessionIdChanged() {
          return this._sessionIdChanged;
        }
        connect() {
          0 === this._state &&
            ((0, n.assert)(
              !this._isConnectForbidden,
              "Cannot call connect because it is forbidden at this moment",
            ),
            this._setSessionId(`${this._sessionPrefix}_${(0, l.randomHash)()}`),
            this._logNormal(
              "Connecting session - wait until transport stay connected",
            ),
            (this._state = 1),
            this._chartApi.createSession(this._sessionId, this));
        }
        disconnect() {
          0 !== this._state &&
            ((0, n.assert)(
              "" !== this._sessionId,
              "sessionId must not be invalid",
            ),
            this._logNormal("Disconnecting session..."),
            this._forbidConnectWhile(() => {
              this._chartApi.connected() && this._sendRemoveSession(),
                this._processDestroyingOnServer();
            }));
        }
        onMessage(e) {
          switch (e.method) {
            case "connected":
              return void this._onChartApiConnected();
            case "disconnected":
              return void this._onChartApiDisconnected();
            case "critical_error":
              const t = String(e.params[0]),
                i = String(e.params[1]);
              return void this._onCriticalError(t, i);
          }
          this._onMessage(e);
        }
        _getChartApi() {
          return this._chartApi;
        }
        _generateLogMessage(e) {
          return `[${this._sessionId}] ${e}`;
        }
        _onCriticalError(e, t) {
          this._logError(`Critical error. Reason=${e}, info=${t}.`),
            this._forbidConnectWhile(() => {
              this._processDestroyingOnServer();
            }),
            this._shouldReconnectAfterCriticalError
              ? (this._logNormal("Reconnecting after critical error..."),
                this.connect())
              : this._logNormal("Reconnecting after critical error skipped");
        }
        _onChartApiConnected() {
          (0, n.assert)(1 === this._state, "Session is not registered"),
            this._logNormal(
              "Transport is connected. Creating session on the server",
            ),
            this._sendCreateSession(),
            (this._state = 2),
            this._isConnected.setValue(!0);
        }
        _onChartApiDisconnected() {
          this._logNormal("Transport is disconnected. Reconnecting..."),
            this._forbidConnectWhile(() => {
              this._processDestroyingOnServer();
            }),
            this.connect();
        }
        _setSessionId(e) {
          const t = this._sessionId;
          this._logNormal(`Changing sessionId: old=${t}, new=${e}`),
            (this._sessionId = e),
            this._sessionIdChanged.fire(e, t);
        }
        _logNormal(e) {
          h.logNormal(this._generateLogMessage(e));
        }
        _logError(e) {
          h.logError(this._generateLogMessage(e));
        }
        _processDestroyingOnServer() {
          (this._state = 0),
            this._isConnected.setValue(!1),
            this._chartApi.removeSession(this._sessionId),
            this._setSessionId("");
        }
        _forbidConnectWhile(e) {
          (this._isConnectForbidden = !0), e(), (this._isConnectForbidden = !1);
        }
      } {
        constructor(e, t = !1) {
          super(e, "cs", !1),
            (this._sessionDisabled = !1),
            (this._handler = null),
            (this._criticalError = new (r())()),
            (this._disableStatistics = t);
        }
        destroy() {
          this._criticalError.destroy(),
            (this._handler = null),
            super.destroy();
        }
        serverTimeOffset() {
          return this._getChartApi().serverTimeOffset();
        }
        switchTimezone(e) {
          return this._getChartApi().switchTimezone(this.sessionId(), e);
        }
        defaultResolutions() {
          return this._getChartApi().defaultResolutions();
        }
        availableCurrencies() {
          return this._getChartApi().availableCurrencies();
        }
        availableUnits() {
          return this._getChartApi().availableUnits();
        }
        resolveSymbol(e, t, i) {
          return this._getChartApi().resolveSymbol(this.sessionId(), e, t, i);
        }
        requestFirstBarTime(e, t, i) {
          return this._getChartApi().requestFirstBarTime(
            this.sessionId(),
            e,
            t,
            i,
          );
        }
        createSeries(e, t, i, s, r, n, o) {
          return this._getChartApi().createSeries(
            this.sessionId(),
            e,
            t,
            i,
            s,
            r,
            n,
            o,
          );
        }
        modifySeries(e, t, i, s, r, n) {
          return this._getChartApi().modifySeries(
            this.sessionId(),
            e,
            t,
            i,
            s,
            r,
            n,
          );
        }
        removeSeries(e) {
          return (
            !!this.isConnected().value() &&
            this._getChartApi().removeSeries(this.sessionId(), e)
          );
        }
        requestMoreData(e, t, i) {
          return "number" == typeof e
            ? this._getChartApi().requestMoreData(this.sessionId(), e)
            : this._getChartApi().requestMoreData(this.sessionId(), e, t, i);
        }
        requestMoreTickmarks(e, t, i) {
          return (0, d.isNumber)(e)
            ? this._getChartApi().requestMoreTickmarks(this.sessionId(), e)
            : this._getChartApi().requestMoreTickmarks(
                this.sessionId(),
                e,
                t,
                i,
              );
        }
        requestMetadata(e, t) {
          (() => {
            this._getChartApi().requestMetadata(this.sessionId(), e, t);
          })();
        }
        isCanCreateStudy(e) {
          return this._getChartApi().isCanCreateStudy(e);
        }
        createStudy(e, t, i, s, r, n, o) {
          return this._getChartApi().createStudy(
            this.sessionId(),
            e,
            t,
            i,
            s,
            r,
            n,
            o,
          );
        }
        rebindStudy(e, t, i, s, r, n, o) {
          return this._getChartApi().rebindStudy(
            this.sessionId(),
            e,
            t,
            i,
            s,
            r,
            n,
            o,
          );
        }
        modifyStudy(e, t, i, s) {
          return this._getChartApi().modifyStudy(this.sessionId(), e, t, i, s);
        }
        removeStudy(e, t) {
          return this._getChartApi().removeStudy(this.sessionId(), e, t);
        }
        createPointset(e, t, i, s, r, n) {
          return this._getChartApi().createPointset(
            this.sessionId(),
            e,
            t,
            i,
            s,
            r,
            n,
          );
        }
        modifyPointset(e, t, i, s) {
          return this._getChartApi().modifyPointset(
            this.sessionId(),
            e,
            t,
            i,
            s,
          );
        }
        removePointset(e) {
          return this._getChartApi().removePointset(this.sessionId(), e);
        }
        setVisibleTimeRange(e, t, i, s, r, n) {
          this._getChartApi().setVisibleTimeRange(
            this.sessionId(),
            e,
            t,
            i,
            s,
            !0,
            r,
            n,
          );
        }
        criticalError() {
          return this._criticalError;
        }
        connect(e = null) {
          null !== e && (this._handler = e), super.connect();
        }
        setHandler(e) {
          this._handler = e;
        }
        connected() {
          return this.isConnected().value() && !this._sessionDisabled;
        }
        disable() {
          this._sessionDisabled = !0;
        }
        chartApi() {
          return this._getChartApi();
        }
        _sendCreateSession() {
          Object.keys(this).forEach(e => {
            /^(s|st|symbol_)\d+$/.test(e) && delete this[e];
          }),
            this._getChartApi().chartCreateSession(
              this.sessionId(),
              this._disableStatistics,
            );
        }
        _sendRemoveSession() {
          this._getChartApi().chartDeleteSession(this.sessionId());
        }
        _onMessage(e) {
          this._handler && this._handler(e);
        }
        _onCriticalError(e, t) {
          this._criticalError.fire(e, t), super._onCriticalError(e, t);
        }
      }
    },
    85060: (e, t, i) => {
      "use strict";
      var s = i(47903).declareClassAsPureInterface;
      function r() {}
      (TradingView.WEB_SOCKET_WAS_CONNECTED = !1),
        (r.REBIND_STUDY_STANDALONE_TO_CHILD = 1),
        (r.REBIND_STUDY_CHILD_TO_STANDALONE = 2),
        (r.prototype.defaultWatchlistSymbols = function () {}),
        (r.prototype.defaultResolutions = function () {}),
        (r.prototype.availableCurrencies = function () {}),
        (r.prototype.availableUnits = function () {}),
        (r.prototype.supportedSymbolsTypes = function () {}),
        (r.prototype.supportedExchangesList = function () {}),
        (r.prototype.symbolsGrouping = function () {}),
        (r.prototype.quoteCreateSession = function (e) {}),
        (r.prototype.quoteDeleteSession = function (e) {}),
        (r.prototype.quoteSetFields = function (e, t) {}),
        (r.prototype.quoteAddSymbols = function (e, t) {}),
        (r.prototype.quoteRemoveSymbols = function (e, t) {}),
        (r.prototype.quoteFastSymbols = function (e, t) {}),
        (r.prototype.depthCreateSession = function (e, t, i) {}),
        (r.prototype.depthDeleteSession = function (e) {}),
        (r.prototype.depthSetSymbol = function (e, t) {}),
        (r.prototype.depthClearSymbol = function (e) {}),
        (r.prototype.depthSetScale = function (e, t) {}),
        (r.prototype.chartCreateSession = function (e, t) {}),
        (r.prototype.chartDeleteSession = function (e) {}),
        (r.prototype.createSession = function (e, t) {}),
        (r.prototype.removeSession = function (e) {}),
        (r.prototype.connected = function () {}),
        (r.prototype.connect = function () {}),
        (r.prototype.disconnect = function () {}),
        (r.prototype.switchTimezone = function (e, t) {}),
        (r.prototype.resolveSymbol = function (e, t, i, s) {}),
        (r.prototype.createSeries = function (e, t, i, s, r, n, o, a) {}),
        (r.prototype.removeSeries = function (e, t, i) {}),
        (r.prototype.modifySeries = function (e, t, i, s, r, n, o) {}),
        (r.prototype.requestMoreData = function (e, t, i, s) {}),
        (r.prototype.requestMetadata = function (e, t, i) {}),
        (r.prototype.isCanCreateStudy = function (e, t) {}),
        (r.prototype.createStudy = function (e, t, i, s, r, n, o) {}),
        (r.prototype.rebindStudy = function (e, t, i, s, r, n, o, a) {}),
        (r.prototype.removeStudy = function (e, t, i) {}),
        (r.prototype.modifyStudy = function (e, t, i, s, r) {}),
        (r.prototype.createPointset = function (e, t, i, s, r, n, o) {}),
        (r.prototype.modifyPointset = function (e, t, i, s, r) {}),
        (r.prototype.removePointset = function (e, t, i) {}),
        (r.prototype.requestMoreTickmarks = function (e, t, i, s) {}),
        (r.prototype.requestFirstBarTime = function (e, t, i, s) {}),
        (r.prototype._invokeHandler = function (e, t) {}),
        (r.prototype._sendRequest = function (e, t) {}),
        (r.prototype._onMessage = function (e) {}),
        (r.prototype._dispatchNotification = function (e) {}),
        (r.prototype._invokeNotificationHandler = function (e, t, i) {}),
        (r.prototype._notifySessions = function (e) {}),
        (r.prototype.unpack = function (e) {}),
        (r.prototype.searchSymbols = function (
          e,
          t,
          i,
          s,
          r,
          n,
          o,
          a,
          l,
          c,
        ) {}),
        (r.prototype.serverTimeOffset = function () {}),
        (r.prototype.getMarks = function (e, t, i, s, r) {}),
        (r.prototype.getTimescaleMarks = function (e, t, i, s, r) {}),
        s(r, "ChartApiInterface"),
        (e.exports.HandlerInfo = function (e, t) {
          (this.handler = e), (this.customId = t);
        }),
        (e.exports.ChartApiInterface = r);
    },
    15755: (e, t, i) => {
      "use strict";
      i.r(t),
        i.d(t, {
          setCustomAdapter: () => _,
          initialize: () => m,
          updateUser: () => g,
          getChartsCount: () => f,
          getCharts: () => v,
          removeChart: () => S,
          saveChart: () => y,
          getChartContent: () => b,
          loadChart: () => w,
          removeStudyTemplate: () => P,
          getStudyTemplateContent: () => C,
          saveStudyTemplate: () => T,
          getStudyTemplatesList: () => x,
          invalidateStudyTemplatesList: () => I,
          getStudyTemplateContentById: () => M,
          getStandardStudyTemplateContentById: () => L,
          removeStudyTemplateById: () => A,
          renameStudyTemplate: () => k,
          replaceStudyTemplate: () => E,
          getDrawingTemplates: () => D,
          loadDrawingTemplate: () => V,
          removeDrawingTemplate: () => B,
          saveDrawingTemplate: () => N,
        });
      var s = i(18437),
        r = i(65447),
        n = i(97849);
      const o = (0, r.getLogger)("Chart.SaveloadAdapter.Library");
      let a,
        l,
        c,
        h,
        d = null,
        u = null;
      function p(e) {
        return `${c}/${encodeURIComponent(h)}/${e}?client=${encodeURIComponent(
          a,
        )}&user=${encodeURIComponent(l)}`;
      }
      function _(e) {
        d = e;
      }
      function m(e, t, i, s) {
        (a = e), (l = t), (c = i), (h = s);
      }
      function g(e) {
        l = e;
      }
      function f(e, t) {
        throw new Error("Not implemented");
      }
      async function v() {
        const e = e =>
          e.map(e => ({
            id: e.id,
            name: e.name,
            image_url: String(e.id),
            modified_iso: e.timestamp,
            short_symbol: e.symbol,
            interval: e.resolution,
          }));
        if (d) return d.getAllCharts().then(e);
        try {
          const t = await fetch("" + p("charts"), {credentials: "same-origin"});
          if (!t.ok)
            throw new Error(
              `Getting chart content response was not OK. Status: ${t.status}.`,
            );
          const i = await t.json();
          if ("ok" !== i.status)
            throw new Error("Get chart content request failed: " + i.message);
          return e(i.data);
        } catch (e) {
          throw (o.logWarn((0, n.errorToString)(e)), e);
        }
      }
      async function S(e) {
        if (d) d.removeChart(e);
        else
          try {
            const t = await fetch(
              `${p("charts")}&chart=${encodeURIComponent(e)}`,
              {method: "DELETE", credentials: "same-origin"},
            );
            if (!t.ok)
              throw new Error(
                `Remove chart response was not OK. Status: ${t.status}.`,
              );
            const i = await t.json();
            if ("ok" !== i.status)
              throw new Error(
                "Remove drawing template request failed: " + i.message,
              );
          } catch (e) {
            throw (o.logWarn((0, n.errorToString)(e)), e);
          }
      }
      async function y(e, t, i, s, r) {
        const a = r.id.value(),
          l = {name: e, content: JSON.stringify(s), symbol: t, resolution: i};
        if (d) return d.saveChart({...l, id: a});
        try {
          const e = new FormData();
          for (const t in l) e.append(t, l[t]);
          let t = p("charts");
          null != a && (t += "&chart=" + encodeURIComponent(a));
          const i = await fetch(t, {
            credentials: "same-origin",
            method: "POST",
            body: e,
          });
          if (!i.ok)
            throw new Error(
              `Saving chart content response was not OK. Status: ${i.status}.`,
            );
          const s = await i.json();
          if ("ok" !== s.status)
            throw new Error(
              "Saving chart content request failed: " + s.message,
            );
          return s.id.toString();
        } catch (e) {
          throw (o.logWarn((0, n.errorToString)(e)), e);
        }
      }
      async function b(e) {
        const t = t => {
          const i = JSON.parse(t);
          return (i.uid = e.id), i;
        };
        if (d) return d.getChartContent(e.id).then(e => t(e));
        try {
          const i = await fetch(
            `${p("charts")}&chart=${encodeURIComponent(e.id)}`,
            {credentials: "same-origin"},
          );
          if (!i.ok)
            throw new Error(
              `Getting chart content response was not OK. Status: ${i.status}.`,
            );
          const s = await i.json();
          if ("ok" !== s.status)
            throw new Error("Get chart content request failed: " + s.message);
          return t(s.data.content);
        } catch (e) {
          throw (o.logWarn((0, n.errorToString)(e)), e);
        }
      }
      function w(e) {
        b(e).then(
          e => {
            s.emit("chart_load_requested", e);
          },
          () => {
            o.logWarn("Error loading chart");
          },
        );
      }
      async function P(e) {
        try {
          if (d) return d.removeStudyTemplate({name: e});
          const t = await fetch(
            `${p("study_templates")}&template=${encodeURIComponent(e)}`,
            {method: "DELETE", credentials: "same-origin"},
          );
          if (!t.ok)
            throw new Error(
              `Remove study template response was not OK. Status: ${t.status}.`,
            );
          const i = await t.json();
          if ("ok" !== i.status)
            throw new Error(
              "Remove study template request failed: " + i.message,
            );
        } catch (e) {
          throw (o.logWarn((0, n.errorToString)(e)), e);
        }
      }
      async function C(e) {
        try {
          if (d) {
            return {content: await d.getStudyTemplateContent({name: e})};
          }
          const t = await fetch(
            `${p("study_templates")}&template=${encodeURIComponent(e)}`,
            {credentials: "same-origin"},
          );
          if (!t.ok)
            throw new Error(
              `Get study template response was not OK. Status: ${t.status}.`,
            );
          const i = await t.json();
          if ("ok" !== i.status)
            throw new Error("Get study template request failed: " + i.message);
          return i.data;
        } catch (e) {
          throw (o.logWarn((0, n.errorToString)(e)), e);
        }
      }
      async function T(e) {
        try {
          if (d)
            return d
              .saveStudyTemplate(e)
              .then(() => ({error: ""}))
              .catch(e => ({
                error: null != e ? (0, n.errorToString)(e) : "error",
              }));
          const t = new FormData();
          t.append("name", e.name), t.append("content", e.content);
          const i = await fetch(p("study_templates"), {
            method: "POST",
            body: t,
            credentials: "same-origin",
          });
          if (!i.ok)
            throw new Error(
              `Save study template response was not OK. Status: ${i.status}.`,
            );
          const s = await i.json();
          return {error: "ok" === s.status ? "" : s.status};
        } catch (e) {
          throw (o.logWarn((0, n.errorToString)(e)), e);
        }
      }
      async function x() {
        try {
          if (u) return u;
          u = [];
          const e = e => (
            (u = e.map(e => ({is_default: !1, name: e.name}))), u
          );
          if (d) return d.getAllStudyTemplates().then(e);
          const t = await fetch(p("study_templates"), {
            method: "GET",
            credentials: "same-origin",
          });
          if (!t.ok)
            throw new Error(
              `Study templates list response was not OK. Status: ${t.status}.`,
            );
          const i = await t.json();
          if ("ok" !== i.status)
            throw new Error(
              "Study templates list request failed: " + i.message,
            );
          return e(i.data);
        } catch (e) {
          throw (o.logWarn((0, n.errorToString)(e)), e);
        }
      }
      function I() {
        u = null;
      }
      function M(e, t) {
        throw new Error("Not implemented");
      }
      function L(e, t) {
        throw new Error("Not implemented");
      }
      function A(e, t) {
        throw new Error("Not implemented");
      }
      function k(e, t, i) {
        throw new Error("Not implemented");
      }
      function E(e, t, i) {
        throw new Error("Not implemented");
      }
      async function D(e) {
        throw new Error("Not implemented");
      }
      async function V(e, t) {
        throw new Error("Not implemented");
      }
      async function B(e, t) {
        throw new Error("Not implemented");
      }
      async function N(e, t, i) {
        throw new Error("Not implemented");
      }
    },
    68606: (e, t, i) => {
      "use strict";
      var s = i(16282).ensureNotNull,
        r = i(42062),
        n = i(35001).Interval,
        o = i(20291),
        a = i(98779),
        l = i(85060),
        c = l.ChartApiInterface,
        h = l.HandlerInfo,
        d = i(47903).requireFullInterfaceImplementation,
        u = i(65447).getLogger("Chart.ChartApiLocal"),
        p = i(89077).TIMEFRAMETYPE,
        _ = i(63059).createDwmAligner;
      (TradingView.STUDY_COUNT_LIMIT = 210),
        (JSServer.ChartApi = function (e) {
          (this._notificationHandlers = {}),
            (this._sessions = {}),
            (this.studyCounter = 0),
            (this._connected = !1),
            (this._enabled = !1),
            (this._studyEngine = new o(e)),
            (this._callbacks = {}),
            (this._serverTimeOffset = 0);
          var t = this;
          this._studyEngine.on("configuration_received", function () {
            t._fireEvent("configuration_received");
          }),
            this._studyEngine.on("realtime_tick", function (e) {
              var i = {
                time: e.value[0] / 1e3,
                open: e.value[1],
                high: e.value[2],
                low: e.value[3],
                close: e.value[4],
                volume: e.value[5],
              };
              t._fireEvent("realtime_tick", i, !0);
            }),
            (this._setVisibleRangeTimeout = {});
        }),
        (JSServer.ChartApi.prototype.destroy = function () {
          this._studyEngine.destroy(), (this._studyEngine = null);
        }),
        (JSServer.ChartApi.prototype.purgeCache = function (e) {
          this._studyEngine.purgeCache(), this._studyEngine.purgeDataCache();
        }),
        (JSServer.ChartApi.prototype.defaultWatchlistSymbols = function () {
          return this._watchlistSettings.default_symbols;
        }),
        (JSServer.ChartApi.prototype.defaultResolutions = function () {
          return (
            this._studyEngine.supportedResolutions() || [
              "1",
              "3",
              "5",
              "15",
              "30",
              "45",
              "60",
              "120",
              "180",
              "240",
              "1D",
              "1W",
              "1M",
            ]
          );
        }),
        (JSServer.ChartApi.prototype.availableCurrencies = function () {
          var e = this._studyEngine.supportedCurrencies().map(function (e) {
            return "string" == typeof e ? {id: e, code: e} : e;
          });
          return Promise.resolve(e);
        }),
        (JSServer.ChartApi.prototype.availableUnits = function () {
          return Promise.resolve(this._studyEngine.supportedUnits());
        }),
        (JSServer.ChartApi.prototype.supportedSymbolsTypes = function () {
          return this._studyEngine.supportedSymbolsTypes();
        }),
        (JSServer.ChartApi.prototype.supportedExchangesList = function () {
          return this._studyEngine.supportedExchangesList();
        }),
        (JSServer.ChartApi.prototype.symbolsGrouping = function () {
          return this._studyEngine.symbolsGrouping();
        }),
        (JSServer.ChartApi.prototype.start = function () {
          (this._enabled = !0), this._fireEvent("start_enabled");
        }),
        (JSServer.ChartApi.prototype.unsubscribe = function (e, t) {
          var i = this._callbacks[e];
          i && i.splice(i.indexOf(t), 1);
        }),
        (JSServer.ChartApi.prototype.on = function (e, t) {
          return (
            this._callbacks.hasOwnProperty(e) || (this._callbacks[e] = []),
            this._callbacks[e].push(t),
            this
          );
        }),
        (JSServer.ChartApi.prototype._fireEvent = function (e, t, i) {
          if (this._callbacks.hasOwnProperty(e)) {
            var s = this._callbacks[e].slice(0);
            i || (this._callbacks[e] = []);
            for (var r = 0; r < s.length; ++r) s[r](t);
          }
        }),
        (JSServer.ChartApi.prototype.chartCreateSession = function (e, t) {
          this._studyEngine.chartCreateSession(e);
        }),
        (JSServer.ChartApi.prototype.chartDeleteSession = function (e) {
          this._studyEngine.chartDeleteSession(e);
        }),
        (JSServer.ChartApi.prototype.createSession = function (e, t) {
          (TradingView.ChartapiMessagerInstances[e] = new a(this, e)),
            (this._sessions[e] = t),
            (this._notificationHandlers[e] = {}),
            this.connected() && t.onMessage({method: "connected", params: []});
        }),
        (JSServer.ChartApi.prototype.removeSession = function (e) {
          delete this._sessions[e],
            delete this._notificationHandlers[e],
            this._studyEngine.stopSources(e);
        }),
        (JSServer.ChartApi.prototype.connected = function () {
          return this._connected;
        }),
        (JSServer.ChartApi.prototype.connect = function () {
          if (this._enabled)
            this.connected() ||
              ((this._connected = !0),
              (this.sessionid = "dummy session id"),
              this._notifySessions({method: "connected", params: []}));
          else {
            var e = this;
            this.on("start_enabled", function () {
              e.connect();
            });
          }
        }),
        (JSServer.ChartApi.prototype.disconnect = function () {
          (this._connected = !1),
            this._notifySessions({method: "disconnected", params: []}),
            this.purgeCache(),
            (this.studyCounter = 0);
        }),
        (JSServer.ChartApi.prototype.switchTimezone = function (e, t) {
          this._studyEngine.switchTimezone(e, t);
        }),
        (JSServer.ChartApi.prototype.receiveLocalResponse = function (e) {
          this._dispatchNotification(e),
            this._fireEvent("message_" + e.method, void 0, !0);
        }),
        (JSServer.ChartApi.prototype.getMarks = function (e, t, i, s, r) {
          this._studyEngine.getMarks(e, t, i, s, r);
        }),
        (JSServer.ChartApi.prototype.getTimescaleMarks = function (
          e,
          t,
          i,
          s,
          r,
        ) {
          this._studyEngine.getTimescaleMarks(e, t, i, s, r);
        }),
        (JSServer.ChartApi.prototype.resolveSymbol = function (e, t, i, s) {
          (this._notificationHandlers[e][t] = new h(s, t)),
            this._studyEngine.resolveSymbol(e, t, i);
        }),
        (JSServer.ChartApi.prototype._doWhenSeriesDataReceived = function (
          e,
          t,
        ) {
          TradingView.ChartapiMessagerInstances[e].seriesCompleted.subscribe(
            null,
            t,
            !0,
          );
        }),
        (JSServer.ChartApi.prototype.createSeries = function (
          e,
          t,
          i,
          s,
          r,
          n,
          o,
          a,
        ) {
          var l = this;
          (this._notificationHandlers[e][t] = new h(function (r) {
            "series_completed" === r.method &&
              null !== o &&
              (l._applyTimeFrame(e, s, t, i, o), (o = null)),
              a(r);
          }, t)),
            this._studyEngine.createSeries(e, t, i, s, r, {
              countBack: n || 300,
            });
        }),
        (JSServer.ChartApi.prototype.removeSeries = function (e, t) {
          delete this._notificationHandlers[e][t],
            this._studyEngine.removeSeries(e, t);
        }),
        (JSServer.ChartApi.prototype.setVisibleTimeRange = function (
          e,
          t,
          i,
          r,
          n,
          o,
          a,
          l,
        ) {
          var c = r,
            h =
              !0 !== (a = a || {}).applyDefaultRightMargin &&
              void 0 === a.percentRightMargin &&
              void 0 !== n
                ? n
                : null,
            d = _(
              this._studyEngine.getSeriesInterval(e, t),
              this._studyEngine.getSeriesSymbolInfo(e, t),
            );
          null !== d &&
            ((c = d.timeToSessionStart(1e3 * c) / 1e3),
            null !== h && (h = d.timeToSessionStart(1e3 * h) / 1e3));
          var u = this;
          function p() {
            var r = u._studyEngine.sessionTimeScale(e);
            if (null !== r) {
              var n,
                d = r.indexOfTime(1e3 * c);
              if (null === h) n = r.lastSessionBarIndex();
              else {
                var p = r.indexOfTime(1e3 * h);
                n = p && p.index;
              }
              if (null !== d && null !== n) {
                var _ = d.index;
                if ((d.timeMs < 1e3 * c && (_ += 1), !1 === o)) {
                  const e = s(r.firstSessionBarIndex());
                  _ < e && (_ = e);
                }
                _ > n ||
                  (TradingView.ChartapiMessagerInstances[
                    e
                  ].onSeriesTimeframeUpdate(t, i, _, n, a),
                  l && setTimeout(l, 0));
              }
            }
          }
          if (this._studyEngine.isTimeScaleExtendedTo(e, 1e3 * r)) p();
          else {
            var m = TradingView.ChartapiMessagerInstances[e].seriesCompleted,
              g = TradingView.ChartapiMessagerInstances[e].seriesError;
            void 0 !== this._setVisibleRangeTimeout[e] &&
              clearTimeout(this._setVisibleRangeTimeout[e]),
              (this._setVisibleRangeTimeout[e] = setTimeout(
                function () {
                  delete this._setVisibleRangeTimeout[e],
                    m.subscribe(null, f, !0),
                    g.subscribe(null, v, !0),
                    this._studyEngine.ensureExtendedTo(t, e, 1e3 * r);
                }.bind(this),
                0,
              ));
          }
          function f(e, s) {
            e === t &&
              s === i &&
              (m.unsubscribe(null, f), g.unsubscribe(null, v), p());
          }
          function v(e, s) {
            e === t && s === i && m.unsubscribe(null, f);
          }
        }),
        (JSServer.ChartApi.prototype._applyTimeFrame = function (
          e,
          t,
          i,
          s,
          o,
        ) {
          var a,
            l,
            c = {},
            h = !0;
          if (o.type === p.PeriodBack) {
            var d = this._studyEngine.getSeriesLastBarTime(e, i);
            if (null === d) return;
            l = d / 1e3;
            var u = n.parse(o.value),
              m = this._studyEngine.getSeriesSymbolInfo(e, i);
            a =
              r.alignPeriodsBackForVisibleRange(
                m.session,
                m.session_holidays,
                m.corrections,
                u.letter(),
                u.multiplier(),
                1,
                d,
              ) / 1e3;
            var g = _(this._studyEngine.getSeriesInterval(e, i), m);
            null !== g &&
              ((l = g.timeToExchangeTradingDay(1e3 * l) / 1e3),
              (a = g.timeToExchangeTradingDay(1e3 * a) / 1e3)),
              (c = {applyDefaultRightMargin: !0}),
              (h = !1);
          } else (a = o.from), (l = o.to);
          this.setVisibleTimeRange(e, i, s, a, l, h, c);
        }),
        (JSServer.ChartApi.prototype.modifySeries = function (
          e,
          t,
          i,
          s,
          r,
          n,
          o,
        ) {
          var a = this;
          (this._notificationHandlers[e][t] = new h(function (r) {
            "series_completed" === r.method &&
              null !== n &&
              (a._applyTimeFrame(e, s, t, i, n), (n = null)),
              o(r);
          }, t)),
            this._studyEngine.modifySeries(e, t, s, r, i);
        }),
        (JSServer.ChartApi.prototype.requestMoreData = function (e, t) {
          this._studyEngine.extendSeriesRange(e, t);
        }),
        (JSServer.ChartApi.prototype.setStudiesAccessController = function (e) {
          this.studiesAccessController = e;
        }),
        (JSServer.ChartApi.prototype.setWatchlistSettings = function (e) {
          this._watchlistSettings = e;
        }),
        (JSServer.ChartApi.prototype.allStudiesMetadata = function () {
          return this._studyEngine.studiesMetadata();
        }),
        (JSServer.ChartApi.prototype.requestMetadata = function (e, t, i) {
          this._notificationHandlers[e][t] = new h(i, t);
          var s = this.studiesAccessController.getEnabledTools();
          TradingView.ChartapiMessagerInstances[e].onRequestMetadata(t, s);
        }),
        (JSServer.ChartApi.prototype.isCanCreateStudy = function () {
          return this.studyCounter < TradingView.STUDY_COUNT_LIMIT;
        }),
        (JSServer.ChartApi.prototype.createStudy = function (
          e,
          t,
          i,
          s,
          r,
          n,
          o,
        ) {
          if (!this.isCanCreateStudy())
            throw new Error("Exceeded the limit of studies");
          (this._notificationHandlers[e][t] = new h(o, t)),
            this._studyEngine.createStudy(e, t, s, i, r, n),
            this.studyCounter++;
        }),
        (JSServer.ChartApi.prototype.rebindStudy = function (
          e,
          t,
          i,
          s,
          r,
          n,
          o,
          a,
        ) {
          throw new Error("Not implemented");
        }),
        (JSServer.ChartApi.prototype.removeStudy = function (e, t, i) {
          delete this._notificationHandlers[e][t],
            this._studyEngine.removeStudy(e, t),
            this.studyCounter--;
        }),
        (JSServer.ChartApi.prototype.modifyStudy = function (e, t, i, s, r) {
          (this._notificationHandlers[e][t] = new h(r, t)),
            this._studyEngine.modifyStudy(e, t, i, s);
        }),
        (JSServer.ChartApi.prototype.createPointset = function (
          e,
          t,
          i,
          s,
          r,
          n,
          o,
        ) {
          (this._notificationHandlers[e][t] = new h(o, t)),
            this._studyEngine.createPointset(e, t, s, r, n);
        }),
        (JSServer.ChartApi.prototype.modifyPointset = function (e, t, i, s, r) {
          throw Error("This call is not implemented");
        }),
        (JSServer.ChartApi.prototype.removePointset = function (e, t, i) {
          (this._notificationHandlers[e][t] = null),
            this._studyEngine.removePointset(e, t);
        }),
        (JSServer.ChartApi.prototype.requestMoreTickmarks = function (e, t) {
          this._studyEngine.requestMoreTickmarks(e, t);
        }),
        (JSServer.ChartApi.prototype.requestFirstBarTime = function (
          e,
          t,
          i,
          s,
        ) {
          this._notificationHandlers[e][t] = new h(s, t);
        }),
        (JSServer.ChartApi.prototype._invokeHandler = function (e, t) {
          e && e(t);
        }),
        (JSServer.ChartApi.prototype._sendRequest = function (e, t) {
          throw Error("This method is not implemented");
        }),
        (JSServer.ChartApi.prototype._onMessage = function (e) {
          throw Error("This method is not implemented");
        }),
        (JSServer.ChartApi.prototype._dispatchNotification = function (e) {
          var t = e.params.shift();
          if (this._notificationHandlers[t])
            switch (e.method) {
              case "timescale_update":
                var i = e.params[0],
                  s = e.params[1];
                for (var r in ((s.clear =
                  0 === s.changes.length && 0 === s.marks.length),
                this._sessions[t].onMessage({
                  method: "timescale_update",
                  params: s,
                }),
                i)) {
                  var n = {
                    method: "data_update",
                    params: {
                      customId: r,
                      plots: i[r].series,
                      nonseries: i[r].nonseries,
                      turnaround: i[r].turnaround,
                    },
                  };
                  this._invokeNotificationHandler(t, r, n);
                }
                break;
              case "tickmark_update":
                this._sessions[t].onMessage({
                  method: "timescale_update",
                  params: e.params[0],
                });
                break;
              case "data_update":
                for (var r in e.params[0]) {
                  var o = e.params[0][r];
                  n = {
                    method: "data_update",
                    params: {
                      customId: r,
                      plots: o.series ? o.series : o.plots,
                      nonseries: o.nonseries,
                      turnaround: o.turnaround,
                    },
                  };
                  this._invokeNotificationHandler(t, r, n);
                }
                break;
              case "index_update":
                for (var r in e.params[0]) {
                  n = {method: "index_update", params: e.params[0][r]};
                  this._invokeNotificationHandler(t, r, n);
                }
                break;
              case "critical_error":
                u.logNormal(
                  new Date() +
                    " critical_error session:" +
                    this.sessionid +
                    " reason:" +
                    e.params[0],
                ),
                  this._sessions[t].onMessage({
                    method: "critical_error",
                    params: e.params,
                  });
                break;
              case "timescale_completed":
              case "quote_symbol_data":
              case "quote_list_fields":
              case "depth_symbol_error":
              case "depth_symbol_success":
              case "dd":
              case "dpu":
              case "depth_bar_last_value":
                this._sessions[t].onMessage({
                  method: e.method,
                  params: e.params,
                });
                break;
              case "clear_data":
                for (var a in e.params[0])
                  this._invokeNotificationHandler(t, a, {
                    method: "clear_data",
                    params: e.params[0][a],
                  });
                break;
              default:
                var l = e.params[0];
                this._invokeNotificationHandler(t, l, e);
            }
        }),
        (JSServer.ChartApi.prototype._invokeNotificationHandler = function (
          e,
          t,
          i,
        ) {
          if (void 0 !== t) {
            var s = this._notificationHandlers[e][t];
            void 0 !== s && s && this._invokeHandler(s.handler, i);
          }
        }),
        (JSServer.ChartApi.prototype.searchSymbols = function (
          e,
          t,
          i,
          s,
          r,
          n,
          o,
          a,
          l,
          c,
        ) {
          this._studyEngine.searchSymbols(e, t, i, c);
        }),
        (JSServer.ChartApi.prototype._notifySessions = function (e) {
          for (var t in this._sessions) {
            if (!this._sessions.hasOwnProperty(t)) return;
            var i = this._sessions[t];
            "function" == typeof i.onMessage && i.onMessage(e);
          }
        }),
        (JSServer.ChartApi.prototype.unpack = function (e) {
          throw Error("This method is not implemented");
        }),
        (JSServer.ChartApi.prototype.quoteCreateSession = function (e) {
          return this._studyEngine.quoteCreateSession(e);
        }),
        (JSServer.ChartApi.prototype.quoteDeleteSession = function (e) {
          return this._studyEngine.quoteDeleteSession(e);
        }),
        (JSServer.ChartApi.prototype.quoteSetFields = function (e, t) {
          return this._studyEngine.quoteSetFields(e, t);
        }),
        (JSServer.ChartApi.prototype.quoteAddSymbols = function (e, t) {
          return (
            -1 !== t.indexOf(void 0) &&
              (console.warn("Got undefined in quoteAddSymbols"),
              (t = t.filter(function (e) {
                return !!e;
              }))),
            this._studyEngine.quoteAddSymbols(e, t)
          );
        }),
        (JSServer.ChartApi.prototype.quoteRemoveSymbols = function (e, t) {
          return this._studyEngine.quoteRemoveSymbols(e, t);
        }),
        (JSServer.ChartApi.prototype.quoteFastSymbols = function (e, t) {
          return this._studyEngine.quoteFastSymbols(e, t);
        }),
        (JSServer.ChartApi.prototype.quoteHibernateAll = function (e) {
          return this._studyEngine.quoteHibernateAll(e);
        }),
        (JSServer.ChartApi.prototype.depthCreateSession = function (e) {
          return this._studyEngine.depthCreateSession(e);
        }),
        (JSServer.ChartApi.prototype.depthDeleteSession = function (e) {
          return this._studyEngine.depthDeleteSession(e);
        }),
        (JSServer.ChartApi.prototype.depthSetSymbol = function (e, t) {
          return this._studyEngine.depthSetSymbol(e, t);
        }),
        (JSServer.ChartApi.prototype.depthClearSymbol = function (e) {}),
        (JSServer.ChartApi.prototype.depthSetScale = function (e, t) {}),
        (JSServer.ChartApi.prototype.createStudiesAccessController = function (
          e,
          t,
          i,
        ) {
          return new this.StudiesAccessController(
            this._studyEngine,
            (e && JSON.parse(e)) || {type: "black", tools: []},
          );
        }),
        (JSServer.ChartApi.prototype.StudiesAccessController = function (e, t) {
          (this._studyEngine = e), (this._studiesAccess = t);
        }),
        (JSServer.ChartApi.prototype.StudiesAccessController.prototype._findTool =
          function (e) {
            for (
              var t = null, i = 0;
              i < this._studiesAccess.tools.length;
              ++i
            ) {
              var s = this._studiesAccess.tools[i];
              if (s.name === e || s === e) {
                t = s;
                break;
              }
            }
            return t;
          }),
        (JSServer.ChartApi.prototype.StudiesAccessController.prototype.getEnabledTools =
          function () {
            return this._studyEngine.studiesMetadata().filter(function (e) {
              return this.isToolEnabled(e.description) || e.is_hidden_study;
            }, this);
          }),
        (JSServer.ChartApi.prototype.StudiesAccessController.prototype.isToolEnabled =
          function (e) {
            var t = this._findTool(e);
            return "black" === this._studiesAccess.type ? !t || t.grayed : !!t;
          }),
        (JSServer.ChartApi.prototype.StudiesAccessController.prototype.isToolGrayed =
          function (e) {
            var t = this._findTool(e);
            return t && t.grayed;
          }),
        (JSServer.ChartApi.prototype.serverTimeOffset = function () {
          return this._studyEngine.serverTimeOffset();
        }),
        (JSServer.ChartApi.prototype.serverTime = function () {
          return this._studyEngine.serverTime();
        }),
        (JSServer.ChartApi.prototype.disconnectCount = function () {
          return 0;
        }),
        d(JSServer.ChartApi, "JSServer.ChartApi", c, "ChartApiInterface"),
        (e.exports = JSServer.ChartApi);
    },
    98779: (e, t, i) => {
      "use strict";
      var s = i(5729),
        r = function (e, t) {
          (this._server = e),
            (this._session = t),
            (this.seriesCompleted = new s()),
            (this.seriesError = new s());
        };
      (r.prototype.onRequestMetadata = function (e, t) {
        this._server.receiveLocalResponse({
          method: "studies_metadata",
          params: [
            this._session,
            e,
            {errors: [], hash: "", metainfo: t, migrations: []},
          ],
        });
      }),
        (r.prototype.onSymbolResolved = function (e, t) {
          this._server.receiveLocalResponse({
            method: "symbol_resolved",
            params: [this._session, e, t],
          });
        }),
        (r.prototype.onSymbolError = function (e, t) {
          this._server.receiveLocalResponse({
            method: "symbol_error",
            params: [this._session, e, t],
          });
        }),
        (r.prototype.onStudyError = function (e, t, i) {
          this._server.receiveLocalResponse({
            method: "study_error",
            params: [this._session, e, t, i],
          });
        }),
        (r.prototype.onSeriesLoading = function (e, t) {
          this._server.receiveLocalResponse({
            method: "series_loading",
            params: [this._session, e, t],
          });
        }),
        (r.prototype.onSeriesCompleted = function (e, t, i) {
          this._server.receiveLocalResponse({
            method: "series_completed",
            params: [this._session, e, i, t],
          }),
            this.seriesCompleted.fire(e, t);
        }),
        (r.prototype.onSeriesError = function (e, t, i) {
          this._server.receiveLocalResponse({
            method: "series_error",
            params: [this._session, e, t, i],
          }),
            this.seriesError.fire(e, t);
        }),
        (r.prototype.onStudyCompleted = function (e, t) {
          this._server.receiveLocalResponse({
            method: "study_completed",
            params: [this._session, e, t],
          });
        }),
        (r.prototype.onStudyLoading = function (e, t) {
          this._server.receiveLocalResponse({
            method: "study_loading",
            params: [this._session, e, t],
          });
        }),
        (r.prototype.onTickmarksUpdated = function (e, t) {
          var i = {
            method: "tickmark_update",
            params: [
              this._session,
              {index: e, zoffset: 0, changes: [], marks: t, index_diff: []},
            ],
          };
          this._server.receiveLocalResponse(i);
        }),
        (r.prototype.onTimescaleUpdate = function (e, t) {
          var i = {
            method: "timescale_update",
            params: [
              this._session,
              this._prepareDataUpdateObjects(t),
              {
                index: e.pointsIndex,
                zoffset: 0,
                changes: e.points,
                marks: e.marks,
                index_diff: e.indexChange,
                baseIndex: e.baseIndex,
              },
            ],
          };
          this._server.receiveLocalResponse(i);
        }),
        (r.prototype.onTimescaleCompleted = function (e) {
          this._server.receiveLocalResponse({
            method: "timescale_completed",
            params: [this._session, e],
          });
        }),
        (r.prototype.onSeriesTimeframeUpdate = function (e, t, i, s, r) {
          var n = {
            method: "series_timeframe",
            params: [this._session, e, t, i, s, null, !0, r],
          };
          this._server.receiveLocalResponse(n);
        }),
        (r.prototype.onPointsetDataUpdate = function (e, t, i) {
          this.onDataUpdate(e, t, i, null);
        }),
        (r.prototype._prepareDataUpdateObjects = function (e) {
          var t = {};
          return (
            e.forEach(function (e) {
              (t[e.objId] = {series: e.data, turnaround: e.turnaround}),
                e.nonSeriesData &&
                  (e.nonSeriesData.data
                    ? (t[e.objId].nonseries = {
                        d: JSON.stringify(e.nonSeriesData.data),
                        indexes: e.nonSeriesData.indexes,
                      })
                    : (t[e.objId].nonseries = {d: "", indexes: []}));
            }),
            t
          );
        }),
        (r.prototype.onDataUpdate = function (e, t, i, s) {
          var r = {
            method: "data_update",
            params: [
              this._session,
              this._prepareDataUpdateObjects([
                {objId: e, turnaround: t, data: i, nonSeriesData: s},
              ]),
            ],
          };
          this._server.receiveLocalResponse(r);
        }),
        (r.prototype.onQuotesData = function (e) {
          this._server.receiveLocalResponse({
            method: "quote_symbol_data",
            params: e,
          });
        }),
        (r.prototype.onDepthData = function (e) {
          this._server.receiveLocalResponse({method: "dd", params: e});
        }),
        (r.prototype.onDepthUpdate = function (e) {
          this._server.receiveLocalResponse({method: "dpu", params: e});
        }),
        (r.prototype.onClearData = function (e) {
          this._server.receiveLocalResponse({
            method: "clear_data",
            params: [this._session, e],
          });
        }),
        (TradingView.ChartapiMessagerInstances = []),
        (e.exports = r);
    },
    10706: (e, t, i) => {
      "use strict";
      i.d(t, {DatafeedRequestsCachedProcessor: () => _});
      var s = i(16282),
        r = i(35001),
        n = i(49382),
        o = i(77392),
        a = i(27490),
        l = i(42062),
        c = i(63059),
        h = i(12125);
      i(95068);
      function d(e, t) {
        return (
          e.ticker +
          (e.currency_code ? "_#_" + e.currency_code : "") +
          (e.unit_id ? "_#_" + e.unit_id : "") +
          "_#_" +
          t
        );
      }
      function u(e) {
        return new Date(e).toISOString();
      }
      class p {
        constructor(e, t, i, s, n, o) {
          (this._cache = {bars: []}),
            (this._nextSubscriptionId = 0),
            (this._pendingSubscribers = []),
            (this._subscribers = []),
            (this._requesting = !1),
            (this._leftDate = null),
            (this._nextTime = null),
            (this._realtimeOn = !1),
            (this._endOfData = !1),
            (this._resetCacheTimeout = null),
            (this._errorMessage = null),
            (this._destroyed = !1),
            (this._emptyResponsesCount = 0),
            (this._datafeed = e),
            (this._symbolInfo = t),
            (this._interval = r.Interval.parse(i)),
            (this._resolution = this._interval.value()),
            (this._dwmAligner = n),
            (this._serverTimeOffsetGetter = s),
            (this._resetCacheTimePeriod = void 0 === o ? 1e4 : o),
            (this._sessionSpec = new h.SessionSpec(
              t.timezone,
              t.session,
              t.session_holidays,
              t.corrections,
            )),
            this._updateDatesFromExpirationDate();
        }
        destroy() {
          0 !== this._subscribers.length &&
            console.warn("Destroying with not-empty state"),
            this._clearResetCacheTimeout(),
            this._unsubscribeRealtime(),
            this._purgeCache(),
            delete this._datafeed,
            (this._destroyed = !0);
        }
        addSubscription(e, t, i) {
          const s = this._getNextSubscriptionId();
          this._pendingSubscribers.push({
            key: s,
            range: e,
            onHistoryCallback: t,
            onErrorCallback: i,
          }),
            r.Interval.isDWM(this._resolution) &&
              void 0 !== e.to &&
              null !== this._dwmAligner &&
              e.to % 864e5 &&
              console.warn(
                `Internal error: invalid date for DWM resolution ${u(
                  e.to,
                )}, expected time without a time part`,
              ),
            this._clearResetCacheTimeout();
          return (
            setTimeout(() => {
              this._destroyed || this._processPendingSubscribers();
            }, 0),
            s
          );
        }
        removeSubscription(e) {
          const t = this._pendingSubscribers.find(t => t.key === e);
          if (t)
            return void this._pendingSubscribers.splice(
              this._pendingSubscribers.indexOf(t),
              1,
            );
          const i = this._subscribers.find(t => t.key === e);
          if (i)
            return (
              this._subscribers.splice(this._subscribers.indexOf(i), 1),
              void (
                this._subscribers.length ||
                (this._resetCacheTimeout = setTimeout(() => {
                  (this._resetCacheTimeout = null),
                    this._purgeCache(),
                    this._unsubscribeRealtime();
                }, this._resetCacheTimePeriod))
              )
            );
          console.warn(
            "Unknown subscription symbol={0}, resolution={1}, key={2}".format(
              this._symbolInfo.name,
              this._resolution,
              e,
            ),
          );
        }
        _logMessage(e, t) {
          if (a.enabled("charting_library_debug_mode") || t) {
            const t = this._symbolInfo.currency_code,
              i = this._symbolInfo.unit_id;
            console.log(
              `FEED [${this._symbolInfo.name}|${this._resolution}${
                t ? "|" + t : ""
              }${i ? "|" + i : ""}]: ${e}`,
            );
          }
        }
        _clearResetCacheTimeout() {
          null !== this._resetCacheTimeout &&
            (clearTimeout(this._resetCacheTimeout),
            (this._resetCacheTimeout = null));
        }
        _purgeCache() {
          this._logMessage("Reset cache"),
            (this._cache = {bars: []}),
            (this._errorMessage = null),
            (this._leftDate = null),
            (this._endOfData = !1),
            this._updateDatesFromExpirationDate();
        }
        _updateDatesFromExpirationDate() {
          void 0 !== this._symbolInfo.expiration_date &&
            ((this._nextTime = 1e3 * this._symbolInfo.expiration_date),
            (this._leftDate = 1e3 * (this._symbolInfo.expiration_date + 1)));
        }
        _dealignTime(e) {
          return null === this._dwmAligner
            ? e
            : this._dwmAligner.timeToExchangeTradingDay(e);
        }
        _normalizeRange(e) {
          const t = void 0 !== e.to ? e.to : this._dealignTime(this._now());
          if (
            0 === this._cache.bars.length ||
            (void 0 !== e.to && t <= (0, s.ensureNotNull)(this._leftDate))
          )
            return {countBack: e.countBack, to: t};
          const i =
              null !== this._dwmAligner
                ? this._dwmAligner.timeToSessionStart(t)
                : t,
            r = (0, n.lowerbound)(this._cache.bars, i, (e, t) => e.time < t);
          return e.countBack < r
            ? {
                countBack: 0,
                to:
                  0 !== e.countBack && r <= this._cache.bars.length
                    ? this._dealignTime(this._cache.bars[r - e.countBack].time)
                    : t,
              }
            : {
                countBack: e.countBack - r,
                to: this._dealignTime(this._cache.bars[0].time),
              };
        }
        _processPendingSubscribers() {
          const e = this._pendingSubscribers;
          if (!e.length) return;
          if (this._requesting)
            return void this._logMessage(
              "Processing is skipped due active request",
            );
          if (
            (this._logMessage(
              "Processing pending subscribers, count=" + e.length,
            ),
            this._errorMessage)
          ) {
            const t = this._errorMessage;
            return (
              this._logMessage("Return error: " + t),
              (this._pendingSubscribers = []),
              void e.forEach(e => {
                e.onErrorCallback(t);
              })
            );
          }
          let t = this._normalizeRange(e[0].range);
          for (const i of e.map(e => this._normalizeRange(e.range)))
            (i.to < t.to || (i.to === t.to && i.countBack > t.countBack)) &&
              (t = i);
          this._logMessage(
            `Leftmost subscriber requires ${t.countBack} bars prior ${u(t.to)}`,
          );
          !(
            null === this._leftDate ||
            (t.to < this._leftDate &&
              (null === this._nextTime || t.to < this._nextTime)) ||
            0 !== t.countBack
          ) || this._endOfData
            ? ((this._pendingSubscribers = []),
              e.forEach(e => {
                const t = this._moveSubscriberToRealtime(e);
                this._returnHistoryDataToSubscriber(e, t);
              }),
              this._subscribeRealtimeIfNeeded())
            : this._ensureRequestedTo(t);
        }
        _moveSubscriberToRealtime(e) {
          const t = {
            key: e.key,
            onHistoryCallback: e.onHistoryCallback,
            barset: null,
          };
          return this._subscribers.push(t), t;
        }
        _isSymbolExpired() {
          return (
            this._symbolInfo.expired ||
            void 0 !== this._symbolInfo.expiration_date
          );
        }
        _subscribeRealtimeIfNeeded() {
          !this._subscribers.length ||
            this._realtimeOn ||
            this._isSymbolExpired() ||
            this._subscribeRealtime();
        }
        _subscribeRealtime() {
          if (this._symbolInfo.expired || this._realtimeOn) return;
          (this._realtimeOn = !0),
            this._datafeed.subscribeBars(
              this._symbolInfo,
              this._resolution,
              e => {
                null !== this._dwmAligner &&
                  (e.time = this._dwmAligner.timeToSessionStart(e.time)),
                  this._putToCacheNewBar(e),
                  this._subscribers.forEach(t => {
                    const i = t.barset;
                    if (null === i)
                      throw new Error("subscriber.barset is null");
                    i.add(e), t.onHistoryCallback(i);
                  });
              },
              d(this._symbolInfo, this._resolution),
              () => {
                this._unsubscribeRealtime();
                const e = this._leftDate;
                this._purgeCache(),
                  null !== e && this._ensureRequestedTo({to: e, countBack: 0});
              },
            ),
            this._logMessage("Subscribed to realtime");
        }
        _unsubscribeRealtime() {
          !this._isSymbolExpired() &&
            this._realtimeOn &&
            (this._datafeed.unsubscribeBars(
              d(this._symbolInfo, this._resolution),
            ),
            this._logMessage("Unsubscribed from realtime"),
            (this._realtimeOn = !1));
        }
        _returnHistoryDataToSubscriber(e, t) {
          const i = this._normalizeRange(e.range),
            s = this._createBarsetForRange(i);
          s.count() > 0
            ? this._logMessage(
                "Bars to return for request {0}: total {1} bars in [{2} ... {3}] ".format(
                  e.key,
                  s.count(),
                  u(s.bars[0].time),
                  u(s.bars[s.count() - 1].time),
                ),
              )
            : this._logMessage("Request {0}. Nothing to return.".format(e.key)),
            (t.barset = s),
            this._endOfData &&
              null !== this._leftDate &&
              i.to <= this._leftDate &&
              (s.endOfData = !0),
            e.onHistoryCallback(s);
        }
        _createBarsetForRange(e) {
          const t =
              null !== this._dwmAligner
                ? this._dwmAligner.timeToSessionStart(e.to)
                : e.to,
            i = (0, n.lowerbound)(this._cache.bars, t, (e, t) => e.time < t),
            r = new o.BarSet(
              this._symbolInfo,
              this._cache.bars.slice(Math.max(0, i - e.countBack)),
            );
          return (
            0 !== r.bars.length
              ? (r.firstLoadedTimeMs = this._dealignTime(r.bars[0].time))
              : 0 !== this._cache.bars.length
              ? (r.firstLoadedTimeMs = this._dealignTime(
                  this._cache.bars[this._cache.bars.length - 1].time,
                ))
              : (r.firstLoadedTimeMs = this._dealignTime(
                  (0, s.ensureNotNull)(this._leftDate),
                )),
            r
          );
        }
        _ensureRequestedTo(e) {
          var t;
          let i;
          if (
            (this._requesting &&
              this._logMessage(
                "Internal error: trying to call getBars while the previous request is active",
                !0,
              ),
            null !== this._leftDate)
          )
            i = this._leftDate;
          else {
            const e = this._now();
            if (null === this._dwmAligner) i = e;
            else {
              let t = this._sessionSpec
                .alignToNearestSessionStart(new Date(e), 1)
                .getTime();
              if (t < e) {
                const e = this._sessionSpec
                  .alignToNearestSessionEnd(new Date(t), 1)
                  .getTime();
                t = this._sessionSpec
                  .alignToNearestSessionStart(new Date(e + 1e3), 1)
                  .getTime();
              }
              i = this._dealignTime(t);
            }
          }
          const s = (0, l.alignPeriodsBackForDataRequest)(
            this._symbolInfo.session,
            this._symbolInfo.session_holidays,
            this._symbolInfo.corrections,
            this._interval.letter(),
            this._interval.multiplier(),
            e.countBack,
            Math.min(
              e.to,
              i,
              null !== (t = this._nextTime) && void 0 !== t ? t : 1 / 0,
            ),
          );
          let r = e.countBack;
          if (
            (e.to < i &&
              (r += (0, l.getPeriodsBetweenDates)(
                this._symbolInfo.session,
                this._symbolInfo.session_holidays,
                this._symbolInfo.corrections,
                this._interval.letter(),
                this._interval.multiplier(),
                e.to,
                i,
              )),
            null !== this._leftDate && this._leftDate < s)
          )
            return void this._processPendingSubscribers();
          const n = this._isSymbolExpired()
            ? 0 === this._cache.bars.length
            : null === this._leftDate;
          (this._requesting = !0),
            (this._nextTime = null),
            (this._leftDate = s);
          const o = `[${u(s)} ... ${u(i)}, ${r} bars]`;
          this._logMessage("Requesting data: " + o);
          let a = !1;
          const c = s / 1e3,
            h = i / 1e3;
          this._datafeed.getBars(
            this._symbolInfo,
            this._resolution,
            {
              from: this._interval.isTicks() ? c : Math.floor(c),
              to: this._interval.isTicks() ? h : Math.floor(h),
              countBack: r,
              firstDataRequest: n,
            },
            (e, t) => {
              if (!this._destroyed)
                if (a)
                  this._logMessage(
                    "getBars callback is already called before",
                    !0,
                  );
                else {
                  if (((a = !0), e.length > 0)) {
                    const t = ` [${u(e[0].time)} ... ${u(
                      e[e.length - 1].time,
                    )}]`;
                    this._logMessage(
                      `Receiving bars: total ${e.length} bars in ${t}, requested range: ${o}`,
                    );
                  } else
                    this._logMessage(
                      "Receiving bars: barset is empty, requested range: " + o,
                    );
                  (this._requesting = !1), this._processBars(e, t);
                }
            },
            e => {
              this._destroyed ||
                (a
                  ? this._logMessage(
                      "getBars callback is already called before",
                      !0,
                    )
                  : ((a = !0),
                    (this._requesting = !1),
                    (this._errorMessage = e || null),
                    this._processPendingSubscribers()));
            },
          );
        }
        _processBars(e, t) {
          this._checkBars(e),
            this._alignBarsTime(e),
            e.length > 0
              ? ((this._emptyResponsesCount = 0), this._processFullBarset(e, t))
              : ((this._emptyResponsesCount += 1), this._processEmptyBarset(t)),
            this._processPendingSubscribers();
        }
        _processEmptyBarset(e) {
          e && e.nextTime
            ? (this._logMessage(
                "Next time received: `{0}`".format(u(1e3 * e.nextTime)),
              ),
              (this._nextTime = 1e3 * e.nextTime))
            : e && e.noData
            ? (this._logMessage("EOD received"), this._setEndOfData())
            : this._logMessage(
                "nextTime or noData should present in metainfo when empty barset is returned",
              ),
            50 === this._emptyResponsesCount &&
              (this._logMessage("EOD detected due 50 empty responses in a row"),
              this._setEndOfData());
        }
        _setEndOfData() {
          (this._endOfData = !0),
            this._cache.bars.length &&
              (this._leftDate = this._dealignTime(this._cache.bars[0].time));
        }
        _processFullBarset(e, t) {
          this._putToCache(e)
            ? null !== this._leftDate &&
              0 !== this._cache.bars.length &&
              (this._interval.isTicks()
                ? (this._leftDate = this._dealignTime(this._cache.bars[0].time))
                : (this._leftDate = Math.min(
                    this._leftDate,
                    this._dealignTime(this._cache.bars[0].time),
                  )))
            : this._logMessage(
                "Incremental update failed. Starting full update. Returned data should be in the requested range.",
                !0,
              ),
            t && t.nextTime
              ? console.warn(
                  "nextTime should be set when there is no data in the requested period only",
                )
              : t &&
                t.noData &&
                console.warn(
                  "noData should be set when there is no data in the requested period and earlier only",
                );
        }
        _getNextSubscriptionId() {
          return this._nextSubscriptionId++;
        }
        _checkBars(e, t = !1) {
          if (a.enabled("charting_library_debug_mode"))
            for (let i = 1; i < e.length; i++) {
              if (e[i].time <= e[i - 1].time) {
                let s =
                  "Wrong bars time: time {0} of bar {1} should be more than time {2} of bar {3}".format(
                    e[i].time,
                    i,
                    e[i - 1].time,
                    i - 1,
                  );
                t &&
                  null !== this._dwmAligner &&
                  (s +=
                    "\nCheck that you provide DWM bars without time part, i.e. 00:00 GMT"),
                  console.error(s);
              }
              ["high", "low", "open", "close", "time"].some(
                t => "number" != typeof e[i][t] || !isFinite(e[i][t]),
              ) &&
                console.error(
                  "Wrong bars values: all OHLC values should be numbers",
                );
            }
        }
        _putToCache(e) {
          if (0 === e.length) return !0;
          if (
            this._cache.bars.length === e.length &&
            this._cache.bars[0].time === e[0].time &&
            this._cache.bars[this._cache.bars.length - 1].time ===
              e[e.length - 1].time
          )
            return (
              this._logMessage(
                "Time range of received data is the same as cached one. Skip the update.",
              ),
              !0
            );
          if (
            (0 !== this._cache.bars.length &&
              e[e.length - 1].time === this._cache.bars[0].time &&
              this._cache.bars.splice(0, 1),
            0 !== this._cache.bars.length &&
              e[e.length - 1].time >= this._cache.bars[0].time)
          ) {
            const t =
              this._cache.bars[this._cache.bars.length - 1].time ===
              e[e.length - 1].time;
            if (((this._cache.bars = []), !t))
              return (this._leftDate = null), !1;
            this._logMessage(
              "Received history up to now instead of incremental update. Return exactly what is requested.",
            );
          }
          return (
            (this._cache.bars = [...e, ...this._cache.bars]),
            this._checkBars(this._cache.bars, !0),
            !0
          );
        }
        _putToCacheNewBar(e) {
          const t = this._cache.bars.length,
            i = e.time,
            s = 0 === t ? NaN : this._cache.bars[t - 1].time;
          0 === t || s < i
            ? this._cache.bars.push(e)
            : s === i
            ? (this._interval.isTicks() &&
                this._logMessage("Received update for the last tick bar"),
              (this._cache.bars[t - 1] = e))
            : console.error(
                "putToCacheNewBar: time violation, previous bar time: " +
                  u(s) +
                  " should be less or equal to new time: " +
                  u(i),
              );
        }
        _alignBarsTime(e) {
          if (this._dwmAligner)
            for (const t of e)
              t.time = this._dwmAligner.timeToSessionStart(t.time);
        }
        _now() {
          return Date.now() + 1e3 * this._serverTimeOffsetGetter() + 6e4;
        }
      }
      class _ {
        constructor(e, t, i) {
          (this._threads = {}),
            (this._datafeed = e),
            (this._serverTimeOffsetGetter = t),
            (this._resetCacheTimePeriod = i);
        }
        destroy() {
          this._forEachThread((e, t) => t.destroy()),
            (this._threads = {}),
            delete this._datafeed;
        }
        purgeCache() {
          this._forEachThread((e, t) => t.destroy()), (this._threads = {});
        }
        subscribe(e, t, i, s, r) {
          const n = d(e, t);
          this._threads[n] || (this._threads[n] = this._createThread(e, t));
          return n + '"' + this._threads[n].addSubscription(i, s, r);
        }
        unsubscribe(e) {
          const t = e.split('"');
          if (2 !== t.length) return void console.warn("Wrong guid format");
          const i = t[0],
            s = parseInt(t[1]);
          this._threads.hasOwnProperty(i)
            ? this._threads[i].removeSubscription(s)
            : console.warn("Data thread doesnt exist: " + e);
        }
        _createThread(e, t) {
          return new p(
            this._datafeed,
            e,
            t,
            this._serverTimeOffsetGetter,
            (0, c.createDwmAligner)(t, e),
            this._resetCacheTimePeriod,
          );
        }
        _forEachThread(e) {
          Object.keys(this._threads).forEach(t => e(t, this._threads[t]));
        }
      }
    },
    33287: (e, t, i) => {
      "use strict";
      i.d(t, {barTimeToEndOfPeriod: () => r, endOfPeriodToBarTime: () => n});
      var s = i(78486);
      function r(e, t, i) {
        if (i.isDays()) return t;
        if ((e.moveTo(1e3 * t), i.isIntraday())) {
          const i = e.indexOfBar(1e3 * t);
          if (i < 0) throw new Error(t + " is out of the instrument session ");
          return e.endOfBar(i) / 1e3;
        }
        return e.startOfBar(s.SessionStage.LASTBAR_SESSION) / 1e3;
      }
      function n(e, t, i) {
        if (i.isDays()) return t;
        const s = 1e3 * t - 1;
        if ((e.moveTo(s), i.isIntraday())) {
          const i = e.indexOfBar(s);
          if (i < 0) throw new Error(t + " is out of the instrument session ");
          return e.startOfBar(i) / 1e3;
        }
        return (t = e.startOfBar(0) / 1e3);
      }
    },
    81482: (e, t, i) => {
      "use strict";
      i.d(t, {replaceGraphicsTimesWithTimePointIndexIndex: () => n});
      const s = new Map([
          ["horizlines", e => [e.startIndex, e.endIndex]],
          ["hhists", e => [e.firstBarTime, e.firstBarTime]],
          ["vertlines", e => [e.index]],
          ["polygons", e => e.points.map(e => e.index)],
        ]),
        r = new Map([
          [
            "horizlines",
            (e, t) => {
              const i = e;
              (i.startIndex = t.get(i.startIndex)),
                (i.endIndex = t.get(i.endIndex));
            },
          ],
          [
            "hhists",
            (e, t) => {
              const i = e;
              (i.firstBarTime = t.get(i.firstBarTime)),
                (i.lastBarTime = t.get(i.lastBarTime));
            },
          ],
          [
            "vertlines",
            (e, t) => {
              const i = e;
              i.index = t.get(i.index);
            },
          ],
          [
            "polygons",
            (e, t) => {
              const i = e;
              for (const e of i.points) e.index = t.get(e.index);
            },
          ],
        ]);
      function n(e) {
        const t = e.data && e.data.graphicsCmds && e.data.graphicsCmds.create;
        if (!t) return [];
        const i = new Map(),
          n = new Set();
        s.forEach((e, s) => {
          const r = t[s];
          if (r)
            for (const t of r)
              for (const s of t.data) {
                const t = e(s);
                for (const e of t) i.set(e, -1), n.add(e);
              }
        });
        const o = Array.from(n).sort((e, t) => e - t);
        return (
          o.forEach((e, t) => i.set(e, t)),
          r.forEach((e, s) => {
            const r = t[s];
            if (r) for (const t of r) for (const s of t.data) e(s, i);
          }),
          o
        );
      }
    },
    27317: (e, t, i) => {
      "use strict";
      var s = i(27490);
      window.onload = function () {
        location.hostname.indexOf(".") >= 0 &&
          !(function () {
            try {
              return (
                /^(192|172|10)\.[0-9][0-9][0-9]\.[0-9][0-9][0-9]\.[0-9][0-9][0-9]/.test(
                  location.hostname,
                ) || /^.*((?:\.local)|localhost)$/.test(location.hostname)
              );
            } catch (e) {
              return !1;
            }
          })() &&
          setTimeout(function () {
            try {
              var e = (function () {
                var e = 0;
                return (
                  JSON.parse(urlParams.logo).image &&
                    ((e = "C"), s.enabled("link_to_tradingview") || (e = "D")),
                  e
                );
              })();
              window.ga &&
                (0 !== e && window.ga("send", "event", "s", e),
                urlParams.utm || window.ga("send", "event", "l"));
            } catch (e) {}
          }, 3e4);
      };
    },
    77848: (e, t, i) => {
      "use strict";
      var s = i(42062),
        r = {};
      e.exports = function (e, t, i) {
        var n,
          o,
          a = {},
          l = r[i] || "out_of_session",
          c = !1,
          h = i,
          d = t,
          u = null;
        function p() {
          var e = {};
          (e.symbolname = h),
            (e.status = "ok"),
            (e.values = {}),
            (e.values.current_session = l),
            (r[h] = l),
            TradingView.ChartapiMessagerInstances[d].onQuotesData(
              [d].concat([e]),
            );
        }
        function _() {
          if (n)
            if (o) l = "out_of_session";
            else {
              var e = s.isTradingNow(new Date().getTime(), n)
                ? "market"
                : "out_of_session";
              e !== l && ((l = e), p());
            }
        }
        return (
          e(
            i,
            null,
            function (e) {
              c ||
                (function (e) {
                  (n = new s.SessionInfo(
                    e.timezone,
                    e.session,
                    e.session_holidays,
                    e.corrections,
                  )),
                    (o = e.expired),
                    (u = setInterval(_, 6e4)),
                    _(),
                    p();
                })(e);
            },
            function () {},
          ),
          (a.stop = function () {
            (c = !0), u && clearInterval(u);
          }),
          (a.marketStatus = function () {
            return l;
          }),
          a
        );
      };
    },
    14896: (e, t, i) => {
      "use strict";
      i.d(t, {getChartStyleStudy: () => n});
      var s = i(77392);
      class r {
        main(e) {
          const t = e.new_var(s.Std.open(e)),
            i = e.new_var(s.Std.close(e)),
            r = t.get(1),
            n = i.get(1),
            o = s.Std.ohlc4(e),
            a = s.Std.na(t.get(1))
              ? (s.Std.open(e) + s.Std.close(e)) / 2
              : (r + n) / 2;
          t.set(a), i.set(o);
          const l = s.Std.max(s.Std.high(e), s.Std.max(a, o)),
            c = s.Std.min(s.Std.low(e), s.Std.min(a, o)),
            h = s.Std.volume(e),
            d = e.symbol;
          return [d.time, a, l, c, o, h, d.updatetime, d.isBarClosed];
        }
      }
      function n(e) {
        if (0 === e.type.indexOf("BarSetHeikenAshi@tv-basicstudies-"))
          return new r();
        const t = "unknown builder type: " + e.type;
        throw (console.error(t), new Error(t));
      }
    },
    22241: (e, t, i) => {
      "use strict";
      var s = i(35001).Interval,
        r = i(63059).isAlignmentEnabled,
        n = i(14896).getChartStyleStudy,
        o = i(89164).decodeExtendedSymbol,
        a = i(5280).findSuitableResolutionToBuildFrom,
        l = (function () {
          var e = i(77392),
            t = e.StudyEngine,
            l = e.BarBuilder,
            c = e.BarSet;
          function h(e) {
            (this.host = e), (this.cache = {});
          }
          function d(t) {
            console.error(t), e.Std.error(t);
          }
          (h.prototype.getCache = function (e) {
            return this.cache[e];
          }),
            (h.prototype.putCache = function (e, t) {
              this.cache[e] = t;
            }),
            (h.prototype.subscribe = function (e, t, i, s, r, n, o, a, l, c) {
              var h = l(o),
                d = (function (e, t, i, s, r, n, o, a) {
                  var l = r.has_empty_bars ? "_" : "";
                  return (
                    n +
                    e +
                    s +
                    (t || "") +
                    (i || "") +
                    l +
                    "_" +
                    o.countBack +
                    "_" +
                    o.to +
                    "_" +
                    Boolean(a)
                  );
                })(e, t, i, s, o, a, h, c),
                u = this.getCache(d);
              return (
                u ||
                  ((u = this.createItem(e, t, i, s, o, h, a, c)),
                  this.putCache(d, u)),
                u.listeners.addListener(r, n),
                {key: d, listener: r}
              );
            }),
            (h.prototype.unsubscribe = function (e) {
              var t = this.getCache(e.key);
              t && t.listeners.removeListener(e.listener);
            }),
            (h.prototype.removeUnused = function () {
              var e = [];
              for (var t in this.cache) {
                if (this.cache[t])
                  0 === this.cache[t].listeners.listenersCount() && e.push(t);
              }
              if (0 !== e.length) {
                for (var i = 0; i < e.length; i++) {
                  var s = e[i],
                    r = this.cache[s];
                  (this.cache[s] = null), r.stop();
                }
                this.removeUnused();
              }
            }),
            (h.prototype.rebuildFrom = function (e, t) {
              var i = a(e, t);
              return i.error && d(i.errorMessage), i.resolution;
            });
          var u = s.parse("1M").inMilliseconds(0);
          h.prototype.createItem = function (e, t, i, a, c, h, g, f) {
            var v = new m(),
              S = o(e),
              y = "string" != typeof S.symbol ? S.symbol : S;
            (t = y["currency-id"] || t), (i = y["unit-id"] || i);
            var b = y.symbol,
              w = y.session && "extended" !== y.session;
            if ("type" in S) {
              var P = Object.assign({}, c);
              return (
                c.has_empty_bars && (P.has_empty_bars = !1),
                new _(v, b, t, i, a, n(S), P, h, g)
              );
            }
            f &&
              !r() &&
              d("Internal error: rebuilding is requested but it is disabled."),
              !f &&
                c.has_empty_bars &&
                d(
                  'Misconfiguration error: attempt to request data for symbol with "has_empty_bars" flag, but "disable_resolution_rebuild" featureset is enabled',
                );
            var C,
              T,
              x = this.rebuildFrom(a, c);
            if (!s.isTicks(a) && (!s.isEqual(a, x) || f)) {
              r() ||
                d(
                  'Misconfiguration error: remove "disable_resolution_rebuild" featureset or provide ' +
                    a +
                    " data by yourself",
                );
              var I = c.has_empty_bars;
              P = Object.assign({}, c);
              c.has_empty_bars && (P.has_empty_bars = !1);
              var M = Math.ceil(
                ((C = s.parse(a)),
                (T = s.parse(x)),
                C.kind() === T.kind()
                  ? C.multiplier() / T.multiplier()
                  : (C.isMonths() ? C.multiplier() * u : C.inMilliseconds()) /
                    (T.isMonths() ? T.multiplier() * u : T.inMilliseconds())),
              );
              return (
                (h = Object.assign({}, h, {countBack: h.countBack * M})),
                new _(v, b, t, i, x, new l(a, I), P, h, g)
              );
            }
            return new p(v, b, {currency: t, unit: i}, a, w, this.host, c, h);
          };
          var p = function (e, t, i, s, r, n, o, a) {
            (this.listeners = e), (this.host = n);
            var l = this;
            this.host.resolve(
              t,
              i,
              function (e) {
                r && e.regular_session && (e.session = e.regular_session),
                  (l.subs = l.host.subscribe(
                    e,
                    s,
                    a,
                    function (e) {
                      l.listeners.fire(e);
                    },
                    function (e) {
                      l.listeners.onError(e);
                    },
                  ));
              },
              function (e) {
                l.listeners.onError(e);
              },
            );
          };
          p.prototype.stop = function () {
            this.subs && this.host.unsubscribe(this.subs);
          };
          var _ = function (e, i, s, r, n, o, a, l, c) {
            (this.listeners = e),
              (this.isRecalculated = !1),
              (this.symbolInfo = a);
            var h = this;
            this.engine = new t({
              tickerid: i,
              currencyCode: s,
              unitId: r,
              period: n,
              body: o,
              sessionId: c,
              symbolInfo: a,
              dataRange: l,
              forceAlignBars: !1,
              recalc: function (e, t) {
                h._recalc(t);
              },
              out: function (e, t) {
                h._out(e, t);
              },
              nonseriesOut: function (e, t) {
                h._nonseriesOut(e, t);
              },
              setNoMoreData: function () {
                h.barset && (h.barset.endOfData = !0);
              },
              onErrorCallback: function (e) {
                h.listeners.onError(e);
              },
            });
          };
          (_.prototype.stop = function () {
            this.engine
              ? this.engine.stop()
              : console.error("Internal library error 0x1");
          }),
            (_.prototype._recalc = function (e) {
              this.isRecalculated && console.error("recalc called twice!"),
                this.barset || (this.barset = new c(this.symbolInfo)),
                e &&
                  ((this.barset.firstLoadedTimeMs = e.firstLoadedTimeMs),
                  (this.barset.endOfData = e.endOfData)),
                this.listeners.fire(this.barset),
                (this.isRecalculated = !0);
            }),
            (_.prototype._nonseriesOut = function (e, t) {
              var i = Object.assign({}, t);
              (i.nonseries = !0),
                (i.data = t.bars),
                delete i.bars,
                (i.barsetSize = this.barset ? this.barset.count() : 0),
                (i.lastBar = this.barset
                  ? this.barset.bar(this.barset.count() - 1)
                  : null),
                this.listeners.fire(i, !0);
            }),
            (_.prototype._out = function (e, t) {
              var i = t[0];
              if (!isNaN(i)) {
                var s = {
                    time: i,
                    open: t[1],
                    high: t[2],
                    low: t[3],
                    close: t[4],
                    volume: t[5],
                    updatetime: t[6],
                  },
                  r = t[7];
                this.barset || (this.barset = new c(e.info));
                var n = t[8];
                if (n instanceof Array)
                  for (var o = 0; o < n.length; o++) {
                    var a = t[9],
                      l = n[o],
                      h = {
                        time: l,
                        open: a,
                        high: a,
                        low: a,
                        close: a,
                        volume: 0,
                        updatetime: l,
                      };
                    this.barset.add(h, !0),
                      this.isRecalculated && this.listeners.fire(this.barset);
                  }
                this.barset.add(s, r),
                  (this.barset.isBarClosed = r),
                  this.isRecalculated && this.listeners.fire(this.barset);
              }
            });
          var m = function () {
            this.listeners = [];
          };
          return (
            (m.prototype.listenersCount = function () {
              return this.listeners.reduce(function (e, t) {
                return e + (t ? 1 : 0);
              }, 0);
            }),
            (m.prototype.addListener = function (e, t) {
              this.listeners.push({dataListener: e, onErrorCallback: t}),
                this.barset && e(this.barset),
                this.errorMsg && t(this.errorMsg);
            }),
            (m.prototype.removeListener = function (e) {
              var t = this.listeners.filter(function (t) {
                return t.dataListener === e;
              });
              if (0 !== t.length) {
                var i = this.listeners.indexOf(t[0]);
                delete this.listeners[i];
              }
            }),
            (m.prototype.onError = function (e) {
              this.errorMsg = e || "unspecified error";
              for (var t = this.listeners, i = t.length, s = 0; s < i; s++) {
                var r = t[s];
                r && r.onErrorCallback && r.onErrorCallback(e);
              }
            }),
            (m.prototype.fire = function (e, t) {
              t || (this.barset = e);
              for (var i = this.listeners, s = i.length, r = 0; r < s; r++) {
                var n = i[r];
                n && n.dataListener(e);
              }
            }),
            {
              setupFeed: function (t) {
                (h.instance = new h(t)), e.setupFeed(h.instance);
              },
              unsubscribeUnused: function () {
                h.instance.removeUnused();
              },
            }
          );
        })();
      e.exports = l;
    },
    5280: (e, t, i) => {
      "use strict";
      i.d(t, {findSuitableResolutionToBuildFrom: () => o});
      var s = i(35001);
      function r(e, t) {
        const i = t.multiplier();
        for (let s = e.length - 1; s >= 0; s--) {
          const r = Number(e[s]);
          if (i % r == 0) return {error: !1, resolution: `${r}${t.letter()}`};
        }
        return {error: !0, errorMessage: n(t.value())};
      }
      function n(e) {
        return `Misconfiguration error: it is trying to request ${e} but we cannot build it from lower resolution`;
      }
      function o(e, t) {
        const i = s.Interval.parse(e);
        if ((i.isWeeks() || i.isMonths()) && t.has_weekly_and_monthly) {
          let e = ["1"];
          i.isWeeks() &&
            void 0 !== t.weekly_multipliers &&
            (e = t.weekly_multipliers),
            i.isMonths() &&
              void 0 !== t.monthly_multipliers &&
              (e = t.monthly_multipliers);
          const s = r(e, i);
          if (!s.error) return s;
        }
        if (i.isDWM() && (void 0 === t.has_daily || t.has_daily))
          return i.isDays() && void 0 !== t.daily_multipliers
            ? r(t.daily_multipliers, i)
            : void 0 === t.daily_multipliers ||
              t.daily_multipliers.includes("1")
            ? {error: !1, resolution: "1D"}
            : {
                error: !0,
                errorMessage:
                  "Misconfiguration error: it is trying to request a resolution but symbol does not support it",
              };
        if (i.isDWM()) return {error: !0, errorMessage: n(i.value())};
        if (i.isMinutes() && !t.has_intraday)
          return {
            error: !0,
            errorMessage:
              "Misconfiguration error: it is trying to request intraday resolution but symbol does not support it",
          };
        if (i.isSeconds() && !t.has_seconds)
          return {
            error: !0,
            errorMessage:
              "Misconfiguration error: it is trying to request seconds resolution but symbol does not support it",
          };
        if (i.isTicks())
          return !t.has_ticks || i.multiplier() > 1
            ? {
                error: !0,
                errorMessage: `Misconfiguration error: it is trying to request ${i.multiplier()} ticks resolution but symbol does not support it`,
              }
            : {error: !1, resolution: "1T"};
        const o = i.isSeconds()
          ? t.seconds_multipliers
          : t.intraday_multipliers;
        return void 0 === o ? {error: !1, resolution: i.value()} : r(o, i);
      }
    },
    77392: function (e, t, i) {
      "use strict";
      var s = i(71181).StudyError,
        r = i(49382),
        n = i(47903).inherit,
        o = i(78486).SessionStage,
        a = i(35001).Interval,
        l = i(63059).createDwmAligner,
        c = i(63059).createTimeToBarTimeAligner,
        h = i(89164).decodeExtendedSymbol,
        d = i(89164).encodeExtendedSymbolOrGetSimpleSymbolString,
        u = (function () {
          var e,
            t = "undefined" != typeof window ? window : i.g,
            p = t.PineJsCalendar ? t.PineJsCalendar : i(84540),
            _ = i(42062),
            m = i(25853).extrapolateBarsFrontToTime,
            g = {};
          function f(e, t, i, s, r) {
            var n = r,
              o = 0;
            if (isNaN(e.get(t - 1))) return {index: NaN, value: NaN};
            for (var a = 0; a < t; ++a)
              s(e.get(a), n) && ((o = a), (n = e.get(a)));
            return {index: o, value: n};
          }
          function v(e, t, i, s, r) {
            (this._areaRight = e),
              (this._areaLeft = t),
              (this._pivotType = i),
              (this._series = s),
              (this._currentIndex = r.new_var(0)),
              (this._currentValue = r.new_var(NaN)),
              (this._pivotIndex = r.new_var(-1)),
              (this._index = g.n(r)),
              (this._isNewBar = r.symbol.isNewBar);
            var n = this._currentIndex.get(1),
              o = this._currentValue.get(1),
              a = this._pivotIndex.get(1);
            this._index > 1 &&
              (this._currentIndex.set(n),
              this._currentValue.set(o),
              this._pivotIndex.set(a));
          }
          function S(e, t, i) {
            this._deviation = e;
            var s = i.new_var(g.high(i)),
              r = i.new_var(g.low(i));
            s.get(2 * t + 1),
              r.get(2 * t + 1),
              (this._pivotHigh = new v(t, t, v.HIGH, s, i)),
              (this._pivotLow = new v(t, t, v.LOW, r, i)),
              (this._lastVal = i.new_var(NaN)),
              (this._lastIndex = i.new_var(-1)),
              (this._lastType = i.new_var()),
              (this._index = g.n(i)),
              (this._isNewBar = i.symbol.isNewBar),
              (this._isBarClosed = i.symbol.isBarClosed);
            var n = this._lastIndex.get(1),
              o = this._lastVal.get(1),
              a = this._lastType.get(1);
            this._index > 1 && this.addPivot(n, o, a),
              this.processPivot(this._pivotHigh),
              this.processPivot(this._pivotLow);
          }
          function y(e) {
            (this.symbol = e),
              (this.vars = []),
              (this.vars_index = 0),
              (this.ctx = []),
              (this.ctx_index = 0),
              (this.minimumAdditionalDepth = null);
          }
          function b(e) {
            (this.mindepth = 0),
              (this.original = NaN),
              (this.modified = !1),
              (this.symbol = e);
          }
          function w(e) {
            b.call(this, e);
          }
          function P(e, t, i, s, r, n) {
            var o = h(e);
            const l = "string" == typeof o.symbol ? o : o.symbol;
            (this.ticker = l.symbol),
              (this.currencyCode = i || l["currency-id"]),
              (this.unitId = s || l["unit-id"]);
            var c =
              l["currency-id"] !== this.currencyCode ||
              l["unit-id"] !== this.unitId;
            (l["currency-id"] = this.currencyCode),
              (l["unit-id"] = this.unitId),
              c && (e = d(o)),
              (this.tickerid = e);
            var u = a.parse(t);
            (this.resolution = u.letter()),
              (this.interval = u.multiplier()),
              (this.period = u.value()),
              (this.index = -1),
              (this.time = NaN),
              (this.open = NaN),
              (this.high = NaN),
              (this.low = NaN),
              (this.close = NaN),
              (this.volume = NaN),
              (this.updatetime = NaN),
              (this.isNewBar = !1),
              (this.isBarClosed = !1),
              (this.session = new _.SessionInfo("Etc/UTC", "24x7")),
              (this.script = r),
              (this.isAdditionalDepthAllowed = void 0 === o.type),
              n && this.set_symbolinfo(n);
          }
          function C(e, t, i, s, r, n, o, a, l, c) {
            (this.body = n),
              (this.symbols = []),
              (this.runner = r),
              (this.inputCallback = a),
              (this.out = o),
              (this.nonseriesOut = l),
              (this.ctx = new y(this.add_sym(e, t, i, s, c))),
              this.init();
          }
          function T(e) {
            (this.symbols = []),
              (this.barsets = []),
              (this.subscription = []),
              (this.host = e),
              (this.isRecalculated = !1),
              (this.isStarted = !1),
              this.start();
          }
          function x(e) {
            this.runner = new T(e);
          }
          function I(e, t) {
            (this.info = e),
              (this.bars = t || []),
              (this.isBarClosed = !0),
              (this.firstLoadedTimeMs =
                0 !== this.bars.length ? this.bars[0].time : 1 / 0);
          }
          function M(e, t) {
            (this.period = e), (this.generateEmptyBars = !!t);
          }
          function L() {}
          return (
            (g.max_series_default_size = 10001),
            (g.n = function (e) {
              return e.symbol.index + 1;
            }),
            (g.nz = function (e, t) {
              return (t = t || 0), isFinite(e) ? e : t;
            }),
            (g.na = function (e) {
              return 0 === arguments.length ? NaN : isNaN(e) ? 1 : 0;
            }),
            (g.isZero = function (e) {
              return Math.abs(e) <= 1e-10;
            }),
            (g.toBool = function (e) {
              return isFinite(e) && !g.isZero(e);
            }),
            (g.eq = function (e, t) {
              return g.isZero(e - t);
            }),
            (g.neq = function (e, t) {
              return !g.eq(e, t);
            }),
            (g.ge = function (e, t) {
              return g.isZero(e - t) || e > t;
            }),
            (g.gt = function (e, t) {
              return !g.isZero(e - t) && e > t;
            }),
            (g.lt = function (e, t) {
              return !g.isZero(e - t) && e < t;
            }),
            (g.le = function (e, t) {
              return g.isZero(e - t) || e < t;
            }),
            (g.and = function (e, t) {
              return isNaN(e) || isNaN(t)
                ? NaN
                : g.isZero(e) || g.isZero(t)
                ? 0
                : 1;
            }),
            (g.or = function (e, t) {
              return isNaN(e) || isNaN(t)
                ? NaN
                : g.isZero(e) && g.isZero(t)
                ? 0
                : 1;
            }),
            (g.not = function (e) {
              return isNaN(e) ? NaN : g.isZero(e) ? 1 : 0;
            }),
            (g.eps = function () {
              return 1e-10;
            }),
            (g.greaterOrEqual = function (e, t, i) {
              return t - e < (i || 1e-10);
            }),
            (g.lessOrEqual = function (e, t, i) {
              return e - t < (i || 1e-10);
            }),
            (g.equal = function (e, t, i) {
              return Math.abs(e - t) < (i || 1e-10);
            }),
            (g.greater = function (e, t, i) {
              return e - t > (i || 1e-10);
            }),
            (g.less = function (e, t, i) {
              return t - e > (i || 1e-10);
            }),
            (g.compare = function (e, t, i) {
              return g.equal(e, t, i) ? 0 : g.greater(e, t, i) ? 1 : -1;
            }),
            (g.max = Math.max),
            (g.min = Math.min),
            (g.pow = Math.pow),
            (g.abs = Math.abs),
            (g.log = Math.log),
            (g.log10 = function (e) {
              return Math.log(e) / Math.LN10;
            }),
            (g.sqrt = Math.sqrt),
            (g.sign = function (e) {
              return isNaN(e) ? NaN : g.isZero(e) ? 0 : e > 0 ? 1 : -1;
            }),
            (g.exp = Math.exp),
            (g.sin = Math.sin),
            (g.cos = Math.cos),
            (g.tan = Math.tan),
            (g.asin = Math.asin),
            (g.acos = Math.acos),
            (g.atan = Math.atan),
            (g.floor = Math.floor),
            (g.ceil = Math.ceil),
            (g.round = Math.round),
            (g.avg = function (e, t, i, s, r, n) {
              if (2 === arguments.length) return (e + t) / 2;
              for (var o = 0, a = 0; a < arguments.length; a++)
                o += arguments[a];
              return o / arguments.length;
            }),
            (g.open = function (e) {
              return e.symbol.open;
            }),
            (g.high = function (e) {
              return e.symbol.high;
            }),
            (g.low = function (e) {
              return e.symbol.low;
            }),
            (g.close = function (e) {
              return e.symbol.close;
            }),
            (g.hl2 = function (e) {
              return (e.symbol.high + e.symbol.low) / 2;
            }),
            (g.hlc3 = function (e) {
              return (e.symbol.high + e.symbol.low + e.symbol.close) / 3;
            }),
            (g.ohlc4 = function (e) {
              return (
                (e.symbol.open +
                  e.symbol.high +
                  e.symbol.low +
                  e.symbol.close) /
                4
              );
            }),
            (g.volume = function (e) {
              return e.symbol.volume;
            }),
            (g.updatetime = function (e) {
              return e.symbol.updatetime;
            }),
            (g.time = function (e) {
              return e.symbol.bartime();
            }),
            (g.period = function (e) {
              return e.symbol.period;
            }),
            (g.tickerid = function (e) {
              return e.symbol.tickerid;
            }),
            (g.currencyCode = function (e) {
              return e.symbol.currencyCode;
            }),
            (g.unitId = function (e) {
              return e.symbol.unitId;
            }),
            (g.ticker = function (e) {
              return e.symbol.ticker;
            }),
            (g.interval = function (e) {
              return e.symbol.interval;
            }),
            (g.isdwm = function (e) {
              return e.symbol.isdwm();
            }),
            (g.isintraday = function (e) {
              return !e.symbol.isdwm();
            }),
            (g.isdaily = function (e) {
              return "D" === e.symbol.resolution;
            }),
            (g.isweekly = function (e) {
              return "W" === e.symbol.resolution;
            }),
            (g.ismonthly = function (e) {
              return "M" === e.symbol.resolution;
            }),
            (g.year = function (e) {
              return g.timepart(e.symbol, p.YEAR, arguments[1]);
            }),
            (g.month = function (e) {
              return g.timepart(e.symbol, p.MONTH, arguments[1]);
            }),
            (g.weekofyear = function (e) {
              return g.timepart(e.symbol, p.WEEK_OF_YEAR, arguments[1]);
            }),
            (g.dayofmonth = function (e) {
              return g.timepart(e.symbol, p.DAY_OF_MONTH, arguments[1]);
            }),
            (g.dayofweek = function (e) {
              return g.timepart(e.symbol, p.DAY_OF_WEEK, arguments[1]);
            }),
            (g.hour = function (e) {
              return g.timepart(e.symbol, p.HOUR_OF_DAY, arguments[1]);
            }),
            (g.minute = function (e) {
              return g.timepart(e.symbol, p.MINUTE, arguments[1]);
            }),
            (g.second = function (e) {
              return g.timepart(e.symbol, p.SECOND, arguments[1]);
            }),
            (g.add_days_considering_dst = function (e, t, i) {
              return p.add_days_considering_dst(p.get_timezone(e), t, i);
            }),
            (g.selectSessionBreaks = function (e, t) {
              if (g.isdwm(e) || void 0 === e.symbol.session.timezone) return [];
              var i = _.newBarBuilder(e.symbol.period, e.symbol.session),
                s = [],
                r = t.length;
              if ((i.moveTo(t[r - 1]), 1 === r && i.startOfBar(0) === t[0]))
                s.push(t[0]);
              else {
                for (var n = r - 2; n >= 0; --n) {
                  var o = t[n];
                  if (!(o >= i.startOfBar(0))) {
                    i.moveTo(o);
                    var a = t[n + 1];
                    s.push(a);
                  }
                }
                s.reverse();
              }
              return s;
            }),
            (g.iff = function (e, t, i) {
              return g.not(e) ? i : t;
            }),
            (g.rising = function (e, t) {
              for (var i = 1; i < t + 1; ++i) if (e.get(i) > e.get(0)) return 0;
              return 1;
            }),
            (g.falling = function (e, t) {
              for (var i = 1; i < t + 1; ++i) if (e.get(i) < e.get(0)) return 0;
              return 1;
            }),
            (g.timepart = function (e, t, i) {
              var s = p.utc_to_cal(e.timezone, i || e.bartime());
              return p.get_part(s, t);
            }),
            (g.rsi = function (e, t) {
              return g.isZero(t)
                ? 100
                : g.isZero(e)
                ? 0
                : 100 - 100 / (1 + e / t);
            }),
            (g.sum = function (e, t, i) {
              var s = i.new_var(),
                r = g.nz(e.get()) + g.nz(s.get(1)) - g.nz(e.get(t));
              return s.set(r), r;
            }),
            (g.sma = function (e, t, i) {
              var s = g.sum(e, t, i);
              return g.na(e.get(t - 1)) ? NaN : s / t;
            }),
            (g.smma = function (e, t, i) {
              var s = i.new_var(e),
                r = u.Std.sma(s, t, i),
                n = i.new_var(),
                o = (n.get(1) * (t - 1) + e) / t;
              return n.set(u.Std.na(n.get(1)) ? r : o), n.get(0);
            }),
            (g.rma = function (e, t, i) {
              var s = g.sum(e, t, i),
                r = t - 1,
                n = e.get(r),
                o = i.new_var(),
                a = o.get(1),
                l = e.get(),
                c = g.na(n) ? NaN : g.na(a) ? s / t : (l + a * r) / t;
              return o.set(c), c;
            }),
            (g.fixnan = function (e, t) {
              var i = t.new_var();
              return isNaN(e) ? i.get(1) : (i.set(e), e);
            }),
            (g.tr = function (e, t) {
              1 === arguments.length && ((t = e), (e = void 0));
              var i = void 0 !== e && !!e,
                s = t.new_var(g.close(t)),
                r = s.get(1);
              return (
                i && isNaN(r) && (r = g.close(t)),
                g.max(
                  g.max(g.high(t) - g.low(t), g.abs(g.high(t) - r)),
                  g.abs(g.low(t) - r),
                )
              );
            }),
            (g.atr = function (e, t) {
              var i = t.new_var(g.tr(t));
              return g.rma(i, e, t);
            }),
            (g.ema = function (e, t, i) {
              var s = g.sum(e, t, i),
                r = i.new_var(),
                n = e.get(0),
                o = e.get(t - 1),
                a = r.get(1),
                l = g.na(o)
                  ? NaN
                  : g.na(a)
                  ? s / t
                  : (2 * (n - a)) / (t + 1) + a;
              return r.set(l), l;
            }),
            (g.wma = function (e, t, i) {
              for (var s = 0, r = (t = Math.round(t)); r >= 0; r--) {
                s += (t - r) * e.get(r);
              }
              return (2 * s) / (t * (t + 1));
            }),
            (g.vwma = function (e, t, i) {
              var s = i.new_var(g.volume(i)),
                r = i.new_var(e.get(0) * g.volume(i));
              return g.sma(r, t, i) / g.sma(s, t, i);
            }),
            (g.swma = function (e, t) {
              return (e.get(0) + 2 * e.get(1) + 2 * e.get(2) + e.get(3)) / 6;
            }),
            (g.supertrend = function (e, t, i) {
              var s = u.Std.atr(t, i),
                r = i.new_var(s).get(1),
                n = u.Std.hl2(i),
                o = n + s * e,
                a = n - s * e,
                l = u.Std.close(i),
                c = i.new_var(l).get(1),
                h = i.new_var(),
                d = u.Std.nz(h.get(1)),
                p = i.new_var(),
                _ = u.Std.nz(p.get(1));
              (a = g.gt(a, d) || g.lt(c, d) ? a : d),
                h.set(a),
                (o = g.lt(o, _) || g.gt(c, _) ? o : _),
                p.set(o);
              var m = u.Std.na(),
                f = i.new_var(),
                v = f.get(1),
                S =
                  -1 ===
                  (m = u.Std.na(r)
                    ? 1
                    : v === _
                    ? l > o
                      ? -1
                      : 1
                    : l < a
                    ? 1
                    : -1)
                    ? a
                    : o;
              return f.set(S), [S, m];
            }),
            (g.lowestbars = function (e, t, i) {
              return -f(
                e,
                t,
                0,
                function (e, t) {
                  return g.lt(e, t);
                },
                Number.MAX_VALUE,
              ).index;
            }),
            (g.lowest = function (e, t, i) {
              return f(
                e,
                t,
                0,
                function (e, t) {
                  return g.lt(e, t);
                },
                Number.MAX_VALUE,
              ).value;
            }),
            (g.highestbars = function (e, t, i) {
              return -f(
                e,
                t,
                0,
                function (e, t) {
                  return g.gt(e, t);
                },
                Number.MIN_VALUE,
              ).index;
            }),
            (g.highest = function (e, t, i) {
              return f(
                e,
                t,
                0,
                function (e, t) {
                  return g.gt(e, t);
                },
                Number.MIN_VALUE,
              ).value;
            }),
            (g.cum = function (e, t) {
              var i = t.new_var(),
                s = g.nz(i.get(1)) + e;
              return i.set(s), s;
            }),
            (g.accdist = function (e) {
              var t = g.high(e),
                i = g.low(e),
                s = g.close(e),
                r = g.volume(e);
              return g.cum(
                (s === t && s === i) || t === i
                  ? 0
                  : (r * (2 * s - i - t)) / (t - i),
                e,
              );
            }),
            (g.correlation = function (e, t, i, s) {
              var r = g.sma(e, i, s),
                n = g.sma(t, i, s),
                o = s.new_var(e.get() * t.get());
              return (
                (g.sma(o, i, s) - r * n) /
                Math.sqrt(g.variance2(e, r, i) * g.variance2(t, n, i))
              );
            }),
            (g.stoch = function (e, t, i, s, r) {
              var n = g.highest(t, s),
                o = g.lowest(i, s);
              return g.fixnan((100 * (e.get() - o)) / (n - o), r);
            }),
            (g.tsi = function (e, t, i, s) {
              var r = s.new_var(g.change(e)),
                n = s.new_var(g.abs(g.change(e))),
                o = s.new_var(g.ema(r, i, s)),
                a = s.new_var(g.ema(n, i, s));
              return g.ema(o, t, s) / g.ema(a, t, s);
            }),
            (g.cross = function (e, t, i) {
              if (isNaN(e) || isNaN(t)) return !1;
              var s,
                r = i.new_var((s = e - t) < 0 ? -1 : 0 === s ? 0 : 1);
              return !isNaN(r.get(1)) && r.get(1) !== r.get();
            }),
            (g.linreg = function (e, t, i) {
              for (var s = 0, r = 0, n = 0, o = 0, a = 0; a < t; ++a) {
                var l = e.get(a),
                  c = t - 1 - a + 1;
                (s += c), (r += l), (n += c * c), (o += l * c);
              }
              var h = (t * o - s * r) / (t * n - s * s);
              return r / t - (h * s) / t + h + h * (t - 1 - i);
            }),
            (g.sar = function (e, t, i, s) {
              var r = s.new_var(),
                n = s.new_var(),
                o = s.new_var(),
                a = g.high(s),
                l = g.low(s),
                c = g.close(s),
                h = s.new_var(a),
                d = s.new_var(l),
                u = s.new_var(c),
                p = s.new_var(),
                _ = p.get(1),
                m = n.get(1),
                f = o.get(1);
              n.set(m), o.set(f);
              var v = !1,
                S = d.get(1),
                y = d.get(2),
                b = h.get(1),
                w = h.get(2),
                P = u.get(),
                C = u.get(1);
              2 === g.n(s) &&
                (g.greater(P, C)
                  ? (r.set(1), o.set(h.get()), (_ = S), (f = h.get()))
                  : (r.set(-1), o.set(d.get()), (_ = b), (f = d.get())),
                (v = !0),
                n.set(e),
                (m = e));
              var T = _ + m * (f - _);
              return (
                1 === r.get()
                  ? g.greater(T, d.get()) &&
                    ((v = !0),
                    r.set(-1),
                    (T = Math.max(h.get(), o.get())),
                    o.set(d.get()),
                    n.set(e))
                  : g.less(T, h.get()) &&
                    ((v = !0),
                    r.set(1),
                    (T = Math.min(d.get(), o.get())),
                    o.set(h.get()),
                    n.set(e)),
                v ||
                  (1 === r.get()
                    ? g.greater(h.get(), o.get()) &&
                      (o.set(h.get()), n.set(Math.min(n.get() + t, i)))
                    : g.less(d.get(), o.get()) &&
                      (o.set(d.get()), n.set(Math.min(n.get() + t, i)))),
                1 === r.get()
                  ? ((T = Math.min(T, S)), g.n(s) > 2 && (T = Math.min(T, y)))
                  : ((T = Math.max(T, b)), g.n(s) > 2 && (T = Math.max(T, w))),
                p.set(T),
                T
              );
            }),
            (g.alma = function (e, t, i, s) {
              for (
                var r = Math.floor(i * (t - 1)),
                  n = (t / s) * (t / s),
                  o = [],
                  a = 0,
                  l = 0;
                l < t;
                ++l
              ) {
                var c = Math.exp((-1 * Math.pow(l - r, 2)) / (2 * n));
                (a += c), o.push(c);
              }
              for (l = 0; l < t; ++l) o[l] /= a;
              var h = 0;
              for (l = 0; l < t; ++l) h += o[l] * e.get(t - l - 1);
              return h;
            }),
            (g.wvap = function (e, t) {
              return e.get() - e.get(1);
            }),
            (g.change = function (e) {
              return e.get() - e.get(1);
            }),
            (g.roc = function (e, t) {
              var i = e.get(t);
              return (100 * (e.get() - i)) / i;
            }),
            (g.dev = function (e, t, i) {
              var s = g.sma(e, t, i);
              return g.dev2(e, t, s);
            }),
            (g.dev2 = function (e, t, i) {
              for (var s = 0, r = 0; r < t; r++) {
                var n = e.get(r);
                s += g.abs(n - i);
              }
              return s / t;
            }),
            (g.stdev = function (e, t, i) {
              var s = g.variance(e, t, i);
              return g.sqrt(s);
            }),
            (g.variance = function (e, t, i) {
              var s = g.sma(e, t, i);
              return g.variance2(e, s, t);
            }),
            (g.variance2 = function (e, t, i) {
              for (var s = 0, r = 0; r < i; r++) {
                var n = e.get(r),
                  o = g.abs(n - t);
                s += o * o;
              }
              return s / i;
            }),
            (g.percentrank = function (e, t) {
              if (g.na(e.get(t - 1))) return NaN;
              for (var i = 0, s = e.get(), r = 1; r < t; r++) {
                var n = e.get(r);
                g.ge(s, n) && i++;
              }
              return (100 * i) / t;
            }),
            (g.createNewSessionCheck = function (e) {
              if (void 0 === e.symbol.session.timezone)
                return function () {
                  return !1;
                };
              var t = _.newBarBuilder(e.symbol.period, e.symbol.session);
              return function (e) {
                return t.indexOfBar(e) === o.POST_SESSION && (t.moveTo(e), !0);
              };
            }),
            (g.error = function (e) {
              throw new s(e);
            }),
            (g.dmi = function (e, t, i) {
              var s = i.new_var(g.high(i)),
                r = i.new_var(g.low(i)),
                n = g.change(s),
                o = -g.change(r),
                a = i.new_var(
                  g.na(n) || g.na(o)
                    ? g.na()
                    : g.and(g.gt(n, o), g.gt(n, 0))
                    ? n
                    : 0,
                ),
                l = i.new_var(
                  g.na(o) ? g.na() : g.and(g.gt(o, n), g.gt(o, 0)) ? o : 0,
                ),
                c = g.atr(e, i),
                h = g.fixnan((100 * g.rma(a, e, i)) / c, i),
                d = g.fixnan((100 * g.rma(l, e, i)) / c, i),
                u = h + d;
              g.isZero(u) && (u += 1);
              var p = (Math.abs(h - d) / u) * 100,
                _ = i.new_var(p),
                m = g.rma(_, t, i),
                f = i.new_var(m);
              return [h, d, p, m, (f.get(0) + f.get(e + 1)) / 2];
            }),
            (v.LOW = 0),
            (v.HIGH = 1),
            (v.prototype.isPivotFound = function () {
              return -1 !== this._pivotIndex.get();
            }),
            (v.prototype.pivotIndex = function () {
              return this._pivotIndex.get();
            }),
            (v.prototype.currentValue = function () {
              return this._currentValue.get();
            }),
            (v.prototype.pivotType = function () {
              return this._pivotType;
            }),
            (v.prototype.reset = function () {
              this._currentValue.set(NaN),
                this._currentIndex.set(0),
                this._pivotIndex.set(-1);
            }),
            (v.prototype.isRightSideOk = function (e) {
              return e - this._currentIndex.get() === this._areaRight;
            }),
            (v.prototype.isViolate = function (e, t) {
              if (e < 1 || isNaN(this._currentValue.get())) return !0;
              var i = this._series.get(this._index - e);
              return (
                !!isNaN(i) ||
                (i === this._currentValue.get()
                  ? t
                  : this._pivotType === v.HIGH
                  ? i > this._currentValue.get()
                  : i < this._currentValue.get())
              );
            }),
            (v.prototype.processPoint = function (e) {
              this.isViolate(e, !1) &&
                (this._currentValue.set(this._series.get()),
                this._currentIndex.set(e));
            }),
            (v.prototype.isRestartNeeded = function (e) {
              return e - this._currentIndex.get() > this._areaRight;
            }),
            (v.prototype.update = function () {
              if (
                (this._isNewBar && this.isPivotFound() && this.reset(),
                this.processPoint(this._index),
                this.isRightSideOk(this._index))
              ) {
                if (-1 === this._pivotIndex.get()) {
                  for (var e = !0, t = 0; t < this._areaLeft; ++t)
                    if (this.isViolate(this._currentIndex.get() - 1 - t, !0)) {
                      e = !1;
                      break;
                    }
                  e && this._pivotIndex.set(this._currentIndex.get());
                }
              } else -1 !== this._pivotIndex.get() && this._pivotIndex.set(-1);
              if (this.isRestartNeeded(this._index)) {
                this.reset();
                for (t = 0; t <= this._areaRight; ++t)
                  this.processPoint(this._index - this._areaRight + t);
              }
            }),
            (S.prototype.addPivot = function (e, t, i) {
              this._lastIndex.set(e),
                this._lastVal.set(t),
                this._lastType.set(i);
            }),
            (S.prototype.updatePivot = function (e, t) {
              this._lastIndex.set(e), this._lastVal.set(t);
            }),
            (S.prototype.lastPrice = function () {
              return this._lastVal.get();
            }),
            (S.prototype.lastIndex = function () {
              return this._lastIndex.get();
            }),
            (S.prototype.addPoint = function (e, t, i) {
              if (isNaN(this._lastVal.get())) this.addPivot(e, t, i);
              else {
                var s = this._lastVal.get();
                if (this._lastType.get() !== i)
                  Math.abs(s - t) / t > this._deviation &&
                    this.addPivot(e, t, i);
                else (i === v.HIGH ? t > s : t < s) && this.updatePivot(e, t);
              }
            }),
            (S.prototype.processPivot = function (e) {
              e.update(),
                this._isBarClosed &&
                  e.isPivotFound() &&
                  this.addPoint(
                    e.pivotIndex(),
                    e.currentValue(),
                    e.pivotType(),
                  );
            }),
            (g.zigzag = function (e, t, i) {
              return new S(e, t, i).lastPrice();
            }),
            (g.zigzagbars = function (e, t, i) {
              var s = new S(e, t, i);
              return -1 === s.lastIndex() ? NaN : s.lastIndex() - g.n(i);
            }),
            (y.prototype.new_sym = function (e, t, i, s) {
              return this.symbol.script.add_sym(e, t, i, s);
            }),
            (y.prototype.select_sym = function (e) {
              this.symbol = this.symbol.script.get_sym(e);
            }),
            (y.prototype.new_var = function (e) {
              var t = this.vars;
              t.length <= this.vars_index && t.push(new b(this.symbol));
              var i = t[this.vars_index++];
              return arguments.length > 0 && i.set(e), i;
            }),
            (y.prototype.new_unlimited_var = function (e) {
              var t = this.vars;
              t.length <= this.vars_index && t.push(new w(this.symbol));
              var i = t[this.vars_index++];
              return arguments.length > 0 && i.set(e), i;
            }),
            (y.prototype.new_ctx = function () {
              return (
                this.ctx.length <= this.ctx_index &&
                  this.ctx.push(new y(this.symbol)),
                this.ctx[this.ctx_index++]
              );
            }),
            (y.prototype.prepare = function (e) {
              (this.ctx_index = 0), (this.vars_index = 0);
              for (var t = 0; t < this.vars.length; t++)
                this.vars[t].prepare(e);
              for (var i = 0; i < this.ctx.length; i++) this.ctx[i].prepare(e);
            }),
            (y.prototype.maxAdditionalDepth = function () {
              if (null !== this.minimumAdditionalDepth)
                return this.minimumAdditionalDepth;
              for (var e = 0, t = 0; t < this.vars.length; t++) {
                var i = this.vars[t].mindepth;
                !isNaN(i) && i > e && (e = i);
              }
              return e;
            }),
            (y.prototype.stop = function () {
              (this.symbol = null), (this.vars = null);
            }),
            (y.prototype.setMinimumAdditionalDepth = function (e) {
              this.minimumAdditionalDepth = e;
            }),
            (b.prototype.valueOf = function () {
              return this.get(0);
            }),
            (b.prototype.get = function (e) {
              return (
                isNaN(e) && (e = 0),
                (e = e || 0),
                this.hist
                  ? e >= this.hist.length
                    ? (console.error("not enough depth: " + this), NaN)
                    : this._get(e)
                  : ((this.mindepth = g.max(this.mindepth, e)), NaN)
              );
            }),
            (b.prototype._get = function (e) {
              var t = this.hist_pos - e;
              return t < 0 && (t += this.hist.length), this.hist[t];
            }),
            (b.prototype.set = function (e) {
              this.hist &&
                ((this.hist[this.hist_pos] = e), (this.modified = !0));
            }),
            (b.prototype.prepare = function (e) {
              e === this.symbol &&
                (e.isNewBar
                  ? ((this.original = this.get(0)),
                    (!this.modified && this.hist) || this.add_hist())
                  : this.set(this.original),
                (this.modified = !1));
            }),
            (b.prototype.add_hist = function () {
              if (!this.hist) {
                var e = g.na(this.mindepth)
                  ? g.max_series_default_size
                  : g.max(this.mindepth + 1, 1);
                e = Math.round(e);
                for (var t = new Array(e), i = 0; i < e; i++) t[i] = NaN;
                (this.hist = t), (this.hist_pos = -1);
              }
              (this.hist_pos = Math.min(this.hist_pos + 1, this.hist.length)),
                this.hist_pos === this.hist.length &&
                  ((this.hist_pos = this.hist.length - 1),
                  this.hist.shift(),
                  this.hist.push(NaN)),
                (this.hist[this.hist_pos] = this.original);
            }),
            (b.prototype.adopt = function (e, t, i) {
              this.hist || (this.mindepth = NaN);
              var s = t.get(),
                r = e.indexOf(s);
              if (0 !== i) {
                var n = t.get(1);
                if (!g.na(n)) r = r === e.indexOf(n) ? -1 : r;
              }
              return r < 0 ? NaN : this._get(r);
            }),
            (b.prototype.indexOf = function (e) {
              if (!this.hist) return (this.mindepth = NaN), -1;
              if (g.na(e)) return -1;
              var t = this.hist.length,
                i = this.symbol.index + 1,
                s = Math.min(t, i),
                n = r.upperbound_int(this.hist, e, 0, s);
              return 0 === n ? -1 : s - n;
            }),
            n(w, b),
            (w.prototype.add_hist = function () {
              if (
                (this.hist ||
                  ((this.hist = new Float64Array(2e3)), (this.hist_pos = -1)),
                (this.hist_pos = this.hist_pos + 1),
                this.hist_pos === this.hist.length)
              ) {
                var e = new Float64Array(2 * this.hist.length);
                e.set(this.hist), (this.hist = e);
              }
              this.hist[this.hist_pos] = this.original;
            }),
            (P.prototype.set_symbolinfo = function (e) {
              e ||
                console.error(
                  "WARN: symbolinfo isn't defined for " + this.tickerid,
                ),
                (this.info = e),
                (this.minTick = e.minmov / e.pricescale),
                (this.currencyCode = e.currency_code),
                (this.unitId = e.unit_id),
                (this.timezone = p.get_timezone(e.timezone)),
                this.session.init(
                  e.timezone,
                  e.session,
                  e.session_holidays,
                  e.corrections,
                );
            }),
            (P.prototype.isdwm = function () {
              return (
                "" !== this.resolution &&
                "S" !== this.resolution &&
                "T" !== this.resolution
              );
            }),
            (P.prototype.enable_dwm_aligning = function (e, t) {
              this.dwm_aligner = _.newBarBuilder(this.period, e, t);
            }),
            (P.prototype.bartime = function () {
              var e = this.time;
              if (!this.isdwm() || isNaN(e)) return e;
              var t = p.utc_to_cal(this.timezone, e);
              return (
                this.session.spec.correctTradingDay(t),
                p.cal_to_utc(this.timezone, t)
              );
            }),
            (P.prototype.lastbar = function (e) {
              if (!isNaN(e.time)) {
                var t = e.time;
                this.dwm_aligner &&
                  (this.dwm_aligner.moveTo(t),
                  (t = this.dwm_aligner.startOfBar(0)));
                var i = this.time !== t;
                i &&
                  this.index >= 0 &&
                  !this.isBarClosed &&
                  ((this.isNewBar = !1),
                  (this.isBarClosed = !0),
                  this.script.calc(this)),
                  (this.time = t),
                  (this.open = e.open),
                  (this.high = e.high),
                  (this.low = e.low),
                  (this.close = e.close),
                  (this.volume = e.volume),
                  (this.updatetime = e.updatetime),
                  (this.isNewBar = i),
                  (this.isBarClosed = e.isBarClosed),
                  (this.isLastBar = e.isLastBar),
                  this.isNewBar &&
                    (this.index++, (this.isFirstBar = 0 === this.index)),
                  this.script.calc(this);
              }
            }),
            (C.prototype.calc = function (e) {
              var t = this.ctx,
                i = this.body;
              t.prepare(e);
              var s = i.main(t, this.inputCallback, e);
              if (s && "composite" === s.type)
                for (let e = 0; e < s.data.length; ++e)
                  this._processResult(s.data[e]);
              else this._processResult(s);
            }),
            (C.prototype._processResult = function (e) {
              var t = this.ctx,
                i = this;
              this.out &&
                e &&
                (!isNaN(t.symbol.time) || e.nonseries) &&
                (e.nonseries
                  ? ("projection" === e.type &&
                      (e.projectionTime = t.symbol.time),
                    this.nonseriesOut(t.symbol, e))
                  : e.bars
                  ? e.bars.forEach(function (e) {
                      i.out(t.symbol, e);
                    })
                  : this.out(t.symbol, e));
            }),
            (C.prototype.init = function () {
              var e = this.ctx,
                t = this.body;
              t.init && t.init(e, this.inputCallback),
                t.main(e, this.inputCallback);
            }),
            (C.prototype.add_sym = function (e, t, i, s, r) {
              var n = this.runner.add_sym(e, t, i, s, this, r);
              return (
                this.symbols.push(n),
                n.isdwm() &&
                  this.symbols.length > 1 &&
                  n.enable_dwm_aligning(this.symbols[0].session, n.session),
                n
              );
            }),
            (C.prototype.maxAdditionalDepth = function () {
              return this.symbols[0].isAdditionalDepthAllowed
                ? this.ctx.maxAdditionalDepth()
                : 0;
            }),
            (C.prototype.stop = function () {
              (this.symbols = null), this.ctx.stop(), (this.ctx = null);
            }),
            (C.prototype.get_sym = function (e) {
              return this.symbols[e];
            }),
            (T.prototype.add_sym = function (e, t, i, s, r, n) {
              var o = new P(e, t, i, s, r, n);
              return this.symbols.push(o), o;
            }),
            (T.prototype.get_sym = function (e) {
              return this.symbols[e];
            }),
            (T.prototype.out = function (e, t) {
              if (this.nonseriesUpdate) {
                var i = Object.assign({}, this.nonseriesUpdate);
                t.splice(0, 0, e.time),
                  (i.lastBar = t),
                  this.host.nonseriesOut(e, i);
              } else this.host.out(e, t);
            }),
            (T.prototype.start = function () {
              this.isStarted = !0;
              var e = this.host;
              this._script = new C(
                e.tickerid,
                e.period,
                e.currencyCode,
                e.unitId,
                this,
                e.body,
                this.out.bind(this),
                e.input,
                e.nonseriesOut,
                e.symbolInfo,
              );
              var t = this,
                i = [],
                s = this.symbols,
                r = Object.assign({}, e.dataRange, {
                  countBack:
                    e.dataRange.countBack + t._script.maxAdditionalDepth(),
                }),
                n = s[0];
              function o(t, s, r) {
                i.push(
                  T.feed.subscribe(
                    t.tickerid,
                    t.currencyCode,
                    t.unitId,
                    t.period,
                    r,
                    e.onErrorCallback,
                    e.symbolInfo,
                    e.sessionId,
                    s,
                    e.forceAlignBars,
                  ),
                );
              }
              function h(i, s) {
                "series" === (s.nonseries ? "nonseries" : "series")
                  ? t.update(i, s)
                  : s.lastBar
                  ? ((t.nonseriesUpdate = s),
                    (s.lastBar.isLastBar = !0),
                    t.symbols[0].lastbar(s.lastBar),
                    (t.nonseriesUpdate = null))
                  : e.nonseriesOut(p, s);
              }
              function d() {
                return r;
              }
              o(n, d, function (e) {
                !e.nonseries &&
                  Number.isFinite(e.firstLoadedTimeMs) &&
                  (function (e) {
                    function i(i, s) {
                      var r = c(i, s)(e),
                        n = l(i, s);
                      return (
                        null !== n && (r = n.timeToExchangeTradingDay(r)),
                        {to: r, countBack: t._script.maxAdditionalDepth()}
                      );
                    }
                    for (var r = 1; r < s.length; r++) {
                      var d = s[r],
                        u = d.period;
                      a.isEqual(u, n.period) ||
                        o(d, i.bind(null, u), h.bind(null, r));
                    }
                  })(e.firstLoadedTimeMs),
                  h(0, e);
              });
              for (var u = 1; u < s.length; u++) {
                var p = s[u];
                a.isEqual(p.period, n.period) && o(p, d, h.bind(null, u));
              }
              this.subscription = i;
            }),
            (T.prototype.stop = function () {
              var e = this.subscription;
              if (e || this._script) {
                for (var t = 0; t < e.length; t++) T.feed.unsubscribe(e[t]);
                (this.subscription = null),
                  this._script.stop(),
                  (this._script = null),
                  (this.symbols = null),
                  (this.isStarted = !1);
              } else console.warn("Recurring script engine stop happened.");
            }),
            (T.prototype.update = function (e, t) {
              if (t) {
                var i = this.symbols[e];
                if (this.isRecalculated) {
                  var s = t.bar(t.count() - 1);
                  (s.isBarClosed = t.isLastBarClosed()),
                    (s.isLastBar = !0),
                    i.lastbar(s);
                } else
                  this.barsets[e] ||
                    ((this.barsets[e] = t),
                    i.set_symbolinfo(t.symbolinfo()),
                    this.recalc());
              } else console.error("Unexpected barset = null");
            }),
            (T.prototype.recalc = function () {
              for (var e = this.symbols, t = 0; t < e.length; t++)
                if (!this.barsets[t]) return;
              try {
                for (var i = e.length - 1; i >= 0; i--)
                  for (
                    var s = e[i], r = this.barsets[i], n = r.count(), o = 0;
                    o < n;
                    o++
                  ) {
                    var a = r.bar(o);
                    (a.isLastBar = o === n - 1),
                      (a.isBarClosed = !a.isLastBar || r.isLastBarClosed()),
                      s.lastbar(a);
                  }
                (this.isRecalculated = !0),
                  this.barsets[0] &&
                    this.barsets[0].endOfData &&
                    this.host.setNoMoreData(),
                  this.host.recalc(this, {
                    endOfData: this.barsets[0].endOfData,
                    firstLoadedTimeMs: this.barsets[0].firstLoadedTimeMs,
                  });
              } catch (e) {
                if (!e.studyError) throw e;
                this.host.onErrorCallback(e.message);
              }
            }),
            (T.feed = {
              subscribe: function (e, t, i, s, r) {
                console.error("must be initialized with setupFeed");
              },
              unsubscribe: function (e) {
                console.error("must be initialized with setupFeed");
              },
            }),
            (x.prototype.stop = function () {
              this.runner.stop();
            }),
            (x.prototype.isStarted = function () {
              return this.runner.isStarted;
            }),
            (I.prototype.symbolinfo = function () {
              return this.info;
            }),
            (I.prototype.isLastBarClosed = function () {
              return this.isBarClosed;
            }),
            (I.prototype.setLastBarClosed = function (e) {
              this.isBarClosed = e;
            }),
            (I.prototype.bar = function (e) {
              return this.bars[e];
            }),
            (I.prototype.count = function () {
              return this.bars.length;
            }),
            (I.prototype.add = function (e, t) {
              var i = e,
                s = this.bars,
                r = s.length,
                n = i.time,
                o = 0 === r ? NaN : s[r - 1].time;
              0 === r || o < n
                ? s.push(i)
                : o === n
                ? (s[r - 1] = i)
                : console.error(
                    "time order violation, prev: " +
                      new Date(o).toUTCString() +
                      ", cur: " +
                      new Date(n).toUTCString(),
                  ),
                (this.isBarClosed = !!t);
            }),
            (M.prototype.init = function (e) {
              (this.bb = _.newBarBuilder(this.period, e.symbol.session)),
                (this.bbEmptyBars = this.generateEmptyBars
                  ? _.newBarBuilder(this.period, e.symbol.session)
                  : void 0),
                e.setMinimumAdditionalDepth(0);
            }),
            (M.prototype.extrapolate = function (e, t) {
              return isNaN(e) || isNaN(t)
                ? void 0
                : m(this.bbEmptyBars, e, t, Number.MAX_SAFE_INTEGER, !0).times;
            }),
            (M.prototype.main = function (e) {
              var t = e.symbol.time,
                i = this.bb.alignTime(t),
                s = e.new_var(i),
                r = g.na(i),
                n = s.get(1),
                o = g.na(n) ? 1 : g.neq(i, n),
                a = e.new_var(),
                l = e.new_var(),
                c = e.new_var(),
                h = e.new_var(),
                d = a.get(1),
                u = l.get(1),
                p = c.get(1),
                _ = h.get(1),
                m = r ? NaN : o ? g.open(e) : d,
                f = r ? NaN : o ? g.high(e) : g.max(g.high(e), u),
                v = r ? NaN : o ? g.low(e) : g.min(g.low(e), p),
                S = r ? NaN : g.close(e),
                y = r ? NaN : o ? g.volume(e) : g.volume(e) + _,
                b = r ? NaN : t,
                w = e.symbol.isBarClosed && this.bb.isLastBar(0, t),
                P =
                  this.generateEmptyBars && o ? this.extrapolate(n, i) : void 0,
                C = e.new_var(g.close(e)).get(1),
                T = P instanceof Array ? C : NaN;
              return (
                a.set(m),
                l.set(f),
                c.set(v),
                h.set(y),
                [i, m, f, v, S, y, b, w, P, T]
              );
            }),
            (L.prototype.main = function (e) {
              return [
                g.open(e),
                g.high(e),
                g.low(e),
                g.close(e),
                g.volume(e),
                g.updatetime(e),
              ];
            }),
            {
              Std: g,
              Series: b,
              Symbol: P,
              SymbolInfo: function (e, t) {
                (this.timezone = e || "America/New_York"),
                  (this.session = t || "0000-0000");
              },
              StudyEngine: x,
              BarSet: I,
              OHLCV: L,
              BarBuilder: M,
              setupFeed: function (e) {
                T.feed = e;
              },
              getVolumeProfileResolutionForPeriod: function (t, i, s, r) {
                return void 0 !== e ? e(t, i, s, r) : t;
              },
              overwriteVolumeProfileResolutionForPeriodGetter: function (t) {
                e = t;
              },
            }
          );
        })();
      e.exports = u;
    },
    82708: (e, t, i) => {
      "use strict";
      const s = i(53312).getHexColorByName;
      var r = i(77392);
      i(81137);
      var n = i(19680).pivotPointsStandardStudyItem,
        o = i(62649).volumeProfileVisibleRangeStudyItem,
        a = i(62243).volumeProfileFixedRangeVbPStudyItem,
        l = i(62243).volumeProfileFixedRangeBSStudyItem,
        c = i(30934).spreadStudyItem,
        h = i(67366).ratioStudyItem,
        d = i(46433).regressionTrendStudyItem;
      const u = s("color-ripe-red-400"),
        p = s("color-minty-green-400");
      JSServer.studyLibrary = JSServer.studyLibrary.concat([
        {
          name: "Compare",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !0,
            defaults: {
              styles: {
                compare: {
                  linestyle: 0,
                  linewidth: 2,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#9C27B0",
                },
              },
              inputs: {source: "close", symbol: ""},
            },
            plots: [{id: "compare", type: "line"}],
            styles: {compare: {title: "Plot", histogramBase: 0}},
            description: "Compare",
            shortDescription: "Compare",
            is_price_study: !0,
            inputs: [
              {
                defval: "close",
                id: "source",
                name: "Source",
                options: [
                  "open",
                  "high",
                  "low",
                  "close",
                  "hl2",
                  "hlc3",
                  "ohlc4",
                ],
                type: "text",
              },
              {id: "symbol", name: "Symbol", type: "symbol", isHidden: !0},
            ],
            id: "Compare@tv-basicstudies-1",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                this._context.new_sym(t(1), r.Std.period(this._context));
            }),
              (this.main = function (e, t) {
                this._context = e;
                var i = this._context.new_unlimited_var(
                  this._context.symbol.time,
                );
                this._context.select_sym(1);
                var s = this._context.new_unlimited_var(
                    this._context.symbol.time,
                  ),
                  n = r.Std[t(0)](this._context),
                  o = this._context.new_unlimited_var(n);
                return this._context.select_sym(0), [o.adopt(s, i, 0)];
              });
          },
        },
        {
          name: "Overlay",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !0,
            defaults: {styles: {}, inputs: {symbol: ""}},
            plots: [
              {id: "open", type: "line"},
              {id: "high", type: "line"},
              {id: "low", type: "line"},
              {id: "close", type: "line"},
            ],
            styles: {
              open: {title: "Open"},
              high: {title: "High"},
              low: {title: "Low"},
              close: {title: "Close"},
            },
            description: "Overlay",
            shortDescription: "Overlay",
            is_price_study: !1,
            inputs: [
              {
                id: "symbol",
                name: "symbol",
                defval: "",
                type: "symbol",
                isHidden: !0,
              },
            ],
            id: "Overlay@tv-basicstudies-1",
            format: {type: "price", precision: 4},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                this._context.new_sym(t(0), r.Std.period(this._context));
            }),
              (this.main = function (e, t) {
                this._context = e;
                var i = this._context.new_unlimited_var(
                  this._context.symbol.time,
                );
                this._context.select_sym(1);
                var s = this._context.new_unlimited_var(
                    this._context.symbol.time,
                  ),
                  n = this._context.new_unlimited_var(
                    r.Std.open(this._context),
                  ),
                  o = this._context.new_unlimited_var(
                    r.Std.high(this._context),
                  ),
                  a = this._context.new_unlimited_var(r.Std.low(this._context)),
                  l = this._context.new_unlimited_var(
                    r.Std.close(this._context),
                  );
                return (
                  this._context.select_sym(0),
                  [
                    n.adopt(s, i, 1),
                    o.adopt(s, i, 1),
                    a.adopt(s, i, 1),
                    l.adopt(s, i, 1),
                  ]
                );
              });
          },
        },
        {
          name: "Volume",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                vol: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 5,
                  trackPrice: !1,
                  transparency: 50,
                  visible: !0,
                  color: "#000080",
                },
                vol_ma: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !1,
                  color: "#2196F3",
                },
                smoothedMA: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !1,
                  color: "#2196F3",
                },
              },
              palettes: {
                volumePalette: {
                  colors: {
                    0: {color: u, width: 1, style: 0},
                    1: {color: p, width: 1, style: 0},
                  },
                },
              },
              inputs: {
                showMA: !1,
                length: 20,
                col_prev_close: !1,
                symbol: "",
                smoothingLine: "SMA",
                smoothingLength: 9,
              },
            },
            plots: [
              {id: "vol", type: "line"},
              {
                id: "volumePalette",
                palette: "volumePalette",
                target: "vol",
                type: "colorer",
              },
              {id: "vol_ma", type: "line"},
              {id: "smoothedMA", type: "line"},
            ],
            styles: {
              vol: {title: "Volume", histogramBase: 0},
              vol_ma: {title: "Volume MA", histogramBase: 0},
              smoothedMA: {title: "Smoothed MA", histogramBase: 0},
            },
            description: "Volume",
            shortDescription: "Volume",
            is_price_study: !1,
            palettes: {
              volumePalette: {
                colors: {0: {name: "Falling"}, 1: {name: "Growing"}},
              },
            },
            inputs: [
              {
                id: "symbol",
                name: "Other Symbol",
                defval: "",
                type: "symbol",
                optional: !0,
                isHidden: !1,
              },
              {
                id: "showMA",
                name: "show MA",
                defval: !1,
                type: "bool",
                isHidden: !0,
              },
              {
                id: "length",
                name: "MA Length",
                defval: 20,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                defval: !1,
                id: "col_prev_close",
                name: "Color based on previous close",
                type: "bool",
              },
              {
                id: "smoothingLine",
                name: "Smoothing Line",
                defval: "SMA",
                type: "text",
                options: ["SMA", "EMA", "WMA"],
              },
              {
                id: "smoothingLength",
                name: "Smoothing Length",
                defval: 9,
                type: "integer",
                min: 1,
                max: 1e4,
              },
            ],
            id: "Volume@tv-basicstudies-1",
            format: {type: "volume"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                "" !== t(0) &&
                  this._context.new_sym(t(0), r.Std.period(this._context));
            }),
              (this.f_0 = function (e, t) {
                return r.Std.gt(e, t) ? 0 : 1;
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = r.Std.volume(this._context),
                  s = r.Std.open(this._context),
                  n = r.Std.close(this._context),
                  o = this._context.new_var(this._context.symbol.time),
                  a = this._input(4),
                  l = this._input(5);
                if (
                  (this._context.setMinimumAdditionalDepth(this._input(2) + l),
                  "" !== this._input(0))
                ) {
                  this._context.select_sym(1);
                  var c = this._context.new_var(this._context.symbol.time),
                    h = this._context.new_var(r.Std.volume(this._context)),
                    d = this._context.new_var(r.Std.open(this._context)),
                    u = this._context.new_var(r.Std.close(this._context));
                  (i = h.adopt(c, o, 1)),
                    (s = d.adopt(c, o, 1)),
                    (n = u.adopt(c, o, 1)),
                    this._context.select_sym(0);
                }
                var p,
                  _,
                  m = this._context.new_var(i),
                  g = r.Std.sma(m, this._input(2), this._context),
                  f = this._context.new_var(g),
                  v = this._context.new_var(n);
                return (
                  (p =
                    v.get(1) && this._input(3)
                      ? this.f_0(v.get(1), n)
                      : this.f_0(s, n)),
                  "EMA" === a
                    ? (_ = r.Std.ema(f, l, this._context))
                    : "WMA" === a
                    ? (_ = r.Std.wma(f, l, this._context))
                    : "SMA" === a && (_ = r.Std.sma(f, l, this._context)),
                  [i, p, g, _]
                );
              });
          },
        },
        {
          name: "ZigZag",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 2,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 5, in_1: 10},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", target: "plot_0", type: "dataoffset"},
            ],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Zig Zag",
            shortDescription: "ZigZag",
            is_price_study: !0,
            classId: "ScriptWithDataOffset",
            inputs: [
              {
                id: "in_0",
                name: "deviation",
                defval: 5,
                type: "float",
                min: 0.001,
                max: 100,
              },
              {
                id: "in_1",
                name: "depth",
                defval: 10,
                type: "integer",
                min: 2,
                max: 1e3,
              },
            ],
            id: "ZigZag@tv-basicstudies-1",
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = this._input(0),
                s = this._input(1),
                n = i / 100,
                o = Math.ceil(s / 2);
              return [
                r.Std.zigzag(n, o, this._context),
                r.Std.zigzagbars(n, o, this._context),
              ];
            };
          },
        },
        {
          name: "Sessions",
          metainfo: {
            _metainfoVersion: 52,
            defaults: {
              graphics: {
                vertlines: {
                  sessBreaks: {
                    color: "#4985e7",
                    style: 2,
                    visible: !1,
                    width: 1,
                  },
                },
              },
              linkedToSeries: !0,
            },
            description: "Sessions",
            graphics: {
              vertlines: {sessBreaks: {name: "Session Break", halign: "left"}},
            },
            id: "Sessions@tv-basicstudies-1",
            inputs: [],
            is_hidden_study: !0,
            is_price_study: !0,
            name: "Sessions@tv-basicstudies",
            palettes: {},
            plots: [],
            shortDescription: "Sessions",
            format: {type: "inherit"},
          },
          constructor: function () {
            function e(e, t) {
              return {id: e, index: e, extendBottom: !0, extendTop: !0};
            }
            (this.init = function () {
              this._times = [];
            }),
              (this._getVerticalLineData = function (t) {
                return r.Std.selectSessionBreaks(t, this._times).map(e);
              }),
              (this.main = function (e, t) {
                if (r.Std.isdwm(e)) return null;
                var i = r.Std.time(e);
                if (isNaN(i)) return null;
                var s = this._times.length;
                if (
                  ((0 !== s && this._times[s - 1] === i) || this._times.push(i),
                  !e.symbol.isLastBar || !e.symbol.isNewBar)
                )
                  return null;
                var n = this._getVerticalLineData(e);
                return 0 === n.length
                  ? null
                  : {
                      nonseries: !0,
                      type: "study_graphics",
                      data: {
                        graphicsCmds: {
                          create: {
                            vertlines: [{styleId: "sessBreaks", data: n}],
                          },
                          erase: [{action: "all"}],
                        },
                      },
                    };
              });
          },
        },
        {
          name: "SuperTrend",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 3,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 35,
                  visible: !0,
                  color: "#000080",
                },
                plot_2: {
                  linestyle: 0,
                  linewidth: 3,
                  plottype: "shape_arrow_up",
                  trackPrice: !1,
                  location: "BelowBar",
                  transparency: 35,
                  visible: !0,
                  color: "#00FF00",
                },
                plot_3: {
                  linestyle: 0,
                  linewidth: 3,
                  plottype: "shape_arrow_down",
                  trackPrice: !1,
                  location: "AboveBar",
                  transparency: 35,
                  visible: !0,
                  color: "#FF0000",
                },
              },
              palettes: {
                palette_0: {
                  colors: {
                    0: {color: "#008000", width: 3, style: 0},
                    1: {color: "#800000", width: 3, style: 0},
                  },
                },
              },
              inputs: {in_0: 10, in_1: 3},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {
                id: "plot_1",
                palette: "palette_0",
                target: "plot_0",
                type: "colorer",
              },
              {id: "plot_2", type: "shapes"},
              {id: "plot_3", type: "shapes"},
            ],
            styles: {
              plot_0: {
                title: "SuperTrend",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
              plot_2: {
                title: "Up Arrow",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
              plot_3: {
                title: "Down Arrow",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
            },
            description: "SuperTrend",
            shortDescription: "SuperTrend",
            is_price_study: !0,
            palettes: {
              palette_0: {
                colors: {0: {name: "Color 0"}, 1: {name: "Color 1"}},
                valToIndex: {0: 0, 1: 1},
              },
            },
            inputs: [
              {
                id: "in_0",
                name: "Length",
                defval: 10,
                type: "integer",
                min: 1,
                max: 100,
              },
              {
                id: "in_1",
                name: "Factor",
                defval: 3,
                type: "float",
                min: 1,
                max: 100,
              },
            ],
            id: "SuperTrend@tv-basicstudies-1",
            scriptIdPart: "",
            name: "SuperTrend",
            isCustomIndicator: !0,
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              var i = t(0),
                s = t(1),
                [n, o] = r.Std.supertrend(s, i, e),
                a = e.new_var(o).get(1);
              return [
                n,
                -1 === o ? 0 : 1,
                -1 === o && a !== o ? 1 : NaN,
                1 === o && a !== o ? 1 : NaN,
              ];
            };
          },
        },
        n,
        o,
        a,
        l,
        c,
        h,
        d,
      ]);
    },
    19680: (e, t, i) => {
      "use strict";
      i.d(t, {pivotPointsStandardStudyItem: () => d});
      var s = i(77392),
        r = i(35001),
        n = i(5280);
      class o {
        constructor() {
          (this.p = NaN),
            (this.r1 = NaN),
            (this.s1 = NaN),
            (this.r2 = NaN),
            (this.s2 = NaN),
            (this.r3 = NaN),
            (this.s3 = NaN),
            (this.r4 = NaN),
            (this.s4 = NaN),
            (this.r5 = NaN),
            (this.s5 = NaN),
            (this.startIndex__t = NaN),
            (this.endIndex__t = NaN);
        }
      }
      class a {
        constructor() {
          this.pivots = [];
        }
      }
      function l(e, t) {
        e.setUTCMonth(e.getUTCMonth() + t);
      }
      function c(e, t) {
        if (s.Std.ismonthly(e)) {
          let i = new Date(t);
          return (
            i.getUTCDay() <
            (function (e, t) {
              return new Date(t, e, 0).getDate();
            })(i.getUTCMonth(), i.getUTCFullYear())
              ? (l(i, s.Std.interval(e)),
                (i = s.Std.add_days_considering_dst(
                  "Etc/UTC",
                  i,
                  1 - i.getUTCDay(),
                )))
              : ((i = s.Std.add_days_considering_dst("Etc/UTC", i, 1)),
                l(i, s.Std.interval(e))),
            i.valueOf()
          );
        }
        return t + r.Interval.parse(e.symbol.resolution).inMilliseconds(t);
      }
      function h(e, t) {
        switch (t) {
          case "Auto":
            return (function (e) {
              const t = r.Interval.parse(
                e.symbol.interval + e.symbol.resolution,
              );
              switch (t.kind()) {
                case r.ResolutionKind.Weeks:
                case r.ResolutionKind.Months:
                  return "12M";
                case r.ResolutionKind.Days:
                  return "1M";
                case r.ResolutionKind.Minutes:
                  return t.multiplier() >= 1 && t.multiplier() <= 15
                    ? "1D"
                    : "1W";
                case r.ResolutionKind.Seconds:
                case r.ResolutionKind.Ticks:
                  return "1D";
              }
              throw new Error(
                "Unexpected resolution type: " + e.symbol.resolution,
              );
            })(e);
          case "Daily":
            return "1D";
          case "Weekly":
            return "1W";
          case "Monthly":
            return "1M";
          case "Yearly":
            return "12M";
          default:
            throw new Error("No such pivTimeFrame: " + t);
        }
      }
      const d = {
        name: "Pivot Points Standard",
        metainfo: {
          _metainfoVersion: 44,
          defaults: {
            inputs: {
              kind: "Traditional",
              lookBack: 15,
              pivTimeFrame: "Auto",
              showHistoricalPivots: !0,
            },
            precision: "4",
          },
          description: "Pivot Points Standard",
          id: "PivotPointsStandard@tv-basicstudies-80",
          inputs: [
            {
              defval: "Traditional",
              id: "kind",
              name: "Type",
              options: [
                "Traditional",
                "Fibonacci",
                "Woodie",
                "Classic",
                "DeMark",
                "Camarilla",
              ],
              type: "text",
            },
            {
              defval: !0,
              id: "showHistoricalPivots",
              name: "Show historical pivots",
              type: "bool",
            },
            {
              defval: "Auto",
              id: "pivTimeFrame",
              name: "Pivots Timeframe",
              options: ["Auto", "Daily", "Weekly", "Monthly", "Yearly"],
              type: "text",
            },
            {
              defval: 15,
              id: "lookBack",
              max: 5e3,
              min: 1,
              name: "Number of Pivots Back",
              type: "integer",
            },
          ],
          is_price_study: !0,
          linkedToSeries: !0,
          shortDescription: "Pivots",
        },
        constructor: class {
          constructor() {
            (this._secondaryRes = "1D"), (this._firstMainSeriesBarTime = NaN);
          }
          init(e, t) {
            const i = t(0),
              r = t(1),
              o = t(2),
              l = t(3);
            (this._data = new a()),
              (this._firstMainSeriesBarTime = NaN),
              (this._kindPP = (function (e) {
                switch (e) {
                  case "Traditional":
                    return 0;
                  case "Fibonacci":
                    return 1;
                  case "Woodie":
                    return 2;
                  case "Classic":
                    return 3;
                  case "DeMark":
                    return 4;
                  case "Camarilla":
                    return 5;
                  default:
                    throw new Error("Unknown kind " + e);
                }
              })(i)),
              (this._showHistoricalPivots = r),
              (this._historicalPivotsToKeep = l),
              (this._pivTimeFrame = o),
              (this._isValidResolution = (function (e, t) {
                return (
                  (!s.Std.isdaily(e) || "Daily" !== t) &&
                  (!s.Std.isweekly(e) || ("Daily" !== t && "Weekly" !== t)) &&
                  (!s.Std.ismonthly(e) ||
                    ("Daily" !== t && "Weekly" !== t && "Monthly" !== t))
                );
              })(e, this._pivTimeFrame)),
              this._isValidResolution ||
                s.Std.error(
                  "You cannot see this pivot timeframe on this resolution",
                ),
              this._isValidResolution &&
                ((this._secondaryRes = h(e, this._pivTimeFrame)),
                void 0 !== e.symbol.info &&
                  (0, n.findSuitableResolutionToBuildFrom)(
                    this._secondaryRes,
                    e.symbol.info,
                  ).error &&
                  ((this._isValidResolution = !1),
                  s.Std.error(
                    `Resolution ${this._secondaryRes} is not supported for this symbol`,
                  ))),
              e.new_sym(e.symbol.tickerid, this._secondaryRes);
          }
          main(e) {
            if (!this._isValidResolution) return null;
            if (e.symbol.time)
              return (
                isNaN(this._firstMainSeriesBarTime) &&
                  ((this._firstMainSeriesBarTime = e.symbol.time),
                  this._removeUnusedPivots()),
                e.symbol.isLastBar && e.symbol.isNewBar
                  ? this._createResponse()
                  : null
              );
            e.select_sym(1);
            const t = e.new_var(s.Std.open(e)),
              i = e.new_var(s.Std.high(e)),
              r = e.new_var(s.Std.low(e)),
              n = e.new_var(s.Std.close(e)),
              a = e.new_var(s.Std.time(e)),
              l = this._data,
              h = t.get(0),
              d = a.get(0),
              u = t.get(1),
              p = i.get(1),
              _ = r.get(1),
              m = n.get(1),
              g = e.symbol.isLastBar;
            if (0 !== l.pivots.length && e.symbol.isNewBar) {
              const e = l.pivots[l.pivots.length - 1];
              e.endIndex__t !== d && (e.endIndex__t = d);
            }
            if (0 === e.symbol.index || !e.symbol.isNewBar)
              return e.select_sym(0), null;
            const f = (function (e, t, i, r, n, a, l, c) {
              const h = new o();
              let d = NaN;
              const u = i - r;
              switch (c) {
                case 0:
                  (d = (i + r + n) / 3),
                    (h.p = d),
                    (h.r1 = 2 * d - r),
                    (h.s1 = 2 * d - i),
                    (h.r2 = d + (i - r)),
                    (h.s2 = d - (i - r)),
                    (h.r3 = 2 * d + (i - 2 * r)),
                    (h.s3 = 2 * d - (2 * i - r)),
                    (h.r4 = 3 * d + (i - 3 * r)),
                    (h.s4 = 3 * d - (3 * i - r)),
                    (h.r5 = 4 * d + (i - 4 * r)),
                    (h.s5 = 4 * d - (4 * i - r));
                  break;
                case 1:
                  (d = (i + r + n) / 3),
                    (h.p = d),
                    (h.r1 = d + 0.382 * u),
                    (h.s1 = d - 0.382 * u),
                    (h.r2 = d + 0.618 * u),
                    (h.s2 = d - 0.618 * u),
                    (h.r3 = d + u),
                    (h.s3 = d - u);
                  break;
                case 2:
                  (d = (i + r + 2 * e) / 4),
                    (h.p = d),
                    (h.r1 = 2 * d - r),
                    (h.s1 = 2 * d - i),
                    (h.r2 = d + u),
                    (h.s2 = d - u),
                    (h.r3 = i + 2 * (d - r)),
                    (h.s3 = r - 2 * (i - d)),
                    (h.r4 = h.r3 + u),
                    (h.s4 = h.s3 - u);
                  break;
                case 3:
                  (d = (i + r + n) / 3),
                    (h.p = d),
                    (h.r1 = 2 * d - r),
                    (h.s1 = 2 * d - i),
                    (h.r2 = d + u),
                    (h.s2 = d - u),
                    (h.r3 = d + 2 * u),
                    (h.s3 = d - 2 * u),
                    (h.r4 = d + 3 * u),
                    (h.s4 = d - 3 * u);
                  break;
                case 4:
                  let o = NaN;
                  (o = s.Std.equal(t, n)
                    ? i + r + 2 * n
                    : s.Std.greater(n, t)
                    ? 2 * i + r + n
                    : 2 * r + i + n),
                    (d = o / 4),
                    (h.p = d),
                    (h.r1 = o / 2 - r),
                    (h.s1 = o / 2 - i);
                  break;
                case 5:
                  (d = (i + r + n) / 3),
                    (h.p = d),
                    (h.r1 = n + (1.1 * u) / 12),
                    (h.s1 = n - (1.1 * u) / 12),
                    (h.r2 = n + (1.1 * u) / 6),
                    (h.s2 = n - (1.1 * u) / 6),
                    (h.r3 = n + (1.1 * u) / 4),
                    (h.s3 = n - (1.1 * u) / 4),
                    (h.r4 = n + (1.1 * u) / 2),
                    (h.s4 = n - (1.1 * u) / 2);
                  break;
                default:
                  throw new Error("Unknown kind");
              }
              return (h.startIndex__t = a), (h.endIndex__t = l), h;
            })(h, u, p, _, m, d, c(e, d), this._kindPP);
            return (
              e.select_sym(0),
              this._showHistoricalPivots || (l.pivots = []),
              l.pivots.push(f),
              l.pivots.length > this._historicalPivotsToKeep &&
                l.pivots.shift(),
              g ? this._createResponse() : null
            );
          }
          _createResponse() {
            return 0 === this._data.pivots.length
              ? null
              : {
                  nonseries: !0,
                  type: "non_series_data",
                  data: {data: this._data},
                };
          }
          _removeUnusedPivots() {
            const e = Math.max(
              this._data.pivots.findIndex(
                e => e.startIndex__t > this._firstMainSeriesBarTime,
              ) - 1,
              0,
            );
            e > 0 && this._data.pivots.splice(0, e);
          }
        },
      };
    },
    67366: (e, t, i) => {
      "use strict";
      i.d(t, {ratioStudyItem: () => n});
      var s = i(37796);
      class r extends s.SpreadRatioBase {
        _doCalculation(e, t, i, s) {
          return (e * t) / (i * s);
        }
      }
      const n = {
        name: "Ratio",
        metainfo: {
          _metainfoVersion: 15,
          defaults: s.spreadRatioDefaults,
          plots: s.spreadRatioPlots,
          styles: s.spreadRatioStyles,
          description: "Ratio",
          shortDescription: "Ratio",
          is_price_study: !1,
          inputs: s.spreadRatioInputs,
          id: "Ratio@tv-basicstudies-1",
        },
        constructor: r,
      };
    },
    46433: (e, t, i) => {
      "use strict";
      i.d(t, {regressionTrendStudyItem: () => n});
      var s = i(77392);
      function r(e, t, i) {
        const r = {
          slope: NaN,
          average: NaN,
          intercept: NaN,
          stdDev: NaN,
          upDev: NaN,
          downDev: NaN,
          pearsons: NaN,
        };
        return (
          0 === e.length ||
            ((function (e, t) {
              let i = 0,
                s = 0,
                r = 0,
                n = 0;
              for (let t = 0; t < e.length; ++t) {
                const o = e[t],
                  a = t + 1;
                (i += a), (s += o), (r += a * a), (n += o * a);
              }
              (t.slope = (e.length * n - i * s) / (e.length * r - i * i)),
                (t.average = s / e.length),
                (t.intercept = t.average - (t.slope * i) / e.length + t.slope);
            })(e, r),
            (function (e, t, i, r) {
              let n = 0,
                o = 0,
                a = 0,
                l = 0,
                c = 0,
                h = 0,
                d = r.intercept;
              const u = e.length - 1,
                p = r.intercept + (r.slope * u) / 2;
              for (let s = 0; s <= u; ++s) {
                let u = t[s] - d;
                u > n && (n = u), (u = d - i[s]), u > o && (o = u), (u = e[s]);
                const _ = u - r.average,
                  m = d - p;
                (u -= d),
                  (a += u * u),
                  (l += _ * _),
                  (c += m * m),
                  (h += _ * m),
                  (d += r.slope);
              }
              (r.stdDev = Math.sqrt(a / (0 === u ? 1 : u))),
                (r.pearsons =
                  s.Std.isZero(l) || s.Std.isZero(c)
                    ? 0
                    : h / Math.sqrt(l * c)),
                (r.upDev = n),
                (r.downDev = o);
            })(e, t, i, r)),
          r
        );
      }
      const n = {
        name: "Regression Trend",
        metainfo: {
          _metainfoVersion: 51,
          description: "Regression Trend",
          format: {type: "inherit"},
          id: "RegressionTrend@tv-basicstudies-144",
          is_hidden_study: !0,
          is_price_study: !0,
          shortDescription: "Reg Trend",
          defaults: {
            inputs: {
              "first bar time": 0,
              "last bar time": 0,
              "lower diviation": -2,
              source: "close",
              "upper diviation": 2,
              "use lower diviation": !0,
              "use upper diviation": !0,
            },
          },
          inputs: [
            {
              defval: 2,
              id: "upper diviation",
              max: 500,
              min: -500,
              name: "Upper Deviation",
              type: "float",
            },
            {
              defval: -2,
              id: "lower diviation",
              max: 500,
              min: -500,
              name: "Lower Deviation",
              type: "float",
            },
            {
              defval: !0,
              id: "use upper diviation",
              name: "Use Upper Deviation",
              type: "bool",
            },
            {
              defval: !0,
              id: "use lower diviation",
              name: "Use Lower Deviation",
              type: "bool",
            },
            {
              defval: 0,
              id: "first bar time",
              isHidden: !0,
              max: 253370764800,
              min: -253370764800,
              name: "First bar time",
              type: "time",
            },
            {
              defval: 0,
              id: "last bar time",
              isHidden: !0,
              max: 253370764800,
              min: -253370764800,
              name: "Last bar time",
              type: "time",
            },
            {
              defval: "close",
              id: "source",
              name: "Source",
              options: ["open", "high", "low", "close", "hl2", "hlc3", "ohlc4"],
              type: "source",
            },
          ],
          plots: [],
        },
        constructor: class {
          constructor() {
            this._resultSent = !1;
          }
          init(e, t) {
            (this._resultSent = !1),
              (this._data = {
                baseLine: {startPrice: NaN, endPrice: NaN},
                upLine: {startPrice: NaN, endPrice: NaN},
                downLine: {startPrice: NaN, endPrice: NaN},
                pearsons: NaN,
                startIndex__t: NaN,
                endIndex__t: NaN,
              });
          }
          main(e, t) {
            const i = t(6),
              n = e.new_unlimited_var(s.Std.time(e)),
              o = e.new_unlimited_var(s.Std.high(e)),
              a = e.new_unlimited_var(s.Std.low(e)),
              l = e.new_unlimited_var(s.Std[i](e));
            if (!e.symbol.isLastBar) return null;
            if (this._resultSent) return null;
            const c = t(0),
              h = t(1),
              d = t(2),
              u = t(3),
              p = t(4),
              _ = t(5),
              m = n.indexOf(p),
              g = n.indexOf(_),
              f = [],
              v = [],
              S = [],
              y = [];
            for (let e = m; e >= g; --e)
              f.push(n.get(e)),
                v.push(o.get(e)),
                S.push(a.get(e)),
                y.push(l.get(e));
            return (
              this._updateData(f, d, c, u, h, p, _, r(y, v, S)),
              (this._resultSent = !0),
              {type: "non_series_data", nonseries: !0, data: {data: this._data}}
            );
          }
          _updateData(e, t, i, s, r, n, o, a) {
            const l = e.length - 1;
            (this._data.baseLine.startPrice = a.intercept),
              (this._data.baseLine.endPrice = a.intercept + a.slope * l);
            const c = a.intercept + (t ? a.stdDev * i : a.upDev);
            (this._data.upLine.startPrice = c),
              (this._data.upLine.endPrice = c + a.slope * l);
            const h = a.intercept + (s ? a.stdDev * r : -a.downDev);
            (this._data.downLine.startPrice = h),
              (this._data.downLine.endPrice = h + a.slope * l),
              (this._data.pearsons = a.pearsons),
              (this._data.startIndex__t = n),
              (this._data.endIndex__t = o);
          }
        },
      };
    },
    37796: (e, t, i) => {
      "use strict";
      i.d(t, {
        SpreadRatioBase: () => r,
        spreadRatioDefaults: () => n,
        spreadRatioInputs: () => o,
        spreadRatioPlots: () => a,
        spreadRatioStyles: () => l,
      });
      var s = i(77392);
      class r {
        init(e, t) {
          e.new_sym(t(1), s.Std.period(e)),
            (this._source = t(0)),
            (this._scaleFactor1 = 1),
            (this._scaleFactor2 = 1);
        }
        main(e, t) {
          const i = e.symbol.time,
            r = s.Std[this._source](e);
          e.select_sym(1);
          const n = s.Std[this._source](e),
            o = e.new_unlimited_var(n),
            a = e.new_unlimited_var(e.symbol.time);
          if ((e.select_sym(0), isNaN(i))) return null;
          let l = a.indexOf(i);
          -1 !== l && a.get(l) !== i && (l = -1);
          const c = l < 0 ? NaN : o.get(l);
          return [
            this._doCalculation(this._scaleFactor1, r, this._scaleFactor2, c),
          ];
        }
      }
      const n = {
          styles: {
            plot1: {
              linestyle: 0,
              linewidth: 2,
              plottype: 0,
              trackPrice: !1,
              transparency: 35,
              visible: !0,
              color: "#800080",
            },
          },
          precision: 2,
          inputs: {source: "close", symbol2: ""},
        },
        o = [
          {
            defval: "close",
            id: "source",
            name: "Source",
            options: ["open", "high", "low", "close", "hl2", "hlc3", "ohlc4"],
            type: "text",
          },
          {id: "symbol2", name: "Symbol", type: "symbol", confirm: !0},
        ],
        a = [{id: "plot1", type: "line"}],
        l = {plot1: {title: "Plot", histogramBase: 0}};
    },
    30934: (e, t, i) => {
      "use strict";
      i.d(t, {spreadStudyItem: () => n});
      var s = i(37796);
      class r extends s.SpreadRatioBase {
        _doCalculation(e, t, i, s) {
          return e * t - i * s;
        }
      }
      const n = {
        name: "Spread",
        metainfo: {
          _metainfoVersion: 15,
          defaults: s.spreadRatioDefaults,
          plots: s.spreadRatioPlots,
          styles: s.spreadRatioStyles,
          description: "Spread",
          shortDescription: "Spread",
          is_price_study: !1,
          inputs: s.spreadRatioInputs,
          id: "Spread@tv-basicstudies-1",
        },
        constructor: r,
      };
    },
    3782: (e, t, i) => {
      "use strict";
      i.d(t, {VbPCheckHaveVolumeExpr: () => r});
      var s = i(77392);
      class r {
        constructor(e) {
          (this._haveAnyVolume = !1),
            (this._isDisabled = !1),
            (this._seriesGetter = e);
        }
        update(e, t) {
          if (this._haveAnyVolume || this._isDisabled) return;
          const i = this._seriesGetter.volume().get(e);
          0 !== i && Number.isFinite(i) && (this._haveAnyVolume = !0),
            t &&
              (this._haveAnyVolume ||
                s.Std.error(
                  "The data vendor doesn't provide volume data for this symbol.",
                ),
              (this._isDisabled = !0));
        }
      }
    },
    39107: (e, t, i) => {
      "use strict";
      i.d(t, {VolumeByPriceExpr: () => _});
      var s = i(16282),
        r = i(57968),
        n = i(35001),
        o = i(77392),
        a = i(14);
      class l extends a.GraphicsObj {
        constructor(e, t, i, r, n, o) {
          super(e),
            (0, s.assert)(t < i),
            (this._priceLow = this._mixinJSONObject.createDoubleField(
              t,
              "priceLow",
            )),
            (this._priceHigh = this._mixinJSONObject.createDoubleField(
              i,
              "priceHigh",
            )),
            (this._rate = this._mixinJSONObject.createDoubleArrayField(
              r,
              "rate",
            )),
            (this._firstBarTime = this._mixinJSONObject.createTimeField(
              n,
              "firstBarTime",
            )),
            (this._lastBarTime = this._mixinJSONObject.createTimeField(
              o,
              "lastBarTime",
            ));
        }
        isNaN() {
          return (
            super.isNaN() ||
            Number.isNaN(this._priceLow.get()) ||
            Number.isNaN(this._priceHigh.get()) ||
            0 === this._rate.get().length
          );
        }
        jsonName() {
          return "hhists";
        }
        primitiveData() {
          return {
            id: this.id(),
            priceHigh: this._priceHigh.get(),
            priceLow: this._priceLow.get(),
            rate: this._rate.get().slice(),
            firstBarTime: this._firstBarTime.get(),
            lastBarTime: this._lastBarTime.get(),
          };
        }
        setPriceLow(e) {
          this._priceLow.set(e) && this._processObjUpdate();
        }
        priceLow() {
          return this._priceLow.get();
        }
        priceHigh() {
          return this._priceHigh.get();
        }
        setPriceHigh(e) {
          this._priceHigh.set(e) && this._processObjUpdate();
        }
        rate() {
          return this._rate.get().slice();
        }
        setRate(e) {
          this._rate.set(e) && this._processObjUpdate();
        }
        rateAt(e) {
          return this._rate.get()[e];
        }
        ratesSum() {
          let e = 0;
          for (const t of this._rate.get())
            !Number.isNaN(t) && Number.isFinite(t) && (e += t);
          return e;
        }
        firstBarTime() {
          return this._firstBarTime.get();
        }
        setFirstBarTime(e) {
          this._firstBarTime.set(e) && this._processObjUpdate();
        }
        lastBarTime() {
          return this._lastBarTime.get();
        }
        setLastBarTime(e) {
          this._lastBarTime.set(e) && this._processObjUpdate();
        }
      }
      var c = i(14942);
      class h {
        constructor(e, t, i) {
          (this.index = e), (this.offset = i), (this.level = t);
        }
        isNaN() {
          return Number.isNaN(this.level);
        }
        equals(e) {
          return (
            e instanceof h &&
            !this.isNaN() &&
            !e.isNaN() &&
            this.index === e.index &&
            this.offset === e.offset &&
            o.Std.equal(this.level, e.level)
          );
        }
        getLevel() {
          return this.level;
        }
        getIndex() {
          return this.index;
        }
      }
      class d extends a.GraphicsObj {
        constructor(e, t) {
          super(e), (this._points = []), t && (this._points = t);
        }
        addPoint(e) {
          this._processObjUpdate(), this._points.push(e);
        }
        addPoints(e) {
          this._processObjUpdate(), this._points.push(...e);
        }
        setPoint(e, t) {
          const i = this._points[e];
          t.equals(i) || (this._processObjUpdate(), (this._points[e] = t));
        }
        point(e) {
          const t = this._points[e];
          return new h(t.index, t.level, t.offset);
        }
        points() {
          return this._points;
        }
        pointsCount() {
          return this._points.length;
        }
        setPoints(e) {
          if (e.length === this._points.length) {
            let t = !0;
            for (let i = 0; i < e.length; ++i)
              if (!e[i].equals(this._points[i])) {
                t = !1;
                break;
              }
            if (t) return;
          }
          this._processObjUpdate(),
            (this._points = []),
            this._points.push(...e);
        }
        clearPoints() {
          this._processObjUpdate(), (this._points = []);
        }
        isNaN() {
          return super.isNaN() || this._points.length < 3;
        }
        jsonName() {
          return "polygons";
        }
        primitiveData() {
          return {
            id: this.id(),
            points: this._points.map(e => ({
              index: e.index,
              offset: e.offset,
              level: e.level,
            })),
          };
        }
      }
      class u extends a.GraphicsObj {
        constructor(e, t, i, s, r = !1, n = !1) {
          super(e),
            (this._endIndex = this._mixinJSONObject.createTimeField(
              i,
              "endIndex",
            )),
            (this._extendLeft = this._mixinJSONObject.createField(
              r,
              "extendLeft",
            )),
            (this._extendRight = this._mixinJSONObject.createField(
              n,
              "extendRight",
            )),
            (this._level = this._mixinJSONObject.createDoubleField(s, "level")),
            (this._startIndex = this._mixinJSONObject.createTimeField(
              t,
              "startIndex",
            ));
        }
        isNaN() {
          return (
            super.isNaN() ||
            Number.isNaN(this._level.get()) ||
            this._startIndex.get() < 0 ||
            this._endIndex.get() < 0 ||
            (this._startIndex.get() === this._endIndex.get() &&
              !this._extendLeft.get() &&
              !this._extendRight.get())
          );
        }
        jsonName() {
          return "horizlines";
        }
        primitiveData() {
          return {
            id: this.id(),
            startIndex: this._startIndex.get(),
            endIndex: this._endIndex.get(),
            extendLeft: this._extendLeft.get(),
            extendRight: this._extendRight.get(),
            level: this._level.get(),
          };
        }
        startIndex() {
          return this._startIndex.get();
        }
        setStartIndex(e) {
          this._startIndex.set(e) && this._processObjUpdate();
        }
        endIndex() {
          return this._endIndex.get();
        }
        setEndIndex(e) {
          this._endIndex.set(e) && this._processObjUpdate();
        }
        level() {
          return this._level.get();
        }
        setLevel(e) {
          this._level.set(e) && this._processObjUpdate();
        }
        isExtendLeft() {
          return this._extendLeft.get();
        }
        setExtendLeft(e) {
          this._extendLeft.set(e) && this._processObjUpdate();
        }
        extendLeft() {
          return this.isExtendLeft();
        }
        isExtendRight() {
          return this._extendRight.get();
        }
        setExtendRight(e) {
          this._extendRight.set(e) && this._processObjUpdate();
        }
        extendRight() {
          return this.isExtendRight();
        }
      }
      class p {
        constructor() {
          this._map = new Map();
        }
        get(e) {
          const t = this._innerMap(e.start);
          return t && t.get(e.end);
        }
        set(e, t) {
          this._innerMap(e.start, !0).set(e.end, t);
        }
        clear() {
          this._map.clear();
        }
        size() {
          let e = 0;
          return this._map.forEach(t => (e += t.size)), e;
        }
        _innerMap(e, t) {
          let i = this._map.get(e);
          return void 0 === i && t && ((i = new Map()), this._map.set(e, i)), i;
        }
      }
      class _ {
        constructor(e, t, i, r, n, o, a, l, h, d, u, _, m, g) {
          (this._freezedBoxes = new c.GraphicsList()),
            (this._freezedHists = new c.GraphicsList()),
            (this._freezedPocs = new c.GraphicsList()),
            (this._freezedVAHists = new c.GraphicsList()),
            (this._currentHistsGr = new c.GraphicsList()),
            (this._currentVAHistsGr = new c.GraphicsList()),
            (this._currentHists = []),
            (this._currentHistsMap = new p()),
            (this._currentBox = null),
            (this._currentPoc = null),
            (this._historyBarSet = []),
            (this._prevRtBar = null),
            (this._minPrice = Number.POSITIVE_INFINITY),
            (this._maxPrice = Number.NEGATIVE_INFINITY),
            (this._leftBoxTime = null),
            (this._rightBoxTime = null),
            (this._needRecalc = !1),
            (this._largestHistItem = null),
            (this._rowsLayout = null),
            (this._currentVAStart = 0),
            (this._currentVAEnd = 0),
            (this._previousVAStart = 0),
            (this._previousVAEnd = 0),
            (this._idsGenerator = null),
            (0, s.assert)(1 === e || 2 === e),
            (this._numOfSubHists = e),
            (this._outHists = r),
            (this._outBoxLines = n),
            (this._outPocLines = o),
            (this._extendPocLeftRight = a),
            (this._outVAHists = l),
            (this._vaVolumePercent = h),
            (this._rowsLayoutSupplier = d),
            this._outHists.addStable(this._freezedHists),
            this._outVAHists.addStable(this._freezedVAHists),
            (this._maxHHistItems = u),
            (this._layoutIsAutoselected = g),
            (this._leftBoxTimeMutable = _),
            (this._rightBoxTimeMutable = m),
            (this._ctx = t),
            (this._seriesGetter = i);
        }
        update(e) {
          this._supplyRowsLayout(this._ctx),
            null === this._currentBox && this._initCurrentBox(),
            null === this._currentPoc && this._initCurrentPoc();
          const t = this._timeScale().get(e);
          (this._leftBoxTime = this._leftBoxTimeMutable),
            (this._rightBoxTime = this._rightBoxTimeMutable),
            this._ctx.symbol.isLastBar &&
              !Number.isNaN(this._rightBoxTime) &&
              (this._rightBoxTime = Math.min(
                t +
                  n.Interval.parse(
                    this._ctx.symbol.interval + this._ctx.symbol.resolution,
                  ).inMilliseconds(t) -
                  1,
                this._rightBoxTime,
              ));
          const i = o.Std.greaterOrEqual(
              this._seriesClose().get(e),
              this._seriesOpen().get(e),
            ),
            s = {
              high: this._seriesHigh().get(e),
              low: this._seriesLow().get(e),
              volume: this._seriesVol().get(e),
              isUp: i,
              time: t,
            };
          this._updateCurrentHistogram(s),
            this._currentHists.length > 0 &&
              ((this._largestHistItem = this._getLargestHistItem()),
              this._updateCurrentPoc(),
              this._seriesGetter.developingPoc().set(this._currentPoc.level()),
              this._updateValueArea(),
              this._vaVolumePercent > 0 &&
                (this._seriesGetter
                  .developingVAHigh()
                  .set(this._currentHists[this._currentVAEnd].priceHigh()),
                this._seriesGetter
                  .developingVALow()
                  .set(this._currentHists[this._currentVAStart].priceLow()))),
            this._updateCurrentBox(),
            this._rebuildOutData();
        }
        setIdsGeneratorProxy(e) {
          this._idsGenerator = e;
        }
        nextGraphicsObjId() {
          return (0, s.ensureNotNull)(this._idsGenerator).nextGraphicsObjId();
        }
        pushEraseObjCmd(e, t) {
          (0, s.ensureNotNull)(this._idsGenerator).pushEraseObjCmd(e, t);
        }
        popEraseCmds() {
          return (0, s.ensureNotNull)(this._idsGenerator).popEraseCmds();
        }
        _timeScale() {
          return this._seriesGetter.time();
        }
        _seriesLow() {
          return this._seriesGetter.low();
        }
        _seriesHigh() {
          return this._seriesGetter.high();
        }
        _seriesVol() {
          return this._seriesGetter.volume();
        }
        _seriesOpen() {
          return this._seriesGetter.open();
        }
        _seriesClose() {
          return this._seriesGetter.close();
        }
        _freezeCurrentHistogramAndCleanup() {
          null !== this._currentBox && this._freezedBoxes.add(this._currentBox),
            o.Std.greater(this._getVolume(this._currentHists), 0) &&
              (this._freezedHists.addAll(this._currentHistsGr),
              this._freezedVAHists.addAll(this._currentVAHistsGr),
              null !== this._currentPoc &&
                this._freezedPocs.add(this._currentPoc)),
            (this._currentHists = []),
            this._currentHistsGr.clear(),
            this._currentHistsMap.clear(),
            this._initCurrentBox(),
            this._initCurrentPoc(),
            this._currentVAHistsGr.clear(),
            (this._historyBarSet = []),
            (this._minPrice = Number.POSITIVE_INFINITY),
            (this._maxPrice = Number.NEGATIVE_INFINITY),
            (this._prevRtBar = null),
            (this._leftBoxTime = null),
            (this._rightBoxTime = null);
        }
        _supplyRowsLayout(e) {
          null === this._rowsLayout &&
            e.symbol.isFirstBar &&
            e.symbol.isNewBar &&
            (this._rowsLayout = this._rowsLayoutSupplier());
        }
        _updateCurrentHistogram(e) {
          if (
            ((this._needRecalc = !1),
            o.Std.greater(this._minPrice, e.low) &&
              ((this._minPrice = e.low), (this._needRecalc = !0)),
            o.Std.less(this._maxPrice, e.high) &&
              ((this._maxPrice = e.high), (this._needRecalc = !0)),
            this._ctx.symbol.isBarClosed && this._historyBarSet.length > 0)
          ) {
            const t = this._historyBarSet[this._historyBarSet.length - 1];
            t.time === e.time &&
              ((this._prevRtBar = t), this._historyBarSet.pop());
          }
          this._needRecalc &&
          0 === (0, s.ensureNotNull)(this._rowsLayout).type()
            ? (this._recalculateCurrentResultsOnHistoryBarSet(),
              this._applyUpdateToCurrentResults(e, !1))
            : this._applyUpdateToCurrentResults(e, !0),
            this._ctx.symbol.isBarClosed
              ? ((0, s.assert)(
                  null === this._prevRtBar || e.time === this._prevRtBar.time,
                ),
                this._historyBarSet.push(e),
                (this._prevRtBar = null))
              : (this._prevRtBar = e);
        }
        _getMidLevel(e) {
          return (e.priceHigh() + e.priceLow()) / 2;
        }
        _getMidLevelFromList(e) {
          return e.length % 2 == 0
            ? e[e.length / 2].priceLow()
            : this._getMidLevel(e[Math.floor(e.length / 2)]);
        }
        _getLargestHistItem() {
          let e = [],
            t = this._currentHists[0];
          for (const i of this._currentHists)
            o.Std.greater(i.ratesSum(), t.ratesSum())
              ? ((t = i), (e = [t]))
              : o.Std.equal(i.ratesSum(), t.ratesSum()) && e.push(i);
          if (e.length > 1) {
            const i = this._getMidLevelFromList(this._currentHists);
            t = e[e.length - 1];
            for (let s = e.length - 2; s >= 0; s--) {
              const r = e[s];
              o.Std.lessOrEqual(
                Math.abs(this._getMidLevel(r) - i),
                Math.abs(this._getMidLevel(t) - i),
              ) && (t = r);
            }
          }
          return t;
        }
        _initCurrentPoc() {
          this._currentPoc = new u(this, 0, 0, 0);
        }
        _updateCurrentPoc() {
          const e = (0, s.ensureNotNull)(this._currentPoc);
          e.setStartIndex((0, s.ensureNotNull)(this._leftBoxTime)),
            e.setEndIndex((0, s.ensureNotNull)(this._rightBoxTime)),
            e.setExtendLeft(this._extendPocLeftRight),
            e.setExtendRight(this._extendPocLeftRight);
          const t = this._getMidLevel(
            (0, s.ensureNotNull)(this._largestHistItem),
          );
          e.setLevel(t);
        }
        _getVolume(e) {
          let t = 0;
          for (const i of e) t += i.ratesSum();
          return t;
        }
        _getPocHistItemIndex() {
          for (let e = 0; e < this._currentHists.length; e++)
            if (this._currentHists[e] === this._largestHistItem) return e;
          return -1;
        }
        _calculateValueArea() {
          const e = this._getPocHistItemIndex();
          (0, s.assert)(e >= 0, "ERROR - PocHistItemIndex == " + e),
            (this._currentVAStart = e - 1),
            (this._currentVAEnd = e + 1);
          const t =
            this._getVolume(this._currentHists) * this._vaVolumePercent * 0.01;
          let i = this._currentHists[e].ratesSum(),
            r = 0,
            n = null;
          for (
            ;
            o.Std.lessOrEqual(i + r, t) &&
            ((i += r),
            0 === n ? --this._currentVAStart : 1 === n && ++this._currentVAEnd,
            -1 !== this._currentVAStart ||
              this._currentVAEnd !== this._currentHists.length);

          ) {
            let t, i;
            if (this._currentVAStart > -1)
              if (
                ((t = this._currentHists[this._currentVAStart].ratesSum()),
                this._currentVAEnd < this._currentHists.length)
              )
                if (
                  ((i = this._currentHists[this._currentVAEnd].ratesSum()),
                  o.Std.greater(t, i))
                )
                  (r = t), (n = 0);
                else if (o.Std.greater(i, t)) (r = i), (n = 1);
                else {
                  const s = Math.abs(e - this._currentVAStart),
                    o = Math.abs(e - this._currentVAEnd);
                  s < o ? ((r = t), (n = 0)) : o <= s && ((r = i), (n = 1));
                }
              else (r = t), (n = 0);
            else
              (r = this._currentHists[this._currentVAEnd].ratesSum()), (n = 1);
          }
          this._currentVAStart++, this._currentVAEnd--;
        }
        _isVA(e) {
          return (
            e.priceHigh() >
              this._getMidLevel(this._currentHists[this._currentVAStart]) &&
            e.priceLow() <
              this._getMidLevel(this._currentHists[this._currentVAEnd])
          );
        }
        _updateValueArea() {
          if (
            (this._calculateValueArea(),
            this._needRecalc ||
              this._previousVAStart !== this._currentVAStart ||
              this._previousVAEnd !== this._currentVAEnd)
          ) {
            let e = 0,
              t = 0;
            for (
              ;
              e < this._currentHistsGr.size() &&
              t < this._currentVAHistsGr.size();

            ) {
              for (
                ;
                e < this._currentHistsGr.size() &&
                !this._isVA(this._currentHistsGr.get(e));

              )
                e++;
              for (
                ;
                t < this._currentVAHistsGr.size() &&
                this._isVA(this._currentVAHistsGr.get(t));

              )
                t++;
              if (
                e < this._currentHistsGr.size() &&
                t < this._currentVAHistsGr.size()
              ) {
                const i = this._currentHistsGr.get(e);
                this._currentHistsGr.set(e, this._currentVAHistsGr.get(t)),
                  this._currentVAHistsGr.set(t, i);
              }
            }
            for (; e < this._currentHistsGr.size(); e++) {
              const t = this._currentHistsGr.get(e);
              this._isVA(t) &&
                (this._currentHistsGr.remove(e),
                e--,
                this._currentVAHistsGr.add(t));
            }
            for (; t < this._currentVAHistsGr.size(); t++) {
              const e = this._currentVAHistsGr.get(t);
              this._isVA(e) ||
                (this._currentVAHistsGr.remove(t),
                t--,
                this._currentHistsGr.add(e));
            }
          }
          (this._previousVAStart = this._currentVAStart),
            (this._previousVAEnd = this._currentVAEnd);
        }
        _initCurrentBox() {
          this._currentBox = new d(this);
        }
        _updateCurrentBox() {
          let e = this._minPrice,
            t = this._maxPrice;
          this._currentHists.length > 0 &&
            ((e = this._currentHists[0].priceLow()),
            (t =
              this._currentHists[this._currentHists.length - 1].priceHigh()));
          const i = [],
            r = (0, s.ensureNotNull)(this._leftBoxTime),
            n = (0, s.ensureNotNull)(this._rightBoxTime);
          i.push(new h(r, e)),
            i.push(new h(r, t)),
            i.push(new h(n, t)),
            i.push(new h(n, e)),
            (0, s.ensureNotNull)(this._currentBox).setPoints(i);
        }
        _recalculateCurrentResultsOnHistoryBarSet() {
          for (let e = 0; e < this._currentHists.length; ++e)
            this._currentHists[e].erase();
          (this._currentHists = []),
            this._currentHistsGr.clear(),
            this._currentVAHistsGr.clear(),
            this._currentHistsMap.clear();
          for (let e = 0; e < this._historyBarSet.length; e++)
            this._addHistoryBarToHistogram(
              this._historyBarSet[e],
              e,
              this._currentHists,
              this._currentHistsMap,
              1,
            );
          this._currentHists.length > 0 &&
            ((this._largestHistItem = this._getLargestHistItem()),
            this._updateCurrentPoc()),
            this._updateCurrentBox();
        }
        _applyUpdateToCurrentResults(e, t) {
          t &&
            null !== this._prevRtBar &&
            this._addHistoryBarToHistogram(
              this._prevRtBar,
              this._historyBarSet.length - 1,
              this._currentHists,
              this._currentHistsMap,
              -1,
            ),
            this._addHistoryBarToHistogram(
              e,
              this._historyBarSet.length - 1,
              this._currentHists,
              this._currentHistsMap,
              1,
            ),
            this._updateLastBarTimeInHistogram(this._currentHists);
        }
        _addHistoryBarToHistogram(e, t, i, r, n) {
          (0, s.assert)(
            -1 === n || 1 === n,
            "Please set sign argument either +1 or -1",
          );
          const a = e.low,
            l = e.high,
            c = isNaN(e.volume) ? 0 : e.volume,
            h = e.isUp,
            d = (0, s.ensureNotNull)(this._rowsLayout);
          d.init(
            this._ctx.symbol.minTick,
            this._minPrice,
            this._maxPrice,
            a,
            l,
          );
          const u = d.rowWidth();
          if (!o.Std.greater(u, 0)) return;
          d.calculate();
          const p = d.getIndexLowVbP(),
            _ = d.getIndexHighVbP(),
            m = d.getStartPrice();
          if (p === _) {
            const e = p * u + m,
              t = (p + 1) * u + m;
            this._updateResult({start: e, end: t}, n * c, h, i, r);
          } else {
            let e = 0;
            for (let t = p; t <= _; t++) {
              const s = t * u + m,
                o = (t + 1) * u + m,
                d = this._rowCoeff(s, o, a, l),
                p = d * c;
              (e += d), this._updateResult({start: s, end: o}, n * p, h, i, r);
            }
            (0, s.assert)(
              o.Std.equal(e, 1, 0.05),
              "totalCoeff not equal 1! totalConf = " + e,
            );
          }
        }
        _updateResult(e, t, i, r, n) {
          const a = this._createRates(i, t);
          (0, s.assert)(
            null !== this._leftBoxTime,
            "leftBoxTime is not set (equals null)",
          ),
            (0, s.assert)(
              null !== this._rightBoxTime,
              "rightBoxTime is not set (equals null)",
            );
          const c = (0, s.ensureNotNull)(this._leftBoxTime),
            h = (0, s.ensureNotNull)(this._rightBoxTime);
          let d = n.get(e);
          if (void 0 === d)
            (d = new l(this, e.start, e.end, a, c, h)),
              n.set(e, d),
              this._verifyHistogramSizeIsNotTooLarge(n.size()),
              this._currentHistsGr.add(d),
              _._addInOrder(d, r, 0, r.length, (e, t) => {
                let i = o.Std.compare(e.firstBarTime(), t.firstBarTime());
                return 0 !== i
                  ? i
                  : ((i = o.Std.compare(e.priceLow(), t.priceLow())),
                    0 !== i ? i : o.Std.compare(e.priceHigh(), t.priceHigh()));
              });
          else {
            const e = [];
            for (let t = 0; t < a.length; t++) e[t] = d.rateAt(t) + a[t];
            d.setRate(e);
          }
        }
        _rebuildOutData() {
          const e = this._currentHistsMap.size(),
            t = this._currentHists.length,
            i = this._currentHistsGr.size(),
            r = this._currentVAHistsGr.size();
          (0, s.assert)(
            e === t && t === i + r,
            `Collections of HHistItems are out of sync ${e} ${t} ${i} ${r}`,
          ),
            this._outPocLines.clear(),
            this._outPocLines.addAll(this._freezedPocs),
            o.Std.greater(this._getVolume(this._currentHists), 0)
              ? (this._outHists.setVariable(this._currentHistsGr),
                this._outPocLines.add((0, s.ensureNotNull)(this._currentPoc)),
                this._outVAHists.setVariable(this._currentVAHistsGr))
              : (this._outHists.setVariable(null),
                this._outVAHists.setVariable(null)),
            this._outBoxLines.clear(),
            this._outBoxLines.addAll(this._freezedBoxes),
            this._outBoxLines.add((0, s.ensureNotNull)(this._currentBox));
        }
        _verifyHistogramSizeIsNotTooLarge(e) {
          if (this._layoutIsAutoselected) return;
          if (e <= this._maxHHistItems) return;
          const t = (0, s.ensureNotNull)(this._rowsLayout);
          0 === t.type()
            ? o.Std.error(
                'Histogram is too large, please reduce "Row Size" input.',
              )
            : ((0, s.assert)(
                1 === t.type(),
                "Unexpected rowsLayout type " + t.type(),
              ),
              o.Std.error(
                'Histogram is too large, please increase "Row Size" input.',
              ));
        }
        _createRates(e, t) {
          if (1 === this._numOfSubHists) return [t];
          if (2 === this._numOfSubHists) {
            const i = [0, 0];
            return (i[e ? 0 : 1] = t), i;
          }
          return (
            (0, s.assert)(
              !1,
              "Incorrect value of numOfSubHists = " + this._numOfSubHists,
            ),
            []
          );
        }
        _updateLastBarTimeInHistogram(e) {
          const t = (0, s.ensureNotNull)(this._rightBoxTime);
          for (const i of e) i.setLastBarTime(t);
        }
        _rowCoeff(e, t, i, s) {
          const r = s - i;
          return (t - e - Math.max(t - s, 0) - Math.max(0, i - e)) / r;
        }
        static _addInOrder(e, t, i, s, n) {
          if (i === s) return void t.splice(i, 0, e);
          const o = (0, r.toInt)((i + s) / 2),
            a = t[o];
          n(e, a) < 0
            ? _._addInOrder(e, t, i, o, n)
            : n(e, a) > 0
            ? _._addInOrder(e, t, o + 1, s, n)
            : t.splice(o, 0, e);
        }
      }
    },
    29226: (e, t, i) => {
      "use strict";
      i.d(t, {
        VolumeProfileBase: () => d,
        maxHHistItems: () => c,
        numOfSubHists: () => h,
      });
      var s = i(77392),
        r = i(35001);
      class n {
        constructor(e, t) {
          (this._minTick = NaN),
            (this._minPrice = NaN),
            (this._maxPrice = NaN),
            (this._low = NaN),
            (this._high = NaN),
            (this._startPrice = NaN),
            (this._indexLowVbP = NaN),
            (this._indexHighVbP = NaN),
            (this._rowSize = e),
            (this._type = t);
        }
        init(e, t, i, s, r) {
          (this._minTick = e),
            (this._minPrice = t),
            (this._maxPrice = i),
            (this._low = s),
            (this._high = r);
        }
        getStartPrice() {
          return this._startPrice;
        }
        setStartPrice(e) {
          this._startPrice = e;
        }
        getIndexLowVbP() {
          return this._indexLowVbP;
        }
        setIndexLowVbP(e) {
          this._indexLowVbP = e;
        }
        getIndexHighVbP() {
          return this._indexHighVbP;
        }
        setIndexHighVbP(e) {
          this._indexHighVbP = e;
        }
        type() {
          return this._type;
        }
      }
      class o extends n {
        constructor(e) {
          super(e, 0);
        }
        calculate() {
          this.setStartPrice(this._minPrice);
          const e = this.rowWidth();
          let t = Math.floor((this._low - this._minPrice) / e),
            i = Math.ceil((this._high - this._minPrice) / e) - 1;
          (t = Math.max(t, 0)),
            (i = Math.max(i, 0)),
            (i = Math.min(i, this._rowSize - 1)),
            (t = Math.min(t, i)),
            this.setIndexLowVbP(t),
            this.setIndexHighVbP(i);
        }
        rowWidth() {
          return Math.max(
            (this._maxPrice - this._minPrice) / this._rowSize,
            this._minTick,
          );
        }
      }
      class a extends n {
        constructor(e) {
          super(e, 1);
        }
        calculate() {
          this.setStartPrice(0);
          const e = this.rowWidth();
          let t = Math.floor(this._low / e);
          const i = Math.ceil(this._high / e) - 1;
          (t = Math.min(t, i)), this.setIndexLowVbP(t), this.setIndexHighVbP(i);
        }
        rowWidth() {
          return this._minTick * this._rowSize;
        }
      }
      var l = i(27490);
      function c() {
        return 6e3;
      }
      function h(e) {
        switch (e) {
          case "Up/Down":
            return 2;
          case "Total":
            return 1;
          default:
            s.Std.error("Invalid study argument value: " + e);
        }
      }
      class d {
        findBasicResolutionForFromTo(e, t, i, n) {
          const o = (0, s.getVolumeProfileResolutionForPeriod)(
              e.value(),
              t,
              i,
              n,
            ),
            a = r.Interval.parse(o);
          return (
            l.enabled("charting_library_debug_mode") &&
              console.log(
                `Selected resolution ${a.value()} for (${e.value()}, ${t}, ${i})`,
              ),
            a
          );
        }
        verifyRowSizeInput(e, t) {
          "Number Of Rows" === t &&
            e > 6e3 &&
            s.Std.error(
              'Histogram is too large, please reduce "Row Size" input.',
            );
        }
        _getRowsLayout(e, t) {
          return "Number Of Rows" === e ? new o(t) : new a(t);
        }
      }
    },
    62243: (e, t, i) => {
      "use strict";
      i.d(t, {
        volumeProfileFixedRangeBSStudyItem: () => w,
        volumeProfileFixedRangeVbPStudyItem: () => b,
      });
      var s = i(16282),
        r = i(29226),
        n = i(77392),
        o = i(77455),
        a = i(31505),
        l = i(35001),
        c = i(79234),
        h = i(86860),
        d = i(90957),
        u = i(14942),
        p = i(10622),
        _ = i(3782),
        m = i(64417),
        g = i(39107);
      class f extends g.VolumeByPriceExpr {
        constructor(e, t, i, s, r, n, o, a, l, c, h, d) {
          super(e, t, i, n, o, a, !1, l, c, () => h, d, s, r, !1),
            (this._firstBarTime = s),
            (this._lastBarTime = r);
        }
        update(e) {
          this._supplyRowsLayout(this._ctx),
            this.timeInRequestedRange(e) && super.update(e);
        }
        timeInRequestedRange(e) {
          const t = this._timeScale().get(e);
          return this._firstBarTime <= t && t < this._lastBarTime;
        }
      }
      var v = i(98083);
      class S extends r.VolumeProfileBase {
        constructor() {
          super(...arguments),
            (this._rowsLayout = "Number Of Rows"),
            (this._rowSize = 24),
            (this._volume = "Up/Down"),
            (this._firstBarTime = 0),
            (this._lastBarTime = 0),
            (this._vaVolumePercent = 70),
            (this._anInt = 0),
            (this._eraseCmds = []);
        }
        nextGraphicsObjId() {
          return ++this._anInt;
        }
        pushEraseObjCmd(e, t) {
          this._eraseCmds.push(new d.EraseObj(e, t));
        }
        popEraseCmds() {
          const e = this._eraseCmds;
          return (this._eraseCmds = []), e;
        }
        init(e, t) {
          (this._studyDataUpdate = new p.JStudyDataUpdate(!0)),
            (this._hists = new c.GraphicsListColl()),
            (this._boxPolygons = new u.GraphicsList()),
            (this._pocLines = new u.GraphicsList()),
            (this._valueAreaHists = new c.GraphicsListColl());
          const i = new h.StudyGraphicsData();
          i
            .getObjsContainer("hhists")
            .push(new h.Container("histBars2", this._hists)),
            i
              .getObjsContainer("hhists")
              .push(new h.Container("histBarsVA", this._valueAreaHists)),
            i
              .getObjsContainer("horizlines")
              .push(new h.Container("pocLines", this._pocLines)),
            i
              .getObjsContainer("polygons")
              .push(new h.Container("histBoxBg", this._boxPolygons)),
            this._studyDataUpdate.init(i),
            (this._rowsLayout = t(0)),
            (this._rowSize = t(1)),
            (this._volume = t(2)),
            (this._firstBarTime = t(3)),
            (this._lastBarTime = t(4)),
            (this._vaVolumePercent = t(5)),
            this.verifyRowSizeInput(this._rowSize, this._rowsLayout),
            (this._originalResolution = l.Interval.parse(
              e.symbol.interval + e.symbol.resolution,
            ));
          const n =
            this._lastBarTime +
            this._originalResolution.inMilliseconds(this._lastBarTime);
          0 === this._firstBarTime && 0 === this._lastBarTime
            ? (this._basicResolution = this._originalResolution)
            : (this._basicResolution = this.findBasicResolutionForFromTo(
                this._originalResolution,
                this._firstBarTime,
                n,
                (0, s.ensureDefined)(e.symbol.info),
              )),
            (this._hasSecondarySymbol = !this._originalResolution.isEqualTo(
              this._basicResolution,
            )),
            this._hasSecondarySymbol &&
              e.new_sym(e.symbol.tickerid, this._basicResolution.value());
          const o = this._getRowsLayout(this._rowsLayout, this._rowSize);
          (this._vbPCheckHaveVolumeExpr = new _.VbPCheckHaveVolumeExpr(this)),
            (this._volumeByPriceExpr = new f(
              (0, r.numOfSubHists)(this._volume),
              e,
              this,
              this._firstBarTime,
              n,
              this._hists,
              this._boxPolygons,
              this._pocLines,
              this._valueAreaHists,
              this._vaVolumePercent,
              o,
              (0, r.maxHHistItems)(),
            )),
            this._volumeByPriceExpr.setIdsGeneratorProxy(this),
            (this._developingPocSeries = new v.VolumeProfileOutputSeries()),
            (this._developingVAHighSeries = new v.VolumeProfileOutputSeries()),
            (this._developingVALowSeries = new v.VolumeProfileOutputSeries());
        }
        main(e, t, i) {
          this._hasSecondarySymbol && e.select_sym(1),
            (this._timeSeries = e.new_unlimited_var()),
            (this._openSeries = e.new_unlimited_var()),
            (this._highSeries = e.new_unlimited_var()),
            (this._lowSeries = e.new_unlimited_var()),
            (this._closeSeries = e.new_unlimited_var()),
            (this._volumeSeries = e.new_unlimited_var());
          const r = {type: "composite", data: []};
          if (
            i &&
            i.period === this._basicResolution.value() &&
            (this._timeSeries.set(n.Std.time(e)),
            this._openSeries.set(n.Std.open(e)),
            this._highSeries.set(n.Std.high(e)),
            this._lowSeries.set(n.Std.low(e)),
            this._closeSeries.set(n.Std.close(e)),
            this._volumeSeries.set(n.Std.volume(e)),
            this._developingPocSeries.addHist(n.Std.time(e)),
            this._developingVAHighSeries.addHist(n.Std.time(e)),
            this._developingVALowSeries.addHist(n.Std.time(e)),
            this._vbPCheckHaveVolumeExpr.update(0, e.symbol.isLastBar),
            this._volumeByPriceExpr.update(0),
            this._developingPocSeries.removeLastIfNaN(),
            this._developingVAHighSeries.removeLastIfNaN(),
            this._developingVALowSeries.removeLastIfNaN(),
            e.symbol.isLastBar)
          ) {
            this._studyDataUpdate.setEraseCmds(this.popEraseCmds()),
              this._studyDataUpdate.update();
            const e = this._studyDataUpdate.getUpdate();
            e.json &&
              r.data.push({
                nonseries: !0,
                type: "study_graphics",
                data: e.json,
              }),
              e.jsonUpdate &&
                r.data.push({
                  nonseries: !0,
                  type: "study_graphics",
                  data: e.jsonUpdate,
                });
          }
          if (
            (this._hasSecondarySymbol && e.select_sym(0),
            i && i.period === this._originalResolution.value())
          ) {
            (0, s.assert)(e.symbol.time === i.time);
            const t = i.time,
              n = t + this._originalResolution.inMilliseconds(t) - 1;
            if (t && t >= this._firstBarTime) {
              const e = this._developingPocSeries.getLeftOrEqual(n),
                t = this._developingVAHighSeries.getLeftOrEqual(n),
                i = this._developingVALowSeries.getLeftOrEqual(n);
              r.data.push([e, t, i]);
            } else r.data.push([NaN, NaN, NaN]);
          }
          return r;
        }
        time() {
          return this._timeSeries;
        }
        open() {
          return this._openSeries;
        }
        high() {
          return this._highSeries;
        }
        low() {
          return this._lowSeries;
        }
        close() {
          return this._closeSeries;
        }
        volume() {
          return this._volumeSeries;
        }
        developingPoc() {
          return this._developingPocSeries;
        }
        developingVAHigh() {
          return this._developingVAHighSeries;
        }
        developingVALow() {
          return this._developingVALowSeries;
        }
      }
      function y(e) {
        return {
          constructor: S,
          name: e.description,
          metainfo: {
            _metainfoVersion: 51,
            shortDescription: "VPFR",
            format: {type: "volume"},
            is_price_study: !0,
            defaults: {
              graphics: {
                hhists: {
                  histBars2: {
                    colors: ["#1592e6", "#fbc123"],
                    direction: a.HHistDirection.LeftToRight,
                    percentWidth: 30,
                    showValues: !1,
                    transparencies: [76, 76],
                    valuesColor: "#424242",
                    visible: !0,
                  },
                  histBarsVA: {
                    colors: ["#1592e6", "#fbc123"],
                    direction: a.HHistDirection.LeftToRight,
                    percentWidth: 30,
                    showValues: !1,
                    transparencies: [30, 30],
                    valuesColor: "#424242",
                    visible: !0,
                  },
                },
                horizlines: {
                  pocLines: {
                    color: "#ff0000",
                    style: m.LineStyle.Solid,
                    visible: !0,
                    width: 2,
                  },
                },
                polygons: {histBoxBg: {color: "#37a6ef", transparency: 94}},
              },
              inputs: {
                first_bar_time: 0,
                last_bar_time: 0,
                rows: 24,
                rowsLayout: "Number Of Rows",
                subscribeRealtime: !0,
                vaVolume: 70,
                volume: "Up/Down",
              },
              styles: {
                developingPoc: {
                  color: "#ff0000",
                  linestyle: m.LineStyle.Solid,
                  linewidth: 1,
                  plottype: o.LineStudyPlotStyle.StepLine,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !1,
                },
                developingVAHigh: {
                  color: "#0000ff",
                  linestyle: m.LineStyle.Solid,
                  linewidth: 1,
                  plottype: o.LineStudyPlotStyle.StepLine,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !1,
                },
                developingVALow: {
                  color: "#0000ff",
                  linestyle: m.LineStyle.Solid,
                  linewidth: 1,
                  plottype: o.LineStudyPlotStyle.StepLine,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !1,
                },
              },
            },
            graphics: {
              hhists: {
                histBars2: {
                  location: a.HHistLocation.Absolute,
                  title: "Volume Profile",
                  titles: ["Up Volume", "Down Volume"],
                },
                histBarsVA: {
                  location: a.HHistLocation.Absolute,
                  title: "Value Area",
                  titles: ["Value Area Up", "Value Area Down"],
                },
              },
              horizlines: {pocLines: {name: "POC", showPrice: !0}},
              polygons: {
                histBoxBg: {
                  mouseTouchable: !1,
                  name: "Histogram Box",
                  showBorder: !1,
                },
              },
            },
            inputs: [
              {
                defval: "Number Of Rows",
                id: "rowsLayout",
                name: "Rows Layout",
                options: ["Number Of Rows", "Ticks Per Row"],
                type: "text",
              },
              {
                defval: 24,
                id: "rows",
                max: 1e6,
                min: 1,
                name: "Row Size",
                type: "integer",
              },
              {
                defval: "Up/Down",
                id: "volume",
                name: "Volume",
                options: ["Up/Down", "Total"],
                type: "text",
              },
              {
                defval: 0,
                id: "first_bar_time",
                isHidden: !0,
                max: 253370764800,
                min: -253370764800,
                name: "First Bar Time",
                type: "time",
              },
              {
                defval: 0,
                id: "last_bar_time",
                isHidden: !0,
                max: 253370764800,
                min: -253370764800,
                name: "Last Bar Time",
                type: "time",
              },
              {
                defval: 70,
                id: "vaVolume",
                max: 100,
                min: 0,
                name: "Value Area Volume",
                type: "integer",
              },
              {
                defval: !0,
                id: "subscribeRealtime",
                isHidden: !0,
                name: "SubscribeRealtime",
                type: "bool",
              },
            ],
            plots: [
              {id: "developingPoc", type: "line"},
              {id: "developingVAHigh", type: "line"},
              {id: "developingVALow", type: "line"},
            ],
            styles: {
              developingPoc: {histogramBase: 0, title: "Developing Poc"},
              developingVAHigh: {histogramBase: 0, title: "Developing VA High"},
              developingVALow: {histogramBase: 0, title: "Developing VA Low"},
            },
            ...e,
          },
        };
      }
      const b = y({
          id: "VbPFixed@tv-volumebyprice-57",
          description: "Volume Profile Fixed Range",
        }),
        w = y({
          id: "VbPFixed@tv-basicstudies-152",
          description: "Fixed Range",
          is_hidden_study: !0,
        });
    },
    98083: (e, t, i) => {
      "use strict";
      i.d(t, {VolumeProfileOutputSeries: () => n});
      var s = i(16282),
        r = i(49382);
      class n {
        constructor() {
          (this._histPos = -1),
            (this._hist = new Float64Array(2e3)),
            (this._times = new Float64Array(2e3));
        }
        addHist(e) {
          if (this._histPos >= 0) {
            const t = this._times[this._histPos];
            (0, s.assert)(t <= e, "History order violation"),
              (this._histPos += t === e ? 0 : 1);
          } else this._histPos += 1;
          if (this._histPos === this._hist.length) {
            const e = new Float64Array(2 * this._hist.length);
            e.set(this._hist), (this._hist = e);
            const t = new Float64Array(this._hist.length);
            t.set(this._times), (this._times = t);
          }
          (this._hist[this._histPos] = NaN), (this._times[this._histPos] = e);
        }
        removeLastIfNaN() {
          Number.isNaN(this.get(0)) && (this._histPos -= 1);
        }
        get(e) {
          (0, s.assert)(0 === e);
          const t = this._histPos - e;
          return this._hist[t];
        }
        getLeftOrEqual(e) {
          const t = (0, r.upperbound)(
            this._times,
            e,
            (e, t) => e < t,
            0,
            this._histPos + 1,
          );
          return 0 === t ? NaN : this._hist[t - 1];
        }
        set(e) {
          this._hist[this._histPos] = e;
        }
        indexOf(e) {
          throw new Error("Not implemented");
        }
      }
    },
    62649: (e, t, i) => {
      "use strict";
      i.d(t, {volumeProfileVisibleRangeStudyItem: () => v});
      var s = i(16282),
        r = i(29226),
        n = i(77392),
        o = i(31505),
        a = i(35001),
        l = i(79234),
        c = i(39107),
        h = i(14942);
      class d extends c.VolumeByPriceExpr {
        constructor(e, t, i, s, r, n, o, a, l, c, d) {
          super(
            e,
            t,
            i,
            n,
            new h.GraphicsList(),
            o,
            !0,
            a,
            l,
            () => c,
            d,
            s,
            r,
            !1,
          ),
            (this._firstBarTime = s),
            (this._lastBarTime = r);
        }
        update(e) {
          this._supplyRowsLayout(this._ctx),
            this.timeInRequestedRange(e) && super.update(e);
        }
        timeInRequestedRange(e) {
          const t = this._timeScale().get(e);
          return this._firstBarTime <= t && t < this._lastBarTime;
        }
      }
      var u = i(86860),
        p = i(90957),
        _ = i(10622),
        m = i(3782),
        g = i(98083);
      class f extends r.VolumeProfileBase {
        constructor() {
          super(...arguments),
            (this._rowsLayout = "Number Of Rows"),
            (this._rowSize = 24),
            (this._volume = "Up/Down"),
            (this._firstBarTime = 0),
            (this._lastBarTime = 0),
            (this._vaVolumePercent = 70),
            (this._anInt = 0),
            (this._eraseCmds = []);
        }
        nextGraphicsObjId() {
          return ++this._anInt;
        }
        pushEraseObjCmd(e, t) {
          this._eraseCmds.push(new p.EraseObj(e, t));
        }
        popEraseCmds() {
          const e = this._eraseCmds;
          return (this._eraseCmds = []), e;
        }
        init(e, t) {
          (this._studyDataUpdate = new _.JStudyDataUpdate(!0)),
            (this._hists = new l.GraphicsListColl()),
            (this._pocLines = new h.GraphicsList()),
            (this._valueAreaHists = new l.GraphicsListColl());
          const i = new u.StudyGraphicsData();
          i
            .getObjsContainer("hhists")
            .push(new u.Container("histBars2", this._hists)),
            i
              .getObjsContainer("hhists")
              .push(new u.Container("histBarsVA", this._valueAreaHists)),
            i
              .getObjsContainer("horizlines")
              .push(new u.Container("pocLines", this._pocLines)),
            this._studyDataUpdate.init(i),
            (this._rowsLayout = t(0)),
            (this._rowSize = t(1)),
            (this._volume = t(2)),
            (this._firstBarTime = t(3)),
            (this._lastBarTime = t(4)),
            (this._vaVolumePercent = t(5)),
            this.verifyRowSizeInput(this._rowSize, this._rowsLayout),
            (this._originalResolution = a.Interval.parse(
              e.symbol.interval + e.symbol.resolution,
            ));
          const n =
            this._lastBarTime +
            this._originalResolution.inMilliseconds(this._lastBarTime);
          0 === this._firstBarTime && 0 === this._lastBarTime
            ? (this._basicResolution = this._originalResolution)
            : (this._basicResolution = this.findBasicResolutionForFromTo(
                this._originalResolution,
                this._firstBarTime,
                n,
                (0, s.ensureDefined)(e.symbol.info),
              )),
            (this._hasSecondarySymbol = !this._originalResolution.isEqualTo(
              this._basicResolution,
            )),
            this._hasSecondarySymbol &&
              e.new_sym(e.symbol.tickerid, this._basicResolution.value());
          const o = this._getRowsLayout(this._rowsLayout, this._rowSize);
          (this._vbPCheckHaveVolumeExpr = new m.VbPCheckHaveVolumeExpr(this)),
            (this._volumeByPriceExpr = new d(
              (0, r.numOfSubHists)(this._volume),
              e,
              this,
              this._firstBarTime,
              n,
              this._hists,
              this._pocLines,
              this._valueAreaHists,
              this._vaVolumePercent,
              o,
              (0, r.maxHHistItems)(),
            )),
            this._volumeByPriceExpr.setIdsGeneratorProxy(this),
            (this._developingPocSeries = new g.VolumeProfileOutputSeries()),
            (this._developingVAHighSeries = new g.VolumeProfileOutputSeries()),
            (this._developingVALowSeries = new g.VolumeProfileOutputSeries());
        }
        main(e, t, i) {
          this._hasSecondarySymbol && e.select_sym(1),
            (this._timeSeries = e.new_unlimited_var()),
            (this._openSeries = e.new_unlimited_var()),
            (this._highSeries = e.new_unlimited_var()),
            (this._lowSeries = e.new_unlimited_var()),
            (this._closeSeries = e.new_unlimited_var()),
            (this._volumeSeries = e.new_unlimited_var());
          const r = {type: "composite", data: []};
          if (
            i &&
            i.period === this._basicResolution.value() &&
            (this._timeSeries.set(n.Std.time(e)),
            this._openSeries.set(n.Std.open(e)),
            this._highSeries.set(n.Std.high(e)),
            this._lowSeries.set(n.Std.low(e)),
            this._closeSeries.set(n.Std.close(e)),
            this._volumeSeries.set(n.Std.volume(e)),
            this._developingPocSeries.addHist(n.Std.time(e)),
            this._developingVAHighSeries.addHist(n.Std.time(e)),
            this._developingVALowSeries.addHist(n.Std.time(e)),
            this._vbPCheckHaveVolumeExpr.update(0, e.symbol.isLastBar),
            this._volumeByPriceExpr.update(0),
            this._developingPocSeries.removeLastIfNaN(),
            this._developingVAHighSeries.removeLastIfNaN(),
            this._developingVALowSeries.removeLastIfNaN(),
            e.symbol.isLastBar)
          ) {
            this._studyDataUpdate.setEraseCmds(this.popEraseCmds()),
              this._studyDataUpdate.update();
            const e = this._studyDataUpdate.getUpdate();
            e.json &&
              r.data.push({
                nonseries: !0,
                type: "study_graphics",
                data: e.json,
              }),
              e.jsonUpdate &&
                r.data.push({
                  nonseries: !0,
                  type: "study_graphics",
                  data: e.jsonUpdate,
                });
          }
          if (
            (this._hasSecondarySymbol && e.select_sym(0),
            i && i.period === this._originalResolution.value())
          ) {
            (0, s.assert)(e.symbol.time === i.time);
            const t = i.time,
              n = t + this._originalResolution.inMilliseconds(t) - 1;
            if (t && t >= this._firstBarTime) {
              const e = this._developingPocSeries.getLeftOrEqual(n),
                t = this._developingVAHighSeries.getLeftOrEqual(n),
                i = this._developingVALowSeries.getLeftOrEqual(n);
              r.data.push([e, t, i]);
            } else r.data.push([NaN, NaN, NaN]);
          }
          return r;
        }
        time() {
          return this._timeSeries;
        }
        open() {
          return this._openSeries;
        }
        high() {
          return this._highSeries;
        }
        low() {
          return this._lowSeries;
        }
        close() {
          return this._closeSeries;
        }
        volume() {
          return this._volumeSeries;
        }
        developingPoc() {
          return this._developingPocSeries;
        }
        developingVAHigh() {
          return this._developingVAHighSeries;
        }
        developingVALow() {
          return this._developingVALowSeries;
        }
      }
      const v = {
        constructor: f,
        name: "Volume Profile Visible Range",
        metainfo: {
          _metainfoVersion: 51,
          id: "VbPVisible@tv-basicstudies-49",
          description: "Volume Profile Visible Range",
          shortDescription: "VPVR",
          format: {type: "volume"},
          is_price_study: !0,
          linkedToSeries: !0,
          palettes: {},
          inputs: [
            {
              id: "rowsLayout",
              name: "Rows Layout",
              defval: "Number Of Rows",
              options: ["Number Of Rows", "Ticks Per Row"],
              type: "text",
            },
            {
              id: "rows",
              name: "Row Size",
              defval: 24,
              max: 1e6,
              min: 1,
              type: "integer",
            },
            {
              id: "volume",
              name: "Volume",
              defval: "Up/Down",
              options: ["Up/Down", "Total"],
              type: "text",
            },
            {
              id: "first_visible_bar_time",
              name: "First Visible Bar Time",
              defval: 0,
              isHidden: !0,
              max: 253370764800,
              min: -253370764800,
              type: "time",
            },
            {
              id: "last_visible_bar_time",
              name: "Last Visible Bar Time",
              defval: 0,
              isHidden: !0,
              max: 253370764800,
              min: -253370764800,
              type: "time",
            },
            {
              id: "vaVolume",
              name: "Value Area Volume",
              defval: 70,
              max: 100,
              min: 0,
              type: "integer",
            },
          ],
          plots: [
            {id: "developingPoc", type: "line"},
            {id: "developingVAHigh", type: "line"},
            {id: "developingVALow", type: "line"},
          ],
          graphics: {
            hhists: {
              histBars2: {
                location: o.HHistLocation.Relative,
                title: "Volume Profile",
                titles: ["Up Volume", "Down Volume"],
              },
              histBarsVA: {
                location: o.HHistLocation.Relative,
                title: "Value Area",
                titles: ["Value Area Up", "Value Area Down"],
              },
            },
            horizlines: {pocLines: {name: "POC", showPrice: !0}},
          },
          defaults: {
            graphics: {
              hhists: {
                histBars2: {
                  colors: ["#1592e6", "#fbc123"],
                  direction: o.HHistDirection.RightToLeft,
                  percentWidth: 30,
                  showValues: !1,
                  transparencies: [76, 76],
                  valuesColor: "#424242",
                  visible: !0,
                },
                histBarsVA: {
                  colors: ["#1592e6", "#fbc123"],
                  direction: o.HHistDirection.RightToLeft,
                  percentWidth: 30,
                  showValues: !1,
                  transparencies: [30, 30],
                  valuesColor: "#424242",
                  visible: !0,
                },
              },
              horizlines: {
                pocLines: {color: "#ff0000", style: 0, visible: !0, width: 2},
              },
            },
            inputs: {
              first_visible_bar_time: 0,
              last_visible_bar_time: 0,
              rows: 24,
              rowsLayout: "Number Of Rows",
              vaVolume: 70,
              volume: "Up/Down",
            },
            styles: {
              developingPoc: {
                color: "#ff0000",
                linestyle: 0,
                linewidth: 1,
                plottype: 9,
                trackPrice: !1,
                transparency: 0,
                visible: !1,
              },
              developingVAHigh: {
                color: "#0000ff",
                linestyle: 0,
                linewidth: 1,
                plottype: 9,
                trackPrice: !1,
                transparency: 0,
                visible: !1,
              },
              developingVALow: {
                color: "#0000ff",
                linestyle: 0,
                linewidth: 1,
                plottype: 9,
                trackPrice: !1,
                transparency: 0,
                visible: !1,
              },
            },
          },
          styles: {
            developingPoc: {histogramBase: 0, title: "Developing Poc"},
            developingVAHigh: {histogramBase: 0, title: "Developing VA High"},
            developingVALow: {histogramBase: 0, title: "Developing VA Low"},
          },
        },
      };
    },
    71181: (e, t, i) => {
      "use strict";
      i.d(t, {StudyError: () => s});
      class s extends Error {
        constructor(e) {
          super(e), (this.studyError = !0);
        }
      }
    },
    90957: (e, t, i) => {
      "use strict";
      i.d(t, {EraseObj: () => s, EraseAll: () => r, GraphicsCmds: () => n});
      class s {
        constructor(e, t) {
          (this.id = e), (this.type = t);
        }
        primitiveData() {
          return {action: "one", id: this.id, type: this.type};
        }
      }
      class r {
        primitiveData() {
          return {action: "all"};
        }
      }
      class n {
        constructor() {
          (this.erase = []), (this.create = null), (this._modified = !1);
        }
        primitiveData(e) {
          if (this.isNaN()) return null;
          const t = {},
            i = this.create && this.create.primitiveData(e);
          return (
            null !== i && (t.create = i),
            null !== this.erase &&
              this.erase.length > 0 &&
              (t.erase = this.erase.map(e => e.primitiveData())),
            void 0 === t.create && void 0 === t.erase ? null : t
          );
        }
        setCreate(e) {
          (this.create = e), this.create.forEachList(e => e.setOwner(this));
        }
        isNaN() {
          return (
            (null === this.erase || 0 === this.erase.length) &&
            null === this.create
          );
        }
        isModified() {
          return this._modified;
        }
        setModified(e) {
          this._modified = e;
        }
        dirty() {
          this._modified = !0;
        }
        setOwner(e) {
          throw new Error("Unsupported");
        }
      }
    },
    79234: (e, t, i) => {
      "use strict";
      i.d(t, {GraphicsListColl: () => s});
      class s {
        constructor() {
          (this._stable = []), (this._variable = null), (this._owner = null);
        }
        addStable(e) {
          e.setOwner(this), this._stable.push(e);
        }
        setVariable(e) {
          (this._variable = e),
            null !== this._variable && this._variable.setOwner(this);
        }
        primitivesData(e) {
          const t = [];
          return this._forEach(i => t.push(...i.primitivesData(e))), t;
        }
        deleteErasedItems() {
          this._forEach(e => e.deleteErasedItems());
        }
        markPostedItems() {
          this._forEach(e => e.markPostedItems());
        }
        isNaN() {
          return this._all(e => e.isNaN());
        }
        dirty() {
          null !== this._owner && this._owner.dirty();
        }
        setOwner(e) {
          this._owner = e;
        }
        _forEach(e) {
          for (const t of this._stable) e(t);
          null !== this._variable && e(this._variable);
        }
        _all(e) {
          for (const t of this._stable) if (!e(t)) return !1;
          return null === this._variable || e(this._variable);
        }
      }
    },
    14942: (e, t, i) => {
      "use strict";
      i.d(t, {GraphicsList: () => n});
      var s = i(14),
        r = i(49282);
      class n {
        constructor() {
          (this._items = []), (this._owner = null);
        }
        primitivesData(e) {
          const t = [];
          for (const i of this._items)
            e.isIgnoredObj(i) || t.push(i.primitiveData());
          return t;
        }
        get(e) {
          return this._items[e];
        }
        set(e, t) {
          return this.dirty(), t.setOwner(this), (this._items[e] = t), t;
        }
        addAtIndex(e, t) {
          this.dirty(), t.setOwner(this), (this._items[e] = t);
        }
        clear() {
          this._unsetOwner(this._items), (this._items = []), this.dirty();
        }
        addAllFromNumber(e, t) {
          this.setOwner(t), this._items.splice(e, 0, ...t._items);
          return this._setCachedDataValid(!1), !0;
        }
        addAll(e) {
          this.setOwner(e), this._items.push(...e._items);
          return this._setCachedDataValid(!1), !0;
        }
        remove(e) {
          const t = this._items[e];
          return this._items.splice(e, 1), t.unsetOwner(this), this.dirty(), t;
        }
        getItems() {
          return this._items;
        }
        size() {
          return this._items.length;
        }
        add(e) {
          e.setOwner(this), this._items.push(e);
          return this._setCachedDataValid(!1), !0;
        }
        deleteErasedItems() {
          this._items = this._items.filter(e => !e.isErased());
        }
        markPostedItems() {
          for (const e of this._items) e.markAsPosted();
        }
        isNaN() {
          if (0 === this._items.length) return !0;
          for (const e of this._items) {
            if (!(0, r.isNaNable)(e)) return !1;
            if (!e.isNaN()) return !1;
          }
          return !0;
        }
        setOwner(e) {
          this._owner = e;
        }
        dirty() {
          null !== this._owner && this._owner.dirty();
        }
        _unsetOwner(e) {
          for (const t of e) t instanceof s.GraphicsObj && t.unsetOwner(this);
        }
        _setCachedDataValid(e) {
          e || this.dirty();
        }
      }
    },
    14: (e, t, i) => {
      "use strict";
      i.d(t, {GraphicsObj: () => l});
      var s = i(77392);
      class r {
        constructor(e, t, i, s) {
          (this._value = e),
            (this._name = t),
            (this._owner = i),
            (this._comparer =
              void 0 !== s ? s : (e, t) => (null == e ? null != t : e === t));
        }
        getName() {
          return this._name;
        }
        set(e) {
          const t = this._comparer(this._value, e);
          return t && this._owner.dirty(), (this._value = e), t;
        }
        get() {
          return this._value;
        }
      }
      class n {
        constructor(e, t, i) {
          (this._owner = null),
            (this._value = e),
            (this._name = t),
            (this._owner = i);
        }
        getName() {
          return this._name;
        }
        set(e) {
          return (
            this._value !== e &&
            ((this._value = e), null !== this._owner && this._owner.dirty(), !0)
          );
        }
        get() {
          return this._value;
        }
      }
      class o extends r {
        constructor(e, t, i, s) {
          super(e, t, i, s);
        }
      }
      class a {
        constructor(e) {
          this._owner = e;
        }
        createField(e, t) {
          return new r(e, t, this);
        }
        createDoubleField(e, t) {
          return new r(e, t, this, (e, t) => !s.Std.equal(e, t));
        }
        createDoubleArrayField(e, t) {
          return new o(e, t, this, (e, t) => {
            if (e === t) return !1;
            const i = e.length;
            if (t.length !== i) return !0;
            for (let r = 0; r < i; r++) {
              const i = e[r],
                n = t[r];
              if (!s.Std.equal(i, n)) return !0;
            }
            return !1;
          });
        }
        createTimeField(e, t) {
          return new n(e, t, this);
        }
        dirty() {
          null !== this._owner && this._owner.dirty();
        }
        setOwner(e) {
          this._owner = e;
        }
      }
      class l {
        constructor(e) {
          (this._mixinJSONObject = new a(this)),
            (this._state = 0),
            (this._owner = null),
            (this._gen = e),
            (this._id = e.nextGraphicsObjId()),
            (this._id2 = this._mixinJSONObject.createField(this.id(), "id"));
        }
        dirty() {
          null !== this._owner && this._owner.dirty();
        }
        setOwner(e) {
          this._owner = e;
        }
        id() {
          return this._id;
        }
        unsetOwner(e) {
          this._owner === e && (this._owner = null);
        }
        state() {
          return this._state;
        }
        erase() {
          1 === this._state &&
            this._gen.pushEraseObjCmd(this._id, this.jsonName()),
            (this._state = 2),
            this.dirty();
        }
        markAsPosted() {
          1 !== this._state && ((this._state = 1), this.dirty());
        }
        isErased() {
          return 2 === this._state;
        }
        isPosted() {
          return 1 === this._state;
        }
        isNaN() {
          return !1;
        }
        _processObjUpdate() {
          1 === this._state &&
            (this._gen.pushEraseObjCmd(this._id, this.jsonName()),
            (this._id = this._gen.nextGraphicsObjId()),
            this._id2.set(this._id),
            (this._state = 0)),
            this.dirty();
        }
      }
    },
    49282: (e, t, i) => {
      "use strict";
      function s(e) {
        return Boolean(e.isNaN);
      }
      i.d(t, {isNaNable: () => s});
    },
    10622: (e, t, i) => {
      "use strict";
      i.d(t, {JStudyDataUpdate: () => d});
      var s = i(90957);
      class r {
        constructor() {
          (this.isUpdate = !1),
            (this.graphicsCmds = new s.GraphicsCmds()),
            (this._offsetsChanged = !1),
            (this._disableGraphicsAndData = !1);
        }
        isNaN() {
          return this.graphicsCmds.isNaN();
        }
        primitiveData(e) {
          const t = {};
          if (!this._disableGraphicsAndData) {
            const i = this.graphicsCmds.primitiveData(e);
            null !== i && (t.graphicsCmds = i);
          }
          return (
            this.isUpdate && (t.isUpdate = !0),
            void 0 === t.graphicsCmds ? void 0 : t
          );
        }
        disable() {
          this._disableGraphicsAndData = !0;
        }
        checkForChangeAndResetChangedState(e) {
          const t = this._offsetsChanged,
            i = this.graphicsCmds.isModified();
          this.graphicsCmds.setModified(!1), (this._offsetsChanged = !1);
          return i || t || 0 !== e.length;
        }
      }
      var n = i(47903),
        o = i(49282);
      function a(e) {
        return Boolean(e.isPosted);
      }
      class l {
        isIgnoredObj(e, t) {
          return l.isIgnoredObjDefault(e, t);
        }
        static isIgnoredObjDefault(e, t) {
          if (void 0 === t) return l.isIgnoredObjNaNable(e);
          const i = e[t];
          return (
            l.isIgnoredByGeneralRules(e, t) ||
            l.isIgnoredObjNaNable(i) ||
            l.isIgnoredObjListOfNaNables(i)
          );
        }
        static isIgnoredObjNaNable(e) {
          return (0, o.isNaNable)(e) && e.isNaN();
        }
        static isIgnoredObjListOfNaNables(e) {
          if (!(0, n.isArray)(e)) return !1;
          let t = !0;
          for (const i of e)
            if (!(0, o.isNaNable)(i) || !i.isNaN()) {
              t = !1;
              break;
            }
          return t;
        }
        static isIgnoredObjPosted(e) {
          return a(e) && e.isPosted();
        }
        static isIgnoredObjErased(e) {
          return a(e) && e.isErased();
        }
        static isIgnoredByGeneralRules(e, t) {
          const i = e[t];
          return (0, n.isArray)(i) && 0 === i.length;
        }
      }
      class c {
        isIgnoredObj(e, t) {
          if (void 0 === t)
            return l.isIgnoredObjDefault(e) || l.isIgnoredObjErased(e);
          const i = e[t];
          return l.isIgnoredObjDefault(e, t) || l.isIgnoredObjErased(i);
        }
      }
      class h {
        isIgnoredObj(e, t) {
          if (void 0 === t)
            return (
              l.isIgnoredObjDefault(e) ||
              l.isIgnoredObjErased(e) ||
              l.isIgnoredObjPosted(e)
            );
          const i = e[t];
          return (
            l.isIgnoredObjDefault(e, t) ||
            l.isIgnoredObjErased(i) ||
            l.isIgnoredObjPosted(i)
          );
        }
      }
      class d extends class extends class {
        constructor(e) {
          (this._dataObj = new r()),
            (this._isDirty = !1),
            (this._eraseCmds = []),
            (this._enableCmdDataStudy = e);
        }
        init(e) {
          this._dataObj.graphicsCmds.setCreate(e), this.update(!0);
        }
        dataObj() {
          return this._dataObj;
        }
        setEraseCmds(e) {
          this._eraseCmds = e;
        }
        resetDirtyState() {
          this._isDirty = !1;
        }
        disable() {
          this._dataObj.disable();
        }
      } {
        constructor(e) {
          super(e),
            (this._snapshotPredicate = new c()),
            (this._dataSnapShot = {});
        }
        getData() {
          return this._dataSnapShot;
        }
        getUpdate() {
          return this._isDirty ? this._dataSnapShot : {};
        }
        update(e) {
          (this._dataObj.checkForChangeAndResetChangedState(this._eraseCmds) ||
            e) &&
            (null !== this._dataObj.graphicsCmds.create &&
              (this._dataObj.graphicsCmds.create.deleteErasedObjs(),
              (this._dataObj.graphicsCmds.erase = [new s.EraseAll()])),
            this._makeSnapshot(),
            (this._isDirty = !0));
        }
        _makeSnapshot() {
          (this._json = this._dataObj.primitiveData(this._snapshotPredicate)),
            (this._dataSnapShot = {json: this._json});
        }
      } {
        constructor(e) {
          super(e),
            (this._updatePredicate = new h()),
            (this._sendShapshotOnly = !0),
            (this._isFirstNotForcedUpdate = !0);
        }
        update(e) {
          (this._dataObj.checkForChangeAndResetChangedState(this._eraseCmds) ||
            e) &&
            (null !== this._dataObj.graphicsCmds.create &&
              (this._dataObj.graphicsCmds.erase = [new s.EraseAll()]),
            (this._dataObj.isUpdate = !0),
            this._makeSnapshot(),
            null !== this._dataObj.graphicsCmds.create &&
              (this._dataObj.graphicsCmds.erase = this._eraseCmds),
            (this._dataObj.isUpdate = !0),
            (this._jsonUpdate = this._dataObj.primitiveData(
              this._updatePredicate,
            )),
            null !== this._dataObj.graphicsCmds.create &&
              this._dataObj.graphicsCmds.create.deleteErasedAndMarkPostedObjs(),
            (this._sendShapshotOnly = e || this._isFirstNotForcedUpdate),
            (this._isFirstNotForcedUpdate = Boolean(e)),
            (this._isDirty = !0));
        }
        getUpdate() {
          return this._isDirty
            ? this._enableCmdDataStudy
              ? {
                  json: this._sendShapshotOnly ? this._json : void 0,
                  jsonUpdate: this._sendShapshotOnly
                    ? void 0
                    : this._jsonUpdate,
                }
              : {
                  json: this._json,
                  jsonUpdate: this._sendShapshotOnly
                    ? void 0
                    : this._jsonUpdate,
                }
            : {};
        }
      }
    },
    86860: (e, t, i) => {
      "use strict";
      i.d(t, {StudyGraphicsData: () => r, Container: () => n});
      var s = i(16282);
      class r {
        constructor() {
          (this._horizlines = []),
            (this._hhists = []),
            (this._polygons = []),
            (this._vertlines = []),
            (this._containersCache = []),
            (this._containerNamesCache = []),
            (this._containersMapCache = new Map()),
            this._addToCache("horizlines", this._horizlines),
            this._addToCache("hhists", this._hhists),
            this._addToCache("polygons", this._polygons),
            this._addToCache("vertlines", this._vertlines);
        }
        primitiveData(e) {
          const t = {};
          let i = !1;
          for (const s of this._containerNamesCache) {
            const r = [],
              n = this.getObjsContainer(s);
            for (const t of n) {
              if (t.isNaN()) continue;
              const i = t.primitiveData(e);
              i.data.length > 0 && r.push(i);
            }
            r.length > 0 && ((t[s] = r), (i = !0));
          }
          return i ? t : null;
        }
        deleteErasedAndMarkPostedObjs() {
          this.forEachList(e => {
            e.deleteErasedItems(), e.markPostedItems();
          });
        }
        deleteErasedObjs() {
          this.forEachList(e => e.deleteErasedItems());
        }
        getObjsContainer(e) {
          return (0, s.ensureDefined)(this._containersMapCache.get(e));
        }
        forEachList(e) {
          for (const t of this._containersCache) for (const i of t) e(i.data);
        }
        _addToCache(e, t) {
          this._containersCache.push(t),
            this._containerNamesCache.push(e),
            this._containersMapCache.set(e, t);
        }
      }
      class n {
        constructor(e, t) {
          (this.styleId = e), (this.data = t);
        }
        isNaN() {
          return this.data.isNaN();
        }
        primitiveData(e) {
          return {styleId: this.styleId, data: this.data.primitivesData(e)};
        }
      }
    },
    81137: (e, t, i) => {
      "use strict";
      const s = i(53312).getHexColorByName;
      var r = i(77392);
      const n = s("color-ripe-red-100"),
        o = s("color-ripe-red-200"),
        a = s("color-ripe-red-500"),
        l = s("color-ripe-red-900"),
        c = s("color-ripe-red-a200"),
        h = s("color-minty-green-100"),
        d = s("color-minty-green-400"),
        u = s("color-minty-green-500");
      JSServer.studyLibrary = [
        {
          name: "Accumulation/Distribution",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Accumulation/Distribution",
            shortDescription: "Accum/Dist",
            is_price_study: !1,
            inputs: [],
            id: "Accumulation/Distribution@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Accumulation/Distribution",
            format: {type: "volume"},
          },
          constructor: function () {
            (this.f_0 = function (e, t, i, s) {
              return r.Std.or(
                r.Std.and(r.Std.eq(e, t), r.Std.eq(e, i)),
                r.Std.eq(t, i),
              )
                ? 0
                : ((2 * e - i - t) / (t - i)) * s;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this.f_0(
                  r.Std.close(this._context),
                  r.Std.high(this._context),
                  r.Std.low(this._context),
                  r.Std.volume(this._context),
                );
                return [r.Std.cum(i, this._context)];
              });
          },
        },
        {
          name: "Accumulative Swing Index",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 10},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "ASI", histogramBase: 0, joinPoints: !1}},
            description: "Accumulative Swing Index",
            shortDescription: "ASI",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "Limit Move Value",
                defval: 10,
                type: "float",
                min: 0.1,
                max: 1e5,
              },
            ],
            id: "Accumulative Swing Index@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Accumulative Swing Index",
            format: {type: "volume"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              var i = t.new_var(r.Std.open(t)),
                s = t.new_var(r.Std.high(t)),
                n = t.new_var(r.Std.low(t)),
                o = t.new_var(r.Std.close(t)),
                a = r.Std.abs(s - o.get(1)),
                l = r.Std.abs(n - o.get(1)),
                c = r.Std.abs(s - n),
                h = r.Std.abs(o.get(1) - i.get(1)),
                d = r.Std.max(a, l),
                u = r.Std.iff(
                  a >= r.Std.max(l, c),
                  a - 0.5 * l + 0.25 * h,
                  r.Std.iff(
                    l >= r.Std.max(a, c),
                    l - 0.5 * a + 0.25 * h,
                    c + 0.25 * h,
                  ),
                );
              return r.Std.iff(
                0 === u,
                0,
                ((((o -
                  o.get(1) +
                  0.5 * (o - i) +
                  0.25 * (o.get(1) - i.get(1))) /
                  u) *
                  d) /
                  e) *
                  50,
              );
            }),
              (this.f_1 = function (e, t) {
                var i = this.f_0(e, t);
                return r.Std.cum(i, t);
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0);
                return [this.f_1(i, this._context)];
              });
          },
        },
        {
          name: "Advance/Decline",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 10},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Advance/Decline",
            shortDescription: "AD",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 10,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Advance/Decline@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Advance/Decline",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return r.Std.gt(e, t);
            }),
              (this.f_1 = function (e, t) {
                return r.Std.lt(e, t);
              }),
              (this.f_2 = function (e, t) {
                return 0 === t ? e : e / t;
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = this.f_0(
                    r.Std.close(this._context),
                    r.Std.open(this._context),
                  ),
                  n = this._context.new_var(s),
                  o = r.Std.sum(n, i, this._context),
                  a = this.f_1(
                    r.Std.close(this._context),
                    r.Std.open(this._context),
                  ),
                  l = this._context.new_var(a),
                  c = r.Std.sum(l, i, this._context);
                return [this.f_2(o, c)];
              });
          },
        },
        {
          name: "Arnaud Legoux Moving Average",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 9, in_1: 0.85, in_2: 6},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Arnaud Legoux Moving Average",
            shortDescription: "ALMA",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "Window Size",
                defval: 9,
                type: "integer",
                min: 0,
                max: 5e3,
              },
              {
                id: "in_1",
                name: "Offset",
                defval: 0.85,
                type: "float",
                min: -1e12,
                max: 1e12,
              },
              {
                id: "in_2",
                name: "Sigma",
                defval: 6,
                type: "float",
                min: -1e12,
                max: 1e12,
              },
            ],
            id: "Arnaud Legoux Moving Average@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Arnaud Legoux Moving Average",
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = r.Std.close(this._context),
                s = this._input(0),
                n = this._input(1),
                o = this._input(2),
                a = this._context.new_var(i);
              return [r.Std.alma(a, s, n, o)];
            };
          },
        },
        {
          name: "Aroon",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FB8C00",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 14},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
            ],
            styles: {
              plot_0: {title: "Upper", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "Lower", histogramBase: 0, joinPoints: !1},
            },
            description: "Aroon",
            shortDescription: "Aroon",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 14,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Aroon@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Aroon",
            format: {precision: 2, type: "percent"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return (100 * (e + t)) / t;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = r.Std.high(this._context),
                  n = i + 1,
                  o = this._context.new_var(s),
                  a = r.Std.highestbars(o, n, this._context),
                  l = this.f_0(a, i),
                  c = r.Std.low(this._context),
                  h = this._context.new_var(c),
                  d = r.Std.lowestbars(h, n, this._context);
                return [l, this.f_0(d, i)];
              });
          },
        },
        {
          name: "Average Price",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            id: "AveragePrice@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Average Price",
            description: "Average Price",
            shortDescription: "Average Price",
            is_price_study: !0,
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: "#2196F3",
                },
              },
              inputs: {},
            },
            styles: {plot_0: {title: "Plot"}},
            inputs: [],
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              return (
                (this._context = e),
                (this._input = t),
                [r.Std.ohlc4(this._context)]
              );
            };
          },
        },
        {
          name: "Average Directional Index",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: c,
                },
              },
              inputs: {in_0: 14, in_1: 14},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {
              plot_0: {
                title: "ADX",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
            },
            description: "Average Directional Index",
            shortDescription: "ADX",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "ADX Smoothing",
                defval: 14,
                type: "integer",
                min: -1e12,
                max: 1e12,
              },
              {
                id: "in_1",
                name: "DI Length",
                defval: 14,
                type: "integer",
                min: -1e12,
                max: 1e12,
              },
            ],
            id: "average_directional_Index@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Average Directional Index",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e) {
              var t = this._context.new_var(r.Std.high(this._context)),
                i = r.Std.change(t),
                s = this._context.new_var(r.Std.low(this._context)),
                n = -r.Std.change(s),
                o = this._context.new_var(r.Std.tr(void 0, this._context)),
                a = r.Std.rma(o, e, this._context),
                l = this._context.new_var(
                  r.Std.and(r.Std.gt(i, n), r.Std.gt(i, 0)) ? i : 0,
                ),
                c = r.Std.fixnan(
                  (100 * r.Std.rma(l, e, this._context)) / a,
                  this._context,
                ),
                h = this._context.new_var(
                  r.Std.and(r.Std.gt(n, i), r.Std.gt(n, 0)) ? n : 0,
                );
              return [
                c,
                r.Std.fixnan(
                  (100 * r.Std.rma(h, e, this._context)) / a,
                  this._context,
                ),
              ];
            }),
              (this.f_1 = function (e, t) {
                var i = this.f_0(e),
                  s = i[0],
                  n = i[1],
                  o = s + n,
                  a = this._context.new_var(
                    r.Std.abs(s - n) / (r.Std.eq(o, 0) ? 1 : o),
                  );
                return [100 * r.Std.rma(a, t, this._context)];
              }),
              (this.main = function (e, t) {
                return (
                  (this._context = e),
                  (this._input = t),
                  this._context.setMinimumAdditionalDepth(
                    this._input(0) + this._input(1),
                  ),
                  this.f_1(this._input(1), this._input(0))
                );
              });
          },
        },
        {
          name: "Average True Range",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: l,
                },
              },
              inputs: {in_0: 14},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Average True Range",
            shortDescription: "ATR",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 14,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Average True Range@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Average True Range",
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              var i = t(0);
              return [r.Std.atr(i, e)];
            };
          },
        },
        {
          name: "Awesome Oscillator",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 1,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#000080",
                },
              },
              palettes: {
                palette_0: {
                  colors: {
                    0: {color: a, width: 1, style: 0},
                    1: {color: u, width: 1, style: 0},
                  },
                },
              },
              inputs: {},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {
                id: "plot_1",
                palette: "palette_0",
                target: "plot_0",
                type: "colorer",
              },
            ],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Awesome Oscillator",
            shortDescription: "AO",
            is_price_study: !1,
            palettes: {
              palette_0: {colors: {0: {name: "Color 0"}, 1: {name: "Color 1"}}},
            },
            inputs: [],
            id: "Awesome Oscillator@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Awesome Oscillator",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return e - t;
            }),
              (this.f_1 = function (e) {
                return r.Std.le(e, 0) ? 0 : 1;
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = r.Std.hl2(this._context),
                  s = this._context.new_var(i),
                  n = r.Std.sma(s, 5, this._context),
                  o = this._context.new_var(i),
                  a = r.Std.sma(o, 34, this._context),
                  l = this.f_0(n, a),
                  c = l,
                  h = this._context.new_var(l),
                  d = r.Std.change(h);
                return [c, this.f_1(d)];
              });
          },
        },
        {
          name: "Balance of Power",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: c,
                },
              },
              inputs: {},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Balance of Power",
            shortDescription: "Balance of Power",
            is_price_study: !1,
            inputs: [],
            id: "Balance of Power@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Balance of Power",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e, t, i, s) {
              return (e - t) / (i - s);
            }),
              (this.main = function (e, t) {
                return (
                  (this._context = e),
                  (this._input = t),
                  [
                    this.f_0(
                      r.Std.close(this._context),
                      r.Std.open(this._context),
                      r.Std.high(this._context),
                      r.Std.low(this._context),
                    ),
                  ]
                );
              });
          },
        },
        {
          name: "Bollinger Bands",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FF6D00",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_2: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              filledAreasStyle: {
                fill_0: {color: "#2196F3", transparency: 95, visible: !0},
              },
              inputs: {in_0: 20, in_1: 2},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
              {id: "plot_2", type: "line"},
            ],
            styles: {
              plot_0: {title: "Median", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "Upper", histogramBase: 0, joinPoints: !1},
              plot_2: {title: "Lower", histogramBase: 0, joinPoints: !1},
            },
            description: "Bollinger Bands",
            shortDescription: "BB",
            is_price_study: !0,
            filledAreas: [
              {
                id: "fill_0",
                objAId: "plot_1",
                objBId: "plot_2",
                type: "plot_plot",
                title: "Plots Background",
              },
            ],
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 20,
                type: "integer",
                min: 1,
                max: 1e4,
              },
              {
                id: "in_1",
                name: "mult",
                defval: 2,
                type: "float",
                min: 0.001,
                max: 50,
              },
            ],
            id: "Bollinger Bands@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Bollinger Bands",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return e * t;
            }),
              (this.f_1 = function (e, t) {
                return e + t;
              }),
              (this.f_2 = function (e, t) {
                return e - t;
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = r.Std.close(this._context),
                  s = this._input(0),
                  n = this._input(1),
                  o = this._context.new_var(i),
                  a = r.Std.sma(o, s, this._context),
                  l = this._context.new_var(i),
                  c = r.Std.stdev(l, s, this._context),
                  h = this.f_0(n, c);
                return [a, this.f_1(a, h), this.f_2(a, h)];
              });
          },
        },
        {
          name: "Bollinger Bands %B",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: d,
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 1,
                },
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 0,
                },
              ],
              filledAreasStyle: {
                fill_0: {color: "#26A69A", transparency: 90, visible: !0},
              },
              inputs: {in_0: 20, in_1: 2},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Bollinger Bands %B",
            shortDescription: "BB %B",
            is_price_study: !1,
            bands: [
              {id: "hline_0", name: "UpperLimit"},
              {id: "hline_1", name: "LowerLimit"},
            ],
            filledAreas: [
              {
                id: "fill_0",
                objAId: "hline_0",
                objBId: "hline_1",
                type: "hline_hline",
                title: "Hlines Background",
              },
            ],
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 20,
                type: "integer",
                min: 1,
                max: 1e4,
              },
              {
                id: "in_1",
                name: "mult",
                defval: 2,
                type: "float",
                min: 0.001,
                max: 50,
              },
            ],
            id: "Bollinger Bands %B@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Bollinger Bands %B",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return e * t;
            }),
              (this.f_1 = function (e, t) {
                return e + t;
              }),
              (this.f_2 = function (e, t) {
                return e - t;
              }),
              (this.f_3 = function (e, t, i) {
                return (e - t) / (i - t);
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = r.Std.close(this._context),
                  s = this._input(0),
                  n = this._input(1),
                  o = this._context.new_var(i),
                  a = r.Std.sma(o, s, this._context),
                  l = this._context.new_var(i),
                  c = r.Std.stdev(l, s, this._context),
                  h = this.f_0(n, c),
                  d = this.f_1(a, h),
                  u = this.f_2(a, h);
                return [this.f_3(i, u, d)];
              });
          },
        },
        {
          name: "Bollinger Bands Width",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FF6D00",
                },
              },
              inputs: {in_0: 20, in_1: 2},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Bollinger Bands Width",
            shortDescription: "BBW",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 20,
                type: "integer",
                min: 1,
                max: 1e4,
              },
              {
                id: "in_1",
                name: "mult",
                defval: 2,
                type: "float",
                min: 0.001,
                max: 50,
              },
            ],
            id: "Bollinger Bands Width@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Bollinger Bands Width",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return e * t;
            }),
              (this.f_1 = function (e, t) {
                return e + t;
              }),
              (this.f_2 = function (e, t) {
                return e - t;
              }),
              (this.f_3 = function (e, t, i) {
                return (e - t) / i;
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = r.Std.close(this._context),
                  s = this._input(0),
                  n = this._input(1),
                  o = this._context.new_var(i),
                  a = r.Std.sma(o, s, this._context),
                  l = this._context.new_var(i),
                  c = r.Std.stdev(l, s, this._context),
                  h = this.f_0(n, c),
                  d = this.f_1(a, h),
                  u = this.f_2(a, h);
                return [this.f_3(d, u, a)];
              });
          },
        },
        {
          name: "Chaikin Money Flow",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#43A047",
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 0,
                },
              ],
              inputs: {in_0: 20},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Chaikin Money Flow",
            shortDescription: "CMF",
            is_price_study: !1,
            bands: [{id: "hline_0", name: "Zero"}],
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 20,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Chaikin Money Flow@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Chaikin Money Flow",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e, t, i, s) {
              return r.Std.or(
                r.Std.and(r.Std.eq(e, t), r.Std.eq(e, i)),
                r.Std.eq(t, i),
              )
                ? 0
                : ((2 * e - i - t) / (t - i)) * s;
            }),
              (this.f_1 = function (e, t) {
                return e / t;
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = this.f_0(
                    r.Std.close(this._context),
                    r.Std.high(this._context),
                    r.Std.low(this._context),
                    r.Std.volume(this._context),
                  ),
                  n = this._context.new_var(s),
                  o = r.Std.sum(n, i, this._context),
                  a = r.Std.volume(this._context),
                  l = this._context.new_var(a),
                  c = r.Std.sum(l, i, this._context);
                return [this.f_1(o, c)];
              });
          },
        },
        {
          name: "Chaikin Oscillator",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#EC407A",
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 0,
                },
              ],
              inputs: {in_0: 3, in_1: 10},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Chaikin Oscillator",
            shortDescription: "Chaikin Osc",
            is_price_study: !1,
            bands: [{id: "hline_0", name: "Zero"}],
            inputs: [
              {
                id: "in_0",
                name: "short",
                defval: 3,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_1",
                name: "long",
                defval: 10,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Chaikin Oscillator@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Chaikin Oscillator",
            format: {type: "volume"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return e - t;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = this._input(1),
                  n = r.Std.accdist(this._context),
                  o = this._context.new_var(n),
                  a = r.Std.ema(o, i, this._context),
                  l = this._context.new_var(n),
                  c = r.Std.ema(l, s, this._context);
                return [this.f_0(a, c)];
              });
          },
        },
        {
          name: "Chaikin Volatility",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            is_price_study: !1,
            id: "Chaikin Volatility@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Chaikin Volatility",
            description: "Chaikin Volatility",
            shortDescription: "Chaikin Volatility",
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: "#AB47BC",
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 0,
                },
              ],
              inputs: {periods: 10, rocLookback: 10},
            },
            styles: {plot_0: {title: "Plot"}},
            bands: [{id: "hline_0", name: "Zero"}],
            inputs: [
              {id: "periods", type: "integer", name: "Periods"},
              {
                id: "rocLookback",
                type: "integer",
                name: "Rate of Change Lookback",
              },
            ],
            format: {type: "volume"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                (this._input = t),
                (this.period = this._input(0)),
                (this.rocLookback = this._input(1));
            }),
              (this.main = function (e, t) {
                (this._context = e),
                  (this._input = t),
                  this._context.setMinimumAdditionalDepth(
                    this.period + this.rocLookback,
                  );
                var i = this._context.new_var(
                    r.Std.high(this._context) - r.Std.low(this._context),
                  ),
                  s = this._context.new_var(
                    r.Std.ema(i, this.period, this._context),
                  );
                return [r.Std.roc(s, this.rocLookback)];
              });
          },
        },
        {
          name: "Chande Kroll Stop",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FF6D00",
                },
              },
              inputs: {in_0: 10, in_1: 1, in_2: 9},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
            ],
            styles: {
              plot_0: {title: "Long", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "Short", histogramBase: 0, joinPoints: !1},
            },
            description: "Chande Kroll Stop",
            shortDescription: "Chande Kroll Stop",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "p",
                defval: 10,
                type: "integer",
                min: 1,
                max: 4999,
              },
              {
                id: "in_1",
                name: "x",
                defval: 1,
                type: "integer",
                min: 1,
                max: 1e12,
              },
              {
                id: "in_2",
                name: "q",
                defval: 9,
                type: "integer",
                min: 1,
                max: 1e12,
              },
            ],
            id: "Chande Kroll Stop@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Chande Kroll Stop",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function (e, t, i) {
              return e - t * i;
            }),
              (this.f_1 = function (e, t, i) {
                return e + t * i;
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = this._input(1),
                  n = this._input(2),
                  o = r.Std.high(this._context),
                  a = this._context.new_var(o),
                  l = r.Std.highest(a, i, this._context),
                  c = r.Std.atr(i, this._context),
                  h = this.f_0(l, s, c),
                  d = this._context.new_var(o),
                  u = r.Std.lowest(d, i, this._context),
                  p = this.f_1(u, s, c),
                  _ = this._context.new_var(h),
                  m = r.Std.highest(_, n, this._context),
                  g = this._context.new_var(p);
                return [r.Std.lowest(g, n, this._context), m];
              });
          },
        },
        {
          name: "Chande Momentum Oscillator",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 9},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Chande Momentum Oscillator",
            shortDescription: "ChandeMO",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 9,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Chande Momentum Oscillator@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Chande Momentum Oscillator",
            format: {type: "price", precision: 2},
          },
          constructor: function () {
            (this.f_0 = function (e) {
              return r.Std.ge(e, 0) ? e : 0;
            }),
              (this.f_1 = function (e) {
                return r.Std.ge(e, 0) ? 0 : -e;
              }),
              (this.f_2 = function (e, t) {
                return (100 * e) / t;
              }),
              (this.f_3 = function (e, t) {
                return this.f_2(e - t, e + t);
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = r.Std.close(this._context),
                  n = this._context.new_var(s),
                  o = r.Std.change(n),
                  a = this.f_0(o),
                  l = this.f_1(o),
                  c = this._context.new_var(a),
                  h = r.Std.sum(c, i, this._context),
                  d = this._context.new_var(l),
                  u = r.Std.sum(d, i, this._context);
                return [this.f_3(h, u)];
              });
          },
        },
        {
          name: "Chop Zone",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 5,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#000080",
                },
              },
              palettes: {
                palette_0: {
                  colors: {
                    0: {color: "#26C6DA", width: 1, style: 0},
                    1: {color: "#43A047", width: 1, style: 0},
                    2: {color: "#A5D6A7", width: 1, style: 0},
                    3: {color: u, width: 1, style: 0},
                    4: {color: "#D50000", width: 1, style: 0},
                    5: {color: "#E91E63", width: 1, style: 0},
                    6: {color: "#FF6D00", width: 1, style: 0},
                    7: {color: "#FFB74D", width: 1, style: 0},
                    8: {color: "#FDD835", width: 1, style: 0},
                  },
                },
              },
              inputs: {},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {
                id: "plot_1",
                palette: "palette_0",
                target: "plot_0",
                type: "colorer",
              },
            ],
            styles: {
              plot_0: {
                title: "Plot",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
            },
            description: "Chop Zone",
            shortDescription: "Chop Zone",
            is_price_study: !1,
            palettes: {
              palette_0: {
                colors: {
                  0: {name: "Color 0"},
                  1: {name: "Color 1"},
                  2: {name: "Color 2"},
                  3: {name: "Color 3"},
                  4: {name: "Color 4"},
                  5: {name: "Color 5"},
                  6: {name: "Color 6"},
                  7: {name: "Color 7"},
                  8: {name: "Color 8"},
                },
                valToIndex: {
                  0: 0,
                  1: 1,
                  2: 2,
                  3: 3,
                  4: 4,
                  5: 5,
                  6: 6,
                  7: 7,
                  8: 8,
                },
              },
            },
            inputs: [],
            id: "chop_zone@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Chop Zone",
            format: {precision: 0, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function () {
              var e = r.Std.close(this._context),
                t = r.Std.hlc3(this._context),
                i = this._context.new_var(r.Std.high(this._context)),
                s = r.Std.highest(i, 30, this._context),
                n = r.Std.lowest(i, 30, this._context),
                o = (25 / (s - n)) * n,
                a = this._context.new_var(e),
                l = this._context.new_var(r.Std.ema(a, 34, this._context)),
                c = ((l.get(1) - l.get(0)) / t) * o,
                h = r.Std.sqrt(1 + c * c),
                d = r.Std.round((180 * r.Std.acos(1 / h)) / 3.141592653589793),
                u = r.Std.iff(r.Std.gt(c, 0), -d, d),
                p = r.Std.and(r.Std.gt(u, -2.14), r.Std.le(u, -0.71)) ? 7 : 8,
                _ = r.Std.and(r.Std.gt(u, -3.57), r.Std.le(u, -2.14)) ? 6 : p,
                m = r.Std.and(r.Std.gt(u, -5), r.Std.le(u, -3.57)) ? 5 : _,
                g = r.Std.le(u, -5) ? 4 : m,
                f = r.Std.and(r.Std.lt(u, 2.14), r.Std.ge(u, 0.71)) ? 3 : g,
                v = r.Std.and(r.Std.lt(u, 3.57), r.Std.ge(u, 2.14)) ? 2 : f,
                S = r.Std.and(r.Std.lt(u, 5), r.Std.ge(u, 3.57)) ? 1 : v;
              return [1, r.Std.ge(u, 5) ? 0 : S];
            }),
              (this.main = function (e, t) {
                return (this._context = e), (this._input = t), this.f_0();
              });
          },
        },
        {
          name: "Choppiness Index",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 61.8,
                },
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 38.2,
                },
              ],
              filledAreasStyle: {
                fill_0: {color: "#2196F3", transparency: 90, visible: !0},
              },
              inputs: {in_0: 14},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Choppiness Index",
            shortDescription: "CHOP",
            is_price_study: !1,
            bands: [
              {id: "hline_0", name: "UpperLimit"},
              {id: "hline_1", name: "LowerLimit"},
            ],
            filledAreas: [
              {
                id: "fill_0",
                objAId: "hline_0",
                objBId: "hline_1",
                type: "hline_hline",
                title: "Hlines Background",
              },
            ],
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 14,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Choppiness Index@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Choppiness Index",
            format: {type: "price", precision: 2},
          },
          constructor: function () {
            (this.f_0 = function (e, t, i, s) {
              return (100 * r.Std.log10(e / (t - i))) / s;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = r.Std.atr(1, this._context),
                  n = this._context.new_var(s),
                  o = r.Std.sum(n, i, this._context),
                  a = r.Std.high(this._context),
                  l = this._context.new_var(a),
                  c = r.Std.highest(l, i, this._context),
                  h = r.Std.low(this._context),
                  d = this._context.new_var(h),
                  u = r.Std.lowest(d, i, this._context),
                  p = r.Std.log10(i);
                return [this.f_0(o, c, u, p)];
              });
          },
        },
        {
          name: "Commodity Channel Index",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                smoothedMA: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !1,
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 100,
                },
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: -100,
                },
              ],
              filledAreasStyle: {
                fill_0: {color: "#2196F3", transparency: 90, visible: !0},
              },
              inputs: {in_0: 20, smoothingLine: "SMA", smoothingLength: 20},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "smoothedMA", type: "line"},
            ],
            styles: {
              plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1},
              smoothedMA: {
                title: "Smoothed MA",
                histogramBase: 0,
                joinPoints: !1,
              },
            },
            description: "Commodity Channel Index",
            shortDescription: "CCI",
            is_price_study: !1,
            bands: [
              {id: "hline_0", name: "UpperLimit"},
              {id: "hline_1", name: "LowerLimit"},
            ],
            filledAreas: [
              {
                id: "fill_0",
                objAId: "hline_0",
                objBId: "hline_1",
                type: "hline_hline",
                title: "Hlines Background",
              },
            ],
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 20,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "smoothingLine",
                name: "Smoothing Line",
                defval: "SMA",
                type: "text",
                options: ["SMA", "EMA", "WMA"],
              },
              {
                id: "smoothingLength",
                name: "Smoothing Length",
                defval: 20,
                type: "integer",
                min: 1,
                max: 1e4,
              },
            ],
            id: "Commodity Channel Index@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Commodity Channel Index",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e, t, i) {
              return (e - t) / (0.015 * i);
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = r.Std.hlc3(this._context),
                  s = this._input(0),
                  n = this._input(1),
                  o = this._input(2);
                this._context.setMinimumAdditionalDepth(s + o);
                var a,
                  l = this._context.new_var(i),
                  c = r.Std.sma(l, s, this._context),
                  h = this._context.new_var(i),
                  d = r.Std.dev(h, s, this._context),
                  u = this.f_0(i, c, d),
                  p = this._context.new_var(u);
                return (
                  "EMA" === n
                    ? (a = r.Std.ema(p, o, this._context))
                    : "WMA" === n
                    ? (a = r.Std.wma(p, o, this._context))
                    : "SMA" === n && (a = r.Std.sma(p, o, this._context)),
                  [u, a]
                );
              });
          },
        },
        {
          name: "Connors RSI",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 70,
                },
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 30,
                },
              ],
              filledAreasStyle: {
                fill_0: {color: "#2196F3", transparency: 90, visible: !0},
              },
              inputs: {in_0: 3, in_1: 2, in_2: 100},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "CRSI", histogramBase: 0, joinPoints: !1}},
            description: "Connors RSI",
            shortDescription: "CRSI",
            is_price_study: !1,
            bands: [
              {id: "hline_0", name: "UpperLimit"},
              {id: "hline_1", name: "LowerLimit"},
            ],
            filledAreas: [
              {
                id: "fill_0",
                objAId: "hline_0",
                objBId: "hline_1",
                type: "hline_hline",
                title: "Hlines Background",
              },
            ],
            inputs: [
              {
                id: "in_0",
                name: "RSI Length",
                defval: 3,
                type: "integer",
                min: 1,
              },
              {
                id: "in_1",
                name: "UpDown Length",
                defval: 2,
                type: "integer",
                min: 1,
              },
              {
                id: "in_2",
                name: "ROC Length",
                defval: 100,
                type: "integer",
                min: 1,
              },
            ],
            id: "Connors RSI@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Connors RSI",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            var e;
            (this.f_1 = function (e, t, i) {
              var s = i.new_var(r.Std.max(r.Std.change(e), 0));
              return r.Std.rma(s, t, i);
            }),
              (this.f_2 = function (e, t, i) {
                var s = i.new_var(-r.Std.min(r.Std.change(e), 0));
                return r.Std.rma(s, t, i);
              }),
              (this.f_3 =
                ((e = 0),
                function (t) {
                  var i = t.get(0),
                    s = t.get(1);
                  return (
                    (e =
                      i === s
                        ? 0
                        : i > s
                        ? r.Std.nz(e) <= 0
                          ? 1
                          : r.Std.nz(e) + 1
                        : r.Std.nz(e) >= 0
                        ? -1
                        : r.Std.nz(e) - 1),
                    this._context.new_var(e)
                  );
                })),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = r.Std.close(this._context),
                  s = this._context.new_var(i),
                  n = this._input(0),
                  o = this._input(1),
                  a = this._input(2);
                this._context.setMinimumAdditionalDepth(a);
                var l = r.Std.rsi(
                    this.f_1(s, n, this._context),
                    this.f_2(s, n, this._context),
                  ),
                  c = this.f_3(s),
                  h = r.Std.rsi(
                    this.f_1(c, o, this._context),
                    this.f_2(c, o, this._context),
                  ),
                  d = this._context.new_var(r.Std.roc(s, 1)),
                  u = r.Std.percentrank(d, a);
                return [r.Std.avg(l, h, u)];
              });
          },
        },
        {
          name: "Coppock Curve",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 10, in_1: 14, in_2: 11},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Coppock Curve",
            shortDescription: "Coppock Curve",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "WMA Length",
                defval: 10,
                type: "integer",
                min: -1e12,
                max: 5e3,
              },
              {
                id: "in_1",
                name: "Long RoC Length",
                defval: 14,
                type: "integer",
                min: 1,
                max: 4999,
              },
              {
                id: "in_2",
                name: "Short RoC Length",
                defval: 11,
                type: "integer",
                min: 1,
                max: 4999,
              },
            ],
            id: "Coppock Curve@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Coppock Curve",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return e + t;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = this._input(1),
                  n = this._input(2);
                this._context.setMinimumAdditionalDepth(i + Math.max(s, n));
                var o = r.Std.close(this._context),
                  a = this._context.new_var(o),
                  l = r.Std.roc(a, s),
                  c = this._context.new_var(o),
                  h = r.Std.roc(c, n),
                  d = this.f_0(l, h),
                  u = this._context.new_var(d);
                return [r.Std.wma(u, i, this._context)];
              });
          },
        },
        {
          name: "Correlation Coeff",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 4,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: "", in_1: 20},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Correlation Coefficient",
            shortDescription: "CC",
            is_price_study: !1,
            inputs: [
              {id: "in_0", name: "sym", defval: "", type: "symbol"},
              {
                id: "in_1",
                name: "length",
                defval: 20,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Correlation Coeff@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Correlation Coeff",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                (this._input = t),
                this._context.new_sym(
                  this._input(0),
                  r.Std.period(this._context),
                );
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._context.new_unlimited_var(
                    this._context.symbol.time,
                  ),
                  s =
                    (this._input(0),
                    r.Std.period(this._context),
                    r.Std.close(this._context)),
                  n = this._input(1);
                this._context.select_sym(1);
                var o = this._context.new_unlimited_var(
                    this._context.symbol.time,
                  ),
                  a = r.Std.close(this._context),
                  l = this._context.new_unlimited_var(a);
                this._context.select_sym(0);
                var c = l.adopt(o, i, 0),
                  h = this._context.new_var(s),
                  d = this._context.new_var(c);
                return [r.Std.correlation(h, d, n, this._context)];
              });
          },
        },
        {
          name: "Correlation - Log",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            is_price_study: !1,
            id: "Correlation - Log@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Correlation - Log",
            description: "Correlation - Log",
            shortDescription: "Correlation - Log",
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: "#2196F3",
                },
              },
              inputs: {instrument: "", instrument2: "", periods: 25},
            },
            styles: {plot_0: {title: "Plot"}},
            inputs: [
              {
                id: "instrument",
                name: "Instrument 1",
                type: "symbol",
                defval: "",
                confirm: !0,
              },
              {
                id: "instrument2",
                name: "Instrument 2",
                type: "symbol",
                defval: "",
                confirm: !0,
              },
              {id: "periods", name: "Periods", type: "integer", defval: 25},
            ],
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                (this._input = t),
                this._context.new_sym(
                  this._input(0),
                  r.Std.period(this._context),
                ),
                this._context.new_sym(
                  this._input(1),
                  r.Std.period(this._context),
                ),
                (this.period = this._input(2));
            }),
              (this.correlationLog = function (e, t, i, s) {
                var n = r.Std.sma(e, i, s),
                  o = r.Std.sma(t, i, s),
                  a = s.new_var(e.get() * t.get());
                return (
                  (r.Std.sma(a, i, s) - n * o) /
                  Math.sqrt(r.Std.variance2(e, n, i) * r.Std.variance2(t, o, i))
                );
              }),
              (this.main = function (e, t) {
                (this._context = e),
                  (this._input = t),
                  this._context.select_sym(1);
                var i = this._context.new_var(this._context.symbol.time);
                this._context.select_sym(2);
                var s = this._context.new_var(r.Std.close(this._context)),
                  n = this._context.new_var(r.Std.log(s.get() / s.get(1))),
                  o = this._context.new_var(this._context.symbol.time);
                this._context.select_sym(1);
                var a = this._context.new_var(r.Std.close(this._context)),
                  l = this._context.new_var(r.Std.log(a.get() / a.get(1))),
                  c = this._context.new_var(n.adopt(o, i, 0)),
                  h = this.correlationLog(l, c, this.period, this._context);
                return [r.Std.round(1e3 * h) / 1e3];
              });
          },
        },
        {
          name: "Detrended Price Oscillator",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#43A047",
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 0,
                },
              ],
              inputs: {in_0: 21, in_1: !1},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {
              plot_0: {
                title: "DPO",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
            },
            description: "Detrended Price Oscillator",
            shortDescription: "DPO",
            is_price_study: !1,
            is_hidden_study: !1,
            id: "detrended_price_oscillator@tv-basicstudies-1",
            bands: [{id: "hline_0", name: "Zero", isHidden: !1}],
            inputs: [
              {
                id: "in_0",
                name: "Period",
                defval: 21,
                type: "integer",
                min: 1,
                max: 1e12,
              },
              {id: "in_1", name: "isCentered", defval: !1, type: "bool"},
            ],
            scriptIdPart: "",
            name: "Detrended Price Oscillator",
            format: {type: "price", precision: 2},
          },
          constructor: function () {
            (this.f_0 = function () {
              var e = this._input(0),
                t = this._input(1),
                i = Math.floor(e / 2 + 1);
              this._context.setMinimumAdditionalDepth(e + i);
              var s = this._context.new_var(r.Std.close(this._context)),
                n = this._context.new_var(r.Std.sma(s, e, this._context)),
                o =
                  this._context.new_var(r.Std.close(this._context)).get(i) - n,
                a = r.Std.close(this._context) - n.get(i);
              return [t ? o : a, t ? -i : 0];
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this.f_0();
                return [{value: i[0], offset: i[1]}];
              });
          },
        },
        {
          name: "Directional Movement Index",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FF6D00",
                },
                plot_3: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#F50057",
                },
                plot_2: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FFA726",
                },
                plot_4: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#ab47bc",
                },
              },
              inputs: {in_0: 14, in_1: 14},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
              {id: "plot_2", type: "line"},
              {id: "plot_3", type: "line"},
              {id: "plot_4", type: "line"},
            ],
            styles: {
              plot_0: {title: "+DI", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "-DI", histogramBase: 0, joinPoints: !1},
              plot_2: {title: "DX", histogramBase: 0, joinPoints: !1},
              plot_3: {title: "ADX", histogramBase: 0, joinPoints: !1},
              plot_4: {title: "ADXR", histogramBase: 0, joinPoints: !1},
            },
            description: "Directional Movement",
            shortDescription: "DMI",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "DI Length",
                defval: 14,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_1",
                name: "ADX Smoothing",
                defval: 14,
                type: "integer",
                min: 1,
                max: 50,
              },
            ],
            id: "Directional Movement Index@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Directional Movement Index",
            format: {precision: 4, type: "price"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = this._input(0),
                s = this._input(1);
              return (
                this._context.setMinimumAdditionalDepth(2 * i + s),
                r.Std.dmi(i, s, this._context)
              );
            };
          },
        },
        {
          name: "Donchian Channels",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_2: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FF6D00",
                },
              },
              filledAreasStyle: {
                fill_0: {color: "#2196F3", transparency: 95, visible: !0},
              },
              inputs: {in_0: 20},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
              {id: "plot_2", type: "line"},
            ],
            styles: {
              plot_0: {title: "Lower", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "Upper", histogramBase: 0, joinPoints: !1},
              plot_2: {title: "Basis", histogramBase: 0, joinPoints: !1},
            },
            description: "Donchian Channels",
            shortDescription: "DC",
            is_price_study: !0,
            filledAreas: [
              {
                id: "fill_0",
                objAId: "plot_1",
                objBId: "plot_0",
                type: "plot_plot",
                title: "Plots Background",
              },
            ],
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 20,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Donchian Channels@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Donchian Channels",
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = this._input(0),
                s = r.Std.low(this._context),
                n = this._context.new_var(s),
                o = r.Std.lowest(n, i, this._context),
                a = r.Std.high(this._context),
                l = this._context.new_var(a),
                c = r.Std.highest(l, i, this._context);
              return [o, c, r.Std.avg(c, o)];
            };
          },
        },
        {
          name: "Double Exponential Moving Average",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#43A047",
                },
              },
              inputs: {in_0: 9},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Double EMA",
            shortDescription: "DEMA",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 9,
                type: "integer",
                min: 1,
                max: 1e4,
              },
            ],
            id: "Double Exponential Moving Average@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Double Exponential Moving Average",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return 2 * e - t;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0);
                this._context.setMinimumAdditionalDepth(2 * i);
                var s = r.Std.close(this._context),
                  n = this._context.new_var(s),
                  o = r.Std.ema(n, i, this._context),
                  a = this._context.new_var(o),
                  l = r.Std.ema(a, i, this._context);
                return [this.f_0(o, l)];
              });
          },
        },
        {
          name: "Ease of Movement",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#43A047",
                },
              },
              inputs: {in_0: 1e4, in_1: 14},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Ease Of Movement",
            shortDescription: "EOM",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "Divisor",
                defval: 1e4,
                type: "integer",
                min: 1,
                max: 1e9,
              },
              {
                id: "in_1",
                name: "length",
                defval: 14,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Ease of Movement@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Ease of Movement",
            format: {type: "volume"},
          },
          constructor: function () {
            (this.f_0 = function (e, t, i, s, r) {
              return (e * t * (i - s)) / r;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = this._input(1),
                  n = r.Std.hl2(this._context),
                  o = this._context.new_var(n),
                  a = r.Std.change(o),
                  l = this.f_0(
                    i,
                    a,
                    r.Std.high(this._context),
                    r.Std.low(this._context),
                    r.Std.volume(this._context),
                  ),
                  c = this._context.new_var(l);
                return [r.Std.sma(c, s, this._context)];
              });
          },
        },
        {
          name: "Elders Force Index",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: a,
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 0,
                },
              ],
              inputs: {in_0: 13},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Elder's Force Index",
            shortDescription: "EFI",
            is_price_study: !1,
            bands: [{id: "hline_0", name: "Zero"}],
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 13,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Elders Force Index@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Elders Force Index",
            format: {type: "volume"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return e * t;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = r.Std.close(this._context),
                  n = this._context.new_var(s),
                  o = r.Std.change(n),
                  a = this.f_0(o, r.Std.volume(this._context)),
                  l = this._context.new_var(a);
                return [r.Std.ema(l, i, this._context)];
              });
          },
        },
        {
          name: "EMA Cross",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FF6D00",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#43A047",
                },
                plot_2: {
                  linestyle: 0,
                  linewidth: 4,
                  plottype: 3,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 9, in_1: 26},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
              {id: "plot_2", type: "line"},
            ],
            styles: {
              plot_0: {title: "Short", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "Long", histogramBase: 0, joinPoints: !1},
              plot_2: {title: "Crosses", histogramBase: 0, joinPoints: !1},
            },
            description: "EMA Cross",
            shortDescription: "EMA Cross",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "Short",
                defval: 9,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_1",
                name: "Long",
                defval: 26,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "EMA Cross@tv-basicstudies-1",
            scriptIdPart: "",
            name: "EMA Cross",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return e ? t : r.Std.na();
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = this._input(1),
                  n = r.Std.close(this._context),
                  o = this._context.new_var(n),
                  a = r.Std.ema(o, i, this._context),
                  l = this._context.new_var(n),
                  c = r.Std.ema(l, s, this._context),
                  h = a,
                  d = c,
                  u = r.Std.cross(a, c, this._context);
                return [h, d, this.f_0(u, a)];
              });
          },
        },
        {
          name: "Envelopes",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FF6D00",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_2: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              filledAreasStyle: {
                fill_0: {color: "#2196F3", transparency: 95, visible: !0},
              },
              inputs: {
                in_0: 20,
                in_1: 10,
                in_2: 10,
                in_3: "Simple",
                in_4: "close",
              },
            },
            plots: [
              {id: "plot_1", type: "line"},
              {id: "plot_0", type: "line"},
              {id: "plot_2", type: "line"},
            ],
            styles: {
              plot_0: {title: "Average", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "Upper", histogramBase: 0, joinPoints: !1},
              plot_2: {title: "Lower", histogramBase: 0, joinPoints: !1},
            },
            description: "Envelopes",
            shortDescription: "Envelopes",
            is_price_study: !0,
            filledAreas: [
              {
                id: "fill_0",
                objAId: "plot_1",
                objBId: "plot_2",
                type: "plot_plot",
                title: "Plots Background",
              },
            ],
            inputs: [
              {
                id: "in_0",
                name: "Length",
                defval: 20,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_1",
                name: "Upper Percentage",
                defval: 2,
                type: "float",
                min: 0,
              },
              {
                id: "in_2",
                name: "Lower Percentage",
                defval: 2,
                type: "float",
                min: 0,
              },
              {
                id: "in_3",
                name: "Method",
                type: "text",
                defval: "Simple",
                options: ["Simple", "Exponential", "Weighted"],
              },
              {
                id: "in_4",
                name: "Source",
                defval: "close",
                type: "source",
                options: [
                  "open",
                  "high",
                  "low",
                  "close",
                  "hl2",
                  "hlc3",
                  "ohlc4",
                ],
              },
            ],
            id: "Envelope@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Envelopes",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return e * (1 + t);
            }),
              (this.f_1 = function (e, t) {
                return e * (1 - t);
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._context.new_var(
                    r.Std[this._input(4)](this._context),
                  ),
                  s = r.Std.sma(i, this._input(0), this._context);
                return (
                  "Exponential" === this._input(3)
                    ? (s = r.Std.ema(i, this._input(0), this._context))
                    : "Weighted" === this._input(3) &&
                      (s = r.Std.wma(i, this._input(0), this._context)),
                  [
                    this.f_0(s, this._input(1) / 100),
                    s,
                    this.f_1(s, this._input(2) / 100),
                  ]
                );
              });
          },
        },
        {
          name: "Standard Error",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            is_price_study: !1,
            id: "Standard Error@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Standard Error",
            description: "Standard Error",
            shortDescription: "Standard Error",
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: "#FF6D00",
                },
              },
              inputs: {length: 14},
            },
            styles: {plot_0: {title: "Plot"}},
            inputs: [{id: "length", type: "integer", name: "Length", min: 3}],
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                (this._input = t),
                (this.period = this._input(0));
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                for (
                  var i,
                    s,
                    n = this._context.new_var(r.Std.close(this._context)),
                    o = 0,
                    a = 0,
                    l = 0;
                  l < this.period;
                  l++
                )
                  (o += l + 1), (a += n.get(l));
                (i = o / this.period), (s = a / this.period);
                var c = 0,
                  h = 0,
                  d = 0;
                for (l = 0; l < this.period; l++)
                  (d += Math.pow(s - n.get(l), 2)),
                    (h += (i - l - 1) * (s - n.get(l))),
                    (c += Math.pow(i - l - 1, 2));
                return (
                  (h = Math.pow(h, 2)),
                  [Math.sqrt((d - h / c) / (this.period - 2))]
                );
              });
          },
        },
        {
          name: "Standard Error Bands",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            is_price_study: !0,
            id: "Standard Error Bands@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Standard Error Bands",
            description: "Standard Error Bands",
            shortDescription: "Standard Error Bands",
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
              {id: "plot_2", type: "line"},
            ],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  transparency: 0,
                  trackPrice: !1,
                  color: "#2196F3",
                },
                plot_1: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  transparency: 0,
                  plottype: 0,
                  trackPrice: !1,
                  color: "#FF6D00",
                },
                plot_2: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  transparency: 0,
                  plottype: 0,
                  trackPrice: !1,
                  color: "#2196F3",
                },
              },
              filledAreasStyle: {
                fill_0: {color: "#2196F3", transparency: 95, visible: !0},
              },
              inputs: {
                periods: 21,
                errors: 2,
                method: "Simple",
                averagePeriods: 3,
              },
            },
            styles: {
              plot_0: {title: "Plot 1"},
              plot_1: {title: "Plot 2"},
              plot_2: {title: "Plot 3"},
            },
            filledAreas: [
              {
                id: "fill_0",
                objAId: "plot_0",
                objBId: "plot_2",
                type: "plot_plot",
                title: "Background",
              },
            ],
            inputs: [
              {id: "periods", type: "integer", name: "Periods"},
              {id: "errors", type: "float", name: "Standard Errors"},
              {
                id: "method",
                name: "Method",
                type: "text",
                defval: "Simple",
                options: ["Simple", "Exponential", "Weighted"],
              },
              {
                id: "averagePeriods",
                type: "integer",
                name: "Averaging Periods",
              },
            ],
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                (this._input = t),
                (this.period = this._input(0)),
                (this.errorDeviation = this._input(1)),
                (this.maMethod = this._input(2)),
                (this.averagePeriod = this._input(3));
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                for (
                  var i,
                    s,
                    n = this._context.new_var(r.Std.close(this._context)),
                    o = 0,
                    a = 0,
                    l = 0;
                  l < this.period;
                  l++
                )
                  (o += l + 1), (a += n.get(l));
                (i = o / this.period), (s = a / this.period);
                var c = 0,
                  h = 0,
                  d = 0;
                for (l = 0; l < this.period; l++)
                  (d += Math.pow(s - n.get(l), 2)),
                    (h += (i - l - 1) * (s - n.get(l))),
                    (c += Math.pow(i - l - 1, 2));
                h = Math.pow(h, 2);
                var u,
                  p,
                  _,
                  m = Math.sqrt((d - h / c) / (this.period - 2)),
                  g = r.Std.linreg(n, this.period, 0),
                  f = this._context.new_var(g + this.errorDeviation * m),
                  v = this._context.new_var(g),
                  S = this._context.new_var(g - this.errorDeviation * m);
                return (
                  "Simple" === this.maMethod
                    ? ((u = r.Std.sma(f, this.averagePeriod, this._context)),
                      (p = r.Std.sma(v, this.averagePeriod, this._context)),
                      (_ = r.Std.sma(S, this.averagePeriod, this._context)))
                    : "Exponential" === this.maMethod
                    ? ((u = r.Std.ema(f, this.averagePeriod, this._context)),
                      (p = r.Std.ema(v, this.averagePeriod, this._context)),
                      (_ = r.Std.ema(S, this.averagePeriod, this._context)))
                    : ((u = r.Std.wma(f, this.averagePeriod, this._context)),
                      (p = r.Std.wma(v, this.averagePeriod, this._context)),
                      (_ = r.Std.wma(S, this.averagePeriod, this._context))),
                  [u, p, _]
                );
              });
          },
        },
        {
          name: "Fisher Transform",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FF6D00",
                },
              },
              bands: [
                {
                  color: "#E91E63",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 1.5,
                },
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 0.75,
                },
                {
                  color: "#E91E63",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 0,
                },
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: -0.75,
                },
                {
                  color: "#E91E63",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: -1.5,
                },
              ],
              inputs: {in_0: 9},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
            ],
            styles: {
              plot_0: {
                title: "Fisher",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
              plot_1: {
                title: "Trigger",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
            },
            description: "Fisher Transform",
            shortDescription: "Fisher",
            is_price_study: !1,
            bands: [
              {id: "hline_0", name: "Level", isHidden: !1},
              {id: "hline_1", name: "Level", isHidden: !1},
              {id: "hline_2", name: "Level", isHidden: !1},
              {id: "hline_3", name: "Level", isHidden: !1},
              {id: "hline_4", name: "Level", isHidden: !1},
            ],
            inputs: [
              {
                id: "in_0",
                name: "Length",
                defval: 9,
                type: "integer",
                min: 1,
                max: 1e12,
              },
            ],
            id: "fisher_transform@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Fisher Transform",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e) {
              var t = r.Std.lt(e, -0.99) ? -0.999 : e;
              return [r.Std.gt(e, 0.99) ? 0.999 : t];
            }),
              (this.f_1 = function () {
                var e = this._input(0),
                  t = this._context.new_var(r.Std.hl2(this._context)),
                  i = r.Std.highest(t, e, this._context),
                  s = this._context.new_var(r.Std.hl2(this._context)),
                  n = r.Std.lowest(s, e, this._context),
                  o = this._context.new_var(),
                  a = this.f_0(
                    0.66 *
                      ((r.Std.hl2(this._context) - n) /
                        r.Std.max(i - n, 0.001) -
                        0.5) +
                      0.67 * r.Std.nz(o.get(1)),
                  );
                o.set(a[0]);
                var l = this._context.new_var();
                l.set(
                  0.5 *
                    r.Std.log((1 + o.get(0)) / r.Std.max(1 - o.get(0), 0.001)) +
                    0.5 * r.Std.nz(l.get(1)),
                );
                var c = l.get(1);
                return [l.get(0), c];
              }),
              (this.main = function (e, t) {
                return (this._context = e), (this._input = t), this.f_1();
              });
          },
        },
        {
          name: "Historical Volatility",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 10},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {
              plot_0: {
                title: "Plot",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
            },
            description: "Historical Volatility",
            shortDescription: "HV",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 10,
                type: "integer",
                min: 1,
                max: 1e12,
              },
            ],
            id: "historical_volatility@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Historical Volatility",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function () {
              var e = this._input(0),
                t = r.Std.or(
                  r.Std.isintraday(this._context),
                  r.Std.and(
                    r.Std.isdaily(this._context),
                    r.Std.eq(r.Std.interval(this._context), 1),
                  ),
                )
                  ? 1
                  : 7,
                i = this._context.new_var(r.Std.close(this._context)),
                s = this._context.new_var(
                  r.Std.log(r.Std.close(this._context) / i.get(1)),
                );
              return [
                100 * r.Std.stdev(s, e, this._context) * r.Std.sqrt(365 / t),
              ];
            }),
              (this.main = function (e, t) {
                return (this._context = e), (this._input = t), this.f_0();
              });
          },
        },
        {
          name: "Hull MA",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 9},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Hull Moving Average",
            shortDescription: "HMA",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 9,
                type: "integer",
                min: 1,
                max: 1e4,
              },
            ],
            id: "Hull MA@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Hull MA",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return 2 * e - t;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = r.Std.close(this._context),
                  s = this._input(0),
                  n = s / 2;
                this._context.setMinimumAdditionalDepth(Math.ceil(s + n));
                var o = this._context.new_var(i),
                  a = r.Std.wma(o, n, this._context),
                  l = this._context.new_var(i),
                  c = r.Std.wma(l, s, this._context),
                  h = this.f_0(a, c),
                  d = r.Std.sqrt(s),
                  u = r.Std.round(d),
                  p = this._context.new_var(h);
                return [r.Std.wma(p, u, this._context)];
              });
          },
        },
        {
          name: "Ichimoku Cloud",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: l,
                },
                plot_2: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#43A047",
                },
                plot_3: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#A5D6A7",
                },
                plot_4: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: o,
                },
              },
              palettes: {
                palette_0: {
                  colors: {
                    0: {color: "#43A047", width: 1, style: 0},
                    1: {color: a, width: 1, style: 0},
                  },
                },
              },
              filledAreasStyle: {
                fill_0: {color: "#000080", transparency: 90, visible: !0},
              },
              inputs: {in_0: 9, in_1: 26, in_2: 52, in_3: 26},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
              {id: "plot_2", type: "line"},
              {id: "plot_3", type: "line"},
              {id: "plot_4", type: "line"},
              {
                id: "plot_5",
                palette: "palette_0",
                target: "fill_0",
                type: "colorer",
              },
            ],
            styles: {
              plot_0: {
                title: "Conversion Line",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
              plot_1: {
                title: "Base Line",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
              plot_2: {
                title: "Lagging Span",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
              plot_3: {
                title: "Leading Span A",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
              plot_4: {
                title: "Leading Span B",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
            },
            description: "Ichimoku Cloud",
            shortDescription: "Ichimoku",
            is_price_study: !0,
            is_hidden_study: !1,
            id: "Ichimoku Cloud@tv-basicstudies-1",
            palettes: {
              palette_0: {
                colors: {0: {name: "Color 0"}, 1: {name: "Color 1"}},
                valToIndex: {0: 0, 1: 1},
              },
            },
            filledAreas: [
              {
                id: "fill_0",
                objAId: "plot_3",
                objBId: "plot_4",
                type: "plot_plot",
                title: "Plots Background",
                isHidden: !1,
                palette: "palette_0",
              },
            ],
            inputs: [
              {
                id: "in_0",
                name: "Conversion Line Periods",
                defval: 9,
                type: "integer",
                min: 1,
                max: 1e12,
              },
              {
                id: "in_1",
                name: "Base Line Periods",
                defval: 26,
                type: "integer",
                min: 1,
                max: 1e12,
              },
              {
                id: "in_2",
                name: "Leading Span B",
                defval: 52,
                type: "integer",
                min: 1,
                max: 1e12,
              },
              {
                id: "in_3",
                name: "Lagging Span",
                defval: 26,
                type: "integer",
                min: 1,
                max: 1e12,
              },
            ],
            scriptIdPart: "",
            name: "Ichimoku Cloud",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.donchian = function (e) {
              var t = this._context.new_var(r.Std.low(this._context)),
                i = this._context.new_var(r.Std.high(this._context));
              return r.Std.avg(
                r.Std.lowest(t, e, this._context),
                r.Std.highest(i, e, this._context),
              );
            }),
              (this.f_1 = function () {
                var e = this._input(0),
                  t = this._input(1),
                  i = this._input(2),
                  s = this._input(3),
                  n = this.donchian(e),
                  o = this.donchian(t),
                  a = r.Std.avg(n, o),
                  l = this.donchian(i);
                return [
                  n,
                  o,
                  r.Std.close(this._context),
                  a,
                  l,
                  1 - s,
                  s - 1,
                  s - 1,
                  r.Std.gt(a, l) ? 0 : 1,
                ];
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this.f_1();
                return [
                  i[0],
                  i[1],
                  {value: i[2], offset: i[5]},
                  {value: i[3], offset: i[6]},
                  {value: i[4], offset: i[7]},
                  i[8],
                ];
              });
          },
        },
        {
          name: "Keltner Channels",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_2: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              filledAreasStyle: {
                fill_0: {color: "#2196F3", transparency: 95, visible: !0},
              },
              inputs: {in_0: !0, in_1: 20, in_2: 1},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
              {id: "plot_2", type: "line"},
            ],
            styles: {
              plot_0: {title: "Upper", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "Middle", histogramBase: 0, joinPoints: !1},
              plot_2: {title: "Lower", histogramBase: 0, joinPoints: !1},
            },
            description: "Keltner Channels",
            shortDescription: "KC",
            is_price_study: !0,
            filledAreas: [
              {
                id: "fill_0",
                objAId: "plot_0",
                objBId: "plot_2",
                type: "plot_plot",
                title: "Plots Background",
              },
            ],
            inputs: [
              {id: "in_0", name: "useTrueRange", defval: !0, type: "bool"},
              {
                id: "in_1",
                name: "length",
                defval: 20,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_2",
                name: "mult",
                defval: 1,
                type: "float",
                min: -1e12,
                max: 1e12,
              },
            ],
            id: "Keltner Channels@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Keltner Channels",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function (e, t, i, s) {
              return e ? t : i - s;
            }),
              (this.f_1 = function (e, t, i) {
                return e + t * i;
              }),
              (this.f_2 = function (e, t, i) {
                return e - t * i;
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = r.Std.close(this._context),
                  s = this._input(0),
                  n = this._input(1),
                  o = this._input(2),
                  a = this._context.new_var(i),
                  l = r.Std.ema(a, n, this._context),
                  c = this.f_0(
                    s,
                    r.Std.tr(this._context),
                    r.Std.high(this._context),
                    r.Std.low(this._context),
                  ),
                  h = this._context.new_var(c),
                  d = r.Std.ema(h, n, this._context);
                return [this.f_1(l, d, o), l, this.f_2(l, d, o)];
              });
          },
        },
        {
          name: "Klinger Oscillator",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#43A047",
                },
              },
              inputs: {},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
            ],
            styles: {
              plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "Signal", histogramBase: 0, joinPoints: !1},
            },
            description: "Klinger Oscillator",
            shortDescription: "Klinger Oscillator",
            is_price_study: !1,
            inputs: [],
            id: "Klinger Oscillator@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Klinger Oscillator",
            format: {type: "volume"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return r.Std.ge(e, 0) ? t : -t;
            }),
              (this.f_1 = function (e, t) {
                return e - t;
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = r.Std.hlc3(this._context);
                this._context.setMinimumAdditionalDepth(66);
                var s = this._context.new_var(i),
                  n = r.Std.change(s),
                  o = this.f_0(n, r.Std.volume(this._context)),
                  a = this._context.new_var(o),
                  l = r.Std.ema(a, 34, this._context),
                  c = this._context.new_var(o),
                  h = r.Std.ema(c, 55, this._context),
                  d = this.f_1(l, h),
                  u = this._context.new_var(d);
                return [d, r.Std.ema(u, 13, this._context)];
              });
          },
        },
        {
          name: "Know Sure Thing",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: u,
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: a,
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 0,
                },
              ],
              inputs: {
                in_0: 10,
                in_1: 15,
                in_2: 20,
                in_3: 30,
                in_4: 10,
                in_5: 10,
                in_6: 10,
                in_7: 15,
                in_8: 9,
              },
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
            ],
            styles: {
              plot_0: {title: "KST", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "Signal", histogramBase: 0, joinPoints: !1},
            },
            description: "Know Sure Thing",
            shortDescription: "KST",
            is_price_study: !1,
            bands: [{id: "hline_0", name: "Zero"}],
            inputs: [
              {
                id: "in_0",
                name: "roclen1",
                defval: 10,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_1",
                name: "roclen2",
                defval: 15,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_2",
                name: "roclen3",
                defval: 20,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_3",
                name: "roclen4",
                defval: 30,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_4",
                name: "smalen1",
                defval: 10,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_5",
                name: "smalen2",
                defval: 10,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_6",
                name: "smalen3",
                defval: 10,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_7",
                name: "smalen4",
                defval: 15,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_8",
                name: "siglen",
                defval: 9,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Know Sure Thing@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Know Sure Thing",
            format: {type: "price", precision: 4},
          },
          constructor: function () {
            (this.f_0 = function (e, t, i, s) {
              return e + 2 * t + 3 * i + 4 * s;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = this._input(1),
                  n = this._input(2),
                  o = this._input(3),
                  a = this._input(4),
                  l = this._input(5),
                  c = this._input(6),
                  h = this._input(7),
                  d = this._input(8);
                this._context.setMinimumAdditionalDepth(
                  Math.max(a + i, l + s, c + n, h + o) + d,
                );
                var u = r.Std.close(this._context),
                  p = i,
                  _ = this._context.new_var(u),
                  m = r.Std.roc(_, p),
                  g = a,
                  f = this._context.new_var(m),
                  v = r.Std.sma(f, g, this._context),
                  S = s,
                  y = this._context.new_var(u),
                  b = r.Std.roc(y, S),
                  w = l,
                  P = this._context.new_var(b),
                  C = r.Std.sma(P, w, this._context),
                  T = n,
                  x = this._context.new_var(u),
                  I = r.Std.roc(x, T),
                  M = c,
                  L = this._context.new_var(I),
                  A = r.Std.sma(L, M, this._context),
                  k = o,
                  E = this._context.new_var(u),
                  D = r.Std.roc(E, k),
                  V = h,
                  B = this._context.new_var(D),
                  N = r.Std.sma(B, V, this._context),
                  R = this.f_0(v, C, A, N),
                  O = this._context.new_var(R);
                return [R, r.Std.sma(O, d, this._context)];
              });
          },
        },
        {
          name: "Least Squares Moving Average",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 25, in_1: 0},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Least Squares Moving Average",
            shortDescription: "LSMA",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "Length",
                defval: 25,
                type: "integer",
                min: 1,
                max: 1e12,
              },
              {
                id: "in_1",
                name: "Offset",
                defval: 0,
                type: "integer",
                min: -1e12,
                max: 1e12,
              },
            ],
            id: "Least Squares Moving Average@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Least Squares Moving Average",
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = this._input(0),
                s = this._input(1),
                n = r.Std.close(this._context),
                o = this._context.new_var(n);
              return [r.Std.linreg(o, i, s)];
            };
          },
        },
        {
          name: "Linear Regression Curve",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 9},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Linear Regression Curve",
            shortDescription: "LRC",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "Length",
                defval: 9,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Linear Regression Curve@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Linear Regression Curve",
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = r.Std.close(this._context),
                s = this._input(0),
                n = this._context.new_var(i);
              return [r.Std.linreg(n, s, 0)];
            };
          },
        },
        {
          name: "Linear Regression Slope",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            is_price_study: !1,
            id: "Linear Regression Slope@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Linear Regression Slope",
            description: "Linear Regression Slope",
            shortDescription: "Linear Regression Slope",
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: c,
                },
              },
              inputs: {periods: 14},
            },
            styles: {plot_0: {title: "Plot"}},
            inputs: [{id: "periods", type: "integer", name: "Periods", min: 2}],
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                (this._input = t),
                (this.period = this._input(0));
            }),
              (this.linregSlope = function (e, t, i) {
                var s,
                  r,
                  n,
                  o = 0,
                  a = 0,
                  l = 0,
                  c = 0;
                for (s = 0; s < t; ++s)
                  (o += n = t - 1 - s + 1),
                    (a += r = e.get(s)),
                    (l += n * n),
                    (c += r * n);
                return (t * c - o * a) / (t * l - o * o);
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._context.new_var(r.Std.close(this._context));
                return [this.linregSlope(i, this.period, 0)];
              });
          },
        },
        {
          name: "MA Cross",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#43A047",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FF6D00",
                },
                plot_2: {
                  linestyle: 0,
                  linewidth: 4,
                  plottype: 3,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 9, in_1: 26},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
              {id: "plot_2", type: "line"},
            ],
            styles: {
              plot_0: {title: "Short", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "Long", histogramBase: 0, joinPoints: !1},
              plot_2: {title: "Crosses", histogramBase: 0, joinPoints: !1},
            },
            description: "MA Cross",
            shortDescription: "MA Cross",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "Short",
                defval: 9,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_1",
                name: "Long",
                defval: 26,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "MA Cross@tv-basicstudies-1",
            scriptIdPart: "",
            name: "MA Cross",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return e ? t : r.Std.na();
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = this._input(1),
                  n = r.Std.close(this._context),
                  o = this._context.new_var(n),
                  a = r.Std.sma(o, i, this._context),
                  l = this._context.new_var(n),
                  c = r.Std.sma(l, s, this._context),
                  h = a,
                  d = c,
                  u = r.Std.cross(a, c, this._context);
                return [h, d, this.f_0(u, a)];
              });
          },
        },
        {
          name: "MA with EMA Cross",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FF6D00",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#43A047",
                },
                plot_2: {
                  linestyle: 0,
                  linewidth: 4,
                  plottype: 3,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 10, in_1: 10},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
              {id: "plot_2", type: "line"},
            ],
            styles: {
              plot_0: {title: "MA", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "EMA", histogramBase: 0, joinPoints: !1},
              plot_2: {title: "Crosses", histogramBase: 0, joinPoints: !1},
            },
            description: "MA with EMA Cross",
            shortDescription: "MA/EMA Cross",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "Length MA",
                defval: 10,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_1",
                name: "Length EMA",
                defval: 10,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "MA with EMA Cross@tv-basicstudies-1",
            scriptIdPart: "",
            name: "MA with EMA Cross",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return e ? t : r.Std.na();
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = this._input(1),
                  n = r.Std.close(this._context),
                  o = this._context.new_var(n),
                  a = r.Std.sma(o, i, this._context),
                  l = this._context.new_var(n),
                  c = r.Std.ema(l, s, this._context),
                  h = a,
                  d = c,
                  u = r.Std.cross(a, c, this._context);
                return [h, d, this.f_0(u, a)];
              });
          },
        },
        {
          name: "Mass Index",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 10},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Mass Index",
            shortDescription: "Mass Index",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 10,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Mass Index@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Mass Index",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return e - t;
            }),
              (this.f_1 = function (e, t) {
                return e / t;
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = this.f_0(
                    r.Std.high(this._context),
                    r.Std.low(this._context),
                  ),
                  n = this._context.new_var(s),
                  o = r.Std.ema(n, 9, this._context),
                  a = this._context.new_var(o),
                  l = r.Std.ema(a, 9, this._context),
                  c = this.f_1(o, l),
                  h = this._context.new_var(c);
                return [r.Std.sum(h, i, this._context)];
              });
          },
        },
        {
          name: "McGinley Dynamic",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 14},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {
              plot_0: {
                title: "Plot",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
            },
            description: "McGinley Dynamic",
            shortDescription: "McGinley Dynamic",
            is_price_study: !0,
            is_hidden_study: !1,
            id: "mcginley_dynamic@tv-basicstudies-1",
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 14,
                type: "integer",
                min: 1,
                max: 1e12,
              },
            ],
            scriptIdPart: "",
            name: "McGinley Dynamic",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function () {
              var e = this._input(0),
                t = r.Std.close(this._context),
                i = this._context.new_var(t),
                s = r.Std.ema(i, e, this._context),
                n = this._context.new_var(),
                o =
                  n.get(1) + (t - n.get(1)) / (e * r.Std.pow(t / n.get(1), 4));
              return n.set(r.Std.na(n.get(1)) ? s : o), [n.get(0)];
            }),
              (this.main = function (e, t) {
                return (this._context = e), (this._input = t), this.f_0();
              });
          },
        },
        {
          name: "Median Price",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            id: "Median Price@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Median Price",
            description: "Median Price",
            shortDescription: "Median Price",
            is_price_study: !0,
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: "#FF6D00",
                },
              },
              inputs: {},
            },
            styles: {plot_0: {title: "Plot"}},
            inputs: [],
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              return (
                (this._context = e),
                (this._input = t),
                [r.Std.hl2(this._context)]
              );
            };
          },
        },
        {
          name: "Momentum",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 10, in_1: "close"},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {
              plot_0: {
                title: "Mom",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
            },
            description: "Momentum",
            shortDescription: "Mom",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "Length",
                defval: 10,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_1",
                name: "Source",
                defval: "close",
                type: "source",
                options: [
                  "open",
                  "high",
                  "low",
                  "close",
                  "hl2",
                  "hlc3",
                  "ohlc4",
                ],
              },
            ],
            id: "Momentum@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Momentum",
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = this._input(0),
                s = r.Std[this._input(1)](this._context),
                n = this._context.new_var(s).get(i);
              return [n ? s - n : null];
            };
          },
        },
        {
          name: "Money Flow Index",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#7E57C2",
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 80,
                },
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 20,
                },
              ],
              filledAreasStyle: {
                fill_0: {color: "#7E57C2", transparency: 90, visible: !0},
              },
              inputs: {in_0: 14},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Money Flow Index",
            shortDescription: "MFI",
            is_price_study: !1,
            bands: [
              {id: "hline_0", name: "UpperLimit"},
              {id: "hline_1", name: "LowerLimit"},
            ],
            filledAreas: [
              {
                id: "fill_0",
                objAId: "hline_0",
                objBId: "hline_1",
                type: "hline_hline",
                title: "Hlines Background",
              },
            ],
            inputs: [
              {
                id: "in_0",
                name: "Length",
                defval: 14,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Money Flow@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Money Flow Index",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e, t, i) {
              return e * (r.Std.le(t, 0) ? 0 : i);
            }),
              (this.f_1 = function (e, t, i) {
                return e * (r.Std.ge(t, 0) ? 0 : i);
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = r.Std.hlc3(this._context),
                  n = this._context.new_var(s),
                  o = r.Std.change(n),
                  a = this.f_0(r.Std.volume(this._context), o, s),
                  l = this._context.new_var(a),
                  c = r.Std.sum(l, i, this._context),
                  h = this.f_1(r.Std.volume(this._context), o, s),
                  d = this._context.new_var(h),
                  u = r.Std.sum(d, i, this._context);
                return [r.Std.rsi(c, u)];
              });
          },
        },
        {
          name: "Moving Average",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                smoothedMA: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !1,
                },
              },
              inputs: {
                symbol: "",
                length: 9,
                source: "close",
                offset: 0,
                smoothingLine: "SMA",
                smoothingLength: 9,
              },
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "smoothedMA", type: "line"},
            ],
            styles: {
              plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1},
              smoothedMA: {
                title: "Smoothed MA",
                histogramBase: 0,
                joinPoints: !1,
              },
            },
            description: "Moving Average",
            shortDescription: "MA",
            is_price_study: !0,
            inputs: [
              {
                id: "symbol",
                name: "Other Symbol",
                defval: "",
                type: "symbol",
                optional: !0,
                isHidden: !1,
              },
              {
                id: "length",
                name: "Length",
                defval: 9,
                type: "integer",
                min: 1,
                max: 1e4,
              },
              {
                id: "source",
                name: "Source",
                defval: "close",
                type: "source",
                options: [
                  "open",
                  "high",
                  "low",
                  "close",
                  "hl2",
                  "hlc3",
                  "ohlc4",
                ],
              },
              {
                id: "offset",
                name: "Offset",
                defval: 0,
                type: "integer",
                min: -1e4,
                max: 1e4,
              },
              {
                id: "smoothingLine",
                name: "Smoothing Line",
                defval: "SMA",
                type: "text",
                options: ["SMA", "EMA", "WMA"],
              },
              {
                id: "smoothingLength",
                name: "Smoothing Length",
                defval: 9,
                type: "integer",
                min: 1,
                max: 1e4,
              },
            ],
            id: "Moving Average@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Moving Average",
            format: {type: "inherit"},
            targetCurrency: {
              type: "symbolInputTargetCurrency",
              inputId: "symbol",
            },
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                "" !== t(0) &&
                  this._context.new_sym(t(0), r.Std.period(this._context));
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._context.new_var(this._context.symbol.time),
                  s = r.Std[this._input(2)](this._context),
                  n = this._input(1),
                  o = this._input(3),
                  a = this._input(4),
                  l = this._input(5);
                if (
                  (this._context.setMinimumAdditionalDepth(n + l),
                  "" !== this._input(0))
                ) {
                  this._context.select_sym(1);
                  var c = this._context.new_var(this._context.symbol.time),
                    h = r.Std[this._input(2)](this._context);
                  (s = this._context.new_var(h).adopt(c, i, 1)),
                    this._context.select_sym(0);
                }
                var d,
                  u = this._context.new_var(s),
                  p = r.Std.sma(u, n, this._context),
                  _ = this._context.new_var(p);
                return (
                  "EMA" === a
                    ? (d = r.Std.ema(_, l, this._context))
                    : "WMA" === a
                    ? (d = r.Std.wma(_, l, this._context))
                    : "SMA" === a && (d = r.Std.sma(_, l, this._context)),
                  [
                    {value: p, offset: o},
                    {value: d, offset: o},
                  ]
                );
              });
          },
        },
        {
          name: "Moving Average Channel",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FF6D00",
                },
              },
              filledAreasStyle: {
                fill_0: {color: "#2196F3", transparency: 90, visible: !0},
              },
              inputs: {in_0: 20, in_1: 20, in_2: 0, in_3: 0},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
            ],
            styles: {
              plot_0: {title: "Upper", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "Lower", histogramBase: 0, joinPoints: !1},
            },
            filledAreas: [
              {
                id: "fill_0",
                objAId: "plot_0",
                objBId: "plot_1",
                type: "plot_plot",
                title: "Plots Background",
              },
            ],
            description: "Moving Average Channel",
            shortDescription: "MAC",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "Upper Length",
                defval: 20,
                type: "integer",
                min: 1,
                max: 1e4,
              },
              {
                id: "in_1",
                name: "Lower Length",
                defval: 20,
                type: "integer",
                min: 1,
                max: 1e4,
              },
              {
                id: "in_2",
                name: "Upper Offset",
                defval: 0,
                type: "integer",
                min: -1e4,
                max: 1e4,
              },
              {
                id: "in_3",
                name: "Lower Offset",
                defval: 0,
                type: "integer",
                min: -1e4,
                max: 1e4,
              },
            ],
            id: "Moving Average Channel@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Moving Average Channel",
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = r.Std.high(this._context),
                s = r.Std.low(this._context),
                n = this._input(0),
                o = this._input(1),
                a = this._input(2),
                l = this._input(3),
                c = this._context.new_var(i),
                h = this._context.new_var(s);
              return [
                {value: r.Std.sma(c, n, this._context), offset: a},
                {value: r.Std.sma(h, o, this._context), offset: l},
              ];
            };
          },
        },
        {
          name: "Moving Average Convergence/Divergence",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 5,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: c,
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_2: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FF6D00",
                },
              },
              palettes: {
                palette_0: {
                  colors: {
                    0: {color: d, width: 1, style: 0},
                    1: {color: h, width: 1, style: 0},
                    2: {color: n, width: 1, style: 0},
                    3: {color: "#FF5252", width: 1, style: 0},
                  },
                },
              },
              inputs: {in_0: 12, in_1: 26, in_3: "close", in_2: 9},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
              {id: "plot_2", type: "line"},
              {
                id: "plot_3",
                palette: "palette_0",
                target: "plot_0",
                type: "colorer",
              },
            ],
            styles: {
              plot_0: {title: "Histogram", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "MACD", histogramBase: 0, joinPoints: !1},
              plot_2: {title: "Signal", histogramBase: 0, joinPoints: !1},
            },
            description: "MACD",
            shortDescription: "MACD",
            is_price_study: !1,
            palettes: {
              palette_0: {
                colors: {
                  0: {name: "Color 0"},
                  1: {name: "Color 1"},
                  2: {name: "Color 2"},
                  3: {name: "Color 3"},
                },
              },
            },
            inputs: [
              {
                id: "in_0",
                name: "fastLength",
                defval: 12,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_1",
                name: "slowLength",
                defval: 26,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_3",
                name: "Source",
                defval: "close",
                type: "source",
                options: [
                  "open",
                  "high",
                  "low",
                  "close",
                  "hl2",
                  "hlc3",
                  "ohlc4",
                ],
              },
              {
                id: "in_2",
                name: "signalLength",
                defval: 9,
                type: "integer",
                min: 1,
                max: 50,
              },
            ],
            id: "Moving Average Convergence/Divergence@tv-basicstudies-1",
            scriptIdPart: "",
            name: "MACD",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return e - t;
            }),
              (this.f_1 = function (e) {
                var t = e > 0 ? 1 : 3,
                  i = r.Std.change(this._context.new_var(e));
                return t - (r.Std.le(i, 0) ? 0 : 1);
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = r.Std[this._input(2)](this._context),
                  s = this._input(0),
                  n = this._input(1),
                  o = this._input(3);
                this._context.setMinimumAdditionalDepth(Math.max(s, n) + o);
                var a = this._context.new_var(i),
                  l = r.Std.ema(a, s, this._context),
                  c = this._context.new_var(i),
                  h = r.Std.ema(c, n, this._context),
                  d = this.f_0(l, h),
                  u = this._context.new_var(d),
                  p = r.Std.ema(u, o, this._context),
                  _ = this.f_0(d, p);
                return [_, d, p, this.f_1(_)];
              });
          },
        },
        {
          name: "Moving Average Exponential",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                smoothedMA: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !1,
                },
              },
              inputs: {
                length: 9,
                source: "close",
                offset: 0,
                smoothingLine: "SMA",
                smoothingLength: 9,
              },
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "smoothedMA", type: "line"},
            ],
            styles: {
              plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1},
              smoothedMA: {
                title: "Smoothed MA",
                histogramBase: 0,
                joinPoints: !1,
              },
            },
            description: "Moving Average Exponential",
            shortDescription: "EMA",
            is_price_study: !0,
            inputs: [
              {
                id: "length",
                name: "Length",
                defval: 9,
                type: "integer",
                min: 1,
                max: 1e4,
              },
              {
                id: "source",
                name: "Source",
                defval: "close",
                type: "source",
                options: [
                  "open",
                  "high",
                  "low",
                  "close",
                  "hl2",
                  "hlc3",
                  "ohlc4",
                ],
              },
              {
                id: "offset",
                name: "Offset",
                defval: 0,
                type: "integer",
                min: -1e4,
                max: 1e4,
              },
              {
                id: "smoothingLine",
                name: "Smoothing Line",
                defval: "SMA",
                type: "text",
                options: ["SMA", "EMA", "WMA"],
              },
              {
                id: "smoothingLength",
                name: "Smoothing Length",
                defval: 9,
                type: "integer",
                min: 1,
                max: 1e4,
              },
            ],
            id: "Moving Average Exponential@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Moving Average Exponential",
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = r.Std[this._input(1)](this._context),
                s = this._input(0),
                n = this._input(2),
                o = this._input(3),
                a = this._input(4);
              this._context.setMinimumAdditionalDepth(s + a);
              var l,
                c = this._context.new_var(i),
                h = r.Std.ema(c, s, this._context),
                d = this._context.new_var(h);
              return (
                "EMA" === o
                  ? (l = r.Std.ema(d, a, this._context))
                  : "WMA" === o
                  ? (l = r.Std.wma(d, a, this._context))
                  : "SMA" === o && (l = r.Std.sma(d, a, this._context)),
                [
                  {value: h, offset: n},
                  {value: l, offset: n},
                ]
              );
            };
          },
        },
        {
          name: "Moving Average Weighted",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 9, in_1: "close", in_2: 0},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Moving Average Weighted",
            shortDescription: "WMA",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "Length",
                defval: 9,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_1",
                name: "Source",
                defval: "close",
                type: "source",
                options: [
                  "open",
                  "high",
                  "low",
                  "close",
                  "hl2",
                  "hlc3",
                  "ohlc4",
                ],
              },
              {
                id: "in_2",
                name: "Offset",
                defval: 0,
                type: "integer",
                min: -1e4,
                max: 1e4,
              },
            ],
            id: "Moving Average Weighted@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Moving Average Weighted",
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = r.Std[this._input(1)](this._context),
                s = this._input(0),
                n = this._input(2),
                o = this._context.new_var(i);
              return [{value: r.Std.wma(o, s, this._context), offset: n}];
            };
          },
        },
        {
          name: "Moving Average Double",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            id: "Moving Average Double@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Moving Average Double",
            description: "Moving Average Double",
            shortDescription: "Moving Average Double",
            is_price_study: !0,
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
            ],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: "#FF6D00",
                },
                plot_1: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: "#2196F3",
                },
              },
              inputs: {firstPeriods: 14, secondPeriods: 21, method: "Simple"},
            },
            styles: {plot_0: {title: "Plot 1"}, plot_1: {title: "Plot 2"}},
            inputs: [
              {
                id: "firstPeriods",
                name: "1st Period",
                type: "integer",
                defval: 14,
                min: 1,
                max: 1e4,
              },
              {
                id: "secondPeriods",
                name: "2nd Period",
                type: "integer",
                defval: 21,
                min: 1,
                max: 1e4,
              },
              {
                id: "method",
                name: "Method",
                type: "text",
                defval: "Simple",
                options: ["Simple", "Exponential", "Weighted"],
              },
            ],
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i,
                s,
                n = this._context.new_var(r.Std.close(this._context));
              return (
                "Exponential" === this._input(2)
                  ? ((i = r.Std.ema(n, this._input(0), this._context)),
                    (s = r.Std.ema(n, this._input(1), this._context)))
                  : "Weighted" === this._input(2)
                  ? ((i = r.Std.wma(n, this._input(0), this._context)),
                    (s = r.Std.wma(n, this._input(1), this._context)))
                  : ((i = r.Std.sma(n, this._input(0), this._context)),
                    (s = r.Std.sma(n, this._input(1), this._context))),
                [i, s]
              );
            };
          },
        },
        {
          name: "Moving Average Triple",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            is_price_study: !0,
            id: "Moving Average Triple@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Moving Average Triple",
            description: "Moving Average Triple",
            shortDescription: "Moving Average Triple",
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
              {id: "plot_2", type: "line"},
            ],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  transparency: 0,
                  trackPrice: !1,
                  color: "#FF6D00",
                },
                plot_1: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  transparency: 0,
                  plottype: 0,
                  trackPrice: !1,
                  color: "#2196F3",
                },
                plot_2: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  transparency: 0,
                  plottype: 0,
                  trackPrice: !1,
                  color: "#26C6DA",
                },
              },
              inputs: {
                firstPeriods: 14,
                secondPeriods: 21,
                thirdPeriods: 35,
                method: "Simple",
              },
            },
            styles: {
              plot_0: {title: "Plot 1"},
              plot_1: {title: "Plot 2"},
              plot_2: {title: "Plot 3"},
            },
            inputs: [
              {
                id: "firstPeriods",
                name: "1st Period",
                type: "integer",
                defval: 14,
                min: 1,
                max: 1e4,
              },
              {
                id: "secondPeriods",
                name: "2nd Period",
                type: "integer",
                defval: 21,
                min: 1,
                max: 1e4,
              },
              {
                id: "thirdPeriods",
                name: "3rd Period",
                type: "integer",
                defval: 35,
                min: 1,
                max: 1e4,
              },
              {
                id: "method",
                name: "Method",
                type: "text",
                defval: "Simple",
                options: ["Simple", "Exponential", "Weighted"],
              },
            ],
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i,
                s,
                n,
                o = this._context.new_var(r.Std.close(this._context));
              return (
                "Exponential" === this._input(3)
                  ? ((i = r.Std.ema(o, this._input(0), this._context)),
                    (s = r.Std.ema(o, this._input(1), this._context)),
                    (n = r.Std.ema(o, this._input(2), this._context)))
                  : "Weighted" === this._input(3)
                  ? ((i = r.Std.wma(o, this._input(0), this._context)),
                    (s = r.Std.wma(o, this._input(1), this._context)),
                    (n = r.Std.wma(o, this._input(2), this._context)))
                  : ((i = r.Std.sma(o, this._input(0), this._context)),
                    (s = r.Std.sma(o, this._input(1), this._context)),
                    (n = r.Std.sma(o, this._input(2), this._context))),
                [i, s, n]
              );
            };
          },
        },
        {
          name: "Moving Average Adaptive",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            is_price_study: !0,
            id: "Moving Average Adaptive@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Moving Average Adaptive",
            description: "Moving Average Adaptive",
            shortDescription: "Moving Average Adaptive",
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  transparency: 0,
                  trackPrice: !1,
                  color: "#AB47BC",
                },
              },
              inputs: {periods: 10},
            },
            styles: {plot_0: {title: "Plot 1"}},
            inputs: [
              {
                id: "periods",
                name: "Period",
                type: "integer",
                defval: 10,
                min: 2,
                max: 1e4,
              },
            ],
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                (this._input = t),
                (this.periods = this._input(0));
            }),
              (this.ama = function (e, t) {
                var i = this.periods,
                  s = this._context.new_var(),
                  n = e.get(),
                  o = r.Std.stdev(t, i, this._context),
                  a = r.Std.log(n / e.get(i)) / (o * Math.sqrt(i)),
                  l = 0.1 * Math.abs(a),
                  c = (n - s.get(1)) * l + s.get(1);
                return s.set(isNaN(c) ? n : c), c;
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._context.new_var(r.Std.close(this._context)),
                  s = this._context.new_var(r.Std.log(i.get() / i.get(1)));
                return [this.ama(i, s)];
              });
          },
        },
        {
          name: "Moving Average Hamming",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            is_price_study: !0,
            id: "Moving Average Hamming@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Moving Average Hamming",
            description: "Moving Average Hamming",
            shortDescription: "Moving Average Hamming",
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  transparency: 0,
                  trackPrice: !1,
                  color: "#4CAF50",
                },
              },
              inputs: {periods: 10},
            },
            styles: {plot_0: {title: "Plot 1"}},
            inputs: [
              {
                id: "periods",
                name: "Period",
                type: "integer",
                defval: 10,
                min: 1,
                max: 1e4,
              },
            ],
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                (this._input = t),
                (this.periods = this._input(0));
              for (var i = [], s = 0, r = 1; r <= this.periods; ++r) {
                var n = Math.sin((((1 + r) / this.periods) * Math.PI) / 2);
                i.unshift(n), (s += n);
              }
              (this.hmaFactors = i), (this.hmaFactorsSum = s);
            }),
              (this.hma = function (e) {
                for (var t = this.periods, i = 0, s = 0; s < t; ++s)
                  i += e.get(t - s - 1) * this.hmaFactors[s];
                return (i /= this.hmaFactorsSum);
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._context.new_var(r.Std.close(this._context));
                return [this.hma(i)];
              });
          },
        },
        {
          name: "Moving Average Multiple",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            is_price_study: !0,
            id: "Moving Average Multiple@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Moving Average Multiple",
            description: "Moving Average Multiple",
            shortDescription: "Moving Average Multiple",
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
              {id: "plot_2", type: "line"},
              {id: "plot_3", type: "line"},
              {id: "plot_4", type: "line"},
              {id: "plot_5", type: "line"},
            ],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  transparency: 0,
                  trackPrice: !1,
                  color: "#9C27B0",
                },
                plot_1: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  transparency: 0,
                  plottype: 0,
                  trackPrice: !1,
                  color: "#FF6D00",
                },
                plot_2: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  transparency: 0,
                  plottype: 0,
                  trackPrice: !1,
                  color: "#43A047",
                },
                plot_3: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  transparency: 0,
                  plottype: 0,
                  trackPrice: !1,
                  color: "#26C6DA",
                },
                plot_4: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  transparency: 0,
                  plottype: 0,
                  trackPrice: !1,
                  color: "#F50057",
                },
                plot_5: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  transparency: 0,
                  plottype: 0,
                  trackPrice: !1,
                  color: "#2196F3",
                },
              },
              inputs: {
                firstPeriods: 14,
                secondPeriods: 21,
                thirdPeriods: 35,
                fourthPeriods: 50,
                fifthPeriods: 100,
                sixthPeriods: 200,
                method: "Simple",
              },
            },
            styles: {
              plot_0: {title: "Plot 1"},
              plot_1: {title: "Plot 2"},
              plot_2: {title: "Plot 3"},
              plot_3: {title: "Plot 4"},
              plot_4: {title: "Plot 5"},
              plot_5: {title: "Plot 6"},
            },
            inputs: [
              {
                id: "firstPeriods",
                name: "1st Period",
                type: "integer",
                defval: 14,
                min: 1,
                max: 1e4,
              },
              {
                id: "secondPeriods",
                name: "2nd Period",
                type: "integer",
                defval: 21,
                min: 1,
                max: 1e4,
              },
              {
                id: "thirdPeriods",
                name: "3rd Period",
                type: "integer",
                defval: 35,
                min: 1,
                max: 1e4,
              },
              {
                id: "fourthPeriods",
                name: "4th Period",
                type: "integer",
                defval: 50,
                min: 1,
                max: 1e4,
              },
              {
                id: "fifthPeriods",
                name: "5th Period",
                type: "integer",
                defval: 100,
                min: 1,
                max: 1e4,
              },
              {
                id: "sixthPeriods",
                name: "6th Period",
                type: "integer",
                defval: 200,
                min: 1,
                max: 1e4,
              },
              {
                id: "method",
                name: "Method",
                type: "text",
                defval: "Simple",
                options: ["Simple", "Exponential", "Weighted"],
              },
            ],
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i,
                s,
                n,
                o,
                a,
                l,
                c = this._context.new_var(r.Std.close(this._context));
              return (
                "Exponential" === this._input(6)
                  ? ((i = r.Std.ema(c, this._input(0), this._context)),
                    (s = r.Std.ema(c, this._input(1), this._context)),
                    (n = r.Std.ema(c, this._input(2), this._context)),
                    (o = r.Std.ema(c, this._input(3), this._context)),
                    (a = r.Std.ema(c, this._input(4), this._context)),
                    (l = r.Std.ema(c, this._input(5), this._context)))
                  : "Weighted" === this._input(6)
                  ? ((i = r.Std.wma(c, this._input(0), this._context)),
                    (s = r.Std.wma(c, this._input(1), this._context)),
                    (n = r.Std.wma(c, this._input(2), this._context)),
                    (o = r.Std.wma(c, this._input(3), this._context)),
                    (a = r.Std.wma(c, this._input(4), this._context)),
                    (l = r.Std.wma(c, this._input(5), this._context)))
                  : ((i = r.Std.sma(c, this._input(0), this._context)),
                    (s = r.Std.sma(c, this._input(1), this._context)),
                    (n = r.Std.sma(c, this._input(2), this._context)),
                    (o = r.Std.sma(c, this._input(3), this._context)),
                    (a = r.Std.sma(c, this._input(4), this._context)),
                    (l = r.Std.sma(c, this._input(5), this._context))),
                [i, s, n, o, a, l]
              );
            };
          },
        },
        {
          name: "Majority Rule",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            is_price_study: !1,
            id: "Majority Rule@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Majority Rule",
            description: "Majority Rule",
            shortDescription: "Majority Rule",
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: c,
                },
              },
              inputs: {rollingPeriod: 14},
            },
            styles: {plot_0: {title: "Majority Rule"}},
            inputs: [
              {
                id: "rollingPeriod",
                type: "integer",
                name: "Rolling Period",
                min: 1,
              },
            ],
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                (this._input = t),
                (this.rollingPeriod = this._input(0));
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i,
                  s = r.Std.close(this._context);
                return (
                  (i = s > this._context.new_var(s).get(1) ? 1 : 0),
                  [
                    100 *
                      r.Std.sma(
                        this._context.new_var(i),
                        this.rollingPeriod,
                        this._context,
                      ),
                  ]
                );
              });
          },
        },
        {
          name: "Net Volume",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Net Volume",
            shortDescription: "Net Volume",
            is_price_study: !1,
            inputs: [],
            id: "Net Volume@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Net Volume",
            format: {type: "volume"},
          },
          constructor: function () {
            (this.f_0 = function (e, t, i) {
              return r.Std.gt(e, 0) ? t : r.Std.lt(i, 0) ? -t : 0 * t;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = r.Std.close(this._context),
                  s = this._context.new_var(i),
                  n = r.Std.change(s);
                return [this.f_0(n, r.Std.volume(this._context), n)];
              });
          },
        },
        {
          name: "On Balance Volume",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                smoothedMA: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !1,
                },
              },
              inputs: {smoothingLine: "SMA", smoothingLength: 9},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "smoothedMA", type: "line"},
            ],
            styles: {
              plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1},
              smoothedMA: {
                title: "Smoothed MA",
                histogramBase: 0,
                joinPoints: !1,
              },
            },
            description: "On Balance Volume",
            shortDescription: "OBV",
            is_price_study: !1,
            inputs: [
              {
                id: "smoothingLine",
                name: "Smoothing Line",
                defval: "SMA",
                type: "text",
                options: ["SMA", "EMA", "WMA"],
              },
              {
                id: "smoothingLength",
                name: "Smoothing Length",
                defval: 9,
                type: "integer",
                min: 1,
                max: 1e4,
              },
            ],
            id: "On Balance Volume@tv-basicstudies-1",
            scriptIdPart: "",
            name: "On Balance Volume",
            format: {type: "volume"},
          },
          constructor: function () {
            (this.f_0 = function (e, t, i) {
              return r.Std.gt(e, 0) ? t : r.Std.lt(i, 0) ? -t : 0 * t;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = this._input(1),
                  n = r.Std.close(this._context),
                  o = this._context.new_var(n),
                  a = r.Std.change(o),
                  l = this.f_0(a, r.Std.volume(this._context), a),
                  c = r.Std.cum(l, this._context);
                this._context.setMinimumAdditionalDepth(s);
                var h,
                  d = this._context.new_var(c);
                return (
                  "EMA" === i
                    ? (h = r.Std.ema(d, s, this._context))
                    : "WMA" === i
                    ? (h = r.Std.wma(d, s, this._context))
                    : "SMA" === i && (h = r.Std.sma(d, s, this._context)),
                  [c, h]
                );
              });
          },
        },
        {
          name: "Parabolic SAR",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 3,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 0.02, in_1: 0.02, in_2: 0.2},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Parabolic SAR",
            shortDescription: "SAR",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "start",
                defval: 0.02,
                type: "float",
                min: -1e12,
                max: 1e12,
              },
              {
                id: "in_1",
                name: "increment",
                defval: 0.02,
                type: "float",
                min: -1e12,
                max: 1e12,
              },
              {
                id: "in_2",
                name: "maximum",
                defval: 0.2,
                type: "float",
                min: -1e12,
                max: 1e12,
              },
            ],
            id: "Parabolic SAR@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Parabolic SAR",
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = this._input(0),
                s = this._input(1),
                n = this._input(2);
              return [r.Std.sar(i, s, n, this._context)];
            };
          },
        },
        {
          name: "Price Channel",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#F50057",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#F50057",
                },
                plot_2: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 20, in_1: 0},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
              {id: "plot_2", type: "line"},
            ],
            styles: {
              plot_0: {
                title: "Highprice Line",
                histogramBase: 0,
                joinPoints: !1,
              },
              plot_1: {
                title: "Lowprice Line",
                histogramBase: 0,
                joinPoints: !1,
              },
              plot_2: {
                title: "Centerprice Line",
                histogramBase: 0,
                joinPoints: !1,
              },
            },
            description: "Price Channel",
            shortDescription: "PC",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "Length",
                defval: 20,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_1",
                name: "Offset Length",
                defval: 0,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Price Channel@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Price Channel",
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = r.Std.high(this._context),
                s = this._context.new_var(i),
                n = r.Std.low(this._context),
                o = this._context.new_var(n),
                a = this._input(0),
                l = this._input(1),
                c = r.Std.highest(s, a, this._context),
                h = r.Std.lowest(o, a, this._context);
              return [
                {value: c, offset: l},
                {value: h, offset: l},
                {value: r.Std.avg(c, h), offset: l},
              ];
            };
          },
        },
        {
          name: "Price Oscillator",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: u,
                },
              },
              inputs: {in_0: 10, in_1: 21},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Price Oscillator",
            shortDescription: "PPO",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "shortlen",
                defval: 10,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_1",
                name: "longlen",
                defval: 21,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Price Oscillator@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Price Oscillator",
            format: {type: "price", precision: 2},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return ((e - t) / t) * 100;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = r.Std.close(this._context),
                  s = this._input(0),
                  n = this._input(1),
                  o = this._context.new_var(i),
                  a = r.Std.sma(o, s, this._context),
                  l = this._context.new_var(i),
                  c = r.Std.sma(l, n, this._context);
                return [this.f_0(a, c)];
              });
          },
        },
        {
          name: "Price Volume Trend",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {
              plot_0: {
                title: "PVT",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
            },
            description: "Price Volume Trend",
            shortDescription: "PVT",
            is_price_study: !1,
            is_hidden_study: !1,
            id: "price_volume_trend@tv-basicstudies-1",
            inputs: [],
            scriptIdPart: "",
            name: "Price Volume Trend",
            format: {type: "volume"},
          },
          constructor: function () {
            (this.f_0 = function () {
              var e = this._context.new_var(r.Std.close(this._context));
              return [
                r.Std.cum(
                  (r.Std.change(e) / e.get(1)) * r.Std.volume(this._context),
                  this._context,
                ),
              ];
            }),
              (this.main = function (e, t) {
                return (this._context = e), (this._input = t), [this.f_0()[0]];
              });
          },
        },
        {
          name: "Rate Of Change",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 0,
                },
              ],
              inputs: {in_0: 9},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {
              plot_0: {
                title: "ROC",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
            },
            description: "Rate Of Change",
            shortDescription: "ROC",
            is_price_study: !1,
            bands: [{id: "hline_0", name: "Zero Line", isHidden: !1}],
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 9,
                type: "integer",
                min: 1,
                max: 1e12,
              },
            ],
            id: "rate_of_change@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Rate Of Change",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = this._context.new_var(r.Std.close(this._context)),
                s = this._input(0);
              return [(100 * (i.get(0) - i.get(s))) / i.get(s)];
            };
          },
        },
        {
          name: "Relative Strength Index",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#7E57C2",
                },
                smoothedMA: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !1,
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 70,
                },
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 30,
                },
              ],
              filledAreasStyle: {
                fill_0: {color: "#7E57C2", transparency: 90, visible: !0},
              },
              inputs: {length: 14, smoothingLine: "SMA", smoothingLength: 14},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "smoothedMA", type: "line"},
            ],
            styles: {
              plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1},
              smoothedMA: {
                title: "Smoothed MA",
                histogramBase: 0,
                joinPoints: !1,
              },
            },
            description: "Relative Strength Index",
            shortDescription: "RSI",
            is_price_study: !1,
            bands: [
              {id: "hline_0", name: "UpperLimit"},
              {id: "hline_1", name: "LowerLimit"},
            ],
            filledAreas: [
              {
                id: "fill_0",
                objAId: "hline_0",
                objBId: "hline_1",
                type: "hline_hline",
                title: "Hlines Background",
              },
            ],
            inputs: [
              {
                id: "length",
                name: "Length",
                defval: 14,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "smoothingLine",
                name: "Smoothing Line",
                defval: "SMA",
                type: "text",
                options: ["SMA", "EMA", "WMA"],
              },
              {
                id: "smoothingLength",
                name: "Smoothing Length",
                defval: 14,
                type: "integer",
                min: 1,
                max: 1e4,
              },
            ],
            id: "Relative Strength Index@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Relative Strength Index",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e) {
              return r.Std.max(e, 0);
            }),
              (this.f_1 = function (e) {
                return -r.Std.min(e, 0);
              }),
              (this.f_2 = function (e, t) {
                return r.Std.eq(e, 0)
                  ? 100
                  : r.Std.eq(t, 0)
                  ? 0
                  : 100 - 100 / (1 + t / e);
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = r.Std.close(this._context),
                  s = this._input(0),
                  n = this._input(1),
                  o = this._input(2);
                this._context.setMinimumAdditionalDepth(s + o);
                var a,
                  l = this._context.new_var(i),
                  c = r.Std.change(l),
                  h = this.f_0(c),
                  d = this._context.new_var(h),
                  u = r.Std.rma(d, s, this._context),
                  p = this.f_1(c),
                  _ = this._context.new_var(p),
                  m = r.Std.rma(_, s, this._context),
                  g = this.f_2(m, u),
                  f = this._context.new_var(g);
                return (
                  "EMA" === n
                    ? (a = r.Std.ema(f, o, this._context))
                    : "WMA" === n
                    ? (a = r.Std.wma(f, o, this._context))
                    : "SMA" === n && (a = r.Std.sma(f, o, this._context)),
                  [{value: g}, {value: a}]
                );
              });
          },
        },
        {
          name: "Relative Vigor Index",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: u,
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: a,
                },
              },
              inputs: {in_0: 10},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
            ],
            styles: {
              plot_0: {title: "RVGI", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "Signal", histogramBase: 0, joinPoints: !1},
            },
            description: "Relative Vigor Index",
            shortDescription: "RVGI",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "Length",
                defval: 10,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Relative Vigor Index@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Relative Vigor Index",
            format: {precision: 4, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return e - t;
            }),
              (this.f_1 = function (e, t) {
                return e / t;
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = this.f_0(
                    r.Std.close(this._context),
                    r.Std.open(this._context),
                  ),
                  n = this._context.new_var(s),
                  o = r.Std.swma(n, this._context),
                  a = this._context.new_var(o),
                  l = r.Std.sum(a, i, this._context),
                  c = this.f_0(
                    r.Std.high(this._context),
                    r.Std.low(this._context),
                  ),
                  h = this._context.new_var(c),
                  d = r.Std.swma(h, this._context),
                  u = this._context.new_var(d),
                  p = r.Std.sum(u, i, this._context),
                  _ = this.f_1(l, p),
                  m = this._context.new_var(_);
                return [_, r.Std.swma(m, this._context)];
              });
          },
        },
        {
          name: "Relative Volatility Index",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#7E57C2",
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 80,
                },
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 20,
                },
              ],
              filledAreasStyle: {
                fill_0: {color: "#7E57C2", transparency: 90, visible: !0},
              },
              inputs: {in_0: 10},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Relative Volatility Index",
            shortDescription: "RVI",
            is_price_study: !1,
            bands: [
              {id: "hline_0", name: "UpperLimit"},
              {id: "hline_1", name: "LowerLimit"},
            ],
            filledAreas: [
              {
                id: "fill_0",
                objAId: "hline_0",
                objBId: "hline_1",
                type: "hline_hline",
                title: "Hlines Background",
              },
            ],
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 10,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Relative Volatility Index@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Relative Volatility Index",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return r.Std.le(e, 0) ? 0 : t;
            }),
              (this.f_1 = function (e, t) {
                return r.Std.gt(e, 0) ? 0 : t;
              }),
              (this.f_2 = function (e, t) {
                return (e / (e + t)) * 100;
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0);
                this._context.setMinimumAdditionalDepth(i + 12);
                var s = r.Std.close(this._context),
                  n = this._context.new_var(s),
                  o = r.Std.stdev(n, i, this._context),
                  a = this._context.new_var(s),
                  l = r.Std.change(a),
                  c = this.f_0(l, o),
                  h = this._context.new_var(c),
                  d = r.Std.ema(h, 14, this._context),
                  u = this.f_1(l, o),
                  p = this._context.new_var(u),
                  _ = r.Std.ema(p, 14, this._context);
                return [this.f_2(d, _)];
              });
          },
        },
        {
          name: "SMI Ergodic Indicator/Oscillator",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FF6D00",
                },
                plot_2: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 1,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: c,
                },
              },
              inputs: {in_0: 5, in_1: 20, in_2: 5},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
              {id: "plot_2", type: "line"},
            ],
            styles: {
              plot_0: {title: "Indicator", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "Signal", histogramBase: 0, joinPoints: !1},
              plot_2: {title: "Oscillator", histogramBase: 0, joinPoints: !1},
            },
            description: "SMI Ergodic Indicator/Oscillator",
            shortDescription: "SMIIO",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "shortlen",
                defval: 5,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_1",
                name: "longlen",
                defval: 20,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_2",
                name: "siglen",
                defval: 5,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "SMI Ergodic Indicator/Oscillator@tv-basicstudies-1",
            scriptIdPart: "",
            name: "SMI Ergodic Indicator/Oscillator",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return e - t;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = this._input(1),
                  n = this._input(2);
                this._context.setMinimumAdditionalDepth(i + s + n);
                var o = r.Std.close(this._context),
                  a = this._context.new_var(o),
                  l = r.Std.tsi(a, i, s, this._context),
                  c = this._context.new_var(l),
                  h = r.Std.ema(c, n, this._context);
                return [l, h, this.f_0(l, h)];
              });
          },
        },
        {
          name: "Smoothed Moving Average",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#673AB7",
                },
              },
              inputs: {in_0: 7, in_1: "close"},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {
              plot_0: {
                title: "Plot",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
            },
            description: "Smoothed Moving Average",
            shortDescription: "SMMA",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "Length",
                defval: 7,
                type: "integer",
                min: 1,
                max: 1e12,
              },
              {
                id: "in_1",
                name: "Source",
                defval: "close",
                type: "source",
                options: [
                  "open",
                  "high",
                  "low",
                  "close",
                  "hl2",
                  "hlc3",
                  "ohlc4",
                ],
              },
            ],
            id: "smoothed_moving_average@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Smoothed Moving Average",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function () {
              var e = this._input(0),
                t = r.Std[this._input(1)](this._context);
              return [r.Std.smma(t, e, this._context)];
            }),
              (this.main = function (e, t) {
                return (this._context = e), (this._input = t), this.f_0();
              });
          },
        },
        {
          name: "Standard Deviation",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            id: "Standard Deviation@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Standard Deviation",
            description: "Standard Deviation",
            shortDescription: "Standard Deviation",
            is_price_study: !1,
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: u,
                },
              },
              inputs: {periods: 5, deviations: 1},
            },
            styles: {plot_0: {title: "Plot"}},
            inputs: [
              {id: "periods", name: "Periods", type: "integer"},
              {id: "deviations", name: "Deviations", type: "float"},
            ],
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = this._input(0),
                s = this._input(1),
                n = this._context.new_var(r.Std.close(this._context));
              return [r.Std.stdev(n, i, this._context) * s];
            };
          },
        },
        {
          name: "Stochastic",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FF6D00",
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 80,
                },
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 20,
                },
              ],
              filledAreasStyle: {
                fill_0: {color: "#2196F3", transparency: 90, visible: !0},
              },
              inputs: {in_0: 14, in_1: 1, in_2: 3},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
            ],
            styles: {
              plot_0: {title: "%K", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "%D", histogramBase: 0, joinPoints: !1},
            },
            description: "Stochastic",
            shortDescription: "Stoch",
            is_price_study: !1,
            bands: [
              {id: "hline_0", name: "UpperLimit"},
              {id: "hline_1", name: "LowerLimit"},
            ],
            filledAreas: [
              {
                id: "fill_0",
                objAId: "hline_0",
                objBId: "hline_1",
                type: "hline_hline",
                title: "Hlines Background",
              },
            ],
            inputs: [
              {
                id: "in_0",
                name: "K",
                defval: 14,
                type: "integer",
                min: 1,
                max: 1e4,
              },
              {
                id: "in_1",
                name: "D",
                defval: 1,
                type: "integer",
                min: 1,
                max: 1e4,
              },
              {
                id: "in_2",
                name: "smooth",
                defval: 3,
                type: "integer",
                min: 1,
                max: 1e4,
              },
            ],
            id: "Stochastic@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Stochastic",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = this._input(0),
                s = this._input(1),
                n = this._input(2);
              this._context.setMinimumAdditionalDepth(i + s + n);
              var o = r.Std.close(this._context),
                a = r.Std.high(this._context),
                l = r.Std.low(this._context),
                c = this._context.new_var(o),
                h = this._context.new_var(a),
                d = this._context.new_var(l),
                u = r.Std.stoch(c, h, d, i, this._context),
                p = this._context.new_var(u),
                _ = r.Std.sma(p, s, this._context),
                m = this._context.new_var(_);
              return [_, r.Std.sma(m, n, this._context)];
            };
          },
        },
        {
          name: "Stochastic RSI",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#FF6D00",
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 80,
                },
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 20,
                },
              ],
              filledAreasStyle: {
                fill_0: {color: "#2196F3", transparency: 90, visible: !0},
              },
              inputs: {in_0: 14, in_1: 14, in_2: 3, in_3: 3},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
            ],
            styles: {
              plot_0: {title: "%K", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "%D", histogramBase: 0, joinPoints: !1},
            },
            description: "Stochastic RSI",
            shortDescription: "Stoch RSI",
            is_price_study: !1,
            bands: [
              {id: "hline_0", name: "UpperLimit"},
              {id: "hline_1", name: "LowerLimit"},
            ],
            filledAreas: [
              {
                id: "fill_0",
                objAId: "hline_0",
                objBId: "hline_1",
                type: "hline_hline",
                title: "Hlines Background",
              },
            ],
            inputs: [
              {
                id: "in_0",
                name: "lengthRSI",
                defval: 14,
                type: "integer",
                min: 1,
                max: 1e4,
              },
              {
                id: "in_1",
                name: "lengthStoch",
                defval: 14,
                type: "integer",
                min: 1,
                max: 1e4,
              },
              {
                id: "in_2",
                name: "smoothK",
                defval: 3,
                type: "integer",
                min: 1,
                max: 1e4,
              },
              {
                id: "in_3",
                name: "smoothD",
                defval: 3,
                type: "integer",
                min: 1,
                max: 1e4,
              },
            ],
            id: "Stochastic RSI@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Stochastic RSI",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_1 = function (e, t, i) {
              var s = i.new_var(r.Std.max(r.Std.change(e), 0));
              return r.Std.rma(s, t, i);
            }),
              (this.f_2 = function (e, t, i) {
                var s = i.new_var(-r.Std.min(r.Std.change(e), 0));
                return r.Std.rma(s, t, i);
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = r.Std.close(this._context),
                  s = this._input(0),
                  n = this._input(1),
                  o = this._input(2),
                  a = this._input(3);
                e.setMinimumAdditionalDepth(s + n + o + a);
                var l = this._context.new_var(i),
                  c = r.Std.rsi(
                    this.f_1(l, s, this._context),
                    this.f_2(l, s, this._context),
                  ),
                  h = this._context.new_var(c),
                  d = this._context.new_var(c),
                  u = this._context.new_var(c),
                  p = r.Std.stoch(h, d, u, n, this._context),
                  _ = this._context.new_var(p),
                  m = r.Std.sma(_, o, this._context),
                  g = this._context.new_var(m);
                return [m, r.Std.sma(g, a, this._context)];
              });
          },
        },
        {
          name: "TRIX",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: a,
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 0,
                },
              ],
              inputs: {in_0: 18},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "TRIX", histogramBase: 0, joinPoints: !1}},
            description: "TRIX",
            shortDescription: "TRIX",
            is_price_study: !1,
            bands: [{id: "hline_0", name: "Zero"}],
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 18,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "TRIX@tv-basicstudies-1",
            scriptIdPart: "",
            name: "TRIX",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e) {
              return r.Std.log(e);
            }),
              (this.f_1 = function (e) {
                return 1e4 * e;
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0);
                e.setMinimumAdditionalDepth(3 * i);
                var s = this.f_0(r.Std.close(this._context)),
                  n = this._context.new_var(s),
                  o = r.Std.ema(n, i, this._context),
                  a = this._context.new_var(o),
                  l = r.Std.ema(a, i, this._context),
                  c = this._context.new_var(l),
                  h = r.Std.ema(c, i, this._context),
                  d = this._context.new_var(h),
                  u = r.Std.change(d);
                return [this.f_1(u)];
              });
          },
        },
        {
          name: "Triple EMA",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 9},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Triple EMA",
            shortDescription: "TEMA",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 9,
                type: "integer",
                min: 1,
                max: 1e4,
              },
            ],
            id: "Triple EMA@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Triple EMA",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function (e, t, i) {
              return 3 * (e - t) + i;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0);
                this._context.setMinimumAdditionalDepth(3 * i);
                var s = r.Std.close(this._context),
                  n = this._context.new_var(s),
                  o = r.Std.ema(n, i, this._context),
                  a = this._context.new_var(o),
                  l = r.Std.ema(a, i, this._context),
                  c = this._context.new_var(l),
                  h = r.Std.ema(c, i, this._context);
                return [this.f_0(o, l, h)];
              });
          },
        },
        {
          name: "True Strength Index",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#E91E63",
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 0,
                },
              ],
              inputs: {in_0: 25, in_1: 13, in_2: 13},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
            ],
            styles: {
              plot_0: {
                title: "True Strength Index",
                histogramBase: 0,
                joinPoints: !1,
              },
              plot_1: {title: "Signal", histogramBase: 0, joinPoints: !1},
            },
            description: "True Strength Index",
            shortDescription: "True Strength Index",
            is_price_study: !1,
            bands: [{id: "hline_0", name: "Zero"}],
            inputs: [
              {
                id: "in_0",
                name: "long",
                defval: 25,
                type: "integer",
                min: 1,
                max: 4999,
              },
              {
                id: "in_1",
                name: "short",
                defval: 13,
                type: "integer",
                min: 1,
                max: 4999,
              },
              {
                id: "in_2",
                name: "siglen",
                defval: 13,
                type: "integer",
                min: 1,
                max: 4999,
              },
            ],
            id: "True Strength Indicator@tv-basicstudies-1",
            scriptIdPart: "",
            name: "True Strength Index",
            format: {precision: 4, type: "price"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = this._input(0),
                s = this._input(1),
                n = this._input(2);
              this._context.setMinimumAdditionalDepth(
                this._input(0) + this._input(1) + this._input(2),
              );
              var o = r.Std.close(this._context),
                a = this._context.new_var(o),
                l = r.Std.tsi(a, s, i, this._context),
                c = this._context.new_var(l);
              return [l, r.Std.ema(c, n, this._context)];
            };
          },
        },
        {
          name: "Trend Strength Index",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            is_price_study: !1,
            id: "Trend Strength Index@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Trend Strength Index",
            description: "Trend Strength Index",
            shortDescription: "Trend Strength Index",
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: c,
                },
              },
              inputs: {periods: 14},
            },
            styles: {plot_0: {title: "Plot"}},
            inputs: [{id: "periods", type: "integer", name: "Periods"}],
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                (this._input = t),
                (this.period = this._input(0)),
                (this.invertedPeriod = 1 / this.period),
                (this.sumX = ((this.period - 1) * this.period) / 2),
                (this.sumXX =
                  ((this.period - 1) * this.period * (2 * this.period - 1)) /
                  6),
                (this.invertedPeriodSumXSumX =
                  this.invertedPeriod * this.sumX * this.sumX);
            }),
              (this.trendStrengthIndex = function () {
                for (
                  var e = this._context.new_var(r.Std.close(this._context)),
                    t = r.Std.sum(e, this.period, this._context),
                    i = 0,
                    s = 0,
                    n = 0;
                  n < this.period;
                  n++
                ) {
                  var o = e.get(n);
                  (s += (this.period - 1 - n) * o), (i += o * o);
                }
                var a = s - this.invertedPeriod * this.sumX * t,
                  l =
                    (this.sumXX - this.invertedPeriodSumXSumX) *
                    (i - this.invertedPeriod * t * t);
                return l < 0
                  ? 0 == a
                    ? 0
                    : a > 0
                    ? 1
                    : -1
                  : a / (l = Math.sqrt(l));
              }),
              (this.main = function (e, t) {
                return (
                  (this._context = e),
                  (this._input = t),
                  [this.trendStrengthIndex()]
                );
              });
          },
        },
        {
          name: "Typical Price",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            id: "TypicalPrice@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Typical Price",
            description: "Typical Price",
            shortDescription: "Typical Price",
            is_price_study: !0,
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: "#FF6D00",
                },
              },
              inputs: {},
            },
            styles: {plot_0: {title: "Plot"}},
            inputs: [],
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              return (
                (this._context = e),
                (this._input = t),
                [r.Std.hlc3(this._context)]
              );
            };
          },
        },
        {
          name: "Ultimate Oscillator",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: a,
                },
              },
              inputs: {in_0: 7, in_1: 14, in_2: 28},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {
              plot_0: {
                title: "UO",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
            },
            description: "Ultimate Oscillator",
            shortDescription: "UO",
            is_price_study: !1,
            inputs: [
              {
                id: "in_0",
                name: "length7",
                defval: 7,
                type: "integer",
                min: 1,
                max: 1e12,
              },
              {
                id: "in_1",
                name: "length14",
                defval: 14,
                type: "integer",
                min: 1,
                max: 1e12,
              },
              {
                id: "in_2",
                name: "length28",
                defval: 28,
                type: "integer",
                min: 1,
                max: 1e12,
              },
            ],
            id: "ultimate_oscillator@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Ultimate Oscillator",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e, t, i) {
              var s = this._context.new_var(e),
                n = this._context.new_var(t);
              return [
                r.Std.sum(s, i, this._context) / r.Std.sum(n, i, this._context),
              ];
            }),
              (this.f_1 = function () {
                var e = this._input(0),
                  t = this._input(1),
                  i = this._input(2),
                  s = this._context.new_var(r.Std.close(this._context)),
                  n = r.Std.max(r.Std.high(this._context), s.get(1)),
                  o = this._context.new_var(r.Std.close(this._context)),
                  a = r.Std.min(r.Std.low(this._context), o.get(1)),
                  l = r.Std.close(this._context) - a,
                  c = n - a,
                  h = this.f_0(l, c, e),
                  d = this.f_0(l, c, t),
                  u = this.f_0(l, c, i);
                return [(100 * (4 * h[0] + 2 * d[0] + u[0])) / 7];
              }),
              (this.main = function (e, t) {
                return (this._context = e), (this._input = t), this.f_1();
              });
          },
        },
        {
          name: "Volatility Close-to-Close",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            is_price_study: !1,
            id: "Volatility Close-to-Close@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Volatility Close-to-Close",
            description: "Volatility Close-to-Close",
            shortDescription: "Volatility Close-to-Close",
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: "#2196F3",
                },
              },
              inputs: {periods: 10, daysPerYear: 252},
            },
            styles: {plot_0: {title: "Plot"}},
            inputs: [
              {
                id: "periods",
                name: "Periods",
                type: "integer",
                defval: 10,
                min: 2,
              },
              {
                id: "daysPerYear",
                name: "Days Per Year",
                type: "integer",
                defval: 252,
                min: 1,
                max: 366,
              },
            ],
            format: {precision: 2, type: "percent"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                (this._input = t),
                (this.period = this._input(0)),
                (this.daysPerYear = this._input(1));
            }),
              (this.stdev = function (e, t, i) {
                var s = this.variance(e, t, i);
                return r.Std.sqrt(s);
              }),
              (this.variance = function (e, t, i) {
                var s = r.Std.sma(e, t, i);
                return this.variance2(e, s, t);
              }),
              (this.variance2 = function (e, t, i) {
                var s,
                  r,
                  n = 0;
                for (s = 0; s < i; s++) n += (r = e.get(s) - t) * r;
                return n / (i - 1);
              }),
              (this.standardHistVol = function () {
                var e = this._context.new_var(r.Std.close(this._context)),
                  t = this._context.new_var(r.Std.log(e.get() / e.get(1)));
                return (
                  100 *
                  this.stdev(t, this.period, this._context) *
                  r.Std.sqrt(this.daysPerYear)
                );
              }),
              (this.main = function (e, t) {
                return (
                  (this._context = e),
                  (this._input = t),
                  [this.standardHistVol()]
                );
              });
          },
        },
        {
          name: "Volatility Zero Trend Close-to-Close",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            is_price_study: !1,
            id: "Volatility Zero Trend Close-to-Close@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Volatility Zero Trend Close-to-Close",
            description: "Volatility Zero Trend Close-to-Close",
            shortDescription: "Volatility Zero Trend Close-to-Close",
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: "#2196F3",
                },
              },
              inputs: {periods: 10, daysPerYear: 252},
            },
            styles: {plot_0: {title: "Plot"}},
            inputs: [
              {
                id: "periods",
                name: "Periods",
                type: "integer",
                min: 0,
                max: 1e4,
              },
              {id: "daysPerYear", name: "Days Per Year", type: "integer"},
            ],
            format: {precision: 2, type: "percent"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                (this._input = t),
                (this.period = this._input(0)),
                (this.daysPerYear = this._input(1));
            }),
              (this.volatliityZTCTC = function () {
                this._context.setMinimumAdditionalDepth(this._input(0) + 1);
                for (
                  var e = this._context.new_var(r.Std.close(this._context)),
                    t = this._context.new_var(e.symbol.time),
                    i = Math.sqrt(
                      (t.get(0) - t.get(1)) / 864e5 / this.daysPerYear,
                    ),
                    s = Math.log(r.Std.close(this._context) / e.get(1)),
                    n = this._context.new_var(s / i),
                    o = this._context.new_var(Math.pow(n, 2)),
                    a = 0,
                    l = 0;
                  l < this.period;
                  l++
                )
                  a += o.get(l);
                return 100 * Math.sqrt(a / this.period);
              }),
              (this.main = function (e, t) {
                return (
                  (this._context = e),
                  (this._input = t),
                  [this.volatliityZTCTC()]
                );
              });
          },
        },
        {
          name: "Volatility O-H-L-C",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            is_price_study: !1,
            id: "Volatility O-H-L-C@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Volatility O-H-L-C",
            description: "Volatility O-H-L-C",
            shortDescription: "Volatility O-H-L-C",
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: c,
                },
              },
              inputs: {
                periods: 10,
                marketClosedPercentage: 0,
                daysPerYear: 252,
              },
            },
            styles: {plot_0: {title: "Plot"}},
            inputs: [
              {id: "periods", type: "integer", name: "Periods"},
              {
                id: "marketClosedPercentage",
                type: "float",
                name: "Market Closed Percentage",
                min: 0,
                max: 0.999,
              },
              {id: "daysPerYear", type: "integer", name: "Days Per Year"},
            ],
            format: {precision: 2, type: "percent"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                (this._input = t),
                (this.period = this._input(0)),
                (this.marketClosedPercentage = this._input(1)),
                (this.daysPerYear = this._input(2)),
                (this.secondsPerYear = 86400 * this.daysPerYear);
            }),
              (this.square = function (e) {
                return e * e;
              }),
              (this.volatilityOHLC = function () {
                var e = this._context.new_var(
                    Math.log(r.Std.open(this._context)),
                  ),
                  t = this._context.new_var(
                    Math.log(r.Std.high(this._context)),
                  ),
                  i = this._context.new_var(Math.log(r.Std.low(this._context))),
                  s = this._context.new_var(
                    Math.log(r.Std.close(this._context)),
                  ),
                  n = this._context.new_var(r.Std.close(this._context)),
                  o = this._context.new_var(n.symbol.time),
                  a = (o.get(0) - o.get(1)) / 1e3,
                  l = 0.5 * this.square(t.get() - i.get());
                (l -= (Math.log(4) - 1) * this.square(s.get() - e.get())),
                  this.marketClosedPercentage > 0 &&
                    (l =
                      (0.12 * this.square(e.get() - s.get(1))) /
                        this.marketClosedPercentage +
                      (0.88 * l) / (1 - this.marketClosedPercentage)),
                  (l /= a),
                  (l *= this.secondsPerYear);
                var c = this._context.new_var(l);
                return (
                  100 *
                  Math.sqrt(
                    r.Std.sum(c, this.period, this._context) / this.period,
                  )
                );
              }),
              (this.main = function (e, t) {
                return (
                  (this._context = e),
                  (this._input = t),
                  [this.volatilityOHLC()]
                );
              });
          },
        },
        {
          name: "Volatility Index",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            is_price_study: !0,
            id: "Volatility Index@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Volatility Index",
            description: "Volatility Index",
            shortDescription: "Volatility Index",
            plots: [{id: "plot_0", type: "line"}],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: !0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  color: c,
                },
              },
              inputs: {periods: 10, atrMult: 3, method: "Wilder Smoothing"},
            },
            styles: {plot_0: {title: "Plot"}},
            inputs: [
              {id: "periods", name: "Periods", type: "integer"},
              {id: "atrMult", name: "ATR Mult", type: "float"},
              {
                id: "method",
                name: "Method",
                type: "text",
                defval: "Exponential",
                options: ["Exponential", "Wilder Smoothing"],
              },
            ],
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.init = function (e, t) {
              (this._context = e),
                (this._input = t),
                (this.period = this._input(0)),
                (this.atrMult = this._input(1)),
                (this.maMethod = this._input(2)),
                (this.nextsar = null),
                (this.position = null),
                (this.sic = null),
                (this.bars = []),
                (this.count = 0),
                (this.lastSar = null),
                this._context.setMinimumAdditionalDepth(
                  "Exponential" === this.maMethod
                    ? 2 * this.period + 2
                    : this.period,
                );
            }),
              (this.computeATR = function () {
                var e = r.Std.high(this._context) - r.Std.low(this._context),
                  t =
                    r.Std.high(this._context) - this.bars[this.bars.length - 2],
                  i =
                    this.bars[this.bars.length - 2] - r.Std.low(this._context);
                return (
                  (this.tr = Math.max(e, t, i)),
                  "Exponential" === this.maMethod
                    ? (this.atr = r.Std.ema(
                        this._context.new_var(this.tr),
                        this.period,
                        this._context,
                      ))
                    : (this.atr =
                        this.tr / this.period +
                        (1 - 1 / this.period) * this.atr),
                  this.atr * this.atrMult
                );
              }),
              (this.calculateVolatility = function () {
                if (
                  r.Std.close(this._context) === this.bars[this.bars.length - 1]
                )
                  return this.lastSar;
                if (
                  (this.bars.push(r.Std.close(this._context)), 1 === this.count)
                )
                  (this.atr =
                    r.Std.high(this._context) - r.Std.low(this._context)),
                    (this.sic = r.Std.close(this._context));
                else if (this.count < this.period) {
                  var e = r.Std.high(this._context) - r.Std.low(this._context),
                    t =
                      r.Std.high(this._context) -
                      this.bars[this.bars.length - 2],
                    i =
                      this.bars[this.bars.length - 2] -
                      r.Std.low(this._context);
                  (this.atr += Math.max(e, t, i)),
                    r.Std.close(this._context) > this.sic &&
                      (this.sic = r.Std.close(this._context));
                } else if (this.count === this.period) {
                  (e = r.Std.high(this._context) - r.Std.low(this._context)),
                    (t =
                      r.Std.high(this._context) -
                      this.bars[this.bars.length - 2]),
                    (i =
                      this.bars[this.bars.length - 2] -
                      r.Std.low(this._context));
                  (this.atr += Math.max(e, t, i)),
                    (this.atr *= 1 / this.period),
                    r.Std.close(this._context) > this.sic &&
                      (this.sic = r.Std.close(this._context)),
                    (this.position = "LONG"),
                    (this.nextsar = this.sic - this.atr * this.atrMult);
                } else {
                  var s = this.nextsar;
                  "LONG" === this.position
                    ? r.Std.close(this._context) < s
                      ? ((this.position = "SHORT"),
                        (this.sic = r.Std.close(this._context)),
                        (this.nextsar = this.sic + this.computeATR()))
                      : ((this.position = "LONG"),
                        (this.sic = Math.max(
                          r.Std.close(this._context),
                          this.sic,
                        )),
                        (this.nextsar = this.sic - this.computeATR()))
                    : "SHORT" === this.position &&
                      (r.Std.close(this._context) > s
                        ? ((this.position = "LONG"),
                          (this.sic = r.Std.close(this._context)),
                          (this.nextsar = this.sic - this.computeATR()))
                        : ((this.position = "SHORT"),
                          (this.sic = Math.min(
                            r.Std.close(this._context),
                            this.sic,
                          )),
                          (this.nextsar = this.sic + this.computeATR()))),
                    (this.lastSar = s);
                }
                return this.count++, s;
              }),
              (this.main = function (e, t) {
                return (
                  (this._context = e),
                  (this._input = t),
                  this._context.select_sym(0),
                  [this.calculateVolatility()]
                );
              });
          },
        },
        {
          name: "VWAP",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: 0,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {
              plot_0: {
                title: "VWAP",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
            },
            description: "VWAP",
            shortDescription: "VWAP",
            is_price_study: !0,
            inputs: [],
            id: "VWAP@tv-basicstudies-1",
            scriptIdPart: "",
            name: "VWAP",
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_1 = function (e) {
              (e.hist = null), e.add_hist();
            }),
              (this.init = function (e, t) {
                this._isNewSession = null;
              }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = e.new_var(),
                  s = e.new_var(),
                  n = this._context.symbol.time;
                return (
                  n &&
                    (null === this._isNewSession &&
                      (this._isNewSession = r.Std.createNewSessionCheck(e)),
                    this._isNewSession(n) && (this.f_1(i), this.f_1(s))),
                  i.set(
                    r.Std.nz(i.get(1)) +
                      r.Std.hlc3(this._context) * r.Std.volume(this._context),
                  ),
                  s.set(r.Std.nz(s.get(1)) + r.Std.volume(this._context)),
                  [i.get(0) / s.get(0)]
                );
              });
          },
        },
        {
          name: "VWMA",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              inputs: {in_0: 20},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "VWMA",
            shortDescription: "VWMA",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "len",
                defval: 20,
                type: "integer",
                min: 1,
                max: 1e4,
              },
            ],
            id: "VWMA@tv-basicstudies-1",
            scriptIdPart: "",
            name: "VWMA",
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = r.Std.close(this._context),
                s = this._input(0),
                n = this._context.new_var(i);
              return [r.Std.vwma(n, s, this._context)];
            };
          },
        },
        {
          name: "Volume Oscillator",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: 0,
                },
              ],
              inputs: {in_0: 5, in_1: 10},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {
              plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1},
            },
            description: "Volume Oscillator",
            shortDescription: "Volume Osc",
            is_price_study: !1,
            bands: [{id: "hline_0", name: "Zero"}],
            inputs: [
              {
                id: "in_0",
                name: "shortlen",
                defval: 5,
                type: "integer",
                min: 1,
                max: 4999,
              },
              {
                id: "in_1",
                name: "longlen",
                defval: 10,
                type: "integer",
                min: 1,
                max: 4999,
              },
            ],
            id: "Volume Oscillator@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Volume Oscillator",
            format: {precision: 2, type: "percent"},
          },
          constructor: function () {
            (this.f_0 = function (e, t) {
              return (100 * (e - t)) / t;
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = this._input(1),
                  n = r.Std.volume(this._context),
                  o = this._context.new_var(n),
                  a = r.Std.ema(o, i, this._context),
                  l = this._context.new_var(n),
                  c = r.Std.ema(l, s, this._context);
                return [this.f_0(a, c)];
              });
          },
        },
        {
          name: "Vortex Indicator",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#E91E63",
                },
              },
              inputs: {in_0: 14},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
            ],
            styles: {
              plot_0: {
                title: "VI +",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
              plot_1: {
                title: "VI -",
                histogramBase: 0,
                joinPoints: !1,
                isHidden: !1,
              },
            },
            description: "Vortex Indicator",
            shortDescription: "VI",
            is_price_study: !1,
            is_hidden_study: !1,
            id: "vortex_indicator@tv-basicstudies-1",
            inputs: [
              {
                id: "in_0",
                name: "Period",
                defval: 14,
                type: "integer",
                min: 2,
                max: 1e12,
              },
            ],
            scriptIdPart: "",
            name: "Vortex Indicator",
            format: {precision: 4, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function () {
              var e = this._input(0),
                t = this._context.new_var(r.Std.low(this._context)),
                i = this._context.new_var(
                  r.Std.abs(r.Std.high(this._context) - t.get(1)),
                ),
                s = r.Std.sum(i, e, this._context),
                n = this._context.new_var(r.Std.high(this._context)),
                o = this._context.new_var(
                  r.Std.abs(r.Std.low(this._context) - n.get(1)),
                ),
                a = r.Std.sum(o, e, this._context),
                l = this._context.new_var(r.Std.atr(1, this._context)),
                c = r.Std.sum(l, e, this._context);
              return [s / c, a / c];
            }),
              (this.main = function (e, t) {
                return (this._context = e), (this._input = t), this.f_0();
              });
          },
        },
        {
          name: "Willams %R",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#7E57C2",
                },
              },
              bands: [
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: -20,
                },
                {
                  color: "#787B86",
                  linestyle: 2,
                  linewidth: 1,
                  visible: !0,
                  value: -80,
                },
              ],
              filledAreasStyle: {
                fill_0: {color: "#7E57C2", transparency: 90, visible: !0},
              },
              inputs: {in_0: 14},
            },
            plots: [{id: "plot_0", type: "line"}],
            styles: {plot_0: {title: "Plot", histogramBase: 0, joinPoints: !1}},
            description: "Williams %R",
            shortDescription: "%R",
            is_price_study: !1,
            bands: [
              {id: "hline_0", name: "UpperLimit"},
              {id: "hline_1", name: "LowerLimit"},
            ],
            filledAreas: [
              {
                id: "fill_0",
                objAId: "hline_0",
                objBId: "hline_1",
                type: "hline_hline",
                title: "Hlines Background",
              },
            ],
            inputs: [
              {
                id: "in_0",
                name: "length",
                defval: 14,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Willams %R@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Willams %R",
            format: {precision: 2, type: "price"},
          },
          constructor: function () {
            (this.f_0 = function (e, t, i) {
              return (100 * (e - t)) / (t - i);
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this._input(0),
                  s = r.Std.high(this._context),
                  n = this._context.new_var(s),
                  o = r.Std.highest(n, i, this._context),
                  a = r.Std.low(this._context),
                  l = this._context.new_var(a),
                  c = r.Std.lowest(l, i, this._context);
                return [this.f_0(r.Std.close(this._context), o, c)];
              });
          },
        },
        {
          name: "Williams Alligator",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#2196F3",
                },
                plot_1: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#E91E63",
                },
                plot_2: {
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                  color: "#66BB6A",
                },
              },
              inputs: {in_0: 21, in_1: 13, in_2: 8, in_3: 8, in_4: 5, in_5: 3},
            },
            plots: [
              {id: "plot_0", type: "line"},
              {id: "plot_1", type: "line"},
              {id: "plot_2", type: "line"},
            ],
            styles: {
              plot_0: {title: "Jaw", histogramBase: 0, joinPoints: !1},
              plot_1: {title: "Teeth", histogramBase: 0, joinPoints: !1},
              plot_2: {title: "Lips", histogramBase: 0, joinPoints: !1},
            },
            description: "Williams Alligator",
            shortDescription: "Alligator",
            is_price_study: !0,
            inputs: [
              {
                id: "in_0",
                name: "Jaw Length",
                defval: 21,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_1",
                name: "Teeth Length",
                defval: 13,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_2",
                name: "Lips Length",
                defval: 8,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_3",
                name: "Jaw Offset",
                defval: 8,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_4",
                name: "Teeth Offset",
                defval: 5,
                type: "integer",
                min: 1,
                max: 2e3,
              },
              {
                id: "in_5",
                name: "Lips Offset",
                defval: 3,
                type: "integer",
                min: 1,
                max: 2e3,
              },
            ],
            id: "Williams Alligator@tv-basicstudies-1",
            scriptIdPart: "",
            name: "Williams Alligator",
            format: {type: "inherit"},
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = this._input(0),
                s = this._input(1),
                n = this._input(2),
                o = this._input(3),
                a = this._input(4),
                l = this._input(5),
                c = r.Std.hl2(this._context);
              return [
                {value: r.Std.smma(c, i, this._context), offset: o},
                {value: r.Std.smma(c, s, this._context), offset: a},
                {value: r.Std.smma(c, n, this._context), offset: l},
              ];
            };
          },
        },
        {
          name: "Williams Fractals",
          metainfo: {
            _metainfoVersion: 52,
            isTVScript: !1,
            isTVScriptStub: !1,
            defaults: {
              styles: {
                plot_0: {
                  plottype: "shape_triangle_down",
                  visible: !0,
                  location: "BelowBar",
                  transparency: 0,
                  color: a,
                },
                plot_1: {
                  plottype: "shape_triangle_up",
                  visible: !0,
                  location: "AboveBar",
                  transparency: 0,
                  color: u,
                },
              },
              inputs: {in_0: 2},
            },
            plots: [
              {id: "plot_0", type: "shapes"},
              {id: "plot_1", type: "shapes"},
            ],
            styles: {
              plot_0: {title: "Down fractals", isHidden: !1},
              plot_1: {title: "Up fractals", isHidden: !1},
            },
            description: "Williams Fractal",
            shortDescription: "Fractals",
            is_price_study: !0,
            is_hidden_study: !1,
            id: "Williams Fractals@tv-basicstudies-1",
            inputs: [
              {
                id: "in_0",
                name: "Periods",
                defval: 2,
                type: "integer",
                min: 2,
                max: 1e12,
              },
            ],
            scriptIdPart: "",
            name: "Williams Fractals",
            isCustomIndicator: !0,
            format: {type: "inherit"},
          },
          constructor: function () {
            (this.f_0 = function () {
              for (
                var e = this._input(0),
                  t = this._context.new_var(r.Std.high(this._context)),
                  i = !0,
                  s = !0,
                  n = !0,
                  o = !0,
                  a = !0,
                  l = !0,
                  c = 1;
                c <= e;
                c++
              )
                (i = r.Std.and(i, r.Std.lt(t.get(e - c), t.get(e)))),
                  (s = r.Std.and(s, r.Std.lt(t.get(e + c), t.get(e)))),
                  (n = r.Std.and(
                    n,
                    r.Std.and(
                      r.Std.le(t.get(e + 1), t.get(e)),
                      r.Std.lt(t.get(e + c + 1), t.get(e)),
                    ),
                  )),
                  (o = r.Std.and(
                    o,
                    r.Std.and(
                      r.Std.le(t.get(e + 1), t.get(e)),
                      r.Std.and(
                        r.Std.le(t.get(e + 2), t.get(e)),
                        r.Std.lt(t.get(e + c + 2), t.get(e)),
                      ),
                    ),
                  )),
                  (a = r.Std.and(
                    a,
                    r.Std.and(
                      r.Std.le(t.get(e + 1), t.get(e)),
                      r.Std.and(
                        r.Std.le(t.get(e + 2), t.get(e)),
                        r.Std.and(
                          r.Std.le(t.get(e + 3), t.get(e)),
                          r.Std.lt(t.get(e + c + 3), t.get(e)),
                        ),
                      ),
                    ),
                  )),
                  (l = r.Std.and(
                    l,
                    r.Std.and(
                      r.Std.le(t.get(e + 1), t.get(e)),
                      r.Std.and(
                        r.Std.le(t.get(e + 2), t.get(e)),
                        r.Std.and(
                          r.Std.le(t.get(e + 3), t.get(e)),
                          r.Std.and(
                            r.Std.le(t.get(e + 4), t.get(e)),
                            r.Std.lt(t.get(e + c + 4), t.get(e)),
                          ),
                        ),
                      ),
                    ),
                  ));
              var h = r.Std.or(s, r.Std.or(n, r.Std.or(o, r.Std.or(a, l)))),
                d = r.Std.and(i, h),
                u = this._context.new_var(r.Std.low(this._context)),
                p = 1,
                _ = 1,
                m = 1,
                g = 1,
                f = 1,
                v = 1;
              for (c = 1; c <= e; c++)
                (p = r.Std.and(p, r.Std.gt(u.get(e - c), u.get(e)))),
                  (_ = r.Std.and(_, r.Std.gt(u.get(e + c), u.get(e)))),
                  (m = r.Std.and(
                    m,
                    r.Std.and(
                      r.Std.ge(u.get(e + 1), u.get(e)),
                      r.Std.gt(u.get(e + c + 1), u.get(e)),
                    ),
                  )),
                  (g = r.Std.and(
                    g,
                    r.Std.and(
                      r.Std.ge(u.get(e + 1), u.get(e)),
                      r.Std.and(
                        r.Std.ge(u.get(e + 2), u.get(e)),
                        r.Std.gt(u.get(e + c + 2), u.get(e)),
                      ),
                    ),
                  )),
                  (f = r.Std.and(
                    f,
                    r.Std.and(
                      r.Std.ge(u.get(e + 1), u.get(e)),
                      r.Std.and(
                        r.Std.ge(u.get(e + 2), u.get(e)),
                        r.Std.and(
                          r.Std.ge(u.get(e + 3), u.get(e)),
                          r.Std.gt(u.get(e + c + 3), u.get(e)),
                        ),
                      ),
                    ),
                  )),
                  (v = r.Std.and(
                    v,
                    r.Std.and(
                      r.Std.ge(u.get(e + 1), u.get(e)),
                      r.Std.and(
                        r.Std.ge(u.get(e + 2), u.get(e)),
                        r.Std.and(
                          r.Std.ge(u.get(e + 3), u.get(e)),
                          r.Std.and(
                            r.Std.ge(u.get(e + 4), u.get(e)),
                            r.Std.gt(u.get(e + c + 4), u.get(e)),
                          ),
                        ),
                      ),
                    ),
                  ));
              var S = r.Std.or(_, r.Std.or(m, r.Std.or(g, r.Std.or(f, v))));
              return [r.Std.and(p, S), d];
            }),
              (this.main = function (e, t) {
                (this._context = e), (this._input = t);
                var i = this.f_0();
                return [
                  {value: i[0], offset: -this._input(0)},
                  {value: i[1], offset: -this._input(0)},
                ];
              });
          },
        },
        {
          name: "Guppy Multiple Moving Average",
          metainfo: {
            isTVScript: !1,
            isTVScriptStub: !1,
            is_hidden_study: !1,
            description: "Guppy Multiple Moving Average",
            shortDescription: "GMMA",
            is_price_study: !0,
            id: "Guppy Multiple Moving Average@tv-basicstudies-1",
            _metainfoVersion: 52,
            format: {type: "inherit"},
            defaults: {
              inputs: {
                traderEMA1Length: 3,
                traderEMA2Length: 5,
                traderEMA3Length: 8,
                traderEMA4Length: 10,
                traderEMA5Length: 12,
                traderEMA6Length: 15,
                investorEMA1Length: 30,
                investorEMA2Length: 35,
                investorEMA3Length: 40,
                investorEMA4Length: 45,
                investorEMA5Length: 50,
                investorEMA6Length: 60,
              },
              styles: {
                traderEMA1: {
                  color: "#00FFFF",
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 15,
                  visible: !0,
                },
                traderEMA2: {
                  color: "#00FFFF",
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 12,
                  visible: !0,
                },
                traderEMA3: {
                  color: "#00FFFF",
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 9,
                  visible: !0,
                },
                traderEMA4: {
                  color: "#00FFFF",
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 6,
                  visible: !0,
                },
                traderEMA5: {
                  color: "#00FFFF",
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 3,
                  visible: !0,
                },
                traderEMA6: {
                  color: "#00FFFF",
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                },
                investorEMA1: {
                  color: "#FF0000",
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 15,
                  visible: !0,
                },
                investorEMA2: {
                  color: "#FF0000",
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 12,
                  visible: !0,
                },
                investorEMA3: {
                  color: "#FF0000",
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 9,
                  visible: !0,
                },
                investorEMA4: {
                  color: "#FF0000",
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 6,
                  visible: !0,
                },
                investorEMA5: {
                  color: "#FF0000",
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 3,
                  visible: !0,
                },
                investorEMA6: {
                  color: "#FF0000",
                  linestyle: 0,
                  linewidth: 1,
                  plottype: 0,
                  trackPrice: !1,
                  transparency: 0,
                  visible: !0,
                },
              },
            },
            inputs: [
              {
                defval: 3,
                id: "traderEMA1Length",
                max: 1e3,
                min: 1,
                name: "Trader EMA 1 length",
                type: "integer",
              },
              {
                defval: 5,
                id: "traderEMA2Length",
                max: 1e3,
                min: 1,
                name: "Trader EMA 2 length",
                type: "integer",
              },
              {
                defval: 8,
                id: "traderEMA3Length",
                max: 1e3,
                min: 1,
                name: "Trader EMA 3 length",
                type: "integer",
              },
              {
                defval: 10,
                id: "traderEMA4Length",
                max: 1e3,
                min: 1,
                name: "Trader EMA 4 length",
                type: "integer",
              },
              {
                defval: 12,
                id: "traderEMA5Length",
                max: 1e3,
                min: 1,
                name: "Trader EMA 5 length",
                type: "integer",
              },
              {
                defval: 15,
                id: "traderEMA6Length",
                max: 1e3,
                min: 1,
                name: "Trader EMA 6 length",
                type: "integer",
              },
              {
                defval: 30,
                id: "investorEMA1Length",
                max: 1e3,
                min: 1,
                name: "Investor EMA 1 length",
                type: "integer",
              },
              {
                defval: 35,
                id: "investorEMA2Length",
                max: 1e3,
                min: 1,
                name: "Investor EMA 2 length",
                type: "integer",
              },
              {
                defval: 40,
                id: "investorEMA3Length",
                max: 1e3,
                min: 1,
                name: "Investor EMA 3 length",
                type: "integer",
              },
              {
                defval: 45,
                id: "investorEMA4Length",
                max: 1e3,
                min: 1,
                name: "Investor EMA 4 length",
                type: "integer",
              },
              {
                defval: 50,
                id: "investorEMA5Length",
                max: 1e3,
                min: 1,
                name: "Investor EMA 5 length",
                type: "integer",
              },
              {
                defval: 60,
                id: "investorEMA6Length",
                max: 1e3,
                min: 1,
                name: "Investor EMA 6 length",
                type: "integer",
              },
            ],
            plots: [
              {id: "traderEMA1", type: "line"},
              {id: "traderEMA2", type: "line"},
              {id: "traderEMA3", type: "line"},
              {id: "traderEMA4", type: "line"},
              {id: "traderEMA5", type: "line"},
              {id: "traderEMA6", type: "line"},
              {id: "investorEMA1", type: "line"},
              {id: "investorEMA2", type: "line"},
              {id: "investorEMA3", type: "line"},
              {id: "investorEMA4", type: "line"},
              {id: "investorEMA5", type: "line"},
              {id: "investorEMA6", type: "line"},
            ],
            styles: {
              traderEMA1: {
                histogramBase: 0,
                isHidden: !1,
                joinPoints: !1,
                title: "Trader EMA 1",
              },
              traderEMA2: {
                histogramBase: 0,
                isHidden: !1,
                joinPoints: !1,
                title: "Trader EMA 2",
              },
              traderEMA3: {
                histogramBase: 0,
                isHidden: !1,
                joinPoints: !1,
                title: "Trader EMA 3",
              },
              traderEMA4: {
                histogramBase: 0,
                isHidden: !1,
                joinPoints: !1,
                title: "Trader EMA 4",
              },
              traderEMA5: {
                histogramBase: 0,
                isHidden: !1,
                joinPoints: !1,
                title: "Trader EMA 5",
              },
              traderEMA6: {
                histogramBase: 0,
                isHidden: !1,
                joinPoints: !1,
                title: "Trader EMA 6",
              },
              investorEMA1: {
                histogramBase: 0,
                isHidden: !1,
                joinPoints: !1,
                title: "Investor EMA 1",
              },
              investorEMA2: {
                histogramBase: 0,
                isHidden: !1,
                joinPoints: !1,
                title: "Investor EMA 2",
              },
              investorEMA3: {
                histogramBase: 0,
                isHidden: !1,
                joinPoints: !1,
                title: "Investor EMA 3",
              },
              investorEMA4: {
                histogramBase: 0,
                isHidden: !1,
                joinPoints: !1,
                title: "Investor EMA 4",
              },
              investorEMA5: {
                histogramBase: 0,
                isHidden: !1,
                joinPoints: !1,
                title: "Investor EMA 5",
              },
              investorEMA6: {
                histogramBase: 0,
                isHidden: !1,
                joinPoints: !1,
                title: "Investor EMA 6",
              },
            },
          },
          constructor: function () {
            this.main = function (e, t) {
              (this._context = e), (this._input = t);
              var i = this._context.new_var(r.Std.close(this._context)),
                s = this._input(0),
                n = this._input(1),
                o = this._input(2),
                a = this._input(3),
                l = this._input(4),
                c = this._input(5),
                h = r.Std.ema(i, s, this._context),
                d = r.Std.ema(i, n, this._context),
                u = r.Std.ema(i, o, this._context),
                p = r.Std.ema(i, a, this._context),
                _ = r.Std.ema(i, l, this._context),
                m = r.Std.ema(i, c, this._context),
                g = this._input(6),
                f = this._input(7),
                v = this._input(8),
                S = this._input(9),
                y = this._input(10),
                b = this._input(11);
              return [
                h,
                d,
                u,
                p,
                _,
                m,
                r.Std.ema(i, g, this._context),
                r.Std.ema(i, f, this._context),
                r.Std.ema(i, v, this._context),
                r.Std.ema(i, S, this._context),
                r.Std.ema(i, y, this._context),
                r.Std.ema(i, b, this._context),
              ];
            };
          },
        },
      ];
    },
    33860: (e, t, i) => {
      "use strict";
      i.d(t, {PointsetsManager: () => n});
      var s = i(35001);
      const r = (0, i(65447).getLogger)("ChartApi.PointsetsManager");
      class n {
        constructor() {
          this._pointsetsDataBySymbol = new Map();
        }
        destroy() {
          this._pointsetsDataBySymbol.clear();
        }
        createPointset(e, t, i, s, n) {
          let o = this._pointsetsDataBySymbol.get(t);
          void 0 === o &&
            ((o = new Map()), this._pointsetsDataBySymbol.set(t, o));
          const a = [];
          for (const t of s) {
            const [i, s] = t;
            "number" != typeof i || Number.isNaN(i)
              ? r.logWarn(
                  `Pointset time is invalid: id=${e}, ${i} of type ${typeof i}`,
                )
              : a.push({
                  point: t,
                  extrapolation: n.extrapolateTimeWithOffsetToTime(1e3 * i, s),
                });
          }
          s.length === a.length && o.set(e, {resolution: i, points: a});
        }
        removePointset(e) {
          const t = [];
          this._pointsetsDataBySymbol.forEach((i, s) => {
            i.delete(e), 0 === i.size && t.push(s);
          });
          for (const e of t) this._pointsetsDataBySymbol.delete(e);
        }
        invalidatePointsetsForSymbol(e, t) {
          const i = this._pointsetsDataBySymbol.get(e);
          void 0 !== i &&
            i.forEach((e, i) => {
              if (s.Interval.isEqual(e.resolution, t))
                for (const t of e.points)
                  null !== t.extrapolation &&
                    t.extrapolation.exact &&
                    (t.extrapolation.exact = !1);
            });
        }
        getUpdatesForSymbol(e, t, i, s) {
          const r = new Map(),
            n = this._pointsetsDataBySymbol.get(e);
          return (
            void 0 !== n &&
              n.forEach((e, n) => {
                const o = this._refreshPointsetData(e, t, i, s);
                null !== o && r.set(n, o);
              }),
            r
          );
        }
        _refreshPointsetData(e, t, i, n) {
          if (s.Interval.isEqual(e.resolution, t))
            for (let t = 0; t < e.points.length; ++t) {
              const s = e.points[t];
              if (null !== s.extrapolation && s.extrapolation.exact) continue;
              const [r, n] = s.point;
              s.extrapolation = i.extrapolateTimeWithOffsetToTime(1e3 * r, n);
            }
          const o = [];
          for (let i = 0; i < e.points.length; ++i) {
            const s = e.points[i];
            if (null === s.extrapolation) return null;
            const a = n.indexOfTime(s.extrapolation.timeMs);
            if (null === a)
              return (
                r.logWarn(
                  `Cannot get index of time: time=${s.extrapolation.timeMs}, ${e.resolution} -> ${t}`,
                ),
                null
              );
            o.push({index: i, value: [a.index, a.timeMs / 1e3]});
          }
          return o;
        }
      }
    },
    66449: (e, t, i) => {
      "use strict";
      i.d(t, {SessionTimeScale: () => v});
      var s = i(16282),
        r = i(27490),
        n = i(84540),
        o = i(49382),
        a = i(63059),
        l = i(67620),
        c = i(33287);
      function h(e) {
        return 60 * e * 60 * 1e3;
      }
      function d(e) {
        return 60 * e * 1e3;
      }
      const u = [
        {divisor: 1, weight: 18},
        {divisor: ((p = 1), 1e3 * p), weight: 19},
        {divisor: d(1), weight: 20},
        {divisor: d(5), weight: 21},
        {divisor: d(30), weight: 22},
        {divisor: h(1), weight: 30},
        {divisor: h(3), weight: 31},
        {divisor: h(6), weight: 32},
        {divisor: h(12), weight: 33},
      ];
      var p;
      function _(e, t) {
        if (null !== t) {
          if (e.getUTCFullYear() !== t.getUTCFullYear()) return 70;
          if (e.getUTCMonth() !== t.getUTCMonth()) return 60;
          if (e.getUTCDate() !== t.getUTCDate()) return 50;
          const i = t.getTime(),
            s = e.getTime();
          for (let e = u.length - 1; e >= 0; --e)
            if (Math.floor(i / u[e].divisor) !== Math.floor(s / u[e].divisor))
              return u[e].weight;
        }
        return 18;
      }
      function m(e, t, i = 0) {
        if (0 === e.length) return [];
        let s = i,
          r = i;
        const n = [];
        for (; s < e.length; )
          r >= t.length
            ? (n.push({old: s, new: l.INVALID_TIME_POINT_INDEX}), s++)
            : e[s].timeMs === t[r].timeMs
            ? (s !== r && n.push({old: s, new: r}), s++, r++)
            : e[s].timeMs < t[r].timeMs
            ? (n.push({old: s, new: l.INVALID_TIME_POINT_INDEX}), s++)
            : r++;
        return n.sort((e, t) => {
          if (e.new === t.new && e.new === l.INVALID_TIME_POINT_INDEX)
            return e.old - t.old;
          if (e.new === l.INVALID_TIME_POINT_INDEX) return -1;
          if (t.new === l.INVALID_TIME_POINT_INDEX) return 1;
          const i = e.old - e.new,
            s = t.old - t.new;
          return i > 0
            ? s > 0
              ? e.old - t.old
              : -1
            : s < 0
            ? t.new - e.new
            : 1;
        });
      }
      function g(e, t) {
        return {span: e.markWeight, time: e.displayTime, index: t};
      }
      const f = r.enabled("end_of_period_timescale_marks");
      class v {
        constructor() {
          (this._completed = !0),
            (this._mainSymbolExtrapolator = null),
            (this._pointDataByTimePoint = new Map()),
            (this._seriesIds = new Set()),
            (this._displayTimezone = null),
            (this._minFutureBarsCount = 0),
            (this._sortedTimePoints = []);
        }
        destroy() {
          this.clearTimeScale();
        }
        setCompleted(e) {
          this._completed = e;
        }
        isCompleted() {
          return this._completed;
        }
        clearTimeScale() {
          return (
            this._pointDataByTimePoint.clear(),
            this._seriesIds.clear(),
            (this._sortedTimePoints = []),
            {
              baseIndex: null,
              pointsIndex: 0,
              indexChange: [],
              marks: [],
              points: [],
            }
          );
        }
        indexOfTime(e) {
          if (0 === this._sortedTimePoints.length)
            return null === this._mainSymbolExtrapolator
              ? null
              : this._mainSymbolExtrapolator.indexOfTime(e);
          if (e < this._sortedTimePoints[0].timeMs) {
            if (null === this._mainSymbolExtrapolator) return null;
            const t = this._mainSymbolExtrapolator.indexOfTime(e),
              i = this._mainSymbolExtrapolator.indexOfTime(
                this._sortedTimePoints[0].timeMs,
              );
            if (null === t || null === i) return null;
            let s = t.index - i.index;
            return (
              i.timeMs !== this._sortedTimePoints[0].timeMs && (s -= 1),
              {index: s, timeMs: t.timeMs}
            );
          }
          if (
            e > this._sortedTimePoints[this._sortedTimePoints.length - 1].timeMs
          ) {
            if (null === this._mainSymbolExtrapolator) return null;
            const t = this._mainSymbolExtrapolator.indexOfTime(e),
              i = this._mainSymbolExtrapolator.indexOfTime(
                this._sortedTimePoints[this._sortedTimePoints.length - 1]
                  .timeMs,
              );
            if (null === t || null === i) return null;
            const s = t.index - i.index - 1;
            return {index: this._sortedTimePoints.length + s, timeMs: t.timeMs};
          }
          let t = (0, o.lowerbound)(
            this._sortedTimePoints,
            e,
            (e, t) => e.timeMs < t,
          );
          return (
            this._sortedTimePoints[t].timeMs !== e && (t -= 1),
            {index: t, timeMs: this._sortedTimePoints[t].timeMs}
          );
        }
        setMainSymbolExtrapolator(e) {
          (this._mainSymbolExtrapolator = e),
            this._updateFutureBars(),
            this._fillPointsData(this._sortedTimePoints, 0);
        }
        setMinFutureBarsCount(e) {
          (this._minFutureBarsCount = e), this._updateFutureBars();
        }
        minFutureBarsCount() {
          return this._minFutureBarsCount;
        }
        firstFutureBarIndex() {
          return this._sortedTimePoints.length;
        }
        firstSessionBarIndex() {
          return 0 === this._sortedTimePoints.length ? null : 0;
        }
        lastSessionBarIndex() {
          return 0 === this._sortedTimePoints.length
            ? null
            : this._sortedTimePoints.length - 1;
        }
        tickMarks(e = 0) {
          const t = this.firstFutureBarIndex();
          (0, s.assert)(e <= t, "tickmarks cannot be filtered in the future");
          const i = this._futureBars().map((e, t) => ({
            timeMs: e,
            markWeight: 0,
            displayTime: NaN,
          }));
          this._fillPointsData(
            i,
            0,
            0 !== this._sortedTimePoints.length
              ? this._sortedTimePoints[this._sortedTimePoints.length - 1]
                  .displayTime
              : null,
          );
          const r = [];
          for (let t = e; t < this._sortedTimePoints.length; ++t)
            r.push(g(this._sortedTimePoints[t], t));
          const n = i.map((e, i) => g(e, i + t));
          return r.concat(n);
        }
        setTimezone(e) {
          (this._displayTimezone =
            "exchange" === e ? null : (0, n.get_timezone)(e)),
            this._fillPointsData(this._sortedTimePoints, 0);
        }
        fillIndexesInRows(e) {
          if (0 === e.length) return;
          let t = -1,
            i = (0, o.lowerbound)(
              this._sortedTimePoints,
              Math.round(1e3 * e[0].value[0]),
              (e, t) => e.timeMs < t,
            );
          for (const r of e) {
            const e = Math.round(1e3 * r.value[0]);
            for (
              ;
              i < this._sortedTimePoints.length &&
              this._sortedTimePoints[i].timeMs < e;

            )
              i += 1;
            (i !== this._sortedTimePoints.length &&
              this._sortedTimePoints[i].timeMs === e) ||
              (i -= 1),
              (0, s.assert)(i !== t, "data must have unique times"),
              (t = i),
              (r.index = i);
          }
          (0, s.assert)(
            i < this._sortedTimePoints.length,
            "data must be within a data range",
          );
        }
        convertTimesToIndexes(e) {
          if (0 === e.length) return [];
          let t = -1,
            i = (0, o.lowerbound)(
              this._sortedTimePoints,
              e[0],
              (e, t) => e.timeMs < t,
            );
          return e.map(e => {
            for (
              ;
              i < this._sortedTimePoints.length &&
              this._sortedTimePoints[i].timeMs < e;

            )
              i += 1;
            if (0 === i && e < this._sortedTimePoints[0].timeMs)
              return l.INVALID_TIME_POINT_INDEX;
            if (i >= this._sortedTimePoints.length) {
              const t = this.indexOfTime(e);
              if (null === t) return l.INVALID_TIME_POINT_INDEX;
              i = t.timeMs !== e ? t.index + 1 : t.index;
            }
            return (
              (0, s.assert)(i > t, "data must have unique sorted times"),
              (t = i),
              i
            );
          });
        }
        firstSeriesBarTime() {
          return 0 === this._sortedTimePoints.length
            ? null
            : this._sortedTimePoints[0].timeMs;
        }
        replaceSeriesBarsTimesTail(e, t) {
          if (0 === t.length) return null;
          if (!this._seriesIds.has(e)) return this.setSeriesBarsTimes(e, t);
          const i = [],
            s = (0, o.lowerbound)(
              this._sortedTimePoints,
              t[0],
              (e, t) => e.timeMs < t,
            );
          for (let t = s; t < this._sortedTimePoints.length; ++t) {
            const s = this._sortedTimePoints[t];
            s.pointData.series.delete(e) &&
              0 === s.pointData.series.size &&
              i.push(s);
          }
          const r = this._addBarsTimesToSeries(e, t, !0);
          this._cleanupPointsData(i);
          const n = r.map(e => ({
            timeMs: e.timeMs,
            pointData: e.pointData,
            markWeight: 0,
            displayTime: NaN,
          }));
          for (let e = s; e < this._sortedTimePoints.length; ++e) {
            const t = this._sortedTimePoints[e];
            0 !== t.pointData.series.size && n.push(t);
          }
          n.sort((e, t) => e.timeMs - t.timeMs);
          const a = this._updateTimeScalePointsTail(n);
          return this._applyTimeScaleChanges(a, !1);
        }
        setSeriesBarsTimes(e, t) {
          let i = 0 !== this._pointDataByTimePoint.size;
          if (this._seriesIds.has(e))
            if (1 === this._seriesIds.size)
              (i = !1), this._pointDataByTimePoint.clear();
            else
              for (const t of this._sortedTimePoints)
                t.pointData.series.delete(e);
          this._addBarsTimesToSeries(e, t, !1);
          const s = this._seriesIds.size;
          0 === t.length ? this._seriesIds.delete(e) : this._seriesIds.add(e),
            i && this._cleanupPointsData(this._sortedTimePoints);
          const r = s < this._seriesIds.size,
            n = s > this._seriesIds.size,
            o =
              (r && 2 === this._seriesIds.size) ||
              (n && 1 === this._seriesIds.size),
            a = [];
          this._pointDataByTimePoint.forEach((e, t) => {
            a.push({markWeight: 0, timeMs: t, displayTime: NaN, pointData: e});
          }),
            a.sort((e, t) => e.timeMs - t.timeMs);
          const l = this._updateTimeScalePoints(a);
          return this._applyTimeScaleChanges(l, o);
        }
        _updateFutureBars() {
          if (
            0 === this._minFutureBarsCount ||
            null === this._mainSymbolExtrapolator
          )
            return;
          if (0 !== this._sortedTimePoints.length) {
            const e =
              this._sortedTimePoints[this._sortedTimePoints.length - 1].timeMs;
            this._mainSymbolExtrapolator.ensureExtrapolatedToFutureTime(e);
          }
          const e = this._futureBarsFirstPointIndex();
          this._mainSymbolExtrapolator.setMinFutureBarsCount(
            e + this._minFutureBarsCount,
          );
        }
        _addBarsTimesToSeries(e, t, i) {
          const s = i ? [] : null;
          for (const i of t) {
            const t = this._pointDataByTimePoint.get(i);
            if (void 0 === t) {
              const t = new Set();
              t.add(e);
              const r = {index: 0, series: t};
              this._pointDataByTimePoint.set(i, r),
                null !== s && s.push({timeMs: i, pointData: r});
            } else t.series.add(e);
          }
          return s;
        }
        _futureBarsFirstPointIndex() {
          if (
            null === this._mainSymbolExtrapolator ||
            0 === this._sortedTimePoints.length
          )
            return 0;
          const e = this._mainSymbolExtrapolator.futureBars();
          return (0, o.upperbound_int)(
            e,
            this._sortedTimePoints[this._sortedTimePoints.length - 1].timeMs,
          );
        }
        _futureBars() {
          return null === this._mainSymbolExtrapolator
            ? []
            : this._mainSymbolExtrapolator
                .futureBars()
                .slice(
                  this._futureBarsFirstPointIndex(),
                  this._futureBarsFirstPointIndex() + 1e3,
                );
        }
        _cleanupPointsData(e) {
          for (const t of e)
            0 === t.pointData.series.size &&
              this._pointDataByTimePoint.delete(t.timeMs);
        }
        _updateTimeScalePoints(e) {
          let t = -1;
          for (
            let i = 0;
            i < this._sortedTimePoints.length && i < e.length;
            ++i
          ) {
            const s = this._sortedTimePoints[i],
              r = e[i];
            if (s.timeMs !== r.timeMs) {
              t = i;
              break;
            }
            (r.markWeight = s.markWeight), (r.displayTime = s.displayTime);
          }
          if (((t = S(t, this._sortedTimePoints.length, e.length)), -1 === t))
            return null;
          for (let i = t; i < e.length; ++i) {
            e[i].pointData.index = i;
          }
          this._fillPointsData(e, t);
          const i = m(this._sortedTimePoints, e, t);
          return (
            (this._sortedTimePoints = e),
            this._updateFutureBars(),
            {pointsIndex: t, indexChange: i}
          );
        }
        _updateTimeScalePointsTail(e) {
          if (0 === e.length) return null;
          const t = (0, o.lowerbound)(
            this._sortedTimePoints,
            e[0].timeMs,
            (e, t) => e.timeMs < t,
          );
          let i = -1;
          for (let s = 0; s < e.length; ++s) {
            const r = e[s],
              n = t + s;
            if (((r.pointData.index = n), n >= this._sortedTimePoints.length))
              continue;
            this._sortedTimePoints[n].timeMs !== r.timeMs &&
              -1 === i &&
              (i = n);
          }
          const s = t + e.length;
          if (((i = S(i, this._sortedTimePoints.length, s)), -1 === i))
            return null;
          this._fillPointsData(
            e,
            0,
            0 === t || 0 === this._sortedTimePoints.length
              ? null
              : this._sortedTimePoints[t - 1].displayTime,
          );
          const r = m(this._sortedTimePoints.slice(t), e).map(e => ({
            old: e.old + t,
            new: e.new === l.INVALID_TIME_POINT_INDEX ? e.new : e.new + t,
          }));
          {
            const i = this._sortedTimePoints;
            let r = 0;
            for (; t + r < i.length && r < e.length; )
              (i[t + r] = e[r]), (r += 1);
            for (; r < e.length; ++r) i.push(e[r]);
            i.length = s;
          }
          return this._updateFutureBars(), {pointsIndex: i, indexChange: r};
        }
        _getBaseIndex() {
          return 0 === this._sortedTimePoints.length
            ? null
            : this._sortedTimePoints.length - 1;
        }
        _fillPointsData(e, t, i = null) {
          this._fillDiplayTimeForPoints(e, t),
            (function (e, t = 0, i = null) {
              let s = 0 === t || 0 === e.length ? i : e[t - 1].displayTime,
                r = null !== s ? new Date(1e3 * s) : null,
                n = 0;
              for (let i = t; i < e.length; ++i) {
                const t = e[i],
                  o = new Date(1e3 * t.displayTime);
                (t.markWeight = _(o, r)),
                  (n += t.displayTime - (s || t.displayTime)),
                  (r = o),
                  (s = t.displayTime);
              }
              if (0 === t && e.length > 1 && null === i) {
                const t = Math.ceil(n / (e.length - 1)),
                  i = new Date(1e3 * (e[0].displayTime - t));
                e[0].markWeight = _(new Date(1e3 * e[0].displayTime), i);
              }
            })(e, t, i);
        }
        _applyTimeScaleChanges(e, t) {
          if (null === e)
            return t
              ? (this._fillPointsData(this._sortedTimePoints, 0),
                {
                  points: [],
                  pointsIndex: 0,
                  baseIndex: this._getBaseIndex(),
                  indexChange: [],
                  marks: this.tickMarks(0),
                })
              : null;
          let i = e.pointsIndex;
          if (
            (0 !== i &&
              t &&
              (this._fillPointsData(this._sortedTimePoints, 0), (i = 0)),
            0 === this._sortedTimePoints.length)
          )
            return {
              baseIndex: null,
              pointsIndex: 0,
              indexChange: [],
              marks: [],
              points: [],
            };
          const s = [];
          for (let t = e.pointsIndex; t < this._sortedTimePoints.length; ++t)
            s.push(this._sortedTimePoints[t].timeMs / 1e3);
          return {
            ...e,
            points: s,
            baseIndex: this._getBaseIndex(),
            marks: this.tickMarks(i),
          };
        }
        _fillDiplayTimeForPoints(e, t = 0) {
          if (null === this._mainSymbolExtrapolator) return;
          const i = this._mainSymbolExtrapolator.interval(),
            s = this._mainSymbolExtrapolator.barBuilder(),
            r = this._mainSymbolExtrapolator.symbolInfo(),
            o =
              null === this._displayTimezone
                ? (0, n.get_timezone)(r.timezone)
                : this._displayTimezone,
            l = 1 === this._seriesIds.size,
            h = i.isDWM(),
            d = h
              ? (0, a.createDwmAligner)(i.value(), {
                  timezone: r.timezone,
                  corrections: l ? r.corrections : void 0,
                  session_holidays: l ? r.session_holidays : void 0,
                  session: l ? r.session : "24x7",
                })
              : null,
            u = !h;
          for (let r = t; r < e.length; ++r) {
            let t = e[r].timeMs / 1e3;
            f && (t = (0, c.barTimeToEndOfPeriod)(s, t, i)),
              null !== d &&
                (t = Math.floor(d.timeToExchangeTradingDay(1e3 * t) / 1e3)),
              u && (t = Math.floor((0, n.utc_to_cal_ts)(o, 1e3 * t) / 1e3)),
              (e[r].displayTime = t);
          }
        }
      }
      function S(e, t, i) {
        return -1 === e && t !== i && (e = i < t ? Math.max(0, i - 1) : t), e;
      }
    },
    20291: (e, t, i) => {
      "use strict";
      var s = i(77848),
        r = i(77392),
        n = i(22241),
        o = i(89817).SymbolExtrapolator,
        a = i(66449).SessionTimeScale,
        l = i(33860).PointsetsManager,
        c = i(42062),
        h = i(63059).createDwmAligner,
        d = i(35001).Interval,
        u = i(18437),
        p = i(81447).visitObject,
        _ = i(47903).isObject;
      i(81137), i(98779);
      var m = i(10706).DatafeedRequestsCachedProcessor,
        g = i(94975).timezoneIsAvailable,
        f = i(63059).isAlignmentEnabled,
        v = i(89164),
        S = v.isEncodedExtendedSymbol,
        y = v.decodeExtendedSymbol,
        b = i(25436).extractSymbolNameFromSymbolInfo,
        w = i(81482).replaceGraphicsTimesWithTimePointIndexIndex,
        P = i(27490);
      function C(e) {
        var t = e.findIndex(function (e) {
          return -5e6 !== e.index;
        });
        return -1 === t ? [] : 0 === t ? e : e.slice(t);
      }
      function T(e, t) {
        return e + "_" + t;
      }
      var x = function (e) {
        var t = this;
        (this._studiesCache = {}),
          (this._objectsDataCache = {}),
          (this._studiesNonSeriesTimes = {}),
          (this._metainfoCache = []),
          (this._barsCoefficientsCache = {}),
          (this._externalDatafeed = e),
          e.getVolumeProfileResolutionForPeriod &&
            r.overwriteVolumeProfileResolutionForPeriodGetter(function (
              t,
              i,
              s,
              r,
            ) {
              return e.getVolumeProfileResolutionForPeriod(t, i, s, r);
            }),
          (this._datafeedConfiguration = null),
          (this._marketStatusWatchers = {}),
          (this._resolveRequests = {}),
          (this._resolvePromisesBySymbolId = new Map()),
          (this._symbolIdToSymbolRequestString = new Map()),
          (this._callbacks = {}),
          (this._serverTimeOffset = 0),
          t._logMessage(
            "Datafeed settings received: {0}".format(
              JSON.stringify(window.configurationData),
            ),
          ),
          (t._datafeedConfiguration = t._adoptConfigurationData(
            window.configurationData,
          )),
          t._fireEvent("configuration_received"),
          t._externalDatafeed.getServerTime &&
            t._externalDatafeed.getServerTime(function (e) {
              t._serverTimeOffset = e - new Date().valueOf() / 1e3;
            }),
          (this._invalidatedPointsetSessions = new Set()),
          (this._refreshPointsetsTimerId = null),
          (this._pointsetsManagers = {}),
          (this._quotesInfo = []),
          (this._depthInfo = []),
          (this._endOfData = {}),
          (this._computeStudyCounter = 0),
          (this._symbolExtrapolators = {}),
          (this._timeScales = {}),
          (this._cachedDatafeed = new m(
            e,
            this.serverTimeOffset.bind(this),
            this._datafeedConfiguration.reset_cache_timeout,
          )),
          n.setupFeed({
            resolve: function (e, i, s, r) {
              t._resolveSymbolByName(e, i, s, r);
            },
            subscribe: function (e, i, s, r, n) {
              return t._cachedDatafeed.subscribe(
                e,
                i,
                s,
                (function (e, i, s) {
                  var r = new c.SessionInfo(
                      e.timezone,
                      e.session,
                      e.session_holidays,
                      e.corrections,
                    ),
                    n = c.newBarBuilder(i, r, r);
                  return function (e) {
                    if (e && e.count()) {
                      var i = 1e3 * t.getCurrentUTCTime();
                      n.moveTo(i),
                        n.indexOfBar(i) >= 0 && e.setLastBarClosed(!1);
                    }
                    s(e);
                  };
                })(e, i, r),
                n,
              );
            },
            unsubscribe: function (e) {
              return t._cachedDatafeed.unsubscribe(e);
            },
          });
      };
      function I(e, t) {
        return e + "_" + t;
      }
      function M(e, t, i) {
        return e + (t ? "_#_" + t : "") + (i ? "_#_" + i : "");
      }
      (x.prototype._getSymbolExtrapolator = function (e, t, i) {
        var s = d.normalize(i),
          r = (function (e, t, i) {
            return e + "," + t.full_name + "," + i;
          })(e, t, s),
          n = this._symbolExtrapolators[r];
        return (
          void 0 === n &&
            ((n = new o(t, s)), (this._symbolExtrapolators[r] = n)),
          n
        );
      }),
        (x.prototype._barsCoefficients = function (e, t) {
          if (void 0 === y(e).type) return {};
          var i = e + t;
          return (
            this._barsCoefficientsCache[i] ||
              (this._barsCoefficientsCache[i] = {}),
            this._barsCoefficientsCache[i]
          );
        }),
        (x.prototype.destroy = function () {
          this._cachedDatafeed.destroy(),
            (this._externalDatafeed = null),
            Object.keys(this._pointsetsManagers).forEach(function (e) {
              this._pointsetsManagers[e].destroy();
            }, this),
            (this._pointsetsManagers = {});
        }),
        (x.prototype.purgeCache = function () {
          (this._endOfData = {}),
            (this._resolveRequests = {}),
            (this._objectsDataCache = {}),
            (this._studiesNonSeriesTimes = {}),
            (this._studiesCache = {}),
            this._resolvePromisesBySymbolId.clear(),
            this._symbolIdToSymbolRequestString.clear(),
            Object.keys(this._pointsetsManagers).forEach(function (e) {
              this._pointsetsManagers[e].destroy();
            }, this),
            (this._pointsetsManagers = {}),
            Object.keys(this._timeScales).forEach(function (e) {
              this._timeScales[e].destroy();
            }, this),
            (this._timeScales = {}),
            Object.keys(this._symbolExtrapolators).forEach(function (e) {
              this._symbolExtrapolators[e].destroy();
            }, this),
            (this._symbolExtrapolators = {});
        }),
        (x.prototype.purgeDataCache = function () {
          this._cachedDatafeed.purgeCache();
        }),
        (x.prototype._logMessage = function (e) {
          P.enabled("charting_library_debug_mode") && console.log(e);
        }),
        (x.prototype.on = function (e, t) {
          return (
            this._callbacks.hasOwnProperty(e) || (this._callbacks[e] = []),
            this._callbacks[e].push(t),
            this
          );
        }),
        (x.prototype._fireEvent = function (e, t, i) {
          if (this._callbacks.hasOwnProperty(e)) {
            for (var s = this._callbacks[e], r = 0; r < s.length; ++r) s[r](t);
            i || (this._callbacks[e] = []);
          }
        }),
        (x.prototype._adoptConfigurationData = function (e) {
          var t = TradingView.merge({}, e),
            i = t.supported_resolutions;
          if (!i || 0 === i.length)
            return (t.supported_resolutions = void 0), t;
          for (var s = [], r = 0; r < i.length; r++) {
            var n = i[r];
            if (-1 !== s.indexOf(n))
              throw new Error("Duplicating resolution `" + n + "`");
            s.push(n);
          }
          return (t.supported_resolutions = s), t;
        }),
        (x.prototype.supportedResolutions = function () {
          return this._datafeedConfiguration.supported_resolutions;
        }),
        (x.prototype.supportedCurrencies = function () {
          return this._datafeedConfiguration.currency_codes || [];
        }),
        (x.prototype.supportedUnits = function () {
          return this._datafeedConfiguration.units || [];
        }),
        (x.prototype.supportedSymbolsTypes = function () {
          return this._datafeedConfiguration.symbols_types || [];
        }),
        (x.prototype.supportedExchangesList = function () {
          return this._datafeedConfiguration.exchanges || [];
        }),
        (x.prototype.symbolsGrouping = function () {
          return (
            this._datafeedConfiguration.symbols_grouping || {futures: /$a/}
          );
        }),
        (x.prototype._findStudyObject = function (e) {
          e.endsWith("!") && (e = e.slice(0, -1));
          var t = e.split("@")[0],
            i = JSServer.studyLibrary.filter(function (i) {
              return i.metainfo.id === e || i.metainfo.shortDescription === t;
            });
          return 0 === i.length ? null : i[0];
        }),
        (x.prototype.getMarks = function (e, t, i, s, r) {
          var n = {red: 6, green: 5, blue: 4, yellow: 3};
          if (
            this._externalDatafeed.getMarks &&
            this._datafeedConfiguration.supports_marks
          ) {
            this._logMessage(
              "Requesting bars marks: symbol {0}, resolution {1}, range [{2} ... {3}]".format(
                e.full_name,
                r,
                new Date(1e3 * t).toUTCString(),
                new Date(1e3 * i).toUTCString(),
              ),
            );
            var o = this;
            this._externalDatafeed.getMarks(
              e,
              t,
              i,
              function (t) {
                var i = t.map(function (e) {
                  return (e.time = parseInt(e.time)), e;
                });
                o._logMessage(
                  "Received bars marks: symbol {0}, resolution {1}, marks {2}".format(
                    e.full_name,
                    r,
                    JSON.stringify(i),
                  ),
                );
                var a = h(r, e),
                  l = P.enabled("two_character_bar_marks_labels"),
                  c = i.map(function (e) {
                    return (
                      (e.tickmark =
                        null !== a
                          ? a.timeToSessionStart(1e3 * e.time) / 1e3
                          : e.time),
                      (e.direction = n[e.color]),
                      (e.onClicked = function () {
                        u.emit("onMarkClick", e.id);
                      }),
                      (e.label =
                        !!e.label && (l ? e.label.slice(0, 2) : e.label[0])),
                      e
                    );
                  });
                s(c);
              },
              r,
            );
          }
        }),
        (x.prototype.getTimescaleMarks = function (e, t, i, s, r) {
          if (
            this._externalDatafeed.getTimescaleMarks &&
            this._datafeedConfiguration.supports_timescale_marks
          ) {
            this._logMessage(
              "Requesting timescale marks: symbol {0}, resolution {1}, range [{2} ... {3}]".format(
                e.full_name,
                r,
                new Date(1e3 * t).toUTCString(),
                new Date(1e3 * i).toUTCString(),
              ),
            );
            var n = this;
            this._externalDatafeed.getTimescaleMarks(
              e,
              t,
              i,
              function (t) {
                n._logMessage(
                  "Received timescale marks: symbol {0}, resolution {1}, marks {2}".format(
                    e.full_name,
                    r,
                    JSON.stringify(t),
                  ),
                );
                var i = h(r, e),
                  o = t.map(function (e) {
                    return (
                      (e.tickmark =
                        null !== i
                          ? i.timeToSessionStart(1e3 * e.time) / 1e3
                          : e.time),
                      e
                    );
                  });
                s(o);
              },
              r,
            );
          }
        }),
        (x.prototype.getSeriesLastBarTime = function (e, t) {
          var i = this._getSeriesData(e, t);
          return null === i || 0 === i.length ? null : i[i.length - 1].timeMs;
        }),
        (x.prototype.getSeriesInterval = function (e, t) {
          var i = this._studiesCache[e][t];
          return i ? i.resolution : null;
        }),
        (x.prototype.getSeriesSymbolInfo = function (e, t) {
          var i = this._studiesCache[e][t];
          return i ? i.symbolInfo : null;
        }),
        (x.prototype.getSeriesInterval = function (e, t) {
          var i = this._studiesCache[e][t];
          return i ? i.resolution : null;
        }),
        (x.prototype.getSeriesSymbolInfo = function (e, t) {
          var i = this._studiesCache[e][t];
          return i ? i.symbolInfo : null;
        }),
        (x.prototype._getSeriesData = function (e, t) {
          return this._objectsDataCache[I(e, t)] || null;
        }),
        (x.prototype._computeStudy = async function (
          e,
          t,
          i,
          s,
          n,
          o,
          a,
          l,
          c,
          u,
        ) {
          var p = !0,
            _ = [];
          null !== l && (this._objectsDataCache[l] = null);
          var m = this._computeStudyCounter++;
          function g(e, t) {
            if (e < c()) return -5e6;
            if (0 === t) return 0;
            var i = _[t - 1].index;
            return -5e6 === i ? 0 : i + 1;
          }
          var v = new Map();
          var S = !1,
            y = this,
            b = function () {
              return (
                y._studiesCache[e] &&
                y._studiesCache[e][n] &&
                y._studiesCache[e][n].activeResolve === m
              );
            };
          y._studiesCache[e][n].activeResolve = m;
          var w,
            C,
            x = this._resolvePromisesBySymbolId.get(T(e, i));
          if (void 0 === x) throw new Error("This should never happen");
          try {
            var I = await x;
            (w = I.symbolInfo), (C = I.requestedSymbol);
          } catch (e) {
            return void (b() && u.onSymbolErrorCallback(e));
          }
          b() &&
            (function (i, c) {
              if (!d.parse(s).isIntraday() || i.has_intraday) {
                if (d.isDWM(s) && void 0 !== a.to) {
                  var m = h(s, i);
                  null !== m && (a.to = m.timeToExchangeTradingDay(a.to));
                }
                try {
                  var b = new r.StudyEngine({
                    tickerid: c,
                    symbolInfo: i,
                    period: s,
                    body: t,
                    sessionId: e,
                    onErrorCallback: u.onErrorCallback,
                    dataRange: a,
                    forceAlignBars:
                      !P.enabled("disable_sameinterval_aligning") && f(),
                    input: function (e) {
                      return o[e];
                    },
                    out: function (e, t) {
                      !(function (e, t, i) {
                        for (
                          var s = e.time,
                            r = "number" == typeof t ? [t] : t,
                            n = 0;
                          n < r.length;
                          ++n
                        ) {
                          var o = r[n];
                          o &&
                            "object" == typeof o &&
                            (v.set(n, o.offset), (o = o.value)),
                            "number" == typeof o && isNaN(o) && (o = void 0),
                            (r[n] = o);
                        }
                        var a = _.length - 1,
                          l = a < 0 || s > _[a].timeMs;
                        l
                          ? _.push({
                              index: g(s, _.length),
                              value: [s / 1e3].concat(r),
                              timeMs: s,
                            })
                          : ((_[a].index = g(s, a)),
                            (_[a].value = [s / 1e3].concat(r)),
                            (_[a].timeMs = s)),
                          p ||
                            u.onRealtimeCallback(
                              [_[_.length - 1]],
                              l,
                              _.length,
                              v,
                              i,
                            );
                      })(e, t, i);
                    },
                    nonseriesOut: function (e, t) {
                      u.onNonSeriesDataUpdate(t, i);
                    },
                    setNoMoreData: function () {
                      S = !0;
                    },
                    recalc: function (e, s) {
                      (p = !1),
                        (_.endOfData = S),
                        (t.error && null !== t.error()) ||
                          (null !== l && (y._objectsDataCache[l] = _),
                          u.onDataReadyCallback(_, v, i, s));
                    },
                  });
                  if (!y._studiesCache[e] || !y._studiesCache[e][n])
                    throw Error("This should never happen");
                  y._studiesCache[e][n].engine = b;
                } catch (e) {
                  if (!e.studyError) throw e;
                  u.onErrorCallback(e.message);
                }
              } else
                u.onErrorCallback(
                  "Unsupported resolution. Did you forget to set has_intraday to true?",
                );
            })(w, C);
        }),
        (x.prototype._createStudy = function (e, t, i, s, r, n, o, a) {
          var l = this;
          function c(e, t, i) {
            (e = C(e)),
              l._timeScales[s].fillIndexesInRows(e),
              TradingView.ChartapiMessagerInstances[s].onDataUpdate(r, n, e, t),
              TradingView.ChartapiMessagerInstances[s].onStudyCompleted(r, n);
          }
          function h(e) {
            var t = {};
            if (0 !== e.size) {
              var i = {},
                n = l._studiesCache[s][r].metainfo;
              e.forEach(function (e, t) {
                i[n.plots[t].id] = e;
              }),
                (t.data = {offsets: i});
            }
            return t;
          }
          (a = (function (e) {
            if (Array.isArray(e)) return e;
            for (
              var t = [], i = l._studiesCache[s][r].metainfo.inputs, n = 0;
              n < i.length;
              n++
            )
              t[n] = e[i[n].id];
            return t;
          })(a)),
            TradingView.ChartapiMessagerInstances[s].onStudyLoading(r, n);
          var d = null,
            u = !1;
          l._computeStudy(
            s,
            i,
            e,
            t,
            r,
            a,
            this._seriesDataRange(s, o),
            null,
            function () {
              if (null === d) {
                var e = l._getSeriesData(s, o)[0];
                if (void 0 === e) return 1 / 0;
                d = e.timeMs;
              }
              return d;
            },
            {
              onDataReadyCallback: function (e, t, i) {
                (u && 0 === e.length) || c(e, h(t));
              },
              onRealtimeCallback: function (e, t, i, o, a) {
                (e = C(e)),
                  l._timeScales[s].fillIndexesInRows(e),
                  TradingView.ChartapiMessagerInstances[s].onDataUpdate(
                    r,
                    n,
                    e,
                    h(o),
                  );
              },
              onSymbolErrorCallback: function () {
                TradingView.ChartapiMessagerInstances[s].onStudyError(
                  r,
                  n,
                  "error in series",
                );
              },
              onErrorCallback: function (e) {
                TradingView.ChartapiMessagerInstances[s].onStudyError(r, n, e);
              },
              onNonSeriesDataUpdate: function (e, t) {
                switch (((u = !0), e.type)) {
                  case "projection":
                    break;
                  case "study_graphics":
                    var i = {data: e.data, indexes: []},
                      n = w(i);
                    (l._studiesNonSeriesTimes[s][r] = n),
                      (i.indexes = l._timeScales[s].convertTimesToIndexes(n)),
                      c([], i);
                    break;
                  case "non_series_data":
                    n = (function (e) {
                      var t = {};
                      p(
                        e,
                        function (e) {
                          _(e) &&
                            Object.keys(e).forEach(function (i) {
                              i.endsWith("__t") && (t[e[i]] = !0);
                            });
                        },
                        {visitInstances: !0},
                      );
                      var i = Object.keys(t)
                        .map(Number)
                        .sort(function (e, t) {
                          return e - t;
                        });
                      return (
                        i.forEach(function (e, i) {
                          t[e] = i;
                        }),
                        Object.assign(
                          e,
                          p(
                            e,
                            function (e) {
                              return (
                                _(e) &&
                                  Object.keys(e).forEach(function (i) {
                                    i.endsWith("__t") &&
                                      (e[i.slice(0, -3)] = t[e[i]]);
                                  }),
                                e
                              );
                            },
                            {visitInstances: !0},
                          ),
                        ),
                        i
                      );
                    })((i = {data: e.data, indexes: []}));
                    (l._studiesNonSeriesTimes[s][r] = n),
                      (i.indexes = l._timeScales[s].convertTimesToIndexes(n)),
                      c([], i);
                    break;
                  default:
                    console.warn(
                      "unsupported non-series data type for study " + e.type,
                    );
                }
              },
            },
          );
        }),
        (x.prototype.onSessionSeriesError = function (e) {
          this.stopSources(e);
          var t = this._mainSeriesRecord(e);
          null !== t && (t.error = !0),
            this._applyTimeScaleUpdate(e, this._timeScales[e].clearTimeScale());
        }),
        (x.prototype.modifySeries = function (e, t, i, s, r) {
          var n = this._mainSeriesRecord(e);
          if (null === n || n.guid !== t) {
            if (null !== n && n.error)
              return (
                (this._studiesCache[e][t].symbolId = i),
                (this._studiesCache[e][t].resolution = s),
                void (this._studiesCache[e][t].turnaround = r)
              );
            for (var o in (this._stopSourcesTree(e, t),
            this.createSeries(e, t, r, i, s, {countBack: 0}, !0),
            this._studiesCache[e])) {
              var a = this._studiesCache[e][o];
              if (a && "study" === a.type && a.parentId === t) {
                this._studiesNonSeriesTimes[e][o] = null;
                var l = this._studiesCache[e][a.parentId];
                this._createStudy(
                  l.symbolId,
                  l.resolution,
                  a.studyObject,
                  e,
                  o,
                  a.turnaround,
                  a.parentId,
                  a.inputs,
                );
              }
            }
          } else this._modifyMainSeries(e, i, s, r);
        }),
        (x.prototype._modifyMainSeries = function (e, t, i, s) {
          this.stopSources(e);
          var r = this._mainSeriesRecord(e);
          for (var n in this._studiesCache[e]) {
            (o = this._studiesCache[e][n]) &&
              "series" === o.type &&
              (o.guid === r.guid
                ? this.createSeries(e, r.guid, s, t, i, {countBack: 0}, !0)
                : this.createSeries(
                    e,
                    o.guid,
                    o.turnaround,
                    o.symbolId,
                    i,
                    {countBack: 0},
                    !0,
                  ));
          }
          for (var n in this._studiesCache[e]) {
            var o;
            if ((o = this._studiesCache[e][n]) && "study" === o.type) {
              this._studiesNonSeriesTimes[e][n] = null;
              var a = this._studiesCache[e][o.parentId];
              this._createStudy(
                a.symbolId,
                a.resolution,
                o.studyObject,
                e,
                n,
                o.turnaround,
                o.parentId,
                o.inputs,
              );
            }
          }
          this._applyTimeScaleUpdate(e, this._timeScales[e].clearTimeScale());
        }),
        (x.prototype.stopSources = function (e) {
          for (var t in this._studiesCache[e]) {
            var i = this._studiesCache[e][t];
            i && "series" === i.type && this._stopSourcesTree(e, t);
          }
        }),
        (x.prototype._stopSourcesTree = function (e, t) {
          for (var i in this._studiesCache[e]) {
            var s = this._studiesCache[e][i];
            s &&
              (("series" === s.type && i === t) ||
                ("study" === s.type && s.parentId === t)) &&
              (s.engine && s.engine.isStarted() && s.engine.stop(),
              (s.activeResolve = -1));
          }
          n.unsubscribeUnused();
        }),
        (x.prototype._recreateSourcesForDataRange = function (e, t) {
          var i = [];
          for (var s in this._studiesCache[e]) {
            (r = this._studiesCache[e][s]) &&
              "series" === r.type &&
              !this._isEndOfData(e, s, r.turnaround) &&
              (this._stopSourcesTree(e, s), i.push(s));
          }
          for (var s in (i.forEach(function (i) {
            this._startSourcesTree(e, i, Object.assign({}, t));
          }, this),
          this._studiesCache[e])) {
            var r;
            "series" === (r = this._studiesCache[e][s]).type &&
              this._isEndOfData(e, s, r.turnaround) &&
              TradingView.ChartapiMessagerInstances[e].onSeriesCompleted(
                s,
                r.turnaround,
                r.engine.runner.host.symbolInfo.data_status,
              );
          }
          this._updateTimeScaleState(e);
        }),
        (x.prototype._startSourcesTree = function (e, t, i) {
          var s = this._studiesCache[e][t];
          for (var r in (this.createSeries(
            e,
            t,
            s.turnaround,
            s.symbolId,
            s.resolution,
            i,
            !0,
          ),
          this._studiesCache[e])) {
            var n = this._studiesCache[e][r];
            n &&
              "study" === n.type &&
              n.parentId === t &&
              this._createStudy(
                s.symbolId,
                s.resolution,
                n.studyObject,
                e,
                r,
                n.turnaround,
                n.parentId,
                n.inputs,
              );
          }
        }),
        (x.prototype.removeStudy = function (e, t) {
          this._studiesCache[e] &&
            this._studiesCache[e][t] &&
            this._studiesCache[e][t].engine &&
            (this._studiesCache[e][t].engine.stop(), n.unsubscribeUnused()),
            delete this._studiesCache[e][t],
            delete this._studiesNonSeriesTimes[e][t];
        }),
        (x.prototype.removeSeries = function (e, t) {
          this._stopSourcesTree(e, t),
            delete this._studiesCache[e][t],
            this._updateMainTsBuilder(e),
            this._timeScales[e].isCompleted() &&
              this._timeScales[e].setCompleted(!1);
          var i = this._timeScales[e].setSeriesBarsTimes(t, []);
          this._applyTimeScaleUpdate(e, i), this._updateTimeScaleState(e);
        }),
        (x.prototype.modifyStudy = function (e, t, i, s) {
          var r = this._studiesCache[e][t];
          if (!r) throw Error("This should never happen");
          var o = this._studiesCache[e][r.parentId];
          (r.inputs = s),
            (r.turnaround = i),
            r.engine && (r.engine.stop(), n.unsubscribeUnused()),
            (this._studiesNonSeriesTimes[e][t] = null),
            this._createStudy(
              o.symbolId,
              o.resolution,
              r.studyObject,
              e,
              t,
              i,
              r.parentId,
              s,
            );
        }),
        (x.prototype.createStudy = function (e, t, i, s, r, n) {
          var o = this._studiesCache[e][i],
            a = this._findStudyObject(r);
          if (null === a)
            return (
              console.warn("Study does not exist: " + r),
              void TradingView.ChartapiMessagerInstances[e].onStudyError(
                t,
                s,
                "unknown study name",
              )
            );
          var l = new a.constructor();
          (this._studiesCache[e] = this._studiesCache[e] || {}),
            (this._studiesCache[e][t] = {
              studyObject: l,
              guid: t,
              type: "study",
              inputs: n,
              metainfo: a.metainfo,
              turnaround: s,
              parentId: i,
            }),
            (this._studiesNonSeriesTimes[e][t] = null),
            this._createStudy(o.symbolId, o.resolution, l, e, t, s, i, n);
        }),
        (x.prototype.sessionTimeScale = function (e) {
          return this._timeScales[e] || null;
        }),
        (x.prototype.isTimeScaleExtendedTo = function (e, t) {
          var i = this._mainSeriesRecord(e);
          if (d.isDWM(i.resolution) && null != i.symbolInfo) {
            var s = h(i.resolution, i.symbolInfo);
            null !== s && (t = s.timeToSessionStart(t));
          }
          var r = this._timeScales[e].indexOfTime(t);
          return null !== r && r.index >= 0;
        }),
        (x.prototype.ensureExtendedTo = function (e, t, i) {
          if (!this._studiesCache[t][e])
            throw Error("This should never happen");
          var s = this;
          setTimeout(function () {
            s._recreateSourcesForDataRange(t, {to: i});
          }, 0);
        }),
        (x.prototype.extendSeriesRange = function (e, t) {
          var i = this._timeScales[e].firstSeriesBarTime();
          if (null !== i) {
            var s = this._mainSeriesRecord(e);
            if (d.isDWM(s.resolution) && null != s.symbolInfo) {
              var r = h(s.resolution, s.symbolInfo);
              null !== r && (i = r.timeToExchangeTradingDay(i));
            }
            var n = this._symbolIdToSymbolRequestString.get(T(e, s.symbolId)),
              o = this._barsCoefficients(n, s.resolution),
              a = o.barsCoefficient || 1;
            if (!o.barsCoefficient) {
              var l = this._getSeriesData(e, s.guid);
              null !== l && (o.expectedBarsCount = l.length + t);
            }
            var c = this;
            setTimeout(function () {
              c._recreateSourcesForDataRange(e, {
                to: i,
                countBack: (t + 2) * a,
              });
            }, 0);
          } else
            this._logMessage(
              "Nothing to extend - there is no points on time scale",
            );
        }),
        (x.prototype.seriesTurnaround = function (e, t) {
          return (
            this._studiesCache[e] &&
            this._studiesCache[e][t] &&
            this._studiesCache[e][t].turnaround
          );
        }),
        (x.prototype._seriesDataRange = function (e, t) {
          var i = this._studiesCache[e][t];
          return null !== i.firstLoadedTimeMs
            ? {to: i.firstLoadedTimeMs, countBack: 0}
            : i.dataRange;
        }),
        (x.prototype._applyTimeScaleUpdate = function (e, t) {
          if (null !== t) {
            var i = [];
            for (var s in this._studiesCache[e]) {
              var r = this._studiesCache[e][s];
              if (r && "study" === r.type) {
                var n = this._studiesNonSeriesTimes[e][s];
                if (n) {
                  var o = {
                    indexes: this._timeScales[e].convertTimesToIndexes(n),
                    data: {indexes_replace: !0},
                  };
                  i.push({
                    objId: s,
                    turnaround: r.turnaround,
                    data: [],
                    nonSeriesData: o,
                  });
                }
              }
            }
            TradingView.ChartapiMessagerInstances[e].onTimescaleUpdate(t, i),
              Promise.resolve().then(
                function () {
                  var t = this._mainSeriesRecord(e);
                  if (null !== t && null != t.symbolInfo) {
                    var i = this._getSymbolExtrapolator(
                      e,
                      t.symbolInfo,
                      t.resolution,
                    );
                    this._pointsetsManagers[e]
                      .getUpdatesForSymbol(
                        t.symbolInfo.full_name,
                        t.resolution,
                        i,
                        this._timeScales[e],
                      )
                      .forEach(function (t, i) {
                        TradingView.ChartapiMessagerInstances[
                          e
                        ].onPointsetDataUpdate(i, null, t);
                      });
                  }
                }.bind(this),
              );
          }
        }),
        (x.prototype._updateMainTsBuilder = function (e) {
          var t = this._mainSeriesRecord(e);
          if (null !== t && null != t.symbolInfo) {
            var i = this._getSymbolExtrapolator(e, t.symbolInfo, t.resolution);
            this._timeScales[e].setMainSymbolExtrapolator(i);
          }
        }),
        (x.prototype._updateTimeScaleState = function (e) {
          var t = !0,
            i = !0;
          for (var s in this._studiesCache[e]) {
            var r = this._studiesCache[e][s];
            "series" === r.type &&
              ((i = i && this._isEndOfData(e, s, r.turnaround)),
              (t = t && r.completed));
          }
          this._timeScales[e].isCompleted() !== t &&
            (this._timeScales[e].setCompleted(t),
            t &&
              TradingView.ChartapiMessagerInstances[e].onTimescaleCompleted(i));
        }),
        (x.prototype._mainSeriesRecord = function (e) {
          var t = null,
            i = null;
          for (var s in this._studiesCache[e]) {
            var r = this._studiesCache[e][s];
            if ("series" === r.type && (null === t && (t = r), r.isMain)) {
              i = r;
              break;
            }
          }
          return null === i && (i = t), null !== i && (i.isMain = !0), i;
        }),
        (x.prototype._seriesCount = function (e) {
          var t = 0;
          for (var i in this._studiesCache[e]) {
            "series" === this._studiesCache[e][i].type && (t += 1);
          }
          return t;
        }),
        (x.prototype._prepareSeriesNonSeriesData = function (e, t, i) {
          var s = i.data[i.data.length - 1],
            r = this._getSeriesData(e, t),
            n = null === r ? [] : i.data;
          return {
            data: {
              data: {
                reversalAmount: i.reversalAmount,
                boxSize: i.boxSize,
                price: s ? s[4] : i.price,
                bars: n.map(function (e, t) {
                  return {
                    time: t,
                    open: e[1],
                    high: e[2],
                    low: e[3],
                    close: e[4],
                    volume: e[5],
                    factor: e[6],
                    additionalPrice: e[6],
                  };
                }),
              },
            },
            indexes: this._timeScales[e].convertTimesToIndexes(
              n.map(function (e) {
                var t = e[0] || 0;
                return t < 0 ? r[r.length + t].timeMs : i.projectionTime + t;
              }),
            ),
          };
        }),
        (x.prototype.createSeries = function (e, t, i, s, n, o, a) {
          this._setEndOfData(e, t, i, !1);
          var l = new r.OHLCV();
          this._studiesCache[e] = this._studiesCache[e] || {};
          var c = this._getSeriesData(e, t),
            h = this._studiesCache[e][t],
            u = this._seriesCount(e),
            p = this._mainSeriesRecord(e);
          if (!h || (d.isEqual(h.resolution, n) && h.symbolId === s))
            void 0 !== o.countBack &&
              null !== c &&
              0 !== c.length &&
              (o.to = c[0].timeMs),
              h && null != h.firstLoadedTimeMs
                ? (o.to =
                    void 0 !== o.to
                      ? Math.min(h.firstLoadedTimeMs, o.to)
                      : h.firstLoadedTimeMs)
                : h ||
                  0 === u ||
                  (null !== p &&
                    (null != p.firstLoadedTimeMs
                      ? ((o.to = p.firstLoadedTimeMs), (o.countBack = 0))
                      : (o = Object.assign({}, p.dataRange))));
          else if (1 === u)
            void 0 !== o.countBack && null !== c && (o.countBack += c.length);
          else {
            var _ = this._timeScales[e].firstSeriesBarTime();
            (void 0 === o.to || (null !== _ && _ < o.to)) &&
              ((o.to = _), (o.countBack = 0));
          }
          if (
            (void 0 === o.countBack && (o.countBack = 0),
            void 0 === o.to && 0 === o.countBack && (o.countBack = 100),
            (this._studiesCache[e][t] = {
              symbolId: s,
              resolution: n,
              studyObject: l,
              guid: t,
              type: "series",
              turnaround: i,
              dataRange: o,
              firstLoadedTimeMs: null,
              symbolInfo: null,
              isMain: (h && h.isMain) || 0 === u,
              completed: !1,
            }),
            null === p || p.guid === t || !p.error)
          ) {
            this._updateMainTsBuilder(e),
              this._updateTimeScaleState(e),
              TradingView.ChartapiMessagerInstances[e].onSeriesLoading(t, i);
            var m = this;
            this._computeStudy(
              e,
              l,
              s,
              n,
              t,
              [],
              o,
              I(e, t),
              function () {
                return -1 / 0;
              },
              {
                onDataReadyCallback: function (r, o, l, c) {
                  var h = m._studiesCache[e][t];
                  if (!h) throw Error("This should never happen");
                  if (
                    ((h.symbolInfo = l),
                    (h.firstLoadedTimeMs = c.firstLoadedTimeMs),
                    (h.completed = !0),
                    m._updateMainTsBuilder(e),
                    a &&
                      m._pointsetsManagers[e].invalidatePointsetsForSymbol(
                        l.full_name,
                        n,
                      ),
                    0 !== r.length)
                  ) {
                    var d = m._symbolIdToSymbolRequestString.get(T(e, s)),
                      u = m._barsCoefficients(d, n);
                    u.expectedBarsCount &&
                      u.barsCount &&
                      (u.barsCoefficient = Math.min(
                        Math.max(
                          u.barsCoefficient || 1,
                          parseInt(
                            u.expectedBarsCount / (r.length - u.barsCount) +
                              0.5,
                          ),
                        ),
                        100,
                      )),
                      (u.barsCount = r.length),
                      m._clearSeriesData(e, t);
                  } else
                    !c.endOfData &&
                      h.isMain &&
                      setTimeout(function () {
                        m._studiesCache[e] &&
                          m._recreateSourcesForDataRange(e, {countBack: 10});
                      }, 0);
                  g(l),
                    c.endOfData &&
                      (m._logMessage(
                        "Series has no more data on server: {0}".format(
                          l.full_name,
                        ),
                      ),
                      m._setEndOfData(e, t, i)),
                    0 === r.length && m._clearSeriesData(e, t),
                    TradingView.ChartapiMessagerInstances[e].onSeriesCompleted(
                      t,
                      i,
                      l.data_status,
                    ),
                    m._updateTimeScaleState(e);
                },
                onRealtimeCallback: function (s, r, n, o, a) {
                  g(a, s), m._timeScales[e].fillIndexesInRows(s);
                  var l = s[s.length - 1];
                  if (r) {
                    if (!m._studiesCache[e][t])
                      throw Error("This should never happen");
                    m._logMessage(
                      "New bar arrived: symbol {0}, bar {1}".format(
                        a.full_name,
                        JSON.stringify(l),
                      ),
                    );
                  } else
                    m._logMessage(
                      "Last bar update: symbol {0}, bar {1}".format(
                        a.full_name,
                        JSON.stringify(l),
                      ),
                    ),
                      TradingView.ChartapiMessagerInstances[e].onDataUpdate(
                        t,
                        i,
                        s,
                        null,
                      );
                  m._fireEvent("realtime_tick", s[s.length - 1], !0);
                },
                onSymbolErrorCallback: function (t) {
                  m._logMessage("Series symbol resolve error"),
                    TradingView.ChartapiMessagerInstances[e].onSymbolError(
                      s,
                      t || "resolve error",
                    ),
                    f(t || "resolve error");
                },
                onErrorCallback: function (e) {
                  m._logMessage("Series error: " + e), f(e);
                },
                onNonSeriesDataUpdate: function (s, r) {
                  if ("projection" !== s.type)
                    throw new Error(
                      "unexpected non-series data type for series " + s.type,
                    );
                  var n = m._getSeriesData(e, t);
                  if (null !== n)
                    g(r, 0 === n.length ? void 0 : [n[n.length - 1]], s);
                  else {
                    s = m._prepareSeriesNonSeriesData(e, t, s);
                    TradingView.ChartapiMessagerInstances[e].onDataUpdate(
                      t,
                      i,
                      [],
                      s,
                    );
                  }
                },
              },
            );
          }
          function g(s, r, o) {
            var a = [];
            if (void 0 !== o) {
              var l = (o.data || []).reduce(function (e, t) {
                return Math.max(e, t[0] || 0);
              }, -1);
              if (null != o.projectionTime)
                for (var c = 0; c <= l; ++c) a.push(o.projectionTime + c);
            }
            var h = null,
              d = null,
              u = s ? m._getSymbolExtrapolator(e, s, n) : null;
            if (void 0 !== r) {
              var p = r
                .map(function (e) {
                  return e.timeMs;
                })
                .concat(a);
              null !== u && u.replaceBarsTimesTail(p, r.length),
                (d = m._timeScales[e].replaceSeriesBarsTimesTail(t, p)),
                (h = r);
            } else {
              var _ = m._getSeriesData(e, t) || [],
                g = _.map(function (e) {
                  return e.timeMs;
                }).concat(a);
              null !== u && u.setBarsTimes(g, _.length),
                (d = m._timeScales[e].setSeriesBarsTimes(t, g)),
                (h = _);
            }
            if (
              (m._applyTimeScaleUpdate(e, d), 0 !== h.length || void 0 !== o)
            ) {
              m._timeScales[e].fillIndexesInRows(h);
              var f =
                void 0 !== o ? m._prepareSeriesNonSeriesData(e, t, o) : null;
              TradingView.ChartapiMessagerInstances[e].onDataUpdate(t, i, h, f);
            }
          }
          function f(s) {
            var r = m._studiesCache[e][t];
            (r.completed = !0),
              TradingView.ChartapiMessagerInstances[e].onSeriesError(t, i, s),
              P.enabled("clear_bars_on_series_error") &&
                (r.isMain
                  ? m.onSessionSeriesError(e)
                  : m._clearSeriesData(e, t));
          }
        }),
        (x.prototype._clearSeriesData = function (e, t) {
          var i = {};
          for (var s in ((i[t] = {
            turnaround: this._studiesCache[e][t].turnaround,
          }),
          this._studiesCache[e])) {
            var r = this._studiesCache[e][s];
            "study" === r.type &&
              r.parentId === t &&
              (i[s] = {turnaround: r.turnaround});
          }
          TradingView.ChartapiMessagerInstances[e].onClearData(i);
        }),
        (x.prototype.requestMoreTickmarks = function (e, t) {
          var i = this._timeScales[e];
          i.setMinFutureBarsCount(i.minFutureBarsCount() + t);
          var s = i.firstFutureBarIndex(),
            r = i.tickMarks(s);
          TradingView.ChartapiMessagerInstances[e].onTickmarksUpdated(s, r);
        }),
        (x.prototype.chartCreateSession = function (e) {
          (this._pointsetsManagers[e] = new l()),
            (this._timeScales[e] = new a()),
            (this._studiesNonSeriesTimes[e] = {});
        }),
        (x.prototype.chartDeleteSession = function (e) {
          this._pointsetsManagers[e].destroy(),
            delete this._pointsetsManagers[e],
            this._timeScales[e].destroy(),
            delete this._timeScales[e],
            delete this._studiesNonSeriesTimes[e];
        }),
        (x.prototype.removePointset = function (e, t) {
          this._pointsetsManagers[e].removePointset(t);
        }),
        (x.prototype.createPointset = async function (e, t, i, s, r) {
          var n,
            o = this._resolvePromisesBySymbolId.get(T(e, i));
          try {
            n = (await o).symbolInfo;
          } catch (e) {
            return;
          }
          var a = this._getSymbolExtrapolator(e, n, s);
          if (
            (this._pointsetsManagers[e].createPointset(t, n.full_name, s, r, a),
            null === this._refreshPointsetsTimerId)
          ) {
            var l = this;
            this._refreshPointsetsTimerId = setTimeout(function () {
              (l._refreshPointsetsTimerId = null),
                l._refreshPointsets(l._invalidatedPointsetSessions),
                l._invalidatedPointsetSessions.clear();
            }, 0);
          }
          this._invalidatedPointsetSessions.add(e);
        }),
        (x.prototype._refreshPointsets = function (e) {
          var t = this;
          e.forEach(function (e) {
            var i = t._studiesCache[e];
            if (null != i) {
              var s = null;
              for (var r in i) {
                var n = i[r];
                if ("series" === n.type) {
                  s = n;
                  break;
                }
              }
              if (null !== s && null != s.symbolInfo) {
                var o = t._getSymbolExtrapolator(e, s.symbolInfo, s.resolution);
                t._pointsetsManagers[e]
                  .getUpdatesForSymbol(
                    s.symbolInfo.full_name,
                    s.resolution,
                    o,
                    t._timeScales[e],
                  )
                  .forEach(function (t, i) {
                    TradingView.ChartapiMessagerInstances[
                      e
                    ].onPointsetDataUpdate(i, null, t);
                  });
              }
            }
          });
        }),
        (x.prototype.studiesMetadata = function () {
          return (
            0 === this._metainfoCache.length &&
              ((this._metainfoCache = JSServer.studyLibrary.map(function (e) {
                return e.metainfo;
              })),
              this._metainfoCache.push({
                palettes: {},
                inputs: [],
                plots: [
                  {id: "open", type: "line"},
                  {id: "high", type: "line"},
                  {id: "low", type: "line"},
                  {id: "close", type: "line"},
                  {id: "volume", type: "line"},
                ],
                graphics: {},
                _metainfoVersion: 48,
                description: "Unnamed Study",
                format: {type: "inherit"},
                is_hidden_study: !0,
                is_price_study: !1,
                shortDescription: "Unnamed Study",
                description_localized: "Unnamed Study",
                id: "BarSetHeikenAshi@tv-prostudies",
                shortId: "BarSetHeikenAshi",
                packageId: "tv-basicstudies",
                version: "13",
                fullId: "BarSetHeikenAshi@tv-basicstudies-13",
                productId: "tv-basicstudies",
                name: "BarSetHeikenAshi@tv-basicstudies",
              })),
            this._metainfoCache
          );
        }),
        (x.prototype.searchSymbols = function (e, t, i, s) {
          this._logMessage(
            "Symbol search requested: search string `{0}`, exchange: `{1}`, type `{2}`".format(
              e,
              t,
              i,
            ),
          );
          var r = this;
          this._externalDatafeed.searchSymbols(e, t, i, function (e) {
            r._logMessage(
              "Symbol search response: {0}".format(JSON.stringify(e)),
            ),
              s(e);
          });
        }),
        (x.prototype.resolveSymbol = function (e, t, i) {
          var s = this;
          this._symbolIdToSymbolRequestString.set(T(e, t), i),
            this._resolvePromisesBySymbolId.set(
              T(e, t),
              new Promise(function (r, n) {
                s._resolveSymbolImpl(
                  i,
                  function (s) {
                    TradingView.ChartapiMessagerInstances[e].onSymbolResolved(
                      t,
                      s,
                    ),
                      r({symbolInfo: s, requestedSymbol: i});
                  },
                  function (i) {
                    TradingView.ChartapiMessagerInstances[e].onSymbolError(
                      t,
                      i,
                    ),
                      n(i);
                  },
                );
              }),
            );
        }),
        (x.prototype._resolveSymbolImpl = function (e, t, i) {
          S(e) ||
            console.error(
              "Expect to get symbol encoded string, but got the following instead: " +
                e,
            );
          var s = y(e),
            r = "string" == typeof s.symbol ? s : s.symbol,
            n = r.symbol,
            o = r["currency-id"],
            a = r["unit-id"];
          this._resolveSymbolByName(n, {currency: o, unit: a}, t, i);
        }),
        (x.prototype._resolveSymbolByName = function (e, t, i, s) {
          var r,
            n = t && t.currency,
            o = t && t.unit,
            a = M(e, n, o);
          if (this._resolveRequests[a]) r = this._resolveRequests[a];
          else {
            (r = this._resolveSymbolInternal(e, n || void 0, o || void 0)),
              (this._resolveRequests[a] = r);
            var l = this;
            r.then(function (t) {
              (l._resolveRequests[M(e, t.currency_id, t.unit_id)] = r),
                (l._resolveRequests[M(b(t, null), t.currency_id, t.unit_id)] =
                  r),
                (l._resolveRequests[M(b(t, null), n, o)] = r);
            }).catch(function () {});
          }
          r.then(i).catch(s);
        }),
        (x.prototype._resolveSymbolInternal = function (e, t, i) {
          var s = this;
          return new Promise(
            function (r, n) {
              this._logMessage("Symbol resolve requested: `{0}` ".format(e));
              var o = !0;
              this._externalDatafeed.resolveSymbol(
                e,
                function (t) {
                  o &&
                    console.warn(
                      "`resolveSymbol` should return result asynchronously. Use `setTimeout` with 0 interval to execute the callback function.",
                    ),
                    s._logMessage(
                      "Symbol resolved: `{0}`, SymbolInfo in server response {1}".format(
                        e,
                        JSON.stringify(t),
                      ),
                    ),
                    (function (e) {
                      if (
                        (e.base_name || (e.base_name = [e.name]),
                        e.legs || (e.legs = [e.name]),
                        e.exchange || (e.exchange = e["exchange-listed"]),
                        e.full_name ||
                          (e.full_name =
                            e.symbol ||
                            (e.exchange ? e.exchange + ":" + e.name : e.name)),
                        e.pro_name || (e.pro_name = e.full_name),
                        e.data_status || (e.data_status = "streaming"),
                        e.ticker || (e.ticker = e.symbol || e.name),
                        !e.session &&
                          e["session-regular"] &&
                          (e.session = e["session-regular"]),
                        !e.minmov &&
                          e.minmovement &&
                          (e.minmov = e.minmovement),
                        e.currency_code && (e.currency_id = e.currency_code),
                        e.original_currency_code &&
                          (e.original_currency_id = e.original_currency_code),
                        e.holidays && (e.session_holidays = e.holidays),
                        void 0 !== e.has_no_volume &&
                          (e.visible_plots_set = e.has_no_volume
                            ? "ohlc"
                            : "ohlcv"),
                        e.supported_resolutions)
                      )
                        for (
                          var t = 0;
                          t < e.supported_resolutions.length;
                          t++
                        ) {
                          var i = d.parse(e.supported_resolutions[t]);
                          i.isValid() &&
                            (e.supported_resolutions[t] = i.value());
                        }
                    })(t),
                    (function (e) {
                      function t(e) {
                        console.warn("SymbolInfo validation: " + e);
                      }
                      if (
                        (e.has_empty_bars &&
                          !f() &&
                          t(
                            'both has_empty_bars field and featureset "disable_resolution_rebuild" are enabled and may cause data issues (see #3329)',
                          ),
                        (void 0 === e.minmov || e.minmov <= 0) &&
                          t("minmov must be positive"),
                        (void 0 === e.pricescale || e.pricescale <= 0) &&
                          t("pricescale must be positive"),
                        (void 0 !== e.name && 0 !== e.name.length) ||
                          t("name must be non-empty string"),
                        (void 0 !== e.session && 0 !== e.session.length) ||
                          t("session must be non-empty string"),
                        void 0 !== e.holidays &&
                          t(
                            "field holidays is deprecated, use session_holidays instead",
                          ),
                        void 0 !== e.has_no_volume &&
                          t(
                            "field has_no_volume is deprecated, use visible_plots_set instead",
                          ),
                        void 0 === e.timezone || 0 === e.timezone.length
                          ? t("timezone must be non-empty string")
                          : ("exchange" !== e.timezone && g(e.timezone)) ||
                            ("UTC" !== e.timezone &&
                              t(
                                'unsupported timezone "{0}"'.format(e.timezone),
                              )),
                        void 0 !== e.intraday_multipliers)
                      ) {
                        var i = e.intraday_multipliers;
                        if (Array.isArray(i))
                          for (var s = 0; s < i.length; ++s)
                            "string" != typeof i[s] &&
                              t(
                                'intraday_multipliers[{0}] = "{1}" must be string (now: {2})'.format(
                                  s + 1,
                                  i[s],
                                  typeof i[s],
                                ),
                              );
                        else t("intraday_multipliers must be array");
                      }
                      (e.supported_resolutions || [])
                        .filter(function (e) {
                          return !d.isValid(e);
                        })
                        .forEach(function (e) {
                          t(
                            "supported_resolutions field contains invalid value: " +
                              e,
                          );
                        });
                    })(t),
                    s._logMessage(
                      "Symbol info after post-processing: `{0}`, SymbolInfo {1}".format(
                        e,
                        JSON.stringify(t),
                      ),
                    ),
                    r(t);
                },
                function (t) {
                  s._logMessage(
                    "Symbol resolve failed: `{0}`, reason: `{1}`".format(e, t),
                  ),
                    n(t);
                },
                {currencyCode: t, unitId: i},
              ),
                (o = !1);
            }.bind(this),
          );
        }),
        (x.prototype._createMarketStatusWatchers = function (e, t) {
          void 0 === this._marketStatusWatchers[e] &&
            (this._marketStatusWatchers[e] = {});
          var i = this;
          t.forEach(function (t) {
            void 0 === i._marketStatusWatchers[e][t] &&
              (i._marketStatusWatchers[e][t] = new s(
                i._resolveSymbolByName.bind(i),
                e,
                t,
              ));
          });
        }),
        (x.prototype._removeMarketStatusWatchers = function (e) {
          var t = this;
          Object.keys(this._marketStatusWatchers[e] || {}).forEach(function (
            i,
          ) {
            t._marketStatusWatchers[e][i].stop();
          }),
            (this._marketStatusWatchers[e] = {});
        }),
        (x.prototype._stopQuotesSubscription = function (e) {
          this._quotesInfo[e].listenerGUID &&
            (this._externalDatafeed.unsubscribeQuotes(
              this._quotesInfo[e].listenerGUID,
            ),
            (this._quotesInfo[e].listenerGUID = void 0)),
            this._removeMarketStatusWatchers(e);
        }),
        (x.prototype._startQuotesSubscription = function (e) {
          var t = {},
            i = this;
          function s(t, s) {
            var r = i._marketStatusWatchers[e][t.n];
            (t.symbolname = t.n),
              (t.status = t.s),
              (t.values = t.v),
              (t.values.change = t.v.ch),
              (t.values.last_price = t.v.lp),
              (t.values.change_percent = t.v.chp),
              (t.values.current_session = t.v.cs || (r && r.marketStatus())),
              (t.values.pricescale = s.pricescale),
              (t.values.minmov = s.minmov),
              (t.values.minmove2 = s.minmove2 || 0),
              (t.values.fractional = s.fractional || !1),
              r && t.v.cs && r.stop(),
              TradingView.ChartapiMessagerInstances[e].onQuotesData(
                [e].concat([t]),
              );
          }
          function r(e) {
            e.forEach(function (e) {
              void 0 !== t[e.n]
                ? null !== t[e.n] && s(e, t[e.n])
                : i._resolveSymbolByName(
                    e.n,
                    null,
                    function (i) {
                      (t[e.n] = i), s(e, i);
                    },
                    function () {
                      t[e.n] = null;
                    },
                  );
            });
          }
          var n = this._quotesInfo[e].symbols;
          0 !== n.length &&
            (this._externalDatafeed.getQuotes && !P.enabled("charting_library")
              ? this._externalDatafeed.getQuotes(
                  n,
                  function (t) {
                    i._quotesInfo[e] &&
                      (r(t),
                      (i._quotesInfo[e].listenerGUID = e),
                      i._externalDatafeed.subscribeQuotes(
                        n,
                        i._quotesInfo[e].fastSymbols,
                        r,
                        i._quotesInfo[e].listenerGUID,
                      ));
                  },
                  function (e) {},
                )
              : !this._externalDatafeed.getQuotes &&
                P.enabled("trading_terminal") &&
                setTimeout(function () {
                  r(
                    n.map(function (e) {
                      return {n: e, s: "ok", v: {}};
                    }),
                  );
                }),
            this._createMarketStatusWatchers(e, n));
        }),
        (x.prototype._restartQuotesSubscription = function (e) {
          this._stopQuotesSubscription(e), this._startQuotesSubscription(e);
        }),
        (x.prototype.quoteCreateSession = function (e) {
          this._quotesInfo[e] = {
            symbols: [],
            fastSymbols: [],
            listenerGUID: void 0,
          };
        }),
        (x.prototype.quoteDeleteSession = function (e) {
          this._stopQuotesSubscription(e), (this._quotesInfo[e] = null);
        }),
        (x.prototype.quoteSetFields = function (e, t) {}),
        (x.prototype.quoteAddSymbols = function (e, t) {
          (this._quotesInfo[e].symbols = this._filteredSymbols(
            this._quotesInfo[e].symbols.concat(t),
          )),
            this._restartQuotesSubscription(e);
        }),
        (x.prototype.quoteRemoveSymbols = function (e, t) {
          (this._quotesInfo[e].symbols = this._quotesInfo[e].symbols.filter(
            function (e) {
              return t.indexOf(e) < 0;
            },
          )),
            this._restartQuotesSubscription(e);
        }),
        (x.prototype.quoteFastSymbols = function (e, t) {
          (this._quotesInfo[e].fastSymbols = this._filteredSymbols(t)),
            this._restartQuotesSubscription(e);
        }),
        (x.prototype.quoteHibernateAll = function (e) {}),
        (x.prototype._stopDepthSubscription = function (e) {
          this._depthInfo[e].listenerGUID &&
            (this._externalDatafeed.unsubscribeDepth(
              this._depthInfo[e].listenerGUID,
            ),
            (this._depthInfo[e].listenerGUID = void 0));
        }),
        (x.prototype._startDepthSubscription = function (e) {
          var t = this,
            i = this._depthInfo[e].symbol;
          function s(e) {
            return e.map(function (e) {
              return {p: e.price, v: e.volume};
            });
          }
          function r(e) {
            var t = {};
            return (t.s = i), (t.bids = s(e.bids)), (t.asks = s(e.asks)), t;
          }
          i &&
            this._externalDatafeed.subscribeDepth &&
            (t._depthInfo[e].listenerGUID =
              this._externalDatafeed.subscribeDepth(i, function (i) {
                var s;
                t._depthInfo[e] &&
                  ((s = i).snapshot
                    ? TradingView.ChartapiMessagerInstances[e].onDepthData(
                        [e].concat([r(s)]),
                      )
                    : TradingView.ChartapiMessagerInstances[e].onDepthUpdate(
                        [e].concat([r(s)]),
                      ));
              }));
        }),
        (x.prototype._restartDepthSubscription = function (e) {
          this._stopDepthSubscription(e), this._startDepthSubscription(e);
        }),
        (x.prototype.depthCreateSession = function (e) {
          this._depthInfo[e] = {symbol: null, listenerGUID: void 0};
        }),
        (x.prototype.depthDeleteSession = function (e) {
          (this._depthInfo[e].symbol = null),
            this._stopDepthSubscription(e),
            delete this._depthInfo[e];
        }),
        (x.prototype.depthSetSymbol = function (e, t) {
          (this._depthInfo[e].symbol = t), this._restartDepthSubscription(e);
        }),
        (x.prototype._filteredSymbols = function (e) {
          var t = [];
          return (
            e.forEach(function (e) {
              e instanceof Object || (t.indexOf(e) < 0 && t.push(e));
            }),
            t
          );
        }),
        (x.prototype._isEndOfData = function (e, t, i) {
          var s = e + "!" + t + "@" + i;
          return !!this._endOfData[s];
        }),
        (x.prototype._setEndOfData = function (e, t, i, s) {
          var r = e + "!" + t + "@" + i;
          this._endOfData[r] = !1 !== s;
        }),
        (x.prototype.serverTimeOffset = function () {
          return this._serverTimeOffset;
        }),
        (x.prototype.serverTime = function () {
          return 1e3 * this.getCurrentUTCTime();
        }),
        (x.prototype.getCurrentUTCTime = function () {
          return new Date().valueOf() / 1e3 + this._serverTimeOffset;
        }),
        (x.prototype.switchTimezone = function (e, t) {
          this._timeScales[e].setTimezone(t);
          var i = this._timeScales[e].tickMarks();
          null !== i &&
            TradingView.ChartapiMessagerInstances[e].onTickmarksUpdated(0, i);
        }),
        (e.exports = x);
    },
    89817: (e, t, i) => {
      "use strict";
      i.d(t, {SymbolExtrapolator: () => c});
      var s = i(16282),
        r = i(49382),
        n = i(42062),
        o = i(25853),
        a = i(35001);
      function l(e, t) {
        return e.length > t;
      }
      class c {
        constructor(e, t, i = 2e5) {
          (this._firstRealBarTimeMs = null),
            (this._historyBarsCache = []),
            (this._projectionFirstIndex = 1 / 0),
            (this._barsTimes = []),
            (this._minFutureBarsCount = 0),
            (this._lastRealBarTimeMs = null),
            (this._futureBarsCache = []),
            (this._symbolInfo = e),
            (this._interval = a.Interval.parse(t)),
            (this._extrapolateLimit = i),
            (this._barBuilder = (0, n.newBarBuilder)(
              t,
              new n.SessionInfo(
                e.timezone,
                e.session,
                e.session_holidays,
                e.corrections,
              ),
              null,
            ));
        }
        destroy() {
          this.clear();
        }
        interval() {
          return this._interval;
        }
        barBuilder() {
          return this._barBuilder;
        }
        symbolInfo() {
          return this._symbolInfo;
        }
        clear() {
          (this._firstRealBarTimeMs = null),
            (this._historyBarsCache = []),
            (this._barsTimes = []),
            (this._lastRealBarTimeMs = null),
            (this._futureBarsCache = []),
            (this._minFutureBarsCount = 0),
            (this._projectionFirstIndex = 1 / 0);
        }
        firstFutureBarIndex() {
 