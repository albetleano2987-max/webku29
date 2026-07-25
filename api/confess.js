export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    const GAS_URL = process.env.GAS_URL;

    if (!GAS_URL) {
      console.error("ERROR: GAS_URL environment variable belum diset di Vercel!");
      return res.status(500).json({ status: 'error', message: 'GAS_URL belum diset di Vercel' });
    }

    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `message=${encodeURIComponent(message)}`
    });

    const textResult = await response.text();
    console.log("Respon dari Google Apps Script:", textResult);

    return res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error("ERROR saat fetch ke Google:", error.message);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}
