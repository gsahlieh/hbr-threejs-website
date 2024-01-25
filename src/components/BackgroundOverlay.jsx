import { Plane, useAspect, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useState, useEffect } from "react";
import { MathUtils, Vector3 } from "three";
import Fireflies from "./Fireflies";
import "./materials/layerMaterial";
import leaves1Url from "/images/leaves1.png";
import leaves2Url from "/images/leaves2.png";
import useDeviceDetect from "./hooks/useDeviceDetect";

export default function BackgroundOverlay() {
  const { isMobile, isDesktop, isWideScreen } = useDeviceDetect();

  const [useAspectArgs, setUseAspectArgs] = useState([1920, 1080, 1.2]);

  useEffect(() => {
    const updateUseAspectArgs = () => {
      if (isMobile) {
        setUseAspectArgs([932, 430, 0.65]);
      } else if (isDesktop) {
        setUseAspectArgs([1920, 1080, 1.3]);
      } else {
        setUseAspectArgs([1920, 1080, 1.3]);
      }
    };

    updateUseAspectArgs();
  }, [isMobile, isDesktop, isWideScreen]);

  const scaleW = useAspect(
    useAspectArgs[0],
    useAspectArgs[1],
    useAspectArgs[2]
  );
  const textures = useTexture([leaves1Url, leaves2Url]);
  const group = useRef();
  const layersRef = useRef([]);
  const [movement] = useState(() => new Vector3());
  const [temp] = useState(() => new Vector3());
  const leaves1Ref = useRef();
  const leaves2Ref = useRef();

  const layers = [
    {
      texture: textures[0],
      ref: leaves1Ref,
      x: 0,
      y: 0,
      z: 0,
      factor: 0.03,
      scaleFactor: 1,
      wiggle: 0.6,
      scale: scaleW,
    },
    {
      texture: textures[1],
      ref: leaves2Ref,
      x: 0,
      y: 0,
      z: 0,
      factor: 0.04,
      scaleFactor: 1.3,
      wiggle: 1,
      scale: scaleW,
    },
  ];

  useFrame((state, delta) => {
    movement.lerp(temp.set(state.pointer.x, state.pointer.y * 0.01, 0), 0.02);
    group.current.position.x = MathUtils.lerp(
      group.current.position.x,
      state.pointer.x / 20,
      0.05
    );
    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y / 20,
      0.05
    );
    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x / 50,
      0.05
    );
    layersRef.current[0].uniforms.time.value =
      layersRef.current[1].uniforms.time.value += delta;
  });

  return (
    <>
      <group ref={group}>
        <Fireflies count={50} radius={10} colors={["orange"]} />

        <Plane
          scale={layers[0].scale}
          args={[1, 1, layers[0].wiggle ? 10 : 1, layers[0].wiggle ? 10 : 1]}
          position={[layers[0].x, layers[0].y, layers[0].z]}
          rotation={[0, 0, isMobile ? Math.PI / 2 : 0]}
          ref={layers[0].ref}
        >
          <layerMaterial
            movement={movement}
            textr={layers[0].texture}
            factor={layers[0].factor}
            ref={(el) => (layersRef.current[0] = el)}
            wiggle={layers[0].wiggle}
            scale={layers[0].scaleFactor}
          />
        </Plane>

        <Plane
          scale={layers[1].scale}
          args={[1, 1, layers[1].wiggle ? 10 : 1, layers[1].wiggle ? 10 : 1]}
          position={[layers[1].x, layers[1].y, layers[1].z]}
          rotation={[0, 0, isMobile ? Math.PI / 2 : 0]}
          ref={layers[1].ref}
        >
          <layerMaterial
            movement={movement}
            textr={layers[1].texture}
            factor={layers[1].factor}
            ref={(el) => (layersRef.current[1] = el)}
            wiggle={layers[1].wiggle}
            scale={layers[1].scaleFactor}
          />
        </Plane>
      </group>
    </>
  );
}
