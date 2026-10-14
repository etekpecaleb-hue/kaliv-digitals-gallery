// Procedural surface recipes, one per texture key in worlds.js. Each is GLSL
// evaluated on the unit-sphere direction p of a texel, so maps are seamless
// and nothing pinches at the poles.
//
// Body recipes define  void surface(vec3 p, out vec3 color, out float height)
// with color in sRGB (0..1) and height in planet radii. Longitude 0 faces +z
// (the Moon's near side), east is +x, north +y.
//
// kind: 'surface' bakes albedo + a tangent-space normal map (bump = relief
// exaggeration), 'gas' bakes albedo only, 'data' bakes raw channels (vec4
// bake(vec3 p)), 'sky' is the background sky (see sky.js).

export const SPHERE_GLSL = /* glsl */ `
  #define PI 3.141592653589793
  #define TAU 6.283185307179586

  vec3 dirFrom(float latDeg, float lonDeg) {
    float lat = radians(latDeg);
    float lon = radians(lonDeg);
    return vec3(cos(lat) * sin(lon), sin(lat), cos(lat) * cos(lon));
  }

  float latDeg(vec3 p) { return degrees(asin(clamp(p.y, -1.0, 1.0))); }
  float lonDeg(vec3 p) { return degrees(atan(p.x, p.z)); }
  float angleTo(vec3 p, vec3 c) { return acos(clamp(dot(p, c), -1.0, 1.0)); }

  // Azimuthal-equidistant coordinates of p around c, in radians (x east, y north).
  vec2 tangentCoords(vec3 p, vec3 c) {
    vec3 east = normalize(cross(vec3(0.0, 1.0, 0.0), c));
    vec3 north = cross(c, east);
    vec2 t = vec2(dot(p, east), dot(p, north));
    float len = length(t);
    return len > 1e-6 ? t / len * angleTo(p, c) : vec2(0.0);
  }

  vec3 rotateAround(vec3 p, vec3 k, float a) {
    float c = cos(a);
    float s = sin(a);
    return p * c + cross(k, p) * s + k * dot(k, p) * (1.0 - c);
  }

  // Height of a crater at normalised distance d (1 = rim): bowl, raised rim, ejecta.
  float craterProfile(float d) {
    float bowl = d < 1.0 ? max(d * d - 1.0, -0.8) : 0.0;
    float rim = exp(-pow((d - 1.0) * 3.2, 2.0)) * 0.42;
    float ejecta = d > 1.0 ? 0.1 * exp(-(d - 1.0) * 2.5) : 0.0;
    return (bowl + rim + ejecta) * (1.0 - sstep(1.7, 2.2, d));
  }

  // A field of craters about 1/scale radians apart; density = share of cells
  // holding one. Returns height in radii; fresh collects bright young ejecta.
  float craterField(vec3 p, float scale, float density, float seed, inout float fresh) {
    vec3 q = p * scale;
    vec3 cell = floor(q);
    float h = 0.0;
    for (int z = -1; z <= 1; z++)
    for (int y = -1; y <= 1; y++)
    for (int x = -1; x <= 1; x++) {
      vec3 id = cell + vec3(float(x), float(y), float(z));
      vec3 r = hash33(id + seed * 7.31);
      if (r.x > density) continue;
      vec3 c = id + hash33(id + seed * 3.17 + 11.0);
      // the crater is where a ball around c cuts the sphere surface
      float dr = length(c) - scale;
      float size = 0.2 + 0.25 * r.y * r.y;
      float rs2 = size * size - dr * dr;
      if (rs2 <= 0.0) continue;
      vec3 delta = q - c;
      float d = sqrt(max(dot(delta, delta) - dr * dr, 0.0) / rs2);
      if (d > 2.2) continue;
      h += craterProfile(d) * sqrt(rs2);
      if (r.z > 0.88) fresh = max(fresh, 1.0 - sstep(0.6, 2.1, d));
    }
    return h / scale;
  }

  // Bright ray system around a young crater at c (radius and reach in radians).
  float craterRays(vec3 p, vec3 c, float radius, float reach, float seed) {
    float cosA = dot(p, c);
    if (cosA < 0.0) return 0.0;
    vec2 t = tangentCoords(p, c);
    float dist = length(t);
    float az = atan(t.y, t.x);
    vec2 ring = vec2(cos(az), sin(az));
    float streak = pow(max(snoise(vec3(ring * 7.0, seed)), 0.0), 1.4);
    streak += 0.6 * pow(max(snoise(vec3(ring * 19.0, seed + 5.0)), 0.0), 2.0);
    float fall = exp(-dist / reach) * sstep(radius * 0.9, radius * 1.8, dist);
    float halo = exp(-pow((dist - radius * 1.2) / radius, 2.0)) * 0.7;
    return clamp(streak * fall + halo, 0.0, 1.0);
  }

  float basin(vec3 p, float latDegC, float lonDegC, float radius) {
    return 1.0 - sstep(radius * 0.72, radius * 1.05, angleTo(p, dirFrom(latDegC, lonDegC)));
  }
`

