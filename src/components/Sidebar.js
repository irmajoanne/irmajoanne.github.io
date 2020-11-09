import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const slideInOut = {
  transition: {
    duration: 0.65,
    ease: 'easeOut'
  },
  initial: {
    x: '100%',
    opacity: 0
   },
  animate: { x: '0%', opacity: 1 },
  exit: { x: '100%', opacity: 0 }
}

const Sidebar = props => {
  const location = useLocation();
  const { toggleSideBar } = props;
  const ref = useRef();

  const handleClickOutside = e => {
    if (ref.current && !ref.current.contains(e.target)) toggleSideBar();
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div ref={ref} key="Sidebar" className="sidebar" {...slideInOut}>
      <Link onClick={toggleSideBar} className="link" to={{pathname: '/', state: { prevPath: location.pathname }}}>HOME</Link>
      <Link onClick={toggleSideBar} className="link" to={{pathname: '/about', state: { prevPath: location.pathname }}}>ABOUT</Link>
      <Link onClick={toggleSideBar} className="link" to={{pathname: '/research', state: { prevPath: location.pathname }}}>RESEARCH</Link>
      <Link onClick={toggleSideBar} className="link" to={{pathname: '/projects', state: { prevPath: location.pathname }}}>PROJECTS</Link>
    </motion.div>
  );
}

export default Sidebar;
