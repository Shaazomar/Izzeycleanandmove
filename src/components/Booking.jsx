import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';

// ─── Rate-limit constants ───────────────────────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 60_000; // 60-second cooldown between submissions
const RATE_LIMIT_MAX = 3;            // max submissions within the window
const STORAGE_KEY = 'izzey_form_submissions';

function getSubmissionTimestamps() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function recordSubmission() {
  const now = Date.now();
  const recent = getSubmissionTimestamps().filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
}

function isRateLimited() {
  const now = Date.now();
  const recent = getSubmissionTimestamps().filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );
  return recent.length >= RATE_LIMIT_MAX;
}
// ───────────────────────────────────────────────────────────────────────────

export default function Booking() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── Client-side rate limit check ─────────────────────────────────────
    if (isRateLimited()) {
      setStatus(t('msgRateLimit'));
      return;
    }

    setStatus(t('msgSubmitting'));

    const formData = new FormData(e.target);

    // ── Secret loaded from .env — never hardcoded ─────────────────────────
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    // ── Honeypot: Web3Forms rejects if this field is filled by a bot ──────
    // (The hidden input named "botcheck" is in the form below)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        recordSubmission();
        setStatus(t('msgSuccess'));
        e.target.reset();
      } else {
        setStatus('Error: ' + data.message);
      }
    } catch {
      setStatus(t('msgError'));
    }
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.booking-elem', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="book" ref={containerRef} className="py-32 px-6 md:px-12 bg-background min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left: Contact Info */}
        <div className="flex flex-col justify-center booking-elem text-dark">
          <p className="font-mono text-sm tracking-widest text-primary uppercase mb-6 booking-elem">{t('contactTitle')}</p>
          <h2 className="font-drama italic text-6xl md:text-8xl leading-none mb-8 booking-elem" dangerouslySetInnerHTML={{ __html: t('bookTitle') }}></h2>
          <p className="font-body text-xl opacity-80 mb-12 max-w-md booking-elem">
            {t('bookDesc')}
          </p>

          <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-8 font-mono text-sm booking-elem">
            <div>
              <p className="text-dark/50 mb-1">EMAIL</p>
              <a href="mailto:info@izzey.de" className="font-bold border-b border-dark/20 hover:border-dark transition-colors truncate block">info@izzey.de</a>
            </div>
            <div>
              <p className="text-dark/50 mb-1">LOCATION</p>
              <span className="font-bold border-b border-dark/20 hover:border-dark transition-colors">Berlin, Germany</span>
            </div>
            <div className="sm:col-span-2">
              <p className="text-dark/50 mb-1">WHATSAPP</p>
              <a href="https://wa.me/4917621709991" target="_blank" rel="noreferrer" className="font-bold border-b border-dark/20 hover:border-dark transition-colors">+49 176 2170 9991</a>
            </div>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div className="bg-[#EAE8E2] rounded-[3rem] p-8 md:p-12 shadow-sm border border-black/5 booking-elem flex flex-col justify-center">
          <form className="space-y-6 font-body" onSubmit={handleSubmit}>

            {/* ── Honeypot field: hidden from real users, bots fill it ─────── */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs font-bold tracking-widest text-dark/60 mb-2 uppercase">{t('lblTitle')}</label>
                <input type="text" name="name" required className="bg-transparent border-b border-dark/20 py-3 focus:outline-none focus:border-accent transition-colors w-full text-lg text-dark placeholder:text-dark/30" placeholder={t('plName')} />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold tracking-widest text-dark/60 mb-2 uppercase">{t('lblEmail')}</label>
                <input type="email" name="email" required className="bg-transparent border-b border-dark/20 py-3 focus:outline-none focus:border-accent transition-colors w-full text-lg text-dark placeholder:text-dark/30" placeholder={t('plEmail')} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs font-bold tracking-widest text-dark/60 mb-2 uppercase">{t('lblPhone')}</label>
                <input type="tel" name="phone" required className="bg-transparent border-b border-dark/20 py-3 focus:outline-none focus:border-accent transition-colors w-full text-lg text-dark placeholder:text-dark/30" placeholder="+49..." />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold tracking-widest text-dark/60 mb-2 uppercase">{t('lblAddress')}</label>
                <input type="text" name="address" required className="bg-transparent border-b border-dark/20 py-3 focus:outline-none focus:border-accent transition-colors w-full text-lg text-dark placeholder:text-dark/30" placeholder={t('plAddress')} />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold tracking-widest text-dark/60 mb-2 uppercase">{t('lblService')}</label>
              <select name="services" required defaultValue="" className="bg-transparent border-b border-dark/20 py-3 focus:outline-none focus:border-accent transition-colors w-full text-lg text-dark cursor-pointer">
                <option value="" disabled hidden>{t('optDefault')}</option>
                <option value="cleaning">{t('opt1')}</option>
                <option value="moving">{t('opt2')}</option>
                <option value="property">{t('opt3')}</option>
                <option value="mixed">{t('opt4')}</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs font-bold tracking-widest text-dark/60 mb-2 uppercase">{t('lblDate')}</label>
                <input type="date" name="date" required className="bg-transparent border-b border-dark/20 py-3 focus:outline-none focus:border-accent transition-colors w-full text-lg text-dark" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold tracking-widest text-dark/60 mb-2 uppercase">{t('lblTime')}</label>
                <input type="time" name="time" required className="bg-transparent border-b border-dark/20 py-3 focus:outline-none focus:border-accent transition-colors w-full text-lg text-dark" />
              </div>
            </div>

            {status && (
              <div className={`text-sm font-bold text-center mt-4 ${status.includes('Error') || status.includes('Fehler')
                  ? 'text-red-500'
                  : status.includes('Success') || status.includes('Erfolg')
                    ? 'text-green-600'
                    : status.includes('many') || status.includes('viele')
                      ? 'text-orange-500'
                      : 'text-accent'
                }`}>
                {status}
              </div>
            )}

            <button
              type="submit"
              disabled={status === t('msgSubmitting')}
              className="magnetic-btn w-full mt-8 bg-dark text-background py-5 rounded-full text-sm font-bold tracking-wide group overflow-hidden disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">{t('btnConfirm')}</span>
              <div className="absolute inset-0 bg-accent translate-y-full transition-transform duration-300 ease-magnetic group-hover:translate-y-0 z-0"></div>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
