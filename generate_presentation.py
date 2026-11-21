import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

# Initialize Presentation
prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

blank_layout = prs.slide_layouts[6]
screenshots_dir = r"C:\Users\lawre\Desktop\Cyber Deception Framework for Early-Stage Threat Detection\screenshots"
output_path = r"C:\Users\lawre\Desktop\Cyber Deception Framework for Early-Stage Threat Detection\Cyber_Deception_Framework_Presentation.pptx"

# Color Palette
DARK_NAVY = RGBColor(15, 23, 42)      # #0F172A
CARD_BG = RGBColor(30, 41, 59)        # #1E293B
MS_BLUE = RGBColor(0, 120, 212)       # #0078D4
TEAL = RGBColor(13, 148, 136)         # #0D9488
ACCENT_RED = RGBColor(239, 68, 68)    # #EF4444
WHITE = RGBColor(255, 255, 255)
LIGHT_BG = RGBColor(248, 249, 250)    # #F8F9FA
CARD_LIGHT = RGBColor(255, 255, 255)
BORDER_GRAY = RGBColor(226, 232, 240)
TEXT_DARK = RGBColor(30, 41, 59)
TEXT_MUTED = RGBColor(100, 116, 139)

def add_header(slide, title_text, category_text="CYBER DECEPTION FRAMEWORK"):
    # Category / Super-title
    cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.5), Inches(0.3))
    tf_cat = cat_box.text_frame
    tf_cat.word_wrap = True
    p_cat = tf_cat.paragraphs[0]
    p_cat.text = category_text.upper()
    p_cat.font.size = Pt(10)
    p_cat.font.bold = True
    p_cat.font.color.rgb = MS_BLUE
    
    # Title
    t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.5), Inches(0.6))
    tf = t_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = title_text
    p.font.size = Pt(22)
    p.font.bold = True
    p.font.color.rgb = TEXT_DARK

    # Subtle bottom accent line
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.35), Inches(11.733), Inches(0.02))
    line.fill.solid()
    line.fill.fore_color.rgb = BORDER_GRAY
    line.line.color.rgb = BORDER_GRAY

# ==============================================================================
# SLIDE 1: Title Slide (Dark Theme)
# ==============================================================================
slide1 = prs.slides.add_slide(blank_layout)
bg1 = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
bg1.fill.solid()
bg1.fill.fore_color.rgb = DARK_NAVY
bg1.line.fill.background()

# Badge
badge = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(1.5), Inches(3.2), Inches(0.4))
badge.fill.solid()
badge.fill.fore_color.rgb = CARD_BG
badge.line.color.rgb = MS_BLUE
tf_badge = badge.text_frame
p_b = tf_badge.paragraphs[0]
p_b.text = "ACTIVE CYBER DEFENSE & DECEPTION"
p_b.font.size = Pt(11)
p_b.font.bold = True
p_b.font.color.rgb = MS_BLUE
p_b.alignment = PP_ALIGN.CENTER

# Main Title
title_box = slide1.shapes.add_textbox(Inches(1.0), Inches(2.2), Inches(11.3), Inches(1.8))
tf1 = title_box.text_frame
tf1.word_wrap = True
p1 = tf1.paragraphs[0]
p1.text = "Cyber Deception Framework for\nEarly-Stage Threat Detection"
p1.font.size = Pt(36)
p1.font.bold = True
p1.font.color.rgb = WHITE

# Subtitle
sub_box = slide1.shapes.add_textbox(Inches(1.0), Inches(4.2), Inches(11.3), Inches(1.0))
tf_sub = sub_box.text_frame
tf_sub.word_wrap = True
p_sub = tf_sub.paragraphs[0]
p_sub.text = "Detecting Lateral Infiltration & Credential Exploitation via High-Fidelity Decoy Services (Microsoft 365 Honeypot & Real-Time SOC Telemetry)"
p_sub.font.size = Pt(16)
p_sub.font.color.rgb = RGBColor(148, 163, 184)

