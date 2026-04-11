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
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, stagger: 0.1, duration: 1, 
          ease: 'power3.out', delay: 0.1
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-center px-6 md:px-16 lg:px-32 overflow-hidden bg-white"
    >
      {/* Bright Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/hero-bg-bright.png")' }}
      >
        {/* Solid white top fading cleanly into the image to merge the logo seamlessly */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl text-dark pt-12 md:pt-20 pb-8 flex flex-col items-start justify-center">
        
        {/* Transparent Logo Placed Tightly Above Title */}
        <div className="hero-elem mb-3 md:mb-5 w-24 sm:w-36 max-w-full">
          <img 
            src="/logo.png" 
            alt="Izzey Clean & Move" 
            className="w-full h-auto object-contain drop-shadow-sm" 
          />
        </div>

        <div className="overflow-hidden hero-elem mb-4">
          <h1 className="font-outfit font-extrabold text-[2.75rem] md:text-6xl lg:text-[5rem] leading-[1.05] tracking-tight text-dark drop-shadow-sm">
            {t('heroTitle')}
          </h1>
        </div>
        
        <div className="hero-elem mb-6">
          <p className="font-body font-medium text-xl md:text-2xl text-dark/80 max-w-2xl leading-relaxed">
            {t('heroSub')}
          </p>
        </div>

        <div className="hero-elem flex flex-col sm:flex-row gap-5 mt-10">
          <a href="#book" className="inline-flex bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white px-10 py-4 rounded-full text-base font-bold items-center justify-center transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
            <span className="relative z-10 tracking-wide">{t('btnQuote')}</span>
          </a>
          <a href="https://wa.me/4917621709991" target="_blank" rel="noreferrer" className="inline-flex bg-white hover:bg-gray-50 border border-[#1E3A8A]/20 hover:border-[#1E3A8A]/40 text-[#1E3A8A] px-10 py-4 rounded-full text-base font-bold items-center justify-center transition-all shadow-sm hover:shadow-md">
            <span className="relative z-10 tracking-wide">{t('btnWhatsApp')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
