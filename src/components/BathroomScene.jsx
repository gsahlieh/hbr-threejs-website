import { useGLTF, useScroll } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { Suspense, useEffect, useRef, useState } from "react";
import useStore from "../store/store";
import Laptop from "./Laptop";
import useDeviceDetect from "./hooks/useDeviceDetect";

// Water Audio
const waterSoundEffect = new Audio("./audio/water-running-60s.mp3");
waterSoundEffect.volume = 0.2;
waterSoundEffect.loop = true;

export default function BathroomScene() {
  return (
    <>
      <Model />
    </>
  );
}

function Model() {
  // Loading 3D models + setting refs
  const group = useRef();
  const waterStreamRef = useRef();
  const model = useGLTF("/models/bathroom-scene-draco.glb");
  const waterStream = useGLTF("/models/water-stream.glb");

  // For scroll tracking + animations
  const tl = useRef();
  const scroll = useScroll();
  const [scrollOffset, setScrollOffset] = useState(scroll.offset);

  // Setting varibles based on device type (different for mobile)
  const { isMobile } = useDeviceDetect();
  const [
    modelPositionAfterFirstAppearing,
    setModelPositionAfterFirstAppearing,
  ] = useState([-3.91, -3.01, 4.48]);
  const [modelPositionForGoogleReviews, setModelPositionForGoogleReviews] =
    useState([-6.2, -1.6, 4.53]);
  const [modelRotationForGoogleReviews, setModelRotationForGoogleReviews] =
    useState([-0.04, -6.3, 0]);

  useEffect(() => {
    const updateModelPositionAfterFirstAppearing = () => {
      if (isMobile) {
        setModelPositionAfterFirstAppearing([-1.5, -3.01, 4.48]);
        setModelPositionForGoogleReviews([-6.16, -1.51, 3.81]);
        setModelRotationForGoogleReviews([0.21, -6.3, 0]);
      } else {
        setModelPositionAfterFirstAppearing([-3.91, -3.01, 4.48]);
        setModelPositionForGoogleReviews([-6.2, -1.6, 4.53]);
        setModelRotationForGoogleReviews([-0.04, -6.3, 0]);
      }
    };

    updateModelPositionAfterFirstAppearing();
  }, [isMobile]);

  // Water Audio
  const muted = useStore((state) => state.muted);
  useEffect(() => {
    if (!muted && scrollOffset >= 0.1) {
      waterSoundEffect.play();
    } else {
      waterSoundEffect.pause();
    }
  }, [scrollOffset, muted]);

  // ALL ANIMATIONS
  useFrame(() => {
    tl.current.seek(scroll.offset);

    if (scrollOffset !== scroll.offset) {
      setScrollOffset(scroll.offset);
    }
  });

  useEffect(() => {
    tl.current = gsap.timeline();

    if (waterStreamRef.current) {
      // Water stream starts
      tl.current
        .to(
          waterStreamRef.current.scale,
          {
            y: 3,
            duration: 0.01,
          },
          0.1
        )
        .to(
          waterStreamRef.current.position,
          {
            y: 3.01,
            duration: 0.01,
          },
          0.1
        );
    }

    if (group.current) {
      // Brings Bathroom scene into view
      tl.current
        .to(
          group.current.rotation,
          {
            x: 0.35,
            y: -5.14,
            z: -0.02,
            duration: 0.1,
          },
          0
        )
        .to(
          group.current.position,
          {
            x: modelPositionAfterFirstAppearing[0],
            y: modelPositionAfterFirstAppearing[1],
            z: modelPositionAfterFirstAppearing[2],
            duration: 0.1,
          },
          0
        );

      // Zooms into laptop screen
      tl.current
        .to(
          group.current.rotation,
          {
            x: modelRotationForGoogleReviews[0],
            y: modelRotationForGoogleReviews[1],
            z: modelRotationForGoogleReviews[2],
            duration: 0.05,
          },
          0.65
        )
        .to(
          group.current.position,
          {
            x: modelPositionForGoogleReviews[0],
            y: modelPositionForGoogleReviews[1],
            z: modelPositionForGoogleReviews[2],
            duration: 0.05,
          },
          0.65
        );

      // Lifts up to show contact page
      tl.current
        .to(
          group.current.rotation,
          {
            x: -0.04,
            y: -5.3,
            z: 0,
            duration: 0.1,
          },
          0.85
        )
        .to(
          group.current.position,
          {
            x: -6.2,
            y: -1.6,
            z: 0.53,
            duration: 0.1,
          },
          0.85
        );
    }
  }, [group.current, waterStreamRef.current, modelPositionAfterFirstAppearing]);

  return (
    <group ref={group} position={[-10, -5.5, 3]} rotation={[0, -0.2, 0]}>
      <Suspense fallback={null}>
        <primitive
          object={model.scene}
          position={[5, 0, 0]}
          rotation={[0, 0, 0]}
          scale={3}
        />
        <primitive
          ref={waterStreamRef}
          object={waterStream.scene}
          position={[4.08, 3.21, -0.1]}
          rotation={[-Math.PI, 0, 0]}
          scale={[3, 0.1, 3]}
        />
        <Laptop />
      </Suspense>
    </group>
  );
}