const moon = /* glsl */ `
  float mare(vec3 p, float latDegC, float lonDegC, float radius) {
    return 1.0 - sstep(radius * 0.55, radius * 1.1, angleTo(p, dirFrom(latDegC, lonDegC)));
  }

  void surface(vec3 p, out vec3 col, out float h) {
    vec3 wp = warp3(p, 2.2, 0.06);
    // maria: ancient lava-filled basins, almost all on the near side (+z)
    float m = mare(wp, 33.0, -16.0, 0.34);
    m = max(m, mare(wp, 28.0, 17.0, 0.21));
    m = max(m, mare(wp, 8.5, 31.0, 0.26));
    m = max(m, mare(wp, 17.0, 59.0, 0.15));
    m = max(m, mare(wp, -7.0, 51.0, 0.18));
    m = max(m, mare(wp, -15.0, 35.0, 0.11));
    m = max(m, mare(wp, -21.0, -17.0, 0.2));
    m = max(m, mare(wp, -24.0, -39.0, 0.11));
    m = max(m, mare(wp, 56.0, 0.0, 0.11));
    m = max(m, mare(wp, 54.0, -28.0, 0.1));
    m = max(m, mare(wp, 1.0, -15.0, 0.13));
    m = max(m, mare(wp, 27.0, 147.0, 0.07));
    m = max(m, mare(wp, -35.0, 162.0, 0.07));
    m = max(m, mare(wp, 12.0, -55.0, 0.48) * sstep(-0.35, 0.1, fbm(p * 2.0 + 3.0, 4) + 0.12));
    m = clamp(m, 0.0, 1.0);

    float fresh = 0.0;
    float older = 1.0 - m * 0.85;
    h = craterField(p, 3.5, 0.45, 11.0, fresh) * 0.35 * older;
    h += craterField(p, 8.0, 0.55, 12.0, fresh) * 0.35 * older;
    h += craterField(p, 18.0, 0.6, 13.0, fresh) * 0.35 * (1.0 - m * 0.5);
    h += craterField(p, 40.0, 0.65, 14.0, fresh) * 0.35;
    h += craterField(p, 90.0, 0.7, 15.0, fresh) * 0.3;
    h += fbm(p * 6.0, 5) * 0.006 - m * 0.006;

    vec3 highland = mix(vec3(0.58, 0.57, 0.55), vec3(0.73, 0.72, 0.69), 0.5 + 0.5 * fbm(p * 4.0 + 2.0, 5));
    vec3 mareCol = mix(vec3(0.36, 0.36, 0.37), vec3(0.47, 0.46, 0.44), 0.5 + 0.5 * fbm(p * 7.0, 4));
    col = mix(highland, mareCol, m);
    float rays = craterRays(p, dirFrom(-43.3, -11.2), 0.05, 0.5, 1.0);
    rays = max(rays, craterRays(p, dirFrom(9.6, -20.1), 0.05, 0.22, 2.0) * 0.8);
    rays = max(rays, craterRays(p, dirFrom(8.1, -38.0), 0.02, 0.14, 3.0) * 0.6);
    rays = max(rays, fresh * 0.45);
    col = mix(col, vec3(0.86, 0.86, 0.84), rays * 0.45);
  }
`

