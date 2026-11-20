import React, { useState } from 'react';
import { Lock, AlertTriangle, Fingerprint } from 'lucide-react';

export default function DecoyLoginPortal({ onTrapTripped }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lastTrapped, setLastTrapped] = useState(null);

  const handleHoneypotAttempt = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    const trimmedUser = username.trim();
    onTrapTripped({
      username: trimmedUser,
      password: password,
      trapName: `/superadmin/portal [Target: ${trimmedUser}]`,
      vectorClass: 'Brute-Force & Credential Stuffing',
      payload: `POST /superadmin/auth { username: "${trimmedUser}", password: "${'*'.repeat(password.length || 8)}" }`
    });

    setLastTrapped({
      user: trimmedUser,
      time: new Date().toLocaleTimeString()
    });
    setUsername('');
    setPassword('');

    setTimeout(() => setLastTrapped(null), 6000);
  };

  return (
    <section className="honeypot-panel" aria-labelledby="honeypotHeading">
      <div className="section-topbar">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
            <span className="honeypot-badge">
              <AlertTriangle size={13} />
              <span>ACTIVE HONEYPOT TRAP</span>
            </span>
          </div>
          <h2 id="honeypotHeading" className="section-heading">
            Simulated Decoy Admin Login Portal
          </h2>
          <p className="section-subtext">
            Test how attackers on other devices get trapped when attempting unauthorized administrative authentication.
          </p>
        </div>
      </div>

      <form onSubmit={handleHoneypotAttempt} className="honeypot-form">
        <div className="input-field">
          <label htmlFor="decoyUser">Attacker Input: Username / Injected Payload</label>
          <input
            id="decoyUser"
            type="text"
            placeholder="e.g. admin_backup or ' OR 1=1 --"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <div className="input-field">
          <label htmlFor="decoyPass">Attacker Input: Password</label>
          <input
            id="decoyPass"
            type="password"
            placeholder="e.g. root_pass_9981"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button type="submit" className="btn btn-action" style={{ minHeight: '48px' }}>
          <Fingerprint size={18} />
          <span>Test Unauthorized Login</span>
        </button>
      </form>

      {lastTrapped && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'rgba(220, 38, 38, 0.15)',
          border: '1px solid rgba(220, 38, 38, 0.35)',
          borderRadius: '6px',
          color: '#fca5a5',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }}>
          <Lock size={15} />
          <span>INTRUSION LOGGED AT {lastTrapped.time}: Login attempt for "{lastTrapped.user}" trapped &amp; saved to MongoDB! Telemetry stream updated.</span>
        </div>
      )}
    </section>
  );
}
