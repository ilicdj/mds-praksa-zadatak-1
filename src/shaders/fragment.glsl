uniform float uProgress;
uniform float uTime;
uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
    // Calculate distance from center of point
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    
    // Discard fragments outside the circle
    if (r > 1.0) {
        discard;
    }
    
    // Purple color
    vec3 color1 = vec3(0.3254901960784314, 0.30980392156862746, 0.6431372549019608);
    
    // Anti-aliased circle edge
    float delta = fwidth(r);
    float alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
    
    // Combine purple color with the circular shape
    gl_FragColor = vec4(color1, alpha);
}