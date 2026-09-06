import type { VercelRequest, VercelResponse } from '@vercel/node';
import { authorised } from './_shared.js';

const MODEL = process.env.PIPELINE_MODEL || 'claude-sonnet-5';

const SCHEMA = `{
  "is_operating_company": true/false,   // false = a fund, accelerator, government program, nonprofit, or industry body
  "is_second_layer": "yes" | "borderline" | "no",   // solves a problem CREATED BY a dominant trend, not the trend itself
  "second_layer_reason": "one sentence",
  "current_stage": "pre-seed" | "seed" | "seed extension" | "series a" | "series b+" | "grant-only" | "unknown",
  "total_raised_usd": integer or null,
  "latest_round": "e.g. $13.5M Seed (May 2025, led by X)" or null,
  "founded_year": "YYYY" or null,
  "founders": "names + prior roles, or 'not found'",
  "traction": "named customers / pilots / revenue, or 'not found'",
  "take": "2-3 sentence investor take: what they do, why it matters, the main risk",
  "sources": ["url", ...]
}`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!authorised(req, res)) return;
  if (req.method !== 'POST') { res.status(405).json({ error: 'POST only' }); return; }

  const { company, url } = (req.body || {}) as { company?: string; url?: string };
  const name = (company || '').trim();
  if (!name) { res.status(400).json({ error: 'company is required' }); return; }

  try {
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const prompt =
      `Research the startup "${name}"${url ? ` (${url})` : ''} using web search, then assess it ` +
      `against the "Second Layer" venture thesis: invest in companies that solve problems CREATED BY ` +
      `a dominant industry trend, not companies that ARE the trend.\n\n` +
      `Only state what you can source. If you cannot confirm the company is real, say so.\n\n` +
      `Reply with ONE JSON object and nothing else:\n${SCHEMA}`;

    const tools = [{ type: 'web_search_20260209', name: 'web_search', max_uses: 4 } as any];
    const messages: any[] = [{ role: 'user', content: prompt }];

    let resp: any = null;
    for (let i = 0; i < 4; i++) {
      resp = await client.messages.create({ model: MODEL, max_tokens: 1400, tools, messages });
      if (resp.stop_reason !== 'pause_turn') break;
      messages.push({ role: 'assistant', content: resp.content });
    }

    const text: string = (resp?.content || [])
      .filter((b: any) => b.type === 'text')
      .map((b: any) => b.text)
      .join('')
      .trim();

    let parsed: any = null;
    const s = text.indexOf('{');
    const e = text.lastIndexOf('}');
    if (s !== -1 && e > s) {
      try { parsed = JSON.parse(text.slice(s, e + 1)); } catch { /* fall through */ }
    }

    if (!parsed) {
      res.status(200).json({ company: name, raw: text || '(no response)', parsed: null });
      return;
    }
    res.status(200).json({ company: name, url: url || '', ...parsed });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'company-check failed' });
  }
}
