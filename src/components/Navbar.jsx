import { useEffect, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { Link, animateScroll as scroll } from "react-scroll";
import useDeviceDetect from "./hooks/useDeviceDetect";
import useStore from "../store/store";

export default function Navbar() {
  const { isMobile } = useDeviceDetect();
  const scrollToPosition = () => {
    scroll.scrollTo(0);
  };

  return (
    <>
      <nav
        className="bg-black border-white border-b"
        style={{ borderBottomWidth: "0.5px" }}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="target" smooth={true} duration={500}>
            <div className="flex flex-row items-end space-x-4 ">
              <div>
                <img
                  src="/images/hbr-hills-logo-transparent.png"
                  className="w-24 py-1"
                  alt="Logo"
                  onClick={scrollToPosition}
                />
              </div>

              {!isMobile && (
                <h1 className="font-robotoHeavy text-3xl">HILLS BATHROOMS</h1>
              )}
            </div>
          </Link>
          <Link to="target" smooth={true} duration={500}>
            <button
              type="button"
              className="text-white bg-green-800 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Get in touch
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}
