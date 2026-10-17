import type { IncomingMessage, ServerResponse } from 'node:http';
import { checkBotId } from 'botid/server';

const formUrl = 'https://givc-columbia-website.vercel.app/contact';
const allowedOrigins = new Set([
  'https://givc-columbia.com',
  'https://www.givc-columbia.com',
  'https://givc-columbia-website.vercel.app',
]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxBodyBytes = 16384;

function reply(response: ServerResponse, status: number, body: object) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(JSON.stringify(body));
}

// Only fixed reason codes are returned or logged: never provider bodies, the recipient, or message contents.
function providerFailure(response: ServerResponse, reason: string) {
  console.error(`Contact forwarding failed: ${reason}`);
  reply(response, 502, { success: false, reason });
}

export default async function contact(request: IncomingMessage, response: ServerResponse) {
  const recipient = process.env.CONTACT_RECIPIENT?.trim();
  const ready = process.env.VERCEL_ENV === 'production'
    && Boolean(recipient && recipient.length <= 254 && emailPattern.test(recipient));

  if (request.method === 'GET') {
    reply(response, 200, { ready });
    return;
  }
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'GET, POST');
    reply(response, 405, { success: false });
    return;
  }
  if (!allowedOrigins.has(request.headers.origin ?? '')) {
    reply(response, 403, { success: false });
    return;
  }
  if (!ready) {
    reply(response, 503, { success: false });
    return;
  }
  if (request.headers['content-type']?.split(';')[0]?.trim().toLowerCase() !== 'application/json') {
    reply(response, 415, { success: false });
    return;
  }
  if (Number(request.headers['content-length']) > maxBodyBytes) {
    reply(response, 413, { success: false });
    return;
  }

  let data: unknown;
  try {
    const chunks: Buffer[] = [];
    let bytes = 0;
    for await (const chunk of request.iterator({ destroyOnReturn: false })) {
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      bytes += buffer.length;
      if (bytes > maxBodyBytes) {
        request.resume();
        reply(response, 413, { success: false });
        return;
      }
      chunks.push(buffer);
    }
    data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    reply(response, 400, { success: false });
    return;
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    reply(response, 400, { success: false });
    return;
  }
  const fields = data as Record<string, unknown>;
  const { name, email, message, _honey = '' } = fields;
  if (
    typeof name !== 'string' || !name.trim() || name.trim().length > 100 || /[\r\n\0]/.test(name)
    || typeof email !== 'string' || email.trim().length > 254 || !emailPattern.test(email.trim())
    || typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 5000
    || typeof _honey !== 'string'
  ) {
    reply(response, 400, { success: false });
    return;
  }
  if (_honey.trim()) {
    reply(response, 200, { success: true });
    return;
  }

  try {
    const verification = await checkBotId({ advancedOptions: { checkLevel: 'basic' } });
    if (!verification.isHuman || verification.isBot || verification.bypassed) {
      reply(response, 403, { success: false });
      return;
    }
  } catch {
    reply(response, 503, { success: false });
    return;
  }

  try {
    const upstream = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient!)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: new URL(formUrl).origin,
        Referer: formUrl,
      },
      redirect: 'error',
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        _replyto: email.trim(),
        _subject: 'New message from the GIVC Columbia website',
        _template: 'table',
        _url: formUrl,
        // BotID verifies the request before this server-to-server submission.
        _captcha: 'false',
      }),
    });
    if (!upstream.ok) {
      providerFailure(response, `provider-http-${upstream.status}`);
      return;
    }
    let result: unknown;
    try {
      result = JSON.parse(await upstream.text());
    } catch {
      providerFailure(response, 'provider-invalid-response');
      return;
    }
    const accepted = result && typeof result === 'object' && 'success' in result
      && (result.success === true || result.success === 'true');
    if (accepted) reply(response, 200, { success: true });
    else providerFailure(response, 'provider-rejected');
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError');
    providerFailure(response, timedOut ? 'provider-timeout' : 'provider-unreachable');
  }
}