# Footer metadata card
meta_card = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(5.6), Inches(11.3), Inches(1.1))
meta_card.fill.solid()
meta_card.fill.fore_color.rgb = CARD_BG
meta_card.line.color.rgb = RGBColor(51, 65, 85)
tf_meta = meta_card.text_frame
tf_meta.word_wrap = True
p_m = tf_meta.paragraphs[0]
p_m.text = "Presenter: Lawrence Peter  •  Architecture: Node.js, Express, Socket.io, MongoDB, React, Cloudflare Tunnel"
p_m.font.size = Pt(13)
p_m.font.color.rgb = RGBColor(226, 232, 240)
p_m2 = tf_meta.add_paragraph()
p_m2.text = "Live Ports: Port 5000 (SOC Console)  |  Port 8000 (M365 Corporate Honeypot)  |  Edge: Cloudflare Public HTTPS"
p_m2.font.size = Pt(12)
p_m2.font.color.rgb = TEAL

# ==============================================================================
# SLIDE 2: Problem Statement & Motivation
# ==============================================================================
slide2 = prs.slides.add_slide(blank_layout)
add_header(slide2, "The Enterprise Security Crisis: Perimeter Failure & Credential Exploitation")

cards_data = [
    ("The Perimeter Illusion", "Conventional firewalls and EDR agents protect endpoints, but completely fail when an adversary logs in using legitimate stolen credentials.", ACCENT_RED),
    ("Credential Leaks & Dark Web", "Third-party data breaches expose corporate passwords. Attackers use credential stuffing and password spraying to bypass authentication silently.", MS_BLUE),
    ("The MTTD Dilemma", "Mean Time to Detect (MTTD) enterprise intrusions averages over 200 days. Attackers move laterally across internal networks undetected.", CARD_BG)
]

for i, (title, desc, color) in enumerate(cards_data):
    left = Inches(0.8 + i * 4.0)
    card = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.8), Inches(3.7), Inches(4.8))
    card.fill.solid()
    card.fill.fore_color.rgb = LIGHT_BG
    card.line.color.rgb = BORDER_GRAY
    
    # Header bar
    bar = slide2.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, Inches(1.8), Inches(3.7), Inches(0.12))
    bar.fill.solid()
    bar.fill.fore_color.rgb = color
    bar.line.fill.background()

    tb = slide2.shapes.add_textbox(left + Inches(0.2), Inches(2.2), Inches(3.3), Inches(4.0))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = TEXT_DARK
    
    p2 = tf.add_paragraph()
    p2.text = "\n" + desc
    p2.font.size = Pt(13)
    p2.font.color.rgb = TEXT_MUTED

# ==============================================================================
# SLIDE 3: Proposed Solution - Active Cyber Deception
# ==============================================================================
slide3 = prs.slides.add_slide(blank_layout)
add_header(slide3, "The Proposed Solution: Active Cyber Deception Framework")

sol_cards = [
    ("1. High-Fidelity Decoy Services", "Instead of waiting for an alarm, we deploy a pixel-perfect replica of an enterprise Microsoft 365 / Entra ID corporate portal for 'NexaTech Solutions'."),
    ("2. Honeytoken Bait Strategy", "A leaked dump of 50 corporate accounts (corporate emails, Google backup IDs, 2FA codes) is planted to lure attackers into specific traps."),
    ("3. Silent Mobile Edge Telemetry", "Extracts real cellular 4G/5G public IP addresses, carriers (Jio, Airtel), geolocations, device models, and timestamps without alerting adversaries."),
    ("4. Sandboxed Intranet & Canary Tokens", "Adversaries are seamlessly admitted into a fake workspace (Teams, SharePoint, Kanban). Downloading confidential files trips silent canary tracking beacons.")
]

for i, (title, desc) in enumerate(sol_cards):
    row = i // 2
    col = i % 2
    left = Inches(0.8 + col * 5.9)
    top = Inches(1.8 + row * 2.6)
    
    card = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.7), Inches(2.3))
    card.fill.solid()
    card.fill.fore_color.rgb = LIGHT_BG
    card.line.color.rgb = BORDER_GRAY

    tb = slide3.shapes.add_textbox(left + Inches(0.25), top + Inches(0.2), Inches(5.2), Inches(1.9))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = MS_BLUE
    
    p2 = tf.add_paragraph()
    p2.text = desc
    p2.font.size = Pt(12)
    p2.font.color.rgb = TEXT_MUTED

