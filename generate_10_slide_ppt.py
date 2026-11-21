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
output_path = r"C:\Users\lawre\Desktop\Cyber Deception Framework for Early-Stage Threat Detection\Cyber_Deception_Simple_10_Slides.pptx"

# Simple High-Contrast Colors
NAVY = RGBColor(15, 23, 42)          # #0F172A (Clean dark navy)
BLUE = RGBColor(0, 120, 212)         # #0078D4 (Microsoft Blue)
DARK_TEXT = RGBColor(30, 41, 59)     # #1E293B
MUTED_TEXT = RGBColor(71, 85, 105)   # #475569
CARD_BG = RGBColor(248, 250, 252)    # #F8FAFC
CARD_BORDER = RGBColor(226, 232, 240)
WHITE = RGBColor(255, 255, 255)
GREEN = RGBColor(16, 185, 129)       # #10B981
RED = RGBColor(239, 68, 68)          # #EF4444

def add_slide_header(slide, title, category="CYBER DECEPTION PROJECT"):
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
# SLIDE 1: Title Slide (Simple & Clean Dark Theme)
# ==============================================================================
s1 = prs.slides.add_slide(blank_layout)
bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
bg1.fill.solid()
bg1.fill.fore_color.rgb = NAVY
bg1.line.fill.background()

# Title badge
b1 = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(1.5), Inches(3.5), Inches(0.45))
b1.fill.solid()
b1.fill.fore_color.rgb = RGBColor(30, 41, 59)
b1.line.color.rgb = BLUE
tf_b1 = b1.text_frame
p_b1 = tf_b1.paragraphs[0]
p_b1.text = "MERN STACK CYBERSECURITY PROJECT"
p_b1.font.size = Pt(11)
p_b1.font.bold = True
p_b1.font.color.rgb = BLUE
p_b1.alignment = PP_ALIGN.CENTER

# Main Title
tb1 = s1.shapes.add_textbox(Inches(1.0), Inches(2.2), Inches(11.3), Inches(2.0))
tf1 = tb1.text_frame
tf1.word_wrap = True
p1 = tf1.paragraphs[0]
p1.text = "Cyber Deception Framework"
p1.font.size = Pt(40)
p1.font.bold = True
p1.font.color.rgb = WHITE

p1_sub = tf1.add_paragraph()
p1_sub.text = "Trapping Hackers & Tracking Their Real IP with Fake Company Portals"
p1_sub.font.size = Pt(20)
p1_sub.font.color.rgb = RGBColor(148, 163, 184)

# Presenter box
p_box = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(5.2), Inches(11.3), Inches(1.3))
p_box.fill.solid()
p_box.fill.fore_color.rgb = RGBColor(30, 41, 59)
p_box.line.color.rgb = RGBColor(51, 65, 85)
tf_p = p_box.text_frame
tf_p.word_wrap = True
pp = tf_p.paragraphs[0]
pp.text = "Presenter: Lawrence Peter  •  Final Year Project Demo"
pp.font.size = Pt(15)
pp.font.bold = True
pp.font.color.rgb = WHITE
pp2 = tf_p.add_paragraph()
pp2.text = "Live Ports: Port 5000 (Defender Console)  |  Port 8000 (Honeypot Portal)  |  Public Cloudflare Tunnel"
pp2.font.size = Pt(13)
pp2.font.color.rgb = GREEN

# ==============================================================================
# SLIDE 2: The Big Problem (Simple English)
# ==============================================================================
s2 = prs.slides.add_slide(blank_layout)
add_slide_header(s2, "The Problem: Why Traditional Security Fails Today")

prob_cards = [
    ("1. Passwords Get Leaked", "Hackers don't break in with code anymore. They simply buy stolen corporate passwords from dark web leaks.", RED),
    ("2. Firewalls Are Blind", "When a hacker enters a valid password, normal firewalls let them in. The firewall thinks it's a real employee!", BLUE),
    ("3. Hackers Move Silently", "Once inside, attackers explore internal files, emails, and databases for months before anyone notices.", NAVY)
]

for i, (title, text, color) in enumerate(prob_cards):
    left = Inches(0.8 + i * 4.0)
    card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.8), Inches(3.7), Inches(4.8))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = CARD_BORDER
    
    # Top accent bar
    bar = s2.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, Inches(1.8), Inches(3.7), Inches(0.12))
    bar.fill.solid()
    bar.fill.fore_color.rgb = color
    bar.line.fill.background()

    tb = s2.shapes.add_textbox(left + Inches(0.2), Inches(2.3), Inches(3.3), Inches(4.0))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = DARK_TEXT
    
    p2 = tf.add_paragraph()
    p2.text = "\n" + text
    p2.font.size = Pt(14)
    p2.font.color.rgb = MUTED_TEXT

