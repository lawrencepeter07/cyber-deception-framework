/**
 * CYBER DECEPTION FRAMEWORK — CLIENT INSTRUMENTATION & FORENSICS
 * Strictly adhering to studio-grade non-template UI standards:
 * - Real hardware entropy canvas hash calculation
 * - Audio-synthesized instrument micro-beeps (Web Audio API)
 * - Zero layout thrashing (GPU-only transitions)
 * - Mobile bottom bar and keyboard accessibility
 */

// Initial State Register
const state = {
  decoys: [
    {
      id: 'DCY-101',
      vector: 'CANARY_URL',
      vectorLabel: 'HTTP Endpoint',
      name: '/api/v1/auth/admin-backup.sql',
      location: 'Hidden HTML comment in /login',
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
  ],
  incidents: [
    {
      id: 'TRIP-9841',
      trapName: 'sk_live_canary_99x821_internal',
      vectorClass: 'API Key Leakage',
      ip: '185.220.101.44 (Tor Exit Node)',
      geo: 'Frankfurt, DE',
      tool: 'python-requests/2.31.0',
      fingerprint: 'fp_a9b1c784e2098b',
      timestamp: 'Just now'
    },
    {
      id: 'TRIP-9840',
      trapName: '/api/v1/auth/admin-backup.sql',
      vectorClass: 'Directory Traversal Probe',
      ip: '194.26.29.112 (Hosting Provider)',
      geo: 'Amsterdam, NL',
      tool: 'sqlmap/1.7.11#stable',
      fingerprint: 'fp_4d82f110c7931a',
      timestamp: '12m ago'
    },
    {
      id: 'TRIP-9839',
      trapName: 'uid: 9999 (canary_secops_audit)',
      vectorClass: 'NoSQL Query Injection',
      ip: '45.154.255.89',
      geo: 'Kyiv, UA',
      tool: 'curl/8.4.0 (Autonomous Bot)',
      fingerprint: 'fp_89e24ca771029e',
      timestamp: '1h ago'
    }
  ]
};

// Precise Vector Badges (Clean technical SVGs, zero emojis)
function getVectorBadge(vector) {
  const icons = {
    CANARY_URL: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    API_KEY: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21 2-2 2m-6 6 2-2m-8 8a5.5 5.5 0 1 1 7.78-7.78L21 2M9 15l2 2"></path></svg>`,
    DB_ROW: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
    DOCUMENT: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`
  };
  return icons[vector] || '';
}

// Signature Moment: Synthesized Hardware Audio Beep (Web Audio API)
function playInstrumentBeep() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime); // High-precision telemetry tone (A5)
    osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.12);
  } catch (e) {
    // Graceful fallback for non-audio environments
  }
}

// Compute Authentic Client Hardware & Canvas Entropy Hash
function generateHardwareFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 40;
    const ctx = canvas.getContext('2d');
    
    // Draw complex primitives to extract GPU rasterization entropy
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

// Render Honeytoken Register Table
function renderDecoys() {
  const tbody = document.getElementById('decoyTableBody');
  tbody.innerHTML = state.decoys.map(d => `
    <tr>
      <td class="decoy-name-cell">${d.name}</td>
      <td>
        <span class="vector-tag">
          ${getVectorBadge(d.vector)}
          <span>${d.vectorLabel}</span>
        </span>
      </td>
      <td class="location-cell">${d.location}</td>
      <td><span class="status-cell">${d.status}</span></td>
    </tr>
  `).join('');

  const countStr = String(state.decoys.length).padStart(2, '0');
  document.getElementById('gaugeDecoys').innerText = countStr;
  document.querySelector('.mobile-active-count').innerText = `${state.decoys.length} Traps Deployed`;
}

// Render Forensics Stream
function renderForensics() {
  const container = document.getElementById('dossierStream');
  container.innerHTML = state.incidents.map(item => `
    <article class="dossier-card">
      <div class="dossier-header">
        <span class="dossier-trap-id">DETONATED: ${item.trapName}</span>
        <span class="dossier-timestamp">${item.timestamp}</span>
      </div>
      <div class="dossier-grid">
        <div class="dossier-item">
          <span class="dossier-label">Vector Classification</span>
          <span class="dossier-val">${item.vectorClass}</span>
        </div>
        <div class="dossier-item">
          <span class="dossier-label">Source Origin</span>
          <span class="dossier-val">${item.ip}</span>
        </div>
        <div class="dossier-item">
          <span class="dossier-label">Location</span>
          <span class="dossier-val">${item.geo}</span>
        </div>
        <div class="dossier-item">
          <span class="dossier-label">User-Agent Signature</span>
          <span class="dossier-val">${item.tool}</span>
        </div>
        <div class="dossier-item" style="grid-column: span 2;">
          <span class="dossier-label">Hardware Canvas Signature Hash</span>
          <span class="dossier-hash">${item.fingerprint}</span>
        </div>
      </div>
    </article>
  `).join('');

  document.getElementById('gaugeTripped').innerText = String(state.incidents.length).padStart(2, '0');
  document.getElementById('gaugeFingerprints').innerText = String(state.incidents.length).padStart(2, '0');
}

// The Signature Interactive Moment: Simulated Breach Trigger
function triggerBreachSimulation() {
  playInstrumentBeep();

  const targetDecoy = state.decoys[Math.floor(Math.random() * state.decoys.length)];
  const liveHash = generateHardwareFingerprint();
  const screenSpec = `${window.screen.width}x${window.screen.height} (${window.devicePixelRatio}x)`;
  const browserSig = navigator.userAgent.split(' ')[0] + ' ' + (navigator.platform || 'x86_64');

  const newIncident = {
    id: 'TRIP-' + Math.floor(1000 + Math.random() * 9000),
    trapName: targetDecoy.name,
    vectorClass: targetDecoy.vectorLabel + ' Intercept',
    ip: '127.0.0.1 [Local Client Simulation]',
    geo: 'Client Browser Environment',
    tool: `${browserSig} &bull; ${screenSpec}`,
    fingerprint: liveHash,
    timestamp: 'Just now'
  };

  state.incidents.unshift(newIncident);
  renderForensics();
}

// Event Bindings
document.getElementById('triggerSimulationBtn').addEventListener('click', triggerBreachSimulation);
document.getElementById('mobileTriggerBtn').addEventListener('click', triggerBreachSimulation);

// Modal Management with Focus Trap & Escape Key
const modal = document.getElementById('decoyModal');
const openModalBtn = document.getElementById('openNewDecoyBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const decoyForm = document.getElementById('newDecoyForm');

function openModal() {
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('trapLabel').focus();
}

function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  decoyForm.reset();
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

decoyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const category = document.getElementById('trapCategory').value;
  const label = document.getElementById('trapLabel').value.trim();
  const location = document.getElementById('trapLocation').value.trim();

  const labels = {
    CANARY_URL: 'HTTP Endpoint',
    API_KEY: 'Canary Secret',
    DB_ROW: 'NoSQL Tuple',
    DOCUMENT: 'Document Token'
  };

  state.decoys.unshift({
    id: 'DCY-' + Math.floor(100 + Math.random() * 900),
    vector: category,
    vectorLabel: labels[category] || 'Custom Trap',
    name: label,
    location: location,
    status: 'ARMED'
  });

  renderDecoys();
  closeModal();
});

// Initial Render
renderDecoys();
renderForensics();
