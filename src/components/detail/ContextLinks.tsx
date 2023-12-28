import CopyButton from "../CopyButton";

import { useTranslations } from "@/l18n/ui";

const repository = "https://github.com/TechLingo-fyi/techlingo.fyi/";
const path = "tree/main/src/content/lingos";

const bottomLinkStyle = [
  "hover:underline",
  "mx-2",
  "cursor-pointer",
  "font-bold",
  "text-gray-500",
];
const ContextLinks = ({
  shareableText,
  slug,
  viewingLanguage,
}: {
  shareableText: string;
  slug: string;
  viewingLanguage: string;
}) => {
  const t = useTranslations(viewingLanguage);
  return (
    <div className="flex justify-end mt-2 text-xs">
      <CopyButton
        className={bottomLinkStyle.join(" ")}
        slug={slug}
        lang={viewingLanguage}
        text={t("lingo.copyPermalink")}
      />
      <a
        className={bottomLinkStyle.join(" ")}
        target="_blank"
        href={`https://twitter.com/intent/tweet?text=${shareableText}`}
      >
        {t("lingo.twitterShare")}
      </a>
      <a
        className={bottomLinkStyle.join(" ")}
        href={`${repository}/${path}/${slug}.json`}
      >
        {t("lingo.suggestEdits")}
      </a>
    </div>
  );
};

export default ContextLinks;
