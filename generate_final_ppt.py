import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

# Initialize 16:9 Presentation
prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

blank_layout = prs.slide_layouts[6]
screenshots_dir = r"C:\Users\lawre\Desktop\Cyber Deception Framework for Early-Stage Threat Detection\screenshots"
output_path = r"C:\Users\lawre\Desktop\Cyber Deception Framework for Early-Stage Threat Detection\Cyber_Deception_Presentation_Final.pptx"

# Simple High-Contrast Colors
NAVY = RGBColor(15, 23, 42)          # #0F172A (Deep Slate Navy)
BLUE = RGBColor(0, 120, 212)         # #0078D4 (Microsoft Enterprise Blue)
DARK_TEXT = RGBColor(30, 41, 59)     # #1E293B (Readable Dark Text)
MUTED_TEXT = RGBColor(71, 85, 105)   # #475569 (Secondary Text)
CARD_BG = RGBColor(248, 250, 252)    # #F8FAFC (Soft Light Surface)
CARD_BORDER = RGBColor(226, 232, 240)# #E2E8F0
WHITE = RGBColor(255, 255, 255)
GREEN = RGBColor(16, 185, 129)       # #10B981 (Success Green)
RED = RGBColor(239, 68, 68)          # #EF4444 (Critical Red)
TEAL = RGBColor(13, 148, 136)        # #0D9488

def add_slide_header(slide, title, category="CYBER DECEPTION FRAMEWORK"):
    # Category tag
    cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.5), Inches(0.3))
    tf_c = cat_box.text_frame
    p_c = tf_c.paragraphs[0]
    p_c.text = category.upper()
    p_c.font.size = Pt(11)
    p_c.font.bold = True
    p_c.font.color.rgb = BLUE
    
    # Title
    t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.5), Inches(0.6))
    tf_t = t_box.text_frame
    p_t = tf_t.paragraphs[0]
    p_t.text = title
    p_t.font.size = Pt(24)
    p_t.font.bold = True
    p_t.font.color.rgb = DARK_TEXT

    # Subtle divider
    div = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.35), Inches(11.733), Inches(0.02))
    div.fill.solid()
    div.fill.fore_color.rgb = CARD_BORDER
    div.line.color.rgb = CARD_BORDER

# ==============================================================================
# SLIDE 1: Title Slide (Dark Theme)
# ==============================================================================
s1 = prs.slides.add_slide(blank_layout)
bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
bg1.fill.solid()
bg1.fill.fore_color.rgb = NAVY
bg1.line.fill.background()

b1 = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(1.5), Inches(3.5), Inches(0.45))
b1.fill.solid()
b1.fill.fore_color.rgb = RGBColor(30, 41, 59)
b1.line.color.rgb = BLUE
p_b1 = b1.text_frame.paragraphs[0]
p_b1.text = "MERN STACK CYBERSECURITY PROJECT"
p_b1.font.size = Pt(11)
p_b1.font.bold = True
p_b1.font.color.rgb = BLUE
p_b1.alignment = PP_ALIGN.CENTER

tb1 = s1.shapes.add_textbox(Inches(1.0), Inches(2.2), Inches(11.3), Inches(2.0))
tf1 = tb1.text_frame
tf1.word_wrap = True
p1 = tf1.paragraphs[0]
p1.text = "Cyber Deception Framework"
p1.font.size = Pt(40)
p1.font.bold = True
p1.font.color.rgb = WHITE

p1_sub = tf1.add_paragraph()
p1_sub.text = "Early-Stage Threat Detection & Real-Time Mobile IP Tracking"
p1_sub.font.size = Pt(20)
p1_sub.font.color.rgb = RGBColor(148, 163, 184)

p_box = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(5.2), Inches(11.3), Inches(1.3))
p_box.fill.solid()
p_box.fill.fore_color.rgb = RGBColor(30, 41, 59)
p_box.line.color.rgb = RGBColor(51, 65, 85)
tf_p = p_box.text_frame
tf_p.word_wrap = True
pp = tf_p.paragraphs[0]
pp.text = "Presenter: Lawrence Peter  •  Viva Defense & Stage Demonstration"
pp.font.size = Pt(15)
pp.font.bold = True
pp.font.color.rgb = WHITE
pp2 = tf_p.add_paragraph()
pp2.text = "Architecture: MongoDB, Express.js, React 18, Node.js (MERN)  •  Edge: Cloudflare HTTPS Tunnel"
pp2.font.size = Pt(13)
pp2.font.color.rgb = GREEN