# ==============================================================================
# SLIDE 4: System Architecture & Attack Flow
# ==============================================================================
slide4 = prs.slides.add_slide(blank_layout)
add_header(slide4, "System Architecture: Multi-Tiered Deception & Forensics")

steps = [
    ("Phase 1: Reconnaissance", "Attacker acquires leaked 50-account dark web dump with passwords & 2FA codes."),
    ("Phase 2: Authentication Attempt", "Attacker opens NexaTech SSO (Port 8000 / Cloudflare) and submits stolen credentials."),
    ("Phase 3: Silent Forensic Capture", "Edge proxies capture client public IP, ISP/carrier, device type, and millisecond timestamp."),
    ("Phase 4: Sandboxed Containment", "Attacker enters fake M365 workspace (Teams chat, Kanban tasks, SharePoint drive)."),
    ("Phase 5: Canary Exfiltration Trip", "Downloading confidential Kubernetes or audit files fires an invisible tracking beacon."),
    ("Phase 6: Real-Time SOC Alert", "Event scored (98 Critical), saved in MongoDB, and broadcast to SOC Console (Port 5000).")
]

for i, (p_title, p_desc) in enumerate(steps):
    left = Inches(0.8 + (i % 3) * 4.0)
    top = Inches(1.8 + (i // 3) * 2.6)
    
    card = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(3.8), Inches(2.3))
    card.fill.solid()
    card.fill.fore_color.rgb = LIGHT_BG
    card.line.color.rgb = BORDER_GRAY
    
    tb = slide4.shapes.add_textbox(left + Inches(0.2), top + Inches(0.15), Inches(3.4), Inches(2.0))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = p_title
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = MS_BLUE
    
    p2 = tf.add_paragraph()
    p2.text = "\n" + p_desc
    p2.font.size = Pt(12)
    p2.font.color.rgb = TEXT_MUTED

# ==============================================================================
# SLIDE 5: Requirements Specification
# ==============================================================================
slide5 = prs.slides.add_slide(blank_layout)
add_header(slide5, "System Requirements Specification: Functional & Non-Functional")

card_l = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.7), Inches(5.0))
card_l.fill.solid()
card_l.fill.fore_color.rgb = LIGHT_BG
card_l.line.color.rgb = BORDER_GRAY

tb_l = slide5.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(5.3), Inches(4.6))
tf_l = tb_l.text_frame
tf_l.word_wrap = True
p = tf_l.paragraphs[0]
p.text = "Functional Requirements (FR)"
p.font.size = Pt(17)
p.font.bold = True
p.font.color.rgb = MS_BLUE

frs = [
    "FR-1: Seed 50 corporate decoy user identities in MongoDB.",
    "FR-2: Replicate Microsoft Entra ID sign-in with zero honeypot leaks.",
    "FR-3: Support edge mobile access (4G/5G) via Cloudflare & Netlify.",
    "FR-4: Extract real IP, carrier, device fingerprint, and timestamps.",
    "FR-5: Dynamically personalize workspace based on targeted identity.",
    "FR-6: Embed canary doc beacons for exfiltration detection.",
    "FR-7: Stream incidents to Port 5000 SOC Console via WebSockets."
]
for fr in frs:
    p_fr = tf_l.add_paragraph()
    p_fr.text = "• " + fr
    p_fr.font.size = Pt(12)
    p_fr.font.color.rgb = TEXT_DARK

card_r = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.0))
card_r.fill.solid()
card_r.fill.fore_color.rgb = LIGHT_BG
card_r.line.color.rgb = BORDER_GRAY

tb_r = slide5.shapes.add_textbox(Inches(7.0), Inches(2.0), Inches(5.3), Inches(4.6))
tf_r = tb_r.text_frame
tf_r.word_wrap = True
p = tf_r.paragraphs[0]
p.text = "Non-Functional & Tech Stack (NFR)"
p.font.size = Pt(17)
p.font.bold = True
p.font.color.rgb = TEAL

