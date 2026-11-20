import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import Decoy from './models/Decoy.js';
import Incident from './models/Incident.js';
import DecoyUser from './models/DecoyUser.js';
import { fakeUsersList } from './services/seedUsers.js';
import { analyzeRequestForensics, computeThreatScore } from './services/threatIntel.js';
import { dispatchDiscordAlert } from './services/notifier.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cyber_deception';

// Wrap Express with HTTP Server for Socket.io
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// 1x1 Transparent PNG buffer for Canary Document Tracking Beacons
const PIXEL_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  'base64'
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve compiled React frontend assets
app.use(express.static(distPath));

// Serve Adversary Exploit Workstation UI (Device A Hacker Interface)
app.get('/attacker', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'attacker.html'));
});

// Socket.io Connection Event
io.on('connection', (socket) => {
  console.log(`📡 [WebSocket] Security Console connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`🔌 [WebSocket] Security Console disconnected: ${socket.id}`);
  });
});

// Initial Database Seeder
async function seedInitialData() {
  const decoyCount = await Decoy.countDocuments();
  if (decoyCount === 0) {
    await Decoy.insertMany([
      {
        vector: 'CANARY_URL',
        vectorLabel: 'HTTP Endpoint',
        name: '/api/v1/auth/admin-backup.sql',
        location: 'Hidden comment in /login page',
        status: 'ARMED'
      },
      {
        vector: 'CANARY_URL',
        vectorLabel: 'HTTP Endpoint',
        name: '/.env',
        location: 'Root directory environment file bait',
        status: 'ARMED'
      },
      {
        vector: 'API_KEY',
        vectorLabel: 'Canary Secret',
        name: 'sk_live_canary_99x821_internal',
        location: 'Public repo commit in .env.example',
        status: 'ARMED'
      },
      {
        vector: 'DB_ROW',
        vectorLabel: 'NoSQL Tuple',
        name: 'uid: 9999 (canary_secops_audit)',
        location: 'MongoDB users collection boundary',
        status: 'ARMED'
      },
      {
        vector: 'DOCUMENT',
        vectorLabel: 'Document Token',
        name: 'Q4_Executive_Compensation.pdf',
        location: 'Corporate Cloud Storage bucket',
        status: 'ARMED'
      }
    ]);
    console.log('🛡️ [MongoDB] Initial Honeytokens seeded successfully.');
  }

  const incidentCount = await Incident.countDocuments();
  if (incidentCount === 0) {
    await Incident.insertMany([
      {
        trapName: 'sk_live_canary_99x821_internal',
        vectorClass: 'API Key Leakage',
        ip: '185.220.101.44 (Tor Exit Node)',
        geo: 'Frankfurt, DE',
        tool: 'python-requests/2.31.0',
        toolCategory: 'Automated Python Exploit Tool',
        networkType: 'TOR_EXIT_NODE',
        threatScore: 98,
        fingerprint: 'fp_a9b1c784e2098bc9',
        payload: 'GET /api/v1/users/export?auth=sk_live_canary_99x821_internal',
        riskLevel: 'CRITICAL',
        timestamp: new Date(Date.now() - 2 * 60 * 1000)
      },
      {
        trapName: '/api/v1/auth/admin-backup.sql',
        vectorClass: 'Directory Traversal Probe',
        ip: '194.26.29.112 (Hosting Provider)',
        geo: 'Amsterdam, NL',
        tool: 'sqlmap/1.7.11#stable',
        toolCategory: 'Automated SQL Injection Scanner',
        networkType: 'CLOUD_DATACENTER',
        threatScore: 92,
        fingerprint: 'fp_4d82f110c7931ac9',
        payload: 'HEAD /api/v1/auth/admin-backup.sql HTTP/1.1',
        riskLevel: 'HIGH',
        timestamp: new Date(Date.now() - 12 * 60 * 1000)
      },
      {
        trapName: 'uid: 9999 (canary_secops_audit)',
        vectorClass: 'NoSQL Query Injection',
        ip: '45.154.255.89',
        geo: 'Kyiv, UA',
        tool: 'curl/8.4.0 (Autonomous Bot)',
        toolCategory: 'Command Line HTTP Probe',
        networkType: 'COMMERCIAL_VPN',
        threatScore: 89,
        fingerprint: 'fp_89e24ca771029ec9',
        payload: '{"username": {"$ne": null}, "role": "canary_secops_audit"}',
        riskLevel: 'CRITICAL',
        timestamp: new Date(Date.now() - 60 * 60 * 1000)
      }
    ]);
    console.log('🛡️ [MongoDB] Phase 4 Enriched Incidents seeded.');
  }

  const userCount = await DecoyUser.countDocuments();
  if (userCount === 0) {
    await DecoyUser.insertMany(fakeUsersList);
    console.log('🛡️ [MongoDB] 50 Decoy Employee Google Accounts seeded into decoyusers collection.');
  }
}

// =========================================================================
// CANARY API KEY TRAP INTERCEPTOR MIDDLEWARE (With Live Socket.io Push)
// =========================================================================
app.use(async (req, res, next) => {
  const authHeader = req.headers['authorization'] || '';
  const apiKeyHeader = req.headers['x-api-key'] || '';
  const queryKey = req.query.api_key || req.query.auth || '';

  const matchedKey = [authHeader, apiKeyHeader, queryKey].find(
    (val) => typeof val === 'string' && val.includes('sk_live_canary_')
  );

  if (matchedKey) {
    const intel = analyzeRequestForensics(req);
    const score = computeThreatScore({ vectorClass: 'API Key Leakage', isBot: intel.isBot, networkType: intel.networkType });

    const incident = new Incident({
      trapName: 'sk_live_canary_99x821_internal',
      vectorClass: 'Leaked Canary API Key Utilization',
      ip: intel.ip,
      geo: intel.geo,
      tool: intel.tool,
      toolCategory: intel.toolCategory,
      networkType: intel.networkType,
      threatScore: score,
      fingerprint: intel.fingerprint || ('fp_key_' + Math.abs(matchedKey.length * 53).toString(16)),
      payload: `${req.method} ${req.originalUrl}\r\nHeaders: ${JSON.stringify(req.headers)}`,
      riskLevel: 'CRITICAL'
    });

    const saved = await incident.save();
    await Decoy.updateOne({ vector: 'API_KEY' }, { $inc: { triggerCount: 1 }, status: 'TRIPPED' });

    io.emit('threat:tripped', saved);
    io.emit('decoy:updated', { vector: 'API_KEY', status: 'TRIPPED' });
    dispatchDiscordAlert(saved);

    console.log(`🚨 [ALERT] Canary API Key Tripped by ${intel.ip}!`);
    return res.status(401).json({
      error: 'Invalid API Key',
      message: 'Canary key violation logged to security telemetry.'
    });
  }

  next();
});

// =========================================================================
// REST API ROUTES
// =========================================================================

app.get('/api/decoys', async (req, res) => {
  try {
    const decoys = await Decoy.find().sort({ createdAt: -1 });
    res.json(decoys);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve decoys' });
  }
});

app.post('/api/decoys', async (req, res) => {
  try {
    const { name, vector, vectorLabel, location } = req.body;
    if (!name || !vector || !location) {
      return res.status(400).json({ error: 'Missing required decoy fields' });
    }

    const newDecoy = new Decoy({
      name,
      vector,
      vectorLabel: vectorLabel || vector,
      location,
      status: 'ARMED'
    });

    const saved = await newDecoy.save();
    io.emit('decoy:deployed', saved);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to provision decoy' });
  }
});

app.get('/api/incidents', async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ timestamp: -1 });
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve incidents' });
  }
});

app.post('/api/incidents/simulate', async (req, res) => {
  try {
    const { trapName, vectorClass, fingerprint, payload } = req.body;
    const intel = analyzeRequestForensics(req);
    const score = computeThreatScore({ vectorClass: vectorClass || 'Test Probe', isBot: intel.isBot, networkType: intel.networkType });

    const newIncident = new Incident({
      trapName: trapName || 'General Tripwire Detonation',
      vectorClass: vectorClass || 'Manual Trigger Verification',
      ip: intel.ip,
      geo: intel.geo,
      tool: intel.tool,
      toolCategory: intel.toolCategory,
      networkType: intel.networkType,
      threatScore: score,
      fingerprint: fingerprint || 'fp_synthetic',
      payload: payload || `INTRUSION_SIMULATION: ${trapName}`,
      riskLevel: score >= 90 ? 'CRITICAL' : 'HIGH'
    });

    const saved = await newIncident.save();
    await Decoy.updateOne({ name: trapName }, { $inc: { triggerCount: 1 }, status: 'TRIPPED' });

    io.emit('threat:tripped', saved);
    io.emit('decoy:updated', { name: trapName, status: 'TRIPPED' });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to record simulated incident' });
  }
});

// Endpoint to receive breaches from the independent Company Portal (Port 8000)
app.post('/api/incidents/external-breach', async (req, res) => {
  try {
    const { trapName, vectorClass, ip, geo, tool, toolCategory, networkType, threatScore, fingerprint, payload, riskLevel } = req.body;

    const newIncident = new Incident({
      trapName: trapName || 'Apex Corporate SSO Breached',
      vectorClass: vectorClass || 'Credential Stuffing & Lateral Enterprise Movement',
      ip: ip || '127.0.0.1 [Local Machine]',
      geo: geo || 'Local Host Environment',
      tool: tool || 'Interactive Human Operator',
      toolCategory: toolCategory || 'Web Browser',
      networkType: networkType || 'LOCAL_SIMULATION',
      threatScore: threatScore || 98,
      fingerprint: fingerprint || 'fp_corp_gateway',
      payload: payload || `BREACH: ${trapName}`,
      riskLevel: riskLevel || 'CRITICAL',
      timestamp: new Date()
    });

    const saved = await newIncident.save();
    await Decoy.updateOne({ vector: 'CANARY_URL' }, { $inc: { triggerCount: 1 }, status: 'TRIPPED' });

    io.emit('threat:tripped', saved);
    io.emit('decoy:updated', { vector: 'CANARY_URL', status: 'TRIPPED' });
    dispatchDiscordAlert(saved);

    console.log(`🚨 [EXTERNAL PORT 8000 BREACH RECORDED] Trap: ${trapName} IP: ${ip}`);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to record external incident' });
  }
});

// =========================================================================
// REAL ACTIVE TRIPWIRE ENDPOINTS (HONEYPOTS)
// =========================================================================

// Trap 1: Backup SQL file scraper bait
app.all(['/api/v1/auth/admin-backup.sql', '/backup.sql', '/dump.sql'], async (req, res) => {
  const intel = analyzeRequestForensics(req);
  const score = computeThreatScore({ vectorClass: 'Web Directory Traversal & Backup Scraping', isBot: intel.isBot, networkType: intel.networkType });

  const incident = new Incident({
    trapName: req.path,
    vectorClass: 'Web Directory Traversal & Backup Scraping',
    ip: intel.ip,
    geo: intel.geo,
    tool: intel.tool,
    toolCategory: intel.toolCategory,
    networkType: intel.networkType,
    threatScore: score,
    fingerprint: intel.fingerprint || ('fp_scanner_' + Math.abs(intel.ip.length * 31).toString(16)),
    payload: `${req.method} ${req.originalUrl}\r\nHeaders: ${JSON.stringify(req.headers)}`,
    riskLevel: 'CRITICAL'
  });

  const saved = await incident.save();
  await Decoy.updateOne({ name: '/api/v1/auth/admin-backup.sql' }, { $inc: { triggerCount: 1 }, status: 'TRIPPED' });

  io.emit('threat:tripped', saved);
  io.emit('decoy:updated', { name: '/api/v1/auth/admin-backup.sql', status: 'TRIPPED' });
  dispatchDiscordAlert(saved);

  res.status(403).json({ error: 'Access Denied: Administrative action logged.' });
});

// Trap 2: Sensitive Environment Variable file bait
app.all(['/.env', '/.env.backup', '/.env.local'], async (req, res) => {
  const intel = analyzeRequestForensics(req);
  const score = computeThreatScore({ vectorClass: 'Environment Exfiltration Probe', isBot: intel.isBot, networkType: intel.networkType });

  const incident = new Incident({
    trapName: req.path,
    vectorClass: 'Environment File Exfiltration Probe',
    ip: intel.ip,
    geo: intel.geo,
    tool: intel.tool,
    toolCategory: intel.toolCategory,
    networkType: intel.networkType,
    threatScore: score,
    fingerprint: intel.fingerprint || ('fp_env_' + Math.abs(intel.ip.length * 19).toString(16)),
    payload: `${req.method} ${req.originalUrl}\r\nHeaders: ${JSON.stringify(req.headers)}`,
    riskLevel: 'CRITICAL'
  });

  const saved = await incident.save();
  await Decoy.updateOne({ name: '/.env' }, { $inc: { triggerCount: 1 }, status: 'TRIPPED' });

  io.emit('threat:tripped', saved);
  io.emit('decoy:updated', { name: '/.env', status: 'TRIPPED' });
  dispatchDiscordAlert(saved);

  res.status(404).send('Not Found');
});

// Trap 3: Document Tracking Beacon (1x1 Transparent PNG Pixel)
app.get('/api/canary/doc-beacon/:docName', async (req, res) => {
  const intel = analyzeRequestForensics(req);
  const docName = req.params.docName || 'Confidential_Document.pdf';
  const score = computeThreatScore({ vectorClass: 'Canary Document Exfiltration Beacon', isBot: intel.isBot, networkType: intel.networkType });

  const incident = new Incident({
    trapName: docName,
    vectorClass: 'Canary Document Exfiltration Beacon',
    ip: intel.ip,
    geo: intel.geo,
    tool: intel.tool,
    toolCategory: intel.toolCategory,
    networkType: intel.networkType,
    threatScore: score,
    fingerprint: 'fp_doc_' + Math.abs(docName.length * 37).toString(16),
    payload: `Document Opened on Client: ${docName}\r\nUser-Agent: ${intel.tool}\r\nIP: ${intel.ip}`,
    riskLevel: 'CRITICAL'
  });

  const saved = await incident.save();
  await Decoy.updateOne({ vector: 'DOCUMENT' }, { $inc: { triggerCount: 1 }, status: 'TRIPPED' });

  io.emit('threat:tripped', saved);
  io.emit('decoy:updated', { vector: 'DOCUMENT', status: 'TRIPPED' });
  dispatchDiscordAlert(saved);

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.send(PIXEL_PNG);
});

// Trap 4: Decoy Admin Portal UI
app.get('/superadmin/portal', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'portal.html'));
});

// Trap 4B: Decoy Privileged Database Vault (Deceives Hacker with 50 Fake Accounts)
app.get('/superadmin/vault', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'vault.html'));
});

// API: Retrieve 50 Decoy Corporate Accounts from MongoDB
app.get('/api/fake-users', async (req, res) => {
  try {
    const users = await DecoyUser.find().sort({ empId: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve decoy accounts' });
  }
});

// Diagnostic & Database Health Verification Endpoint
app.get('/api/health', async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    const incidentCount = isConnected ? await Incident.countDocuments() : 0;
    const decoyCount = isConnected ? await Decoy.countDocuments() : 0;
    const fakeUserCount = isConnected ? await DecoyUser.countDocuments() : 0;
    res.json({
      status: 'ok',
      mongoConnected: isConnected,
      database: 'cyber_deception',
      incidentCount,
      decoyCount,
      fakeUserCount
    });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// Trap 5: Honeypot Admin Authentication Submission Handler
app.post('/superadmin/auth', async (req, res) => {
  const intel = analyzeRequestForensics(req);
  const username = req.body.username || req.body.decoyUser || 'unknown_intruder';
  const password = req.body.password || req.body.decoyPass || '';

  // Check if attacker entered one of the 50 leaked decoy accounts
  const foundUser = await DecoyUser.findOne({
    $or: [
      { username: new RegExp('^' + username.trim() + '$', 'i') },
      { email: new RegExp('^' + username.trim() + '$', 'i') },
      { googleAccount: new RegExp('^' + username.trim() + '$', 'i') }
    ]
  });

  const targetAccount = foundUser
    ? `${foundUser.name} (${foundUser.googleAccount})`
    : username;

  const score = foundUser ? 98 : computeThreatScore({ vectorClass: 'Brute-Force & Credential Stuffing', isBot: intel.isBot, networkType: intel.networkType });

  const incident = new Incident({
    trapName: `/superadmin/portal [Compromised Account: ${targetAccount}]`,
    vectorClass: 'Credential Stuffing & Database Exfiltration',
    ip: intel.ip,
    geo: intel.geo,
    tool: intel.tool,
    toolCategory: intel.toolCategory,
    networkType: intel.networkType,
    threatScore: score,
    fingerprint: intel.fingerprint || ('fp_auth_' + Math.abs(username.length * 47).toString(16)),
    payload: `EXPLOIT_SUCCESS_SIMULATION: Attacker authenticated with leaked credentials for ${targetAccount}. Deceived with 50 Fake Employee Google Accounts Vault.`,
    riskLevel: 'CRITICAL',
    timestamp: new Date()
  });

  const saved = await incident.save();
  await Decoy.updateOne({ vector: 'CANARY_URL' }, { $inc: { triggerCount: 1 }, status: 'TRIPPED' });

  io.emit('threat:tripped', saved);
  io.emit('decoy:updated', { vector: 'CANARY_URL', status: 'TRIPPED' });
  dispatchDiscordAlert(saved);

  console.log(`🚨 [ALERT] Honeypot Login Breached! Account: ${targetAccount} IP: ${intel.ip} Time: ${saved.timestamp.toISOString()}`);

  const wantsJson = req.xhr || req.headers['accept']?.includes('application/json') || req.is('json') || req.headers['x-requested-with'] === 'XMLHttpRequest';

  if (wantsJson) {
    return res.status(200).json({
      success: true,
      redirectUrl: `/superadmin/vault?user=${encodeURIComponent(targetAccount)}`,
      message: 'Authentication successful. Access granted to 50 Internal Google Accounts Vault.',
      incident: {
        id: saved._id,
        ip: saved.ip,
        timestamp: saved.timestamp,
        target: targetAccount,
        threatScore: saved.threatScore,
        networkType: saved.networkType
      }
    });
  }

  // Standard form POST automatically redirects the attacker into the fake vault!
  res.redirect(`/superadmin/vault?user=${encodeURIComponent(targetAccount)}`);
});

// SPA Fallback: Serve React index.html for all other routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/superadmin')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Connect to MongoDB and start HTTP + WebSocket Server on 0.0.0.0 (all interfaces)
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('✅ [MongoDB] Connected to database: cyber_deception');
    await seedInitialData();

    httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 [Unified Host] Cyber Deception Platform live on:`);
      console.log(`   👉 Local:   http://localhost:${PORT}`);
      console.log(`   👉 Network: http://172.100.2.71:${PORT}`);

      // Start Real-Time Netlify Cloud Edge Intrusion Sync (Captures Mobile & Remote Intrusions)
      const NETLIFY_FEED_URL = 'https://nexatech-portal-login.netlify.app/.netlify/functions/breach';
      console.log(`🌐 [Netlify Cloud Sync] Monitoring live mobile intrusions from: ${NETLIFY_FEED_URL}`);

      const processedNetlifyKeys = new Set();
      setInterval(async () => {
        try {
          const feedRes = await fetch(NETLIFY_FEED_URL);
          if (feedRes.ok) {
            const feedData = await feedRes.json();
            if (feedData && feedData.incidents && feedData.incidents.length > 0) {
              for (const item of feedData.incidents) {
                const key = `${item.timestamp}_${item.ip}_${item.trapName}`;
                if (!processedNetlifyKeys.has(key)) {
                  processedNetlifyKeys.add(key);

                  const exists = await Incident.findOne({ timestamp: item.timestamp, ip: item.ip });
                  if (!exists) {
                    const saved = await Incident.create({
                      trapName: item.trapName,
                      vectorClass: item.vectorClass || 'Mobile Cellular Credential Exploitation',
                      ip: item.ip,
                      geo: item.geo,
                      tool: item.tool,
                      toolCategory: item.toolCategory || 'Mobile Cellular Device',
                      networkType: item.networkType || 'EXTERNAL_MOBILE_4G_5G',
                      threatScore: item.threatScore || 98,
                      riskLevel: item.riskLevel || 'CRITICAL',
                      payload: item.payload,
                      timestamp: item.timestamp
                    });
                    io.emit('threat:tripped', saved);
                    console.log(`🚨 [NETLIFY MOBILE BREACH LOGGED] IP: ${saved.ip} | User: ${saved.trapName} | Geo: ${saved.geo}`);
                  }
                }
              }
            }
          }
        } catch (syncErr) {
          // Silent ignore sync retry
        }
      }, 2500);
    });
  })
  .catch((err) => {
    console.error('❌ [MongoDB] Connection error:', err.message);
  });
