/**
 * Telemetry and Forensic Utilities
 * - Authentic Client Hardware / Canvas Entropy Extraction
 * - Web Audio API Telemetry Tone Generator
 */

export function generateCanvasEntropy() {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 40;
    const ctx = canvas.getContext('2d');

    ctx.textBaseline = 'top';
    ctx.font = '14px Plus Jakarta Sans, Arial';
    ctx.fillStyle = '#0284C7';
    ctx.fillRect(10, 5, 80, 25);
    ctx.fillStyle = '#EDEDF2';
    ctx.fillText('DeceptionTripwire://982', 15, 10);
    ctx.fillStyle = 'rgba(220, 38, 38, 0.75)';
    ctx.fillRect(60, 15, 70, 20);

    const b64 = canvas.toDataURL();
    let hash = 5381;
    for (let i = 0; i < b64.length; i++) {
      hash = ((hash << 5) + hash) + b64.charCodeAt(i);
      hash = hash & hash;
    }
    return 'fp_' + Math.abs(hash).toString(16).padStart(8, '0') + 'c9';
  } catch (err) {
    return 'fp_headless_env_0x82';
  }
}

export function playInstrumentTone() {
  // Completely silent - zero sound output
  return;
}

export const initialDecoys = [
  {
    id: 'DCY-101',
    vector: 'CANARY_URL',
    vectorLabel: 'HTTP Endpoint',
    name: '/api/v1/auth/admin-backup.sql',
    location: 'Hidden comment in /login page',
    status: 'ARMED'
  },
  {
    id: 'DCY-102',
    vector: 'API_KEY',
    vectorLabel: 'Canary Secret',
    name: 'sk_live_canary_99x821_internal',
    location: 'Public repo commit in .env.example',
    status: 'ARMED'
  },
  {
    id: 'DCY-103',
    vector: 'DB_ROW',
    vectorLabel: 'NoSQL Tuple',
    name: 'uid: 9999 (canary_secops_audit)',
    location: 'MongoDB users collection boundary',
    status: 'ARMED'
  },
  {
    id: 'DCY-104',
    vector: 'DOCUMENT',
    vectorLabel: 'Document Token',
    name: 'Q4_Executive_Compensation.pdf',
    location: 'Corporate Cloud Storage bucket',
    status: 'ARMED'
  }
];

export const initialIncidents = [
  {
    id: 'TRIP-9841',
    trapName: 'sk_live_canary_99x821_internal',
    vectorClass: 'API Key Leakage',
    ip: '185.220.101.44 (Tor Exit Node)',
    geo: 'Frankfurt, DE',
    tool: 'python-requests/2.31.0',
    fingerprint: 'fp_a9b1c784e2098bc9',
    timestamp: 'Just now',
    payload: 'GET /api/v1/users/export?auth=sk_live_canary_99x821_internal',
    riskLevel: 'CRITICAL'
  },
  {
    id: 'TRIP-9840',
    trapName: '/api/v1/auth/admin-backup.sql',
    vectorClass: 'Directory Traversal Probe',
    ip: '194.26.29.112 (Hosting Provider)',
    geo: 'Amsterdam, NL',
    tool: 'sqlmap/1.7.11#stable',
    fingerprint: 'fp_4d82f110c7931ac9',
    timestamp: '12m ago',
    payload: 'HEAD /api/v1/auth/admin-backup.sql HTTP/1.1',
    riskLevel: 'HIGH'
  },
  {
    id: 'TRIP-9839',
    trapName: 'uid: 9999 (canary_secops_audit)',
    vectorClass: 'NoSQL Query Injection',
    ip: '45.154.255.89',
    geo: 'Kyiv, UA',
    tool: 'curl/8.4.0 (Autonomous Bot)',
    fingerprint: 'fp_89e24ca771029ec9',
    timestamp: '1h ago',
    payload: '{"username": {"$ne": null}, "role": "canary_secops_audit"}',
    riskLevel: 'CRITICAL'
  }
];
