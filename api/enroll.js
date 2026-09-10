// Vercel Serverless Function — Peruskurssi & Group Enrollments API
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, ryhma, sivu, website, _gotcha } = req.body || {};

  // Honeypot anti-bot check
  if (website || _gotcha) {
    return res.status(200).json({ success: true, message: 'Ilmoittautuminen vastaanotettu' });
  }

  if (!name || (!email && !phone)) {
    return res.status(400).json({ error: 'Nimi ja vähintään yksi yhteystieto (sähköposti tai puhelin) vaaditaan' });
  }

  const trimmedName = String(name).trim().slice(0, 100);
  const trimmedEmail = email ? String(email).trim().slice(0, 150) : '';
  const trimmedPhone = phone ? String(phone).trim().slice(0, 50) : '';
  const trimmedGroup = ryhma ? String(ryhma).trim().slice(0, 100) : 'Hokutoryu Ju-Jutsu Peruskurssi';
  const trimmedSource = sivu ? String(sivu).trim().slice(0, 100) : 'Kotisivu';

  // Sanitize text
  const cleanName = trimmedName.replace(/<[^>]*>/g, '').replace(/[*_`[\]]/g, '');
  const cleanEmail = trimmedEmail.replace(/<[^>]*>/g, '').replace(/[*_`[\]]/g, '');
  const cleanPhone = trimmedPhone.replace(/<[^>]*>/g, '').replace(/[*_`[\]]/g, '');
  const cleanGroup = trimmedGroup.replace(/<[^>]*>/g, '').replace(/[*_`[\]]/g, '');

  const botToken = process.env.TELEGRAM_BOT_TOKEN || '8870450469:AAHO3AWsuuVKfeT3D16LtMNRmUvY87UOTl8';
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const telegramText = `🔥 *UUSI PERUSKURSSI-ILMOITTAUTUMINEN (Oulun Ju-Jutsu)*\n\n👤 *Nimi:* ${cleanName}\n📧 *Sähköposti:* ${cleanEmail || 'Ei ilmoitettu'}\n📞 *Puhelin:* ${cleanPhone || 'Ei ilmoitettu'}\n🥋 *Ryhmä:* ${cleanGroup}\n🌐 *Sivu:* ${trimmedSource}\n\n💡 _Ota yhteyttä asiakkaaseen 24h sisällä!_`;

  try {
    // 1. Dispatch to Formspree / Email backup
    const formspreeUrl = 'https://formspree.io/f/xvovbqqr';
    const formspreePromise = fetch(formspreeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nimi: cleanName,
        sahkoposti: cleanEmail,
        puhelin: cleanPhone,
        ryhma: cleanGroup,
        sivu: trimmedSource,
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

    return res.status(200).json({
      success: true,
      message: 'Ilmoittautuminen vastaanotettu onnistuneesti! Tervetuloa mukaan kokeilemaan 2 viikkoa ilmaiseksi.'
    });
  } catch (error) {
    console.error('Enrollment processing error:', error);
    return res.status(500).json({ error: 'Käsittelyvirhe, yritä uudelleen' });
  }
}
