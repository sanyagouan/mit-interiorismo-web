// MIT Interiorismo · API de contacto + CHAT INTELIGENTE
// Recibe leads del chatbot → envía a María vía email + Telegram + EspoCRM
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
//   TELEGRAM_CHAT_ID         - chat id destino María (o Yago en dev)
//   ESPOCRM_BASE_URL         - URL interna de EspoCRM (sin /api/v1)
//   ESPOCRM_ADMIN_USER       - usuario admin de EspoCRM
//   ESPOCRM_ADMIN_PASSWORD   - password admin
//   ESPOCRM_ENABLED          - '1' activa push a EspoCRM (default: '1' si hay credenciales)
//   ADMIN_KEY                - para listar leads vía GET /api/leads

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar .env.local si existe (para credenciales no pasadas por env de Coolify)
try {
  const envLocal = path.join(__dirname, '.env.local');
  if (fs.existsSync(envLocal)) {
    fs.readFileSync(envLocal, 'utf8').split('\n').forEach(line => {
      line = line.trim();
      if (!line || line.startsWith('#') || !line.includes('=')) return;
      const eq = line.indexOf('=');
      const k = line.slice(0, eq).trim();
      let v = line.slice(eq + 1).trim();
      // Quitar comillas si las lleva
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      // Solo asignar si NO está ya en process.env (prioridad al env del contenedor)
      if (process.env[k] === undefined) {
        process.env[k] = v;
      }
    });
    console.log('[env] .env.local cargado');
  }
} catch (e) {
  console.error('[env] error cargando .env.local:', e.message);
}

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
const SYSTEM_PROMPT = `Eres María, la interiorista del estudio "mit interiorismo" en Yécora (Álava).
Hablas en primera persona como si fueras ella — cercana, experta, profesional.

PERSONALIDAD:
- Cercana y cálida, como una amiga que además es buena en lo suyo
- Nada de lenguaje corporativista ni frases hechas de marketing
- Directa: si algo no es para el estudio, lo dices amablemente
- Cuando conviene, concreta: "el jueves a las 17h te llamo"
- No sonríes con signos de exclamación. Escribes con aplomo.

IDIOMA: español de España, sin argentinismos ni mexicanismos.

SOBRE MÍ (MARÍA):
- 17 años de experiencia (desde 2008)
- ESDIR 2020, expediente 8,41
- Antes: Echazarreta Construcciones (Logroño), Blurarquitectura (Bilbao), COOK Cocina & Baño
- Software: AutoCAD, SketchUp, V-Ray 5, Presto, Photoshop, InDesign
- Vivo en Yécora (Álava), 250 habitantes, al sur de la provincia
- Colegiada como interiorista

QUÉ ME DIFERENCIA (cuando me preguntan):
"En otros estudios separan el diseño de la ingeniería. Aquí no.
Proyecto el plano Y las instalaciones (electricidad, fontanería, climatización)
Y las tramito con la normativa: CTE, REBT, RITE, DB-SI, DB-HR, DB-HE.
Eso significa que cuando llega la obra, no hay sorpresas.
Y si las hay, yo te defiendo frente al gremio."

SERVICIOS Y HONORARIOS ORIENTATIVOS (siempre digo "orientativo, depende de cada proyecto"):

1. REFORMA INTEGRAL (desde 850 €/m² de honorarios de proyecto, 3-8 meses de obra)
   Tomas un espacio vacío o en bruto. Te entrego: distribución nueva, instalaciones
   (electricidad, fontanería, climatización), acabados, mobiliario fijo, iluminación
   técnica, decoración. Una sola interlocutora, una sola factura.
   Incluye: anteproyecto + proyecto ejecutivo + dirección de obra.
   Incluye: licencias, normativa, gestión de gremios.
   No incluye: el coste de obra (albañilería, materiales, instalaciones a ejecutar)
   — eso va aparte y lo desgloso en un Presto partida a partida.

2. CAMBIO DE USO (desde 1.200 €/m², 4-6 meses)
   Convertir oficinas o locales en viviendas, o al revés, donde el planeamiento
   lo permite. Especialidad en País Vasco y La Rioja. Tramito todo con el
   Ayuntamiento y la normativa autonómica.

3. ESPACIO COMERCIAL Y OFICINA (desde 750 €/m²)
   Retail, oficinas, despachos profesionales, clínicas, hostelería. Diseño que
   trabaja la identidad de marca desde el primer metro cuadrado.

4. CONSULTORÍA Y ASESORÍA TÉCNICA (desde 60 €/h, 1-2 semanas)
   Si has comprado un inmueble y quieres saber si es viable, si estás negociando
   una reforma y necesitas un segundo diagnóstico, o si quieres un informe técnico
   antes de licitar. Por horas o por informe cerrado.

5. RENDERIZADO 3D Y DOCUMENTACIÓN (desde 280 €/imagen, 2-4 semanas)
   Imágenes fotorrealistas para vender el proyecto (a tu pareja, a tu comunidad
   de propietarios, al banco, al Ayuntamiento). Planimetría ejecutiva.

6. DISEÑO DE INTERIOR Y AMBIENTACIÓN (desde 550 €/m²)
   Sin tocar instalaciones ni obra mayor. Solo materiales, colores, iluminación,
   textiles, mobiliario y decoración. Para cuando quieres mejorar tu casa sin
   meterte en obras.

CÓMO TRABAJO (cuando preguntan por el proceso):
"1. Primera reunión sin compromiso (en Yécora, o donde prefieras).
 2. Visita técnica y toma de datos.
 3. Anteproyecto + presupuesto desglosado partida a partida (sin sorpresas).
 4. Si te encaja, proyecto ejecutivo: planos + instalaciones + normativa.
 5. Dirección de obra y entrega. Te entrego un único interlocutor."

ZONAS:
Yécora (mi base), Logroño, Haro, Vitoria-Gasteiz, Bilbao, Pamplona, Miranda de Ebro.
Más lejos también, pero estos son los más habituales.

PROYECTOS EJEMPLO (úsalo cuando tenga sentido):
- Txoko en Kripan, Álava 2020 — espacio social con txoko, biga vista, mesa roble
- Apartamentos vacacionales en Labastida, Álava 2020 — dos apartamentos en edificio del s. XIX
- Merendero en Lapuebla, Álava 2020 — espacio social rural
- Vivienda Gonzalo en Berceo, La Rioja 2026 — reforma integral con aerotermia (en curso)
- Oficina Técnica EFITAR, La Rioja 2026 — cambio de uso comercial → oficina (en curso)
- Proyecto Luciano, La Rioja 2026 — cambio de uso oficinas → 2 viviendas + oficina (en curso)
- Asesoría climatización Haro, La Rioja 2026 — consultoría técnica (en curso)

CUÁNDO PEDIR DATOS:
Cuando el cliente muestra intención real (dice "es para mi casa", "estoy
interesado", "cuándo empezamos", "presupuesto", "me urge"), mi respuesta
natural es: "Cuéntame un poco más — qué tipo de espacio, dónde, y un teléfono
o email para que pueda llamarte esta semana. Aquí tienes el formulario."

Solo pido datos cuando ya hay una conversación real, no en el primer mensaje.
Si el cliente solo pregunta algo general (cuánto cuesta, plazos, zona),
primero respondo bien y luego, si me parece, ofrezco el formulario al final.

CUÁNDO OFRECER CONSULTA GRATUITA:
En casi todas las conversaciones reales. "Si te parece, hacemos una primera
llamada de 20 min sin compromiso. Te paso mi calendario y eliges un hueco."

CUÁNDO DERIVAR A WHATSAPP/TELÉFONO:
- Si dice "es urgente" o "para ya"
- Si pregunta algo muy técnico sobre normativa específica de su municipio
- Si ya hay química y quiere verme la cara / oírme
- "Te paso mi WhatsApp, mándame las fotos del espacio por ahí"

FORMATO DE RESPUESTA (JSON estricto, sin markdown):
{
  "reply": "texto que verá el cliente",
  "intent": "info|lead|handoff|greeting|other",
  "confidence": 0.0-1.0,
  "suggested_actions": ["pedir_datos", "abrir_whatsapp", "ir_a_servicios", "ver_reforma_integral", "ver_cambio_uso", "ver_consultoria", "llamar", "primera_llamada_gratis"]
}

INTENTS:
- "greeting": solo saluda (responder cálido y abrir)
- "info": pregunta general (responder, no pedir datos todavía)
- "lead": cliente con intención real (responder Y sugerir "pedir_datos")
- "handoff": quiere hablar conmigo (sugerir "abrir_whatsapp" o "llamar")
- "other": despedida, gracias, off-topic

SUGGESTED_ACTIONS valores:
- "pedir_datos" — abrir formulario nombre+email+teléfono
- "abrir_whatsapp" — botón directo wa.me/34637869890
- "llamar" — tel:+34637869890
- "primera_llamada_gratis" — ofrecer 20 min gratis (también abre pedir_datos)
- "ir_a_servicios" — llevar a /servicios
- "ir_a_proyectos" — llevar a /proyectos
- "ver_reforma_integral" — llevar a /servicios/reforma-integral
- "ver_cambio_uso" — llevar a /servicios/cambio-uso
- "ver_consultoria" — llevar a /servicios/consultoria

REGLAS DE ORO:
1. No inventes datos que no estén en esta ficha. Si no sabes algo, di "no te lo
   sé decir de memoria, te lo confirmo en la primera llamada".
2. No hables mal de la competencia. Si preguntan por otros estudios: "Cada estudio
   tiene su forma de trabajar, lo mejor es que hables con varios".
3. No prometas plazos que no puedas cumplir. Si te preguntan, di "depende del
   alcance, te lo confirmo en el anteproyecto".
4. Si el cliente es grosero o intenta trollear, mantén la elegancia: "Entiendo
   tu frustración. Si quieres que trabajemos juntos, encantada. Si no, te deseo
   mucha suerte con tu proyecto."
5. Máximo 2-3 frases por respuesta, salvo que el cliente pida detalle técnico.

EJEMPLOS DE TONO:
Cliente: "Hola"
Tú: "Hola, soy María. ¿En qué andas, reformas, cambio de uso, o algo distinto?"

Cliente: "Cuánto cuesta una reforma?"
Tú: "Depende del alcance, pero para que te hagas una idea: una reforma integral
arranca en 850 €/m² (solo honorarios de proyecto), y el coste de obra va aparte.
Lo más fiable es hacer una primera visita sin compromiso. ¿Te paso mi agenda
o prefieres contarme primero qué tienes en mente?"

Cliente: "Es para un local de 80m en Bilbao,我想 cambiarlo a vivienda"
Tú: "Vi la mezcla. Cambio de uso comercial → vivienda en Bilbao es de lo más
habitual que hago. Para un local de 80m solemos movernos en 4-6 meses y
presupuesto de honorarios alrededor de 96.000 € (1.200 €/m²), pero la cifra
definitiva sale del anteproyecto. ¿Tienes ya el local a la vista o estás
buscando?"
`;

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
      // Resumir con IA y notificar (incluye push a EspoCRM). No bloquea.
      summarizeLead({ messages, lead })
        .then(summary => notifyMaria(lead, summary))
        .catch(e => log('NOTIFY_FAIL', e.message));
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
  const contact = String(data.contact || '').trim().slice(0, 400);
  const email = String(data.email || '').trim().slice(0, 200);
  const phone = String(data.phone || '').trim().slice(0, 50);
  const topic = String(data.topic || '').trim().slice(0, 2000);
  const mode = String(data.mode || 'contact').trim();
  const source = String(data.source || 'web').trim();
  const page = String(data.page || '').trim().slice(0, 500);
  const ts = data.ts || new Date().toISOString();

  // Compose contact (compat con version anterior que sólo mandaba contact)
  const composedContact = contact || [email, phone].filter(Boolean).join(' · ');

  if (!name || !composedContact) {
    log('VALIDATION_FAIL', { name, contact: composedContact });
    return res.status(400).json({ ok: false, error: 'Faltan campos obligatorios (nombre, email o teléfono).' });
  }

  const lead = {
    id: 'L' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name,
    contact: composedContact,
    email: email || null,
    phone: phone || null,
    topic,
    mode,
    source,
    page,
    ts,
    receivedAt: new Date().toISOString()
  };

  try { fs.appendFileSync(LEADS_FILE, JSON.stringify(lead) + '\n'); }
  catch (e) { log('PERSIST_FAIL', e.message); }

  log('LEAD', { id: lead.id, name, email: !!email, phone: !!phone, topic: topic.slice(0, 80) });

  // Resumir con IA (si hay messages en el body) y notificar (Telegram + EspoCRM)
  // No bloquea el response.
  const conversationMessages = Array.isArray(data.messages) ? data.messages : [];
  summarizeLead({ messages: conversationMessages, lead })
    .then(summary => notifyMaria(lead, summary))
    .catch(e => log('NOTIFY_FAIL', e.message));

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

