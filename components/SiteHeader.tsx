import Link from "next/link";
import { PINTEREST_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

/** Site header: brand + main navigation. Sticky, shown on every page. */
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-900/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:py-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display text-2xl font-semibold tracking-tight text-terracotta sm:text-3xl">
            {SITE_NAME}
          </span>
          <span className="text-[11px] font-bold tracking-widest text-stone-500 uppercase">
            {SITE_TAGLINE}
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-semibold text-stone-700"
        >
          <Link href="/" className="hover:text-terracotta">
            Home
          </Link>
          <Link href="/posts" className="hover:text-terracotta">
            All Ideas
          </Link>
          <Link href="/about" className="hover:text-terracotta">
            About
          </Link>
          <Link href="/contact" className="hover:text-terracotta">
            Contact
          </Link>
          <a
            href={PINTEREST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-terracotta px-3.5 py-1.5 text-white shadow-sm transition-colors hover:bg-terracotta-dark"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 fill-current"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.08 2.46 7.58 5.99 9.13-.08-.78-.16-1.98.03-2.83.17-.72 1.1-4.6 1.1-4.6s-.28-.56-.28-1.39c0-1.3.75-2.27 1.69-2.27.8 0 1.18.6 1.18 1.31 0 .8-.51 2-.77 3.11-.22.93.46 1.68 1.37 1.68 1.65 0 2.92-1.74 2.92-4.25 0-2.22-1.6-3.77-3.88-3.77-2.64 0-4.19 1.98-4.19 4.03 0 .8.31 1.65.69 2.12.08.09.09.17.07.27-.07.3-.24.96-.27 1.09-.04.18-.14.22-.33.13-1.25-.58-2.03-2.4-2.03-3.87 0-3.15 2.29-6.04 6.6-6.04 3.46 0 6.16 2.47 6.16 5.77 0 3.44-2.17 6.21-5.18 6.21-1.01 0-1.96-.53-2.29-1.15l-.62 2.37c-.23.87-.84 1.96-1.25 2.62.94.29 1.94.45 2.97.45 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
            Pinterest
          </a>
        </nav>
      </div>
    </header>
  );
}
