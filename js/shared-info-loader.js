// Dynamisoitu Oulun Jujutsu Shared Info Loader
document.addEventListener('DOMContentLoaded', () => {
  fetch('/data/shared_info.json')
    .then(res => res.json())
    .then(data => {
      if (data && data.yhteystiedot) {
        const contactElems = document.querySelectorAll('.shared-contact-email');
        contactElems.forEach(el => {
          el.textContent = data.yhteystiedot.sahkoposti;
          if (el.tagName === 'A') {
            el.href = `mailto:${data.yhteystiedot.sahkoposti}`;
          }
        });
      }
    })
    .catch(() => {
      // Quiet fallback if not served over HTTP
    });
});
