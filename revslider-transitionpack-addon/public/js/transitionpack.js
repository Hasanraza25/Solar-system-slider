/**
 * @preserve
 * @author    ThemePunch <info@themepunch.com>
 * @link      http://www.themepunch.com/
 * @copyright 2018 ThemePunch
 * @version 6.7.0
 */
!(function () {
  "use strict";
  if (
    ((window.SR7 ??= {}),
    (window._tpt ??= {}),
    (SR7.A ??= {}),
    (SR7.F ??= {}),
    (SR7.D ??= {}),
    void 0 !== SR7.A.transitionpack)
  )
    return;
  function e(e, t) {
    return (
      "t1" !== t && "t2" !== t && (t = "random"),
      "random" === t && (t = Math.random() > 0.5 ? "t1" : "t2"),
      "t1" === t ? "1. - uv." + e : "uv." + e
    );
  }
  (SR7.A.transitionpack = {
    cache: {},
    init: (e) => ["THREE", "WEBGL"],
    prepareLayer: (e, t) => {
      SR7.M[e];
      if ("slidebg" !== t.subtype) return;
      const a = [],
        r = t?.tl?.in?.bg?.addOns?.tpack?.ef ?? void 0,
        n = t?.tl?.in?.bg?.addOns?.tpack?.dplm ?? 1,
        s = SR7.A.transitionpack.dplmlib[n]?.src ?? void 0;
      return (
        void 0 !== r &&
          (a.push(
            _tpt.getShader(
              "tpack",
              r,
              SR7.E.resources.tpackURL +
                "public/shaders/" +
                ("fadeb" == r ? "fade" : r) +
                ".glsl"
            )
          ),
          "hero" == e &&
            console.log(
              "Load for Texture:",
              SR7.E.resources.tpackURL +
                "public/shaders/" +
                ("fadeb" == r ? "fade" : r) +
                ".glsl"
            )),
        s &&
          a.push(
            new Promise((t) => {
              _tpt.registerImage(
                SR7.E.resources.tpackURL + "public/textures/" + s,
                1,
                function (e) {
                  try {
                    (SR7.A.transitionpack.textures ??= {}),
                      (SR7.A.transitionpack.textures[e.params.dplmid] =
                        e.image);
                  } catch (e) {
                    console.log(e);
                  }
                  t();
                },
                "tpack_textures_" +
                  n +
                  "_" +
                  e +
                  Math.round(100 * Math.random()),
                { dplmid: n }
              );
            })
          ),
        a
      );
    },
    dplmlib: {
      1: { src: "transition/transition1.png" },
      2: { src: "transition/transition2.png" },
      3: { src: "transition/transition3.png" },
      4: { src: "transition/transition4.png" },
      5: { src: "transition/transition5.png" },
      6: { src: "transition/transition6.png" },
      7: { src: "displacement/disp1.jpg" },
      8: { src: "displacement/disp2.jpg" },
      9: { src: "displacement/disp3.jpg" },
      10: { src: "transition/transition7.png" },
      11: { src: "displacement/cracks.jpg" },
      12: { src: "displacement/tunnel.jpg" },
      13: { src: "displacement/waterfall.jpg" },
      14: { src: "displacement/wire.jpg" },
      15: { src: "displacement/zigzag.jpg" },
      16: { src: "displacement/paper.jpg" },
      17: { src: "transition/transition5v.png" },
    },
    addPASS: function (e, t) {
      if (void 0 !== SR7.WEBGL.postProcessing) {
        switch (t.pp) {
          case "GlitchPass":
          case "glitches":
            (t.ppga = parseFloat(t.ppga)),
              (t.ppgs = parseFloat(t.ppgs)),
              (t.ppgr = parseFloat(t.ppgr)),
              (t.ppgl = parseFloat(t.ppgl)),
              (e.three.postRendering = SR7.WEBGL.postProcessing(
                "GlitchPass",
                e.three.renderer,
                e.three.scene,
                e.three.camera,
                { seed: t.ppgs, amount: t.ppga, repeat: t.ppgr, len: t.ppgl }
              ));
            break;
          case "GlitchNoisePass":
          case "glitch2":
            e.three.postRendering = SR7.WEBGL.postProcessing(
              "GlitchNoisePass",
              e.three.renderer,
              e.three.scene,
              e.three.camera,
              {
                duration: e.dur,
                width: e.width / _tpt.dpr,
                height: e.height / _tpt.dpr,
              }
            );
            break;
          case "BlurPass":
          case "blur":
            if ("motion" === t.ppbt) {
              var a = {};
              "skew" == t.ef &&
                1 == t.sh &&
                ((a.name = "m=qinticOut(m, 10.);"),
                (a.function =
                  "float qinticOut(float t, float power) { return 1.0 - pow(1. - t, power); }")),
                isNaN(Math.round(t.smartX)) ||
                  isNaN(Math.round(t.smartY)) ||
                  (e.three.postRendering = SR7.WEBGL.postProcessing(
                    "BlurPass",
                    e.three.renderer,
                    e.three.scene,
                    e.three.camera,
                    {
                      left: Math.round(t.smartX),
                      top: Math.round(t.smartY),
                      width: e.width / _tpt.dpr,
                      height: e.height / _tpt.dpr,
                      intensity: 0.1,
                      inlineEase: a,
                    }
                  ));
            }
            break;
          case "FilmPass":
          case "film":
            (t.ppfn = parseFloat(t.ppfn)),
              (t.ppfs = parseFloat(t.ppfs)),
              (t.ppfh = parseFloat(t.ppfh)),
              (t.ppfbw =
                "true" == t.ppfbw || (1 == t.ppfbw && "false" != t.ppfbw)),
              (e.three.postRendering = SR7.WEBGL.postProcessing(
                "FilmPass",
                e.three.renderer,
                e.three.scene,
                e.three.camera,
                {
                  noise: t.ppfn / 100,
                  scale: t.ppfs / 100,
                  size: t.ppfh,
                  grayscale: t.ppfbw,
                }
              ));
        }
        e.three.postRendering && (e.three.postRendering.type = t.pp);
      }
    },
    fitCameraToObject: function (e, t) {
      (e.three.lastDim = {
        width: e.width / _tpt.dpr,
        height: e.height / _tpt.dpr,
      }),
        (e.three.camera.aspect = e.width / e.height),
        "cubetwist" === t.tpack.ef &&
          e.height > e.width &&
          (e.three.camera.aspect = e.height / e.width),
        (e.three.CY = 1 / e.three.camera.aspect),
        e.three.camera.updateProjectionMatrix(),
        e.three.renderer.setSize(e.width / _tpt.dpr, e.height / _tpt.dpr, !1),
        SR7.D.transitions[e.callFromAnimatedCanvasUpdateEffect].fit(e),
        (e.three.camera.fov =
          2 *
          Math.atan(e.three.CY / (2 * e.three.camera.position.z)) *
          (180 / Math.PI)),
        e.three.camera.updateProjectionMatrix();
    },
    webGlSceneUpdate: function (e, t) {
      e &&
        e.three &&
        e.three.canvas &&
        e.three.camera &&
        e.three.canvas.offsetHeight &&
        ((void 0 !== e.three.lastDim &&
          e.three.lastDim.width === e.width &&
          e.three.lastDim.height === e.height) ||
          SR7.A.transitionpack.fitCameraToObject(e, t),
        (e.video || e.panzoom) && (e.three.texture.needsUpdate = !0),
        e.three.camera.updateProjectionMatrix(),
        e.three.renderer.render(e.three.scene, e.three.camera),
        e.three.postRendering &&
          e.three.postRendering.effectPass &&
          e.three.postRendering.effectPass.uniforms &&
          e.three.postRendering.effectPass.uniforms.progress &&
          (e.three.postRendering.effectPass.uniforms.progress.value =
            e.three.progress.value),
        e.three.postRendering &&
          e.three.postRendering.composer &&
          e.three.postRendering.composer.render(),
        e.three.postRendering &&
          e.three.postRendering.nodepost &&
          e.postRendering.nodepost.render(
            e.three.scene,
            e.three.camera,
            e.postRendering.frame
          ),
        ("spin" !== t.tpack.ef &&
          "rings" !== t.tpack.ef &&
          "perspective" !== t.tpack.ef &&
          "zoom" !== t.tpack.ef &&
          "blur" !== t.tpack.ef) ||
          void 0 === t.tpack.ao ||
          "none" === t.tpack.ao ||
          (function (e, t) {
            var a = parseFloat(t.ox) / 100,
              r = parseFloat(t.oy) / 100;
            if ("center" === t.ao)
              (a += (1 - a - 0.5) * e.three.progress.value),
                (r += (1 - r - 0.5) * e.three.progress.value);
            else if ("inverse" === t.ao)
              (a += (1 - a - a) * e.three.progress.value),
                (r += (1 - r - r) * e.three.progress.value);
            else {
              var n = "";
              t.ao,
                (n =
                  "M0,0 C0,31 12.502,53.904 21,71.666 23.297,76.474 41.612,87.014 41.612,87.014 41.612,87.014 55.195,91.292 59.191,89.37 65.079,86.535 74.337,76.113 76.821,70.068 79.289,64.058 79.603,50.337 77.786,44.101 76.012,38.014 68.806,26.324 63.206,23.354 58.575,20.897 46.201,21.762 42.33,25.295 38.918,28.407 39.793,39.227 40.895,43.712 41.873,47.695 50.179,57.243 50.179,57.243");
              var s = { x: 0, y: 0 },
                i = _tpt.gsap.to(s, { motionPath: { path: n }, ease: "none" });
              i.pause().progress(e.three.progress.value),
                (a = s.x / 100),
                (r = 1 - s.y / 100),
                i.kill(),
                (i = null);
            }
            "perspective" === t.ef &&
              (e.three.material.uniforms.angle.value = Math.atan2(
                0.5 - a,
                0.5 - r
              ));
            (e.three.material.uniforms.ox.value = a),
              (e.three.material.uniforms.oy.value = r);
          })(e, t.tpack));
    },
  }),
    (SR7.D ??= {}),
    (SR7.D.transitions ??= {}),
    (SR7.D.transitions.tpbasic = {
      getBasic: () => ({
        addOns: {
          tpack: {
            sx: 1,
            sy: 1,
            sz: 1,
            o: 0,
            sr: 1,
            rx: 180,
            ry: 180,
            rz: 90,
            col: 1,
            row: 1,
            cgz: 250,
            gz: 250,
            gx: 0,
            gy: 0,
            ie: "power2.inOut",
            ige: "power2.inOut",
            pp: "none",
            ppbf: 100,
            ppbm: 4,
            ppba: 20,
            ppbt: "motion",
            ppga: 90,
            ppgr: 5,
            ppgs: 0.3,
            ppgl: 120,
            ppfn: 80,
            ppfs: 82,
            ppfh: 256,
            ppfbw: !1,
            ef: "fade",
            dplm: 1,
            mfl: 0,
            dir: 0,
            dbas: !1,
            tlt: 0,
            rad: 90,
            w: 35,
            iny: 1,
            x: 0,
            y: 0,
            z: "default",
            td: 1,
            ref: 0.4,
            flo: 30,
            twe: "simple",
            twa: 0,
            twv: 230,
            twz: 30,
            twd: "left",
            twdi: 30,
            tws: "rgba(0, 0, 0, 0.7)",
            twf: "rgba(0, 0, 0, 0.7)",
            prange: 100,
            stri: 30,
            strs: 1,
            strf: 1,
            sko: 0,
            sh: !1,
            shx: 0,
            shy: 0,
            shz: 0,
            shr: 0,
            shv: 80,
            roz: -2,
            ox: 50,
            oy: 50,
            cicl: "rgba(0, 0, 0, 0.3)",
            cish: 0,
            cispl: 4,
            cimw: !1,
            cio: "alternate",
            cico: !1,
            ciad: !1,
            chm1: "random",
            chm2: "random",
            chm3: "random",
            chm4: "random",
          },
        },
      }),
      buildTimeline: (e, t, a, r, n, s) => {
        (n.tpack = n.addOns.tpack),
          (n.tpack.oy = 100 - parseInt(n.tpack.oy)),
          (a.dur = n.dur = n.ms / (n.sec ?? a.sec));
        let i = SR7.M[e]?.c?.leavingBG ?? !1;
        return (
          (a.panzoom = t.canvas.pan),
          (a.video = t.media || (i && i.media)),
          SR7.WEBGL.cleanThree(i ? i.el : t.el, a, ".sr7-tpack-canvas"),
          (a.three = SR7.WEBGL.getCanvas({ class: "sr7-tpack-canvas" })),
          (a.three.ms = n.ms / 1e3),
          i
            ? i.el.appendChild(a.three.canvas)
            : t.el.appendChild(a.three.canvas),
          (a.three.planeAspectRatio = 16 / 9),
          (a.three.fov = 150),
          SR7.A.transitionpack.webGlSceneUpdate(a, n),
          (a.callFromAnimatedCanvasUpdateEffect = n.e),
          (a.three.renderer = new THREE.WebGLRenderer({
            canvas: a.three.canvas,
            alpha: !0,
          })),
          a.three.renderer.setClearColor(16777215, 0),
          (a.three.camera = new THREE.PerspectiveCamera(
            a.three.fov,
            a.three.canvas.width / a.three.canvas.height,
            0.1,
            1e3
          )),
          (a.three.camera.position.z = 50),
          (a.three.scene = new THREE.Scene()),
          SR7.D.transitions[n.e].init(a, n, t, e),
          (a.onCompleteCallback = function (e, t, a) {
            e.hideCanvasAnim = _tpt.gsap.to(e.three.canvas, 0.1, {
              opacity: 0,
              onStart: function () {
                let e = SR7.M[a]?.c?.leavingBG ?? !1;
                e
                  ? (e.canvas.canvas.style.display = "block")
                  : (t.canvas.canvas.style.display = "block");
              },
              onComplete: function () {
                t.canvas.drawImg(t.canvas.cacheAltSrc, _tpt.dpr, !0);
                let r = SR7.M[a]?.c?.leavingBG ?? !1;
                SR7.M[a].current.id == t.skey && "in" == e.scene
                  ? (SR7.WEBGL.cleanThree(t.el, e, ".sr7-tpack-canvas"),
                    r && SR7.WEBGL.cleanThree(r.el, e, ".sr7-tpack-canvas"))
                  : SR7.M[a].prev.id == t.skey && "out" == e.scene
                  ? SR7.WEBGL.cleanThree(r.el, e, ".sr7-tpack-canvas")
                  : ((SR7.A.transitionpack.cache[a] ??= {}),
                    (SR7.A.transitionpack.cache[a][t.skey] = {
                      el: t.el,
                      T: e,
                    })),
                  SR7.D.transitions.tpbasic.fullCleanUp(a);
              },
            });
          }),
          (a.onInterruptCallback = (e, t, a) => {
            let r = SR7.M[a]?.c?.leavingBG ?? !1;
            r
              ? (r.canvas.canvas.style.display = "block")
              : (t.canvas.canvas.style.display = "block"),
              SR7.WEBGL.cleanThree(r ? r.el : t.el, e, ".sr7-tpack-canvas"),
              t.canvas.drawImg(t.canvas.cacheAltSrc, _tpt.dpr, !0);
          }),
          _tpt.gsap.timeline({
            onUpdate: function () {
              SR7.D.transitions[n.e].tick(a, t),
                SR7.A.transitionpack.webGlSceneUpdate(a, n);
            },
          })
        );
      },
      fullCleanUp: (e) => {
        if (SR7.A.transitionpack.cache[e]) {
          let t = Object.keys(SR7.A.transitionpack.cache[e]);
          for (let a = 0; a < t.length; a++)
            t[a] !== SR7.M[e].current.id &&
              t[a] !== SR7.M[e].prev.id &&
              (SR7.WEBGL.cleanThree(
                SR7.A.transitionpack.cache[e][t[a]].el,
                SR7.A.transitionpack.cache[e][t[a]].T,
                ".sr7-tpack-canvas"
              ),
              delete SR7.A.transitionpack.cache[e][t[a]]);
        }
      },
      build: function (e, t, a) {
        const { three: r } = e,
          { camera: n, scene: s } = r;
        (r.CY = 1 / n.aspect),
          s.remove(r.light),
          s.add((r.light = new THREE.AmbientLight("#ffffff", 1))),
          t.canvas.drawImg(t.canvas.cacheAltSrc, 1, !0);
        let i = (r.texture = new THREE.CanvasTexture(t.canvas.canvas));
        if (
          ((i.wrapS = THREE.RepeatWrapping),
          (i.wrapT = THREE.RepeatWrapping),
          i.repeat.set(1, 1),
          SR7.M[a]?.c?.leavingBG)
        ) {
          let e = (r.texture_leaving = new THREE.CanvasTexture(
            SR7.M[a].c.leavingBG.canvas.canvas
          ));
          (e.wrapS = THREE.RepeatWrapping),
            (e.wrapT = THREE.RepeatWrapping),
            e.repeat.set(1, 1),
            (r.material_leaving = new THREE.MeshPhongMaterial({
              transparent: !0,
              map: e,
            }));
        }
      },
      init: async function (e, t, a, r) {
        (t.tpack.ef = "fadeb" === t.tpack.ef ? "fade" : t.tpack.ef),
          SR7.D.transitions.tpbasic.build(e, a, r);
        let { uniforms: n, tpack: s } =
            await SR7.D.transitions.tpbasic.getUniforms(e, t),
          i = await _tpt.getShader(
            "tpack",
            t.tpack.ef,
            SR7.E.resources.tpackURL + "public/shaders/" + s.ef + ".glsl"
          );
        "chaos" === t.tpack.ef &&
          ((i = i.replace("#replaceChaos", n.replace)), delete n.replace),
          (n.src1 = { value: e.three.texture_leaving }),
          (n.src2 = { value: e.three.texture }),
          (n.progress = { value: 0 }),
          (n.threshold = { value: 0.1 }),
          (n.resolution = { value: new THREE.Vector4() }),
          n.displacement?.value && (n.displacement.value.needsUpdate = !0);
        const p = {
          extensions: {
            derivatives: "#extension GL_OES_standard_derivatives : enable",
          },
          side: THREE.DoubleSide,
          defines: n.defines || {},
          uniforms: n,
          vertexShader:
            "varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}",
          fragmentShader:
            "#if __VERSION__ < 130 \n#define TEXTURE2D texture2D \n#else \n#define TEXTURE2D texture \n#endif\n" +
            i,
          uniformsNeedUpdate: !0,
        };
        delete n.defines,
          (e.three.material = new THREE.ShaderMaterial(p)),
          (e.three.material.transparent = void 0 !== n.src1.value),
          SR7.D.transitions.tpbasic.planeAndFit(e, t),
          SR7.A.transitionpack.addPASS(e, s),
          SR7.D.transitions.tpbasic.updateResolution(e, s);
      },
      getTexture: (e = 1) => {
        let t = new THREE.Texture(SR7.A.transitionpack.textures[e]);
        return (t.image = SR7.A.transitionpack.textures[e]), t;
      },
      getUniforms: function (e, a) {
        let r = _tpt.extend({}, a.tpack);
        return (
          (r.z =
            "default" == r.z
              ? "flat" == r.ef
                ? 100
                : "spin" == r.ef
                ? 0
                : 250
              : r.z),
          (r.smartX = SR7.F.getSpecialValue(r.x, void 0, e.sdir)),
          (r.smartY = SR7.F.getSpecialValue(r.y, void 0, e.sdir)),
          (r.smartZ = SR7.F.getSpecialValue(r.z, void 0, e.sdir)),
          (r.smartTilt = SR7.F.getSpecialValue(r.tlt, void 0, e.sdir)),
          (r.smartIntensity = SR7.F.getSpecialValue(r.iny, void 0, e.sdir)),
          1 == r.dbas &&
            (r.dir =
              1 === e.sdir
                ? r.dir
                : 0 == r.dir
                ? 1
                : 1 == r.dir
                ? 0
                : 2 == r.dir
                ? 3
                : 2),
          { uniforms: (t[r.ef] && t[r.ef](e, r)) || {}, tpack: r }
        );
      },
      planeAndFit: function (e, t) {
        (e.three.plane = SR7.WEBGL.getPlane(e.three.material)),
          e.three.scene.add(e.three.plane),
          SR7.A.transitionpack.fitCameraToObject(e, t);
      },
      updateResolution: function (e) {
        (e.three.material.uniforms.resolution.value.x = e.width / _tpt.dpr),
          (e.three.material.uniforms.resolution.value.y = e.height / _tpt.dpr),
          (e.three.material.uniforms.resolution.value.z = 1),
          (e.three.material.uniforms.resolution.value.w = 1),
          (e.three.imageAspect =
            e.three.texture.image.height / e.three.texture.image.width),
          e.video ||
            e.panzoom ||
            (e.height / e.width > this.imageAspect
              ? (e.three.material.uniforms.resolution.value.z =
                  (e.width / e.height) * e.three.imageAspect)
              : (e.three.material.uniforms.resolution.value.w =
                  e.height / e.width / e.three.imageAspect));
      },
      extendTimeLine: function (e, t, a) {
        var r = new _tpt.gsap.timeline();
        return (
          (e.three.progress = { value: 1 }),
          r.add(
            _tpt.gsap.from(e.three.progress, parseInt(t.ms) / 2000, {
              value: 0,
              delay: 0.05,
              ease: t.tpack.ie,
            })
          ),
          r
        );
      },
      tick: function (e, t) {
        e.three.material &&
          (e.three.material.uniforms.progress.value = e.three.progress.value);
      },
      fit: function (e) {
        e.three.plane && e.three.plane.scale.set(1, e.three.CY);
      },
    });
  const t = {
    fade: (e, { mfl: t, dplm: a }) => {
      const r = !!t && (1 === t || 1 !== e.sdir),
        n = 17 === a || 6 === a;
      return {
        flipx: { value: !n && r },
        flipy: { value: !!n && r },
        displacement: { value: SR7.D.transitions.tpbasic.getTexture(a) },
      };
    },
    wave: (e, { rad: t, w: a, dplm: r }) => ({
      radius: { value: parseInt(t) / 100, min: 0.1, max: 2 },
      width: { value: parseInt(a) / 100, min: 0, max: 1 },
      displacement: { value: SR7.D.transitions.tpbasic.getTexture(r) },
    }),
    burnover: (e, { dplm: t }) => ({
      displacement: { value: SR7.D.transitions.tpbasic.getTexture(t) },
    }),
    burn: (e, { dir: t, smartIntensity: a }) => ({
      dir: { value: t },
      intensity: { value: 0.03 * a },
    }),
    chaos: (
      t,
      {
        chm1: a,
        chm2: r,
        chm3: n,
        chm4: s,
        smartX: i,
        smartY: p,
        smartIntensity: l,
        prange: o,
      }
    ) => {
      const c = `\n\t\t\tvw.x = ${e("y", a)} * ${e(
        "x",
        r
      )} * intensity;\n\t\t\tvw.y = ${e("x", n)} * ${e(
        "y",
        s
      )} * intensity;\n\t\t\t`;
      return {
        left: { value: Math.round(i) },
        top: { value: Math.round(p) },
        intensity: { value: parseFloat(l) / 10 },
        prange: { value: (parseInt(o) / 100) * 0.5 },
        replace: c,
      };
    },
    stretch: (
      e,
      { strs: t, smartX: a, smartY: r, smartIntensity: n, stri: s, strf: i }
    ) => {
      const p = parseInt(t) / 10,
        l = _tpt.gsap.utils.mapRange,
        o = p < 1 ? l(0, 1, 100, 10, p) : l(1, 10, 10, 2, p);
      return {
        left: { value: Math.round(a) },
        top: { value: 0 === a ? Math.round(r) : 0 },
        dir: { value: 0 === a ? 2 : 1 },
        intensity: { value: n },
        twistIntensity: { value: parseInt(s) / 10 },
        twistSize: { value: o },
        flipTwist: { value: i ? -1 : 1 },
      };
    },
    skew: (
      e,
      {
        smartX: t,
        smartY: a,
        smartIntensity: r,
        sko: n,
        prange: s,
        sh: i,
        shx: p,
        shy: l,
        shz: o,
        shr: c,
        shv: u,
      }
    ) => {
      const d = t && a ? 0 : t ? 1 : 2,
        h = SR7.F.getSpecialValue(c),
        v = _tpt.gsap.utils.mapRange;
      return {
        left: { value: Math.round(t) },
        top: { value: Math.round(a) },
        dir: { value: d },
        intensity: { value: (r / 100) * (d ? 30 : 10) },
        origin: { value: parseInt(n) / 100 },
        prange: { value: parseInt(s) / 200 },
        sh: { value: i },
        shx: { value: SR7.F.getSpecialValue(p, void 0, e.sdir) / 100 },
        shy: { value: SR7.F.getSpecialValue(l, void 0, e.sdir) / 100 },
        shz: { value: SR7.F.getSpecialValue(o, void 0, e.sdir) / 50 },
        shr: { value: h ? _tpt.DEG2RAD * h : 0 },
        shv: { value: v(0, 100, 6, 1, parseInt(u)) },
      };
    },
    perspective: (e, { ox: t, oy: a, roz: r, pr: n, prange: s }) => {
      const i = parseInt(t) / 100,
        p = parseInt(a) / 100,
        l = Math.atan2(0.5 - i, 0.5 - p),
        o = SR7.F.getSpecialValue(r, void 0, e.sdir);
      return {
        ox: { value: i },
        oy: { value: p },
        intensity: { value: parseInt(n) },
        rotation: {
          value: _tpt.DEG2RAD * (180 * Math.round(o, void 0, e.sdir)),
        },
        isShort: { value: o % 2 != 0 },
        angle: { value: l },
        prange: { value: (parseInt(s) / 100) * 0.5 },
      };
    },
    spin: (
      e,
      { ox: t, oy: a, smartIntensity: r, roz: n, smartZ: s, prange: i }
    ) => {
      const p = Math.round(SR7.F.getSpecialValue(n, void 0, e.sdir)),
        l = -s;
      return {
        ox: { value: parseInt(t) / 100 },
        oy: { value: parseInt(a) / 100 },
        intensity: { value: 0 === r ? 0 : r / 100 },
        roz: { value: p },
        zoom: { value: l > 0 ? l / 10 : l / 100 },
        isShort: { value: p % 2 != 0 },
        prange: { value: (parseInt(i) / 100) * 0.5 },
      };
    },
    cut: (e, { dir: t, w: a, ssx: r, ssy: n, dplm: s }) => ({
      dir: { value: t },
      width: { value: parseInt(a) / 10, min: 0, max: 10 },
      scaleX: { value: (parseInt(r) / 100) * 60, min: 0.1, max: 60 },
      scaleY: { value: (parseInt(n) / 100) * 60, min: 0.1, max: 60 },
      displacement: { value: SR7.D.transitions.tpbasic.getTexture(s) },
    }),
    flat: (
      e,
      { smartX: t, smartY: a, smartTilt: r, smartZ: n, prange: s }
    ) => ({
      left: { value: Math.round(t) },
      top: { value: Math.round(a) },
      tilt: { value: r / 100 },
      zoom: { value: n / 100 },
      prange: { value: (parseInt(s) / 100) * 0.5 },
    }),
    pano: (
      e,
      {
        smartX: t,
        smartY: a,
        smartTilt: r,
        smartIntensity: n,
        smartZ: s,
        prange: i,
      }
    ) => ({
      left: { value: Math.round(t) },
      top: { value: Math.round(a) },
      tilt: { value: r / 100 },
      pano: { value: 1 - n / 100 },
      zoomOut: { value: s / 100 },
      prange: { value: (parseInt(i) / 100) * 0.5 },
    }),
    overroll: (e, { dir: t, smartIntensity: a, dplm: r }) => ({
      dir: { value: t },
      intensity: { value: 0.01 * a },
      displacement: { value: SR7.D.transitions.tpbasic.getTexture(r) },
    }),
    water: (e, { smartIntensity: t }) => ({
      intensity: { value: (t / 100) * 10, min: 0, max: 10 },
    }),
    zoomover: (e, { smartIntensity: t }) => ({
      intensity: { value: t / 100, min: 0, max: 3 },
    }),
    morph: (e, { smartX: t, smartY: a, smartIntensity: r }) => ({
      left: { value: Math.round(t) },
      top: { value: Math.round(a) },
      intensity: { value: r / 100, min: 0, max: 1 },
    }),
    waterdrop: (e, { smartIntensity: t, rad: a }) => ({
      speed: { value: t },
      amplitude: { value: parseInt(a) },
      firstIn: { value: !e.notFirstIn },
    }),
    mosaic: (e, { smartX: t, smartY: a }) => ({
      endx: { value: t, min: -50, max: 50 },
      endy: { value: a, min: -50, max: 50 },
    }),
    mirrorcube: (e, { gz: t, ref: a, flo: r }) => ({
      persp: { value: 0.7 },
      unzoom: { value: parseFloat(t) / 100 },
      reflection: { value: a },
      floating: { value: parseFloat(r) / 10 },
    }),
    rings: (
      e,
      {
        ox: t,
        oy: a,
        smartIntensity: r,
        roz: n,
        cio: s,
        cicl: i,
        cispl: p,
        cish: l,
        cico: o,
        ciad: c,
        cimw: u,
        prange: d,
      }
    ) => {
      const h = r ? 11 - r / 10 : 0,
        v = Math.round(SR7.F.getSpecialValue(n, void 0, e.sdir)),
        m = "none" !== s,
        g = "grad" === s ? 1 : "solid" === s ? 2 : 0,
        f =
          ((R = i),
          3 == (R = _tpt.gsap.utils.splitColor(R)).length && (R[3] = 1),
          (R[0] /= 255),
          (R[1] /= 255),
          (R[2] /= 255),
          R);
      var R;
      return {
        ox: { value: parseInt(t) / 100 },
        oy: { value: parseInt(a) / 100 },
        iny: { value: h },
        roz: { value: v },
        isShort: { value: v % 2 != 0 },
        Splits: { value: p },
        iColor: { value: f },
        s: { value: parseInt(l) / 100 },
        useo: { value: m },
        grado: { value: g },
        cover: { value: o },
        altDir: { value: c },
        cnprog: { value: u },
        prange: { value: parseInt(d) / 200 },
        defines: { splits: p },
      };
    },
    zoom: (
      e,
      {
        ox: t,
        oy: a,
        roz: r,
        zi: n,
        zo: s,
        zwo: i,
        zwi: p,
        zb: l,
        prange: o,
        zre: c,
      }
    ) => {
      const u = Math.round(SR7.F.getSpecialValue(r, void 0, e.sdir)),
        d = _tpt.gsap.utils.mapRange,
        h = (e) => parseFloat(e);
      return (
        (s = -s),
        (n = -n),
        {
          ox: { value: h(t) / 100 },
          oy: { value: h(a) / 100 },
          roz: { value: u },
          isShort: { value: u % 2 != 0 },
          zOut: { value: h(s) > 0 ? h(s) / 10 : h(s) / 100 },
          zIn: { value: h(n) < 0 ? h(n) / 10 : h(n) / 100 },
          blur: { value: h(l) / 100 },
          warpOut: { value: i ? d(0, 100, 10, 0.5, h(i)) : 0 },
          warpIn: { value: p ? d(0, 100, 10, 0.5, h(p)) : 0 },
          prange: { value: (h(o) / 100) * 0.15 },
          rEnd: { value: h(c) / 100 },
        }
      );
    },
    colormelt: (e, {}) => {
      var t = [0.05, 0.1],
        a = [0.4, 0.5],
        r = [0.7, 0.8];
      return {
        zoomStrength: { value: 0.5 },
        amo: { value: 15 },
        sd: { value: 1.4 },
        Cs: { value: 1.7 },
        rMin: { value: t[0] },
        rMax: { value: t[1] },
        gMin: { value: a[0] },
        gMax: { value: a[1] },
        bMin: { value: r[0] },
        bMax: { value: r[1] },
      };
    },
    colorflow: (e, { smartX: t, smartY: a, smartIntensity: r, dplm: n }) => ({
      angle: {
        value: Math.atan2(Math.round(t), Math.round(a)) - 45 * _tpt.DEG2RAD,
      },
      left: { value: Math.abs(Math.round(a)) },
      top: { value: Math.abs(Math.round(a)) },
      intensity: { value: (r / 100) * 3, min: 0, max: 3 },
      displacement: { value: SR7.D.transitions.tpbasic.getTexture(n) },
    }),
    blur: (
      e,
      {
        ox: t,
        oy: a,
        roz: r,
        zo: n,
        zi: s,
        smartX: i,
        smartY: p,
        smartIntensity: l,
        prange: o,
        zre: c,
      }
    ) => {
      const u = Math.round(SR7.F.getSpecialValue(r, void 0, e.sdir)),
        d = -parseFloat(s),
        h = -parseFloat(n);
      return {
        left: { value: Math.round(i) },
        top: { value: Math.round(p) },
        ox: { value: parseInt(t) / 100 },
        oy: { value: parseInt(a) / 100 },
        roz: { value: u },
        isShort: { value: u % 2 != 0 },
        zOut: { value: h > 0 ? h / 10 : h / 100 },
        zIn: { value: d > 0 ? d / 10 : d / 100 },
        prange: { value: (parseInt(o) / 100) * 0.3 * 0.5 },
        rEnd: { value: parseFloat(c) / 100 },
        intensity: { value: l / 100, min: 0, max: 1 },
      };
    },
  };
  (_tpt.R ??= {}),
    (_tpt.R.transitionpack = _tpt.extend
      ? _tpt.extend(_tpt.R.transitionpack, { status: 2, version: "1.0" })
      : { status: 2, version: "1.0" }),
    window.dispatchEvent(new CustomEvent("SR7AdvancedTransitionsReady"));
})();
