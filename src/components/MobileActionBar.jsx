import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function MobileActionBar({ decoyCount, onSimulateBreach }) {
  return (
    <aside className="mobile-action-bar" aria-label="Mobile Quick Action Bar">
      <div className="mobile-meta">
        <span className="mobile-status-tag">STATUS: ARMED</span>
        <span className="mobile-active-count">{decoyCount} Traps Deployed</span>
      </div>

      <button
        onClick={onSimulateBreach}
        className="btn btn-action"
        aria-label="Simulate Attacker Breach"
        style={{ minHeight: '48px', padding: '0.5rem 1.25rem' }}
      >
        <ShieldAlert size={18} />
        <span>Trigger Breach</span>
      </button>
    </aside>
  );
}
