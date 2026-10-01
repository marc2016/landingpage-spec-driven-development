/**
 * Standalone Production / Docker Node.js Server for OpenSpec Workshop
 * Pure ES Module Node.js HTTP & Server-Sent Events (SSE) server.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

let session = {
  roomCode: process.env.ROOM_CODE || 'VIBE',
  activePhase: 1,
  participantCount: 1,
};

let postIts = [];

const sseClients = new Set();

function broadcast(event) {
  const payload = `data: ${JSON.stringify(event)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch {
      sseClients.delete(client);
    }
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- API Endpoints ---
  if (pathname === '/api/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    sseClients.add(res);
    session.participantCount = sseClients.size;
    broadcast({ type: 'session_update', session });

    // Send initial snapshot
    res.write(
      `data: ${JSON.stringify({
        type: 'init',
        session,
        postIts,
      })}\n\n`
    );

    req.on('close', () => {
      sseClients.delete(res);
      session.participantCount = Math.max(1, sseClients.size);
      broadcast({ type: 'session_update', session });
    });
    return;
  }

  if (pathname === '/api/session' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ...session, participantCount: Math.max(1, sseClients.size) }));
    return;
  }

  if (pathname === '/api/session' && req.method === 'POST') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (data.activePhase !== undefined) session.activePhase = data.activePhase;
        if (data.roomCode !== undefined) session.roomCode = data.roomCode;
        broadcast({ type: 'session_update', session });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(session));
      } catch {
        res.writeHead(400);
        res.end();
      }
    });
    return;
  }

  if (pathname === '/api/postits' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(postIts));
    return;
  }

  if (pathname === '/api/postits' && req.method === 'POST') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      try {
        const newPostIt = JSON.parse(body);
        postIts = [newPostIt, ...postIts];
        broadcast({ type: 'new_postit', postIt: newPostIt });
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newPostIt));
      } catch {
        res.writeHead(400);
        res.end();
      }
    });
    return;
  }

  if (pathname.startsWith('/api/postits/') && req.method === 'DELETE') {
    const id = decodeURIComponent(pathname.replace('/api/postits/', ''));
    postIts = postIts.filter((p) => p.id !== id);
    broadcast({ type: 'postits_update', postIts });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  // --- Static File Serving ---
  let filePath = path.join(DIST_DIR, pathname === '/' ? 'index.html' : pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // SPA Fallback: serve index.html
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 OpenSpec Workshop Server läuft auf http://0.0.0.0:${PORT}`);
  console.log(`📱 Raum-Code: ${session.roomCode}`);
});
