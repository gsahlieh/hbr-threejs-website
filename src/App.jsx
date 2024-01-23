import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import Navbar from "./components/Navbar";
import { Suspense, useEffect, useState } from "react";
import OpeningSceneText from "./components/OpeningSceneText";
import { Leva } from "leva";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [fov, setFov] = useState(45);

  useEffect(() => {
    const width = window.innerWidth;

    if (width >= 1200) {
      // Desktop
      setFov(75);
    } else if (width >= 768 && width < 1200) {
      // Tablet
      setFov(90);
    } else if (width < 768) {
      // Mobile
      setFov(120);
    }
  }, []);

  // Loading screen stuff
  const [start, setStart] = useState(false);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="absolute h-full w-full">
        {/* <OpeningSceneText /> */}
        <div className="z-2 h-full w-full">
          <Leva collapsed />

          <Canvas
            camera={{ fov: fov }}
            style={{ height: "100%", width: "100%" }}
          >
            <Suspense fallback={null}>
              <Experience />
            </Suspense>
          </Canvas>
          <LoadingScreen started={start} onStarted={() => setStart(true)} />
        </div>
      </div>
    </>
  );
}

export default App;