# ==============================================================================
# SLIDE 3: Our Solution (The Clever Trap)
# ==============================================================================
s3 = prs.slides.add_slide(blank_layout)
add_slide_header(s3, "Our Solution: Trap the Hacker with Cyber Deception")

sol_items = [
    ("Fake Company Portal", "We created a fake login page that looks 100% like Microsoft 365 for a fictional company called 'NexaTech Solutions'."),
    ("50 Leaked Fake Passwords", "We put 50 fake employee passwords out as bait. When a hacker gets this list, they try to log into our site."),
    ("Automatic IP & Mobile Tracking", "The moment the hacker taps 'Sign In' (even on mobile 4G/5G), our server captures their real public IP and location!"),
    ("Fake Intranet Sandbox", "Instead of showing an error, the hacker is let into a fake intranet. They waste time exploring while we record everything!")
]

for i, (stitle, sdesc) in enumerate(sol_items):
    row = i // 2
    col = i % 2
    left = Inches(0.8 + col * 5.9)
    top = Inches(1.8 + row * 2.6)
    
    card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.7), Inches(2.3))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = CARD_BORDER

    tb = s3.shapes.add_textbox(left + Inches(0.25), top + Inches(0.2), Inches(5.2), Inches(1.9))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = stitle
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = BLUE
    
    p2 = tf.add_paragraph()
    p2.text = "\n" + sdesc
    p2.font.size = Pt(13)
    p2.font.color.rgb = MUTED_TEXT

# ==============================================================================
# SLIDE 4: How It Works (Step-by-Step Flow)
# ==============================================================================
s4 = prs.slides.add_slide(blank_layout)
add_slide_header(s4, "How the Attack and Trap Work (In 5 Easy Steps)")

steps = [
    ("Step 1: The Bait", "Hacker gets the 50 leaked corporate passwords from a dark web dump."),
    ("Step 2: The Login", "Hacker visits our site on their phone or laptop and enters Sarah Jenkins' password."),
    ("Step 3: Silent Capture", "Our server immediately captures their real IP address, city, and phone network."),
    ("Step 4: The Trick", "Hacker enters the fake NexaTech intranet with fake chats and files. They think they won!"),
    ("Step 5: Instant Alert", "Our Defender Dashboard on Port 5000 flashes red with the hacker's real IP in 0.1s!")
]

for i, (st, sd) in enumerate(steps):
    left = Inches(0.8 + i * 2.38)
    card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.8), Inches(2.25), Inches(4.8))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = CARD_BORDER
    
    # Step number circle
    num = s4.shapes.add_shape(MSO_SHAPE.OVAL, left + Inches(0.75), Inches(2.1), Inches(0.75), Inches(0.75))
    num.fill.solid()
    num.fill.fore_color.rgb = BLUE
    num.line.fill.background()
    p_num = num.text_frame.paragraphs[0]
    p_num.text = str(i + 1)
    p_num.font.size = Pt(16)
    p_num.font.bold = True
    p_num.font.color.rgb = WHITE
    p_num.alignment = PP_ALIGN.CENTER

    tb = s4.shapes.add_textbox(left + Inches(0.1), Inches(3.1), Inches(2.05), Inches(3.3))
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
# SLIDE 5: The Tech Stack (MERN Explained Simply)
# ==============================================================================
s5 = prs.slides.add_slide(blank_layout)
add_slide_header(s5, "Built with the MERN Stack")

mern_cards = [
    ("M", "MongoDB", "Stores all the evidence: hacker IP addresses, login timestamps, device types, and the 50 fake employee profiles."),
    ("E", "Express.js", "Handles the backend API. It checks the password, extracts the IP, and sends instant alerts to the SOC console."),
    ("R", "React.js", "Powers the live Defender Dashboard on Port 5000 with real-time gauges, live threat cards, and filter buttons."),
    ("N", "Node.js", "Runs the fast server and uses WebSockets (Socket.io) to push intrusion alerts to the screen in 0.1 seconds!")
]

for i, (letter, name, desc) in enumerate(mern_cards):
    left = Inches(0.8 + i * 2.95)
    card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.8), Inches(2.8), Inches(4.8))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = CARD_BORDER

    # Big Letter
    l_box = s5.shapes.add_textbox(left + Inches(0.2), Inches(2.1), Inches(2.4), Inches(0.8))
    tf_l = l_box.text_frame
    p_l = tf_l.paragraphs[0]
    p_l.text = letter
    p_l.font.size = Pt(40)
    p_l.font.bold = True
    p_l.font.color.rgb = BLUE
    p_l.alignment = PP_ALIGN.CENTER

    tb = s5.shapes.add_textbox(left + Inches(0.2), Inches(3.0), Inches(2.4), Inches(3.4))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = name
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = DARK_TEXT
    p.alignment = PP_ALIGN.CENTER
    
    p2 = tf.add_paragraph()
    p2.text = "\n" + desc
    p2.font.size = Pt(13)
    p2.font.color.rgb = MUTED_TEXT
    p2.alignment = PP_ALIGN.CENTER

