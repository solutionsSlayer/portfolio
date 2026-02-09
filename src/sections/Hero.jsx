import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Je transforme
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>en projets concrets </h1>
              <h1>qui font la différence</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Salut, je suis Dorian, un développeur basé sur Bordeaux<br /> avec une passion pour
              le code.
            </p>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
            />
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure>
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>

        {/* Flèche de scroll — positionnée en bas du bloc hero (au-dessus des cartes) */}
        <a
          href="#about"
          aria-label="Défiler vers la section À propos"
          className="hero-scroll-arrow"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 md:w-8 md:h-8"
            aria-hidden
          >
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="url(#hero-arrow-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="hero-arrow-gradient" x1="5" y1="5" x2="19" y2="19" gradientUnits="userSpaceOnUse">
                <stop stopColor="#BEC1CF" />
                <stop offset="1" stopColor="#D5D8EA" />
              </linearGradient>
            </defs>
          </svg>
        </a>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;
