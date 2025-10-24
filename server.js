import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// deny env/dotfiles (defense-in-depth)
app.use((req, res, next) => {
  const p = req.path;
  if (p.startsWith('/.well-known/')) return next();
  if (/^\/\.?env(\.|$)/i.test(p)) return res.sendStatus(404);
  if (/^\/\./.test(p)) return res.sendStatus(404);
  next();
});

const publicDir = path.join(__dirname, 'dist', 'public');
app.use(express.static(publicDir, { dotfiles: 'ignore', index: 'index.html', maxAge: '1h' }));

// health endpoint for checks
app.get('/healthz', (_req, res) => res.status(200).send('ok'));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[express] serving on port ${PORT}`);
});
