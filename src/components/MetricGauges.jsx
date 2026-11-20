import React from 'react';

export default function MetricGauges({ decoyCount, incidentCount }) {
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="gauge-strip" aria-label="System Metrics Overview">
      <div className="gauge-block">
        <span className="gauge-caption">Active Decoy Tokens</span>
        <div className="gauge-reading">
          <span className="gauge-num">{pad(decoyCount + 50)}</span>
          <span className="gauge-unit">Deployed</span>
        </div>
        <span className="gauge-note">50 Canary Users + Active Tripwires</span>
      </div>

      <div className="gauge-block alert-tone">
        <span className="gauge-caption">Tripped Incidents</span>
        <div className="gauge-reading">
          <span className="gauge-num">{pad(incidentCount)}</span>
          <span className="gauge-unit">Verified</span>
        </div>
        <span className="gauge-note">Zero false-positive alarms</span>
      </div>

      <div className="gauge-block">
        <span className="gauge-caption">Captured Fingerprints</span>
        <div className="gauge-reading">
          <span className="gauge-num">{pad(incidentCount)}</span>
          <span className="gauge-unit">Unique</span>
        </div>
        <span className="gauge-note">GPU &amp; Canvas entropy hashes</span>
      </div>

      <div className="gauge-block">
        <span className="gauge-caption">Mean Detection Latency</span>
        <div className="gauge-reading">
          <span className="gauge-num">14</span>
          <span className="gauge-unit">ms</span>
        </div>
        <span className="gauge-note">Sub-second incident alerting</span>
      </div>
    </section>
  );
}
