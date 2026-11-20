# Active Cyber Deception Framework: Early-Stage Threat Detection & Forensic Telemetry

---

## 1. Project Topic
**Active Cyber Deception Framework: Early-Stage Lateral Threat Detection and Forensic Telemetry through High-Fidelity Decoy Enterprise Services**

---

## 2. Executive Abstract
Modern corporate enterprise environments are under constant threat from credential-based attacks, including credential stuffing, password spraying, dark-web credential dumps, and unauthorized lateral movement. Conventional perimeter defenses (such as firewalls and endpoint security tools) typically fail when an attacker uses legitimate credentials obtained via third-party data breaches. 

This project presents an **Active Cyber Deception Framework** that shifts the tactical advantage from the attacker to the defender. By deploying an authentic, high-fidelity replica of an enterprise Microsoft 365 / Entra ID Single Sign-On (SSO) environment for a fictional company (**NexaTech Solutions**), attackers are lured into interacting with monitored honeypot assets. A simulated dark-web database leak containing 50 corporate identities acts as bait. 

When an adversary logs in—whether via desktop browser or mobile cellular networks (4G/5G)—the system immediately extracts deep forensic telemetry: real public IP addresses, approximate geolocations, cellular carrier details, millisecond timestamps, and hardware fingerprints without altering the attacker to detection. The intruder is seamlessly redirected into an authentic, sandboxed corporate intranet workspace (featuring Microsoft Teams chat, SharePoint file drives, Kanban sprint tasks, and video conference calls), completely isolating them while tracking their lateral exploration. Any attempt to download confidential files trips silent forensic canary tokens. All intrusions are classified via a heuristic threat scoring engine, stored in **MongoDB**, and broadcast in real time to a **Defender SOC Command Console** with strict visual alerts and zero noise.

---

## 3. Requirements Specification

