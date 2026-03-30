// src/app.js
require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');
const routes  = require('./routes');

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api', routes);

app.get('/health', (_, res) => res.json({ status: 'ok', service: 'ITER Events API' }));

// 404
app.use((req, res) => res.status(404).json({ success: false, message: `${req.method} ${req.path} not found.` }));

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Something went wrong.' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  ITER Events API → http://localhost:${PORT}`);
  console.log(`    Health  → http://localhost:${PORT}/health`);
  console.log(`    CORS    → ${process.env.CORS_ORIGIN || '*'}`);
  console.log(`\n    All club logins: <CLUB_ID> / demo123\n`);
});

module.exports = app;
