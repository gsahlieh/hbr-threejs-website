import { useRef, useState, useEffect } from "react";
import HtmlElements from "./HtmlElements";
import BathroomScene from "./BathroomScene";
import WhoWeAre from "./WhoWeAre";
import PreviousWorks from "./PreviousWorks";
import Laptop from "./Laptop";
import ContactForm from "./ContactForm";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  ScrollControls,
  useGLTF,
  SoftShadows,
  Html,
  CameraControls,
  useHelper,
  Scroll,
  Sparkles,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import Sink from "./Sink";
import OpeningSceneText from "./OpeningSceneText";

export default function Experience() {
  const rectAreaLightRef = useRef();

  const { position, rotation, width, height, intensity } = useControls(
    "rectAreaLight",
    {
      position: {
        value: { x: 0, y: 0, z: 2 },
        step: 0.01,
        joystick: "invertY",
      },
      rotation: {
        value: { x: 0, y: 0, z: 0 },
        step: 0.01,
        joystick: "invertY",
      },
      width: {
        value: 10,
        min: 0,
        max: 10,
      },
      height: {
        value: 10,
        min: 0,
        max: 10,
      },
      intensity: {
        value: 10,
        min: 0,
        max: 10,
      },
    }
  );

  // const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
  //   useControls("environment map", {
  //     envMapIntensity: { value: 7, min: 0, max: 12 },
  //     envMapHeight: { value: 7, min: 0, max: 100 },
  //     envMapRadius: { value: 28, min: 10, max: 1000 },
  //     envMapScale: { value: 100, min: 10, max: 1000 },
  //   });

  useHelper(rectAreaLightRef, THREE.RectAreaLightHelper, 1);

  useFrame(({ clock }) => {
    // rectAreaLightRef.current.position.x = position.x;
    // rectAreaLightRef.current.position.y = position.y;
    // rectAreaLightRef.current.position.z = position.z;
    // rectAreaLightRef.current.rotation.x = rotation.x;
    // rectAreaLightRef.current.rotation.y = rotation.y;
    // rectAreaLightRef.current.rotation.z = rotation.z;
    // rectAreaLightRef.current.width = width;
    // rectAreaLightRef.current.height = height;
    // rectAreaLightRef.current.intensity = intensity;
  });

  return (
    <>
      <fog attach="fog" args={["black", 0, 20]} />

      {/* <pointLight position={[10, -10, -20]} intensity={10} />
      <pointLight position={[-10, -10, -20]} intensity={10} /> */}
      {/* <ambientLight intensity={10} /> */}
      <SoftShadows samples={3} />

      <Environment preset="city" blur={0.4} />
      {/* <OrbitControls enableZoom={false} /> */}

      {/* Laptop */}
      {/* <rectAreaLight ref={rectAreaLightRef} color={0xffffff} /> */}

      {/* Contact */}
      {/* <Sparkles
        count={300}
        scale={[20, 20, 20]}
        size={5}
        position={[0, -9, 0]}
      /> */}

      <ScrollControls pages={2} damping={0.25}>
        <HtmlElements />
        {/* <Sink /> */}
        <BathroomScene />

        <Scroll>
          <OpeningSceneText />

          {/* <WhoWeAre /> */}
          {/* <PreviousWorks /> */}
          {/* <Laptop /> */}
          {/* <Contact /> */}
        </Scroll>
      </ScrollControls>
    </>
  );
}
