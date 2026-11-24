import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, type Design } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

/**
 * Article page: only the slugs that exist at build time are built.
 * No fallback route — unknown slugs return a 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const firstImage =
    post.images[0] && post.designs[0]?.image
      ? `${SITE_URL}/images/${slug}/${post.images[0].file}`
      : undefined;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/posts/${slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/posts/${slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: firstImage ? [{ url: firstImage }] : undefined,
    },
  };
}

/** Article structured data (schema.org Article). */
function articleJsonLd({
  post,
  slug,
}: {
  post: NonNullable<ReturnType<typeof getPostBySlug>>;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "CraftyNest" },
    mainEntityOfPage: `${SITE_URL}/posts/${slug}`,
  };
}

function DesignBlock({ design, slug }: { design: Design; slug: string }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-stone-900">
        {design.number}. {design.title}
      </h2>
      {design.image && (
        <div className="relative mt-4 aspect-2/3 w-full overflow-hidden rounded-xl bg-stone-100">
          <Image
            src={`/images/${slug}/${design.image.file}`}
            alt={design.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      )}
      <div className="mt-4 space-y-4 text-base leading-relaxed text-stone-700">
        {design.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

export default async function PostPage({
  params,
}: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const related = getAllPosts().filter((p) => p.slug !== slug).slice(0, 2);
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd({ post, slug })),
        }}
      />
      <nav className="text-sm text-stone-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-amber-800 hover:underline">
          Home
        </Link>
        {" / "}
        <Link
          href="/posts"
          className="hover:text-amber-800 hover:underline"
        >
          All ideas
        </Link>
        {" / "}
        <span aria-current="page">{post.title}</span>
      </nav>
      <h1 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-stone-900 sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-stone-500">
        <time dateTime={post.date}>{post.date}</time> · {post.designs.length}{" "}
        ideas · {post.category}
      </p>
      <p className="mt-4 text-lg leading-relaxed text-stone-600">
        {post.description}
      </p>
      {post.designs.map((design) => (
        <DesignBlock key={design.number} design={design} slug={slug} />
      ))}
      {related.length > 0 && (
        <section className="mt-12 border-t border-stone-200 pt-8">
          <h2 className="text-xl font-bold text-stone-900">
            More ideas to try
          </h2>
          <ul className="mt-4 space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/posts/${r.slug}`}
                  className="font-semibold text-amber-800 underline underline-offset-4 hover:text-amber-900"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <p className="mt-10">
        <Link
          href="/posts"
          className="font-semibold text-amber-800 underline underline-offset-4 hover:text-amber-900"
        >
          ← Back to all ideas
        </Link>
      </p>
    </article>
  );
}
