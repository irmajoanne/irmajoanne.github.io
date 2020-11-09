import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import ResponsiveProject from './ResponsiveProject';
import { isResponsive } from '../utils/breakpoints';
import CircularLoader from './CircularLoader';

const GET_PROJECT = gql`
  query GetProject($id: String!, $lang: String!) {
    project (id: $id, locale: $lang) {
      sys {
        id
      }
      title
      description
      video
      featureImage (locale: "en-US") {
        url
      }
      galleryCollection (locale: "en-US") {
        items {
          url
          width
          height
        }
      }
    }
  }
`;

const FetchProject = props => {
  const { lang, setProject, projects } = props;
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id, lang }
  });

  useEffect(() => {
    if(!loading && !error && data && data.project && !isResponsive) setProject(data.project);
    return () => {
      // Clear project image
      setProject(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if(isResponsive && !loading) {
    return (
      <ResponsiveProject
        key={data.project.sys.id}
        project={data.project}
        projects={projects}
      />
    )
  } else if (loading) {
    return <CircularLoader />;
  } else {
    return null;
  }
}

export default FetchProject;
