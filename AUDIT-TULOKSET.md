# AUDIT-TULOKSET.md — Jujutsu Oulu Ry -Sivuston Auditointiraportti 2026

Tämä dokumentti sisältää **www.oulunjujutsu.com** (Jujutsu Oulu Ry) kattavan auditoinnin tulokset, mittaukset, löydökset ja suoritetut korjaukset.

---

## 1. Ylivuototarkistus per Sivu × Responsiivisuusleveys

Testattu automaattisella Chromium-selaintestillä kaikilla vaadituilla leveyksillä: **320, 360, 375, 430, 768, 1024, 1440, 1920 px**.

| Tiedosto | 320 px | 360 px | 375 px | 430 px | 768 px | 1024 px | 1440 px | 1920 px | Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `index.html` | OK | OK | OK | OK | OK | OK | OK | OK | **PASSED** |
| `jujutsu.html` | OK | OK | OK | OK | OK | OK | OK | OK | **PASSED** |
| `junnut.html` | OK | OK | OK | OK | OK | OK | OK | OK | **PASSED** |
| `kenjutsu.html` | OK | OK | OK | OK | OK | OK | OK | OK | **PASSED** |
| `diesel.html` | OK | OK | OK | OK | OK | OK | OK | OK | **PASSED** |
| `maksut.html` | OK | OK | OK | OK | OK | OK | OK | OK | **PASSED** |
| `itsepuolustus-oulu.html` | OK | OK | OK | OK | OK | OK | OK | OK | **PASSED** |
| `index-en.html` | OK | OK | OK | OK | OK | OK | OK | OK | **PASSED** *(Korjattu typo style.css -> styles.css)* |

> **Löydös & korjaus**: `index-en.html`-tiedostossa oli typo stylesheet-linkissä (`style.css` vs `styles.css`), minkä vuoksi tyylit eivät latautuneet ja sivu ylivuoti mobiilissa. Korjattu linkki osoittamaan tiedostoon `styles.css` $\rightarrow$ 100 % PASSED.

---

## 2. GitHub-Synkronointi & Raskaiden Tiedostojen Auditointi

- **`node_modules` -tarkistus**: Varmistettu suoralla `git ls-files node_modules` -haulla. Tiedostoja ei ole viety pilveen/Git-repositorioon (`.gitignore` suojaa `node_modules/`, `.next/`, `.vercel/`, `.env` jne.).
- **Aktiiviset `.gitignore` -säännöt**:
  - `node_modules/`
  - `.env`, `.env.*`
  - `*.log`, `.DS_Store`, `Thumbs.db`
  - `scratch/`
- **Seurattujen mediatiedostojen kokotarkistus**:
  - Repo sisältää valmiiksi optimoituja WebP/JPG-kuvia ($\le 1.6\text{ MB}$ per sivu).
  - *Huomio*: `assets/Screen_Recording_20260810_125814_Chrome.mp4` (53,9 MB) on seurattuna gitissä. Suositellaan poistamaan tai korvaamaan kevyemmällä pakatulla videolla, jos videota ei tarvita tuotannossa.

---

## 3. Tietoturva-Auditointi (Security Audit)

- **HTTPS & SSL/TLS**: 
  - Varmenne aktiivinen osoitteessa `https://www.oulunjujutsu.com/` (HTTP 200 OK).
  - HSTS-otsake aktiivinen: `Strict-Transport-Security: max-age=63072000`.
- **HTTP-Suojausotsakkeet (`vercel.json`)**:
  - Päivitetty tuotantoasetuksiin:
    - `X-Frame-Options: SAMEORIGIN` (Estää Clickjacking / iframe-kaappaukset)
    - `X-Content-Type-Options: nosniff` (Estää MIME-sniffing -hyökkäykset)
    - `Referrer-Policy: strict-origin-when-cross-origin` (Suojaa käyttäjän yksityisyyttä)
    - `Permissions-Policy: camera=(), microphone=(), geolocation=()` (Sulkee käyttämättömät anturit)
- **API-päätepisteen turvallisuus (`api/ask-instructor.js`)**:
  - Telegram Bot Token siirretty ympäristömuuttujan `process.env.TELEGRAM_BOT_TOKEN` taakse.
  - Kohdechat `chat_id` lukittu, mikä estää palvelinrajapinnan väärinkäytön mielivaltaisten viestien välittämiseen.
  - Käyttäjän syötteet sanitoitu (`replace(/[*_`[\]]/g, '')`) Telegram Markdown -injektiohyökkäysten estämiseksi.
- **Lomakkeet & Syötteet**:
  - Kaikki rekisteröitymislomakkeet käyttävät suojattua HTTPS-Formspree-päätepistettä (`https://formspree.io/f/xvovbqqr`).

---

## 4. Koodin Siisteys & W3C / WCAG AA

- HTML5 semantic markup (`<main id="main">`, `<header>`, `<nav>`, `<footer>`).
- Kaikilla sivulla toimivat skip-to-content -linkit saavutettavuutta varten.
- Suomenkieliset lausekoko-otsikot yhtenäistetty.
- WCAG AA -kontrastisuhteet täytetty leipätekstille ja kontrasteille.

---

## 5. Loppuyhteenveto

Auditointi on suoritettu onnistuneesti. Sivusto on **100 % responsiivinen**, GitHub-synkronointi on turvallinen eikä raskaita `node_modules`-tai ympäristötiedostoja ole pilvessä, ja tietoturvaotsakkeet sekä API-rajapinta on suojattu.
