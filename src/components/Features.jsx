import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { Truck, Sparkles, Package, Trash2, Wrench, Home, CheckCircle2 } from 'lucide-react';

export default function Features() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const services = [
    { 
      icon: Truck, 
      img: 'https://images.unsplash.com/photo-1549834125-82d3c48159a3?q=80&w=800&auto=format&fit=crop',
      titleKey: 'srv1Title', 
      descKey: 'srv1Desc' 
    },
    { 
      icon: Sparkles, 
      img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop',
      titleKey: 'srv2Title', 
      descKey: 'srv2Desc' 
    },
    { 
      icon: Package, 
      img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
      titleKey: 'srv3Title', 
      descKey: 'srv3Desc' 
    },
    { 
      icon: Trash2, 
      img: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=800&auto=format&fit=crop',
      titleKey: 'srv4Title', 
      descKey: 'srv4Desc' 
    },
    { 
      icon: Wrench, 
      img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
      titleKey: 'srv5Title', 
      descKey: 'srv5Desc' 
    },
    { 
      icon: Home, 
      img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop',
      titleKey: 'srv6Title', 
      descKey: 'srv6Desc' 
    },
  ];

  const whatWeDoList = [
    t('whatList1'),
    t('whatList2'),
    t('whatList3'),
    t('whatList4'),
    t('whatList5')
  ];

  return (
    <section id="services" ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* What We Do Section */}
      <div className="text-center mb-24 feature-card">
        <h2 className="font-drama italic text-4xl md:text-6xl mb-6">{t('whatSubtitle')}</h2>
        <p className="font-body text-dark/70 max-w-2xl mx-auto text-lg mb-8">
          {t('whatDesc')}
        </p>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {whatWeDoList.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-[#EAE8E2] px-4 py-2 rounded-full border border-black/5">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span className="font-mono text-sm tracking-wide font-bold">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mb-16 feature-card">
        <h2 className="font-drama italic text-4xl md:text-5xl">{t('srvTitle')}</h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((srv, idx) => (
          <div key={idx} className="feature-card flex flex-col bg-[#F2F0E9] rounded-[2rem] border border-black/5 hover:bg-[#EAE8E2] transition-colors duration-300 overflow-hidden">
            <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: `url(${srv.img})` }}></div>
            <div className="p-8 pb-10 flex flex-col flex-1">
              <srv.icon className="w-8 h-8 text-accent mb-6" />
              <h3 className="font-heading font-bold text-xl mb-3 leading-tight">{t(srv.titleKey)}</h3>
              <p className="font-body text-dark/70 leading-relaxed text-sm">
                {t(srv.descKey)}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