const mercury = /* glsl */ `
  void surface(vec3 p, out vec3 col, out float h) {
    float plains = sstep(0.05, 0.3, fbm(p * 1.8 + 4.0, 5));
    float fresh = 0.0;
    float young = 1.0 - plains * 0.6;
    h = craterField(p, 3.0, 0.5, 1.0, fresh) * 0.38;
    h += craterField(p, 7.0, 0.6, 2.0, fresh) * 0.38;
    h += craterField(p, 16.0, 0.65, 3.0, fresh) * 0.36 * young;
    h += craterField(p, 36.0, 0.7, 4.0, fresh) * 0.34 * young;
    h += craterField(p, 80.0, 0.7, 5.0, fresh) * 0.3;
    h += fbm(p * 6.0, 4) * 0.006;
    // Caloris basin
    float a = angleTo(p, dirFrom(30.0, -160.0)) / 0.6;
    h += -0.012 * (1.0 - sstep(0.85, 1.05, a)) + exp(-pow((a - 1.0) * 7.0, 2.0)) * 0.014;

    float tone = 0.5 + 0.5 * fbm(p * 3.0 + 9.0, 5);
    col = mix(vec3(0.4, 0.38, 0.36), vec3(0.6, 0.57, 0.53), tone);
    col = mix(col, vec3(0.5, 0.47, 0.42), plains * 0.5);
    col = mix(col, vec3(0.6, 0.56, 0.5), (1.0 - sstep(0.8, 1.05, a)) * 0.25);
    float rays = craterRays(p, dirFrom(-3.0, 60.0), 0.03, 0.25, 4.0);
    rays = max(rays, craterRays(p, dirFrom(-36.0, -140.0), 0.03, 0.2, 5.0) * 0.8);
    col = mix(col, vec3(0.8, 0.78, 0.74), max(rays, fresh * 0.35) * 0.45);
  }
`

const venus = /* glsl */ `
  void surface(vec3 p, out vec3 col, out float h) {
    h = 0.0;
    float lat = latDeg(p);
    float lon = atan(p.x, p.z);
    vec3 q = warp3(p, 1.4, 0.28);
    // the cloud deck streams east-west, so stretch the noise along latitude
    float bands = fbm(vec3(q.x * 1.3, q.y * 5.0, q.z * 1.3), 5);
    float swirl = fbm(q * 2.4 + bands * 1.2, 4);
    float t = sstep(-0.5, 0.5, bands * 0.8 + swirl * 0.35);
    col = mix(vec3(0.83, 0.67, 0.43), vec3(0.97, 0.92, 0.79), t);
    // the dark sideways "Y" of the upper clouds
    float lonRel = atan(sin(lon - 0.6), cos(lon - 0.6));
    float arm = abs(abs(radians(lat)) - 0.5 * max(lonRel + 0.4, 0.0));
    float chevron = exp(-pow(arm / 0.13, 2.0)) * band(lonRel, -1.3, 1.4, 0.4);
    col *= 1.0 - chevron * 0.16 * (0.6 + 0.4 * swirl);
    col = mix(col, vec3(0.96, 0.93, 0.85), sstep(55.0, 80.0, abs(lat)) * 0.55);
  }
`

