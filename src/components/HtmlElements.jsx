import { Scroll } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import ContactForm from "./ContactForm";

export default function HtmlElements() {
  const [width, setWidth] = React.useState(window.innerWidth);

  return (
    <Scroll html style={{ width: "100%" }}>
      {/* Opening Scene */}

      {/* Who we are */}
      <div className="absolute flex flex-col  top-[100vh] w-[50vw]">
        <div className="flex flex-col items-center justify-center ml-16 my-12 absolute top-[30vh] space-y-5">
          <h1 className="text-6xl">Welcome To Hills Bathroom Renovations</h1>
          <p className="text-xl">
            Hills Bathroom Renovations is the bathroom renovations team that you
            can rely on to fully transform your bathroom. We have been Bathroom
            Remodelling in the North West Sydney for more than 15 years,
            renovating all sorts of bathrooms throughout the Hills area and
            Northern West Sydney. Our commitment to high -quality, professional
            work means that you will get the results that you will be amazed
            with.
          </p>
        </div>
      </div>

      {/* Previous Works */}

      {/* Reviews */}
      <div className="absolute flex flex-col top-[200vh] w-[100vw] h-[100vh]">
        <div className="flex flex-col items-center justify-center mt-72">
          <h1 className="whitespace-nowrap text-7xl">What people are saying</h1>
        </div>
      </div>

      {/* Contact */}
      <div className="absolute flex flex-col top-[300vh] w-[100vw] h-[100vh]">
        <div className="flex flex-col items-center justify-center m-auto p-12 rounded-2xl border">
          <ContactForm />
        </div>
      </div>
    </Scroll>
  );
}
