import React from 'react';
import { motion } from 'framer-motion';
import {
  SiPython, SiJavascript, SiReact, SiFastapi, SiGraphql,
  SiPostgresql, SiGit, SiDocker, SiLinux,
  SiGnubash, SiKubernetes
} from 'react-icons/si';
import { FaJava, FaDatabase, FaAws } from 'react-icons/fa';
import {
  HiCode, HiDatabase, HiCloud, HiCog, HiTerminal, HiBeaker
} from 'react-icons/hi';

const skillCategories = [
  {
    title: 'Backend Development',
    icon: <HiCode style={{ color: '#6366f1' }} />,
    skills: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'FastAPI', icon: <SiFastapi /> },
      { name: 'REST APIs', icon: <HiCode /> },
      { name: 'GraphQL', icon: <SiGraphql /> },
      { name: 'Async Programming', icon: <HiCog /> },
      { name: 'Java', icon: <FaJava /> },
    ],
  },
  {
    title: 'Cloud & Databases',
    icon: <HiCloud style={{ color: '#a855f7' }} />,
    skills: [
      { name: 'AWS', icon: <FaAws /> },
      { name: 'DynamoDB', icon: <FaDatabase /> },
      { name: 'SQL Server', icon: <HiDatabase /> },
      { name: 'Oracle', icon: <HiDatabase /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
  },
  {
    title: 'DevOps & Containers',
    icon: <HiTerminal style={{ color: '#22d3ee' }} />,
    skills: [
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'Kubernetes', icon: <SiKubernetes /> },
      { name: 'CI/CD Pipelines', icon: <HiCog /> },
      { name: 'Git', icon: <SiGit /> },
      { name: 'Linux', icon: <SiLinux /> },
      { name: 'Shell Scripting', icon: <SiGnubash /> },
    ],
  },
  {
    title: 'Testing & More',
    icon: <HiBeaker style={{ color: '#ec4899' }} />,
    skills: [
      { name: 'Pytest', icon: <HiBeaker /> },
      { name: 'React', icon: <SiReact /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'System Design', icon: <HiCog /> },
      { name: 'Automation', icon: <HiCog /> },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">What I Work With</p>
        <h2 className="section-title">Skills & Technologies</h2>
        <p className="section-subtitle">
          A diverse toolkit built through hands-on experience across
          multiple domains of software engineering.
        </p>
        <div className="section-divider" />
      </motion.div>

      <motion.div
        className="skills-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.15 }}
      >
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            className="skill-category"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="skill-category-icon">
              {category.icon}
              <span>{category.title}</span>
            </div>
            <div className="skill-tags">
              {category.skills.map((skill, sIdx) => (
                <span key={sIdx} className="skill-tag">
                  <span className="tag-icon">{skill.icon}</span>
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Skills;
