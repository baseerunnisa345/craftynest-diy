import type { Metadata } from "next";
import { PINTEREST_URL, PINTEREST_USERNAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "CraftyNest's privacy policy: what this site collects, how cookies are used, and how to reach us on Pinterest.",
};

/** Privacy policy — plain, honest, no invented services. */
export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <p className="text-xs font-bold tracking-[0.2em] text-terracotta uppercase">
        Legal
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-stone-500">
        Last updated: November 2026
      </p>
      <p className="mt-5 text-lg leading-relaxed text-stone-700">
        CraftyNest is a small DIY and home decor blog. This page explains
        what information this website collects — and what it does not.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        Information we collect
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        We do not collect personal information directly. This site has no
        accounts, no comments, no newsletter sign-up, and no contact form,
        so we never ask you for your name, email address, or any other
        personal details.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        Hosting and server logs
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        This website is hosted by Vercel. Like most hosting providers,
        Vercel may keep standard server logs to operate and protect the
        site — for example, the pages visited, the browser type, and the
        general location derived from an IP address. We do not receive or
        use those logs to identify individual visitors.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        Cookies and tracking
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        CraftyNest does not use analytics, advertising cookies, or tracking
        pixels. The site does not set cookies to track you across the web.
        Any cookies your browser stores are only those needed for the site
        itself to work.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        Links to other websites
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        This site links to Pinterest, where CraftyNest has an account.
        When you follow a link to Pinterest or any other website, that
        site&apos;s own privacy policy applies, not this one.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        Children&apos;s privacy
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        CraftyNest is a general-audience website and is not directed at
        children under 13. We do not knowingly collect personal information
        from children.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        Changes to this policy
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        If this policy changes — for example, if the site adds a newsletter
        or analytics in the future — this page will be updated and the date
        above will change.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        Contact
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        Questions about this policy can be sent to CraftyNest on Pinterest
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