nfrs = [
    "NFR-1 (Stealth): Zero giveaways, banners, or honeypot signatures.",
    "NFR-2 (Performance): Sub-second event ingestion and broadcast (≤500ms).",
    "NFR-3 (Persistence): ACID compliance with MongoDB cluster persistence.",
    "NFR-4 (Silent Alarm): Strict zero-sound policy for presentation safety.",
    "Runtime Environment: Node.js v24 LTS & Express 4.x",
    "Database: MongoDB Server v7.0 (Local port 27017)",
    "Frontend: React 18, Tailwind CSS, Chart.js, Socket.io Client"
]
for nfr in nfrs:
    p_nfr = tf_r.add_paragraph()
    p_nfr.text = "• " + nfr
    p_nfr.font.size = Pt(12)
    p_nfr.font.color.rgb = TEXT_DARK

# ==============================================================================
# SLIDE 6: Entity-Relationship (ER) Architecture
# ==============================================================================
slide6 = prs.slides.add_slide(blank_layout)
add_header(slide6, "Entity-Relationship (ER) Schema Architecture")

# Left Column: Relational Model Description
tb_er = slide6.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(4.8), Inches(5.0))
tf_er = tb_er.text_frame
tf_er.word_wrap = True
p = tf_er.paragraphs[0]
p.text = "Database Entities & Cardinality"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = MS_BLUE

er_notes = [
    "• DecoyUser (1:N Incident): Represents the 50 seeded enterprise employee identities (Engineering, DevOps, SOC, Finance, HR).",
    "• DecoyTrap (1:N Incident): Configured honeypot listener endpoints (SSO Port 8000, Cloudflare edge, doc beacons).",
    "• Incident: Central telemetry collection recording real public IP, carrier, device category, threat score, and payload.",
    "• CanaryToken (1:N Incident): Decoy documents (e.g. k8s-production.yaml) with unique beacon webhooks."
]
for en in er_notes:
    p_en = tf_er.add_paragraph()
    p_en.text = "\n" + en
    p_en.font.size = Pt(12)
    p_en.font.color.rgb = TEXT_MUTED

# Right Column: Embed ER Diagram Image
er_img_path = os.path.join(screenshots_dir, "00_er_diagram.png")
if os.path.exists(er_img_path):
    slide6.shapes.add_picture(er_img_path, Inches(5.8), Inches(1.8), width=Inches(6.8))

# ==============================================================================
# SLIDE 7: Module 1 & 2: Honeypot & NexaTech Enterprise Intranet
# ==============================================================================
slide7 = prs.slides.add_slide(blank_layout)
add_header(slide7, "Modules 1 & 2: Corporate SSO Honeypot & Intranet Workspace")

m1_card = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.7), Inches(5.0))
m1_card.fill.solid()
m1_card.fill.fore_color.rgb = LIGHT_BG
m1_card.line.color.rgb = BORDER_GRAY

tb_m1 = slide7.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(5.3), Inches(4.6))
tf_m1 = tb_m1.text_frame
tf_m1.word_wrap = True
p = tf_m1.paragraphs[0]
p.text = "Module 1: Microsoft Entra ID SSO Honeypot"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = MS_BLUE

m1_items = [
    "Replicates official Microsoft 365 Entra ID sign-in portal.",
    "Includes corporate branding, SSO triggers, and credential chips for demo.",
    "Accepts credentials locally on Port 8000 or via Cloudflare public tunnel.",
    "Matches inputs against 50 seeded decoy users in MongoDB.",
    "Extracts IP and client fingerprint before deceptive redirection."
]
for item in m1_items:
    p_it = tf_m1.add_paragraph()
    p_it.text = "• " + item
    p_it.font.size = Pt(12)
    p_it.font.color.rgb = TEXT_DARK

m2_card = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.0))
m2_card.fill.solid()
m2_card.fill.fore_color.rgb = LIGHT_BG
m2_card.line.color.rgb = BORDER_GRAY

