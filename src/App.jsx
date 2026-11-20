import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';

import Header from './components/Header';
import MetricGauges from './components/MetricGauges';
import DecoyRegister from './components/DecoyRegister';
import ForensicsStream from './components/ForensicsStream';
import DecoyLoginPortal from './components/DecoyLoginPortal';
import TripwireProbe from './components/TripwireProbe';
import DeployModal from './components/DeployModal';
import DossierModal from './components/DossierModal';
import MobileActionBar from './components/MobileActionBar';

import {
  initialDecoys,
  initialIncidents,
  generateCanvasEntropy,
  playInstrumentTone
} from './utils/telemetry';

// Dynamic API Base: works on localhost, LAN Wi-Fi, and live hosted tunnels
const API_BASE = window.location.port === '5173' ? 'http://localhost:5000' : window.location.origin;

export default function App() {
  const [decoys, setDecoys] = useState(initialDecoys);
  const [incidents, setIncidents] = useState(initialIncidents);
  const [isDeployOpen, setIsDeployOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [isSocketLive, setIsSocketLive] = useState(false);

  // Sync with MongoDB backend
  const fetchTelemetry = useCallback(async () => {
    try {
      const [decoysRes, incidentsRes, healthRes] = await Promise.all([
        fetch(`${API_BASE}/api/decoys`),
        fetch(`${API_BASE}/api/incidents`),
        fetch(`${API_BASE}/api/health`).catch(() => null)
      ]);

      if (decoysRes.ok && incidentsRes.ok) {
        const decoysData = await decoysRes.json();
        const incidentsData = await incidentsRes.json();

        if (decoysData.length > 0) setDecoys(decoysData);
        if (incidentsData.length > 0) setIncidents(incidentsData);
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } catch (err) {
      setIsOnline(false);
    }
  }, []);

  useEffect(() => {
    fetchTelemetry();

    // Persistent WebSocket Connection
    const socket = io(API_BASE, {
      reconnectionAttempts: 10,
      timeout: 5000
    });

    socket.on('connect', () => {
      console.log('⚡ [WebSocket] Connected to Cyber Deception Engine');
      setIsSocketLive(true);
      setIsOnline(true);
    });

    socket.on('disconnect', () => {
      console.log('🔌 [WebSocket] Disconnected from engine');
      setIsSocketLive(false);
    });

    // Zero-latency intrusion event stream
    socket.on('threat:tripped', (newIncident) => {
      console.log('🚨 [WebSocket] Real-time breach received:', newIncident);

      setIncidents((prev) => {
        if (prev.some((item) => (item._id && item._id === newIncident._id) || (item.id && item.id === newIncident.id))) {
          return prev;
        }
        return [newIncident, ...prev];
      });
    });

    socket.on('decoy:deployed', (newDecoy) => {
      setDecoys((prev) => [newDecoy, ...prev]);
    });

    socket.on('decoy:updated', ({ name, vector, status }) => {
      setDecoys((prev) =>
        prev.map((d) => (d.name === name || d.vector === vector ? { ...d, status } : d))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [fetchTelemetry]);

  // Simulated Breach Trigger
  const handleSimulateBreach = async () => {
    const randomDecoy = decoys[Math.floor(Math.random() * decoys.length)];
    const liveHash = generateCanvasEntropy();
    const screenSpec = `${window.screen.width}x${window.screen.height} (${window.devicePixelRatio}x)`;
    const browserSig = navigator.userAgent.split(' ')[0] + ' ' + (navigator.platform || 'x86_64');

    const breachPayload = {
      trapName: randomDecoy.name,
      vectorClass: randomDecoy.vectorLabel + ' Detonation',
      fingerprint: liveHash,
      customTool: `${browserSig} • ${screenSpec}`,
      payload: `HEAD ${randomDecoy.name} HTTP/1.1\r\nHost: target.internal\r\nX-Canary-Probe: active`
    };

    try {
      const res = await fetch(`${API_BASE}/api/incidents/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(breachPayload)
      });
      if (res.ok) return;
    } catch (err) {
      // Fallback
    }

    const localBreach = {
      id: 'TRIP-' + Math.floor(1000 + Math.random() * 9000),
      ...breachPayload,
      ip: '127.0.0.1 [Local Client Simulation]',
      geo: 'Current Browser Client',
      tool: `${browserSig} • ${screenSpec}`,
      threatScore: 85,
      networkType: 'LOCAL_SIMULATION',
      timestamp: 'Just now',
      riskLevel: 'CRITICAL'
    };
    setIncidents((prev) => [localBreach, ...prev]);
  };

  // Trapping an Unauthorized Login Attempt
  const handleHoneypotTripped = async ({ username, password, trapName, vectorClass, payload }) => {
    const targetUser = username || trapName || 'admin';
    const targetPass = password || '***';

    try {
      const res = await fetch(`${API_BASE}/superadmin/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ username: targetUser, password: targetPass })
      });
      if (res.ok || res.status === 401) {
        // Handled in real-time via WebSocket threat:tripped
        return;
      }
    } catch (err) {
      const liveHash = generateCanvasEntropy();
      const screenSpec = `${window.screen.width}x${window.screen.height}`;
      const browserSig = navigator.userAgent.split(' ')[0];

      const honeypotIncident = {
        id: 'TRIP-' + Math.floor(1000 + Math.random() * 9000),
        trapName: trapName || `/superadmin/portal [Target: ${targetUser}]`,
        vectorClass: vectorClass || 'Brute-Force & Credential Stuffing',
        ip: '127.0.0.1 [Local Machine]',
        geo: 'Client Browser Environment',
        tool: `${browserSig} [${screenSpec}]`,
        threatScore: 95,
        networkType: 'LOCAL_SIMULATION',
        fingerprint: liveHash,
        timestamp: new Date().toISOString(),
        payload: payload || `POST /superadmin/auth { username: "${targetUser}" }`,
        riskLevel: 'CRITICAL'
      };
      setIncidents((prev) => [honeypotIncident, ...prev]);
    }
  };

  // Deploying a new honeytoken
  const handleDeployDecoy = async (newDecoy) => {
    try {
      const res = await fetch(`${API_BASE}/api/decoys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDecoy)
      });
      if (res.ok) return;
    } catch (err) {
      // Fallback
    }
    setDecoys((prev) => [newDecoy, ...prev]);
  };

  return (
    <>
      <Header
        onSimulateBreach={handleSimulateBreach}
        isOnline={isOnline}
        isSocketLive={isSocketLive}
      />

      <main className="console-body">
        <MetricGauges
          decoyCount={decoys.length}
          incidentCount={incidents.length}
        />

        <div className="console-split">
          <DecoyRegister
            decoys={decoys}
            onOpenDeployModal={() => setIsDeployOpen(true)}
          />

          <ForensicsStream
            incidents={incidents}
            onSelectIncident={(incident) => setSelectedIncident(incident)}
          />
        </div>

        {/* Phase 3: Active Digital Tripwire Probes */}
        <TripwireProbe onTriggerRealTrap={fetchTelemetry} />

        {/* Honeypot Login Portal */}
        <DecoyLoginPortal onTrapTripped={handleHoneypotTripped} />
      </main>

      <MobileActionBar
        decoyCount={decoys.length}
        onSimulateBreach={handleSimulateBreach}
      />

      <DeployModal
        isOpen={isDeployOpen}
        onClose={() => setIsDeployOpen(false)}
        onDeploy={handleDeployDecoy}
      />

      <DossierModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </>
  );
}
