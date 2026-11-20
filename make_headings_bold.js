import { execSync } from 'child_process';

const docId = '1EW4nBoctpnbJBU9kFwr6D_8fulq3dUh8I8zUW-zjxes';

const headings = [
  'Active Cyber Deception Framework: Early-Stage Threat Detection & Forensic Telemetry',
  '1. Project Topic',
  '2. Executive Abstract',
  '3. Requirements Specification',
  '3.1 Functional Requirements',
  '3.2 Non-Functional Requirements',
  '3.3 Hardware and Software Requirements',
  '4. Module Descriptions',
  'Module 1: Corporate SSO Honeypot & Authentication Deception Engine (Port 8000)',
  'Module 2: High-Fidelity Enterprise Intranet Workspace ("NexaTech Solutions")',
  'Module 2: High-Fidelity Enterprise Intranet Workspace',
  'Module 3: Threat Telemetry, Forensic Ingestion & Mobile Fingerprinting Pipeline',
  'Module 4: Dynamic Threat Scoring & Heuristic Classification Engine',
  'Module 5: Central SOC Defender Command Center & Real-Time Visualization (Port 5000)',
  'Module 6: Data Persistence & Auditing Subsystem (MongoDB)',
  '5. Entity-Relationship (ER) Architecture',
  'Visual Entity-Relationship Diagram',
  '6. System Implementation & Demonstration Screenshots',
  'Screenshot 01: Defender SOC Command Console Dashboard',
  'Screenshot 02: SOC Threat Forensics (Hackers Only Filter)',
  'Screenshot 03: Microsoft Entra ID Login Honeypot Portal',
  'Screenshot 04: Compromised 50 Accounts Leak Dump',
  'Screenshot 05: NexaTech Solutions Workspace Home Dashboard',
  'Screenshot 06: Teams Chat & Threaded Channels',
  'Screenshot 07: SharePoint Confidential File Drive',
  'Screenshot 08: Projects & Tasks Kanban Board',
  'Screenshot 09: Teams Video Meeting Conference UI',
  'Screenshot 10: Corporate Employee Directory (MongoDB)'
];

console.log('Making all titles and headings BOLD...');

for (const h of headings) {
  try {
    const escaped = h.replace(/"/g, '\\"');
    execSync(`gdocs mutate format-text ${docId} --bold --text "${escaped}"`, { stdio: 'pipe' });
    console.log(`✅ Bold: ${h}`);
  } catch (err) {
    // If not found verbatim, ignore
  }
}

console.log('🎉 Done! All headings are now bold.');
