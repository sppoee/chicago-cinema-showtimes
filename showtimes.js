// api/showtimes.js
// Vercel Serverless Function — proxies requests to SerpAPI

export default async function handler(req, res) {
  // Allow CORS so the browser can call this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const API_KEY = process.env.SERPAPI_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: 'SERPAPI_KEY not set in environment variables' });
  }

  const { q = 'movies in Chicago', date } = req.query;

  const params = new URLSearchParams({
    engine:   'google',
    q,
    location: 'Chicago, Illinois',
    hl:       'en',
    gl:       'us',
    api_key:  API_KEY,
  });
  if (date) params.set('tbs', `date:${date}`);

  try {
    const response = await fetch(`https://serpapi.com/search.json?${params}`);
    const data = await response.json();

    if (data.error) return res.status(400).json({ error: data.error });

    // Cache for 30 minutes
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
