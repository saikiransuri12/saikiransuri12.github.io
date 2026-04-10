import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowDown, HiMail } from 'react-icons/hi';

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-gradient-orb" />
        <div className="hero-gradient-orb" />
        <div className="hero-gradient-orb" />
      </div>

      <div className="hero-content">
        <motion.p
          className="hero-greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Venkata Sai Kiran Suri
        </motion.h1>

        <motion.p
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          A <span className="highlight">Software Engineer</span> who loves building things
        </motion.p>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Crafting robust, scalable software solutions with a passion for clean code,
          automation, and turning complex problems into elegant implementations.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a href="#contact" className="btn-primary" onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <HiMail /> Get In Touch
          </a>
          <a href="#about" className="btn-outline" onClick={(e) => {
            e.preventDefault();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Learn More
          </a>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span>Scroll Down</span>
        <HiArrowDown />
      </motion.div>
    </section>
  );
}

export default Hero;
