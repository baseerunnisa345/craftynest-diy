import type { Metadata } from "next";
import { PINTEREST_URL, PINTEREST_USERNAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of use for CraftyNest: DIY ideas for personal use, no guarantee of results, and how the site's content may be used.",
};

/** Terms of use for the blog content. */
export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <p className="text-xs font-bold tracking-[0.2em] text-terracotta uppercase">
        Legal
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-stone-500">
        Last updated: November 2026
      </p>
      <p className="mt-5 text-lg leading-relaxed text-stone-700">
        By using CraftyNest, you agree to these terms. If you do not agree,
        please do not use this website.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        Personal use
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        The ideas on CraftyNest are for your personal, non-commercial use.
        You are welcome to try any project at home, share a link to an
        article, and save ideas on Pinterest.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        Ideas and results
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        Our articles describe ideas and suggestions, not guaranteed results.
        Materials, tools, room sizes, and skill levels differ, so your
        result may look different from the photo. Always follow safety
        instructions for any tools or materials you use, work in a safe
        space, and keep children and pets away from sharp tools, hot glue,
        and paint. CraftyNest is not responsible for damage, injury, or
        costs that result from trying a project.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        Content ownership
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        The text, photos, and design of this website belong to CraftyNest
        unless stated otherwise. You may link to our articles and quote
        short passages with credit, but you may not republish full articles
        or copy our photos for commercial use without permission.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        Links to other websites
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        CraftyNest links to Pinterest and may link to other websites for
        reference. We do not control those sites and are not responsible
        for their content or policies.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        Changes to these terms
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        These terms may change from time to time. The date above shows when
        they were last updated. Continuing to use the site after a change
        means you accept the updated terms.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        Contact
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        Questions about these terms can be sent to CraftyNest on Pinterest
        at{" "}
        <a
          href={PINTEREST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-terracotta underline underline-offset-4 hover:text-terracotta-dark"
        >
          {PINTEREST_USERNAME}
        </a>
        .
      </p>
    </div>
  );
}
