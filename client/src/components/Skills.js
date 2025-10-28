import React from 'react';
import './Skills.css';

const Skills = () => {
  const skills = [
    {
      category: 'UI/UX Design',
      tool: 'Figma',
      description: 'Have knowledged in creating user interfaces, wireframes, and interactive prototypes using Figma. Also have knowledge in design systems, component libraries, and collaborative design workflows.',
      icon: '🎨',
      features: ['Interface Design', 'Prototyping', 'Design Systems']
    },
    {
      category: 'Backend Development',
      tool: 'Arduino IDE',
      description: 'Specialized in Arduino programming for embedded systems, sensor integration, and automated control systems. Focus on creating efficient and reliable hardware solutions.',
      icon: '⚡',
      features: ['Embedded Systems', 'Sensor Integration', 'Control Systems']
    },
    {
      category: 'Frontend Developer',
      tool: 'Flutter',
      description: 'Specialize in building cross-platform mobile applications using the Flutter framework. I focus on creating visually appealing, responsive, and user-friendly interfaces that deliver seamless performance on both Android and iOS.',
      icon: '📱',
      features: [
        'Responsive design',
        'Modern UI/UX',
        'User authentication'
      ]
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <h2 className="section-title">
          <span className="code-symbol">{'<'}</span>
          <span>Skills</span>
          <span className="code-symbol">{'/>'}</span>
        </h2>
        
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon">{skill.icon}</div>
              <div className="skill-content">
                <h3 className="skill-category">{skill.category}</h3>
                <h4 className="skill-tool">{skill.tool}</h4>
                <p className="skill-description">{skill.description}</p>
                <div className="skill-features">
                  {skill.features.map((feature, featureIndex) => (
                    <span key={featureIndex} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="skill-card-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 