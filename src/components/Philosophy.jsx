import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';

export default function Philosophy() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax Background
      gsap.to('.parallax-bg', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: '20%',
        ease: 'none'
      });

      // Simulated SplitText animation
      gsap.from('.word-anim', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const statement1 = t('philIntro1').split(' ');
  const approach1 = t('philApproach1').split(' ');

  const statement2 = t('philIntro2').split(' ');
  const approach2 = t('philApproach2').split(' ');

  return (
    <section ref={sectionRef} className="relative py-48 w-full overflow-hidden bg-dark text-background min-h-[80vh] flex items-center">
      {/* Background Image - low opacity */}
      <div 
        className="parallax-bg absolute inset-0 z-0 bg-cover bg-center opacity-30 transform scale-125"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2940&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-dark/60 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
        
        {/* Contrast Statement 1 */}
        <div className="mb-24 md:w-2/3 ml-auto text-right">
          <p className="font-heading font-medium text-lg md:text-2xl text-background/60 mb-2 overflow-hidden flex flex-wrap justify-end gap-[6px]">
            {statement1.map((w, i) => <span key={'s1-'+i} className="word-anim block">{w}</span>)}
          </p>
          <p className="font-heading font-semibold text-xl md:text-3xl text-background/80 overflow-hidden flex flex-wrap justify-end gap-[8px]">
            {approach1.map((w, i) => <span key={'a1-'+i} className="word-anim block">{w}</span>)}
          </p>
        </div>

        {/* Contrast Statement 2 */}
        <div className="md:w-3/4">
          <p className="font-heading font-medium text-lg md:text-2xl text-background/80 mb-4 overflow-hidden flex flex-wrap gap-[6px]">
            {statement2.map((w, i) => <span key={'s2-'+i} className="word-anim block">{w}</span>)}
          </p>
          <div className="font-drama italic text-5xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tighter text-background flex flex-wrap gap-2 md:gap-4 overflow-hidden">
            {approach2.map((w, i) => {
              if (i === approach2.length - 1) {
                return (
                  <span key={'a2-'+i} className="word-anim block text-accent font-bold">
                    {w.replace('.', '')}
                    <span className="text-background">.</span>
                  </span>
                )
              }
              return <span key={'a2-'+i} className="word-anim block">{w}</span>;
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
