import React, { useRef } from "react";
import { useFrame, useThree } from 'react-three-fiber';
import { Html, Tetrahedron } from "drei";

const CrystalLoader = () => {
  const { viewport } = useThree();
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.z += 0.015;
    ref.current.rotation.y += 0.02;
    ref.current.rotation.x += 0.01;
  });

  return (
    <>
      <pointLight position={[0, 100, 400]} power={15}/>
      <group>
        <Tetrahedron ref={ref} position={[0, 30, 0]} scale={[30, 30, 30]}>
          <meshStandardMaterial
            attach="material"
            color="#ECAEE6"
            emissive="#5C38FF"
            roughness={0.6}
            metalness={1}
            depthTest
            depthWrite
          />
        </Tetrahedron>
        <Html position={[-viewport.width/2, -20, 0]}>
          <div className="loading">LOADING</div>
        </Html>
      </group>
    </>
  )
}

export default CrystalLoader;
