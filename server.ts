import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import multer from 'multer';
import Database from 'better-sqlite3';
import fs from 'fs';

const db = new Database('portfolio.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT,
    original_name TEXT,
    mime_type TEXT,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    image_url TEXT,
    category TEXT, -- 'certification' or 'development'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use('/uploads', express.static('uploads'));

  // Ensure uploads directory exists
  if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  const upload = multer({ storage });

  // API Routes
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    const stmt = db.prepare('INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)');
    stmt.run(name, email, subject, message);
    res.json({ success: true, message: 'Message sent successfully' });
  });

  app.post('/api/posts', upload.single('image'), (req, res) => {
    const { title, description, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    
    const stmt = db.prepare('INSERT INTO posts (title, description, image_url, category) VALUES (?, ?, ?, ?)');
    const result = stmt.run(title, description, imageUrl, category);
    
    res.json({ success: true, id: result.lastInsertRowid });
  });

  app.get('/api/posts/:category', (req, res) => {
    const { category } = req.params;
    const posts = db.prepare('SELECT * FROM posts WHERE category = ? ORDER BY created_at DESC').all(category);
    res.json(posts);
  });

  app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    
    const { category } = req.body;
    const stmt = db.prepare('INSERT INTO files (filename, original_name, mime_type, category) VALUES (?, ?, ?, ?)');
    const result = stmt.run(req.file.filename, req.file.originalname, req.file.mimetype, category || 'general');
    
    res.json({ success: true, fileId: result.lastInsertRowid, filename: req.file.filename });
  });

  app.get('/api/files/:category', (req, res) => {
    const { category } = req.params;
    const files = db.prepare('SELECT * FROM files WHERE category = ? ORDER BY created_at DESC').all(category);
    res.json(files);
  });

  app.get('/api/download-cv', (req, res) => {
    const cv = db.prepare('SELECT * FROM files WHERE category = "cv" ORDER BY created_at DESC LIMIT 1').get();
    if (!cv) return res.status(404).json({ error: 'CV not found' });
    
    const filePath = path.resolve('uploads', cv.filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found on server' });
    
    res.download(filePath, cv.original_name);
  });

  app.get('/api/profile-image', (req, res) => {
    const profile = db.prepare('SELECT * FROM files WHERE category = "profile" ORDER BY created_at DESC LIMIT 1').get();
    if (!profile) return res.status(404).json({ error: 'Profile image not found' });
    
    const filePath = path.resolve('uploads', profile.filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found on server' });
    
    res.sendFile(filePath);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
