import type { BlogPost } from "./types";
import { chunk01 } from "./chunks/chunk01";
import { chunk02 } from "./chunks/chunk02";
import { chunk03 } from "./chunks/chunk03";
import { chunk04 } from "./chunks/chunk04";
import { chunk05 } from "./chunks/chunk05";
import { chunk06 } from "./chunks/chunk06";
import { chunk07 } from "./chunks/chunk07";
import { chunk08 } from "./chunks/chunk08";
import { chunk09 } from "./chunks/chunk09";
import { chunk10 } from "./chunks/chunk10";

export const allBlogPosts: BlogPost[] = [
  ...chunk01,
  ...chunk02,
  ...chunk03,
  ...chunk04,
  ...chunk05,
  ...chunk06,
  ...chunk07,
  ...chunk08,
  ...chunk09,
  ...chunk10,
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allBlogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return allBlogPosts.map((p) => p.slug);
}
