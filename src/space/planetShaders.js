// Shaders for planets, atmospheres, rings, orbit lines and far-away glints.
// Lighting is done in world space against the Sun's position (uSunPos) with
// the same sun colour/ambient everywhere, so every body agrees on day/night.

const SSTEP = /* glsl */ `
  float sstep(float a, float b, float x) {
    float t = clamp((x - a) / (b - a), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
  }
`

export const PLANET_VERTEX = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vObjDir;
  varying vec3 vWorldPos;
  varying vec3 vCenter;
  #ifdef RING_SHADOW
    varying vec3 vRingNormal;
  #endif
  void main() {
    vUv = uv;
    vObjDir = position;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vCenter = modelMatrix[3].xyz;
    #ifdef RING_SHADOW
      vRingNormal = normalize(mat3(modelMatrix) * vec3(0.0, 1.0, 0.0));
    #endif
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

export const PLANET_FRAGMENT = /* glsl */ `
  uniform sampler2D uMap;
  uniform sampler2D uNormalMap;
  uniform float uMapMix;
  uniform float uNormalMix;
  uniform float uNormalScale;
  uniform vec3 uBaseColor;
  uniform mat3 uNormalWorld;
  uniform vec3 uSunPos;
  uniform vec3 uSunColor;
  uniform vec3 uAmbient;
  uniform vec3 uAtmosphere;
  uniform float uWrap;
  uniform float uSpecular;
  varying vec2 vUv;
  varying vec3 vObjDir;
  varying vec3 vWorldPos;
  varying vec3 vCenter;
  #ifdef RING_SHADOW
    uniform sampler2D uRingProfile;
    uniform vec2 uRingRange;
    varying vec3 vRingNormal;
  #endif
  ${SSTEP}

  void main() {
    vec3 P = normalize(vObjDir);
    vec3 geometric = normalize(uNormalWorld * P);
    vec3 N = geometric;
    #ifdef USE_NORMALMAP
      vec3 east = vec3(P.z, 0.0, -P.x);
      float len = length(east);
      east = len > 1e-5 ? east / len : vec3(1.0, 0.0, 0.0);
      vec3 north = cross(P, east);
      vec3 bump = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
      bump.xy *= uNormalScale * uNormalMix;
      N = normalize(uNormalWorld * (east * bump.x + north * bump.y + P * max(bump.z, 0.05)));
    #endif

    vec3 albedo = mix(uBaseColor, texture2D(uMap, vUv).rgb, uMapMix);
    vec3 L = normalize(uSunPos - vWorldPos);
    vec3 V = normalize(cameraPosition - vWorldPos);
    float sunSide = dot(geometric, L);
    float lambert = max((dot(N, L) + uWrap) / (1.0 + uWrap), 0.0);
    // the geometric terminator stays crisp; relief can't light the night side
    float day = lambert * sstep(-0.06 - uWrap, 0.04, sunSide);

    #ifdef RING_SHADOW
      float facing = dot(L, vRingNormal);
      if (abs(facing) > 1e-4) {
        float t = dot(vCenter - vWorldPos, vRingNormal) / facing;
        if (t > 0.0) {
          float r = length(vWorldPos + L * t - vCenter);
          float u = (r - uRingRange.x) / (uRingRange.y - uRingRange.x);
          if (u > 0.0 && u < 1.0) day *= 1.0 - texture2D(uRingProfile, vec2(u, 0.5)).a * 0.82;
        }
      }
    #endif

    vec3 color = albedo * (uSunColor * day + uAmbient);
    vec3 H = normalize(L + V);
    color += uSunColor * uSpecular * pow(max(dot(N, H), 0.0), 40.0) * day;

    float facingViewer = max(dot(geometric, V), 0.0);
    float fresnel = pow(1.0 - facingViewer, 3.0);
    float limbLit = sstep(-0.25, 0.45, sunSide);
    // atmospheric haze on the limb: bright on the day side, a whisper at night
    color += uAtmosphere * fresnel * (0.06 + limbLit);
    // faint sky-light rim keeps dark silhouettes readable
    color += uAmbient * 0.7 * fresnel * (1.0 - limbLit);

    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

// Rendered as the back faces of a slightly larger sphere: the halo outside the
// limb is computed from how close each view ray passes to the planet.
export const ATMOSPHERE_VERTEX = /* glsl */ `
  varying vec3 vWorldPos;
  varying vec3 vCenter;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vCenter = modelMatrix[3].xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

export const ATMOSPHERE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uRadius;
  uniform float uShell;
  uniform vec3 uSunPos;
  varying vec3 vWorldPos;
  varying vec3 vCenter;
  ${SSTEP}

  void main() {
    vec3 D = normalize(vWorldPos - cameraPosition);
    vec3 offset = cameraPosition + D * dot(vCenter - cameraPosition, D) - vCenter;
    float height = length(offset);
    float x = clamp((height - uRadius) / (uShell - uRadius), 0.0, 1.0);
    float density = (1.0 - x) * (1.0 - x) * exp(-x * 2.5);
    vec3 L = normalize(uSunPos - vCenter);
    float lit = sstep(-0.35, 0.55, dot(offset / max(height, 1e-4), L));
    float forward = pow(max(dot(D, L), 0.0), 8.0);
    vec3 glow = uColor * density * (0.05 + lit + forward * 1.6);
    gl_FragColor = vec4(glow, 1.0);
    #include <colorspace_fragment>
  }
`

export const RING_VERTEX = /* glsl */ `
  varying vec3 vWorldPos;
  varying vec2 vLocal;
  varying vec3 vCenter;
  varying vec3 vNormal;
  void main() {
    vLocal = position.xy;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vCenter = modelMatrix[3].xyz;
    vNormal = normalize(mat3(modelMatrix) * vec3(0.0, 0.0, 1.0));
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

export const RING_FRAGMENT = /* glsl */ `
  uniform sampler2D uProfile;
  uniform vec2 uRange;
  uniform float uPlanetRadius;
  uniform vec3 uSunPos;
  uniform vec3 uSunColor;
  uniform vec3 uAmbient;
  uniform float uBrightness;
  varying vec3 vWorldPos;
  varying vec2 vLocal;
  varying vec3 vCenter;
  varying vec3 vNormal;
  ${SSTEP}

  void main() {
    float u = (length(vLocal) - uRange.x) / (uRange.y - uRange.x);
    if (u < 0.0 || u > 1.0) discard;
    vec4 profile = texture2D(uProfile, vec2(u, 0.5));
    vec3 L = normalize(uSunPos - vWorldPos);
    vec3 V = normalize(cameraPosition - vWorldPos);
    float mu0 = dot(vNormal, L);
    float mu = dot(vNormal, V);
    // optical depth: rings look denser seen edge-on
    float tau = -log(max(1.0 - profile.a, 0.02));
    float alpha = 1.0 - exp(-tau / max(abs(mu), 0.05));
    if (alpha < 0.003) discard;

    vec3 oc = vWorldPos - vCenter;
    float b = dot(oc, L);
    float shadow = 1.0;
    if (b < 0.0) shadow = sstep(uPlanetRadius * 0.97, uPlanetRadius * 1.03, sqrt(max(dot(oc, oc) - b * b, 0.0)));

    // the sunlit face reflects; from the far side light diffuses through thin parts
    float reflected = 0.3 + 0.7 * pow(abs(mu0), 0.35);
    float transmitted = exp(-tau) * (1.0 - exp(-tau)) * 2.4;
    float shade = mix(transmitted, reflected, step(0.0, mu0 * mu)) * sstep(0.0, 0.1, abs(mu0)) * shadow;
    vec3 color = profile.rgb * (uSunColor * shade * uBrightness + uAmbient * 0.6);
    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
  }
`

// aOrbit: x = phase along the orbit (0..1, eccentric anomaly), y = body slot,
// z = 1 for a dashed line (dwarf planets). Lines fade near their body, near the
// camera, with distance and while the camera sits deep inside the orbit (so
// they don't wrap the whole sky); a body's own orbit fades out as the camera
// closes in on it (uOwnFade, seen edge-on it would slice straight through the
// body), and the line brightens into a trail behind the body. Dashes come in
// power-of-two counts per orbit (uDashLevel = log2(count)), crossfaded, so
// they keep roughly the same length on screen at any zoom.
export const ORBIT_VERTEX = /* glsl */ `
  #define MAX_ORBITS 16
  attribute vec3 aColor;
  attribute vec3 aOrbit;
  uniform vec3 uBodyPos[MAX_ORBITS];
  uniform float uBodyPhase[MAX_ORBITS];
  uniform float uBodyRadius[MAX_ORBITS];
  uniform float uOrbitSize[MAX_ORBITS];
  uniform float uOwnFade[MAX_ORBITS];
  uniform float uDashLevel[MAX_ORBITS];
  uniform vec2 uInsideFade;
  uniform float uOpacity;
  varying vec4 vColor;
  varying vec3 vDash;
  ${SSTEP}

  void main() {
    int slot = int(aOrbit.y + 0.5);
    vec4 world = modelMatrix * vec4(position, 1.0);
    float camDist = distance(world.xyz, cameraPosition);
    float radius = uBodyRadius[slot];
    float nearBody = sstep(radius * 1.6, radius * 7.0 + 6.0, distance(position, uBodyPos[slot]));
    float nearCam = sstep(3.0, 45.0, camDist);
    float far = 1.0 / (1.0 + camDist * camDist / 3.6e7);
    float inside = sstep(uInsideFade.x, uInsideFade.y, distance(cameraPosition, modelMatrix[3].xyz) / uOrbitSize[slot]);
    float trail = exp(-fract(uBodyPhase[slot] - aOrbit.x) * 9.0);
    float alpha = (0.32 + 0.68 * trail) * nearBody * nearCam * far * inside * uOwnFade[slot] * uOpacity;
    vColor = vec4(aColor, alpha);
    float level = uDashLevel[slot];
    float count = exp2(floor(level));
    vDash = aOrbit.z > 0.0 ? vec3(aOrbit.x * count, aOrbit.x * count * 2.0, fract(level)) : vec3(-1.0);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

export const ORBIT_FRAGMENT = /* glsl */ `
  varying vec4 vColor;
  varying vec3 vDash;
  void main() {
    float on = 1.0;
    if (vDash.x >= 0.0) on = mix(step(fract(vDash.x), 0.55), step(fract(vDash.y), 0.55), vDash.z);
    if (on * vColor.a < 0.002) discard;
    gl_FragColor = vec4(vColor.rgb * vColor.a * on, 1.0);
    #include <colorspace_fragment>
  }
`

// A soft dot per body so worlds stay findable when they shrink below a pixel.
export const GLINT_VERTEX = /* glsl */ `
  attribute vec3 aColor;
  attribute float aRadius;
  uniform float uViewportHeight;
  uniform float uPixelRatio;
  uniform float uOpacity;
  uniform vec3 uSunPos;
  varying vec3 vColor;
  varying float vAlpha;
  ${SSTEP}

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec4 mv = viewMatrix * world;
    float depth = max(-mv.z, 1e-3);
    float pixels = aRadius * projectionMatrix[1][1] * 0.5 * uViewportHeight / depth;
    vec3 toSun = normalize(uSunPos - world.xyz);
    vec3 toCam = normalize(cameraPosition - world.xyz);
    float phase = 0.3 + 0.7 * (0.5 + 0.5 * dot(toSun, toCam));
    vAlpha = (1.0 - sstep(1.4, 4.0, pixels)) * step(0.0, -mv.z) * phase * uOpacity;
    vColor = aColor;
    mv.xyz += normalize(-mv.xyz) * aRadius * 1.2;
    gl_PointSize = vAlpha > 0.004 ? 6.0 * uPixelRatio : 0.0;
    gl_Position = projectionMatrix * mv;
  }
`

export const GLINT_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float a = (exp(-d * d * 7.0) + 0.35 * exp(-d * d * 2.0)) * (1.0 - d) * vAlpha;
    if (a < 0.003) discard;
    gl_FragColor = vec4(vColor * a, 1.0);
    #include <colorspace_fragment>
  }
`
