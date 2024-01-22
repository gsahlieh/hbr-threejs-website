import { Text } from "@react-three/drei";
import React from "react";

export default function OpeningSceneText() {
  return (
    <>
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
        {"HILLS\nBATHROOMS"}
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
      >
        {"HILLS\nBATHROOMS"}
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
      >
        {"HILLS\nBATHROOMS"}
      </Text>
    </>
  );
}
