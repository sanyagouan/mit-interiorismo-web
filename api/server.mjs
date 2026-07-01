// MIT Interiorismo · API de contacto + CHAT INTELIGENTE
// Recibe leads del chatbot → envía a María vía email + Telegram
// Endpoint /api/chat responde preguntas de clientes con IA (OpenRouter)
// Endpoint /api/contact guarda leads y notifica a María
// Sin dependencia de BD: usa archivos JSON como log de leads.
//
// Variables de entorno:
//   PORT                     - default 3100
//   OPENROUTER_API_KEY       - para el chat IA
//   OPENROUTER_MODEL         - modelo (default google/gemini-2.5-flash)
//   SMTP_URL                 - mailgun://user:pass@mg.domain.com (opcional)
//   MAIL_TO                  - email destino María
//   MAIL_FROM                - email remitente
//   TELEGRAM_BOT_TOKEN       - token bot Telegram
//   TELEGRAM_CHAT_ID         - chat id destino María
//   ADMIN_KEY                - para listar leads vía GET /api/leads

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
const CHAT_LOG = path.join(__dirname, 'chat.jsonl');

function log(...args) {
  const line = `[${new Date().toISOString()}] ` + args.map(a => typeof a === 'string' ? a : JSON.stringify(a)).join(' ');
  console.log(line);
  try { fs.appendFileSync(LOG_FILE, line + '\n'); } catch (e) {}
}

// ===== KNOWLEDGE BASE =====
const SYSTEM_PROMPT = `Eres el asistente virtual del estudio de interiorismo "mit interiorismo" dirigido por María Iturbe Sánchez, en Yécora (Álava, España).

Tu trabajo: atender al cliente que llega a la web, resolver sus dudas con brevedad y elegancia, y detectar cuándo está listo para dejar sus datos de contacto.

ESTILO:
- Breve: máximo 2-3 frases por respuesta. Sin bloques largos.
- Tono: profesional, cercano, experto. No comercial ni agresivo.
- Idioma: español. Si el cliente escribe en euskera, responde en euskera básico ("Kaixo, mit interiorismoko laguntzailea naiz").
- Cierra cada respuesta con UNA pregunta de seguimiento si es relevante, o una llamada a la acción clara.

DATOS VERIFICADOS DEL ESTUDIO:
- Nombre comercial: mit interiorismo
- Responsable: María Iturbe Sánchez ( ESDIR ’20, expediente 8,41)
- Sede: Calle Mayor, Yécora, Álava · CP 01322
- Zona de trabajo: Yécora, Logroño, Haro, Vitoria-Gasteiz, Bilbao, Pamplona · Álava · La Rioja · País Vasco
- Email: hola@mitinteriorismo.studio
- Teléfono: +34 637 86 98 90
- WhatsApp: wa.me/34637869890
- Experiencia: 17 años (desde 2008)
- Linkedin: https://www.linkedin.com/in/mar%C3%ADaiturbe/

SERVICIOS (con sus precios orientativos):
1. Reforma integral · desde 850 €/m² (solo proyecto) · plazos 3-8 meses
2. Cambio de uso (terciario→residencial) · desde 1.200 €/m² · plazos 4-6 meses
3. Espacio comercial / oficina · desde 750 €/m²
4. Consultoría técnica · desde 60 €/h · 1-2 semanas
5. Renderizado / visualización 3D · desde 280 €/imagen · 2-4 semanas
6. Diseño de interiores (solo proyecto) · desde 550 €/m²

PROCESO TÍPICO DE UNA REFORMA:
1. Primera reunión gratuita en Yécora o donde el cliente prefiera
2. Visita técnica y toma de datos
3. Anteproyecto + presupuesto desglosado partida a partida
4. Proyecto ejecutivo (planos, instalaciones, normativa CTE/REBT/RITE)
5. Dirección de obra y entrega

QUÉ DIFERENCIA A MARÍA:
- Une diseño + ingeniería de instalaciones (CTE, REBT, RITE, DB-SI, DB-HR, DB-HE)
- Software: AutoCAD, SketchUp, V-Ray 5, Presto
- Presupuestos desglosados sin sorpresas
- Aliada técnica del cliente frente a gremios

PROYECTOS DE EJEMPLO:
- Merendero en Lapuebla de Labarca (Álava, 2020)
- Txoko en Kripan (Álava, 2020)
- Apartamentos en Labastida (Álava, 2020)
- Vivienda Gonzalo en Berceo (La Rioja, 2026, en curso)
- Oficina técnica EFITAR (La Rioja, 2026, en curso)
- Proyecto Luciano (La Rioja, 2026, en curso)
- Asesoría climatización Haro (La Rioja, 2026, en curso)

CUÁNDO PEDIR DATOS AL CLIENTE:
Cuando el cliente muestre intención real (pregunta por presupuesto, plazos, dice "es para mi casa", "estoy interesado", etc.), responde con naturalidad y dile que María le puede llamar o responder por email para darle un presupuesto ajustado. NO pidas datos en cada mensaje: solo cuando tenga sentido.

CUÁNDO DERIVAR A MARÍA DIRECTAMENTE:
- Si el cliente lo pide explícitamente
- Si la pregunta es muy técnica sobre normativa específica
- Si el cliente muestra urgencia o quiere visitar

FORMATO DE RESPUESTA (JSON estricto, sin markdown):
{
  "reply": "texto que verá el cliente",
  "intent": "info|lead|handoff|other",
  "confidence": 0.0-1.0,
  "suggested_actions": ["pedir_datos", "abrir_whatsapp", "ir_a_servicios", ...]
}

"intent" valores:
- "info": pregunta general (responder y seguir)
- "lead": cliente mostrando intención de contratar/pide presupuesto
- "handoff": quiere hablar con María directamente
- "other": saludo, despedida, comentario no relevante

"suggested_actions" (array, 0-3 elementos): botones que verá el cliente debajo de la respuesta
- "pedir_datos" — pedirle nombre/email/teléfono
- "abrir_whatsapp" — botón directo a wa.me/34637869890
- "ir_a_servicios" — llevar a /servicios
- "ir_a_proyectos" — llevar a /proyectos
- "ver_reforma_integral" — llevar a /servicios/reforma-integral
- "ver_cambio_uso" — llevar a /servicios/cambio-uso
- "ver_consultoria" — llevar a /servicios/consultoria
- "llamar" — tel:+34637869890

Si el cliente solo saluda, NO sugieras botones, solo una respuesta cálida y breve.`;

