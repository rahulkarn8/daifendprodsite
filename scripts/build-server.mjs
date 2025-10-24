import { build } from 'esbuild';

await build({
  entryPoints: ['server/index.ts'], // change if your entry differs
  platform: 'node',
  packages: 'external',
  bundle: true,
  format: 'esm',
  outfile: 'dist/index.js',
  sourcemap: false,
});

console.log('✅ Server built → dist/index.js');
