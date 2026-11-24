import type { Metadata } from "next";
import { PINTEREST_URL, PINTEREST_USERNAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclosure",
  description:
    "CraftyNest currently earns nothing from this site — no affiliate links, ads, or sponsored content. If that changes, this page will be updated.",
};

/** Affiliate / advertising disclosure — currently nothing to disclose. */
export default function Disclosure() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <p className="text-xs font-bold tracking-[0.2em] text-terracotta uppercase">
        Legal
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
        Disclosure
      </h1>
      <p className="mt-4 text-sm text-stone-500">
        Last updated: November 2026
      </p>
      <p className="mt-5 text-lg leading-relaxed text-stone-700">
        CraftyNest currently earns nothing from this website. There are no
        affiliate links, no display ads, and no sponsored content on this
        site.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        What that means
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-stone-700">
        <li>
          <strong>No affiliate links.</strong> When we mention a material
          or a tool, the link — if there is one — is not an affiliate link,
          and we earn nothing if you buy it.
        </li>
        <li>
          <strong>No ads.</strong> This site does not show display
          advertising.
        </li>
        <li>
          <strong>No sponsored content.</strong> No article on CraftyNest
          has been paid for by a brand, and we have not received free
          products in exchange for featuring them.
        </li>
      </ul>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        If that changes
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        If CraftyNest starts earning from the site in the future — for
        example, through affiliate links, ads, or sponsored posts — this
        page will be updated, and any article that contains an affiliate
        link or sponsored content will say so clearly at the top of the
        article.
      </p>
      <p className="mt-3 leading-relaxed text-stone-700">
        Until then, every recommendation on this site is made simply
        because we think the idea is worth trying.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        Contact
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        Questions about this disclosure can be sent to CraftyNest on
        Pinterest at{" "}
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
