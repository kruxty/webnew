import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    img: '/images/img-gestion-administrativa.jpg',
    title: 'Gestión Administrativa',
    tipo: 'Grado Medio',
    desc: 'Organización empresarial, contabilidad, recursos humanos y atención al cliente. Salida directa al mundo laboral.',
    color: '#FF6B5B',
  },
  {
    img: '/images/img-cuidados-enfermeria.jpg',
    title: 'Cuidados Auxiliares de Enfermería',
    tipo: 'Grado Medio',
    desc: 'Formación sanitaria con prácticas en centros médicos. Alta empleabilidad en el sector salud.',
    color: '#7A8F7E',
  },
  {
    img: '/images/img-informatica-oficina.jpg',
    title: 'Informática de Oficina',
    tipo: 'Grado Básico',
    desc: 'Manejo de herramientas informáticas, procesadores de texto, hojas de cálculo y presentaciones.',
    color: '#FF6B5B',
  },
  {
    img: '/images/img-servicios-administrativos.jpg',
    title: 'Servicios Administrativos',
    tipo: 'Grado Básico',
    desc: 'Tareas de archivo, clasificación, atención telefónica y apoyo en gestión documental.',
    color: '#7A8F7E',
  },
  {
    img: '/images/img-alojamiento-lavanderia.jpg',
    title: 'Alojamiento y Lavandería',
    tipo: 'Grado Básico',
    desc: 'Preparación de habitaciones, servicio de lavandería y atención al cliente en hostelería.',
    color: '#FF6B5B',
  },
  {
    img: '/images/img-insignia-centro.jpg',
    title: 'CFP Ntra. Sra. de la Salceda',
    tipo: 'Centro Concertado',
    desc: 'Formación profesional oficial y gratuita desde 1986 en Las Torres de Cotillas.',
    color: '#7A8F7E',
  },
];

const finalTransforms = [
  { xPercent: -20, yPercent: -15, rotationZ: -5 },
  { xPercent: 0, yPercent: -15, rotationZ: 0 },
  { xPercent: 20, yPercent: -15, rotationZ: 5 },
  { xPercent: -20, yPercent: 15, rotationZ: -3 },
  { xPercent: 0, yPercent: 15, rotationZ: 0 },
  { xPercent: 20, yPercent: 15, rotationZ: 3 },
];

export default function Programas() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gridWrap = section.querySelector('.perspective-grid') as HTMLElement;
    const cardElements = section.querySelectorAll('.perspective-card');
    const overlay = section.querySelector('.grid-overlay') as HTMLElement;

    if (!gridWrap || cardElements.length === 0) return;

    const isMobile = window.innerWidth < 768;

    gsap.set(gridWrap, {
      rotateX: isMobile ? 30 : 45,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%',
        scrub: 1.5,
        pin: '.perspective-container',
      },
    });

    tl.to(gridWrap, {
      rotateX: 0,
      duration: 1,
      ease: 'power2.out',
    }, 0);

    tl.to(cardElements, {
      xPercent: (i: number) => isMobile ? finalTransforms[i].xPercent * 0.6 : finalTransforms[i].xPercent,
      yPercent: (i: number) => isMobile ? finalTransforms[i].yPercent * 0.6 : finalTransforms[i].yPercent,
      rotationZ: (i: number) => finalTransforms[i].rotationZ,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.05,
    }, 0);

    if (overlay) {
      gsap.set(overlay, { opacity: 0, y: 30 });
      tl.to(overlay, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, 0.6);
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="programas"
      className="perspective-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '300vh',
        background: '#0A1628',
        overflow: 'hidden',
      }}
    >
      <div
        className="perspective-container"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          overflow: 'hidden',
        }}
      >
        <div
          className="perspective-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 25vh)',
            gap: '2vw',
            maxWidth: '80vw',
            width: '100%',
            transformOrigin: 'bottom center',
            transform: 'rotateX(45deg)',
          }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="perspective-card"
              style={{
                willChange: 'transform',
                borderRadius: 20,
                overflow: 'hidden',
                position: 'relative',
                cursor: i < 5 ? 'pointer' : 'default',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${card.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 20,
                  position: 'relative',
                }}
              >
                {/* Gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(3,10,22,0.95) 0%, rgba(3,10,22,0.4) 50%, transparent 100%)',
                    borderRadius: 20,
                  }}
                />
                {/* Card content */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '16px 20px',
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: 10,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: card.color,
                      background: 'rgba(255,255,255,0.15)',
                      padding: '4px 10px',
                      borderRadius: 100,
                      marginBottom: 6,
                    }}
                  >
                    {card.tipo}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 500,
                      fontSize: 'clamp(14px, 1.5vw, 20px)',
                      color: '#FFFFFF',
                      margin: '0 0 4px 0',
                      lineHeight: 1.2,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(10px, 1vw, 13px)',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overlay text */}
        <div
          className="grid-overlay"
          style={{
            position: 'absolute',
            bottom: 48,
            left: 48,
            zIndex: 10,
            maxWidth: 480,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              display: 'block',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#7A8F7E',
              marginBottom: 16,
            }}
          >
            PROGRAMAS ACADÉMICOS
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 500,
              fontSize: 'clamp(40px, 5vw, 64px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            De la FP Básica
            <br />
            al Grado Medio
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(18px, 1.5vw, 21px)',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.7)',
              marginTop: 16,
            }}
          >
            Cinco ciclos formativos diseñados para que encuentres tu vocación profesional, desde la formación más accesible hasta la cualificación técnica.
          </p>
        </div>
      </div>
    </section>
  );
}
