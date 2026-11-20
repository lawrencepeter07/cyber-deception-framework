/**
 * Phase 6: External Notification Dispatcher
 * Dispatches real-time security alerts to Discord or Telegram webhooks
 */

export async function dispatchDiscordAlert(incident) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl || !webhookUrl.startsWith('http')) return;

  const score = incident.threatScore || 85;
  const color = score >= 90 ? 0xdc2626 : 0xd97706; // Red or Amber

  const payload = {
    embeds: [
      {
        title: '🚨 DECEPTION TRIPWIRE DETONATED',
        description: `Adversary interaction detected on honeytoken: **\`${incident.trapName}\`**`,
        color: color,
        fields: [
          { name: 'Attack Vector', value: incident.vectorClass, inline: true },
          { name: 'Threat Score', value: `${score} / 100`, inline: true },
          { name: 'Network Class', value: incident.networkType || 'EXTERNAL', inline: true },
          { name: 'Source Origin', value: incident.ip, inline: true },
          { name: 'Geolocation', value: incident.geo || 'Unknown', inline: true },
          { name: 'Tool Signature', value: incident.toolCategory || incident.tool, inline: false },
          { name: 'Hardware Entropy Hash', value: `\`${incident.fingerprint}\``, inline: false }
        ],
        footer: { text: 'Cyber Deception Framework • Early-Stage Threat Radar' },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('📢 [Notifier] Discord security alert dispatched.');
  } catch (err) {
    console.error('⚠️ [Notifier] Failed to send Discord webhook:', err.message);
  }
}
