import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import OpeningSceneText from "./components/OpeningSceneText";

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

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="absolute h-full w-full">
        {/* <OpeningSceneText /> */}
        <div className="z-2 h-full w-full">
          <Canvas
            camera={{ fov: fov }}
            style={{ height: "100%", width: "100%" }}
          >
            <Experience />
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
