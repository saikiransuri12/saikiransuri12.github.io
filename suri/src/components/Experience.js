import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Computer Systems Engineer',
    company: 'Avvenire Solutions LLC',
    client: 'Comcast Corporation',
    location: 'Downingtown, PA',
    period: 'Feb 2025 - Present',
    highlights: [
      'Designed and developed backend microservices using Python FastAPI to expose high-performance REST and GraphQL APIs.',
      'Architected scalable data access layers backed by AWS DynamoDB, reducing query latency by 45%.',
      'Implemented asynchronous request handling using Python async/await, significantly improving throughput under high load.',
      'Integrated logging, monitoring, and observability using Kibana and Cloud-native tooling.',
    ],
    tech: ['Python', 'FastAPI', 'GraphQL', 'AWS DynamoDB', 'Kibana'],
  },
  {
    title: 'Senior Application Developer',
    company: 'Accenture',
    client: null,
    location: 'Hyderabad, India',
    period: 'Jun 2024 - Jan 2025',
    highlights: [
      'Designed and developed Python-based backend microservices to support data-driven enterprise applications.',
      'Built and maintained GraphQL APIs enabling flexible and efficient data access for multiple consuming systems.',
      'Developed unit and integration tests using pytest, improving code quality and reducing production defects.',
      'Optimized backend processing logic and query patterns, reducing API response times and improving throughput.',
    ],
    tech: ['Python', 'GraphQL', 'Pytest', 'REST APIs'],
  },
  {
    title: 'Member of Technical Staff (SRE / Backend)',
    company: 'VMware',
    client: null,
    location: 'Bengaluru, India',
    period: 'Feb 2023 - Apr 2024',
    highlights: [
      'Designed and developed a Python-based backend service integrating PagerDuty, StatusPage, and JIRA APIs.',
      'Implemented a lightweight persistence and caching layer using SQLite and ORM patterns to reduce redundant API calls.',
      'Containerized backend applications using Docker and deployed them to Kubernetes clusters.',
      'Analyzed incident and reliability metrics to support data-driven improvements in system stability.',
    ],
    tech: ['Python', 'Docker', 'Kubernetes', 'SQLite', 'REST APIs'],
  },
  {
    title: 'Business Technology Analyst',
    company: 'Deloitte',
    client: null,
    location: 'Hyderabad, India',
    period: 'Jul 2021 - Feb 2023',
    highlights: [
      'Designed and developed backend workflows using Python and Alteryx to automate large-scale data processing.',
      'Designed relational schemas and optimized SQL Server queries for performance and scalability.',
      'Implemented Excel VBA and Python automation, reducing manual processing effort by 80%.',
    ],
    tech: ['Python', 'SQL Server', 'Alteryx', 'Automation'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

function Experience() {
  return (
    <section className="section" id="experience">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Where I've Worked</p>
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">
          6+ years of building scalable backend systems across consulting,
          enterprise, and cloud-native environments.
        </p>
        <div className="section-divider" />
      </motion.div>

      <motion.div
        className="experience-timeline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            className="exp-card"
            variants={cardVariants}
          >
            <div className="exp-dot" />
            <div className="exp-header">
              <div className="exp-header-left">
                <h3 className="exp-title">{exp.title}</h3>
                <p className="exp-company">
                  {exp.company}
                  {exp.client && <span className="exp-client"> &middot; Client: {exp.client}</span>}
                </p>
              </div>
              <div className="exp-header-right">
                <span className="exp-period">{exp.period}</span>
                <span className="exp-location">{exp.location}</span>
              </div>
            </div>
            <ul className="exp-highlights">
              {exp.highlights.map((h, hIdx) => (
                <li key={hIdx}>{h}</li>
              ))}
            </ul>
            <div className="exp-tech">
              {exp.tech.map((t, tIdx) => (
                <span key={tIdx}>{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Experience;
