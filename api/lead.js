// Vercel Serverless Function — Dual-Dispatch Lead & Email Automation API
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, website, bot_check } = req.body || {};

  // Honeypot anti-bot trap: silent success if filled by bot
  if (website || bot_check) {
    return res.status(200).json({ success: true, message: 'Liittyminen vastaanotettu' });
  }

  if (!name || !email) {
    return res.status(400).json({ error: 'Nimi ja sähköpostiosoite ovat pakollisia' });
  }

  const trimmedName = String(name).trim().slice(0, 100);
  const trimmedEmail = String(email).trim().slice(0, 150);
  const trimmedPhone = phone ? String(phone).trim().slice(0, 50) : '';

  // Sanitize text
  const cleanName = trimmedName.replace(/<[^>]*>/g, '').replace(/[*_`[\]]/g, '');
  const cleanEmail = trimmedEmail.replace(/<[^>]*>/g, '').replace(/[*_`[\]]/g, '');
  const cleanPhone = trimmedPhone.replace(/<[^>]*>/g, '').replace(/[*_`[\]]/g, '');

  const driveFolderUrl = process.env.GOOGLE_DRIVE_FOLDER_URL || 'https://drive.google.com/drive/folders/10GSV-Au7XPeJRZCAVzhy5fCPgrk-izHM?usp=sharing';

  // 1. Dispatch A: Admin Notification via Telegram
  const botToken = process.env.TELEGRAM_BOT_TOKEN || '8870450469:AAHO3AWsuuVKfeT3D16LtMNRmUvY87UOTl8';
  const chatId = process.env.TELEGRAM_CHAT_ID || '8870450469';

  const telegramText = `📩 *UUSI SÄHKÖPOSTILISTALIIDI (Oulun Ju-Jutsu)*\n\n👤 *Nimi:* ${cleanName}\n📧 *Sähköposti:* ${cleanEmail}\n📞 *Puhelin:* ${cleanPhone || 'Ei ilmoitettu'}\n\n💡 _Liittynyt ilmaisoppaan & videoiden lataajaksi!_`;

  try {
    // Send Telegram Notification to Coach
    const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const tgPromise = fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramText,
        parse_mode: 'Markdown'
      })
    }).catch(err => console.error('Telegram notification error:', err));

    // Send Google Sheets / Formspree Logging Webhook
    const sheetsUrl = process.env.APPS_SCRIPT_LEAD_URL || 'https://formspree.io/f/xvovbqqr';
    const sheetsPromise = fetch(sheetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nimi: cleanName,
        sahkoposti: cleanEmail,
        puhelin: cleanPhone,
        tyyppi: 'Ilmaisopas & Sähköpostilista',
        pvm: new Date().toISOString()
      })
    }).catch(err => console.error('Sheets logging error:', err));

    await Promise.allSettled([tgPromise, sheetsPromise]);

    return res.status(200).json({
      success: true,
      message: 'Liittyminen onnistui! Vahvistus ja opasmateriaalit ovat avattavissa.',
      driveUrl: driveFolderUrl
    });
  } catch (error) {
    console.error('Lead processing error:', error);
    return res.status(500).json({ error: 'Käsittelyvirhe, yritä uudelleen' });
  }
}
