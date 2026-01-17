import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { Lingo } from '@/TypeLingo';
import { stat } from 'fs/promises';
import { join } from 'path';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString() || 'https://techlingo.fyi';
  
  // Get all lingos
  const lingos = (await getCollection('lingos')).map((lingo) => {
    return lingo.data as Lingo;
  });

  // Get file modification dates for lingos
  const lingoModDates = new Map<string, Date>();
  try {
    const lingosDir = join(process.cwd(), 'src/content/lingos');
    
    for (const lingo of lingos) {
      try {
        const filePath = join(lingosDir, `${lingo.slug}.json`);
        const stats = await stat(filePath);
        lingoModDates.set(lingo.slug, stats.mtime);
      } catch (error) {
        // If file doesn't exist or can't be accessed, use current date as fallback
        lingoModDates.set(lingo.slug, new Date());
      }
    }
  } catch (error) {
    // If filesystem access fails (e.g., in some deployment environments),
    // use current date for all lingos
    const now = new Date();
    for (const lingo of lingos) {
      lingoModDates.set(lingo.slug, now);
    }
  }

  // Format date for sitemap (ISO 8601 format)
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  // Generate sitemap entries
  const urls: Array<{
    loc: string;
    lastmod?: string;
    changefreq?: string;
    priority?: number;
  }> = [];

  // Homepage
  urls.push({
    loc: baseUrl + '/',
    lastmod: formatDate(new Date()),
    changefreq: 'daily',
    priority: 1.0,
  });

  // New page
  urls.push({
    loc: baseUrl + '/new',
    lastmod: formatDate(new Date()),
    changefreq: 'monthly',
    priority: 0.5,
  });

  // Lingo pages with all languages (matches getLingoPaths structure)
  for (const lingo of lingos) {
    const languages = new Set<string>();
    lingo.definitions.forEach((def) => {
      languages.add(def.language);
    });

    for (const language of languages) {
      const lastmod = lingoModDates.get(lingo.slug);
      urls.push({
        loc: `${baseUrl}/${lingo.slug}/${language}`,
        lastmod: lastmod ? formatDate(lastmod) : undefined,
        changefreq: 'monthly',
        priority: 0.8,
      });
    }
  }

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''}${url.changefreq ? `\n    <changefreq>${url.changefreq}</changefreq>` : ''}${url.priority !== undefined ? `\n    <priority>${url.priority}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
};

// Escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
