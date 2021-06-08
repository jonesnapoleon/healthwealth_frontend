import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

// const getLanguage = () => {
//   let req = localStorage.getItem("language");
//   const res = !req ? "en" : req;
//   return res;
// };

// .use(LanguageDetector)
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      // loadPath: "/i18n/{{ns}}/{{lng}}.json",
      loadPath: "/i18n/translations/en.json",
    },
    fallbackLng: "en",
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
