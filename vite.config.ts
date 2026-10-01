import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Lightweight Realtime In-Memory Workshop Backend for Vite Dev
function realtimeWorkshopPlugin(): Plugin {
  let session = {
    roomCode: 'VIBE',
    activePhase: 1,
    participantCount: 1,
  };

  let postIts: any[] = [];

  const sseClients = new Set<any>();

  function broadcast(event: any) {
    const payload = `data: ${JSON.stringify(event)}\n\n`;
    for (const client of sseClients) {
      try {
        client.write(payload);
      } catch {
        sseClients.delete(client);
      }
    }
  }

  return {
    name: 'realtime-workshop-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';

        // Server-Sent Events stream
        if (url === '/api/events') {
          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            'Access-Control-Allow-Origin': '*',
          });

          sseClients.add(res);
          session.participantCount = sseClients.size;
          broadcast({ type: 'session_update', session });

          // Send current state on connection
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

        // GET /api/session
        if (url === '/api/session' && req.method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ...session, participantCount: Math.max(1, sseClients.size) }));
          return;
        }

        // POST /api/session
        if (url === '/api/session' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => (body += chunk));
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

        // GET /api/postits
        if (url === '/api/postits' && req.method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(postIts));
          return;
        }

        // POST /api/postits
        if (url === '/api/postits' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => (body += chunk));
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

        // DELETE /api/postits/:id
        if (url.startsWith('/api/postits/') && req.method === 'DELETE') {
          const id = decodeURIComponent(url.replace('/api/postits/', ''));
          postIts = postIts.filter((p) => p.id !== id);
          broadcast({ type: 'postits_update', postIts });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
          return;
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), realtimeWorkshopPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
