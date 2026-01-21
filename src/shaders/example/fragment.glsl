varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float uTime;
uniform vec3 uColor;

void main() {
  // Fresnel effect for edge glow
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(viewDirection, vNormal), 2.0);

  // Animate color based on time
  vec3 color = uColor;
  color += fresnel * 0.5;

  // Output
  gl_FragColor = vec4(color, 1.0);
}

