import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Anim1 = () => (
  <div className="w-full h-full flex items-center justify-center relative opacity-80">
    <svg viewBox="0 0 100 100" className="w-64 h-64 md:w-96 md:h-96 animate-spin-slow" style={{ animationDuration: '20s' }}>
      <circle cx="50" cy="50" r="48" fill="none" stroke="#2E4036" strokeWidth="0.5" strokeDasharray="4 4" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#2E4036" strokeWidth="1" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="#CC5833" strokeWidth="0.5" strokeDasharray="1 8" />
      <circle cx="50" cy="50" r="18" fill="none" stroke="#1A1A1A" strokeWidth="1" />
    </svg>
  </div>
);

const Anim2 = () => (
  <div className="w-full h-full flex items-center justify-center relative p-12">
    <div className="relative w-full max-w-md h-64 border border-dark/10 rounded-2xl overflow-hidden bg-background">
      {/* Grid of dots */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.1 }}></div>
      {/* Laser line animated with CSS keyframes */}
      <div className="absolute top-0 left-0 w-full h-1 bg-accent/80 shadow-[0_0_15px_#CC5833] animate-scan"></div>
    </div>
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes scan {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(16rem); }
      }
      .animate-scan { animation: scan 3s ease-in-out infinite; }
    `}} />
  </div>
);

const Anim3 = () => {
  const pathRef = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg viewBox="0 0 200 100" className="w-full max-w-lg h-auto overflow-visible">
        <path 
          ref={pathRef}
          d="M0,50 L50,50 L60,20 L75,80 L85,50 L200,50" 
          fill="none" 
          stroke="#CC5833" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          strokeDasharray="250"
          strokeDashoffset="250"
        />
        <circle cx="200" cy="50" r="4" fill="#CC5833" className="animate-pulse" />
      </svg>
    </div>
  );
};


export default function Protocol() {
  const { t } = useLanguage();
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, index) => {
        // We only want to animate the UNDERLYING cards when a new one comes on top
        if (index === cards.length - 1) return; // Last card doesn't get covered
        
        ScrollTrigger.create({
          trigger: cards[index + 1],
          start: 'top bottom', // When the next card's top hits the bottom of viewport
          end: 'top top',     // Until the next card reaches the top
          scrub: true,
          animation: gsap.to(card, {
            scale: 0.9,
            filter: 'blur(10px)', // using 10px instead of 20px so text is faintly legible
            opacity: 0.5,
            ease: 'none',
          }),
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { num: t('step1Num'), title: t('step1Title'), desc: t('step1Desc'), Anim: Anim1 },
    { num: t('step2Num'), title: t('step2Title'), desc: t('step2Desc'), Anim: Anim2 },
    { num: t('step3Num'), title: t('step3Title'), desc: t('step3Desc'), Anim: Anim3 },
  ];

  return (
    <section id="protocol" ref={containerRef} className="relative bg-[#EAE8E2]">
      {steps.map((step, i) => (
        <div 
          key={i} 
          className="protocol-card sticky top-0 h-[100dvh] w-full flex flex-col md:flex-row shadow-sm border-t border-dark/5"
          style={{ backgroundColor: i % 2 === 0 ? '#F2F0E9' : '#EAE8E2' }} // Slight alternating bg for depth
        >
          {/* Text Content */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-8 md:px-24">
            <span className="font-mono text-sm tracking-widest text-primary mb-6 animate-pulse">
              {step.num}
            </span>
            <h2 className="font-drama italic text-6xl md:text-8xl mb-6">{step.title}</h2>
            <p className="font-body text-xl text-dark/70 max-w-sm">
              {step.desc}
            </p>
          </div>
          
          {/* Visual Animation */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full bg-black/5 flex items-center justify-center p-8 overflow-hidden">
            <step.Anim />
          </div>
        </div>
      ))}
    </section>
  );
}