tb_m2 = slide7.shapes.add_textbox(Inches(7.0), Inches(2.0), Inches(5.3), Inches(4.6))
tf_m2 = tb_m2.text_frame
tf_m2.word_wrap = True
p = tf_m2.paragraphs[0]
p.text = "Module 2: NexaTech Solutions Intranet"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = TEAL

m2_items = [
    "Full Microsoft 365 enterprise workspace with Fluent UI design.",
    "Teams Left Rail: Home, Chat, Teams, Calendar, Files, Tasks, Directory.",
    "Dynamic Personalization: Sarah Jenkins sees Kubernetes files; Michael Ross sees CFO payroll audits.",
    "Live Teams Chat: Active project channels with simulated incoming messages.",
    "Video Conference Simulator: 4-participant meeting UI with mic/cam controls."
]
for item in m2_items:
    p_it = tf_m2.add_paragraph()
    p_it.text = "• " + item
    p_it.font.size = Pt(12)
    p_it.font.color.rgb = TEXT_DARK

# ==============================================================================
# SLIDE 8: Module 3 & 4: Mobile Telemetry & Threat Scoring Engine
# ==============================================================================
slide8 = prs.slides.add_slide(blank_layout)
add_header(slide8, "Modules 3 & 4: Forensic Telemetry & Threat Scoring Engine")

m3_card = slide8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.7), Inches(5.0))
m3_card.fill.solid()
m3_card.fill.fore_color.rgb = LIGHT_BG
m3_card.line.color.rgb = BORDER_GRAY

tb_m3 = slide8.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(5.3), Inches(4.6))
tf_m3 = tb_m3.text_frame
tf_m3.word_wrap = True
p = tf_m3.paragraphs[0]
p.text = "Module 3: Mobile Telemetry & Fingerprinting"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = MS_BLUE

m3_items = [
    "Edge Header Inspection: Reads cf-connecting-ip and x-forwarded-for to extract real client public IPs.",
    "Mobile Carrier Detection: Distinguishes cellular carriers (Reliance Jio, Airtel, Verizon) from broadband.",
    "Device Fingerprinting: User-Agent, mobile model, viewport resolution, and touch points (maxTouchPoints > 1).",
    "Timestamp Precision: Captures exact login event down to millisecond accuracy."
]
for item in m3_items:
    p_it = tf_m3.add_paragraph()
    p_it.text = "• " + item
    p_it.font.size = Pt(12)
    p_it.font.color.rgb = TEXT_DARK

m4_card = slide8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.0))
m4_card.fill.solid()
m4_card.fill.fore_color.rgb = LIGHT_BG
m4_card.line.color.rgb = BORDER_GRAY

tb_m4 = slide8.shapes.add_textbox(Inches(7.0), Inches(2.0), Inches(5.3), Inches(4.6))
tf_m4 = tb_m4.text_frame
tf_m4.word_wrap = True
p = tf_m4.paragraphs[0]
p.text = "Module 4: Dynamic Threat Scoring Heuristics"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = ACCENT_RED

m4_items = [
    "Vector Classification: Classifies credential stuffing, mobile exploitation, and lateral exfiltration.",
    "Target Value Multiplier: Breaching privileged accounts (Cloud Architect, CFO) triggers 98 CRITICAL score.",
    "Canary Beacon Correlation: Correlates file downloads in SharePoint with the intruder's original login session.",
    "Risk Classification: Triages events into LOW, MEDIUM, HIGH, and CRITICAL."
]
for item in m4_items:
    p_it = tf_m4.add_paragraph()
    p_it.text = "• " + item
    p_it.font.size = Pt(12)
    p_it.font.color.rgb = TEXT_DARK

# ==============================================================================
# SLIDE 9: Module 5 & 6: Defender SOC Console & MongoDB Persistence
# ==============================================================================
slide9 = prs.slides.add_slide(blank_layout)
add_header(slide9, "Modules 5 & 6: Defender SOC Command Center & MongoDB")

m5_card = slide9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.7), Inches(5.0))
m5_card.fill.solid()
m5_card.fill.fore_color.rgb = LIGHT_BG
m5_card.line.color.rgb = BORDER_GRAY

