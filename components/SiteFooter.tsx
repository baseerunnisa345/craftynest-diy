import Link from "next/link";
import { PINTEREST_URL, PINTEREST_USERNAME, SITE_NAME } from "@/lib/site";

/** Site footer: brand line + links to every page. Shown on every page. */
export default function SiteFooter() {
  return (
    <footer className="mt-16 bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-semibold text-amber-100">
              {SITE_NAME}
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              Easy DIY crafts and home decor ideas you can make at home.
              Every article is a numbered list of ideas, with a photo for
              each one.
            </p>
            <p className="mt-3 text-sm">
              <a
                href={PINTEREST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-amber-200 underline underline-offset-4 hover:text-amber-100"
              >
                Follow CraftyNest on Pinterest ({PINTEREST_USERNAME})
              </a>
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm"
          >
            <Link href="/" className="hover:text-amber-200">
              Home
            </Link>
            <Link href="/posts" className="hover:text-amber-200">
              All Ideas
            </Link>
            <Link href="/about" className="hover:text-amber-200">
              About
            </Link>
            <Link href="/contact" className="hover:text-amber-200">
              Contact
            </Link>
            <Link href="/privacy-policy" className="hover:text-amber-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-amber-200">
              Terms of Service
            </Link>
            <Link href="/disclosure" className="hover:text-amber-200">
              Disclosure
            </Link>
          </nav>
        </div>
        <p className="mt-8 border-t border-stone-700 pt-5 text-xs text-stone-400">
          © 2026 {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
