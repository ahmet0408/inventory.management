import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../configuration/i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = async (language) => {
    try {
      // Update backend language preference
      const returnUrl = window.location.href.replace('&', '!');
      await fetch(`/api/SetLanguage?culture=${language}&returnUrl=${returnUrl}`, {
        method: 'GET',
        credentials: 'include',
      });

      // Fix: Use the imported i18n instance to change language
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);

      // Set default headers for future fetch requests
      const defaultHeaders = new Headers({
        'Accept-Language': language
      });

      window._defaultHeaders = defaultHeaders;
      localStorage.setItem('i18nextLng', language);
      
      // Optional: You might want to consider if a full page reload is necessary
      window.location.reload();
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  useEffect(() => {
    const defaultHeaders = new Headers({
      'Accept-Language': currentLanguage
    });
    window._defaultHeaders = defaultHeaders;
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);