const app = express();
app.use(cors({
  origin: ['https://www.mitinteriorismo.studio', 'http://localhost:4321', 'http://localhost'],
  methods: ['GET', 'POST']
}));
app.use(express.json({ limit: '64kb' }));

// Healthcheck
app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'mit-contact-api',
    ts: new Date().toISOString(),
    hasAI: !!process.env.OPENROUTER_API_KEY,
    hasEmail: !!process.env.SMTP_URL,
    hasTelegram: !!process.env.TELEGRAM_BOT_TOKEN
  });
});

// ===== CHAT INTELIGENTE =====
app.post('/api/chat', async (req, res) => {
  const data = req.body || {};
  const messages = Array.isArray(data.messages) ? data.messages : [];
  const page = String(data.page || '').trim().slice(0, 500);
  const userId = String(data.userId || 'anon').slice(0, 100);

  if (messages.length === 0) {
    return res.status(400).json({ ok: false, error: 'No messages' });
  }
  if (!process.env.OPENROUTER_API_KEY) {
    // Fallback sin IA: respuesta guía
    return res.json({
      ok: true,
      reply: 'Hola, soy el asistente de mit interiorismo. ¿Sobre qué quieres hablar: servicios, plazos, presupuestos o prefieres que te pase con María?',
      intent: 'other',
      confidence: 0.5,
      suggested_actions: ['ir_a_servicios', 'abrir_whatsapp']
    });
  }

  const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash';

  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.mitinteriorismo.studio',
        'X-Title': 'mit interiorismo chatbot'
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-12) // últimas 12 para no petar contexto
        ],
        response_format: { type: 'json_object' },
        max_tokens: 350,
        temperature: 0.5
      })
    });
    if (!r.ok) {
      const err = await r.text();
      log('CHAT_API_FAIL', r.status, err.slice(0, 200));
      return res.status(502).json({ ok: false, error: 'AI service error' });
    }
    const j = await r.json();
    const raw = j.choices?.[0]?.message?.content || '{}';

    let parsed;
    try { parsed = JSON.parse(raw); }
    catch (e) {
      // Si no es JSON válido, devolver como reply
      parsed = { reply: raw.slice(0, 800), intent: 'info', confidence: 0.5, suggested_actions: [] };
    }

    // Log conversación
    try {
      fs.appendFileSync(CHAT_LOG, JSON.stringify({
        ts: new Date().toISOString(),
        userId,
        page,
        lastUser: messages[messages.length - 1]?.content?.slice(0, 200),
        reply: parsed.reply?.slice(0, 300),
        intent: parsed.intent
      }) + '\n');
    } catch (e) {}

    // Si el bot detecta intención de lead, notificar a María proactivamente
    if (parsed.intent === 'lead' && (process.env.SMTP_URL || process.env.TELEGRAM_BOT_TOKEN)) {
      const lastUser = messages[messages.length - 1]?.content || '';
      const lead = {
        id: 'C' + Date.now().toString(36),
        name: 'Anónimo (chat)',
        contact: userId,
        topic: `[Chat] ${lastUser.slice(0, 200)}`,
        mode: 'chat-intent',
        source: 'chatbot-web',
        page,
        ts: new Date().toISOString()
      };
      try { fs.appendFileSync(LEADS_FILE, JSON.stringify(lead) + '\n'); } catch(e) {}
      log('LEAD_FROM_CHAT', lead.id, userId);
      try { await notifyMaria(lead); } catch(e) { log('NOTIFY_FAIL', e.message); }
    }

    return res.json({
      ok: true,
      reply: parsed.reply || '',
      intent: parsed.intent || 'info',
      confidence: parsed.confidence || 0.5,
      suggested_actions: Array.isArray(parsed.suggested_actions) ? parsed.suggested_actions.slice(0, 3) : []
    });
  } catch (e) {
    log('CHAT_FATAL', e.message);
    return res.status(500).json({ ok: false, error: 'Chat failed' });
  }
});

