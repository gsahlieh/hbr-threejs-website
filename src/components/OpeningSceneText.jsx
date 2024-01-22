import React, { useRef } from "react";

export default function OpeningSceneText() {
  const textBehind = useRef();
  const textFront = useRef();
  const textBehindBlur = useRef();

  return (
    <div className="relative top-[45vh] inset-0 flex items-center justify-center pointer-events-none">
      <div
        ref={textBehindBlur}
        className="absolute text-center text-white text-9xl font-bold blur z-0"
      >
        HILLS
        <br />
        BATHROOMS
      </div>
      <div
        ref={textBehind}
        className="absolute text-center text-white text-9xl font-bold z-1"
      >
        HILLS
        <br />
        BATHROOMS
      </div>

      <div
        ref={textFront}
        className="absolute text-center text-transparent text-9xl font-bold stroke-white z-10"
      >
        HILLS
        <br />
        BATHROOMS
      </div>
    </div>
  );
}
