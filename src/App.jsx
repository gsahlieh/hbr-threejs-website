import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense, useEffect, useState } from "react";
import Experience from "./components/Experience";
import LoadingScreen from "./components/LoadingScreen";
import MuteButton from "./components/MuteButton";
import Navbar from "./components/Navbar";
import useStore from "./store/store";

function App() {
  // Fetching global state (zustand)
  const startPressed = useStore((state) => state.startPressed);
  const debugMode = useStore((state) => state.debugMode);
  const setDebugMode = useStore((state) => state.setDebugMode);
  const [isHidden, setIsHidden] = useState(true);

  // Handling slow fade in of mute button after loading screen is removed (otherwise it oddly pops up)
  useEffect(() => {
    if (startPressed) {
      const timer = setTimeout(() => {
        setIsHidden(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [startPressed]);

  // DEBUG MODE
  useEffect(() => {
    const handleHashChange = () => {
      setDebugMode(window.location.hash === "#debug");
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
      <div className="relative h-full w-full">
        <header>
          <Navbar />
        </header>
        {!isHidden && <MuteButton />}
        <div className="h-full w-full">
          <div className="z-2 h-full w-full">
            {/* For debug mode */}
            <Leva collapsed hidden={debugMode === false} />

            <Canvas
              camera={{ fov: 75 }}
              style={{ height: "100%", width: "100%" }}
            >
              <Suspense fallback={null}>
                <Experience />
              </Suspense>
            </Canvas>
            <LoadingScreen />
          </div>
          <div id="test"></div>
        </div>
      </div>
    </>
  );
}

export default App;
