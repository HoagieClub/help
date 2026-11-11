/**
 * npm run playground            → creates your test page (if you don't have one yet)
 * npm run playground -- --reset → replaces it with a fresh copy
 *
 * The page lives in app/playground/, which is gitignored, so it's never committed.
 */
/* eslint-disable no-console -- a command-line script; printing is the point. */
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const template = join(root, 'scripts', 'playground-template.tsx');
const page = join(root, 'app', 'playground', 'page.tsx');
const reset = process.argv.includes('--reset');

if (existsSync(page) && !reset) {
	console.log('You already have a test page: frontend/app/playground/page.tsx');
	console.log('Start over with: npm run playground -- --reset');
} else {
	mkdirSync(dirname(page), { recursive: true });
	copyFileSync(template, page);
	console.log(reset ? 'Fresh test page created.' : 'Test page created.');
	console.log('Edit: frontend/app/playground/page.tsx');
}
console.log('Open: http://localhost:3000/playground (run npm run dev first)');
