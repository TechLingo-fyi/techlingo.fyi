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
    "lingo.exampleUsage": "Example usage:",
    "lingo.relatedTerms": "Similar terms",
  },
  es: {
    "lingo.otherLanguages": "Otros idiomas:",
    "lingo.twitterShare": "Compartir en Twitter",
    "lingo.copyPermalink": "Copiar enlace permanente",
    "lingo.suggestEdits": "Sugerir cambios",
    "lingo.numeronymFor": "Numerónimo de",
    "lingo.acronymFor": "Acrónimo de",
    "lingo.exampleUsage": "Ejemplo de uso:",
    "lingo.relatedTerms": "Términos similares",
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: string) {
  const langType = lang as keyof typeof ui;
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    if (lang in ui && ui[langType].hasOwnProperty(key)) {
      return ui[langType][key];
    }
    return ui[defaultLang][key];
  };
}
