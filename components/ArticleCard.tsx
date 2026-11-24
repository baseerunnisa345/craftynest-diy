import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";

/**
 * Card for one article in a list / related-articles grid.
 * Shows the article's first photo in a portrait crop; when an article
 * has no photo yet, it shows a warm placeholder block instead of
 * pretending a photo exists.
 */
export default function ArticleCard({ post }: { post: Post }) {
  const cover = post.images[0];
  return (
    <article className="overflow-hidden rounded-2xl border border-amber-900/10 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link href={`/posts/${post.slug}`} className="block">
        {cover ? (
          <Image
            src={`/images/${post.slug}/${cover.file}`}
            alt={cover.alt}
            width={768}
            height={1152}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="aspect-[4/5] w-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 px-6 text-center"
          >
            <span className="font-display text-4xl font-semibold text-terracotta">
              CraftyNest
            </span>
            <span className="text-xs font-bold tracking-widest text-stone-500 uppercase">
              {post.category}
            </span>
          </div>
        )}
        <div className="p-5">
          <p className="text-xs font-bold tracking-widest text-terracotta uppercase">
            {post.category}
          </p>
          <h3 className="mt-2 font-display text-xl leading-snug font-semibold text-stone-900">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-600">
            {post.description}
          </p>
          <p className="mt-3 text-xs font-semibold text-stone-500">
            {post.designs.length} ideas ·{" "}
            <time dateTime={post.date}>{post.date}</time>
          </p>
        </div>
      </Link>
    </article>
  );
}
