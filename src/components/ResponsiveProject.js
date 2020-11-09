import React from 'react';
import ReactPlayer from 'react-player';
import { motion } from "framer-motion";
import { fadeInOut } from '../utils/framerMotionAnimations';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { getNextProjectID } from '../utils/getNextProjectID';

const ResponsiveProject = props => {
  const { project, projects } = props;
  const nextProjectID = getNextProjectID(project.sys.id, projects);

  const handleNextProjectClick = () => {
    window.appHistory.push(`${nextProjectID}`);
  }

  return (
    <motion.div className="responsiveProject" {...fadeInOut}>
      <SimpleBar forceVisible="y" style={{ maxHeight: '100vh' }}>
        <img className="featureImage" src={project.featureImage.url} alt={project.title} />
        <div className="title">{project.title}</div>
        <div className="description">{project.description}</div>
        <div className="gallery">
          {project.video && (
            <ReactPlayer
              key="video"
              className="video"
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
              width={window.innerWidth * 0.8}
              url={project.video}
              controls={false}
            />
          )}
          {project.galleryCollection.items.map((img, index) => <img key={index.toString()} src={img.url} alt={img.title} />)}
        </div>
        {nextProjectID && (
          <div className="next">
            <div onClick={handleNextProjectClick} className="button">Next</div>
          </div>
        )}
      </SimpleBar>
    </motion.div>
  );
}

export default ResponsiveProject;
