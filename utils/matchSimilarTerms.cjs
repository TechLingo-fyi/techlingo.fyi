const Annoy = require("annoy");
const fs = require("fs");

const lingosDir = "src/content/lingos";
const lingos = fs
  .readdirSync(lingosDir)
  .filter((file) => file.endsWith(".json"))
  .map((file) => `${lingosDir}/${file}`)
  .map((file) => JSON.parse(fs.readFileSync(file)));

const metadataDir = "metadata";
const lingoMetadata = fs
  .readdirSync(lingosDir)
  .filter((file) => file.endsWith(".json"))
  .map((file) => `${metadataDir}/${file}`)
  .map((file) => JSON.parse(fs.readFileSync(file)));

const index_to_slug = {};
const slug_to_index = {};
const index_to_embedding = {};

for (let i = 0; i < lingoMetadata.length; i++) {
  const lingo = lingoMetadata[i];
  const slug = lingo.slug;
  index_to_slug[i] = slug;
  slug_to_index[slug] = i;
  index_to_embedding[i] = lingoMetadata[i].embedding;
}

const embeddingSize = lingoMetadata[0].embedding.length;
const treeCount = 10;

const index = new Annoy(embeddingSize, "Angular");

for (let i = 0; i < lingoMetadata.length; i++) {
  const metadata = lingoMetadata[i];
  const embedding = metadata.embedding;
  index.addItem(i, embedding);
}
index.build(treeCount);

for (let i = 0; i < lingoMetadata.length; i++) {
  const searchSlug = index_to_slug[i];
  const relatedSlugs = index
    .getNNsByItem(i, 6)
    .filter((idx) => idx != i)
    .map((idx) => index_to_slug[idx]);

  const lingoData = JSON.parse(
    fs.readFileSync(`${lingosDir}/${searchSlug}.json`),
  );
  lingoData.related = relatedSlugs;
  fs.writeFileSync(
    `${lingosDir}/${searchSlug}.json`,
    JSON.stringify(lingoData, null, 4),
  );
}
