import React from 'react';
import { motion } from 'framer-motion';
import { HiMail } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Get In Touch</p>
        <h2 className="section-title">Let's Connect</h2>
        <div className="section-divider" />
      </motion.div>

      <motion.div
        className="contact-content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="contact-text">
          I'm always open to discussing new opportunities, interesting projects,
          or just having a conversation about technology. Feel free to reach out!
        </p>

        <div className="contact-links">
          <a href="mailto:saikiran.suri12@gmail.com" className="contact-link">
            <HiMail className="contact-link-icon" />
            Email Me
          </a>
          <a
            href="https://github.com/saikiransuri12"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <SiGithub className="contact-link-icon" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/venkata-sai-kiran-suri-837a9a193/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaLinkedin className="contact-link-icon" />
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
