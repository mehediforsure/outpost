'use client';

import React from 'react';

// ─── Types ──────────────────────────────────────────────────────
export interface NewsArticle {
  id: string | number;
  title: string;
  original_summary: string;
  ai_rewrite: string;
  source_feed: string;
  created_at: string;
}

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

// ─── Helpers ─────────────────────────────────────────────────────
function extractDomain(url: string): string {
  try {
    const host = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    return host.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function formatRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60)        return `${diff}s ago`;
  if (diff < 3600)      return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)     return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// Category color accent map (matched to source domain patterns)
function getCategoryColor(source: string): string {
  const s = source.toLowerCase();
  if (s.includes('tech') || s.includes('ars') || s.includes('wired'))  return 'rgba(0,212,255,0.7)';
  if (s.includes('ai') || s.includes('openai') || s.includes('anthro')) return 'rgba(167,139,250,0.7)';
  if (s.includes('bloomberg') || s.includes('forbes'))                  return 'rgba(240,165,0,0.7)';
  return 'rgba(240,165,0,0.7)'; // default gold
}

// ─── NewsCard Component ───────────────────────────────────────────
export function NewsCard({ article, index }: NewsCardProps) {
  const domain = extractDomain(article.source_feed);
  const timeAgo = formatRelativeTime(article.created_at);
  const accentColor = getCategoryColor(article.source_feed);
  const delay = `${index * 60}ms`;

  return (
    <article
      className="news-card card-enter"
      style={{ animationDelay: delay }}
    >
      <div style={{ padding: '22px 24px 20px' }}>

        {/* ── Top Meta Row ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          {/* Source badge */}
          <span className="source-badge">
            <span style={{
              display: 'inline-block',
              width: 6, height: 6,
              borderRadius: '50%',
              background: accentColor,
              flexShrink: 0,
            }} />
            {domain}
          </span>

          {/* AI rewrite indicator */}
          <span className="ai-badge">✦ AI</span>
        </div>

        {/* ── Title ── */}
        <h2 className="font-display" style={{
          fontSize: 'clamp(16px, 2.2vw, 19px)',
          fontWeight: 700,
          lineHeight: 1.35,
          color: 'var(--text-primary)',
          marginBottom: '12px',
          letterSpacing: '-0.01em',
        }}>
          {article.title}
        </h2>

        {/* ── Divider ── */}
        <div style={{
          height: 1,
          background: 'var(--border-subtle)',
          marginBottom: '14px',
        }} />

        {/* ── AI Rewrite Body ── */}
        <p style={{
          fontSize: '13.5px',
          lineHeight: 1.75,
          color: 'var(--text-secondary)',
          display: '-webkit-box',
          WebkitLineClamp: 5,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {article.ai_rewrite}
        </p>

        {/* ── Bottom Row ── */}
        <div style={{
          marginTop: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Timestamp */}
          <span className="timestamp">{timeAgo}</span>

          {/* Read source link */}
          <a
            href={article.source_feed.startsWith('http') ? article.source_feed : `https://${article.source_feed}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              opacity: 0.75,
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}
          >
            Source
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8L8 1M8 1H3M8 1V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── Skeleton Card ────────────────────────────────────────────────
export function NewsCardSkeleton() {
  return (
    <div className="news-card" style={{ padding: '22px 24px 20px' }}>
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div className="skeleton" style={{ width: 100, height: 20 }} />
        <div className="skeleton" style={{ width: 40, height: 20 }} />
      </div>
      {/* Title lines */}
      <div className="skeleton" style={{ width: '90%', height: 20, marginBottom: 8 }} />
      <div className="skeleton" style={{ width: '65%', height: 20, marginBottom: 16 }} />
      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: 14 }} />
      {/* Body lines */}
      {[100, 95, 88, 92, 70].map((w, i) => (
        <div key={i} className="skeleton" style={{ width: `${w}%`, height: 14, marginBottom: i < 4 ? 8 : 0 }} />
      ))}
      {/* Bottom row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
        <div className="skeleton" style={{ width: 55, height: 12 }} />
        <div className="skeleton" style={{ width: 50, height: 12 }} />
      </div>
    </div>
  );
}
