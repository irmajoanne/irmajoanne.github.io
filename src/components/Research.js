import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { motion } from "framer-motion";
import { fadeInOut } from '../utils/framerMotionAnimations';
import CircularLoader from './CircularLoader';

const GET_RESEARCH = gql`
  query GetResearch($lang: String!) {
    page(id: "23GZ8hycFeG9yW7ER7SXlf", locale: $lang) {
      title
      description
    }
  }
`;

const Research = props => {
  const { lang } = props;
  const { loading, error, data } = useQuery(GET_RESEARCH, {
    variables: { lang }
  });

  if(loading) return <CircularLoader />;
  return (
    <motion.div key="Research" className="page" {...fadeInOut}>
      <div className="title">{data && data.page && data.page.title}</div>
      <div className="description">{data && data.page && data.page.description}</div>
    </motion.div>
  );
}

export default Research;
