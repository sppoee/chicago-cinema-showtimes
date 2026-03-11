// api/showtimes.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const API_KEY = process.env.SERPAPI_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: 'SERPAPI_KEY not set' });
  }

  const { q = 'movies in Chicago today', debug } = req.query;

const params = new URLSearchParams({
  engine:   'google',
  q:        'movies playing in Chicago',
  location: 'Chicago, Illinois, United States',
  hl:       'en',
  gl:       'us',
  api_key:  API_KEY,
});

  try {
    const response = await fetch(`https://serpapi.com/search.json?${params}`);
    const data = await response.json();

    if (data.error) return res.status(400).json({ error: data.error });

    // Debug mode — return raw response keys so we can inspect structure
    if (debug === '1') {
      return res.status(200).json({
        _debug: true,
        top_keys: Object.keys(data),
        showtimes_sample: data.showtimes ? JSON.stringify(data.showtimes[0]).slice(0, 800) : null,
        movies_results_count: data.movies_results ? data.movies_results.length : 0,
      });
    }

    // Normalize: SerpAPI returns two possible structures depending on query
    // Structure A: showtimes[].theaters[].showing[]  — "movies near Chicago"
    // Structure B: showtimes[].movies[].theaters[]   — movie title search
    const rawDays = data.showtimes || [];

    const normalized = rawDays.map(day => {
      if (day.theaters && day.theaters.length > 0) {
        // Already correct format
        return day;
      }

      if (day.movies && day.movies.length > 0) {
        // Convert movies-first to theaters-first
        const theaterMap = {};
        day.movies.forEach(movie => {
          (movie.theaters || []).forEach(t => {
            if (!theaterMap[t.name]) {
              theaterMap[t.name] = {
                name: t.name,
                address: t.address || '',
                distance: t.distance || '',
                showing: [],
              };
            }
            (t.showing || []).forEach(s => {
              theaterMap[t.name].showing.push({
                movie: movie.name,
                type: s.type || 'Standard',
                time: s.time || [],
              });
            });
          });
        });
        return { ...day, theaters: Object.values(theaterMap) };
      }

      return { ...day, theaters: [] };
    });

    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate');
    return res.status(200).json({ ...data, showtimes: normalized });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
