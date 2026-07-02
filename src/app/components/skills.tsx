import { useEffect, useRef, useState } from 'react';
import { useParallax } from '../../hooks/useParallax';
import { useStaggeredAnimation } from '../../hooks/useScrollAnimation';

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { ref: titleRef, offset: titleOffset } = useParallax(0.25);
  const { containerRef, getItemStyle } = useStaggeredAnimation(4, { threshold: 0.15 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      category: 'Languages',
      skills: [
        { name: 'Python', isPrimary: true },
        { name: 'Java', isPrimary: false },
        { name: 'C++', isPrimary: true },
        { name: 'JavaScript', isPrimary: false },
        { name: 'TypeScript', isPrimary: false },
        { name: 'SQL', isPrimary: false },
      ],
    },
    {
      category: 'AI / ML',
      skills: [
        { name: 'PyTorch', isPrimary: true },
        { name: 'TensorFlow', isPrimary: false },
        { name: 'Scikit-learn', isPrimary: false },
        { name: 'Transformers', isPrimary: false },
        { name: 'CNN', isPrimary: false },
        { name: 'VAE', isPrimary: false },
        { name: 'HDBSCAN', isPrimary: false },
      ],
    },
    {
      category: 'Backend & Frameworks',
      skills: [
        { name: 'Spring Boot', isPrimary: true },
        { name: 'React', isPrimary: true },
        { name: 'Node.js', isPrimary: false },
        { name: 'Flask', isPrimary: false },
        { name: 'REST APIs', isPrimary: false },
        { name: 'Tailwind', isPrimary: false },
      ],
    },
    {
      category: 'Databases & DevOps',
      skills: [
        { name: 'Docker', isPrimary: true },
        { name: 'PostgreSQL', isPrimary: false },
        { name: 'MongoDB', isPrimary: false },
        { name: 'Git', isPrimary: false },
        { name: 'Linux', isPrimary: false },
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`py-16 px-6 md:py-[120px] md:px-16 ${isVisible ? 'visible' : ''}`}
      style={{
        backgroundColor: '#f4f6fa',
      }}
    >
      <div className="max-w-[1920px] mx-auto">
        <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '11px', color: '#1a5fd4', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '24px' }}>
          [ 02 — SKILLS ]
        </div>

        <h2
          ref={titleRef}
          style={{
            fontFamily: 'Inter',
            fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 64px)',
            letterSpacing: '-2px',
            color: '#0f1828',
            marginBottom: '48px',
            transform: `translateY(${titleOffset * 0.2}px)`,
          }}
        >
          The stack.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{ backgroundColor: '#d0dcf0' }} ref={containerRef}>
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-cell group relative"
              style={{
                ...getItemStyle(index),
                backgroundColor: '#ffffff',
                padding: 'clamp(24px, 5vw, 48px)',
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#1a5fd4] transition-all duration-300 h-0 group-hover:h-full" />

              <div style={{ fontFamily: 'Inter', fontSize: '10px', color: '#6080b0', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px' }}>
                {category.category}
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="skill-tag transition-all duration-200"
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '12px',
                      padding: '4px 10px',
                      border: '1px solid #d0dcf0',
                      borderRadius: '2px',
                      color: '#2a3a5a',
                      backgroundColor: '#f4f6fa',
                    }}
                  >
                    {skill.isPrimary && <span style={{ color: '#1a5fd4', marginRight: '6px' }}>◆</span>}
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skill-tag:hover {
          color: #1a5fd4;
          border-color: #1a5fd4;
          background-color: #dce8fa;
        }
      `}</style>
    </section>
  );
}
