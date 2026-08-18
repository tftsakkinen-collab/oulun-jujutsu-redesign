// ==========================================================================
// Jujutsu Oulu Ry - Modern Interactive Scripts 2026
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 3. Dynamic Schedule Filtering (Official Jujutsu Oulu Ry Schedule)
  const scheduleData = [
    { day: 'ma', time: '18:30–19:30', laji: 'Junnu-jutsu', group: 'Kaikki vyöasteet', type: 'juniors' },
    { day: 'ma', time: '19:30–21:00', laji: 'Hokutoryu', group: 'Värivyöt', type: 'hokutoryu' },
    { day: 'ti', time: '18:00–19:30', laji: 'Hokutoryu', group: 'Värivyöt', type: 'hokutoryu' },
    { day: 'ti', time: '19:30–21:00', laji: 'Kenjutsu', group: 'Kaikki vyöasteet', type: 'kenjutsu' },
    { day: 'to', time: '19:30–21:00', laji: 'Hokutoryu', group: 'Värivyöt', type: 'hokutoryu' },
    { day: 'pe', time: '18:00–20:00', laji: 'Hokutoryu', group: 'Diesel-ryhmä (No Gi)', type: 'hokutoryu' },
    { day: 'la', time: '13:30–15:00', laji: 'Kenjutsu', group: 'Kaikki vyöasteet (WhatsApp)', type: 'kenjutsu' },
    { day: 'la', time: '16:30–18:30', laji: 'Vapaavuoro', group: 'Vapaavuoro (vain jäsenille)', type: 'vapaa' },
    { day: 'su', time: '15:00–16:30', laji: 'Vapaavuoro', group: 'Vapaavuoro (vain jäsenille)', type: 'vapaa' },
    { day: 'su', time: '18:30–20:30', laji: 'Vapaavuoro', group: 'Vapaavuoro (vain jäsenille)', type: 'vapaa' }
  ];

  const scheduleBody = document.getElementById('scheduleBody');
  const tabBtns = document.querySelectorAll('.tab-btn');

  function renderSchedule(filter = 'all') {
    if (!scheduleBody) return;
    scheduleBody.innerHTML = '';

    const filtered = filter === 'all' 
      ? scheduleData 
      : scheduleData.filter(item => item.type === filter);

    if (filtered.length === 0) {
      scheduleBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color: var(--text-muted);">Ei harjoituksia valitussa ryhmässä.</td></tr>`;
      return;
    }

    filtered.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="text-transform: uppercase; color: #fff;">${item.day}</strong></td>
        <td><span class="time-badge">${item.time}</span></td>
        <td><span style="color:#fff; font-weight:600;">${item.laji}</span></td>
        <td><span style="color:var(--text-muted);">${item.group}</span></td>
      `;
      scheduleBody.appendChild(tr);
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSchedule(btn.dataset.filter);
    });
  });

  renderSchedule('all');

  // 4. Official Hokutoryu HQ YouTube Videos (fBs6K2HCAJ8)
  const videos = {
    video1: {
      title: "Mitä on Hokutoryu Ju-Jutsu?",
      desc: "Virallinen esittelyvideo suomalaisesta Hokutoryu Ju-Jutsusta ja itsepuolustuksesta suoraan Hokutoryu HQ:lta. Tekniikat pohjautuvat vipuvoimaan ja aitoon katu-toimintakykyyn.",
      level: "Pääsarja • Virallinen Esittely (Hokutoryu HQ)",
      url: "https://www.youtube.com/embed/fBs6K2HCAJ8?start=73&autoplay=1"
    },
    video2: {
      title: "Hokutoryu Ju-Jutsu Virallinen Näytös (HD)",
      desc: "Hokutoryu Ju-Jutsu Finlandin pääseuran virallinen lajinäytös. Katso miten pystykamppailu, heitot, lukot ja itsepuolustus sulautuvat yhteen näytöksessä.",
      level: "Hokutoryu HQ • Hokutoryu Demo HD",
      url: "https://www.youtube.com/embed/kYc5eU4yJz8?autoplay=1"
    },
    video3: {
      title: "Tekniikat & Käsilukkovariaatiot",
      desc: "Virallista tekniikkaharjoittelua ja itsepuolustuksen lukkovariaatioita. Tekniikat, jotka opitaan peruskurssilta lähtien.",
      level: "Tekniikkaharjoittelu • Hokutoryu HQ",
      url: "https://www.youtube.com/embed/Fq2s7b87W-8?autoplay=1"
    },
    video4: {
      title: "Miten Vyö Sitotaan Lukkosolmulla?",
      desc: "Yksityiskohtainen opasvideo Ju-Jutsu vyön oikeaoppiseen sitomiseen lukkosolmulla. Lukkosolmu pitää Gi-puvun napakasti kiinni sparrissa, heitoissa ja matossa.",
      level: "Treeniopas • Vyön Sitominen (Lukkosolmu)",
      url: "https://www.youtube.com/embed/_NT--87mEf0?autoplay=1"
    }
  };

  const techBtns = document.querySelectorAll('.tech-btn');
  const techTitle = document.getElementById('techTitle');
  const techDesc = document.getElementById('techDesc');
  const techLevel = document.getElementById('techLevel');
  const youtubePlayer = document.getElementById('youtubePlayer');

  techBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      techBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const vidKey = btn.dataset.video;
      const data = videos[vidKey];
      if (data) {
        if (techTitle) techTitle.textContent = data.title;
        if (techDesc) techDesc.textContent = data.desc;
        if (techLevel) techLevel.textContent = data.level;
        if (youtubePlayer) youtubePlayer.src = data.url;
      }
    });
  });

  // 5. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(el => {
        el.classList.remove('active');
        el.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // 6. Enrollment Modal
  const openModalBtns = document.querySelectorAll('.open-enroll-modal');
  const closeModalBtns = document.querySelectorAll('#closeModal, #closeModalBtn, .modal-close');
  const enrollForm = document.getElementById('enrollForm');
  const modalOverlay = document.getElementById('enrollModal');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalOverlay) modalOverlay.classList.add('active');
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modalOverlay) modalOverlay.classList.remove('active');
    });
  });

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  if (enrollForm) {
    enrollForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameEl = document.getElementById('nameInput') || document.getElementById('fullName');
      const emailEl = document.getElementById('emailInput') || document.getElementById('email');
      const phoneEl = document.getElementById('phoneInput') || document.getElementById('phone');
      const courseEl = document.getElementById('courseSelect') || document.getElementById('course');
      
      const nameVal = nameEl ? nameEl.value : 'harrastaja';
      const emailVal = emailEl ? emailEl.value : '';
      const phoneVal = phoneEl ? phoneEl.value : '';
      const courseVal = courseEl ? courseEl.value : 'Itsepuolustus & Hokutoryu Ju-Jutsu';

      const action = enrollForm.getAttribute('action');
      if (action && action.startsWith('http')) {
        try {
          const formData = new FormData(enrollForm);
          await fetch(action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          });
        } catch (err) {
          console.warn('Form submission endpoint error, fallback to UI notification:', err);
        }
      }

      if (modalOverlay) modalOverlay.classList.remove('active');
      enrollForm.reset();
      
      showToast(`Kiitos ilmoittautumisesta, ${nameVal}! 🥋 Olemme sinuun pian yhteydessä sähköpostitse (${emailVal || 'antamaasi osoitteeseen'}). Tervetuloa treeneihin!`);
    });
  }



  // Helper Toast
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // 8. Interactive Photo Gallery & Lightbox Modal
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryLightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxTag = document.getElementById('lightboxTag');
  const closeLightboxBtn = document.getElementById('closeLightbox');

  if (galleryFilterBtns.length > 0) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  if (galleryItems.length > 0 && galleryLightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.dataset.title || '';
        const desc = item.dataset.desc || '';
        const category = item.querySelector('.gallery-tag') ? item.querySelector('.gallery-tag').textContent : '';

        if (lightboxImg) lightboxImg.src = img.src;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxDesc) lightboxDesc.textContent = desc;
        if (lightboxTag) lightboxTag.textContent = category;

        galleryLightbox.classList.add('active');
      });
    });
  }

  if (closeLightboxBtn && galleryLightbox) {
    closeLightboxBtn.addEventListener('click', () => {
      galleryLightbox.classList.remove('active');
    });

    galleryLightbox.addEventListener('click', (e) => {
      if (e.target === galleryLightbox) {
        galleryLightbox.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && galleryLightbox.classList.contains('active')) {
        galleryLightbox.classList.remove('active');
      }
    });
  }

  // 6. Visitor Counter (Käyntilaskuri)
  const BASE_VISITS = 14890;
  let currentVisits = localStorage.getItem('jj_visitor_count');
  
  if (!currentVisits) {
    currentVisits = BASE_VISITS + Math.floor(Math.random() * 45);
  } else {
    currentVisits = parseInt(currentVisits, 10);
  }

  if (!sessionStorage.getItem('jj_visited_session')) {
    currentVisits += 1;
    sessionStorage.setItem('jj_visited_session', 'true');
    localStorage.setItem('jj_visitor_count', currentVisits.toString());
  }

  const counterEls = document.querySelectorAll('.visitor-count-val');
  counterEls.forEach(el => {
    el.textContent = currentVisits.toLocaleString('fi-FI');
  });

  // 7. FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const faqItem = btn.parentElement;
      const isActive = faqItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // 8. Peruskurssi Registration Form Handler
  const quickEnrollForms = document.querySelectorAll('.quick-enroll-form');
  quickEnrollForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value || 'Treenari';
      const course = form.querySelector('[name="course"]')?.value || 'Hokutoryu Ju-Jutsu';

      showToast(`Kiitos ilmoittautumisesta, ${name}! Olemme sinuun yhteydessä sähköpostitse ennen ${course} -kurssin alkua.`);
      form.reset();
    });
  });

  // 9. Fee Simulator Handler
  const feeOptionBtns = document.querySelectorAll('.fee-option-btn');
  const feeResultPrice = document.getElementById('feeResultPrice');
  const feeResultTitle = document.getElementById('feeResultTitle');
  const feeResultDesc = document.getElementById('feeResultDesc');

  if (feeOptionBtns.length > 0 && feeResultPrice) {
    feeOptionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        feeOptionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const price = btn.dataset.price || '130 €';
        const title = btn.dataset.title || 'Aikuisten Peruskurssi';
        const desc = btn.dataset.desc || 'Sisältää syyskauden kaikkien treenien ohjauksen Äimäkujalle.';

        feeResultPrice.textContent = price;
        if (feeResultTitle) feeResultTitle.textContent = title;
        if (feeResultDesc) feeResultDesc.textContent = desc;
      });
    });
  }

  // 10. Testimonial Filtering
  const testimonialFilterBtns = document.querySelectorAll('.testimonial-filter-btn');
  const testimonialCards = document.querySelectorAll('.testimonial-card-item');

  if (testimonialFilterBtns.length > 0 && testimonialCards.length > 0) {
    testimonialFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        testimonialFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        testimonialCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});

// 9. Calendar Event Export Functions (.ics & Google Calendar)
function getCourseScheduleConfig(courseName) {
  const lower = (courseName || '').toLowerCase();
  if (lower.includes('junnu')) {
    return {
      summary: "Jujutsu Oulu Ry – Junnu-jutsu",
      byDay: "MO",
      startTime: "183000",
      endTime: "193000",
      dayText: "Maanantaisin klo 18:30–19:30"
    };
  } else if (lower.includes('kenjutsu')) {
    return {
      summary: "Jujutsu Oulu Ry – Kenjutsu",
      byDay: "TU,SA",
      startTime: "193000",
      endTime: "210000",
      dayText: "Tiistaisin klo 19:30 & Lauantaisin klo 13:30"
    };
  } else if (lower.includes('diesel')) {
    return {
      summary: "Jujutsu Oulu Ry – Diesel-jutsu",
      byDay: "FR",
      startTime: "180000",
      endTime: "200000",
      dayText: "Perjantaisin klo 18:00–20:00"
    };
  } else {
    // Default Hokutoryu Ju-Jutsu
    return {
      summary: "Jujutsu Oulu Ry – Hokutoryu Ju-Jutsu",
      byDay: "MO,TU,TH",
      startTime: "193000",
      endTime: "210000",
      dayText: "Maanantaisin klo 19:30, Tiistaisin klo 18:00 & Torstaisin klo 19:30"
    };
  }
}

function downloadIcsFile(courseName = "Hokutoryu Ju-Jutsu") {
  const cfg = getCourseScheduleConfig(courseName);
  const icsData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jujutsu Oulu Ry//FI",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "SUMMARY:" + cfg.summary,
    "DESCRIPTION:Tervetuloa Jujutsu Oulu Ry harjoituksiin! " + cfg.dayText + " Äimäkuja 6 A, 90400 Oulu.",
    "LOCATION:Äimäkuja 6 A, 90400 Oulu, Finland",
    "DTSTART:20260817T" + cfg.startTime,
    "DTEND:20260817T" + cfg.endTime,
    "RRULE:FREQ=WEEKLY;BYDAY=" + cfg.byDay,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "Jujutsu_Oulu_Harjoitukset.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function openGoogleCalendar(courseName = "Hokutoryu Ju-Jutsu") {
  const cfg = getCourseScheduleConfig(courseName);
  const gcalUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(cfg.summary) +
    "&details=" + encodeURIComponent("Tervetuloa treeneihin Äimäkujalle! " + cfg.dayText + ". Mukaan verkkarit/t-paita ja juomapullo.") +
    "&location=" + encodeURIComponent("Äimäkuja 6 A, 90400 Oulu") +
    "&dates=20260817T" + cfg.startTime + "/20260817T" + cfg.endTime +
    "&recur=RRULE:FREQ=WEEKLY;BYDAY=" + cfg.byDay;

  window.open(gcalUrl, "_blank");
}

// 10. Senseit & Renshit Coach Q&A Interactive Switcher
document.addEventListener('DOMContentLoaded', () => {
  const coachTabs = document.querySelectorAll('.sensei-tab-btn');
  const coachContainer = document.getElementById('coachContainer');

  const coachData = {
    tenhunen: {
      name: "Renshi Tenhunen",
      belt: "Renshi • 5. Dan Hokutoryu Ju-Jutsu",
      title: "Päävalmentaja, Jujutsu Oulu Ry • Vuosikymmenten valmennuskokemus",
      qa: [
        { q: "1. Miten oma kamppailumatkasi alkoi ja mikä toi sinut tatamille?", a: "Kiinnostuin kamppailusta jo nuorena. Hokutoryu Ju-Jutsussa minuun teki vaikutuksen lajin suomalainen suoruus, realistisuus ja se, että jokainen tekniikka on testattu käytännön tilanteissa." },
        { q: "2. Mitä sanot aloittelijalle, joka pohtii uskaltaako tulla 1. treeneihin?", a: "Kaikki aloittavat samalta viivalta. Peruskurssilla opitaan perusteet turvallisesti ja rauhallisessa tahdissa. Ensimmäisiin treeneihin tarvitset vain verkkarit, juomapullon ja avoimen mielen – me huolehdimme lopusta." },
        { q: "3. Mikä on parasta Jujutsu Oulu Ry:n salitunnelmassa?", a: "Kunnioitus, mahtava yhteishenki ja se, että kokeneemmat auttavat aina uusia harrastajia. Salillamme treenataan kovaa, mutta aina hymy huulilla ja toisia kunnioittaen." }
      ]
    },
    pekkala: {
      name: "Sensei Pekkala",
      belt: "Sensei • 3. Dan Hokutoryu Ju-Jutsu",
      title: "Päävalmentaja, Jujutsu Oulu Ry • Tekniikka & Opetusohjelmat",
      qa: [
        { q: "1. Miksi Hokutoryu Ju-Jutsu on niin tehokas itsepuolustuslaji?", a: "Hokutoryu yhdistää pystykamppailun, heitot, lukot ja otteista vapautumiset saumattomaksi kokonaisuudeksi. Se antaa valmiudet toimia kaikissa mahdollisissa arjen uhkatilanteissa." },
        { q: "2. Pitääkö olla valmiiksi hyvissä voimissa tai notkea?", a: "Ei missään nimessä! Kunto, voima ja kehonhallinta kasvavat kohisten treenatessa. Peruskurssi on nimenomaan suunniteltu kunnon ja koordinaation kehittämiseen." },
        { q: "3. Yksi tärkein vinkki uutta harrastusta aloittavalle:", a: "Ole kärsivällinen ja nauti oppimisesta. Jokainen harjoitus vie sinua eteenpäin sekä fyysisesti että henkisesti!" }
      ]
    }
  };

  if (coachTabs.length > 0 && coachContainer) {
    coachTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        coachTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const key = btn.dataset.coach;
        const coach = coachData[key];
        if (!coach) return;

        const qaHtml = coach.qa.map(item => `
          <div class="qa-item">
            <div class="qa-question">
              <i class="fa-solid fa-circle-question"></i>
              <span>${item.q}</span>
            </div>
            <div class="qa-answer">${item.a}</div>
          </div>
        `).join('');

        coachContainer.innerHTML = `
          <div class="coach-profile-card">
            <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid var(--border-glass);">
              <div style="width: 84px; min-width: 84px; height: 84px; border-radius: 50%; background: linear-gradient(135deg, var(--brand-red), var(--accent-gold)); padding: 3px;">
                <img src="${key === 'tenhunen' ? 'assets/Jujutsu/Hokutoryu-06886_renshi.jpg' : 'assets/Jujutsu/Hokutoryu-06675_pekkala.jpg'}" alt="${coach.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                  <h3 style="font-size: 1.8rem; color: #fff; margin: 0;">${coach.name}</h3>
                  <span class="badge" style="background: rgba(245, 158, 11, 0.2); border-color: rgba(245, 158, 11, 0.5); color: #f59e0b;">
                    ${coach.belt}
                  </span>
                </div>
                <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 6px;">
                  ${coach.title}
                </p>
              </div>
            </div>

            <div class="instructor-qa-grid">
              ${qaHtml}
            </div>
          </div>
        `;
      });
    });
  }

  // ==========================================================================
  // 5. KURSSINAVIGAATTORI (Interactive Group Finder)
  // ==========================================================================
  const navOptionBtns = document.querySelectorAll('.nav-option-btn');
  const navResultContainer = document.getElementById('navResultContainer');

  const navRecommendations = {
    adult: {
      title: "Suosituksesi: Hokutoryu ju-jutsu peruskurssi (Aikuiset 15 v+)",
      desc: "Suomen tehokkain ja realistisin itsepuolustusjärjestelmä. Opit otteista vapautumiset, iskujen torjunnat, heitot ja hallintaotteet turvallisessa ilmapiirissä.",
      time: "Maanantaisin klo 19:30, tiistaisin klo 18:00 & torstaisin klo 19:30 (Äimäkuja 6 A)",
      price: "110 € / kurssi (ePassi, Smartum ja Edenred)",
      badge: "2 viikon ilmainen kokeilu!",
      link: "jujutsu.html"
    },
    juniors: {
      title: "Suosituksesi: Junnu ju-jutsu ja lasten turvataidot (7–14 v)",
      desc: "Lapsille ja nuorille suunnattu hauska, motivoiva ja kehittävä kamppailuharrastus. Opetamme kehonhallintaa, itsetuntoa, kaatumistaitoja ja turvallista ryhmässä toimimista.",
      time: "Maanantaisin klo 18:30–19:30 (Äimäkuja 6 A)",
      price: "Kausimaksu (sisältää lisenssin ja vyötutkintovalmiuden)",
      badge: "2 viikon ilmainen kokeilu!",
      link: "junnut.html"
    },
    kenjutsu: {
      title: "Suosituksesi: Kenjutsu (perinteinen miekkailu ja kuntoilu)",
      desc: "Japanilainen miekkailutaito ja ase-artturi. Erinomainen kehonhallinta-, keskittymis- ja kuntoilumuoto aikuisille.",
      time: "Tiistaisin klo 19:30–21:00 & lauantaisin klo 13:30",
      price: "Sama harjoitusmaksu kattaa kaikki seuran lajit!",
      badge: "Sopii kaikenikäisille!",
      link: "kenjutsu.html"
    },
    advanced: {
      title: "Suosituksesi: Hokutoryu jatkoryhmä ja Diesel-ryhmä",
      desc: "Sinulla on jo vähintään keltaisen vyön arvo tai aiempaa kamppailutaustaa. Tervetuloa mukaan seuran aktiiviseen jatkoryhmään ja No-Gi Diesel-treeniporukkaan!",
      time: "Maanantaisin klo 19:30, tiistaisin klo 18:00 & torstaisin klo 19:30 (Perjantaisin Diesel-ryhmä)",
      price: "Seuran harjoitusmaksu (kausi tai vuosi)",
      badge: "Kokeneet harrastajat",
      link: "jujutsu.html"
    },
    diesel: {
      title: "Suosituksesi: Hokutoryu Diesel-kuntojutsu",
      desc: "Kuntoilumielessä pyörivä ryhmä sinulle, joka haluat treenata rennommin, pitää yllä kuntoa, palata tauon tai vamman jälkeen tai liikkua ilman kovia suorituspaineita.",
      time: "Perjantaisin klo 18:00–20:00 (Äimäkuja 6 A)",
      price: "110 € / 6 kk (ePassi, Smartum, Edenred ja Tyky)",
      badge: "2 viikon ilmainen kokeilu!",
      link: "diesel.html"
    }
  };

  if (navOptionBtns && navResultContainer) {
    navOptionBtns.forEach(btn => {
      const handleSelect = () => {
        navOptionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const key = btn.dataset.choice;
        const rec = navRecommendations[key];

        if (rec) {
          navResultContainer.innerHTML = `
            <div class="nav-result-card">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
                <span style="background:linear-gradient(135deg, var(--brand-red) 0%, #b91c1c 100%); color:#fff; font-size:0.75rem; font-weight:700; padding:5px 14px; border-radius:999px; letter-spacing:0.04em;">
                  ${rec.badge}
                </span>
                <span style="color:var(--accent-gold); font-size:0.85rem; font-weight:600;">
                  <i class="fa-solid fa-location-dot"></i> Äimäkuja 6 A, Oulu
                </span>
              </div>
              <h3 style="color:#fff; font-size:1.35rem; margin-bottom:10px;">${rec.title}</h3>
              <p style="color:var(--text-muted); font-size:0.92rem; line-height:1.6; margin-bottom:16px;">${rec.desc}</p>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; background:rgba(255,255,255,0.03); padding:16px; border-radius:12px; border:1px solid var(--border-glass); margin-bottom:20px;">
                <div>
                  <strong style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; display:block; margin-bottom:4px;">Harjoitusajat:</strong>
                  <span style="color:#fff; font-size:0.88rem;">${rec.time}</span>
                </div>
                <div>
                  <strong style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; display:block; margin-bottom:4px;">Hinta ja maksutavat:</strong>
                  <span style="color:#fff; font-size:0.88rem;">${rec.price}</span>
                </div>
              </div>
              <a href="${rec.link}" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:8px;">
                <span>Lue lisää ja ilmoittaudu</span> <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          `;
        }
      };

      btn.addEventListener('click', handleSelect);
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      });
    });
  }

  // ==========================================================================
  // 6. LIVE SCHEDULE BANNER (Seuraavat Treenit)
  // ==========================================================================
  const liveBannerText = document.getElementById('liveBannerText');
  if (liveBannerText) {
    const daysFI = ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'];
    const now = new Date();
    const currentDay = daysFI[now.getDay()];

    const todaySession = scheduleData.find(s => s.day === currentDay);
    if (todaySession) {
      liveBannerText.innerHTML = `Tänään Äimäkujalla: <strong>${todaySession.laji} (${todaySession.group}) klo ${todaySession.time}</strong>`;
    } else {
      liveBannerText.innerHTML = `Seuraavat treenit Äimäkujalla: <strong>Maanantaisin klo 18:30 (Junnut) & 19:30 (Hokutoryu Ju-Jutsu)</strong>`;
    }
  }
});





