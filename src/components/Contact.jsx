import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Sparkles, Stars } from "@react-three/drei";

function Content() {
  const starRef = useRef();

  useFrame(({ clock }) => {
    if (starRef.current) {
      starRef.current.rotation.z = clock.getElapsedTime();
    }
  });

  return (
    <>
      {/* <Stars ref={starRef} /> */}
      <Sparkles count={300} scale={[20, 20, 20]} size={5} />
      <Html center>
        <form>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <input type="submit" value="Enter" />
        </form>
      </Html>
    </>
  );
}

export default function Contact() {
  return (
    <Canvas
      camera={{ position: [0, 0, -20], fov: 45 }}
      style={{ height: "70vh" }}
    >
      <Content />
    </Canvas>
  );
}
