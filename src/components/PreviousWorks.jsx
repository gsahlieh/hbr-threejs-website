import { useThree } from "@react-three/fiber";
import PWImage from "./PWImage";

export default function PreviousWorks() {
  const { width: w, height: h } = useThree((state) => state.viewport);
  return (
    <>
      <PWImage
        url="/images/beaumont-hills.jpeg"
        scale={[w / 3.5, w / 3.5, 1]}
        position={[w / 3.85, -h * 1.95, 0]}
      />
      <PWImage
        url="/images/rouse-hill.jpeg"
        scale={[w / 3.5, w / 3.5, 1]}
        position={[w / 3.85, -h * 2.95, 0]}
      />
      <PWImage
        url="/images/glenhaven.jpeg"
        scale={[w / 3.5, w / 3.5, 1]}
        position={[w / 3.85, -h * 3.95, 0]}
      />
    </>
  );
}
