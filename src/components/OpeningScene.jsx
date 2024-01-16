import { useRef } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  SoftShadows,
  Html,
  CameraControls,
  useHelper,
} from "@react-three/drei";
import { easing, geometry } from "maath";
import { useControls } from "leva";
import * as THREE from "three";

extend(geometry);

export default function OpeningScene() {
  const { position } = useControls("camera", {
    position: {
      value: { x: 0, y: 3, z: 14 },
      step: 0.01,
      joystick: "invertY",
    },
    // rotation: {
    //   value: { x: 0, y: 0, z: 1 },
    //   step: 0.01,
    //   joystick: "invertY",
    // },
  });

  return (
    <Canvas
      //   onCreated={({ gl }) => {
      //     gl.domElement.addEventListener("wheel", (e) => e.preventDefault(), {
      //       passive: false,
      //     });
      //   }}
      shadows="basic"
      camera={{ position: [position.x, position.y, position.z], fov: 55 }}
      style={{ height: "90vh" }}
    >
      <fog attach="fog" args={["black", 0, 20]} />
      <Html
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%) translateY(-340%)",
          fontSize: "70px",
        }}
      >
        <h1 className="whitespace-nowrap">Where Excellence meets Execution</h1>
      </Html>

      <pointLight position={[10, -10, -20]} intensity={10} />
      <pointLight position={[-10, -10, -20]} intensity={10} />
      <Model position={[0, -5.5, 3]} rotation={[0, -0.2, 0]} />
      <SoftShadows samples={3} />
      {/* <CameraControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
      /> */}
    </Canvas>
  );
}

function Model(props) {
  const group = useRef();
  const light = useRef();
  const model = useGLTF("/sink-with-faucet.glb");

  useHelper(light, THREE.SpotLightHelper, 1);

  const { angle, penumbra, position, intensity } = useControls("light", {
    angle: {
      value: 0.5,
      min: 0,
      max: Math.PI / 2,
    },
    penumbra: {
      value: 0.5,
      min: 0,
      max: 5,
    },
    position: {
      value: { x: 0, y: 0, z: 2 },
      step: 0.01,
      joystick: "invertY",
    },
    intensity: {
      value: 1,
      min: 0,
      max: 100,
    },
  });

  useFrame((state, delta) => {
    easing.dampE(
      group.current.rotation,
      [0, -state.pointer.x * (Math.PI / 10), 0],
      1.5,
      delta
    );
    easing.damp3(
      group.current.position,
      [0, -5.5, 1 - Math.abs(state.pointer.x)],
      1,
      delta
    );
    easing.damp3(
      light.current.position,
      [state.pointer.x * 12, 0, 8 + state.pointer.y * 4],
      0.2,
      delta
    );
  });
  return (
    <group ref={group} {...props}>
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Node_3.geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        scale={0.2}
        dispose={null}
      >
        <meshLambertMaterial color="#404044" />
      </mesh> */}
      <primitive object={model.scene} position={[0, -1, 0]} scale={10} />

      <spotLight
        position={position}
        angle={angle}
        penumbra={penumbra}
        ref={light}
        castShadow
        intensity={intensity}
        shadow-mapSize={1024}
        shadow-bias={-0.001}
        decay={0}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 50]}
        />
      </spotLight>
    </group>
  );
}
