# TechLingo.fyi

TechLingo.fyi is a free and open-source project aimed at making it easy for newcomers to understand all the buzzword and other code-related terms that we, as programmers tend to use with so much familiarity.

## Tech

This website is built using [Astro](https://astro.build/) with some help from Vercel's v0 and a lot of help from ChatGPT, so do not expect a wonderful codebase.

## Lingos

All the content of this webiste is stored as a series of _json_ files located in the [src/content/lingos](src/content/lingos) folder.

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
| `npm run docker:build`    | Build site using Docker and export to `dist-docker/` |
| `npm run netlify:deploy`  | Build with Docker and deploy to Netlify preview |
| `npm run netlify:deploy:prod` | Build with Docker and deploy to Netlify production |

## 🚀 Deployment

This site is automatically deployed to Netlify using GitHub Actions:

- **Pull Requests**: Create preview deployments with unique URLs
- **Main branch**: Deploy to production
- **Manual**: Can be triggered manually from GitHub Actions tab

## Similar terms

To calculate similar terms using OpenAI it is necessary to run the following scripts in order, remeber to set the environment variable `OPENAI_API_KEY`.

```shell
node utils/makeEmbeddings.cjs
node utils/matchSimilarTerms.cjs
npx prettier . --write
```
