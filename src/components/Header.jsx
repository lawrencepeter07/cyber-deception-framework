import React from 'react';
import { ShieldAlert, Crosshair, Zap, Database } from 'lucide-react';

export default function Header({ onSimulateBreach, isOnline, isSocketLive }) {
  return (
    <header className="console-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <div className="brand-radar" aria-hidden="true">
            <Crosshair size={22} />
          </div>
          <div className="brand-meta">
            <span className="system-label">DEFENSE LEVEL 01 &bull; DECEPTION ENGINE</span>
            <h1 className="system-title">Cyber Deception Framework</h1>
          </div>
        </div>

        <div className="nav-actions">
          {/* MongoDB Connection Status Pill */}
          <div
            className="status-pill"
            role="status"
            aria-label="Database status"
            style={{
              backgroundColor: isOnline ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              borderColor: isOnline ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)',
              color: isOnline ? '#34d399' : '#f87171'
            }}
          >
            <Database size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            <span>{isOnline ? 'MONGODB: CONNECTED (cyber_deception)' : 'MONGODB: CONNECTING...'}</span>
          </div>

          {/* WebSocket Status Pill */}
          <div
            className="status-pill"
            role="status"
            aria-label="WebSocket status"
            style={{
              backgroundColor: isSocketLive ? 'rgba(6, 182, 212, 0.12)' : 'rgba(148, 163, 184, 0.12)',
              borderColor: isSocketLive ? 'rgba(6, 182, 212, 0.35)' : 'rgba(148, 163, 184, 0.3)',
              color: isSocketLive ? '#38bdf8' : '#94a3b8'
            }}
          >
            <span
              className="pulse-beacon"
              style={{
                backgroundColor: isSocketLive ? '#06b6d4' : '#64748b',
                boxShadow: isSocketLive ? '0 0 10px #06b6d4' : 'none'
              }}
            ></span>
            <span>{isSocketLive ? 'WEBSOCKET: LIVE (0ms)' : 'WEBSOCKET: STANDBY'}</span>
          </div>

          <button
            onClick={onSimulateBreach}
            className="btn btn-action desktop-only"
            aria-label="Simulate Attacker Breach"
          >
            <ShieldAlert size={18} />
            <span>Simulate Breach</span>
          </button>
        </div>
      </div>
    </header>
  );
}
