import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\lawre\\Desktop\\Cyber Deception Framework for Early-Stage Threat Detection\\screenshots';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log('🚀 Launching Chrome to capture 10 high-resolution screenshots...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();

  // 1. Defender SOC Dashboard
  console.log('📸 1/10: Capturing Defender SOC Console Dashboard...');
  await page.goto('http://localhost:5000', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, '01_defender_soc_dashboard.png') });

  // 2. SOC Threat Forensics (Hackers Only Filter)
  console.log('📸 2/10: Capturing SOC Threat Forensics (Hackers Only Filter)...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const hackerBtn = buttons.find(b => b.innerText && b.innerText.includes('Hackers Only'));
    if (hackerBtn) hackerBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outDir, '02_soc_threat_forensics_hacker_filter.png') });

  // 3. Microsoft Entra ID Sign-In Portal (Honeypot Entrypoint)
  console.log('📸 3/10: Capturing Microsoft Entra ID Sign-In Portal...');
  await page.goto('http://localhost:8000', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, '03_microsoft_entra_login_portal.png') });

  // 4. Dark Web Leaked 50 Accounts Dump
  console.log('📸 4/10: Capturing Leaked Credentials Database Dump...');
  await page.goto('http://localhost:8000/leaked-credentials', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '04_leaked_database_dump.png') });

  // 5. NexaTech Solutions Workspace (Home Dashboard)
  console.log('📸 5/10: Capturing NexaTech Workspace Home Dashboard...');
  await page.goto('http://localhost:8000/workspace?user=Sarah%20Jenkins&role=Principal%20Cloud%20Architect%20%26bull%3B%20Engineering', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, '05_nexatech_workspace_home.png') });

  // 6. Teams Chat & Threaded Messaging View
  console.log('📸 6/10: Capturing Teams Chat & Channels...');
  await page.evaluate(() => {
    if (typeof window.switchView === 'function') window.switchView('chat');
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, '06_teams_chat_channels.png') });

  // 7. SharePoint Confidential File Explorer (Canary Drive)
  console.log('📸 7/10: Capturing SharePoint Confidential Drive...');
  await page.evaluate(() => {
    if (typeof window.switchView === 'function') window.switchView('files');
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, '07_sharepoint_confidential_files.png') });

  // 8. Projects & Tasks Kanban Board
  console.log('📸 8/10: Capturing Projects & Tasks Kanban Board...');
  await page.evaluate(() => {
    if (typeof window.switchView === 'function') window.switchView('tasks');
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, '08_kanban_sprint_tasks.png') });

  // 9. Interactive Teams Video Meeting UI
  console.log('📸 9/10: Capturing Teams Video Meeting Conference UI...');
  await page.evaluate(() => {
    if (typeof window.openJoinMeetingModal === 'function') {
      window.openJoinMeetingModal('Sprint 48 Architecture Review & K8s Mesh');
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outDir, '09_teams_video_meeting.png') });

  // 10. Searchable Employee Directory from MongoDB
  console.log('📸 10/10: Capturing Employee Directory (MongoDB)...');
  await page.evaluate(() => {
    if (typeof window.closeVideoMeeting === 'function') window.closeVideoMeeting();
    if (typeof window.switchView === 'function') window.switchView('directory');
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, '10_employee_directory_mongodb.png') });

  await browser.close();
  console.log('✅ All 10 screenshots captured successfully in:', outDir);
}

run().catch(err => {
  console.error('Screenshot error:', err);
  process.exit(1);
});
