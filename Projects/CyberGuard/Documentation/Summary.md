# CyberGuard — One-Page Summary

**What is CyberGuard?**  
CyberGuard is a unified, responsive web application that empowers non-technical users to:
- Detect phishing URLs via the VirusTotal API v3  
- Analyze WhatsApp/SMS text for scams using rule-based patterns  
- Check password strength in real time with a live meter and feedback  

---

## Problem  
- Phishing campaigns, social-engineering scams, and weak passwords remain top causes of data breaches.  
- Existing tools are siloed, forcing users to switch between sites or install multiple utilities.  
- Non-technical users need a single, easy-to-use platform for proactive cyber-defense.

---

## Core Features  
1. **Phishing URL Checker**  
   - UI: Text input + “Scan”  
   - Backend: [pages/api/url-scan.ts](file:///D:/Projects/cybersecurity-app/tool/source_code/pages/api/url-scan.ts) calls VirusTotal v3  
   - Output: Color-coded bar chart + Safe/Suspicious/Phishing verdict  

2. **Scam / Fake Message Detector**  
   - UI: Text area + “Analyze”  
   - Backend: [pages/api/message-scan.ts](file:///D:/Projects/cybersecurity-app/tool/source_code/pages/api/message-scan.ts) runs rule-based lexicon  
   - Output: Classification (Safe, Suspicious Marketing, Scam, Phishing, Uncertain) + detected patterns  

3. **Password Strength Checker**  
   - UI: Password field + live meter + suggestions  
   - Component: [components/PasswordMeter.tsx](file:///D:/Projects/cybersecurity-app/tool/source_code/components/PasswordMeter.tsx)  
   - Scoring: Length, character variety, entropy, blacklist check  

---

## Tech Stack & Architecture  
- **Frontend:** Next.js (React) · TypeScript · Tailwind CSS  
- **Backend:** Next.js API Routes (Node.js)  
- **External API:** VirusTotal API v3  
- **Icons:** Lucide React  
- **Diagram:** [High-Level Architecture](file:///D:/Projects/cybersecurity-app/docs/diagrams/architecture.png)  

---

## Quick Start  
```bash
# 1. Clone & install
git clone https://github.com/RupeshBob/cybersecurity.git
cd cybersecurity
pnpm install

# 2. Set API key
cat > .env.local << EOF
VIRUSTOTAL_API_KEY=your_api_key_here
EOF

# 3. Run locally
pnpm run dev
# Open http://localhost:3000
