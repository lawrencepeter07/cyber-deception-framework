import React from 'react';
import { X, ShieldAlert, Terminal, Radio, Globe, Cpu } from 'lucide-react';

export default function DossierModal({ incident, onClose }) {
  if (!incident) return null;

  const score = incident.threatScore || 85;

  return (
    <div className="modal-curtain" role="dialog" aria-modal="true" aria-labelledby="dossierTitle">
      <div className="modal-box" style={{ maxWidth: '640px' }}>
        <div className="modal-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShieldAlert size={22} color={score >= 90 ? '#f87171' : '#fbbf24'} />
            <div>
              <h3 id="dossierTitle" className="modal-title" style={{ fontSize: '1rem' }}>
                Forensic Dossier &bull; {incident.id || incident._id}
              </h3>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                CLASSIFIED THREAT TELEMETRY
              </span>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon" aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
          {/* Threat Score Card */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--surface-inset)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            padding: '0.75rem 1rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Calculated Threat Severity Score
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: score >= 90 ? '#f87171' : '#fbbf24'
              }}>
                {score} / 100 [{score >= 90 ? 'CRITICAL SEVERITY' : 'HIGH SEVERITY'}]
              </span>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.35rem 0.75rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(192, 132, 252, 0.15)',
              border: '1px solid rgba(192, 132, 252, 0.3)',
              color: '#c084fc'
            }}>
              {incident.networkType || 'TOR_EXIT_NODE'}
            </div>
          </div>

          {/* Technical Details Grid */}
          <div style={{
            backgroundColor: 'rgba(9, 10, 13, 0.9)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            padding: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem'
          }}>
            <div><span style={{ color: 'var(--text-dim)' }}>TIME OF INTRUSION:</span> <span style={{ color: '#fff', fontWeight: 600 }}>{incident.timestamp ? new Date(incident.timestamp).toLocaleString() : 'Live Session'}</span></div>
            <div><span style={{ color: 'var(--text-dim)' }}>SOURCE IP ADDRESS:</span> <span style={{ color: '#38bdf8', fontWeight: 700 }}>{incident.ip}</span></div>
            <div><span style={{ color: 'var(--text-dim)' }}>TRIGGERED DECOY:</span> <span style={{ color: '#f87171', fontWeight: 600 }}>{incident.trapName}</span></div>
            <div><span style={{ color: 'var(--text-dim)' }}>ATTACK VECTOR:</span> {incident.vectorClass}</div>
            <div><span style={{ color: 'var(--text-dim)' }}>GEOLOCATION:</span> {incident.geo}</div>
            <div><span style={{ color: 'var(--text-dim)' }}>TOOL CLASSIFICATION:</span> <span style={{ color: '#38bdf8' }}>{incident.toolCategory || incident.tool}</span></div>
            <div><span style={{ color: 'var(--text-dim)' }}>DATABASE RECORD:</span> <span style={{ color: '#34d399' }}>MongoDB: cyber_deception (ID: {String(incident._id || incident.id || 'SAVED')})</span></div>
            <div><span style={{ color: 'var(--text-dim)' }}>HARDWARE ENTROPY HASH:</span> <span style={{ color: '#38bdf8' }}>{incident.fingerprint}</span></div>
          </div>

          {/* Wire Payload */}
          <div>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              fontWeight: 600,
              marginBottom: '0.4rem'
            }}>
              <Terminal size={14} /> Captured Wire Request Payload
            </span>
            <pre style={{
              backgroundColor: '#07080a',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              padding: '0.85rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: '#a5f3fc',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              {incident.payload || 'GET / HTTP/1.1\r\nHost: canary.target\r\nConnection: keep-alive'}
            </pre>
          </div>
        </div>

        <div className="modal-buttons">
          <button onClick={onClose} className="btn btn-secondary">
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