// ===== LEAD CAPTURE =====
app.post('/api/contact', async (req, res) => {
  const data = req.body || {};
  const name = String(data.name || '').trim().slice(0, 200);
  const contact = String(data.contact || '').trim().slice(0, 200);
  const topic = String(data.topic || '').trim().slice(0, 2000);
  const mode = String(data.mode || 'contact').trim();
  const source = String(data.source || 'web').trim();
  const page = String(data.page || '').trim().slice(0, 500);
  const ts = data.ts || new Date().toISOString();

  if (!name || !contact) {
    log('VALIDATION_FAIL', { name, contact });
    return res.status(400).json({ ok: false, error: 'Faltan campos obligatorios (nombre, contacto).' });
  }

  const lead = {
    id: 'L' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name, contact, topic, mode, source, page, ts,
    receivedAt: new Date().toISOString()
  };

  try { fs.appendFileSync(LEADS_FILE, JSON.stringify(lead) + '\n'); }
  catch (e) { log('PERSIST_FAIL', e.message); }

  log('LEAD', { id: lead.id, name, contact, topic: topic.slice(0, 80) });

  // Notificar a María (no bloquea respuesta)
  notifyMaria(lead).catch(e => log('NOTIFY_FAIL', e.message));

  return res.json({ ok: true, id: lead.id, received: true });
});

// ===== ADMIN: listar leads =====
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

async function notifyMaria(lead) {
  if (process.env.SMTP_URL && process.env.MAIL_TO) {
    try {
      await sendEmail(lead);
      log('EMAIL_OK', lead.id);
    } catch (e) {
      log('EMAIL_FAIL', lead.id, e.message);
    }
  }
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    try {
      await sendTelegram(lead);
      log('TELEGRAM_OK', lead.id);
    } catch (e) {
      log('TELEGRAM_FAIL', lead.id, e.message);
    }
  }
}

async function sendEmail(lead) {
  const url = process.env.SMTP_URL;
  const to = process.env.MAIL_TO;
  const from = process.env.MAIL_FROM || 'web@mitinteriorismo.studio';
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
  log(`API on port ${PORT} · AI=${!!process.env.OPENROUTER_API_KEY} · SMTP=${!!process.env.SMTP_URL} · Telegram=${!!process.env.TELEGRAM_BOT_TOKEN}`);
});
