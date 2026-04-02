import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const containerRef = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const texts = gsap.utils.toArray('.hero-elem');
      gsap.fromTo(texts, 
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, stagger: 0.08, duration: 1.2, 
          ease: 'power3.out', delay: 0.2
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex items-center md:items-end justify-start p-6 md:p-12 lg:p-24 overflow-hidden pt-32 md:pt-0"
    >
      {/* Background Image with Organic Tech Mood filter */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-primary/50 mix-blend-multiply"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-3xl text-background">
        <div className="overflow-hidden hero-elem mb-6">
          <h1 className="font-drama italic text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] tracking-tighter text-background">
            {t('heroTitle')}
          </h1>
        </div>
        
        <div className="hero-elem mb-6">
          <p className="font-body font-bold text-xl md:text-2xl text-background/90 max-w-2xl leading-relaxed">
            {t('heroSub')}
          </p>
        </div>

        <div className="hero-elem mb-10">
          <p className="font-mono text-sm md:text-base text-background/80 max-w-2xl leading-relaxed">
            {t('heroIntro')}
          </p>
        </div>

        <div className="hero-elem flex flex-col sm:flex-row gap-4">
          <a href="#book" className="inline-flex magnetic-btn bg-accent text-background px-8 py-4 rounded-[2rem] text-sm font-bold items-center justify-center gap-3">
            <span className="relative z-10 tracking-wide">{t('btnQuote')}</span>
          </a>
          <a href="https://wa.me/4917621709991" target="_blank" rel="noreferrer" className="inline-flex bg-transparent border border-background/30 hover:bg-background/10 transition-colors text-background px-8 py-4 rounded-[2rem] text-sm font-bold items-center justify-center gap-3">
            <span className="relative z-10 tracking-wide">{t('btnWhatsApp')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
