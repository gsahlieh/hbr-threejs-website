import { useRef, useLayoutEffect, useEffect, useState, Suspense } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  SoftShadows,
  Html,
  CameraControls,
  useHelper,
  Scroll,
  OrbitControls,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { easing, geometry } from "maath";
import { useControls } from "leva";
import * as THREE from "three";
import gsap from "gsap";
import Laptop from "./Laptop";
import useDeviceDetect from "./hooks/useDeviceDetect";
import useStore from "../store/store";

extend(geometry);

// Audio
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

function Model(props) {
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

  const group = useRef();
  const tl = useRef();
  const modelRef = useRef();
  const model = useGLTF("/bathroom-scene-with-tap.glb");
  const waterStream = useGLTF("/water-stream-centered.glb");
  const scroll = useScroll();

  const { groupRotation, groupPosition } = useControls("groupBathroom", {
    groupRotation: {
      value: { x: -0.04, y: -6.3, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    groupPosition: {
      value: { x: -6.2, y: -1.3, z: 4 },
      step: 0.01,
      joystick: "invertY",
    },
  });

  const waterStreamRef = useRef();
  const [waterRunning, setWaterRunning] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(scroll.offset);
  const muted = useStore((state) => state.muted);

  const waterMaterial = new THREE.MeshStandardMaterial({
    color: "#ff0000",
    opacity: 0.5,
  });

  const { position, rotation, scale } = useControls("waterStream", {
    position: {
      value: { x: 4.08, y: 3.01, z: -0.11 },
      step: 0.01,
      joystick: "invertY",
    },
    rotation: {
      value: { x: -Math.PI, y: 0, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    scale: {
      value: { x: 3, y: 0.1, z: 3 },
      min: 0,
      step: 0.01,
      max: 10,
    },
  });

  useEffect(() => {
    if (!muted && scrollOffset >= 0.1) {
      waterSoundEffect.play();
    } else {
      waterSoundEffect.pause();
    }
  }, [scrollOffset, muted]);

  useFrame((state, delta) => {
    tl.current.seek(scroll.offset);

    if (scrollOffset !== scroll.offset) {
      setScrollOffset(scroll.offset);
    }

    // group.current.rotation.x = groupRotation.x;
    // group.current.rotation.y = groupRotation.y;
    // group.current.rotation.z = groupRotation.z;
    // group.current.position.x = groupPosition.x;
    // group.current.position.y = groupPosition.y;
    // group.current.position.z = groupPosition.z;
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
    <group
      ref={group}
      // position={groupPosition}
      // rotation={groupRotation}
      position={[-10, -5.5, 3]}
      rotation={[0, -0.2, 0]}
      onClick={() => console.log(scroll)}
    >
      <Suspense
        fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial wireframe={true} />
          </mesh>
        }
      >
        <primitive
          ref={modelRef}
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
        >
          <meshBasicMaterial color={"blue"} />
        </primitive>

        {/* <mesh
          position={[4.08, 3.21, -0.1]}
          rotation={[-Math.PI, 0, 0]}
          scale={[3, 0.1, 3]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={"blue"} />
        </mesh> */}

        <Laptop />
      </Suspense>
    </group>
  );
}
