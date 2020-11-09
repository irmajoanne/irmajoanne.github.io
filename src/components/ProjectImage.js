import { extend } from "react-three-fiber";
import { shaderMaterial } from "drei";

const ProjectImage = shaderMaterial(
  {
    shift: 0,
    scale: 0,
    tex: undefined
  },
  `varying vec2 vUv;
   uniform float shift;
   uniform vec2 u_mouse;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.y +=  (sin(vUv.x * 3.1415926535897932384626433832795) * shift * 5.0) * 0.125;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
  }`,
  `varying vec2 vUv;
  uniform sampler2D tex;
  uniform float shift;
  uniform float scale;
  void main() {
    float angle = 1.55;
    vec2 uv = vUv;
    vec2 p = (vUv - vec2(0.5, 0.5)) * (1.0 - scale) + vec2(0.5, 0.5);
    vec2 offset = shift / 4.0 * vec2(cos(angle), sin(angle));
    vec4 cr = texture2D(tex, p + offset);
    vec4 cga = texture2D(tex, p);
    vec4 cb = texture2D(tex, p - offset);
    gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
  }`
)

extend({ ProjectImage })
