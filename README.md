# TechLingo.fyi

TechLingo.fyi is a free and open-source project aimed at making it easy for newcomers to understand all the buzzword and other code-related terms that we, as programmers tend to use with so much familiarity.

## Tech behind

This website is built using [Astro](https://astro.build/) with some help from Vercel's v0 and a lot of help from ChatGPT, so do not expect a wonderful codebase.

## Search

The search is provided by Algolia, and it is necessary to index every time a new lingo gets added to the site, to reindex manually, run:

```shell
node utils/algoliaIndexing.js
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
