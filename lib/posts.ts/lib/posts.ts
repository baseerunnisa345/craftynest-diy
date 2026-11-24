import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderInline } from "@/lib/markdown";

// File-driven article model.
//
// Articles live in content/posts/<slug>.md. Each file has YAML frontmatter
// (title, description, date, category, draft?) followed by this layout:
//   ## N. <Design title>
//   ![<alt text, 8+ words>](<file.svg>)
//   <paragraphs>
//   ## FAQ
//   ### <question>
//   <answer, 40–60 words>
//   ...
//
// HONEST-COUNT RULE (from the Pinterest Master Prompt, Section 5.6):
// the number in the article title MUST equal the number of `## N.`
// sections, and every design MUST have an image. These are checked at
// build time by validatePost() — a mismatch fails the build rather
// than publishing a wrong count or a picture-less idea.

export interface DesignImage {
  file: string;
  alt: string;
}

export interface Design {
  number: number;
  title: string;
  image?: DesignImage;
  paragraphs: string[];
}

export interface Faq {
  question: string;
  /** Plain-text answer, exactly as shown on the page (40–60 words). */
  answer: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  draft: boolean;
  designs: Design[];
  faqs: Faq[];
  /** Images from the article's design blocks, in order. */
  images: DesignImage[];
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function parseMarkdown(slug: string, source: string): Post {
  const { data, content } = matter(source);
  const designs: Design[] = [];
  const faqs: Faq[] = [];
  let current: Design | null = null;
  let currentFaq: Faq | null = null;
  let inFaq = false;
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (line.startsWith("## FAQ")) {
      inFaq = true;
      current = null;
      continue;
    }
    const designHeading = line.match(/^##\s+(\d+)\.\s+(.+)$/);
    if (designHeading && !inFaq) {
      current = {
        number: Number(designHeading[1]),
        title: designHeading[2].trim(),
        paragraphs: [],
      };
      designs.push(current);
      continue;
    }
    const faqHeading = line.match(/^###\s+(.+)$/);
    if (faqHeading && inFaq) {
      currentFaq = { question: faqHeading[1].trim(), answer: "" };
      faqs.push(currentFaq);
      continue;
    }
    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch && current) {
      current.image = {
        alt: imageMatch[1].trim(),
        file: imageMatch[2].trim(),
      };
      continue;
    }
    if (!line) continue;
    if (currentFaq) {
      currentFaq.answer = currentFaq.answer
        ? `${currentFaq.answer} ${line.trim()}`
        : line.trim();
    } else if (current) {
      current.paragraphs.push(renderInline(line));
    }
  }
  return {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    category: String(data.category ?? ""),
    draft: data.draft === true,
    designs,
    faqs,
    images: designs
      .map((d) => d.image)
      .filter((img): img is DesignImage => Boolean(img)),
  };
}

/**
 * Build-time validation. Throws on the first problem found, so a bad
 * article can never be published silently.
 */
function validatePost(post: Post): void {
  const problems: string[] = [];
  const titleCount = post.title.match(/^(\d+)\+?\s/)?.[1];
  if (titleCount && Number(titleCount) !== post.designs.length) {
    problems.push(
      `title count (${titleCount}) != design count (${post.designs.length})`,
    );
  }
  for (const d of post.designs) {
    if (!d.image) problems.push(`design ${d.number} ("${d.title}") has no image`);
    if (d.image && (!d.image.alt || d.image.alt.split(" ").length < 8)) {
      problems.push(
        `design ${d.number} ("${d.title}") image alt is under 8 words`,
      );
    }
  }
  if (post.faqs.length < 7 || post.faqs.length > 8) {
    problems.push(`FAQ count is ${post.faqs.length}, expected 7–8`);
  }
  for (const faq of post.faqs) {
    const words = faq.answer.split(/\s+/).filter(Boolean).length;
    if (words < 40 || words > 60) {
      problems.push(
        `FAQ "${faq.question}" answer is ${words} words, expected 40–60`,
      );
    }
  }
  if (!post.description || post.description.length > 155) {
    problems.push("description must be present and at most 155 characters");
  }
  if (!post.title || post.title.length > 60) {
    problems.push("title must be present and at most 60 characters");
  }
  if (problems.length > 0) {
    throw new Error(`Invalid post ${post.slug}: ${problems.join("; ")}`);
  }
}

function readPostFile(slug: string): Post | null {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const post = parseMarkdown(slug, fs.readFileSync(file, "utf8"));
  validatePost(post);
  return post;
}

/** All published articles, newest first. Drafts are never listed. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readPostFile(f.replace(/\.md$/, "")))
    .filter((p): p is Post => p !== null && !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const post = readPostFile(slug);
  return post && !post.draft ? post : null;
}
