// enable use of require statements in ESM
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import slugify from "slugify";
const algoliasearch = require('algoliasearch');
const fs = require("fs");

const adminKey = process.env.ALGOLIA_ADMIN_KEY;
const client = algoliasearch('FN1CC8W5LZ', adminKey);
const index = client.initIndex('search_techlingo');

// read all the json files in the lingos directory
const lingosDir = "src/content/lingos";
const lingoFiles = fs.readdirSync(lingosDir);
// filter for only the json files
const jsonFiles = lingoFiles
  .filter((file) => file.endsWith(".json"))
  .map((file) => `${lingosDir}/${file}`);

const array = [];
for (let i = 0; i < jsonFiles.length; i++) {
  const lingoFile = jsonFiles[i];
  const data = JSON.parse(fs.readFileSync(lingoFile));
  array.push({
    objectID: data.slug,
    ...data,
  });
}

await index.saveObjects(array)
