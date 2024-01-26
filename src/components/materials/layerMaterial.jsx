import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import vertexShader from "../shaders/leaves/vertex.glsl";
import fragmentShader from "../shaders/leaves/fragment.glsl";

const LayerMaterial = shaderMaterial(
  { textr: null, movement: [0, 0, 0], scale: 1, factor: 0, wiggle: 0, time: 0 },
  vertexShader,
  fragmentShader
);

extend({ LayerMaterial });
