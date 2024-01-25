import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  ContactShadows,
  Html,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { useSpring } from "@react-spring/core";
import { a as three } from "@react-spring/three";
import { useControls } from "leva";

function Model({ open, hinge, laptopPosition, ...props }) {
  const group = useRef();
  // const iframe = useRef();
  // Load model
  const { nodes, materials } = useGLTF("/mac-draco.glb");
  const googleReviewTexture = useTexture("/images/google-reviews-mirror.png");
  // Take care of cursor state on hover
  const [hovered, setHovered] = useState(false);
  useEffect(
    () => void (document.body.style.cursor = hovered ? "pointer" : "auto"),
    [hovered]
  );

  const { position, rotation, scale } = useControls("iframe", {
    position: {
      value: { x: 1.35, y: -1.25, z: 3 },
      step: 0.01,
      joystick: "invertY",
    },
    rotation: {
      value: { x: 0, y: -0.2, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    scale: {
      value: 0.15,
      min: 0,
      step: 0.01,
      max: 10,
    },
  });

  // Make it float in the air when it's opened
  // useFrame((state) => {
  // if (iframe.current) {
  // iframe.current.position.set(position.x, position.y, position.z);
  // iframe.current.rotation.set(rotation.x, rotation.y, rotation.z);
  // iframe.current.scale.set(scale, scale, scale);
  // }

  // const t = state.clock.getElapsedTime();
  // group.current.rotation.x = THREE.MathUtils.lerp(
  //   group.current.rotation.x,
  //   open ? Math.cos(t / 10) / 10 + 0.25 : 0,
  //   0.1
  // );
  // group.current.rotation.y = THREE.MathUtils.lerp(
  //   group.current.rotation.y,
  //   open ? Math.sin(t / 10) / 4 : 0,
  //   0.1
  // );
  // group.current.rotation.z = THREE.MathUtils.lerp(
  //   group.current.rotation.z,
  //   open ? Math.sin(t / 10) / 10 : 0,
  //   0.1
  // );
  // group.current.position.y = THREE.MathUtils.lerp(
  //   group.current.position.y,
  //   open ? (-4 + Math.sin(t)) / 3 : -4.3,
  //   0.1
  // );
  // });

  return (
    <group
      ref={group}
      {...props}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => setHovered(false)}
      dispose={null}
    >
      <three.group rotation-x={hinge} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={nodes["Cube008"].geometry}
          />
          <mesh
            material={materials["matte.001"]}
            geometry={nodes["Cube008_1"].geometry}
          />
          <mesh
            // material={materials["screen.001"]}
            material={
              new THREE.MeshBasicMaterial({
                map: googleReviewTexture,
                color: 0x999999,
              })
            }
            geometry={nodes["Cube008_2"].geometry}
          >
            {/* <Html
              ref={iframe}
              // wrapperClass="htmlScreen"
              distanceFactor={1.17}
              // rotation-x={-Math.PI / 2}
              // position={[1.35, -1.25, 3]}
              // rotation={[0, -0.2, 0]}
              // scale={0.15}
              // position={position}
              // rotation={rotation}
              // scale={scale}
              // scale={1.45}
            >
              {<iframe src="https://bruno-simon.com/html/" />}
            </Html> */}
          </mesh>
        </group>
      </three.group>
      <mesh
        material={materials.keys}
        geometry={nodes.keyboard.geometry}
        position={[1.79, 0, 3.45]}
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh
          material={materials.aluminium}
          geometry={nodes["Cube002"].geometry}
        />
        <mesh
          material={materials.trackpad}
          geometry={nodes["Cube002_1"].geometry}
        />
      </group>
      <mesh
        material={materials.touchbar}
        geometry={nodes.touchbar.geometry}
        position={[0, -0.03, 1.2]}
      />
    </group>
  );
}

export default function Laptop() {
  const group = useRef();
  // This flag controls open state, alternates between true & false
  const [open, setOpen] = useState(false);
  // We turn this into a spring animation that interpolates between 0 and 1
  const props = useSpring({ open: Number(open) });

  const scroll = useScroll();
  const [scrollOffset, setScrollOffset] = useState(scroll.offset);

  useEffect(() => {
    if (scrollOffset >= 0.675 && scrollOffset <= 0.85) {
      setOpen(true);
    }
    if (scrollOffset > 0.85 || scrollOffset < 0.675) {
      setOpen(false);
    }
    // console.log(scrollOffset);
  }, [scrollOffset]);

  // const laptopPosition = [0, -18, -8];

  const { position, rotation, scale } = useControls("laptop", {
    position: {
      value: { x: 1.35, y: -1.25, z: 3 },
      step: 0.01,
      joystick: "invertY",
    },
    rotation: {
      value: { x: 0, y: -0.2, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    scale: {
      value: 0.15,
      min: 0,
      step: 0.01,
      max: 10,
    },
  });

  useFrame((state) => {
    if (scrollOffset !== scroll.offset) {
      setScrollOffset(scroll.offset);
    }

    // group.current.position.set(position.x, position.y, position.z);
    // group.current.rotation.set(rotation.x, rotation.y, rotation.z);
    // group.current.scale.set(scale, scale, scale);
  });

  return (
    <>
      <group
        ref={group}
        position={[6.18, 1.26, -0.41]}
        rotation={[0, 0.01, 0]}
        scale={0.15}
        // position={position}
        // rotation={rotation}
        // scale={scale}
        onClick={(e) => (e.stopPropagation(), setOpen(!open))}
      >
        <Model
          open={open}
          hinge={props.open.to([0, 1], [1.575, -0])}
          laptopPosition={[0, -18, -8]}
        />
      </group>
    </>
  );
}
