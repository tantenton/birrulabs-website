import { ARTICLES } from '../../src/data/articles';

export async function GET() {
  const baseUrl = 'https://birrulabs.biz.id';
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BirruLabs — AI Product Lab</title>
    <link>${baseUrl}</link>
    <description>Engineering studio building autonomous AI agents, workflow automation, and creative pipelines.</description>
    <language>id</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${ARTICLES.map((article) => `
    <item>
      <title>${escapeXml(article.title.id)}</title>
      <link>${baseUrl}/id/articles/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/id/articles/${article.slug}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(article.excerpt.id)}</description>
      <category>${article.category}</category>
      <author>${article.author}</author>
    </item>
    `).join('')}
  </channel>
</rss>`.trim();

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
