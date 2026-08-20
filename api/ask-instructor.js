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
  
  // Send message to Telegram API (gets delivered directly to Janne's Telegram bot!)
  const telegramText = `📩 *UUSI KYSYMYS SIVUSTOLTA (Oulun Ju-Jutsu)*\n\n👤 *Nimi:* ${name}\n📞 *Yhteystieto:* ${contact}\n❓ *Kysymys:* ${question}\n\n💡 _Vastaa suoraan tälle asiakkaalle!_`;

  try {
    // Send to Telegram getUpdates active chat or default broadcast
    const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    // We send to Telegram bot endpoint
    const response = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: req.body.chat_id || '8870450469', // Telegram Bot ID
        text: telegramText,
        parse_mode: 'Markdown'
      })
    });

    return res.status(200).json({ success: true, message: 'Kysymys toimitettu ohjaajalle' });
  } catch (error) {
    console.error('Telegram notification error:', error);
    return res.status(500).json({ error: 'Lähetysvirhe' });
  }
}
