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
      className="relative h-[100dvh] w-full flex items-end justify-start p-6 md:p-12 lg:p-24 overflow-hidden"
    >
      {/* Background Image with Organic Tech Mood filter */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-primary/50 mix-blend-multiply"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-2xl text-background">
        <div className="overflow-hidden hero-elem mb-8">
          <h1 className="font-drama italic text-6xl md:text-8xl lg:text-[10rem] leading-[0.8] tracking-tighter text-background">
            {t('heroTitle')}
          </h1>
        </div>
        
        <div className="hero-elem">
          <p className="font-mono text-sm md:text-base text-background/80 max-w-md mb-8 leading-relaxed">
            {t('heroDesc')}
          </p>
        </div>

        <div className="hero-elem">
          <a href="#book" className="inline-flex magnetic-btn bg-accent text-background px-8 py-4 rounded-[2rem] text-sm font-bold items-center gap-3">
            <span className="relative z-10 w-full text-center tracking-wide">{t('heroCTA')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
