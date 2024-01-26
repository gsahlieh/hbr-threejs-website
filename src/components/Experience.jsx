import { Environment, Scroll, ScrollControls } from "@react-three/drei";
import React from "react";
import BackgroundOverlay from "./BackgroundOverlay";
import BathroomScene from "./BathroomScene";
import HtmlElements from "./HtmlElements";
import OpeningSceneText from "./OpeningSceneText";
import ShowerHead from "./ShowerHead";
import "./materials/layerMaterial";
import useStore from "../store/store";
import { Perf } from "r3f-perf";

export default function Experience() {
  const debugMode = useStore((state) => state.debugMode);

  return (
    <>
      {debugMode && <Perf position="top-left" />}
      <Environment files="/hdrs/blue_grotto_1k.hdr" background blur={0.5} />

      <ScrollControls pages={8} damping={0.25}>
        <BackgroundOverlay />
        <HtmlElements />
        <BathroomScene />

        <Scroll>
          <OpeningSceneText />
          <ShowerHead />
        </Scroll>
      </ScrollControls>
    </>
  );
}