# ==============================================================================
# SLIDE 6: What the Hacker Sees (The Honeypot Login)
# ==============================================================================
s6 = prs.slides.add_slide(blank_layout)
add_slide_header(s6, "What the Hacker Sees: The Microsoft 365 Honeypot")

# Left: Big image of the Login page
img3 = os.path.join(screenshots_dir, "03_microsoft_entra_login_portal.png")
if os.path.exists(img3):
    s6.shapes.add_picture(img3, Inches(0.8), Inches(1.8), width=Inches(6.6))

# Right: Key Takeaways
c6 = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.7), Inches(1.8), Inches(4.8), Inches(5.0))
c6.fill.solid()
c6.fill.fore_color.rgb = CARD_BG
c6.line.color.rgb = CARD_BORDER

tb6 = s6.shapes.add_textbox(Inches(7.9), Inches(2.1), Inches(4.4), Inches(4.4))
tf6 = tb6.text_frame
tf6.word_wrap = True
p = tf6.paragraphs[0]
p.text = "Key Deception Features"
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = BLUE

points6 = [
    "• 100% Genuine Look: Uses official Microsoft logo, fonts, and Fluent Design.",
    "• Zero Clues: There is no mention of a honeypot, trap, or security testing.",
    "• Works on Mobile: Anyone can open the Cloudflare link on their phone over 4G/5G.",
    "• Demo Quick-Fill: Quick buttons to test Sarah Jenkins or David Miller instantly on stage."
]
for pt in points6:
    p_pt = tf6.add_paragraph()
    p_pt.text = "\n" + pt
    p_pt.font.size = Pt(13)
    p_pt.font.color.rgb = DARK_TEXT

# ==============================================================================
# SLIDE 7: Inside the Fake Company Intranet (NexaTech)
# ==============================================================================
s7 = prs.slides.add_slide(blank_layout)
add_slide_header(s7, "The Trap: Inside the NexaTech Solutions Intranet")

# Left: Big image of Workspace
img5 = os.path.join(screenshots_dir, "05_nexatech_workspace_home.png")
if os.path.exists(img5):
    s7.shapes.add_picture(img5, Inches(0.8), Inches(1.8), width=Inches(6.6))

# Right: Key Takeaways
c7 = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.7), Inches(1.8), Inches(4.8), Inches(5.0))
c7.fill.solid()
c7.fill.fore_color.rgb = CARD_BG
c7.line.color.rgb = CARD_BORDER

tb7 = s7.shapes.add_textbox(Inches(7.9), Inches(2.1), Inches(4.4), Inches(4.4))
tf7 = tb7.text_frame
tf7.word_wrap = True
p = tf7.paragraphs[0]
p.text = "How We Trick the Hacker"
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = BLUE

points7 = [
    "• Role Personalization: Sarah Jenkins only sees Cloud Architecture and Kubernetes files.",
    "• Active Teams Chat: Simulated incoming team messages make the portal feel completely alive.",
    "• Secret Canary Files: If the hacker clicks 'Download' on confidential files, an invisible beacon alerts the SOC!",
    "• Complete Isolation: The hacker cannot touch any real company server."
]
for pt in points7:
    p_pt = tf7.add_paragraph()
    p_pt.text = "\n" + pt
    p_pt.font.size = Pt(13)
    p_pt.font.color.rgb = DARK_TEXT

# ==============================================================================
# SLIDE 8: What the Defender Sees (Real-Time SOC Dashboard)
# ==============================================================================
s8 = prs.slides.add_slide(blank_layout)
add_slide_header(s8, "What the Defender Sees: Real-Time SOC Command Console")

# Left: Big image of SOC Console
img2 = os.path.join(screenshots_dir, "02_soc_threat_forensics_hacker_filter.png")
if os.path.exists(img2):
    s8.shapes.add_picture(img2, Inches(0.8), Inches(1.8), width=Inches(6.6))

# Right: Key Takeaways
c8 = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.7), Inches(1.8), Inches(4.8), Inches(5.0))
c8.fill.solid()
c8.fill.fore_color.rgb = CARD_BG
c8.line.color.rgb = CARD_BORDER

tb8 = s8.shapes.add_textbox(Inches(7.9), Inches(2.1), Inches(4.4), Inches(4.4))
tf8 = tb8.text_frame
tf8.word_wrap = True
p = tf8.paragraphs[0]
p.text = "Instant Telemetry Capture"
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = RED

