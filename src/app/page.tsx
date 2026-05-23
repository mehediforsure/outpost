import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpenText,
  Clock3,
  Globe2,
  Layers3,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";
import { formatDate, getPublishedArticles } from "@/lib/articles";
import type { Article } from "@/lib/types";

export const revalidate = 60;

const beats = ["World", "Business", "Technology", "Culture", "Climate", "Health"];

const newsroomTools = [
  {
    icon: Radio,
    title: "Live coverage hub",
    text: "Run developing stories from one editorial console with updates, context, and source notes."
  },
  {
    icon: Search,
    title: "Research desk",
    text: "Connect backgrounders, interviews, datasets, and prior coverage before publishing."
  },
  {
    icon: ShieldCheck,
    title: "Trust workflow",
    text: "Keep corrections, bylines, disclosures, and approval states visible to the whole team."
  },
  {
    icon: BarChart3,
    title: "Audience signals",
    text: "See what readers are following without turning editorial judgment into a click chase."
  }
];

function FeatureVisual({ article }: { article: Article }) {
  return (
    <div className="feature-visual">
      <div className="visual-window">
        <div className="visual-topbar">
          <span />
          <span />
          <span />
        </div>
        <div className="visual-grid">
          <div className="visual-main">
            <p className="eyeline">{article.category}</p>
            <h2>{article.title}</h2>
            <p>{article.dek}</p>
          </div>
          <div className="visual-stack">
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
      <div className="floating-note note-one">
        <Clock3 size={16} />
        <span>{article.read_minutes} min read</span>
      </div>
      <div className="floating-note note-two">
        <UsersRound size={16} />
        <span>Editorial review</span>
      </div>
    </div>
  );
}

function ArticleCard({ article, large = false }: { article: Article; large?: boolean }) {
  return (
    <Link className={large ? "article-card article-card-large" : "article-card"} href={`/articles/${article.slug}`}>
      <div className="article-media">
        {article.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.image_url} alt="" />
        ) : (
          <div className="media-fallback">
            <BookOpenText size={large ? 42 : 28} />
          </div>
        )}
      </div>
      <div className="article-content">
        <div className="article-meta">
          <span>{article.category}</span>
          <span>{formatDate(article.published_at)}</span>
        </div>
        <h3>{article.title}</h3>
        <p>{article.dek}</p>
        <div className="article-footer">
          <span>{article.author}</span>
          <span>{article.read_minutes} min</span>
        </div>
      </div>
    </Link>
  );
}

export default async function Home() {
  const articles = await getPublishedArticles();
  const featured = articles.find((article) => article.is_featured) ?? articles[0];
  const latest = articles.filter((article) => article.id !== featured?.id).slice(0, 6);

  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/">
          <span className="brand-mark">OP</span>
          <span>Outpost</span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="#latest">Latest</Link>
          <Link href="#beats">Beats</Link>
          <Link href="#newsroom">Newsroom</Link>
          <Link href="#subscribe">Subscribe</Link>
        </nav>
        <Link className="header-cta" href="#subscribe">
          Book a demo
        </Link>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <h1>One newsroom. Zero chaos.</h1>
          <p>
            Outpost brings breaking coverage, explainers, analysis, and
            reader-first publishing into one fast editorial home.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href={featured ? `/articles/${featured.slug}` : "#latest"}>
              Try Demo <ArrowRight size={18} />
            </Link>
            <Link className="secondary-button" href="#latest">
              Browse latest
            </Link>
          </div>
        </div>
        {featured ? <FeatureVisual article={featured} /> : null}
      </section>

      <section className="promise-strip" aria-label="Editorial promises">
        <div>
          <Globe2 size={22} />
          <span>Global reporting without clutter</span>
        </div>
        <div>
          <Layers3 size={22} />
          <span>Context, timelines, and source notes</span>
        </div>
        <div>
          <Sparkles size={22} />
          <span>Designed for daily reading habits</span>
        </div>
      </section>

      <section className="section-block" id="latest">
        <div className="section-heading">
          <p>Latest coverage</p>
          <h2>Follow the stories shaping the day</h2>
        </div>
        <div className="article-layout">
          {featured ? <ArticleCard article={featured} large /> : null}
          <div className="article-list">
            {latest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="beat-band" id="beats">
        <div className="section-heading">
          <p>Coverage map</p>
          <h2>Built for focused beats, not endless feeds</h2>
        </div>
        <div className="beat-grid">
          {beats.map((beat) => (
            <Link href="#latest" key={beat}>
              <span>{beat}</span>
              <ArrowRight size={17} />
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block newsroom-section" id="newsroom">
        <div className="section-heading">
          <p>Publishing architecture</p>
          <h2>A clean front page powered by Supabase content</h2>
        </div>
        <div className="tool-grid">
          {newsroomTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <article className="tool-card" key={tool.title}>
                <Icon size={26} />
                <h3>{tool.title}</h3>
                <p>{tool.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="demo-cta" id="subscribe">
        <div>
          <h2>Publish sharper stories from a calmer system</h2>
          <p>
            Replace the placeholder data with your Supabase articles table and
            this page becomes a live publishing front page.
          </p>
        </div>
        <form className="subscribe-form">
          <input aria-label="Email address" placeholder="reader@example.com" type="email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <footer className="site-footer">
        <Link className="brand" href="/">
          <span className="brand-mark">OP</span>
          <span>Outpost</span>
        </Link>
        <p>Independent publishing system for fast, trustworthy reporting.</p>
      </footer>
    </main>
  );
}
