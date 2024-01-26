import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useState } from "react";
import useDeviceDetect from "./hooks/useDeviceDetect";

export default function OpeningSceneText() {
  // Scroll tracking
  const scroll = useScroll();
  const [scrollOffset, setScrollOffset] = useState(0);

  // Stop showing outline text when scrolled down (otherwise there is an odd effect)
  const [outlineTextShowing, setOutlineTextShowing] = useState(true);
  useEffect(() => {
    if (scroll.offset > 0.001) {
      setOutlineTextShowing(false);
    } else {
      setOutlineTextShowing(true);
    }
  }, [scroll.offset]);

  // Different posiiton for mobile compared to desktop/widescreen
  const { isMobile } = useDeviceDetect();
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

  useFrame((state) => {
    if (scrollOffset !== scroll.offset) {
      setScrollOffset(scroll.offset);
    }
  });

  // DEBUG MODE
  const { fillColor, outlineColor } = useControls("text", {
    fillColor: "#ffffff",
    outlineColor: "#ffffff",
  });
  // Reset colour upon debug mode
  useEffect(() => {
    if (blurTextRef.current && solidTextRef.current && outlineTextRef.current) {
      blurTextRef.current.outlineColor = "#ffffff";
      blurTextRef.current.color = "#ffffff";

      solidTextRef.current.outlineColor = "#ffffff";
      solidTextRef.current.color = "#ffffff";

      outlineTextRef.current.strokeColor = "#ffffff";
      outlineTextRef.current.fillColor = "#ffffff";
    }
  }, []);

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
        font="/fonts/roboto-v30-latin-900.woff"
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
        font="/fonts/roboto-v30-latin-900.woff"
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
          font="/fonts/roboto-v30-latin-900.woff"
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
