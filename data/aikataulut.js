// Jujutsu Oulu Ry - Virallinen Harjoitusaikatauludata 2026
window.aikataulutData = [
  {
    day: 'ma',
    start: '18:30',
    end: '19:30',
    time: '18:30–19:30',
    laji: 'Junnu Ju-Jutsu',
    group: 'Kaikki vyöasteet (7–14v)',
    type: 'junnut',
    location: 'Äimäkuja 6 A'
  },
  {
    day: 'ma',
    start: '19:30',
    end: '21:00',
    time: '19:30–21:00',
    laji: 'Hokutoryu Ju-Jutsu',
    group: 'Peruskurssi & Värivyöt',
    type: 'hokutoryu',
    location: 'Äimäkuja 6 A'
  },
  {
    day: 'ti',
    start: '18:00',
    end: '19:30',
    time: '18:00–19:30',
    laji: 'Hokutoryu Ju-Jutsu',
    group: 'Peruskurssi & Värivyöt (Vk 38: 18:00 Peruskurssi, 19:00 Värivyöt)',
    type: 'hokutoryu',
    location: 'Äimäkuja 6 A'
  },
  {
    day: 'ti',
    start: '19:30',
    end: '21:00',
    time: '19:30–21:00',
    laji: 'Kenjutsu',
    group: 'Kaikki vyöasteet (Vk 38 alkaen 20:00–21:00)',
    type: 'kenjutsu',
    location: 'Äimäkuja 6 A'
  },
  {
    day: 'to',
    start: '19:30',
    end: '21:00',
    time: '19:30–21:00',
    laji: 'Hokutoryu Ju-Jutsu',
    group: 'Peruskurssi & Värivyöt (Vk 38: 19:30 Värivyöt, 20:30 Peruskurssi)',
    type: 'hokutoryu',
    location: 'Äimäkuja 6 A'
  },
  {
    day: 'pe',
    start: '18:00',
    end: '20:00',
    time: '18:00–20:00',
    laji: 'Diesel-jutsu',
    group: 'Kuntoilijat & No-Gi',
    type: 'diesel',
    location: 'Äimäkuja 6 A'
  },
  {
    day: 'la',
    start: '13:30',
    end: '15:00',
    time: '13:30–15:00',
    laji: 'Kenjutsu',
    group: 'Kaikki vyöasteet (Vahvistus WhatsApp)',
    type: 'kenjutsu',
    location: 'Äimäkuja 6 A'
  },
  {
    day: 'la',
    start: '16:30',
    end: '18:30',
    time: '16:30–18:30',
    laji: 'Vapaavuoro',
    group: 'Vapaavuoro (Jäsenille)',
    type: 'vapaa',
    location: 'Äimäkuja 6 A'
  },
  {
    day: 'su',
    start: '15:00',
    end: '16:30',
    time: '15:00–16:30',
    laji: 'Vapaavuoro',
    group: 'Vapaavuoro (Jäsenille)',
    type: 'vapaa',
    location: 'Äimäkuja 6 A'
  },
  {
    day: 'su',
    start: '18:30',
    end: '20:30',
    time: '18:30–20:30',
    laji: 'Vapaavuoro',
    group: 'Vapaavuoro (Jäsenille)',
    type: 'vapaa',
    location: 'Äimäkuja 6 A'
  }
];
var aikataulutData = window.aikataulutData;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.aikataulutData;
}
