import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Ciclos', href: '#programas' },
  { label: 'Instalaciones', href: '#instalaciones' },
  { label: 'Noticias', href: '#noticias' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > window.innerHeight);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 clamp(24px, 5vw, 80px)',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? '#FFFFFF' : 'transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(10, 22, 40, 0.06)' : 'none',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, '#inicio')}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 500,
            fontSize: 20,
            color: scrolled ? '#0A1628' : '#FFFFFF',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
        >
          CFP Salceda
        </a>

        {/* Desktop links */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: 'center',
            gap: 32,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 16,
                color: scrolled ? 'rgba(10, 22, 40, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = scrolled ? '#0A1628' : '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = scrolled ? 'rgba(10, 22, 40, 0.7)' : 'rgba(255, 255, 255, 0.8)';
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Solo botón rojo de Contacto — sin link duplicado */}
          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, '#contacto')}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              background: scrolled ? '#FF6B5B' : 'rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              borderRadius: 100,
              padding: '10px 24px',
              textDecoration: 'none',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = scrolled ? '#FF8A7D' : 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = scrolled ? '#FF6B5B' : 'rgba(255, 255, 255, 0.15)';
            }}
          >
            Contacto
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
          }}
          aria-label="Toggle menu"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span
              style={{
                width: 24,
                height: 2,
                background: scrolled ? '#0A1628' : '#FFFFFF',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
              }}
            />
            <span
              style={{
                width: 24,
                height: 2,
                background: scrolled ? '#0A1628' : '#FFFFFF',
                transition: 'all 0.3s ease',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: 24,
                height: 2,
                background: scrolled ? '#0A1628' : '#FFFFFF',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
              }}
            />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 22, 40, 0.3)',
              zIndex: 101,
            }}
            onClick={() => setMobileOpen(false)}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '80%',
              maxWidth: 360,
              background: '#FFFFFF',
              zIndex: 102,
              boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.1)',
              padding: '24px 0',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ padding: '0 24px', marginBottom: 24 }}>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 500,
                  fontSize: 20,
                  color: '#0A1628',
                }}
              >
                CFP Salceda
              </span>
            </div>
            {[...navLinks, { label: 'Contacto', href: '#contacto' }].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 18,
                  color: '#0A1628',
                  textDecoration: 'none',
                  padding: '16px 24px',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F9F5EC';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
}
