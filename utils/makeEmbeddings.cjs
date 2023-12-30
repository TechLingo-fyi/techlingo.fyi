const OpenAI = require("openai");
const fs = require("fs");
const crypto = require("crypto");

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

function hashString(string) {
  return crypto.createHash("md5").update(string).digest("hex");
}

function getEnglishDefinition(lingo) {
  return lingo.definitions.filter(
    (definition) => definition.language === "en",
  )[0].definition;
}

function saveJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 4));
}

async function embedLingo(lingo) {
  const englishDefinition = getEnglishDefinition(lingo);
  const embed = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: englishDefinition,
    encoding_format: "float",
  });
  console.log(embed.data.embedding);
  return embed.data[0].embedding;
}

const metadataDir = "metadata";
async function createEmbeddings() {
  for (let i = 0; i < originalLingos.length; i++) {
    const lingo = originalLingos[i];
    const newHash = hashString(getEnglishDefinition(lingo));
    const metadataFile = `${metadataDir}/${lingo.slug}.json`;
    let hasEmbedding = false;
    if (fs.existsSync(metadataFile)) {
      const metadata = JSON.parse(fs.readFileSync(metadataFile));
      hasEmbedding = metadata.embedding !== undefined;
      if (hasEmbedding) {
        console.log(`Already has embedding for ${lingo.slug}`);
        const currentHash = metadata.embedding_hash;
        if (currentHash !== newHash) {
          console.log(`Hashes don't match!`);
          console.log(`Current: ${currentHash}`);
          console.log(`New: ${newHash}`);

          const embedding = await embedLingo(lingo);
          saveJSON(metadataFile, {
            ...metadata,
            embedding_hash: newHash,
            embedding: embedding,
          });
        }
      } else {
        console.log(`Does not have embedding for ${lingo.slug}`);
        const embedding = await embedLingo(lingo);
        saveJSON(metadataFile, {
          ...metadata,
          embedding_hash: newHash,
          embedding: embedding,
        });
      }
    } else {
      const embedding = await embedLingo(lingo);
      saveJSON(metadataFile, {
        slug: lingo.slug,
        embedding_hash: newHash,
        embedding: embedding,
      });
    }
  }
}

createEmbeddings();
