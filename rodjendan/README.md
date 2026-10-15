# Interaktivni Rođendanski Sajt (Selena & Luka)

Vrhunski interaktivni rođendanski sajt sa naprednom detekcijom duvanja u mikrofon preko **Web Audio API-ja**, proceduralnim višeslojnim plamenom i česticama dima na Canvas-u, 3D vizuelnom tortom, konfetama, vatrometom i personalizovanim porukama na srpskom jeziku.

Sajt koristi **jedan zajednički kod** i centralni konfiguracioni fajl (`config.js`), a podržava dve potpuno stilizovane verzije:
- **Selena**: Topla, elegantna tema (šampanjac zlato, puder roze, svetlucavi amber, ponoćna šljiva).
- **Luka**: Moderna, tamna high-tech tema (ponoćni grafit, kraljevski safir, električna nebo-plava, neon cijan).

---

## Struktura Projekta

```text
rodjendan/
├── config.js          # Centralna konfiguracija (Selena & Luka, pragovi zvuka, teme)
├── audio.js           # Web Audio API: FFT analiza, RMS + 0-500Hz energija, kalibracija šuma
├── flame.js           # 60 FPS Canvas plamen, fizika nagiba na dah, dim i akumulator gašenja
├── confetti.js        # Canvas topovi konfeta sa 3D rotacijom papira i vazdušni vatromet
├── app.js             # Glavni kontroler (stanja, tema, interakcije, galerija, deljenje)
├── style.css          # Kompletan luksuzni dizajn sistem, CSS varijable, responzivnost
├── index.html         # Glavna HTML stranica (UTF-8, čista semantika, prilagođene SVG ikonice)
├── package.json       # NPM skripte za lokalno pokretanje i sinhronizaciju
├── sync.js            # Skripta koja sinhronizuje deljeni kod u selena/ i luka/
├── assets/            # Fotografije i grafički elementi
├── selena/            # Samostalna verzija spremna za Netlify / Vercel deployment
└── luka/              # Samostalna verzija spremna za Netlify / Vercel deployment
```

---

## 1. Pokretanje Lokalno

Zbog sigurnosnih zahteva pretraživača za Web Audio API (`getUserMedia`) i ES module (`import / export`), sajt mora biti pokrenut preko lokalnog HTTP servera (ne otvarati direktno kao `file:///` protokol).

### Preko Node.js / NPM:
U terminalu se pozicionirajte u folder projekta:
```bash
npm run dev
# ili
npx serve . -l 3000
```
Otvorite u pretraživaču:
- Glavni projekat sa biranjem profila: `http://localhost:3000`
- Selena verzija: `http://localhost:3000/?user=selena` ili `http://localhost:3000/selena/`
- Luka verzija: `http://localhost:3000/?user=luka` ili `http://localhost:3000/luka/`

### Preko VS Code / Live Server ekstenzije:
- Otvorite folder `rodjendan` u VS Code-u.
- Kliknite desnim tasterom miša na `index.html` i izaberite **"Open with Live Server"**.

---

## 2. Testiranje i Fino Podešavanje Osetljivosti Mikrofona

Glavni mehanizam detektuje dah analizom pritiska vazduha na membranu mikrofona (dominantan spektar **0 do 500 Hz** i **RMS** time-domain pritisak) uz filtriranje govora preko spektralnog faktora pika (crest factor), tako da obično pričanje i muzika ne gase svećice.

Svi parametri se podešavaju u fajlu `config.js` unutar objekta `audioSettings`:

```javascript
audioSettings: {
  // 1. Osnovni prag duvanja (podrazumevano: 0.22)
  // Raspon: 0.15 do 0.40
  // - Smanjite na 0.16 - 0.18 ako korisnik mora previše jako da duva ili je mikrofon slab.
  // - Povećajte na 0.28 - 0.35 ako u sobi ima buke i želite da gašenje traži jači napor.
  blowThreshold: 0.22,

  // 2. Gornja frekventna granica daha (podrazumevano: 500 Hz)
  // Duvanje stvara jak vazdušni šum u opsegu 20-500 Hz. Govor se nalazi u višem opsegu.
  lowFreqMaxHz: 500,

  // 3. Minimalno vreme trajanja duvanja po svećici (podrazumevano: 200 ms)
  // Svaka svećica ima svoj akumulator. Što je veća vrednost, dah mora biti stabilniji i duži.
  minBlowDurationMs: 200,

  // 4. Vreme kalibracije šuma prostorije (podrazumevano: 1200 ms)
  // Pri startu meri ambijentalnu buku i oduzima je od signala kako buka klime ili pozadine ne bi gasila svećice.
  calibrationDurationMs: 1200,

  // 5. Multiplikator osetljivosti mikrofona (podrazumevano: 1.35)
  // Povećajte na 1.5 - 1.7 za tiše mikrofone na laptopu ili telefonima u futroli.
  sensitivityMultiplier: 1.35,

  // 6. Eksponencijalno ublažavanje plamena (podrazumevano: 0.18)
  // 0.15 daje izuzetno miran i filmski plamen, dok 0.25 brže reaguje na nagle trzaje vazduha.
  smoothingAlpha: 0.18,

  // 7. Pozadinska rođendanska muzika (true/false)
  // Koristi sintisajzer bez potrebe za eksternim MP3 fajlovima.
  enableSynthMusic: true
}
```