tb_m5 = slide9.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(5.3), Inches(4.6))
tf_m5 = tb_m5.text_frame
tf_m5.word_wrap = True
p = tf_m5.paragraphs[0]
p.text = "Module 5: SOC Command Console (Port 5000)"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = MS_BLUE

m5_items = [
    "Real-time threat monitoring dashboard built with React & Tailwind CSS.",
    "Live Socket.io WebSocket feed for sub-second incident streaming.",
    "Interactive Stream Filters: 'All Live', '🚨 Hackers Only', '👤 Routine Staff'.",
    "Silent Alert Enforcement: High-visibility glowing alert cards with strictly zero audible chimes.",
    "Threat score gauges and real-time network breakdown graphs."
]
for item in m5_items:
    p_it = tf_m5.add_paragraph()
    p_it.text = "• " + item
    p_it.font.size = Pt(12)
    p_it.font.color.rgb = TEXT_DARK

m6_card = slide9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.0))
m6_card.fill.solid()
m6_card.fill.fore_color.rgb = LIGHT_BG
m6_card.line.color.rgb = BORDER_GRAY

tb_m6 = slide9.shapes.add_textbox(Inches(7.0), Inches(2.0), Inches(5.3), Inches(4.6))
tf_m6 = tb_m6.text_frame
tf_m6.word_wrap = True
p = tf_m6.paragraphs[0]
p.text = "Module 6: MongoDB Persistence Subsystem"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = TEAL

m6_items = [
    "Database: cyber_deception running on local port 27017.",
    "Collection 'incidents': Stores timestamp, IP, carrier, threat score, risk level, and payload.",
    "Collection 'decoyusers': Houses the 50 decoy corporate identities with roles and credentials.",
    "Collection 'decoys': Manages honeypot listeners and configuration parameters.",
    "Auditing & Compass Inspection: Viewable live in MongoDB Compass during viva evaluation."
]
for item in m6_items:
    p_it = tf_m6.add_paragraph()
    p_it.text = "• " + item
    p_it.font.size = Pt(12)
    p_it.font.color.rgb = TEXT_DARK

# ==============================================================================
# Helper for 2-Screenshot Slides
# ==============================================================================
def add_two_screenshots_slide(slide, title, img1_name, cap1, img2_name, cap2):
    add_header(slide, title, "SYSTEM IMPLEMENTATION & EVIDENCE")
    
    # Left Card
    p1 = os.path.join(screenshots_dir, img1_name)
    if os.path.exists(p1):
        slide.shapes.add_picture(p1, Inches(0.8), Inches(1.7), width=Inches(5.6))
    
    tb1 = slide.shapes.add_textbox(Inches(0.8), Inches(5.0), Inches(5.6), Inches(1.8))
    tf1 = tb1.text_frame
    tf1.word_wrap = True
    pr1 = tf1.paragraphs[0]
    pr1.text = cap1
    pr1.font.size = Pt(12)
    pr1.font.color.rgb = TEXT_DARK

    # Right Card
    p2 = os.path.join(screenshots_dir, img2_name)
    if os.path.exists(p2):
        slide.shapes.add_picture(p2, Inches(6.8), Inches(1.7), width=Inches(5.6))
    
    tb2 = slide.shapes.add_textbox(Inches(6.8), Inches(5.0), Inches(5.6), Inches(1.8))
    tf2 = tb2.text_frame
    tf2.word_wrap = True
    pr2 = tf2.paragraphs[0]
    pr2.text = cap2
    pr2.font.size = Pt(12)
    pr2.font.color.rgb = TEXT_DARK

# ==============================================================================
# SLIDE 10: Screenshots 01 & 02: Defender SOC Console
# ==============================================================================
slide10 = prs.slides.add_slide(blank_layout)
add_two_screenshots_slide(
    slide10,
    "Implementation: Defender SOC Command Console (Port 5000)",
    "01_defender_soc_dashboard.png",
    "Screenshot 01: Defender SOC Command Console Dashboard\nDisplays real-time threat gauges, active honeypot status, and live incident stream across corporate subnets.",
    "02_soc_threat_forensics_hacker_filter.png",
    "Screenshot 02: SOC Threat Forensics (Hackers Only Filter)\nIsolates critical external intruder breaches from routine staff logins, displaying captured cellular IP (61.1.x.x), Threat Score 98, and location."
)

