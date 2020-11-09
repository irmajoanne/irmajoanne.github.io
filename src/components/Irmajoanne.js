import * as THREE from 'three'
import React, { useMemo, useEffect, useState } from 'react'
import { useLoader, useUpdate, useThree } from 'react-three-fiber'
import lerp from 'lerp';
import { isResponsive } from '../utils/breakpoints';

const Irmajoanne = ({ children, vAlign = 'center', hAlign = 'center', size = 12, color = '#000000', ...props }) => {
  const { viewport } = useThree();
  const [pivot, setPivot] = useState(0);
  const font = useLoader(THREE.FontLoader, '/Voice_In_My_Head_Regular.json');
  const config = useMemo(
    () => ({ font, size: isResponsive ? 22: 36, height: 60, curveSegments: 32, bevelEnabled: true, bevelThickness: 6, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 8 }),
    [font]
  )
  const mesh = useUpdate(
    self => {
      const size = new THREE.Vector3()
      self.geometry.computeBoundingBox()
      self.geometry.boundingBox.getSize(size)
      self.position.x = -size.x / 2;
      self.position.y = -size.y / 2;
      self.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( -size.x/2 , 0, 0 ) );
      setPivot(size.x * .6);
    },
    [children]
  )

  const onMouseMove = e => {
    if(!isResponsive) {
      mesh.current.rotation.y = lerp(
        mesh.current.rotation.y,
        THREE.MathUtils.mapLinear(e.clientX, 0, viewport.width, -0.1, 0.1),
        0.5
      );

      mesh.current.rotation.x = lerp(
        mesh.current.rotation.x,
        THREE.MathUtils.mapLinear(e.clientY, 0, viewport.height, -0.1, 0.1),
        0.5
      );
    }
  }

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
   return () => {
     document.removeEventListener('mousemove', onMouseMove)
   }
   // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

  return (
    <>
      <pointLight position={[0, 100, 400]} power={15}/>
      <group {...props} position={[pivot, 0, 100]} scale={[0.1 * size, 0.1 * size, 0.1]}>
        <mesh ref={mesh}>
          <textGeometry attach="geometry" args={['I R M A J O A N N E', config]} />
          <meshStandardMaterial
            attach="material"
            color="#ECAEE6"
            emissive="#5C38FF"
            roughness={0.6}
            metalness={1}
            depthTest
            depthWrite
          />
        </mesh>
      </group>
    </>
  )
}

export default Irmajoanne;
