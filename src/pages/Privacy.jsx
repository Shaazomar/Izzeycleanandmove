import React from 'react';
import LegalLayout from '../components/LegalLayout';
import { useLanguage } from '../context/LanguageContext';

export default function Privacy() {
  const { t } = useLanguage();
  const privacySections = t('privacySections');

  return (
    <LegalLayout title={t('privacyTitle')}>
      <div className="space-y-12">
        {privacySections.map((section, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl font-bold font-heading text-[#CC5833] tracking-wide">
              {section.title}
            </h2>
            <div className="space-y-2 whitespace-pre-wrap">
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </LegalLayout>
  );
}
