import { extend } from "react-three-fiber";
import { shaderMaterial } from "drei";

const ImageFadeMaterial = shaderMaterial(
  {
    dispFactor: 0,
    tex: undefined,
    tex2: undefined
  },
  `varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`,
  `varying vec2 vUv;
  uniform sampler2D tex;
  uniform sampler2D tex2;
  uniform sampler2D disp;
  uniform float _rot;
  uniform float dispFactor;
  uniform float effectFactor;
  void main() {
    vec2 uv = vUv;
    vec2 dir = uv - vec2(.5);
    float dist = length(dir);
    float scale = -1.0;
    vec2 offset = dir * scale * (sin((dispFactor * dist * 25.) - (dispFactor * 13.)) + .5) / 30.;
    vec2 distortedPosition = uv + offset;
    vec2 distortedPosition2 = uv + offset;
    vec4 _texture = texture2D(tex, distortedPosition);
    vec4 _texture2 = texture2D(tex2, distortedPosition2);
    vec4 finalTexture = mix(_texture, _texture2, dispFactor);
    gl_FragColor = finalTexture;
  }`
)

extend({ ImageFadeMaterial })
