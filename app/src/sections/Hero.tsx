import { useEffect, useRef, useState } from 'react';
import MetaballField from '@/components/MetaballField';
import gsap from 'gsap';

export default function Hero() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
      .to(descRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > window.innerHeight * 0.1) {
        setShowIndicator(false);
      } else {
        setShowIndicator(true);
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const programsSection = document.getElementById('programas');
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#0A1628',
      }}
    >
      <MetaballField />

      {/* Readability overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 22, 40, 0.35) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          padding: 'clamp(40px, 6vw, 80px)',
          maxWidth: 700,
        }}
      >
        <span
          ref={labelRef}
          className="opacity-0 translate-y-5"
          style={{
            display: 'block',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.45)',
            marginBottom: 24,
          }}
        >
          CFP NTRA. SRA. DE LA SALCEDA — LAS TORRES DE COTILLAS, MURCIA
        </span>

        <h1
          ref={titleRef}
          className="opacity-0 translate-y-10"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 500,
            fontSize: 'clamp(56px, 8vw, 120px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            margin: 0,
          }}
        >
          Tu futuro
          <br />
          empieza aquí
        </h1>

        <p
          ref={descRef}
          className="opacity-0 translate-y-8"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(18px, 1.5vw, 21px)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: 520,
            marginTop: 32,
          }}
        >
          Centro concertado de Formación Profesional en Las Torres de Cotillas. FP de Grado Medio y Grado Básico con salida directa al mundo laboral.
        </p>

        <a
          ref={ctaRef}
          href="#programas"
          onClick={handleCtaClick}
          className="opacity-0 translate-y-5 inline-block"
          style={{
            marginTop: 40,
            background: '#FF6B5B',
            color: '#FFFFFF',
            borderRadius: 100,
            padding: '16px 32px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 16,
            textDecoration: 'none',
            transition: 'transform 0.3s ease, background 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = 'scale(1)';
          }}
        >
          Descubre nuestros ciclos
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute',
          bottom: 48,
          right: 48,
          zIndex: 2,
          opacity: showIndicator ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
        className="hidden md:block"
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '1.5px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'float 2s ease-in-out infinite',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3L8 13M8 13L3 8M8 13L13 8" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </section>
  );
}
