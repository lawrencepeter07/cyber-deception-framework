import React, { useState } from 'react';
import { ExternalLink, Copy, Check, ShieldAlert, Terminal, Eye } from 'lucide-react';

export default function TripwireProbe({ onTriggerRealTrap }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [testResult, setTestResult] = useState(null);

  const traps = [
    {
      title: 'Adversary Exploit Console (Device A)',
      type: 'Hacker Workstation',
      url: `${window.location.origin}/attacker`,
      method: 'Interactive UI',
      desc: 'Open on Device A (phone or 2nd PC) to launch attacks and watch your data get captured live!'
    },
    {
      title: 'Decoy Admin Portal (Honeypot Page)',
      type: 'HTML Login Portal',
      url: 'http://localhost:5000/superadmin/portal',
      method: 'GET / POST',
      desc: 'Real deceptive login portal. Open in any browser/device to test attacker credential capture.'
    },
    {
      title: 'Secret Backup SQL Scraper Trap',
      type: 'Web Directory Bait',
      url: 'http://localhost:5000/api/v1/auth/admin-backup.sql',
      method: 'GET',
      desc: 'Traps automated spiders like sqlmap or Nikto looking for leaked database dumps.'
    },
    {
      title: 'Sensitive .env File Bait',
      type: 'Environment Exfiltration',
      url: 'http://localhost:5000/.env',
      method: 'GET',
      desc: 'Traps bots and crawlers attempting to download server environment secrets.'
    },
    {
      title: 'Canary Document Tracking Pixel (PNG)',
      type: 'Document Token',
      url: 'http://localhost:5000/api/canary/doc-beacon/Q4_Executive_Compensation.pdf',
      method: 'GET (1x1 PNG)',
      desc: 'Serves a 1x1 transparent tracking pixel that logs anyone who opens the leaked PDF.'
    }
  ];

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleTestInBrowser = async (trap) => {
    try {
      setTestResult(`Testing trap: ${trap.title}...`);
      await fetch(trap.url, { mode: 'no-cors' });
      setTestResult(`✅ Trap "${trap.title}" fired! Check your Forensics Stream.`);
      if (onTriggerRealTrap) onTriggerRealTrap();
      setTimeout(() => setTestResult(null), 4000);
    } catch (e) {
      setTestResult(`Fired trap request to ${trap.url}`);
      if (onTriggerRealTrap) onTriggerRealTrap();
    }
  };

  return (
    <section className="console-section" aria-labelledby="probeHeading" style={{ marginTop: '0.5rem' }}>
      <div className="section-topbar">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
            <span className="honeypot-badge" style={{ backgroundColor: 'rgba(2, 132, 199, 0.14)', borderColor: 'rgba(2, 132, 199, 0.35)', color: '#38bdf8' }}>
              <Terminal size={13} />
              <span>PHASE 3 ACTIVE DIGITAL TRIPWIRES</span>
            </span>
          </div>
          <h2 id="probeHeading" className="section-heading">
            Live Decoy Endpoints &amp; Multi-Device Trap Links
          </h2>
          <p className="section-subtext">
            These are real active endpoints running on your Express backend. You can open them from another browser, mobile phone on your Wi-Fi, or test them below.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '0.75rem' }}>
        {traps.map((trap, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--surface-inset)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.75rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{trap.type}</span>
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{trap.method}</span>
              </div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {trap.title}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{trap.desc}</p>
            </div>

            <div style={{
              backgroundColor: '#07080a',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '0.5rem 0.65rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#f87171',
              wordBreak: 'break-all'
            }}>
              {trap.url}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => handleCopy(trap.url, idx)}
                className="btn btn-secondary"
                style={{ flex: 1, minHeight: '38px', padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                title="Copy live URL"
              >
                {copiedIndex === idx ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                <span>{copiedIndex === idx ? 'Copied!' : 'Copy Link'}</span>
              </button>

              <a
                href={trap.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ minHeight: '38px', padding: '0.35rem 0.65rem' }}
                title="Open live trap in new tab"
              >
                <ExternalLink size={14} />
              </a>

              <button
                onClick={() => handleTestInBrowser(trap)}
                className="btn btn-action"
                style={{ minHeight: '38px', padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                title="Trigger trap from current client"
              >
                <ShieldAlert size={14} />
                <span>Test Trap</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {testResult && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'rgba(2, 132, 199, 0.15)',
          border: '1px solid rgba(2, 132, 199, 0.35)',
          borderRadius: '6px',
          color: '#38bdf8',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }}>
          <Eye size={15} />
          <span>{testResult}</span>
        </div>
      )}
    </section>
  );
}
