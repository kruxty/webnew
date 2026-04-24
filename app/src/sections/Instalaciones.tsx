import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Instalaciones() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const elements = section.querySelectorAll('.animate-in');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
      },
    });

    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
    });

    // Auto-play video when section enters viewport
    const videoTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      onEnter: () => {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      },
      onLeave: () => {
        video.pause();
        setIsPlaying(false);
      },
      onEnterBack: () => {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      },
      onLeaveBack: () => {
        video.pause();
        video.currentTime = 0;
        setIsPlaying(false);
      },
    });

    return () => {
      tl.kill();
      videoTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="instalaciones"
      style={{
        background: '#F9F5EC',
        width: '100%',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px)',
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
          CONÓCENOS
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
          ¿Quieres saber
          <br />
          cómo somos?
        </h2>

        <p
          className="animate-in opacity-0 translate-y-5"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(18px, 1.5vw, 21px)',
            lineHeight: 1.6,
            color: 'rgba(10, 22, 40, 0.55)',
            maxWidth: 600,
            marginTop: 24,
            marginBottom: 48,
          }}
        >
          Así es un día en el CFP Ntra. Sra. de la Salceda. Formación práctica, ambiente cercano y mucho humor. ¡Dale al play!
        </p>

        {/* Video container */}
        <div
          className="animate-in opacity-0 translate-y-10"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 900,
            margin: '0 auto',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(10, 22, 40, 0.12)',
            aspectRatio: '16/9',
            background: '#0A1628',
          }}
        >
          <video
            ref={videoRef}
            src="/images/video-promocional.mp4"
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Play overlay when paused */}
          {!isPlaying && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(10, 22, 40, 0.3)',
                cursor: 'pointer',
              }}
              onClick={() => {
                videoRef.current?.play();
                setIsPlaying(true);
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: '#FF6B5B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(255, 107, 91, 0.4)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <polygon points="8,5 19,12 8,19" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Info cards below video */}
        <div
          className="animate-in opacity-0 translate-y-10"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
            marginTop: 48,
          }}
        >
          {[
            { num: '5', label: 'Ciclos Formativos', desc: '3 FP Básica + 2 Grado Medio' },
            { num: '38', label: 'Años de experiencia', desc: 'Formando profesionales desde 1986' },
            { num: '20+', label: 'Empresas colaboradoras', desc: 'Prácticas en empresas reales' },
            { num: '100%', label: 'Enseñanza gratuita', desc: 'Centro concertado oficial' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: 28,
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(10, 22, 40, 0.06)',
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 40,
                  fontWeight: 500,
                  color: '#FF6B5B',
                  display: 'block',
                }}
              >
                {stat.num}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: '#0A1628',
                  display: 'block',
                  marginTop: 8,
                }}
              >
                {stat.label}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  color: 'rgba(10, 22, 40, 0.55)',
                  display: 'block',
                  marginTop: 4,
                }}
              >
                {stat.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
