import { Environment, useEnvironment } from "@react-three/drei";
import * as THREE from "three";

export function ThreeScene() {
  const envMap: THREE.Texture | THREE.CubeTexture = useEnvironment({
    files: "/assets/kiara_1_dawn_4k.hdr",
  });

  return <Environment map={envMap} background blur={0.04} />;
}
