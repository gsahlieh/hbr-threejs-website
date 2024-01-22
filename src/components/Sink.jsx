import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

export default function Sink() {
  const group = useRef();
  const sinkRef = useRef();
  const sink = useGLTF("sink-only-test.glb");

  const { position, scale } = useControls("sink", {
    position: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    scale: {
      value: 1,
      min: 0,
      max: 5,
    },
  });

  // useEffect(() => {
  //   if (scene) {
  //     // Calculate the bounding box of the entire scene
  //     scene.traverse((child) => {
  //       if (child.isMesh) {
  //         child.geometry.computeBoundingBox();
  //       }
  //     });

  //     // Calculate the center of the bounding box
  //     const boundingBox = new THREE.Box3().setFromObject(scene);
  //     const center = boundingBox.getCenter(new THREE.Vector3());

  //     // Move the scene's position to center it
  //     scene.position.x += scene.position.x - center.x;
  //     scene.position.y += scene.position.y - center.y;
  //     scene.position.z += scene.position.z - center.z;
  //   }
  // }, [scene]);

  useFrame((state) => {
    sinkRef.current.rotation.y += 0.01;

    sinkRef.current.position.set(position.x, position.y, position.z);
    sinkRef.current.scale.set(scale, scale, scale);
  });

  return (
    <>
      <group ref={group}>
        {/* BLUR */}
        <Text
          position={[0, 0, 2]}
          color="#ffffff"
          fillOpacity={0}
          font="roboto-v30-latin-900.woff"
          fontWeight="bold"
          outlineBlur={0.05}
          outlineColor={"#ffffff"}
          fontSize={0.75}
          textAlign={"center"}
        >
          {/* <div
            // ref={textBehindBlur}
            className="absolute text-center text-white text-9xl font-bold blur"
          > */}
          {"HILLS\nBATHROOMS"}
          {/* </div> */}
        </Text>
        {/* SOLID */}
        <Text
          position={[0, 0, 2]}
          opacity={0}
          outlineColor={"#ffffff"}
          color="#ffffff"
          font="roboto-v30-latin-900.woff"
          fontWeight="bold"
          fontSize={0.75}
          textAlign={"center"}
          // outlineBlur={0.01}
        >
          {/* <div
            // ref={textBehindBlur}
            className="absolute text-center text-white text-9xl font-bold blur"
          > */}
          {"HILLS\nBATHROOMS"}
          {/* </div> */}
        </Text>
        {/* OUTLINE */}
        <Text
          position={[0, 0, 3]}
          fillOpacity={0}
          strokeColor={"#ffffff"}
          strokeWidth={0.01}
          font="roboto-v30-latin-900.woff"
          fontWeight="bold"
          fontSize={0.5}
          textAlign={"center"}
          // outlineBlur={0.01}
        >
          {/* <div
            // ref={textBehindBlur}
            className="absolute text-center text-white text-9xl font-bold blur"
          > */}
          {"HILLS\nBATHROOMS"}
          {/* </div> */}
        </Text>
        <primitive
          ref={sinkRef}
          object={sink.scene}
          scale={scale}
          position={position}
        />
      </group>
    </>
  );
}
