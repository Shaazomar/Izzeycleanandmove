import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, Factory, Timer, MapPin } from 'lucide-react';

export default function TrustBar() {
  const { t } = useLanguage();
  return (
    <div className="w-full bg-[#EAE8E2] border-b border-black/5 py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 flex-wrap">
        <div className="flex items-center gap-2 text-dark">
          <Timer className="w-5 h-5 text-accent" />
          <span className="font-mono text-xs font-bold uppercase tracking-wide">{t('trust1')}</span>
        </div>
        <div className="flex items-center gap-2 text-dark">
          <Factory className="w-5 h-5 text-accent" />
          <span className="font-mono text-xs font-bold uppercase tracking-wide">{t('trust2')}</span>
        </div>
        <div className="flex items-center gap-2 text-dark">
          <CheckCircle2 className="w-5 h-5 text-accent" />
          <span className="font-mono text-xs font-bold uppercase tracking-wide">{t('trust3')}</span>
        </div>
        <div className="flex items-center gap-2 text-dark">
          <MapPin className="w-5 h-5 text-accent" />
          <span className="font-mono text-xs font-bold uppercase tracking-wide">{t('trust4')}</span>
        </div>
      </div>
    </div>
  );
}