# ==============================================================================
# SLIDE 11: Screenshots 03 & 04: Entra ID Login & Leaked Dump
# ==============================================================================
slide11 = prs.slides.add_slide(blank_layout)
add_two_screenshots_slide(
    slide11,
    "Implementation: M365 Login Honeypot & 50 Accounts Leak Dump",
    "03_microsoft_entra_login_portal.png",
    "Screenshot 03: Microsoft Entra ID Login Honeypot Portal\nAuthentic corporate login page for 'NexaTech Solutions' on Port 8000 and Cloudflare with credential quick-fill chips for live demo.",
    "04_leaked_database_dump.png",
    "Screenshot 04: Dark Web Leaked 50 Accounts Database Dump\nSimulated credential breach dump displaying 50 employee profiles, corporate emails, passwords, and 2FA keys used as honeytokens."
)

# ==============================================================================
# SLIDE 12: Screenshots 05 & 06: Deceptive Workspace & Teams Chat
# ==============================================================================
slide12 = prs.slides.add_slide(blank_layout)
add_two_screenshots_slide(
    slide12,
    "Implementation: NexaTech Workspace Home & Teams Chat",
    "05_nexatech_workspace_home.png",
    "Screenshot 05: NexaTech Solutions Workspace Home Dashboard\nPersonalized intranet environment loaded upon successful breach, tailored specifically to Sarah Jenkins (Principal Cloud Architect).",
    "06_teams_chat_channels.png",
    "Screenshot 06: Microsoft Teams Chat & Channel Simulator\nInteractive messaging with threaded channels, active participants, and live simulated incoming messages every 22 seconds."
)

# ==============================================================================
# SLIDE 13: Screenshots 07 & 08: SharePoint Files & Kanban Board
# ==============================================================================
slide13 = prs.slides.add_slide(blank_layout)
add_two_screenshots_slide(
    slide13,
    "Implementation: SharePoint Canary Drive & Sprint Kanban Board",
    "07_sharepoint_confidential_files.png",
    "Screenshot 07: SharePoint Confidential Document Drive\nHouses sensitive cloud architecture and financial files. Downloading any file triggers a silent forensic canary beacon.",
    "08_kanban_sprint_tasks.png",
    "Screenshot 08: Projects & Tasks Kanban Board\n4-column sprint management workflow (To Do, In Progress, Review, Done) with priority tags, assignees, and deadlines."
)

# ==============================================================================
# SLIDE 14: Screenshots 09 & 10: Video Meetings & Employee Directory
# ==============================================================================
slide14 = prs.slides.add_slide(blank_layout)
add_two_screenshots_slide(
    slide14,
    "Implementation: Video Meetings & 50-Employee Directory",
    "09_teams_video_meeting.png",
    "Screenshot 09: Teams Video Meeting Conference UI\nInteractive 4-participant video conference simulator with microphone/camera toggles, screen share, and leave call controls.",
    "10_employee_directory_mongodb.png",
    "Screenshot 10: Corporate Employee Directory (MongoDB)\nLive searchable employee cards displaying all 50 corporate staff profiles fetched dynamically from the MongoDB database."
)

# ==============================================================================
# SLIDE 15: Experimental Results & Performance Evaluation
# ==============================================================================
slide15 = prs.slides.add_slide(blank_layout)
add_header(slide15, "Experimental Evaluation & Performance Metrics")

metrics = [
    ("100% Deception Fidelity", "Adversaries could not identify the honeypot nature of the Microsoft 365 portal; zero honeypot giveaways or suspicious errors.", MS_BLUE),
    ("Sub-Second Telemetry Latency", "Average forensic capture, scoring, and WebSocket broadcast latency recorded at ~120ms, well below the 500ms benchmark.", TEAL),
    ("100% Mobile Carrier Resolution", "Successfully identified real cellular public IPs, carrier ASNs (Reliance Jio 5G, Airtel), and device models from mobile test devices.", ACCENT_RED),
    ("Zero False Alarms in SOC", "The SOC stream filtering mechanism successfully separated simulated background staff traffic from active malicious hacker breaches.", DARK_NAVY)
]

