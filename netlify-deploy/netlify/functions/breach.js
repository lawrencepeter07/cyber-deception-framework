// Netlify Serverless Function: Mobile & Remote Intruder Telemetry Capture
// Captures Real Public IP, Cellular Network, Geolocation, and Device Fingerprint

let globalIncidents = [];

exports.handler = async (event, context) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, bypass-tunnel-reminder',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  }

  // GET: Fetch recent incidents for the SOC Defender Console (Port 5000)
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        count: globalIncidents.length,
        incidents: globalIncidents
      })
    };
  }

  // POST: Record an intrusion / mobile login
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body || '{}');

      // Netlify Edge headers provide the true remote visitor IP
      const remoteIp = event.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
                       event.headers['client-ip'] ||
                       event.headers['x-nf-client-connection-ip'] ||
                       data.clientGeo?.ip ||
                       'Mobile-Edge-Visitor';

      const userAgent = event.headers['user-agent'] || data.userAgent || 'Unknown Mobile Client';
      const isMobile = data.isMobile || /iPhone|iPad|Android|Mobile/i.test(userAgent);
      const email = data.email || 'unknown_intruder@nexatech.internal';

      // Geolocation from client or Netlify headers
      const city = data.clientGeo?.city || event.headers['x-country'] || 'Remote';
      const country = data.clientGeo?.country_name || event.headers['x-country'] || 'Global';
      const isp = data.clientGeo?.org || (isMobile ? 'Mobile Cellular / Carrier Network' : 'Broadband Provider');

      const incident = {
        trapName: `Apex Corporate SSO [Mobile Breached: ${email}]`,
        vectorClass: isMobile ? 'Mobile Cellular Credential Exploitation' : 'Remote Public Web Credential Stuffing',
        ip: remoteIp,
        geo: `${city}, ${country} (${isp})`,
        tool: userAgent.slice(0, 100),
        toolCategory: isMobile ? 'Mobile Cellular Device (Interactive Human)' : 'Remote Desktop Browser (Operator)',
        networkType: isMobile ? 'EXTERNAL_MOBILE_4G_5G' : 'EXTERNAL_INTERNET',
        threatScore: 98,
        riskLevel: 'CRITICAL',
        payload: `NETLIFY_EDGE_EXPLOIT: Attacker accessed NexaTech SSO on ${isMobile ? 'Mobile Phone' : 'Remote Machine'} with ${email} from IP: ${remoteIp} [${city}, ${country} - ${isp}]. Screen: ${data.screen || 'Auto'}. Touch: ${data.touchPoints > 0 ? 'Yes' : 'No'}. Redirected to fake Workspace.`,
        timestamp: new Date().toISOString()
      };

      // Store in memory (limited to last 100 incidents)
      globalIncidents.unshift(incident);
      if (globalIncidents.length > 100) globalIncidents.pop();

      console.log(`[NETLIFY EDGE BREACH] Captured: ${remoteIp} | ${email} | ${incident.geo}`);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Forensic telemetry logged successfully',
          incident
        })
      };
    } catch (err) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: err.message })
      };
    }
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
};