const mars = /* glsl */ `
  void surface(vec3 p, out vec3 col, out float h) {
    float lat = latDeg(p);
    float lon = lonDeg(p);
    vec3 wp = warp3(p, 2.0, 0.22);
    float southBias = 0.24 * exp(-pow((lat + 22.0) / 24.0, 2.0)) - 0.13;
    float dark = sstep(-0.02, 0.3, fbm(wp * 1.4, 5) + southBias) * (0.85 + 0.15 * fbm(p * 9.0, 3));
    dark = max(dark, basin(wp, 9.0, 69.0, 0.2) * 0.9);   // Syrtis Major
    dark = max(dark, basin(wp, 47.0, -30.0, 0.22) * 0.7); // Acidalia
    float hellas = 1.0 - sstep(0.22, 0.34, angleTo(p, dirFrom(-42.0, 70.0)));
    float argyre = 1.0 - sstep(0.1, 0.17, angleTo(p, dirFrom(-50.0, -43.0)));
    float tharsis = exp(-pow(angleTo(p, dirFrom(2.0, -105.0)) / 0.45, 2.0));
    dark *= (1.0 - hellas) * (1.0 - argyre * 0.8) * (1.0 - tharsis * 0.85);

    // Olympus Mons and the three Tharsis volcanoes
    float volcano = exp(-pow(angleTo(p, dirFrom(18.6, -134.0)) / 0.075, 2.0));
    volcano += 0.6 * exp(-pow(angleTo(p, dirFrom(-8.0, -121.0)) / 0.05, 2.0));
    volcano += 0.6 * exp(-pow(angleTo(p, dirFrom(1.0, -113.0)) / 0.05, 2.0));
    volcano += 0.6 * exp(-pow(angleTo(p, dirFrom(12.0, -104.0)) / 0.05, 2.0));

    // Valles Marineris: a long scar east of Tharsis, widest in the middle
    float along = radians(lon + 72.0);
    float wiggle = 0.035 * sin(along * 7.0) + 0.02 * fbm(p * 12.0, 3);
    float off = abs(radians(lat + 9.0) + along * 0.07 - wiggle);
    float width = 0.016 + 0.022 * exp(-pow((along + 0.15) / 0.3, 2.0));
    float valles = (1.0 - sstep(width * 0.35, width, off)) * band(along, -0.75, 0.75, 0.12);
    float branches = sstep(0.82, 0.95, ridged(p * 9.0 + 3.0, 3)) * exp(-pow(off / 0.09, 2.0)) * band(along, -0.6, 0.6, 0.2);
    float canyon = max(valles, branches * 0.6);

    float capEdge = 0.035 * fbm(p * 7.0, 4);
    float capN = sstep(76.0, 79.0, lat + capEdge * 57.0);
    float capS = sstep(80.0, 83.0, -lat + capEdge * 57.0);
    float troughs = sstep(0.6, 0.85, ridged(p * 7.0 + 2.0, 3)) * 0.35;

    float fresh = 0.0;
    float highlands = sstep(10.0, -25.0, lat + 18.0 * sin(radians(lon)));
    float craters = craterField(p, 6.0, 0.45, 21.0, fresh) * 0.3;
    craters += craterField(p, 14.0, 0.55, 22.0, fresh) * 0.3;
    craters += craterField(p, 32.0, 0.6, 23.0, fresh) * 0.25;
    h = craters * (0.3 + 0.7 * highlands) + tharsis * 0.012 + volcano * 0.02 - canyon * 0.012;
    h += -hellas * 0.01 + fbm(p * 5.0, 5) * 0.006;

    vec3 bright = vec3(0.82, 0.55, 0.35);
    vec3 rust = vec3(0.69, 0.37, 0.21);
    vec3 darkCol = vec3(0.37, 0.24, 0.17);
    col = mix(bright, rust, sstep(-0.35, 0.35, fbm(p * 4.0 + 2.0, 5)));
    col = mix(col, darkCol, dark * 0.85);
    col = mix(col, vec3(0.86, 0.62, 0.43), hellas * 0.5 + argyre * 0.3);
    col = mix(col, vec3(0.5, 0.27, 0.17), canyon * 0.85);
    vec3 ice = vec3(0.94, 0.93, 0.91) * (1.0 - troughs);
    col = mix(col, ice, max(capN, capS));
  }
`

const ceres = /* glsl */ `
  void surface(vec3 p, out vec3 col, out float h) {
    float fresh = 0.0;
    h = craterField(p, 4.0, 0.5, 31.0, fresh) * 0.4;
    h += craterField(p, 9.0, 0.55, 32.0, fresh) * 0.38;
    h += craterField(p, 20.0, 0.6, 33.0, fresh) * 0.36;
    h += craterField(p, 45.0, 0.65, 34.0, fresh) * 0.3;
    h += fbm(p * 5.0, 4) * 0.01;
    // Occator crater and its salt faculae
    vec3 occator = dirFrom(19.8, -120.7);
    float a = angleTo(p, occator);
    h += craterProfile(a / 0.075) * 0.018;
    vec2 t = tangentCoords(p, occator);
    float salt = exp(-dot(t, t) / (0.015 * 0.015));
    salt += 0.7 * exp(-dot(t - vec2(0.03, 0.012), t - vec2(0.03, 0.012)) / (0.008 * 0.008));
    salt += 0.5 * exp(-dot(t - vec2(0.04, -0.01), t - vec2(0.04, -0.01)) / (0.006 * 0.006));
    salt += 0.6 * exp(-pow(angleTo(p, dirFrom(42.2, 0.4)) / 0.012, 2.0));
    salt += 0.4 * exp(-pow(angleTo(p, dirFrom(-22.0, 100.0)) / 0.01, 2.0));
    col = mix(vec3(0.32, 0.31, 0.3), vec3(0.45, 0.44, 0.42), 0.5 + 0.5 * fbm(p * 3.0, 5));
    col = mix(col, vec3(0.55, 0.54, 0.52), fresh * 0.3);
    col = mix(col, vec3(0.97, 0.97, 0.95), clamp(salt, 0.0, 1.0));
  }
`

