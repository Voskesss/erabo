# Erabo Admin Panel - Handleiding

## Toegang tot Admin Panel

Bezoek: `https://voskesss.github.io/erabo/admin.html`

**Standaard Wachtwoord:** `erabo2025`

> ⚠️ **BELANGRIJK**: Verander het wachtwoord in `admin.html` regel 197 voor productiegebruik!

## Functies

### 1. Projecten Beheren

#### Nieuw Project Toevoegen
1. Klik op **"+ Nieuw Project Toevoegen"**
2. Vul de gegevens in:
   - **Titel**: Naam van het project (bijv. "Badkamer Renovatie")
   - **Beschrijving**: Korte beschrijving van het project
   - **Categorie**: Kies tussen Electra, Sanitair, of Renovatie
   - **Datum**: Datum van voltooiing
   - **Uitgelicht**: Vink aan om het project prominent te tonen
   - **Afbeeldingen**: Voeg foto URLs toe (bijv. van Unsplash of eigen hosting)

3. Klik op **"Opslaan"**

#### Project Bewerken
1. Klik op de **"Bewerken"** knop bij een project
2. Pas de gegevens aan
3. Klik op **"Opslaan"**

#### Project Verwijderen
1. Klik op de **"Verwijderen"** knop bij een project
2. Bevestig de actie

### 2. Afbeeldingen Toevoegen

#### Optie 1: Externe URL's (Aanbevolen voor nu)
- Gebruik gratis stockfoto's van:
  - **Unsplash**: https://unsplash.com/
  - **Pexels**: https://pexels.com/
  - Kopieer de afbeelding URL en plak in het "Afbeeldingen" veld

#### Optie 2: Eigen Foto's
- Upload foto's naar een image hosting service:
  - **Imgur**: https://imgur.com/
  - **ImgBB**: https://imgbb.com/
  - Kopieer de directe link naar de afbeelding

**Voorbeeld URLs:**
```
https://images.unsplash.com/photo-1234567890?w=800
https://i.imgur.com/abcd123.jpg
```

### 3. Data Synchroniseren

#### Export Data
1. Klik op **"Export Data"** in de header
2. Een `projects.json` bestand wordt gedownload
3. Bewaar dit bestand als backup

#### Import Data
1. Klik op **"Import Data"** in de header
2. Selecteer een eerder geëxporteerd `projects.json` bestand
3. Data wordt ingeladen

#### Publiceren naar Live Site
**Belangrijk:** De admin gebruikt localStorage. Om wijzigingen live te zetten:

1. Klik op **"Export Data"**
2. Sla het `projects.json` bestand op
3. Vervang `/data/projects.json` in de repository
4. Commit en push de wijzigingen naar GitHub:
   ```bash
   git add data/projects.json
   git commit -m "Update projecten"
   git push
   ```

## Project Categorieën

### Electra (Blauw)
- Elektrische installaties
- Groepenkast uitbreidingen
- Verlichting
- Storingen
- Zonnepanelen
- Laadpalen

### Sanitair (Cyaan)
- Badkamer renovaties
- Toilet installaties
- Lekkages
- CV-installaties
- Loodgieterswerk

### Renovatie (Oranje)
- Keuken renovaties
- Woonkamer verbouwingen
- Wanden & plafonds
- Complete renovaties
- Timmerwerk

## Tips voor Goede Projecten

### Foto's
- **Minimaal 1 foto per project**
- **Maximaal 4-5 foto's** voor beste prestaties
- Gebruik hoge kwaliteit afbeeldingen (800x600px of groter)
- Toon before/after foto's waar mogelijk
- Focus op eindresultaat

### Beschrijvingen
- **Kort en krachtig** (1-2 zinnen)
- Noem specifieke werkzaamheden
- Vermeld bijzondere aspecten
- Gebruik actieve taal

### Voorbeelden
✅ **Goed**: "Complete badkamerrenovatie met moderne afwerking, inclusief tegelwerk, sanitair en verlichting."

❌ **Minder goed**: "We hebben een badkamer gedaan. Was een leuke klus."

## Featured Projecten

- Gebruik **"Uitgelicht"** voor uw beste projecten
- Deze verschijnen bovenaan in de lijst
- Maximaal 3-5 projecten uitgelichten tegelijk
- Kies diverse categorieën voor uitgelichte projecten

## Statistieken

Het dashboard toont:
- **Totaal Projecten**: Alle projecten
- **Per Categorie**: Aantal per type werkzaamheid

## Troubleshooting

### "Geen projecten zichtbaar op website"
1. Check of je localStorage data hebt in admin
2. Export de data via admin
3. Plaats het bestand in `/data/projects.json`
4. Commit en push naar GitHub

### "Admin wachtwoord vergeten"
1. Open `admin.html` in een code editor
2. Zoek regel 197: `const ADMIN_PASSWORD = 'erabo2025';`
3. Wijzig het wachtwoord
4. Sla op en herlaad de pagina

### "Afbeeldingen laden niet"
1. Check of de URL direct naar een afbeelding linkt (eindigt op .jpg, .png, etc.)
2. Test de URL in een nieuwe browser tab
3. Zorg dat de afbeelding publiek toegankelijk is
4. Gebruik HTTPS URLs (niet HTTP)

## Veiligheid

⚠️ **Belangrijk voor Productie:**

1. **Wijzig het admin wachtwoord** in `admin.html`
2. **Maak regelmatig backups** via Export Data
3. Overweeg een betere authenticatie methode voor de toekomst
4. De huidige oplossing is bedoeld voor basis gebruik

## Toekomstige Uitbreidingen

Mogelijke verbeteringen:
- Backend met database (MySQL/PostgreSQL)
- Image upload functionaliteit
- Meerdere gebruikers met verschillende rechten
- Automatische publicatie naar live site
- Analytics integratie
- Contactformulier berichten beheer

## Support

Voor vragen of problemen:
- Email: boomerik@hotmail.com
- Tel: 06 2897 3845

---

**Versie**: 1.0
**Laatste update**: 28 Oktober 2025
