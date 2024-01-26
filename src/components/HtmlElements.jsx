import { Scroll } from "@react-three/drei";
import React from "react";
import ContactForm from "./ContactForm";
import useDeviceDetect from "./hooks/useDeviceDetect";

// Audio
const music = new Audio("./audio/spa-jazz-piano-music.mp3");
music.volume = 0.3;
music.loop = true;

export default function HtmlElements() {
  const { isWideScreen } = useDeviceDetect();

  return (
    <>
      <Scroll html style={{ width: "100%" }}>
        {/* Who we are */}
        <div className="absolute flex flex-col top-[100vh] md:w-[50vw] w-full md:mx-0 px-8 right-0">
          <div className="flex flex-col items-center my-12 space-y-5 justify-end">
            <div
              className="space-y-24 border-white rounded-3xl p-6 md:max-w-[1200px]"
              style={{
                backgroundColor: "rgba(0,0,0,.80)",
                borderWidth: "0.5px",
              }}
            >
              <p className="md:text-8xl text-5xl">
                Bring your{" "}
                <span className="font-playfair text-green-400">dream</span>{" "}
                bathroom to life with our team of{" "}
                <span className="font-playfair text-green-400">experts</span>
              </p>
              <p className="md:text-6xl text-4xl">We deliver value.</p>
            </div>
          </div>
        </div>

        {/* Previous Works */}
        <div className="absolute flex flex-col top-[220vh] md:w-[50vw] w-full px-8 md:right-0">
          <div className="flex flex-col my-12 space-y-5 w-full justify-center items-center">
            <div className="max-w-[1200px] w-full md:px-6 text-center flex flex-col justify-center items-center">
              <h1 className={`text-7xl italic font-robotoHeavy `}>
                PREVIOUS WORKS
              </h1>
              <div
                className={`flex flex-col text-center justify-center items-center mt-[10vh] space-y-6 border-white rounded-3xl py-6 max-w-[80vw] w-fit px-10`}
                style={{
                  backgroundColor: "rgba(0,0,0,.80)",
                  borderWidth: "0.5px",
                }}
              >
                <div
                  className={`w-[60vw] ${
                    isWideScreen ? "md:w-[15vw]" : "md:w-[25vw]"
                  } text-center mx-auto`}
                >
                  <img
                    src="/images/beaumont-hills.jpeg"
                    alt="Beaumont Hills"
                    className="w-full"
                  />
                </div>
                <h1 className="text-4xl md:text-7xl italic font-robotoHeavy text-center">
                  Beaumont Hills
                </h1>
              </div>

              <div
                className={`flex flex-col text-center justify-center items-center mt-[10vh] space-y-6 border-white rounded-3xl py-6 max-w-[80vw] w-fit px-10`}
                style={{
                  backgroundColor: "rgba(0,0,0,.80)",
                  borderWidth: "0.5px",
                }}
              >
                <div
                  className={`w-[60vw] ${
                    isWideScreen ? "md:w-[15vw]" : "md:w-[25vw]"
                  } text-center mx-auto`}
                >
                  <img
                    src="/images/rouse-hill.jpeg"
                    alt="Beaumont Hills"
                    className="w-full"
                  />
                </div>
                <h1 className="text-4xl md:text-7xl italic font-robotoHeavy text-center">
                  Rouse Hill
                </h1>
              </div>

              <div
                className={`flex flex-col text-center justify-center items-center mt-[10vh] space-y-6 border-white rounded-3xl py-6 max-w-[80vw] w-fit px-10`}
                style={{
                  backgroundColor: "rgba(0,0,0,.80)",
                  borderWidth: "0.5px",
                }}
              >
                <div
                  className={`w-[60vw] ${
                    isWideScreen ? "md:w-[15vw]" : "md:w-[25vw]"
                  } text-center mx-auto`}
                >
                  <img
                    src="/images/glenhaven.jpeg"
                    alt="Beaumont Hills"
                    className="w-full"
                  />
                </div>
                <h1 className="text-4xl md:text-7xl italic font-robotoHeavy text-center">
                  Glenhaven
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Get in Touch */}
        <div
          className={`absolute flex flex-col top-[597vh] ${
            isWideScreen ? "md:top-[720vh]" : "md:top-[710vh]"
          } w-full px-8`}
        >
          <div className="flex flex-col my-12 space-y-5 w-full justify-center items-center">
            <div className="max-w-[1200px] w-full md:px-6 text-center flex flex-col justify-center items-center">
              <div
                className={`flex flex-col text-center justify-center items-center mt-[10vh] space-y-6 border-white rounded-3xl px-10 md:px-16 py-8 md:pt-16 md:pb-8 max-w-[80vw] w-fit`}
                style={{
                  backgroundColor: "rgba(0,0,0,.80)",
                  borderWidth: "0.5px",
                }}
              >
                <h1 className="text-7xl text-left italic font-robotoHeavy ">
                  GET IN TOUCH
                </h1>

                <div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scroll>
    </>
  );
}