const jupiter = /* glsl */ `
  vec3 jupiterBands(float l) {
    vec3 zone = vec3(0.92, 0.88, 0.79);
    vec3 equator = vec3(0.9, 0.82, 0.68);
    vec3 neb = vec3(0.6, 0.4, 0.28);
    vec3 seb = vec3(0.64, 0.45, 0.32);
    vec3 temperate = vec3(0.72, 0.58, 0.45);
    vec3 polar = vec3(0.5, 0.48, 0.47);
    vec3 c = zone;
    c = mix(c, equator, band(l, -6.0, 6.0, 1.5));
    c = mix(c, neb, band(l, 7.0, 18.0, 1.3));
    c = mix(c, seb, band(l, -19.5, -8.0, 1.3));
    c = mix(c, temperate, band(l, 24.0, 31.0, 1.6) * 0.8);
    c = mix(c, temperate, band(l, -34.0, -27.0, 1.6) * 0.7);
    c = mix(c, temperate * 0.96, band(l, 36.0, 42.0, 2.0) * 0.6);
    c = mix(c, temperate * 0.96, band(l, -45.0, -39.0, 2.0) * 0.5);
    c = mix(c, polar, sstep(42.0, 64.0, abs(l)) * 0.85);
    return c;
  }

  void surface(vec3 p, out vec3 col, out float h) {
    h = 0.0;
    vec3 spotDir = dirFrom(-22.0, 30.0);
    vec2 g = tangentCoords(p, spotDir) / vec2(0.16, 0.1);
    float gr = length(g);
    // the Great Red Spot is an anticyclone: swirl the sampling point around it
    vec3 q = rotateAround(p, spotDir, 2.6 * exp(-gr * gr * 1.1));
    // generic eddies along the band edges
    vec3 tq = vec3(q.x * 2.0, q.y * 9.0, q.z * 2.0);
    float turb = fbm(tq + 3.0, 6);
    float eddies = fbm(q * 10.0 + turb * 1.5, 4);
    float wake = exp(-pow((latDeg(p) + 16.0) / 6.0, 2.0)) * sstep(0.1, -0.6, g.x * 0.085) * 1.6;
    float l = latDeg(q) + turb * 3.2 + eddies * (1.3 + wake);
    vec3 c = jupiterBands(l);
    c *= 0.92 + 0.14 * fbm(vec3(q.x * 1.5, q.y * 24.0, q.z * 1.5), 4);
    c *= 0.95 + 0.07 * fbm(vec3(q.x * 3.0, q.y * 60.0, q.z * 3.0), 3);
    c = mix(c, c * vec3(1.06, 0.95, 0.86), sstep(-0.2, 0.5, fbm(q * 2.5 + 8.0, 3)) * 0.6);
    // blue-grey festoons dragging off the north equatorial belt
    float festoon = exp(-pow((l - 5.5) / 2.2, 2.0)) * sstep(0.2, 0.6, fbm(vec3(q.x * 7.0, q.y * 3.0, q.z * 7.0), 4));
    c = mix(c, vec3(0.45, 0.47, 0.53), festoon * 0.55);
    // white ovals in the south temperate belt
    float ovals = 0.0;
    for (int i = 0; i < 4; i++) {
      vec2 o = tangentCoords(p, dirFrom(-33.5, -40.0 + float(i) * 62.0)) / vec2(0.035, 0.022);
      ovals = max(ovals, 1.0 - sstep(0.6, 1.0, length(o)));
    }
    c = mix(c, vec3(0.95, 0.93, 0.88), ovals * 0.85);
    // the Red Spot itself, in its pale hollow
    float spot = 1.0 - sstep(0.62, 1.0, gr);
    float hollow = exp(-pow((gr - 1.18) / 0.2, 2.0));
    vec3 red = mix(vec3(0.8, 0.46, 0.33), vec3(0.9, 0.6, 0.44), 0.5 + 0.5 * fbm(q * 26.0, 3));
    red = mix(red, vec3(0.86, 0.6, 0.45), exp(-gr * gr * 5.0) * 0.5);
    c = mix(c, vec3(0.95, 0.9, 0.81), hollow * 0.55);
    col = mix(c, red, spot);
  }
`

