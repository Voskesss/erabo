# Facebook Automatische Projecten Setup

## Hoe het werkt

1. **GitHub Action** draait elk uur
2. **Haalt Facebook posts** op via Graph API
3. **Converteert** posts automatisch naar projecten
4. **Update** `data/projects.json`
5. **Website** toont Facebook posts als projecten

## Setup (eenmalig)

### 1. Facebook App maken

1. Ga naar https://developers.facebook.com/
2. Log in met je Facebook account
3. Klik "Create App" → "Business"
4. App naam: "Erabo Website"
5. Contact email: je email
6. Klik "Create App"

### 2. Facebook Page Access Token krijgen

1. In je Facebook App: ga naar "Tools" → "Graph API Explorer"
2. Selecteer je App in de dropdown
3. Klik "Get Token" → "Get Page Access Token"
4. Selecteer de ERABO pagina
5. Voeg deze permissions toe:
   - `pages_read_posts`
   - `pages_read_engagement`
6. Klik "Generate Access Token"
7. **Kopieer dit token** (lang, begint met EAA...)

### 3. Token in GitHub Secrets

1. Ga naar je GitHub repo: https://github.com/Voskesss/erabo
2. Settings → Secrets and variables → Actions
3. "New repository secret"
4. Name: `FACEBOOK_ACCESS_TOKEN`
5. Value: **plak je token hier**
6. Klik "Add secret"

### 4. Testen

1. Ga naar "Actions" tab in je repo
2. Zoek "Sync Facebook to Projects"
3. Klik "Run workflow" → "Run workflow"
4. Wacht 1-2 minuten
5. Check of `data/projects.json` is geüpdatet

## Categorisatie

Posts worden automatisch gecategoriseerd:

- **Sanitair**: "badkamer", "toilet", "douche", "wastafel"
- **Electra**: "elektra", "groepenkast", "zekering", "verlichting"
- **Buitenwerk**: "overkapping", "terras", "buiten", "tuin"
- **Renovatie**: "keuken", "renovatie", "verbouwing", "wand"

## Gebruik

### Op Facebook posten

1. Post op ERABO Facebook pagina
2. Gebruik keywords voor categorisatie
3. Voeg foto's toe (worden automatisch project-afbeeldingen)
4. Binnen 1 uur verschijnt het als project op de website

### Voorbeeld post

```
Complete badkamer renovatie in Nijmegen! 🛁
Nieuwe tegels, sanitair en verlichting geplaatst.
Klant super tevreden met het resultaat!

#klusbedrijf #badkamer #sanitair #nijmegen
```

Wordt automatisch:
- Titel: "Complete badkamer renovatie in Nijmegen! 🛁"
- Categorie: "Sanitair"
- Afbeeldingen: alle foto's uit de post
- Datum: datum van de post

## Probleemoplossing

### Token verlopen

Facebook Page Access tokens verlopen na 60 dagen.

**Oplossing**:
1. Herhaal stap 2 om nieuw token te krijgen
2. Update GitHub secret met nieuwe token

### Geen posts verschijnen

**Check**:
1. Werkt de GitHub Action? ( zie Actions tab )
2. Is token correct? ( check in GitHub secrets )
3. Heeft de Facebook post tekst? (lege posts worden genegeerd)
4. Zijn er foto's bij de post? (anders geen afbeelding)

### Verkeerde categorie

**Oplossing**:
1. Gebruik de juiste keywords in je Facebook post
2. Of pas de categorisatie aan in `scripts/facebook-sync.js`

## Oude projecten behouden

Oude (niet-Facebook) projecten blijven bewaard.
Ze staan onder de Facebook-projecten in de lijst.

Wil je ze verwijderen?
1. Open `data/projects.json`
2. Verwijder projecten zonder `"source": "facebook"`
3. Commit en push

## Support

Werkt iets niet?
1. Check GitHub Actions log
2. Check token geldigheid
3. Neem contact op met de ontwikkelaar
