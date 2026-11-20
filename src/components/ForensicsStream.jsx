import React, { useState, useEffect } from 'react';
import { Download, Check, ShieldAlert, Cpu, Globe, FileText, Clock, Radio, Filter, ShieldCheck, UserCheck } from 'lucide-react';

export default function ForensicsStream({ incidents, onSelectIncident }) {
  const [exported, setExported] = useState(false);
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'HACKERS' | 'STAFF'
  const [isTrafficSimOn, setIsTrafficSimOn] = useState(true);
  const [routineLogins, setRoutineLogins] = useState([]);

  // Simulated Background Routine Staff Traffic (Simulates real company workers logging in every ~5s)
  const ROUTINE_STAFF = [
    { name: 'Jim Halpert', email: 'jim.halpert@acme-defense.internal', dept: 'Marketing' },
    { name: 'Pam Beesly', email: 'pam.beesly@acme-defense.internal', dept: 'Operations' },
    { name: 'Kevin Malone', email: 'kevin.malone@acme-defense.internal', dept: 'Finance' },
    { name: 'Stanley Hudson', email: 'stanley.hudson@acme-defense.internal', dept: 'Sales' },
    { name: 'Phyllis Lapin', email: 'phyllis.lapin@acme-defense.internal', dept: 'Sales' },
    { name: 'Toby Flenderson', email: 'toby.flenderson@acme-defense.internal', dept: 'Legal & HR' },
    { name: 'Andy Bernard', email: 'andy.bernard@acme-defense.internal', dept: 'Marketing' }
  ];

  useEffect(() => {
    if (!isTrafficSimOn) return;
    const interval = setInterval(() => {
      const staff = ROUTINE_STAFF[Math.floor(Math.random() * ROUTINE_STAFF.length)];
      const randomIp = `10.0.14.${Math.floor(10 + Math.random() * 85)} [Staff LAN Subnet]`;
      const staffIncident = {
        _id: 'staff_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        trapName: `Apex Corporate SSO [Staff Login: ${staff.name}]`,
        vectorClass: 'Authorized Corporate Single Sign-On',
        ip: randomIp,
        geo: 'Internal Corporate Headquarters (Authorized VLAN)',
        tool: 'Chrome Enterprise / Corporate Managed Device',
        toolCategory: 'Authorized Human Staff',
        networkType: 'RESIDENTIAL_ISP',
        threatScore: 12,
        fingerprint: 'fp_corp_auth_token_0x99',
        payload: `SSO_ROUTINE_ACCESS: User ${staff.email} authenticated to internal workspace (${staff.dept}).`,
        riskLevel: 'LOW',
        timestamp: new Date().toISOString(),
        isRoutineStaff: true
      };
      setRoutineLogins((prev) => [staffIncident, ...prev.slice(0, 40)]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isTrafficSimOn]);

  const formatTime = (ts) => {
    if (!ts) return 'Just now';
    try {
      const d = new Date(ts);
      if (isNaN(d.getTime())) return String(ts);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' (' + d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ')';
    } catch (e) {
      return String(ts);
    }
  };

  const getNetworkBadge = (networkType) => {
    switch (networkType) {
      case 'TOR_EXIT_NODE':
        return { label: 'TOR EXIT NODE', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.15)', border: 'rgba(192, 132, 252, 0.3)' };
      case 'COMMERCIAL_VPN':
        return { label: 'COMMERCIAL VPN', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.3)' };
      case 'CLOUD_DATACENTER':
        return { label: 'CLOUD BOT / DC', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.15)', border: 'rgba(251, 146, 60, 0.3)' };
      case 'RESIDENTIAL_ISP':
        return { label: 'STAFF LAN / ISP', color: '#34d399', bg: 'rgba(52, 211, 153, 0.15)', border: 'rgba(52, 211, 153, 0.3)' };
      default:
        return { label: 'LOCAL CLIENT', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.15)', border: 'rgba(148, 163, 184, 0.3)' };
    }
  };

  // Combine real database incidents and routine staff logins, sorted by timestamp
  const allEvents = [...incidents, ...routineLogins].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const isHackerRecord = (item) => {
    return !item.isRoutineStaff && (
      (item.threatScore || 85) >= 75 ||
      item.vectorClass?.includes('Breach') ||
      item.vectorClass?.includes('Exfiltration') ||
      item.vectorClass?.includes('Stuffing') ||
      item.trapName?.includes('Breached') ||
      item.trapName?.includes('Compromised')
    );
  };

  const hackerCount = allEvents.filter(isHackerRecord).length;
  const staffCount = allEvents.length - hackerCount;

  const filteredEvents = allEvents.filter(item => {
    if (filter === 'HACKERS') return isHackerRecord(item);
    if (filter === 'STAFF') return !isHackerRecord(item);
    return true;
  });

  // Phase 6: 1-Click Forensics Audit Report Exporter
  const handleExportReport = () => {
    const reportData = {
      reportTitle: 'Cyber Deception Framework — Forensic Incident Audit Report',
      generatedAt: new Date().toISOString(),
      totalIncidentsCaptured: incidents.length,
      threatSummary: {
        criticalCount: incidents.filter((i) => (i.threatScore || 85) >= 90).length,
        highCount: incidents.filter((i) => (i.threatScore || 85) < 90).length
      },
      auditLog: incidents.map((item) => ({
        id: item._id || item.id,
        honeytoken: item.trapName,
        vector: item.vectorClass,
        attackerIp: item.ip,
        geolocation: item.geo,
        networkClass: item.networkType || 'EXTERNAL',
        threatScore: item.threatScore || 85,
        toolSignature: item.toolCategory || item.tool,
        hardwareHash: item.fingerprint,
        timestamp: item.timestamp,
        payload: item.payload
      }))
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cyber_Deception_Audit_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <section className="console-section" aria-labelledby="forensicsHeading">
      <div className="section-topbar">
        <div>
          <h2 id="forensicsHeading" className="section-heading">
            Intruder Forensics Stream
          </h2>
          <p className="section-subtext">
            Live enterprise telemetry. Separate malicious adversary intrusions from routine employee logins.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={handleExportReport}
            className="btn btn-secondary"
            style={{ minHeight: '36px', padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
            title="Download audit report JSON"
          >
            {exported ? <Check size={14} color="#34d399" /> : <Download size={14} />}
            <span>{exported ? 'Report Exported!' : 'Export Report'}</span>
          </button>

          <div className="stream-beacon">
            <span className="pulse-dot"></span>
            <span>INTEL ACTIVE</span>
          </div>
        </div>
      </div>

      {/* FILTER & SEPARATION BAR (Allows analyst to isolate actual hacker from routine logins) */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
        padding: '0.45rem 0.75rem',
        backgroundColor: '#07090e',
        borderRadius: '6px',
        border: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <Filter size={13} color="#94a3b8" />
          <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            INCIDENT FILTER:
          </span>

          <button
            onClick={() => setFilter('ALL')}
            style={{
              padding: '0.2rem 0.6rem',
              borderRadius: '4px',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              background: filter === 'ALL' ? '#1e293b' : 'transparent',
              color: filter === 'ALL' ? '#fff' : '#94a3b8',
              border: filter === 'ALL' ? '1px solid #475569' : '1px solid transparent'
            }}
          >
            All Live ({allEvents.length})
          </button>

          <button
            onClick={() => setFilter('HACKERS')}
            style={{
              padding: '0.2rem 0.6rem',
              borderRadius: '4px',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer',
              background: filter === 'HACKERS' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(239, 68, 68, 0.08)',
              color: '#f87171',
              border: filter === 'HACKERS' ? '1px solid #ef4444' : '1px solid rgba(239, 68, 68, 0.25)'
            }}
          >
            &#128680; Hackers Only ({hackerCount})
          </button>

          <button
            onClick={() => setFilter('STAFF')}
            style={{
              padding: '0.2rem 0.6rem',
              borderRadius: '4px',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              background: filter === 'STAFF' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
              color: filter === 'STAFF' ? '#34d399' : '#94a3b8',
              border: filter === 'STAFF' ? '1px solid #10b981' : '1px solid transparent'
            }}
          >
            &#128100; Routine Staff ({staffCount})
          </button>
        </div>

        <button
          onClick={() => setIsTrafficSimOn(!isTrafficSimOn)}
          style={{
            padding: '0.2rem 0.6rem',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            background: isTrafficSimOn ? 'rgba(16, 185, 129, 0.15)' : 'rgba(100, 116, 139, 0.15)',
            color: isTrafficSimOn ? '#34d399' : '#94a3b8',
            border: isTrafficSimOn ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(100, 116, 139, 0.3)'
          }}
          title="Toggle routine employee login simulation"
        >
          {isTrafficSimOn ? '🟢 Staff Logins (~5s): ACTIVE' : '⚪ Staff Traffic: PAUSED'}
        </button>
      </div>

      <div className="dossier-stream" role="log" aria-live="polite">
        {filteredEvents.map((item) => {
          const net = getNetworkBadge(item.networkType);
          const score = item.threatScore || 85;
          const isHacker = isHackerRecord(item);

          return (
            <article
              key={item.id || item._id}
              className="dossier-card"
              onClick={() => onSelectIncident(item)}
              tabIndex={0}
              role="button"
              style={{
                borderLeft: isHacker ? '3px solid #ef4444' : '3px solid #10b981',
                backgroundColor: isHacker ? 'rgba(239, 68, 68, 0.04)' : 'rgba(16, 185, 129, 0.02)'
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectIncident(item);
              }}
              aria-label={`Inspect breach incident ${item.id || item._id}`}
            >
              <div className="dossier-header">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '0.1rem 0.45rem',
                      borderRadius: '3px',
                      color: isHacker ? '#fff' : '#047857',
                      backgroundColor: isHacker ? '#dc2626' : '#a7f3d0'
                    }}>
                      {isHacker ? '🚨 MALICIOUS HACKER' : '👤 ROUTINE STAFF'}
                    </span>
                    <span className="dossier-trap-id">{item.trapName}</span>
                  </div>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#94a3b8' }}>
                    <Clock size={12} color="#38bdf8" />
                    <span>Time of Activity: <strong style={{ color: '#fff' }}>{formatTime(item.timestamp)}</strong></span>
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      color: net.color,
                      backgroundColor: net.bg,
                      border: `1px solid ${net.border}`
                    }}
                  >
                    {net.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      color: isHacker ? '#f87171' : '#34d399',
                      backgroundColor: isHacker ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      border: isHacker ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    {isHacker ? `THREAT: ${score}/100` : `RISK: LOW (${score}/100)`}
                  </span>
                </div>
              </div>

              <div className="dossier-grid">
                <div className="dossier-item" style={{ borderLeft: isHacker ? '2px solid #ef4444' : '2px solid #10b981', paddingLeft: '0.5rem' }}>
                  <span className="dossier-label" style={{ color: isHacker ? '#fca5a5' : '#86efac' }}>Activity Timestamp</span>
                  <span className="dossier-val" style={{ color: '#fff', fontWeight: 600 }}>{formatTime(item.timestamp)}</span>
                </div>
                <div className="dossier-item" style={{ borderLeft: '2px solid #38bdf8', paddingLeft: '0.5rem' }}>
                  <span className="dossier-label" style={{ color: '#7dd3fc' }}>Source IP Address</span>
                  <span className="dossier-val" style={{ color: '#38bdf8', fontWeight: 700 }}>{item.ip}</span>
                </div>
                <div className="dossier-item">
                  <span className="dossier-label">Activity Vector</span>
                  <span className="dossier-val">{item.vectorClass}</span>
                </div>
                <div className="dossier-item">
                  <span className="dossier-label">Geolocation</span>
                  <span className="dossier-val">{item.geo}</span>
                </div>
                <div className="dossier-item">
                  <span className="dossier-label">Client Classification</span>
                  <span className="dossier-val">{item.toolCategory || item.tool}</span>
                </div>
                <div className="dossier-item">
                  <span className="dossier-label">Client Signature Hash</span>
                  <span className="dossier-hash">{item.fingerprint}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
