import React, { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import useStore from "../store/store";

export default function LoadingScreen() {
  // Variables for loading percentage
  const { progress } = useProgress();
  const [progressValue, setProgressValue] = useState(0);

  // Variables + functions for loading screen removal
  const [isHidden, setIsHidden] = useState(false);
  const startPressed = useStore((state) => state.startPressed);
  const setStartPressed = useStore((state) => state.setStartPressed);
  useEffect(() => {
    if (startPressed) {
      const timer = setTimeout(() => {
        setIsHidden(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [startPressed]);

  useEffect(() => {
    // Preventing the percentage from decreasing (odd bug with Drei's useProgress hook)
    if (progress > progressValue) {
      setProgressValue(progress);
    }

    // Animating the water level
    document.getElementById("water").style.transform =
      "translate(0" + "," + (100 - progressValue) + "%)";
  }, [progress]);

  // Setting the conditional class for the outer div
  const loadingOuterClass = `loader-outer flex justify-center items-center w-full h-full ${
    startPressed ? "started" : "not-started"
  } ${progressValue === 100 ? "loading-completed" : "loading-not-completed"} ${
    isHidden ? "hidden" : ""
  }`;

  // Function for handling the button click
  const handleButtonClick = () => {
    if (progressValue === 100) {
      setStartPressed(true);
    } else {
      console.log("Loading not complete");
    }
  };

  return (
    <div className={loadingOuterClass}>
      <div className="flex justify-center items-center">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          style={{ display: "none" }}
        >
          <symbol id="wave">
            <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
            <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
            <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
            <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
          </symbol>
        </svg>
        <div className="box cursor-pointer" onClick={handleButtonClick}>
          <div className="percent">
            <div className="percentNum select-none text-5xl " id="count">
              {progressValue < 100
                ? Math.floor(progressValue) + "%"
                : "Explore"}
            </div>
          </div>
          <div id="water" className="water">
            <svg viewBox="0 0 560 20" className="water_wave water_wave_back">
              <use xlinkHref="#wave"></use>
            </svg>
            <svg viewBox="0 0 560 20" className="water_wave water_wave_front">
              <use xlinkHref="#wave"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
