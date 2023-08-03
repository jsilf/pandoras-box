import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useEnvironment } from "@react-three/drei";
import * as THREE from "three";
import { Mesh } from "three";

type activeBool = { active: boolean };
type activeType = { onActive: React.Dispatch<React.SetStateAction<boolean>> };

function ThreeScene({ active }: activeBool) {
  //HDRI or PNGS
  const envMap: THREE.Texture | THREE.CubeTexture = useEnvironment({
    files: "/assets/kiara_1_dawn_4k.hdr",
  });
  // const envMap = useEnvironment({ path: "/assets/" });

  return (
    <>
      {/* hide background when clicked */}
      {!active ? (
        <Environment map={envMap} background />
      ) : (
        <Environment map={envMap} />
      )}
    </>
  );
}

function Cube({ onActive }: activeType) {
  const [active, setActive] = useState(false);
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh
      scale={active ? 1.5 : 1}
      onClick={() => {
        onActive(!active);
        setActive(!active);
      }}
      ref={meshRef}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={new THREE.Color("orange")} />
    </mesh>
  );
}

function App() {
  //pass state to siblings
  const [active, setActive] = useState(false);

  return (
    <div className="h-screen">
      <Canvas>
        <ThreeScene active={active} />
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Cube onActive={setActive} />
      </Canvas>
    </div>
  );
}

export default App;
