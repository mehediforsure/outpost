import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import { formatDate, getArticleBySlug, getPublishedArticles } from "@/lib/articles";

export const revalidate = 60;

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({
    slug: article.slug
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const paragraphs = article.body?.split("\n\n").filter(Boolean) ?? [];

  return (
    <main>
      <header className="site-header compact-header">
        <Link className="brand" href="/">
          <span className="brand-mark">OP</span>
          <span>Outpost</span>
        </Link>
        <Link className="header-cta" href="/">
          <ArrowLeft size={17} /> Back home
        </Link>
      </header>

      <article className="story-page">
        <div className="story-kicker">
          <span>{article.category}</span>
          <span>{formatDate(article.published_at)}</span>
          <span>
            <Clock3 size={15} /> {article.read_minutes} min read
          </span>
        </div>
        <h1>{article.title}</h1>
        <p className="story-dek">{article.dek}</p>
        <div className="story-byline">By {article.author}</div>
        <div className="story-hero">
          {article.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={article.image_url} alt="" />
          ) : (
            <span>{article.category}</span>
          )}
        </div>
        {article.body_html ? (
          <div
            className="story-body story-body-html"
            dangerouslySetInnerHTML={{ __html: article.body_html }}
          />
        ) : (
          <div className="story-body">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