const saturn = /* glsl */ `
  void surface(vec3 p, out vec3 col, out float h) {
    h = 0.0;
    vec3 q = warp3(p, 3.0, 0.025);
    float l = latDeg(q) + fbm(vec3(q.x * 2.0, q.y * 14.0, q.z * 2.0), 5) * 1.3;
    vec3 base = vec3(0.89, 0.8, 0.61);
    vec3 light = vec3(0.95, 0.89, 0.73);
    vec3 dark = vec3(0.76, 0.64, 0.45);
    vec3 c = mix(base, light, band(l, -11.0, 11.0, 3.0) * 0.7);
    c = mix(c, dark, band(l, 14.0, 23.0, 3.0) * 0.45);
    c = mix(c, dark, band(l, -25.0, -16.0, 3.0) * 0.4);
    c = mix(c, dark * 1.04, band(l, 31.0, 39.0, 3.0) * 0.32);
    c = mix(c, dark * 1.04, band(l, -41.0, -33.0, 3.0) * 0.3);
    c = mix(c, dark * 1.06, band(l, 47.0, 54.0, 2.5) * 0.25);
    c *= 0.975 + 0.05 * sin(l * 1.35 + fbm(q * 6.0, 3)) + 0.03 * fbm(vec3(q.x * 3.0, q.y * 40.0, q.z * 3.0), 3);
    // the north polar hexagon
    float r = 90.0 - l;
    float az = atan(p.z, p.x);
    float sector = mod(az + 0.3, PI / 3.0) - PI / 6.0;
    float hex = r * cos(sector) / cos(PI / 6.0);
    vec3 polar = vec3(0.7, 0.71, 0.68);
    c = mix(c, polar, (1.0 - sstep(12.0, 14.5, hex)) * 0.45);
    c = mix(c, polar * 0.85, exp(-pow((hex - 14.0) / 1.2, 2.0)) * 0.3);
    c = mix(c, vec3(0.66, 0.58, 0.45), sstep(60.0, 85.0, -l) * 0.5);
    col = c;
  }
`

const uranus = /* glsl */ `
  void surface(vec3 p, out vec3 col, out float h) {
    h = 0.0;
    float l = latDeg(p) + fbm(vec3(p.x * 2.0, p.y * 10.0, p.z * 2.0), 4) * 1.5;
    vec3 c = vec3(0.64, 0.86, 0.89);
    c *= 0.975 + 0.025 * sin(l * 0.33) + 0.012 * sin(l * 1.1 + 1.0);
    c = mix(c, vec3(0.77, 0.93, 0.94), sstep(-35.0, -75.0, l) * 0.5);
    c = mix(c, vec3(0.73, 0.91, 0.93), sstep(55.0, 80.0, l) * 0.35);
    float clouds = sstep(0.55, 0.75, fbm(vec3(p.x * 4.0, p.y * 30.0, p.z * 4.0), 4)) * band(l, 20.0, 45.0, 6.0);
    col = mix(c, vec3(0.86, 0.97, 0.98), clouds * 0.35);
  }
`

