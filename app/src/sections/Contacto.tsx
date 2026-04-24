import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  ciclos: [
    'Gestión Administrativa (GM)',
    'Cuidados Auxiliares de Enfermería (GM)',
    'Informática de Oficina (FB)',
    'Servicios Administrativos (FB)',
    'Alojamiento y Lavandería (FB)',
  ],
  centro: ['Nuestra historia', 'Instalaciones', 'Equipo docente', 'Valores'],
  comunidad: ['Noticias', 'Eventos', 'Asociación de Padres', 'Blog'],
};

export default function Contacto() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;

    const elements = cta.querySelectorAll('.animate-in');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cta,
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

    return () => { tl.kill(); };
  }, []);

  return (
    <>
      {/* CTA Section */}
      <div
        ref={ctaRef}
        id="contacto"
        style={{
          background: '#FF6B5B',
          width: '100%',
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2
            className="animate-in opacity-0 translate-y-8"
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
            ¿Listo para empezar?
          </h2>

          <p
            className="animate-in opacity-0 translate-y-5"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(18px, 1.5vw, 21px)',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: 560,
              margin: '24px auto 0',
            }}
          >
            El curso 2025-2026 está abierto. Solicita información sobre plazos de matriculación, requisitos de acceso y jornadas de puertas abiertas.
          </p>

          <div className="animate-in opacity-0 translate-y-5" style={{ marginTop: 40 }}>
            <a
              href="mailto:30008947@murciaeduca.es?subject=Solicitud%20de%20informaci%C3%B3n%20-%20Matriculaci%C3%B3n"
              style={{
                display: 'inline-block',
                background: '#FFFFFF',
                color: '#FF6B5B',
                borderRadius: 100,
                padding: '16px 40px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 16,
                textDecoration: 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'scale(1.03)';
                el.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'scale(1)';
                el.style.boxShadow = 'none';
              }}
            >
              Solicitar información
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        ref={footerRef}
        style={{
          background: '#030A16',
          width: '100%',
          padding: 'clamp(60px, 8vw, 80px) clamp(24px, 5vw, 80px) 40px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Top row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: 32,
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 500,
                  fontSize: 24,
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                CFP Ntra. Sra. de la Salceda
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginTop: 4,
                }}
              >
                Centro Concertado de FP — Las Torres de Cotillas, Murcia
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              <input
                type="email"
                placeholder="Tu email"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 100,
                  padding: '12px 20px',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  outline: 'none',
                  minWidth: 200,
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#FF6B5B',
                  color: '#FFFFFF',
                  borderRadius: 100,
                  padding: '12px 24px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FF8A7D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FF6B5B';
                }}
              >
                Suscribirse
              </button>
            </form>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: 'rgba(255, 255, 255, 0.1)',
              margin: '48px 0',
            }}
          />

          {/* Links row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 32,
            }}
          >
            {/* Ciclos */}
            <div>
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: 16,
                }}
              >
                CICLOS
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {footerLinks.ciclos.map((link) => (
                  <li key={link} style={{ marginBottom: 8 }}>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        color: 'rgba(255, 255, 255, 0.5)',
                        lineHeight: 2.2,
                        cursor: 'default',
                      }}
                    >
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* El Centro */}
            <div>
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: 16,
                }}
              >
                EL CENTRO
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {footerLinks.centro.map((link) => (
                  <li key={link} style={{ marginBottom: 8 }}>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        color: 'rgba(255, 255, 255, 0.5)',
                        lineHeight: 2.2,
                        cursor: 'default',
                      }}
                    >
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Comunidad */}
            <div>
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: 16,
                }}
              >
                COMUNIDAD
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {footerLinks.comunidad.map((link) => (
                  <li key={link} style={{ marginBottom: 8 }}>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        color: 'rgba(255, 255, 255, 0.5)',
                        lineHeight: 2.2,
                        cursor: 'default',
                      }}
                    >
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: 16,
                }}
              >
                CONTACTO
              </h4>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: 'rgba(255, 255, 255, 0.5)',
                  lineHeight: 2.2,
                }}
              >
                <div>C/ Mayor, 21</div>
                <div>30565 Las Torres de Cotillas, Murcia</div>
                <div>Tel: 968 627 319</div>
                <div>Fax: 968 387 424</div>
                <div>
                  <a
                    href="mailto:30008947@murciaeduca.es"
                    style={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FF6B5B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
                    }}
                  >
                    Email: 30008947@murciaeduca.es
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 24,
              marginTop: 48,
              paddingTop: 32,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Social icons */}
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { name: 'Instagram', href: 'https://instagram.com/cfpsalceda' },
                { name: 'X', href: 'https://twitter.com/fpsalceda' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255, 255, 255, 0.5)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
                  }}
                >
                  {social.name === 'Instagram' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="5" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                    </svg>
                  )}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: 'rgba(255, 255, 255, 0.35)',
                margin: 0,
              }}
            >
              © 2025 CFP Ntra. Sra. de la Salceda. Centro Concertado de Formación Profesional.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
