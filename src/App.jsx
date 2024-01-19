import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

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
      <Canvas camera={{ fov: fov }}>
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
