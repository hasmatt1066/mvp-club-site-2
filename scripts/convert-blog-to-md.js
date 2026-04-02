/**
 * Convert blog posts from JSON (content/blog/*.json) to Markdown (src/content/blog/*.md)
 * with YAML frontmatter. Uses turndown for HTML-to-Markdown conversion.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import TurndownService from 'turndown';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const OUTPUT_DIR = path.join(ROOT, 'src', 'content', 'blog');

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

// Read all JSON files (skip index.json)
const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json') && f !== 'index.json');

let converted = 0;

for (const file of files) {
  const filePath = path.join(CONTENT_DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const { title, slug, description, author, date, pillar, content } = data;

  // Convert HTML content to Markdown
  let mdContent;
  try {
    mdContent = turndown.turndown(content || '');
  } catch (e) {
    console.warn(`Warning: Could not convert ${file} to markdown, using raw HTML`);
    mdContent = content || '';
  }

  // Escape any quotes in frontmatter values
  const escapeYaml = (str) => {
    if (!str) return '""';
    // If string contains special chars, wrap in quotes and escape internal quotes
    if (str.includes(':') || str.includes('"') || str.includes("'") || str.includes('#') || str.includes('\n')) {
      return `"${str.replace(/"/g, '\\"')}"`;
    }
    return `"${str}"`;
  };

  const frontmatter = [
    '---',
    `title: ${escapeYaml(title)}`,
    `description: ${escapeYaml(description || '')}`,
    `author: ${escapeYaml(author)}`,
    `date: ${escapeYaml(date)}`,
    pillar ? `pillar: ${escapeYaml(pillar)}` : null,
    '---',
  ].filter(Boolean).join('\n');

  const outputFile = path.join(OUTPUT_DIR, `${slug}.md`);
  fs.writeFileSync(outputFile, `${frontmatter}\n\n${mdContent}\n`);
  converted++;
  console.log(`Converted: ${slug}`);
}

console.log(`\nDone! Converted ${converted} blog posts to ${OUTPUT_DIR}`);
