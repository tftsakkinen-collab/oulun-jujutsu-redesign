# 04_DECISION_CHANGELOG.md — Oulun Ju-jutsuklubi Redesign

Tämä dokumentti kirjaa kaikki merkittävät arkkitehtuuri-, koodaus- ja UI/UX-päätökset projektissa.

---

## [2026-08-25] Projektin käyttöönotto & Ympäristön varmistus

### Konteksti ja Nykytila
- **Repo / Hakemisto:** `D:\Kotisivut\oulun-jujutsu-redesign`
- **Pohjateknologia:** Moderni, kevyt ja suorituskykyinen HTML5 / CSS3 / Vanilla JS ilman raskaita kehysriippuvuuksia.
- **Tuotantoalusta:** Vercel (`vercel.json`), lomakeintegraatio Formspree.
- **Tiedostorakenne:**
  - Pääsivut: `index.html`, `jujutsu.html`, `junnut.html`, `kenjutsu.html`, `diesel.html`, `maksut.html`, `itsepuolustus-oulu.html`, `index-en.html`.
  - Tyylit ja skriptit: `styles.css`, `script.js`.
  - Data: `data/aikataulut.js`, `data/schedule.json`.
  - Auditoitu: Kaikki 12 vaiheen WCAG AA -, SEO- ja responsiivisuusvaatimukset tarkistettu ja dokumentoitu (`AUDIT-TULOKSET.md`).

### Päätökset ja Linjaukset
1. **Turvallisuus- ja ympäristöprotokolla:**
   - Ehdoton tietoturva: API-avaimet ja salaiset arvot aina `.env`-tiedostoihin (ei koodirepoon eikä committeihin).
   - Ei raakojen salasanojen käsittelyä.
2. **Brändi & UI-konsepti:**
   - Hokutoryu Ju-jutsu -tyylinen vahva, ammattimainen, puhdas ja budo-henkinen tumma/kontrastikas ilme.
   - Täysi mobiiliresponsiivisuus, selkeät CTA-painikkeet ("Ilmainen kokeilu"), modulaarinen modaalijärjestelmä ja saavutettavuus (WCAG AA).
3. **Ylläpito ja jatkokehitys:**
   - Kaikki merkittävät koodaus- ja rakenneuudistukset kirjataan jatkossa tähän lokiin.

---

## [2026-09-03] Mobiilirajauksen ja kuvien näkyvyyden korjaus

### Konteksti ja Havaitut Ongelmat
- Käyttäjän toimittamassa mobiiliruutukaappauksessa (`oulunjujutsu.com`, viewport ~390px) hero-kuvan kortissa oli alhaalla massiivinen (~196px) tyhjä musta alue, joka työnsi otsikot ja toimintakehotteet ruudun ulkopuolelle.
- **Juurisyy:** `.hero-image-wrapper`-luokalla oli kiinteä `height: 420px;` ilman mobiiliohitusta, kun taas kuva (`.frame--hero`) oli suhteessa `16/10` (korkeus mobiilissa n. 224px).
- Lisäksi `styles.css`:ssä oli rikkoutuneita/keskeneräisiä valitsimia (`.hero-main-`, `.coach-avatar-mask img, .instructor-`, `.instructor-portrait-`, puuttuva sulkeva lohko `.course-card:hover`), jotka sotkivat tyylien periytyvyyttä, sekä `.gallery-img-wrapper`-luokalla päällekkäinen `padding-top: 133.33%` ja `aspect-ratio: 3 / 4`.

### Tehdyt Ratkaisut ja Muutokset
1. **Hero-kuvan mobiilirajaus (`styles.css`, `styles/mobile.css`, `styles/media.css`):**
   - `.hero-image-wrapper`: mobiilissa (`@media (max-width: 768px)`) `height: auto !important; min-height: 0 !important;` ja siisti `margin: 0 auto 20px auto;`.
   - Kuvaelementti (`picture` + `img.frame--hero`): `width: 100% !important; height: auto !important; aspect-ratio: 16 / 10 !important; object-fit: cover !important; object-position: center 30% !important;`.
   - Tyhjä musta tila poistettu kokonaan; kortin kehys kietoutuu kuvan ympärille luonnollisesti. Kaikki 5 ottelijaa (vihreävöinen, lonkkaheitto, Sensei & Hokutoryu-kolmio, heitto, oranssivyöt) näkyvät 100 % ehjinä ja laadukkaina.
   - Työpöytänäkymässä (`min-width: 769px`) kuva täyttää 1100x420-bannerin saumattomasti leikaten vain alareunan tyhjää lattiaa.
2. **Kuvagallerian suhdekorjaus (`styles.css`):**
   - Poistettu `padding-top: 133.33%` konfliktista `aspect-ratio: 3 / 4`:n kanssa, jotta galleriakuvat pysyvät täydellisesti 3:4-muodossa kaikilla mobiiliselaimilla.
3. **CSS-syntaksin puhdistus (`styles.css`):**
   - Korjattu kaikki 7 roikkuvaa/keskeneräistä valitsinta:
     - Poistettu roikkuvat `.cards-grid > .glass-panel > div > div:first-child`, `.hero-main-`, `.logo` (2 kpl) ja `.instructor-portrait-`.
     - Korjattu `.coach-avatar-mask img` ja lisätty puuttunut lohko `.course-card:hover .card-img-wrapper { transform: none !important; }`.
   - Varmennettu automaattisella syntaksitarkistimella (0 virhettä).

