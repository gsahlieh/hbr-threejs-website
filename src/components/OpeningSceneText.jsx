import { Text, useScroll } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import useDeviceDetect from "./hooks/useDeviceDetect";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

export default function OpeningSceneText() {
  const { isMobile } = useDeviceDetect();
  const scroll = useScroll();
  const [scrollOffset, setScrollOffset] = useState(0);
  const [outlineTextShowing, setOutlineTextShowing] = useState(true);
  const [behindFontSize, setBehindFontSize] = useState(0.75);
  const [frontFontSize, setFrontFontSize] = useState(0.5);
  const outlineTextRef = React.useRef();
  const solidTextRef = React.useRef();
  const blurTextRef = React.useRef();

  useEffect(() => {
    const updateFontSizes = () => {
      if (isMobile) {
        setBehindFontSize(0.3);
        setFrontFontSize(0.2);
      } else {
        setBehindFontSize(0.75);
        setFrontFontSize(0.5);
      }
    };

    updateFontSizes();
  }, [isMobile]);

  useEffect(() => {
    if (scroll.offset > 0.001) {
      setOutlineTextShowing(false);
    } else {
      setOutlineTextShowing(true);
    }
  }, [scroll.offset]);

  useFrame((state) => {
    if (scrollOffset !== scroll.offset) {
      setScrollOffset(scroll.offset);
    }
  });

  const { fillColor, outlineColor } = useControls("text", {
    fillColor: "#ffffff",
    outlineColor: "#ffffff",
  });

  useFrame((state) => {
    if (blurTextRef.current && solidTextRef.current && outlineTextRef.current) {
      blurTextRef.current.outlineColor = outlineColor;
      blurTextRef.current.color = fillColor;

      solidTextRef.current.outlineColor = outlineColor;
      solidTextRef.current.color = fillColor;

      outlineTextRef.current.strokeColor = outlineColor;
      outlineTextRef.current.fillColor = fillColor;
    }
  });

  return (
    <>
      {/* BLUR */}
      <Text
        ref={blurTextRef}
        position={[0, 0, 2]}
        color={fillColor}
        outlineColor={outlineColor}
        fillOpacity={0}
        font="roboto-v30-latin-900.woff"
        fontWeight="bold"
        outlineBlur={0.05}
        fontSize={behindFontSize}
        textAlign={"center"}
      >
        {"HILLS\nBATHROOMS"}
      </Text>

      {/* SOLID */}
      <Text
        ref={solidTextRef}
        position={[0, 0, 2]}
        opacity={0}
        outlineColor={outlineColor}
        color="rgba(255, 1, 255, 1)"
        font="roboto-v30-latin-900.woff"
        fontWeight="bold"
        fontSize={behindFontSize}
        textAlign={"center"}
      >
        {"HILLS\nBATHROOMS"}
      </Text>

      {/* OUTLINE */}
      {outlineTextShowing && (
        <Text
          ref={outlineTextRef}
          position={[0, 0, 3]}
          fillOpacity={0}
          strokeColor={outlineColor}
          strokeWidth={0.01}
          font="roboto-v30-latin-900.woff"
          fontWeight="bold"
          fontSize={frontFontSize}
          textAlign={"center"}
        >
          {"HILLS\nBATHROOMS"}
        </Text>
      )}
    </>
  );
}
