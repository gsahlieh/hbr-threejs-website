import {
  Environment,
  Scroll,
  ScrollControls,
  SoftShadows,
  OrbitControls,
  useAspect,
  useTexture,
  Plane,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { MathUtils, Vector3 } from "three";
import BathroomScene from "./BathroomScene";
import HtmlElements from "./HtmlElements";
import OpeningSceneText from "./OpeningSceneText";
import Sink from "./Sink";
import "./materials/layerMaterial";
import leaves1Url from "/images/leaves1.png";
import leaves2Url from "/images/leaves2.png";
import Fireflies from "./Fireflies";
import { useControls } from "leva";
import BackgroundOverlay from "./BackgroundOverlay";

export default function Experience() {
  return (
    <>
      <Environment files="/hdrs/blue_grotto_1k.hdr" background blur={0.5} />
      {/* <ambientLight intensity={1} /> */}
      {/* <OrbitControls enableZoom={true} /> */}

      <ScrollControls pages={8} damping={0.25}>
        <BackgroundOverlay />
        <HtmlElements />
        <BathroomScene />

        <Scroll>
          <OpeningSceneText />
          <Sink />
        </Scroll>
      </ScrollControls>
    </>
  );
}
