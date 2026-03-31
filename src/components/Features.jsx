import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { MousePointer2, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Card 1: Diagnostic Shuffler
function DiagnosticShuffler() {
  const { t } = useLanguage();
  const [cards, setCards] = useState([
    { id: 1, color: 'bg-primary text-background' },
    { id: 2, color: 'bg-background text-dark' },
    { id: 3, color: 'bg-[#E5E0D5] text-dark' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const arr = [...prev];
        arr.unshift(arr.pop());
        return arr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 w-full flex items-center justify-center pointer-events-none perspective-1000">
      {cards.map((card, i) => (
        <div
          key={card.id}
          className={`absolute w-11/12 md:w-full p-6 rounded-[2rem] shadow-sm border border-black/5 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${card.color}`}
          style={{
            transform: `translateY(${i * 12}px) scale(${1 - i * 0.05}) translateZ(-${i * 20}px)`,
            zIndex: cards.length - i,
            opacity: 1 - i * 0.2
          }}
        >
          <div className="font-heading font-bold text-lg mb-2">{t(`c1Badge${card.id}`)}</div>
          <div className="font-body text-sm opacity-80">{t(`c1Desc${card.id}`)}</div>
        </div>
      ))}
    </div>
  );
}

// Card 2: Telemetry Typewriter
function TelemetryTypewriter() {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const fullText = t('c2Terminal');
  
  useEffect(() => {
    let current = 0;
    setText('');
    const interval = setInterval(() => {
      if (current <= fullText.length) {
        setText(fullText.slice(0, current));
        current++;
      } else {
        setTimeout(() => { current = 0; }, 2000); // Loop after 2 seconds
      }
    }, 50);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="relative h-64 w-full bg-[#111111] rounded-[2rem] p-6 text-background overflow-hidden border border-black/10 shadow-sm flex flex-col justify-start">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-4 h-4 text-accent animate-pulse" />
        <span className="font-heading text-xs font-bold tracking-widest text-accent uppercase">{t('c2LiveFeed')}</span>
      </div>
      <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap">
        {text}
        <span className="inline-block w-2 bg-accent ml-1 animate-pulse">&nbsp;</span>
      </pre>
    </div>
  );
}

// Card 3: Cursor Protocol Scheduler
function CursorProtocolScheduler() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      tl.set('.cursor-svg', { x: 0, y: 150, opacity: 0 })
        // Enter
        .to('.cursor-svg', { opacity: 1, duration: 0.3 })
        // Move to Day (Thursday)
        .to('.cursor-svg', { x: 140, y: 40, duration: 0.8, ease: 'power2.inOut' })
        // Click
        .to('.cursor-svg', { scale: 0.8, duration: 0.1 })
        .to('.day-cell-th', { backgroundColor: '#CC5833', color: '#F2F0E9', duration: 0.2 }, '<')
        .to('.cursor-svg', { scale: 1, duration: 0.1 })
        // Move to Save
        .to('.cursor-svg', { x: 60, y: 110, duration: 0.6, ease: 'power2.inOut', delay: 0.3 })
        // Click Save
        .to('.cursor-svg', { scale: 0.8, duration: 0.1 })
        .to('.save-btn', { scale: 0.95, duration: 0.1 }, '<')
        .to('.cursor-svg', { scale: 1, duration: 0.1 })
        .to('.save-btn', { scale: 1, duration: 0.1 }, '<')
        // Exit
        .to('.cursor-svg', { opacity: 0, y: 150, duration: 0.5, delay: 0.2 })
        // Reset state invisibly
        .set('.day-cell-th', { backgroundColor: 'transparent', color: '#1A1A1A' });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div ref={containerRef} className="relative h-64 w-full bg-background rounded-[2rem] p-6 shadow-sm border border-black/10 flex flex-col items-center justify-center overflow-hidden">
      <p className="font-heading font-bold text-sm mb-6 text-dark text-center">{t('c3Dispatch')}</p>
      
      <div className="flex gap-2 w-full justify-center mb-6">
        {days.map((day, i) => (
          <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold border border-dark/10 ${i === 4 ? 'day-cell-th' : ''}`}>
            {day}
          </div>
        ))}
      </div>
      
      <div className="save-btn px-6 py-2 rounded-full border border-dark/20 text-xs font-bold font-heading">
        {t('c3Confirm')}
      </div>

      <div className="cursor-svg absolute top-0 left-0 w-6 h-6 z-20 pointer-events-none drop-shadow-md">
        <MousePointer2 className="w-full h-full text-dark fill-dark" />
      </div>
    </div>
  );
}

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

  return (
    <section id="services" ref={sectionRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-20 feature-card">
        <p className="font-mono text-sm tracking-widest text-primary uppercase mb-4">{t('featBadge')}</p>
        <h2 className="font-drama italic text-5xl md:text-7xl">{t('featTitle')}</h2>
        <p className="font-body text-dark/70 max-w-xl mx-auto mt-6 text-lg">
          {t('featDesc')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="feature-card flex flex-col gap-6">
          <DiagnosticShuffler />
          <div>
            <h3 className="font-heading font-bold text-xl mb-2">{t('c1Title')}</h3>
            <p className="font-body text-dark/70 text-sm">
              {t('c1Details')}
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="feature-card flex flex-col gap-6 md:mt-12">
          <TelemetryTypewriter />
          <div>
            <h3 className="font-heading font-bold text-xl mb-2">{t('c2Title')}</h3>
            <p className="font-body text-dark/70 text-sm">
              {t('c2Details')}
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="feature-card flex flex-col gap-6 md:mt-24">
          <CursorProtocolScheduler />
          <div>
            <h3 className="font-heading font-bold text-xl mb-2">{t('c3Title')}</h3>
            <p className="font-body text-dark/70 text-sm">
              {t('c3Details')}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
