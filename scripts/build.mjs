// Package only public assets. No bundler or production dependencies are needed.
import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
const assets = [
  'index.html', 'playground.html', 'about.html', 'our-work.html',
  'get-involved.html', 'contact.html', 'style.css', 'script.js', 'playground',
];
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const asset of assets) {
  await cp(path.join(root, asset), path.join(output, asset), { recursive: true });
}
console.log('Public website and all eight activities packaged in dist/.');
