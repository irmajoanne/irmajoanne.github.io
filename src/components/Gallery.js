import * as THREE from 'three';
import React, { useRef } from 'react';
import { useFrame, useLoader, useThree } from 'react-three-fiber';
import state from '../utils/store';
import "./ProjectImage";
import lerp from 'lerp';

const Image = props => {
  const { index, texture, x, y, dimension, offset } = props;
  const ref = useRef();

  useFrame(() => {
    const shift = ((offset + state.top.current ) / ref.current.parent.position.y) - 1;
    ref.current.material.uniforms.shift.value = lerp(
      ref.current.material.uniforms.shift.value,
      shift * 0.7,
      0.1
    );
  });

  return (
    <mesh
      ref={ref}
      key={index.toString()}
      position={[x, y, index % 2 !== 0 ? 0 : -50]}
    >
      <planeBufferGeometry attach="geometry" args={dimension}/>
      <projectImage ref={ref} attach="material" tex={texture} u_mouse={{ x: 0.0, y: 0.0 }}/>
    </mesh>
  )
}

const Gallery = props => {
  const { images, imageMarginY, offset } = props;
  const { viewport } = useThree();
  const textures = useLoader(THREE.TextureLoader, images.map(img => img.url));

  const getX = index => {
    let disp;
    const init = -viewport.width/4;

    if(index === 0 || index % 4 === 0) disp = 0;
    else if (index % 2 === 0) disp = viewport.width/2;
    else disp = viewport.width/4;

    return init + disp;
  }

  const getY = index => {
    const img = images[index];
    let factor = 1;
    if(img.width < img.height) factor = 1.05;
    return offset + index * ((-viewport.height/2) - (factor * imageMarginY));
  }

  const getDimension = index => {
    const img = images[index];
    if(img.width < img.height) return [viewport.width/3, (3.5*viewport.height)/4];
    return [viewport.width/2, (3 * viewport.height)/4];
  }

  return textures.map((texture, index) => (
      <Image
        key={index.toString()}
        index={index}
        texture={texture}
        x={getX(index)}
        y={getY(index)}
        dimension={getDimension(index)}
        offset={-viewport.height}
      />
  ))
}

export default Gallery;
