import { useEffect, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { Link, animateScroll as scroll } from "react-scroll";
import useDeviceDetect from "./hooks/useDeviceDetect";
import useStore from "../store/store";

// Audio
const music = new Audio("./audio/spa-jazz-piano-music.mp3");
music.volume = 0.3;
music.loop = true;

export default function MuteButton() {
  const { isMobile } = useDeviceDetect();
  const muted = useStore((state) => state.muted);
  const setMuted = useStore((state) => state.setMuted);
  const startPressed = useStore((state) => state.startPressed);
  const setStartPressed = useStore((state) => state.setStartPressed);

  useEffect(() => {
    if (startPressed) {
      music.play();
      music.onended = () => {
        music.currentTime = 0;
        music.play();
      };
    }
  }, [startPressed]);

  // Mute button
  const toggleMute = () => {
    if (muted) {
      setMuted(false);
      music.muted = false;
    } else {
      setMuted(true);
      music.muted = true;
    }
  };
  return (
    <div>
      <button className="mute-button" onClick={toggleMute}>
        <div className="absolute md:top-24 md:right-8 top-20  -right-1">
          {muted ? (
            <FaVolumeMute className="md:w-8 md:h-8 w-5 h-5" />
          ) : (
            <FaVolumeUp className="md:w-8 md:h-8 w-5 h-5" />
          )}
        </div>
      </button>
    </div>
  );
}
