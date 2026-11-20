import React from 'react';
import { Globe, Key, Database, FileText, Plus } from 'lucide-react';

export default function DecoyRegister({ decoys, onOpenDeployModal }) {
  const getVectorIcon = (vector) => {
    switch (vector) {
      case 'CANARY_URL':
        return <Globe size={13} />;
      case 'API_KEY':
        return <Key size={13} />;
      case 'DB_ROW':
        return <Database size={13} />;
      case 'DOCUMENT':
        return <FileText size={13} />;
      default:
        return <Globe size={13} />;
    }
  };

  return (
    <section className="console-section" aria-labelledby="decoySectionHeading">
      <div className="section-topbar">
        <div>
          <h2 id="decoySectionHeading" className="section-heading">
            Deployed Honeytoken Register
          </h2>
          <p className="section-subtext">
            Zero-interaction tripwires planted across source code, endpoints, and storage.
          </p>
        </div>
        <button
          onClick={onOpenDeployModal}
          className="btn btn-secondary"
          aria-label="Deploy new trap"
        >
          <Plus size={16} />
          <span>Deploy Trap</span>
        </button>
      </div>

      <div className="register-table-wrapper">
        <table className="register-table">
          <thead>
            <tr>
              <th scope="col">Decoy Identifier</th>
              <th scope="col">Vector Class</th>
              <th scope="col">Planted Location</th>
              <th scope="col">Integrity</th>
            </tr>
          </thead>
          <tbody>
            {/* 50 Decoy Enterprise Google Accounts Honeytokens */}
            <tr style={{ backgroundColor: 'rgba(6, 182, 212, 0.05)', borderBottom: '1px solid rgba(6, 182, 212, 0.15)' }}>
              <td className="decoy-name-cell">
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>50 Leaked Corporate Google Accounts</span>
                <span style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8' }}>MongoDB Collection: <code>cyber_deception.decoyusers</code></span>
              </td>
              <td>
                <span className="vector-tag" style={{ borderColor: 'rgba(56, 189, 248, 0.3)', color: '#38bdf8', background: 'rgba(6, 182, 212, 0.1)' }}>
                  <Database size={13} />
                  <span>Canary Credentials (50 Users)</span>
                </span>
              </td>
              <td className="location-cell">
                <span>Third-Party Pastebin &amp; /superadmin/portal</span>
                <a href="/superadmin/vault" target="_blank" style={{ display: 'block', fontSize: '0.72rem', color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>
                  &rarr; Inspect 50 Accounts Vault
                </a>
              </td>
              <td>
                <span className="status-cell" style={{ color: '#34d399' }}>ARMED (50)</span>
              </td>
            </tr>

            {decoys.map((decoy) => (
              <tr key={decoy.id}>
                <td className="decoy-name-cell">{decoy.name}</td>
                <td>
                  <span className="vector-tag">
                    {getVectorIcon(decoy.vector)}
                    <span>{decoy.vectorLabel}</span>
                  </span>
                </td>
                <td className="location-cell">{decoy.location}</td>
                <td>
                  <span className="status-cell">{decoy.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
