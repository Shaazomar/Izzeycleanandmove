import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);
  const { t, lang, toggleLanguage } = useLanguage();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
          className: 'scrolled',
          targets: navRef.current
        }
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
      <nav 
        ref={navRef}
        className="pointer-events-auto flex items-center justify-between px-6 py-4 rounded-full w-full max-w-4xl transition-all duration-300 [&.scrolled]:bg-background/60 [&.scrolled]:backdrop-blur-xl [&.scrolled]:border [&.scrolled]:border-primary/10 [&.scrolled]:shadow-sm text-background [&.scrolled]:text-dark"
      >
        <div className="font-heading font-bold text-xl tracking-tight">
          {t('brandName')}
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-body font-medium text-sm">
          <a href="#services" className="magnetic-link">{t('navServices')}</a>
          <a href="#management" className="magnetic-link">{t('navManagement')}</a>
          <a href="#protocol" className="magnetic-link">{t('navProtocol')}</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="font-mono text-xs font-bold tracking-widest opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1"
          >
            <span className={lang === 'en' ? 'text-accent' : ''}>EN</span>
            <span className="opacity-30">|</span>
            <span className={lang === 'de' ? 'text-accent' : ''}>DE</span>
          </button>
          
          <a 
            href="#book" 
            className="magnetic-btn bg-accent text-background px-6 py-2.5 rounded-full text-sm font-bold hidden md:flex items-center gap-2 group overflow-hidden"
          >
            <span className="relative z-10">{t('navBook')}</span>
            <div className="absolute inset-0 bg-primary translate-y-full transition-transform duration-300 ease-magnetic group-hover:translate-y-0 z-0"></div>
          </a>
        </div>
      </nav>
    </div>
  );
}
