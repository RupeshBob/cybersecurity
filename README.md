# CyberGuard

**Category:** Web Security Tool  
**Submitted to:** Digisuraksha Parhari Foundation (Powered by Infinisec Technologies Pvt. Ltd.)  
**Final Submission Deadline:** 12 May 2025  

```

---

## Screenshots

### Main Dashboard
![Main Dashboard](working_ss.png)

### Phishing URL Checker
![Phishing URL Checker](url_checker_ss_0.png)
![Phishing URL Checker](url_checker_ss_1.png)

### Scam Message Detector
![Scam Message Detector](scam_message_detector_ss.png)

### Password Strength Checker
![Password Strength Checker](password_strength.png)




---

## 1. Abstract
CyberGuard is an all-in-one cybersecurity web application that empowers users to:
- Instantly check URLs for phishing using the VirusTotal API v3  
- Detect scam or malicious text messages with rule-based pattern analysis  
- Assess password strength in real time with detailed feedback  

By consolidating three essential security utilities into a single responsive UI, CyberGuard helps individuals and small organizations quickly identify and remediate common threats.

---

## 2. Problem Statement
With the surge in phishing campaigns and social-engineering scams, non-technical users often lack accessible tools to:
1. Verify whether a link is malicious before clicking.  
2. Spot scam or phishing messages masquerading as legitimate communication.  
3. Choose strong passwords that resist brute-force and dictionary attacks.  

CyberGuard addresses these gaps by offering an intuitive interface backed by industry-grade APIs and rule sets.

---

## 3. Team
- **Sanika Aroskar** (Full-Stack Developer)  
- **Rupesh Jadhav** (Frontend Developer)  

---

## 4. Features
1. **Phishing URL Checker**  
   - Input any URL → scans via [VirusTotal API v3](https://www.virustotal.com/) → returns Safe/Suspicious/Phishing verdict  
   - Color-coded counts of harmless, suspicious & malicious engines  

2. **Scam / Fake Message Detector**  
   - Paste WhatsApp or SMS text → advanced rule-based engine flags urgency, spoofing, common scam patterns  
   - Classifies messages as Safe, Suspicious Marketing, Scam, Phishing, or Uncertain, with confidence level & explanation  

3. **Password Strength Checker**  
   - Live strength meter (Weak → Strong) based on length, character variety, entropy  
   - Personalized suggestions to improve password security  

---

## 5. Tech Stack & Architecture
- **Frontend:** Next.js (React) · TypeScript · Tailwind CSS  
- **Backend:** Next.js API Routes  
- **External API:** VirusTotal API v3  
- **Icons:** Lucide React  

![High-Level Architecture](docs/diagrams/architecture.png)

---

## 6. Live Demo & Repository

- 🔗 Live demo: https://cybersecurity-chi.vercel.app/
- 🔗 Source code: https://github.com/RupeshBob/cybersecurity

---

## 7. Installation & Local Development
```bash
# 1. Clone repository
git clone https://github.com/RupeshBob/cybersecurity.git
cd cybersecurity

# 2. Install dependencies
pnpm install

# 3. Create environment file
cat > .env.local << EOF
VIRUSTOTAL_API_KEY=your_api_key_here
EOF

# 4. Run in development mode
pnpm run dev

# 5. Open in browser
http://localhost:3000
