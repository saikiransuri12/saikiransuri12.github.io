import React from 'react';
import { motion } from 'framer-motion';
import { HiCode } from 'react-icons/hi';

function About() {
  return (
    <section className="section" id="about">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Get to Know Me</p>
        <h2 className="section-title">About Me</h2>
        <div className="section-divider" />
      </motion.div>

      <div className="about-container">
        <motion.div
          className="about-image-wrapper"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="about-image-frame">
            {/* Replace the placeholder below with: <img src="/your-photo.jpg" alt="Venkata Sai Kiran Suri" /> */}
            <div className="about-image-placeholder">
              <HiCode />
            </div>
          </div>
          <div className="about-image-decoration" />
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3>
            I'm a <span className="accent">Software Engineer</span> passionate about building impactful solutions
          </h3>
          <p className="about-text">
            I am a software engineer with strong expertise in Python and a versatile skill set
            spanning multiple technologies. My experience ranges from building scalable backend
            systems and data pipelines to crafting interactive web applications and automating
            complex workflows.
          </p>
          <p className="about-text">
            I thrive on solving challenging problems and am driven by a curiosity to continuously
            learn and adapt. Whether it's writing efficient SQL queries, developing React frontends,
            building Java services, or automating infrastructure with scripts — I bring a
            detail-oriented and results-driven approach to everything I build.
          </p>

          <div className="about-stats">
            <motion.div
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">6+</div>
              <div className="stat-label">Languages</div>
            </motion.div>
            <motion.div
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">10+</div>
              <div className="stat-label">Projects</div>
            </motion.div>
            <motion.div
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">5+</div>
              <div className="stat-label">Tools & Frameworks</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
