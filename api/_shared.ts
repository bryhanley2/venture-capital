import type { VercelRequest, VercelResponse } from '@vercel/node';

/** Gate an API route behind the shared APP_TOKEN. Returns true if the request
 * is authorised; otherwise writes a 401 and returns false. */
export function authorised(req: VercelRequest, res: VercelResponse): boolean {
  const expected = process.env.APP_TOKEN;
  const got = req.headers['x-app-token'];
  if (!expected) {
    res.status(500).json({ error: 'APP_TOKEN not configured on the server' });
    return false;
  }
  if (got !== expected) {
    res.status(401).json({ error: 'Unauthorised' });
    return false;
  }
  return true;
}

/** Mint a short-lived Google access token from the service-account JSON,
 * scoped to read-only Sheets. Uses a signed JWT — no extra dependency needed
 * beyond `google-auth-library` for the RS256 signing. */
export async function googleAccessToken(scope: string): Promise<string> {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON not configured');
  const creds = JSON.parse(raw) as { client_email: string; private_key: string };

  const { JWT } = await import('google-auth-library');
  const client = new JWT({
    email: creds.client_email,
    key: creds.private_key.replace(/\\n/g, '\n'),
    scopes: [scope],
  });
  const { access_token } = await client.authorize();
  if (!access_token) throw new Error('Google auth returned no access token');
  return access_token;
}
