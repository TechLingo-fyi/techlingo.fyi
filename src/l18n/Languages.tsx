import json from "./languages.json";

interface Language {
  code: string;
  englishLanguageName: string;
  languageName: string;
  directionality: string;
}

const languages = json as Language[];

const LangMap = new Map<string, Language>();
languages.forEach((lang) => {
  LangMap.set(lang.code, lang);
});

export default LangMap;
