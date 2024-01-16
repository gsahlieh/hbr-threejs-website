import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useIntersect, Image, ScrollControls, Scroll } from "@react-three/drei";

function Item({ url, scale, ...props }) {
  const visible = useRef(false);
  const [hovered, hover] = useState(false);
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
  const { height } = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      visible.current ? 0 : -height / 2 + 1,
      4,
      delta
    );
    ref.current.material.zoom = THREE.MathUtils.damp(
      ref.current.material.zoom,
      visible.current ? 1 : 1.5,
      4,
      delta
    );
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      hovered ? 1 : 0,
      4,
      delta
    );
  });
  return (
    <group {...props}>
      <Image
        ref={ref}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        scale={scale}
        url={url}
      />
    </group>
  );
}

function Items() {
  const { width: w, height: h } = useThree((state) => state.viewport);
  return (
    <Scroll>
      <Item
        url="/bathroom.webp"
        scale={[w / 3, w / 3, 1]}
        position={[-w / 6, 0, 0]}
      />
      <Item
        url="/bathroom.webp"
        scale={[2, w / 3, 1]}
        position={[w / 30, -h, 0]}
      />
      <Item
        url="/bathroom.webp"
        scale={[w / 3, w / 5, 1]}
        position={[-w / 4, -h * 1, 0]}
      />
      <Item
        url="/bathroom.webp"
        scale={[w / 5, w / 5, 1]}
        position={[w / 4, -h * 1.2, 0]}
      />
      <Item
        url="/bathroom.webp"
        scale={[w / 5, w / 5, 1]}
        position={[w / 10, -h * 1.75, 0]}
      />
      <Item
        url="/bathroom.webp"
        scale={[w / 3, w / 3, 1]}
        position={[-w / 4, -h * 2, 0]}
      />
      <Item
        url="/bathroom.webp"
        scale={[w / 3, w / 5, 1]}
        position={[-w / 4, -h * 2.6, 0]}
      />
      <Item
        url="/bathroom.webp"
        scale={[w / 2, w / 2, 1]}
        position={[w / 4, -h * 3.1, 0]}
      />
      <Item
        url="/bathroom.webp"
        scale={[w / 2.5, w / 2, 1]}
        position={[-w / 6, -h * 4.1, 0]}
      />
    </Scroll>
  );
}

export default function PreviousWorks() {
  return (
    <div style={{ scrollbarWidth: "0", position: "relative" }}>
      <Canvas
        orthographic
        camera={{ zoom: 80 }}
        gl={{ antialias: false, stencil: false, depth: false }}
        dpr={[1, 1.5]}
        style={{ height: "90vh", scrollbarWidth: "0" }}
      >
        <ScrollControls damping={6} pages={5}>
          <Items />
          <Scroll html style={{ width: "100%" }}>
            <h1 className="absolute text-[13em] right-[50px] top-[100vh] transform -translate-y-full">
              all
            </h1>
            <h1 className="absolute text-[13em] left-1/10 top-[180vh]">hail</h1>
            <h1 className="absolute text-[13em] right-1/10 top-[260vh]">
              thee,
            </h1>
            <h1 className="absolute text-[13em] left-1/10 top-[350vh]">
              thoth
            </h1>
            <h1 className="absolute text-[13em] right-1/10 top-[450vh]">
              her
              <br />
              mes.
            </h1>
          </Scroll>
        </ScrollControls>
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(to top, transparent, transparent, transparent)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
