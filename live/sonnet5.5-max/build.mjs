import { build } from 'esbuild'
await build({ entryPoints: ['src/standalone.ts'], bundle: true, minify: true, format: 'iife', target: 'es2020', outfile: 'castle.js' })
console.log('已生成 castle.js')
