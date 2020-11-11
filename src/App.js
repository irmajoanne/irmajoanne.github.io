import * as THREE from "three";
import React, { Suspense, useRef, useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber'
import './App.scss';
import Navbar from './components/Navbar';
import About from './components/About';
import Research from './components/Research';
import Project from './components/Project';
import Projects from './components/Projects';
import FetchProject from './components/FetchProject';
import Irmajoanne from './components/Irmajoanne';
import Cursor from './components/Cursor';
import CrystalLoader from './components/CrystalLoader';
import state from './utils/store';
import { AnimatePresence } from "framer-motion";

import homeBG from './utils/img/home.png';
import aboutBG from './utils/img/about.png';
import researchBG from './utils/img/research.png';
import blackBG from './utils/img/black.jpg';
import "./components/ImageFadeMaterial";

const FadingImage = () => {
  const { viewport } = useThree();
  const imageRef = useRef();
  const meshRef = useRef();
  const textures = useLoader(THREE.TextureLoader, [homeBG, aboutBG, researchBG, blackBG]);

  const getTexture = pathname => {
    switch (pathname) {
      case '/':
        return textures[0];
      case '/about':
        return textures[1];
      case '/research':
        return textures[2];
      case '/projects':
        return null;
      default:
        if(pathname && pathname.includes('/project/') && state.projectTexture.current) {
          return state.projectTexture.current;
        }
        return null;
    }
  }

  useFrame(() => {
    const curY = meshRef.current.position.y;
    const curTop = state.top.current;
    const tex = getTexture(state.from.current);
    const tex2 = getTexture(state.to.current);

    // Swap textures
    // eslint-disable-next-line no-mixed-operators
    if((imageRef.current.tex !== tex || (imageRef.current.tex2 !== tex2) && imageRef.current.dispFactor === 1)) {
      imageRef.current.tex = tex;
      imageRef.current.tex2 = tex2;
      imageRef.current.dispFactor = 0;
    } // Complete transition
    else if(imageRef.current.tex !== tex || (imageRef.current.tex2 !== tex2 && imageRef.current.dispFactor !== 1)) {
      imageRef.current.dispFactor = 1;
    } // Transition
    else {
      imageRef.current.dispFactor = THREE.MathUtils.lerp(imageRef.current.dispFactor, 1, 0.02);
      meshRef.current.position.y = THREE.MathUtils.lerp(curY, curTop, 0.08);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeBufferGeometry attach="geometry" args={[viewport.width, viewport.height]}/>
      <imageFadeMaterial ref={imageRef} attach="material" />
    </mesh>
  )
}

const Content = props => {
  const { setProject, lang, setLang, showHomeText, setShowHomeText, projects, setProjects } = props;
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/' && !showHomeText) setShowHomeText(true);
    if(location.pathname !== '/' && showHomeText) setShowHomeText(false);

    state.from.current = location.state ? location.state.prevPath: '';
    state.to.current = location.pathname;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  
  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <AnimatePresence exitBeforeEnter>
        <Switch key={`${location.pathname}-${lang}`}>
          <Route exact path="/about" component={() => <About lang={lang} />} />
          <Route exact path="/research" component={() => <Research lang={lang} />} />
          <Route exact path="/projects" component={() => <Projects lang={lang} setProjects={setProjects} />} />
          <Route exact path="/project/:id" component={() => (
            <FetchProject
              key={lang}
              lang={lang}
              setProject={setProject}
              projects={projects}
            />
            )}
          />
        </Switch>
      </AnimatePresence>
    </>
  )
}

const Scene = props => {
  const {
    project,
    showHomeText,
    setPageSize,
    projects,
    lang
  } = props;

  return (
    <>
      <Suspense fallback={<CrystalLoader />}>
        {showHomeText && <Irmajoanne hAlign="center" position={[100, 100, 0]} />}
        <FadingImage />
        {project && <Project key={`${project.sys.id}-${lang}`} project={project} setPageSize={setPageSize} projects={projects} />}
      </Suspense>
    </>
  )
}


const App = () => {
  const [lang, setLang] = useState('en-US');
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [showHomeText, setShowHomeText] = useState(1);
  const scrollArea = useRef();

  useEffect(() => {
    // Update scrollArea when changing state
    scrollArea.current.scrollTop = state.top.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.top.current])

  const onWheel = e => {
    const { deltaY } = e;
    // Fix slower DeltaY increment in Firefox.
    if (window.navigator.userAgent.indexOf("Firefox") > -1) {
      scrollArea.current.scrollTop += deltaY * 7;
    } else {
      scrollArea.current.scrollTop += deltaY;
    }

    state.top.current = scrollArea.current.scrollTop;
  }

  return (
    <div
      className="App"
      onWheel={onWheel}
    >
      <Cursor />
      <Content
        lang={lang}
        setLang={setLang}
        setProject={setProject}
        showHomeText={showHomeText}
        setShowHomeText={setShowHomeText}
        projects={projects}
        setProjects={setProjects}
      />
      <Canvas className="canvas" concurrent pixelRatio={1} camera={{ zoom: state.zoom, position: [0, 0, 500] }}>
        <Scene
          project={project}
          showHomeText={showHomeText}
          setPageSize={setPageSize}
          projects={projects}
          lang={lang}
        />
      </Canvas>
      <div className="scrollArea" ref={scrollArea}>
        <div style={{ height: `${pageSize * 100}vh` }} />
      </div>
    </div>
  );
}

export default App;
