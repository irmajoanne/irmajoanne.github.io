import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { AnimatePresence } from "framer-motion";
import { ReactComponent as MenuIcon } from '../utils/icons/menu.svg';

const Menu = props => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleSideBar = () => setIsVisible(!isVisible);

  return (
    <div className="menu">
      <div className="icon" onClick={toggleSideBar}>
        <MenuIcon />
      </div>
      <AnimatePresence>
        {isVisible && <Sidebar toggleSideBar={toggleSideBar} />}
      </AnimatePresence>
    </div>
  );
}

export default Menu;
