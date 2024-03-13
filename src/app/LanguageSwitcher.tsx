import React from "react";
import { useLocale } from "@/app/LocaleContext";

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLocale();

  const changeLanguage = (event: { target: { value: string } }) => {
    setLocale(event.target.value);
  };

  return (
    <select value={locale} onChange={changeLanguage}>
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
      <option value="de">Deutsch</option>
      <option value="it">Italiano</option>
      <option value="pt">Português</option>
      <option value="ru">Русский</option>
      <option value="zh">中文</option>
      <option value="ja">日本語</option>
      <option value="ko">한국어</option>
    </select>
  );
};

export default LanguageSwitcher;
