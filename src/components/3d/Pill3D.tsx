import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { MeshDistortMaterial } from '@react-three/drei';

export const Pill3D = () => {
  const capsuleRef = useRef<Mesh>(null);
  const sphereRef1 = useRef<Mesh>(null);
  const sphereRef2 = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (capsuleRef.current) {
      capsuleRef.current.rotation.y = time * 0.3;
      capsuleRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      capsuleRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
    if (sphereRef1.current && sphereRef2.current) {
      sphereRef1.current.rotation.y = time * 0.3;
      sphereRef2.current.rotation.y = time * 0.3;
    }
  });

  return (
    <group>
      {/* Main capsule body */}
      <mesh ref={capsuleRef} position={[0, 0, 0]}>
        <capsuleGeometry args={[0.5, 2, 32, 64]} />
        <MeshDistortMaterial
          color="#0084ff"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Decorative spheres */}
      <mesh ref={sphereRef1} position={[-1.5, 0.5, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <MeshDistortMaterial
          color="#00ff99"
          attach="material"
          distort={0.4}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      
      <mesh ref={sphereRef2} position={[1.5, -0.5, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <MeshDistortMaterial
          color="#ffcc00"
          attach="material"
          distort={0.5}
          speed={2.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#00ff99" intensity={0.5} />
    </group>
  );
};
