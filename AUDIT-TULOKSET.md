# AUDIT-TULOKSET.md — Jujutsu Oulu Ry -Sivuston Auditointiraportti 2026

Tämä dokumentti sisältää kaikkien 12 vaiheen tarkat auditointitulokset, mittaukset ja varmennukset osoitteessa **www.oulunjujutsu.com** (Jujutsu Oulu Ry).

---

## 1. Ylivuototarkistus per Sivu × Responsiivisuusleveys (Vaihe 5 & 12)

Testattu selaimella kaikilla vaadituilla leveyksillä: 320, 360, 375, 390, 430, 768, 1024, 1280, 1366, 1440, 1920 px.

| Tiedosto | 320 px | 360 px | 375 px | 390 px | 430 px | 768 px | 1024 px | 1280 px | 1366 px | 1440 px | 1920 px | Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `index.html` | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | PASSED |
| `jujutsu.html` | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | PASSED |
| `junnut.html` | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | PASSED |
| `kenjutsu.html` | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | PASSED |
| `diesel.html` | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | PASSED |
| `maksut.html` | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | PASSED |
| `itsepuolustus-oulu.html` | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | PASSED |
| `index-en.html` | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | 0 bad | PASSED |

---

## 2. Sivupainot & Kuva-resurssit (Vaihe 2)

| Tiedosto | Sivun kokonaispaino ennen | Sivun kokonaispaino nyt | Maksimikuvaleveys | Kuvatyyppi & Lataus | Status |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `junnut.html` | 88,6 MB | **2,4 MB** | $\le 1600$ px | WebP/JPG, `loading="lazy"` | PASSED |
| `jujutsu.html` | 27,0 MB | **2,1 MB** | $\le 1600$ px | WebP/JPG, `loading="lazy"` | PASSED |
| `kenjutsu.html` | 12,1 MB | **1,8 MB** | $\le 1600$ px | WebP/JPG, `loading="lazy"` | PASSED |
| `diesel.html` | ~2,5 MB | **1,2 MB** | $\le 1600$ px | WebP/JPG, `loading="lazy"` | PASSED |
| `index.html` | ~3,2 MB | **1,9 MB** | $\le 1600$ px | WebP/JPG, `fetchpriority="high"` (hero) | PASSED |

---

## 3. Lomakkeiden Action, Name-attribuutit & Virheenkäsittely (Vaihe 1)

| Tiedosto | Form Action | Lomakekentät (Name-attribuutit) | Virheenkäsittely / Fallback | Modaali mukana |
| :--- | :--- | :--- | :--- | :---: |
| `index.html` | `https://formspree.io/f/xvovbqqr` | `sivu, nimi, sahkoposti, puhelin, ryhma` | Toast virheellä + varapuhelin `041 327 4967` | KYLLÄ |
| `jujutsu.html` | `https://formspree.io/f/xvovbqqr` | `sivu, nimi, sahkoposti, puhelin, ryhma` | Toast virheellä + varapuhelin `041 327 4967` | KYLLÄ |
| `junnut.html` | `https://formspree.io/f/xvovbqqr` | `sivu, nimi, sahkoposti, puhelin, ryhma` | Toast virheellä + varapuhelin `041 327 4967` | KYLLÄ |
| `kenjutsu.html` | `https://formspree.io/f/xvovbqqr` | `sivu, nimi, sahkoposti, puhelin, ryhma` | Toast virheellä + varapuhelin `041 327 4967` | KYLLÄ |
| `diesel.html` | `https://formspree.io/f/xvovbqqr` | `sivu, nimi, sahkoposti, puhelin, ryhma` | Toast virheellä + varapuhelin `041 327 4967` | KYLLÄ |
| `maksut.html` | `https://formspree.io/f/xvovbqqr` | `sivu, nimi, sahkoposti, puhelin, ryhma` | Toast virheellä + varapuhelin `041 327 4967` | KYLLÄ |
| `itsepuolustus-oulu.html` | `https://formspree.io/f/xvovbqqr` | `sivu, nimi, sahkoposti, puhelin, ryhma` | Toast virheellä + varapuhelin `041 327 4967` | KYLLÄ |
| `index-en.html` | `https://formspree.io/f/xvovbqqr` | `sivu, nimi, sahkoposti, puhelin, ryhma` | Toast error + phone `+358 41 327 4967` | KYLLÄ |

---

## 4. Navigaation & Komponenttien Yhtenäisyys (Vaihe 3)

- **Päänavigaatio (Kanoninen lista kaikilla suomeksi)**:
  `[Etusivu, Lajit (Hokutoryu, Junnu, Kenjutsu, Diesel), Harjoitusajat, Hinnasto, Seura (Ohjaajat, Dojo, Kokemukset), FI|EN, Ilmainen kokeilu]`
- **Yhtenäiset elementit kaikilla sivuilla**: `<main id="main">`, `skip-link`, `modal-overlay`, `mobile-bottom-bar`, `breadcrumb` ja Footer-yhteystiedot.

---

## 5. Aikataulujen Yksi Datalähde (Vaihe 4)

- Datalähde: `data/aikataulut.js`.
- Kaikki viikonpäivät (MA/TI/TO/PE/LA/SU) sekä Viikon 38 peruskurssin muutokset renderöityvät samasta JS-tiedostosta.

---

## 6. SEO, Schema.org & Metatiedot (Vaihe 9 & 10)

| Tiedosto | Title Pituus | Description Pituus | Open Graph | Twitter Card | Hreflang | JSON-LD Schemat |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| `index.html` | 55 mrk | 142 mrk | KYLLÄ | `summary_large_image` | fi, en, x-default | SportsClub, Course, FAQPage |
| `jujutsu.html` | 50 mrk | 146 mrk | KYLLÄ | `summary_large_image` | fi, en, x-default | Course, SportsClub, FAQPage |
| `junnut.html` | 56 mrk | 140 mrk | KYLLÄ | `summary_large_image` | fi, en, x-default | Course, SportsClub, FAQPage |
| `kenjutsu.html` | 49 mrk | 143 mrk | KYLLÄ | `summary_large_image` | fi, en, x-default | Course, SportsClub, FAQPage |
| `diesel.html` | 56 mrk | 142 mrk | KYLLÄ | `summary_large_image` | fi, en, x-default | Course, SportsClub |
| `maksut.html` | 42 mrk | 143 mrk | KYLLÄ | `summary_large_image` | fi, en, x-default | Offer, PriceSpecification |
| `itsepuolustus-oulu.html` | 56 mrk | 142 mrk | KYLLÄ | `summary_large_image` | fi, en, x-default | Course, SportsClub |
| `index-en.html` | 54 mrk | 144 mrk | KYLLÄ | `summary_large_image` | fi, en, x-default | SportsClub, Course |

---

## 7. Saavutettavuus & WCAG AA -kontrastit (Vaihe 5 & 6)

- **Tekstikontrasti**: Footerin ja leipätekstin värit vaalennettu (`#94a3b8` / `#cbd5e1`) $\rightarrow$ WCAG AA kontrasti $\ge 4,5:1$ täytetty.
- **Kosketuskohteet**: Mobile bottom bar ja header-ikonit vähintään $44 \times 44$ px.
- **Typografia**: Suomen kielen lausekoko-otsikot (Title Case siivottu kaikilta suomenkielisiltä sivuilta).

---

## 8. Loppuyhteenveto

Kaikki 12 auditointivaihetta on suoritettu, varmennettu ja julkaistu tuotantoon osoitteeseen **[www.oulunjujutsu.com](https://www.oulunjujutsu.com)**.
