import OpenAI from "openai";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");

const openai = new OpenAI();

const lingosDir = "src/content/lingos";
const allFiles = fs.readdirSync(lingosDir);
const jsonFiles = allFiles
  .filter((file) => file.endsWith(".json"))
  .map((file) => `${lingosDir}/${file}`);

const originalLingos = [];
for (let i = 0; i < jsonFiles.length; i++) {
  const lingoFile = jsonFiles[i];
  const data = JSON.parse(fs.readFileSync(lingoFile));
  originalLingos.push(data);
}

async function embedLingo(lingo) {
  const englishDefinition = lingo.definitions.filter(
    (definition) => definition.language === "en",
  )[0].definition;
  const embed = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: englishDefinition,
    encoding_format: "float",
  });
  console.log(embed.data.embedding);
  return embed.data[0].embedding;
}

const metadataDir = "metadata";

for (let i = 0; i < originalLingos.length; i++) {
  const lingo = originalLingos[i];
  const metadataFile = `${metadataDir}/${lingo.slug}.json`;
  let hasEmbedding = false;
  if (fs.existsSync(metadataFile)) {
    const metadata = JSON.parse(fs.readFileSync(metadataFile));
    hasEmbedding = metadata.embedding !== undefined;
    if (hasEmbedding) {
      console.log(`Already has embedding for ${lingo.slug}`);
    } else {
      const embedding = await embedLingo(lingo);
      fs.writeFileSync(
        metadataFile,
        JSON.stringify(
          {
            ...metadata,
            embedding: embedding,
          },
          null,
          4,
        ),
      );
    }
  } else {
    const embedding = await embedLingo(lingo);
    fs.writeFileSync(
      metadataFile,
      JSON.stringify(
        {
          slug: lingo.slug,
          embedding: embedding,
        },
        null,
        4,
      ),
    );
  }
}
