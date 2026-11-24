import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "All DIY Crafts & Home Decor Ideas",
  description:
    "Browse every DIY crafts and home decor idea list on CraftyNest, newest first.",
};

/** Index of every published article, newest first. */
export default function AllPosts() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <p className="text-xs font-bold tracking-[0.2em] text-terracotta uppercase">
        CraftyNest
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
        All Ideas
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
        Every DIY crafts and home decor idea list on CraftyNest, newest
        first. Each article is a numbered list of ideas with a photo for
        every idea.
      </p>
      {posts.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-amber-900/25 bg-parchment p-6 text-stone-600">
          No articles published yet — the first article is on its way.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
