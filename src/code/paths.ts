import type { Lingo } from "@/TypeLingo";
import { getCollection } from "astro:content";

export async function getLingoPaths() {
  const lingos = (await getCollection("lingos")).map((lingo) => {
    return lingo.data as Lingo;
  });

  const slugToLingo = new Map<string, Lingo>();
  lingos.forEach((lingo) => {
    slugToLingo.set(lingo.slug, lingo);
  });

  const list = lingos.map((lingo) => {
    const languages = new Array();
    lingo.definitions.forEach((element) => {
      languages.push(element.language);
    });

    return languages.map((language) => {
      return {
        params: {
          lingo: lingo.slug,
          language: language,
        },
        props: {
          data: lingo,
          relatedLingos: lingo.related === undefined ? [] :
           lingo.related
            .slice(0, 3)
            .map((slug) => slugToLingo.get(slug)),
        },
      };
    });
  });

  return list.flat();
}
