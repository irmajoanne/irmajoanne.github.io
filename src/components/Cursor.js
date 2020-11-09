import React, { useEffect, useRef } from "react";

const Cursor = () => {
  const cursor = useRef();
  const background = useRef();

  const onMouseMove = e => {
    cursor.current.style.left = `${e.pageX}px`;
    cursor.current.style.top = `${e.pageY}px`;
    background.current.style.left = `${e.pageX}px`;
    background.current.style.top = `${e.pageY}px`;
  }

  const onMouseDown = () => {
    cursor.current.style.width = '3rem';
    cursor.current.style.height = '3rem';
  }

  const onMouseUp = () => {
    cursor.current.style.width = '2.5rem';
    cursor.current.style.height = '2.5rem';
  }

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
   return () => {
     document.removeEventListener('mousemove', onMouseMove);
     document.removeEventListener('mousedown', onMouseDown);
     document.removeEventListener('mouseup', onMouseUp);
   }
 }, []);

  return (
    <>
      <div ref={cursor} className="cursor" />
      <div ref={background} className="backgroundCursor" />
    </>
  )
}

export default Cursor;
