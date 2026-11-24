import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

/** Static pages that always belong in the sitemap. */
const STATIC_PAGES = [
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclosure",
] as const;

/**
 * Sitemap, auto-generated from the article files on every build.
 * Served at /sitemap.xml. Drafts and invalid posts are excluded by
 * getAllPosts(), so only publishable articles appear here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...STATIC_PAGES.map((page) => ({
      url: `${SITE_URL}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/posts/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
