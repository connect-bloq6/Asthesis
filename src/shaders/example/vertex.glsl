varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float uTime;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;

  vec3 pos = position;
  
  // Example: subtle wave animation
  pos.z += sin(pos.x * 2.0 + uTime) * 0.1;
  pos.z += cos(pos.y * 2.0 + uTime) * 0.1;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

