import LangMap from "../l18n/Languages";
import ContextLinks from "./detail/ContextLinks";
import OtherLanguageLinks from "./detail/OtherLanguageLinks";
import type { Definition, Lingo } from "@/TypeLingo";
import { useTranslations } from "@/l18n/ui";

import markdownit from "markdown-it";
const md = markdownit();
// const result = md.render('# markdown-it rulezz!');

const cardStyle = [
  "col-span-3",
  "p-8",
  "pb-5",
  "bg-white",
  "border",
  "border-gray-200",
  "rounded-lg",
  "shadow",
];

const termStyle = [
  "mb-1",
  "text-5xl",
  "font-bold",
  "tracking-tight",
  "text-gray-900",
];

const LanguageSpecificDefinition = ({
  language,
  definition,
  currentLanguage = false,
}: {
  language: string;
  definition?: string;
  currentLanguage?: boolean;
}) => {
  let textSize = "text-md";
  let textColor = "text-gray-400";

  // If the current page language is the
  // same as the definition language
  if (currentLanguage) {
    textSize = "text-2xl";
    textColor = "text-gray-900";
  }

  const definitionClasses = [textSize, textColor];

  const dtClasses = [
    "mb-1",
    "text-gray-400",
    "md:text-lg",
    "group-hover:md:text-xl",
    "group-hover:text-gray-500",
  ];

  dtClasses.push("collapse hidden");

  return (
    <div key={language} className="flex group flex-col pb-3 pt-3">
      <dt
        title={LangMap.get(language)?.englishLanguageName}
        className={dtClasses.join(" ")}
      >
        {LangMap.get(language)?.languageName}
      </dt>
      <dd className={definitionClasses.join(" ")}>{definition}</dd>
    </div>
  );
};

const LingoDetail = ({
  data,
  viewingLanguage,
  slug,
  shareableText,
}: {
  data: Lingo;
  viewingLanguage: string;
  slug: string;
  shareableText: string;
}) => {
  const t = useTranslations(viewingLanguage);

  // const map
  const definitionsMap = new Map<string, Definition>();
  data.definitions.forEach((definition: Definition) => {
    definitionsMap.set(definition.language, definition);
  });
  const currentLanguageDefinition = definitionsMap.get(viewingLanguage);
  const currentLangSpec = LangMap.get(viewingLanguage) || LangMap.get("en");
  const exampleUsage = `\"${
    currentLanguageDefinition?.term_usage_example || ""
  }\"`;
  if (currentLangSpec === undefined) {
    console.error("No language found for " + viewingLanguage);
  }

  return (
    <div className={cardStyle.join(" ")}>
      <h3 className={termStyle.join(" ")}>
        {data.term}{" "}
        <small className="text-2xl text-gray-400 font-normal">
          {currentLanguageDefinition?.expanded}
        </small>
      </h3>
      <div>
        <dl className="text-gray-900">
          <LanguageSpecificDefinition
            key={viewingLanguage}
            language={viewingLanguage}
            definition={currentLanguageDefinition?.definition}
            currentLanguage={true}
          />
          <blockquote
            className="mt-3 indent-10 px-6 font-serif text-xl italic"
            dangerouslySetInnerHTML={{ __html: md.render(exampleUsage) }}
          />
        </dl>
        <div className="mt-6 text-gray-600">
          <OtherLanguageLinks lingo={data} viewingLanguage={viewingLanguage} />
        </div>
      </div>
      <ContextLinks
        shareableText={shareableText}
        slug={slug}
        viewingLanguage={viewingLanguage}
      />
    </div>
  );
};

export default LingoDetail;
