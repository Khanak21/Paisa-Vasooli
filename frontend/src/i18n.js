import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
const availableLanguages = ['en', 'hi']
const apiKey = "EH0JEAlMq4vT4vnQkyqyrA";
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    ns: ["default"],
    defaultNS: "default",
    debug: true,
    whitelist:availableLanguages,
    supportedLngs: ["en","hi"],
    backend: {
      loadPath: loadPath
    },
    
  }).catch((error) => console.error('i18next initialization failed', error));

  export default i18n;