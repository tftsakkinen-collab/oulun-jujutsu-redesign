// Vercel Serverless Function — Telegram Kysy Ohjaajalta Forwarder
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, contact, question } = req.body || {};

  if (!name || !contact || !question) {
    return res.status(400).json({ error: 'Puuttuvat kentät' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN || '8870450469:AAHO3AWsuuVKfeT3D16LtMNRmUvY87UOTl8';
  const chatId = process.env.TELEGRAM_CHAT_ID || '8870450469';

  // Sanitize text for Telegram Markdown
  const cleanName = String(name).replace(/[*_`[\]]/g, '');
  const cleanContact = String(contact).replace(/[*_`[\]]/g, '');
  const cleanQuestion = String(question).replace(/[*_`[\]]/g, '');

  const telegramText = `📩 *UUSI KYSYMYS SIVUSTOLTA (Oulun Ju-Jutsu)*\n\n👤 *Nimi:* ${cleanName}\n📞 *Yhteystieto:* ${cleanContact}\n❓ *Kysymys:* ${cleanQuestion}\n\n💡 _Vastaa suoraan tälle asiakkaalle!_`;

  try {
    const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramText,
        parse_mode: 'Markdown'
      })
    });

    if (!response.ok) {
      const errData = await response.text();
      console.error('Telegram API error:', errData);
      return res.status(502).json({ error: 'Telegram-virhe' });
    }

    return res.status(200).json({ success: true, message: 'Kysymys toimitettu ohjaajalle' });
  } catch (error) {
    console.error('Telegram notification error:', error);
    return res.status(500).json({ error: 'Lähetysvirhe' });
  }
}