# ==============================================================================
# SLIDE 2: Project Abstract (Simple, Clear & Impactful)
# ==============================================================================
s2 = prs.slides.add_slide(blank_layout)
add_slide_header(s2, "Project Abstract: Proactive Cyber Deception", "PROJECT OVERVIEW")

abstract_cards = [
    ("The Core Problem", "Modern hackers steal legitimate corporate passwords from dark web leaks. Because the stolen credentials are valid, normal firewalls and antivirus tools let the hacker in without triggering any alarms.", RED),
    ("Our Proposed Solution", "We shift from passive defense to active cyber deception. We deploy an authentic fake Microsoft 365 company portal ('NexaTech Solutions') and leak 50 fake corporate passwords as honeytoken bait.", BLUE),
    ("Real-Time Results", "When an attacker logs in on their phone or laptop, our system extracts their real public IP, mobile carrier (Jio/Airtel), and city in under 0.1s, trapping them in a sandbox while alerting defenders.", GREEN)
]

for i, (title, desc, color) in enumerate(abstract_cards):
    left = Inches(0.8 + i * 4.0)
    card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.8), Inches(3.7), Inches(4.8))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = CARD_BORDER

    bar = s2.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, Inches(1.8), Inches(3.7), Inches(0.12))
    bar.fill.solid()
    bar.fill.fore_color.rgb = color
    bar.line.fill.background()

    tb = s2.shapes.add_textbox(left + Inches(0.2), Inches(2.2), Inches(3.3), Inches(4.0))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = DARK_TEXT

    p2 = tf.add_paragraph()
    p2.text = "\n" + desc
    p2.font.size = Pt(14)
    p2.font.color.rgb = MUTED_TEXT

# ==============================================================================
# SLIDE 3: Technologies Used (MERN Stack + Cloudflare Edge)
# ==============================================================================
s3 = prs.slides.add_slide(blank_layout)
add_slide_header(s3, "Technologies Used: The Full Technical Stack", "SYSTEM SPECIFICATIONS")

tech_cards = [
    ("Frontend Layer", "React 18 & Tailwind CSS", "Powers the live Defender SOC Console on Port 5000. Uses Lucide icons, interactive filters, and Chart.js for real-time telemetry metrics without page refresh.", BLUE),
    ("Backend API Layer", "Node.js (v24) & Express.js", "Runs the dual-server architecture: Port 8000 (M365 Honeypot) and Port 5000 (SOC Core). Handles authentication parsing and edge IP extraction.", TEAL),
    ("Real-Time Networking", "Socket.io (WebSockets)", "Keeps a continuous open bidirectional pipe between backend and frontend. Broadcasts critical hacker intrusion cards to SOC screens in ~120ms.", GREEN),
    ("Database & Tunnel Layer", "MongoDB & Cloudflare Tunnel", "MongoDB Community Server stores all intrusion records, real IPs, and the 50 fake profiles. Cloudflare provides a public HTTPS link for live mobile phone access.", NAVY)
]

for i, (cat, name, desc, col) in enumerate(tech_cards):
    row = i // 2
    c_idx = i % 2
    left = Inches(0.8 + c_idx * 5.9)
    top = Inches(1.8 + row * 2.6)

    card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.7), Inches(2.3))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = CARD_BORDER

    tb = s3.shapes.add_textbox(left + Inches(0.25), top + Inches(0.2), Inches(5.2), Inches(1.9))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = cat.upper()
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = col

    p2 = tf.add_paragraph()
    p2.text = name
    p2.font.size = Pt(17)
    p2.font.bold = True
    p2.font.color.rgb = DARK_TEXT

    p3 = tf.add_paragraph()
    p3.text = desc
    p3.font.size = Pt(12)
    p3.font.color.rgb = MUTED_TEXT