const neptune = /* glsl */ `
  void surface(vec3 p, out vec3 col, out float h) {
    h = 0.0;
    float lat = latDeg(p);
    vec3 q = warp3(p, 2.5, 0.05);
    float l = lat + fbm(vec3(q.x * 2.0, q.y * 10.0, q.z * 2.0), 5) * 3.0;
    vec3 deep = vec3(0.17, 0.28, 0.72);
    vec3 mid = vec3(0.26, 0.42, 0.86);
    vec3 light = vec3(0.4, 0.57, 0.93);
    vec3 c = mix(mid, light, band(l, -14.0, 14.0, 6.0) * 0.45);
    c = mix(c, deep, band(l, -66.0, -46.0, 5.0) * 0.7);
    c = mix(c, deep * 1.05, band(l, 24.0, 46.0, 6.0) * 0.4);
    c = mix(c, vec3(0.42, 0.56, 0.9), sstep(68.0, 86.0, abs(l)) * 0.4);
    c *= 0.95 + 0.08 * fbm(q * 7.0, 4);
    // the Great Dark Spot with its bright companion cloud
    vec2 g = tangentCoords(p, dirFrom(-20.0, 0.0)) / vec2(0.25, 0.13);
    float spot = 1.0 - sstep(0.45, 1.0, length(g));
    c = mix(c, vec3(0.1, 0.16, 0.47), spot * 0.8);
    vec2 cc = tangentCoords(p, dirFrom(-27.5, 6.0)) / vec2(0.14, 0.022);
    float companion = exp(-dot(cc, cc) * 1.6);
    float streakNoise = fbm(vec3(q.x * 1.6, q.y * 38.0, q.z * 1.6), 5);
    float zones = band(l, -46.0, -30.0, 4.0) + band(l, 18.0, 34.0, 4.0) * 0.7 + band(l, -74.0, -64.0, 3.0) * 0.6;
    float streak = sstep(0.22, 0.6, streakNoise) * zones;
    col = mix(c, vec3(0.92, 0.95, 1.0), clamp(streak + companion, 0.0, 1.0) * 0.85);
  }
`

const pluto = /* glsl */ `
  void surface(vec3 p, out vec3 col, out float h) {
    float lat = latDeg(p);
    float lon = lonDeg(p);
    if (lon < 0.0) lon += 360.0;
    // Tombaugh Regio: a heart on the side facing away from Charon
    vec3 heartDir = dirFrom(18.0, 180.0);
    vec2 t = tangentCoords(p, heartDir) / 0.62;
    t += 0.08 * vec2(fbm(p * 4.0, 4), fbm(p * 4.0 + 3.0, 4));
    float X = t.x;
    float Y = t.y + 0.2;
    float a = X * X + Y * Y - 1.0;
    float heart = (1.0 - sstep(-0.035, 0.035, a * a * a - X * X * Y * Y * Y)) * sstep(0.0, 0.2, dot(p, heartDir));
    float sputnik = heart * (1.0 - sstep(-0.18, 0.05, X));
    vec3 cells = worley(p * 26.0);
    float cellEdges = sstep(0.02, 0.12, cells.y - cells.x);

    // Cthulhu and the other dark equatorial maculae
    float latw = lat + fbm(p * 3.0 + 9.0, 4) * 12.0;
    float cthulhu = band(lon, 15.0, 150.0, 18.0) * band(latw, -24.0, 8.0, 8.0);
    cthulhu *= sstep(-0.55, -0.1, fbm(p * 3.0 + 1.0, 5) + 0.1);
    float eastDark = band(lon, 205.0, 300.0, 15.0) * band(latw, -22.0, 0.0, 6.0) * sstep(0.0, 0.25, fbm(p * 3.5 + 5.0, 5));
    float dark = max(cthulhu, eastDark * 0.8) * (1.0 - heart);

    vec3 base = mix(vec3(0.8, 0.66, 0.52), vec3(0.89, 0.79, 0.65), 0.5 + 0.5 * fbm(p * 5.0, 5));
    base = mix(base, vec3(0.86, 0.68, 0.5), band(lat, 20.0, 50.0, 10.0) * 0.4);
    base = mix(base, vec3(0.8, 0.77, 0.72), sstep(50.0, 72.0, lat));
    vec3 heartCol = mix(vec3(0.88, 0.82, 0.74), vec3(0.95, 0.91, 0.85), sputnik);
    col = mix(base, vec3(0.38, 0.21, 0.13), dark);
    col = mix(col, heartCol, heart);
    col *= mix(1.0, 0.95 + 0.05 * cellEdges, sputnik);

    float fresh = 0.0;
    h = (craterField(p, 7.0, 0.4, 41.0, fresh) * 0.3 + craterField(p, 16.0, 0.5, 42.0, fresh) * 0.25) * (1.0 - heart);
    h += fbm(p * 6.0, 5) * 0.01 * (1.0 - sputnik) - sputnik * 0.008 + cellEdges * 0.002 * sputnik;
  }
`

