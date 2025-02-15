import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'tk',
    supportedLngs: ['tk', 'ru', 'en'],
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      // Fix: Use an object with language-specific paths
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie'],
      cookieMinutes: 525600, // 1 year
    },
  });

export default i18n;