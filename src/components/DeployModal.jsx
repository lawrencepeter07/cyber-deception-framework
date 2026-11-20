import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function DeployModal({ isOpen, onClose, onDeploy }) {
  const [vector, setVector] = useState('CANARY_URL');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !location.trim()) return;

    const labels = {
      CANARY_URL: 'HTTP Endpoint',
      API_KEY: 'Canary Secret',
      DB_ROW: 'NoSQL Tuple',
      DOCUMENT: 'Document Token'
    };

    onDeploy({
      id: 'DCY-' + Math.floor(100 + Math.random() * 900),
      vector,
      vectorLabel: labels[vector] || 'Custom Trap',
      name: name.trim(),
      location: location.trim(),
      status: 'ARMED'
    });

    setName('');
    setLocation('');
    onClose();
  };

  return (
    <div className="modal-curtain" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div className="modal-box">
        <div className="modal-top">
          <h3 id="modalTitle" className="modal-title">Provision Canary Trap</h3>
          <button onClick={onClose} className="btn-icon" aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-field">
            <label htmlFor="trapCategory">Decoy Classification</label>
            <select
              id="trapCategory"
              value={vector}
              onChange={(e) => setVector(e.target.value)}
              required
            >
              <option value="CANARY_URL">Canary Endpoint (Web Directory/Scanner Trap)</option>
              <option value="API_KEY">Canary API Key (Git Scraping &amp; Key Theft Trap)</option>
              <option value="DB_ROW">Canary Database Tuple (NoSQL Injection Bait)</option>
              <option value="DOCUMENT">Canary Document Token (Internal Exfiltration Bait)</option>
            </select>
          </div>

          <div className="input-field">
            <label htmlFor="trapLabel">Trap Identifier / Value</label>
            <input
              id="trapLabel"
              type="text"
              placeholder="e.g. /v2/debug/cluster-dump.tar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          <div className="input-field">
            <label htmlFor="trapLocation">Deployment Surface</label>
            <input
              id="trapLocation"
              type="text"
              placeholder="e.g. backend/config/tokens.env or public README"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <ShieldCheck size={16} />
              <span>Arm Honeytoken</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
