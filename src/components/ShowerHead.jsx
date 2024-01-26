import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import useDeviceDetect from "./hooks/useDeviceDetect";

export default function ShowerHead() {
  // Loading 3D models + setting ref
  const showerHeadRef = useRef();
  const showerHead = useGLTF("/models/shower-head.glb");

  // Setting varibles based on device type (different for mobile compared to desktop/widescreen)
  const { isMobile } = useDeviceDetect();
  const [modelScale, setModelScale] = useState(3.9);
  const [modelPosition, setModelPosition] = useState([0, -0.9, 2.42]);

  useEffect(() => {
    const updateModelScale = () => {
      if (isMobile) {
        setModelScale(2.3);
        setModelPosition([0, -0.5, 2.62]);
      } else {
        setModelScale(3.9);
        setModelPosition([0, -0.9, 2.42]);
      }
    };

    updateModelScale();
  }, [isMobile]);

  // Scroll tracking
  const scroll = useScroll();
  useFrame((state, delta) => {
    if (showerHeadRef.current) {
      if (scroll.offset < 0.2) {
        showerHeadRef.current.rotation.y += delta * 1;
      }
    }
  });

  return (
    <>
      <group fallback={null}>
        <primitive
          ref={showerHeadRef}
          object={showerHead.scene}
          scale={modelScale}
          position={modelPosition}
          rotation={[0.3, -2, 0]}
        />
      </group>
    </>
  );
}
