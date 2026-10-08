import {copyFile, mkdir, readFile, rm} from 'node:fs/promises';
import {build} from 'esbuild';
await build({
  entryPoints: ['src/remotion/mount.jsx'],
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2020'],
  outfile: 'assets/motion-engine.js',
  define: {'process.env.NODE_ENV': '"production"'},
  legalComments: 'linked',
  logLevel: 'info',
});

// Publish only runtime files, never the repository or installed dependencies.
const pages = ['index.html', 'styles.css', 'script.js'];
const assets = new Set(['assets/motion-engine.js', 'assets/motion-engine.js.LEGAL.txt']);
for (const file of pages) {
  const source = await readFile(file, 'utf8');
  for (const match of source.matchAll(/assets\/[a-zA-Z0-9_.-]+/g)) assets.add(match[0]);
}
await rm('dist', {recursive: true, force: true});
await mkdir('dist/assets', {recursive: true});
for (const file of [...pages, ...assets]) await copyFile(file, `dist/${file}`);
console.log(`Static site ready in dist/ (${pages.length + assets.size} files).`);
