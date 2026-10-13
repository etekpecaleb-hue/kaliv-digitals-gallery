// Shaders for the intro wordmark: a particle cloud that spirals into the
// letters (and is flung outward on exit), plus a glitchy glowing text plane.

export const PARTICLE_VERTEX = `
  uniform float uProgress;
  uniform float uExplode;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uScan;
  uniform float uSpan;
  attribute vec2 aTarget;
  attribute vec2 aStart;
  attribute vec4 aSeed; // x delay, y size, z phase, w swirl
  varying float vAlpha;
  varying float vHot;

  mat2 rot(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, -s, s, c);
  }

  void main() {
    float t = clamp((uProgress - aSeed.x * 0.45) / 0.55, 0.0, 1.0);
    float e = 1.0 - pow(1.0 - t, 3.0);
    // particles spiral in towards their letter
    vec2 offset = rot((1.0 - e) * (aSeed.w - 0.5) * 6.0) * aStart * (1.0 - e);
    vec2 pos = aTarget + offset;
    // a faint shimmer once the word has formed
    pos += vec2(sin(uTime * 2.1 + aSeed.z * 40.0), cos(uTime * 1.7 + aSeed.z * 33.0)) * 0.5 * e;
    // exit: everything is flung outward, the jump to space
    vec2 dir = normalize(aTarget + aStart * 0.03 + vec2(0.001));
    float x = uExplode * uExplode;
    pos += dir * x * (900.0 + 1700.0 * aSeed.y);

    float scanX = mix(-uSpan, uSpan, uScan);
    vHot = (1.0 - smoothstep(0.0, 70.0, abs(aTarget.x - scanX))) * step(0.001, uScan) * step(uScan, 0.999);
    vAlpha = (0.2 + 0.8 * e) * smoothstep(0.0, 0.2, t + 0.04) * (1.0 - smoothstep(0.5, 1.0, uExplode));

    gl_PointSize = (1.3 + aSeed.y * 1.7 + vHot * 1.6) * uPixelRatio * (1.0 + uExplode * 2.2);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.0, 1.0);
  }
`

export const PARTICLE_FRAGMENT = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vHot;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = (1.0 - smoothstep(0.1, 0.5, d)) * vAlpha * uOpacity;
    if (a < 0.01) discard;
    gl_FragColor = vec4(mix(uColorA, uColorB, vHot), a);
    #include <colorspace_fragment>
  }
`

export const TEXT_VERTEX = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const TEXT_FRAGMENT = `
  uniform sampler2D uMap;
  uniform float uOpacity;
  uniform float uGlitch;
  uniform float uTime;
  varying vec2 vUv;
  float hash(float n) { return fract(sin(n) * 43758.5453123); }
  void main() {
    vec2 uv = vUv;
    float seed = floor(uTime * 16.0);
    float slice = floor(uv.y * 12.0);
    float on = step(0.55, hash(slice * 3.7 + seed));
    uv.x += (hash(slice * 7.1 + seed) - 0.5) * 0.09 * uGlitch * on;
    vec2 split = vec2(0.008 * uGlitch, 0.0);
    vec4 r = texture2D(uMap, uv + split);
    vec4 g = texture2D(uMap, uv);
    vec4 b = texture2D(uMap, uv - split);
    float a = max(g.a, max(r.a, b.a));
    vec3 col = vec3(r.r * r.a, g.g * g.a, b.b * b.a) / max(a, 0.001);
    float lines = 0.9 + 0.1 * sin(vUv.y * 260.0 + uTime * 24.0);
    gl_FragColor = vec4(col, a * uOpacity * lines);
    #include <colorspace_fragment>
  }
`
