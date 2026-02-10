import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'

// Serve static blog files in dev mode before the SPA fallback intercepts them
function serveBlogPlugin() {
  return {
    name: 'serve-blog',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/blog')) {
          let filePath = req.url.split('?')[0];
          if (filePath.endsWith('/')) filePath += 'index.html';
          const fullPath = resolve('public', filePath.slice(1));
          if (existsSync(fullPath)) {
            res.setHeader('Content-Type', 'text/html');
            res.end(readFileSync(fullPath, 'utf-8'));
            return;
          }
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [serveBlogPlugin(), react()],
  // Use subdirectory for GitHub Pages, root for Vercel/other hosts
  base: process.env.GITHUB_ACTIONS ? '/mvp-club-site-2/' : '/',
})
