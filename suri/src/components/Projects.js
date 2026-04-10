import React from 'react';
import { motion } from 'framer-motion';
import { HiFolder, HiExternalLink } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';

const projects = [
  {
    title: 'Portfolio Website',
    description:
      'A modern, animated personal portfolio built with React and Framer Motion, showcasing skills, projects, and experience with a sleek dark theme.',
    tech: ['React', 'Framer Motion', 'CSS3'],
    github: '#',
    live: '#',
  },
  {
    title: 'Data Analytics Pipeline',
    description:
      'An end-to-end data pipeline that ingests, transforms, and visualizes large datasets using Python, Pandas, and SQL for actionable business insights.',
    tech: ['Python', 'Pandas', 'SQL', 'Visualization'],
    github: '#',
    live: null,
  },
  {
    title: 'Automation Scripts',
    description:
      'A collection of automation scripts and tools built to streamline repetitive workflows, reduce manual effort, and improve team productivity.',
    tech: ['Python', 'Bash', 'Cron', 'APIs'],
    github: '#',
    live: null,
  },
  {
    title: 'REST API Service',
    description:
      'A scalable RESTful API backend designed with clean architecture, featuring authentication, data validation, and comprehensive error handling.',
    tech: ['Python', 'REST', 'PostgreSQL', 'Docker'],
    github: '#',
    live: null,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function Projects() {
  return (
    <section className="section" id="projects">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">What I've Built</p>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          A selection of projects that showcase my ability to solve real-world
          problems with clean, efficient code.
        </p>
        <div className="section-divider" />
      </motion.div>

      <motion.div
        className="projects-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.15 }}
      >
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="project-card"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="project-card-header">
              <HiFolder className="project-icon" />
              <div className="project-links">
                {project.github && project.github !== '#' && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <SiGithub />
                  </a>
                )}
                {project.live && project.live !== '#' && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                    <HiExternalLink />
                  </a>
                )}
              </div>
            </div>
            <div className="project-card-body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((t, tIdx) => (
                  <span key={tIdx}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Projects;
