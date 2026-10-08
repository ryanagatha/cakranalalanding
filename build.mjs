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
