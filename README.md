# CyberGuard

A modern, responsive cybersecurity web application built with Next.js, Tailwind CSS, and TypeScript.

## Features

### 1. Phishing URL Checker
- Paste a URL to check if it's potentially malicious
- Uses the VirusTotal API to scan URLs against 70+ security vendors
- Displays scan results with color-coded indicators
- Shows harmless, suspicious, and malicious counts
- Provides a clear verdict: Safe, Suspicious, or Phishing

### 2. Scam / Fake Message Detector
- Analyze suspicious WhatsApp or SMS messages
- Uses advanced rule-based detection to identify common scam patterns
- Classifies messages as Safe, Suspicious Marketing, Scam, Phishing, or Uncertain
- Detects urgency indicators and suspicious requests
- Provides confidence level, explanation, and detected patterns

### 3. Password Strength Checker
- Check password strength as you type
- Visual strength meter with color indicators
- Detailed strength assessment based on multiple criteria
- Personalized suggestions to improve password security

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **External API**: VirusTotal API
- **Icons**: Lucide React

## Local Development

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/cyberguard.git
cd cyberguard
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Create a `.env.local` file in the root directory and add your VirusTotal API key:
\`\`\`
VIRUSTOTAL_API_KEY=your_api_key_here
\`\`\`

4. Start the development server
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## VirusTotal API

This application uses the VirusTotal API v3 to scan URLs for potential threats. To use this feature:

1. Sign up for a free account at [VirusTotal](https://www.virustotal.com/)
2. Get your API key from your account settings
3. Add the API key to your environment variables as `VIRUSTOTAL_API_KEY`

Note: The free tier of VirusTotal API has rate limits (4 requests per minute, 500 requests per day). For production use, consider upgrading to a premium plan.

## Production Deployment

For production deployment, you can use Vercel:

\`\`\`bash
npm run build
npm run start
\`\`\`

Or deploy directly to Vercel:

\`\`\`bash
vercel
\`\`\`

Make sure to add your `VIRUSTOTAL_API_KEY` to your Vercel environment variables.

## Security Considerations

- The VirusTotal API key is kept secure on the server side
- All user inputs are validated before processing
- No sensitive data is stored or logged
- HTTPS is used for all API requests
- Security headers are added to all API responses

## Disclaimer

This application is for educational and demonstration purposes only. Do not rely solely on this tool for critical security decisions. Always use multiple security tools and best practices.

## License

MIT
