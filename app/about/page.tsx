import type { Metadata } from "next";
import { PINTEREST_URL, PINTEREST_USERNAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | DIY Crafts & Home Decor Ideas",
  description:
    "CraftyNest shares easy DIY crafts and home decor ideas you can make at home — numbered idea lists with a photo for every idea.",
};

/** About page — who CraftyNest is and how its articles are made. */
export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <p className="text-xs font-bold tracking-[0.2em] text-terracotta uppercase">
        About
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
        About CraftyNest
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-stone-700">
        CraftyNest is a DIY and home decor blog for anyone who likes making
        their home feel more personal — without spending a fortune or
        redecorating the whole house. Every article here is a list of ideas
        you can actually try at home, from room decor and seasonal crafts to
        easy weekend projects.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        What we share
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        Our articles focus on practical, doable ideas: room decor, wall
        decor, bedroom and living room ideas, seasonal projects, and simple
        crafts for the home. We write for beginners and for people who just
        want one good idea for a Saturday afternoon — not for professional
        renovators.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        How our articles are made
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        Every article on CraftyNest follows the same honest format:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-stone-700">
        <li>
          <strong>Numbered idea lists.</strong> Each article is a list of
          ideas, numbered 1 to N, so you always know how many ideas you are
          getting.
        </li>
        <li>
          <strong>One photo per idea.</strong> Every idea has its own photo,
          so you can see what it looks like before you start. If an article
          says 20 ideas, it has 20 photos to match.
        </li>
        <li>
          <strong>Ideas described honestly.</strong> Each idea is explained
          in plain words — what it is, what you need, and how to do it —
          without promising results we cannot guarantee.
        </li>
        <li>
          <strong>Questions answered.</strong> Each article ends with
          answers to the questions readers actually ask about the topic.
        </li>
      </ul>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        What we do not do
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        We do not pad lists with filler, publish articles without photos, or
        claim results we have not described. If an idea needs a tool, a
        material, or a bit of patience, we say so.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        Find us on Pinterest
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        CraftyNest lives on Pinterest as well as here. Follow us at{" "}
        <a
          href={PINTEREST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-terracotta underline underline-offset-4 hover:text-terracotta-dark"
        >
          {PINTEREST_USERNAME}
        </a>{" "}
        to save ideas for later and see new articles as soon as they are
        published.
      </p>
    </div>
  );
}
