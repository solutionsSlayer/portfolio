import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Computer from "./Computer";

const ROTATION_SPEED = 0.15;

function RotatingDesk() {
  const groupRef = useRef(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * ROTATION_SPEED;
  });
  return (
    <group ref={groupRef} scale={0.8} position={[0, -1.5, -1.2]} castShadow>
      <Computer />
    </group>
  );
}

const ContactExperience = () => {
  return (
    <Canvas shadows camera={{ position: [0, 8, 100], fov: 60 }}>
      <ambientLight intensity={0.5} color="#fff4e6" />

      <directionalLight position={[5, 5, 3]} intensity={2.5} color="#ffd9b3" />

      <directionalLight
        position={[5, 9, 1]}
        castShadow
        intensity={2.5}
        color="#ffd9b3"
      />

      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
        target={[0, -1.5, -1.2]}
      />

      <group scale={[1, 1, 1]}>
        <mesh
          receiveShadow
          position={[0, -1.5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#a46b2d" />
        </mesh>
      </group>

      <RotatingDesk />
    </Canvas>
  );
};

export default ContactExperience;
