
import type { Lingo } from "../../entities/Lingo";
import { useTranslations } from "../../l18n/ui";


const expandedStyle = [
  "mb-1",
  "text-2xl",
  "italic",
  "tracking-tight",
  "text-gray-900",
  "dark:text-white",
  "group",
];

const ExpandedTerm = ({
  lingo,
  viewingLanguage,
}: {
  lingo: Lingo;
  viewingLanguage: string;
}) => {
  const t = useTranslations(viewingLanguage);
  const termExpansion: any[] = [];
  if (lingo.expanded) {
    // For each character in the expanded definition
    for (const character of lingo.expanded) {
      if (character == character.toUpperCase() && lingo.acronym) {
        termExpansion.push(<span className="font-bold">{character}</span>);
      }
      else 
      {
        termExpansion.push(character);
      }
    }
  }

  if (termExpansion.length === 0) {
    return null;
  }

  let additionalText: string = "";
  if (lingo.acronym) {
    additionalText = t("lingo.acronymFor");
  } else if (lingo.numeronym) {
    additionalText = t("lingo.numeronymFor");
  }
  return (
    <h4 className={expandedStyle.join(" ")} >{additionalText} {termExpansion}</h4>
  );
};
export default ExpandedTerm;
