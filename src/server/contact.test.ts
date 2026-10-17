// @vitest-environment node
import { createServer, request as httpRequest } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { checkBotId } from 'botid/server';
import contact from '../../api/contact';

vi.mock('botid/server', () => ({ checkBotId: vi.fn() }));

const networkFetch = globalThis.fetch;
const providerFetch = vi.fn<typeof fetch>();
const botCheck = vi.mocked(checkBotId);
const server = createServer(contact);
const recipient = 'recipient@example.test';
const validMessage = {
  name: 'A visitor',
  email: 'visitor@example.test',
  message: 'I would like to learn more about the chapter.',
  _honey: '',
};
let endpoint: string;

beforeAll(async () => {
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  endpoint = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

beforeEach(() => {
  vi.stubEnv('VERCEL_ENV', 'production');
  vi.stubEnv('CONTACT_RECIPIENT', recipient);
  botCheck.mockReset().mockResolvedValue({
    isHuman: true, isBot: false, isVerifiedBot: false, bypassed: false,
  });
  providerFetch.mockReset().mockResolvedValue(Response.json({ success: 'true' }));
  vi.stubGlobal('fetch', providerFetch);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function post(body: unknown = validMessage, origin = 'https://givc-columbia.com') {
  return networkFetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify(body),
  });
}

describe('private contact server', () => {
  it('reports only readiness, never the recipient or provider endpoint', async () => {
    const response = await networkFetch(endpoint);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ready: true });
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(providerFetch).not.toHaveBeenCalled();
    expect(botCheck).not.toHaveBeenCalled();
  });

  it.each(['preview', 'development'])('does not forward from %s deployments', async (environment) => {
    vi.stubEnv('VERCEL_ENV', environment);
    expect(await (await networkFetch(endpoint)).json()).toEqual({ ready: false });
    expect((await post()).status).toBe(503);
    expect(providerFetch).not.toHaveBeenCalled();
  });

  it.each(['', 'not-an-email', 'person@example.test\r\nInjected: value'])('fails closed with invalid recipient configuration', async (value) => {
    vi.stubEnv('CONTACT_RECIPIENT', value);
    expect(await (await networkFetch(endpoint)).json()).toEqual({ ready: false });
    expect((await post()).status).toBe(503);
    expect(providerFetch).not.toHaveBeenCalled();
  });

  it.each(['PUT', 'DELETE', 'OPTIONS'])('rejects unsupported %s requests', async (method) => {
    const response = await networkFetch(endpoint, { method });
    expect(response.status).toBe(405);
    expect(response.headers.get('allow')).toBe('GET, POST');
    expect(providerFetch).not.toHaveBeenCalled();
  });

  it.each(['https://evil.example', 'https://givc-columbia.com.evil.example', 'null', 'http://givc-columbia.com'])(
    'rejects a foreign or invalid origin: %s', async (origin) => {
      expect((await post(validMessage, origin)).status).toBe(403);
      expect(botCheck).not.toHaveBeenCalled();
      expect(providerFetch).not.toHaveBeenCalled();
    },
  );

  it('rejects a missing origin and non-JSON bodies', async () => {
    expect((await networkFetch(endpoint, { method: 'POST' })).status).toBe(403);
    expect((await networkFetch(endpoint, {
      method: 'POST', headers: { Origin: 'https://givc-columbia.com' }, body: 'message=hello',
    })).status).toBe(415);
    expect(providerFetch).not.toHaveBeenCalled();
  });

  it('rejects malformed JSON and oversized requests', async () => {
    for (const [body, status] of [['{invalid', 400], ['x'.repeat(17000), 413]] as const) {
      const response = await networkFetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Origin: 'https://givc-columbia.com' },
        body,
      });
      expect(response.status).toBe(status);
    }
    expect(providerFetch).not.toHaveBeenCalled();
  });

  it('caps streamed request bodies even without a Content-Length header', async () => {
    const status = await new Promise<number>((resolve, reject) => {
      const request = httpRequest(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Origin: 'https://givc-columbia.com' },
      }, (response) => {
        response.resume();
        response.on('end', () => resolve(response.statusCode!));
      });
      request.on('error', reject);
      request.write('x'.repeat(8500));
      request.write('x'.repeat(8500));
      request.end();
    });
    expect(status).toBe(413);
    expect(providerFetch).not.toHaveBeenCalled();
  });

  it.each([
    null, [], {}, { ...validMessage, name: [] }, { ...validMessage, name: '  ' },
    { ...validMessage, name: 'x'.repeat(101) }, { ...validMessage, name: 'name\r\nInjected: value' },
    { ...validMessage, email: 'invalid' }, { ...validMessage, email: 'visitor@example.test\nBcc:test' },
    { ...validMessage, email: `${'x'.repeat(250)}@example.test` },
    { ...validMessage, message: 'short' }, { ...validMessage, message: 'x'.repeat(5001) },
    { ...validMessage, message: { unsafe: true } }, { ...validMessage, _honey: [] },
  ])('validates all fields on the server: %#', async (body) => {
    expect((await post(body)).status).toBe(400);
    expect(botCheck).not.toHaveBeenCalled();
    expect(providerFetch).not.toHaveBeenCalled();
  });

  it('silently discards honeypot submissions without sending email', async () => {
    const response = await post({ ...validMessage, _honey: 'filled by a bot' });
    expect(await response.json()).toEqual({ success: true });
    expect(botCheck).not.toHaveBeenCalled();
    expect(providerFetch).not.toHaveBeenCalled();
  });

  it.each(['bot', 'unclassified', 'bypassed', 'unavailable'])('fails closed when bot verification is %s', async (result) => {
    if (result === 'unavailable') botCheck.mockRejectedValueOnce(new Error('Internal bot verification details'));
    else botCheck.mockResolvedValueOnce({
      isHuman: result === 'bypassed', isBot: result === 'bot',
      isVerifiedBot: false, bypassed: result === 'bypassed',
    });
    const response = await post();
    expect(response.status).toBe(result === 'unavailable' ? 503 : 403);
    expect(await response.json()).toEqual({ success: false });
    expect(providerFetch).not.toHaveBeenCalled();
  });

  it.each([
    'https://givc-columbia.com',
    'https://www.givc-columbia.com',
    'https://givc-columbia-website.vercel.app',
  ])('forwards a verified message from %s with only server-controlled routing', async (origin) => {
    const response = await post({
      ...validMessage, name: ' A visitor ', email: ' visitor@example.test ',
      _cc: 'attacker@example.test', _subject: 'Injected', _url: 'https://evil.example',
      recipient: 'attacker@example.test',
    }, origin);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(botCheck).toHaveBeenCalledWith({ advancedOptions: { checkLevel: 'basic' } });
    expect(providerFetch).toHaveBeenCalledExactlyOnceWith(
      `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`,
      expect.objectContaining({
        method: 'POST', redirect: 'error', signal: expect.any(AbortSignal),
        body: JSON.stringify({
          name: 'A visitor', email: 'visitor@example.test', message: validMessage.message,
          _replyto: 'visitor@example.test',
          _subject: 'New message from the GIVC Columbia website',
          _template: 'table', _url: 'https://givc-columbia-website.vercel.app/contact', _captcha: 'false',
        }),
      }),
    );
    expect(botCheck.mock.invocationCallOrder[0]).toBeLessThan(providerFetch.mock.invocationCallOrder[0]!);
  });

  it('accepts a boolean provider acknowledgment too', async () => {
    providerFetch.mockResolvedValueOnce(Response.json({ success: true }));
    expect(await (await post()).json()).toEqual({ success: true });
  });

  it.each(['activation', 'http', 'malformed', 'network'])('does not claim success or expose details on %s failures', async (failure) => {
    if (failure === 'network') providerFetch.mockRejectedValueOnce(new Error(`Private details: ${recipient}`));
    else if (failure === 'http') providerFetch.mockResolvedValueOnce(new Response(recipient, { status: 429 }));
    else if (failure === 'malformed') providerFetch.mockResolvedValueOnce(new Response(recipient));
    else providerFetch.mockResolvedValueOnce(Response.json({ success: false, message: recipient }));
    const response = await post();
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ success: false });
    expect(providerFetch).toHaveBeenCalledTimes(1);
  });
});
