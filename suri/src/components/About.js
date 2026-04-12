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
            I'm a <span className="accent">Software Engineer</span> who builds scalable backend systems
          </h3>
          <p className="about-text">
            With 6+ years of experience across consulting, enterprise, and cloud-native environments,
            I specialize in designing production-grade microservices, REST/GraphQL APIs, and distributed
            systems. My strong expertise in Python, AWS, and containerized deployments has helped
            teams ship reliable, high-performance backend solutions.
          </p>
          <p className="about-text">
            From architecting data access layers that cut query latency by 45% to automating workflows
            that reduced manual effort by 80% — I focus on solving real problems with clean, efficient
            code. I've worked with teams at Comcast, VMware, Accenture, and Deloitte to deliver
            systems that scale.
          </p>

          <div className="about-stats">
            <motion.div
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">6+</div>
              <div className="stat-label">Years Experience</div>
            </motion.div>
            <motion.div
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">4</div>
              <div className="stat-label">Companies</div>
            </motion.div>
            <motion.div
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-number">45%</div>
              <div className="stat-label">Latency Reduced</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
