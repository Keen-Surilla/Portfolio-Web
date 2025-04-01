import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'Arduino Leveling System',
      description: 'An automated leveling system using Arduino for precise surface calibration and adjustment. Features real-time sensor data monitoring and automatic balance correction.',
      technologies: ['Arduino IDE', 'C++', 'Sensors', 'Servo Motors'],
      image: 'arduino-project.jpg',
      link: 'https://github.com/Keen-Surilla/Leveling-sensor---Arduino-Uno/tree/main'
    },
    {
      title: 'UI/UX Design System',
      description: 'A comprehensive design system for a fintech application, including component library and documentation.',
      technologies: ['Figma', 'Prototyping'],
      image: 'project2.png',
      link: 'https://www.figma.com/design/5ubN5RoLgjlHjOJ5JjJkuq/Prototype-Boteco?node-id=0-1&t=n5eENYjZPjDNt1bg-1'
    },
    {
      title: 'Awesome Todos',
      description: 'A sleek and modern todo application with a beautiful user interface designed in Figma. Features task organization, priority levels, and intuitive user experience.',
      technologies: ['Figma', 'UI Design'],
      image: '/todos-project.png',
      link: 'https://surilla-keen.onrender.com/'
    },
    {
      title: 'HireTech - OJT Platform',
      description: 'A comprehensive wireframe design for a platform connecting students with OJT opportunities. Features include online applications, company profiles, and an intuitive job matching system.',
      technologies: ['Figma', 'Wireframing', 'User Flow Design', 'UI/UX'],
      image: '/hiretech-wireframe.png',
      link: 'https://www.figma.com/design/eg0tQOe6E5SXUuCXYuAd51/Wireframe?t=Z6rSZcbtkOiz5Ik9-1'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <h2 className="section-title">
          <span className="code-symbol">{'<'}</span>
          <span>Projects</span>
          <span className="code-symbol">{'/>'}</span>
        </h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image-container">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image"
                  />
                ) : (
                  <div className="project-image-placeholder">
                    <span className="image-text">Image Coming Soon</span>
                  </div>
                )}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <a href={project.link} className="project-link">
                  View Project
                  <span className="arrow">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 