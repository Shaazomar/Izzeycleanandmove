import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#111111] text-background rounded-t-[4rem] overflow-hidden pt-24 pb-12 px-6 md:px-12 mt-12 shadow-sm border-t border-black/5 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col items-start gap-16">

        {/* Top Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-12">

          <div className="md:col-span-2">
            <h2 className="font-heading font-bold text-3xl tracking-tight mb-4 text-[#F2F0E9]">{t('brandName')}</h2>
            <p className="font-body text-[#F2F0E9]/60 max-w-sm mb-8 leading-relaxed">
              {t('footDesc')}
            </p>

            {/* System Operational Badge */}
            <div className="inline-flex items-center gap-2 group cursor-pointer">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="font-mono text-xs text-[#F2F0E9]/70 tracking-widest group-hover:text-green-400 transition-colors duration-300">
                {t('footStatus')}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs tracking-widest text-[#CC5833] uppercase mb-2">{t('footProto')}</h3>
            <a href="/#services" className="font-body text-sm text-[#F2F0E9]/70 hover:text-white transition-colors duration-200">{t('footArr')}</a>
            <a href="/#management" className="font-body text-sm text-[#F2F0E9]/70 hover:text-white transition-colors duration-200">{t('footSync')}</a>
            <a href="/#protocol" className="font-body text-sm text-[#F2F0E9]/70 hover:text-white transition-colors duration-200">{t('footStack')}</a>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-xs tracking-widest text-[#CC5833] uppercase mb-2">{t('footComm')}</h3>
            <a href="mailto:info@izzey.de" className="font-body text-sm text-[#F2F0E9]/70 hover:text-white transition-colors duration-200 truncate">info@izzey.de</a>
            <a href="https://wa.me/4917621709991" target="_blank" rel="noreferrer" className="font-body text-sm text-[#F2F0E9]/70 hover:text-white transition-colors duration-200">+49 176 2170 9991</a>
            <a href="https://www.instagram.com/izzey.de/" target="_blank" rel="noreferrer" className="font-body text-sm text-[#F2F0E9]/70 hover:text-white transition-colors duration-200">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61564135116273" target="_blank" rel="noreferrer" className="font-body text-sm text-[#F2F0E9]/70 hover:text-white transition-colors duration-200">Facebook</a>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/10 w-full pt-12 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#F2F0E9]/40">
          <span>&copy; {new Date().getFullYear()} {t('brandName')}. {t('footRights')}</span>
          <div className="flex gap-6 flex-wrap justify-center md:justify-end">
            <Link to="/impressum" className="hover:text-white cursor-pointer transition-colors duration-200">{t('footImpressum')}</Link>
            <span className="text-[#F2F0E9]/20 hidden md:inline">|</span>
            <Link to="/privacy" className="hover:text-white cursor-pointer transition-colors duration-200">{t('footPrivacy')}</Link>
            <span className="text-[#F2F0E9]/20 hidden md:inline">|</span>
            <Link to="/terms" className="hover:text-white cursor-pointer transition-colors duration-200">{t('footTerms')}</Link>
            <span className="text-[#F2F0E9]/20 hidden md:inline">|</span>
            <button className="hover:text-white cursor-pointer transition-colors duration-200">{t('footCookie')}</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
