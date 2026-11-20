# 🎓 Cyber Deception Framework — Viva Defense & Presentation Guide

This guide gives you the exact answers, architecture, and technical explanations to get top marks when presenting this project to professors, evaluators, or interviewers.

---

## 📌 1. One-Sentence Project Summary
> *"This project is an autonomous **Cyber Deception Framework** built on the **MERN** stack that plants distributed digital honeytokens—like decoy admin portals, fake backup files, and canary API keys—to trap adversaries during early reconnaissance with **zero false positives**."*

---

## 🏗️ 2. High-Level Architecture

```
[ Adversary / Scanner ] 
       │
       ▼ (Probes /admin-backup.sql, /.env, or /superadmin/portal)
[ Express Digital Tripwire Engine ]
       │
       ├─► Threat Intel Engine (Tool parser, Tor/VPN classification, Threat Scoring 0-100)
       ├─► MongoDB Persistence (Saves permanent incident & forensics log)
       ├─► Socket.io WebSockets (Zero-latency broadcast to security dashboards)
       └─► Discord / Telegram Notifier (Instant push notifications)
       │
       ▼ (0ms Push Event: 'threat:tripped')
[ Studio-Grade React Dashboard (Vite) ]
```

---

## 💡 3. Top 5 Viva Questions & Exact Answers

### Q1: Why use Cyber Deception instead of a standard Firewall (WAF)?
**Answer:**  
*"Firewalls are reactive and look for known signatures, generating thousands of logs daily with many false positives. Deception technology is proactive: because honeytokens have no legitimate business purpose, **every single alert is a guaranteed intruder (zero false positives)**, allowing us to capture their digital footprint before they find real vulnerabilities."*

### Q2: What is a Honeytoken / Canary Trap?
**Answer:**  
*"A honeytoken is an attractive digital decoy—such as a fake database row, a dummy Stripe API key, a 1x1 tracking pixel inside a PDF, or a hidden backup URL. Normal users never see or click them, but automated hacking tools and data thieves find and trigger them."*

### Q3: How do you detect if an attacker is using Tor or a VPN?
**Answer:**  
*"Our Phase 4 Threat Intelligence module analyzes the incoming request IP against known Tor exit node ranges, commercial VPN CIDR blocks, and cloud datacenter ranges (AWS, DigitalOcean). It automatically tags the incident with badges like `TOR_EXIT_NODE` or `COMMERCIAL_VPN`."*

### Q4: How does the system calculate the Threat Severity Score?
**Answer:**  
*"The backend uses a weighted scoring algorithm (0 to 100):*
$$\text{Score} = \text{Base (50)} + \text{Vector Weight (15-25)} + \text{Network Anonymity (10-20)} + \text{Tool Automation (10)}$$
*For example, an automated bot using a Tor exit node to steal an API key scores 100/100 (CRITICAL). A manual browser probe scores lower."*

### Q5: How is the MERN stack used in this project?
**Answer:**  
- **MongoDB:** Stores the `Decoy` schema and `Incident` forensics records with high-performance time-stamped JSON documents.
- **Express.js & Node.js:** Hosts the REST APIs, active digital tripwire routes, and WebSocket server.
- **React:** Powers the real-time operational dashboard, live forensics feed, and hardware canvas entropy extractor.

---

## 🧪 4. Live Demo Steps to Show the Examiner:
1. Double-click `host_online.bat` on your Desktop.
2. Open the dashboard at `http://localhost:5000` (show the green `WEBSOCKET LIVE` badge).
3. Open `http://localhost:5000/superadmin/portal` on your smartphone (or another tab) and type `hacker_test`.
4. Point to the dashboard: **the incident immediately appears live with an audio alert, threat score of 95/100, and full device forensics!**
5. Click **"Export Report"** to show the downloadable JSON audit log.
