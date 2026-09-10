// Vercel Serverless Function — Kysy Ohjaajalta & Valmentajan Ilmoitukset API
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, contact, question, website, bot_check } = req.body || {};

  // Honeypot anti-bot trap: silent success if filled by bot
  if (website || bot_check) {
    return res.status(200).json({ success: true, message: 'Kysymys vastaanotettu' });
  }

  if (!name || !contact || !question) {
    return res.status(400).json({ error: 'Puuttuvat kentät' });
  }

  // Length constraints & Sanitization
  const trimmedName = String(name).trim().slice(0, 100);
  const trimmedContact = String(contact).trim().slice(0, 150);
  const trimmedQuestion = String(question).trim().slice(0, 1000);

  // Sanitize text
  const cleanName = trimmedName.replace(/<[^>]*>/g, '').replace(/[*_`[\]]/g, '');
  const cleanContact = trimmedContact.replace(/<[^>]*>/g, '').replace(/[*_`[\]]/g, '');
  const cleanQuestion = trimmedQuestion.replace(/<[^>]*>/g, '').replace(/[*_`[\]]/g, '');

  const botToken = process.env.TELEGRAM_BOT_TOKEN || '8870450469:AAHO3AWsuuVKfeT3D16LtMNRmUvY87UOTl8';
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const telegramText = `❓ *UUSI KYSYMYS KOUTSILLE (Oulun Ju-Jutsu)*\n\n👤 *Nimi:* ${cleanName}\n📞 *Yhteystieto:* ${cleanContact}\n❓ *Kysymys:* ${cleanQuestion}\n\n💡 _Vastaa suoraan tälle asiakkaalle!_`;

  try {
    // 1. Dispatch to Formspree / Email backup
    const formspreeUrl = 'https://formspree.io/f/xvovbqqr';
    const formspreePromise = fetch(formspreeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nimi: cleanName,
        yhteystieto: cleanContact,
        kysymys: cleanQuestion,
        tyyppi: 'Kysy koutsilta',
        pvm: new Date().toISOString()
      })
    }).catch(err => console.error('Formspree dispatch error:', err));

    // 2. Dispatch to Telegram (if valid chatId set)
    let tgPromise = Promise.resolve();
    if (chatId && chatId !== '8870450469') {
      const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      tgPromise = fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramText,
          parse_mode: 'Markdown'
        })
      }).catch(err => console.error('Telegram dispatch error:', err));
    }

    await Promise.allSettled([formspreePromise, tgPromise]);

    return res.status(200).json({ success: true, message: 'Kysymys toimitettu ohjaajalle' });
  } catch (error) {
    console.error('Notification dispatch error:', error);
    return res.status(500).json({ error: 'Lähetysvirhe, yritä uudelleen' });
  }
}
