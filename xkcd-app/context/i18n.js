import { useRouter } from "next/router";
import { createContext, useCallback, useContext } from "react";
import es from "../translations/es.json";
import en from "../translations/en.json";

const I18NContext = createContext();

const languages = { es, en };

export function I18NContextProvider({ children }) {
  const { locale } = useRouter();

  const t = useCallback(
    (key, ...args) => {
      let translation = languages[locale][key];
      if (args.length === 0) return translation;
      args.forEach((arg, i) => {
        translation = translation.replace(`\${${i + 1}}`, arg);
      });
      return translation;
    },
    [locale]
  );

  return <I18NContext.Provider value={{ t }}>{children}</I18NContext.Provider>;
}

export function useI18N() {
  const context = useContext(I18NContext);
  if (!context) {
    throw new Error("useI18N must be used within an I18NProvider");
  }

  return context;
}
