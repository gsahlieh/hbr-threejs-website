import { Link, animateScroll as scroll } from "react-scroll";
import useDeviceDetect from "./hooks/useDeviceDetect";

export default function Navbar() {
  const { isMobile } = useDeviceDetect();
  const scrollToPosition = () => {
    scroll.scrollTo(0);
  };

  return (
    <>
      <nav
        className="bg-black border-white border-b"
        style={{ borderBottomWidth: "0.5px" }}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
          <Link
            to="contactForm"
            spy={true}
            smooth={true}
            duration={500}
            offset={-70}
          >
            <div className="flex flex-row items-end space-x-4 ">
              <div>
                <img
                  src="/images/hbr-hills-logo-transparent.png"
                  className="w-24 py-1"
                  alt="Logo"
                  onClick={scrollToPosition}
                />
              </div>

              {!isMobile && (
                <h1 className="font-robotoHeavy text-3xl">HILLS BATHROOMS</h1>
              )}
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}