# ==============================================================================
# SLIDE 4: System Modules (The 4 Main Building Blocks)
# ==============================================================================
s4 = prs.slides.add_slide(blank_layout)
add_slide_header(s4, "System Modules: 4 Core Building Blocks", "ARCHITECTURE DESIGN")

modules_data = [
    ("Module 1", "Microsoft 365 Honeypot (Port 8000)", "Acts as the decoy front door. Replicates Microsoft Entra ID sign-in with company branding and credential chips. Intercepts the hacker's login and reads their real mobile IP.", BLUE),
    ("Module 2", "NexaTech Intranet Sandbox", "The fake corporate workspace. Personalizes what the hacker sees based on their stolen account (Sarah Jenkins sees Kubernetes clusters). Downloading confidential files trips hidden canary beacons.", TEAL),
    ("Module 3", "Defender SOC Command Console (Port 5000)", "The live security monitoring dashboard. Instantly displays red alert cards with captured mobile IPs, threat score 98, and filter buttons to separate hackers from staff.", RED),
    ("Module 4", "Forensic Data & Scoring Subsystem", "Mongoose schemas mapping to MongoDB. Stores complete event evidence: timestamps, cellular carriers, and threat scores for forensic auditing.", NAVY)
]

for i, (m_num, m_name, m_desc, m_color) in enumerate(modules_data):
    row = i // 2
    c_idx = i % 2
    left = Inches(0.8 + c_idx * 5.9)
    top = Inches(1.8 + row * 2.6)

    card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.7), Inches(2.3))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = CARD_BORDER

    tb = s4.shapes.add_textbox(left + Inches(0.25), top + Inches(0.2), Inches(5.2), Inches(1.9))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = m_num.upper() + ": " + m_name
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = m_color

    p2 = tf.add_paragraph()
    p2.text = "\n" + m_desc
    p2.font.size = Pt(12)
    p2.font.color.rgb = MUTED_TEXT

# ==============================================================================
# SLIDE 5: How It Works (Step-by-Step Attack Flow)
# ==============================================================================
s5 = prs.slides.add_slide(blank_layout)
add_slide_header(s5, "Attack Execution & Containment Flow", "STEP-BY-STEP OPERATION")

steps = [
    ("Step 1: The Bait", "Hacker obtains the 50 leaked corporate credentials from a simulated dark web dump."),
    ("Step 2: Login Attempt", "Hacker visits our login portal on their mobile phone (over 4G/5G) or laptop."),
    ("Step 3: Silent Capture", "Our server extracts the real cellular public IP, city, carrier, and device model."),
    ("Step 4: The Deception", "Hacker enters the fake NexaTech intranet (Teams, Kanban, Files) and thinks they won."),
    ("Step 5: Instant Alert", "Defender SOC on Port 5000 flashes red with the hacker's real IP in ~120ms with zero sound.")
]

for i, (st, sd) in enumerate(steps):
    left = Inches(0.8 + i * 2.38)
    card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.8), Inches(2.25), Inches(4.8))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = CARD_BORDER

    num = s5.shapes.add_shape(MSO_SHAPE.OVAL, left + Inches(0.75), Inches(2.1), Inches(0.75), Inches(0.75))
    num.fill.solid()
    num.fill.fore_color.rgb = BLUE
    num.line.fill.background()
    p_num = num.text_frame.paragraphs[0]
    p_num.text = str(i + 1)
    p_num.font.size = Pt(16)
    p_num.font.bold = True
    p_num.font.color.rgb = WHITE
    p_num.alignment = PP_ALIGN.CENTER

    tb = s5.shapes.add_textbox(left + Inches(0.1), Inches(3.1), Inches(2.05), Inches(3.3))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = st
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = DARK_TEXT
    p.alignment = PP_ALIGN.CENTER

    p2 = tf.add_paragraph()
    p2.text = "\n" + sd
    p2.font.size = Pt(12)
    p2.font.color.rgb = MUTED_TEXT
    p2.alignment = PP_ALIGN.CENTER