// ===== LEAD ENRICHMENT (resumen con IA) =====
async function summarizeLead({ messages, lead }) {
  // Si no hay IA o no hay mensajes, fallback a topic crudo
  if (!process.env.OPENROUTER_API_KEY || !Array.isArray(messages) || messages.length === 0) {
    return {
      summary: (lead.topic || 'Sin detalles').slice(0, 400),
      intent: lead.intent || 'lead',
      urgency: 'media',
      suggested_action: 'Llamar esta semana para cualificar',
      is_qualified: false
    };
  }
  const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash';
  const convo = messages.slice(-20).map(m => {
    const role = m.role === 'user' ? 'Cliente' : 'María IA';
    return `${role}: ${String(m.content || '').slice(0, 500)}`;
  }).join('\n');
  const sys = `Eres el asistente de María (interiorista). Acabas de mantener una conversación
con un posible cliente en la web. Tu trabajo es generar un resumen EJECUTIVO
para que María sepa de un vistazo si vale la pena llamar y por qué.

REGLAS:
- Resume en máximo 3 líneas (no copies la conversación literal).
- Habla en 3ª persona ("El cliente quiere...", "Pidió presupuesto para...").
- Si hay dudas técnicas, no las resuelvas: di "queda pendiente confirmar X".
- Si detectas urgencia (dice "es para ya", "tengo prisa", "necesito cuanto antes"),
  marca urgency="alta".
- Si el cliente solo preguntó algo general sin intención real, marca
  is_qualified=false y urgency="baja".
- suggested_action debe ser ACCIONABLE: "Llamar el martes 18h" o
  "Pedir fotos del espacio por WhatsApp" o "Pasarle presupuesto orientativo".

FORMATO JSON ESTRICTO (sin markdown, sin explicaciones fuera del JSON):
{
  "summary": "<3 líneas máximo, hechos concretos>",
  "intent": "<info|lead|handoff|greeting|other>",
  "urgency": "<alta|media|baja>",
  "suggested_action": "<1 frase accionable>",
  "is_qualified": <true|false>,
  "topic_short": "<2-4 palabras: 'reforma cocina Vitoria', 'cambio uso local Bilbao', etc.>"
}`;
  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.mitinteriorismo.studio',
        'X-Title': 'mit interiorismo lead-summary'
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: sys },
          { role: 'user', content: `Conversación:\n\n${convo}\n\nNombre: ${lead.name || 'Anónimo'}\nContacto: ${lead.email || lead.phone || '—'}` }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 300,
        temperature: 0.3
      })
    });
    if (!r.ok) {
      const err = await r.text();
      log('SUMMARIZE_API_FAIL', r.status, err.slice(0, 200));
      return { summary: lead.topic || 'Sin resumen', intent: 'lead', urgency: 'media', suggested_action: 'Revisar chat', is_qualified: true, topic_short: 'lead web' };
    }
    const j = await r.json();
    const raw = j.choices?.[0]?.message?.content || '{}';
    let parsed;
    try { parsed = JSON.parse(raw); }
    catch (e) {
      // A veces la IA envuelve el JSON en ```json ... ```. Limpiar.
      const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
      try { parsed = JSON.parse(cleaned); }
      catch (e2) {
        parsed = { summary: raw.slice(0, 400) };
      }
    }
    return {
      summary: String(parsed.summary || lead.topic || 'Sin resumen').slice(0, 600),
      intent: String(parsed.intent || 'lead').slice(0, 30),
      urgency: ['alta', 'media', 'baja'].includes(parsed.urgency) ? parsed.urgency : 'media',
      suggested_action: String(parsed.suggested_action || 'Revisar chat').slice(0, 200),
      is_qualified: !!parsed.is_qualified,
      topic_short: String(parsed.topic_short || 'lead web').slice(0, 60)
    };
  } catch (e) {
    log('SUMMARIZE_FAIL', e.message);
    return { summary: lead.topic || 'Sin resumen', intent: 'lead', urgency: 'media', suggested_action: 'Revisar chat', is_qualified: true, topic_short: 'lead web' };
  }
}

