export function getCountryFromIP(request: Request): string {
  // For local testing
  if (process.env.NODE_ENV === 'development') {
    return 'tr'; // or 'gb' for testing
  }

  const country = 
    request.headers.get('cf-ipcountry') || 
    request.headers.get('x-vercel-ip-country');

  return country?.toLowerCase() || '';
} 