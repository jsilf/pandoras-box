import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useEnvironment } from "@react-three/drei";
import * as THREE from "three";
import { DoubleSide, Group, Mesh } from "three";

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

// function Cube({ onActive }: activeType) {
//   const [active, setActive] = useState(false);
//   const meshRef = useRef<Mesh>(null);

//   return (
//     <mesh
//       scale={active ? 1.5 : 1}
//       onClick={() => {
//         onActive(!active);
//         setActive(!active);
//       }}
//       ref={meshRef}
//     >
//       <boxGeometry args={[2, 2, 2]} />
//       <meshStandardMaterial wireframe color={new THREE.Color("orange")} />
//     </mesh>
//   );
// }

function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end;
}

function Cube({ onActive }: activeType) {
  const [targetRotation, setTargetRotation] = useState(0);
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (!ref.current) return;

    ref.current.rotation.x = lerp(
      ref.current.rotation.x,
      -targetRotation,
      0.05
    );
  });

  return (
    <group onClick={() => setTargetRotation(Math.PI / 1.5)}>
      <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Bottom */}
        <planeBufferGeometry />
        <meshStandardMaterial side={DoubleSide} color={"blue"} />
      </mesh>
      <mesh position={[-0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Left side */}
        <planeBufferGeometry />
        <meshStandardMaterial side={DoubleSide} color={"purple"} />
      </mesh>
      <mesh position={[0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Right side */}
        <planeBufferGeometry />
        <meshStandardMaterial side={DoubleSide} color={"purple"} />
      </mesh>
      <mesh position={[0, 0, -0.5]} rotation={[0, 0, 0]}>
        {/* Back side */}
        <planeBufferGeometry />
        <meshStandardMaterial side={DoubleSide} color={"blue"} />
      </mesh>
      <mesh position={[0, 0, 0.5]} rotation={[0, 0, 0]}>
        {/* Front side */}
        <planeBufferGeometry />
        <meshStandardMaterial side={DoubleSide} color={"green"} />
      </mesh>
      <group ref={ref} position={[0, 0.5, -0.5]} rotation={[0, 0, 0]}>
        {/* Top */}
        <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <planeBufferGeometry />
          <meshStandardMaterial side={DoubleSide} color={"blue"} />
        </mesh>
      </group>
    </group>
  );
}

function App() {
  const [active, setActive] = useState(false);

  return (
    <div className="h-screen">
      <Canvas camera={{ position: [0, 5, 5] }}>
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
