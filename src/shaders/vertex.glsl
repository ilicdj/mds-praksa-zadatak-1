uniform float uTime;
uniform float uProgress;
varying vec2 vUv;

void main() {
    vUv = uv;
    vec4 mvPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
    
    gl_PointSize = 3.0 * (1.0 / -mvPosition.z);
    
    gl_Position = projectionMatrix * mvPosition;
}