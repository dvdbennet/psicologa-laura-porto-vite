/**
 * BreathingBlob — forma orgânica 3D que "respira" atrás da foto do hero.
 *
 * Three.js puro (sem React Three Fiber) para manter o bundle pequeno. Carregado
 * via import dinâmico só depois da primeira pintura, para não competir com a
 * foto (LCP).
 *
 * Interações:
 *  - ciclo de respiração de 8 s (inspira 4 s / expira 4 s)
 *  - ponteiro/toque: a forma gira e se deforma na direção do dedo/mouse
 *  - giroscópio (Android; no iOS só se a permissão já tiver sido dada)
 *  - rolagem: conforme o hero sai da tela a forma cresce e gira
 */
import {
  Clock,
  Color,
  IcosahedronGeometry,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";

const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uBreath;
uniform float uWarp;
uniform vec2 uPointer;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
${noise}
void main(){
  vec3 p = position;
  float n = snoise(p * 0.85 + vec3(uTime * 0.16, uTime * 0.1, 0.0));
  float n2 = snoise(p * 1.7 - vec3(0.0, uTime * 0.18, uTime * 0.08)) * 0.18;
  // o ponteiro "puxa" a superfície na direção dele
  float pull = max(dot(normalize(p), normalize(vec3(uPointer, 0.6))), 0.0);
  float disp = (n + n2) * (0.2 + uWarp * 0.1) + pull * uWarp * 0.16;
  p += normal * disp;
  p *= uBreath;
  vNoise = n;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vView = normalize(-mv.xyz);
  vNormal = normalize(normalMatrix * (normal + vec3(n * 0.35)));
  gl_Position = projectionMatrix * mv;
}`;

const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uOpacity;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
void main(){
  float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
  float t = smoothstep(-0.6, 0.8, vNormal.y + vNoise * 0.4);
  vec3 base = mix(uColorB, uColorA, t);
  vec3 col = mix(base, uColorC, fres * 0.85);
  // brilho suave de "vidro fosco"
  float spec = pow(max(dot(reflect(-vView, vNormal), normalize(vec3(0.4, 0.8, 0.6))), 0.0), 18.0);
  col += spec * 0.35;
  gl_FragColor = vec4(col, uOpacity * (0.62 + fres * 0.3));
}`;

export type BlobHandle = {
  destroy: () => void;
  setScrollProgress: (p: number) => void;
};

export function createBreathingBlob(
  canvas: HTMLCanvasElement,
  opts: { reducedMotion: boolean; mobile: boolean },
): BlobHandle {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.mobile ? 1.6 : 2));

  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.z = 6.2;

  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uBreath: { value: 1 },
      uWarp: { value: 0 },
      uPointer: { value: new Vector2(0, 0) },
      uColorA: { value: new Color("#A6EBD5") },
      uColorB: { value: new Color("#3FBFA2") },
      uColorC: { value: new Color("#F2FCF8") },
      uOpacity: { value: 0 },
    },
  });
  const mesh = new Mesh(new IcosahedronGeometry(1.5, opts.mobile ? 48 : 80), material);
  scene.add(mesh);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  // ---- interação -------------------------------------------------------
  const pointer = new Vector2(0, 0);
  const pointerTarget = new Vector2(0, 0);
  let warpTarget = 0;
  let scroll = 0;

  const onPointer = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    pointerTarget.set(
      ((e.clientX - r.left) / r.width) * 2 - 1,
      -(((e.clientY - r.top) / r.height) * 2 - 1),
    );
    warpTarget = e.pointerType === "touch" ? 1 : 0.7;
  };
  const onLeave = () => {
    warpTarget = 0;
    pointerTarget.set(0, 0);
  };
  const onOrient = (e: DeviceOrientationEvent) => {
    if (e.beta == null || e.gamma == null) return;
    // celular em pé ~ beta 45–70°
    pointerTarget.set(
      Math.max(-1, Math.min(1, e.gamma / 30)),
      Math.max(-1, Math.min(1, (55 - e.beta) / 30)),
    );
    warpTarget = Math.max(warpTarget, 0.35);
  };
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("pointerdown", onPointer, { passive: true });
  window.addEventListener("pointerup", onLeave, { passive: true });
  document.addEventListener("pointerleave", onLeave);
  if (opts.mobile) window.addEventListener("deviceorientation", onOrient, { passive: true });

  // ---- loop -------------------------------------------------------------
  const clock = new Clock();
  let raf = 0;
  let visible = true;
  let opacity = 0;

  const frame = () => {
    const t = clock.getElapsedTime();
    const u = material.uniforms;
    const motion = opts.reducedMotion ? 0 : 1;

    // respiração: 8 s por ciclo, curva suave (inspira/expira)
    const breath = 0.5 - 0.5 * Math.cos((t / 8) * Math.PI * 2);
    u.uBreath.value = 0.9 + breath * 0.1 * motion + scroll * 0.35;
    u.uTime.value = t * motion;

    pointer.lerp(pointerTarget, 0.06);
    u.uPointer.value.copy(pointer);
    u.uWarp.value += (warpTarget - u.uWarp.value) * 0.05;
    if (warpTarget > 0 && !opts.mobile) warpTarget *= 0.985;

    mesh.rotation.y = pointer.x * 0.5 + t * 0.06 * motion + scroll * 1.2;
    mesh.rotation.x = -pointer.y * 0.4 + scroll * 0.4;

    opacity += (1 - opacity) * 0.04;
    u.uOpacity.value = opacity;

    renderer.render(scene, camera);
    if (visible && !opts.reducedMotion) raf = requestAnimationFrame(frame);
  };

  const io = new IntersectionObserver(([entry]) => {
    const was = visible;
    visible = entry.isIntersecting;
    if (visible && !was && !opts.reducedMotion) raf = requestAnimationFrame(frame);
    if (!visible) cancelAnimationFrame(raf);
  });
  io.observe(canvas);

  if (opts.reducedMotion) {
    opacity = 1;
    frame();
  } else {
    raf = requestAnimationFrame(frame);
  }

  return {
    setScrollProgress(p) {
      scroll = p;
      if (opts.reducedMotion) frame();
    },
    destroy() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("pointerup", onLeave);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("deviceorientation", onOrient);
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
