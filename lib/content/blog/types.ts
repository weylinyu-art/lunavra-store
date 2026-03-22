export interface BlogPost {
  slug: string;
  title: string;
  seoKeyword: string;
  metaDescription: string;
  relatedProductIds: string[];
  /** Markdown-like: paragraphs separated by blank lines; ## and ### for headings */
  body: string;
}
