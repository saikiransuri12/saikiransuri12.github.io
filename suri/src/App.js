import React, { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Particles from './components/Particles';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Particles />

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">SVSK</div>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
          <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
          <li><a href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>Skills</a></li>
          <li><a href="#experience" onClick={(e) => handleNavClick(e, 'experience')}>Experience</a></li>
          <li><a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a></li>
          <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
        </ul>
      </nav>

      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />

      <footer className="footer">
        <p>
          Built with <span className="heart">&#9829;</span> by Venkata Sai Kiran Suri
        </p>
      </footer>
    </div>
  );
}

export default App;
