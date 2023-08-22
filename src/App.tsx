import { Canvas } from "@react-three/fiber";
import { Cube } from "./components/Cube";
import { ThreeScene } from "./components/ThreeScene";

function App() {
  return (
    <div className="h-screen">
      <div className="loader"></div>
      <Canvas camera={{ position: [0, 2, 6] }}>
        <ThreeScene />
        <directionalLight position={[3.3, 1.0, 4.4]} intensity={3} />
        <Cube />
      </Canvas>
    </div>
  );
}

export default App;
