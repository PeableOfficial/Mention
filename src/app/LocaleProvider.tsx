"use client";
import React, { ReactNode, useState } from "react";
import LocaleContext from "./LocaleContext";
import en from "../locales/en-US.json";
import es from "../locales/es-ES.json";

interface LocaleMessages {
  [key: string]: string | { [key: string]: string };
}

const locales: LocaleMessages = {
  en,
  es,
};

const LocaleProvider = ({ children }: { children?: ReactNode }) => {
  const [locale, setLocale] = useState("en");

  const context = {
    locale,
    setLocale,
    locales,
    t: (key: string) => {
      const keys = key.split(".");
      let result = locales[locale];
      keys.forEach((k) => {
        if (typeof result === "object") {
          result = result[k];
        }
      });
      return typeof result === "string" ? result : key;
    },
  };

  return (
    <LocaleContext.Provider value={context}>{children}</LocaleContext.Provider>
  );
};

export default LocaleProvider;
