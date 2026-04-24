import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pilares = [
  {
    num: '01',
    titulo: 'Excelencia Académica',
    desc: 'Programas educativos diseñados para desarrollar el máximo potencial de cada estudiante, con docentes especializados y metodologías actualizadas.',
  },
  {
    num: '02',
    titulo: 'Práctica Profesional',
    desc: 'Formación directa orientada a la inserción laboral. Practicamos en aula-empresa y colaboramos con más de 20 empresas de la comarca para que nuestros alumnos adquieran experiencia real.',
  },
  {
    num: '03',
    titulo: 'Inclusión y Futuro',
    desc: 'FP Básica para quienes necesitan un apoyo especial, y Grado Medio para quienes buscan una cualificación profesional. Cada alumno encuentra su camino.',
  },
];

export default function Introduccion() {
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
      id="filosofia"
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
          NUESTRA FILOSOFÍA
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
          Formación profesional
          <br />
          con salida garantizada
        </h2>

        <p
          className="animate-in opacity-0 translate-y-5"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(18px, 1.5vw, 21px)',
            lineHeight: 1.6,
            color: 'rgba(10, 22, 40, 0.55)',
            maxWidth: 560,
            marginTop: 32,
          }}
        >
          Desde 1986, el Centro de Formación Profesional Ntra. Sra. de la Salceda forma a jóvenes en Las Torres de Cotillas y pedanías aledañas. Somos un centro privado concertado con la Consejería de Educación de la Región de Murcia, especializado en Ciclos Formativos de Grado Medio y Grado Básico. Nuestra enseñanza es oficial y gratuita, con cofinanciación del Fondo Social Europeo.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 40,
            marginTop: 80,
          }}
        >
          {pilares.map((pilar) => (
            <div key={pilar.num} className="animate-in opacity-0 translate-y-10">
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 44,
                  color: '#FF6B5B',
                  display: 'block',
                }}
              >
                {pilar.num}
              </span>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 500,
                  fontSize: 'clamp(24px, 2.5vw, 32px)',
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  color: '#0A1628',
                  marginTop: 16,
                }}
              >
                {pilar.titulo}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(14px, 1vw, 16px)',
                  lineHeight: 1.6,
                  color: 'rgba(10, 22, 40, 0.55)',
                  marginTop: 12,
                }}
              >
                {pilar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
