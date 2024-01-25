import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDeviceDetect from "./hooks/useDeviceDetect";

gsap.registerPlugin(ScrollTrigger);

export default function Sink() {
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

  const group = useRef();
  const sinkRef = useRef();
  const tl = useRef();
  const scroll = useScroll();
  const sink = useGLTF("shower-head-full.glb");

  useFrame((state, delta) => {
    if (sinkRef.current) {
      if (scroll.offset < 0.5) {
        sinkRef.current.rotation.y += delta * 1;
      } else {
        // tl.current.seek(scroll.offset * tl.current.duration());
        // sinkRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
      }

      // sinkRef.current.position.set(position.x, position.y, position.z);
      // sinkRef.current.scale.set(scale, scale, scale);
    }
  });

  // useLayoutEffect(() => {
  //   tl.current = gsap.timeline();

  //   if (sinkRef.current && tl.current) {
  //     tl.current
  //       .to(sinkRef.current.rotation, {
  //         x: 0.36,
  //         y: 1.5,
  //         z: 0,
  //         duration: 3,
  //         scrollTrigger: {
  //           trigger: ".trigger",
  //           start: "top 50%",
  //           end: "bottom 50%",
  //           scrub: 1,
  //         },
  //       })
  //       .to(sinkRef.current.position, {
  //         x: -2.64,
  //         y: 0.1,
  //         z: -1.62,
  //         duration: 3,
  //         scrollTrigger: {
  //           trigger: ".trigger",
  //           start: "top 50%",
  //           end: "bottom 50%",
  //           scrub: 1,
  //         },
  //       })
  //       .to(sinkRef.current.scale, {
  //         x: 3.4,
  //         y: 3.4,
  //         z: 3.4,
  //         duration: 3,
  //         scrollTrigger: {
  //           trigger: ".trigger",
  //           start: "top 50%",
  //           end: "bottom 50%",
  //           scrub: 1,
  //         },
  //       });
  //   }
  // }, []);

  return (
    <>
      <group
        ref={group}
        fallback={
          <mesh>
            <boxBufferGeometry />
            <meshStandardMaterial />
          </mesh>
        }
      >
        <primitive
          ref={sinkRef}
          object={sink.scene}
          // scale={scale}
          // position={position}
          // rotation={rotation}
          scale={modelScale}
          position={modelPosition}
          rotation={[0.3, -2, 0]}
        />
      </group>
    </>
  );
}