// ===== ESPOCRM PUSH (con dedup) =====
function espoEnabled() {
  if (process.env.ESPOCRM_ENABLED === '0') return false;
  return !!(process.env.ESPOCRM_BASE_URL && process.env.ESPOCRM_ADMIN_USER && process.env.ESPOCRM_ADMIN_PASSWORD);
}

function espoAuthHeader() {
  const user = process.env.ESPOCRM_ADMIN_USER;
  const pass = process.env.ESPOCRM_ADMIN_PASSWORD;
  return 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');
}

function espoBase() {
  return process.env.ESPOCRM_BASE_URL.replace(/\/+$/, '');
}

async function espoFindExistingLead({ email, phone }) {
  // Busca por email O phone. IMPORTANTE: el operador `=` de EspoCRM en los
  // campos emailAddress/phoneNumber es FUZZY (no exacto) y devuelve falsos
  // positivos. Solución: traer los candidatos (limitado) y comparar
  // en cliente.
  if (!espoEnabled()) return null;
  const cleanEmail = email ? String(email).trim().toLowerCase() : '';
  const cleanPhone = phone ? String(phone).replace(/[^\d+]/g, '') : '';
  if (!cleanEmail && !cleanPhone) return null;

  // Traer todos los leads de la web (no muchos, son leads recientes)
  // Filtrar a los que tengan email/phone para reducir la lista
  const url = `${espoBase()}/api/v1/Lead?select=id,firstName,lastName,emailAddress,phoneNumber,source,status,description&where=(source='Web Site')&maxSize=200`;
  try {
    const r = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': espoAuthHeader(), 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000)
    });
    if (!r.ok) {
      log('ESPO_FIND_FAIL', r.status, (await r.text()).slice(0, 200));
      return null;
    }
    const j = await r.json();
    const list = Array.isArray(j.list) ? j.list : [];
    // Comparar en cliente (exacto, case-insensitive para email)
    const matches = list.filter(l => {
      const lEmail = l.emailAddress ? String(l.emailAddress).trim().toLowerCase() : '';
      const lPhone = l.phoneNumber ? String(l.phoneNumber).replace(/[^\d+]/g, '') : '';
      if (cleanEmail && lEmail && lEmail === cleanEmail) return true;
      if (cleanPhone && lPhone && lPhone === cleanPhone) return true;
      return false;
    });
    if (matches.length === 0) return null;
    // Preferir el más reciente
    matches.sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
    return matches[0];
  } catch (e) {
    log('ESPO_FIND_ERR', e.message);
    return null;
  }
}

