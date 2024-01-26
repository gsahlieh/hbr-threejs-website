import { useEffect } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import useStore from "../store/store";

// Background music
const music = new Audio("./audio/spa-jazz-piano-music.mp3");
music.volume = 0.3;
music.loop = true;

export default function MuteButton() {
  // Setting variables + global state management
  const muted = useStore((state) => state.muted);
  const setMuted = useStore((state) => state.setMuted);
  const startPressed = useStore((state) => state.startPressed);

  // Ensuring music plays on loop
  useEffect(() => {
    if (startPressed) {
      music.play();
      music.onended = () => {
        music.currentTime = 0;
        music.play();
      };
    }
  }, [startPressed]);

  // Handling clicking of mute button
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
