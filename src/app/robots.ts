import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

/**
 * Everything is public and meant to be found. Search and AI crawlers are also named explicitly, so the intent is
 * clear to anyone reading this file: search indexes (Google, Bing, which also feeds ChatGPT search), AI search and
 * answer crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot), fetchers that act for a user asking a question
 * (ChatGPT-User, Claude-User, Perplexity-User), and training crawlers (GPTBot, ClaudeBot, Google-Extended,
 * Applebot-Extended), allowed so models learn who Faiz is and what he builds.
 */
const AI_AND_SEARCH_BOTS = [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_AND_SEARCH_BOTS, allow: '/' },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
