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
    <>
      <Model position={[0, -5.5, 3]} rotation={[0, -0.2, 0]} />
    </>
  );
}

function Model(props) {
  const group = useRef();
  const tl = useRef();
  const modelRef = useRef();
  const model = useGLTF("/bathroom-scene-with-tap.glb");
  const scroll = useScroll();

  const [pastOpeningScene, setPastOpeningScene] = useState(false);

  const { groupRotation, groupPosition } = useControls("groupBathroom", {
    groupRotation: {
      value: { x: 0.35, y: -5.14, z: -0.02 },
      step: 0.01,
      joystick: "invertY",
    },
    groupPosition: {
      value: { x: -3.91, y: -3.01, z: 4.48 },
      step: 0.01,
      joystick: "invertY",
    },
  });

  useFrame((state, delta) => {
    tl.current.seek(scroll.offset);

    // group.current.rotation.x = groupRotation.x;
    // group.current.rotation.y = groupRotation.y;
    // group.current.rotation.z = groupRotation.z;
    // group.current.position.x = groupPosition.x;
    // group.current.position.y = groupPosition.y;
    // group.current.position.z = groupPosition.z;
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();
    if (group.current) {
      tl.current
        .to(
          group.current.rotation,
          {
            x: 0.35,
            y: -5.14,
            z: -0.02,
            duration: 0.3,
          },
          0
        )
        .to(
          group.current.position,
          {
            x: -3.91,
            y: -3.01,
            z: 4.48,
            duration: 0.3,
          },
          0
        );

      tl.current
        .to(
          group.current.rotation,
          {
            x: -0.04,
            y: -6.3,
            z: 0,
            duration: 0.3,
          },
          0.7
        )
        .to(
          group.current.position,
          {
            x: -6.2,
            y: -1.6,
            z: 4.53,
            duration: 0.3,
          },
          0.7
        );
    }
  }, [group.current]);

  return (
    <group
      ref={group}
      // position={groupPosition}
      // rotation={groupRotation}
      position={[5, 0, 0]}
      rotation={[0, 0, 0]}
      {...props}
      onClick={() => console.log(scroll)}
    >
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
