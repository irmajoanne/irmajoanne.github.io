import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { motion } from "framer-motion";
import { fadeInOut } from '../utils/framerMotionAnimations';
import CircularLoader from './CircularLoader';
import CV from '../utils/pdf/CV.pdf';

const GET_ABOUT = gql`
  query GetAbout($lang: String!){
    page(id: "4mFeyLEVkudkqjdvf5zNNT", locale: $lang) {
      title
      description
    }
  }
`;

const About = props => {
  const { lang } = props;
  const { loading, error, data } = useQuery(GET_ABOUT, {
    variables: { lang }
  });

  if(loading) return <CircularLoader />
  return (
    <motion.div key="About" className="page" {...fadeInOut}>
      <div className="title">{data && data.page && data.page.title}</div>
      <div className="description">
        {data && data.page && data.page.description}
        <div className="downloadWrapper">
          <a className="download" href={CV} download>Download CV</a>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
