import React from 'react';
import LegalLayout from '../components/LegalLayout';
import { useLanguage } from '../context/LanguageContext';

export default function Terms() {
  const { t } = useLanguage();
  const termsSections = t('termsSections');

  return (
    <LegalLayout title={t('termsTitle')} lastUpdated="2026-05-12">
      <div className="space-y-12">
        {termsSections.map((section, index) => (
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
