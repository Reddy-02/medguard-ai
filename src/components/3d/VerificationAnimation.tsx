import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Text } from '@react-three/drei';

interface VerificationAnimationProps {
  isVerified: boolean;
}

export const VerificationAnimation = ({ isVerified }: VerificationAnimationProps) => {
  const ringRef = useRef<Mesh>(null);
  const particlesRef = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 2;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <group>
      {/* Verification ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshBasicMaterial color={isVerified ? "#00ff99" : "#ff0044"} />
      </mesh>

      {/* Status text */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.3}
        color={isVerified ? "#00ff99" : "#ff0044"}
        anchorX="center"
        anchorY="middle"
      >
        {isVerified ? "VERIFIED" : "UNVERIFIED"}
      </Text>

      {/* Particle effect */}
      <mesh ref={particlesRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color={isVerified ? "#00ff99" : "#ff0044"}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      <ambientLight intensity={0.8} />
      <pointLight position={[0, 0, 5]} intensity={1} color={isVerified ? "#00ff99" : "#ff0044"} />
    </group>
  );
};
