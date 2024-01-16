import Navbar from "./components/Navbar";
import OpeningScene from "./components/OpeningScene";
import WhoWeAre from "./components/WhoWeAre";

function App() {
  return (
    <>
      <div className="max-w-screen-lg mx-auto min-h-screen flex flex-col ">
        <Navbar />
        <OpeningScene />
        <WhoWeAre />
      </div>
    </>
  );
}

export default App;
