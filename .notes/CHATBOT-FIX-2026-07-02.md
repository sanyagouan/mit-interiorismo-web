# Fix chatbot 404 — 2 jul 2026

## Síntoma
`POST https://www.mitinteriorismo.studio/api/chat` → HTTP 404 "Cannot POST /chat"

## Causa raíz
`nginx.conf` tenía `proxy_pass http://10.0.1.15:3100/;` (con barra final).
La barra final en el upstream hace que nginx STRIP el location prefix `/api/`
antes de reenviar al backend. El backend Express tiene las rutas en
`/api/chat` y `/api/contact` (NO en `/chat` y `/contact`), por lo que
recibía `/chat` y devolvía 404.

## Fix
Quitar la barra final → `proxy_pass http://10.0.1.15:3100;`
Eso preserva `/api/` en la URL que llega al backend.

## Diagnóstico rápido
Si nginx proxy devuelve 404 sospechoso, probar directo al backend:
```
API_IP=$(docker inspect mit-contact-api --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' | head -1)
curl http://${API_IP}:3100/api/chat -X POST -d '{"messages":[{"role":"user","content":"hola"}]}' -H 'Content-Type: application/json'
```
Si directo al API responde 200 y vía nginx 404 → problema en proxy_pass.

## Commit
b05b4f8 — "fix: chatbot 404 — quitar barra final en proxy_pass para preservar /api/"
