import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense, useState, useEffect } from "react";
import Experience from "./components/Experience";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import MuteButton from "./components/MuteButton";
import useStore from "./store/store";

function App() {
  const startPressed = useStore((state) => state.startPressed);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if (startPressed) {
      // Set a timeout equal to the CSS transition duration in style.css on .started
      const timer = setTimeout(() => {
        setIsHidden(false);
      }, 1000); // Match the CSS transition duration in style.css on .started
      return () => clearTimeout(timer);
    }
  }, [startPressed]);

  return (
    <>
      <div className="relative h-full w-full">
        <header>
          <Navbar />
        </header>
        {!isHidden && <MuteButton />}
        <div className="h-full w-full">
          <div className="z-2 h-full w-full">
            <Leva collapsed hidden />

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
        </div>
      </div>
    </>
  );
}

export default App;
