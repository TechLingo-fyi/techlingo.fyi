import type { Lingo } from "@/TypeLingo";
import { getCollection } from "astro:content";

export async function getLingoPaths() {
  const lingos = (await getCollection("lingos")).map((lingo) => {
    return lingo.data as Lingo;
  });

  const list = lingos.map((lingo) => {
    const languages = new Array();
    lingo.definitions.forEach((element) => {
      languages.push(element.language);
    });

    return languages.map((language) => {
      return {
        params: {
          lingo: lingo.term,
          language: language,
        },
        props: {
          data: lingo,
          relatedLingos: lingos
            .filter((l) => l.term !== lingo.term)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3),
        },
      };
    });
  });

  return list.flat();
}
