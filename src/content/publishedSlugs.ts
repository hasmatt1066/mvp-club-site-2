export const PUBLISHED_BLOG_SLUGS = new Set<string>([]);

export const PUBLISHED_LEARN_SLUGS = new Set<string>([
  'how-ai-changes-your-job',
  'claude-for-professional-work',
]);

export const isPublishedBlog = (slug: string) => PUBLISHED_BLOG_SLUGS.has(slug);
export const isPublishedLearn = (slug: string) => PUBLISHED_LEARN_SLUGS.has(slug);