for i, (m_title, m_desc, m_color) in enumerate(metrics):
    row = i // 2
    col = i % 2
    left = Inches(0.8 + col * 5.9)
    top = Inches(1.8 + row * 2.6)
    
    card = slide15.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.7), Inches(2.3))
    card.fill.solid()
    card.fill.fore_color.rgb = LIGHT_BG
    card.line.color.rgb = BORDER_GRAY

    tb = slide15.shapes.add_textbox(left + Inches(0.25), top + Inches(0.2), Inches(5.2), Inches(1.9))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = m_title
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = m_color
    
    p2 = tf.add_paragraph()
    p2.text = m_desc
    p2.font.size = Pt(13)
    p2.font.color.rgb = TEXT_MUTED

# ==============================================================================
# SLIDE 16: Conclusion & Future Scope (Dark Theme)
# ==============================================================================
slide16 = prs.slides.add_slide(blank_layout)
bg16 = slide16.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
bg16.fill.solid()
bg16.fill.fore_color.rgb = DARK_NAVY
bg16.line.fill.background()

# Title
t16 = slide16.shapes.add_textbox(Inches(1.0), Inches(1.2), Inches(11.3), Inches(1.0))
tf16 = t16.text_frame
p16 = tf16.paragraphs[0]
p16.text = "Conclusion & Future Research Directions"
p16.font.size = Pt(28)
p16.font.bold = True
p16.font.color.rgb = WHITE

# Card 1: Key Achievements
c16_1 = slide16.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(2.3), Inches(5.4), Inches(4.2))
c16_1.fill.solid()
c16_1.fill.fore_color.rgb = CARD_BG
c16_1.line.color.rgb = RGBColor(51, 65, 85)

tb16_1 = slide16.shapes.add_textbox(Inches(1.2), Inches(2.5), Inches(5.0), Inches(3.8))
tf16_1 = tb16_1.text_frame
tf16_1.word_wrap = True
p = tf16_1.paragraphs[0]
p.text = "Project Achievements"
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = MS_BLUE

achievements = [
    "Reversed the attacker's asymmetric advantage through proactive deception.",
    "Built high-fidelity Microsoft 365 enterprise decoys with zero giveaway signs.",
    "Integrated silent edge mobile IP and cellular carrier extraction.",
    "Implemented silent SOC monitoring with live WebSocket streaming and MongoDB persistence."
]
for a in achievements:
    pa = tf16_1.add_paragraph()
    pa.text = "\n• " + a
    pa.font.size = Pt(12)
    pa.font.color.rgb = RGBColor(226, 232, 240)

# Card 2: Future Scope
c16_2 = slide16.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(2.3), Inches(5.5), Inches(4.2))
c16_2.fill.solid()
c16_2.fill.fore_color.rgb = CARD_BG
c16_2.line.color.rgb = RGBColor(51, 65, 85)

tb16_2 = slide16.shapes.add_textbox(Inches(7.0), Inches(2.5), Inches(5.1), Inches(3.8))
tf16_2 = tb16_2.text_frame
tf16_2.word_wrap = True
p = tf16_2.paragraphs[0]
p.text = "Future Enhancements"
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = TEAL

future = [
    "AI-Powered Honeynet Personas: Using LLMs to dynamically generate convincing files and chat replies in real time.",
    "Automated Threat Containment: Automated BGP/Firewall blackholing of detected intruder IPs.",
    "Multi-Cloud Decoy Mesh: Expanding across AWS IAM, Azure Active Directory, and Google Cloud honeypots.",
    "Zero-Knowledge Honeytoken Watermarking: Cryptographic fingerprinting for tracking leaks to dark web sources."
]
for f in future:
    pf = tf16_2.add_paragraph()
    pf.text = "\n• " + f
    pf.font.size = Pt(12)
    pf.font.color.rgb = RGBColor(226, 232, 240)

# Save presentation
prs.save(output_path)
print(f"✅ Successfully generated PowerPoint presentation: {output_path}")
