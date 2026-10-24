import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const order = ['core', 'sky', 'props', 'characters', 'island', 'terrain', 'castle', 'main'];
const urls = new Map();

const parts = order.map((name) => {
  const file = path.join(root, 'src', `${name}.js`);
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/from\s+'(\.\/[^']+)'/g, (m, spec) => {
    const key = spec.replace('./', '');
    if (!urls.has(key)) throw new Error(`missing module ${key} while bundling ${name}`);
    return `from '${urls.get(key)}'`;
  });
  const url = `__BLOB_${name}__`;
  urls.set(`${name}.js`, url);
  return { name, code, url };
});

const loader = `const SRC = {};
${parts.map((p) => `SRC[${JSON.stringify(p.name)}] = ${JSON.stringify(p.code)};`).join('\n')}
const urls = {};
for (const n of ${JSON.stringify(order)}) {
  const code = SRC[n].replace(/__BLOB_([a-z]+)__/g, (m, dep) => urls[dep]);
  urls[n] = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
}
await import(urls['main']);`;

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const out = html.replace('<script type="module" src="./src/main.js"></script>', `<script type="module">\n${loader}\n</script>`);
if (out === html) throw new Error('script tag not found in index.html');
fs.writeFileSync(path.join(root, 'standalone.html'), out);
console.log('standalone.html written, ' + (out.length / 1024).toFixed(1) + ' KB');
