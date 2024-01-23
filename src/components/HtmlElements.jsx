import { Scroll } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import ContactForm from "./ContactForm";
import "../index.css";

export default function HtmlElements() {
  const [width, setWidth] = React.useState(window.innerWidth);

  return (
    <Scroll html style={{ width: "100%" }}>
      {/* Opening Scene */}

      {/* Who we are */}
      <div className="absolute flex flex-col top-[100vh] w-[50vw] right-0">
        <div className="flex flex-col items-center justify-end ml-16 my-12 space-y-5 top-[20vh]">
          <h1 className="text-7xl text-left outline-text font-robotoHeavy">
            WHO ARE WE
          </h1>

          <p className="text-3xl font-light font-robotoRegular">
            A family owned business which takes pride in providing the best
          </p>
        </div>
      </div>

      {/* Previous Works */}
      <div className="absolute flex flex-col top-[200vh] w-[50vw] right-0">
        <div className="flex flex-col items-center justify-end ml-16 my-12 space-y-5">
          <h1 className="text-7xl text-left outline-text font-robotoHeavy">
            PREVIOUS WORKS
          </h1>

          <h1 className="text-7xl text-left italic font-robotoHeavy absolute top-[70vh]">
            Beaumont Hills
          </h1>

          <h1 className="text-7xl text-left italic font-robotoHeavy absolute top-[170vh]">
            Rouse Hill
          </h1>

          <h1 className="text-7xl text-left italic font-robotoHeavy absolute top-[270vh]">
            Glenhaven
          </h1>
        </div>
      </div>

      {/* Reviews */}
      {/* <div className="absolute flex flex-col top-[200vh] w-[100vw] h-[100vh]">
        <div className="flex flex-col items-center justify-center mt-72">
          <h1 className="whitespace-nowrap text-7xl">What people are saying</h1>
        </div>
      </div> */}

      {/* Contact */}
      {/* <div className="absolute flex flex-col top-[300vh] w-[100vw] h-[100vh]">
        <div className="flex flex-col items-center justify-center m-auto p-12 rounded-2xl border">
          <ContactForm />
        </div>
      </div> */}
    </Scroll>
  );
}
