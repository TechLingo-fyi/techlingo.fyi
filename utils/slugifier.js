// enable use of require statements in ESM
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import slugify from "slugify";

// use the require statement
const fs = require("fs");

// read all the json files in the lingos directory
const lingosDir = "src/content/lingos";
const lingoFiles = fs.readdirSync(lingosDir);
// filter for only the json files
const jsonFiles = lingoFiles
  .filter((file) => file.endsWith(".json"))
  .map((file) => `${lingosDir}/${file}`);

// loop through the json files
for (let i = 0; i < jsonFiles.length; i++) {
  // read the file
  const lingoFile = jsonFiles[i];
  const data = JSON.parse(fs.readFileSync(lingoFile));
  // add a slug property
  data.slug = slugify(data.term, { lower: true, strict: true });
  // write the file
  fs.writeFileSync(lingoFile, JSON.stringify(data, null, 2));
}