---

## [2026-09-08] Tämän päivän treenit -livepalkki & välimuistin ohituksen korjaus

### Konteksti ja Havaitut Ongelmat
- Käyttäjä raportoi, että aiemmin esitelty "Tämän päivän treenit" -livepalkki ei näy sivustolla.
- **Juurisyyt:**
  1. Aiemman istunnon muutoksia ei ollut koskaan commitoitu ja pushattu GitHubiin (`origin main`), jolloin Vercel ei ollut julkaissut niitä tuotantoon.
  2. `vercel.json`:ssa oli asetettu `Cache-Control: public, max-age=31536000, immutable` kaikille `.css`- ja `.js`-tiedostoille, mikä esti selainta hakemasta päivityksiä ilman välimuistin täyttä tyhjennystä.

### Tehdyt Ratkaisut ja Muutokset
1. **Tämän päivän treenit -livepalkki (`index.html`, `index-en.html`, `script.js`, `styles.css`):**
   - Sijoitettu etusivulle heti Hero-alueen alapuolelle.
   - Vihreä sykkivä tila-indikaattori (`.pulse-indicator`) ja automaattinen päivämäärä (esim. *Tiistai 8.9.*).
   - Lajikohtaiset väripillerit ja ikonit:
     - Peruskurssi: Liekki 🔥 ja punainen teema (`.session-pill-peruskurssi`).
     - Kenjutsu: Miekat ⚔️ ja kultainen teema (`.session-pill-kenjutsu`).
     - Hokutoryu Ju-Jutsu / Värivyöt: Kilpi 🛡️ ja sininen teema (`.session-pill-varivyot`).
     - Junnut 🥋 ja Diesel-jutsu 🏋️ omat tunnistettavat teemat.
   - Pikalinkki koko viikon lukujärjestykseen (`#aikataulut` / `#schedule`).
   - Tyhjäntilan käsittely lepopäiville: ilmoittaa seuraavan treenipäivän ja -ajan.
2. **Välimuistin ohitus & nopea päivitys (`vercel.json`, HTML-tiedostot):**
   - `vercel.json`: CSS- ja JS-tiedostojen välimuistiksi määritetty `public, max-age=0, must-revalidate`.
   - Lisätty versioparametri `?v=20260908` CSS- ja JS-linkkeihin.
3. **Sijainnin nosto & tekstien täysi näkyvyys:**
   - Siirretty livepalkki ylemmäksi heti Hero-pääkuvan alapuolelle ennen Peruskurssin ilmoitusbanneria.
   - Uudistettu korttien asettelu: poistettu tekstit katkaiseva ellipsis (`...`), jolloin kaikki tekstit, päivämäärät ja lisätiedot näkyvät selkeästi kertasilmäyksellä.

---

## [2026-09-09] /en 404 NOT_FOUND -reitityksen korjaus

### Konteksti ja Juurisyy
- Käyttäjä ilmoitti virheestä osoitteessa `oulunjujutsu.com/en`: Vercel palautti `404: NOT_FOUND (Code: NOT_FOUND)`.
- **Juurisyy:**
  - `vercel.json`-tiedostossa oli `cleanUrls: true` ja toimimaton `rewrites`-sääntö kohteeseen `/index-en.html`. Vercel ei cleanUrls-tilassa pystynyt yhdistämään reittiä tiedostoon, jolla on `.html`-pääte.
  - Samaan aikaan muut sivuston alasivut (`diesel.html`, `junnut.html`, `jujutsu.html` jne.) toimivat puhtaasti omien tiedostonimiensä kautta ilman rewritejä (`/diesel` -> `diesel.html`).
  - Sivuston sisäiset linkit olivat epäyhtenäiset: osa viittasi `/en`, osa vanhaan `index-en.html`.

### Tehdyt Ratkaisut ja Muutokset
1. **Tiedoston uudelleennimeäminen (`en.html`):**
   - Siirretty `index-en.html` suoraan tiedostoksi `en.html`. Vercelin `cleanUrls: true` tarjoilee tämän natiivisti ja varmasti osoitteessa `/en`.
   - Päivitetty kanoninen URL, Open Graph ja Schema.org JSON-LD osoittamaan `https://www.oulunjujutsu.com/en`.
   - Päivitetty navigaation ja footerin linkit puhtaiksi URL-osoitteiksi (`/en`, `/`, `/peruskurssi`, `/jujutsu` jne.).
2. **Reitityksen siistiminen (`vercel.json`):**
   - Poistettu toimimaton `rewrites`-lohko.
   - Säilytetty 308 Permanent Redirect vanhasta `/index-en(.html)?` kohteeseen `/en` vanhoja kirjanmerkkejä ja hakukoneita varten.
3. **Linkkien ja skriptien päivitys:**
   - Päivitetty `index.html` ja `peruskurssi.html` (hreflang, kielikytkin, footer) viittaamaan suoraan `/en`.
   - Varmistettu `script.js`:n `isEn`-tarkistukset tukemaan reittiä `/en`.

