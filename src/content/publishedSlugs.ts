export const PUBLISHED_BLOG_SLUGS = new Set<string>([]);

export const PUBLISHED_LEARN_SLUGS = new Set<string>([
  'how-ai-changes-your-job',
  'claude-for-professional-work',
  'ai-for-learning-development',
  'what-is-vibe-coding',
  'ai-learning-path',
  'ai-beginner-mistakes',
  'claude-skills-guide',
  'become-the-ai-person',
  'career-advantage-ai-practice',
]);

export const isPublishedBlog = (slug: string) => PUBLISHED_BLOG_SLUGS.has(slug);
export const isPublishedLearn = (slug: string) => PUBLISHED_LEARN_SLUGS.has(slug);
