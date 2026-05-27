import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { homeTranslations } from './home/HomeTranslations';
import { toTranslationResources } from './Translations';

void i18n.use(initReactI18next).use(LanguageDetector).init({
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: toTranslationResources(homeTranslations),
});

export default i18n;
