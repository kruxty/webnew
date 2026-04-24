import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonios() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll('.animate-in');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    });

    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      style={{
        background: '#F9F5EC',
        width: '100%',
        padding: 'clamp(60px, 8vw, 80px) clamp(24px, 5vw, 80px)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span
          className="animate-in opacity-0 translate-y-8"
          style={{
            display: 'block',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#7A8F7E',
            marginBottom: 24,
          }}
        >
          NUESTRO LEMA
        </span>

        <h2
          className="animate-in opacity-0 translate-y-8"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 500,
            fontSize: 'clamp(40px, 5vw, 64px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#0A1628',
            margin: 0,
          }}
        >
          <span className="spring-word">Formación</span>
          <span style={{ color: '#FF6B5B', margin: '0 12px' }}>·</span>
          <span className="spring-word">Práctica</span>
          <span style={{ color: '#FF6B5B', margin: '0 12px' }}>·</span>
          <span className="spring-word">Inserción</span>
          <span style={{ color: '#FF6B5B', margin: '0 12px' }}>·</span>
          <span className="spring-word">Futuro</span>
        </h2>

        <p
          className="animate-in opacity-0 translate-y-5"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(16px, 1.2vw, 18px)',
            lineHeight: 1.6,
            color: 'rgba(10, 22, 40, 0.55)',
            maxWidth: 600,
            margin: '32px auto 0',
          }}
        >
          Más de tres décadas formando profesionales que transforman su vocación en una carrera de éxito.
        </p>
      </div>
    </section>
  );
}
