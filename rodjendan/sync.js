/**
 * SYNC & BUILD SCRIPT (sync.js)
 * -------------------------------------------------------------
 * Automatski sinhronizuje zajednički kod u dva samostalna direktorijuma:
 * 1. ./selena/  (unapred konfigurisan za Selenu, spreman za Netlify/Vercel)
 * 2. ./luka/    (unapred konfigurisan za Luku, spreman za Netlify/Vercel)
 * 
 * Pokretanje:
 * node sync.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SHARED_FILES = [
  'index.html',
  'style.css',
  'audio.js',
  'flame.js',
  'confetti.js',
  'app.js'
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function prepareProfileFolder(profileId) {
  const targetDir = path.join(__dirname, profileId);
  ensureDir(targetDir);

  // 1. Kopiraj deljene skripte i stilove
  for (const file of SHARED_FILES) {
    const src = path.join(__dirname, file);
    const dest = path.join(targetDir, file);
    fs.copyFileSync(src, dest);
  }

  // 2. Kopiraj assets
  const srcAssets = path.join(__dirname, 'assets');
  const destAssets = path.join(targetDir, 'assets');
  copyDir(srcAssets, destAssets);

  // 3. Generiši specifičan config.js sa aktivnim profilom
  const baseConfig = fs.readFileSync(path.join(__dirname, 'config.js'), 'utf8');
  const customizedConfig = baseConfig.replace(
    /activeProfile:\s*['"][^'"]+['"]/,
    `activeProfile: '${profileId}'`
  );
  fs.writeFileSync(path.join(targetDir, 'config.js'), customizedConfig, 'utf8');

  console.log(`[OK] Generisan samostalni projekat za profil '${profileId}' u: ./${profileId}`);
}

console.log('--- Započinjem sinhronizaciju verzija za Selenu i Luku ---');
prepareProfileFolder('selena');
prepareProfileFolder('luka');
console.log('--- Sinhronizacija uspešno završena! Obe verzije su spremne za deployment ---');
