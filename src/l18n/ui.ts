const languages = {
  en: "English",
  fr: "Français",
};

const defaultLang = "en";

const ui = {
  en: {
    "lingo.otherLanguages": "Other languages:",
    "lingo.twitterShare": "Share on Twitter",
    "lingo.copyPermalink": "Copy permalink",
    "lingo.suggestEdits": "Suggest edits",
    "lingo.numeronymFor": "Numeronym for",
    "lingo.acronymFor": "Acronym for",
  },
  es: {
    "lingo.otherLanguages": "Otros idiomas:",
    "lingo.twitterShare": "Compartir en Twitter",
    "lingo.copyPermalink": "Copiar enlace permanente",
    "lingo.suggestEdits": "Sugerir cambios",
    "lingo.numeronymFor": "Numerónimo de",
    "lingo.acronymFor": "Acrónimo de",
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    if (lang in ui && ui[lang].hasOwnProperty(key)) {
      return ui[lang][key];
    }
    return ui[defaultLang][key];
  };
}
