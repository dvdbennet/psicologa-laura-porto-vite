import { defineConfig, type Plugin } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react';
import brasiliaSeo from './src/seo/brasilia.json';
import exteriorSeo from './src/seo/exterior.json';

type RouteSeo = { path: string; url: string; title: string; description: string; jsonLd?: object };

const escapeAttr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

// Emits dist/<route>/index.html with route-specific title/description (and JSON-LD) in the raw HTML.
function routeStaticHtml(routes: RouteSeo[]): Plugin {
  return {
    name: 'route-static-html',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const index = bundle['index.html'];
      if (!index || index.type !== 'asset') {
        throw new Error('route-static-html: index.html not found in bundle');
      }

      for (const { path, url, title, description, jsonLd } of routes) {
        const replacements: [string, RegExp, string][] = [
          ['title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`],
          ['description', /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeAttr(description)}" />`],
          ['og:title', /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeAttr(title)}" />`],
          ['og:description', /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeAttr(description)}" />`],
          ['og:url', /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`],
          ['twitter:title', /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeAttr(title)}" />`],
          ['twitter:description', /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escapeAttr(description)}" />`],
          ['canonical', /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`],
        ];

        let html = String(index.source);
        for (const [name, pattern, replacement] of replacements) {
          if (!pattern.test(html)) {
            throw new Error(`route-static-html: tag "${name}" not found in index.html (${path})`);
          }
          html = html.replace(pattern, replacement);
        }

        if (jsonLd) {
          const script = `<script type="application/ld+json" data-route-jsonld>${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`;
          html = html.replace('</head>', `    ${script}\n  </head>`);
        }

        this.emitFile({ type: 'asset', fileName: `${path.replace(/^\//, '')}/index.html`, source: html });
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths({ projects: ['./tsconfig.app.json'] }), routeStaticHtml([exteriorSeo, brasiliaSeo])],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
