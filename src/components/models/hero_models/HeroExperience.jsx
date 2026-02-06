import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";

import { SpaceBoi } from "./SpaceBoi";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { Suspense } from "react";

const RotatingModel = ({ isMobile }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotation lente sur l'axe Y (horizontal)
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 0.6 : 0.9}
      position={[1, -2, 0]}
      rotation={[0.1, -Math.PI / 4, 0]}
    >
      <SpaceBoi />
    </group>
  );
};

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      {/* deep blue ambient */}
      <ambientLight intensity={0.2} color="#1a1a40" />
      {/* Configure OrbitControls to disable panning and control zoom based on device type */}
      <OrbitControls
        enablePan={false} // Prevents panning of the scene
        enableZoom={!isTablet} // Disables zoom on tablets
        maxDistance={20} // Maximum distance for zooming out
        minDistance={5} // Minimum distance for zooming in
        minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
        maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
      />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={100} />
        <RotatingModel isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
