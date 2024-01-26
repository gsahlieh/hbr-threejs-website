import { useSpring } from "@react-spring/core";
import { a as three } from "@react-spring/three";
import { useGLTF, useScroll, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Model({ open, hinge, laptopPosition, ...props }) {
  // Loading 3D model + texture + setting refs
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/mac-draco.glb");
  const googleReviewTexture = useTexture("/images/google-reviews-mirror.png");

  // Cursor state on hover
  const [hovered, setHovered] = useState(false);
  useEffect(
    () => void (document.body.style.cursor = hovered ? "pointer" : "auto"),
    [hovered]
  );

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
            material={
              new THREE.MeshBasicMaterial({
                map: googleReviewTexture,
                color: 0x999999,
              })
            }
            geometry={nodes["Cube008_2"].geometry}
          ></mesh>
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
  // Setting ref + variables for hinge animation
  const group = useRef();
  const [open, setOpen] = useState(false);
  const props = useSpring({ open: Number(open) });

  // Scroll tracking
  const scroll = useScroll();
  const [scrollOffset, setScrollOffset] = useState(scroll.offset);

  useEffect(() => {
    if (scrollOffset >= 0.675 && scrollOffset <= 0.85) {
      setOpen(true);
    }
    if (scrollOffset > 0.85 || scrollOffset < 0.675) {
      setOpen(false);
    }
  }, [scrollOffset]);

  useFrame((state) => {
    if (scrollOffset !== scroll.offset) {
      setScrollOffset(scroll.offset);
    }
  });

  return (
    <>
      <group
        ref={group}
        position={[6.18, 1.26, -0.41]}
        rotation={[0, 0.01, 0]}
        scale={0.15}
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
