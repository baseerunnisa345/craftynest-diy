import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getAllPosts } from "@/lib/posts";
import { PINTEREST_URL, PINTEREST_USERNAME } from "@/lib/site";

/**
 * Homepage: hero, browse by category, latest articles, and a short
 * "why CraftyNest" section. When no real article exists yet, the page
 * says so honestly instead of showing invented content.
 */
export default function Home() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <div>
      {/* Hero */}
      <section className="texture-dots border-b border-amber-900/10 bg-parchment">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:py-20">
          <p className="text-xs font-bold tracking-[0.2em] text-terracotta uppercase">
            DIY Crafts &amp; Home Decor Ideas
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight font-semibold text-stone-900 sm:text-6xl">
            Make something beautiful at home
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">
            Easy DIY crafts and home decor ideas you can actually make at
            home. Every article is a numbered list of ideas with a photo for
            each one — browse, save your favourites, and try something new
            this week.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/posts"
              className="rounded-full bg-terracotta px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-terracotta-dark"
            >
              Browse all ideas
            </Link>
            <a
              href={PINTEREST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-terracotta/40 bg-white px-6 py-3 text-sm font-bold text-terracotta transition-colors hover:border-terracotta hover:bg-amber-50"
            >
              Follow on Pinterest ({PINTEREST_USERNAME})
            </a>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
            <div className="rounded-xl bg-white/70 px-4 py-3 shadow-sm">
              <p className="font-display text-lg font-semibold text-stone-900">
                Numbered idea lists
              </p>
              <p className="mt-1 text-sm text-stone-600">
                Clear, scannable lists — find an idea in seconds.
              </p>
            </div>
            <div className="rounded-xl bg-white/70 px-4 py-3 shadow-sm">
              <p className="font-display text-lg font-semibold text-stone-900">
                One photo per idea
              </p>
              <p className="mt-1 text-sm text-stone-600">
                See exactly what each idea looks like before you start.
              </p>
            </div>
            <div className="rounded-xl bg-white/70 px-4 py-3 shadow-sm">
              <p className="font-display text-lg font-semibold text-stone-900">
                Made to actually try
              </p>
              <p className="mt-1 text-sm text-stone-600">
                Simple materials, honest steps, and realistic results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by category */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h2 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl">
          Browse by category
        </h2>
        {categories.length > 0 ? (
          <p className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c}
                href="/posts"
                className="rounded-full border border-amber-900/15 bg-white px-4 py-2 text-sm font-semibold text-amber-900 shadow-sm transition-colors hover:border-terracotta hover:text-terracotta"
              >
                {c}
              </Link>
            ))}
          </p>
        ) : (
          <p className="mt-4 max-w-2xl text-stone-600">
            Categories will appear here as the first articles are published —
            room decor, seasonal crafts, and easy weekend projects.
          </p>
        )}
      </section>

      {/* Latest articles */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl">
            Latest ideas
          </h2>
          {posts.length > 0 && (
            <Link
              href="/posts"
              className="text-sm font-bold text-terracotta underline underline-offset-4 hover:text-terracotta-dark"
            >
              Browse all ideas →
            </Link>
          )}
        </div>
        {posts.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-amber-900/25 bg-parchment p-6 text-stone-600">
            No articles published yet — the first article is on its way.
            Follow us on Pinterest to see new ideas as soon as they are
            published.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Why CraftyNest */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <div className="rounded-2xl bg-parchment px-6 py-10 sm:px-10">
          <h2 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl">
            Why CraftyNest?
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="font-display text-lg font-semibold text-stone-900">
                Honest counts
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                When an article says 20 ideas, it has 20 ideas — and 20
                photos to match. No padded lists, no missing pictures.
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-stone-900">
                Beginner-friendly
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Ideas are written for real homes and real weekends, with
                materials you can actually find.
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-stone-900">
                Save it for later
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Every idea list is made to be saved on Pinterest, so your
                next project is always one tap away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pinterest CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-4 text-center">
        <h2 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl">
          Save ideas for later
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-stone-600">
          Follow CraftyNest on Pinterest for new DIY crafts and home decor
          ideas every week.
        </p>
        <p className="mt-5">
          <a
            href={PINTEREST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-terracotta-dark"
          >
            Follow {PINTEREST_USERNAME} on Pinterest
          </a>
        </p>
      </section>
    </div>
  );
}
