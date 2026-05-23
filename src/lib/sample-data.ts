import type { Article } from "@/lib/types";

export const sampleArticles: Article[] = [
  {
    id: "1",
    slug: "inside-the-new-ai-newsroom",
    title: "Inside the new AI newsroom built for faster public-interest reporting",
    dek: "Editors are using automation to detect leads, verify sources, and publish explainers without losing human judgment.",
    category: "Technology",
    author: "Maya Rahman",
    published_at: "2026-05-22T10:00:00.000Z",
    read_minutes: 6,
    image_url: null,
    is_featured: true,
    body: "Modern publishing teams are under pressure to move faster while keeping trust intact. The strongest newsrooms are treating automation as infrastructure: a way to reduce repetitive work, surface signals, and keep reporters focused on context.\n\nThe shift is most visible in breaking-news desks, where editors need live inputs from social platforms, government feeds, wire services, and internal notes. A unified publishing system can turn those inputs into a verified queue instead of scattered tabs.\n\nThe core lesson is simple: technology should make editorial judgment easier to apply, not replace it."
  },
  {
    id: "2",
    slug: "cities-redesign-climate-response",
    title: "Cities redesign climate response as heat records keep arriving early",
    dek: "New local plans combine cooling centers, tree cover, building rules, and faster public alerts.",
    category: "Climate",
    author: "Jon Bell",
    published_at: "2026-05-21T15:30:00.000Z",
    read_minutes: 4,
    image_url: null,
    is_featured: false,
    body: "Urban climate planning is moving from long-term reports into weekly operations. Heat response teams are coordinating transit, health agencies, and public communications as summer risk arrives sooner.\n\nThe strongest programs share one trait: they treat residents as active participants, not a broadcast audience."
  },
  {
    id: "3",
    slug: "markets-watch-consumer-spending",
    title: "Markets watch consumer spending as retailers split on the outlook",
    dek: "A mixed earnings season shows households trading down in some categories while continuing to spend on services.",
    category: "Business",
    author: "Leah Ortiz",
    published_at: "2026-05-20T12:10:00.000Z",
    read_minutes: 5,
    image_url: null,
    is_featured: false,
    body: "Retail executives are describing a selective consumer: cautious on discretionary goods, more resilient on travel, food, and essential services.\n\nInvestors are watching whether promotions protect volume or compress margins through the next quarter."
  },
  {
    id: "4",
    slug: "public-health-data-systems",
    title: "Public health agencies modernize data systems after years of patchwork",
    dek: "Officials say faster reporting depends on cleaner pipelines between clinics, labs, and local departments.",
    category: "Health",
    author: "Nadia Singh",
    published_at: "2026-05-19T09:45:00.000Z",
    read_minutes: 7,
    image_url: null,
    is_featured: false,
    body: "Public health data work is often invisible until systems fail. Agencies are now replacing manual spreadsheets with shared reporting infrastructure that can handle routine surveillance and emergency response.\n\nThe work is technical, but the outcome is public trust: fewer delays, clearer dashboards, and better decisions."
  }
];
