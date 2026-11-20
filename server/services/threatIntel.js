import geoip from 'geoip-lite';

/**
 * Phase 4 Threat Intelligence & Network Classification Engine
 */

export function parseToolSignature(userAgent = '') {
  const ua = userAgent.toLowerCase();

  if (ua.includes('sqlmap')) {
    return { name: 'sqlmap/1.7#stable', category: 'Automated SQL Injection Scanner', isBot: true };
  }
  if (ua.includes('nikto')) {
    return { name: 'Nikto/2.1.6 Web Vulnerability Scanner', category: 'Automated Web Vulnerability Scanner', isBot: true };
  }
  if (ua.includes('nmap') || ua.includes('masscan')) {
    return { name: 'Nmap/Masscan Port Scanner', category: 'Network Reconnaissance Engine', isBot: true };
  }
  if (ua.includes('python-requests') || ua.includes('aiohttp') || ua.includes('urllib')) {
    return { name: 'python-requests Exploit Script', category: 'Automated Python Exploit Tool', isBot: true };
  }
  if (ua.includes('go-http-client') || ua.includes('nuclei')) {
    return { name: 'Go-HTTP-Client (Nuclei/Amass)', category: 'Golang Automated Exploit Scanner', isBot: true };
  }
  if (ua.includes('curl')) {
    return { name: 'curl/8.4.0 CLI Client', category: 'Command Line HTTP Probe', isBot: true };
  }
  if (ua.includes('postman') || ua.includes('insomnia')) {
    return { name: 'API Testing Client (Postman/Insomnia)', category: 'Manual API Inspection Client', isBot: false };
  }
  if (ua.includes('mozilla') || ua.includes('chrome') || ua.includes('safari') || ua.includes('edge')) {
    return { name: userAgent.split(' ')[0] + ' Browser Client', category: 'Interactive Human Operator', isBot: false };
  }

  return { name: userAgent ? userAgent.substring(0, 35) : 'Anonymous HTTP Probe', category: 'Unclassified Web Crawler', isBot: true };
}

export function classifyNetwork(ip = '', userAgent = '') {
  if (ip === '127.0.0.1' || ip.includes('Local Machine') || ip === '::1') {
    return 'LOCAL_SIMULATION';
  }

  // Common simulated and real Tor exit node subnets / identifiers
  if (ip.startsWith('185.220.') || ip.startsWith('194.26.') || ip.startsWith('198.51.')) {
    return 'TOR_EXIT_NODE';
  }

  // Commercial VPN subnets
  if (ip.startsWith('45.154.') || ip.startsWith('91.240.') || ip.startsWith('89.248.')) {
    return 'COMMERCIAL_VPN';
  }

  // Cloud hosting datacenters (AWS, DigitalOcean, Hetzner, OVH)
  if (ip.startsWith('3.') || ip.startsWith('34.') || ip.startsWith('35.') || ip.startsWith('52.')) {
    return 'CLOUD_DATACENTER';
  }

  return 'RESIDENTIAL_ISP';
}

export function computeThreatScore({ vectorClass, isBot, networkType }) {
  let score = 50;

  // Vector weighting
  if (vectorClass.includes('API Key') || vectorClass.includes('Secret')) score += 25;
  if (vectorClass.includes('Backup') || vectorClass.includes('SQL')) score += 20;
  if (vectorClass.includes('Credential') || vectorClass.includes('Brute-Force')) score += 20;
  if (vectorClass.includes('Environment') || vectorClass.includes('Exfiltration')) score += 15;

  // Network weighting
  if (networkType === 'TOR_EXIT_NODE') score += 20;
  if (networkType === 'COMMERCIAL_VPN') score += 15;
  if (networkType === 'CLOUD_DATACENTER') score += 10;

  // Tool automation weighting
  if (isBot) score += 10;

  // Normalize between 10 and 100
  return Math.min(100, Math.max(10, score));
}

export function analyzeRequestForensics(req) {
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  if (ip.includes(',')) ip = ip.split(',')[0].trim();
  if (ip.startsWith('::ffff:')) ip = ip.replace('::ffff:', '');

  const isLocal = ip === '::1' || ip === '127.0.0.1';
  const displayIp = isLocal ? '127.0.0.1 [Local Machine]' : ip;

  const rawUA = req.headers['user-agent'] || 'Unknown Tool';
  const customFp = req.headers['x-device-fingerprint'] || null;
  const toolInfo = parseToolSignature(rawUA);
  const networkType = classifyNetwork(ip, rawUA);

  const geoData = isLocal ? null : geoip.lookup(ip);
  const geoString = geoData
    ? `${geoData.city || 'Unknown City'}, ${geoData.country}`
    : isLocal
    ? 'Local Host Environment'
    : 'External Cloud Network';

  return {
    ip: displayIp,
    geo: geoString,
    tool: toolInfo.name,
    toolCategory: toolInfo.category,
    networkType: networkType,
    isBot: toolInfo.isBot,
    fingerprint: customFp
  };
}
