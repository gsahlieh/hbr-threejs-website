import Navbar from "./components/Navbar";
import OpeningScene from "./components/OpeningScene";
import WhoWeAre from "./components/WhoWeAre";
import PreviousWorks from "./components/PreviousWorks";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <div className="max-w-screen-lg mx-auto min-h-screen flex flex-col ">
        <Navbar />
        <OpeningScene />
        <WhoWeAre />
        <PreviousWorks />
        <Reviews />
        <Contact />
      </div>
    </>
  );
}

export default App;
