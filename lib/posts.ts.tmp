import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";
import { renderInline } from "./markdown";

/** The strict post type. Every publishable article has all of these. */

export interface PostImage {
  file: string;
  alt: string;
}

export interface Design {
  number: number;
  title: string;
  paragraphs: string[];
  image?: PostImage;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  intro: string[];
  designs: Design[];
  takeaway: string[];
  faqs: Faq[];
  images: PostImage[];
  keyword: string;
  draft: boolean;
}

export interface PostProblem {
  slug: string;
  problems: string[];
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const WORD = /[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu;

/** Count words the way the author rules count them. */
export function countWords(text: string): number {
  return text.match(WORD)?.length ?? 0;
}

/** Split a string on '|' — the frontmatter images list uses '|' as the separator. */
function splitPipe(value: string): string[] {
  return value.split("|").map((part) => part.trim());
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item));
  if (typeof value === "string") return splitPipe(value);
  return [];
}

function asBoolean(value: unknown): boolean {
  return value === true || value === "true";
}

/**
 * Validate one post against the author rules. A post with problems is
 * not publishable: it is excluded from every listing, the sitemap and
 * page generation, and the build never fails on it.
 *
 * Checks:
 * - required frontmatter: title, description, date, category, keyword
 * - title starts with the honest count ("30 ...") and the count matches
 *   the number of design sections
 * - every design has a matching frontmatter image (same count, same
 *   order), alt text >= 8 words and starting with the main keyword
 * - design headings are numbered 1..N in order
 * - description <= 155 characters, title <= 60 characters
 * - 7-8 FAQs, each 40-60 words, question ends with "?"
 * - every paragraph rendered from the file is at least 40 words
 */
export function validatePost(post: Post): string[] {
  const problems: string[] = [];

  if (!post.title) problems.push("missing title");
  if (!post.description) problems.push("missing description");
  if (!post.date) problems.push("missing date");
  if (!post.category) problems.push("missing category");
  if (!post.keyword) problems.push("missing keyword");
  if (post.title.length > 60) problems.push("title is over 60 characters");
  if (post.description.length > 155)
    problems.push("description is over 155 characters");

  const titleCount = post.title.match(/^(\d+)\+?\s/)?.[1];
  if (titleCount && Number(titleCount) !== post.designs.length)
    problems.push(
      `title promises ${titleCount} ideas but the article has ${post.designs.length} designs`,
    );
  if (post.images.length !== post.designs.length)
    problems.push(
      `article has ${post.designs.length} designs but ${post.images.length} images`,
    );

  post.designs.forEach((design, index) => {
    if (design.number !== index + 1)
      problems.push(`design ${design.number} is out of order`);
    if (!design.image) problems.push(`design ${design.number} has no image`);
    if (design.image && countWords(design.image.alt) < 8)
      problems.push(`design ${design.number} alt text is under 8 words`);
    if (
      design.image &&
      !design.image.alt.toLowerCase().startsWith(post.keyword.toLowerCase())
    )
      problems.push(
        `design ${design.number} alt text does not start with the main keyword`,
      );
    design.paragraphs.forEach((paragraph) => {
      if (countWords(paragraph) < 40)
        problems.push(
          `design ${design.number} has a paragraph under 40 words`,
        );
    });
  });

  if (post.faqs.length < 7 || post.faqs.length > 8)
    problems.push(`article has ${post.faqs.length} FAQs, expected 7-8`);
  post.faqs.forEach((faq) => {
    if (!faq.question.endsWith("?")) problems.push("FAQ question has no ?");
    const words = countWords(faq.answer);
    if (words < 40 || words > 60)
      problems.push(`FAQ answer is ${words} words, expected 40-60`);
  });

  post.intro.forEach((paragraph) => {
    if (countWords(paragraph) < 40)
      problems.push("intro has a paragraph under 40 words");
  });
  post.takeaway.forEach((paragraph) => {
    if (countWords(paragraph) < 40)
      problems.push("takeaway has a paragraph under 40 words");
  });

  return problems;
}

/**
 * Read one article file and build its post. Throws only when the file
 * itself is malformed (bad frontmatter, bad date). Rule violations do
 * not throw: validatePost() reports them and the post is excluded.
 */
export function parsePost(slug: string, file: string): Post {
  const { data, content } = matter(file);

  const date = String(data.date ?? "");
  if (Number.isNaN(Date.parse(date))) throw new Error(`Bad date: ${date}`);
  const images: PostImage[] = asStringArray(data.images).map((image) => {
    const [fileName, ...altParts] = splitPipe(image);
    return { file: fileName, alt: altParts.join(" | ") };
  });

  const sections = content
    .split(/^##\s+/m)
    .map((section) => section.trim())
    .filter(Boolean);

  const intro: string[] = [];
  const takeaway: string[] = [];
  const faqs: Faq[] = [];
  const designs: Design[] = [];
  let currentFaq: Faq | null = null;

  for (const section of sections) {
    const [heading, ...rest] = section.split("\n");
    if (!heading) continue;
    const body = rest.join("\n").trim();
    const paragraphs = body
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .filter((paragraph) => !paragraph.startsWith("!["))
      .map((paragraph) => renderInline(paragraph));

    if (/^(\d+)\.\s/.test(heading)) {
      const number = Number(heading.match(/^(\d+)\./)?.[1]);
      const title = heading.replace(/^(\d+)\.\s*/, "").trim();
      designs.push({ number, title, paragraphs });
    } else if (heading.toLowerCase().startsWith("takeaway")) {
      takeaway.push(...paragraphs);
    } else if (heading.toLowerCase().startsWith("faq")) {
      const lines = body.split("\n");
      for (const line of lines) {
        const question = line.match(/^###\s+(.*)$/)?.[1]?.trim();
        if (question) {
          currentFaq = { question, answer: "" };
          faqs.push(currentFaq);
        } else if (currentFaq && line.trim()) {
          currentFaq.answer += (currentFaq.answer ? " " : "") + line.trim();
        }
      }
    } else {
      intro.push(...paragraphs);
    }
  }

  const post: Post = {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date,
    category: String(data.category ?? ""),
    intro,
    designs: designs.map((design, index) => ({
      ...design,
      image: images[index],
    })),
    takeaway,
    faqs,
    images,
    keyword: String(data.keyword ?? ""),
    draft: asBoolean(data.draft),
  };

  return post;
}

function readPostFile(fileName: string): Post {
  const filePath = path.join(POSTS_DIR, fileName);
  const slug = fileName.replace(/\.md$/, "");
  return parsePost(slug, fs.readFileSync(filePath, "utf8"));
}

function allFiles(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort();
}

/** Every article that passes validation and is not a draft. */
export function getAllPosts(): Post[] {
  return allFiles()
    .map((fileName) => readPostFile(fileName))
    .filter((post) => !post.draft && validatePost(post).length === 0)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const post = allFiles()
    .map((fileName) => readPostFile(fileName))
    .find((candidate) => candidate.slug === slug);
  if (!post || post.draft || validatePost(post).length > 0) return null;
  return post;
}

/** Validation problems for every article file, for the author to fix. */
export function listPostProblems(): PostProblem[] {
  return allFiles()
    .map((fileName) => readPostFile(fileName))
    .map((post) => ({ slug: post.slug, problems: validatePost(post) }))
    .filter((entry) => entry.problems.length > 0);
}