# ==============================================================================
# SLIDE 6: Module 1 Evidence: What the Hacker Sees
# ==============================================================================
s6 = prs.slides.add_slide(blank_layout)
add_slide_header(s6, "Module 1 Evidence: Microsoft 365 Honeypot Login", "LIVE EVIDENCE")

img3 = os.path.join(screenshots_dir, "03_microsoft_entra_login_portal.png")
if os.path.exists(img3):
    s6.shapes.add_picture(img3, Inches(0.8), Inches(1.8), width=Inches(6.6))

c6 = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.7), Inches(1.8), Inches(4.8), Inches(5.0))
c6.fill.solid()
c6.fill.fore_color.rgb = CARD_BG
c6.line.color.rgb = CARD_BORDER

tb6 = s6.shapes.add_textbox(Inches(7.9), Inches(2.1), Inches(4.4), Inches(4.4))
tf6 = tb6.text_frame
tf6.word_wrap = True
p = tf6.paragraphs[0]
p.text = "Honeypot Capabilities"
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = BLUE

points6 = [
    "• Genuine Microsoft Styling: Replicates official Entra ID quad-color logo, fonts, and Fluent Design.",
    "• Zero Honeypot Giveaways: No security warnings, no error popups, no traces of monitoring.",
    "• Mobile 4G/5G Accessible: Live Cloudflare HTTPS tunnel allows mobile browsers to connect with full SSL.",
    "• Seeded 50 Decoy Accounts: Matches input credentials against fake employees in MongoDB."
]
for pt in points6:
    p_pt = tf6.add_paragraph()
    p_pt.text = "\n" + pt
    p_pt.font.size = Pt(13)
    p_pt.font.color.rgb = DARK_TEXT

# ==============================================================================
# SLIDE 7: Module 2 Evidence: The Fake NexaTech Intranet
# ==============================================================================
s7 = prs.slides.add_slide(blank_layout)
add_slide_header(s7, "Module 2 Evidence: NexaTech Intranet & Teams Sandbox", "LIVE EVIDENCE")

img5 = os.path.join(screenshots_dir, "05_nexatech_workspace_home.png")
if os.path.exists(img5):
    s7.shapes.add_picture(img5, Inches(0.8), Inches(1.8), width=Inches(6.6))

c7 = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.7), Inches(1.8), Inches(4.8), Inches(5.0))
c7.fill.solid()
c7.fill.fore_color.rgb = CARD_BG
c7.line.color.rgb = CARD_BORDER

tb7 = s7.shapes.add_textbox(Inches(7.9), Inches(2.1), Inches(4.4), Inches(4.4))
tf7 = tb7.text_frame
tf7.word_wrap = True
p = tf7.paragraphs[0]
p.text = "Intranet Deception Features"
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = BLUE

points7 = [
    "• Role Personalization: Logging in as Sarah Jenkins shows Kubernetes files; Michael Ross shows CFO payroll.",
    "• Active Teams Chat: Simulated incoming team messages make the corporate portal feel completely alive.",
    "• Silent Canary Beacons: Clicking 'Download' on confidential files secretly notifies the SOC in real time.",
    "• Total Containment: The hacker is safely trapped in a sandbox and cannot reach real company servers."
]
for pt in points7:
    p_pt = tf7.add_paragraph()
    p_pt.text = "\n" + pt
    p_pt.font.size = Pt(13)
    p_pt.font.color.rgb = DARK_TEXT

# ==============================================================================
# SLIDE 8: Module 3 Evidence: What the Defender Sees (Port 5000)
# ==============================================================================
s8 = prs.slides.add_slide(blank_layout)
add_slide_header(s8, "Module 3 Evidence: Real-Time SOC Command Console", "LIVE EVIDENCE")

img2 = os.path.join(screenshots_dir, "02_soc_threat_forensics_hacker_filter.png")
if os.path.exists(img2):
    s8.shapes.add_picture(img2, Inches(0.8), Inches(1.8), width=Inches(6.6))

c8 = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.7), Inches(1.8), Inches(4.8), Inches(5.0))
c8.fill.solid()
c8.fill.fore_color.rgb = CARD_BG
c8.line.color.rgb = CARD_BORDER

