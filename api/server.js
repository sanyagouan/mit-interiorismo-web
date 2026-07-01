// MIT Interiorismo · API de contacto
// Recibe leads del chatbot → envía a María vía email + Telegram
// Sin dependencia de BD: usa archivos JSON como log de leads.
//
// Variables de entorno:
//   PORT                     - default 3100
//   SMTP_URL                 - mailgun://user:pass@mg.domain.com (opcional)
//   MAIL_TO                  - email destino María
//   MAIL_FROM                - email remitente
//   TELEGRAM_BOT_TOKEN       - token bot Telegram
//   TELEGRAM_CHAT_ID         - chat id destino María
//
// Si no hay SMTP/Telegram configurados, la API hace log a disco igualmente.

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3100', 10);
const LEADS_FILE = path.join(__dirname, 'leads.jsonl');
const LOG_FILE = path.join(__dirname, 'api.log');

function log(...args) {
  const line = `[${new Date().toISOString()}] ` + args.map(a => typeof a === 'string' ? a : JSON.stringify(a)).join(' ');
  console.log(line);
  try { fs.appendFileSync(LOG_FILE, line + '\n'); } catch (e) {}
}

const app = express();
app.use(cors({
  origin: ['https://www.mitinteriorismo.studio', 'http://localhost:4321', 'http://localhost'],
  methods: ['GET', 'POST']
}));
app.use(express.json({ limit: '64kb' }));

// Healthcheck
app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'mit-contact-api', ts: new Date().toISOString() });
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  const data = req.body || {};
  const name = String(data.name || '').trim().slice(0, 200);
  const contact = String(data.contact || '').trim().slice(0, 200);
  const topic = String(data.topic || '').trim().slice(0, 2000);
  const mode = String(data.mode || 'contact').trim();
  const source = String(data.source || 'web').trim();
  const page = String(data.page || '').trim().slice(0, 500);
  const ts = data.ts || new Date().toISOString();

  // Validación básica
  if (!name || !contact) {
    log('VALIDATION_FAIL', { name, contact });
    return res.status(400).json({ ok: false, error: 'Faltan campos obligatorios (nombre, contacto).' });
  }

  const lead = {
    id: 'L' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name, contact, topic, mode, source, page, ts,
    receivedAt: new Date().toISOString()
  };

  // Persistir
  try { fs.appendFileSync(LEADS_FILE, JSON.stringify(lead) + '\n'); }
  catch (e) { log('PERSIST_FAIL', e.message); }

  log('LEAD', { id: lead.id, name, contact, topic: topic.slice(0, 80) });

  // Email (SMTP) — solo si está configurado
  if (process.env.SMTP_URL && process.env.MAIL_TO) {
    try {
      await sendEmail(lead);
      log('EMAIL_OK', lead.id);
    } catch (e) {
      log('EMAIL_FAIL', lead.id, e.message);
    }
  }

  // Telegram — solo si está configurado
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    try {
      await sendTelegram(lead);
      log('TELEGRAM_OK', lead.id);
    } catch (e) {
      log('TELEGRAM_FAIL', lead.id, e.message);
    }
  }

  return res.json({ ok: true, id: lead.id, received: true });
});

// Listar leads (sólo admin via header)
app.get('/api/leads', (req, res) => {
  const k = req.header('x-admin-key');
  if (!k || k !== process.env.ADMIN_KEY) {
    return res.status(403).json({ ok: false });
  }
  try {
    const lines = fs.readFileSync(LEADS_FILE, 'utf8').trim().split('\n').filter(Boolean);
    const out = lines.slice(-100).reverse().map(l => {
      try { return JSON.parse(l); } catch (e) { return null; }
    }).filter(Boolean);
    return res.json({ ok: true, count: out.length, leads: out });
  } catch (e) {
    return res.json({ ok: true, count: 0, leads: [] });
  }
});

async function sendEmail(lead) {
  const url = process.env.SMTP_URL;
  const to = process.env.MAIL_TO;
  const from = process.env.MAIL_FROM || 'web@mitinteriorismo.studio';
  // Formato mailgun://user:pass@host
  const m = url.match(/^mailgun:\/\/([^:]+):([^@]+)@(.+)$/);
  if (!m) throw new Error('SMTP_URL no tiene formato mailgun://user:pass@host');
  const [, user, pass, host] = m;
  const auth = Buffer.from(`${user}:${pass}`).toString('base64');
  const form = new URLSearchParams();
  form.set('from', from);
  form.set('to', to);
  form.set('subject', `[mit interiorismo] Nuevo lead · ${lead.name}`);
  form.set('text', `Nuevo contacto desde la web\n\nNombre: ${lead.name}\nContacto: ${lead.contact}\nQué necesita: ${lead.topic || '—'}\nModo: ${lead.mode}\nPágina: ${lead.page}\nHora: ${lead.ts}\nID: ${lead.id}`);
  const r = await fetch(`https://${host}/v3/${host.split('.')[0]}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: form.toString()
  });
  if (!r.ok) throw new Error(`Mailgun status ${r.status}`);
}

async function sendTelegram(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  const text = `🆕 *Nuevo lead · mit interiorismo*\n\n` +
    `*Nombre:* ${escapeMd(lead.name)}\n` +
    `*Contacto:* ${escapeMd(lead.contact)}\n` +
    `*Qué necesita:* ${escapeMd((lead.topic || '—').slice(0, 400))}\n` +
    `*Modo:* ${lead.mode}\n` +
    `*Página:* ${escapeMd(lead.page)}\n` +
    `*Hora:* ${lead.ts}`;
  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chat,
      text,
      parse_mode: 'Markdown'
    })
  });
  if (!r.ok) throw new Error(`Telegram status ${r.status}`);
}

function escapeMd(s) {
  return String(s || '').replace(/[*_`\[\]]/g, '\\$&');
}

app.listen(PORT, '0.0.0.0', () => {
  log(`API on port ${PORT} · SMTP=${!!process.env.SMTP_URL} · Telegram=${!!process.env.TELEGRAM_BOT_TOKEN}`);
});
