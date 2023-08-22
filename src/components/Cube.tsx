import { DoubleSide, Group } from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Lerp } from "./Lerp";

export function Cube() {
  const [targetRotation, setTargetRotation] = useState(0);
  const [runAnimation, setRunAnimation] = useState<boolean>(false);
  const topRef = useRef<Group>(null);
  const cubeRef = useRef<Group>(null);

  useFrame((state, dt) => {
    //cube rotation
    if (!runAnimation && cubeRef.current) {
      cubeRef.current.rotation.y += 0.5 * dt;
    }

    if (!topRef.current || !cubeRef.current || !runAnimation) return;

    //cube animation and transform on click
    topRef.current.rotation.x = Lerp(
      topRef.current.rotation.x,
      -targetRotation,
      1.4 * dt
    );

    const cameraPosition = state.camera.position;
    const cubePosition = cubeRef.current.position;
    const cubeRotation = cubeRef.current.rotation;

    const copy = cubeRef.current.clone();
    copy.lookAt(cameraPosition);

    const copyRotation = copy.rotation;

    cubeRef.current.rotation.set(
      Lerp(cubeRotation.x, copyRotation.x + Math.PI / 2, 1.4 * dt),
      Lerp(cubeRotation.y, copyRotation.y, 1.4 * dt),
      Lerp(cubeRotation.z, copyRotation.z, 1.4 * dt)
    );

    cubeRef.current.position.set(
      Lerp(cubePosition.x, cameraPosition.x, 1.4 * dt),
      Lerp(cubePosition.y, cameraPosition.y, 1.4 * dt),
      Lerp(cubePosition.z, cameraPosition.z, 1.4 * dt)
    );
  });

  return (
    <group
      ref={cubeRef}
      onClick={() => {
        setTargetRotation(Math.PI / 1.5);
        setRunAnimation(true);
      }}
    >
      <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Bottom */}
        <planeBufferGeometry />
        <meshStandardMaterial side={DoubleSide} color={"#272727"} />
      </mesh>
      <mesh position={[-0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Left side */}
        <planeBufferGeometry />
        <meshStandardMaterial side={DoubleSide} color={"#272727"} />
      </mesh>
      <mesh position={[0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Right side */}
        <planeBufferGeometry />
        <meshStandardMaterial side={DoubleSide} color={"#272727"} />
      </mesh>
      <mesh position={[0, 0, -0.5]} rotation={[0, 0, 0]}>
        {/* Back side */}
        <planeBufferGeometry />
        <meshStandardMaterial side={DoubleSide} color={"#272727"} />
      </mesh>
      <mesh position={[0, 0, 0.5]} rotation={[0, 0, 0]}>
        {/* Front side */}
        <planeBufferGeometry />
        <meshStandardMaterial side={DoubleSide} color={"#272727"} />
      </mesh>
      <group ref={topRef} position={[0, 0.5, -0.5]} rotation={[0, 0, 0]}>
        {/* Top */}
        <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <planeBufferGeometry />
          <meshStandardMaterial side={DoubleSide} color={"#272727"} />
        </mesh>
      </group>
    </group>
  );
}