async function espoCreateLead({ name, email, phone, topic, summary, topic_short, urgency, source, page }) {
  const parts = String(name || '').trim().split(/\s+/);
  const firstName = parts[0] || 'Anónimo';
  const lastName = parts.slice(1).join(' ') || '(chat web)';
  const description = [
    summary ? `📋 Resumen IA: ${summary}` : null,
    topic ? `💬 Mensaje original: ${topic}` : null,
    topic_short ? `🏷️ Tema: ${topic_short}` : null,
    urgency ? `🔥 Urgencia: ${urgency}` : null,
    page ? `🌐 Página: ${page}` : null
  ].filter(Boolean).join('\n');
  const payload = {
    firstName: firstName.slice(0, 100),
    lastName: lastName.slice(0, 100),
    source: 'Web Site',
    status: 'New',
    description: description.slice(0, 2000)
  };
  if (email) payload.emailAddress = String(email).slice(0, 200);
  if (phone) payload.phoneNumber = String(phone).slice(0, 50);
  const r = await fetch(`${espoBase()}/api/v1/Lead`, {
    method: 'POST',
    headers: { 'Authorization': espoAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000)
  });
  if (!r.ok) {
    const errText = await r.text();
    log('ESPO_CREATE_FAIL', r.status, errText.slice(0, 200));
    throw new Error(`EspoCRM POST Lead → ${r.status}: ${errText.slice(0, 100)}`);
  }
  return await r.json();
}

