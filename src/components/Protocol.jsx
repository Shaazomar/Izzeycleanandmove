import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Protocol() {
  const { t } = useLanguage();
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.sig-elem', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const signatureList = [
    t('sigList1'),
    t('sigList2'),
    t('sigList3'),
    t('sigList4'),
    t('sigList5')
  ];

  return (
    <section id="protocol" ref={containerRef} className="relative bg-dark text-background py-32 px-6 md:px-12 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-[#222222] mix-blend-multiply opacity-50 z-0 pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto p-8 md:p-16 bg-accent/10 border border-accent/20 rounded-[3rem] backdrop-blur-sm flex flex-col items-center text-center sig-elem">
        <h2 className="font-drama italic text-5xl md:text-7xl mb-6 text-accent">{t('sigTitle')}</h2>
        
        <p className="font-body text-xl md:text-2xl opacity-90 mb-10 max-w-2xl">
          {t('sigDesc')}
        </p>

        <div className="flex flex-col gap-4 text-left mb-12 w-full max-w-md mx-auto">
          {signatureList.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-background/5 p-4 rounded-xl border border-background/10">
              <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
              <span className="font-body text-lg font-bold">{item}</span>
            </div>
          ))}
        </div>

        <p className="font-mono text-sm tracking-widest uppercase opacity-70 mb-10">
          {t('sigOutro')}
        </p>

        <a href="#book" className="magnetic-btn inline-flex items-center justify-center bg-accent text-background px-10 py-5 rounded-full font-bold text-sm tracking-wide gap-3 hover:bg-[#D96640] transition-colors">
          <span>{t('btnFullService')}</span>
        </a>
      </div>
    </section>
  );
}
