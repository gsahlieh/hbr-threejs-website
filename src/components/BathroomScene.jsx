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
import Sink from "./Sink";

extend(geometry);

export default function BathroomScene() {
  return (
    <>
      <Model position={[0, -5.5, 3]} rotation={[0, -0.2, 0]} />
      <Sink />
    </>
  );
}

function Model(props) {
  const group = useRef();
  const tl = useRef();
  const modelRef = useRef();
  const model = useGLTF("/bathroom-scene-minus-tap.glb");
  const scroll = useScroll();

  const [pastOpeningScene, setPastOpeningScene] = useState(false);

  const { modelRotation, modelPosition } = useControls("model", {
    modelRotation: {
      value: { x: 0.3, y: -4.72, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    modelPosition: {
      value: { x: -2.22, y: 3.44, z: -2.28 },
      step: 0.01,
      joystick: "invertY",
    },
  });

  useFrame((state, delta) => {
    tl.current.seek(scroll.offset * tl.current.duration());

    // modelRef.current.rotation.x = modelRotation.x;
    // modelRef.current.rotation.y = modelRotation.y;
    // modelRef.current.rotation.z = modelRotation.z;
    // modelRef.current.position.x = modelPosition.x;
    // modelRef.current.position.y = modelPosition.y;
    // modelRef.current.position.z = modelPosition.z;
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    if (modelRef.current) {
      tl.current
        .to(
          modelRef.current.rotation,
          {
            x: 0.3,
            y: -4.72,
            z: 0,
            duration: 3,
          },
          0
        )
        .to(
          modelRef.current.position,
          {
            x: -2.22,
            y: 3.44,
            z: -2.28,
            duration: 3,
          },
          0
        );
    }
  }, []);

  return (
    <group ref={group} {...props} onClick={() => console.log(scroll)}>
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
          position={[5, 0, 0]}
          rotation={[0, 0, 0]}
          // position={modelPosition}
          // rotation={modelRotation}
          scale={3}
        />

        <Laptop />
      </Suspense>
    </group>
  );
}
