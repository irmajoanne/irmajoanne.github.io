import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CircularLoader from './CircularLoader';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const GET_PROJECTS = gql`
  query GetProjects($lang: String!) {
    projectCollection(locale: $lang) {
      items {
        sys {
          id
        }
        title (locale: $lang)
        thumbnail (locale: "en-US") {
          url
        }
      }
    }
  }
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
    }
  }
}

const thumbnailAnimation = {
  hidden: { opacity: 0, y: '80%' },
  show: {
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.5,
      ease: 'backOut'
    }
  }
}

const Thumbnail = props => {
  const { id, title, src, imageLoaded } = props;
  return (
    <motion.div key={id} variants={thumbnailAnimation}>
      <Link to={`/project/${id}`} className="thumbnail">
        <div className="title">{title}</div>
        <img
          onLoad={imageLoaded}
          src={src}
          alt={title}
        />
      </Link>
    </motion.div>
  )
}

const Projects = props => {
  const { lang, setProjects } = props;
  const [countImgLoaded, setCountImageLoaded] = useState(0);
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { lang }
  });

  useEffect(() => {
    if(data &&
      data.projectCollection &&
      data.projectCollection.items &&
      data.projectCollection.items.length > 0) {
        setProjects(data.projectCollection.items);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if(loading) return <CircularLoader />;

  return (
    <AnimatePresence>
      <motion.div
        key="Projects"
        className="projects"
        variants={container}
        initial="hidden"
        animate={countImgLoaded === data.projectCollection.items.length ? 'show': null}
        exit={{opacity: 0}}
      >
        <SimpleBar forceVisible="y" autoHide={false} style={{ maxHeight: '100vh' }}>
          {data &&
            data.projectCollection &&
            data.projectCollection.items &&
            data.projectCollection.items.map((project, index) => (
              <Thumbnail
                key={project.sys.id}
                id={project.sys.id}
                title={project.title}
                imgTitle={project.title}
                src={project.thumbnail ? project.thumbnail.url : null}
                imageLoaded={() => setCountImageLoaded(countImgLoaded + 1)}
              />
            )
          )}
        </SimpleBar>
      </motion.div>
    </AnimatePresence>
  );
}

export default Projects;
