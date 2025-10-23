# Erabo – Klusbedrijf Nijmegen

Statische website (NL) voor Erabo, met Projecten-galerij en mobiele foto-upload via Cloudinary (unsigned uploads). Geschikt voor GitHub Pages.

## Pagina's
- `index.html` – Home
- `diensten.html` – Dienstenoverzicht
- `projecten.html` – Galerij + mobiele upload (PIN-beveiligd, client-side)
- `contact.html` – Contactgegevens en eenvoudig mailto-formulier

## Branding
Zet de logo-bestanden in `assets/`:
- `assets/logo.png` (vierkant logo, favicon en header)
- `assets/logo-wide.png` (breed logo voor hero)

> Bestandsnamen precies zo aanhouden.

## Kleurthema
Primair: `#9DB83A` (groen uit het logo). Aanpasbaar via CSS variabele `--brand` in elke pagina.

## Cloudinary upload (Projecten)
`projecten.html` bevat een eenvoudige client-side upload, geschikt voor mobiel (camera/bestanden). Geen backend nodig.

1. Maak (of gebruik) een Cloudinary-account.
2. Noteer je `cloud name` (bijv. `demo`).
3. Maak een "Unsigned Upload Preset" (Settings → Upload → Upload presets → Add preset):
   - Unsigned inschakelen
   - Optioneel: map beperken tot `erabo/`
4. Open `projecten.html` en vul bovenin in:
```js
const CLOUD_NAME = 'JOUW_CLOUD_NAME';
const UPLOAD_PRESET = 'JOUW_UNSIGNED_PRESET';
const PIN_CODE = '1234'; // wijzig deze pincode
```
5. Publiceer en test: kies bestanden of camera, upload. Succesvolle uploads worden direct getoond en in `localStorage` gecachet.

> Let op: dit is client-side beveiliging. Voor echte auth/beheer kunnen we later een kleine backend toevoegen.

## GitHub Pages
Deze site is ontworpen om direct vanaf de repository-root te draaien.

1. Push naar GitHub (zie hieronder).
2. In de repo: Settings → Pages → Source: `Deploy from a branch` → Branch: `main` → `/ (root)`.
3. Wacht 1–2 minuten. De site staat op `https://<user>.github.io/erabo/` (voor deze repo: `https://voskesss.github.io/erabo/`).

## Pushing (eerste keer)
```bash
git init
git add .
git commit -m "Initial commit: Erabo static site"
git branch -M main
git remote add origin https://github.com/Voskesss/erabo.git
git push -u origin main
```

## Aanpassen
- Teksten: pas rechtstreeks in de HTML-bestanden aan.
- Kleuren: wijzig `--brand`.
- Logo/foto’s: plaats in `assets/` en verwijs met relatieve paden (`./assets/...`).

## Bekende beperkingen
- Uploadbeveiliging is PIN-based in de client; voor fine-grained rechten is een backend nodig.
- Galerij laat recent geüploade foto’s lokaal zien; voor centrale lijst kunnen we later Cloudinary-listing of backend toevoegen.
