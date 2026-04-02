import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

export default function Philosophy() {
  const { t } = useLanguage();
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.phil-elem', {
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

  const whyList = [
    t('why1'),
    t('why2'),
    t('why3'),
    t('why4'),
    t('why5')
  ];

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-[#F2F0E9] text-dark border-t border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Why Choose Us */}
        <div className="flex flex-col gap-8 phil-elem">
          <h2 className="font-drama italic text-5xl md:text-6xl">{t('whyTitle')}</h2>
          <div className="flex flex-col gap-4">
            {whyList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span className="font-body text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* About Us */}
        <div className="flex flex-col gap-6 bg-background p-10 md:p-12 rounded-[3.5rem] shadow-sm border border-black/5 phil-elem">
          <h2 className="font-drama italic text-4xl md:text-5xl">{t('aboutTitle')}</h2>
          <p className="font-body font-bold text-xl leading-relaxed text-dark/90">
            {t('aboutMain')}
          </p>
          <div className="w-12 h-1 bg-accent/20 rounded-full my-2"></div>
          <p className="font-body text-dark/70 leading-relaxed text-lg">
            {t('aboutDesc')}
          </p>
        </div>

      </div>
    </section>
  );
}
