import type { Metadata } from "next";
import { PINTEREST_URL, PINTEREST_USERNAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | DIY Crafts & Home Decor Ideas",
  description:
    "The best way to reach CraftyNest is on Pinterest at @ezraashere223. Find out how to get in touch about an idea or a question.",
};

/** Contact page — the only way to reach CraftyNest is Pinterest. */
export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <p className="text-xs font-bold tracking-[0.2em] text-terracotta uppercase">
        Contact
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
        Contact CraftyNest
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-stone-700">
        We would love to hear from you — whether you tried an idea from one
        of our articles, have a question about a project, or want to suggest
        a topic for a future list.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        The best way to reach us
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        The best way to reach CraftyNest is on Pinterest. Find us at{" "}
        <a
          href={PINTEREST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-terracotta underline underline-offset-4 hover:text-terracotta-dark"
        >
          {PINTEREST_USERNAME}
        </a>{" "}
        — follow the account and send a message there.
      </p>
      <p className="mt-3 leading-relaxed text-stone-700">
        CraftyNest does not have a public email address or phone number, so
        Pinterest is the way to get in touch.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-stone-900">
        What to include in your message
      </h2>
      <p className="mt-3 leading-relaxed text-stone-700">
        To help us answer, it helps to mention:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-stone-700">
        <li>Which article or idea your message is about.</li>
        <li>What you are making, or what went differently than expected.</li>
        <li>What you would like us to cover in a future article.</li>
      </ul>
      <p className="mt-4 leading-relaxed text-stone-700">
        Thank you for reading CraftyNest — every message helps us make the
        next list of ideas better.
      </p>
    </div>
  );
}
