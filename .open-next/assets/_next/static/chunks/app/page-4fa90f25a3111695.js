(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [974],
  {
    533: (e, t, s) => {
      'use strict';
      (s.r(t), s.d(t, { default: () => J }));
      var r = s(5155),
        a = s(2115),
        l = s(1978),
        i = s(9730),
        n = s(2138),
        d = s(4576),
        c = s(381),
        o = s(1284),
        m = s(646),
        x = s(5169),
        u = s(4186),
        h = s(2177),
        p = s(221),
        b = s(3568),
        g = s(2041);
      g.ai()
        .positive('Wert muss positiv sein')
        .min(0.001, 'Wert muss gr\xf6\xdfer als 0.001 sein');
      let f = g
          .ai()
          .min(-10, 'Temperatur muss mindestens -10\xb0C sein')
          .max(50, 'Temperatur darf maximal 50\xb0C sein'),
        j = g
          .ai()
          .min(0.001, 'Dicke muss mindestens 0.001m sein')
          .max(1, 'Dicke darf maximal 1m sein'),
        v = g
          .ai()
          .min(0, 'H\xf6he muss mindestens 0m sein')
          .max(100, 'H\xf6he darf maximal 100m sein'),
        N = g
          .ai()
          .min(0, 'L\xe4nge muss mindestens 0m sein')
          .max(1e3, 'L\xe4nge darf maximal 1000m sein'),
        k = g.Ik({
          temperatureRange: g
            .PV([f, f])
            .refine(
              e => {
                let [t, s] = e;
                return t <= s;
              },
              {
                message:
                  'Minimale Temperatur muss kleiner oder gleich der maximalen Temperatur sein',
                path: ['temperatureRange'],
              }
            )
            .refine(
              e => {
                let [t, s] = e;
                return s - t >= 0.5;
              },
              {
                message: 'Temperaturbereich muss mindestens 0.5\xb0C betragen',
                path: ['temperatureRange'],
              }
            ),
          height: v,
          length: N,
          thickness: j,
        });
      (k.extend({
        beerType: g.k5(['lager', 'ale', 'stout', 'wheat']).optional(),
        carbonationLevel: g
          .ai()
          .min(1.5, 'Kohlens\xe4uregehalt muss mindestens 1.5 Vol% sein')
          .max(4, 'Kohlens\xe4uregehalt darf maximal 4.0 Vol% sein')
          .optional(),
        systemEfficiency: g
          .ai()
          .min(0.5, 'Systemeffizienz muss mindestens 50% sein')
          .max(1, 'Systemeffizienz darf maximal 100% sein')
          .optional(),
      }),
        g.Ik({
          pressureUnit: g.k5(['bar', 'psi']),
          temperatureUnit: g.k5(['celsius', 'fahrenheit']),
          decimalPlaces: g
            .ai()
            .int()
            .min(0, 'Dezimalstellen m\xfcssen mindestens 0 sein')
            .max(4, 'Dezimalstellen d\xfcrfen maximal 4 sein'),
          autoCalculate: g.zM(),
        }));
      var w = s(6140),
        y = s(9428),
        C = s(5339);
      let A = [
          { value: 0.004, label: '4 mm', description: '0,72 bar pro Meter' },
          { value: 0.007, label: '7 mm', description: '0,05 bar pro Meter' },
          { value: 0.01, label: '10 mm', description: '0,01 bar pro Meter' },
        ],
        M = { min: 5, max: 26 },
        S = { min: 0.2, max: 10, step: 0.1 };
      function F(e) {
        let {
          name: t,
          control: s,
          label: a,
          placeholder: l,
          type: i = 'text',
          unit: n,
          min: d,
          max: c,
          step: o,
          required: m = !1,
          disabled: x = !1,
          className: u = '',
          error: p,
          showValidation: b = !0,
        } = e;
        return (0, r.jsxs)('div', {
          className: 'space-y-2 '.concat(u),
          children: [
            (0, r.jsxs)('label', {
              htmlFor: t,
              className:
                'block text-sm font-medium text-slate-700 dark:text-slate-300',
              children: [
                a,
                m &&
                  (0, r.jsx)('span', {
                    className: 'text-red-500 ml-1',
                    children: '*',
                  }),
              ],
            }),
            (0, r.jsx)(h.xI, {
              name: t,
              control: s,
              render: e => {
                var s, a;
                let { field: m, fieldState: u } = e,
                  h = !!u.error || !!p,
                  g = !h && u.isDirty;
                return (0, r.jsxs)('div', {
                  className: 'relative',
                  children: [
                    (0, r.jsxs)('div', {
                      className: 'relative',
                      children: [
                        (0, r.jsx)('input', {
                          ...m,
                          id: t,
                          type: i,
                          placeholder: l,
                          min: d,
                          max: c,
                          step: o,
                          disabled: x,
                          className:
                            '\n                    w-full px-4 py-3 border rounded-lg transition-all duration-200\n                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent\n                    disabled:bg-slate-100 disabled:cursor-not-allowed\n                    '
                              .concat(
                                h
                                  ? 'border-red-300 focus:ring-red-500 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400'
                                  : g
                                    ? 'border-blue-300 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
                                    : 'border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-600 text-slate-900 dark:text-white',
                                '\n                    '
                              )
                              .concat(n ? 'pr-12' : '', '\n                  '),
                          onChange: e => {
                            let t =
                              'number' === i
                                ? parseFloat(e.target.value) || 0
                                : e.target.value;
                            m.onChange(t);
                          },
                        }),
                        n &&
                          (0, r.jsx)('div', {
                            className:
                              'absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm',
                            children: n,
                          }),
                        b &&
                          h &&
                          (0, r.jsx)('div', {
                            className:
                              'absolute right-3 top-1/2 transform -translate-y-1/2',
                            children: (0, r.jsx)(C.A, {
                              className: 'w-5 h-5 text-red-500',
                            }),
                          }),
                      ],
                    }),
                    ((null == (s = u.error) ? void 0 : s.message) || p) &&
                      (0, r.jsxs)('p', {
                        className:
                          'mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1',
                        children: [
                          (0, r.jsx)(C.A, { className: 'w-4 h-4' }),
                          (null == (a = u.error) ? void 0 : a.message) || p,
                        ],
                      }),
                  ],
                });
              },
            }),
          ],
        });
      }
      function P(e) {
        return (0, r.jsx)(F, {
          ...e,
          type: 'number',
          placeholder: e.placeholder || '',
        });
      }
      function T(e) {
        let { control: t, form: s } = e,
          i = s.watch('thickness') || 0.01,
          [n, d] = a.useState(i),
          c = (function (e, t) {
            let s = e.getFieldError(t),
              r = e.isFieldValid(t),
              a = e.formState.dirtyFields[t],
              l = e.formState.touchedFields[t];
            return {
              error: s,
              isValid: r,
              isDirty: a,
              isTouched: l,
              hasError: !!s,
              showError: (a || l) && !!s,
            };
          })(s, 'thickness');
        return (0, r.jsx)('div', {
          className: 'space-y-8',
          children: (0, r.jsxs)(l.P.div, {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: 'space-y-6',
            children: [
              (0, r.jsxs)('div', {
                className: 'flex items-center gap-3',
                children: [
                  (0, r.jsx)('div', {
                    className:
                      'p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg',
                    children: (0, r.jsx)(w.A, {
                      className: 'w-5 h-5 text-purple-600 dark:text-purple-400',
                    }),
                  }),
                  (0, r.jsxs)('div', {
                    children: [
                      (0, r.jsx)('h4', {
                        className:
                          'text-lg font-semibold text-slate-900 dark:text-white',
                        children: 'Leitung & Durchmesser',
                      }),
                      (0, r.jsx)('p', {
                        className: 'text-sm text-slate-600 dark:text-slate-400',
                        children: 'Reibungsverluste je nach Querschnitt',
                      }),
                    ],
                  }),
                ],
              }),
              (0, r.jsxs)('div', {
                className: 'space-y-6',
                children: [
                  (0, r.jsx)(P, {
                    name: 'length',
                    control: t,
                    label: 'Leitungsl\xe4nge',
                    placeholder: 'z.B. 5.0',
                    unit: 'm',
                    min: S.min,
                    max: S.max,
                    step: S.step,
                    required: !0,
                    showValidation: !0,
                  }),
                  (0, r.jsxs)('div', {
                    className: 'space-y-3',
                    children: [
                      (0, r.jsx)('label', {
                        className:
                          'block text-sm font-medium text-slate-700 dark:text-slate-300',
                        children: 'Leitungsdurchmesser w\xe4hlen',
                      }),
                      (0, r.jsx)('div', {
                        className: 'grid grid-cols-1 md:grid-cols-3 gap-4',
                        children: A.map((e, t) =>
                          (0, r.jsx)(
                            l.P.button,
                            {
                              type: 'button',
                              onClick: () => {
                                var t;
                                (d((t = e.value)),
                                  s.setFieldValue('thickness', t));
                              },
                              className:
                                'p-4 rounded-xl border-2 transition-all '.concat(
                                  n === e.value
                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600'
                                ),
                              whileHover: { scale: 1.02 },
                              whileTap: { scale: 0.98 },
                              children: (0, r.jsxs)('div', {
                                className: 'flex items-center gap-3',
                                children: [
                                  (0, r.jsx)('div', {
                                    className:
                                      'w-8 h-8 rounded-full border-2 flex items-center justify-center '.concat(
                                        n === e.value
                                          ? 'border-purple-500 bg-purple-500'
                                          : 'border-slate-300 dark:border-slate-600'
                                      ),
                                    children:
                                      n === e.value &&
                                      (0, r.jsx)(y.A, {
                                        className:
                                          'w-4 h-4 text-white fill-current',
                                      }),
                                  }),
                                  (0, r.jsxs)('div', {
                                    className: 'text-left',
                                    children: [
                                      (0, r.jsx)('div', {
                                        className:
                                          'font-semibold text-slate-900 dark:text-white',
                                        children: e.label,
                                      }),
                                      (0, r.jsx)('div', {
                                        className:
                                          'text-sm text-slate-600 dark:text-slate-400',
                                        children: e.description,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            },
                            t
                          )
                        ),
                      }),
                    ],
                  }),
                  c.hasError &&
                    (0, r.jsxs)(l.P.div, {
                      initial: { opacity: 0, y: -10 },
                      animate: { opacity: 1, y: 0 },
                      className:
                        'text-sm text-red-600 dark:text-red-400 flex items-center gap-1',
                      children: [
                        (0, r.jsx)(C.A, { className: 'w-4 h-4' }),
                        c.error,
                      ],
                    }),
                ],
              }),
            ],
          }),
        });
      }
      var D = s(4992),
        R = s(760);
      function z(e) {
        var t;
        let {
            control: s,
            name: i,
            showValidation: n = !0,
            error: d,
            onUserInteraction: c,
          } = e,
          {
            field: { value: m, onChange: x },
            fieldState: u,
          } = (0, h.as)({ name: i, control: s }),
          p = (0, a.useMemo)(() => (Array.isArray(m) ? m : [10, 12]), [m]),
          b = M.min,
          g = M.max,
          [f, j] = (0, a.useState)(null),
          [v, N] = (0, a.useState)(!1),
          k = (0, a.useRef)(null),
          w = (0, a.useRef)(null),
          y = !!u.error || !!d,
          A = (y || u.isDirty, (u.isDirty || u.isTouched) && y),
          S = e => ((e - b) / (g - b)) * 100,
          F = (0, a.useCallback)(
            (e, t) => {
              (e.preventDefault(), e.stopPropagation(), j(t), null == c || c());
            },
            [c]
          ),
          P = (0, a.useCallback)(
            e => {
              if (!f || !k.current) return;
              let t = k.current.getBoundingClientRect(),
                s = Math.round(
                  (Math.max(
                    0,
                    Math.min(100, ((e.clientX - t.left) / t.width) * 100)
                  ) /
                    100) *
                    (g - b) +
                    b
                ),
                [r, a] = p;
              if ('min' === f) (x([Math.min(s, a - 1), a]), null == c || c());
              else {
                let e = Math.max(s, r + 1);
                (x([r, e]), null == c || c());
              }
            },
            [f, x, p, b, g, c]
          ),
          T = (0, a.useCallback)(() => {
            j(null);
          }, []);
        (0, a.useEffect)(() => {
          if (f)
            return (
              document.addEventListener('mousemove', P),
              document.addEventListener('mouseup', T),
              () => {
                (document.removeEventListener('mousemove', P),
                  document.removeEventListener('mouseup', T));
              }
            );
        }, [f, P, T]);
        let z = (0, a.useCallback)(
            e => {
              if (f || !k.current) return;
              let t = k.current.getBoundingClientRect(),
                s = Math.round(
                  (Math.max(
                    0,
                    Math.min(100, ((e.clientX - t.left) / t.width) * 100)
                  ) /
                    100) *
                    (g - b) +
                    b
                ),
                [r, a] = p;
              if (Math.abs(s - r) < Math.abs(s - a)) x([Math.min(s, a - 1), a]);
              else {
                let e = Math.max(s, r + 1);
                x([r, e]);
              }
              null == c || c();
            },
            [f, x, p, b, g, c]
          ),
          L = () => {
            N(!0);
          },
          E = () => {
            N(!1);
          };
        return (0, r.jsxs)('div', {
          className: 'space-y-4',
          children: [
            (0, r.jsxs)('div', {
              className: 'flex items-center justify-between',
              children: [
                (0, r.jsxs)('div', {
                  className: 'flex items-center gap-2',
                  children: [
                    (0, r.jsx)(D.A, {
                      className: 'w-5 h-5 text-blue-600 dark:text-blue-400',
                    }),
                    (0, r.jsx)('h3', {
                      className: 'font-semibold text-slate-900 dark:text-white',
                      children: 'Biertemperatur',
                    }),
                    n &&
                      y &&
                      (0, r.jsx)('div', {
                        className: 'flex items-center gap-1',
                        children: (0, r.jsx)(C.A, {
                          className: 'w-4 h-4 text-red-500',
                        }),
                      }),
                  ],
                }),
                (0, r.jsxs)('div', {
                  className: 'relative',
                  children: [
                    (0, r.jsx)('button', {
                      type: 'button',
                      onMouseEnter: L,
                      onMouseLeave: E,
                      className:
                        'p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors',
                      'aria-label': 'Informationen zur Temperatur',
                      children: (0, r.jsx)(o.A, { className: 'w-4 h-4' }),
                    }),
                    (0, r.jsx)(R.N, {
                      children:
                        v &&
                        (0, r.jsx)(l.P.div, {
                          initial: { opacity: 0, y: -10 },
                          animate: { opacity: 1, y: 0 },
                          exit: { opacity: 0, y: -10 },
                          transition: { duration: 0.2 },
                          ref: w,
                          onMouseEnter: L,
                          onMouseLeave: E,
                          className:
                            'absolute right-0 top-8 w-64 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 text-sm z-10',
                          children: (0, r.jsx)('p', {
                            className: 'text-slate-600 dark:text-slate-400',
                            children:
                              'W\xe4hlen Sie den Temperaturbereich Ihres Biers. Der S\xe4ttigungsdruck wird automatisch aus der Temperatur berechnet.',
                          }),
                        }),
                    }),
                  ],
                }),
              ],
            }),
            (0, r.jsxs)('div', {
              className: 'space-y-3',
              children: [
                (0, r.jsxs)('div', {
                  ref: k,
                  className: 'relative h-12 cursor-pointer '.concat(
                    y ? 'ring-2 ring-red-300' : ''
                  ),
                  onClick: z,
                  children: [
                    (0, r.jsx)('div', {
                      className:
                        'absolute top-1/2 -translate-y-1/2 w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full',
                    }),
                    (0, r.jsx)('div', {
                      className:
                        'absolute top-1/2 -translate-y-1/2 h-2 rounded-full transition-colors '.concat(
                          y ? 'bg-red-500' : 'bg-blue-500'
                        ),
                      style: {
                        left: ''.concat(S(p[0]), '%'),
                        width: ''.concat(S(p[1]) - S(p[0]), '%'),
                      },
                    }),
                    (0, r.jsx)('div', {
                      className:
                        'absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-300 rounded-full shadow-lg border-2 cursor-pointer hover:scale-110 transition-all '.concat(
                          y ? 'border-red-500' : 'border-blue-500'
                        ),
                      style: { left: 'calc('.concat(S(p[0]), '% - 12px)') },
                      onMouseDown: e => F(e, 'min'),
                      'aria-label': 'Min temperature '.concat(p[0], '\xb0C'),
                      role: 'slider',
                      'aria-valuemin': b,
                      'aria-valuemax': g,
                      'aria-valuenow': p[0],
                      children: (0, r.jsxs)('div', {
                        className:
                          'absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap',
                        children: [p[0], '\xb0C'],
                      }),
                    }),
                    (0, r.jsx)('div', {
                      className:
                        'absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-300 rounded-full shadow-lg border-2 cursor-pointer hover:scale-110 transition-all '.concat(
                          y ? 'border-red-500' : 'border-blue-500'
                        ),
                      style: { left: 'calc('.concat(S(p[1]), '% - 12px)') },
                      onMouseDown: e => F(e, 'max'),
                      'aria-label': 'Max temperature '.concat(p[1], '\xb0C'),
                      role: 'slider',
                      'aria-valuemin': b,
                      'aria-valuemax': g,
                      'aria-valuenow': p[1],
                      children: (0, r.jsxs)('div', {
                        className:
                          'absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap',
                        children: [p[1], '\xb0C'],
                      }),
                    }),
                  ],
                }),
                (0, r.jsxs)('div', {
                  className:
                    'flex justify-between text-xs text-slate-500 dark:text-slate-400 px-1',
                  children: [
                    (0, r.jsxs)('span', { children: [b, '\xb0C'] }),
                    (0, r.jsxs)('span', {
                      children: [Math.round((b + g) / 2), '\xb0C'],
                    }),
                    (0, r.jsxs)('span', { children: [g, '\xb0C'] }),
                  ],
                }),
                (0, r.jsx)('div', {
                  className: 'text-center',
                  children: (0, r.jsxs)('div', {
                    className:
                      'inline-flex items-center gap-4 px-6 py-3 rounded-xl border transition-colors '.concat(
                        y
                          ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                          : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                      ),
                    children: [
                      (0, r.jsxs)('div', {
                        children: [
                          (0, r.jsx)('span', {
                            className:
                              'text-sm text-slate-600 dark:text-slate-400',
                            children: 'Min:',
                          }),
                          (0, r.jsxs)('span', {
                            className: 'ml-2 text-xl font-bold '.concat(
                              y
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-blue-600 dark:text-blue-400'
                            ),
                            children: [p[0], '\xb0C'],
                          }),
                        ],
                      }),
                      (0, r.jsx)('div', {
                        className: 'w-px h-6 bg-slate-300 dark:bg-slate-600',
                      }),
                      (0, r.jsxs)('div', {
                        children: [
                          (0, r.jsx)('span', {
                            className:
                              'text-sm text-slate-600 dark:text-slate-400',
                            children: 'Max:',
                          }),
                          (0, r.jsxs)('span', {
                            className: 'ml-2 text-xl font-bold '.concat(
                              y
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-blue-600 dark:text-blue-400'
                            ),
                            children: [p[1], '\xb0C'],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                A &&
                  (0, r.jsxs)(l.P.div, {
                    initial: { opacity: 0, y: -10 },
                    animate: { opacity: 1, y: 0 },
                    className:
                      'text-sm text-red-600 dark:text-red-400 flex items-center gap-1',
                    children: [
                      (0, r.jsx)(C.A, { className: 'w-4 h-4' }),
                      (null == (t = u.error) ? void 0 : t.message) || d,
                    ],
                  }),
              ],
            }),
          ],
        });
      }
      let L = [
        { temperature: 5, pressure: 0.8 },
        { temperature: 10, pressure: 1.2 },
        { temperature: 15, pressure: 1.6 },
        { temperature: 20, pressure: 2 },
        { temperature: 25, pressure: 2.4 },
      ];
      function E() {
        return (0, r.jsxs)('div', {
          className: 'space-y-4',
          children: [
            (0, r.jsxs)('div', {
              className: 'flex items-center gap-3',
              children: [
                (0, r.jsx)('div', {
                  className: 'p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg',
                  children: (0, r.jsx)(d.A, {
                    className: 'w-5 h-5 text-blue-600 dark:text-blue-400',
                  }),
                }),
                (0, r.jsxs)('div', {
                  children: [
                    (0, r.jsx)('h4', {
                      className:
                        'text-lg font-semibold text-slate-900 dark:text-white',
                      children: 'S\xe4ttigungsdruck',
                    }),
                    (0, r.jsx)('p', {
                      className: 'text-sm text-slate-600 dark:text-slate-400',
                      children: 'Drucktabelle nach Temperatur',
                    }),
                  ],
                }),
              ],
            }),
            (0, r.jsx)(l.P.div, {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              className:
                'overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700',
              children: (0, r.jsxs)('table', {
                className: 'w-full',
                children: [
                  (0, r.jsx)('thead', {
                    className: 'bg-slate-50 dark:bg-slate-800',
                    children: (0, r.jsxs)('tr', {
                      children: [
                        (0, r.jsx)('th', {
                          className:
                            'px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white',
                          children: 'Temp.',
                        }),
                        (0, r.jsx)('th', {
                          className:
                            'px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white',
                          children: 'Druck',
                        }),
                      ],
                    }),
                  }),
                  (0, r.jsx)('tbody', {
                    className:
                      'divide-y divide-slate-200 dark:divide-slate-700',
                    children: L.map((e, t) =>
                      (0, r.jsxs)(
                        l.P.tr,
                        {
                          initial: { opacity: 0, x: -20 },
                          animate: { opacity: 1, x: 0 },
                          transition: { delay: 0.1 * t },
                          className:
                            'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors',
                          children: [
                            (0, r.jsxs)('td', {
                              className:
                                'px-4 py-3 text-sm text-slate-900 dark:text-white',
                              children: [e.temperature, '\xb0C'],
                            }),
                            (0, r.jsxs)('td', {
                              className:
                                'px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400',
                              children: [e.pressure, ' bar'],
                            }),
                          ],
                        },
                        e.temperature
                      )
                    ),
                  }),
                ],
              }),
            }),
          ],
        });
      }
      var B = s(8693),
        V = s(6786);
      let H = new Map(
          [
            { temperature: 5, pressure: 0.8 },
            { temperature: 6, pressure: 0.9 },
            { temperature: 7, pressure: 1 },
            { temperature: 8, pressure: 1 },
            { temperature: 9, pressure: 1.1 },
            { temperature: 10, pressure: 1.2 },
            { temperature: 11, pressure: 1.3 },
            { temperature: 12, pressure: 1.4 },
            { temperature: 13, pressure: 1.5 },
            { temperature: 14, pressure: 1.5 },
            { temperature: 15, pressure: 1.6 },
            { temperature: 16, pressure: 1.7 },
            { temperature: 17, pressure: 1.8 },
            { temperature: 18, pressure: 1.9 },
            { temperature: 19, pressure: 1.9 },
            { temperature: 20, pressure: 2 },
            { temperature: 21, pressure: 2 },
            { temperature: 22, pressure: 2.1 },
            { temperature: 23, pressure: 2.2 },
            { temperature: 24, pressure: 2.3 },
            { temperature: 25, pressure: 2.4 },
            { temperature: 26, pressure: 2.5 },
          ].map(e => [e.temperature, e.pressure])
        ),
        I = e => {
          var t;
          return null != (t = H.get(e)) ? t : 0;
        },
        Z = function (e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 1,
            s = Math.pow(10, t);
          return Math.round(e * s) / s;
        },
        W = (0, B.vt)()(
          (0, V.eh)((e, t) => ({
            form: {
              temperatureRange: [10, 12],
              height: 0,
              length: 0,
              thickness: 0.01,
            },
            result: null,
            isLoading: !1,
            error: null,
            setForm: t => {
              e(e => {
                let s = { ...e.form, ...t },
                  r = e.form;
                return r.temperatureRange[0] === s.temperatureRange[0] &&
                  r.temperatureRange[1] === s.temperatureRange[1] &&
                  r.height === s.height &&
                  r.length === s.length &&
                  r.thickness === s.thickness
                  ? e
                  : { form: s, error: null };
              });
            },
            calculatePressure: async () => {
              let { form: s } = t();
              e({ isLoading: !0, error: null });
              try {
                let t = (e => {
                  let {
                    temperatureRange: t,
                    height: s,
                    length: r,
                    thickness: a,
                  } = e;
                  if (!Array.isArray(t) || 2 !== t.length)
                    return 'Ung\xfcltiger Temperaturbereich';
                  let [l, i] = t;
                  return l > i
                    ? 'Minimale Temperatur darf nicht h\xf6her als maximale Temperatur sein'
                    : i - l < 0.5
                      ? 'Temperaturbereich muss mindestens 0,5\xb0C betragen'
                      : l < -10 || i > 50
                        ? 'Temperaturbereich muss zwischen -10\xb0C und 50\xb0C liegen'
                        : s <= 0
                          ? 'F\xf6rderh\xf6he muss gr\xf6\xdfer als 0 sein'
                          : s > 10
                            ? 'F\xf6rderh\xf6he darf maximal 10 Meter betragen'
                            : r <= 0
                              ? 'Leitungsl\xe4nge muss gr\xf6\xdfer als 0 sein'
                              : r > 100
                                ? 'Leitungsl\xe4nge darf maximal 100 Meter betragen'
                                : a <= 0
                                  ? 'Leitungsdurchmesser muss gr\xf6\xdfer als 0 sein'
                                  : a > 0.05
                                    ? 'Leitungsdurchmesser darf maximal 50mm betragen'
                                    : null;
                })(s);
                if (t) return void e({ result: null, error: t, isLoading: !1 });
                let {
                  temperatureRange: r,
                  height: a,
                  length: l,
                  thickness: i,
                } = s;
                await new Promise(e => setTimeout(e, 100));
                let n = I(r[0]),
                  d = I(r[1]),
                  c = 0.1 * a,
                  o = l * i,
                  m = Z(n + c + o),
                  x = Z(d + c + o);
                if (m < 0 || x < 0)
                  return void e({
                    result: null,
                    error: 'Berechneter Druck ist negativ',
                    isLoading: !1,
                  });
                if (x > 10)
                  return void e({
                    result: null,
                    error: 'Berechneter Druck ist zu hoch (> 10 bar)',
                    isLoading: !1,
                  });
                e({
                  result: {
                    temperatureMin: r[0],
                    temperatureMax: r[1],
                    height: a,
                    length: l,
                    thickness: i,
                    resultMin: m,
                    resultMax: x,
                    breakdown: {
                      saturationMin: n,
                      saturationMax: d,
                      heightPressure: c,
                      frictionPressure: o,
                    },
                    recommended: Z((m + x) / 2, 2),
                  },
                  isLoading: !1,
                  error: null,
                });
              } catch (t) {
                e({
                  result: null,
                  error: 'Fehler bei der Berechnung',
                  isLoading: !1,
                });
              }
            },
            resetForm: () => {
              e({
                form: {
                  temperatureRange: [10, 12],
                  height: 0,
                  length: 0,
                  thickness: 0.01,
                },
                result: null,
                error: null,
                isLoading: !1,
              });
            },
            clearError: () => {
              e({ error: null });
            },
          }))
        ),
        _ = [
          {
            id: 1,
            title: 'S\xe4ttigungsdruck',
            subtitle: 'Temperatur und Drucktabelle',
            icon: d.A,
            color: 'blue',
            gradient: 'from-blue-500 to-blue-600',
            borderColor: 'border-blue-200 dark:border-blue-700',
          },
          {
            id: 2,
            title: 'Leitungsdaten',
            subtitle: 'Durchmesser und L\xe4nge',
            icon: c.A,
            color: 'blue',
            gradient: 'from-blue-500 to-blue-600',
            borderColor: 'border-blue-200 dark:border-blue-700',
          },
          {
            id: 3,
            title: 'F\xf6rderh\xf6he',
            subtitle: 'H\xf6hendifferenz',
            icon: c.A,
            color: 'blue',
            gradient: 'from-blue-500 to-blue-600',
            borderColor: 'border-blue-200 dark:border-blue-700',
          },
        ];
      function O(e) {
        let { onComplete: t, onStepChange: s, currentStep: i } = e,
          { setForm: g, calculatePressure: f } = W(),
          [j, v] = a.useState(1),
          N = null != i ? i : j;
        a.useEffect(() => {
          i && i !== j && v(i);
        }, [i, j]);
        let w = (0, a.useCallback)(
            e => {
              (v(e), null == s || s(e));
            },
            [s]
          ),
          y = (function (e) {
            let {
                schema: t,
                onSuccess: s,
                onError: r,
                showToastErrors: a = !0,
                ...l
              } = e,
              i = (0, h.mN)({ resolver: (0, p.u)(t), mode: 'onChange', ...l }),
              { handleSubmit: n, formState: d } = i,
              c = n(
                async e => {
                  try {
                    s && (await s(e));
                  } catch (e) {
                    a &&
                      b.oR.error(
                        'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
                      );
                  }
                },
                e => {
                  if ((r && r(e), a)) {
                    let t = Object.values(e)[0];
                    (null == t ? void 0 : t.message)
                      ? b.oR.error(t.message)
                      : b.oR.error('Bitte \xfcberpr\xfcfen Sie Ihre Eingaben.');
                  }
                }
              ),
              o = d.isValid,
              m = Object.keys(d.dirtyFields).length > 0;
            return {
              ...i,
              onSubmit: c,
              getFieldError: e => {
                let t = d.errors[e];
                return null == t ? void 0 : t.message;
              },
              isFieldValid: e => !d.errors[e] && !!d.dirtyFields[e],
              isFormValid: o,
              isFormDirty: m,
              resetForm: e => {
                i.reset(e);
              },
              setFieldValue: (e, t) => {
                i.setValue(e, t, {
                  shouldValidate: !0,
                  shouldDirty: !0,
                  shouldTouch: !0,
                });
              },
            };
          })({
            schema: k,
            defaultValues: {
              temperatureRange: [10, 12],
              height: 0,
              length: 0,
              thickness: 0.01,
            },
            onSuccess: async e => {
              null == t || t(e);
            },
            onError: e => {},
          }),
          { control: C } = y,
          A = y.watch('temperatureRange'),
          M = y.watch('length'),
          S = y.watch('thickness'),
          F = (0, a.useMemo)(() => {
            let e = (() => {
                if (!Array.isArray(A) || 2 !== A.length) return !1;
                let [e, t] = A;
                return !(e > t) && !(t - e < 0.5) && !(e < -10) && !(t > 50);
              })(),
              t = M > 0,
              s = S > 0;
            return {
              isTemperatureValid: e,
              hasValidTemperatureSelection: e,
              canProceedToStep2: e,
              hasValidLength: t,
              hasValidThickness: s,
              canProceedToStep3: t && s,
            };
          }, [A, M, S]);
        a.useEffect(() => {
          let e = y.watch('temperatureRange'),
            t = y.watch('height'),
            s = y.watch('length'),
            r = y.watch('thickness'),
            a =
              Array.isArray(e) &&
              2 === e.length &&
              e[0] <= e[1] &&
              e[1] - e[0] >= 0.5,
            l = t > 0,
            i = s > 0,
            n = r > 0;
          if (a && l && i && n) {
            g({ temperatureRange: e, height: t, length: s, thickness: r });
            let a = setTimeout(() => {
              f();
            }, 100);
            return () => clearTimeout(a);
          }
        });
        let P = (0, a.useCallback)(() => {
            if (F.canProceedToStep2)
              (w(2), b.oR.success('Temperaturbereich festgelegt!'));
            else {
              let e = y.getFieldError('temperatureRange');
              b.oR.error(
                e || 'Bitte w\xe4hlen Sie einen g\xfcltigen Temperaturbereich.'
              );
            }
          }, [F.canProceedToStep2, w, y]),
          D = (0, a.useCallback)(() => {
            F.canProceedToStep3
              ? (w(3), b.oR.success('Leitungsdaten festgelegt!'))
              : b.oR.error(
                  'Bitte f\xfcllen Sie alle erforderlichen Felder aus.'
                );
          }, [F.canProceedToStep3, w]),
          R = (0, a.useCallback)(
            e => {
              w(e);
            },
            [w]
          );
        a.useEffect(() => {
          null == s || s(N);
        }, [N, s]);
        let L = (0, a.useCallback)(
          e => (e < N ? 'completed' : e === N ? 'active' : 'pending'),
          [N]
        );
        return (0, r.jsx)('div', {
          className: 'space-y-8',
          children: (0, r.jsx)('div', {
            className: 'relative overflow-hidden',
            children: (0, r.jsxs)('div', {
              className: 'flex transition-transform duration-500 ease-in-out',
              style: {
                transform: 'translateX(-'.concat((N - 1) * 33.33, '%)'),
                width: '300%',
              },
              children: [
                (0, r.jsx)('div', {
                  className: 'w-1/3',
                  children: (0, r.jsxs)(l.P.div, {
                    id: 'step-1',
                    initial: { opacity: 0, x: 20 },
                    animate: { opacity: 1, x: 0 },
                    className:
                      'bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border transition-all min-h-[600px] flex flex-col '.concat(
                        'active' === L(1)
                          ? _[0].borderColor
                          : 'completed' === L(1)
                            ? _[0].borderColor + ' opacity-75'
                            : _[0].borderColor + ' opacity-30'
                      ),
                    children: [
                      (0, r.jsx)('div', {
                        className:
                          'px-6 py-4 transition-all rounded-t-2xl '.concat(
                            'active' === L(1)
                              ? 'bg-gradient-to-r '.concat(_[0].gradient)
                              : 'completed' === L(1)
                                ? 'bg-gradient-to-r '.concat(
                                    _[0].gradient,
                                    ' opacity-75'
                                  )
                                : 'bg-gradient-to-r '.concat(
                                    _[0].gradient,
                                    ' opacity-30'
                                  )
                          ),
                        children: (0, r.jsxs)('div', {
                          className: 'flex items-center justify-between',
                          children: [
                            (0, r.jsxs)('div', {
                              className: 'flex items-center gap-3',
                              children: [
                                (0, r.jsx)('div', {
                                  className: 'p-2 bg-white/20 rounded-lg',
                                  children: (0, r.jsx)(d.A, {
                                    className: 'w-5 h-5 text-white',
                                  }),
                                }),
                                (0, r.jsxs)('div', {
                                  children: [
                                    (0, r.jsxs)('div', {
                                      className: 'flex items-center gap-2',
                                      children: [
                                        (0, r.jsx)('h3', {
                                          className:
                                            'text-lg font-semibold text-white',
                                          children: _[0].title,
                                        }),
                                        (0, r.jsx)('button', {
                                          type: 'button',
                                          className:
                                            'p-1 text-white/80 hover:text-white transition-colors',
                                          title:
                                            'S\xe4ttigungsdruck: Der Druck h\xe4ngt von der Biertemperatur ab. Pro Grad Celsius steigt der Druck um etwa 0,1 bar.',
                                          children: (0, r.jsx)(o.A, {
                                            className: 'w-4 h-4',
                                          }),
                                        }),
                                      ],
                                    }),
                                    (0, r.jsx)('p', {
                                      className: 'text-white/80 text-sm',
                                      children: _[0].subtitle,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            'completed' === L(1) &&
                              (0, r.jsx)(m.A, {
                                className: 'w-5 h-5 text-white',
                              }),
                          ],
                        }),
                      }),
                      (0, r.jsxs)('div', {
                        className: 'p-6 flex-1 flex flex-col',
                        children: [
                          (0, r.jsxs)('div', {
                            className:
                              'grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1',
                            children: [
                              (0, r.jsx)(E, {}),
                              (0, r.jsx)('div', {
                                className: 'space-y-4',
                                children: (0, r.jsx)(z, {
                                  control: C,
                                  name: 'temperatureRange',
                                  showValidation: !0,
                                }),
                              }),
                            ],
                          }),
                          'active' === L(1) &&
                            (0, r.jsx)(l.P.div, {
                              initial: { opacity: 0, y: 10 },
                              animate: { opacity: 1, y: 0 },
                              className: 'mt-6 flex justify-end',
                              children: (0, r.jsxs)('button', {
                                onClick: P,
                                disabled: !F.canProceedToStep2,
                                className:
                                  'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all '.concat(
                                    F.canProceedToStep2
                                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                                      : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                                  ),
                                children: [
                                  (0, r.jsx)('span', { children: 'Weiter' }),
                                  (0, r.jsx)(n.A, { className: 'w-4 h-4' }),
                                ],
                              }),
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, r.jsx)('div', {
                  className: 'w-1/3',
                  children: (0, r.jsxs)(l.P.div, {
                    id: 'step-2',
                    initial: { opacity: 0, x: 20 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: 0.1 },
                    className:
                      'bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border transition-all min-h-[600px] flex flex-col '.concat(
                        'active' === L(2)
                          ? _[1].borderColor
                          : 'completed' === L(2)
                            ? _[1].borderColor + ' opacity-75'
                            : _[1].borderColor + ' opacity-30'
                      ),
                    children: [
                      (0, r.jsx)('div', {
                        className:
                          'px-6 py-4 transition-all rounded-t-2xl '.concat(
                            'active' === L(2)
                              ? 'bg-gradient-to-r '.concat(_[1].gradient)
                              : 'completed' === L(2)
                                ? 'bg-gradient-to-r '.concat(
                                    _[1].gradient,
                                    ' opacity-75'
                                  )
                                : 'bg-gradient-to-r '.concat(
                                    _[1].gradient,
                                    ' opacity-30'
                                  )
                          ),
                        children: (0, r.jsxs)('div', {
                          className: 'flex items-center justify-between',
                          children: [
                            (0, r.jsxs)('div', {
                              className: 'flex items-center gap-3',
                              children: [
                                (0, r.jsx)('div', {
                                  className: 'p-2 bg-white/20 rounded-lg',
                                  children: (0, r.jsx)(c.A, {
                                    className: 'w-5 h-5 text-white',
                                  }),
                                }),
                                (0, r.jsxs)('div', {
                                  children: [
                                    (0, r.jsxs)('div', {
                                      className: 'flex items-center gap-2',
                                      children: [
                                        (0, r.jsx)('h3', {
                                          className:
                                            'text-lg font-semibold text-white',
                                          children: _[1].title,
                                        }),
                                        (0, r.jsx)('button', {
                                          type: 'button',
                                          className:
                                            'p-1 text-white/80 hover:text-white transition-colors',
                                          title:
                                            'Leitungsdaten: Die Reibungsverluste h\xe4ngen vom Durchmesser ab: 4mm (0,72 bar/m), 7mm (0,05 bar/m), 10mm (0,01 bar/m).',
                                          children: (0, r.jsx)(o.A, {
                                            className: 'w-4 h-4',
                                          }),
                                        }),
                                      ],
                                    }),
                                    (0, r.jsx)('p', {
                                      className: 'text-white/80 text-sm',
                                      children: _[1].subtitle,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            'completed' === L(2) &&
                              (0, r.jsx)(m.A, {
                                className: 'w-5 h-5 text-white',
                              }),
                          ],
                        }),
                      }),
                      (0, r.jsxs)('div', {
                        className: 'p-6 flex-1 flex flex-col '.concat(
                          'pending' === L(2) ? 'pointer-events-none' : ''
                        ),
                        children: [
                          (0, r.jsx)('div', {
                            className: 'flex-1',
                            children: (0, r.jsx)(T, { control: C, form: y }),
                          }),
                          'active' === L(2) &&
                            (0, r.jsxs)(l.P.div, {
                              initial: { opacity: 0, y: 10 },
                              animate: { opacity: 1, y: 0 },
                              className: 'mt-6 flex justify-between',
                              children: [
                                (0, r.jsxs)('button', {
                                  onClick: () => R(1),
                                  className:
                                    'flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors',
                                  children: [
                                    (0, r.jsx)(x.A, { className: 'w-4 h-4' }),
                                    (0, r.jsx)('span', {
                                      children: 'Zur\xfcck',
                                    }),
                                  ],
                                }),
                                (0, r.jsxs)('button', {
                                  onClick: D,
                                  disabled: !F.canProceedToStep3,
                                  className:
                                    'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all '.concat(
                                      F.canProceedToStep3
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                                    ),
                                  children: [
                                    (0, r.jsx)('span', { children: 'Weiter' }),
                                    (0, r.jsx)(n.A, { className: 'w-4 h-4' }),
                                  ],
                                }),
                              ],
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, r.jsx)('div', {
                  className: 'w-1/3',
                  children: (0, r.jsxs)(l.P.div, {
                    id: 'step-3',
                    initial: { opacity: 0, x: 20 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: 0.2 },
                    className:
                      'bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border transition-all min-h-[600px] flex flex-col '.concat(
                        'active' === L(3)
                          ? _[2].borderColor
                          : _[2].borderColor + ' opacity-30'
                      ),
                    children: [
                      (0, r.jsx)('div', {
                        className:
                          'px-6 py-4 transition-all rounded-t-2xl '.concat(
                            'active' === L(3)
                              ? 'bg-gradient-to-r '.concat(_[2].gradient)
                              : 'bg-gradient-to-r '.concat(
                                  _[2].gradient,
                                  ' opacity-30'
                                )
                          ),
                        children: (0, r.jsxs)('div', {
                          className: 'flex items-center justify-between',
                          children: [
                            (0, r.jsxs)('div', {
                              className: 'flex items-center gap-3',
                              children: [
                                (0, r.jsx)('div', {
                                  className: 'p-2 bg-white/20 rounded-lg',
                                  children: (0, r.jsx)(c.A, {
                                    className: 'w-5 h-5 text-white',
                                  }),
                                }),
                                (0, r.jsxs)('div', {
                                  children: [
                                    (0, r.jsxs)('div', {
                                      className: 'flex items-center gap-2',
                                      children: [
                                        (0, r.jsx)('h3', {
                                          className:
                                            'text-lg font-semibold text-white',
                                          children: _[2].title,
                                        }),
                                        (0, r.jsx)('button', {
                                          type: 'button',
                                          className:
                                            'p-1 text-white/80 hover:text-white transition-colors',
                                          title:
                                            'F\xf6rderh\xf6he: Pro Meter H\xf6henunterschied (Fassboden bis Zapfhahn) werden 0,1 bar zus\xe4tzlicher Druck ben\xf6tigt.',
                                          children: (0, r.jsx)(o.A, {
                                            className: 'w-4 h-4',
                                          }),
                                        }),
                                      ],
                                    }),
                                    (0, r.jsx)('p', {
                                      className: 'text-white/80 text-sm',
                                      children: _[2].subtitle,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            'active' === L(3) &&
                              (0, r.jsx)(u.A, {
                                className: 'w-5 h-5 text-white',
                              }),
                          ],
                        }),
                      }),
                      (0, r.jsxs)('div', {
                        className: 'p-6 flex-1 flex flex-col '.concat(
                          'pending' === L(3) ? 'pointer-events-none' : ''
                        ),
                        children: [
                          (0, r.jsx)('div', {
                            className: 'flex-1',
                            children: (0, r.jsxs)('div', {
                              className: 'space-y-4',
                              children: [
                                (0, r.jsxs)('div', {
                                  className: 'flex items-center gap-3',
                                  children: [
                                    (0, r.jsx)('div', {
                                      className:
                                        'p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg',
                                      children: (0, r.jsx)(c.A, {
                                        className:
                                          'w-5 h-5 text-indigo-600 dark:text-indigo-400',
                                      }),
                                    }),
                                    (0, r.jsxs)('div', {
                                      children: [
                                        (0, r.jsx)('h4', {
                                          className:
                                            'text-lg font-semibold text-slate-900 dark:text-white',
                                          children: 'F\xf6rderh\xf6he',
                                        }),
                                        (0, r.jsx)('p', {
                                          className:
                                            'text-sm text-slate-600 dark:text-slate-400',
                                          children:
                                            'H\xf6hendifferenz zwischen Zapfhahn und Fass',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, r.jsxs)('div', {
                                  className: 'space-y-3',
                                  children: [
                                    (0, r.jsx)('label', {
                                      className:
                                        'block text-sm font-medium text-slate-700 dark:text-slate-300',
                                      children: 'F\xf6rderh\xf6he in Metern',
                                    }),
                                    (0, r.jsx)('input', {
                                      type: 'number',
                                      min: '0.2',
                                      max: '10',
                                      step: '0.1',
                                      placeholder: 'z.B. 3.0',
                                      className:
                                        'w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
                                      value: y.watch('height') || '',
                                      onChange: e =>
                                        y.setFieldValue(
                                          'height',
                                          parseFloat(e.target.value) || 0
                                        ),
                                    }),
                                    (0, r.jsx)('div', {
                                      className:
                                        'text-sm text-slate-600 dark:text-slate-400',
                                      children:
                                        '0,1 bar pro Meter H\xf6henunterschied',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                          'active' === L(3) &&
                            (0, r.jsx)(l.P.div, {
                              initial: { opacity: 0, y: 10 },
                              animate: { opacity: 1, y: 0 },
                              className: 'mt-6 flex justify-start',
                              children: (0, r.jsxs)('button', {
                                onClick: () => R(2),
                                className:
                                  'flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors',
                                children: [
                                  (0, r.jsx)(x.A, { className: 'w-4 h-4' }),
                                  (0, r.jsx)('span', { children: 'Zur\xfcck' }),
                                ],
                              }),
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
        });
      }
      var G = s(3109);
      let U = [
        { temperature: 5, pressure: 0.8 },
        { temperature: 6, pressure: 0.9 },
        { temperature: 7, pressure: 1 },
        { temperature: 8, pressure: 1 },
        { temperature: 9, pressure: 1.1 },
        { temperature: 10, pressure: 1.2 },
        { temperature: 11, pressure: 1.3 },
        { temperature: 12, pressure: 1.4 },
        { temperature: 13, pressure: 1.5 },
        { temperature: 14, pressure: 1.5 },
        { temperature: 15, pressure: 1.6 },
        { temperature: 16, pressure: 1.7 },
        { temperature: 17, pressure: 1.8 },
        { temperature: 18, pressure: 1.9 },
        { temperature: 19, pressure: 1.9 },
        { temperature: 20, pressure: 2 },
        { temperature: 21, pressure: 2 },
        { temperature: 22, pressure: 2.1 },
        { temperature: 23, pressure: 2.2 },
        { temperature: 24, pressure: 2.3 },
        { temperature: 25, pressure: 2.4 },
        { temperature: 26, pressure: 2.5 },
      ];
      function X() {
        let { form: e } = W(),
          { temperatureRange: t, height: s, length: n, thickness: d } = e,
          c = (0, a.useMemo)(() => {
            if (
              !t ||
              !Array.isArray(t) ||
              2 !== t.length ||
              0 === s ||
              0 === n ||
              0 === d
            )
              return null;
            try {
              let e = e => {
                  let t = U.find(t => t.temperature === e);
                  return t ? t.pressure : 0;
                },
                r = function (e) {
                  let t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 1,
                    s = Math.pow(10, t);
                  return Math.round(e * s) / s;
                },
                a = e(t[0]),
                l = e(t[1]),
                i = 0.1 * s,
                c = n * d,
                o = r(a + i + c),
                m = r(l + i + c);
              return {
                range: { min: o, max: m },
                breakdown: {
                  saturation: { min: a, max: l },
                  height: i,
                  friction: c,
                },
                recommended: r((o + m) / 2, 2),
              };
            } catch (e) {
              return null;
            }
          }, [t, s, n, d]),
          o = null !== c,
          x = (0, a.useMemo)(
            () =>
              0.004 === d
                ? '4mm'
                : 0.007 === d
                  ? '7mm'
                  : 0.01 === d
                    ? '10mm'
                    : d > 0
                      ? ''.concat((1e3 * d).toFixed(0), 'mm')
                      : 'Nicht gesetzt',
            [d]
          ),
          u = (0, a.useMemo)(
            () =>
              t && Array.isArray(t) && 2 === t.length
                ? ''.concat(t[0], '\xb0C - ').concat(t[1], '\xb0C')
                : 'Nicht gesetzt',
            [t]
          );
        return (0, r.jsxs)(l.P.div, {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2, duration: 0.6 },
          className:
            'bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden',
          children: [
            (0, r.jsx)('div', {
              className:
                'bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4',
              children: (0, r.jsxs)('div', {
                className: 'flex items-center gap-3',
                children: [
                  (0, r.jsx)('div', {
                    className: 'p-2 bg-white/20 rounded-lg',
                    children: (0, r.jsx)(i.A, {
                      className: 'w-5 h-5 text-white',
                    }),
                  }),
                  (0, r.jsxs)('div', {
                    children: [
                      (0, r.jsx)('h3', {
                        className: 'text-lg font-semibold text-white',
                        children: 'Aktueller Zapfdruck',
                      }),
                      (0, r.jsx)('p', {
                        className: 'text-indigo-100 text-sm',
                        children:
                          'Live-Berechnung basierend auf Ihren Eingaben',
                      }),
                    ],
                  }),
                ],
              }),
            }),
            (0, r.jsx)('div', {
              className: 'p-6',
              children: (0, r.jsx)(R.N, {
                mode: 'wait',
                children: o
                  ? (0, r.jsxs)(
                      l.P.div,
                      {
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -20 },
                        transition: { duration: 0.4 },
                        className: 'space-y-6',
                        children: [
                          (0, r.jsx)('div', {
                            className: 'text-center',
                            children: (0, r.jsxs)(l.P.div, {
                              initial: { scale: 0.9 },
                              animate: { scale: 1 },
                              transition: {
                                delay: 0.2,
                                type: 'spring',
                                stiffness: 200,
                              },
                              className:
                                'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800',
                              children: [
                                (0, r.jsxs)('div', {
                                  className:
                                    'flex items-center justify-center gap-2 mb-2',
                                  children: [
                                    (0, r.jsx)(G.A, {
                                      className:
                                        'w-4 h-4 text-indigo-500 dark:text-indigo-300',
                                    }),
                                    (0, r.jsx)('div', {
                                      className:
                                        'text-xs text-indigo-500 dark:text-indigo-300 font-medium',
                                      children: 'Empfohlen',
                                    }),
                                  ],
                                }),
                                (0, r.jsx)('div', {
                                  className:
                                    'text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2',
                                  children: c.recommended,
                                }),
                                (0, r.jsxs)('div', {
                                  className:
                                    'text-xs text-indigo-500 dark:text-indigo-300 mb-1',
                                  children: [
                                    c.range.min.toFixed(2),
                                    ' -',
                                    ' ',
                                    c.range.max.toFixed(2),
                                  ],
                                }),
                                (0, r.jsx)('div', {
                                  className:
                                    'text-sm text-indigo-600 dark:text-indigo-400 font-medium',
                                  children: 'bar',
                                }),
                              ],
                            }),
                          }),
                          (0, r.jsxs)('div', {
                            className: 'space-y-3',
                            children: [
                              (0, r.jsxs)('h4', {
                                className:
                                  'font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2',
                                children: [
                                  (0, r.jsx)(m.A, {
                                    className: 'w-4 h-4 text-green-500',
                                  }),
                                  'Druckaufschl\xfcsselung:',
                                ],
                              }),
                              (0, r.jsxs)('div', {
                                className: 'space-y-2 text-sm',
                                children: [
                                  (0, r.jsxs)('div', {
                                    className:
                                      'flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg',
                                    children: [
                                      (0, r.jsx)('span', {
                                        className:
                                          'text-slate-600 dark:text-slate-400',
                                        children: 'S\xe4ttigungsdruck:',
                                      }),
                                      (0, r.jsxs)('span', {
                                        className:
                                          'font-medium text-slate-900 dark:text-white',
                                        children: [
                                          c.breakdown.saturation.min.toFixed(2),
                                          ' -',
                                          ' ',
                                          c.breakdown.saturation.max.toFixed(2),
                                          ' bar',
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, r.jsxs)('div', {
                                    className:
                                      'flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg',
                                    children: [
                                      (0, r.jsx)('span', {
                                        className:
                                          'text-slate-600 dark:text-slate-400',
                                        children: 'F\xf6rderh\xf6he:',
                                      }),
                                      (0, r.jsxs)('span', {
                                        className:
                                          'font-medium text-slate-900 dark:text-white',
                                        children: [
                                          c.breakdown.height.toFixed(2),
                                          ' bar',
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, r.jsxs)('div', {
                                    className:
                                      'flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg',
                                    children: [
                                      (0, r.jsx)('span', {
                                        className:
                                          'text-slate-600 dark:text-slate-400',
                                        children: 'Reibungsverluste:',
                                      }),
                                      (0, r.jsxs)('span', {
                                        className:
                                          'font-medium text-slate-900 dark:text-white',
                                        children: [
                                          c.breakdown.friction.toFixed(2),
                                          ' bar',
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, r.jsxs)('div', {
                            className:
                              'pt-4 border-t border-slate-200 dark:border-slate-700',
                            children: [
                              (0, r.jsxs)('h4', {
                                className:
                                  'font-semibold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2',
                                children: [
                                  (0, r.jsx)(C.A, {
                                    className: 'w-4 h-4 text-blue-500',
                                  }),
                                  'Aktuelle Werte:',
                                ],
                              }),
                              (0, r.jsxs)('div', {
                                className: 'space-y-2 text-sm',
                                children: [
                                  (0, r.jsxs)('div', {
                                    className:
                                      'flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg',
                                    children: [
                                      (0, r.jsx)('span', {
                                        className:
                                          'text-slate-600 dark:text-slate-400',
                                        children: 'Temperatur:',
                                      }),
                                      (0, r.jsx)('span', {
                                        className:
                                          'font-medium text-slate-900 dark:text-white',
                                        children: u,
                                      }),
                                    ],
                                  }),
                                  (0, r.jsxs)('div', {
                                    className:
                                      'flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg',
                                    children: [
                                      (0, r.jsx)('span', {
                                        className:
                                          'text-slate-600 dark:text-slate-400',
                                        children: 'H\xf6he:',
                                      }),
                                      (0, r.jsx)('span', {
                                        className:
                                          'font-medium text-slate-900 dark:text-white',
                                        children:
                                          e.height > 0
                                            ? ''.concat(e.height, 'm')
                                            : 'Nicht gesetzt',
                                      }),
                                    ],
                                  }),
                                  (0, r.jsxs)('div', {
                                    className:
                                      'flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg',
                                    children: [
                                      (0, r.jsx)('span', {
                                        className:
                                          'text-slate-600 dark:text-slate-400',
                                        children: 'L\xe4nge:',
                                      }),
                                      (0, r.jsx)('span', {
                                        className:
                                          'font-medium text-slate-900 dark:text-white',
                                        children:
                                          e.length > 0
                                            ? ''.concat(e.length, 'm')
                                            : 'Nicht gesetzt',
                                      }),
                                    ],
                                  }),
                                  (0, r.jsxs)('div', {
                                    className:
                                      'flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg',
                                    children: [
                                      (0, r.jsx)('span', {
                                        className:
                                          'text-slate-600 dark:text-slate-400',
                                        children: 'Durchmesser:',
                                      }),
                                      (0, r.jsx)('span', {
                                        className:
                                          'font-medium text-slate-900 dark:text-white',
                                        children: x,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      'pressure-result'
                    )
                  : (0, r.jsxs)(
                      l.P.div,
                      {
                        initial: { opacity: 0, scale: 0.95 },
                        animate: { opacity: 1, scale: 1 },
                        exit: { opacity: 0, scale: 0.95 },
                        transition: { duration: 0.3 },
                        className: 'text-center py-8',
                        children: [
                          (0, r.jsx)('div', {
                            className:
                              'w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center',
                            children: (0, r.jsx)(i.A, {
                              className: 'w-8 h-8 text-slate-400',
                            }),
                          }),
                          (0, r.jsx)('p', {
                            className:
                              'text-slate-600 dark:text-slate-400 text-sm',
                            children:
                              'F\xfcllen Sie alle erforderlichen Felder aus, um den Zapfdruck zu berechnen',
                          }),
                        ],
                      },
                      'empty-state'
                    ),
              }),
            }),
          ],
        });
      }
      function J() {
        let [e, t] = (0, a.useState)(1),
          s = (0, a.useMemo)(() => [1, 2, 3], []),
          d = (0, a.useCallback)(e => {
            t(e);
          }, []),
          c = (0, a.useCallback)(e => {}, []),
          o = (0, a.useCallback)(() => {
            let e = document.getElementById('calculator-form');
            if (e) {
              let t = e.offsetTop - 80 - 200;
              window.scrollTo({ top: t, behavior: 'smooth' });
            }
          }, []),
          m = (0, a.useCallback)(
            t =>
              t < e || (3 === t && 4 === e)
                ? 'completed'
                : t === e
                  ? 'active'
                  : 'pending',
            [e]
          );
        return (0, r.jsxs)('div', {
          className:
            'min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
          children: [
            (0, r.jsx)('header', {
              className:
                'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40',
              children: (0, r.jsx)('div', {
                className: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
                children: (0, r.jsx)('div', {
                  className: 'flex items-center justify-between h-16',
                  children: (0, r.jsxs)('div', {
                    className: 'flex items-center gap-3',
                    children: [
                      (0, r.jsx)('div', {
                        className: 'p-2 bg-amber-500 rounded-lg',
                        children: (0, r.jsx)(i.A, {
                          className: 'w-6 h-6 text-white',
                        }),
                      }),
                      (0, r.jsxs)('div', {
                        children: [
                          (0, r.jsx)('h1', {
                            className:
                              'text-xl font-bold text-slate-900 dark:text-white',
                            children: 'Zapfdruck Rechner',
                          }),
                          (0, r.jsx)('p', {
                            className:
                              'text-xs text-slate-600 dark:text-slate-400',
                            children: 'Bierzapfdruck berechnen',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
            }),
            (0, r.jsxs)('main', {
              className: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
              children: [
                (0, r.jsx)(l.P.div, {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  className: 'text-center py-40',
                  children: (0, r.jsxs)('div', {
                    className: 'max-w-4xl mx-auto px-4',
                    children: [
                      (0, r.jsx)(l.P.div, {
                        initial: { opacity: 0, scale: 0.8 },
                        animate: { opacity: 1, scale: 1 },
                        transition: { delay: 0.2 },
                        className: 'mb-8',
                        children: (0, r.jsx)('div', {
                          className:
                            'inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl shadow-lg',
                          children: (0, r.jsx)(i.A, {
                            className: 'w-12 h-12 text-white',
                          }),
                        }),
                      }),
                      (0, r.jsx)('h2', {
                        className:
                          'text-5xl font-bold text-slate-900 dark:text-white mb-6',
                        children: 'Optimaler Druck f\xfcr Ihr Zapfsystem',
                      }),
                      (0, r.jsx)('p', {
                        className:
                          'text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-2xl mx-auto',
                        children:
                          'Berechnen Sie den perfekten Druck f\xfcr Ihr Bierzapfsystem in nur 3 einfachen Schritten',
                      }),
                      (0, r.jsx)('p', {
                        className:
                          'text-lg text-slate-500 dark:text-slate-500 leading-relaxed mb-8 max-w-3xl mx-auto',
                        children:
                          'Unser professioneller Rechner ber\xfccksichtigt Temperatur, F\xf6rderh\xf6he und Leitungsl\xe4nge f\xfcr pr\xe4zise Ergebnisse. Perfekt f\xfcr Brauereien, Gastronomie und Hobby-Brauer.',
                      }),
                      (0, r.jsxs)(l.P.button, {
                        onClick: o,
                        whileHover: { scale: 1.05 },
                        whileTap: { scale: 0.95 },
                        className:
                          'inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200',
                        children: [
                          (0, r.jsx)('span', { children: 'Jetzt berechnen' }),
                          (0, r.jsx)(n.A, { className: 'w-6 h-6' }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, r.jsx)('div', {
                  className:
                    'w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent mb-16',
                }),
                (0, r.jsxs)('div', {
                  className: 'max-w-6xl mx-auto',
                  children: [
                    (0, r.jsxs)(l.P.div, {
                      initial: { opacity: 0, y: 20 },
                      animate: { opacity: 1, y: 0 },
                      className: 'text-center mb-8',
                      children: [
                        (0, r.jsx)('h2', {
                          className:
                            'text-3xl font-bold text-slate-900 dark:text-white mb-2',
                          children: 'Druck berechnen',
                        }),
                        (0, r.jsx)('p', {
                          className: 'text-slate-600 dark:text-slate-400',
                          children:
                            'F\xfcllen Sie die Felder Schritt f\xfcr Schritt aus',
                        }),
                      ],
                    }),
                    (0, r.jsx)(l.P.div, {
                      initial: { opacity: 0, y: 20 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.1 },
                      className: 'flex items-center justify-center mb-8',
                      children: (0, r.jsx)('div', {
                        className: 'flex items-center gap-4',
                        children: s.map((e, a) =>
                          (0, r.jsxs)(
                            'div',
                            {
                              className: 'flex items-center',
                              children: [
                                (0, r.jsx)('div', {
                                  className: 'flex flex-col items-center gap-2',
                                  children: (0, r.jsx)('button', {
                                    onClick: () => {
                                      ('completed' === m(e) ||
                                        'active' === m(e)) &&
                                        t(e);
                                    },
                                    className:
                                      'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all '.concat(
                                        'completed' === m(e)
                                          ? 'bg-blue-500 border-blue-500 text-white shadow-lg hover:bg-blue-600 hover:shadow-xl cursor-pointer'
                                          : 'active' === m(e)
                                            ? 'bg-blue-500 border-blue-500 text-white shadow-lg cursor-pointer'
                                            : 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                                      ),
                                    disabled: 'pending' === m(e),
                                    title:
                                      'completed' === m(e)
                                        ? 'Zur\xfcck zu Schritt '.concat(e)
                                        : 'active' === m(e)
                                          ? 'Aktueller Schritt '.concat(e)
                                          : 'Schritt '.concat(
                                              e,
                                              ' noch nicht verf\xfcgbar'
                                            ),
                                    children: (0, r.jsx)('span', {
                                      className: 'font-semibold text-lg',
                                      children: e,
                                    }),
                                  }),
                                }),
                                a < s.length - 1 &&
                                  (0, r.jsx)('div', {
                                    className:
                                      'w-20 h-1 mx-6 transition-colors '.concat(
                                        'completed' === m(e)
                                          ? 'bg-blue-500'
                                          : 'bg-slate-300 dark:bg-slate-600'
                                      ),
                                  }),
                              ],
                            },
                            e
                          )
                        ),
                      }),
                    }),
                    (0, r.jsxs)('div', {
                      id: 'calculator-form',
                      className: 'grid grid-cols-1 xl:grid-cols-4 gap-8',
                      children: [
                        (0, r.jsx)('div', {
                          className: 'xl:col-span-3',
                          children: (0, r.jsx)(O, {
                            onComplete: c,
                            onStepChange: d,
                            currentStep: e,
                          }),
                        }),
                        (0, r.jsx)('div', { children: (0, r.jsx)(X, {}) }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, r.jsx)('footer', {
              className:
                'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 mt-16',
              children: (0, r.jsx)('div', {
                className: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
                children: (0, r.jsxs)('div', {
                  className: 'text-center',
                  children: [
                    (0, r.jsxs)('div', {
                      className: 'flex items-center justify-center gap-2 mb-4',
                      children: [
                        (0, r.jsx)('div', {
                          className: 'p-2 bg-amber-500 rounded-lg',
                          children: (0, r.jsx)(i.A, {
                            className: 'w-4 h-4 text-white',
                          }),
                        }),
                        (0, r.jsx)('h3', {
                          className:
                            'text-lg font-semibold text-slate-900 dark:text-white',
                          children: 'Zapfdruck Rechner',
                        }),
                      ],
                    }),
                    (0, r.jsx)('div', {
                      className: 'mb-4',
                      children: (0, r.jsx)('p', {
                        className:
                          'text-xs text-slate-500 dark:text-slate-500 max-w-2xl mx-auto mt-2',
                        children:
                          'Es wird keine Gew\xe4hr \xfcber Richtigkeit der Werte \xfcbernommen! Die Berechnungen basieren auf allgemeinen Formeln und k\xf6nnen je nach spezifischen Bedingungen variieren.',
                      }),
                    }),
                    (0, r.jsxs)('div', {
                      className:
                        'flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-500',
                      children: [
                        (0, r.jsxs)('span', {
                          children: [
                            '\xa9 ',
                            new Date().getFullYear(),
                            ' Scelus Development (Lukas Jost)',
                          ],
                        }),
                        (0, r.jsx)('span', { children: '•' }),
                        (0, r.jsx)('span', { children: 'Wir ❤️ Open Source' }),
                        (0, r.jsx)('span', { children: '•' }),
                        (0, r.jsxs)('a', {
                          href: 'https://github.com/lusu007/zapfdruck',
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          className:
                            'hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center gap-1',
                          title: 'View on GitHub',
                          children: [
                            (0, r.jsx)('svg', {
                              className: 'w-4 h-4',
                              fill: 'currentColor',
                              viewBox: '0 0 24 24',
                              children: (0, r.jsx)('path', {
                                d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
                              }),
                            }),
                            'GitHub',
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
          ],
        });
      }
    },
    7554: (e, t, s) => {
      Promise.resolve().then(s.bind(s, 533));
    },
  },
  e => {
    (e.O(0, [720, 441, 964, 358], () => e((e.s = 7554))), (_N_E = e.O()));
  },
]);
