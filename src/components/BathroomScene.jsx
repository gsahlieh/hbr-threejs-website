import { useRef, useLayoutEffect, useEffect, useState, Suspense } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  SoftShadows,
  Html,
  CameraControls,
  useHelper,
  Scroll,
  OrbitControls,
  useScroll,
} from "@react-three/drei";
import { easing, geometry } from "maath";
import { useControls } from "leva";
import * as THREE from "three";
import gsap from "gsap";
import Laptop from "./Laptop";

extend(geometry);

export default function BathroomScene() {
  return (
    //   onCreated={({ gl }) => {
    //     gl.domElement.addEventListener("wheel", (e) => e.preventDefault(), {
    //       passive: false,
    //     });
    //   }}

    <>
      <Model position={[0, -5.5, 3]} rotation={[0, -0.2, 0]} />
      {/* <CameraControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
      /> */}
    </>
  );
}

function Model(props) {
  const group = useRef();
  const light = useRef();
  const tl = useRef();
  const modelRef = useRef();
  const model = useGLTF("/bathroom-scene-full.glb");
  const scroll = useScroll();

  const [pastOpeningScene, setPastOpeningScene] = useState(false);

  useHelper(light, THREE.SpotLightHelper, 1);

  const { angle, penumbra, lightPosition, intensity } = useControls("light", {
    angle: {
      value: 0.5,
      min: 0,
      max: Math.PI / 2,
    },
    penumbra: {
      value: 0.5,
      min: 0,
      max: 1,
    },
    lightPosition: {
      value: { x: 0, y: 5, z: 2 },
      step: 0.01,
      joystick: "invertY",
    },
    intensity: {
      value: 5,
      min: 0,
      max: 100,
    },
  });

  const { modelRotation, modelPosition } = useControls("model", {
    modelRotation: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    modelPosition: {
      value: { x: 0, y: 3, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
  });

  useFrame((state, delta) => {
    // easing.dampE(
    //   group.current.rotation,
    //   [0, -state.pointer.x * (Math.PI / 10), 0],
    //   1.5,
    //   delta
    // );
    // easing.damp3(
    //   group.current.position,
    //   [0, -5.5, 1 - Math.abs(state.pointer.x)],
    //   1,
    //   delta
    // );
    easing.damp3(
      light.current.position,
      [state.pointer.x * 12, 7, 0 + -state.pointer.y * 10],
      0.2,
      delta
    );

    light.current.pneumbra = penumbra;

    // tl.current.seek(scroll.offset * tl.current.duration());
    // console.log(tl.current);

    modelRef.current.rotation.x = modelRotation.x;
    modelRef.current.rotation.y = modelRotation.y;
    modelRef.current.rotation.z = modelRotation.z;
    modelRef.current.position.x = modelPosition.x;
    modelRef.current.position.y = modelPosition.y;
    modelRef.current.position.z = modelPosition.z;
  });

  // useLayoutEffect(() => {
  //   tl.current = gsap.timeline();

  //   tl.current
  //     .to(
  //       modelRef.current.rotation,
  //       {
  //         x: 0,
  //         y: 0,
  //         z: 0,
  //         duration: 3,
  //       },
  //       0
  //     )
  //     .to(
  //       modelRef.current.position,
  //       {
  //         x: 0,
  //         y: 3,
  //         z: 0,
  //         duration: 3,
  //       },
  //       0
  //     );

  //   tl.current
  //     .to(
  //       modelRef.current.rotation,
  //       {
  //         x: 0.3,
  //         y: -4.49,
  //         z: 0,
  //         duration: 3,
  //       },
  //       3
  //     )
  //     .to(
  //       modelRef.current.position,
  //       {
  //         x: -2.22,
  //         y: 3.49,
  //         z: -2.11,
  //         duration: 3,
  //       },
  //       3
  //     );
  // }, []);

  return (
    <group ref={group} {...props} onClick={() => console.log(scroll)}>
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
      <Suspense
        fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial wireframe={true} />
          </mesh>
        }
      >
        <primitive
          ref={modelRef}
          object={model.scene}
          // position={[-0.34, 2.86, -1.32]}
          // rotation={[0.36, 0.1, -0.01]}
          position={modelPosition}
          rotation={modelRotation}
          scale={3}
        />

        <Laptop />
      </Suspense>

      <spotLight
        position={lightPosition}
        angle={angle}
        penumbra={penumbra}
        ref={light}
        castShadow
        intensity={intensity}
        shadow-mapSize={1024}
        shadow-bias={-0.001}
        distance={10}
        decay={2}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 50]}
        />
      </spotLight>
    </group>
  );
}
