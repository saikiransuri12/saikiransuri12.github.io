import React from 'react';
import { motion } from 'framer-motion';
import {
  SiPython, SiJavascript, SiReact,
  SiPostgresql, SiGit, SiDocker, SiLinux,
  SiPandas, SiNumpy, SiGnubash
} from 'react-icons/si';
import { FaJava, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import {
  HiCode, HiDatabase, HiChartBar, HiCog, HiTerminal
} from 'react-icons/hi';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: <HiCode style={{ color: '#6366f1' }} />,
    skills: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'Java', icon: <FaJava /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'SQL', icon: <HiDatabase /> },
      { name: 'HTML5', icon: <FaHtml5 /> },
      { name: 'CSS3', icon: <FaCss3Alt /> },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    icon: <HiCog style={{ color: '#a855f7' }} />,
    skills: [
      { name: 'React', icon: <SiReact /> },
      { name: 'Pandas', icon: <SiPandas /> },
      { name: 'NumPy', icon: <SiNumpy /> },
      { name: 'REST APIs', icon: <HiCode /> },
    ],
  },
  {
    title: 'Data & Analytics',
    icon: <HiChartBar style={{ color: '#ec4899' }} />,
    skills: [
      { name: 'Data Analytics', icon: <HiChartBar /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'Data Pipelines', icon: <HiDatabase /> },
      { name: 'Visualization', icon: <HiChartBar /> },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: <HiTerminal style={{ color: '#22d3ee' }} />,
    skills: [
      { name: 'Git', icon: <SiGit /> },
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'Linux', icon: <SiLinux /> },
      { name: 'Shell Scripting', icon: <SiGnubash /> },
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