### 3.1 Functional Requirements
- **FR-1 (Authentic Corporate Identity Decoys):** Generate and seed 50 realistic decoy corporate employee identities across Engineering, Infrastructure, Cyber Security, Research, Finance, and HR into MongoDB with corporate emails, Google backup accounts, and 2FA recovery codes.
- **FR-2 (High-Fidelity SSO Honeypot):** Serve a pixel-perfect Microsoft Entra ID sign-in portal adhering to Microsoft Fluent Design, devoid of any honeypot or trap indicators.
- **FR-3 (Multi-Network Edge Capture):** Support local network evaluation, external public web domains, and public mobile cellular traffic via edge tunnels and proxies.
- **FR-4 (Silent Client & Mobile Fingerprinting):** Extract remote public IP addresses (`x-forwarded-for`, `cf-connecting-ip`), user-agent strings, geolocation, cellular carrier/ISP, screen viewport resolution, and touch capabilities.
- **FR-5 (Dynamic Workspace Personalization):** Seamlessly admit the intruder into a role-specific corporate workspace (e.g., Sarah Jenkins receives Kubernetes/Terraform files; Michael Ross receives CFO audit reports).
- **FR-6 (Silent Canary Document Beacons):** Embed forensic tracking webhooks into downloadable confidential files to detect and alert on data exfiltration.
- **FR-7 (Threat Scoring & Classification):** Calculate dynamic threat scores (0–100) and risk levels (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`) based on vector class, network type, and targeted decoy identity.
- **FR-8 (Real-Time WebSocket SOC Broadcast):** Push intrusion telemetry instantly to the Defender SOC Console over bidirectional Socket.io WebSockets with visual alerts and strictly muted audio (zero sound).
- **FR-9 (Routine Staff vs. Hacker Filtering):** Provide interactive SOC filter toggles to distinguish automated routine staff operations from active malicious hacker breaches.

### 3.2 Non-Functional Requirements
- **NFR-1 (Stealth & Deception Fidelity):** Zero honeypot giveaways, error leaks, or performance drops that could alert an adversary to the sandbox.
- **NFR-2 (Sub-Second Telemetry Latency):** Ingest, classify, persist, and broadcast forensic events within $\le 500\text{ ms}$.
- **NFR-3 (Data Integrity & Persistence):** ACID-compliant transactional persistence using MongoDB for chain-of-custody compliance.
- **NFR-4 (Cross-Platform Responsiveness):** Fluid responsive layout adapting across mobile screens (iPhone, Android) up to 4K desktop displays.
- **NFR-5 (Silent Alert Enforcement):** Zero audible chimes or sirens to prevent audience disturbance and maintain an operational enterprise defense posture.

### 3.3 Hardware and Software Requirements
| Component | Specification |
| :--- | :--- |
| **Operating System** | Windows 10/11 64-bit, Ubuntu Linux 22.04 LTS, or macOS |
| **Runtime Environment** | Node.js v20.x or v24.x LTS |
| **Database** | MongoDB Community Server v7.0+ (Local Port 27017) |
| **Backend Framework** | Express.js 4.x, Socket.io 4.x, Mongoose 8.x |
| **Frontend Framework** | React 18, Tailwind CSS, Chart.js, Lucide Icons |
| **Edge Proxies & Tunnels** | Cloudflare Tunnel (`cloudflared`), Netlify Functions |
| **Automated Testing** | Puppeteer Core, Chromium / Google Chrome |

---

## 4. Module Descriptions

### Module 1: Corporate SSO Honeypot & Authentication Deception Engine (Port 8000)
This module acts as the primary decoy perimeter. Disguised as the official Microsoft 365 Entra ID login portal for **NexaTech Solutions**, it presents a clean, authentic authentication dialog with company branding, Single Sign-On (SSO) triggers, and quick-fill credential chips for seamless live evaluation. When an adversary inputs credentials from the leaked dark-web dump, the module evaluates the credentials against the 50 seeded decoy identities, initiates the forensic capture pipeline, and smoothly redirects the intruder into the intranet workspace without raising suspicion.

### Module 2: High-Fidelity Enterprise Intranet Workspace ("NexaTech Solutions")
Once authenticated, the adversary is admitted into an interactive, full-featured enterprise intranet inspired by Microsoft 365, Teams, and SharePoint:
- **Microsoft 365 Top Bar:** Features the 9-dot Waffle app launcher, global search box (`Ctrl+K`), unread notification badges, and presence status indicators (*Available*, *Busy*, *Away*).
- **Teams Left Navigation Rail:** Provides instant navigation across Home, Chat, Teams, Calendar, Files, Tasks, Directory, Helpdesk, and Analytics.
- **Role-Based Personalization:** Customizes the displayed assets to match the breached identity (e.g., Sarah Jenkins sees Kubernetes clusters and Terraform infrastructure).
- **SharePoint Confidential File Drive:** Houses sensitive documents embedded with silent canary tracking beacons.
- **Live Teams Chat & Video Simulator:** Features active team channels with periodic simulated incoming messages and an interactive 4-participant video conference UI.

### Module 3: Threat Telemetry, Forensic Ingestion & Mobile Fingerprinting Pipeline
Operating silently behind the scenes, this module captures rich forensic evidence from incoming HTTP/HTTPS requests. By inspecting edge network headers (`x-forwarded-for`, `cf-connecting-ip`, `client-ip`), the module identifies the intruder's true public IP address, cellular provider (e.g., Reliance Jio 5G, Airtel), and geographic location. Client-side fingerprinting further captures user-agent strings, device model, screen resolution, and touch capabilities to differentiate mobile operators from automated scanners.

### Module 4: Dynamic Threat Scoring & Heuristic Classification Engine
This module evaluates captured telemetry against a heuristic scoring model:
- **Baseline Threat Score:** Assigned based on vector classification (e.g., Credential Stuffing & Lateral Enterprise Movement).
- **Target Value Multiplier:** Breaches targeting privileged identities (such as Cloud Architects or CFOs) automatically receive a critical threat score of 98/100.
- **Canary Beacon Processing:** Document access triggers real-time exfiltration alarms, correlating the attacker's IP with the specific file accessed.

### Module 5: Central SOC Defender Command Center & Real-Time Visualization (Port 5000)
The security analyst dashboard provides full situational awareness:
- **Live Threat Stream:** Displays chronological intrusion cards with captured IPs, timestamps, threat scores, and device classifications.
- **Stream Filter Toggles:** Allows defenders to toggle between all traffic, malicious hacker breaches only, and simulated routine internal staff.
- **Silent Alert Mode:** Employs high-visibility glowing visual badges while strictly enforcing zero sound alarms.

### Module 6: Data Persistence & Auditing Subsystem (MongoDB)
All forensic evidence, decoy identities, and honeypot trap configurations are maintained within MongoDB (`cyber_deception` database):
- `incidents`: Stores complete event records including timestamps, client IPs, geolocation, vector class, risk levels, and payload details.
- `decoyusers`: Maintains the 50 corporate identities with credentials, Google backup accounts, and departmental roles.
- `decoys`: Tracks active deception listeners and traps.

---

## 5. Entity-Relationship (ER) Architecture

The framework relies on a normalized relational schema mapped via Mongoose to MongoDB document structures:

| Entity Name | Primary Key | Attributes & Descriptions | Related Entities |
| :--- | :--- | :--- | :--- |
| **DecoyUser** | `empId` | `name`, `username`, `email`, `googleAccount`, `passwordHash`, `backup2FACode`, `department`, `role`, `clearanceLevel` | Targeted in `Incident` (1:N), Owns `CanaryToken` (1:N) |
| **DecoyTrap** | `trapId` | `trapName`, `serviceType`, `listenAddress`, `port`, `status`, `baseThreatScore` | Triggers `Incident` (1:N) |
| **Incident** | `_id` | `trapName`, `targetAccount`, `ipAddress`, `networkType`, `cellularCarrier`, `geolocation`, `userAgent`, `deviceCategory`, `threatScore`, `riskLevel`, `payloadDetails`, `timestamp` | Triggered by `DecoyTrap` (N:1), Targets `DecoyUser` (N:1) |
| **CanaryToken**| `tokenId` | `filename`, `fileType`, `targetDepartment`, `clearanceRequirement`, `beaconEndpoint`, `tripCount` | Exfiltrated in `Incident` (1:N), Owned by `DecoyUser` (N:1) |

### Visual Entity-Relationship Diagram
Below is the architectural ER diagram illustrating the entity cardinality and relationships across the cyber deception database:

[ER_DIAGRAM_IMAGE_PLACEHOLDER]

---

## 6. System Implementation & Demonstration Screenshots

Below are the 10 captured system interfaces demonstrating the end-to-end cyber deception and telemetry workflow:

### Screenshot 01: Defender SOC Command Console Dashboard
Displays the primary security operations dashboard on Port 5000 with real-time threat gauges, intrusion feeds, and system health metrics.

[SCREENSHOT_01_PLACEHOLDER]

---

### Screenshot 02: SOC Threat Forensics (Hackers Only Filter)
Shows the filtered threat stream isolating critical external attacker breaches from routine corporate staff traffic, highlighting captured cellular IPs and threat scores of 98.

[SCREENSHOT_02_PLACEHOLDER]

---

### Screenshot 03: Microsoft Entra ID Login Honeypot Portal
The authentic Microsoft 365 sign-in interface on Port 8000 with enterprise branding, email/password inputs, and credential picker chips for live demonstrations.

[SCREENSHOT_03_PLACEHOLDER]

---

### Screenshot 04: Compromised 50 Accounts Leak Dump
Simulated dark-web database leak displaying 50 employee profiles, corporate emails, plaintext passwords, and 2FA recovery keys used as deception bait.

[SCREENSHOT_04_PLACEHOLDER]

---

### Screenshot 05: NexaTech Solutions Workspace Home Dashboard
The genuine Microsoft 365 intranet workspace loaded after authentication, personalized for Sarah Jenkins (Principal Cloud Architect).

[SCREENSHOT_05_PLACEHOLDER]

---

### Screenshot 06: Teams Chat & Threaded Channels
Interactive Microsoft Teams chat interface showing active project channels, threaded discussions, and live incoming message simulations.

[SCREENSHOT_06_PLACEHOLDER]

---

### Screenshot 07: SharePoint Confidential File Drive
The corporate SharePoint document drive containing sensitive cloud architecture and financial files embedded with canary tracking beacons.

[SCREENSHOT_07_PLACEHOLDER]

---

### Screenshot 08: Projects & Tasks Kanban Board
Interactive 4-column sprint task management board (To Do, In Progress, Review, Done) with priority tags and due dates.

[SCREENSHOT_08_PLACEHOLDER]

---

### Screenshot 09: Teams Video Meeting Conference UI
Interactive video conference simulator with 4 participant feeds, microphone/camera toggles, screen sharing, and leave meeting controls.

[SCREENSHOT_09_PLACEHOLDER]

---

### Screenshot 10: Corporate Employee Directory (MongoDB)
The live searchable employee directory displaying all 50 corporate staff profiles fetched directly from the MongoDB database.

[SCREENSHOT_10_PLACEHOLDER]

---
*Report Generated Automatically by Cyber Deception Framework Engine*
