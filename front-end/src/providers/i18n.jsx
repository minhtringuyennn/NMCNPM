import ENTranslation from "@/i18n/en";
import VITranslation from "@/i18n/vi";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: ENTranslation
    },
    vi: {
      translation: VITranslation
    }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

function I18nProvider({ children }) {
  i18n;
  return children;
}

export default I18nProvider;