### Progresivno gašenje svećica:
- Svećice nemaju identičan prag; svaka svećica dobija blagu varijaciju praga (od 0.16 do 0.65).
- Blaži dah ugasiće samo nekoliko svećica bliže centru.
- Jači i kontinuirani dah ugasiće sve svećice redom.
- Ako korisnik prestane da duva na pola, preostale svećice se ponovo rasplamsavaju!

### Rezervna opcija (Touch & Fallback):
- Ako mikrofon nije dozvoljen, korisnik može prevući prstom ili kliknuti na bilo koju svećicu, ili kliknuti na dugme **"Ugasi dodirom"** u HUD traci.

---

## 3. Prilagođavanje Podataka za Selenu i Luku

Sve tekstualne poruke, fotografije, godine i boje menjaju se u `config.js` pod ključevima `profiles.selena` i `profiles.luka`:

- `name`: Ime slavljenika.
- `age`: Broj godina (automatski postavlja tačan broj svećica na torti).
- `heroTitle`, `heroSubtitle`: Uvodni tekst na početnom ekranu.
- `wishInstruction`: Uputstvo za duvanje.
- `personalMessage`: Lično pismo i rođendanska čestitka.
- `photos`: Niz putanja do slika koje se prikazuju u Polaroid galeriji.
- `theme`: Heksadecimalne boje pozadine, glazure torte, voska svećica i sjaja.

Nakon izmene u glavnom `config.js`, pokrenite:
```bash
npm run sync
```
Ova komanda automatski osvežava samostalne foldere `selena/` i `luka/`.

---

## 4. Uputstvo za Deployment (Netlify i Vercel)

Aplikacija je dizajnirana tako da svaku verziju možete deploy-ovati nezavisno kao poseban sajt na posebnom domenu (npr. `selena-rodjendan.netlify.app` i `luka-rodjendan.netlify.app`).

### A) Netlify Deployment (Najjednostavniji način - Drag & Drop)
1. Prijavite se na [app.netlify.com](https://app.netlify.com).
2. Otvorite karticu **Sites** i pronađite polje za prevlačenje: **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"**.
3. Za Selenu: Prevucite ceo folder `selena` sa vašeg računara direktno u browser.
4. Za Luku: Ponovite postupak i prevucite ceo folder `luka`.
5. Netlify će za 5 sekundi podići oba sajta sa besplatnim HTTPS SSL sertifikatom (obavezno za mikrofon).

### B) Vercel Deployment (Preko CLI ili GitHub-a)
Ako koristite Vercel CLI:
```bash
# Za Selenu:
cd selena
npx vercel --prod

# Za Luku:
cd ../luka
npx vercel --prod
```
Ako povezujete Git repozitorijum:
- Za Selenin sajt postavite **Root Directory** na `selena`
- Za Lukin sajt postavite **Root Directory** na `luka`
- Framework Preset ostavite na **Other** (čist statički HTML/CSS/JS bez build koraka).

---

## 5. Bezbednost i Mobilni Pretraživači (iOS Safari & Android Chrome)
- **iOS Safari pravilo**: AudioContext i mikrofon mogu se pokrenuti isključivo kao direktna reakcija na korisnički dodir (klik na dugme "Započni slavlje"). Kod je u potpunosti prilagođen ovom standardu.
- **HTTPS uslov**: Pretraživači dozvoljavaju pristup mikrofonu samo na `localhost` adresi tokom razvoja ili preko sigurnog `https://` protokola na produkciji. Netlify i Vercel ovo rešavaju automatski.
