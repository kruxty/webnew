import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const noticias = [
  {
    titulo: 'Nueva FP Básica: Alojamiento y Lavandería',
    fecha: 'Septiembre 2025',
    desc: 'Este curso inauguramos un nuevo ciclo de FP Básica orientado al sector turístico y de hostelería, con prácticas en hoteles de la comarca.',
    etiqueta: 'NOVEDAD',
    color: '#FF6B5B',
  },
  {
    titulo: 'Jornadas de Puertas Abiertas 2025-2026',
    fecha: 'Mayo 2025',
    desc: 'Ven a conocernos: visita nuestras aulas, habla con el profesorado y descubre por qué más de 200 familias confían en nosotros cada año.',
    etiqueta: 'EVENTO',
    color: '#7A8F7E',
  },
  {
    titulo: 'Convenio con el Hospital de Molina',
    fecha: 'Marzo 2025',
    desc: 'Nuestros alumnos de Cuidados Auxiliares de Enfermería realizarán prácticas en el Hospital Comarcal gracias al nuevo convenio de colaboración.',
    etiqueta: 'PRÁCTICAS',
    color: '#FF6B5B',
  },
  {
    titulo: 'Cofinanciación Fondo Social Europeo',
    fecha: 'Curso 2025-2026',
    desc: 'La Consejería de Educación, Formación y Empleo de la Región de Murcia cofinancia nuestra formación con cargo al Fondo Social Europeo.',
    etiqueta: 'INFORMACIÓN',
    color: '#7A8F7E',
  },
];

const infoAdicional = [
  {
    titulo: 'Admisión y Matriculación',
    items: [
      'Matriculación abierta para el curso 2025-2026',
      'Requisitos de acceso según nivel formativo',
      'Atención personalizada para familias',
      'Becas y ayudas disponibles',
    ],
  },
  {
    titulo: 'Formación en el Centro de Trabajo (FCT)',
    items: [
      'Prácticas en empresas reales de la comarca',
      'Más de 20 empresas colaboradoras',
      'Seguimiento personalizado del tutor',
      'Alta tasa de inserción laboral',
    ],
  },
  {
    titulo: 'FP Básica: ¿Qué es?',
    items: [
      'Para jóvenes de 15-17 años con dificultades',
      'Formación más adaptada y personalizada',
      'Materias de comunicación y sociales',
      'Salida a FP de Grado Medio',
    ],
  },
];

export default function Noticias() {
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
      stagger: 0.12,
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="noticias"
      style={{
        background: '#F9F5EC',
        width: '100%',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
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
          ACTUALIDAD
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
          Noticias y
          <br />
          novedades
        </h2>

        {/* Noticias cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
            marginTop: 56,
          }}
        >
          {noticias.map((noticia, i) => (
            <div
              key={i}
              className="animate-in opacity-0 translate-y-10"
              style={{
                background: '#FFFFFF',
                borderRadius: 20,
                padding: 32,
                boxShadow: '0 4px 16px rgba(10, 22, 40, 0.06)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
                borderLeft: `4px solid ${noticia.color}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(10, 22, 40, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(10, 22, 40, 0.06)';
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: noticia.color,
                  marginBottom: 12,
                }}
              >
                {noticia.etiqueta}
              </span>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 12,
                  color: 'rgba(10, 22, 40, 0.4)',
                  marginBottom: 8,
                }}
              >
                {noticia.fecha}
              </p>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 500,
                  fontSize: 20,
                  lineHeight: 1.3,
                  color: '#0A1628',
                  margin: '0 0 12px 0',
                }}
              >
                {noticia.titulo}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: 'rgba(10, 22, 40, 0.55)',
                  margin: 0,
                }}
              >
                {noticia.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Info adicional */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 32,
            marginTop: 80,
          }}
        >
          {infoAdicional.map((info, i) => (
            <div key={i} className="animate-in opacity-0 translate-y-10">
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 500,
                  fontSize: 24,
                  color: '#0A1628',
                  margin: '0 0 20px 0',
                }}
              >
                {info.titulo}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {info.items.map((item, j) => (
                  <li
                    key={j}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      marginBottom: 12,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: 'rgba(10, 22, 40, 0.55)',
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#FF6B5B',
                        flexShrink: 0,
                        marginTop: 8,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Blog reference */}
        <div
          className="animate-in opacity-0 translate-y-5"
          style={{
            marginTop: 64,
            padding: '32px 40px',
            background: '#FFFFFF',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            boxShadow: '0 4px 16px rgba(10, 22, 40, 0.06)',
          }}
        >
          <div>
            <h4
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 500,
                fontSize: 22,
                color: '#0A1628',
                margin: '0 0 8px 0',
              }}
            >
              ¿Quieres estar al día?
            </h4>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 15,
                color: 'rgba(10, 22, 40, 0.55)',
                margin: 0,
              }}
            >
              Sigue nuestro blog oficial para noticias, eventos y actividades del centro.
            </p>
          </div>
          <a
            href="https://www.murciaeduca.es/cfpntrasradelasalceda/sitio/index.cgi?wid_seccion=6"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 15,
              color: '#FF6B5B',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'gap 0.3s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.gap = '12px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.gap = '8px';
            }}
          >
            Visitar blog oficial
            <span style={{ fontSize: 18 }}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
