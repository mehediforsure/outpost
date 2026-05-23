import { sampleArticles } from "@/lib/sample-data";
import { getSupabaseClient } from "@/lib/supabase";
import type { Article } from "@/lib/types";

const ARTICLE_COLUMNS =
  "id, slug, title, dek, category, author, published_at, read_minutes, image_url, is_featured, body";

const ARTICLES_TABLE =
  process.env.SUPABASE_ARTICLES_TABLE ??
  process.env.NEXT_PUBLIC_SUPABASE_ARTICLES_TABLE ??
  "newsdb";

type NewsDbRow = {
  id: string | number;
  title: string;
  original_summary: string | null;
  ai_rewrite: string | null;
  source_feed: string | null;
  created_at: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function estimateReadMinutes(value: string | null) {
  if (!value) {
    return 3;
  }

  return Math.max(2, Math.ceil(stripHtml(value).split(/\s+/).length / 220));
}

function stripHtml(value: string | null) {
  if (!value) {
    return "";
  }

  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeArticleHtml(value: string | null) {
  if (!value) {
    return null;
  }

  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/\shref=["']javascript:[^"']*["']/gi, "");
}

function extractFirstImage(value: string | null) {
  if (!value) {
    return null;
  }

  const match = value.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

function mapNewsDbArticle(row: NewsDbRow, index: number): Article {
  const title = row.title.trim();
  const cleanedOriginal = stripHtml(row.original_summary);
  const rewrite = row.ai_rewrite?.trim() || "";
  const summary = rewrite || cleanedOriginal;
  const fullHtml = sanitizeArticleHtml(row.original_summary);
  const body = rewrite
    ? `${rewrite}\n\n${cleanedOriginal}`
    : cleanedOriginal;
  const source = row.source_feed?.trim() || "News Desk";
  const slugBase = slugify(title) || "news-report";

  return {
    id: String(row.id),
    slug: `${slugBase}-${row.id}`,
    title,
    dek: summary
      ? `${summary.slice(0, 180)}${summary.length > 180 ? "..." : ""}`
      : "Read the full rewritten report from the newsroom desk.",
    category: source,
    author: source,
    published_at: row.created_at,
    read_minutes: estimateReadMinutes(body || summary),
    image_url: extractFirstImage(row.original_summary),
    is_featured: index === 0,
    body: body || summary || null,
    body_html: fullHtml
  };
}

async function getNewsDbArticles(): Promise<Article[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return sampleArticles;
  }

  const { data, error } = await supabase
    .from(ARTICLES_TABLE)
    .select("id, title, original_summary, ai_rewrite, source_feed, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error(
      `Unable to load news articles from Supabase table "${ARTICLES_TABLE}":`,
      error.message
    );
    return sampleArticles;
  }

  return data?.length
    ? (data as NewsDbRow[]).map(mapNewsDbArticle)
    : sampleArticles;
}

export async function getPublishedArticles(): Promise<Article[]> {
  if (ARTICLES_TABLE === "newsdb") {
    return getNewsDbArticles();
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return sampleArticles;
  }

  const { data, error } = await supabase
    .from(ARTICLES_TABLE)
    .select(ARTICLE_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error(
      `Unable to load articles from Supabase table "${ARTICLES_TABLE}":`,
      error.message
    );
    return sampleArticles;
  }

  return data?.length ? (data as Article[]) : sampleArticles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (ARTICLES_TABLE === "newsdb") {
    const articles = await getNewsDbArticles();
    return articles.find((article) => article.slug === slug) ?? null;
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return sampleArticles.find((article) => article.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from(ARTICLES_TABLE)
    .select(ARTICLE_COLUMNS)
    .eq("status", "published")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(
      `Unable to load article from Supabase table "${ARTICLES_TABLE}":`,
      error.message
    );
    return sampleArticles.find((article) => article.slug === slug) ?? null;
  }

  return data as Article;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
