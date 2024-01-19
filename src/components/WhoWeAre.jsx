import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { Scroll, shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import blobVertexShader from "./shaders/blob/vertex.glsl";
import blobFragmentShader from "./shaders/blob/fragment.glsl";

const BlobMaterial = shaderMaterial(
  {
    time: 0,
    pointscale: 0.2,
    decay: 0.3,
    size: 0.3,
    displace: 0.3,
    complex: 0.0,
    waves: 0.1,
    eqcolor: 0.0,
    rcolor: 0.0,
    gcolor: 0.0,
    bcolor: 0.0,
    fragment: true,
    redhell: true,
  },
  blobVertexShader,
  blobFragmentShader
);

extend({ BlobMaterial });

const Sphere = (props) => {
  const { viewport } = useThree();
  const sphere = useRef();
  const blobMaterial = useMemo(
    () =>
      new BlobMaterial({
        time: 0,
        pointscale: 0.2,
        decay: 0.3,
        size: 0.3,
        displace: 0.3,
        complex: 0.0,
        waves: 0.1,
        eqcolor: 0.0,
        rcolor: 0.0,
        gcolor: 0.0,
        bcolor: 0.0,
        fragment: true,
        redhell: true,
      }),
    []
  );
  const {
    size,
    displace,
    complex,
    waves,
    eqcolor,
    rcolor,
    gcolor,
    bcolor,
    fragment,
    redhell,
  } = useControls("Blob", {
    size: {
      value: 1,
      min: 0,
      max: 100,
    },
    displace: {
      value: 1,
      min: 0,
      max: 100,
    },
    complex: {
      value: 2,
      min: 0,
      max: 100,
    },
    waves: {
      value: 0,
      min: 0,
      max: 100,
    },
    eqcolor: {
      value: 10,
      min: 0.1,
      max: 100,
    },
    rcolor: {
      value: 1.5,
      min: 0,
      max: 5,
    },
    gcolor: {
      value: 1.5,
      min: 0,
      max: 5,
    },
    bcolor: {
      value: 1.5,
      min: 0,
      max: 5,
    },
    fragment: true,
    redhell: true,
  });

  // const { scale, position } = useControls("sphere", {
  //   scale: {
  //     // Scale was scale={Math.max(viewport.width, viewport.height) / 8}
  //     value: 1,
  //     step: 0.01,
  //     min: 0,
  //     max: 5,
  //   },
  //   position: {
  //     value: { x: 3, y: -7.6, z: 0 },
  //     step: 0.01,
  //     joystick: "orbit",
  //   },
  // });

  useFrame(({ clock }) => {
    sphere.current.material.uniforms.time.value = clock.getElapsedTime();
    sphere.current.material.uniforms.size.value = size;
    sphere.current.material.uniforms.displace.value = displace;
    sphere.current.material.uniforms.complex.value = complex;
    sphere.current.material.uniforms.waves.value = waves;
    sphere.current.material.uniforms.eqcolor.value = eqcolor;
    sphere.current.material.uniforms.rcolor.value = rcolor;
    sphere.current.material.uniforms.gcolor.value = gcolor;
    sphere.current.material.uniforms.bcolor.value = bcolor;
    sphere.current.material.uniforms.fragment.value = fragment;
    sphere.current.material.uniforms.redhell.value = redhell;

    // sphere.current.scale.set(scale, scale, scale);
    // sphere.current.position.set(position.x, position.y, position.z);
  });

  return (
    <mesh
      ref={sphere}
      // scale={[scale, scale, scale]}
      // position={position}
      {...props}
      material={blobMaterial}
    >
      <sphereGeometry args={[1, 100, 100]} />
    </mesh>
  );
};

const WhoWeAre = () => {
  return (
    <>
      <Sphere position={[3, -7.6, 0]} scale={1} />
    </>
  );
};

export default WhoWeAre;