tb8 = s8.shapes.add_textbox(Inches(7.9), Inches(2.1), Inches(4.4), Inches(4.4))
tf8 = tb8.text_frame
tf8.word_wrap = True
p = tf8.paragraphs[0]
p.text = "Live SOC Telemetry Capture"
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = RED

points8 = [
    "• Real Public IP Captured: Shows attacker's true mobile IP (e.g. 61.1.x.x) and city (e.g. Chennai).",
    "• Cellular Carrier Detection: Identifies Reliance Jio 5G, Airtel, or broadband networks.",
    "• Threat Score 98: Critical red priority card streams to the screen in ~120ms via WebSockets.",
    "• Zero Sound Policy: Visual glowing alert badges prevent audio disruptions during presentations.",
    "• Hacker Filter: One-click toggle separates real external hackers from normal background staff."
]
for pt in points8:
    p_pt = tf8.add_paragraph()
    p_pt.text = "\n" + pt
    p_pt.font.size = Pt(13)
    p_pt.font.color.rgb = DARK_TEXT

# ==============================================================================
# SLIDE 9: Module 4 Evidence: Database ER Architecture
# ==============================================================================
s9 = prs.slides.add_slide(blank_layout)
add_slide_header(s9, "Module 4 Evidence: Database ER Architecture (MongoDB)", "DATABASE SCHEMA")

img_er = os.path.join(screenshots_dir, "00_er_diagram.png")
if os.path.exists(img_er):
    s9.shapes.add_picture(img_er, Inches(0.8), Inches(1.8), width=Inches(6.6))

c9 = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.7), Inches(1.8), Inches(4.8), Inches(5.0))
c9.fill.solid()
c9.fill.fore_color.rgb = CARD_BG
c9.line.color.rgb = CARD_BORDER

tb9 = s9.shapes.add_textbox(Inches(7.9), Inches(2.1), Inches(4.4), Inches(4.4))
tf9 = tb9.text_frame
tf9.word_wrap = True
p = tf9.paragraphs[0]
p.text = "Mongoose Data Entities"
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = TEAL

points9 = [
    "• DecoyUser: Holds the 50 fake corporate employee records with roles, departments, and 2FA keys.",
    "• DecoyTrap: Represents honeypot listener endpoints (Port 8000, Cloudflare edge, doc beacons).",
    "• Incident: Central evidence log storing real IP, carrier, device, threat score (98), and timestamps.",
    "• CanaryToken: Decoy confidential documents with unique tracking beacon webhooks.",
    "• Permanent Persistence: Auditable live inside MongoDB Compass during project evaluation."
]
for pt in points9:
    p_pt = tf9.add_paragraph()
    p_pt.text = "\n" + pt
    p_pt.font.size = Pt(13)
    p_pt.font.color.rgb = DARK_TEXT

# ==============================================================================
# SLIDE 10: Comparison: Normal Security vs. Our Deception Framework
# ==============================================================================
s10 = prs.slides.add_slide(blank_layout)
add_slide_header(s10, "Performance Comparison: Traditional vs. Deception", "EVALUATION")

comp_data = [
    ("Security Metric", "Traditional Firewalls & Antivirus", "Our Active Deception Framework"),
    ("Response to Stolen Passwords", "Fails completely (accepts valid passwords)", "Catches the hacker immediately at login"),
    ("Intrusion Detection Time", "Average 200+ days (slow)", "0.1 seconds (instant WebSocket alert)"),
    ("Attacker Awareness", "Hacker knows when they are blocked", "Hacker is completely tricked into a sandbox"),
    ("Forensic Capture", "Usually logs only internal IP addresses", "Captures real mobile cellular IP, carrier & city"),
    ("Attacker Containment", "None (hacker accesses real company servers)", "100% trapped inside a fake M365 intranet")
]

table_shape = s10.shapes.add_table(len(comp_data), 3, Inches(0.8), Inches(1.8), Inches(11.733), Inches(4.8))
tbl = table_shape.table
tbl.columns[0].width = Inches(3.2)
tbl.columns[1].width = Inches(4.2)
tbl.columns[2].width = Inches(4.333)

