// GLSL for the photo globe: photo panels, the blueprint core sphere and the
// back-face atmosphere glow.

export const PANEL_VERTEX = `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewW;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewW = cameraPosition - world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

export const PANEL_FRAGMENT = `
  uniform sampler2D uMap;
  uniform float uHasMap;
  uniform vec2 uCover;
  uniform float uAspect;
  uniform vec3 uTone;
  uniform vec3 uSignal;
  uniform float uHover;
  uniform float uReveal;
  uniform float uDim;
  uniform float uFade;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewW;

  float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    // rounded panel outline, in units of panel height
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
    float d = sdRoundRect(p, vec2(0.5 * uAspect, 0.5), 0.04);
    float aa = max(fwidth(d), 1e-4);
    float shape = 1.0 - smoothstep(-aa, aa, d);

    // reveal: a scan line sweeps bottom to top and leaves the photo behind it
    float scan = uReveal * 1.2 - 0.1;
    float shown = 1.0 - smoothstep(scan - 0.02, scan + 0.02, vUv.y);
    float scanGlow = (1.0 - smoothstep(0.0, 0.08, abs(vUv.y - scan))) * step(0.001, uReveal) * step(uReveal, 0.999);

    // cover-fit the photo, with a slight push-in on hover
    vec2 uv = (vUv - 0.5) * uCover * (1.0 - 0.06 * uHover) + 0.5;
    vec3 photo = mix(uTone, texture2D(uMap, uv).rgb, uHasMap);

    // panels turning away from the viewer fall into shadow
    float facing = clamp(dot(normalize(vNormalW), normalize(vViewW)), 0.0, 1.0);
    vec3 col = photo * mix(0.22, 1.0, smoothstep(0.05, 0.8, facing));

    // hairline border that brightens on hover
    float edge = 1.0 - smoothstep(0.0, 0.014 + aa, -d);
    col = mix(col, uSignal * (1.2 + uHover), edge * (0.32 + 0.68 * uHover));
    col += uSignal * scanGlow * 0.9;
    col *= (1.0 + 0.1 * uHover) * (1.0 - 0.7 * uDim) * uFade;

    float alpha = shape * shown;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`

export const CORE_VERTEX = `
  varying vec3 vObj;
  varying vec3 vNormalV;
  varying vec3 vViewV;
  void main() {
    vObj = position;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormalV = normalize(normalMatrix * normal);
    vViewV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

export const CORE_FRAGMENT = `
  uniform vec3 uBase;
  uniform vec3 uLine;
  uniform vec3 uRim;
  uniform float uFade;
  varying vec3 vObj;
  varying vec3 vNormalV;
  varying vec3 vViewV;
  const float PI = 3.141592653589793;
  float gridLine(float v, float cells) {
    float x = v * cells;
    float w = fwidth(x);
    return 1.0 - smoothstep(0.0, w * 1.1, abs(fract(x + 0.5) - 0.5));
  }
  void main() {
    vec3 n = normalize(vObj);
    float lat = asin(clamp(n.y, -1.0, 1.0)) / PI + 0.5;    // 0..1
    float lon = atan(n.x, n.z) / (2.0 * PI) + 0.5;          // 0..1
    float grid = max(gridLine(lat, 12.0), gridLine(lon, 24.0) * (1.0 - smoothstep(0.9, 0.98, abs(n.y))));
    float fresnel = pow(1.0 - max(dot(vNormalV, vViewV), 0.0), 2.6);
    vec3 col = uBase + uLine * grid * 0.3 + uRim * fresnel * 0.75;
    // fades by transparency, so a fading globe never blots out the stars behind it
    gl_FragColor = vec4(col, uFade);
    #include <colorspace_fragment>
  }
`

export const GLOW_VERTEX = `
  varying vec3 vNormalV;
  varying vec3 vViewV;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormalV = normalize(normalMatrix * normal);
    vViewV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

export const GLOW_FRAGMENT = `
  uniform vec3 uColor;
  uniform float uStrength;
  uniform float uFade;
  varying vec3 vNormalV;
  varying vec3 vViewV;
  void main() {
    float i = pow(clamp(-dot(vNormalV, vViewV), 0.0, 1.0), 1.7) * uStrength * uFade;
    gl_FragColor = vec4(uColor, clamp(i, 0.0, 1.0));
    #include <colorspace_fragment>
  }
`
