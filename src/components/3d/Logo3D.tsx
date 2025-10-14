import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { MeshDistortMaterial } from '@react-three/drei';

export const Logo3D = () => {
  const shieldRef = useRef<Mesh>(null);
  const capsuleRef = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (shieldRef.current) {
      shieldRef.current.rotation.y = time * 0.5;
    }
    if (capsuleRef.current) {
      capsuleRef.current.rotation.y = -time * 0.7;
      capsuleRef.current.position.y = Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group>
      {/* Shield shape */}
      <mesh ref={shieldRef} position={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.8, 0.6, 0.1, 6]} />
        <MeshDistortMaterial
          color="#0084ff"
          attach="material"
          distort={0.2}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Capsule in center */}
      <mesh ref={capsuleRef} position={[0, 0, 0]}>
        <capsuleGeometry args={[0.15, 0.6, 16, 32]} />
        <MeshDistortMaterial
          color="#00ff99"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={1}
        />
      </mesh>

      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
    </group>
  );
};