async function espoUpdateLead(id, patch) {
  const r = await fetch(`${espoBase()}/api/v1/Lead/${id}`, {
    method: 'PATCH',
    headers: { 'Authorization': espoAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
    signal: AbortSignal.timeout(8000)
  });
  if (!r.ok) {
    log('ESPO_UPDATE_FAIL', r.status, (await r.text()).slice(0, 200));
    throw new Error(`EspoCRM PATCH Lead → ${r.status}`);
  }
  return await r.json();
}

async function pushToEspoCRM(lead, summary) {
  if (!espoEnabled()) {
    log('ESPO_SKIP', 'disabled or missing creds');
    return { ok: false, reason: 'disabled' };
  }
  // DEDUP
  const existing = await espoFindExistingLead({ email: lead.email, phone: lead.phone });
  if (existing && existing.id) {
    // Append al description en lugar de machacar
    const appendText = [
      '',
      `--- ${new Date().toISOString().slice(0, 19).replace('T', ' ')} ---`,
      summary?.summary ? `Resumen: ${summary.summary}` : null,
      lead.topic ? `Mensaje: ${lead.topic.slice(0, 300)}` : null
    ].filter(Boolean).join('\n');
    const newDescription = String(existing.description || '').slice(0, 1500) + appendText;
    await espoUpdateLead(existing.id, { description: newDescription.slice(0, 2000) });
    log('ESPO_UPDATED', existing.id, lead.id);
    return { ok: true, action: 'updated', id: existing.id };
  }
  // CREATE nuevo
  const created = await espoCreateLead({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    topic: lead.topic,
    summary: summary?.summary,
    topic_short: summary?.topic_short,
    urgency: summary?.urgency,
    source: lead.source,
    page: lead.page
  });
  log('ESPO_CREATED', created.id, lead.id);
  return { ok: true, action: 'created', id: created.id };
}

async function notifyMaria(lead, summary) {
  // Si hay resumen IA, enriquecer el lead con el texto executive
  const enrichedLead = summary ? { ...lead, _summary: summary } : lead;

  if (process.env.SMTP_URL && process.env.MAIL_TO) {
    try {
      await sendEmail(enrichedLead);
      log('EMAIL_OK', lead.id);
    } catch (e) {
      log('EMAIL_FAIL', lead.id, e.message);
    }
  }
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    try {
      await sendTelegram(enrichedLead);
      log('TELEGRAM_OK', lead.id);
    } catch (e) {
      log('TELEGRAM_FAIL', lead.id, e.message);
    }
  }
  // Push a EspoCRM (no bloquea el response)
  try {
    const result = await pushToEspoCRM(lead, summary);
    log('ESPO_RESULT', lead.id, JSON.stringify(result));
  } catch (e) {
    log('ESPO_FAIL', lead.id, e.message);
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
  const summary = lead._summary;
  const lines = [
    'Nuevo contacto desde la web',
    '',
    'Nombre: ' + lead.name,
    'Email: ' + (lead.email || '—'),
    'Teléfono: ' + (lead.phone || '—')
  ];
  if (summary && summary.summary) {
    lines.push('', '--- Resumen IA ---', summary.summary);
    if (summary.topic_short) lines.push('Tema: ' + summary.topic_short);
    if (summary.urgency) lines.push('Urgencia: ' + summary.urgency);
    if (summary.suggested_action) lines.push('Acción sugerida: ' + summary.suggested_action);
  }
  lines.push(
    '',
    '--- Detalle ---',
    'Qué necesita (texto original): ' + (lead.topic || '—'),
    'Modo: ' + lead.mode,
    'Página: ' + (lead.page || '—'),
    'Hora: ' + lead.ts,
    'ID: ' + lead.id
  );
  form.set('text', lines.join('\n'));
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
  const summary = lead._summary;
  let text;
  if (summary && summary.summary) {
    // Mensaje ejecutivo cuando hay resumen IA
    const urgencyIcon = summary.urgency === 'alta' ? '🔥🔥🔥' : summary.urgency === 'media' ? '🔥' : '·';
    text = `📩 *Nuevo lead · mit interiorismo* ${urgencyIcon}\n\n` +
      `*Resumen IA:*\n${escapeMd(summary.summary)}\n\n` +
      `*Cliente:* ${escapeMd(lead.name)}\n` +
      `*Email:* ${escapeMd(lead.email || '—')}\n` +
      `*Teléfono:* ${escapeMd(lead.phone || '—')}\n` +
      `*Tema:* ${escapeMd(summary.topic_short || '—')}\n` +
      `*Acción sugerida:* ${escapeMd(summary.suggested_action || 'Revisar chat')}\n` +
      `\n_(original: ${escapeMd((lead.topic || '').slice(0, 200))})_`;
  } else {
    // Fallback: formato antiguo
    text = `🆕 *Nuevo lead · mit interiorismo*\n\n` +
      `*Nombre:* ${escapeMd(lead.name)}\n` +
      `*Email:* ${escapeMd(lead.email || '—')}\n` +
      `*Teléfono:* ${escapeMd(lead.phone || '—')}\n` +
      `*Qué necesita:* ${escapeMd((lead.topic || '—').slice(0, 400))}\n` +
      `*Modo:* ${escapeMd(lead.mode)}\n` +
      `*Página:* ${escapeMd(lead.page || '—')}\n` +
      `*Hora:* ${lead.ts}`;
  }
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
  log(`API on port ${PORT} · AI=${!!process.env.OPENROUTER_API_KEY} · SMTP=${!!process.env.SMTP_URL} · Telegram=${!!process.env.TELEGRAM_BOT_TOKEN} · EspoCRM=${espoEnabled()}`);
});