for r_idx, row in enumerate(comp_data):
    for c_idx, cell_text in enumerate(row):
        cell = tbl.cell(r_idx, c_idx)
        cell.text = cell_text
        p = cell.text_frame.paragraphs[0]
        p.font.size = Pt(13)
        if r_idx == 0:
            p.font.bold = True
            p.font.color.rgb = WHITE
            cell.fill.solid()
            cell.fill.fore_color.rgb = BLUE
        else:
            if c_idx == 2:
                p.font.bold = True
                p.font.color.rgb = GREEN
                cell.fill.solid()
                cell.fill.fore_color.rgb = RGBColor(240, 253, 244)
            else:
                p.font.color.rgb = DARK_TEXT
                cell.fill.solid()
                cell.fill.fore_color.rgb = CARD_BG

# ==============================================================================
# SLIDE 11: Conclusion & Live Demonstration Plan (Dark Theme)
# ==============================================================================
s11 = prs.slides.add_slide(blank_layout)
bg11 = s11.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
bg11.fill.solid()
bg11.fill.fore_color.rgb = NAVY
bg11.line.fill.background()

t11 = s11.shapes.add_textbox(Inches(1.0), Inches(1.2), Inches(11.3), Inches(1.0))
p11 = t11.text_frame.paragraphs[0]
p11.text = "Conclusion & Live Demonstration Plan"
p11.font.size = Pt(32)
p11.font.bold = True
p11.font.color.rgb = WHITE

c11_1 = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(2.2), Inches(5.4), Inches(4.4))
c11_1.fill.solid()
c11_1.fill.fore_color.rgb = RGBColor(30, 41, 59)
c11_1.line.color.rgb = RGBColor(51, 65, 85)

tb11_1 = s11.shapes.add_textbox(Inches(1.2), Inches(2.4), Inches(5.0), Inches(4.0))
tf11_1 = tb11_1.text_frame
tf11_1.word_wrap = True
p = tf11_1.paragraphs[0]
p.text = "Key Project Takeaways"
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = BLUE

c_pts = [
    "✓ 100% working MERN stack Cyber Deception Framework.",
    "✓ Real-time mobile cellular public IP & carrier tracking.",
    "✓ Ultra-fast ~120ms alert broadcasting via WebSockets.",
    "✓ Zero honeypot giveaways: completely authentic M365.",
    "✓ Live tested and verified on actual mobile phones (4G/5G)."
]
for cpt in c_pts:
    pa = tf11_1.add_paragraph()
    pa.text = "\n" + cpt
    pa.font.size = Pt(13)
    pa.font.color.rgb = WHITE

c11_2 = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(2.2), Inches(5.5), Inches(4.4))
c11_2.fill.solid()
c11_2.fill.fore_color.rgb = RGBColor(30, 41, 59)
c11_2.line.color.rgb = RGBColor(51, 65, 85)

tb11_2 = s11.shapes.add_textbox(Inches(7.0), Inches(2.4), Inches(5.1), Inches(4.0))
tf11_2 = tb11_2.text_frame
tf11_2.word_wrap = True
p = tf11_2.paragraphs[0]
p.text = "Live Demo Steps for Judges"
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = GREEN

demo_steps = [
    "1. Show Leaked Passwords: http://localhost:8000/leaked-credentials",
    "2. Open on Mobile Phone: Open Cloudflare link on 4G/5G mobile data.",
    "3. Log In as Sarah Jenkins: Tap Sign In.",
    "4. Watch SOC Console: Laptop on Port 5000 immediately flashes the mobile IP!",
    "5. Check MongoDB: Show intrusion permanently saved in Compass."
]
for ds in demo_steps:
    pa = tf11_2.add_paragraph()
    pa.text = "\n" + ds
    pa.font.size = Pt(13)
    pa.font.color.rgb = RGBColor(226, 232, 240)

# Save presentation
prs.save(output_path)
# Also copy to simple PPTX filename
import shutil
shutil.copyfile(output_path, r"C:\Users\lawre\Desktop\Cyber Deception Framework for Early-Stage Threat Detection\Cyber_Deception_Simple_10_Slides.pptx")

print(f"✅ Successfully generated Final PowerPoint: {output_path}")
