import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import englishTranslation from './translations/english/translation.json';
import spanishTranslation from './translations/spanish/translation.json';

const resources = {
  en: {
    translation: englishTranslation,
  },
  es: {
    translation: spanishTranslation,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
});
