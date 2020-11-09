import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame, useLoader } from 'react-three-fiber';
import state from '../utils/store';
import ReactPlayer from 'react-player';
import { Html } from 'drei';
import Gallery from './Gallery';
import ProjectTitle from './ProjectTitle';
import { getNextProjectID } from '../utils/getNextProjectID';

const Project = props => {
  const { project, setPageSize, projects } = props;
  const { viewport } = useThree();
  const groupRef = useRef();
  const marginY = 200;
  const offset = -window.innerHeight;
  const projectTexture = useLoader(THREE.TextureLoader, [project.featureImage.url]);
  const nextProjectID = getNextProjectID(project.sys.id, projects);

  const getTextHeight = () => {
    const div = document.createElement('div');
    div.innerHTML = project.description;
    div.classList.add('projectDescription');
    document.body.appendChild(div);
    const height = div.getBoundingClientRect().height;
    document.body.removeChild(div);
    return height;
  }

  const getGalleryHeight = () => {
    let height = 0;

    project.galleryCollection.items.forEach(img => {
      if(img.width < img.height) height += ((3.5 * viewport.height)/4);
      else height += ((3 * viewport.height)/4);
    });

    return height;
  }

  const getNextProjectPosition = () => {
    let height = getTextHeight();
    if(project.video) height += 2 * marginY;

    project.galleryCollection.items.forEach(img => {
      if(img.width < img.height) height += ((3 * viewport.height)/4);
      else height += ((3 * viewport.height)/4);
    });

    return height;
  }

  const handleNextProjectClick = () => {
    window.appHistory.push(`${nextProjectID}`);
  }

  useEffect(() => {
    // Calculate page size
    state.projectTexture.current = projectTexture[0];
    const featuredImageHeight = window.innerHeight;

    let pageOffset = featuredImageHeight + getTextHeight() + getGalleryHeight() + marginY;

    if(project.video) {
      pageOffset += window.innerHeight;
    } else {
      pageOffset += marginY;
    }

    setPageSize(pageOffset/window.innerHeight);
    return () => {
      // Reset page size
      setPageSize(1);
      state.projectTexture.current = null;
      state.top.current = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame(() => {
    const curY = groupRef.current.position.y;
    const curTop = state.top.current - viewport.height;
    groupRef.current.position.y = THREE.MathUtils.lerp(curY, curTop, 0.08);
  });

  const descriptionOffset = marginY;
  const videoOffset = descriptionOffset - getTextHeight() - marginY;
  let galleryOffset = videoOffset - marginY;

  if(project.video) {
    galleryOffset -= 3*window.innerHeight/4;
  }

  return (
    <group ref={groupRef} position={[0, offset, 0]}>
      <ProjectTitle title={project.title} />
      <Html position={[-viewport.width/2, descriptionOffset, 0]}>
        <div className="projectDescription">{project.description}</div>
      </Html>
      {project.video && (
        <Html position={[-viewport.width/2, videoOffset, 0]}>
          <div className="videoWrapper">
            <ReactPlayer
              onMouseEnter={() => {
                const cursor = document.querySelector('.cursor');
                const backgroundCursor = document.querySelector('.backgroundCursor');
                cursor.style.display = 'none';
                backgroundCursor.style.display = 'none';
              }}
              onMouseLeave={() => {
                const cursor = document.querySelector('.cursor');
                const backgroundCursor = document.querySelector('.backgroundCursor');
                cursor.style.display = '';
                backgroundCursor.style.display = '';
              }}
              width={window.innerWidth/2}
              height={window.innerHeight/2}
              url={project.video}
              controls={false}
            />
          </div>
        </Html>
      )}
      {project.galleryCollection.items.length > 0 && (
        <Gallery
          images={project.galleryCollection.items}
          imageMarginY={marginY}
          offset={galleryOffset}
          curY={groupRef.current ? groupRef.current.position.y : 0}
        />
      )}
      {nextProjectID && (
        <Html style={{ width: '100vw' }} position={[-viewport.width/2, -getNextProjectPosition(), 0]}>
          <div
            onClick={handleNextProjectClick}
            className="title nextProject"
          >
            Next
          </div>
        </Html>
      )}
    </group>
  );
}

export default Project;
