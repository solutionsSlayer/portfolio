import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

import { myProjects, PROJECT_CATEGORIES } from '../constants/index.js';
import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState(PROJECT_CATEGORIES[0].id);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const filteredProjects = useMemo(
    () => myProjects.filter((p) => (p.category ?? 'development') === selectedCategory),
    [selectedCategory]
  );

  const projectCount = filteredProjects.length;
  const currentProject = filteredProjects[selectedProjectIndex];

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedProjectIndex(0);
  };

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(`.animatedText`, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' });
  }, [selectedProjectIndex, currentProject]);

  return (
    <section id="projects" className="c-space my-20">
      <p className="head-text">Mes Projets</p>

      <nav className="flex flex-wrap gap-2 mt-4 mb-2" aria-label="Catégories de projets">
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === cat.id
                ? 'bg-white/15 text-white border border-white/30'
                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white/90'
            }`}>
            {cat.label}
          </button>
        ))}
      </nav>

      {projectCount === 0 ? (
        <p className="text-white/60 mt-8">Aucun projet dans cette catégorie pour le moment.</p>
      ) : (
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                (currentProject.visibility ?? 'public') === 'private'
                  ? 'bg-gray-700/90 text-gray-300 border border-gray-500'
                  : 'bg-emerald-600/90 text-white border border-emerald-500'
              }`}>
              {(currentProject.visibility ?? 'public') === 'private' ? 'Private' : 'Public'}
            </span>
          </div>
          <div className="absolute top-0 right-0">
            <img src={currentProject.spotlight} alt="spotlight" className="w-full h-96 object-cover rounded-xl" />
          </div>

          {(currentProject.visibility ?? 'public') !== 'private' && currentProject.showLogo !== false && (
            <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
              <img className="w-full h-10 shadow-sm" src={currentProject.logo} alt="logo" />
            </div>
          )}

          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>

            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>

            {currentProject.externalLink ? (
              <a
                className="flex items-center gap-2 cursor-pointer text-white-600"
                href={currentProject.href}
                target="_blank"
                rel="noreferrer">
                <p>Check Live Site</p>
                <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
              </a>
            ) : (
              <></>
            )}
          </div>

          <div className="flex justify-between items-center mt-7">
            <button className="arrow-btn" onClick={() => handleNavigation('previous')}>
              <img src="/assets/left-arrow.png" alt="left arrow" />
            </button>

            <button className="arrow-btn" onClick={() => handleNavigation('next')}>
              <img src="/assets/right-arrow.png" alt="right arrow" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
          <Canvas>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer
                  texture={currentProject.texture}
                  isPrivate={(currentProject.visibility ?? 'public') === 'private'}
                />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
        </div>
      </div>
      )}
    </section>
  );
};

export default Projects;
