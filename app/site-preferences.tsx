"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
type SiteLanguage = "th" | "en" | "lo" | "zh-CN";

const ORIGINAL_ORIGIN = "https://www.trehabphysio.com";
const TRANSLATED_ORIGIN = "https://www-trehabphysio-com.translate.goog";

const languages: { value: SiteLanguage; label: string; htmlLang: string }[] = [
  { value: "th", label: "ไทย", htmlLang: "th" },
  { value: "en", label: "English", htmlLang: "en" },
  { value: "lo", label: "ລາວ", htmlLang: "lo" },
  { value: "zh-CN", label: "中文", htmlLang: "zh-CN" },
];

function detectLanguage(): SiteLanguage {
  if (typeof window === "undefined") return "th";
  const target = new URLSearchParams(window.location.search).get("_x_tr_tl");
  if (target === "en" || target === "lo" || target === "zh-CN") return target;
  return "th";
}

function translatedUrl(language: SiteLanguage) {
  const current = new URL(window.location.href);
  const destination = new URL(current.pathname, language === "th" ? ORIGINAL_ORIGIN : TRANSLATED_ORIGIN);

  current.searchParams.forEach((value, key) => {
    if (!key.startsWith("_x_tr_")) destination.searchParams.set(key, value);
  });

  if (language !== "th") {
    destination.searchParams.set("_x_tr_sl", "th");
    destination.searchParams.set("_x_tr_tl", language);
    destination.searchParams.set("_x_tr_hl", "th");
  }

  destination.hash = current.hash;
  return destination.toString();
}

export default function SitePreferences() {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<SiteLanguage>("th");

  useEffect(() => {
    const savedTheme = localStorage.getItem("trehab-theme") as Theme | null;
    const preferredTheme: Theme = savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(preferredTheme);
    document.documentElement.dataset.theme = preferredTheme;

    const currentLanguage = detectLanguage();
    setLanguage(currentLanguage);
    const htmlLanguage = languages.find((item) => item.value === currentLanguage)?.htmlLang ?? "th";
    document.documentElement.lang = htmlLanguage;
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("trehab-theme", nextTheme);
  };

  const changeLanguage = (nextLanguage: SiteLanguage) => {
    setLanguage(nextLanguage);
    localStorage.setItem("trehab-language", nextLanguage);
    window.location.assign(translatedUrl(nextLanguage));
  };

  return (
    <aside className="trehab-site-preferences notranslate" aria-label="ภาษาและรูปแบบสี" translate="no">
      <label className="trehab-language-control">
        <span>Language</span>
        <select
          value={language}
          onChange={(event) => changeLanguage(event.target.value as SiteLanguage)}
          aria-label="เลือกภาษาเว็บไซต์"
          title="แปลหน้าเว็บอัตโนมัติด้วย Google Translate"
        >
          {languages.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      </label>
      <button
        type="button"
        className="trehab-theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"}
        aria-pressed={theme === "dark"}
        title={theme === "dark" ? "Light mode" : "Dark mode"}
      >
        <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
        <b>{theme === "dark" ? "Light" : "Dark"}</b>
      </button>
      <small>AUTO TRANSLATE</small>
    </aside>
  );
}
