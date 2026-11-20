import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outPath = 'C:\\Users\\lawre\\Desktop\\Cyber Deception Framework for Early-Stage Threat Detection\\screenshots\\00_er_diagram.png';

async function render() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    defaultViewport: { width: 1400, height: 900 }
  });

  const page = await browser.newPage();
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    <script>mermaid.initialize({ startOnLoad: true, theme: 'default' });</script>
    <style>
      body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #ffffff; margin: 0; padding: 20px; }
      .mermaid { font-size: 16px; }
    </style>
  </head>
  <body>
    <div class="mermaid">
      erDiagram
        DECOY_USER ||--o{ INCIDENT : "targeted_in"
        DECOY_TRAP ||--o{ INCIDENT : "triggers"
        INCIDENT ||--o{ CANARY_TOKEN : "exfiltrates"
        DECOY_USER ||--o{ CANARY_TOKEN : "owns"

        DECOY_USER {
            string empId PK
            string name
            string username
            string email
            string googleAccount
            string passwordHash
            string backup2FACode
            string department
            string role
            string clearanceLevel
        }

        DECOY_TRAP {
            string trapId PK
            string trapName
            string serviceType
            string listenAddress
            int port
            string status
            int baseThreatScore
        }

        INCIDENT {
            objectId _id PK
            string trapName FK
            string targetAccount
            string ipAddress
            string networkType
            string cellularCarrier
            string geolocation
            string userAgent
            string deviceCategory
            int threatScore
            string riskLevel
            string payloadDetails
            date timestamp
        }

        CANARY_TOKEN {
            string tokenId PK
            string filename
            string fileType
            string targetDepartment
            string clearanceRequirement
            string beaconEndpoint
            int tripCount
        }
    </div>
  </body>
  </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  const element = await page.$('.mermaid');
  if (element) {
    await element.screenshot({ path: outPath });
  } else {
    await page.screenshot({ path: outPath });
  }
  await browser.close();
  console.log('✅ Rendered ER diagram image to:', outPath);
}

render().catch(console.error);
