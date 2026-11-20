import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import DecoyUser from './models/DecoyUser.js';
import Incident from './models/Incident.js';
import { analyzeRequestForensics, computeThreatScore } from './services/threatIntel.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORTAL_PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cyber_deception';
const DEFENDER_CORE_URL = process.env.DEFENDER_URL || 'http://localhost:5000';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve Official Corporate SSO Login (Clean White Professional Design)
app.get(['/', '/login'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'portal-login.html'));
});

// Serve Official Corporate Workspace Intranet & Drive
app.get('/workspace', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'portal-workspace.html'));
});

// Serve Leaked Credentials Dump (Third-Party Breach Simulation)
app.get('/leaked-credentials', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'leaked-credentials.txt'));
});

// API: Returns the 50 Corporate Employees
app.get('/api/employees', async (req, res) => {
  try {
    const list = await DecoyUser.find().sort({ empId: 1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve directory' });
  }
});

// Handle Login Submission (Traps the Attacker & Forwards Telemetry to Port 5000)
app.post('/login', async (req, res) => {
  try {
    const rawInput = req.body.email || req.body.username || 'unknown_intruder';
    const password = req.body.password || '';
    const cleanUser = rawInput.trim();

    const prefix = cleanUser.includes('@') ? cleanUser.split('@')[0] : cleanUser;

    // Check against 50 decoy corporate users in MongoDB
    const foundUser = await DecoyUser.findOne({
      $or: [
        { email: new RegExp('^' + cleanUser + '$', 'i') },
        { username: new RegExp('^' + cleanUser + '$', 'i') },
        { googleAccount: new RegExp('^' + cleanUser + '$', 'i') },
        { email: new RegExp('^' + prefix + '@', 'i') },
        { username: new RegExp('^' + prefix + '$', 'i') },
        { name: new RegExp(prefix.replace('.', ' '), 'i') }
      ]
    });

    const intel = analyzeRequestForensics(req);
    const score = foundUser ? 98 : computeThreatScore({ vectorClass: 'Credential Stuffing & Database Exfiltration', isBot: intel.isBot, networkType: intel.networkType });

    const targetAccountName = foundUser
      ? `${foundUser.name} (${foundUser.googleAccount})`
      : cleanUser;

    const incidentData = {
      trapName: `Apex Corporate SSO [Breached: ${targetAccountName}]`,
      vectorClass: 'Credential Stuffing & Lateral Enterprise Movement',
      ip: intel.ip,
      geo: intel.geo,
      tool: intel.tool,
      toolCategory: intel.toolCategory,
      networkType: intel.networkType,
      threatScore: score,
      fingerprint: intel.fingerprint || ('fp_corp_' + Math.abs(cleanUser.length * 43).toString(16)),
      payload: `PORTAL_AUTH_EXPLOIT: Attacker breached Apex Enterprise Cloud SSO using credentials for ${targetAccountName} from IP ${intel.ip}. Redirected to Corporate Workspace Vault.`,
      riskLevel: 'CRITICAL',
      timestamp: new Date()
    };

    // 1. Save directly into MongoDB
    const incident = new Incident(incidentData);
    await incident.save();

    // 2. Notify Cyber Deception Framework on Port 5000 (0ms WebSockets + Live Dashboard alert)
    try {
      await fetch(`${DEFENDER_CORE_URL}/api/incidents/external-breach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incidentData)
      });
    } catch (pushErr) {
      console.log(`[Warning] Could not forward push to ${DEFENDER_CORE_URL}: ${pushErr.message}`);
    }

    console.log(`🚨 [PORT 8000 HONEYPOT] Attacker breached account: ${targetAccountName} from IP: ${intel.ip} [${intel.geo}]`);

    // 3. Deceive the hacker! Redirect them to the genuine-looking company workspace
    const displayName = foundUser ? foundUser.name : cleanUser;
    const displayRole = foundUser ? `${foundUser.role} &bull; ${foundUser.department}` : 'Corporate Workspace';

    res.redirect(`/workspace?user=${encodeURIComponent(displayName)}&role=${encodeURIComponent(displayRole)}`);
  } catch (err) {
    console.error('Login error:', err);
    res.redirect('/workspace?user=Authenticated+User&role=Employee');
  }
});

// Connect to MongoDB & Start Company Server on Port 8000
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ [Company Portal] Connected to MongoDB database: cyber_deception');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🏢 [Apex Global Systems] Production Corporate Portal LIVE on:`);
      console.log(`   👉 http://localhost:${PORT}`);
      console.log(`   👉 http://172.100.2.71:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ [Company Portal] Failed to connect to MongoDB:', err);
  });