points8 = [
    "• Real Public IP Captured: Shows actual mobile IP (e.g. 61.1.x.x) and city (e.g. Chennai).",
    "• Cellular Carrier: Identifies Reliance Jio 5G, Airtel, or broadband.",
    "• Threat Score 98: High-priority critical red alert pops up automatically.",
    "• Silent Defense: Zero loud siren sounds to maintain a professional SOC environment.",
    "• Filter Button: Easily filter between 'Hackers Only' and normal routine staff."
]
for pt in points8:
    p_pt = tf8.add_paragraph()
    p_pt.text = "\n" + pt
    p_pt.font.size = Pt(13)
    p_pt.font.color.rgb = DARK_TEXT

# ==============================================================================
# SLIDE 9: Why Our Solution is Better
# ==============================================================================
s9 = prs.slides.add_slide(blank_layout)
add_slide_header(s9, "Comparison: Traditional Security vs. Our Deception Framework")

comp_data = [
    ("Feature", "Normal Firewall / Antivirus", "Our Cyber Deception Framework"),
    ("Response to Stolen Passwords", "Fails completely (treats hacker as normal user)", "Catches the hacker immediately at login"),
    ("Time to Detect Intrusion", "Average 200+ days (too slow)", "0.1 seconds (instant real-time alert)"),
    ("Hacker's Awareness", "Hacker knows when they are blocked", "Hacker is tricked and has no idea they are caught"),
    ("Forensic Telemetry", "Usually logs only internal IP", "Captures real public mobile IP, city & carrier"),
    ("Attacker Containment", "None (hacker accesses real servers)", "100% trapped inside a fake sandbox")
]

# Table Shape
rows = len(comp_data)
cols = 3
left = Inches(0.8)
top = Inches(1.8)
width = Inches(11.733)
height = Inches(4.8)

table_shape = s9.shapes.add_table(rows, cols, left, top, width, height)
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
# SLIDE 10: Conclusion & Live Demonstration (Dark Theme)
# ==============================================================================
s10 = prs.slides.add_slide(blank_layout)
bg10 = s10.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
bg10.fill.solid()
bg10.fill.fore_color.rgb = NAVY
bg10.line.fill.background()

# Title
t10 = s10.shapes.add_textbox(Inches(1.0), Inches(1.2), Inches(11.3), Inches(1.0))
tf10 = t10.text_frame
p10 = tf10.paragraphs[0]
p10.text = "Conclusion & Live Demonstration"
p10.font.size = Pt(32)
p10.font.bold = True
p10.font.color.rgb = WHITE

# Card 1: What We Built
c10_1 = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(2.2), Inches(5.4), Inches(4.4))
c10_1.fill.solid()
c10_1.fill.fore_color.rgb = RGBColor(30, 41, 59)
c10_1.line.color.rgb = RGBColor(51, 65, 85)

tb10_1 = s10.shapes.add_textbox(Inches(1.2), Inches(2.4), Inches(5.0), Inches(4.0))
tf10_1 = tb10_1.text_frame
tf10_1.word_wrap = True
p = tf10_1.paragraphs[0]
p.text = "Summary of Achievements"
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = BLUE

c_pts = [
    "✓ 100% working MERN stack Cyber Deception Framework.",
    "✓ Real-time mobile public IP and carrier tracking.",
    "✓ Ultra-fast sub-second alert streaming via WebSockets.",
    "✓ Zero giveaways: fully believable Microsoft 365 honeypot.",
    "✓ Tested and verified with live mobile phones on 4G/5G."
]
for cpt in c_pts:
    pa = tf10_1.add_paragraph()
    pa.text = "\n" + cpt
    pa.font.size = Pt(13)
    pa.font.color.rgb = WHITE

# Card 2: Live Demo Instructions
c10_2 = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(2.2), Inches(5.5), Inches(4.4))
c10_2.fill.solid()
c10_2.fill.fore_color.rgb = RGBColor(30, 41, 59)
c10_2.line.color.rgb = RGBColor(51, 65, 85)

tb10_2 = s10.shapes.add_textbox(Inches(7.0), Inches(2.4), Inches(5.1), Inches(4.0))
tf10_2 = tb10_2.text_frame
tf10_2.word_wrap = True
p = tf10_2.paragraphs[0]
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
    pa = tf10_2.add_paragraph()
    pa.text = "\n" + ds
    pa.font.size = Pt(13)
    pa.font.color.rgb = RGBColor(226, 232, 240)

# Save presentation
prs.save(output_path)
print(f"✅ Successfully generated 10-slide PowerPoint presentation: {output_path}")
