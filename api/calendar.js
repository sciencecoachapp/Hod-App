export const config = { runtime: 'edge' };

export default async function handler(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  const url = new URL(request.url);
  const calUrl = url.searchParams.get('url');

  if (!calUrl) {
    return new Response('No calendar URL provided', { status: 400 });
  }

  // Only allow Google Calendar URLs for security
  if (!calUrl.includes('calendar.google.com')) {
    return new Response('Only Google Calendar URLs are allowed', { status: 403 });
  }

  try {
    const response = await fetch(calUrl, {
      headers: { 'User-Agent': 'HodApp/1.0' },
    });

    if (!response.ok) {
      return new Response('Could not fetch calendar: ' + response.status, {
        status: response.status,
      });
    }

    const text = await response.text();

    return new Response(text, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=1800',
      },
    });
  } catch (error) {
    return new Response('Failed to fetch calendar: ' + error.message, {
      status: 500,
    });
  }
}
