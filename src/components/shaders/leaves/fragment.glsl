uniform float time;
uniform vec2 resolution;
uniform float factor;
uniform float scale;
uniform vec3 movement;
uniform sampler2D textr;
varying vec2 vUv;
void main()	{
    vec2 uv = vUv / scale + movement.xy * factor;
    vec4 color = texture2D(textr, uv);
    if (color.a < 0.1) discard;
    gl_FragColor = vec4(color.rgb, .1);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}