const haumea = /* glsl */ `
  void surface(vec3 p, out vec3 col, out float h) {
    float n = fbm(p * 3.0, 5);
    float sparkle = pow(0.5 + 0.5 * snoise(p * 70.0), 5.0);
    vec3 ice = mix(vec3(0.84, 0.87, 0.92), vec3(0.95, 0.96, 0.98), 0.5 + 0.5 * n);
    ice += sparkle * 0.08;
    float spot = 1.0 - sstep(0.18, 0.45, angleTo(p, dirFrom(12.0, 60.0)) + 0.06 * fbm(p * 6.0, 3));
    col = mix(ice, vec3(0.64, 0.4, 0.36), spot * 0.8);
    float fresh = 0.0;
    h = fbm(p * 4.0, 5) * 0.012 + craterField(p, 8.0, 0.4, 51.0, fresh) * 0.2;
  }
`

const makemake = /* glsl */ `
  void surface(vec3 p, out vec3 col, out float h) {
    vec3 base = mix(vec3(0.62, 0.4, 0.29), vec3(0.8, 0.58, 0.44), 0.5 + 0.5 * fbm(p * 3.0, 5));
    float frost = sstep(0.1, 0.35, fbm(warp3(p, 2.0, 0.2) * 2.5 + 7.0, 5));
    col = mix(base, vec3(0.88, 0.78, 0.68), frost * 0.35);
    col *= 1.0 - sstep(0.75, 0.9, ridged(p * 3.0, 4)) * 0.12;
    float fresh = 0.0;
    h = fbm(p * 5.0, 5) * 0.01 + craterField(p, 10.0, 0.45, 61.0, fresh) * 0.25;
  }
`

const eris = /* glsl */ `
  void surface(vec3 p, out vec3 col, out float h) {
    col = mix(vec3(0.83, 0.83, 0.85), vec3(0.95, 0.95, 0.95), 0.5 + 0.5 * fbm(p * 3.0, 5));
    col = mix(col, vec3(0.9, 0.86, 0.8), sstep(0.2, 0.5, fbm(p * 2.0 + 4.0, 4)) * 0.45);
    float fresh = 0.0;
    h = fbm(p * 5.0, 5) * 0.008 + craterField(p, 9.0, 0.4, 71.0, fresh) * 0.2;
  }
`

// Sun surface data: r granulation, g mottling, b sunspots, a faculae.
const sun = /* glsl */ `
  vec4 bake(vec3 p) {
    vec3 cells = worley(warp3(p, 6.0, 0.012) * 34.0);
    float granules = sstep(0.0, 0.32, cells.y - cells.x) * (0.75 + 0.25 * cells.z);
    float mottle = 0.5 + 0.5 * fbm(p * 5.0, 5);
    float lat = abs(latDeg(p));
    float belt = band(lat, 8.0, 32.0, 5.0);
    float activity = fbm(p * 6.0 + 11.0, 5);
    float spots = sstep(0.36, 0.5, activity) * belt;
    spots = max(spots, sstep(0.5, 0.56, activity) * belt);
    float faculae = sstep(0.18, 0.4, activity) * belt;
    return vec4(granules, mottle, spots, faculae);
  }
`

export const RECIPES = {
  moon: { kind: 'surface', glsl: moon, bump: 3.0 },
  mercury: { kind: 'surface', glsl: mercury, bump: 3.0 },
  venus: { kind: 'gas', glsl: venus },
  mars: { kind: 'surface', glsl: mars, bump: 3.0 },
  ceres: { kind: 'surface', glsl: ceres, bump: 3.0 },
  jupiter: { kind: 'gas', glsl: jupiter },
  saturn: { kind: 'gas', glsl: saturn },
  uranus: { kind: 'gas', glsl: uranus },
  neptune: { kind: 'gas', glsl: neptune },
  pluto: { kind: 'surface', glsl: pluto, bump: 3.0 },
  haumea: { kind: 'surface', glsl: haumea, bump: 2.5 },
  makemake: { kind: 'surface', glsl: makemake, bump: 2.5 },
  eris: { kind: 'surface', glsl: eris, bump: 2.5 },
  sun: { kind: 'data', glsl: sun },
}
