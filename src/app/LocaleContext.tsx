"use client";
import React, { useContext } from "react";

const defaultContextData = {
  locale: "en",
  setLocale: (locale: string) => {},
  t: (key: string) => key, // This is a placeholder function that will be replaced by the actual function in the provider
};

const LocaleContext = React.createContext(defaultContextData);

export const useLocale = () => {
  return useContext(LocaleContext);
};

export default LocaleContext;
