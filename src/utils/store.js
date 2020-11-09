import { createRef } from "react";

const sections = createRef();
const pages = createRef();
const top =  createRef();

pages.current = 1;
sections.current = 1;
top.current = 0;

const state = {
  sections,
  pages,
  top,
  zoom: 1,
  from: createRef(),
  to: createRef(),
  projectTexture: createRef()
}

export default state
