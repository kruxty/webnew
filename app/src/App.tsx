import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import Introduccion from '@/sections/Introduccion';
import Programas from '@/sections/Programas';
import Instalaciones from '@/sections/Instalaciones';
import Testimonios from '@/sections/Testimonios';
import Noticias from '@/sections/Noticias';
import Contacto from '@/sections/Contacto';

export default function App() {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Introduccion />
        <Programas />
        <Instalaciones />
        <Testimonios />
        <Noticias />
        <Contacto />
      </main>
    </>
  );
}
