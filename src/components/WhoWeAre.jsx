import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
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

const Sphere = () => {
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
  const { viewport } = useThree();
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
  });

  return (
    <mesh
      ref={sphere}
      material={blobMaterial}
      scale={Math.max(viewport.width, viewport.height) / 8}
    >
      <sphereGeometry args={[1, 100, 100]} />
    </mesh>
  );
};

const WhoWeAre = () => {
  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-col space-y-3 md:w-1/2">
        <h1 className="text-6xl">Welcome To Hills Bathroom Renovations</h1>
        <p className="text-xl">
          Hills Bathroom Renovations is the bathroom renovations team that you
          can rely on to fully transform your bathroom. We have been Bathroom
          Remodelling in the North West Sydney for more than 15 years,
          renovating all sorts of bathrooms throughout the Hills area and
          Northern West Sydney. Our commitment to high -quality, professional
          work means that you will get the results that you will be amazed with.
        </p>
      </div>
      <div className="md:w-1/2">
        <Canvas
          camera={{ position: [0, 0, 40], fov: 15 }}
          style={{ height: "90vh" }}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Sphere />
        </Canvas>
      </div>
    </div>
  );
};

export default WhoWeAre;
