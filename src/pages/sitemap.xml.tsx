import type { GetServerSideProps } from "next";

const SITE_URL = "https://tftschool.com";

const PAGES = [
  { path: "/",           priority: "1.0", changefreq: "weekly"  },
  { path: "/flashcards", priority: "0.9", changefreq: "weekly"  },
  { path: "/quiz",       priority: "0.9", changefreq: "weekly"  },
  { path: "/items",      priority: "0.8", changefreq: "weekly"  },
  { path: "/combinator", priority: "0.8", changefreq: "monthly" },
  { path: "/simulator",  priority: "0.8", changefreq: "monthly" },
  { path: "/traits",     priority: "0.8", changefreq: "weekly"  },
  { path: "/glossary",   priority: "0.8", changefreq: "monthly" },
  { path: "/guide",      priority: "0.7", changefreq: "monthly" },
  { path: "/about",      priority: "0.5", changefreq: "monthly" },
  { path: "/privacy",    priority: "0.3", changefreq: "yearly"  },
];

function generateSitemap(): string {
  const today = new Date().toISOString().split("T")[0];

  const urls = PAGES.map(
    ({ path, priority, changefreq }) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export default function SitemapPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
  res.write(generateSitemap());
  res.end();

  return { props: {} };
};
